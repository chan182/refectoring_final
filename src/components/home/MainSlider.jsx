import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import styled from 'styled-components';

const MainSlider = () => {
    return (
        <StSlide>
            <Slider {...settings}>
                <List>
                    <StH1>슬라이드 1</StH1>
                    <StH2>슬라이드 1 내용입니다.</StH2>
                </List>
                <List>
                    <StH1>슬라이드 2</StH1>
                    <StH2>슬라이드 2 내용입니다.</StH2>
                </List>
                <List>
                    <StH1>슬라이드 3</StH1>
                    <StH2>슬라이드 3 내용입니다.</StH2>
                </List>
                <List>
                    <StH1>슬라이드 4</StH1>
                    <StH2>슬라이드 4 내용입니다.</StH2>
                </List>
            </Slider>
        </StSlide>
    );
};

export default MainSlider;

const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 3000,
    // centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    // variableWidth: true,
    autoplay: true,
    autoplaySpeed: 5000,
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
        bottom: 25px;
    }
`;

const List = styled.div`
    width: 100%;
    height: 350px;
    padding: 100px 0px 0px 250px;
    background-color: var(--light-gray);
`;

const StH1 = styled.h1`
    font-size: 50px;
    padding-bottom: 20px;
`;

const StH2 = styled.h2`
    font-size: 25px;
`;
