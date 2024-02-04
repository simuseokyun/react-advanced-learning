import React from 'react';
import styled, { keyframes } from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    background-color: ${(props) => props.theme.backgroundColor};
`;
const rotateAnimation = keyframes`
0%{
    transform:rotate(0deg);
}
100%{
    transform:rotate(360deg);
} 
`;
const ThemeBtn = styled.button`
    background-color: black;
    color: white;
`;
const Box = styled.div`
    width: 200px;
    height: 200px;
    background-color: tomato;
    animation: ${rotateAnimation} 1s linear infinite;
    span {
        font-size: 20px;
        &:hover {
            font-size: 40px;
        }
    }
`;

function App() {
    return (
        <Wrapper>
            <Box>
                <span>하이</span>
            </Box>
            <ThemeBtn></ThemeBtn>
        </Wrapper>
    );
}

export default App;
