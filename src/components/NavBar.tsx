import React, { useState } from "react";
import Box from '@mui/material/Box';
import { AppBar, Button, Divider, IconButton, Menu, MenuItem, Stack, Toolbar, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { Person } from "@mui/icons-material"

export default function NavBar() {
    const navigate = useNavigate();
    const location = useLocation()
    const [pages, setPages] = useState(["Dashboard", "Exercises", "Progress"])
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>()

    const handleClose = () => {
        setOpen(!open)
        setAnchorEl(null)
    }

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
                                <Typography 
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: '#1B70C9',
                                        },
                                    }} 
                                    onClick={() => navigate(`/${page.toLowerCase()}`)} 
                                    alignContent={'center'} 
                                    textAlign={'center'}
                                >{page}
                                </Typography>
                            )
                        })
                    }
                </Stack>


                <Stack
                    sx={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}
                >
                    <Button variant='contained' onClick={() => navigate("/login")}>
                        Login
                    </Button>
                    
                    <IconButton edge='end'
                        onClick={(e) =>  {setOpen(true); setAnchorEl(e.currentTarget)}}
                    >
                        <Person/>
                    </IconButton>
                </Stack>

                <Menu
                    open={open}
                    onClose={() => handleClose()}
                    anchorEl={anchorEl}
                >
                    <MenuItem onClick={() => {handleClose(); navigate('/profile')}}>Profile</MenuItem>
                    <MenuItem>Sign out</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    )
}