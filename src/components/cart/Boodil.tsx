import { useEffect, useState } from 'react';
import { useCheckoutApi } from '../../services/checkoutApi';
import { PropagateLoader } from 'react-spinners';

const boodilWidgetUrl = import.meta.env.VITE_BOODIL_WIDGET_URL;

export const Boodil = () => {
    //state
    const [paymentUuid, setPaymentUuid] = useState<string>('');

    //checkout API service function / useCheckoutApi hook
    const {
        handleInitiateBoodilPayment,
        initiateBoodilPaymentData,
        initiateBoodilPaymentIsLoading,
    } = useCheckoutApi();

    //effects
    useEffect(() => {
        const script = document.createElement('script');
        script.src = boodilWidgetUrl;
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        if (initiateBoodilPaymentData?.initiateBoodilPayment?.uuid) {
            setPaymentUuid(
                initiateBoodilPaymentData.initiateBoodilPayment.uuid,
            );
        }
    }, [initiateBoodilPaymentData]);

    return (
        <>
            <button
                className="btn payment_btn"
                style={{
                    backgroundColor: '#444444',
                }}
                onClick={e => {
                    e.preventDefault();
                    handleInitiateBoodilPayment({
                        cartId: localStorage.cartId,
                    });
                }}
            >
                {!initiateBoodilPaymentIsLoading && (
                    <img
                        src="/images/paymentProviderButtons/boodil-pay-by-bank.png"
                        alt="boodil logo with pay by bank text"
                        style={{ transform: 'scale(0.8)' }}
                    />
                )}
                {initiateBoodilPaymentIsLoading && (
                    <div className="boodil_loader">
                        <PropagateLoader color="#ffffff" />
                    </div>
                )}
            </button>
            <boodil-widget id={paymentUuid}></boodil-widget>
        </>
    );
};
