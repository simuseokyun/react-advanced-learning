import { useForm } from 'react-hook-form';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { categoryState, toDoState } from '../atoms';

interface IForm {
    todo: string;
}

export const CreateToDo = () => {
    const { handleSubmit, register, setValue } = useForm<IForm>();
    const setToDos = useSetRecoilState(toDoState);
    const category = useRecoilValue(categoryState);
    const handleValid = ({ todo }: IForm) => {
        setValue('todo', '');
        setToDos((oldToDos) => [{ id: Date.now(), text: todo, category }, ...oldToDos]);
    };
    return (
        <form onSubmit={handleSubmit(handleValid)}>
            <input {...register('todo', { required: true })} type="text" placeholder="Write a to do" />
            <button>Add</button>
        </form>
    );
};
