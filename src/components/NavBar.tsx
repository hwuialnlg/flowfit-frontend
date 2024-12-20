import React, { useState } from "react";
import { AppBar, Button, Divider, IconButton, Menu, MenuItem, Stack, Toolbar, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { Person } from "@mui/icons-material";
import { setIsLoggedIn } from "../redux/slicers/userSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../redux/store";

export default function NavBar() {
    const navigate = useNavigate();
    const [pages, setPages] = useState(["Dashboard", "Exercises", "Progress"])
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>()

    const handleClose = () => {
        setOpen(!open)
        setAnchorEl(null)
    }
    
    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state: AppState) => state.user.isLoggedIn)

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
                    
                    {
                        isLoggedIn &&
                            <Divider orientation='vertical' flexItem></Divider>
                    }

                    {
                        isLoggedIn &&
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
                    
                {
                    isLoggedIn && 
                        <IconButton edge='end'
                            onClick={(e) =>  {setOpen(true); setAnchorEl(e.currentTarget)}}
                        >
                            <Person/>
                        </IconButton>
                }

                <Menu
                    open={open}
                    onClose={() => handleClose()}
                    anchorEl={anchorEl}
                >
                    <MenuItem onClick={() => {handleClose(); navigate('/profile')}}>Profile</MenuItem>
                    <MenuItem 
                        onClick={() => {
                            localStorage.removeItem("jwt")
                            dispatch(setIsLoggedIn(false))
                            navigate('/login')
                        }}
                    >Sign out</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    )
}