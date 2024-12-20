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
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoggedIn } from './redux/slicers/userSlice.ts';
import { AppState } from './redux/store.ts';

export default function App() {
    const isLoggedIn = useSelector((state: AppState) => state.user.isLoggedIn)

    useEffect(() => {
        // LOAD UP USER STATES AND DATA, PASS WITH CONTEXT
    }, [])

    return (
        <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route path="/" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Home /></ProtectedRoute>}/>
                <Route path="/dashboard" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Home /></ProtectedRoute>}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/profile" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Profile /></ProtectedRoute>}/>
                <Route path="/exercises" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Exercises /></ProtectedRoute>}/>
                <Route path="/progress" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Progress /></ProtectedRoute>}/>
            </Routes>
        </BrowserRouter>
    )
}