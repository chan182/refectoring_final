import { createUserWithEmailAndPassword } from '@firebase/auth';
import { addDoc, collection } from '@firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import logo from '../../assets/home/logo.png';
import { auth, db } from '../../firebase/firebase.config';

const Signup = () => {
    const nav = useNavigate();
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [pwCheck, setPwCheck] = useState('');
    const [nickName, setNickName] = useState('');

    const idRef = useRef('');

    useEffect(() => {
        idRef.current.focus();
    }, []);

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
    //회원가입 버튼
    const signUpButton = async (event) => {
        event.preventDefault();
        if (userPw !== pwCheck) {
            alert('비밀번호가 다릅니다');
        } else {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, userId, userPw);
                const user = userCredential.user;
                const userDocRef = await addDoc(collection(db, 'users'), {
                    uid: user.uid,
                    email: user.email,
                    nickname: nickName
                });
                console.log('user =>', user);
                console.log('db', db);
                alert('회원가입 성공 !!!', userCredential.user);
            } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('err', errorCode, errorMessage);
            }
        }
    };
    return (
        <StSignUpPage>
            <StSignUpWrap>
                <StLogoImg src={logo} alt="logo" />
                <StText>사용할 이메일 입력</StText>
                <StSignUpId
                    type="email"
                    value={userId}
                    name="userId"
                    onChange={onChange}
                    required
                    placeholder="abcd@naver.com"
                    ref={idRef}
                />
                <StText>사용할 비밀번호 입력</StText>
                <StSignUpPw
                    type="password"
                    value={userPw}
                    name="userPw"
                    onChange={onChange}
                    required
                    minLength={6}
                    placeholder="6자리 이상 입력해주세요"
                />
                <StText>사용할 비밀번호 확인</StText>
                <StSignUpPwCheck
                    type="password"
                    value={pwCheck}
                    name="pwCheck"
                    onChange={onChange}
                    required
                    placeholder="6자리 이상 입력해주세요"
                />
                <StText>사용할 닉네임 입력</StText>
                <StSignUpNickName
                    type="text"
                    value={nickName}
                    name="nickName"
                    onChange={onChange}
                    required
                    placeholder="닉네임을 입력해주세요"
                />
                <StBackSignUpWarp>
                    <StBackButton
                        onClick={() => {
                            nav('/login');
                        }}
                    >
                        돌아가기
                    </StBackButton>
                    <StSignUpButton disabled={!userId || !userPw || !pwCheck || !nickName} onClick={signUpButton}>
                        회원가입
                    </StSignUpButton>
                </StBackSignUpWarp>
            </StSignUpWrap>
        </StSignUpPage>
    );
};

export default Signup;

const StSignUpPage = styled.div`
    display: flex;
    justify-content: center;
    background-color: var(--light-gray);
    width: 100%;
    height: 100vh;
`;
const StSignUpWrap = styled.div`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    width: 450px;
    height: 600px;
    background-color: white;
    border-radius: 10px;
`;
const StLogoImg = styled.img`
    width: 408px;
    margin: 20px auto;
`;
const StText = styled.div`
    margin: 20px 0px 5px 25px;
`;
const StSignUpId = styled.input`
    width: 402px;
    height: 47px;
    border-radius: 5px;
    border: 0px;
    margin: 0px auto;
    background-color: var(--light-gray);
    font-size: large;
    color: black;
    &:focus {
        border: 2px solid var(--border-color);
        outline: none;
    }
`;
const StSignUpPw = styled.input`
    width: 402px;
    height: 47px;
    margin: 0px auto;
    border-radius: 5px;
    border: 0px;
    background-color: var(--light-gray);
    font-size: large;
    color: black;
    &:focus {
        border: 2px solid var(--border-color);
        outline: none;
    }
`;
const StSignUpPwCheck = styled.input`
    width: 402px;
    height: 47px;
    margin: 0px auto;
    border-radius: 5px;
    border: 0px;
    background-color: var(--light-gray);
    font-size: large;
    color: black;
    &:focus {
        border: 2px solid var(--border-color);
        outline: none;
    }
`;
const StSignUpNickName = styled.input`
    width: 402px;
    height: 47px;
    margin: 0px auto;
    border-radius: 5px;
    border: 0px;
    background-color: var(--light-gray);
    font-size: large;
    color: black;
    &:focus {
        border: 2px solid var(--border-color);
        outline: none;
    }
`;
const StBackSignUpWarp = styled.div`
    display: flex;
    margin-top: 50px;
`;
const StBackButton = styled.button`
    width: 196px;
    height: 48px;
    border-radius: 5px;
    border: 0px;
    margin: 0px auto;
    font-size: 20px;
    cursor: pointer;
    background-color: var(--light-gray);
    color: var(--bold-gray);
    &:hover {
        background-color: var(--main-button-color);
        color: white;
    }
`;
const StSignUpButton = styled.button`
    width: 196px;
    height: 48px;
    border-radius: 5px;
    border: 0px;
    margin: 0px auto;
    font-size: 20px;
    cursor: pointer;
    background-color: var(--light-gray);
    color: var(--bold-gray);
    /* &:hover {
        background-color: var(--main-button-color);
        color: white;
    } */
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
