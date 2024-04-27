export const componentErrorData: ComponentErrorData = {
    createTransactionError : {
        name: 'Failed to Authorize Payment',
        information: 'The order failed as the payment was not authorized. No payment has been taken, please try again.'
    },
    createOrderError: {
        name: 'Processing Delay',
        information: 'The order failed due to a network error after payment was made. Your order will be processed, however there may be a short delay in the order being made available on your account page. We appologise for the inconvenience. Please contact support if you have any questions.'
    },
    createPaymentError: {
        name: 'Could Not Make Payment',
        information: 'The order failed as we were unable to process the payment with your bank. No payment has been taken, please try again.'
    }
}