import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

// 유저의 uid 값 저장하기
const { persistAtom } = recoilPersist({
    key: 'userInfo',
    storage: localStorage // 저장은 여기에 해야지!
});

export const loginIdAtom = atom({
    key: 'loginIdAtom',
    default: '',
    effects_UNSTABLE: [persistAtom]
});

// 유저의 image url값 저장하기
const { persistAtom: persistUserImageAtom } = recoilPersist({
    key: 'userProfileImageInfo',
    storage: localStorage
});

export const UserImageAtom = atom({
    key: 'UserImageAtom',
    default: '',
    effects_UNSTABLE: [persistUserImageAtom]
});

// 유저의 name 값 저장하기
const { persistAtom: persistUserNameAtom } = recoilPersist({
    key: 'userNameInfo',
    storage: localStorage
});

export const UserNameAtom = atom({
    key: 'UserNameAtom',
    default: '',
    effects_UNSTABLE: [persistUserNameAtom]
});

// 유저의 mbti 값 저장하기
const { persistAtom: persistUserMbtiAtom } = recoilPersist({
    key: 'userMbtiInfo',
    storage: localStorage
});

export const UserMbtiAtom = atom({
    key: 'UserMbtiAtom',
    default: '',
    effects_UNSTABLE: [persistUserMbtiAtom]
});
