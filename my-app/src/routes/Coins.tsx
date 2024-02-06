import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useState, useEffect } from 'react';

const Container = styled.div`
    padding: 20px 20px;
    max-width: 480px;
    margin: 0 auto;
    background-color: black;
    height: 100%;
`;
const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const LoadText = styled.span`
    text-align: center;
    font-size: 20px;
    color: white;
    display: block;
`;
const CoinList = styled.ul``;
const Coin = styled.li`
    background-color: white;
    margin-bottom: 20px;
    border-radius: 20px;
    a:hover {
        transition: color 0.2s ease-in;
        color: ${(props) => props.theme.accentColor};
    }
    a {
        display: block;
        padding: 20px;
    }
`;
const Title = styled.h1`
    color: ${(props) => props.theme.accentColor};
    font-size: 46px;
`;

interface CoinInterface {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}

const Coins = () => {
    const [coin, setCoins] = useState<CoinInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const getData = async () => {
        const response = await fetch('https://api.coinpaprika.com/v1/coins');
        const json = await response.json();
        setCoins(json.slice(0, 100));
        setLoading(false);
    };
    useEffect(() => {
        getData();
    }, []);
    return (
        <Container>
            <Header>
                <Title>코인</Title>
            </Header>
            {loading ? (
                <LoadText>Loading...</LoadText>
            ) : (
                <CoinList>
                    {coin.map((coin) => {
                        return (
                            <Coin key={coin.id}>
                                <Link to={`/${coin.id}`}>{coin.name} &rarr;</Link>
                            </Coin>
                        );
                    })}
                </CoinList>
            )}
        </Container>
    );
};
export default Coins;
