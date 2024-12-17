// INSPIRATIOn https://dribbble.com/shots/21397940-Login-Screens-AlignUI-Design-System
import { Apple, Google, Surfing } from "@mui/icons-material";
import { Button, Card, CardContent, Checkbox, Divider, FormControlLabel, TextField, Typography } from "@mui/material";
import { Container, Stack } from "@mui/system";
import React from "react";

export default function Login() {
    return (
        <Container maxWidth='xl' sx={{height: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Card sx={{
                minHeight: '50%',
                minWidth: '30%',
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
                    <Typography variant='h5'>Sign In</Typography>

                    <Stack flexDirection={"row"} columnGap={1.5} width='100%'>
                        <Button fullWidth variant="outlined"><Apple/></Button>
                        <Button fullWidth variant="outlined"><Google/></Button>
                    </Stack>
                    
                    <Divider flexItem orientation='horizontal'>Or</Divider>

                    <Stack sx={{width: '100%', rowGap: 1.5}}>
                        <TextField fullWidth label="E-Mail"></TextField>
                        <TextField fullWidth label="Password" type="password"></TextField>
                    </Stack>

                    <Stack 
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%'
                        }} flexDirection={'row'}
                    >
                        <FormControlLabel control={<Checkbox/>} label="Remember Me" />
                        <a href={""}><Typography textAlign={'center'}>Forgot password?</Typography></a>
                    </Stack>

                    <Button fullWidth variant="contained">Sign in</Button>

                    <Typography>Don't have an account yet? {<a href={""}>Sign up</a>}</Typography>
                </CardContent>
            </Card>
        </Container>
    )
}