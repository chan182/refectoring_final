import React, { useState } from 'react';
import styled from 'styled-components';
import dropArrow from '../../assets/home/dropArrow.png';
import foldArrow from '../../assets/home/foldArrow.png';

const DropTag = () => {
    const [zone, setZone] = useState(false);
    const [gender, setGender] = useState(false);
    const [age, setAge] = useState(false);
    const [mbti, setMbti] = useState(false);

    const toggleHandler = () => {
        setZone(!zone);
        console.log(zone);
    };

    return (
        <StTopContainerBox>
            <StTitle>모임 태그 </StTitle>
            <StTopContainer>
                <StContent>원하는 조건으로 모임 찾기</StContent>
                <StButtonBox>
                    <StButton onClick={() => toggleHandler()}>
                        지역
                        {zone ? <img src={foldArrow} /> : <img src={dropArrow} />}
                    </StButton>
                    <StButton>
                        성별
                        <img src={dropArrow} />
                    </StButton>
                    <StButton>
                        나이
                        <img src={dropArrow} />
                    </StButton>
                    <StButton>
                        MBTI
                        <img src={dropArrow} />
                    </StButton>
                </StButtonBox>
                <StHr />
                <StCheckbox>
                    <input type="checkbox"></input>
                    <StP>전체</StP>
                    <input type="checkbox"></input>
                    <StP>서울</StP>
                    <input type="checkbox"></input>
                    <StP>인천</StP>
                    <input type="checkbox"></input>
                    <StP>대전</StP>
                    <input type="checkbox"></input>
                    <StP>광주</StP>
                    <input type="checkbox"></input>
                    <StP>대구</StP>
                    <input type="checkbox"></input>
                    <StP>부산</StP>
                    <input type="checkbox"></input>
                    <StP>울산</StP>
                </StCheckbox>
                <StCheckbox>
                    <input type="checkbox"></input>
                    <StP>경기</StP>
                    <input type="checkbox"></input>
                    <StP>강원</StP>
                    <input type="checkbox"></input>
                    <StP>충북</StP>
                    <input type="checkbox"></input>
                    <StP>충남</StP>
                    <input type="checkbox"></input>
                    <StP>전북</StP>
                    <input type="checkbox"></input>
                    <StP>전남</StP>
                    <input type="checkbox"></input>
                    <StP>경북</StP>
                    <input type="checkbox"></input>
                    <StP>경남</StP>
                    <input type="checkbox"></input>
                    <StP>제주</StP>
                </StCheckbox>
            </StTopContainer>
        </StTopContainerBox>
    );
};

export default DropTag;

const StTopContainerBox = styled.div`
    font-size: 26px;
`;

const StTopContainer = styled.div`
    height: 333px;
    width: 1200px;
    font-size: 18px;
    margin-top: 5px;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    padding: 28px;
    border-radius: 1rem;
    border: 1px solid var(--content-border-color);
`;

const StTitle = styled.p`
    font-size: 26px;
    margin: 0px 0px 10px 20px;
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
    margin-top: 43px;
    margin-bottom: 43px;
    width: 1120px;
`;
