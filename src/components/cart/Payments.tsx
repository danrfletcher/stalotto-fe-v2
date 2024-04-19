import React from 'react';
import { GetPaymentMethodsOnCartQuery } from '../../__generated__/graphql';
import paymentProviderButtons from '../../data/paymentProviderButtons';

interface PaymentProps {
    paymentOptionData: GetPaymentMethodsOnCartQuery;
}

export const Payments: React.FC<PaymentProps> = ({ paymentOptionData }) => {

    const paymentProviders = paymentOptionData.cart?.available_payment_methods;

    return (
        <div className="payment_buttons">
            {paymentProviders?.map(provider => {
                if (!provider) return null; 
                const button = paymentProviderButtons.find(
                    button => button.code === provider.code, 
                );

                return button
                    ? React.cloneElement(button.component, {
                          key: provider.code,
                      })
                    : null;
            })}
        </div>
    );
};
