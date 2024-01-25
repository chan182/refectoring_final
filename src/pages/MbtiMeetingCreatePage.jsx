import React from 'react';
import styled from 'styled-components';
import DropTag from '../components/mbti_meet/DropTag';
import ExplainMeeting from '../components/mbti_meet/ExplainMeeting';
import MbtiMeetingCreate from '../components/mbti_meet/MbtiMeetingCreate';
import { useRecoilValueLoadable } from 'recoil';
import {
    meetingRepreImgState,
    meetingNameState,
    meetingManagerNameState,
    meetingLimitPeopleState,
    meetingScheduleState,
    meetingKakaoUrlState,
    meetingOneLineIntroState,
    meetingIntroTitleState,
    meetingIntroContentState,
    selectedTagsState
} from '../recoil/recoilAtoms';
import { db } from '../firebase/firebase.config';
import { useNavigate } from 'react-router';

const MbtiMeetingCreatePage = () => {
    const meetingRepreImg = useRecoilValueLoadable(meetingRepreImgState);
    const meetingName = useRecoilValueLoadable(meetingNameState);
    const meetingManagerName = useRecoilValueLoadable(meetingManagerNameState);
    const meetingLimitPeople = useRecoilValueLoadable(meetingLimitPeopleState);
    const meetingSchedule = useRecoilValueLoadable(meetingScheduleState);
    const meetingKakaoUrl = useRecoilValueLoadable(meetingKakaoUrlState);
    const meetingOneLineIntro = useRecoilValueLoadable(meetingOneLineIntroState);
    const meetingIntroTitle = useRecoilValueLoadable(meetingIntroTitleState);
    const meetingIntroContent = useRecoilValueLoadable(meetingIntroContentState);
    const selectedTags = useRecoilValueLoadable(selectedTagsState);

    const nav = useNavigate();

    const createMeetingButtonHandler = async () => {
        try {
            const meetCollectionRef = db.collection('meet');

            const meetingData = {
                meetingRepreImg: meetingRepreImg.contents,
                meetingName: meetingName.contents,
                meetingManagerName: meetingManagerName.contents,
                meetingLimitPeople: meetingLimitPeople.contents,
                meetingSchedule: meetingSchedule.contents,
                meetingKakaoUrl: meetingKakaoUrl.contents,
                meetingOneLineIntro: meetingOneLineIntro.contents,
                meetingIntroTitle: meetingIntroTitle.contents,
                meetingIntroContent: meetingIntroContent.contents,
                selectedTags: selectedTags.contents
            };

            await meetCollectionRef.add(meetingData);
            console.log('meetingData가 성공적으로 meet 컬렉션에 추가되었습니다.');
            nav('/mbti/meeting');
        } catch (error) {
            console.error('meet 컬렉션에 meetingData를 추가하는 과정에서 오류가 발생했습니다:', error);
        }
    };

    return (
        <StWholeContainer>
            <MbtiMeetingCreate />
            <StHr />
            <DropTag />
            <StHr />
            <ExplainMeeting />
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
