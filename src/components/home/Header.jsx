import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import dorpArrow from '../../assets/home/dropArrow.png';
import logo from '../../assets/home/logo.png';
import example from '../../assets/home/suin.jpg';
import MbtiTest from '../mbti_test/MbtiTest';
import MainProfile from './MainProfile';
import { auth } from '../../firebase/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import { useRecoilValue } from 'recoil';
import { UserImageAtom } from '../../recoil/Atom';

const Header = () => {
    const userProfileImage = useRecoilValue(UserImageAtom);

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        console.log('isOpen : ', isOpen);
    };

    // useEffect를 활용하여 로그인 유무 판단
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user?.email);
        });
    }, []);

    return (
        <StBox>
            <StPositionBox>
                <StDiv>
                    <StLeftDiv>
                        <StLogo>
                            <img src={logo} onClick={() => navigate('/')} />
                        </StLogo>
                        <StP onClick={() => setIsModalOpen(true)}>MBTI 검사</StP>
                        <StP onClick={() => navigate('/mbti/meeting')}>MBTI 모임</StP>
                        <StP onClick={() => navigate('/mbti/matching')}>MBTI 궁합</StP>
                        <StP onClick={() => navigate('/mbti/community')}>커뮤니티</StP>
                    </StLeftDiv>
                    <StRightDiv>
                        {currentUser ? (
                            <>
                                {/* 로그인 성공 시, */}
                                <StProfileBox>
                                    <StProfileImg>
                                        <img src={userProfileImage} />
                                    </StProfileImg>
                                    <StDropBtn onClick={toggleDropdown}>
                                        <img src={dorpArrow} />
                                    </StDropBtn>
                                    {isOpen && (
                                        <MainProfile setCurrentUser={setCurrentUser} toggleDropdown={toggleDropdown} />
                                    )}
                                </StProfileBox>
                            </>
                        ) : (
                            <>
                                {/* 로그인 안되어 있는 경우, */}
                                <StLoginBtn onClick={() => navigate('/login')}>로그인</StLoginBtn>
                                <StSignupBtn onClick={() => navigate('/signup')}>회원가입</StSignupBtn>
                            </>
                        )}
                    </StRightDiv>
                </StDiv>
            </StPositionBox>
            {/* MBTI 검사 모달 */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                style={customModalStyles}
                shouldCloseOnOverlayClick={false}
                contentLabel="MBTI Test Modal"
            >
                <MbtiTest isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            </Modal>
        </StBox>
    );
};

export default Header;

const StBox = styled.div`
    position: relative;
    z-index: 1;
    width: 100%;
    height: 80px;
`;

const StPositionBox = styled.div`
    width: 100%;
    height: 80px;
    position: fixed;
    display: flex;
    justify-content: center;
    background-color: white;
    border: 1px solid var(--box-border-color);
    border-width: 0 0 1px 0;
`;

const StDiv = styled.div`
    width: 75%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const StLeftDiv = styled.div`
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
`;

const StLogo = styled.div`
    width: 250px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
        transform: scale(1.15);
    }

    & img {
        width: 100%;
        height: 60%;
    }
`;

const StP = styled.p`
    font-size: 15px;
    padding-left: 30px;
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
        transform: scale(1.15);
    }
`;

const StRightDiv = styled.div`
    width: 200px;
    height: 80px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const StLoginBtn = styled.button`
    width: 80px;
    height: 30px;
    background-color: var(--main-button-color);
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 15px;
    font-weight: 500;
    margin-right: 10px;
    cursor: pointer;

    &:hover {
        transform: scale(1.05);
    }
`;

const StSignupBtn = styled.button`
    width: 80px;
    height: 30px;
    background-color: white;
    color: var(--bold-gray);
    border: 1px solid var(--border-color);
    border-radius: 5px;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;

    &:hover {
        transform: scale(1.05);
    }
`;

const StProfileBox = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 100px;
    height: 80px;
`;

const StProfileImg = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    & img {
        width: 50px;
        height: 50px;
        overflow: hidden;
        border-radius: 50%;
    }
`;

const StDropBtn = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 10px;
    cursor: pointer;

    &:hover {
        transform: scale(1.15);
    }

    & img {
        width: 20px;
        height: 20px;
        opacity: 0.6;
    }
`;

const customModalStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '65%',
        height: '71.5%',
        // maxWidth: '90vw',
        // maxHeight: '90vh',
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: '#fff',
        overflow: 'auto'
    }
};
