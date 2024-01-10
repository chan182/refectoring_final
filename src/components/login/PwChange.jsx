import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import logo from '../../assets/home/logo.png';
import { auth } from '../../firebase/firebase.config';

const PwChange = () => {
    const [userId, setUserId] = useState('');
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
    };

    //   비밀번호 변경 버튼
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
                <StPwChange onClick={pwChangeButton}>비밀번호 변경 </StPwChange>
                <StLoginSignUpWarp>
                    <StLoginButton disabled={!userId}>로그인</StLoginButton>
                </StLoginSignUpWarp>
            </StLoginWrap>
        </StPage>
    );
};

export default PwChange;
const StPage = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background-color: var(--background-color);
`;

const StLoginWrap = styled.div`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    width: 450px;
    height: 400px;
    background-color: white;
    border-radius: 10px;
    border: 1px solid var(--content-border-color);
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
