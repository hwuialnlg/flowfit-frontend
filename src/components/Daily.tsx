import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Cancel } from "@mui/icons-material";
import { Card, CardHeader, CardContent, Grid, Stack, Typography, Button, Divider, Box, IconButton } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../redux/store";
import { setWeekly } from "../redux/slicers/scheduleSlice";

interface DailyProps {
    day: string
}

export default function Daily({day} : DailyProps) {
    const dispatch = useDispatch()
    const daily = useSelector((state: AppState) => state.schedule[day])


    const removeItem = (idx, type) => {
        let copyWeek = JSON.parse(JSON.stringify(daily.state))
        if (type === "exercises") {
            copyWeek[daily.day.toLowerCase()]["exercises"].splice(idx, 1)
        }
        else {
            copyWeek[daily.day.toLowerCase()]["groups"].splice(idx, 1)
        }

        dispatch(setWeekly(copyWeek))
    }


    return (
        <Card sx={{display: 'flex', flexDirection: 'column', flex: 1, height: '80%'}}>
            <CardHeader title={<Typography textAlign={'center'}>{daily.day}</Typography>}
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
                                        <Draggable key={idx} draggableId={"groups " + val + daily.day} index={idx}>
                                            {(provided) => (
                                                <Grid item xs={12} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    <Stack flexDirection='row' sx={{display: "flex", alignItems: 'center'}}>
                                                        <Typography flex={1} textAlign={'left'}>{val}</Typography>
                                                        <IconButton onClick={() => removeItem(idx, "groups")} color="error"><Cancel/></IconButton>
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
                                                        <IconButton color="error" onClick={() => removeItem(idx, "exercises")}><Cancel/></IconButton>
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