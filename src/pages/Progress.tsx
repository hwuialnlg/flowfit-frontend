import { Autocomplete, Card, CardContent, CardHeader, Container, Grid, List, ListItem, Pagination, Paper, Skeleton, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

export default function Progress() {
    const [exercises, setExercises] = useState(Array<Exercise>())

    return (
        <Container
            maxWidth='xl'
            sx={{
                columnGap: 5,
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                height: '90vh',
                p: 1,
                mt: 2.5
            }}
        >
            <Stack
                sx={{
                    width: '20%',
                    height: 'calc(100vh - 200px)',
                    // height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Autocomplete
                    options={exercises}
                    renderInput={(props) => <TextField {...props} label="Exercise"></TextField>}
                    getOptionLabel={(option) => option.name}
                    sx={{
                        flex: 1
                    }}
                />

                {
                    exercises.map((val, idx) => {
                        return (
                            <Card 
                                sx={{
                                    borderRadius: 0,
                                    flex: 1,
                                    display: 'flex',
                                    alignContent: 'center'
                                }}
                            >
                                <CardHeader title={val.name}></CardHeader>
                            </Card>
                        )
                    })
                }
                {
                    exercises.length <= 0 &&
                        <Card 
                            sx={{
                                borderRadius: 0,
                                flex: 1,
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <CardContent>
                                <Typography textAlign={'left'}>No Exercises</Typography>
                            </CardContent>
                        </Card>
                }
                {
                    exercises.length <= 0 &&
                        Array.from({length: 7}).map((_, idx) => {
                            return (
                                <Card 
                                    sx={{
                                        borderRadius: 0,
                                        flex: 1
                                    }}
                                >
                                    <CardContent>
                                    </CardContent>
                                </Card>
                            )
                        })
                    
                }

                {
                    exercises.length > 0 &&
                        <Pagination
                            sx={{
                                width: '100%',
                                justifyContent: 'center',
                                alignContent: 'center'
                            }}
                            count={Math.ceil(exercises.length / 8)}
                        />
                }

            </Stack>

            <Stack
                sx={{
                    width: '75%',
                    height: 'calc(100vh - 200px)',
                }}
            >   
                <Card sx={{height: '100%'}}>
                    <CardHeader title={<Typography>Selected Exercise</Typography>}></CardHeader>
                    <CardContent>
                        <Typography>Enter data</Typography>
                        <Typography>View data points</Typography>
                    </CardContent>
                </Card>
            </Stack>
        </Container>
    )
}