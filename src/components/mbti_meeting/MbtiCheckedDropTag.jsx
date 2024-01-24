import React, { useState } from 'react';
import styled from 'styled-components';
import dropArrow from '../../assets/home/dropArrow.png';
import foldArrow from '../../assets/home/foldArrow.png';

const MbtiCheckedDropTag = ({
    tagCategory,
    setTagCategory,
    setSelectedTags,
    zoneSelectHandler,
    genderSelectHandler,
    ageSelectHandler,
    MbtiSelectHandler
}) => {
    return (
        <>
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
                <StHr />
                {tagCategory === '선택없음' && <div>선택없음</div>}
                <StCheckbox>
                    <input type="checkbox"></input>
                    <StP>전체</StP>
                    <input type="checkbox"></input>
                    <StP>E</StP>
                    <input type="checkbox"></input>
                    <StP>I</StP>
                    <input type="checkbox"></input>
                    <StP>N</StP>
                    <input type="checkbox"></input>
                    <StP>S</StP>
                    <input type="checkbox"></input>
                    <StP>F</StP>
                    <input type="checkbox"></input>
                    <StP>T</StP>
                    <input type="checkbox"></input>
                    <StP>P</StP>
                    <input type="checkbox"></input>
                    <StP>J</StP>
                </StCheckbox>
            </StContainer>
        </>
    );
};

export default MbtiCheckedDropTag;

const StContainer = styled.div`
    //height: 333px;
    width: 1200px;
    font-size: 18px;
    padding: 28px 0px 0px 40px;
    padding-bottom: 10px;
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
    height: 45px;
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

const StCheckbox = styled.label`
    font-size: 22px;
    display: flex;
    align-items: center;
    margin-bottom: 28px;

    & input {
        width: 1.5rem;
        height: 1.5rem;
        margin-right: 4px;

        :checked {
            width: 1.5rem;
            height: 1.5rem;
            margin-right: 4px;
            border: none;
            color: white;
            background-color: var(--main-button-color);
        }
    }
`;

const StP = styled.p`
    margin-right: 24px;
`;

const StHr = styled.hr`
    border: 1px solid var(--hr-border-color);
    border-width: 1px 0 0 0;
    margin-top: 42px;
    margin-bottom: 42px;
    margin-right: 40px;
`;
