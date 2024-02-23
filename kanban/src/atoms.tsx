// import { atom, selector } from 'recoil';

// export const minuteState = atom({
//     key: 'minutes',
//     default: 0,
// });
// export const hourState = atom({
//     key: 'hours',
//     default: 0,
// });

// export const hourSelector = selector<number>({
//     key: 'hours',
//     get: ({ get }) => {
//         const minutes = get(minuteState);
//         return minutes / 60;
//     },
//     set: ({ set }, newValue) => {
//         const minutes = Number(newValue) * 60;
//         set(minuteState, minutes);
//     },
// });
import { atom } from 'recoil';
interface IToDoState {
    [key: string]: string[];
}

export const toDoState = atom<IToDoState>({
    key: 'toDoState',
    default: {
        to_do: ['a', 'b'],
        doing: ['c', 'd', 'e'],
        done: ['f'],
    },
});
