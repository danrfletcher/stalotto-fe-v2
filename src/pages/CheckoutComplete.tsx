import { useContext, useEffect } from 'react';
import loadingContext from '../contexts/loading/loadingContext';
import { ScatterBoxLoader, WifiLoader } from 'react-awesome-loaders';
import { useNavigate } from 'react-router';
import useCompleteCheckout from '../hooks/checkout/useCompleteCheckout';

export const CheckoutComplete = () => {
    const { isFirstLoad, toggleIsFirstLoad } = useContext(loadingContext);
    useEffect(() => {
        if (isFirstLoad) toggleIsFirstLoad(false);
    }, []);

    const { state } = useCompleteCheckout();

    const navigate = useNavigate();

    const completingPayment =
        state.matches('checkTransactionCredentials') ||
        state.matches('createPayment') ||
        state.matches('creatingPayment');

    const placingOrder =
        state.matches('createOrder') || state.matches('creatingOrder');

    const orderCompleted = state.matches('orderComplete');

    const errors =
        state.matches('createOrderError') ||
        state.matches('createPaymentError') ||
        state.matches('createTransactionError');

    //----------------------------------DEBUGGING---------------------------------------------


    useEffect(() => {
        console.log("⚡ ~ state.value:", state.value)
    },[state.value])



    //----------------------------------DEBUGGING---------------------------------------------

    //Handle Navigation to Error Page if we Encounter an Error
    if (errors) {
        navigate(
            `/error/${
                state.matches('createOrderError')
                    ? 'create-order-error'
                    : state.matches('createPaymentError')
                    ? 'create-payment-error'
                    : state.matches('createTransactionError')
                    ? 'create-transaction-error'
                    : 'unknown'
            }`,
        );
    }

    return (
        <>
            <main>
                <section id="checkout_loading_animation">
                    <div className="centered_loader">
                        {completingPayment && (
                            <WifiLoader
                                background={'transparent'}
                                desktopSize={'150px'}
                                mobileSize={'150px'}
                                backColor="#141414"
                                frontColor="#a9afc3"
                                text={''}
                            />
                        )}
                        {placingOrder && (
                            <ScatterBoxLoader
                                primaryColor={'#a9afc3'}
                                background={'#141414'}
                            />
                        )}
                        {orderCompleted && (
                            <svg
                                className="checkmark"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 52 52"
                            >
                                <circle
                                    className="checkmark__circle"
                                    cx="26"
                                    cy="26"
                                    r="25"
                                    fill="none"
                                />
                                <path
                                    className="checkmark__check"
                                    fill="none"
                                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                                />
                            </svg>
                        )}
                    </div>
                </section>
                <section id="checkout_info">
                    <div className="">
                        <h1>
                            {completingPayment
                                ? 'Completing Payment'
                                : placingOrder
                                ? 'Securing Your Tickets'
                                : orderCompleted
                                ? 'Order Completed'
                                : 'Something Went Wrong'}
                        </h1>
                        <br />
                    </div>
                    {orderCompleted && (
                        <div className="order_complete_container">
                            <p className="order_complete_text">
                                Thank you for your purchase! You will receive a
                                confirmation email shortly. Ticket numbers will
                                be assigned & emailed to you when entries close,
                                usually 7 days before the prize draw.
                            </p>
                            <br />
                            <br />
                        </div>
                    )}
                </section>
            </main>
        </>
    );
};
