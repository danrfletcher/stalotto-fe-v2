import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import countryCodes from '../../data/countryCodes.json';
import { useContext, useEffect, useState } from 'react';
import { NewShippingAddressDto } from '../../models/cart';
import userContext from '../../contexts/user/userContext';

export const Checkout = () => {
    //data validation
    const [email, setEmail] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [company, setCompany] = useState<string>('');
    const [addressLine1, setAddressLine1] = useState<string>('');
    const [addressLine2, setAddressLine2] = useState<string>('');
    const [postcode, setPostcode] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [callingCode, setCallingCode] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [optOut, setOptOut] = useState<boolean>(false);
    const [saveAddress, setSaveAddress] = useState<boolean>(false);

    //validating form is complete
    const [isFormComplete, setIsFormComplete] = useState(false);
    useEffect(() => {
        if (email !== '' && country !== '' && firstName !== '' && lastName !== '' && addressLine1 !== '' && postcode !== '' && city !== '' && callingCode !== '' && phoneNumber !== '')
            setIsFormComplete(true);
        else setIsFormComplete(false);
    }, [email, country, firstName, lastName, addressLine1, postcode, city, callingCode, phoneNumber]);

    const handleSubmit = () => {
        const address = new NewShippingAddressDto({
            firstName: firstName,
            lastName: lastName,
            company: company,
            street: `${addressLine1}\n${addressLine2}`,
            city: city,
            postcode: postcode,
            countryCode: country,
            telephone: `${callingCode}${phoneNumber}`,
            saveInAddressBook: saveAddress,
        });
    }

    const { isLoggedIn } = useContext(userContext);

    return (
        <>
            <div className="modal_centered">
                <form className="checkout_form">
                    {/*===== Form-Body =====*/}
                    <div className="form_body checkout_form_body">
                        {!isLoggedIn && (
                            <fieldset className="checkout_contact">
                                <legend>
                                    <h2>Contact</h2>
                                </legend>
                                <div className="form_subset">
                                    <p>
                                        Already have an account?{' '}
                                        <button type="button" style={{ color: 'rgb(238, 238, 238)' }}>
                                            Login
                                        </button>
                                    </p>
                                    <div className="input_box">
                                        <input type="email" name="mail" className="input_field" required value={email} onChange={(e) => setEmail(e.target.value)} />
                                        <label className="input_label">Email *</label>
                                    </div>
                                    {/* <FormControlLabel control={<Checkbox sx={{ color: '#5b5b5b', '&.Mui-checked': { color: '#cc0000' } }} />} label="Save your information for faster checkout next time" /> */}
                                    <FormControlLabel
                                        control={<Checkbox checked={optOut} onChange={(e) => setOptOut(e.target.checked)} sx={{ color: '#5b5b5b', '&.Mui-checked': { color: '#cc0000' } }} />}
                                        label="Opt out of marketing emails with news and offers from your favourite creators."
                                    />
                                </div>
                            </fieldset>
                        )}
                        <fieldset className="checkout_billing">
                            <legend>
                                <h2>Order Details</h2>
                            </legend>
                            <div className="input_box">
                                <select name="country" className="input_field country_selector" required value={country} onChange={(e) => setCountry(e.target.value)}>
                                    <option value=""></option>
                                    <option value="GB">United Kingdom</option>
                                </select>
                                <label className="input_label">Select from Saved</label>
                            </div>
                            <div className="input_box">
                                <select name="country" className="input_field country_selector" required value={country} onChange={(e) => setCountry(e.target.value)}>
                                    <option value=""></option>
                                    <option value="GB">United Kingdom</option>
                                </select>
                                <label className="input_label">Country *</label>
                            </div>
                            <div className="checkout_flex_box">
                                <div className="input_box checkout_flex_item">
                                    <input type="text" name="lastName" className="input_field" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                    <label className="input_label">First Name *</label>
                                </div>
                                <div className="input_box checkout_flex_item">
                                    <input type="text" name="lastName" className="input_field" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                    <label className="input_label">Last Name *</label>
                                </div>
                            </div>
                            <div className="input_box">
                                <input type="text" name="company" className="input_field" required value={company} onChange={(e) => setCompany(e.target.value)} />
                                <label className="input_label">Company (Optional)</label>
                            </div>
                            <div className="input_box">
                                <input type="text" name="addressLine1" className="input_field" required value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} />
                                <label className="input_label">Address Line 1 (House Number & Street) *</label>
                            </div>
                            <div className="input_box">
                                <input type="text" name="lastName" className="input_field" required value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} />
                                <label className="input_label">Address Line 2 (Optional)</label>
                            </div>
                            <div className="checkout_flex_box">
                                <div className="input_box checkout_flex_item">
                                    <input type="text" name="postcode" className="input_field" required value={postcode} onChange={(e) => setPostcode(e.target.value)} />
                                    <label className="input_label">Postcode *</label>
                                </div>
                                <div className="input_box checkout_flex_item">
                                    <input type="text" name="city" className="input_field" required value={city} onChange={(e) => setCity(e.target.value)} />
                                    <label className="input_label">City *</label>
                                </div>
                            </div>
                            <div className="checkout_flex_box">
                                <div className="input_box checkout_flex_item checkout_calling_code">
                                    <select name="calling_code" className="input_field" required value={callingCode} onChange={(e) => setCallingCode(e.target.value)}>
                                        <option value=""></option>
                                        {countryCodes.map((country) => {
                                            return <option value={country.dial_code}>{`${country.dial_code} ${country.name}`}</option>;
                                        })}
                                    </select>
                                    <label className="input_label">Country Code</label>
                                </div>
                                <div className="input_box checkout_flex_item checkout_phone_number">
                                    <input type="text" name="lastName" className="input_field" required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                    <label className="input_label">Phone Number *</label>
                                </div>
                            </div>
                            {isLoggedIn && (
                                <FormControlLabel
                                    control={<Checkbox checked={optOut} onChange={(e) => setOptOut(e.target.checked)} sx={{ color: '#5b5b5b', '&.Mui-checked': { color: '#cc0000' } }} />}
                                    label="Save your information for a faster checkout next time"
                                />
                            )}
                        </fieldset>
                        <button type="submit" style={!isFormComplete ? { backgroundColor: 'grey' } : {}} className="btn checkout_btn" onClick={() => {}}>
                            Continue to Payment
                        </button>
                        <fieldset className="checkout_payment">
                            <legend>
                                <h2>Payment</h2>
                            </legend>
                        </fieldset>
                    </div>
                </form>
            </div>
        </>
    );
};
