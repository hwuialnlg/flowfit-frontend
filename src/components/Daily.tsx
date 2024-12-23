import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Cancel } from "@mui/icons-material";
import { Card, CardHeader, CardContent, Grid, Stack, Typography, Button, Divider, Box, IconButton } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../redux/store";
import { setWeekly } from "../redux/slicers/scheduleSlice.ts";
import axios from "axios";

interface DailyProps {
    day: string
}

export default function Daily({day} : DailyProps) {
    const dispatch = useDispatch()
    const daily = useSelector((state: AppState) => state.schedule[day.toLowerCase()])
    const weekly = useSelector((state: AppState) => state.schedule)

    const removeItem = (idx, type) => {
        let copyWeek = JSON.parse(JSON.stringify(weekly))
        let removed;
        if (type === "exercises") {
            removed = copyWeek[day.toLowerCase()]["exercises"].splice(idx, 1)
        }
        else {
            removed = copyWeek[day.toLowerCase()]["groups"].splice(idx, 1)
        }
        console.log(removed)
        var data = {
            day: day.toLowerCase(),
            exercise_id: type === "exercises" ? removed[0].id : null,
            group_id: type === "exercises" ? null : removed[0].id
        }

        axios.post(`http://localhost:8080/remove${(type === "exercises" ? "Exercise" : "Group")}FromDaily`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`
                }
            }
        ).then((res) => {
            dispatch(setWeekly(copyWeek))
        }).catch((err) => {
            console.log(err)
        })
    }

    const capitalize = (word: string) => {
        let wordArr = word.split(" ")
        for (let i = 0; i < wordArr.length; i++) {
            let wordCopy = wordArr[i].slice()
            wordArr[i] = wordCopy[0].toUpperCase() + wordCopy.substring(1)
        }
        return wordArr.join(" ").trim()
    }

    return (
        <Card sx={{display: 'flex', flexDirection: 'column', flex: 1, height: '80%'}}>
            <CardHeader title={<Typography textAlign={'center'}>{day}</Typography>}
                sx={{
                    backgroundColor: "#4BC5EB"
                }}
            />
                {/* Accepts only interfaces of type WorkoutGroup */}
                <Droppable droppableId={"groups " + day.toLowerCase()}>
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
                                        <Draggable key={idx} draggableId={"groups " + val + day} index={idx}>
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
                <Droppable droppableId={"exercises " + day.toLowerCase()}>
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
                                        <Draggable key={idx} draggableId={"exercises " + val.exercise_id + day} index={idx}>
                                            {(provided) => (
                                                <Grid item xs={12} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    <Stack flexDirection='row' sx={{display: "flex", alignItems: 'center'}}>
                                                        <Typography textAlign={'left'} flex={1}>{capitalize(val.exercise_name)}</Typography>
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