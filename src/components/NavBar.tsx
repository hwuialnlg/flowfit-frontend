import React from "react";
import Box from '@mui/material/Box';
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { Person } from "@mui/icons-material"

export default function NavBar() {
    const navigate = useNavigate();
    return (
        <AppBar position={'static'}>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
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
                <IconButton edge='end'
                    onClick={() => navigate("/login")}
                >
                    <Person/>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}