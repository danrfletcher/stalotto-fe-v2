import axios from 'axios';
import {
    addProductToCartQuery,
    createAnonymousCartQuery,
    getCartTotalQuery,
    getCustomerCartFromIdQuery,
    getSavedAddressesQuery,
    saveAddressQuery,
    setQtdCartItemQuery,
} from './cartQueries';
import { AuthenticationError } from '../models/errors';
import { useMutation, useLazyQuery } from '@apollo/client';

import SetBillingAddressOnCartGql from '../graphql/SetBillingAddressOnCart.gql';
import SetGuestEmailOnCartGql from '../graphql/SetGuestEmailOnCart.gql';
import GetPaymentMethodsOnCartGql from '../graphql/GetPaymentMethodsOnCart.gql';

import {
    GetPaymentMethodsOnCartQuery,
    GetPaymentMethodsOnCartQueryVariables,
    SetBillingAddressOnCartMutation,
    SetBillingAddressOnCartMutationVariables,
    SetGuestEmailOnCartMutation,
    SetGuestEmailOnCartMutationVariables,
} from '../__generated__/graphql';

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
            },
        );

        if (itemsInCart.data.data.cart.items) {
            return itemsInCart.data.data.cart.items;
        } else if (
            itemsInCart.data.errors[0].message &&
            typeof itemsInCart.data.errors[0].message == 'string'
        ) {
            throw new Error(itemsInCart.data.errors[0].message);
        } else {
            throw new Error('Failed to get cart items');
        }
    } catch (err) {
        throw err;
    }
};

//create anonymous cart
export const createAnonymousCart = async () => {
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
            },
        );

        if (newItemsInCart.data.data.updateCartItems.cart.items) {
            return newItemsInCart.data.data.updateCartItems.cart.items;
        } else if (
            newItemsInCart.data.errors[0].message &&
            typeof newItemsInCart.data.errors[0].message == 'string'
        ) {
            throw new Error(newItemsInCart.data.errors[0].message);
        } else {
            throw new Error('Failed to update cart items');
        }
    } catch (err) {
        throw err;
    }
};

//add items to the cart
export const addProductToCart = async (sku: string, qtd: number) => {
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
            },
        );

        if (updatedCart.data.data.addProductsToCart.cart.items) {
            return updatedCart.data.data.addProductsToCart.cart.items;
        } else if (
            updatedCart.data.errors[0].message &&
            typeof updatedCart.data.errors[0].message == 'string'
        ) {
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
            },
        );
        if (grandTotal.data.data.cart.prices.grand_total) {
            return grandTotal.data.data.cart.prices.grand_total;
        } else if (
            grandTotal.data.errors[0].message &&
            typeof grandTotal.data.errors[0].message == 'string'
        ) {
            throw new Error(grandTotal.data.errors[0].message);
        } else {
            throw new Error('Failed to fetch total amount');
        }
    } catch (err) {
        throw err;
    }
};

//get user's saved addresses
export const getSavedAddresses = async () => {
    //add authentication credentials (this service function requires authentication)
    const headers = {};

    try {
        if (localStorage.userToken) {
            headers['Authorization'] = `Bearer ${localStorage.userToken}`;

            const savedAddresses = await axios.post(
                `${baseURL}/graphql`,
                {
                    query: getSavedAddressesQuery,
                },
                {
                    headers: headers,
                },
            );

            if (savedAddresses.data.data.customer.addresses) {
                const addressList = savedAddresses.data.data.customer.addresses;
                return addressList.map((address: RawMagentoShippingAddress) => {
                    const {
                        firstname,
                        lastname,
                        street,
                        city,
                        postcode,
                        country_code,
                        telephone,
                        default_billing,
                    } = address;
                    const region = address.region.region;

                    return {
                        firstName: firstname,
                        lastName: lastname,
                        street: street,
                        city: city,
                        region: region,
                        postcode: postcode,
                        countryCode: country_code,
                        telephone: telephone,
                        defaultBilling: default_billing,
                    };
                });
            } else if (
                savedAddresses.data.errors[0].message &&
                typeof savedAddresses.data.errors[0].message == 'string'
            ) {
                throw new Error(savedAddresses.data.errors[0].message);
            } else {
                throw new Error('Failed to fetch saved addresses');
            }
        } else {
            throw new AuthenticationError();
        }
    } catch (err) {
        throw err;
    }
};

//save a new billing address to the user's account
export const saveCustomerAddress = async (
    vars: FormattedMagentoShippingAddress,
) => {
    //add authentication credentials (this service function requires authentication)
    const headers = {};

    try {
        if (localStorage.userToken) {
            headers['Authorization'] = `Bearer ${localStorage.userToken}`;

            const addNewAddress = await axios.post(
                `${baseURL}/graphql`,
                {
                    query: saveAddressQuery,
                    variables: vars,
                },
                {
                    headers: headers,
                },
            );

            if (addNewAddress.data.data.createCustomerAddress) {
                const address = addNewAddress.data.data.createCustomerAddress;
                const {
                    firstname,
                    lastname,
                    street,
                    city,
                    postcode,
                    country_code,
                    telephone,
                    default_billing,
                } = address;
                const region = address.region.region;

                return {
                    firstName: firstname,
                    lastName: lastname,
                    street: street,
                    city: city,
                    region: region,
                    postcode: postcode,
                    countryCode: country_code,
                    telephone: telephone,
                    defaultBilling: default_billing,
                };
            } else if (
                addNewAddress.data.errors[0].message &&
                typeof addNewAddress.data.errors[0].message == 'string'
            ) {
                throw new Error(addNewAddress.data.errors[0].message);
            } else {
                throw new Error('Failed to fetch total amount');
            }
        } else {
            throw new AuthenticationError();
        }
    } catch (err) {
        throw err;
    }
};

//Apollo GraphQL Api hook & functions
export const useCartApi = () => {
    //setBillingAddress
    const [setBillingAddress, setBillingAddressStates] = useMutation<
        SetBillingAddressOnCartMutation,
        SetBillingAddressOnCartMutationVariables
    >(SetBillingAddressOnCartGql);
    const setBillingAddressData = setBillingAddressStates.data;
    const setBillingAddressIsLoading = setBillingAddressStates.loading;
    const setBillingAddressError = setBillingAddressStates.error;

    const handleSetBillingAddress = async (
        variables: SetBillingAddressOnCartMutationVariables,
    ) => {
        try {
            const result = await setBillingAddress({ variables });
            return result;
        } catch (e) {
            throw e;
        }
    };

    //setGuestEmailOnCart
    const [setGuestEmail, setGuestEmailStates] = useMutation<
        SetGuestEmailOnCartMutation,
        SetGuestEmailOnCartMutationVariables
    >(SetGuestEmailOnCartGql);
    const setGuestEmailData = setGuestEmailStates.data;
    const setGuestEmailIsLoading = setGuestEmailStates.loading;
    const setGuestEmailError = setGuestEmailStates.error;

    const handleSetGuestEmailOnCart = async (
        variables: SetGuestEmailOnCartMutationVariables,
    ) => {
        try {
            const result = await setGuestEmail({ variables });
            return result;
        } catch (e) {
            throw e;
        }
    };

    //getPaymentMethodsOnCart
    const [getPaymentMethodsOnCart, getPaymentMethodsOnCartStates] =
        useLazyQuery<
            GetPaymentMethodsOnCartQuery,
            GetPaymentMethodsOnCartQueryVariables
        >(GetPaymentMethodsOnCartGql);
    const getPaymentMethodsOnCartData = getPaymentMethodsOnCartStates.data;
    const getPaymentMethodsOnCartIsLoading =
        getPaymentMethodsOnCartStates.loading;
    const getPaymentMethodsOnCartError = getPaymentMethodsOnCartStates.error;

    const handleGetPaymentMethodsOnCart = async (
        variables: GetPaymentMethodsOnCartQueryVariables,
    ) => {
        try {
            const result = await getPaymentMethodsOnCart({ variables });
            return result;
        } catch (e) {
            throw e;
        }
    };

    return {
        //setBillingAddress
        handleSetBillingAddress,
        setBillingAddressData,
        setBillingAddressIsLoading,
        setBillingAddressError,

        //setGuestEmailOnCart
        handleSetGuestEmailOnCart,
        setGuestEmailData,
        setGuestEmailIsLoading,
        setGuestEmailError,

        //getPaymentMethodsOnCart
        handleGetPaymentMethodsOnCart,
        getPaymentMethodsOnCartData,
        getPaymentMethodsOnCartIsLoading,
        getPaymentMethodsOnCartError,
    };
};
