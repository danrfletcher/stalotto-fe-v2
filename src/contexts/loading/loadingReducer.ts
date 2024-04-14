export const loadingReducer = (state, action) => {
    switch (action.type) {
        //First Load
        case 'TOGGLE_IS_FIRST_LOAD_FALSE':
            return {
                ...state,
                isFirstLoad: false,
            };

        case 'TOGGLE_LOADER_TRUE':
            return {
                ...state,
                [action.payload.loader]: true,
            };

        default:
            return state;
    }
};
