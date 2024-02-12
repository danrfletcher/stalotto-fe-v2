import { createContext, useReducer } from 'react';
import commonReducer from './commonReducer';

// Common-Context
const commonContext = createContext();

// Initial State
const initialState = {
    isFormOpen: false,
    formUserInfo: '',
    isSearchOpen: false,
    searchResults: [],
    currentHash: '',

    //Home page data
    featuredCompetitions: null,
    filteredCompetitions: null
};

// Common-Provider Component
const CommonProvider = ({ children }) => {

    const [state, dispatch] = useReducer(commonReducer, initialState);

    // Form actions
    const toggleForm = (toggle) => {
        return dispatch({
            type: 'TOGGLE_FORM',
            payload: { toggle }
        });
    };

    const setFormUserInfo = (info) => {
        return dispatch({
            type: 'SET_FORM_USER_INFO',
            payload: { info }
        });
    };

    // Search actions
    const toggleSearch = (toggle) => {
        return dispatch({
            type: 'TOGGLE_SEARCH',
            payload: { toggle }
        });
    };

    const setSearchResults = (results) => {
        return dispatch({
            type: 'SET_SEARCH_RESULTS',
            payload: { results }
        });
    };

    // Set page hash for smooth navigation on same page
    const setCurrentHash = (hash) => {
        return dispatch({
            type: 'SET_HASH',
            payload: { hash }
        });
    };

    // Home page data actions
    const setFeaturedCompetitions = (featuredCompetitions) => {
        return dispatch({
            type: 'SET_FEATURED_COMPETITIONS',
            payload: { featuredCompetitions }
        });
    };

    const setFilteredCompetitions = (filteredCompetitions) => {
        return dispatch({
            type: 'SET_FILTERED_COMPETITIONS',
            payload: { filteredCompetitions }
        });
    };

    // Context values
    const values = {
        ...state,
        toggleForm,
        setFormUserInfo,
        toggleSearch,
        setSearchResults,
        setCurrentHash,

        // Home page data actions
        setFeaturedCompetitions,
        setFilteredCompetitions
    };

    return (
        <commonContext.Provider value={values}>
            {children}
        </commonContext.Provider>
    );
};

export default commonContext;
export { CommonProvider };