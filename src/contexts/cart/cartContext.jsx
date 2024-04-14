import React, { createContext, useReducer } from 'react';
import cartReducer from './cartReducer';
import { useContext } from 'react';
import userContext from '../user/userContext';

// Cart-Context
const cartContext = createContext();

// Initial State
const initialState = {
    cartItems: [],
    cartId: null,
    productDataReceived: true
};

// Cart-Provider Component
const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const { isLoggedIn } = useContext(userContext);

    // Dispatched Actions
    const addItem = (item) => {
        return dispatch({
            type: 'ADD_TO_CART',
            payload: { item },
        });
    };

    const removeItem = (itemId) => {
        return dispatch({
            type: 'REMOVE_FROM_CART',
            payload: { itemId },
        });
    };

    const incrementItem = (itemId) => {
        return dispatch({
            type: 'INCREMENT_ITEM',
            payload: { itemId },
        });
    };

    const decrementItem = (itemId) => {
        return dispatch({
            type: 'DECREMENT_ITEM',
            payload: { itemId },
        });
    };

    const emptyCart = () => {
        return dispatch({
            type: 'EMPTY',
        });
    };

    const setItemQtd = (item, qtd) => {
        return dispatch({
            type: 'SET_ITEM_QTD',
            payload: { item, qtd },
        });
    };

    const setCart = (items) => {
        return dispatch({
            type: 'SET_CART',
            payload: { items },
        });
    };

    const setProductDataState = (bool) => {
        return dispatch({
            type: 'SET_PDR',
            payload: { bool },
        });
    };

    // Context values
    const values = {
        ...state,
        addItem,
        removeItem,
        incrementItem,
        decrementItem,
        emptyCart,
        setItemQtd,
        setCart,
        setProductDataState,
    };

    return <cartContext.Provider value={values}>{children}</cartContext.Provider>;
};

export default cartContext;
export { CartProvider };
