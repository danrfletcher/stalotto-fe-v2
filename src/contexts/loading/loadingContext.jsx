import { createContext, useReducer } from 'react';
import { loadingReducer } from './loadingReducer.ts'

// Loading-Context
const loadingContext = createContext();

// Initial State
const initialState = {
    //First Load State Variable
    isFirstLoad: true,

    //Home Page State Variables
    isHomeLoaded: false,
    isHeroSliderLoaded: false,
    isFeaturedSliderLoaded: false,
    isTopProductsLoaded: false,
    isServicesLoaded: false,
};

// Loading-Provider Component
const LoadingProvider = ({ children }) => {

    const [state, dispatch] = useReducer(loadingReducer, initialState);

    //First Load Action
    const toggleIsFirstLoad = () => {
        return dispatch({
            type: 'TOGGLE_IS_FIRST_LOAD_FALSE',
        });
    };

    // Home Page Load Actions
    const toggleIsHomeLoaded = () => {
        return dispatch({
            type: 'TOGGLE_IS_HOME_LOADED_TRUE',
        });
    };

    const toggleIsHeroSliderLoaded = () => {
        return dispatch({
            type: 'TOGGLE_IS_HERO_SLIDER_LOADED_TRUE',
        });
    };

    const toggleIsFeaturedSliderLoaded = () => {
        return dispatch({
            type: 'TOGGLE_IS_FEATURED_SLIDER_LOADED_TRUE',
        });
    };

    const toggleIsTopProductsLoaded = () => {
    return dispatch({
            type: 'TOGGLE_IS_TOP_PRODUCTS_LOADED_TRUE',
        });
    };

    const toggleIsServicesLoaded = () => {
        return dispatch({
                type: 'TOGGLE_IS_SERVICES_LOADED_TRUE',
            });
        };    

    // Context values
    const values = {
        //State Variables
        ...state,

        //First Load Actions
        toggleIsFirstLoad,

        //Home Page Actions
        toggleIsHomeLoaded,
        toggleIsHeroSliderLoaded,
        toggleIsFeaturedSliderLoaded,
        toggleIsTopProductsLoaded,
        toggleIsServicesLoaded,
    };

    return (
        <loadingContext.Provider value={values}>
            {children}
        </loadingContext.Provider>
    );
};

export default loadingContext;
export { LoadingProvider };