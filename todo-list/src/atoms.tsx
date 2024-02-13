import { atom, selector } from 'recoil'; // selector 는 atom의 output을 변형시키는 도구
export enum Categories {
    // enum 은 코드 상으로는 숫자임 / 문자로 표현이 가능할 뿐
    'ToDo',
    'Doing',
    'Done',
}

export interface ITodo {
    text: string;
    category: Categories;
    id: number;
}
export const categoryState = atom<Categories>({
    key: 'category',
    default: Categories.ToDo,
});
export const toDoState = atom<ITodo[]>({ key: 'toDo', default: [] });

export const toDoSelector = selector({
    key: 'toDoSelector',
    get: ({ get }) => {
        const toDos = get(toDoState);
        const category = get(categoryState);

        return toDos.filter((toDo) => toDo.category === category);
    },
});
