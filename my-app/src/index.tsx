import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { Form } from './Form';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './theme';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        {/* <Form /> */}
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </RecoilRoot>
    </React.StrictMode>
);
