import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import mbti_community from '../../assets/home/mbti_community.png';
import mbti_matching from '../../assets/home/mbti_matching.png';
import mbti_meeting from '../../assets/home/mbti_meeting.png';
import mbti_test from '../../assets/home/mbti_test.png';
import MainSlider from './MainSlider';

const Home = () => {
    const navigate = useNavigate();

    return (
        <StContainer>
            <MainSlider />
            <StBox>
                <StComponents>
                    <StComponent onClick={() => navigate('/mbti/test')}>
                        <StTitle>MBTI 검사</StTitle>
                        <StContent>본인의 MBTI가 무엇인지 알아보세요 !</StContent>
                        <img src={mbti_test} />
                    </StComponent>
                    <StComponent onClick={() => navigate('/mbti/meeting')}>
                        <StTitle>MBTI 모임</StTitle>
                        <StContent>여러 사람들과 소통하는 모임을 만들어 보세요 !</StContent>
                        <img src={mbti_meeting} />
                    </StComponent>
                    <StComponent onClick={() => navigate('/mbti/matching')}>
                        <StTitle>MBTI 궁합</StTitle>
                        <StContent>우리의 MBTI 궁합이 궁금해요 !</StContent>
                        <img src={mbti_matching} />
                    </StComponent>
                    <StComponent onClick={() => navigate('/mbti/community')}>
                        <StTitle>커뮤니티</StTitle>
                        <StContent>다양한 사람들과 자유롭게 소통하세요 !</StContent>
                        <img src={mbti_community} />
                    </StComponent>
                </StComponents>
            </StBox>
        </StContainer>
    );
};

export default Home;

const StContainer = styled.div`
    width: 100%;
    height: 80vh;
`;

const StBox = styled.div`
    width: 100%;
    height: 350px;
    display: flex;
    margin-bottom: 40px;
    justify-content: center;
`;

const StComponents = styled.div`
    width: 75%;
    height: 100%;
    padding-top: 40px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
`;

const StComponent = styled.div`
    width: 23%; /* 기본 너비 설정 */
    height: 100%;
    border-radius: 16px;
    padding: 30px;
    box-shadow: 0px 0px 3px #d3d3d3;
    position: relative;
    margin-bottom: 20px; /* 아래 여백 추가 */

    & img {
        width: 70%;
        position: absolute;
        padding-right: 5%;
        bottom: 0;
        right: 0;
    }

    &:hover {
        transform: scale(1.05);
        /* box-shadow: 0px 1px 1px 1px var(--content-border-color); */
    }

    @media (max-width: 1200px) {
        width: 45%; /* 화면 크기가 768px 이하일 때는 세로로 나열되도록 너비 조정 */
    }

    @media (max-width: 680px) {
        width: 100%; /* 화면 크기가 480px 이하일 때는 가로로 나열되도록 너비 조정 */
    }
`;

const StTitle = styled.p`
    font-size: 23px;
`;

const StContent = styled.p`
    font-size: 16px;
    margin-top: 20px;
`;
