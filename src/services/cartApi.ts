import axios from 'axios';
import { addProductToCartQuery, createAnonymousCartQuery, getCartTotalQuery, getCustomerCartFromIdQuery, setQtdCartItemQuery } from './cartQueries';

const baseURL = import.meta.env.VITE_API_BASE_URL;

export interface CartItem {
    uid: string;
    product: {
        sku: string;
        name: string;
    };
    quantity: number;
}
//get items in user's cart
export const getCartItems = async () => {
    //add authentication credentials for logged in users
    const headers = {};
    if (localStorage.userToken) {
        headers['Authorization'] = `Bearer ${localStorage.userToken}`;
    }

    //send request & return response
    try {
        const itemsInCart = await axios.post(
            `${baseURL}/graphql`,
            {
                query: getCustomerCartFromIdQuery,
                variables: {
                    cartId: localStorage.cartId,
                },
            },
            {
                headers: headers,
            }
        );

        if (itemsInCart.data.data.cart.items) {
            return itemsInCart.data.data.cart.items;
        } else if (itemsInCart.data.errors[0].message && typeof itemsInCart.data.errors[0].message == 'string') {
            throw new Error(itemsInCart.data.errors[0].message);
        } else {
            throw new Error('Failed to get cart items');
        }
    } catch (err) {
        throw err;
    }
};

//create anonymous cart
export const createAnonymousCart = async (): Promise<string | Error> => {
    try {
        const response = await axios.post(`${baseURL}/graphql`, {
            query: createAnonymousCartQuery,
        });
        if (response.data.data.createEmptyCart) {
            return response.data.data.createEmptyCart;
        } else {
            throw new Error('Failed to create anonymous cart ID');
        }
    } catch (err) {
        throw err;
    }
};

//set quantity of items in cart
export const setNumItemsInCart = async (cartItemUid: string, qtd: number) => {
    //add authentication credentials for logged in users
    const headers = {};
    if (localStorage.userToken) {
        headers['Authorization'] = `Bearer ${localStorage.userToken}`;
    }

    //send request & return response
    try {
        const newItemsInCart = await axios.post(
            `${baseURL}/graphql`,
            {
                query: setQtdCartItemQuery(cartItemUid, qtd),
            },
            {
                headers: headers,
            }
        );

        if (newItemsInCart.data.data.updateCartItems.cart.items) {
            return newItemsInCart.data.data.updateCartItems.cart.items;
        } else if (newItemsInCart.data.errors[0].message && typeof newItemsInCart.data.errors[0].message == 'string') {
            throw new Error(newItemsInCart.data.errors[0].message);
        } else {
            throw new Error('Failed to update cart items');
        }
    } catch (err) {
        throw err;
    }
};

//add items to the cart
export const addProductToCart = async (sku: string, qtd: number): Promise<CartItem[] | Error> => {
    //add authentication credentials for logged in users
    const headers = {};
    if (localStorage.userToken) {
        headers['Authorization'] = `Bearer ${localStorage.userToken}`;
    }

    try {
        const updatedCart = await axios.post(
            `${baseURL}/graphql`,
            {
                query: addProductToCartQuery(sku, qtd),
            },
            {
                headers: headers,
            }
        );

        if (updatedCart.data.data.addProductsToCart.cart.items) {
            return updatedCart.data.data.addProductsToCart.cart.items;
        } else if (updatedCart.data.errors[0].message && typeof updatedCart.data.errors[0].message == 'string') {
            throw new Error(updatedCart.data.errors[0].message);
        } else {
            throw new Error('Failed to update cart items');
        }
    } catch (err) {
        throw err;
    }
};

//get cart grand total
export const getCartTotal = async () => {
    //add authentication credentials for logged in users
    const headers = {};
    if (localStorage.userToken) {
        headers['Authorization'] = `Bearer ${localStorage.userToken}`;
    }

    try {
        const grandTotal = await axios.post(
            `${baseURL}/graphql`,
            {
                query: getCartTotalQuery,
                variables: {
                    cartId: localStorage.cartId,
                },
            },
            {
                headers: headers,
            }
        );
        if (grandTotal.data.data.cart.prices.grand_total) {
            return grandTotal.data.data.cart.prices.grand_total;
        } else if (grandTotal.data.errors[0].message && typeof grandTotal.data.errors[0].message == 'string') {
            throw new Error(grandTotal.data.errors[0].message);
        } else {
            throw new Error('Failed to fetch total amount');
        }
    } catch (err) {
        throw err;
    }
};

//save a new billing address to the user's account
//export const saveNewAddress = async (address: )

//set shipping address for user's cart
//export const set