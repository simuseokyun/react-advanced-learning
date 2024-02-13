import { atom, useSetRecoilState, useRecoilValue } from 'recoil';
export interface ITodo {
    text: string;
    category: 'Doing' | 'ToDo' | 'Done';
    id: number;
}
export const toDoState = atom<ITodo[]>({ key: 'toDo', default: [] });
