import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
`;

const Test = styled.div`
    width: 500px;
    height: 500px;
    background-color: red;
    margin: 5px; /* 선택 사항: Test 컴포넌트 사이의 간격을 위해 마진 추가 */
    flex: 1; /* 자식 엘리먼트 간의 공간을 균등하게 분배 */
`;

function App() {
    return (
        <Container>
            <Test></Test>
            <Test></Test>
            <Test></Test>
            <Test></Test>
        </Container>
    );
}

export default App;
