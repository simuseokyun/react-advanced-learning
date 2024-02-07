import { useParams, useLocation, Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import Chart from './Chart';
import Price from './Price';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';
import { fetchCoinHistory, fetchCoinInfo, fetchCoinTickers } from '../Api';

interface RouterParams {
    CoinId: string;
}

const Title = styled.h1`
    font-size: 48px;
    align-items: center;
    color: ${(props) => props.theme.accentColor};
`;
const BackBtn = styled.button`
    position: absolute;
    width: 30px;
    height: 30px;
    top: 30px;
    left: 30px;
`;
const Overview = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: gray;
    padding: 10px 20px;
    border-radius: 10px;
`;
const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    span:first-child {
        font-size: 10px;
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 5px;
    }
`;
const Description = styled.p`
    margin: 20px 0px;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Container = styled.div`
    color: white;
    padding: 20px 20px;
    max-width: 480px;
    margin: 0 auto;
    background-color: black;
    height: 100%;
    text-align: center;
    position: relative;
`;
const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 25px 0px;
    gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 400;
    background-color: #eeeeee;
    padding: 7px 0px;
    border-radius: 10px;
    color: ${(props) => (props.isActive ? props.theme.accentColor : props.theme.textColor)};
    a {
        display: block;
    }
`;
interface RouteState {
    name: string;
}

interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}

interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        };
    };
}

export const Coin = () => {
    // const [loading, setLoading] = useState(true);
    const { CoinId } = useParams<RouterParams>();
    const { state } = useLocation<RouteState>();
    const chartMatch = useRouteMatch('/:CoinId/chart');
    const priceMatch = useRouteMatch('/:CoinId/price');
    // const [info, setInfo] = useState<InfoData>();
    // const [price, setPrice] = useState<PriceData>();

    // useEffect(() => {
    //     (async () => {
    //         const getInfo = await fetch(`https://api.coinpaprika.com/v1/coins/${CoinId}`);
    //         const getPrice = await fetch(`https://api.coinpaprika.com/v1/tickers/${CoinId}`);
    //         const infoData = await getInfo.json();

    //         const priceData = await getPrice.json();
    //         setInfo(infoData);
    //         setPrice(priceData);
    //         setLoading(false);
    //     })();
    // }, [CoinId]);
    // console.log(state);
    const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(['coins', CoinId], () =>
        fetchCoinInfo(CoinId)
    ); // key는 고유하게 식별해주는 값이어야 함
    const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
        ['tickers', CoinId],
        () => fetchCoinTickers(CoinId),
        {
            refetchInterval: 5000,
        }
    );
    console.log(tickersData, infoData);
    const loading = infoLoading || tickersLoading;
    return (
        <Container>
            <Helmet>
                <title>{state?.name ? state.name : null}</title>
            </Helmet>
            <Header>
                <Title> {state?.name ? state.name : null}</Title>
                <Link to="/">
                    <BackBtn>
                        <span className="material-symbols-outlined">arrow_back_ios</span>
                    </BackBtn>
                </Link>
            </Header>

            {loading ? <h1 style={{ color: 'white' }}>loading...</h1> : <span></span>}
            <Overview>
                <OverviewItem>
                    <span>Rank:</span>
                    <span>{infoData?.rank}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Symbol:</span>
                    <span>${infoData?.symbol}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Price : </span>
                    <span>${tickersData?.quotes.USD.price.toFixed(2)}</span>
                </OverviewItem>
            </Overview>
            <Description>{infoData?.description}</Description>
            <Overview>
                <OverviewItem>
                    <span>Total Suply:</span>
                    <span>{tickersData?.total_supply}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Max Supply:</span>
                    <span>{tickersData?.max_supply}</span>
                </OverviewItem>
            </Overview>
            <Tabs>
                <Tab isActive={chartMatch !== null}>
                    <Link to={`/${CoinId}/chart`}>Chart</Link>
                </Tab>
                <Tab isActive={priceMatch !== null}>
                    <Link to={`/${CoinId}/price`}>Price</Link>
                </Tab>
            </Tabs>

            <Switch>
                <Route path={`/${CoinId}/chart`}>
                    <Chart CoinId={CoinId} />
                </Route>
                <Route path={`/${CoinId}/price`}>
                    <Price />
                </Route>
            </Switch>
        </Container>
    );
};
