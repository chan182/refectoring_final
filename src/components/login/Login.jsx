import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Login = () => {
    const nav = useNavigate();
    return (
        <StPage>
            <StLoginWrap>
                <StUserId placeholder="아이디를 입력해주세요"></StUserId>
                <StUserPw placeholder="비밀번호를 입력해주세요" type="password"></StUserPw>
                <StSignUpButton onClick={() => nav('/signup')}>회원가입</StSignUpButton>
                <StLoginButton>로그인</StLoginButton>
                <StExternalLoginWrap>
                    <StExternalLogin>카톡</StExternalLogin>
                    <StExternalLogin>구글</StExternalLogin>
                </StExternalLoginWrap>
            </StLoginWrap>
        </StPage>
    );
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
    height: 500px;
    background-color: green;
`;

const StUserId = styled.input`
    width: 300px;
    height: 50px;
    margin: 50px auto 0px;
    outline: none;
    border-radius: 5px;
    border: 0px;
    font-size: large;
`;
const StUserPw = styled.input`
    width: 300px;
    height: 50px;
    margin: 50px auto 0px;
    outline: none;
    border-radius: 5px;
    border: 0px;
    font-size: large;
`;
const StSignUpButton = styled.button`
    width: 80px;
    height: 30px;
    position: relative;
    left: 70%;
    border: 0px;
    cursor: pointer;
    background-color: green;
`;
const StLoginButton = styled.button`
    width: 80px;
    height: 30px;
    margin: 20px auto;
    cursor: pointer;
    border-radius: 5px;
    border: 0px;
`;
const StExternalLoginWrap = styled.div`
    margin: 50px;
    display: flex;
`;
const StExternalLogin = styled.button`
    width: 50px;
    height: 50px;
    border: 0px;
    border-radius: 50%;
    margin: auto;
    cursor: pointer;
`;
