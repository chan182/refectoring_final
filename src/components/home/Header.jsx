import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import dorpArrow from '../../assets/home/dropArrow.png';
import logo from '../../assets/home/headerLogo.png';
import profileImage from '../../assets/profile/profileImg.png';
import { userAtom } from '../../recoil/Atom';
import MainProfile from './MainProfile';

const Header = () => {
    const navigate = useNavigate();
    const [user] = useRecoilState(userAtom);
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

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
                            <StProfileBox ref={mainProfileRef}>
                                <StProfileDiv ref={dropBtnRef} onClick={toggleDropdown}>
                                    <StProfileImg>
                                        <img src={user.imageUrl || profileImage} />
                                    </StProfileImg>
                                    <StDropBtn>
                                        <img src={dorpArrow} />
                                    </StDropBtn>
                                </StProfileDiv>
                                {isOpen && <MainProfile toggleDropdown={toggleDropdown} />}
                            </StProfileBox>
                        ) : (
                            <>
                                <StLoginBtn onClick={() => navigate('/login')}>로그인</StLoginBtn>
                                <StSignupBtn onClick={() => navigate('/signup')}>회원가입</StSignupBtn>
                            </>
                        )}
                    </StRightDiv>
                    {isMobileMenuOpen && (
                        <StMobileMenu>
                            <StMobileMenuItem onClick={() => navigate('/mbti/test')}>MBTI 검사</StMobileMenuItem>
                            <StMobileMenuItem onClick={() => navigate('/mbti/meeting')}>MBTI 모임</StMobileMenuItem>
                            <StMobileMenuItem onClick={() => navigate('/mbti/matching')}>MBTI 궁합</StMobileMenuItem>
                            <StMobileMenuItem onClick={() => navigate('/mbti/community')}>커뮤니티</StMobileMenuItem>
                            {user ? (
                                <StProfileBoxMobile ref={mainProfileRef}>
                                    <StProfileDiv ref={dropBtnRef} onClick={toggleDropdown}>
                                        <StProfileImg>
                                            <img src={user.imageUrl || profileImage} />
                                        </StProfileImg>
                                        <StDropBtn>
                                            <img src={dorpArrow} />
                                        </StDropBtn>
                                    </StProfileDiv>
                                    {isOpen && <MainProfile toggleDropdown={toggleDropdown} />}
                                </StProfileBoxMobile>
                            ) : (
                                <>
                                    <StLoginBtn onClick={() => navigate('/login')}>로그인</StLoginBtn>
                                    <StSignupBtn onClick={() => navigate('/signup')}>회원가입</StSignupBtn>
                                </>
                            )}
                        </StMobileMenu>
                    )}
                    <StBurgerMenu onClick={toggleMobileMenu}>
                        <div />
                        <div />
                        <div />
                    </StBurgerMenu>
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
    justify-content: center;
    background-color: white;
    border-width: 0 0 1px 0;
`;

const StDiv = styled.div`
    width: 100%;
    justify-content: space-around;
    margin: 0 auto;
    height: 80px;
    display: flex;
    align-items: center;
`;

const StLeftDiv = styled.div`
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const StLogo = styled.div`
    width: 156px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;

    & img {
        width: 77px;
        height: 42px;
    }
`;

const StBurgerMenu = styled.div`
    display: none;
    flex-direction: column;
    cursor: pointer;

    div {
        width: 25px;
        height: 3px;
        background-color: #333;
        margin: 3px 0;
        transition: transform 0.3s, opacity 0.3s;
    }

    &:hover div {
        opacity: 0.7;
    }

    @media (max-width: 1250px) {
        display: flex;
    }
`;

const StMobileMenu = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 80px;
    left: 0;
    width: 100%;
    background-color: white;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 10;

    @media (min-width: 1251px) {
        display: none;
    }
`;

const StMobileMenuItem = styled.p`
    font-size: 18px;
    padding: 10px;
    cursor: pointer;

    &:hover {
        background-color: #f0f0f0;
    }
`;

const StP = styled.p`
    font-size: 18px;
    padding-left: 30px;
    display: flex;
    align-items: center;
    cursor: pointer;

    @media (max-width: 1250px) {
        display: none;
    }

    @media (min-width: 1251px) {
        display: block;
    }

    &:hover {
        transform: scale(1.15);
    }
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
        background-color: var(--main-button-color);
        color: white;
    }
`;

const StRightDiv = styled.div`
    width: 166px;
    height: 80px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const StProfileBox = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 114px;
    height: 80px;

    img {
        margin-right: 15px;
    }
`;

const StProfileBoxMobile = styled(StProfileBox)`
    display: none;
`;

const StProfileDiv = styled.div`
    display: flex;
    cursor: pointer;
`;

const StProfileImg = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 6px;

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
    opacity: 0.6;

    &:hover {
        transform: scale(1.15);
    }

    & img {
        width: 14px;
        height: 14px;
        opacity: 0.6;
    }
`;
