import React from 'react';
import styled from 'styled-components';
import MainSlider from './MainSlider';

const Home = () => {
    return (
        <>
            <MainSlider />

            <StBox>
                <StComponents>
                    <StComponent>
                        <StTitle>MBTI 검사</StTitle>
                        <StContent>본인의 MBTI가 무엇인지 알아보세요 !</StContent>
                    </StComponent>
                    <StComponent>
                        <StTitle>MBTI 모임</StTitle>
                        <StContent>여러 사람들과 소통하는 모임을 만들어 보세요 !</StContent>
                    </StComponent>
                    <StComponent>
                        <StTitle>MBTI 궁합</StTitle>
                        <StContent>우리의 MBTI 궁합이 궁금해요 !</StContent>
                    </StComponent>
                    <StComponent>
                        <StTitle>커뮤니티</StTitle>
                        <StContent>다양한 사람들과 자유롭게 소통하세요 !</StContent>
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
    width: 80%;
    height: 100%;
    padding-top: 40px;
    background-color: white;
    display: flex;
    justify-content: space-around;
`;

const StComponent = styled.div`
    width: 300px;
    height: 300px;
    border-radius: 20px;
    padding: 30px;
    background-color: var(--light-gray);

    &:hover {
        transform: scale(1.05);
        box-shadow: 2px 2px 2px 2px grey;
    }
`;

const StTitle = styled.p`
    font-size: 23px;
`;

const StContent = styled.p`
    font-size: 16px;
    margin-top: 20px;
`;
