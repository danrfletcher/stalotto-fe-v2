import axios, { AxiosResponse } from 'axios';
import { addToCartQuery, createAnonymousCartQuery, getCustomerCartFromIdQuery, getCustomerCartFromTokenQuery } from './cartQueries';
import { Competition } from './competitionsApi';

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

const defaultReturnCart = (token: string | null = null, response: AxiosResponse) => {
    if (response.data.errors) {
        return cartFailure;
    } else if (response.data.data.customerCart || response.data.data.cart) {

        let cart;
        if (response.data.data.customerCart) {
            cart = response.data.data.customerCart
        } else if (response.data.data.cart) {
            cart = response.data.data.cart
        }
        
        const formattedCart = {
            cartId: cart.id,
            cartItems: cart.items,
            loggedIn: token ? true : false,
        }

        return formattedCart;

    } else {
        throw new Error();
    }
}

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

        return defaultReturnCart(token, response);

    } catch (err) {
        return cartFailure;
    };
};

export const getCustomerCartFromId = async (cartId: number, token: string | null = null): Promise<Cart | CartFailure> => {
    try {

        const headers = {};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
            headers['Content-Type'] = 'application/json'
        }

        const response = await axios.post(`${baseURL}/graphql`, 
            {
                query: getCustomerCartFromIdQuery,
                variables: {
                    cartId: cartId
                }
            },
            {
                headers: headers
            }
        );

        return defaultReturnCart(token, response);

    } catch (err) {
        return cartFailure;
    };
};

export const createAnonymousCart = async () => {
    try {
        const response = await axios.post(`${baseURL}/graphql`, 
            {
                query: createAnonymousCartQuery,
            },
        )
        if (response.data.data.createEmptyCart) {
            return ({cartId: response.data.data.createEmptyCart})
        } else {
            throw new Error();
        }
    } catch (err) {
        throw err
    }
}

//add to cart
interface UidQtd {
    id: string; //uid
    qtdToAdd: number;
}

interface ID {
    id: string //uid of item to be added to the cart. Local cart items can contain any properties, but must id/uid in order to be purchasable
}

export const addToCart = async (cartId: string, token: string | null = null, localCartItemsToAdd: Competition[], qtds?: UidQtd[] | undefined) => {
    const headers = {};
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        headers['Content-Type'] = 'application/json'
    }
    
    const cartItemsToAdd = localCartItemsToAdd.map((localCartItem) => {
        
        let quantity;
        let qtdIds;
        if (qtds) {
            qtdIds = qtds.map(qtd => qtd.id);
            if (qtdIds.includes(localCartItem.id)) {
                const qtdIndex = qtdIds.indexOf(localCartItem.id);
                quantity = qtds[qtdIndex].qtdToAdd;
            } else {
                quantity = 1;
            };
        };

        return (
            {
                quantity: quantity,
                sku: localCartItem.sku.toString(),
            }
        );
    });

    const response = await axios.post(`${baseURL}/graphql`, 
        {
            query: addToCartQuery(cartId, cartItemsToAdd),
            variables: {
                cartId: cartId
            }
        },
        {
            headers: headers
        }
    );

    if (response.data.data.addProductsToCart.cart.items) {
        const items = response.data.data.addProductsToCart.cart.items
        return items.map((item) => {
            return {
                id: item.uid,
                name: item.product.name,
                sku: item.product.sku,
                quantity: item.quantity
            }
        });
    };
    console.log(response);
}

//remove from cart


//set quantity of items in cart



