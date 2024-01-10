import { onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled, { css } from 'styled-components';
import logo from '../../assets/home/logo.png';
import google from '../../assets/login/Google.png';
import kakao from '../../assets/login/kakao.png';
import { auth } from '../../firebase/firebase.config';
import { loginIdAtom } from '../../recoil/loginAtom';

const Login = () => {
    const [uuid, setUuid] = useRecoilState(loginIdAtom);
    const idRef = useRef('');

    //사용자 정보확인
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            idRef.current.focus();
        });
    }, []);

    const nav = useNavigate();

    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');

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
    };
    // 비밀번호 변경 버튼
    const pwChangeButton = (event) => {
        event.preventDefault();
        if (userId === '') {
            alert('이메일을 입력해주세요');
        } else {
            try {
                sendPasswordResetEmail(auth, userId);
            } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('err', errorCode, errorMessage);
            }
        }
    };
    //로그인 버튼
    const loginButton = async (event) => {
        event.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, userId, userPw);
            const user = userCredential.user;
            nav('/profile');
            console.log(user);
            setUuid(user.uid);
            console.log('로그인 성공 !!!!', userCredential.user);
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('err', errorCode, errorMessage);
        }
    };
    return (
        <StPage>
            <StLoginWrap>
                <StLogo src={logo} alt="logo" />
                <StUserId
                    placeholder="이메일을 입력해주세요"
                    type="email"
                    value={userId}
                    name="userId"
                    onChange={onChange}
                    required
                    ref={idRef}
                ></StUserId>
                <StUserPw
                    placeholder="비밀번호를 입력해주세요"
                    type="password"
                    value={userPw}
                    name="userPw"
                    onChange={onChange}
                    required
                ></StUserPw>
                <StPwChange onClick={pwChangeButton}>비밀번호 변경 </StPwChange>
                <StLoginSignUpWarp>
                    <StLoginButton disabled={!userId || !userPw} onClick={loginButton}>
                        로그인
                    </StLoginButton>
                    <StSignUpButton
                        onClick={() => {
                            nav('/signup');
                        }}
                    >
                        회원가입
                    </StSignUpButton>
                </StLoginSignUpWarp>
                <StStartText>SNS로 간편하게 시작하기</StStartText>
                <StExternalLoginWrap>
                    <StKakaoLogin type="button">
                        <StKakaoImg src={kakao} alt="" />
                    </StKakaoLogin>
                    <StGoogleLogin>
                        <StGoogleImg src={google} alt="" />
                    </StGoogleLogin>
                </StExternalLoginWrap>
            </StLoginWrap>
        </StPage>
    );
};

export default Login;

const StPage = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background-color: var(--light-gray);
`;
const StLoginWrap = styled.div`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    width: 450px;
    height: 600px;
    background-color: white;
    border-radius: 10px;
`;
const StLogo = styled.img`
    width: 408px;
    margin: 20px auto;
`;
const StUserId = styled.input`
    width: 402px;
    height: 47px;
    margin: 10px auto 0px;
    outline: none;
    border-radius: 5px;
    border: 1px solid var(--main-button-color);
    background-color: var(--light-gray);
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
    background-color: var(--light-gray);
`;
const StPwChange = styled.button`
    text-decoration: underline;
    margin: 10px 0px 40px 20px;
    color: var(--bold-gray);
    cursor: pointer;
    width: 90px;
    height: 20px;
`;
const StLoginSignUpWarp = styled.div`
    display: flex;
    justify-content: center;
    margin: 0px auto;
    gap: 10px;
`;
const StLoginButton = styled.button`
    width: 196px;
    height: 48px;
    border-radius: 5px;
    border: 0px;
    font-size: 20px;
    cursor: pointer;
    ${(props) => {
        if (props.disabled) {
            return css`
                background-color: var(--light-gray);
            `;
        }
        return css`
            background-color: var(--main-button-color);
            color: white;
        `;
    }}
`;
const StSignUpButton = styled.button`
    width: 196px;
    height: 48px;
    border-radius: 5px;
    border: 0px;
    font-size: 20px;
    cursor: pointer;
    background-color: var(--light-gray);
    color: var(--bold-gray);
    &:hover {
        background-color: var(--main-button-color);
        color: white;
    }
`;
const StStartText = styled.div`
    text-align: center;
    margin-top: 60px;
    user-select: none;
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
    background-color: white;
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
