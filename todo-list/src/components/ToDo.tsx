import { useRecoilValue, useSetRecoilState } from 'recoil';
import { toDoState } from '../atoms';

import { Categories } from '../atoms';
import { ITodo } from '../atoms';
export const ToDo = ({ text, category, id }: ITodo) => {
    const toDos = useRecoilValue(toDoState);
    const setToDos = useSetRecoilState(toDoState);
    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget: { name },
        } = event;
        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);

            const newToDo = { text, id, category: name as any };

            return [...oldToDos.slice(0, targetIndex), newToDo, ...oldToDos.slice(targetIndex + 1)];
        });
    };
    return (
        <li>
            <span>{text}</span>
            {category !== Categories.Doing && (
                <button name={Categories.Doing + ''} onClick={onClick}>
                    Doing
                </button>
            )}
            {category !== Categories.Done && (
                <button name={Categories.Done + ''} onClick={onClick}>
                    Done
                </button>
            )}
            {category !== Categories.ToDo && (
                <button name={Categories.ToDo + ''} onClick={onClick}>
                    ToDo
                </button>
            )}
        </li>
    );
};
