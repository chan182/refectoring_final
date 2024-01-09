import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import google from '../../assets/login/Google.png';
import logo from '../../assets/login/LOGO.png';
import kakao from '../../assets/login/kakao.png';

const Login = () => {
    return <div>로그인 페이지</div>;
};

export default Login;

const StPage = styled.div`
    display: flex;
    justify-content: center;
`;
const StLoginWrap = styled.div`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 600px;
`;
const StLogo = styled.img`
    width: 408px;
    height: 68px;
`;
const StUserId = styled.input`
    width: 402px;
    height: 47px;
    margin: 50px auto 0px;
    outline: none;
    border-radius: 5px;
    border: 1px solid var(--main-button-color);
    font-size: large;
    color: black;
`;
const StUserPw = styled.input`
    width: 402px;
    height: 47px;
    margin: 20px auto 0px;
    outline: none;
    border-radius: 5px;
    border: 0px;
    font-size: large;
`;
const StPwSearch = styled.div`
    text-decoration: underline;
    margin: 20px 0px;
    color: var(--bold-gray);
    cursor: pointer;
`;
const StLoginSignUpWarp = styled.div`
    display: flex;
`;
const StLoginButton = styled.button`
    width: 196px;
    height: 48px;
    border-radius: 5px;
    border: 0px;
    margin: 0px auto;
    font-size: 20px;
    cursor: pointer;
`;
const StSignUpButton = styled.button`
    width: 196px;
    height: 48px;
    border-radius: 5px;
    border: 0px;
    margin: 0px auto;
    font-size: 20px;
    cursor: pointer;
    &:hover {
        background-color: var(--main-button-color);
        color: white;
    }
`;
const StStartText = styled.div`
    text-align: center;
    margin-top: 60px;
`;
const StExternalLoginWrap = styled.div`
    width: 106px;
    height: 42px;
    margin: 20px auto;
    display: flex;
    gap: 30px;
`;

const StKakaoLogin = styled.button`
    width: 42px;
    height: 42px;
    border-radius: 50%;
    border: 0px;
    cursor: pointer;
`;
const StKakaoImg = styled.img`
    width: 42px;
    height: 42px;
`;
const StGoogleLogin = styled.button`
    width: 42px;
    height: 42px;
    border-radius: 50%;
    border: 0px;
    cursor: pointer;
`;
const StGoogleImg = styled.img`
    width: 30px;
    height: 30px;
`;
