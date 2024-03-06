import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import App3 from './slide';
import App2 from './aniPresense';
import Layout from './layout';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <Layout />
    </React.StrictMode>
);
