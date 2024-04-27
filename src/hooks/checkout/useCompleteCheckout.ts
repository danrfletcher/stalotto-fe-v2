/**
 * @file Handles state management for CheckoutComplete page using checkout API service functions & checkout completion state machine
 * @author danrfletcher
 */

import { useMachine } from '@xstate/react';
import { checkoutCompletionMachine } from '../../machines/checkoutCompletionMachine';
import { useLocation } from 'react-router';
import { useEffect } from 'react';
import { useCheckoutApi } from '../../services/checkoutApi';
//----------------------------------------------------------------------------------------------------

const useCompleteCheckout = () => {
    const [state, send] = useMachine(checkoutCompletionMachine);
    const {
        _handleCreateBoodilPayment,
        _createBoodilPaymentData,
        _createBoodilPaymentIsLoading,
        _createBoodilPaymentError,

        _handleCreateBoodilOrder,
        _createBoodilOrderData,
        _createBoodilOrderIsLoading,
        _createBoodilOrderError,
    } = useCheckoutApi();

    // Check & Send Query Params on Mount
    const location = useLocation();
    useEffect(() => {
        // Parse the query parameters
        const getQueryParams = (query: string) => {
            return new URLSearchParams(query);
        };
        const queryParams = getQueryParams(location.search);

        // Access params
        const uuid = queryParams.get('uuid') || '';
        const consentToken = queryParams.get('consent') || '';

        // Update State Machine
        if (uuid && consentToken)
            send({ type: 'QUERY_PARAMS_FOUND', uuid, consentToken });
        else send({ type: 'NO_QUERY_PARAMS' });
    }, []);

    // Handle API Responses / Initiate Happy Path State Change
    useEffect(() => {
        if (_createBoodilPaymentData) {
            send({
                type: 'PAYMENT_CREATED',
                paymentData: _createBoodilPaymentData,
            });
        }
    }, [_createBoodilPaymentData]);
    useEffect(() => {
        if (_createBoodilOrderData)
            send({
                type: 'ORDER_CREATED',
                orderData: _createBoodilOrderData,
            });
    }, [_createBoodilOrderData]);

    // Catch Errors / Initiate Sad Path State Change
    useEffect(() => {
        if (_createBoodilPaymentError) send({ type: 'CREATE_PAYMENT_FAILED' });
    }, [_createBoodilPaymentError]);
    useEffect(() => {
        if (_createBoodilOrderError) send({ type: 'CREATE_ORDER_FAILED' });
    }, [_createBoodilOrderError]);

    // Send API Requests on Workflow State Change
    const { consentToken, uuid } = state.context;
    useEffect(() => {
        if (state.matches('createPayment')) {
            send({ type: 'CREATE_PAYMENT_REQUEST_SENT' });
            _handleCreateBoodilPayment({ uuid, consentToken }, '200');
        }
        if (state.matches('createOrder')) {
            send({ type: 'CREATE_ORDER_REQUEST_SENT' });
            _handleCreateBoodilOrder({ uuid }, '200');
        }
    }, [state.value]);



    return {
        state,

        _createBoodilPaymentData,
        _createBoodilPaymentIsLoading,
        _createBoodilPaymentError,

        _createBoodilOrderData,
        _createBoodilOrderIsLoading,
        _createBoodilOrderError,
    };
};

export default useCompleteCheckout;