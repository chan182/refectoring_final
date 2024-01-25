// MBTI 모임 작성 페이지
// Recoil 상태 정의
import { atom } from 'recoil';

//  dropTag 정보
export const tagCategoryState = atom({
    key: 'tagCategoryState',
    default: ''
});

export const selectedTagsState = atom({
    key: 'selectedTagsState',
    default: []
});

// 모임 정보
export const meetingRepreImgState = atom({
    key: 'meetingRepreImgState',
    default: ''
});

export const meetingNameState = atom({
    key: 'meetingNameState',
    default: ''
});

export const meetingManagerNameState = atom({
    key: 'meetingManagerNameState',
    default: ''
});

export const meetingLimitPeopleState = atom({
    key: 'meetingLimitPeopleState',
    default: ''
});

export const meetingScheduleState = atom({
    key: 'meetingScheduleState',
    default: ''
});

export const meetingKakaoUrlState = atom({
    key: 'meetingKakaoUrlState',
    default: ''
});

export const meetingOneLineIntroState = atom({
    key: 'meetingOneLineIntroState',
    default: ''
});

export const meetingIntroTitleState = atom({
    key: 'meetingIntroTitleState',
    default: ''
});

export const meetingIntroContentState = atom({
    key: 'meetingIntroContentState',
    default: ''
});

export const createMeetingState = atom({
    key: 'newMeeting',
    default: {}
});
