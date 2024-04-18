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
    cartSyncedState: true,
    cartIsUpdating: false,

    //checkout
    email: '',
    country: '',
    firstName: '',
    lastName: '',
    company: '',
    addressLine1: '',
    addressLine2: '',
    region: '',
    postcode: '',
    city: '',
    callingCode: '',
    telephone: '',
    optOut: false,
    saveAddress: false,
    defaultBilling: false,

    savedAddressIsSelected: false,

    displayCheckout: false,
    displayPayments: false,
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

    const setCartSyncedState = (bool) => {
        return dispatch({
            type: 'SET_PDR',
            payload: { bool },
        });
    };

    const flagCartUpdate = (bool) => {
        return dispatch({
            type: 'CART_PENDING',
            payload: { bool },
        });
    };

    const toggleDisplayPayments = () => {
        return dispatch({
            type: 'DISPLAY_PAYMENTS',
        });
    };

    const toggleDisplayCheckout = () => {
        return dispatch({
            type: 'DISPLAY_CHECKOUT',
        });
    };

    const setCheckoutItem = (keyToSet, value) => {
        try {
            if (Object.keys(state).find((key) => key === keyToSet)) {
                return dispatch({
                    type: 'SET_CHECKOUT_FIELD',
                    payload: { keyToSet, value },
                });
            } else {
                throw new Error(`The specified checkout field '${keyToSet}' does not exist in this context`);
            }
        } catch (err) {
            console.error('Error: ', err);
        }
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
        setCartSyncedState,
        flagCartUpdate,
        toggleDisplayPayments,
        toggleDisplayCheckout,
        setCheckoutItem,
    };

    return <cartContext.Provider value={values}>{children}</cartContext.Provider>;
};

export default cartContext;
export { CartProvider };
