import { createUserWithEmailAndPassword } from '@firebase/auth';
import { addDoc, collection } from '@firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Swal from 'sweetalert2';
import logo from '../../assets/home/logo.png';
import modal_logo from '../../assets/home/mbti_community.png';
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
            Swal.fire({
                icon: 'warning',
                position: 'center',
                title: '비밀번호를 확인해주세요.',
                text: '비밀번호가 일치하지 않습니다.',
                // padding: '20px',
                confirmButtonColor: '#756ab6',
                confirmButtonText: '확인'
            });
        } else {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, userId, userPw);
                const user = userCredential.user;
                const userDocRef = await addDoc(collection(db, 'users'), {
                    uid: user.uid,
                    email: user.email,
                    nickname: nickName
                });
                Swal.fire({
                    title: '회원가입 성공!',
                    text: '나의 프로필 정보를 입력한 후에 커뮤니티 활동을 시작해보세요 !',
                    imageUrl: modal_logo,
                    imageWidth: 300,
                    imageAlt: 'Custom image',
                    confirmButtonText: '마이페이지로 이동',
                    confirmButtonColor: '#756ab6'
                }).then(() => {
                    // 프로필 페이지로 이동
                    nav('/profile');
                });
            } catch (error) {
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        return Swal.fire({
                            icon: 'error',
                            position: 'center',
                            title: '이미 가입되어 있는 이메일입니다.',
                            text: '이메일 주소를 확인해주세요.',
                            confirmButtonColor: '#756ab6'
                        });
                    case 'auth/weak-password':
                        return Swal.fire({
                            icon: 'error',
                            position: 'center',
                            title: '잘못된 비밀번호를 입력하였습니다.',
                            text: '비밀번호는 6글자 이상이어야 합니다.',
                            confirmButtonColor: '#756ab6'
                        });
                    case 'auth/network-request-failed':
                        return Swal.fire({
                            icon: 'error',
                            position: 'center',
                            title: '네트워크 연결에 실패 하였습니다.',
                            text: '잠시 후에 다시 시도해 주세요.',
                            confirmButtonColor: '#756ab6'
                        });
                    case 'auth/invalid-email':
                        return Swal.fire({
                            icon: 'error',
                            position: 'center',
                            title: '잘못된 이메일 형식입니다.',
                            text: '유효한 이메일 형식으로 작성해주세요.',
                            confirmButtonColor: '#756ab6'
                        });
                    default:
                        return Swal.fire({
                            icon: 'error',
                            position: 'center',
                            title: '회원가입에 실패하였습니다.',
                            text: '이메일 주소와 비밀번호를 확인해주세요.',
                            confirmButtonColor: '#756ab6'
                        });
                }
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
                <StSignUpWarp>
                    <StSignUpButton disabled={!userId || !userPw || !pwCheck || !nickName} onClick={signUpButton}>
                        회원가입
                    </StSignUpButton>
                </StSignUpWarp>
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
    background-color: var(--background-color);
`;

const StSignUpWrap = styled.div`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    width: 450px;
    height: 600px;
    background-color: white;
    border-radius: 10px;
    border: 1px solid var(--content-border-color);
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
        border: 2px solid var(--button-border-color);
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
        border: 2px solid var(--button-border-color);
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
        border: 2px solid var(--button-border-color);
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
        border: 2px solid var(--button-border-color);
        outline: none;
    }
`;

const StSignUpWarp = styled.div`
    display: flex;
    margin-top: 50px;
`;

const StSignUpButton = styled.button`
    width: 402px;
    height: 48px;
    border-radius: 5px;
    border: 0px;
    margin: 0px auto;
    font-size: 20px;
    cursor: pointer;
    background-color: var(--light-gray);
    color: var(--bold-gray);
    ${(props) => {
        if (props.disabled) {
            return css`
                background-color: var(--light-gray);
                cursor: default;
            `;
        }
        return css`
            background-color: var(--main-button-color);
            color: white;
        `;
    }}
`;
