import { useParams } from 'react-router-dom';
import styled from 'styled-components';

interface RouterParams {
    CoinId: string;
}

export const Coin = () => {
    const { CoinId } = useParams<RouterParams>();
    return <h1>Coin : {CoinId}</h1>;
};
