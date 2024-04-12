import { useContext } from "react";
import { addToCart, createAnonymousCart, getCustomerCartFromId } from "../services/cartApi";
import cartContext from "../contexts/cart/cartContext";
import { Competition, getFilteredCompetitionData } from "../services/competitionsApi";
import userContext from "../contexts/user/userContext";

const useCartSync = () => {
    const { cartId, emptyCart, setItemQtd, setNewCartId, cartItems } = useContext(cartContext);
    const { token }= useContext(userContext);
    
    const syncCart = async (cartIdFromStorage, token) => {
        try {
            //save the cartId to the application state
            setNewCartId(cartIdFromStorage)

            //get users cart from back-end
            const remoteCart = await getCustomerCartFromId(cartIdFromStorage, token);

            //check user's cart is valid
            if (typeof remoteCart === "string") {
                throw new Error();
            } else {
                const remoteCartItems = remoteCart.cartItems;
                const skus: string[] = [];
                
                //list skus in users cart
                remoteCartItems.forEach(item => skus.push(item.product.sku));

                //check local cart state is empty
                emptyCart();

                //get product information for each item in users cart
                const productInformation = await getFilteredCompetitionData({ skus: skus })
                
                //check product data is valid
                if (typeof productInformation === "string") {
                    throw new Error();
                } else {

                    //sync remote cart to local cart state
                    productInformation.forEach(item => {

                        //set the correct quantity
                        const qtd = remoteCartItems.filter(remoteCartItem => item.id === remoteCartItem.product.uid)[0].quantity
                        setItemQtd(item, qtd);
                    });
                };
            };
        } catch (err) {
            return;
        }
    };

    
    const handleAddToCart = async (item, qtd = 1) => {

        const addItemToCart = async (item, qtd: number) => {
            try {

                let oldQtd;
                if (cartItems.length === 0) {
                    oldQtd = 0;
                } else {
                    oldQtd = cartItems.filter(cartItem => cartItem.id === item.id)
                    if (oldQtd.length !== 1) {
                        oldQtd = 0;
                    } else {
                        oldQtd = Number(oldQtd[0].quantity);
                    };
                }
                
                const newQtd = oldQtd + qtd;
                
                setItemQtd(item, newQtd)
                const remoteCartAction = await addToCart(cartId, token, [item], [{id: item.id, qtdToAdd: qtd}]);
                if (remoteCartAction) {
                    return true
                } else {
                    throw new Error();
                }

            } catch (err) {
                throw new Error('Failed to add item to the cart');
            };
        };

        try {
            return await addItemToCart(item, qtd);
        } catch (err) {
            throw err;
        };
    };

    return { 
        syncCart, handleAddToCart
    };
};

export default useCartSync;