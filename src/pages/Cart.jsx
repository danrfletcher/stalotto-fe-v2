import React, { useContext, useState, useEffect } from 'react';
import { BsCartX } from 'react-icons/bs';
import useDocTitle from '../hooks/useDocTitle';
import cartContext from '../contexts/cart/cartContext.jsx';
import CartItem from '../components/cart/CartItem';
import EmptyView from '../components/common/EmptyView';
import { Checkout } from '../components/cart/Checkout.tsx';
import loadingContext from '../contexts/loading/loadingContext.jsx';
import { BarLoader, BounceLoader, PropagateLoader, PulseLoader } from 'react-spinners';
import { getCartTotal } from '../services/cartApi.ts';
import useCartUpdater from '../hooks/useCartUpdater.ts';
import { displayMoney } from '../utils/currency.js';
import userContext from '../contexts/user/userContext.jsx';

const Cart = () => {
    useDocTitle('Cart');

    const { cartItems, cartSyncedState, flagCartUpdate, displayPayments, displayCheckout, toggleDisplayCheckout, setCartSyncedState, cartIsUpdating, toggleDisplayPayments } = useContext(cartContext);
    const { isFirstLoad, toggleIsFirstLoad, isCartDataLoaded } = useContext(loadingContext);
    const { cartQuantity, setCartQuantity, cartTotal, setCartTotal, optimisticallyUpdateTotal } = useCartUpdater();
    const { loggedIn } = useContext(userContext);

    //load cart data, set cart quantity & display total
    const fetchTotal = async () => {
        flagCartUpdate(true); //set loading state on grand total price
        try {
            const total = await getCartTotal();
            setCartTotal(total);
        } catch (err) {
            setCartTotal({ value: 'There has been an error calculating the total. Please reload the page.' });
        }
        flagCartUpdate(false);
    };

    useEffect(() => {
        if (isCartDataLoaded && isFirstLoad) {
            toggleIsFirstLoad();
        }
        if (cartSyncedState) {
            setCartQuantity(cartItems.length);
        }
        optimisticallyUpdateTotal();
    }, [cartItems, isCartDataLoaded]);

    useEffect(() => {
        fetchTotal(); //load price on first component mount
    }, []);

    useEffect(() => { //close open components if the user logs in or out
        if (displayCheckout) {
            toggleDisplayCheckout();
        }
        if (displayPayments) {
            toggleDisplayPayments();
        }
    }, [localStorage.userToken])

    //wait before proceeding if cart is updating
    const [loadCheckoutComponent, setLoadCheckoutComponent] = useState(false);

    const handleProceedToCheckout = async () => {
        if (displayCheckout) {
            toggleDisplayCheckout();
        } else {
            setLoadCheckoutComponent(true); 
            setCartSyncedState(false); //trigger cart updater
            try {
                const total = await getCartTotal();
                setCartTotal(total); //check price
            } catch (err) {
                console.error('Error cross-checking cart total', err);
            }
        }
    };

    useEffect(() => { //open the checkout card when the cart sync has completed
        if (cartSyncedState === true && loadCheckoutComponent === true) {
            toggleDisplayCheckout();
            setLoadCheckoutComponent(false);
        }
    }, [cartSyncedState]);

    return isFirstLoad ? (
        <div className="loading-spinner">
            <BounceLoader color="#a9afc3" />
        </div>
    ) : (cartIsUpdating && !cartSyncedState) || cartQuantity === null ? (
        <PulseLoader color="#a9afc3" className="centered_pulse_loader" />
    ) : (
        <>
            <section id="cart" className="section">
                <div className="container">
                    {cartQuantity === 0 ? (
                        <EmptyView icon={<BsCartX />} msg="Your Cart is Empty" link="/competitions" btnText="Start Shopping" />
                    ) : (
                        <div className="wrapper cart_wrapper">
                            <div className="cart_left_col">
                                {cartItems.map((item) => (
                                    <CartItem
                                        key={item.uid}
                                        cartItemUid={item.uid}
                                        id={item.product.uid}
                                        title={item.product.name}
                                        finalPrice={item.product.price_range.minimum_price.final_price.value}
                                        originalPrice={item.product.original_price}
                                        quantity={item.quantity}
                                        thumbnail={item.product.thumbnail.url}
                                        creator={item.product.creator}
                                        sku={item.product.sku}
                                        urlKey={item.product.url_key}
                                    />
                                ))}
                            </div>

                            <div className="cart_right_col">
                                <div className="order_summary">
                                    <h3>
                                        Order Summary &nbsp; ( {cartQuantity} {cartQuantity > 1 ? 'items' : 'item'} )
                                    </h3>
                                    <div className="order_summary_details">
                                        {/* <div className="price">
                                                            <span>Original Price</span>
                                                            <b>{displayCartTotal}</b>
                                                        </div>
                                                        <div className="discount">
                                                            <span>Discount</span>
                                                            <b>- {displayCartDiscount}</b>
                                                        </div>
                                                        <div className="delivery">
                                                            <span>Delivery</span>
                                                            <b>Free</b>
                                                        </div> */}
                                        <div className="separator"></div>
                                        <div className="total_price">
                                            <b>
                                                <small>Total Price</small>
                                            </b>
                                            <b>{displayMoney(cartTotal.value)}</b>
                                        </div>
                                    </div>
                                    {!displayPayments && (
                                        <button type="button" className="btn checkout_btn" style={displayCheckout ? { backgroundColor: '#3067F2' } : {}} onClick={handleProceedToCheckout}>
                                            {displayCheckout ? 'Back to Cart' : 'Checkout'}
                                        </button>
                                    )}
                                    {loadCheckoutComponent && (
                                        <BarLoader color="#ffffff" cssOverride={{ textAlign: 'center', width: '100%', borderRadius: 5, marginTop: '-4px', backgroundColor: 'rgba(0, 0, 0, 0)' }} />
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
            {displayCheckout && <Checkout />}
        </>
    );
};

export default Cart;
