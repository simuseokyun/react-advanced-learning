import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../Api';
import ApexCharts from 'react-apexcharts';

interface ChartProps {
    CoinId: string;
}
interface IHistory {
    time_open: number;
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: number;
}
const Chart = ({ CoinId }: ChartProps) => {
    const { isLoading, data } = useQuery<IHistory[]>(['ohlcv', CoinId], () => fetchCoinHistory(CoinId));
    return (
        <div>
            {/* {isLoading ? (
                'Loading chart...'
            ) : (
                <ApexCharts
                    type="line"
                    series={[{ name: 'sales', data: data?.map((price) => Number(price.close)) || [] }]}
                    options={{
                        chart: { height: 500, width: 500 },
                        stroke: { curve: 'smooth', width: 4 },
                        yaxis: { show: false },
                        xaxis: { labels: { show: false } },
                        fill: {
                            type: 'gradient',
                            gradient: { gradientToColors: ['#0be881'], stops: [0, 100] },
                        },
                        colors: ['#0fbcf9'],
                        tooltip: {
                            y: {
                                formatter: (value) => `$${value.toFixed(2)}`,
                            },
                        },
                    }}
                />
            )} */}
        </div>
    );
};

export default Chart;
