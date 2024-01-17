import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import KakaoLogin from '../components/login/KakaoLogin';
import CommunityWrite from '../components/mbti_community/CommunityWrite';
import { auth, db } from '../firebase/firebase.config';
import Layout from '../layout/Layout';
import LoginPage from '../pages/LoginPage';
import MbtiCommunityPage from '../pages/MbtiCommunityPage';
import MbtiMatchingPage from '../pages/MbtiMatchingPage';
import ProfilePage from '../pages/ProfilePage';
import PwChangePage from '../pages/PwChangePage';
import SignupPage from '../pages/SignupPage';
import { userAtom } from '../recoil/Atom';
import HomePage from './../pages/HomePage';
import MbtiMeetingPage from './../pages/MbtiMeetingPage';
import MbtiTestPage from './../pages/MbtiTestPage';
import GlobalColor from './../style/GlobalColor';
import GlobalStyle from './../style/GlobalStyle';

const Router = () => {
    const setUser = useSetRecoilState(userAtom);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                const docRef = doc(db, 'users', user.uid);

                // 데이터 가져오기
                getDoc(docRef).then((docSnapshot) => {
                    const data = docSnapshot.data();

                    setUser({ uid: user.uid, ...data });
                });
                console.log('Router.useEffect 실행 ==>', user);
            } else {
                setUser(null);
            }
        });
    }, [setUser]);

    return (
        <>
            <GlobalStyle />
            <GlobalColor />
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/kakaologin" element={<KakaoLogin />} />
                        <Route path="/pwchange" element={<PwChangePage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/mbti/test" element={<MbtiTestPage />} />
                        <Route path="/mbti/matching" element={<MbtiMatchingPage />} />
                        <Route path="/mbti/meeting" element={<MbtiMeetingPage />} />
                        <Route path="/mbti/community" element={<MbtiCommunityPage />} />
                        <Route path="/mbti/community/write" element={<CommunityWrite />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default Router;
