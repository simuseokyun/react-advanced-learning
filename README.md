## 1. Styled-components

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

-   태그 고유 속성값 지정하고 싶은 경우

```
const Input = styled.input.attrs({required : true})`
background-color:tomato;
`
```

-   애니메이션

import styled, { keyframes } from 'styled-components'; // 상단에 keyframes import

```
<!-- 사용 예시 -->
const rotateAnimation = keyframes`
0%{
    transform:rotate(0deg);
}
100%{
    transform:rotate(360deg);
}
`;

const Box = styled.div`
animation : ${rotateAnimation} 1s infinite`
```

-   컴포넌트 내부 셀렉터 속성 지정도 가능하다

```
const Box = styled.div`
    animation : ${rotateAnimation} 1s infinite
    span{
        font-size:10px;
    }
`
function App() {
    return (
        <Wrapper>
            <Box>
                <span>하이</span>
            </Box>
        </Wrapper>
    );
}
```

-   Theme

1. index.js 에서 import { ThemeProvider } from 'styled-components'; // ThemeProvider import
2. App /> 을 ThemeProvider>ThemeProvider> 로 감싸주기

```
const darkTheme = {
    textColor: 'whitesmoke',
    backgroundColor: '#111',
};
const whiteTheme = {
    textColor: '#111',
    backgroundColor: 'whitesmoke',
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ThemeProvider theme={darkTheme}>
            <App />
        </ThemeProvider>
    </React.StrictMode>
);
```

## Typescript

-   타입스크립트란 자바스크립트를 기반으로 한 프로그래밍 언어
-   프로그래밍 언어가 작동하기 전 타입을 확인하는 역할을 수행 ( 일종의 안전장치 )

```
const plus = (a : number , b:number):number => a + b
```

tsx 설치 명령어 : npx create-react-app "project-name" --template=typescript

타입스크립트의 styled-components 설치 명령어 : npm i --save-ev @types/styled-components
