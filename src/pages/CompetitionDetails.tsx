import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IoMdCheckmark } from 'react-icons/io';
import { calculateDiscount, displayMoney } from '../utils/currency.js';
import useDocTitle from '../hooks/useDocTitle.js';
import useActive from '../hooks/useActive.js';
import Services from '../components/common/Services.jsx';
import loadingContext from '../contexts/loading/loadingContext.jsx';
import { BounceLoader, PulseLoader } from 'react-spinners';
import useCartUpdater from '../hooks/useCartUpdater.js';
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import { useQuery } from '@apollo/client';
import GetSingleCompetitionGql from '../graphql/GetSingleCompetition.gql';
import { GetSingleCompetitionQuery } from '../__generated__/graphql.js';

type SingleCompetitionDataType = {
    images: {
        src: string;
        label: string;
    }[];
    title: string;
    creators: string[];
    finalPrice: number;
    originalPrice: number;
    totalTickets: number;
    ticketsRemaining: number;
    closes: Date;
    winningTicketIds: string[];
    sku: string;
    descriptionHtml: string;
};

const baseURL = import.meta.env.VITE_API_BASE_URL;

const CompetitionDetails = () => {
    const {
        isFirstLoad,
        toggleIsFirstLoad,
        isUserDataLoaded,
        isCartDataLoaded,
    } = useContext(loadingContext);
    const { addToCart } = useCartUpdater();
    const { handleActive, activeClass } = useActive(0);
    const { urlKey } = useParams();
    const sku = parseInt((urlKey as string).split('-')[0]);
    const [previewImg, setPreviewImg] = useState<string | null>(null);

    const [singleCompetitionData, setSingleCompetitionData] =
        useState<SingleCompetitionDataType>({
            images: [],
            title: '',
            creators: [],
            finalPrice: 0,
            originalPrice: 0,
            totalTickets: 0,
            ticketsRemaining: 0,
            closes: new Date(),
            winningTicketIds: [],
            sku: '',
            descriptionHtml: '',
        });
    const {
        images,
        title,
        creators,
        finalPrice,
        originalPrice,
        totalTickets,
        ticketsRemaining,
        closes,
        winningTicketIds,
        descriptionHtml,
    } = singleCompetitionData;

    useDocTitle(`Stalotto | ${title}`);

    // Data Fetching
    const { loading, error, data } = useQuery<GetSingleCompetitionQuery>(
        GetSingleCompetitionGql,
        {
            variables: { sku },
        },
    );

    // Data Formatting
    useEffect(() => {
        if (data && data.products?.items?.length) {
            const item = data.products.items[0];

            const competition = item as any;

            setSingleCompetitionData({
                images:
                    competition.media_gallery_entries
                        ?.filter((image: any) => image !== null)
                        .map((entry: any) => ({
                            src:
                                `${baseURL}/pub/media/catalog/product${entry?.file}` ||
                                '',
                            label: entry?.label || '',
                        })) || [],
                title: competition.name || '',
                creators: competition.creator.split(',') || '',
                finalPrice:
                    competition.price_range?.minimum_price?.final_price
                        ?.value || '',
                originalPrice: competition.original_price || '',
                totalTickets: competition.starting_ticket_qtd || '',
                ticketsRemaining: competition.only_x_left_in_stock || '',
                closes: competition.competition_closes_on
                    ? new Date(competition.competition_closes_on)
                    : new Date(),
                winningTicketIds: competition.winning_ticket_ids
                    ? competition.winning_ticket_ids.split(',')
                    : '',
                sku: competition.sku.toString(),
                descriptionHtml: competition.short_description.html,
            });
        }
    }, [data]);

    // Loading
    useEffect(() => {
        if (isFirstLoad && !loading && isCartDataLoaded && isUserDataLoaded)
            toggleIsFirstLoad();
    }, [loading, isCartDataLoaded, isUserDataLoaded]);

    //setting the very-first image on re-render
    useEffect(() => {
        if (images.length) {
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

    const fractionOfTicketsSold =
        (totalTickets - ticketsRemaining) / totalTickets;
    const percentageSold = Math.round(fractionOfTicketsSold * 100);

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
                            {loading && (
                                <div>
                                    <PulseLoader
                                        color="#a9afc3"
                                        className="centered_pulse_loader"
                                    />
                                </div>
                            )}
                            <div className="wrapper prod_details_wrapper">
                                {error && (
                                    <p>
                                        We're having trouble retrieving
                                        information for this competition. Please
                                        try again later.
                                    </p>
                                )}
                                {data && (
                                    <>
                                        <div className="prod_details_left_col">
                                            <div className="prod_details_tabs">
                                                {images.length > 1
                                                    ? images.map((img, i) => (
                                                          <div
                                                              key={i}
                                                              className={`tabs_item ${activeClass(
                                                                  i,
                                                              )}`}
                                                              onClick={() =>
                                                                  handlePreviewImg(
                                                                      i,
                                                                      img.src,
                                                                  )
                                                              }
                                                          >
                                                              <img
                                                                  src={img.src}
                                                                  alt="product-img"
                                                              />
                                                          </div>
                                                      ))
                                                    : ''}
                                            </div>
                                            <figure className="prod_details_img">
                                                <img
                                                    src={previewImg}
                                                    alt="product-img"
                                                />
                                            </figure>
                                        </div>
                                        {/*=== Product Details Right-content ===*/}
                                        <div className="prod_details_right_col">
                                            <h1 className="prod_details_title">
                                                {title}
                                            </h1>
                                            <h5 className="prod_details_creator">
                                                {creators}
                                            </h5>
                                            <div className="separator"></div>
                                            <div className="prod_details_price">
                                                {closes < new Date() ? (
                                                    <h2 className="price">
                                                        Competition Now Closed
                                                    </h2>
                                                ) : (
                                                    <>
                                                        <div className="price_box">
                                                            <h2 className="price">
                                                                {newPrice}{' '}
                                                                &nbsp;
                                                                {originalPrice ? (
                                                                    <small className="del_price">
                                                                        <del>
                                                                            {
                                                                                oldPrice
                                                                            }
                                                                        </del>
                                                                    </small>
                                                                ) : (
                                                                    ''
                                                                )}
                                                            </h2>
                                                            {originalPrice ? (
                                                                <p className="saved_price">
                                                                    You save:{' '}
                                                                    {savedPrice}{' '}
                                                                    (
                                                                    {
                                                                        savedDiscount
                                                                    }
                                                                    %)
                                                                </p>
                                                            ) : (
                                                                ''
                                                            )}
                                                            <span className="tax_txt">
                                                                (Inclusive of
                                                                all taxes)
                                                            </span>
                                                        </div>
                                                        <div className="badge">
                                                            <span>
                                                                <IoMdCheckmark />{' '}
                                                                {100 -
                                                                    percentageSold}
                                                                % of Tickets
                                                                Remaining
                                                            </span>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                            <br />
                                            <div className="draws_in">
                                                {closes < new Date() ? (
                                                    <>
                                                        <br />
                                                        <p>
                                                            {winningTicketIds
                                                                ? `Winning Ticket${
                                                                      winningTicketIds.length >
                                                                      1
                                                                          ? `s`
                                                                          : ``
                                                                  }: #${winningTicketIds.join(
                                                                      ', #',
                                                                  )}`
                                                                : `Draw is pending`}
                                                        </p>
                                                    </>
                                                ) : (
                                                    <div className="countdown_time">
                                                        <FlipClockCountdown
                                                            to={closes.getTime()}
                                                            digitBlockStyle={{
                                                                width: 30,
                                                                height: 40,
                                                                fontSize:
                                                                    '1.5rem',
                                                                color: '#F6F8F8',
                                                                backgroundColor:
                                                                    '#ed1d24',
                                                            }}
                                                            separatorStyle={{
                                                                color: '#a9afc3',
                                                            }}
                                                            labelStyle={{
                                                                color: '#a9afc3',
                                                            }}
                                                            dividerStyle={{
                                                                color: '#AD151A',
                                                            }}
                                                            showSeparators={
                                                                false
                                                            }
                                                        />
                                                    </div>
                                                )}
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
                                                {closes < new Date() ? (
                                                    ''
                                                ) : (
                                                    <button
                                                        type="button"
                                                        className="btn"
                                                        onClick={() =>
                                                            addToCart(sku, 1)
                                                        }
                                                    >
                                                        Add tickets to cart
                                                    </button>
                                                )}
                                                <br />
                                                <br />
                                                <article
                                                    className="comp_description"
                                                    dangerouslySetInnerHTML={{
                                                        __html: descriptionHtml,
                                                    }}
                                                ></article>
                                            </div>
                                        </div>
                                    </>
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
