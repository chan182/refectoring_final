import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import mbti_community from '../../assets/home/mbti_community.webp';
import mbti_matching from '../../assets/home/mbti_matching.webp';
import mbti_meeting from '../../assets/home/mbti_meeting.webp';
import mbti_test from '../../assets/home/mbti_test.webp';
import MainSlider from './MainSlider';

const Home = () => {
    const navigate = useNavigate();

    return (
        <StContainer>
            <MainSlider />
            <StBox>
                <StCards>
                    <StCard onClick={() => navigate('/mbti/test')}>
                        <StTitle>MBTI 검사</StTitle>
                        <StContent>본인의 MBTI가 무엇인지 알아보세요</StContent>
                        <img src={mbti_test} />
                    </StCard>
                    <StCard onClick={() => navigate('/mbti/meeting')}>
                        <StTitle>MBTI 모임</StTitle>
                        <StContent>여러 사람들과 소통하는 모임을 만들어 보세요</StContent>
                        <img src={mbti_meeting} />
                    </StCard>
                    <StCard onClick={() => navigate('/mbti/matching')}>
                        <StTitle>MBTI 궁합</StTitle>
                        <StContent>우리의 MBTI 궁합이 궁금해요 !</StContent>
                        <img src={mbti_matching} />
                    </StCard>
                    <StCard onClick={() => navigate('/mbti/community')}>
                        <StTitle>커뮤니티</StTitle>
                        <StContent>다양한 사람들과 자유롭게 소통하세요 !</StContent>
                        <img src={mbti_community} />
                    </StCard>
                </StCards>
            </StBox>
        </StContainer>
    );
};

export default Home;

const StContainer = styled.div`
    height: 100vh;
`;

const StBox = styled.div``;

const StCards = styled.div`
    display: flex;
    width: 80%;
    padding-top: 40px;
    flex-wrap: wrap;
    margin: 0px auto;
`;

const StCard = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0px auto;
    width: 24%;
    border: 1px solid lightgray;

    border-radius: 16px;
    padding: 30px;

    &:hover {
        /* transform: scale(1.05); */
        box-shadow: 0px 1px 1px 1px var(--content-border-color);
        cursor: pointer;
    }
    /* ~1000px */
    @media screen and (max-width: 1000px) {
        width: 48%;
        margin-bottom: 0.5rem;
    }
    /* ~ 640px */
    @media screen and (max-width: 640px) {
        width: 90%;
        justify-content: center;
    }
`;

const StTitle = styled.p`
    font-size: 1.5rem;
`;

const StContent = styled.p`
    color: #6b6a6a;
    font-size: 1.2rem;
    margin-top: 20px;
`;
