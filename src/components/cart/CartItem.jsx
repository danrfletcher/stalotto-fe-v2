import React, { useContext } from 'react';
import { TbTrash } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { displayMoney } from '../../utils/currency.js';
import QuantityBox from '../common/QuantityBox';
import useCartUpdater from '../../hooks/useCartUpdater.ts';

const CartItem = (props) => {
    const { id, title, finalPrice, originalPrice, quantity, thumbnail, creator, sku, urlKey, cartItemUid } = props;

    const newPrice = displayMoney(finalPrice);
    const oldPrice = displayMoney(originalPrice);

    const { removeFromCart } = useCartUpdater();

    return (
        <>
            <div className="cart_item">
                <figure className="cart_item_img">
                    <Link to={`/competition/${sku}-${creator}-${urlKey}`}>
                        <img src={thumbnail} alt="product-img" />
                    </Link>
                </figure>
                <div className="cart_item_info">
                    <div className="cart_item_head">
                        <h4 className="cart_item_title">
                            <Link to={`/competition/${sku}-${creator}-${urlKey}`}>
                                <strong>{title}</strong> Competition Entry
                            </Link>
                        </h4>
                        <div className="cart_item_del">
                            <span onClick={async () => {
                                removeFromCart(cartItemUid)
                                }}>
                                <TbTrash />
                            </span>
                            <div className="tooltip">Remove Item</div>
                        </div>
                    </div>

                    <h2 className="cart_item_price">
                        {newPrice} &nbsp;
                        {originalPrice ? (
                            <small>
                                <del>{oldPrice}</del>
                            </small>
                        ) : (
                            ''
                        )}
                    </h2>

                    <QuantityBox sku={sku} itemQuantity={quantity} cartItemUid={cartItemUid} />
                </div>
            </div>
        </>
    );
};

export default CartItem;
