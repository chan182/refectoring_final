import React, { useEffect } from 'react';
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
import { auth, db } from '../firebase/firebase.config';
import { useRecoilState } from 'recoil';
import { userAtom } from '../recoil/Atom';
import { doc, getDoc } from 'firebase/firestore';

const Router = () => {
    const [_, setUser] = useRecoilState(userAtom);

    useEffect(() => {
        console.log(1111111111111);
        auth.onAuthStateChanged((user) => {
            if (user) {
                const docRef = doc(db, 'users', user.uid);

                // 데이터 가져오기
                getDoc(docRef).then((docSnapshot) => {
                    const data = docSnapshot.data();
                    console.log(data);
                    setUser({ uid: user.uid, ...data });
                });
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
