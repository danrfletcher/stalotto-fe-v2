export const loadingReducer = (state, action) => {
    switch (action.type) {

        //First Load
        case 'TOGGLE_IS_FIRST_LOAD_FALSE':
            return {
                ...state,
                isFirstLoad: false,
            }

        case 'TOGGLE_LOADERS_TRUE':
            // Construct a single object with all updated loaders set to true
            const loaderUpdates = action.payload.loaders.reduce((acc, loader) => {
                acc[loader] = true;
                return acc;
            }, {});
        
            // Merge the updates into the existing state
            return {
                ...state,
                ...loaderUpdates
            };
            

        default:
            return state;
    }
};
