import React, { useEffect } from 'react';

const { Kakao } = window;

const KakaoLogin = () => {
    //SDK 초기화
    useEffect(() => {
        Kakao.cleanup();
        Kakao.init(process.env.REACT_APP_KAKAO_KEY);
    }, []);

    const kakaoLoginButtonHandler = () => {
        Kakao.Auth.authorize({
            redirectUri: process.env.REACT_APP_KAKAO_REDIRECTURI,
            scope: 'profile_nickname'
        });
        Kakao.Auth.setAccessToken();
    };

    return <button onClick={kakaoLoginButtonHandler}>kakao</button>;
};

export default KakaoLogin;
