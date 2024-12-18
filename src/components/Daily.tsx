import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Cancel } from "@mui/icons-material";
import { Card, CardHeader, CardContent, Grid, Stack, Typography, Button, Divider, Box, IconButton } from "@mui/material";
import React from "react";

export default function Daily(daily : Daily) {
    return (
        <Card sx={{display: 'flex', flexDirection: 'column', flex: 1, height: '80%'}}>
            <CardHeader title={daily.day}
                sx={{
                    backgroundColor: "#4BC5EB"
                }}
            />
                {/* Accepts only interfaces of type WorkoutGroup */}
                <Droppable droppableId={"groups " + daily.day.toLowerCase()}>
                    {(provided) => (
                        <CardContent
                            ref={provided.innerRef} 
                            {...provided.droppableProps}
                            sx={{
                                minHeight: '30%',
                                maxHeight: '30%',
                                overflowY: 'auto'
                            }}
                        >
                        
                            <Grid container>
                                {
                                    daily.groups?.map((val, idx) => (
                                        <Draggable key={idx} draggableId={"groups " + val.name + daily.day} index={idx}>
                                            {(provided) => (
                                                <Grid item xs={12} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    <Stack flexDirection='row' sx={{display: "flex", alignItems: 'center'}}>
                                                        <Typography flex={1} textAlign={'left'}>{val.name}</Typography>
                                                        <IconButton><Cancel/></IconButton>
                                                    </Stack>
                                                </Grid>
                                            )}
                                        </Draggable>
                                    ))
                                }
                                {provided.placeholder}
                            </Grid>
                        </CardContent>
                    )}
                </Droppable>

                <Divider orientation='horizontal' flexItem></Divider>

                {/* Accepts only interfaces of type Exercise */}
                <Droppable droppableId={"exercises " + daily.day.toLowerCase()}>
                    {(provided) => (
                        <CardContent
                            ref={provided.innerRef} {...provided.droppableProps}
                            sx={{
                                minHeight: '30%',
                                maxHeight: '30%',
                                overflowY: 'auto'
                            }}
                        >
                            <Grid container>
                                {
                                    daily.exercises?.map((val, idx) => (
                                        <Draggable key={idx} draggableId={"exercises " + val.name + daily.day} index={idx}>
                                            {(provided) => (
                                                <Grid item xs={12} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    <Stack flexDirection='row' sx={{display: "flex", alignItems: 'center'}}>
                                                        <Typography textAlign={'left'} flex={1}>{val.name}</Typography>
                                                        <IconButton><Cancel/></IconButton>
                                                    </Stack>
                                                </Grid>
                                            )}
                                        </Draggable>
                                    ))
                                }
                            </Grid>
                            {provided.placeholder}
                        </CardContent>
                    )}
                </Droppable>
        </Card>
    )
}