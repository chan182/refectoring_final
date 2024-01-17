import { atom } from 'recoil';

export const userAtom = atom({
    key: 'userAtom',
    default: ''
});

export const isEditingAtom = atom({
    key: 'isEditing', // 고유 키
    default: false // 초기값
});

export const eventsState = atom({
    key: 'eventsState',
    default: []
});
