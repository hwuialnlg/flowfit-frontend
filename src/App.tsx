import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './pages/Home.tsx';
import NavBar from './components/NavBar.tsx';
import Login from './pages/Login.tsx';
import Exercises from './pages/Exercises.tsx'
import Progress from './pages/Progress.tsx';
import Profile from './pages/Profile.tsx';

export default function App() {

    useEffect(() => {
        // LOAD UP USER STATES AND DATA, PASS WITH CONTEXT
    }, [])


    return (
        <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/dashboard" element={<Home />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/profile" element={<Profile />}/>
                <Route path="/exercises" element={<Exercises />}/>
                <Route path="/progress" element={<Progress />}/>
            </Routes>
        </BrowserRouter>
    )
}