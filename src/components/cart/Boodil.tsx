import { useEffect } from "react";

const boodilWidgetUrl = import.meta.env.VITE_BOODIL_WIDGET_URL;

export const Boodil = () => {
        useEffect(() => {
        const script = document.createElement('script');
        script.src = boodilWidgetUrl;
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <button
            className="btn payment_btn"
            style={{
                backgroundColor: '#444444',
            }}
        >
            <img
                src="/images/paymentProviderButtons/boodil-pay-by-bank.png"
                alt="boodil logo with pay by bank text"
                style={{ transform: 'scale(0.8)' }}
            />
            <boodil-widget id=''></boodil-widget>
        </button>
    );
}