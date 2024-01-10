import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
    key: 'userInfo',
    storage: localStorage // 저장은 여기에 해야지!
});

export const loginIdAtom = atom({
    key: 'loginIdAtom',
    default: '',
    effects_UNSTABLE: [persistAtom]
});
