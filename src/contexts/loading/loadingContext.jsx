import { createContext, useReducer } from 'react';
import { loadingReducer } from './loadingReducer.ts';

// Loading-Context
const loadingContext = createContext();

// Initial State
const initialState = {
    //First Load State Variable
    isFirstLoad: true, //main loader for the entire web app, relies on below main loaders

    //User Data
    isAppDataLoaded: false, //main loader, relies on below loaders
    isUserDataLoaded: false,
    isCartDataLoaded: false,

    //Home Page
    isHomeLoaded: false, //main loader, relies on below loaders
    isHeroSliderLoaded: false,
    isFeaturedSliderLoaded: false,
    isTopProductsLoaded: false,
    isServicesLoaded: false,

    //Cart
    isCartProductDataLoaded: false,
};

// Loading-Provider Component
const LoadingProvider = ({ children }) => {
    const [state, dispatch] = useReducer(loadingReducer, initialState);

    // First Load Action
    const toggleIsFirstLoad = () => {
        return dispatch({
            type: 'TOGGLE_IS_FIRST_LOAD_FALSE',
        });
    };

    //Item Load Actions
    const toggleItemsLoaded = (loader) => {
        return dispatch({
            type: 'TOGGLE_LOADER_TRUE',
            payload: { loader },
        });
    };

    // Context values
    const values = {
        ...state,
        toggleIsFirstLoad,
        toggleItemsLoaded,
    };

    return (
        <loadingContext.Provider value={values}>
            {children}
        </loadingContext.Provider>
    );
};

export default loadingContext;
export { LoadingProvider };
