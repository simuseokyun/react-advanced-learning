import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import React from 'react';

interface IDraggableCard {
    toDo: string;
    i: number;
}
const Card = styled.div`
    background-color: ${(props) => props.theme.cardColor};
    padding: 5px 10px;
    margin-bottom: 5px;
`;

function DraggableCard({ toDo, i }: IDraggableCard) {
    return (
        <Draggable draggableId={toDo} index={i} key={toDo}>
            {(magic) => (
                <Card ref={magic.innerRef} {...magic.draggableProps} {...magic.dragHandleProps}>
                    {toDo}
                </Card>
            )}
        </Draggable>
    );
}

export default DraggableCard;
