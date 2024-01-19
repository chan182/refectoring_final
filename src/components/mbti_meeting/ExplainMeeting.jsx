import React from 'react';
import styled from 'styled-components';
import PeedEditor from '../mbti_community/PeedEditor';

const ExplainMeeting = () => {
    return (
        <>
            <StTitle>모임 설명</StTitle>
            <StBox>
                <PeedEditor />
            </StBox>
        </>
    );
};

export default ExplainMeeting;

const StBox = styled.div`
    height: 540px;
    width: 1200px;
    font-size: 18px;
    padding: 20px;
    background-color: #ffffff;
    border: 1px solid var(--content-border-color);
    border-radius: 1rem;
    margin-bottom: 100px;
`;

const StTitle = styled.p`
    font-size: 26px;
    margin: 0px 0px 10px 20px;
`;
