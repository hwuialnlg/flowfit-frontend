import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function Weekly() {
    return (
        <Box display="flex" flexDirection={"row"} sx={{width: '100%', height: '40%'}}>
            {
                ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((val) => {
                    return (
                        <Card sx={{flex: 1, height: '80%'}}>
                            <CardContent>
                                <Typography>{val}</Typography>
                            </CardContent>
                        </Card>
                    )
                })
            }
        </Box>
    )
}