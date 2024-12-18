import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Button, Card, CardContent, CardHeader, Divider, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

interface WeeklyProps {
    width: string,
    height: string,
    groups?: Array<string>,
    exercises?: Array<string>,
}

export default function Weekly(weekly : WeeklyProps) {
    return (
        <Box display="flex" flexDirection={"row"} sx={{width: weekly.width, height: weekly.height}} columnGap={1.5}>
            {
                ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((val) => {
                    return (
                        <Card sx={{flex: 1, height: '80%', overflowY: 'auto'}}>
                            <CardHeader title={val}
                                sx={{
                                    backgroundColor: "#4BC5EB"
                                }}
                            />
                            <CardContent>
                                {/* Accepts only interfaces of type WorkoutGroup */}
                                <Droppable droppableId={"groups " + val + "XD"}>
                                    {(provided) => (
                                        <Grid container {...provided.droppableProps}>
                                            {
                                                weekly.groups?.map((val, idx) => (
                                                    <Draggable key={val + idx} draggableId={"groups " + val} index={idx}>
                                                        {(provided) => (
                                                            <Grid item xs={12} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                                <Stack flexDirection='row'>
                                                                    <Typography>{val}</Typography>
                                                                    <Button variant='contained'>Remove Item</Button>
                                                                </Stack>
                                                            </Grid>
                                                        )}
                                                    </Draggable>
                                                ))
                                            }
                                            {provided.placeholder}
                                        </Grid>
                                    )}
                                </Droppable>
                                {
                                    ((weekly.groups && weekly.exercises) && weekly.groups?.length > 0 && weekly.exercises?.length > 0) &&
                                        <Divider orientation='horizontal' flexItem></Divider>
                                }

                                {/* Accepts only interfaces of type Exercise */}
                                <Droppable droppableId={"exercises " + val + "XD"}>
                                    {(provided) => (
                                        <Grid container {...provided.droppableProps}>
                                            {
                                                weekly.exercises?.map((val, idx) => (
                                                    <Draggable key={val + idx} draggableId={"exercises " + val} index={idx}>
                                                        {(provided) => (
                                                            <Grid item xs={12} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                                <Stack flexDirection='row'>
                                                                    <Typography>{val}</Typography>
                                                                    <Button variant='contained'>Remove Item</Button>
                                                                </Stack>
                                                            </Grid>
                                                        )}
                                                    </Draggable>
                                                ))
                                            }
                                            {provided.placeholder}
                                        </Grid>
                                    )}
                                </Droppable>
                            </CardContent>
                        </Card>
                    )
                })
            }
        </Box>
    )
}