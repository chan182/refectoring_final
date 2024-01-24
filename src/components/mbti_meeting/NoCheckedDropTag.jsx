import React from 'react';
import styled from 'styled-components';
import dropArrow from '../../assets/home/dropArrow.png';
import foldArrow from '../../assets/home/foldArrow.png';

const NoCheckedDropTag = ({
    tagCategory,
    setTagCategory,
    setSelectedTags,
    zoneSelectHandler,
    genderSelectHandler,
    ageSelectHandler,
    MbtiSelectHandler
}) => {
    return (
        <StContainer>
            <StContent>원하는 조건으로 모임 찾기</StContent>
            <StButtonBox>
                <StButton onClick={() => zoneSelectHandler()}>
                    지역
                    {tagCategory === '지역' ? <img src={foldArrow} /> : <img src={dropArrow} />}
                </StButton>
                <StButton onClick={() => genderSelectHandler()}>
                    성별
                    {tagCategory === '성별' ? <img src={foldArrow} /> : <img src={dropArrow} />}
                </StButton>
                <StButton onClick={() => ageSelectHandler()}>
                    나이
                    {tagCategory === '나이' ? <img src={foldArrow} /> : <img src={dropArrow} />}
                </StButton>
                <StButton onClick={() => MbtiSelectHandler()}>
                    MBTI
                    {tagCategory === 'MBTI' ? <img src={foldArrow} /> : <img src={dropArrow} />}
                </StButton>
            </StButtonBox>
        </StContainer>
    );
};

export default NoCheckedDropTag;

const StContainer = styled.div`
    height: 162px;
    width: 1200px;
    font-size: 18px;
    padding: 40px;
    border: 1px solid var(--content-border-color);
    border-radius: 26px;
    background-color: #ffffff;
`;

const StContent = styled.p`
    font-size: 22px;
    color: #121212;
`;

const StButtonBox = styled.div`
    width: 100%;
    height: 100px;
    margin-top: 16px;
`;

const StButton = styled.button`
    min-width: 80px;
    max-width: 100px;
    height: 44px;
    border-radius: 8px;
    border: 1px solid var(--button-border-color);
    font-size: 22px;
    margin-right: 28px;
    padding-left: 10px;
    padding-right: 10px;

    img {
        width: 15px;
        margin: 3px 0px 0px 7px;
    }
`;
