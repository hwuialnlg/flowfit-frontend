import { Edit } from "@mui/icons-material";
import { Avatar, Box, Card, CardContent, Container, IconButton, InputAdornment, Skeleton, Stack, TextField, Typography } from "@mui/material";
import React from "react";

export default function Profile() {
    return (
        <Container maxWidth='xl' sx={{height: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Card 
                sx={{
                    height: '80%',
                    width: '30%',
                    borderRadius: 4,
                    display: 'flex',
                }}
                elevation={12}
            >
                <Stack
                    sx={{
                        flexDirection: 'column',
                        display: 'flex',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <Box
                        sx={{
                            bgcolor: "#3f51b5",
                            width: '100%',
                            height: '25%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            rowGap: 2,
                            flex: 1
                        }}
                    >
                        <Avatar sx={{height: '50%', width: '50%'}}></Avatar>
                    </Box>
                    
                    <Box
                        sx={{
                            display: 'flex',
                            flex: 1,
                            flexDirection: 'column',
                            p: 2,
                            margin: 1,
                        }}
                    >
                        <Typography>First Name</Typography>
                        <TextField slotProps={{input: {endAdornment: (<InputAdornment position='end'><IconButton><Edit/></IconButton></InputAdornment>)}}} label="Their First Name" disabled></TextField>

                        <Typography>Last Name</Typography>
                        <TextField label="Their Last Name" disabled></TextField>

                        <Typography>Age</Typography>
                        <TextField label="Their Age" disabled></TextField>

                        <Typography>Email</Typography>
                        <TextField label="Their Email" disabled></TextField>

                        <Typography>Password</Typography>
                        <TextField label="******" disabled></TextField>

                        <Typography>Phone Number</Typography>
                        <TextField label="Phone Number" disabled></TextField>
                    </Box>
                </Stack>
            </Card>
        </Container>
    )
}