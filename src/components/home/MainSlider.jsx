import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import styled from 'styled-components';

const MainSlider = () => {
    return (
        <StSlide>
            <Slider {...settings}>
                <List>슬라이드 1</List>
                <List>슬라이드 2</List>
                <List>슬라이드 3</List>
            </Slider>
        </StSlide>
    );
};

export default MainSlider;

const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 1000,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    /*variableWidth: true,*/
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true
};

const StSlide = styled.div`
    width: 100%;
    height: 350px;

    .slick-prev:hover:before,
    .slick-prev:focus:before,
    .slick-next:hover:before,
    .slick-next:focus:before {
        opacity: 0.5;
    }

    .slick-prev:before,
    .slick-next:before {
        height: 80px;
        font-size: 50px;
        color: black;
        opacity: 0.6;
    }

    .slick-prev {
        left: 50px;
        z-index: 10;
    }

    .slick-next {
        right: 80px;
    }

    .slick-dots {
        bottom: 10px;
    }
`;

const List = styled.div`
    /*
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    */
    width: 100%;
    height: 350px;
    background-color: lightgray;
    border: 1px solid black;
`;
