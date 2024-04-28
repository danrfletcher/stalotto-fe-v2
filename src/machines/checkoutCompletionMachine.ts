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
        /** @xstate-layout N4IgpgJg5mDOIC5QGMAWZkGsD2BXALgMLYC2ADgDZj4CW2AdgHRoaYAqATgIb2xfK0GhDpDD1aXCrADEARQCqAUQBKATQD6ABQCCy7QFkAyuoBiAeXkA5ACIBtAAwBdRKDLZYNQfRcgAHogBaAHYAJgAWRgBmADYQoOiwoKTIgEYQ6IAaEABPRDj7RjjIsIBOEsiYlOiSgFYAXzqsliw8IlJKajomZvZuXn4vYVFxGkkZSzN1BRUNHT0jB2ckEDcPLx9-BACU+xSgxmj7Ypqa+yCakqOs3IQgqsYLxLLElMiADhKghqb0FoJichULzMERcWj0KCaLjZEhifDSNgASX0igsbEWPlWni6G0C4TejBK0TeQWKQTCaR2JTC10QMRqjFKZWqYTe4RCKRK3xAPVaAI6wOQoPBkOhsPECORqPk6JSS1c7mxDFxWxCIRKhPiNTC0WJFTuKVpCFKBTCNUi9mikSJrLCkXO3N5-3aQK6ILAYJoEKhMLh0kIykU2jYii02lUKMsbFM2kRABlFHYnJjFetlpswgVrW8dUc3m8Um9Io8jYcUozzZbrQkc+9Hb8cM7AZ0GO7Pd6xX6dBHFFH1AGgyGk-KVqmcem8iFIoUwk97DUgrt7NSaTk8uVGPYt1v4urrWbIvXWHyXS3usKwGYOBAwBx-YHg6GzMprCp1NpLMjg4izJZ1IY2F0IcMWWLE01ATZojSRgggLEIaiNPdN23M5YnKalzSPP42mbQVhS9KArxvO9n1fZR+wfYDk1AsdlQnBAUkYiJbRCItZ1CaIakyNcECQlDUL3DDD0aHkGxPXC3SFD18DAH1xXhAdHzDHs+0DaYAP-Xt0WohU1nHCC8WpGDimLGoc2pNJEI3fiC2pN5LTeBoRPobAb3gZYnRwgV9NHPS6IMrZGOLB4jULEIYNJGo1XsN4aiqOsRM8-lXVbHpOB4PgBC6IYbxGMYUz87x6O2GL9gQni+JQ3d0IPLDGy8lLz2ksB0v6LKGEUDgOGwDgCqVIqArSKLCjSBI4vzVkgiNUICSCT4qXsmKSkLOrxO81L8I7X1xD68C-HXA5l3tTNDiOnMrOnfjqv3TDErEpt1qasFL2vW9dp8jMdQeWChv4rduJuSrt2uoTVoexq2xFIi3powqVSJS7Ungi7kOBtCbuEn5j3Bs9Idkzsdth-qVQCM0CjZexWM5Nkwg5EoUau9HQbu7GGtxqTnrkuFOu63qib2zZRoJLj0dpw4p0iUtEkKOJyS4hdrSSMG2eBHriOS6gwHe-z9oYi0NQpN5dR2Ey7gB9dy3OLcKjKe0txCJy6iAA */
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
                    CREATE_ORDER_ANIMATION_STARTED: 'creatingOrder'
                },
            },

            creatingOrder: {
                on: {
                    ORDER_CREATED: 'orderComplete'
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

            orderComplete: {
                type: 'final',
            }
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
