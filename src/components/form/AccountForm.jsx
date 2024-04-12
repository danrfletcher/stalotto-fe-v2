import React, { useContext, useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import commonContext from '../../contexts/common/commonContext.jsx';
import useUserAccounts from '../../hooks/useUserAccounts';
import useOutsideClose from '../../hooks/useOutsideClose';
import useScrollDisable from '../../hooks/useScrollDisable';
import userContext from '../../contexts/user/userContext.jsx';
import { HashLoader } from 'react-spinners';

const AccountForm = () => {

    const { isFormOpen, toggleForm } = useContext(commonContext);
    const { 
        inputValues, handleInputValues, handleFormSubmit, passwordValidation, setInputValues, isSignupVisible, setIsSignupVisible, doPasswordsMatch, setDoPasswordsMatch, 
        satisfiedConditions, setSatisfiedConditions, 
        areAllConditionsSatisfied, setAreAllConditionsSatisfied, 
    } = useUserAccounts();
    const { token, isLoggedIn, loginWorkflowState, user } = useContext(userContext);

    const formRef = useRef();

    // Password validation handling
    const updateValidationParams = (match, cond, allCond) => {
        setDoPasswordsMatch(match);
        setSatisfiedConditions(cond);
        setAreAllConditionsSatisfied(allCond);
    }

    useEffect(() => {
        if (inputValues.password && inputValues.conf_password) {
            const validation = passwordValidation();
            updateValidationParams(validation?.match, validation?.conditions, validation.allConditionsSatisfied);
        }

        if (!inputValues.password || !inputValues.conf_password) {
            updateValidationParams(null, null, null);
        }
    }, [inputValues.password, inputValues.conf_password]);

    useOutsideClose(formRef, () => {
        toggleForm(false);
    });


    useScrollDisable(isFormOpen);
    
    // Signup-form visibility toggling
    const handleIsSignupVisible = () => {
        setIsSignupVisible(prevState => !prevState);
        setInputValues({});
        updateValidationParams(null, null, null);
    };

    return (
        <>
            {
                isFormOpen && (
                    <div className="backdrop">
                        <div className="modal_centered">
                            <form id="account_form" ref={formRef} onSubmit={handleFormSubmit}>

                                {/*===== Form-Header =====*/}
                                <div className="form_head">
                                    <h2>{isSignupVisible ? 'Signup' : 'Login'}</h2>
                                    {loginWorkflowState === "None" || loginWorkflowState === "Unauthorized" || loginWorkflowState === "DuplicateAccount" ? (
                                        <>
                                            <p>
                                                {isSignupVisible ? 'Already have an account ?' : 'New to Stalotto ?'}
                                                &nbsp;&nbsp;
                                                <button type="button" onClick={handleIsSignupVisible}>
                                                    {isSignupVisible ? 'Login' : 'Create an account'}
                                                </button>
                                            </p>
                                            {
                                                loginWorkflowState === "DuplicateAccount" && (
                                                    <>
                                                        <br/>
                                                        <p>A user with the same email address is already registered. Please try again.</p>
                                                    </>
                                                )
                                            }
                                        </>
                                    ) : loginWorkflowState === "Pending" ? (
                                        <div className="login_loader">
                                            <HashLoader color="#a9afc3" />
                                        </div>
                                    ) : loginWorkflowState === "AccountCreated" ? <p>{`Account created successfully. To login, please check your emails to activate your account.`}</p>
                                    : loginWorkflowState === "LoggedIn" ? <p>{`Welcome, ${user.email}, you have been logged in successfully.`}</p> : "Something went wrong. Please try again."
                                    }
                                </div>

                                {/*===== Form-Body =====*/}
                                {loginWorkflowState === "None" || loginWorkflowState === "Unauthorized" || loginWorkflowState === "DuplicateAccount" ? (
                                    <div className="form_body">

                                        <div className="input_box">
                                            <input
                                                type="email"
                                                name="mail"
                                                className="input_field"
                                                value={inputValues.mail || ''}
                                                onChange={handleInputValues}
                                                required
                                            />
                                            <label className="input_label">Email</label>
                                        </div>

                                        {
                                            isSignupVisible && (
                                                <>
                                                    <div className="input_box">
                                                        <input
                                                            type="text"
                                                            name="firstName"
                                                            className="input_field"
                                                            value={inputValues.firstName || ''}
                                                            onChange={handleInputValues}
                                                            required
                                                        />
                                                        <label className="input_label">First Name</label>
                                                    </div>
                                                    <div className="input_box">
                                                        <input
                                                            type="text"
                                                            name="lastName"
                                                            className="input_field"
                                                            value={inputValues.lastName || ''}
                                                            onChange={handleInputValues}
                                                            required
                                                        />
                                                        <label className="input_label">Last Name</label>
                                                    </div>
                                                </>
                                            )
                                        }

                                        <div className="input_box">
                                            <input
                                                type="password"
                                                name="password"
                                                className="input_field"
                                                value={inputValues.password || ''}
                                                onChange={handleInputValues}
                                                required
                                            />
                                            <label className="input_label">Password</label>
                                        </div>

                                        {
                                            isSignupVisible && (
                                                <>
                                                    <div className="input_box">
                                                        <input
                                                            type="password"
                                                            name="conf_password"
                                                            className="input_field"
                                                            value={inputValues.conf_password || ''}
                                                            onChange={handleInputValues}
        
                                                            required
                                                        />
                                                        <label className="input_label">Confirm Password</label>
                                                    </div>
                                                    <ul>
                                                        { 
                                                            doPasswordsMatch === false ? <li key={0}>Passwords do not match<br /><br /></li> :
                                                            doPasswordsMatch === true ? (
                                                                satisfiedConditions ? (
                                                                    satisfiedConditions.map((condition, i) => (
                                                                        condition.satisfied === false ? <li key={i+1}>{condition.text}<br /><br /></li> : ""
                                                                    ))
                                                                ) : ""
                                                            ) : ""
                                                        }
                                                    </ul>
                                                </>
                                            )
                                        }

                                        <button
                                            type="submit"
                                            className="btn login_btn"
                                        >
                                            {isSignupVisible ? 'Signup' : 'Login'}
                                        </button>

                                    </div>
                                ) : ""}

                                {/*===== Form-Footer =====*/}
                                {/* <div className="form_foot">
                                    <p>or login with</p>
                                    <div className="login_options">
                                        <Link to="/">Facebook</Link>
                                        <Link to="/">Google</Link>
                                        <Link to="/">Twitter</Link>
                                    </div>
                                </div> */}

                                {/*===== Form-Close-Btn =====*/}
                                {loginWorkflowState !== "Pending" ? (
                                    <div
                                        className="close_btn"
                                        title="Close"
                                        onClick={() => toggleForm(false)}
                                    >
                                        &times;
                                    </div>
                                ) : ""}

                            </form>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default AccountForm;