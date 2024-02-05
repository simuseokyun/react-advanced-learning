import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { Form } from './Form';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        {/* <Form /> */}
        <App />
    </React.StrictMode>
);
