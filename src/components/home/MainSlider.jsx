import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import styled from 'styled-components';
import moveArrow from '../../assets/home/moveArrow.png';
import PeedBanner from '../../assets/home/mbtiPopularPeedBanner.jpg';
import MeetingBanner from '../../assets/home/mbtiPopularMeetingBanner.jpg';
import MbtiTestBanner from '../../assets/home/mbtiTestBanner.jpg';
import MbtiMatchinggBanner from '../../assets/home/mbtiMatchingBanner.jpg';
import { useNavigate } from 'react-router-dom';

const MainSlider = () => {
    const nav = useNavigate();

    return (
        <StSlide>
            <Slider {...settings}>
                <List1>
                    <StH1>MBTI 궁합 보러가기</StH1>
                    <StP>상대방과 나의 MBTI 궁합을 확인해보세요!</StP>
                    <StP onClick={() => nav('/mbti/matching')}>
                        MBTI 궁합 보러가기 <img src={moveArrow} />{' '}
                    </StP>
                </List1>
                <List2>
                    <StH1>나의 MBTI 알아보기</StH1>
                    <StP>검사를 통해 나의 MBTI를 확인해보세요!</StP>
                    <StP onClick={() => nav('/mbti/test')}>
                        MBTI 검사하기 <img src={moveArrow} />{' '}
                    </StP>
                </List2>
                <List3>
                    <StH1>우리동네 러닝 모임</StH1>
                    <StP>오늘 가장 인기있는 모임을 추천 합니다!</StP>
                    <StP onClick={() => nav('/mbti/meeting')}>
                        MBTI 모임 보러가기 <img src={moveArrow} />{' '}
                    </StP>
                </List3>
                <List4>
                    <StH1>집이 좋은 I 외출시키기</StH1>
                    <StP>오늘 가장 있기있는 게시글을 추천 합니다!</StP>
                    <StP onClick={() => nav('/mbti/community')}>
                        MBTI 커뮤니티 보러가기 <img src={moveArrow} />{' '}
                    </StP>
                </List4>
            </Slider>
        </StSlide>
    );
};

export default MainSlider;

const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 2000,
    // centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    // variableWidth: true,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true
};

const StSlide = styled.div`
    width: 100%;
    height: 350px;
    position: relative;

    .slick-prev:before,
    .slick-next:before {
        font-size: 50px;
        /* color: black; */
        opacity: 0.5;
    }

    .slick-prev {
        left: 160px;
        z-index: 1;
        cursor: pointer;
    }

    .slick-next {
        right: 200px;
        cursor: pointer;
    }

    .slick-dots {
        bottom: 10px;
    }
`;

const List1 = styled.div`
    width: 100%;
    height: 350px;
    padding: 100px 0px 0px 240px;
    background-image: url(${MbtiMatchinggBanner});
    background-color: lightgray;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;

const List2 = styled.div`
    width: 100%;
    height: 350px;
    padding: 100px 0px 0px 240px;
    background-image: url(${MbtiTestBanner});
    background-color: lightgray;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;

const List3 = styled.div`
    width: 100%;
    height: 350px;
    padding: 100px 0px 0px 240px;
    background-image: url(${MeetingBanner});
    background-color: lightgray;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;

const List4 = styled.div`
    width: 100%;
    height: 350px;
    padding: 100px 0px 0px 240px;
    background-image: url(${PeedBanner});
    background-color: lightgray;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;

const StH1 = styled.h1`
    font-size: 50px;
    color: #fcfcfc;
    margin-bottom: 12px;
`;

const StP = styled.p`
    font-size: 18px;
    color: #fcfcfc;
    margin-bottom: 48px;
    display: flex;
    cursor: pointer;

    img {
        margin-left: 6px;
        width: 18px;
        height: 18px;
    }
`;
