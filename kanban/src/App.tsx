import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';
import { toDoState } from './atoms';
import Board from './components/board';

const GlobalStyle = createGlobalStyle`
    body{
        color:black;
        font-size:20px;
        background-color: ${(props) => props.theme.bgColor};
    }
`;
const Wrapper = styled.div`
    display: flex;
    max-width: 500px;
    width: 100%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;
const Boards = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
`;

function App() {
    const [toDos, setToDos] = useRecoilState(toDoState);
    const onDragEnd = ({ destination, source, draggableId }: DropResult) => {
        if (!destination) return;
    };
    return (
        <>
            <GlobalStyle />
            <DragDropContext onDragEnd={onDragEnd}>
                <Wrapper>
                    <Boards>
                        {Object.keys(toDos).map((boardId) => (
                            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
                        ))}
                    </Boards>
                </Wrapper>
            </DragDropContext>
        </>
    );
}

export default App;
