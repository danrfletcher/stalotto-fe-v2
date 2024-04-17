import React, { useContext } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import useCartUpdater from '../../hooks/useCartUpdater.ts';
import cartContext from '../../contexts/cart/cartContext.jsx';

const QuantityBox = (props) => {
    const { itemQuantity, sku, cartItemUid } = props;
    const { displayCheckout } = useContext(cartContext);

    const { addToCart, decrementCart } = useCartUpdater();

    return (
        <>
            <div className="quantity_box">
                <button disabled={displayCheckout} type="button" onClick={() => decrementCart(cartItemUid)}>
                    <FaMinus />
                </button>
                <span className="quantity_count">{itemQuantity}</span>
                <button disabled={displayCheckout} type="button" onClick={() => addToCart(sku, 1, true)}>
                    <FaPlus />
                </button>
            </div>
        </>
    );
};

export default QuantityBox;
