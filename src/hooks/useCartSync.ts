import { useContext } from "react";
import { getCustomerCartFromId } from "../services/cartApi";
import cartContext from "../contexts/cart/cartContext";
import { getFilteredCompetitionData } from "../services/competitionsApi";

const useCartSync = () => {
    const { cartId, emptyCart, addItem, setItemQtd } = useContext(cartContext);
    const localCartItems = useContext(cartContext).cartItems;
    
    const updateCartFromId = async (cartId) => {
        try {
            //get users cart from back-end
            const remoteCart = await getCustomerCartFromId(cartId);

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
                    productInformation.forEach(product => {

                        //add the product to the cart
                        addItem(product);

                        //set the correct quantity
                        const qtd = remoteCartItems.filter(remoteCartItem => product.id === remoteCartItem.product.uid)[0].quantity
                        setItemQtd(product.id, qtd);
                    });
                };
            };
        }
        catch (err) {
            console.log(err);
        }
    }

    return { 
        updateCartFromId 
    };
};

export default useCartSync;