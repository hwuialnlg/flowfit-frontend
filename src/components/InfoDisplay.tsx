import { Card, Typography, CardContent, CardHeader } from "@mui/material";
import React from "react";

interface GraphProps {
    name: string,
    color?: string,
}

export default function InfoDisplay(gp : GraphProps) {
    return (
        <Card 
            sx={{
                height: '25%',
                borderRadius: 5,
                backgroundColor: gp.color
            }}
            elevation={12}
        >
            <br/>
            <CardHeader title={<Typography textAlign={"left"}>{gp.name} Progress</Typography>}></CardHeader>
            <CardContent>
                <Typography>Big Number</Typography>
                <Typography>Percentage Change</Typography>
            </CardContent>
        </Card>
    )
}