import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/style.scss';
import reportWebVitals from './reportWebVitals.js';
import client from './services/client';
import { ApolloProvider } from '@apollo/client';

import { CommonProvider } from './contexts/common/commonContext.jsx';
import { CartProvider } from './contexts/cart/cartContext.jsx';
import { FiltersProvider } from './contexts/filters/filtersContext.jsx';
import { LoadingProvider } from './contexts/loading/loadingContext.jsx';
import { UserProvider } from './contexts/user/userContext.jsx';
import { HelmetProvider } from 'react-helmet-async';

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);

    root.render(
        <React.StrictMode>
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <HelmetProvider>
                        <UserProvider>
                            <LoadingProvider>
                                <CommonProvider>
                                    <FiltersProvider>
                                        <CartProvider>
                                            <App />
                                        </CartProvider>
                                    </FiltersProvider>
                                </CommonProvider>
                            </LoadingProvider>
                        </UserProvider>
                    </HelmetProvider>
                </BrowserRouter>
            </ApolloProvider>
        </React.StrictMode>,
    );
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
