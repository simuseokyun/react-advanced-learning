import { CreateToDo } from './CreateToDo';
import { Categories, categoryState, toDoSelector, toDoState } from '../atoms';
import { selector, useRecoilState, useRecoilValue } from 'recoil';
import { ToDo } from './ToDo';

export const ToDoList = () => {
    const toDos = useRecoilValue(toDoSelector);
    const [category, setCategory] = useRecoilState(categoryState);
    const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
        setCategory(event.currentTarget.value as any);
    };
    return (
        <div>
            <h1>ToDoList</h1>
            <hr />

            <select value={category} onInput={onInput}>
                <option value={Categories.ToDo}>To Do</option>
                <option value={Categories.Doing}>Doing</option>
                <option value={Categories.Done}>Done</option>
            </select>
            <CreateToDo />
            {toDos?.map((toDo) => {
                return <ToDo key={toDo.id} {...toDo} />;
            })}

            <hr />
        </div>
    );
};

// export const ToDoList = () => {
//     const { register, watch, handleSubmit, formState, setError } = useForm();

//     const onValid = (data: any) => {
//         const { email, firstName } = data;
//         console.log(email, firstName);
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit(onValid)}>
//                 <input
//                     {...register('email', {
//                         required: 'email is error',
//                         pattern: {
//                             value: /^[A-Za-z0-9._%+-]+@naver.com$/,
//                             message: 'sd',
//                         },
//                     })}
//                     type="text"
//                     placeholder="test"
//                 />

//                 <input {...register('firstName')} type="text" placeholder="test" />

//                 <button>Add</button>
//             </form>
//         </div>
//     );
// };
