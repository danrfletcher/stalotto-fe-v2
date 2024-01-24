import React, { useContext } from 'react';
import { IoMdStar } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { displayMoney } from '../../utils/currency.js';
import cartContext from '../../contexts/cart/cartContext.jsx';
import useActive from '../../hooks/useActive';


const ProductCard = (props) => {

    const { id, images, title, info, finalPrice, originalPrice, rateCount, path, state, winningTicketId } = props;

    const { addItem } = useContext(cartContext);
    const { active, handleActive, activeClass } = useActive(false);


    // handling Add-to-cart
    const handleAddItem = () => {
        const item = { ...props };
        addItem(item);

        handleActive(id);

        setTimeout(() => {
            handleActive(false);
        }, 3000);
    };

    const newPrice = displayMoney(finalPrice);
    const oldPrice = displayMoney(originalPrice);


    return (
        <>
            <div className="card products_card">
                <figure className="products_img">
                    <Link to={`/competition-details/${id}`}>
                        <img src={images[0]} alt="product-img" />
                    </Link>
                </figure>
                <div className="products_details">
                    {state === 'Winners' ? `Winning Ticket: #${winningTicketId}` : null}
                    <h3 className="products_title">
                        <Link to={`/competition-details/${id}`}>{title}</Link>
                    </h3>
                    <h5 className="products_info">{info}</h5>
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
                        {active ? 'Added' : 'Add to cart'}
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProductCard;