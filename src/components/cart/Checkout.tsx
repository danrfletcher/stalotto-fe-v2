import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import countryCodes from '../../data/countryCodes.json';
import { useContext, useEffect, useState } from 'react';
import { NewShippingAddressDto } from '../../models/cart';
import userContext from '../../contexts/user/userContext';
import cartContext from '../../contexts/cart/cartContext';

export const Checkout = () => {
    const { isLoggedIn } = useContext(userContext);
    const [savedAddresses, setSavedAddresses] = useState([]);

    //data validation
    const { email, callingCode, phoneNumber, country, firstName, lastName, company, addressLine1, addressLine2, region, postcode, city, optOut, saveAddress, setCheckoutItem, makeDefaultBilling } =
        useContext(cartContext);

    //form completion
    const [isFormComplete, setIsFormComplete] = useState(false);

    useEffect(() => {
        if (country !== '' && firstName !== '' && lastName !== '' && addressLine1 !== '' && region !== '' && postcode !== '' && city !== '' && callingCode !== '' && phoneNumber !== '') {
            if (isLoggedIn) {
                setIsFormComplete(true);
            } else {
                if (email !== '') {
                    setIsFormComplete(true);
                }
            }
        } else setIsFormComplete(false);
    }, [email, country, firstName, lastName, addressLine1, postcode, city, callingCode, phoneNumber]);

    const handleSubmit = () => {
        if (isFormComplete) {
            const address = new NewShippingAddressDto({
                firstName: firstName,
                lastName: lastName,
                company: company,
                street: `${addressLine1}\n${addressLine2}`,
                city: city,
                region: region,
                postcode: postcode,
                countryCode: country,
                telephone: `${callingCode}${phoneNumber}`,
                saveInAddressBook: saveAddress,
            });
        }
    };

    //payments section
    const { displayPayments, toggleDisplayPayments } = useContext(cartContext);
    const disabled = displayPayments;

    return (
        <>
            <div className="modal_centered">
                <form className="checkout_form">
                    {/*===== Form-Body =====*/}
                    <div
                        className={`form_body checkout_form_body ${
                            displayPayments && !isLoggedIn ? 'ct_payment_visible' : displayPayments && isLoggedIn ? 'ct_payment_visible_logged_in' : !displayPayments && isLoggedIn ? 'logged_in' : ''
                        }`}
                    >
                        {isLoggedIn && (
                            <fieldset className="checkout_saved">
                                <legend>
                                    <h2>Saved Details</h2>
                                </legend>
                                <div className="input_box">
                                    <select disabled={disabled} name="saved_addresses" className={`input_field ${savedAddresses.length > 0 ? 'fix_text' : ''}`} value={''} onChange={() => {}}>
                                        <option value=""></option>
                                        <option value="GB">United Kingdom</option>
                                    </select>
                                    <label className="input_label">Select from Saved</label>
                                </div>
                            </fieldset>
                        )}
                        <fieldset className="checkout_contact">
                            <legend>
                                <h2>Contact</h2>
                            </legend>
                            <div className="form_subset">
                                {!isLoggedIn && (
                                    <>
                                        <p>
                                            Already have an account?{' '}
                                            <button type="button" style={{ color: 'rgb(238, 238, 238)' }} disabled={disabled}>
                                                Login
                                            </button>
                                        </p>
                                        <div className="input_box">
                                            <input
                                                disabled={disabled}
                                                type="email"
                                                name="mail"
                                                className={`input_field ${email.length > 0 ? 'fix_text' : ''}`}
                                                required
                                                value={email}
                                                onChange={(e) => setCheckoutItem('email', e.target.value)}
                                            />
                                            <label className="input_label">Email *</label>
                                        </div>
                                    </>
                                )}
                                <div className="checkout_flex_box">
                                    <div className="input_box checkout_flex_item checkout_calling_code">
                                        <select
                                            disabled={disabled}
                                            name="calling_code"
                                            className={`input_field ${callingCode.length > 0 ? 'fix_text' : ''}`}
                                            required
                                            value={callingCode}
                                            onChange={(e) => setCheckoutItem('callingCode', e.target.value)}
                                        >
                                            <option value=""></option>
                                            {countryCodes.map((country, i) => {
                                                return <option key={i} value={country.dial_code}>{`${country.dial_code} ${country.name}`}</option>;
                                            })}
                                        </select>
                                        <label className="input_label">Calling Code</label>
                                    </div>
                                    <div className="input_box checkout_flex_item checkout_phone_number">
                                        <input
                                            disabled={disabled}
                                            type="text"
                                            name="phoneNumber"
                                            className={`input_field ${phoneNumber.length > 0 ? 'fix_text' : ''}`}
                                            required
                                            value={phoneNumber}
                                            onChange={(e) => setCheckoutItem('phoneNumber', e.target.value)}
                                        />
                                        <label className="input_label">Phone Number *</label>
                                    </div>
                                </div>
                                {!isLoggedIn && (
                                    <FormControlLabel
                                        disabled={disabled}
                                        control={<Checkbox checked={optOut} onChange={(e) => setCheckoutItem('optOut', !optOut)} sx={{ color: '#5b5b5b', '&.Mui-checked': { color: '#cc0000' } }} />}
                                        label="Opt out of marketing emails with news and offers from your favourite creators."
                                    />
                                )}
                            </div>
                        </fieldset>
                        <fieldset className="checkout_billing">
                            <legend>
                                <h2>Order Details</h2>
                            </legend>
                            <div className="input_box">
                                <select
                                    disabled={disabled}
                                    name="country"
                                    className={`input_field country_selector ${country.length > 0 ? 'fix_text' : ''}`}
                                    required
                                    value={country}
                                    onChange={(e) => setCheckoutItem('country', e.target.value)}
                                >
                                    <option value=""></option>
                                    <option value="GB">United Kingdom</option>
                                </select>
                                <label className="input_label">Country *</label>
                            </div>
                            <div className="checkout_flex_box">
                                <div className="input_box checkout_flex_item">
                                    <input
                                        disabled={disabled}
                                        type="text"
                                        name="firstName"
                                        className={`input_field ${firstName.length > 0 ? 'fix_text' : ''}`}
                                        required
                                        value={firstName}
                                        onChange={(e) => setCheckoutItem('firstName', e.target.value)}
                                    />
                                    <label className="input_label">First Name *</label>
                                </div>
                                <div className="input_box checkout_flex_item">
                                    <input
                                        disabled={disabled}
                                        type="text"
                                        name="lastName"
                                        className={`input_field ${lastName.length > 0 ? 'fix_text' : ''}`}
                                        required
                                        value={lastName}
                                        onChange={(e) => setCheckoutItem('lastName', e.target.value)}
                                    />
                                    <label className="input_label">Last Name *</label>
                                </div>
                            </div>
                            <div className="input_box">
                                <input
                                    disabled={disabled}
                                    type="text"
                                    name="company"
                                    className={`input_field ${company.length > 0 ? 'fix_text' : ''}`}
                                    required
                                    value={company}
                                    onChange={(e) => setCheckoutItem('company', e.target.value)}
                                />
                                <label className="input_label">Company (Optional)</label>
                            </div>
                            <div className="input_box">
                                <input
                                    disabled={disabled}
                                    type="text"
                                    name="addressLine1"
                                    className={`input_field ${addressLine1.length > 0 ? 'fix_text' : ''}`}
                                    required
                                    value={addressLine1}
                                    onChange={(e) => setCheckoutItem('addressLine1', e.target.value)}
                                />
                                <label className="input_label">Address Line 1 (House Number & Street) *</label>
                            </div>
                            <div className="input_box">
                                <input
                                    disabled={disabled}
                                    type="text"
                                    name="addressLine2"
                                    className={`input_field ${addressLine2.length > 0 ? 'fix_text' : ''}`}
                                    required
                                    value={addressLine2}
                                    onChange={(e) => setCheckoutItem('addressLine2', e.target.value)}
                                />
                                <label className="input_label">Address Line 2 (Optional)</label>
                            </div>
                            <div className="input_box">
                                <input
                                    disabled={disabled}
                                    type="text"
                                    name="city"
                                    className={`input_field ${city.length > 0 ? 'fix_text' : ''}`}
                                    required
                                    value={city}
                                    onChange={(e) => setCheckoutItem('city', e.target.value)}
                                />
                                <label className="input_label">City *</label>
                            </div>
                            <div className="checkout_flex_box">
                                <div className="input_box checkout_flex_item">
                                    <input
                                        disabled={disabled}
                                        type="text"
                                        name="postcode"
                                        className={`input_field ${postcode.length > 0 ? 'fix_text' : ''}`}
                                        required
                                        value={postcode}
                                        onChange={(e) => setCheckoutItem('postcode', e.target.value)}
                                    />
                                    <label className="input_label">Postcode *</label>
                                </div>
                                <div className="input_box checkout_flex_item">
                                    <input
                                        disabled={disabled}
                                        type="text"
                                        name="region"
                                        className={`input_field ${region.length > 0 ? 'fix_text' : ''}`}
                                        required
                                        value={region}
                                        onChange={(e) => setCheckoutItem('region', e.target.value)}
                                    />
                                    <label className="input_label">Region *</label>
                                </div>
                            </div>
                            {isLoggedIn && (
                                <>
                                    <div>
                                        <FormControlLabel
                                            disabled={disabled}
                                            control={
                                                <Checkbox
                                                    checked={saveAddress}
                                                    onChange={(e) => setCheckoutItem('saveAddress', !saveAddress)}
                                                    sx={{ color: '#5b5b5b', '&.Mui-checked': { color: '#cc0000' } }}
                                                />
                                            }
                                            label="Save your information for a faster checkout next time"
                                        />
                                        {saveAddress && (
                                            <FormControlLabel
                                                disabled={disabled}
                                                control={
                                                    <Checkbox
                                                        checked={makeDefaultBilling}
                                                        onChange={(e) => setCheckoutItem('makeDefaultBilling', !makeDefaultBilling)}
                                                        sx={{ color: '#5b5b5b', '&.Mui-checked': { color: '#cc0000' } }}
                                                    />
                                                }
                                                label="Make this your default billing address"
                                            />
                                        )}
                                    </div>
                                </>
                            )}
                        </fieldset>
                        <div></div>
                        {displayPayments && (
                            <fieldset className="checkout_payment">
                                <legend>
                                    <h2>Payment</h2>
                                </legend>
                            </fieldset>
                        )}
                    </div>
                    <button
                        type="submit"
                        style={!isFormComplete ? { backgroundColor: '#6c757d' } : isFormComplete && !displayPayments ? {} : { backgroundColor: '#3067F2' }}
                        className="btn checkout_btn"
                        onClick={(e) => {
                            e.preventDefault();
                            if (isFormComplete) {
                                toggleDisplayPayments();
                            }
                        }}
                    >
                        {displayPayments ? 'Back to Details' : 'Continue to Payment'}
                    </button>
                </form>
            </div>
        </>
    );
};
