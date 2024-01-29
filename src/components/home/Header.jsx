import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import dorpArrow from '../../assets/home/dropArrow.png';
import logo from '../../assets/home/headerLogo.png';
import { userAtom } from '../../recoil/Atom';
import MainProfile from './MainProfile';
import profileImage from '../../assets/profile/profileImg.png';
import notification from '../../assets/home/notification.png';

const Header = () => {
    const navigate = useNavigate();
    const [user] = useRecoilState(userAtom);
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // 마이프로필 바깥영역 클릭시 마이프로필 닫기
    const dropBtnRef = useRef(null);
    const mainProfileRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropBtnRef.current &&
                mainProfileRef.current &&
                !dropBtnRef.current.contains(event.target) &&
                !mainProfileRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <StBox>
            <StPositionBox>
                <StDiv>
                    <StLeftDiv>
                        <StLogo>
                            <img src={logo} onClick={() => navigate('/')} />
                        </StLogo>
                        <StP onClick={() => navigate('/mbti/test')}>MBTI 검사</StP>
                        <StP onClick={() => navigate('/mbti/meeting')}>MBTI 모임</StP>
                        <StP onClick={() => navigate('/mbti/matching')}>MBTI 궁합</StP>
                        <StP onClick={() => navigate('/mbti/community')}>커뮤니티</StP>
                    </StLeftDiv>
                    <StRightDiv>
                        {user ? (
                            <>
                                {/* 로그인 성공 시, */}
                                <StProfileBox ref={mainProfileRef}>
                                    <img src={notification} />
                                    <StProfileImg>
                                        <img src={user.imageUrl || profileImage} />
                                    </StProfileImg>
                                    <StDropBtn ref={dropBtnRef} onClick={toggleDropdown}>
                                        <img src={dorpArrow} />
                                    </StDropBtn>
                                    {isOpen && <MainProfile toggleDropdown={toggleDropdown} />}
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
    /* border: 1px solid var(--box-border-color); */
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
    width: 156px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;

    &:hover {
        transform: scale(1.15);
    }

    & img {
        width: 77px;
        height: 42px;
    }
`;

const StP = styled.p`
    font-size: 18px;
    padding-left: 30px;
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
        transform: scale(1.15);
    }
`;

const StRightDiv = styled.div`
    width: 124                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   px;
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
        /* transform: scale(1.015); */
        background-color: var(--main-button-color);
        color: white;
    }
`;

const StProfileBox = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 164px;
    height: 80px;

    img {
        margin-right: 0px;
        width: 28px;
        height: 28px;
    }
`;

const StProfileImg = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    & img {
        margin: 0px;
        width: 50px;
        height: 50px;
        overflow: hidden;
        border-radius: 50%;
    }
`;

const StDropBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
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
