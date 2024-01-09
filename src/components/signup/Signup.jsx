import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/login/LOGO.png';
const Signup = () => {
    const nav = useNavigate();
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [pwCheck, setPwCheck] = useState('');
    const [nickName, setNickName] = useState('');

    const onChange = (event) => {
        const {
            target: { name, value }
        } = event;
        if (name === 'userId') {
            setUserId(value);
        }
        if (name === 'userPw') {
            setUserPw(value);
        }
        if (name === 'pwCheck') {
            setPwCheck(value);
        }
        if (name === 'nickName') {
            setNickName(value);
        }
    };
    const signUpButton = (event) => {
        event.preventDefault();
    };
    return (
        <StSignUpPage>
            <StSignUpWrap>
                <StLogoImg src={logo} alt="logo" />
                <form>
                    <StText>사용할 이메일 입력</StText>
                    <StSignUpId type="email" value={userId} name="userId" onChange={onChange} required />
                    <StText>사용할 비밀번호 입력</StText>
                    <StSignUpPw type="password" value={userPw} name="userPw" onChange={onChange} required />
                    <StText>사용할 비밀번호 확인</StText>
                    <StSignUpPwCheck type="password" value={pwCheck} name="pwCheck" onChange={onChange} required />
                    <StText>사용할 닉네임 입력</StText>
                    <StSignUpNickName type="text" value={nickName} name="nickName" onChange={onChange} required />
                    <StBackSignUpWarp>
                        <StBackButton
                            onClick={() => {
                                nav('/login');
                            }}
                        >
                            돌아가기
                        </StBackButton>
                        <StSignUpButton onClick={signUpButton}>회원가입</StSignUpButton>
                    </StBackSignUpWarp>
                </form>
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
    border: 0px;
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
