import { userInitialState } from './userContext';

const userReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.payload.token,
            };

        case 'TOGGLE_LOGGED_IN':
            if (action.payload.bool === true) {
                return {
                    ...state,
                    isLoggedIn: true,
                };
            } else if (action.payload.bool === false) {
                return {
                    ...state,
                    isLoggedIn: false,
                };
            } else {
                return;
            }

        case 'MODIFY_LOGIN_WF_STATE':
            return {
                ...state,
                loginWorkflowState: action.payload.workflow,
            };

        case 'MODIFY_USER':
            return {
                ...state,
                user: action.payload.user,
            };

        case 'RESET':
            return userInitialState;

        default:
            return state;
    }
};

export default userReducer;
