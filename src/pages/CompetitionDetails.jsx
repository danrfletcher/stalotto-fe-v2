import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IoMdStar, IoMdCheckmark } from 'react-icons/io';
import { calculateDiscount, displayMoney } from '../utils/currency.js';
import useDocTitle from '../hooks/useDocTitle.js';
import useActive from '../hooks/useActive.js';
import cartContext from '../contexts/cart/cartContext.jsx';
import competitionsData from '../data/competitionData.tsx';
import SectionsHead from '../components/common/SectionsHead.jsx';
import RelatedSlider from '../components/sliders/RelatedSlider.jsx';
import ProductSummary from '../components/product/ProductSummary.jsx';
import Services from '../components/common/Services.jsx';
import { CountdownTimer } from '../components/sliders/CountdownTimer.tsx';
import { offersData } from '../data/offersData.ts';
import { OffersList } from './OffersList.tsx';


const CompetitionDetails = () => {

    useDocTitle('Product Details');

    const { handleActive, activeClass } = useActive(0);

    const { addItem } = useContext(cartContext);

    const { productId } = useParams();

    // here the 'id' received has 'string-type', so converting it to a 'Number'
    const prodId = parseInt(productId);

    // showing the Product based on the received 'id'
    const product = competitionsData.find(item => item.id === prodId);

    const { 
        images, 
        title, 
        creator, 
        category, 
        finalPrice, 
        originalPrice, 
        ratings, 
        rateCount,
        totalTickets,
        ticketsRemaining,
        closes,
        offers,
        description,
        specifications,
        comments,
        totalComments,
    } = product;

    const [previewImg, setPreviewImg] = useState(images[0]);


    // handling Add-to-cart
    const handleAddItem = () => {
        addItem(product);
    };


    // setting the very-first image on re-render
    useEffect(() => {
        setPreviewImg(images[0]);
        handleActive(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [images]);


    // handling Preview image
    const handlePreviewImg = (i) => {
        setPreviewImg(images[i]);
        handleActive(i);
    };


    // calculating Prices
    const discountedPrice = originalPrice - finalPrice;
    const newPrice = displayMoney(finalPrice);
    const oldPrice = displayMoney(originalPrice);
    const savedPrice = displayMoney(discountedPrice);
    const savedDiscount = calculateDiscount(discountedPrice, originalPrice);

    const fractionOfTicketsSold = (totalTickets - ticketsRemaining) / totalTickets;
    const percentageSold = Math.round(fractionOfTicketsSold * 100)

    return (
        <>
            <section id="product_details" className="section">
                <div className="container">
                    <div className="wrapper prod_details_wrapper">

                        {/*=== Product Details Left-content ===*/}
                        <div className="prod_details_left_col">
                            <div className="prod_details_tabs">
                                {
                                    images.map((img, i) => (
                                        <div
                                            key={i}
                                            className={`tabs_item ${activeClass(i)}`}
                                            onClick={() => handlePreviewImg(i)}
                                        >
                                            <img src={img} alt="product-img" />
                                        </div>
                                    ))
                                }
                            </div>
                            <figure className="prod_details_img">
                                <img src={previewImg} alt="product-img" />
                            </figure>
                        </div>

                        {/*=== Product Details Right-content ===*/}
                        <div className="prod_details_right_col">
                            <h1 className="prod_details_title">{title}</h1>
                            <h5 className="prod_details_creator">{creator}</h5>

                            <div className="separator"></div>

                            <div className="prod_details_price">
                                <div className="price_box">
                                    <h2 className="price">
                                        {newPrice} &nbsp;
                                        <small className="del_price"><del>{oldPrice}</del></small>
                                    </h2>
                                    <p className="saved_price">You save: {savedPrice} ({savedDiscount}%)</p>
                                    <span className="tax_txt">(Inclusive of all taxes)</span>
                                </div>

                                <div className="badge">
                                    <span><IoMdCheckmark /> {100 - percentageSold}% of Tickets Remaining</span>
                                </div>
                            </div>
                                <br />
                                <div className="draws_in">
                                    <CountdownTimer passStyle="comp_countdown" closes={closes} text="Winner will be announced in" />
                                </div>
                            <div className="separator"></div>

                            <div className="prod_details_offers">
                                <h4>Exclusive Offers</h4>
                                <ul>
                                    <OffersList offers={offers} />
                                </ul>
                            </div>

                            <div className="separator"></div>

                            <div className="prod_details_buy_btn">
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={handleAddItem}
                                >
                                    Add to cart
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <ProductSummary {...product} />

            <section id="related_products" className="section">
                <div className="container">
                    <SectionsHead heading="Related Products" />
                    <RelatedSlider category={category} />
                </div>
            </section>

            <Services />
        </>
    );
};

export default CompetitionDetails;