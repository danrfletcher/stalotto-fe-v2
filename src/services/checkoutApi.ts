import { useMutation } from '@apollo/client';
import createBoodilTransactionGql from '../graphql/createBoodilTransaction.gql';
import {
    CreateBoodilTransactionMutation,
    CreateBoodilTransactionMutationVariables,
} from '../__generated__/graphql';

export const useCheckoutApi = () => {
    //createBoodilTransaction
    const [createBoodilTransaction, createBoodilTransactionStates] = useMutation<
        CreateBoodilTransactionMutation,
        CreateBoodilTransactionMutationVariables
    >(createBoodilTransactionGql);

    const createBoodilTransactionData = createBoodilTransactionStates.data;
    const createBoodilTransactionIsLoading = createBoodilTransactionStates.loading;
    const createBoodilTransactionError = createBoodilTransactionStates.error;

    const handleCreateBoodilTransaction = async (
        variables: CreateBoodilTransactionMutationVariables,
    ) => {
        try {
            const result = await createBoodilTransaction({ variables });
            return result;
        } catch (e) {
            throw e;
        }
    };

    return {
        //createBoodilTransaction
        handleCreateBoodilTransaction,
        createBoodilTransactionData,
        createBoodilTransactionIsLoading,
        createBoodilTransactionError,
    };
};
