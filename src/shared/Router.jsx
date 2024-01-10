import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../layout/Layout';
import LoginPage from '../pages/LoginPage';
import ProfilePage from '../pages/ProfilePage';
import SignupPage from '../pages/SignupPage';
import HomePage from './../pages/HomePage';
import GlobalColor from './../style/GlobalColor';
import GlobalStyle from './../style/GlobalStyle';
import MbtiTestPage from './../pages/MbtiTestPage';
import MbtiMatchingPage from '../pages/MbtiMatchingPage';
import MbtiMeetingPage from './../pages/MbtiMeetingPage';
import MbtiCommunityPage from '../pages/MbtiCommunityPage';

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
                        <Route path="/mbti/matching" element={<MbtiMatchingPage />} />
                        <Route path="/mbti/meeting" element={<MbtiMeetingPage />} />
                        <Route path="/mbti/community" element={<MbtiCommunityPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default Router;
