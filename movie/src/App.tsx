import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Home } from './Routes/home';
import Header from './Components/header';

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="tv" element={<Home />}></Route>
                <Route path="search" element={<Home />}></Route>
                <Route path="/" element={<Home />}></Route>
                <Route path="movies/:movieId" element={<Home />}></Route>
            </Routes>
        </>
    );
}

export default App;
