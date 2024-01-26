import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import logo from '../../assets/home/footerLogo.png';
import { auth } from '../../firebase/firebase.config';
import Swal from 'sweetalert2';
import modal_logo from '../../assets/home/headerLogo.png';
import { Navigate, useNavigate } from 'react-router-dom';

const PwChange = () => {
    const [userId, setUserId] = useState('');
    const idRef = useRef('');
    const nav = useNavigate;

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

    //   이메일 전송버튼
    const pwChangeButton = (event) => {
        event.preventDefault();
        sendPasswordResetEmail(auth, userId)
            .then(() => {
                Swal.fire({
                    title: '메일함을 확인해주세요',
                    text: '메일에 적힌 주소에서 변경할수있습니다',
                    imageUrl: modal_logo,
                    imageWidth: 300,
                    imageAlt: 'Custom image',
                    confirmButtonText: '네'
                });
                nav('/login');
            })
            .catch((error) => {
                switch (error.code) {
                    case 'auth/invalid-email':
                        return Swal.fire({
                            icon: 'error',
                            position: 'center',
                            title: '잘못된 이메일 형식입니다.',
                            text: '유효한 이메일 형식으로 작성해주세요.',
                            confirmButtonColor: '#756ab6'
                        });
                }
            });
    };

    return (
        <StPage>
            <StLoginWrap>
                <StLogo src={logo} alt="logo" />
                <StPwCheckText>비밀번호를 찾고자하는 이메일을 입력해주세요</StPwCheckText>
                <StUserId
                    placeholder="이메일을 입력해주세요"
                    type="email"
                    value={userId}
                    name="userId"
                    onChange={onChange}
                    required
                    ref={idRef}
                ></StUserId>
                <StPwChangeWarp>
                    <StPwChange disabled={!userId} onClick={pwChangeButton}>
                        이메일 전송
                    </StPwChange>
                </StPwChangeWarp>
                {/* <StSearchId>
                    아이디가 기억나지 않는다면? <span>아이디찾기 </span>
                </StSearchId> */}
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
    border-radius: 16px;
    border: 1px solid var(--content-border-color);
`;

const StLogo = styled.img`
    width: 408px;
    margin: 20px auto 5px;
`;

const StPwCheckText = styled.div`
    text-align: center;
    font-size: large;
    margin-bottom: 40px;
`;
const StUserId = styled.input`
    width: 402px;
    height: 47px;
    margin: 10px auto 0px;
    outline: none;
    border-radius: 10px;
    border: 1px solid var(--main-button-color);
    background-color: var(--light-gray);
    font-size: large;
    color: black;
    padding: 10px;
`;

const StPwChangeWarp = styled.div`
    display: flex;
    justify-content: center;
    margin: 0px auto;
    gap: 10px;
`;

const StPwChange = styled.button`
    width: 402px;
    height: 48px;
    margin-top: 20px;
    border-radius: 10px;
    border: 0px;
    font-size: 20px;
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

const StSearchId = styled.div`
    text-align: center;
    margin-top: 40px;
    > span {
        color: var(--light-pink);
        cursor: pointer;
    }
`;
