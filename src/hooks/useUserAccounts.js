import { useContext, useState } from 'react';
import commonContext from '../contexts/common/commonContext';
import {
    getUserInfo,
    loginUser,
    logoutUser,
    signupUser,
} from '../services/userAccountApi';
import userContext from '../contexts/user/userContext';
import { pwValidationConditions } from '../data/passwordValidation';
import cartContext from '../contexts/cart/cartContext';

const useUserAccounts = () => {
    const { toggleForm, setFormUserInfo } = useContext(commonContext);
    const {
        setToken,
        toggleLoggedIn,
        modifyLoginWorkflowState,
        modifyUser,
        user,
        isLoggedIn,
        token,
        setUserDefaults,
    } = useContext(userContext);

    const { setCart } = useContext(cartContext);

    const [inputValues, setInputValues] = useState({});
    const [isSignupVisible, setIsSignupVisible] = useState(false);

    const [doPasswordsMatch, setDoPasswordsMatch] = useState(null);
    const [satisfiedConditions, setSatisfiedConditions] = useState(null);
    const [areAllConditionsSatisfied, setAreAllConditionsSatisfied] =
        useState(null);

    const [submissionError, setSubmissionError] = useState(null);

    // handling input-values
    const handleInputValues = (e) => {
        const { name, value } = e.target;

        setInputValues((prevValues) => {
            return {
                ...prevValues,
                [name]: value,
            };
        });
    };

    // handling user-login
    const handleUserLogin = async (token) => {
        try {
            if (token) {
                const userData = await getUserInfo(token);

                if (userData && userData.customer && userData.customerCart) {
                    modifyUser({
                        firstName: userData.customer.firstname,
                        lastName: userData.customer.lastname,
                        email: userData.customer.email,
                    });

                    // Set local state variables
                    setToken(token);
                    toggleLoggedIn(true);
                    setFormUserInfo(userData.customer.firstName);

                    // Update localStorage to persist data
                    localStorage.setItem('userToken', token); //persist logged in state
                    localStorage.setItem('cartId', userData.customerCart.id); //persist cart id for sync on reload

                    return true; //Indicate user logged in successfully
                } else {
                    throw new Error();
                }
            } else {
                throw new Error();
            }
        } catch (err) {
            return false;
        }
    };

    // handling form-submission
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const loggedUserInfo = inputValues.mail.split('@')[0].toUpperCase();

        const userLogin = async () => {
            try {
                modifyLoginWorkflowState('Pending');
                const token = await loginUser({
                    email: inputValues.mail,
                    password: inputValues.password,
                });

                if (token) {
                    const doLoginWorkflow = await handleUserLogin(token);
                    if (doLoginWorkflow === true) {
                        modifyLoginWorkflowState('LoggedIn');
                    } else {
                        modifyLoginWorkflowState('ServerError');
                    }
                } else {
                    modifyLoginWorkflowState('Unauthorized');
                }
            } catch (err) {
                modifyLoginWorkflowState('Unauthorized');
            }
            setInputValues({});
        };

        const userSignUp = async () => {
            try {
                modifyLoginWorkflowState('Pending');

                const { firstName, lastName, mail, password } = inputValues;
                const newUser = await signupUser({
                    firstName: firstName,
                    lastName: lastName,
                    email: mail,
                    password: password,
                });

                if (newUser.user) {
                    modifyLoginWorkflowState('AccountCreated');
                    setInputValues({});
                } else if (newUser.userAlreadyExists) {
                    modifyLoginWorkflowState('DuplicateAccount');
                } else {
                    modifyLoginWorkflowState('ServerError');
                    setInputValues({});
                }
            } catch (err) {
                modifyLoginWorkflowState('ServerError');
            }
        };

        if (isSignupVisible) {
            if (areAllConditionsSatisfied) {
                userSignUp();
            }
        } else {
            userLogin();
            setInputValues({});
        }
    };

    // handling password-validation
    const passwordValidation = () => {
        const match = inputValues.password === inputValues.conf_password;
        if (match) {
            const satisfiedConditions = pwValidationConditions.map(
                (condition) => {
                    const satisfiesCondition = condition.regex.test(
                        inputValues.password
                    );
                    if (satisfiesCondition) {
                        return {
                            satisfied: true,
                            ...condition,
                        };
                    } else {
                        return {
                            satisfied: false,
                            ...condition,
                        };
                    }
                }
            );
            const allConditionsSatisfied = satisfiedConditions.every(
                (condition) => condition.satisfied === true
            );
            return {
                match: true,
                conditions: satisfiedConditions,
                allConditionsSatisfied: allConditionsSatisfied,
            };
        } else {
            return {
                match: false,
            };
        }
    };

    //Handling log-out
    const handleUserLogout = async () => {
        try {
            const logout = await logoutUser(token);
            if (logout) {
                setFormUserInfo('');
                setUserDefaults();
                setCart([]);
                localStorage.removeItem('userToken');
                localStorage.removeItem('cartId');
                return true;
            } else {
                modifyLoginWorkflowState('ServerError');
                toggleForm(true);
            }
        } catch (err) {
            modifyLoginWorkflowState('ServerError');
            toggleForm(true);
        }
    };

    return {
        inputValues,
        handleInputValues,
        handleFormSubmit,
        setInputValues,
        passwordValidation,
        doPasswordsMatch,
        setDoPasswordsMatch,
        satisfiedConditions,
        setSatisfiedConditions,
        areAllConditionsSatisfied,
        setAreAllConditionsSatisfied,
        isSignupVisible,
        setIsSignupVisible,
        submissionError,
        handleUserLogin,
        handleUserLogout,
    };
};

export default useUserAccounts;
