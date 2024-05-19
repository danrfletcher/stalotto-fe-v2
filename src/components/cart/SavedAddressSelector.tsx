import countryCodes from '../../data/countryCodes.json';
import { useContext, useEffect, useState } from 'react';
import cartContext from '../../contexts/cart/cartContext';
import { useCartApi } from '../../services/cartApi';

interface SavedAddressSelectorProps {
    disable: boolean;
}

const SavedAddressSelector: React.FC<SavedAddressSelectorProps> = (props) => {
    const disable =
        props && props.disable !== undefined ? props.disable : false;

    // State Variables
    const [savedAddresses, setSavedAddresses] = useState<
        ShippingAddressFormEntry[]
    >([]);

    // Context variables
    const { setCheckoutItem } = useContext(cartContext);

    // Cart API Service Function / Hook
    const {
        handleGetSavedCustomerAddresses,
        getSavedCustomerAddressesData,
        getSavedCustomerAddressesIsLoading,
        getSavedCustomerAddressesError,
    } = useCartApi();

    useEffect(() => {
        (async function () {
            try {
                await handleGetSavedCustomerAddresses();
            } catch (err) {
                console.error('Error: ', err);
            }
        })();
    }, []);

    useEffect(() => {
        if (getSavedCustomerAddressesData) {
            setSavedAddresses(() => {
                return (
                    getSavedCustomerAddressesData.customer?.addresses?.map(
                        (address) => {
                            const street = address?.street || ['', ''];
                            const telephoneParts = (
                                address?.telephone || '~'
                            ).split('~');

                            return {
                                firstName: address?.firstname || '',
                                lastName: address?.lastname || '',
                                company: address?.company || '',
                                addressLine1: street[0] || '',
                                addressLine2: street[1] || '',
                                city: address?.city || '',
                                region: address?.region?.region || '',
                                country:
                                    (function () {
                                        const country = countryCodes.find(
                                            (country) =>
                                                country.code ===
                                                address?.country_code,
                                        );
                                        if (country) return country.name;
                                        else return '';
                                    })() || '',
                                callingCode: telephoneParts[0] || '',
                                telephone: telephoneParts[1] || '',
                                postcode: address?.postcode || '',
                            };
                        },
                    ) || []
                );
            });
        }
    }, [getSavedCustomerAddressesData]);

    const handleSelectSavedAddress = (address: ShippingAddressFormEntry) => {
        //set checkout state
        Object.keys(address).forEach((key) => {
            if (key in address) {
                const value = address[key as keyof ShippingAddressFormEntry];
                setCheckoutItem(key, value);
            }
        });
        setCheckoutItem('savedAddressIsSelected', true); //prevent 'save this address' checkbox from appearing when saved address is selected
    };

    return (
        <select
            disabled={disable}
            name="saved_addresses"
            className={`input_field`}
            onChange={(e) =>
                handleSelectSavedAddress(JSON.parse(e.target.value))
            }
        >
            {getSavedCustomerAddressesIsLoading ? (
                <option value="">Loading your saved addresses...</option>
            ) : getSavedCustomerAddressesError ? (
                <option value="">Failed to load your saved addresses</option>
            ) : getSavedCustomerAddressesData ? (
                <>
                    <option value=""></option>
                    {savedAddresses.map((address, i) => (
                        <option
                            value={JSON.stringify(address)}
                            key={i}
                        >{`${(() => {
                            let addressToDisplay: string = '';
                            Object.values(address).forEach((property) => {
                                if (property !== '') {
                                    addressToDisplay = addressToDisplay.concat(
                                        ', ',
                                        property,
                                    );
                                }
                            });
                            return addressToDisplay.substring(2);
                        })()}`}</option>
                    ))}
                </>
            ) : (
                ''
            )}
        </select>
    );
};

export default SavedAddressSelector;
