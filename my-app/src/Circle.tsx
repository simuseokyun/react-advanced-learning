import styled from 'styled-components';

const Container = styled.div<ContainerProps>`
    width: 200px;
    height: 200px;
    border-radius: 200px;
    background-color: ${(props) => props.bgColor};
    border: 1px solid ${(props) => props.borderColor};
`;
interface ContainerProps {
    readonly bgColor: string;
    readonly borderColor?: string;
}
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

export default Circle;
