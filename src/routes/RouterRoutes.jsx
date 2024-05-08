import React from 'react';
import { Routes, Route } from 'react-router';
import useScrollRestore from '../hooks/useScrollRestore';
import AllProducts from '../pages/AllProducts';
import Cart from '../pages/Cart';
import Home from '../pages/Home';
import Static from '../pages/Static';
import CompetitionDetails from '../pages/CompetitionDetails';
import ErrorPage from '../pages/ErrorPage';
import { CheckoutComplete } from '../pages/CheckoutComplete';
import LaunchHome from '../pages/LaunchHome';

const RouterRoutes = () => {

    useScrollRestore();

    return (
        <>
            <Routes>
                <Route path="/" element={<LaunchHome />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/competitions" element={<AllProducts />} />
                <Route path="/competition/:urlKey" element={<CompetitionDetails />} />
                <Route path="/checkout-complete/boodil" element={<CheckoutComplete />} />
                <Route path="/:staticPageUrlKey" element={<Static />} />
                <Route path="/error/:errorKey" element={<ErrorPage />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </>
    );
};

export default RouterRoutes;