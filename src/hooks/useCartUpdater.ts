import { useContext, useCallback, useState } from 'react';
import cartContext from '../contexts/cart/cartContext';
import { CartItem, addProductToCart, getCartTotal, setNumItemsInCart } from '../services/cartApi';

type CartTotalType = {
    value: number | null | string;
    currency?: string | null;
};

const useCartUpdater = () => {
    const { cartItems, setCart, setProductDataState, flagRecalculateTotal } = useContext(cartContext);
    const [cartQuantity, setCartQuantity] = useState(null);
    const [cartTotal, setCartTotal] = useState<CartTotalType>({ value: null, currency: null });

    const addToCart = useCallback(
        async (sku, qtd = 1, optimistic = false) => {
            // Optimistically update the cart
            const itemExists = cartItems.some((item) => item.product.sku === sku);
            let newCartItems: CartItem[] = [];

            if (itemExists) {
                // Increase quantity of existing item
                newCartItems = cartItems.map((item) => (item.product.sku === sku ? { ...item, quantity: item.quantity + qtd } : item));
            } else {
                // Add new item (without UID and name initially)
                newCartItems = [...cartItems, { product: { sku }, quantity: qtd }];
            }

            // Set the optimistic cart state
            setCart(newCartItems);

            // Call API to update cart on backend and get the full item details
            try {
                await addProductToCart(sku, qtd);

                if (!optimistic) {
                    //triggers cart updater if not only optimistic render
                    setProductDataState(false);
                }
            } catch (err) {
                // Revert to original items if API call fails
                setCart(cartItems);
                throw err;
            }
        },
        [cartItems, setCart]
    );

    const removeFromCart = useCallback(
        async (uid) => {
            // Optimistically update the cart by removing the item (setting its quantity to 0)
            const newCartItems = cartItems.filter((item) => item.uid !== uid); // Filter out items with zero quantity.

            // Set the optimistic cart state
            setCart(newCartItems);

            try {
                // Attempt to update the cart on the backend
                await setNumItemsInCart(uid, 0);
            } catch (err) {
                // Revert to original items if API call fails
                setCart(cartItems);
                throw err;
            }
        },
        [cartItems, setCart]
    );

    const decrementCart = useCallback(
        async (cartItemUid, decrementAmount = 1) => {
            const targetItem = cartItems.find((item) => item.uid === cartItemUid);

            // Check if the decrement amount is greater than or equal to the item's quantity
            if (targetItem && decrementAmount >= targetItem.quantity) {
                // Remove the item from the cart
                removeFromCart(cartItemUid);
            } else {
                // Decrement the quantity of the item
                const newCartItems = cartItems
                    .map((item) => {
                        if (item.uid === cartItemUid) {
                            return { ...item, quantity: item.quantity - decrementAmount };
                        }
                        return item;
                    })
                    .filter((item) => item.quantity > 0); // Ensure we don't include items with zero or negative quantities

                // Optimistically update the cart
                setCart(newCartItems);

                try {
                    // Call API to update the cart quantity on the backend
                    const updatedCartItems = await setNumItemsInCart(cartItemUid, targetItem?.quantity - decrementAmount);
                } catch (err) {
                    // Revert to original items if API call fails
                    setCart(cartItems);
                    throw err;
                }
            }
        },
        [cartItems, setCart, removeFromCart] // Ensure removeFromCart is included as a dependency
    );

    const fetchTotal = async () => {
        flagRecalculateTotal(true); //set loading state on grand total price
        try {
            const total = await getCartTotal();
            setCartTotal(total);
        } catch (err) {
            setCartTotal({ value: 'There has been an error calculating the total. Please reload the page.' });
        }
        flagRecalculateTotal(false);
    };

    const optimisticallyUpdateTotal = () => {
        const total = cartItems.reduce((acc, curr) => acc + curr.product.price_range.minimum_price.final_price.value * curr.quantity, 0).toFixed(2);
        setCartTotal({
            ...cartTotal,
            value: total,
        });
    };

    return {
        addToCart,
        removeFromCart,
        decrementCart,
        cartQuantity,
        setCartQuantity,
        cartTotal,
        setCartTotal,
        fetchTotal,
        optimisticallyUpdateTotal,
    };
};

export default useCartUpdater;
