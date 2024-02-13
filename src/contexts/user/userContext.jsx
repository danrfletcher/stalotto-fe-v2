import { createContext, useReducer } from 'react';
import userReducer from './userReducer';

// User-Context
const userContext = createContext();

// Initial State
const initialState = {
    isLoggedIn: false,
    token: null,
    loginWorkflowState: "None",
    user: {
        firstName: null,
        lastName: null,
        email: null
    }
};

// User-Provider Component
const UserProvider = ({ children }) => {

    const [state, dispatch] = useReducer(userReducer, initialState);
    
    // Actions
    const setToken = (token) => {
        return dispatch({
            type: 'SET_TOKEN',
            payload: { token }
        });
    };

    const toggleLoggedIn = (bool) => {
        return dispatch({
            type: 'TOGGLE_LOGGED_IN',
            payload: { bool }
        })
    };

    const modifyLoginWorkflowState = (workflow) => {
        return dispatch({
            type: 'MODIFY_LOGIN_WF_STATE',
            payload: { workflow }
        })
    };

    const modifyUser = (user) => {
        return dispatch({
            type: 'MODIFY_USER',
            payload: { user }
        })
    };

    // Context values
    const values = {
        ...state,
        setToken,
        toggleLoggedIn,
        modifyLoginWorkflowState,
        modifyUser
    };

    return (
        <userContext.Provider value={values}>
            {children}
        </userContext.Provider>
    );
};

export default userContext;
export { UserProvider };