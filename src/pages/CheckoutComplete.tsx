import { useContext, useEffect, useState } from 'react';
import loadingContext from '../contexts/loading/loadingContext';
import {
    ScatterBoxLoader,
    WifiLoader,
    BoltLoader,
} from 'react-awesome-loaders';
import useCompleteCheckout from '../hooks/checkout/useCompleteCheckout';
import { useNavigate } from 'react-router';
import { LightningLoader } from '../components/common/LightningLoader';

export const CheckoutComplete = () => {
    const { isFirstLoad, toggleIsFirstLoad } = useContext(loadingContext);
    const navigate = useNavigate();
    // const {
    //     visibleLoadingDots,
    //     orderStatusTextState,

    //     // API Service Function / Hook
    //     // Simulated API for testing purposes
    //     _createBoodilPaymentData,

    //     // createBoodilOrder
    //     // Simulated API for testing purposes
    //     _createBoodilOrderData,

    //     workflowState,
    //     componentErrors,
    // } = useCompleteCheckout();

    // const { completingPayment, placingOrder, orderCompleted } = workflowState;
    // const errors = Object.values(componentErrors).some(error => error);

    // useEffect(() => {
    //     if (isFirstLoad) toggleIsFirstLoad(false);
    // }, []);

    // Handle Navigation to Error Page if we Encounter an Error
    // if (errors) {
    //     const errorKey =
    //         (
    //             Object.keys(componentErrors) as Array<
    //                 keyof typeof componentErrors
    //             >
    //         ).find(key => componentErrors[key] === true) || 'unknown';
    //     const errorUrlParts = errorKey
    //         .split(/(?=[A-Z])/)
    //         .map(element => element.toLowerCase());
    //     const errorUrl = errorUrlParts.join('-');
    //     navigate(`/error/${errorUrl}`);
    // }

    return (
        <>
            <main>
                <section id="loading_animation">
                    <div className="centered_loader">
                        {/* {completingPayment && (
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
                        )} */}
                        {/* {orderCompleted && ( */}

                        <LightningLoader />
                        {/* )} */}
                    </div>
                </section>
                {/* <section id="checkout_info">
                    <div className="has-animation animation-ltr animate-in">
                        <p className="bigger">
                            {orderStatusTextState}
                            {!orderCompleted && (
                                <span className="loading_dots">
                                    <span
                                        style={{
                                            opacity:
                                                visibleLoadingDots === 0
                                                    ? 0
                                                    : 1,
                                        }}
                                    >
                                        .
                                    </span>
                                    <span
                                        style={{
                                            opacity:
                                                visibleLoadingDots <= 1 ? 0 : 1,
                                        }}
                                    >
                                        .
                                    </span>
                                    <span
                                        style={{
                                            opacity:
                                                visibleLoadingDots <= 2 ? 0 : 1,
                                        }}
                                    >
                                        .
                                    </span>
                                </span>
                            )}
                        </p>
                        <br />
                        <br />
                    </div>
                    <div
                        className={`blank_animation${
                            _createBoodilPaymentData &&
                            ' has-animation animation-rtl animate-in'
                        }`}
                    ></div>
                </section> */}
            </main>
        </>
    );
};


