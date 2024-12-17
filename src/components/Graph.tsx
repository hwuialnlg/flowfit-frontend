import { Card, CardContent, CardHeader, Typography } from "@mui/material"
import React from "react"

export default function Graph() {
    return (
        <Card 
            sx={{
                height: '60%',
                width: '100%',
                borderRadius: 3,
            }}
            elevation={10}
        >
            <CardHeader title={<Typography>Overview</Typography>}></CardHeader>
            <CardContent>
                <Typography>Big Graph Goes Here with Buttons to Switch between Graphs</Typography>
            </CardContent>
        </Card>
    )
}