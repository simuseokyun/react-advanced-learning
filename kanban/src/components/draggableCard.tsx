import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import React from 'react';

interface IDraggableCard {
    toDoId: number;
    toDoText: string;
    i: number;
}
const Wrapper = styled.div``;
const Card = styled.div<{ isDragging: boolean }>`
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 10px 10px;
    background-color: ${(props) => props.theme.cardColor};
    padding: 10px;
    background-color: ${(props) => (props.isDragging ? '#e4f2ff' : props.theme.cardColor)};
    box-shadow: ${(props) => (props.isDragging ? '0px 2px 5px rgba(0, 0, 0, 0.05)' : 'none')};
`;
function DraggableCard({ toDoId, toDoText, i }: IDraggableCard) {
    return (
        <Wrapper>
            <Draggable draggableId={toDoId + ''} index={i}>
                {(magic, snapshot) => (
                    <Card
                        isDragging={snapshot.isDragging}
                        ref={magic.innerRef}
                        {...magic.draggableProps}
                        {...magic.dragHandleProps}
                    >
                        {toDoText}
                    </Card>
                )}
            </Draggable>
        </Wrapper>
    );
}

export default DraggableCard;
