import { atom } from 'recoil';

export const isDarkAtom = atom({
    // atom 은 두 가지 값을 필수로 하고 key는 고유한 값
    key: 'isDark',
    default: false,
});
