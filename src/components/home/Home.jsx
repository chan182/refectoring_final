import React from 'react';
import styled from 'styled-components';
import mbti_community from '../../assets/home/mbti_community.png';
import mbti_matching from '../../assets/home/mbti_matching.png';
import mbti_meeting from '../../assets/home/mbti_meeting.png';
import mbti_test from '../../assets/home/mbti_test.png';
import MainSlider from './MainSlider';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <>
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
        </>
    );
};

export default Home;

const StBox = styled.div`
    width: 100%;
    height: 350px;
    display: flex;
    justify-content: center;
`;

const StComponents = styled.div`
    width: 75%;
    height: 100%;
    padding-top: 40px;
    display: flex;
    justify-content: space-around;
`;

const StComponent = styled.div`
    width: 23%;
    height: 100%;
    border-radius: 16px;
    padding: 30px;
    box-shadow: 0px 0px 5px #d3d3d3;
    position: relative;

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
`;

const StTitle = styled.p`
    font-size: 23px;
`;

const StContent = styled.p`
    font-size: 16px;
    margin-top: 20px;
`;
