import React from 'react';
import { Snapshot, useRecoilState, useRecoilValue } from 'recoil';
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
    position: relative;
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

const Delete = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 100px;
    position: absolute;
    top: 20px;
    background-color: red;
    left: 20px;
`;
interface IArea {
    isDraggingOver: boolean;
}
interface IAreaa {
    isDragging: boolean;
}
const Area = styled.div<IArea>`
    width: 100px;
    height: 100px;
    position: absolute;
    top: 20px;
    left: 20px;
    background-color: red;
`;
const Areaa = styled.div<IAreaa>``;

function App() {
    const [toDos, setToDos] = useRecoilState(toDoState);
    const onDragEnd = (info: DropResult) => {
        const { destination, source } = info;
        console.log(info);
        console.log(toDos);
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
            if (destination?.droppableId === 'Delete') {
                setToDos((allData) => {
                    const boardCopy = [...allData[source.droppableId]];
                    boardCopy.splice(source.index, 1);
                    return { ...allData, [source.droppableId]: boardCopy };
                });
            } else {
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
                    <Droppable droppableId="Delete">
                        {(magic, snpashot) => {
                            return (
                                <Area
                                    isDraggingOver={snpashot.isDraggingOver}
                                    ref={magic.innerRef}
                                    {...magic.droppableProps}
                                >
                                    <Draggable draggableId="Delete2" index={10}>
                                        {(magic, snapshot) => (
                                            <Areaa
                                                isDragging={snapshot.isDragging}
                                                ref={magic.innerRef}
                                                {...magic.draggableProps}
                                                {...magic.dragHandleProps}
                                            ></Areaa>
                                        )}
                                    </Draggable>
                                </Area>
                            );
                        }}
                    </Droppable>
                </Wrapper>
            </DragDropContext>
        </>
    );
}

export default App;
