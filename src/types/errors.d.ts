type ErrorData = {
    name: string;
    information: string;
}

type ComponentErrorData = {
    createTransactionError: ErrorData;
    createPaymentError: ErrorData;
    createOrderError: ErrorData;
}

type ComponentErrors = {
    [K in keyof ComponentErrorData]?: boolean;
};
