// MBTI 모임 작성 페이지
// Recoil 상태 정의
import { atom } from 'recoil';

//  dropTag 정보
export const tagCategoryState = atom({
    key: 'tagCategoryState',
    default: ''
});

// MBTI Meeting 메인 페이지 검색 정보 저장
export const selectedTagsState = atom({
    key: 'selectedTagsState',
    default: []
});

// MBTI Meeting 생성 페이지 입력 정보 저장
export const createMeetingState = atom({
    key: 'newMeeting',
    default: {}
});
