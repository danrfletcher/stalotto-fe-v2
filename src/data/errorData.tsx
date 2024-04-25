export const componentErrorData: ComponentErrorData = {
    createTransactionError : {
        name: 'Failed to Authorize with Bank',
        information: 'The order failed as the payment was not authorized. No payment has been taken, please try again.'
    },
    placeOrderError: {
        name: 'Failed to Place Order',
        information: 'The order failed due to a network error after payment was made. A log of this error has been taken & our team has been notified to ensure your order is processed. There may be a short delay in the order being made available on your account page. We are extremely sorry for the inconvenience. Please contact support if you have any questions.'
    },
    createPaymentError: {
        name: 'Payment Not Made',
        information: 'The order failed as we were unable to process the payment with your bank. No payment has been taken, please try again.'
    }
}