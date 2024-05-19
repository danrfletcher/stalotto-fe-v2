import axios from 'axios';
import {
    createUserAccountQuery,
    getUserInfoQuery,
    getUserLoginQuery,
    logoutUserQuery,
} from './userAccountQueries';
import { CartItem } from './cartApi';

interface User {
    customer: {
        email: string;
        firstname: string;
        lastname: string;
    };
    customerCart: {
        id: string;
        items: CartItem[];
    };
}

const baseURL = import.meta.env.VITE_API_BASE_URL;

export interface LoginParameters {
    email: string;
    password: string;
}

export const loginUser = async ({
    email,
    password,
}: LoginParameters): Promise<string | false> => {
    try {
        const response = await axios.post(`${baseURL}/graphql`, {
            query: getUserLoginQuery({ email, password }),
        });

        if (response.data.data.generateCustomerToken.token) {
            return response.data.data.generateCustomerToken.token;
        } else {
            throw new Error();
        }
    } catch (err) {
        return false;
    }
};

export const logoutUser = async (token) => {
    try {
        const response = await axios.post(
            `${baseURL}/graphql`,
            {
                query: logoutUserQuery,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            },
        );

        if (response.data.data.revokeCustomerToken.result) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
};

export const getUserInfo = async (token): Promise<User | Error> => {
    try {
        const response = await axios.post(
            `${baseURL}/graphql`,
            {
                query: getUserInfoQuery(),
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            },
        );

        if (response.data.data.customer && response.data.data.customerCart) {
            return response.data.data;
        } else {
            throw new Error('Failed to login user');
        }
    } catch (err) {
        throw err;
    }
};

export const signupUser = async ({ firstName, lastName, email, password }) => {
    const unknownError =
        'Something went wrong when creating your account. Please try again.';
    const userAlreadyExists =
        'A user with the same email address is already registered.';
    try {
        const response = await axios.post(`${baseURL}/graphql`, {
            query: createUserAccountQuery({
                firstName,
                lastName,
                email,
                password,
            }),
        });

        if (response.data.data.createCustomer) {
            const customer = response.data.data.createCustomer.customer;
            const { firstname, lastname, email } = customer;
            return {
                user: {
                    firstName: firstname,
                    lastName: lastname,
                    email: email,
                },
            };
        } else if (response.data.errors) {
            if (
                response.data.errors[0].message ===
                'A customer with the same email address already exists in an associated website.'
            ) {
                return { userAlreadyExists };
            } else {
                return { unknownError };
            }
        } else {
            return { unknownError };
        }
    } catch (err) {
        return { unknownError };
    }
};
