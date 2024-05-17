/**
 * @file API service functions for checkout where Boodil is used as payment method
 * @author danrfletcher
 */

import { useMutation } from '@apollo/client';
import createBoodilTransactionGql from '../graphql/CreateBoodilTransaction.gql';
import createBoodilPaymentGql from '../graphql/CreateBoodilPayment.gql';
import {
    CreateBoodilPaymentMutation,
    CreateBoodilPaymentMutationVariables,
    CreateBoodilPaymentResponse,
    CreateBoodilTransactionMutation,
    CreateBoodilTransactionMutationVariables,
} from '../__generated__/graphql';
import { useCallback, useMemo, useState } from 'react';
//----------------------------------------------------------------------------------------------------

/**
 * GraphQL mutation to create a transaction (payment authorization) with Boodil - used before user checks out / cart page
 * @returns An object containing the mutation handler function, the loading state of the mutation operation,
 * and any errors that have occurred.
 */
const useCreateBoodilTransaction = () => {
    // Live API Function
    const [
        createBoodilTransaction,
        {
            data: createBoodilTransactionData,
            loading: createBoodilTransactionIsLoading,
            error: createBoodilTransactionError,
        },
    ] = useMutation<
        CreateBoodilTransactionMutation,
        CreateBoodilTransactionMutationVariables
    >(createBoodilTransactionGql);

    const handleCreateBoodilTransaction = useCallback(
        async (variables: CreateBoodilTransactionMutationVariables) => {
            try {
                const result = await createBoodilTransaction({ variables });
                return result;
            } catch (e) {
                throw e;
            }
        },
        [createBoodilTransaction],
    );

    // API Service Function Values
    return useMemo(
        () => ({
            // Cached Values
            handleCreateBoodilTransaction, // Live API Function
            createBoodilTransactionData,
            createBoodilTransactionIsLoading,
            createBoodilTransactionError,
        }),
        [
            // Dependencies
            handleCreateBoodilTransaction, // Live API Function
            createBoodilTransactionData,
            createBoodilTransactionIsLoading,
            createBoodilTransactionError,
        ],
    );
};
//----------------------------------------------------------------------------------------------------

/**
 * GraphQL mutations (live & simulated) to create a payment (bank transfer) with Boodil  - first function call on checkout completion page
 * @returns An object containing the mutation handler function, the loading state of the mutation operation,
 * and any errors that have occurred.
 */
const useCreateBoodilPayment = () => {
    // Live API Function
    const [
        createBoodilPayment,
        {
            data: createBoodilPaymentData,
            loading: createBoodilPaymentIsLoading,
            error: createBoodilPaymentError,
        },
    ] = useMutation<
        CreateBoodilPaymentMutation,
        CreateBoodilPaymentMutationVariables
    >(createBoodilPaymentGql);

    const handleCreateBoodilPayment = useCallback(
        async (variables: CreateBoodilPaymentMutationVariables) => {
            try {
                const result = await createBoodilPayment({ variables });
                return result;
            } catch (e) {
                throw e;
            }
        },
        [createBoodilPayment],
    );

    // Simulated API Function for Testing
    const [_createBoodilPaymentData, _setCreateBoodilPaymentData] =
        useState<any>(false);
    const [_createBoodilPaymentIsLoading, _setCreateBoodilPaymentIsLoading] =
        useState<any>(false);
    const [_createBoodilPaymentError, _setCreateBoodilPaymentError] =
        useState<any>(false);

    const _handleCreateBoodilPayment = useCallback(
        (
            variables: CreateBoodilPaymentMutationVariables,
            statusCode: string,
        ) => {
            _setCreateBoodilPaymentIsLoading(true);
            setTimeout(() => {
                if (statusCode === '200') {
                    const result: CreateBoodilPaymentResponse = {
                        processingTime: '2024-04-24 21:10:30.000000',
                        uuid: '958589e2ba4b5bbdd377423f925d3186',
                        reference: '958589e2ba4b5bbdd377423f925d3186',
                        amount: 0.01,
                        currency: 'GBP',
                    };
                    _setCreateBoodilPaymentData(result);
                    _setCreateBoodilPaymentIsLoading(false);
                    return result;
                } else {
                    const result = {
                        errors: [
                            {
                                message: 'API call to Boodil failed.',
                                locations: [
                                    {
                                        line: 2,
                                        column: 5,
                                    },
                                ],
                                path: ['createBoodilPayment'],
                                extensions: {
                                    category: 'graphql-no-such-entity',
                                },
                            },
                        ],
                        data: {
                            createBoodilPayment: null,
                        },
                    };
                    _setCreateBoodilPaymentError(result);
                    _setCreateBoodilPaymentIsLoading(false);
                    return result;
                }
            }, 5000);
        },
        [],
    );

    // API Service Function Values
    return useMemo(
        () => ({
            // Cached Values
            handleCreateBoodilPayment, // Live API Function
            createBoodilPaymentData,
            createBoodilPaymentIsLoading,
            createBoodilPaymentError,
            _handleCreateBoodilPayment, // Simulated API Function
            _createBoodilPaymentData,
            _createBoodilPaymentIsLoading,
            _createBoodilPaymentError,
        }),
        [
            // Dependencies
            handleCreateBoodilPayment, // Live API Function
            createBoodilPaymentData,
            createBoodilPaymentIsLoading,
            createBoodilPaymentError,
            _handleCreateBoodilPayment, // Simulated API Function
            _createBoodilPaymentData,
            _createBoodilPaymentIsLoading,
            _createBoodilPaymentError,
        ],
    );
};
//----------------------------------------------------------------------------------------------------

/**
 * Custom hook to return stable object references to outputs from the above API service functions
 * @returns An object containing the mutation handler functions, loading states,
 * and any errors that have occurred when executing any & all of the above service functions
 */
export const useCheckoutApi = () => {
    // Hook Values
    const createBoodilTransactionApi = useCreateBoodilTransaction();
    const createBoodilPaymentApi = useCreateBoodilPayment();

    return {
        ...createBoodilTransactionApi,
        ...createBoodilPaymentApi,
    };
};
