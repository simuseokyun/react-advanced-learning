import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Coin } from './routes/Coin';
import Coins from './routes/Coins';

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                {/* Swtich는 한 번에 하나의 Route를 랜더링 하도록 함 */}
                <Route path="/:CoinId">
                    <Coin />
                </Route>
                <Route path="/">
                    <Coins />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};
export default Router;
