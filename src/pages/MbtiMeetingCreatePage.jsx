import React from 'react';
import styled from 'styled-components';
import DropTag from '../components/mbti_meeting/DropTag';
import ExplainMeeting from '../components/mbti_meeting/ExplainMeeting';
import MbtiMeetingCreate from '../components/mbti_meeting/MbtiMeetingCreate';

const MbtiMeetingCreatePage = () => {
    return (
        <StWholeContainer>
            <MbtiMeetingCreate />
            <StHr />
            <DropTag />
            <StHr />
            <ExplainMeeting />
            <StBtnBox>
                <StCreateButton>생성하기</StCreateButton>
                <StCancelButton>취소하기</StCancelButton>
            </StBtnBox>
        </StWholeContainer>
    );
};

export default MbtiMeetingCreatePage;

const StWholeContainer = styled.div`
    height: 100%;
    width: 100%;
    display: grid;
    justify-content: center;
    background-color: var(--background-color);
`;

const StHr = styled.hr`
    border: 1px solid var(--hr-border-color);
    border-width: 1px 0 0 0;
    margin-top: 92px;
    margin-bottom: 92px;
    width: 1120px;
`;

const StBtnBox = styled.div`
    width: 100%;
    height: 50px;
    text-align: right;
    margin-bottom: 100px;
`;

const StCreateButton = styled.button`
    font-size: 20px;
    width: 196px;
    height: 48px;
    background-color: var(--main-button-color);
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    margin-right: 10px;
`;

const StCancelButton = styled.button`
    font-size: 20px;
    width: 196px;
    height: 48px;
    margin-right: 20px;
    background-color: #ecebf5;
    color: #b2afcf;
    border: none;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
        transition: ease-in-out 0.2s;
        background-color: var(--main-button-color);
        color: #fff;
    }
`;
