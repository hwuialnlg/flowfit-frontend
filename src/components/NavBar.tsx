import React, { useState } from "react";
import Box from '@mui/material/Box';
import { AppBar, Divider, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { Person } from "@mui/icons-material"

export default function NavBar() {
    const navigate = useNavigate();
    const [pages, setPages] = useState(["Dashboard", "Exercises", "Progress"])
    return (
        <AppBar position={'static'}>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Stack flexDirection={'row'}  sx={{display: 'flex'}} columnGap={2}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        onClick={() => navigate("/")}
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        FlowFit
                    </Typography>
                    
                    <Divider orientation='vertical' flexItem></Divider>

                    {
                        pages.map((page) => {
                            return (
                                <Typography onClick={() => navigate(`/${page.toLowerCase()}`)} alignContent={'center'} textAlign={'center'}>{page}</Typography>
                            )
                        })
                    }
                </Stack>
                <IconButton edge='end'
                    onClick={() => navigate("/login")}
                >
                    <Person/>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}