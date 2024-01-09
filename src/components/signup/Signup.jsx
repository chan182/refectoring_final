import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/login/LOGO.png';
const Signup = () => {
    return (
        <StSignUpPage>
            <StSignUpWrap>
                <StLogoImg src={logo} alt="logo" />
                <StSignUpId type="text" />
                <StSignUpPw type="text" />
                <StSignUpPwCheck type="text" />
                <StSignUpNickName type="text" />
                <StLoginSignUpWarp>
                    <StLoginButton>로그인</StLoginButton>
                    <StSignUpButton>회원가입</StSignUpButton>
                </StLoginSignUpWarp>
                <StExternalLoginWrap>
                    <StExternalLogin></StExternalLogin>
                    <StExternalLogin></StExternalLogin>
                </StExternalLoginWrap>
            </StSignUpWrap>
        </StSignUpPage>
    );
};

export default Signup;

const StSignUpPage = styled.div`
    display: flex;
    justify-content: center;
`;
const StSignUpWrap = styled.div`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    width: 410px;
    height: 600px;
`;
const StLogoImg = styled.img`
    width: 408px;
    height: 68px;
`;
const StSignUpId = styled.input`
    width: 402px;
    height: 47px;
    border-radius: 5px;
    border: 1px solid black;
    margin: 60px auto 0px;
`;
const StSignUpPw = styled.input`
    width: 402px;
    height: 47px;
    margin: 10px auto;
    border-radius: 5px;
    border: 0px;
`;
const StSignUpPwCheck = styled.input`
    width: 402px;
    height: 47px;
    margin: 0px auto;
    border-radius: 5px;
    border: 0px;
`;
const StSignUpNickName = styled.input`
    width: 402px;
    height: 47px;
    margin: 10px auto;
    border-radius: 5px;
    border: 0px;
`;
const StPwSearch = styled.div`
    text-decoration: underline;
    margin-bottom: 20px;
    color: gray;
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
    margin-top: 50px;
`;
const StExternalLoginWrap = styled.div`
    width: 96px;
    height: 42px;
    margin: 20px auto;
    display: flex;
    gap: 12px;
`;

const StExternalLogin = styled.button`
    width: 42px;
    height: 42px;
    border-radius: 50%;
    border: 0px;
    cursor: pointer;
`;
