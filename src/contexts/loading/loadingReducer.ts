export const loadingReducer = (state, action) => {
    switch (action.type) {

        //First Load
        case 'TOGGLE_IS_FIRST_LOAD_FALSE':
            return {
                ...state,
                isFirstLoad: false,
            }

        //Home Page
        case 'TOGGLE_IS_HOME_LOADED_TRUE':
            return {
                ...state,
                isHomeLoaded: true,
            };

        case 'TOGGLE_IS_HERO_SLIDER_LOADED_TRUE':
            return {
                ...state,
                isHeroSliderLoaded: true,
            };

        case 'TOGGLE_IS_FEATURED_SLIDER_LOADED_TRUE':
            return {
                ...state,
                isFeaturedSliderLoaded: true,
            };

        case 'TOGGLE_IS_TOP_PRODUCTS_LOADED_TRUE':
            return {
                ...state,
                isTopProductsLoaded: true,
            };
        
        case 'TOGGLE_IS_SERVICES_LOADED_TRUE':
            return {
                ...state,
                isServicesLoaded: true,
            }

        default:
            return state;
    }
};
