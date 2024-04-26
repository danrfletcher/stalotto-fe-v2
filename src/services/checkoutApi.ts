import { useMutation } from '@apollo/client';
import createBoodilTransactionGql from '../graphql/createBoodilTransaction.gql';
import createBoodilPaymentGql from '../graphql/createBoodilPayment.gql';
import {
    CreateBoodilPaymentMutation,
    CreateBoodilPaymentMutationVariables,
    CreateBoodilPaymentResponse,
    CreateBoodilTransactionMutation,
    CreateBoodilTransactionMutationVariables,
} from '../__generated__/graphql';
import { useCallback, useState } from 'react';

export const useCheckoutApi = () => {
    //createBoodilTransaction
    const [createBoodilTransaction, createBoodilTransactionStates] =
        useMutation<
            CreateBoodilTransactionMutation,
            CreateBoodilTransactionMutationVariables
        >(createBoodilTransactionGql);

    const createBoodilTransactionData = createBoodilTransactionStates.data;
    const createBoodilTransactionIsLoading =
        createBoodilTransactionStates.loading;
    const createBoodilTransactionError = createBoodilTransactionStates.error;

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
    //----------------------------------------------------------------------------------------------------

    //createBoodilPayment

    // Live API Function
    const [createBoodilPayment, createBoodilPaymentStates] = useMutation<
        CreateBoodilPaymentMutation,
        CreateBoodilPaymentMutationVariables
    >(createBoodilPaymentGql);

    const createBoodilPaymentData = createBoodilPaymentStates.data;
    const createBoodilPaymentIsLoading = createBoodilPaymentStates.loading;
    const createBoodilPaymentError = createBoodilPaymentStates.error;

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

    // Simulated API Function for Testing Purposes
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
        [_setCreateBoodilPaymentIsLoading, _setCreateBoodilPaymentData],
    );

    //----------------------------------------------------------------------------------------------------

    //createBoodilOrder

    // Live API Function

    // Simulated API Function for Testing Purposes
    const [_createBoodilOrderData, _setCreateBoodilOrderData] =
        useState<any>(false);
    const [_createBoodilOrderIsLoading, _setCreateBoodilOrderIsLoading] =
        useState<any>(false);
    const [_createBoodilOrderError, _setCreateBoodilOrderError] =
        useState<any>(false);

    const _handleCreateBoodilOrder = useCallback(
        (variables: any, statusCode: string) => {
            _setCreateBoodilOrderIsLoading(true);
            setTimeout(() => {
                if (statusCode === '200') {
                    const result = {
                        orderNumber: '00000001256',
                        paymentCompleted: true,
                        paymentFailed: false,
                    };
                    _setCreateBoodilOrderData(result);
                    _setCreateBoodilOrderIsLoading(false);
                    return result;
                } else if (statusCode === '200Failed') {
                    const result = {
                        data: {
                            createBoodilOrder: {
                                orderNumber: '00000001256',
                                paymentCompleted: true,
                                paymentFailed: false,
                            },
                        },
                    };
                    _setCreateBoodilOrderData(result);
                    _setCreateBoodilOrderIsLoading(false);
                    return result;
                } else if (statusCode === '200Incomplete') {
                    const result = {
                        data: {
                            createBoodilOrder: {
                                orderNumber: '00000001256',
                                paymentCompleted: false,
                                paymentFailed: false,
                            },
                        },
                    };
                    _setCreateBoodilOrderData(result);
                    _setCreateBoodilOrderIsLoading(false);
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
                                path: ['createBoodilOrder'],
                                extensions: {
                                    category: 'graphql-no-such-entity',
                                },
                            },
                        ],
                        data: {
                            createBoodilOrder: null,
                        },
                    };
                    _setCreateBoodilOrderError(result);
                    _setCreateBoodilOrderIsLoading(false);
                    return result;
                }
            }, 5000);
        },
        [_setCreateBoodilOrderIsLoading, _setCreateBoodilOrderData],
    );

    return {
        // createBoodilTransaction
        handleCreateBoodilTransaction,
        createBoodilTransactionData,
        createBoodilTransactionIsLoading,
        createBoodilTransactionError,

        // createBoodilPayment
        // Live API Function
        handleCreateBoodilPayment,
        createBoodilPaymentData,
        createBoodilPaymentIsLoading,
        createBoodilPaymentError,
        // Simulated API Function for Testing Purposes
        _handleCreateBoodilPayment,
        _createBoodilPaymentData,
        _createBoodilPaymentIsLoading,
        _createBoodilPaymentError,

        // createBoodilOrder
        // Live API Function
        // Simulated API Function for Testing Purposes
        _handleCreateBoodilOrder,
        _createBoodilOrderData,
        _createBoodilOrderIsLoading,
        _createBoodilOrderError,
    };
};
