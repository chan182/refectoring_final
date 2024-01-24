// MBTI 모임 작성 페이지
// Recoil 상태 정의
import { atom } from 'recoil';

export const tagCategoryState = atom({
    key: 'tagCategoryState',
    default: ''
});

export const selectedTagsState = atom({
    key: 'selectedTagsState',
    default: []
});
