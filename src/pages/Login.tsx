// INSPIRATIOn https://dribbble.com/shots/21397940-Login-Screens-AlignUI-Design-System
import { Apple, Google } from "@mui/icons-material";
import { Button, Card, CardContent, Checkbox, Divider, FormControlLabel, TextField, Typography } from "@mui/material";
import { Container, Stack } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "../redux/slicers/userSlice.ts";
import { useNavigate } from "react-router";

export default function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const cleanUp = () => {
        setEmail("")
        setPassword("")
    }

    const login = () => {
        const form = {"username": email, "password": password}
        const formEncoded = new URLSearchParams(form).toString()
        
        axios.post("http://localhost:8080/token", formEncoded, 
            {
                headers: {"Content-Type": "application/x-www-form-urlencoded"}
            }
        ).then((res) => {
            dispatch(setIsLoggedIn(true))
            localStorage.setItem("jwt", res.data["access_token"])
            navigate('/dashboard')
        }).catch((err) => {
            // create logger
            console.log(err)
        }).finally(() => {
            cleanUp()
        })
    }

    useEffect(() => {
        // LOAD UP USER STATES AND DATA, PASS WITH CONTEXT
        checkToken()
    }, [])

    const checkToken = () => {
        let token = localStorage.getItem("jwt")
        if (token) {
            axios.post("http://localhost:8080/validateToken?token=" + token).then((res) => {
                dispatch(setIsLoggedIn(true))
                navigate("/")
            }).catch((err) => {
                console.log(err)
            })
        }
    }

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
                        <TextField fullWidth label="E-Mail" onChange={(e) => setEmail(e.target.value)}></TextField>
                        <TextField fullWidth label="Password" type="password" onChange={(e) => setPassword(e.target.value)}></TextField>
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
                        <a href={"/forgotpassword"}><Typography textAlign={'center'}>Forgot password?</Typography></a>
                    </Stack>

                    <Button fullWidth variant="contained" onClick={() => login()}>Sign in</Button>

                    <Typography>Don't have an account yet? {<a href={"/signup"}>Sign up</a>}</Typography>
                </CardContent>
            </Card>
        </Container>
    )
}