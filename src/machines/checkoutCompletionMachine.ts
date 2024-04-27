/**
 * @file Handles workflow states for CheckoutComplete page including workflow logic relating to data fetching for transaction, payment & order creation
 * @author danrfletcher
 */

import { createMachine, assign } from 'xstate';
import { CreateBoodilPaymentResponse } from '../__generated__/graphql';
//----------------------------------------------------------------------------------------------------

/**
 * State machine callback functions for executing actions on state changes
 * @callback getQueryParams checks URL query parameters required for payment creation are present on page load
 */
export const checkoutCompletionMachine = createMachine(
    {
        /** @xstate-layout N4IgpgJg5mDOIC5QGMAWZkGsD2BXALgMLYC2ADgDZj4CW2AdgHRoaYAqATgIb2xfK0GhDpDD1aXCrADEARQCqAUQBKATQD6ABQCCy7QFkAyuoBiAeXkA5ACIBtAAwBdRKDLZYNQfRcgAHogBaAHYAJgAWRgBmADYQoOiwoKTIgEYQ6IAaEABPRDj7RjjIsIBOEsiYlOiSgFYAXzqsliw8IlJKajomZvZuXn4vYVFxGkkZSzN1BRUNHT0jB2ckEDcPLx9-BACU+xSgxmj7Ypqa+yCakqOs3IQgqsYLxLLElMiADhKghqb0FoJichULzMERcWj0KCaLjZEhifDSNgASX0igsbEWPlWni6G0C4TejBK0TeQWKQTCaR2JTC10QMRqjFKZWqYTe4RCKRK3xAPVaAI6wOQoPBkOhsPECORqPk6JSS1c7mxDFxWxCIRKhPiNTC0WJFTuKVpCFKBTCNUi9mikSJrLCkXO3N5-3aQK6ILAYJoEKhMLh0kIykU2jYii02lUKMsbFM2kRABlFHYnJjFetlpswgVrW8dUc3m8Um9Io8jYcUozzZbrQkc+9Hb8cM7AZ0GO7Pd6xX6dBHFFH1AGgyGk-KVqmcem8iFIoUwk97DUgrt7NSaTk8uVGPYt1v4urrWbIvXWHyXS3usKwGYOBAwBx-YHg6GzMprCp1IHpoZo4Ze+jk8ssTTUBNmiNJGCCAsQhqI0903bczlicpqXNI8-jaZtBWFL0oCvG87yRFE0QxACx2VCcEFifY3guGIdVeGodkyNcEHpB5txOQtzXJLlGh5BsTwwt0hQ9EVcNvSVCJlWw5RTNZx2AxAEgKZDimo+wp3JVcblOcsDyrG1awdXinXQgUhKwiExLvZ9X2UfsHyHYiFTksiFIQFIdgJKcwhCItZ1CaIaiYm5YPghC9xU1DG1M11W2E9scOvcSB0fdQbLfExYwTYdZKVbxyJ2e1wKZFk2R8zkjXeLz0guXzEiLbVD2M-imzMuKLx9cV4RSkMwx7PsPyUL91B-KMnNHFz8rcgJ1QiUk7ROHNqTSGCNzCgtqTeS03gaXj6GwG94GWEz+ViqaJrylVtnoh4jULEJwNJU4QnsAtQnSHbmuPVqzuYBtOB4PgBC6IYbxGMZcqAvxAk8-ZoOY0L4N3JCDyigS2vPESwAB-pgYYRQOA4bAOEh+TofcqCHo5dIzULHMSSNUICSCT4qS216SkLNGfrPNsRU6uFSdc8n1QOZd7UzQ5xZzVbpzC5H9xQr60NO3n4vwS8kpJkjJpVWdogeCC0lOMLLVluDtwVyLlei1XMJE7CrKF87NnKApzWN835cQxWmp+b6YrVjrO3EZ2rrNAo2XUjayo5EovaRn3rf9lXT3tsEwAF8QCaJ7XnMugqPoeXU9x8w4p0iUtEkKOJySChdrSSbnA-TjWrJz4mw8LklCmiO4PlnI51Xh7TYk1ZItt8rdIhCZu7bdYm8LtsAu7c15l0ZQtdUKu07mC9dy3OafrXKRd1N2uogA */
        id: 'checkoutCompletion',
        initial: 'checkTransactionCredentials',
        context: {
            paymentRetries: 0,
            orderRetries: 0,
            uuid: '' as string,
            consentToken: '' as string,
            paymentData: null as CreateBoodilPaymentResponse | null,
            orderData: null as any, //Add correct type when Live API function built
        },
        //----------------------------------------------------------------------------------------------------
        /**
         * States for CheckoutComplete Page
         * @property {object} checkTransactionCredentials - Initial state of page, checks will be carried out to ensure that URL query parameters exist in order to issue API request to make payment
         * @property {object} createTransactionError      - Final error state results if URL query parameters are missing on the initial page load
         * @property {object} createPayment               - State results if URL query parameters are present, making it possible to issue a request to make payment
         * @property {object} creatingPayment             - State results if API request to create payment has been issued & is awaiting a response from the server
         * @property {object} createPaymentError          - Final error state results if request to make a payment was unsuccessful or times out more than 5 times
         * @property {object} createOrder                 - State results if API request to create payment was successful, making it possible to create an order on the back-end
         * @property {object} creatingOrder               - State results if API request to create order has been issued & is awaiting a response from the server
         * @property {object} createOrderError            - Final error state results if payment was made but the request to create the order was unsuccessful or times out more than 5 times
         * @property {object} orderComplete               - Final state results if API request to create was successful.
         */
        states: {
            checkTransactionCredentials: {
                on: {
                    QUERY_PARAMS_FOUND: {
                        target: 'createPayment',
                        actions: 'setQueryParams',
                    },
                    NO_QUERY_PARAMS: 'createTransactionError',
                },
            },
            createTransactionError: {
                type: 'final',
            },
            creatingPayment: {
                on: {
                    TIMEOUT: [
                        {
                            target: 'createPayment',
                            actions: 'incrementPaymentRetries',
                            guard: 'canRetryPayment',
                        },
                        'createPaymentError',
                    ],
                    CREATE_PAYMENT_FAILED: 'createPaymentError',
                    PAYMENT_CREATED: 'createOrder'
                },
            },
            createOrder: {
                on: {
                    CREATE_ORDER_REQUEST_SENT: 'creatingOrder',
                },
            },
            creatingOrder: {
                on: {
                    TIMEOUT: [
                        {
                            target: 'createOrder',
                            actions: 'incrementOrderRetries',
                            guard: 'canRetryOrder',
                        },
                        'createOrderError',
                    ],
                    CREATE_ORDER_FAILED: 'createOrderError',
                    ORDER_CREATED: 'orderComplete',
                },
            },
            createPayment: {
                on: {
                    CREATE_PAYMENT_REQUEST_SENT: 'creatingPayment',
                },
            },
            createPaymentError: {
                type: 'final',
            },
            createOrderError: {
                type: 'final',
            },
            orderComplete: {
                type: 'final',
            },
        },
    },
    //----------------------------------------------------------------------------------------------------
    /**
     * Actions, Guards
     */
    {
        actions: {
            incrementPaymentRetries: assign({
                paymentRetries: ({ context }) => context.paymentRetries + 1,
            }),
            incrementOrderRetries: assign({
                orderRetries: ({ context }) => context.orderRetries + 1,
            }),
            setQueryParams: assign({
                uuid: ({ event }) => event.uuid,
                consentToken: ({ event }) => event.consentToken,
            }),
            setPaymentData: assign({
                paymentData: ({ event }) => event.paymentData,
            }),
            setOrderData: assign({
                orderData: ({ event }) => event.orderData,
            }),
        },
        guards: {
            canRetryPayment: ({ context }) => context.paymentRetries < 5,
            canRetryOrder: ({ context }) => context.orderRetries < 5,
        },
    },
);
