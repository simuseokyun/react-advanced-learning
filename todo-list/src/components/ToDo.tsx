import { useRecoilValue, useSetRecoilState } from 'recoil';
import { toDoState } from '../atoms';

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
            const oldToDo = oldToDos[targetIndex];
            const newToDo = { text, id, category: 'name' };
            return oldToDos;
        });
    };
    return (
        <li>
            <span>{text}</span>
            {category !== 'Doing' && (
                <button name="Doing" onClick={onClick}>
                    Doing
                </button>
            )}
            {category !== 'Done' && (
                <button name="Done" onClick={onClick}>
                    Done
                </button>
            )}
            {category !== 'ToDo' && (
                <button name="ToDo" onClick={onClick}>
                    ToDo
                </button>
            )}
        </li>
    );
};
