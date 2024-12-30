import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Button, Card, CardContent, CardHeader, Checkbox, Divider, FormControlLabel, Grid, Stack, Typography, capitalize } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../redux/store";

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
                ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((val, idx) => {
                    return (
                        <Card key={idx} sx={{flex: 1, height: '100%', overflowY: 'auto'}}>
                            <CardHeader title={val}
                                sx={{
                                    backgroundColor: "#4BC5EB"
                                }}
                            />
                            <CardContent>
                                <DailyTracker dayName={val}></DailyTracker>
                            </CardContent>
                        </Card>
                    )
                })
            }
        </Box>
    )
}

interface DailyTrackerProps {
    dayName: string
}

function DailyTracker({dayName}: DailyTrackerProps) {
    const day = useSelector((state: AppState) => state.schedule[dayName.toLowerCase()])
    return (
        <>
            {
                day.exercises?.map((val, idx) => {
                    return (
                        <FormControlLabel key={idx} label={capitalize(val.exercise_name)} control={<Checkbox></Checkbox>}></FormControlLabel>
                    )
                })
            }
        </>
    )
}