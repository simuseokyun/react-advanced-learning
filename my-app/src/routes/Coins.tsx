import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { fetchCoins } from '../Api';
import Helmet from 'react-helmet';
import { useSetRecoilState } from 'recoil';
import { isDarkAtom } from '../atoms';

const Container = styled.div`
    padding: 20px 20px;
    max-width: 480px;
    margin: 0 auto;
    background-color: ${(props) => props.theme.bgColor};
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
    display: block;
    margin-right: 10px;
    background-color: white;
    margin-bottom: 20px;
    border-radius: 20px;
    a:hover {
        transition: color 0.2s ease-in;
        color: ${(props) => props.theme.accentColor};
    }
    a {
        color: ${(props) => props.theme.textColor};
        display: flex;
        padding: 20px;
        align-items: center;
    }
`;
const Title = styled.h1`
    color: ${(props) => props.theme.accentColor};
    font-size: 46px;
`;
const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`;

interface ICoin {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}

const Coins = () => {
    const { isLoading, data } = useQuery<ICoin[]>('allCoins', () => fetchCoins());
    const setDarkAtom = useSetRecoilState(isDarkAtom);
    // const [coin, setCoins] = useState<CoinInterface[]>([]);
    // const [loading, setLoading] = useState(true);
    // const getData = async () => {
    //     const response = await fetch('https://api.coinpaprika.com/v1/coins');
    //     const json = await response.json();
    //     setCoins(json.slice(0, 100));
    //     setLoading(false);
    // };
    // useEffect(() => {
    //     getData();
    // }, []);
    return (
        <Container>
            <Helmet>
                <title>코인</title>
            </Helmet>
            <Header>
                <button
                    style={{ color: 'red' }}
                    onClick={() => {
                        setDarkAtom((prev) => !prev);
                    }}
                >
                    Change Mode
                </button>
            </Header>
            {isLoading ? (
                <LoadText>Loading...</LoadText>
            ) : (
                <CoinList>
                    {data?.map((coin) => {
                        return (
                            <Coin key={coin.id}>
                                <Link
                                    to={{
                                        pathname: `/${coin.id}`,
                                        state: { name: coin.name },
                                    }}
                                >
                                    <Img
                                        src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                                    />
                                    {coin.name} &rarr;
                                </Link>
                            </Coin>
                        );
                    })}
                </CoinList>
            )}
        </Container>
    );
};
export default Coins;
