import { useContext, useState } from 'react';
import commonContext from '../contexts/common/commonContext';
import { getUserInfo, loginUser, signupUser } from '../services/userAccountApi'
import userContext from '../contexts/user/userContext';
import { pwValidationConditions } from '../data/passwordValidation';

const useForm = () => {
    const { toggleForm, setFormUserInfo } = useContext(commonContext);
    const { setToken, toggleLoggedIn, modifyLoginWorkflowState, modifyUser } = useContext(userContext);
    const [inputValues, setInputValues] = useState({});
    const [isSignupVisible, setIsSignupVisible] = useState(false);

    const [doPasswordsMatch, setDoPasswordsMatch] = useState(null);
    const [satisfiedConditions, setSatisfiedConditions] = useState(null);
    const [areAllConditionsSatisfied, setAreAllConditionsSatisfied] = useState(null);

    const [submissionError, setSubmissionError] = useState(null);
    
    // handling input-values
    const handleInputValues = (e) => {
        const { name, value } = e.target;

        setInputValues((prevValues) => {
            return {
                ...prevValues,
                [name]: value
            };
        });
    };

    // handling form-submission
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const loggedUserInfo = inputValues.mail.split('@')[0].toUpperCase();

        const userLogin = async () => {
            try {
                modifyLoginWorkflowState("Pending");
                const token = await loginUser({email: inputValues.mail, password: inputValues.password});
                
                if (token) {
                    const userData = await getUserInfo(token);
                    if (userData) {
                        modifyUser(userData);
                        setToken(token);
                        toggleLoggedIn(true);
                        modifyLoginWorkflowState("LoggedIn");
                        setFormUserInfo(userData.firstName);
                    } else {
                        modifyLoginWorkflowState("ServerError");
                    };
                    
                } else {
                    modifyLoginWorkflowState("Unauthorized");
                }

            } catch (err) {
                modifyLoginWorkflowState("Unauthorized");
            };
            setInputValues({});
        };

        const userSignUp = async () => {
            try {
                modifyLoginWorkflowState("Pending");

                const { firstName, lastName, mail, password } = inputValues;
                const newUser = await signupUser({firstName: firstName, lastName: lastName, email: mail, password: password});

                if (newUser.user) {
                    modifyLoginWorkflowState("AccountCreated");
                    setInputValues({});
                } else if (newUser.userAlreadyExists) {
                    modifyLoginWorkflowState("DuplicateAccount");
                } else {
                    modifyLoginWorkflowState("ServerError");
                    setInputValues({});
                };

            } catch (err) {
                modifyLoginWorkflowState("ServerError");
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
        const match = inputValues.password === inputValues.conf_password
        if (match) {
            const satisfiedConditions = pwValidationConditions.map((condition) => {
                const satisfiesCondition = condition.regex.test(inputValues.password);
                if (satisfiesCondition) {
                    return (
                        {
                            satisfied: true,
                            ...condition
                        }
                    )
                } else {
                    return (
                        {
                            satisfied: false,
                            ...condition
                        }
                    );
                };
            });
            const allConditionsSatisfied = satisfiedConditions.every((condition) => condition.satisfied === true)
            return (
                {
                    match: true,
                    conditions: satisfiedConditions,
                    allConditionsSatisfied: allConditionsSatisfied
                }
            )
        } else {
            return  (
                {
                    match: false
                }
            );
        };
    };

    return { 
        inputValues, handleInputValues, handleFormSubmit, setInputValues,
        passwordValidation, 
        doPasswordsMatch, setDoPasswordsMatch, 
        satisfiedConditions, setSatisfiedConditions, 
        areAllConditionsSatisfied, setAreAllConditionsSatisfied,
        isSignupVisible, setIsSignupVisible,
        submissionError
    };
};

export default useForm;