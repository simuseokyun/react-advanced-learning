import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import DraggableCard from './draggableCard';

const Wrapper = styled.div`
    padding: 20px 10px;
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 5px;
    min-height: 200px;
`;

interface IBoardProps {
    toDos: string[];
    boardId: string;
}

function Board({ toDos, boardId }: IBoardProps) {
    return (
        <Droppable droppableId={boardId}>
            {(magic) => (
                <Wrapper ref={magic.innerRef} {...magic.droppableProps}>
                    {toDos.map((toDo, index) => {
                        return <DraggableCard key={toDo} i={index} toDo={toDo} />;
                    })}
                    {magic.placeholder}
                </Wrapper>
            )}
        </Droppable>
    );
}
export default Board;
