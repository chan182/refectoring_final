import React from 'react';
import styled, { css } from 'styled-components';
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
            const currentDate = new Date();

            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() + 1;
            const date = currentDate.getDate();
            const hours = currentDate.getHours();
            const minutes = currentDate.getMinutes();
            const seconds = currentDate.getSeconds();

            const updatedMeeting = {
                ...newMeeting,
                date: `${year}/${month}/${date}  ${hours}:${minutes}:${seconds}`
            };

            setNewMeeting(updatedMeeting);

            const meetCollectionRef = await addDoc(collection(db, 'meet'), updatedMeeting);
            console.log('모임이 성공적으로 meet 컬렉션에 추가되었습니다.');

            // newMeeting 상태 초기화
            setNewMeeting(null);

            nav('/mbti/meeting');
        } catch (error) {
            console.error('meet 컬렉션에 newMeeting 데이터를 추가하는 과정에서 오류가 발생했습니다:', error);
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
                <StCreateButton
                    disabled={
                        !newMeeting ||
                        !newMeeting.repreImg ||
                        !newMeeting.name ||
                        !newMeeting.managerName ||
                        !newMeeting.limitPeople ||
                        !newMeeting.schedule ||
                        !newMeeting.kakaoUrl ||
                        !newMeeting.oneLineIntro ||
                        !newMeeting.locations ||
                        !newMeeting.genders ||
                        !newMeeting.ages ||
                        !newMeeting.mbtis ||
                        !newMeeting.content
                    }
                    onClick={() => createMeetingButtonHandler()}
                >
                    생성하기
                </StCreateButton>
                <StCancelButton onClick={() => nav('/')}>취소하기</StCancelButton>
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
    margin-right: 10px;
    cursor: pointer;

    ${(props) => {
        if (props.disabled) {
            return css`
                background-color: var(--bold-gray);
            `;
        }
        return css`
            background-color: var(--main-button-color);
            color: white;
        `;
    }}
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
