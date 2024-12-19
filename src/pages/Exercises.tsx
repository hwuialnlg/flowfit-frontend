import { Autocomplete, Card, CardHeader, Container, Grid, IconButton, Pagination, Paper, Stack, TextField, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import { Add } from "@mui/icons-material";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import Daily from "../components/Daily.tsx";
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from "../redux/store.ts";
import { setWeekly } from "../redux/slicers/scheduleSlice.ts";

export default function Exercises() {
    const dispatch = useDispatch()

    const exercises = useSelector((state: AppState) => state.user.exercises)
    const weeklyState = useSelector((state: AppState) => state.schedule)
    const groups = useSelector((state : AppState) => state.interface.groups)

    
    const [workoutGroups, setWorkoutGroups] = useState()
    const [filter, setFilter] = useState({} as Exercise)
    const [workoutGroupPage, setWorkoutGroupPage] = useState(1)
    const [page, setPage] = useState(1)

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
                    // Add element to destination
                    let day = idSplit[1].toLowerCase().trim()
                    let copyWeek = JSON.parse(JSON.stringify(weeklyState))
                    // day --> day, exercise --> day
                    if (source.droppableId.split(" ").length > 1) {
                        let sourceDay = source.droppableId.split(" ")[1].toLowerCase()
                        copyWeek[day]["exercises"] = [...copyWeek[day]["exercises"], copyWeek[sourceDay]["exercises"][source.index]]
                    }
                    else {
                        copyWeek[day]["exercises"] = [...copyWeek[day]["exercises"], JSON.parse(JSON.stringify(exercises[source.index]))]
                    }

                    // remove from day array
                    if (source.droppableId.split(" ").length > 1) {
                        let sourceDay = source.droppableId.split(" ")[1].toLowerCase()
                        copyWeek[sourceDay]["exercises"].splice(source.index, 1)
                    }

                    // setWeeklyState(copyWeek)
                    dispatch(setWeekly(copyWeek))

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
                        // setWeeklyState(copySourceWeek)
                        dispatch(setWeekly(copySourceWeek))
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
                            let sourceDay = source.droppableId.split(" ")[1].toLowerCase()
                            copyWeek[day]["groups"] = [...copyWeek[day]["groups"], copyWeek[sourceDay]["groups"][source.index]]
                        }
                        else {
                            copyWeek[day]["groups"] = [...copyWeek[day]["groups"], JSON.parse(JSON.stringify(groups[source.index]))]
                        }

                        // remove from day array
                        if (source.droppableId.split(" ").length > 1) {
                            let sourceDay = source.droppableId.split(" ")[1].toLowerCase()
                            copyWeek[sourceDay]["groups"].splice(source.index, 1)
                        }

                        // setWeeklyState(copyWeek)
                        dispatch(setWeekly(copyWeek))
                    }
                }
                else {
                    if (source.droppableId.split(" ").length > 1) {
                        let sourceDay = source.droppableId.split(" ")[1].toLowerCase()
                        let copyDayGroups = Array.from(weeklyState[sourceDay]["groups"])
                        copyDayGroups.splice(source.index, 1)
                        let copySourceWeek = JSON.parse(JSON.stringify(weeklyState))
                        copySourceWeek[sourceDay]["groups"] = copyDayGroups
                        // setWeeklyState(copySourceWeek)
                        dispatch(setWeekly(copySourceWeek))
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
                                // onChange={(e, v) => (v === null ? setFilter("") : setFilter(String(v)))}
                                renderInput={(props) => <TextField {...props} label={"Exercises"}></TextField>}
                                options={exercises}
                                getOptionLabel={(option) => option.exercise_name}
                                isOptionEqualToValue={(option, value) => option.exercise_name.toLowerCase().trim().includes(value.exercise_name.toLowerCase().trim())}
                            />
                            <Tooltip title={"Add Exercise"}>
                                <IconButton>
                                    <Add/>
                                </IconButton>
                            </Tooltip>
                        </Stack>
                        
                        <Droppable droppableId="exercises" direction="vertical"
                            renderClone={(provided, _, rubric) => (
                                <Typography textAlign={'center'} ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>{exercises[rubric.source.index].exercise_name}</Typography>
                            )}
                        
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
                                        exercises.slice((page - 1) * 6, Math.min(6 * page, exercises.length)).map((val, idx) => {
                                            return (
                                                <Draggable index={idx} key={idx} draggableId={"exercises " + val.exercise_name}>
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
                                                                <CardHeader title={<Typography textAlign={'center'}>{val.exercise_name}</Typography>}></CardHeader>
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
                                        width: '100%'
                                    }}
                                    count={Math.ceil(exercises.length / 6)} onChange={(_, v) => {setPage(v)}}
                                />
                        }
                    </Stack>
                    <Stack width={'30%'} rowGap={3}>
                        <Autocomplete
                            options={groups}
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
                                        groups.slice((workoutGroupPage - 1) * 6, Math.min(workoutGroupPage * 6, groups.length)).map((val, idx) => {
                                            return (
                                                <Draggable draggableId={"groups " + val} index={idx}>
                                                    {(provided) => (
                                                        <Grid item xs={12} key={idx} {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                                                            <Card sx={{borderRadius: 0}}>
                                                                <CardHeader title={<Typography textAlign={'center'}>{val}</Typography>}></CardHeader>
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
                            count={Math.ceil(groups.length / 6)} onChange={(_, v) => setWorkoutGroupPage(v)}
                        />
                    </Stack>
                </Stack>
            </DragDropContext>
        </Container>
    )
}