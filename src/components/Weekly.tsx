import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

interface WeeklyProps {
    width: string,
    height: string,
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
                                <Typography>Data Stuff</Typography>
                            </CardContent>
                        </Card>
                    )
                })
            }
        </Box>
    )
}