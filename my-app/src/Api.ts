export const fetchCoins = async () => {
    const response = await fetch('https://api.coinpaprika.com/v1/coins');
    const json = await response.json();
    return json.slice(0, 100);
};

export const fetchCoinInfo = async (CoinId: string) => {
    const response = await fetch(`https://api.coinpaprika.com/v1/coins/${CoinId}`);
    const json = await response.json();
    return json;
};
export const fetchCoinTickers = async (CoinId: string) => {
    const response = await fetch(`https://api.coinpaprika.com/v1/tickers/${CoinId}`);
    const json = await response.json();
    return json;
};
export const fetchCoinHistory = async (CoinId: string) => {
    const response = await fetch(`https://ohlcv-api.nomadcoders.workers.dev/?coinId=${CoinId}`);
    const json = await response.json();

    return json;
};
