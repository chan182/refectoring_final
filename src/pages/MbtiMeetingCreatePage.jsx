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
