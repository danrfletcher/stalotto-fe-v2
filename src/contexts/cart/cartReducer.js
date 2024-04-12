const cartReducer = (state, action) => {
    switch (action.type) {

        case 'ADD_TO_CART':
            const newItemIdToAdd = action.payload.item.id;
            const itemToAddExist = state.cartItems.some(item => item.id === newItemIdToAdd);

            let updatedCartItems = null;

            if (itemToAddExist) {
                updatedCartItems = state.cartItems.map(item => {
                    if (item.id === newItemIdToAdd) {
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
            const newItemToChange = action.payload.item.id;
            const itemToChangeExist = state.cartItems.some(item => item.id === newItemToChange);

            let updatedQtdCartItems = null;

            if (itemToChangeExist) {
                updatedQtdCartItems = state.cartItems.map(item => {
                    if (item.id === newItemToChange) {
                        return {
                            ...item,
                            quantity: action.payload.qtd
                        };
                    }
                    return item;
                });
            } else {
                action.payload.item.quantity = action.payload.qtd;
                updatedQtdCartItems = [...state.cartItems, action.payload.item];
            }

            return {
                ...state,
                cartItems: updatedQtdCartItems.filter(item => item.quantity !== 0)
            };

        case 'SET_NEW_CART_ID':
            return {
                ...state,
                cartId: action.payload.cartId
            };

        default:
            return state;
    };
};

export default cartReducer;