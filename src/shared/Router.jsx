import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GoogleLogin from '../components/login/GoogleLogin';
import KakaoLogin from '../components/login/KakaoLogin';
import Layout from '../layout/Layout';
import LoginPage from '../pages/LoginPage';
import MbtiCommunityPage from '../pages/MbtiCommunityPage';
import MbtiMatchingPage from '../pages/MbtiMatchingPage';
import ProfilePage from '../pages/ProfilePage';
import PwChangePage from '../pages/PwChangePage';
import SignupPage from '../pages/SignupPage';
import HomePage from './../pages/HomePage';
import MbtiMeetingPage from './../pages/MbtiMeetingPage';
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
                        <Route path="/pwchange" element={<PwChangePage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/mbti/test" element={<MbtiTestPage />} />
                        <Route path="/mbti/matching" element={<MbtiMatchingPage />} />
                        <Route path="/mbti/meeting" element={<MbtiMeetingPage />} />
                        <Route path="/mbti/community" element={<MbtiCommunityPage />} />
                        <Route path="/kakaologin" element={<KakaoLogin />} />
                        <Route path="/googlelogin" element={<GoogleLogin />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default Router;
