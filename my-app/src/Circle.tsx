import styled from 'styled-components';

const Container = styled.div<ContainerProps>`
    width: 100%;
    height: 200px;
    background-color: ${(props) => props.bgColor};
`;
interface ContainerProps {
    readonly bgColor: string;
}
interface CircleProps {
    readonly bgColor: string;
}
function Circle({ bgColor }: CircleProps) {
    return <Container bgColor={bgColor} />;
}

export default Circle;
