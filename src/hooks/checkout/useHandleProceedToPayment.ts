// hooks/useHandleFetchDataForPayment.js or .tsx if using TypeScript
import { useCallback, useContext, useEffect, useState } from 'react';
import countryCodes from '../../data/countryCodes.json';
import { useCartApi } from '../../services/cartApi';
import cartContext from '../../contexts/cart/cartContext';
import userContext from '../../contexts/user/userContext';
import {
    CreateCustomerAddressMutationVariables,
    SetBillingAddressOnCartMutationVariables,
} from '../../__generated__/graphql';

const useHandleFetchDataForPayment = ({
    email,
    firstName,
    lastName,
    company,
    addressLine1,
    addressLine2,
    city,
    region,
    postcode,
    country,
    callingCode,
    telephone,
    isFormComplete,
    saveAddress,
    defaultBilling,
}: HandleFetchDataForPaymentVariables) => {
    // Local State Variables
    const { cartId } = localStorage;

    // Component State Variables
    const [finalGuestEmailCheck, setFinalGuestEmailCheck] = useState(false);
    const [fetchInProgress, setFetchInProgress] = useState(false);

    // Context Variables
    const { displayPayments, toggleDisplayPayments } = useContext(cartContext);
    const { isLoggedIn } = useContext(userContext);

    // API Service Function / Hook
    const {
        handleSetGuestEmailOnCart,
        setGuestEmailData,
        setGuestEmailIsLoading,
        setGuestEmailError,

        handleSetBillingAddress,
        setBillingAddressData,
        setBillingAddressIsLoading,
        setBillingAddressError,

        handleGetPaymentMethodsOnCart,
        getPaymentMethodsOnCartData,
        getPaymentMethodsOnCartIsLoading,
        getPaymentMethodsOnCartError,

        handleSaveCustomerAddress,
        saveCustomerAddressData,
        saveCustomerAddressIsLoading,
        saveCustomerAddressError,
    } = useCartApi();

    // Effects
    useEffect(() => {
        if (
            setBillingAddressData &&
            getPaymentMethodsOnCartData &&
            ((setGuestEmailData && !isLoggedIn) || isLoggedIn) &&
            !displayPayments
        ) {
            toggleDisplayPayments();
        }
    }, [setBillingAddressData, setGuestEmailData, getPaymentMethodsOnCartData]);

    useEffect(() => {
        return () => {
            setFinalGuestEmailCheck(false);
        };
    });

    const handleFetchDataForPayment = useCallback(
        async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault(); //prevent page reload

            if (isFormComplete && !displayPayments) {
                try {
                    setFetchInProgress(true); //trigger loading state for proceed to payment button

                    //set guest email for anonymous users
                    if (!isLoggedIn) {
                        setFinalGuestEmailCheck(true);
                        await handleSetGuestEmailOnCart({
                            cartId: cartId,
                            email: email,
                        });
                    }

                    //define variables for billing address
                    const billingAddress: SetBillingAddressOnCartMutationVariables =
                        {
                            cartId: cartId,
                            firstName: firstName,
                            lastName: lastName,
                            company: company ? company : null,
                            street: (() => {
                                const streetItems = [addressLine1];
                                if (addressLine2.length) {
                                    streetItems.push(addressLine2);
                                }
                                return streetItems;
                            })(),
                            city: city,
                            region: region,
                            postcode: postcode,
                            countryCode: (() => {
                                const countryRecord = countryCodes.find(
                                    listedCountry =>
                                        listedCountry.name === country,
                                );
                                return countryRecord?.code || 'GB';
                            })(),
                            telephone: `${callingCode}~${telephone}`,
                        };

                    //set billing address on cart
                    await handleSetBillingAddress(billingAddress);

                    //get payment methods on cart
                    await handleGetPaymentMethodsOnCart({
                        cartId: cartId,
                    });

                    setFetchInProgress(false); //allow loading state for checkout button to end

                    //if customer saved address, set it silently in the background
                    if (saveAddress) {
                        const addressToSave: CreateCustomerAddressMutationVariables =
                            {
                                ...(billingAddress as CreateCustomerAddressMutationVariables),
                                defaultBilling: defaultBilling,
                            };
                        handleSaveCustomerAddress(addressToSave);
                    }
                } catch (err) {
                    console.error('Error: ', err);
                }
            } else if (displayPayments) {
                toggleDisplayPayments();
            } else {
                console.error(
                    'Error: Cannot proceed to payment unless payment card is hidden & form is completed.',
                );
            }
        },
        [
            isLoggedIn,
            email,
            cartId,
            firstName,
            lastName,
            company,
            addressLine1,
            addressLine2,
            city,
            region,
            postcode,
            country,
            countryCodes,
            callingCode,
            telephone,
            toggleDisplayPayments,
            isFormComplete,
            displayPayments,
            handleSetGuestEmailOnCart,
            handleSetBillingAddress,
            handleGetPaymentMethodsOnCart,
        ],
    );

    return {
        // Core Functions
        handleFetchDataForPayment,

        // API Service Functions
        handleSetGuestEmailOnCart,

        // Loading State Variables
        fetchInProgress,
        finalGuestEmailCheck,
        setGuestEmailError,
        setBillingAddressError,
        getPaymentMethodsOnCartError,

        // Data
        getPaymentMethodsOnCartData,
    };
};

export default useHandleFetchDataForPayment;
