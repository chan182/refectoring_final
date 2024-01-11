import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/home/logo.png';
import google from '../../assets/login/Google.png';
import kakao from '../../assets/login/kakao.png';
import { auth } from '../../firebase/firebase.config';
import { useRecoilState } from 'recoil';
import { userAtom } from '../../recoil/Atom';

const Login = () => {
    const [_, setUser] = useRecoilState(userAtom);
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');

    const handleClickLoginButton = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, userId, userPw);
            const user = userCredential.user;
            console.log(user);
            setUser(user);

            navigate('/profile');
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
                    onChange={(e) => setUserId(e.target.value)}
                    required
                ></StUserId>
                <StUserPw
                    placeholder="비밀번호를 입력해주세요"
                    type="password"
                    value={userPw}
                    name="userPw"
                    onChange={(e) => setUserPw(e.target.value)}
                    required
                ></StUserPw>
                <StPwSearch>비밀번호 찾기 </StPwSearch>
                <StLoginSignUpWarp>
                    <StLoginButton onClick={handleClickLoginButton}>로그인</StLoginButton>
                    <StSignUpButton
                        onClick={() => {
                            navigate('/signup');
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
    align-items: center;
    justify-content: center;
    width: 30%;
    height: 600px;
    background-color: white;
    padding: 50px 0px 0px 0px;
    border-radius: 10px;
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
