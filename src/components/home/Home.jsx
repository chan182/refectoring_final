import React from 'react';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import mbti_community from '../../assets/home/mbti_community.png';
import mbti_matching from '../../assets/home/mbti_matching.png';
import mbti_meeting from '../../assets/home/mbti_meeting.png';
import mbti_test from '../../assets/home/mbti_test.png';
=======
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getData } from '../../api/meeting';
import mbti_community from '../../assets/home/mbti_community.webp';
import mbti_matching from '../../assets/home/mbti_matching.webp';
import mbti_meeting from '../../assets/home/mbti_meeting.webp';
import mbti_test from '../../assets/home/mbti_test.webp';
>>>>>>> 6793bd2a82989be5719d07c48574b43a198f0369
import MainSlider from './MainSlider';

const Home = () => {
    const navigate = useNavigate();
    const { data } = useQuery({
        queryKey: ['meet'],
        queryFn: getData
    });
    console.log(data);
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
            <div>
                {data?.map((item) => {
                    <>{item.data.name}</>;
                })}
            </div>
        </StContainer>
    );
};

export default Home;

const StContainer = styled.div`
<<<<<<< HEAD
    width: 100%;
    height: 80vh;
=======
    height: 100vh;
>>>>>>> 6793bd2a82989be5719d07c48574b43a198f0369
`;

const StBox = styled.div``;

const StCards = styled.div`
    display: flex;
    width: 80%;
    padding-top: 40px;
<<<<<<< HEAD
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
=======
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
>>>>>>> 6793bd2a82989be5719d07c48574b43a198f0369

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

    @media (max-width: 1200px) {
        width: 45%; /* 화면 크기가 768px 이하일 때는 세로로 나열되도록 너비 조정 */
    }

    @media (max-width: 680px) {
        width: 100%; /* 화면 크기가 480px 이하일 때는 가로로 나열되도록 너비 조정 */
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
