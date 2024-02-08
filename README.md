## Todo

-   모든 섹션 다 수강 후 4강 다시보기

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

-   모든 컴포넌트에 CSS 적용하고 싶을 떄 ( 예를 들면 reset.css )
    createGlobalStyle import 후 style-components 형식으로 스타일 작성

```
const GlobalStyle = createGlobalStyle`
  body{
   color:red
  }
`;

function App() {
    return (
        <>
            <GlobalStyle />
            <Router />
        </>
    );
}
```

## 2. Typescript

-   타입스크립트란 자바스크립트를 기반으로 한 프로그래밍 언어
-   프로그래밍 언어가 작동하기 전 타입을 확인하는 역할을 수행 ( 일종의 안전장치 )

```
const plus = (a : number , b:number):number => a + b
```

tsx 설치 명령어 : npx create-react-app "project-name" --template=typescript

타입스크립트의 styled-components 설치 명령어 : npm i --save-ev @types/styled-components

-   interface ( default props / optional props)

```
<!-- default props 사용 예시 -->
interface Props{
    name : string,
    age: number
}

<!-- optional props(선택적) 사용 예시 -->
interface Props{
     name ?: string,
     age: number
}
```

-   참고사항
    ?? 연산자는 앞의 값이 null/undefined 인 경우 뒤에 값을 반환하고 아니라면 앞의 값 반환

```
<!-- 사용 예시 -->
const variable = null;
const result = variable ?? "default value";
console.log(result); // "default value"
```

-   매개 변수에 기본 값을 지정해줄 수 도 있다

```
interface CircleProps {
    readonly bgColor: string;
    readonly borderColor?: string;
    text?: string;
}
function Circle({ bgColor, borderColor, text = 'default text' }: CircleProps) {
    return (
        <Container bgColor={bgColor} borderColor={borderColor ?? 'white'}>
            {text}
        </Container>
    );
}
```

-   타입 추론
    타입 스크립트는 타입을 따로 지정해주지 않아도 자체적으로 타입을 추론해준다 (초기값을 참조)

```
<!-- 사용 예시 -->
const [counter,setCounter] = useState(0) // 초기값이 0이므로 자체적으로 coutner/setCounter을 number타입과 number를 return하는 함수로 추론
setCounter("string") // Error

예외적으로 number와 string타입을 모두 넣고 싶다면
const [counter,setCounter] = useState<number | string>(0) // 제네릭 사용
```

# 3. React-router-dom

-   useParams : url값에 접근하고 싶을 때 사용하는 리액트 훅

```
const { id }  = useParams()
// 허나 타입스크립트에선 useParams 를 빈 객체로 인식하기 때문에 타입 정의가 필요하다
interface RouterParams {
    CoinId: string;
}
const CoinId = useParams<RouterParams>()
// path="/:~~" 와 const { ~~ }  = useParams() 부분을 통일시켜 줘야 한다
```

-   Route 형태

```
const App = () => {
	return (
		<div className='App'>
			<BrowserRouter> // BrowserRouter 는 index 파일로 이동해 <App/ > 을 감싸주는 것으로도 대체 가능
				<Header />
				<Routes>
					<Route path="/" element={<Main />}></Route>
					<Route path="/product/*" element={<Product />}></Route>
					{/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
					<Route path="*" element={<NotFound />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
};
```

option + shifr + i : 선택한 영역 맨 우측 포커싱
command + d : 같은 요소 선택

# 4. Nested Route

useRouterMatch 는 현재 어떤 url에 위치하고 있는지 파악하게 해주는 훅 (react-router-dom@6 에선 useMatch()로 대체)

# 5. React-query

-   React 애플리케이션에서 서버 state를 fetching caching, synchronizing, updating할 수 있도록 도와주는 라이브러리

-   react-query는 "global state"를 건드리지 않고 React 및 React Native 애플리케이션에서 데이터를 가져오고, 캐시하고, 업데이트합니다.

참고사항 : Cache란 자주 사용하는 데이터나 값을 미리 복사해 놓는 임시 장소를 가리킨다. 아래와 같은 저장공간 계층 구조에서 확인할 수 있듯이, 캐시는 저장 공간이 작고 비용이 비싼 대신 빠른 성능을 제공한다.

설치 명령어 : npm i react-query

index 파일로 이동 후 import

```
const queryClient = new QueryClient();
<React.StrictMode>
{/_ <Form /> _/}
<QueryClientProvider client={queryClient}>
<ThemeProvider theme={basicTheme}>
<App />
</ThemeProvider>
</QueryClientProvider>
</React.StrictMode>

*Coin.tsx
    const { isLoading, data } = useQuery<ICoin[]>('allCoins', fetchCoins);
     데이터 호출이 완료되면 isLoading = false / 호출 중이라면 isLoaing = true

```

-   useQuery 의 파라미터엔 [고유한 key값 , fetcher함수 , 선택적인 Object]

참고사항 : [Chart 사이트](https://apexcharts.com/)

# 6. Recoil

-   Recoil 이란 React 전용 전역 상태관리 라이브러리 / 상태 관리 라이브러리란 말 그대로 state를 관리를 목적으로 만들어진 라이브러리 ( 대표적인 예시 : Redux)

서비스의 규모가 커질수록 관리해야할 state가 많아지고 이를 체계적으로 관리하기 위해 상태 관리라는 라이브러리를 사용 해야 한다
