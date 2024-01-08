import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/login/LOGO.png';
const Signup = () => {
    return (
        <StSignUpPage>
            <StSignUpWrap>
                <StLogoImg src={logo} alt="logo" />
                <StText>사용할 이메일 입력</StText>
                <StSignUpId type="text" />
                <StText>사용할 비밀번호 입력</StText>
                <StSignUpPw type="password" />
                <StText>사용할 비밀번호 확인</StText>
                <StSignUpPwCheck type="password" />
                <StText>사용할 닉네임 입력</StText>
                <StSignUpNickName type="text" />
                <StBackSignUpWarp>
                    <StBackButton>돌아가기</StBackButton>
                    <StSignUpButton>회원가입</StSignUpButton>
                </StBackSignUpWarp>
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
    margin-bottom: 60px;
`;
const StText = styled.div`
    margin: 10px 0px 10px 10px;
`;
const StSignUpId = styled.input`
    width: 402px;
    height: 47px;
    border-radius: 5px;
    border: 1px solid black;
    margin: 0px auto;
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
const StBackSignUpWarp = styled.div`
    display: flex;
`;
const StBackButton = styled.button`
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
