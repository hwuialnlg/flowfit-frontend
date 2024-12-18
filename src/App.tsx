import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './pages/Home.tsx';
import NavBar from './components/NavBar.tsx';
import Login from './pages/Login.tsx';
import Exercises from './pages/Exercises.tsx'
import Progress from './pages/Progress.tsx';

export default function App() {
    return (
        <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/dashboard" element={<Home />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/exercises" element={<Exercises />}/>
                <Route path="/progress" element={<Progress />}/>
            </Routes>
        </BrowserRouter>
    )
}