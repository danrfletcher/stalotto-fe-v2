import React from 'react';
import { Routes, Route } from 'react-router';
import useScrollRestore from '../hooks/useScrollRestore';
import AllProducts from '../pages/AllProducts';
import Cart from '../pages/Cart';
import Home from '../pages/Home';
import Static from '../pages/Static';
import CompetitionDetails from '../pages/CompetitionDetails';
import ErrorPage from '../pages/ErrorPage';

const RouterRoutes = () => {

    useScrollRestore();

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/competitions" element={<AllProducts />} />
                <Route path="/competition/:urlKey" element={<CompetitionDetails />} />
                <Route path="*" element={<ErrorPage />} />
                <Route path="/:staticPageUrlKey" element={<Static />} />
            </Routes>
        </>
    );
};

export default RouterRoutes;