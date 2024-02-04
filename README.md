## Styled-components

설치 명령어 : npm i styled-components

-   기본적인 형태

```
<!-- 사용 예시 -->

const Container = styled.div`
    width:200px;
    height:200px;
    background-color:black
`
```

-   특정 속성 제외하고 컴포넌트의 형태가 비슷한 경우 하나로 통일한 후 특정 속성값만 props로 전송

```
<!-- 사용 예시 -->

const Box = styled.div`
    width: 500px;
    height: 500px;
    background-color: ${(props) => props.bgColor};
`;

function App() {
    return (
        <Container>
            <Box bgColor="teal"></Box>
            <Box bgColor="tomato"></Box>
        </Container>
    );
}
```

-   컴포넌트 확장 하는 법 ( 기존 컴포넌트에 특정 속성만 추가 하고 싶은 경우 / extend 문법과 유사 )

```
<!-- 사용 예시 -->
const Circle = styled(Box)`
border-radius : 50px;
`
```

-   컴포넌트의 태그를 변경하고 싶은 경우 ( as 문법 )

```
<!-- 사용 예시 -->

const btn = styled.button`
background-color : tomato;
font-size:12px;
`
function App() {
    return (
        <Container>
            <Btn />
            <Btn as="a" href="/"/> // a 로써 동작하겠다는 뜻
        </Container>
    );
}


```
