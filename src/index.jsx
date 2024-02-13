import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/style.scss';
import reportWebVitals from './reportWebVitals';

import { CommonProvider } from './contexts/common/commonContext';
import { CartProvider } from './contexts/cart/cartContext';
import { FiltersProvider } from './contexts/filters/filtersContext';
import { LoadingProvider } from './contexts/loading/loadingContext.jsx';
import { UserProvider } from './contexts/user/userContext.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
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
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
