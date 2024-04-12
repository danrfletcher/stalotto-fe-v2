import axios from 'axios';
import { getCustomerCartFromIdQuery, getCustomerCartFromTokenQuery } from './cartQueries';

const baseURL = import.meta.env.VITE_API_BASE_URL;
const cartFailure = "Unable to load cart items";

interface CartItem {
    uid: string;
    quantity: number;
    product: {
        uid: string;
        name: string;
        sku: string;
    };
}

export interface Cart {
    cartId: string;
    cartItems: CartItem[];
    loggedIn: boolean
};

type CartFailure = string;

export const getCustomerCartFromToken = async (token): Promise<Cart | CartFailure> => {
    try {
        const response = await axios.post(`${baseURL}/graphql`, 
            {
                query: getCustomerCartFromTokenQuery()
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
        )

        if (response.data.errors) {
            return cartFailure;
        } else if (response.data.data.customerCart) {

            const cart = response.data.data.customerCart;
            
            const formattedCart = {
                cartId: cart.id,
                cartItems: cart.items,
                loggedIn: true,
            }

            return formattedCart;

        } else {
            throw new Error();
        }
    } catch (err) {
        return cartFailure;
    };
};

export const getCustomerCartFromId = async (cartId: number): Promise<Cart | CartFailure> => {
    try {
        const response = await axios.post(`${baseURL}/graphql`, 
            {
                query: getCustomerCartFromIdQuery,
                variables: {
                    cartId: cartId
                }
            },
        );

        if (response.data.errors) {
            return cartFailure;
        } else if (response.data.data.cart) {
            const cart = response.data.data.cart;

            const formattedCart = {
                cartId: cart.id,
                cartItems: cart.items,
                loggedIn: false
            };

            return formattedCart;

        } else {
            throw new Error();
        }
    } catch (err) {
        return cartFailure;
    };
};


