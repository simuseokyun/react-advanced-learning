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
    max-width: 1000px;
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
    const onDragEnd = (info: DropResult) => {
        const { destination, source } = info;
        console.log(destination, source);
        if (!destination) return;
        if (destination?.droppableId === source.droppableId) {
            setToDos((oldToDos) => {
                const boardCopy = [...oldToDos[source.droppableId]];
                const taskObj = boardCopy[source.index];
                boardCopy.splice(source.index, 1);
                boardCopy.splice(destination?.index, 0, taskObj);
                return {
                    ...oldToDos,
                    [source.droppableId]: boardCopy,
                };
            });
        }
        if (destination?.droppableId !== source.droppableId) {
            setToDos((allBoard) => {
                const sourceBoard = [...allBoard[source.droppableId]];
                const targetBoard = [...allBoard[destination.droppableId]];
                const taskObj = sourceBoard[source.index];

                sourceBoard.splice(source.index, 1);
                targetBoard.splice(destination?.index, 0, taskObj);
                return {
                    ...allBoard,
                    [source.droppableId]: sourceBoard,
                    [destination.droppableId]: targetBoard,
                };
            });
        }
    };
    return (
        <>
            <GlobalStyle />
            <DragDropContext onDragEnd={onDragEnd}>
                <Wrapper>
                    <Boards>
                        {Object.keys(toDos)?.map((boardId) => (
                            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
                        ))}
                    </Boards>
                </Wrapper>
            </DragDropContext>
        </>
    );
}

export default App;
