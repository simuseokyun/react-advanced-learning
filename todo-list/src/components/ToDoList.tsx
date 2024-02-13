import { CreateToDo } from './CreateToDo';
import { toDoState } from '../atoms';
import { useRecoilValue } from 'recoil';
import { ToDo } from './ToDo';

export const ToDoList = () => {
    const toDos = useRecoilValue(toDoState);
    return (
        <div>
            <h1>To Do</h1>
            <hr />
            <CreateToDo />
            <ul>
                {toDos.map((todo) => {
                    return <ToDo key={todo.id} {...todo} />;
                })}
            </ul>
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
