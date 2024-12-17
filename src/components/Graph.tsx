import { Card, Typography, CardContent } from "@mui/material";
import React from "react";

interface GraphProps {
    name: string,
}

export default function Graph(gp : GraphProps) {
    return (
        <Card sx={{height: '33%'}}>
            <br/>
            <Typography textAlign={"center"}>{gp.name} Progress</Typography>
            <CardContent>
                {/* Graph */}
            </CardContent>
        </Card>
    )
}