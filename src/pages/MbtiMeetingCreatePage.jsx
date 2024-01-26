import React from 'react';
import styled from 'styled-components';
import MbtiMeetingCreateTags from '../components/mbti_meeting/MbtiMeetingCreateTags';
import MbtiMeetingExplainMeeting from '../components/mbti_meeting/MbtiMeetingExplainMeeting';
import MbtiMeetingCreateInfo from '../components/mbti_meeting/MbtiMeetingCreateInfo';
import { useRecoilState } from 'recoil';
import { createMeetingState } from '../recoil/recoilAtoms';

import { db } from '../firebase/firebase.config';
import { addDoc, collection } from 'firebase/firestore';

import { useNavigate } from 'react-router';

const MbtiMeetingCreatePage = () => {
    const [newMeeting, setNewMeeting] = useRecoilState(createMeetingState);

    const nav = useNavigate();

    const createMeetingButtonHandler = async () => {
        try {
            const meetCollectionRef = await addDoc(collection(db, 'meet'), newMeeting);
            console.log('모임이 성공적으로 meet 컬렉션에 추가되었습니다.');
            nav('/mbti/meeting');
        } catch (error) {
            console.error('meet 컬렉션에 meetingData를 추가하는 과정에서 오류가 발생했습니다:', error);
        }
    };

    return (
        <StWholeContainer>
            <MbtiMeetingCreateInfo />
            <StHr />
            <MbtiMeetingCreateTags />
            <StHr />
            <MbtiMeetingExplainMeeting />
            <StBtnBox>
                <StCreateButton onClick={() => createMeetingButtonHandler()}>생성하기</StCreateButton>
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