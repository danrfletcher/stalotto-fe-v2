/**
 * @file Custom Hook for completing payment & placing an order after user completes checkout & is called back from the bank
 * Provides functions to confirm payment, place an order on back-end by checking payment is confirmed
 * & conditional rendering for checkout component
 * @author danrfletcher
 */

import { useEffect, useState } from 'react';
import { useCheckoutApi } from '../../services/checkoutApi';
import { useLocation } from 'react-router';

const useCompleteCheckout = () => {

    // Component Workflow State
    const [workflowState, setWorkflowState] = useState({
        completingPayment: true,
        placingOrder: false,
        orderCompleted: false,
    });

    // Component Error Handling
    const [componentErrors, setComponentErrors] = useState<ComponentErrors>({
        createTransactionError: false,
        createPaymentError: false,
        placeOrderError: false,
    });
    //----------------------------------------------------------------------------------------------------

    // API Service Function / Hook Destructuring
    const [uuid, setUuid] = useState<string>('');
    const [consentToken, setConsentToken] = useState<string>('');

    const {
        // createBoodilPayment API Function
        // Live API Function
        // Simulated API for testing purposes
        _handleCreateBoodilPayment,
        _createBoodilPaymentData,
        _createBoodilPaymentIsLoading,
        _createBoodilPaymentError,

        // createBoodilOrder API Function
        // Live API Function
        // Simulated API for testing purposes
        _handleCreateBoodilOrder,
        _createBoodilOrderData,
        _createBoodilOrderIsLoading,
        _createBoodilOrderError,
    } = useCheckoutApi();
    //----------------------------------------------------------------------------------------------------

    // Query Parameters & API Data Fetching
    // createBoodilPayment on Component Mount
    const location = useLocation();
    const [paymentRequestMade, setPaymentRequestMade] =
        useState<boolean>(false);
    useEffect(() => {
        // Parse the query parameters
        const getQueryParams = (query: string) => {
            return new URLSearchParams(query);
        };
        const queryParams = getQueryParams(location.search);

        // Access params
        const uuid = queryParams.get('uuid') || '';
        const consentToken = queryParams.get('consent') || '';

        if (uuid && consentToken && !paymentRequestMade) {
            _handleCreateBoodilPayment({ uuid, consentToken }, '200');
            setPaymentRequestMade(true);
        }
        //TEST API FUNCTION IN PLACE HERE***********************************************
        else
            setComponentErrors({
                ...componentErrors,
                createTransactionError: true,
            });
    }, []);

    // Catch Errors on createBoodilPayment
    useEffect(() => {
        if (_createBoodilPaymentError)
            setComponentErrors({
                ...componentErrors,
                createPaymentError: true,
            });
    }, [_createBoodilPaymentError]);

    // createBoodilOrder API Function on Success from createBoodilPayment
    const [orderRequestMade, setOrderRequestMade] = useState<boolean>(false);
    useEffect(() => {
        if (
            paymentRequestMade &&
            _createBoodilPaymentData &&
            !orderRequestMade
        ) {
            setOrderRequestMade(true);
            const { processingTime, uuid, reference, amount } =
            _createBoodilPaymentData;
            if (processingTime && uuid && reference && amount)
                _handleCreateBoodilOrder({ uuid, reference }, '200');
            //TEST API FUNCTION IN PLACE HERE***********************************************
            else
                setComponentErrors({
                    ...componentErrors,
                    createPaymentError: true,
                });
        }
    }, [paymentRequestMade, _createBoodilPaymentData]);

    // Catch Errors on createBoodilOrder
    useEffect(() => {
        if (_createBoodilOrderError)
            setComponentErrors({
                ...componentErrors,
                placeOrderError: true,
            });
    }, [_createBoodilOrderError]);
    //----------------------------------------------------------------------------------------------------

    // Checkout Completion Text & Component Workflow State
    const orderStatusText = [
        'Completing Payment',
        'Securing Your Tickets',
        'Order Completed',
    ];
    const [orderStatusTextState, setOrderStatusTextState] = useState<string>(
        orderStatusText[0],
    );
    useEffect(() => {
        if (_createBoodilPaymentData) {
            const paymentTextTimeout = setTimeout(() => {
                setWorkflowState({
                    ...workflowState,
                    completingPayment: false,
                    placingOrder: true,
                });
                setOrderStatusTextState(orderStatusText[1]);
            }, 900);

            // Clean up timeout when component unmounts
            return () => clearTimeout(paymentTextTimeout);
        }
    }, [_createBoodilPaymentData]);

    useEffect(() => {
        if (_createBoodilOrderData) {
            const orderTextTimeout = setTimeout(() => {
                setWorkflowState({
                    ...workflowState,
                    placingOrder: false,
                    orderCompleted: true,
                });
                setOrderStatusTextState(orderStatusText[2]);
            }, 900);

            // Clean up timeout when component unmounts
            return () => clearTimeout(orderTextTimeout);
        }
    }, [_createBoodilOrderData]);
    //----------------------------------------------------------------------------------------------------

    return {
        // Component Workflow States
        componentErrors,
        workflowState,

        // Webhook Parameters for API function
        uuid,
        consentToken,

        // API Service Function / Hook
        // createBoodilPayment
        // Live API
        // Simulated API for testing purposes
        _createBoodilPaymentData,
        _createBoodilPaymentIsLoading,
        _createBoodilPaymentError,
        // createBoodilOrder
        // Live API
        // Simulated API for testing purposes
        _createBoodilOrderData,
        _createBoodilOrderIsLoading,
        _createBoodilOrderError,

        // Checkout Completion Text
        orderStatusTextState,
    };
};

export default useCompleteCheckout;
