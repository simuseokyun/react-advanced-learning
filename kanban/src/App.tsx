import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

function App() {
    const onDragEnd = () => {};
    <DragDropContext onDragEnd={onDragEnd}>
        <div>
            <Droppable droppableId="one">
                {() => {
                    <ul>
                        <Draggable draggableId="first" index={0}>
                            {() => {
                                <li>One</li>;
                            }}
                        </Draggable>
                        <Draggable draggableId="two" index={0}>
                            {() => {
                                <li>Two</li>;
                            }}
                        </Draggable>
                    </ul>;
                }}
            </Droppable>
        </div>
    </DragDropContext>;
}

export default App;
