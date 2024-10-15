import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Chatbot from '../components/ChatBot/ChatBot';
import Profile from '../components/Profile/Profile';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';

const AppRoutes = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            if (userProfile) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, [userProfile]);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Chatbot userProfile={userProfile} />} />
                <Route path="/profile" element={isAuthenticated ? <Profile userProfile={userProfile} /> : <Navigate to="/login" />} />
                <Route path="/login" element={<Login setUserProfile={setUserProfile} />} />
                <Route path="/register" element={<Register setUserProfile={setUserProfile} />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;