import { Autocomplete, Card, CardHeader, Container, Grid, Grid2, IconButton, Pagination, Paper, Skeleton, Stack, TextField, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import Weekly from "../components/Weekly.tsx";
import { Add } from "@mui/icons-material";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import Daily from "../components/Daily.tsx";

export default function Exercises() {
    // Replace exercise type with an interface --> type: exercise, name: exercise_name
    const initialWeek = {
        monday: {
            day: "Monday",
            groups: [],
            exercises: []
        },
        tuesday: {
            day: "Tuesday",
            groups: [],
            exercises: []
        },
        thursday: {
            day: "Thursday",
            groups: [],
            exercises: []
        },
        wednesday: {
            day: "Wednesday",
            groups: [],
            exercises: []
        },
        friday: {
            day: "Friday",
            groups: [],
            exercises: []
        },
        saturday: {
            day: "Saturday",
            groups: [],
            exercises: []
        },
        sunday: {
            day: "Sunday",
            groups: [],
            exercises: []
        },
    }
    const [exercises, setExercises] = useState(Array<Exercise>())
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState({} as Exercise)
    const [workoutGroups, setWorkoutGroups] = useState(Array<WorkoutGroup>())
    const [workoutGroupPage, setWorkoutGroupPage] = useState(1)
    const [weeklyState, setWeeklyState] = useState(initialWeek)


    const handleDragEnd = (result) => {
        const {source, destination} = result

        if (!destination) return;
        // ONLY EVER REMOVE FROM THE DAYS BECAUSE NEED EXERCISES TO REMAIN SO CAN BE DRAGGED INTO OTHER DAYS
        if (source.draggableId.split(" ")[0] === destination.droppableId.split(" ")[0]) {
            if (destination.droppableId === "exercises") {
                const idSplit = destination.droppableId.split(" ")
                if (idSplit.length > 1) {
                    // Add element to destination
                    let day = idSplit[1].toLowerCase().trim()
                    let copyStateDay = {...weeklyState[day]}
                    // day --> day, exercise --> day
                    if (source.droppableId.split(" ").length > 0) {
                        let sourceDay = source.droppableId.split(" ")[1].toLowerCase()
                        copyStateDay["exercises"] = [...copyStateDay["exercises"], {...weeklyState[sourceDay]["exercises"][source.index]}]
                    }
                    else {
                        copyStateDay["exercises"] = [...copyStateDay["exercises"], {...exercises[source.index]}]
                    }
                    let weeklyStateCopy = {...weeklyState}
                    weeklyStateCopy[day] = copyStateDay
                    setWeeklyState(weeklyStateCopy)

                    // remove from day array
                    if (source.droppableId.split(" ").length > 0) {
                        let sourceDay = source.droppableId.split(" ")[1].toLowerCase()
                        let copyDayExercise = Array.from(weeklyState[sourceDay]["exercises"])
                        copyDayExercise.splice(source.index, 1)
                        let copySourceWeek = {...weeklyState}
                        copySourceWeek[sourceDay]["exercises"] = copyDayExercise
                        setWeeklyState(copySourceWeek)
                    }

                }
                else {
                    // day --> exercise, exercise --> exercise
                    if (source.droppableId.split(" ").length > 0) {
                        // just remove from day
                        let sourceDay = source.droppableId.split(" ")[1].toLowerCase()
                        let copyDayExercise = Array.from(weeklyState[sourceDay]["exercises"])
                        copyDayExercise.splice(source.index, 1)
                        let copySourceWeek = {...weeklyState}
                        copySourceWeek[sourceDay]["exercises"] = copyDayExercise
                        setWeeklyState(copySourceWeek)
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
                }
                else {
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
                                <Daily {...weeklyState[day.toLowerCase()]}></Daily>
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
                            width: '80%',
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
                                getOptionLabel={(option) => option.name}
                                isOptionEqualToValue={(option, value) => option.name.toLowerCase().trim().includes(value.name.toLowerCase().trim())}
                            />
                            <Tooltip title={"Add Exercise"}>
                                <IconButton>
                                    <Add/>
                                </IconButton>
                            </Tooltip>
                        </Stack>
                        
                        <Droppable droppableId="exercises">
                            {(provided) => (
                                <Grid
                                    sx={{
                                        borderRadius: 3,
                                        display: 'flex',
                                    }}
                                    component={Paper}
                                    elevation={5}
                                    container
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    
                                    {
                                        exercises.slice((page - 1) * 6, Math.min(6 * page, exercises.length)).filter((val) => (filter.name !== "" ? val.name === filter.name : val)).map((val, idx) => {
                                            return (
                                                <Draggable index={idx} key={"exercises " + val} draggableId={"exercises " + val}>
                                                    {(provided) => (
                                                        <Grid item xs={4} key={idx} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                            <Card sx={{borderRadius: 0}} elevation={1}>
                                                                <CardHeader title={<Typography textAlign={'center'}>{val.name}</Typography>}></CardHeader>
                                                            </Card>
                                                        </Grid>
                                                    )}
                                                </Draggable>
                                            )
                                        })
                                    }
                                    {
                                        Math.min(6 * page, exercises.length) === exercises.length &&
                                            Array.from({length: Math.abs((6 * page) - exercises.length)}).map((_, idx) => {
                                                return (
                                                    <Grid item xs={4} key={idx}><></></Grid>
                                                )
                                            })
                                    }               
                                    {provided.placeholder}
                                </Grid>
                            )}
                        </Droppable>
                    </Stack>
                    <Stack width={'20%'} rowGap={3}>
                        <Autocomplete
                            options={workoutGroups}
                            renderInput={(props) => <TextField {...props} label="Workout Group"></TextField>}
                        />
                        <Droppable droppableId={"groups"}>
                            {(provided) => (
                                <Grid container
                                    component={Paper}
                                    elevation={10}
                                >
                                    {
                                        workoutGroups.slice((workoutGroupPage - 1) * 2, Math.min(workoutGroupPage * 2, workoutGroups.length)).map((val, idx) => {
                                            return (
                                                <Draggable draggableId={"groups " + val} index={idx}>
                                                    {(provided) => (
                                                        <Grid item xs={12} key={idx} {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                                                            <Card sx={{borderRadius: 0}}>
                                                                <CardHeader title={<Typography textAlign={'center'}>{val.name}</Typography>}></CardHeader>
                                                            </Card>
                                                        </Grid>
                                                    )}
                                                </Draggable>
                                            )
                                        })
                                    }
                                    {
                                        Math.min(2 * workoutGroupPage, workoutGroups.length) === workoutGroups.length &&
                                            Array.from({length: (2 * page) - workoutGroups.length}).map((_, idx) => {
                                                return (
                                                    <Grid item xs={4} key={idx}>
                                                        <Card>
                                                            <CardHeader title={""}></CardHeader>
                                                        </Card>
                                                    </Grid>
                                                )
                                            })
                                    }
                                    {provided.placeholder}
                                </Grid>
                            )}
                        </Droppable>
                    </Stack>
                </Stack>
                <Stack 
                    width="100%"
                    flexDirection={'row'}
                    display='flex'
                    mt={3}
                >
                    {
                        exercises.length > 0 && 
                            <Pagination
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignContent: 'center',
                                    width: '80%'
                                }}
                                count={Math.ceil(exercises.length / 9)} onChange={(_, v) => {console.log(v); setPage(v)}}
                            />
                    }
                    <Pagination
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignContent: 'center',
                            width: '20%',
                        }}
                        count={Math.ceil(workoutGroups.length / 3)} onChange={(_, v) => setWorkoutGroupPage(v)}
                    />
                </Stack>
            </DragDropContext>
        </Container>
    )
}