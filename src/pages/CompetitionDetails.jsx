import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IoMdCheckmark, IoIosCloseCircle } from 'react-icons/io';
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
import commonContext from '../contexts/common/commonContext.jsx';
import { getFilteredCompetitionData } from '../services/competitionsApi.ts';
import loadingContext from '../contexts/loading/loadingContext.jsx';
import { BounceLoader, PulseLoader } from 'react-spinners';


const CompetitionDetails = () => {

    const { isFirstLoad, toggleIsFirstLoad } = useContext(loadingContext);

    const [competition, setCompetition] = useState({});
    const [isCompetitionLoaded,setIsCompetitionLoaded] = useState(false);
    const [compTitle, setCompTitle] = useState('Competition')
    useDocTitle(compTitle);

    const { handleActive, activeClass } = useActive(0);
    const { addItem } = useContext(cartContext);

    const { filteredCompetitions } = useContext(commonContext);
    const { urlKey } = useParams();

    const sku = parseInt(urlKey.split('-')[0]);
    const [previewImg, setPreviewImg] = useState(null);

    // showing the Product based on the received 'id'
    useEffect(() => {
        const fetchCompetition = async () => {
            try {
                const data = await getFilteredCompetitionData({ sku });
                if (data.length === 1) {
                    setCompetition(data[0]);
                    setCompTitle(data[0].title);
                    setPreviewImg(data[0].thumbnail.src);
                    setIsCompetitionLoaded(true);
                    if (isFirstLoad) {
                        toggleIsFirstLoad();
                    }
                } else {
                    throw new Error('Error fetching competition');
                }
            } catch (err) {
                setCompetition("We're having trouble fetching data for this competition. Please try again later.")
            }
        };
    
        fetchCompetition();
    }, [filteredCompetitions, sku]);

    const { images, title, creator, category, finalPrice, originalPrice, totalTickets, ticketsRemaining, closes, thumbnail, winningTicketIDs } = competition;

    // handling Add-to-cart
    const handleAddItem = () => {
        //addItem(product);
    };


    //setting the very-first image on re-render
    useEffect(() => {
        if (images) {
            setPreviewImg(images[0].src);
            handleActive(0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [images]);


    // handling Preview image
    const handlePreviewImg = (i, src) => {
        setPreviewImg(src);
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
            {isFirstLoad ? (
                <div className="loading-spinner">
                    <BounceLoader color="#a9afc3" />
                </div>
            ) : (
                <>
                    <section id="product_details" className="section">
                        <div className="container">
                            <div className="wrapper prod_details_wrapper">

                                {!isCompetitionLoaded ? (
                                    <div>
                                        <PulseLoader color="#a9afc3" className="centered_pulse_loader" />
                                    </div>
                                ) : (
                                    /*=== Product Details Left-content ===*/
                                    typeof competition === "string" ? <p>{competition}</p> :
                                    (
                                        <>
                                            <div className="prod_details_left_col">
                                                <div className="prod_details_tabs">
                                                    {
                                                        images.length > 1 ? (
                                                            images.map((img, i) => (
                                                                <div
                                                                    key={i}
                                                                    className={`tabs_item ${activeClass(i)}`}
                                                                    onClick={() => handlePreviewImg(i, img.src)}
                                                                >
                                                                    <img src={img.src} alt="product-img" />
                                                                </div>
                                                            ))
                                                        ) : ""
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
                                                        {closes < new Date() ? <h2 className="price">Competition Now Closed</h2> : (
                                                            <>
                                                                <div className="price_box">
                                                                    <h2 className="price">
                                                                        {newPrice} &nbsp;
                                                                        {originalPrice ? <small className="del_price"><del>{oldPrice}</del></small> : ""}
                                                                    </h2>
                                                                    {originalPrice ? <p className="saved_price">You save: {savedPrice} ({savedDiscount}%)</p> : ""}
                                                                    <span className="tax_txt">(Inclusive of all taxes)</span>
                                                                </div>
                                                                <div className="badge">
                                                                    <span><IoMdCheckmark /> {100 - percentageSold}% of Tickets Remaining</span>
                                                                </div>
                                                            </>
                                                        )}
                                                </div>
                                                    <br />
                                                    <div className="draws_in">
                                                        {closes < new Date() ? (
                                                            <>
                                                                <br />
                                                                <p>{winningTicketIDs ? (`Winning Ticket${winningTicketIDs.length > 1 ? `s` : ``}: #${winningTicketIDs.join(", #")}`) : `Draw is pending`}</p>
                                                            </>
                                                        ) : <CountdownTimer passStyle="comp_countdown" closes={closes} text="Winner will be announced in" />}
                                                    </div>
                                                <div className="separator"></div>
                                                {/* <div className="prod_details_offers">
                                                    <h4>Exclusive Offers</h4>
                                                    <ul>
                                                        <OffersList offers={offers} />
                                                        Offers are currently disabled
                                                    </ul>
                                                </div>
                                                <div className="separator"></div>*/}
                                                <div className="prod_details_buy_btn">
                                                    {closes < new Date() ? "" : (
                                                        <button
                                                            type="button"
                                                            className="btn"
                                                            onClick={handleAddItem}
                                                        >
                                                            Add tickets to cart
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    )
                                )}
                            </div>
                        </div>
                    </section>
        
                    {/* <ProductSummary {...competition} /> */}
        
                    {/* <section id="related_products" className="section">
                    <div className="container">
                        <SectionsHead heading="Related Products" />
                        <RelatedSlider category={category} />
                    </div>
                    </section> */}
                    <Services />
                </>
            )}
        </>
    );
};

export default CompetitionDetails;