import React from 'react';
import { Link } from 'react-router-dom';
import { displayMoney } from '../../utils/currency.js';
import useActive from '../../hooks/useActive';
import useCartUpdater from '../../hooks/useCartUpdater.ts';

const ProductCard = (props) => {
    const {
        id,
        title,
        finalPrice,
        originalPrice,
        winningTicketIDs,
        thumbnail,
        creator,
        urlKey,
        sku,
    } = props;

    const { active, handleActive, activeClass } = useActive(false);

    const { addToCart } = useCartUpdater();

    // handling Add-to-cart
    const handleAddItem = () => {
        const item = { ...props };
        addToCart(sku, 1);
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
                    <Link to={`/competition/${sku}-${urlKey}`}>
                        <img src={thumbnail.src} alt="product-img" />
                    </Link>
                </figure>
                <div className="products_details">
                    {winningTicketIDs
                        ? `Winning Ticket${winningTicketIDs.length > 1 ? `s` : ``}: #${winningTicketIDs.join(', #')}`
                        : null}
                    <h3 className="products_title">
                        <Link to={`/competition/${sku}-${urlKey}`}>
                            {title}
                        </Link>
                    </h3>
                    <h5 className="products_info">{creator}</h5>
                    <div className="separator"></div>
                    <h2 className="products_price">
                        {newPrice} &nbsp;
                        <small>
                            <del>{oldPrice}</del>
                        </small>
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
