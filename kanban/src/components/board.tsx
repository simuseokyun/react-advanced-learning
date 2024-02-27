import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import DraggableCard from './draggableCard';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toDoState } from '../atoms';
import { useSetRecoilState } from 'recoil';
import { IToDo } from '../atoms';

interface IForm {
    toDo: string;
}

const Wrapper = styled.div`
    width: 300px;
    padding: 20px 10px;
    padding-top: 10px;
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 5px;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    text-align: center;
`;
const Title = styled.h1`
    font-size: 20px;
`;

interface IAreaProps {
    isDraggingFromThis?: boolean;
    isDraggingOver: boolean;
}
const Area = styled.div<IAreaProps>`
    background-color: ${(props) =>
        props.isDraggingOver ? '#dfe6e9' : props.isDraggingFromThis ? '#b2bec3' : 'transparent'};
    flex-grow: 1;
    transition: background-color 0.3s ease-in-out;
    padding: 20px;
`;
interface IBoardProps {
    toDos: IToDo[];
    boardId: string;
}

function Board({ toDos, boardId }: IBoardProps) {
    const { register, setValue, handleSubmit } = useForm<IForm>();
    const setToDos = useSetRecoilState(toDoState);

    // const inputRef = useRef<HTMLInputElement>(null); // 일종의 selector 개념
    // const onClick = () => {
    //     inputRef.current?.focus();
    // };
    const onValid = ({ toDo }: IForm) => {
        const newToDo = {
            id: Date.now(),
            text: toDo,
        };
        setToDos((allBoards) => {
            return { ...allBoards, [boardId]: [...allBoards[boardId], newToDo] };
        });
        setValue('toDo', '');
    };
    const Form = styled.form`
        width: 100%;
    `;
    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <Form onSubmit={handleSubmit(onValid)}>
                <input {...register('toDo', { required: true })} type="text" placeholder={`Add task on ${boardId}`} />
                {/* <button style={{ marginLeft: '5px', display: 'inline-block' }}>추가</button> */}
            </Form>
            <Droppable droppableId={boardId}>
                {(magic, snapshot) => (
                    <Area isDraggingOver={snapshot.isDraggingOver} ref={magic.innerRef} {...magic.droppableProps}>
                        {toDos?.map((toDo, index) => {
                            return <DraggableCard key={toDo.id} index={index} toDoId={toDo.id} toDoText={toDo.text} />;
                        })}
                        {magic.placeholder}
                    </Area>
                )}
            </Droppable>
        </Wrapper>
    );
}
export default Board;
