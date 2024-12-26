import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './pages/Home.tsx';
import NavBar from './components/NavBar.tsx';
import Login from './pages/Login.tsx';
import Exercises from './pages/Exercises.tsx';
import Progress from './pages/Progress.tsx';
import Profile from './pages/Profile.tsx';
import ProtectedRoute from './pages/ProtectedRoute.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from './redux/store.ts';
import axios from 'axios';
import { setWeekly } from './redux/slicers/scheduleSlice.ts';
import { setExercises } from './redux/slicers/userSlice.ts';
import { setGroups } from './redux/slicers/userSlice.ts';
import SignUp from './pages/SignUp.tsx';
import ForgotPassword from './pages/ForgotPassword.tsx';

export default function App() {
    const isLoggedIn = useSelector((state: AppState) => state.user.isLoggedIn)
    const dispatch = useDispatch()

    const getExercises = () => {
        axios.get("http://localhost:8080/exercises", 
            {
                headers: {Authorization: `Bearer ${localStorage.getItem("jwt")}`}
            }
        ).then((res) => {
            dispatch(setExercises(res.data["exercises"]))
        }).catch((err) => {
            console.log("App failed to grab exercises", err)
        })
    }

    const getGroups = () => {
        axios.get("http://localhost:8080/groups", 
            {
                headers: {Authorization: `Bearer ${localStorage.getItem("jwt")}`}
            }
        ).then((res) => {
            dispatch(setGroups(res.data["groups"]))
        }).catch((err) => {
            console.log("App failed to grab groups", err)
        })
    }

    const getWeekly = () => {
        axios.get("http://localhost:8080/weekly", 
            {
                headers: {Authorization: `Bearer ${localStorage.getItem("jwt")}`}
            }
        ).then((res) => {
            console.log(res.data)
            dispatch(setWeekly(res.data))
        }).catch((err) => {
            console.log("App failed to grab weekly schedule", err)
        })
    }

    const getUserProfileInfo = () => {

    }

    useEffect(() => {
        if (isLoggedIn) {
            getUserProfileInfo()
            getExercises()
            getWeekly()
            getGroups()
            // Get stats
        }
        // LOAD UP USER STATES AND DATA, PASS WITH CONTEXT
    }, [dispatch, isLoggedIn])

    return (
        <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route path="/" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Home /></ProtectedRoute>}/>
                <Route path="/dashboard" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Home /></ProtectedRoute>}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/signup" element={<SignUp />}/>
                <Route path="/forgotpassword" element={<ForgotPassword />}/>
                <Route path="/profile" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Profile /></ProtectedRoute>}/>
                <Route path="/exercises" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Exercises /></ProtectedRoute>}/>
                <Route path="/progress" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Progress /></ProtectedRoute>}/>
            </Routes>
        </BrowserRouter>
    )
}