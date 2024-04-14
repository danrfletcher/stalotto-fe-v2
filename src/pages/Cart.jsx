import React, { useContext, useState, useEffect } from 'react';
import { BsCartX } from 'react-icons/bs';
import { calculateTotal, displayMoney } from '../utils/currency.js';
import useDocTitle from '../hooks/useDocTitle';
import cartContext from '../contexts/cart/cartContext.jsx';
import CartItem from '../components/cart/CartItem';
import EmptyView from '../components/common/EmptyView';
import { Checkout } from '../components/form/Checkout.tsx';
import loadingContext from '../contexts/loading/loadingContext.jsx';
import { BounceLoader, PulseLoader } from 'react-spinners';

const Cart = () => {
    useDocTitle('Cart');

    const { cartItems, productDataReceived } = useContext(cartContext);
    const { isFirstLoad, toggleIsFirstLoad, isCartDataLoaded } = useContext(loadingContext);
    const [cartQuantity, setCartQuantity] = useState(null);

    //load cart data & set cart quantity
    useEffect(() => {
        if (isCartDataLoaded && isFirstLoad) {
            toggleIsFirstLoad();
        }
        if (productDataReceived) {
            setCartQuantity(cartItems.length);
        }
    }, [cartItems, isCartDataLoaded]);

    // total original price
    const cartTotal = cartItems.map((item) => {
        return item.finalPrice * item.quantity;
    });

    const calculateCartTotal = calculateTotal(cartTotal);
    const displayCartTotal = displayMoney(calculateCartTotal);

    // total discount
    const cartDiscount = cartItems.map((item) => {
        return (item.originalPrice - item.finalPrice) * item.quantity;
    });

    const calculateCartDiscount = calculateTotal(cartDiscount);
    const displayCartDiscount = displayMoney(calculateCartDiscount);

    // final total amount
    const totalAmount = calculateCartTotal - calculateCartDiscount;
    const displayTotalAmount = displayMoney(totalAmount);

    const [displayCheckout, setDisplayCheckout] = useState(false);

    return isFirstLoad ? (
        <div className="loading-spinner">
            <BounceLoader color="#a9afc3" />
        </div>
    ) : (
        <section id="cart" className="section">
            <div className="container">
                {!productDataReceived || cartQuantity === null ? (
                    <PulseLoader color="#a9afc3" className="centered_pulse_loader" />
                ) : cartQuantity === 0 ? (
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
                                        <b>{displayTotalAmount}</b>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="btn checkout_btn"
                                    onClick={() => {
                                        setDisplayCheckout(!displayCheckout);
                                    }}
                                >
                                    Checkout
                                </button>
                                {displayCheckout ? <Checkout /> : ''}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Cart;
