import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
`;

const Box = styled.div`
    width: 500px;
    height: 500px;
    background-color: ${(props) => props.bgColor};
`;
const Circle = styled(Box)`
    border-radius: 500px;
`;

const Text = styled.span`
    font-size: 20px;
    color: white;
`;

function App() {
    return (
        <Container>
            <Box bgColor="teal"></Box>
            <Box bgColor="tomato"></Box>
            <Circle bgColor="red" />
        </Container>
    );
}

export default App;
