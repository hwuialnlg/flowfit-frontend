import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Card, CardHeader, CardContent, Grid, Stack, Typography, Button, Divider } from "@mui/material";
import React from "react";

export default function Daily(daily : Daily) {
    return (
        <Card sx={{flex: 1, height: '80%', overflowY: 'auto'}}>
            <CardHeader title={daily.day}
                sx={{
                    backgroundColor: "#4BC5EB"
                }}
            />
            <CardContent>
                {/* Accepts only interfaces of type WorkoutGroup */}
                <Droppable droppableId={"groups " + daily.day}>
                    {(provided) => (
                        <Grid container {...provided.droppableProps}>
                            {
                                daily.groups?.map((val, idx) => (
                                    <Draggable key={idx} draggableId={"groups " + val.name} index={idx}>
                                        {(provided) => (
                                            <Grid item xs={12} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <Stack flexDirection='row'>
                                                    <Typography>{val.name}</Typography>
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
                    ((daily.groups && daily.exercises) && daily.groups?.length > 0 && daily.exercises?.length > 0) &&
                        <Divider orientation='horizontal' flexItem></Divider>
                }

                {/* Accepts only interfaces of type Exercise */}
                <Droppable droppableId={"exercises " + daily.day}>
                    {(provided) => (
                        <Grid container {...provided.droppableProps}>
                            {
                                daily.exercises?.map((val, idx) => (
                                    <Draggable key={idx} draggableId={"exercises " + val.name} index={idx}>
                                        {(provided) => (
                                            <Grid item xs={12} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <Stack flexDirection='row'>
                                                    <Typography>{val.name}</Typography>
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
}