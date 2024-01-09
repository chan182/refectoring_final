import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import dorpArrow from '../../assets/home/dropArrow.png';
import logo from '../../assets/home/logo.png';
import example from '../../assets/home/suin.jpg';
import MainProfile from './MainProfile';

const Header = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        console.log('isOpen : ', isOpen);
    };

    return (
        <StBox>
            <StDiv>
                <StLeftDiv>
                    <StLogo>
                        <img src={logo} onClick={() => navigate('/')} />
                    </StLogo>
                    <StP onClick={() => navigate('/mbti/test')}>MBTI 검사</StP>
                    <StP>MBTI 모임</StP>
                    <StP>MBTI 궁합</StP>
                    <StP>커뮤니티</StP>
                </StLeftDiv>
                <StRightDiv>
                    <StProfileBox>
                        <StProfileImg>
                            <img src={example} />
                        </StProfileImg>
                        <StDropBtn onClick={toggleDropdown}>
                            <img src={dorpArrow} />
                        </StDropBtn>
                        {isOpen && <MainProfile />}
                    </StProfileBox>

                    {/* <StLoginBtn onClick={() => navigate('/login')}>로그인</StLoginBtn>
                    <StSignupBtn onClick={() => navigate('/signup')}>회원가입</StSignupBtn> */}
                </StRightDiv>
            </StDiv>
        </StBox>
    );
};

export default Header;

const StBox = styled.div`
    width: 100%;
    height: 80px;
    z-index: 5;
    display: flex;
    justify-content: center;
`;

const StDiv = styled.div`
    width: 75%;
    height: 80px;
    position: fixed;
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
    font-weight: 500;
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
    border: 1px solid var(--bold-gray);
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
    z-index: 10;
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
