import { Autocomplete, Card, CardHeader, Container, Grid, Grid2, Pagination, Paper, Skeleton, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Weekly from "../components/Weekly.tsx";

export default function Exercises() {
    const [exercises, setExercises] = useState(
        [
            "Deadlift", "Bicep Curl", "Squat", "Bench", "Lat Pulldown",
        ]
    )
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState("")
    const [workoutGroups, setWorkoutGroups] = useState([
        "Abs", "Legs", "Chest", "Back", "Shoulders", "Biceps", "Cardio"
    ])
    const [workoutGroupPage, setWorkoutGroupPage] = useState(1)

    return (
        <Container maxWidth='xl' 
            sx={{
                height: '90vh',
                display: 'flex',
                p: 2.5,
                flexDirection: 'column'
            }}
        >
            {/* Weekly Schedule --> Droppable*/}
            <Stack flexDirection='row'
                sx={{
                    display: 'flex',
                    width: '100%',
                    height: '50%',
                    columnGap: 4
                }}
            >
                <Weekly width={"100%"} height={"100%"}></Weekly>
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
                    <Autocomplete
                        value={filter}
                        onChange={(e, v) => (v === null ? setFilter("") : setFilter(String(v)))}
                        renderInput={(props) => <TextField {...props} label={"Exercises"}></TextField>}
                        options={exercises}
                        getOptionLabel={(option) => option}
                        isOptionEqualToValue={(option, value) => option.toLowerCase().trim().includes(value.toLowerCase().trim())}
                        filterOptions={(options, state) => options.filter((option) => option.toLowerCase().trim().includes(state.inputValue.toLowerCase().trim()))}
                    />

                    <Grid
                        sx={{
                            borderRadius: 3,
                            display: 'flex',
                        }}
                        component={Paper}
                        elevation={5}
                        container
                    >
                        {
                            exercises.slice((page - 1) * 9, Math.min(9 * page, exercises.length)).filter((val) => (filter !== "" ? val === filter : val)).map((val, idx) => {
                                return (
                                    <Grid item xs={4} key={idx}>
                                        <Card sx={{borderRadius: 0}} elevation={1}>
                                            <CardHeader title={<Typography textAlign={'center'}>{val}</Typography>}></CardHeader>
                                        </Card>
                                    </Grid>
                                )
                            })
                        }
                        {
                            Math.min(9 * page, exercises.length) === exercises.length &&
                                Array.from({length: (9 * page) - exercises.length}).map((_, idx) => {
                                    return (
                                        <Grid item xs={4} key={idx}></Grid>
                                    )
                                })
                        }               
                    </Grid>
                    {
                        exercises.length > 0 && 
                            <Pagination
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignContent: 'center'
                                }}
                                count={Math.ceil(exercises.length / 9)} onChange={(_, v) => {console.log(v); setPage(v)}}
                            />
                    }
                </Stack>
                <Stack width={'20%'} rowGap={3}>
                    <Autocomplete
                        options={workoutGroups}
                        renderInput={(props) => <TextField {...props} label="Workout Group"></TextField>}
                    />

                    <Grid container
                        component={Paper}
                        elevation={10}
                    >
                        {
                            workoutGroups.slice((workoutGroupPage - 1) * 3, Math.min(workoutGroupPage * 3, workoutGroups.length)).map((val, idx) => {
                                return (
                                    <Grid item xs={12} key={idx}>
                                        <Card sx={{borderRadius: 0}}>
                                            <CardHeader title={<Typography textAlign={'center'}>{val}</Typography>}></CardHeader>
                                        </Card>
                                    </Grid>
                                )
                            })
                        }
                        {
                            Math.min(3 * workoutGroupPage, workoutGroups.length) === workoutGroups.length &&
                                Array.from({length: (3 * page) - workoutGroups.length}).map((_, idx) => {
                                    return (
                                        <Grid item xs={4} key={idx}>
                                            <Card>
                                                <CardHeader title={""}></CardHeader>
                                            </Card>
                                        </Grid>
                                    )
                                })
                        }              
                    </Grid>
                    <Pagination
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignContent: 'center'
                        }}
                        count={Math.ceil(workoutGroups.length / 3)} onChange={(_, v) => setWorkoutGroupPage(v)}
                    />
                </Stack>
            </Stack>
        </Container>
    )
}