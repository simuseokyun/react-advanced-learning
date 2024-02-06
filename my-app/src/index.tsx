import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { Form } from './Form';
import { ThemeProvider } from 'styled-components';
import { basicTheme } from './theme';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        {/* <Form /> */}
        <ThemeProvider theme={basicTheme}>
            <App />
        </ThemeProvider>
    </React.StrictMode>
);
