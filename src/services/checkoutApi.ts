import { useMutation } from '@apollo/client';
import initiateBoodilPaymentGql from '../graphql/InitiateBoodilPayment.gql';
import {
    InitiateBoodilPaymentMutation,
    InitiateBoodilPaymentMutationVariables,
} from '../__generated__/graphql';

export const useCheckoutApi = () => {
    //initiateBoodilPayment
    const [initiateBoodilPayment, initiateBoodilPaymentStates] = useMutation<
        InitiateBoodilPaymentMutation,
        InitiateBoodilPaymentMutationVariables
    >(initiateBoodilPaymentGql);

    const initiateBoodilPaymentData = initiateBoodilPaymentStates.data;
    const initiateBoodilPaymentIsLoading = initiateBoodilPaymentStates.loading;
    const initiateBoodilPaymentError = initiateBoodilPaymentStates.error;

    const handleInitiateBoodilPayment = async (
        variables: InitiateBoodilPaymentMutationVariables,
    ) => {
        try {
            const result = await initiateBoodilPayment({ variables });
            return result;
        } catch (e) {
            throw e;
        }
    };

    return {
        //initiateBoodilPayment
        handleInitiateBoodilPayment,
        initiateBoodilPaymentData,
        initiateBoodilPaymentIsLoading,
        initiateBoodilPaymentError,
    };
};
