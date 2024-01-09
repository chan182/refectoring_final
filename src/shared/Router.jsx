import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../layout/Layout';
import LoginPage from '../pages/LoginPage';
import ProfilePage from '../pages/ProfilePage';
import SignupPage from '../pages/SignupPage';
import HomePage from './../pages/HomePage';
import MbtiTestPage from './../pages/MbtiTestPage';
import GlobalColor from './../style/GlobalColor';
import GlobalStyle from './../style/GlobalStyle';


const Router = () => {
    return (
        <>
            <GlobalStyle />
            <GlobalColor />
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/mbti/test" element={<MbtiTestPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default Router;
