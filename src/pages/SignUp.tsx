// INSPIRATIOn https://dribbble.com/shots/21397940-Login-Screens-AlignUI-Design-System
import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { Container, Stack } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setIsLoggedIn } from "../redux/slicers/userSlice.ts";

export default function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    interface initialUser {
        email: string,
        password: string,
        verifyPassword: string,
        firstName: string,
        lastName: string,
        dob: string,
    }

    const initialUserState = {
        email: "",
        password: "",
        verifyPassword: "",
        firstName: "",
        lastName: "",
        dob: "",
    }

    const [userState, setUserState] = useState<initialUser>(initialUserState)
    const [passwordError, setPasswordError] = useState(false)
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        if ((userState?.password && userState?.verifyPassword) && userState?.password?.length > 0 && userState?.verifyPassword?.length > 0 && userState?.password !== userState?.verifyPassword) {
            setPasswordError(true)
        }
        else {
            setPasswordError(false)
        }

    }, [userState?.password, userState?.verifyPassword])

    useEffect(() => {
        validateUserState()
    }, [userState])

    const validateUserState = () => {
        setDisabled(true)
        if (userState?.email && userState?.firstName && userState?.lastName && userState?.dob) {
            if (userState?.password && userState?.verifyPassword && userState.password.length > 0 && userState?.password === userState?.verifyPassword) {
                setDisabled(false)
            }
        }
    }

    const createAccount = () => {
        let reformattedDate = userState?.dob.split("-")
        let entry = reformattedDate[1] + "/" + reformattedDate[2] + "/" + reformattedDate[0]
        var data = {
            name: userState?.firstName.trim() + " " + userState?.lastName.trim(),
            email: userState?.email,
            password: userState?.password,
            dob: entry
        }
        axios.post("http://localhost:8080/createUser", data).then((res) => {
            dispatch(setIsLoggedIn(true))
            localStorage.setItem("jwt", res.data["access_token"])
            navigate("/")
        }).catch((err) => {
            console.log("Failed to create account", err)
        })
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
                    <Typography variant='h5'>Sign Up</Typography>

                    <Stack sx={{width: '100%', rowGap: 1.5}}>
                        <TextField fullWidth label="E-Mail" 
                            onChange={(e) => setUserState(prevState => ({
                                ...prevState,
                                email: e.target.value
                            }))}
                        ></TextField>
                        <TextField error={passwordError} fullWidth label="Password" type="password" 
                            onChange={(e) => setUserState(prevUser => ({
                                ...prevUser,
                                password: e.target.value
                            }))}
                        ></TextField>
                        <TextField error={passwordError} fullWidth label="Confirm Password" type="password" 
                            onChange={(e) => setUserState(prevUser => ({
                                ...prevUser,
                                verifyPassword: e.target.value
                            }))}
                        ></TextField>
                    </Stack>

                    <Stack flexDirection={'row'} columnGap={1}>
                        <TextField label='First Name'
                            onChange={(e) => setUserState(prevUser => ({
                                ...prevUser,
                                firstName: e.target.value
                            }))}
                        ></TextField>
                        <TextField label='Last Name'
                            onChange={(e) => setUserState(prevUser => ({
                                ...prevUser,
                                lastName: e.target.value
                            }))}
                        ></TextField>
                    </Stack>

                    <TextField fullWidth type='date' onChange={(e) => setUserState(prevState => ({...prevState, dob: e.target.value}))}></TextField>
                    
                    <Button disabled={disabled} fullWidth variant="contained" onClick={() => createAccount()}>Create Account</Button>
                </CardContent>
            </Card>
        </Container>
    )
}