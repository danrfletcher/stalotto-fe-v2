const cartReducer = (state, action) => {
    switch (action.type) {

        case 'ADD_TO_CART':
            const newItemId = action.payload.item.id;
            const itemExist = state.cartItems.some(item => item.id === newItemId);

            let updatedCartItems = null;

            if (itemExist) {
                updatedCartItems = state.cartItems.map(item => {
                    if (item.id === newItemId) {
                        return {
                            ...item,
                            quantity: item.quantity + 1
                        };
                    }
                    return item;
                });
            } else {
                action.payload.item.quantity = 1;
                updatedCartItems = [...state.cartItems, action.payload.item];
            }

            return {
                ...state,
                cartItems: updatedCartItems
            };


        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id !== action.payload.itemId)
            };


        case 'INCREMENT_ITEM':
            return {
                ...state,
                cartItems: state.cartItems.map(item => {
                    if (item.id === action.payload.itemId) {
                        return {
                            ...item,
                            quantity: item.quantity + 1
                        };
                    }
                    return item;
                })
            };


        case 'DECREMENT_ITEM':
            return {
                ...state,
                cartItems: state.cartItems.map(item => {
                    if (item.id === action.payload.itemId) {
                        return {
                            ...item,
                            quantity: item.quantity - 1
                        };
                    }
                    return item;
                }).filter(item => item.quantity !== 0)
            };
        
        case 'EMPTY':
            return {
                ...state,
                cartItems: []
            };
        
        case 'SET_ITEM_QTD':
            return {
                ...state,
                cartItems: state.cartItems.map(item => {
                    if (item.id === action.payload.itemId) {
                        return {
                            ...item,
                            quantity: action.payload.qtd
                        };
                    }
                    return item;
                })
            };

        default:
            return state;
    };
};

export default cartReducer;