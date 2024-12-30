import { Autocomplete, Card, CardHeader, Container, Grid, IconButton, Pagination, Paper, Stack, TextField, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Add } from "@mui/icons-material";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import Daily from "../components/Daily.tsx";
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from "../redux/store.ts";
import { setWeekly } from "../redux/slicers/scheduleSlice.ts";
import CreateExercise from "../modals/CreateExercise.tsx";
import { setModal, ModalOptions } from "../redux/slicers/interfaceSlice.ts";
import { Exercise, Group } from '../interfaces/models.tsx';
import axios from "axios";

export default function Exercises() {
    const dispatch = useDispatch()

    const exercises = useSelector((state: AppState) => state.user.exercises)
    const weeklyState = useSelector((state: AppState) => state.schedule)
    const groups = useSelector((state : AppState) => state.user.groups)
    
    const [filter, setFilter] = useState({} as Exercise)
    const [workoutFilter, setWorkoutFilter] = useState({} as Group)
    const [workoutGroupPage, setWorkoutGroupPage] = useState(1)
    const [page, setPage] = useState(1)

    const capitalize = (word: string) => {
        let wordArr = word.split(" ")
        for (let i = 0; i < wordArr.length; i++) {
            let wordCopy = wordArr[i].slice()
            wordArr[i] = wordCopy[0].toUpperCase() + wordCopy.substring(1)
        }
        return wordArr.join(" ").trim()
    }

    useEffect(() => {
        if (filter) {
            setPage(1)
        }
        if (workoutFilter) {
            setPage(1)
        }
    }, [filter, workoutFilter])

    const addDaily = (type: string, day: string, obj: any, from = null) => {
        var data = {
            "day": day,
            "exercise_id": (type === "exercise" ? obj.id : null), 
            "group_id": (type === "exercise" ? null : obj.id),
        }

        axios.post(`http://localhost:8080/add${type === "exercise" ? "Exercise" : "Group"}ToDaily`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`
                }
            }
        ).then((res) => {
            let weeklyStateCopy = JSON.parse(JSON.stringify(weeklyState))
            weeklyStateCopy[day][(type === "exercise" ? "exercises" : "groups")] = [...weeklyStateCopy[day][(type === "exercise" ? "exercises" : "groups")], obj]
            
            if (from) {
                console.log(weeklyStateCopy)
                removeDaily(type, from, obj, weeklyStateCopy)
            }

            else {
                dispatch(setWeekly(weeklyStateCopy))
            }
            
        }).catch((err) => {
            console.log("Unable to update daily", err)
        })
    }

    const removeDaily = (type: string, day: string, obj: any, state = null) => {
        let copy = JSON.parse(JSON.stringify(obj))

        var data = {
            "day": day,
            "exercise_id": (type === "exercise" ? copy.id : null), 
            "group_id": (type === "exercise" ? null : copy.id),
        }

        axios.post(`http://localhost:8080/remove${type === "exercise" ? "Exercise" : "Group"}FromDaily`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`
                }
            }
        ).then((res) => {
            let weeklyStateCopy;
            if (state) {
                weeklyStateCopy = state
            }
            else {
                weeklyStateCopy = JSON.parse(JSON.stringify(weeklyState))
            }
            console.log(copy)
            let removeIdx = Array.from(weeklyStateCopy[day][(type === "exercise" ? "exercises" : "groups")]).findIndex((v: any) => v.id === copy.id)
            weeklyStateCopy[day][(type === "exercise" ? "exercises" : "groups")].splice(removeIdx, 1)
            dispatch(setWeekly(weeklyStateCopy))
        }).catch((err) => {
            // if (state) {
            //     dispatch(setWeekly(state))
            // }
            console.log("Unable to update daily", err)
        })
    }

    const handleDragEnd = (result) => {
        const {source, destination} = result
        if (!destination) {
            return;
        }
        
        // ONLY EVER REMOVE FROM THE DAYS BECAUSE NEED EXERCISES TO REMAIN SO CAN BE DRAGGED INTO OTHER DAYS
        if (source.droppableId.split(" ")[0] === destination.droppableId.split(" ")[0]) {
            if (destination.droppableId.split(" ")[0] === "exercises") {
                const idSplit = destination.droppableId.split(" ")
                if (idSplit.length > 1) {
                    let day = idSplit[1].toLowerCase().trim()
                    let copyWeek = JSON.parse(JSON.stringify(weeklyState))
                    if (source.droppableId.split(" ").length > 1) {
                        let sourceDay = source.droppableId.split(" ")[1].toLowerCase()
                        copyWeek[day]["exercises"] = [...copyWeek[day]["exercises"], copyWeek[sourceDay]["exercises"][source.index]]
                        addDaily("exercise", day, copyWeek[sourceDay]["exercises"][source.index], sourceDay)
                    }
                    else {
                        copyWeek[day]["exercises"] = [...copyWeek[day]["exercises"], JSON.parse(JSON.stringify(exercises[((page - 1) * 3) + source.index]))]
                        addDaily("exercise", day, JSON.parse(JSON.stringify(exercises[((page - 1) * 3) + source.index])))
                    }
                }
                else {
                    // day --> exercise, exercise --> exercise
                    if (source.droppableId.split(" ").length > 1) {
                        // just remove from day
                        let sourceDay = source.droppableId.split(" ")[1].toLowerCase()
                        let copyDayExercise = Array.from(weeklyState[sourceDay]["exercises"])
                        copyDayExercise.splice(source.index, 1)
                        let copySourceWeek = JSON.parse(JSON.stringify(weeklyState))
                        copySourceWeek[sourceDay]["exercises"] = copyDayExercise
                        removeDaily("exercise", sourceDay, copyDayExercise)
                    }
                    else {
                        return;
                    }
                }
            }

            else {
                // groups
                if (destination.droppableId.split(" ").length > 1) {
                    // daily groups
                    const idSplit = destination.droppableId.split(" ")
                    if (idSplit.length > 1) {
                        // Add element to destination
                        let day = idSplit[1].toLowerCase().trim()
                        let copyWeek = JSON.parse(JSON.stringify(weeklyState))
                        // day --> day, exercise --> day
                        if (source.droppableId.split(" ").length > 1) {
                            console.log(source)
                            console.log(source.index)
                            let sourceDay = source.droppableId.split(" ")[1].toLowerCase()
                            copyWeek[day]["groups"] = [...copyWeek[day]["groups"], copyWeek[sourceDay]["groups"][source.index]]
                            addDaily("group", day, copyWeek[sourceDay]["groups"][source.index], sourceDay)
                        }
                        else {
                            copyWeek[day]["groups"] = [...copyWeek[day]["groups"], JSON.parse(JSON.stringify(groups[((workoutGroupPage - 1) * 3) + source.index]))]
                            addDaily("group", day, JSON.parse(JSON.stringify(groups[((workoutGroupPage - 1) * 3) + source.index])))
                        }
                    }
                }
                else {
                    if (source.droppableId.split(" ").length > 1) {
                        let sourceDay = source.droppableId.split(" ")[1].toLowerCase()
                        let copyDayGroups = Array.from(weeklyState[sourceDay]["groups"])
                        copyDayGroups.splice(source.index, 1)
                        let copySourceWeek = JSON.parse(JSON.stringify(weeklyState))
                        copySourceWeek[sourceDay]["groups"] = copyDayGroups
                        removeDaily("group", sourceDay, copyDayGroups)
                    }
                }
            }
        }   

        else {
            return;
        }

        // if source type moves to wrong destination type just auto return
        // on cancel button just return
    }

    return (
        <Container maxWidth='xl' 
            sx={{
                height: '90vh',
                display: 'flex',
                p: 2.5,
                flexDirection: 'column'
            }}
        >
            <DragDropContext onDragEnd={handleDragEnd}>
                {/* Weekly Schedule --> Droppable*/}
                <Stack flexDirection='row'
                    sx={{
                        display: 'flex',
                        width: '100%',
                        height: '50%',
                        columnGap: 4
                    }}
                >
                    {
                        ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => {
                            return (
                                <Daily day={day}></Daily>
                            )
                        })
                    }
                    {/* <DonutGraph/> */}
                </Stack>

                {/* Paginated Grid --> Draggable */}
                {/* Exercise Grid */}
                <Stack 
                    sx={{
                        width: '100%',
                        columnGap: 3,
                        flexDirection: 'row'
                    }}
                >
                    <Stack
                        sx={{
                            width: '30%',
                            rowGap: 3
                        }}
                    >
                        <Stack flexDirection={'row'} width='100%' columnGap={1}>
                            <Autocomplete
                                sx={{
                                    width: '100%'
                                }}
                                // value={filter}
                                onChange={(e, v) => (v === null ? setFilter({} as Exercise) : setFilter(v))}
                                renderInput={(props) => <TextField {...props} label={"Exercises"}></TextField>}
                                options={exercises}
                                getOptionLabel={(option) => capitalize(option.exercise_name)}
                                isOptionEqualToValue={(option, value) => option.exercise_name.toLowerCase().trim().includes(value.exercise_name.toLowerCase().trim())}
                            />
                            <Tooltip title={"Add Exercise"}>
                                <IconButton onClick={() => dispatch(setModal(ModalOptions.ADD_EXERCISE))}>
                                    <Add/>
                                </IconButton>
                            </Tooltip>
                        </Stack>
                        
                        <Droppable droppableId="exercises" direction="vertical"
                            // renderClone={(provided, _, rubric) => (
                            //     <Typography textAlign={'center'} ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>{capitalize(exercises[rubric.source.index].exercise_name)}</Typography>
                            // )}
                        
                        >
                            {(provided) => (
                                <Grid
                                    sx={{
                                        borderRadius: 3,
                                        display: 'flex',
                                    }}
                                    component={Paper}
                                    elevation={5}
                                    container
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    
                                    {
                                        exercises.filter((v) => filter?.id > 0 ? filter.exercise_name === v.exercise_name : true).slice((page - 1) * 3, Math.min(3 * page, exercises.length)).map((val, idx) => {
                                            return (
                                                <Draggable index={idx} draggableId={"exercises " + val.exercise_name}>
                                                    {(provided, snapshot) => (
                                                        <Grid item 
                                                            xs={12} 
                                                            key={idx} 
                                                            ref={provided.innerRef} 
                                                            {...provided.draggableProps} 
                                                            {...provided.dragHandleProps}
                                                            sx={{
                                                                ...provided.draggableProps.style
                                                            }}
                                                        >
                                                            <Card sx={{borderRadius: 0}} elevation={1}>
                                                                <CardHeader title={<Typography textAlign={'center'}>{capitalize(val.exercise_name)}</Typography>}></CardHeader>
                                                            </Card>
                                                            {
                                                                snapshot.isDragging ?? <Typography>{val.exercise_name}</Typography>
                                                            }
                                                        </Grid>
                                                    )}
                                                </Draggable>
                                            )
                                        })
                                    }
                                    {provided.placeholder}
                                </Grid>
                            )}
                        </Droppable>
                        {
                            exercises.length > 0 && 
                                <Pagination
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignContent: 'center',
                                        width: '100%',
                                    }}
                                    count={Math.ceil(exercises.length / 3)} onChange={(_, v) => {setPage(v)}}
                                />
                        }
                    </Stack>
                    <Stack width={'30%'} rowGap={3}>
                        <Autocomplete
                            options={groups}
                            onChange={(e, v) => (v === null ? setWorkoutFilter({} as Group) : setWorkoutFilter(v))}
                            getOptionLabel={(option) => capitalize(option.name)}
                            isOptionEqualToValue={(option, value) => value.name.toLowerCase().trim().includes(option.name.toLowerCase().trim())}
                            renderInput={(props) => <TextField {...props} label="Workout Group"></TextField>}
                        />
                        <Droppable droppableId={"groups"}>
                            {(provided) => (
                                <Grid container
                                    component={Paper}
                                    elevation={10}
                                    ref={provided.innerRef}
                                >
                                    {
                                        groups?.filter((v) => workoutFilter?.id > 0 ? workoutFilter.name === v.name : true).slice((workoutGroupPage - 1) * 3, Math.min(workoutGroupPage * 3, groups.length)).map((val, idx) => {
                                            return (
                                                <Draggable draggableId={"groups " + val.id} index={idx}>
                                                    {(provided) => (
                                                        <Grid item xs={12} key={idx} {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                                                            <Card sx={{borderRadius: 0}}>
                                                                <CardHeader title={<Typography textAlign={'center'}>{capitalize(val.name)}</Typography>}></CardHeader>
                                                            </Card>
                                                        </Grid>
                                                    )}
                                                </Draggable>
                                            )
                                        })
                                    }
                                    {provided.placeholder}
                                </Grid>
                            )}
                        </Droppable>
                        <Pagination
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignContent: 'center',
                                width: '100%',
                            }}
                            count={Math.ceil(groups.length / 3)} onChange={(_, v) => setWorkoutGroupPage(v)}
                        />
                    </Stack>
                </Stack>
            </DragDropContext>
            <CreateExercise/>
        </Container>
    )
}