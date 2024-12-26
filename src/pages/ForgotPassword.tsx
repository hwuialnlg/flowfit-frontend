// INSPIRATIOn https://dribbble.com/shots/21397940-Login-Screens-AlignUI-Design-System
import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

export default function ForgotPassword() {
    return (
        <Container maxWidth='xl' sx={{height: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Card sx={{
                // minHeight: '50%',
                // minWidth: '30%',
                borderRadius: 4
            }}
            elevation={12}
            >
                <CardContent sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyItems: "center",
                    alignItems: "center",
                    height: '100%',
                    rowGap: 1.5
                }}
                >
                    <Typography variant='h5'>Recover Password</Typography>

                    <TextField fullWidth label="E-Mail" ></TextField>

                    <Button disabled={true} fullWidth variant="contained">Send Recovery Code</Button>
                </CardContent>
            </Card>
        </Container>
    )
}