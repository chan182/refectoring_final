import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getBoardData } from '../../api/board';
import { getData } from '../../api/meeting';
import mbti_community from '../../assets/home/mbti_community.webp';
import mbti_matching from '../../assets/home/mbti_matching.webp';
import mbti_meeting from '../../assets/home/mbti_meeting.webp';
import mbti_test from '../../assets/home/mbti_test.webp';
import MainSlider from './MainSlider';

const Home = () => {
    const navigate = useNavigate();

    const { data } = useQuery({
        queryKey: ['meet'],
        queryFn: getData
    });

    const { boardData } = useQuery({
        queryKey: ['communities'],
        queryFn: getBoardData
    });
    console.log(data);
    const filtredData = data?.filter((item, index) => index < 5);
    const filteredBoardData = boardData?.filter((item, index) => index < 5);

    return (
        <>
            <MainSlider />
            <StBox>
                <StCards>
                    <StCard onClick={() => navigate('/mbti/test')}>
                        <StTitle>MBTI 검사</StTitle>
                        <StContent>본인의 MBTI가 무엇인지 알아보세요</StContent>
                        <img src={mbti_test} alt="testPage" />
                    </StCard>
                    <StCard onClick={() => navigate('/mbti/meeting')}>
                        <StTitle>MBTI 모임</StTitle>
                        <StContent>여러 사람들과 소통하는 모임을 만들어 보세요</StContent>
                        <img src={mbti_meeting} alt="meetingPage" />
                    </StCard>
                    <StCard onClick={() => navigate('/mbti/matching')}>
                        <StTitle>MBTI 궁합</StTitle>
                        <StContent>우리의 MBTI 궁합이 궁금해요 !</StContent>
                        <img src={mbti_matching} alt="matchingPage" />
                    </StCard>
                    <StCard onClick={() => navigate('/mbti/community')}>
                        <StTitle>커뮤니티</StTitle>
                        <StContent>다양한 사람들과 자유롭게 소통하세요 !</StContent>
                        <img src={mbti_community} alt="communityPage" />
                    </StCard>
                </StCards>
            </StBox>
            <StTitle>인기 모임 Best 5 </StTitle>
            <Stwrapper>
                {filtredData?.map((item) => {
                    return (
                        <div key={item.id}>
                            <StImg src={item.data.repreImg} />
                        </div>
                    );
                })}
            </Stwrapper>{' '}
        </>
    );
};

export default Home;

const StBox = styled.div`
    display: flex;
    justify-content: center;
    gap: 3rem;
`;

const StCards = styled.div`
    display: flex;
    width: 80%;
    padding-top: 40px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
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

    @media (max-width: 1200px) {
        width: 45%; /* 화면 크기가 768px 이하일 때는 세로로 나열되도록 너비 조정 */
    }

    @media (max-width: 680px) {
        width: 100%; /* 화면 크기가 480px 이하일 때는 가로로 나열되도록 너비 조정 */
    }
`;

const StTitle = styled.p`
    text-align: center;
    margin-top: 2rem;
    font-size: 2rem;
    padding: 2rem;
`;

const StContent = styled.p`
    color: #6b6a6a;
    font-size: 1.2rem;
    margin-top: 20px;
`;

const Stwrapper = styled.div`
    margin: 2rem;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 3rem;

    border-radius: 1rem;
    padding: 2rem;
`;

const StImg = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 2rem;
`;
