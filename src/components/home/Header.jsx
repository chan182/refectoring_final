import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/home/logo.png';

const Header = () => {
    const navigate = useNavigate();

    return (
        <StBox>
            <StDiv>
                <StLeftDiv>
                    <StLogo>
                        <img src={logo} onClick={() => navigate('/')} />
                    </StLogo>
                    <StP>MBTI 검사</StP>
                    <StP>MBTI 모임</StP>
                    <StP>MBTI 궁합</StP>
                    <StP>커뮤니티</StP>
                </StLeftDiv>
                <StLightDiv>
                    <StLoginBtn onClick={() => navigate('/login')}>로그인</StLoginBtn>
                    <StSignupBtn onClick={() => navigate('/signup')}>회원가입</StSignupBtn>
                </StLightDiv>
            </StDiv>
        </StBox>
    );
};

export default Header;

const StBox = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
`;

const StDiv = styled.div`
    width: 80%;
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
`;

const StLightDiv = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const StLoginBtn = styled.button`
    width: 80px;
    height: 30px;
    background-color: var(--light-purple);
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 15px;
    font-weight: 500;
    margin-right: 10px;
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
`;
