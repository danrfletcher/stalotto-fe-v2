import React, { useContext } from 'react';
import { IoMdStar } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { displayMoney } from '../../utils/currency.js';
import cartContext from '../../contexts/cart/cartContext.jsx';
import useActive from '../../hooks/useActive';
import useCartSync from '../../hooks/useCartSync.ts'


const ProductCard = (props) => {

    const { id, title, finalPrice, originalPrice, winningTicketIDs, thumbnail, creator, urlKey, sku } = props;

    const { active, handleActive, activeClass } = useActive(false);
    const { handleAddToCart } = useCartSync();

    // handling Add-to-cart
    const handleAddItem = () => {
        const item = { ...props };
        handleAddToCart(item);

        handleActive(id);

        setTimeout(() => {
            handleActive(false);
        }, 3000);
    };

    const newPrice = displayMoney(finalPrice);

    let oldPrice; 
    if (originalPrice) {
        oldPrice = displayMoney(originalPrice);
    }

    return (
        <>
            <div className="card products_card">
                <figure className="products_img">
                    <Link to={`/competition/${sku}-${creator}-${urlKey}`}>
                        <img src={thumbnail.src} alt="product-img" />
                    </Link>
                </figure>
                <div className="products_details">
                    {winningTicketIDs ? `Winning Ticket${winningTicketIDs.length > 1 ? `s` : ``}: #${winningTicketIDs.join(", #")}` : null}
                    <h3 className="products_title">
                        <Link to={`/competition/${sku}-${creator}-${urlKey}`}>{title}</Link>
                    </h3>
                    <h5 className="products_info">{creator}</h5>
                    <div className="separator"></div>
                    <h2 className="products_price">
                        {newPrice} &nbsp;
                        <small><del>{oldPrice}</del></small>
                    </h2>
                    <button
                        type="button"
                        className={`btn products_btn ${activeClass(id)}`}
                        onClick={handleAddItem}
                    >
                        {active ? 'Added' : 'Add tickets to cart'}
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProductCard;