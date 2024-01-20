const commonReducer = (state, action) => {
    switch (action.type) {

        case 'TOGGLE_FORM':
            return {
                ...state,
                isFormOpen: action.payload.toggle
            };


        case 'SET_FORM_USER_INFO':
            return {
                ...state,
                formUserInfo: action.payload.info
            };


        case 'TOGGLE_SEARCH':
            return {
                ...state,
                isSearchOpen: action.payload.toggle
            };


        case 'SET_SEARCH_RESULTS':
            return {
                ...state,
                searchResults: action.payload.results
            };

        case 'SET_HASH':
            return {
                ...state,
                currentHash: action.payload.hash
            };

        default:
            return state;
    }
};

export default commonReducer;