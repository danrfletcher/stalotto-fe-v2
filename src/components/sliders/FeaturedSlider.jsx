import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, A11y, Autoplay } from 'swiper';
import { displayMoney } from '../../utils/currency';
import 'swiper/scss';
import 'swiper/scss/autoplay';
import 'swiper/scss/pagination';
import 'swiper/scss/effect-coverflow';
import { CountdownTimer } from './CountdownTimer';
import { TicketSoldBar } from './TicketSoldBar';
import commonContext from '../../contexts/common/commonContext';
import { PulseLoader } from 'react-spinners';

const FeaturedSlider = () => {
    //component data
    const { featuredCompetitions } = useContext(commonContext);

    return featuredCompetitions === null ? (
        <PulseLoader color="#a9afc3" className="centered_pulse_loader" />
    ) : typeof featuredCompetitions === 'string' ? (
        <p className="comp_placeholder">{featuredCompetitions}</p>
    ) : (
        <Swiper
            modules={[EffectCoverflow, Pagination, A11y, Autoplay]}
            loop={true}
            speed={400}
            spaceBetween={100}
            slidesPerView={'auto'}
            pagination={{ clickable: true }}
            effect={'coverflow'}
            centeredSlides={true}
            coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 70,
                modifier: 3,
                slideShadows: false,
            }}
            autoplay={{
                delay: 3500,
                disableOnInteraction: false,
            }}
            breakpoints={{
                768: {
                    slidesPerView: 2,
                    spaceBetween: 200,
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 250,
                },
            }}
            className="featured_swiper"
        >
            {featuredCompetitions.map((item) => {
                const {
                    id,
                    thumbnail,
                    title,
                    finalPrice,
                    originalPrice,
                    totalTickets,
                    ticketsRemaining,
                    closes,
                    creator,
                    urlKey,
                    sku,
                } = item;
                const { src, label } = thumbnail;

                const newPrice = displayMoney(finalPrice);
                const oldPrice = displayMoney(originalPrice);

                const fractionOfTicketsSold =
                    (totalTickets - ticketsRemaining) / totalTickets;
                const percentageSold = Math.round(fractionOfTicketsSold * 100);

                return (
                    <SwiperSlide key={id} className="featured_slides">
                        <div className="featured_title">{title}</div>
                        <figure className="featured_img">
                            <Link
                                to={`/competition/${sku}-${urlKey}`}
                            >
                                <img src={src} alt={label} />
                            </Link>
                        </figure>
                        <h2 className="products_price">
                            {newPrice} <span>/Ticket</span>&nbsp;
                            {oldPrice > newPrice ? (
                                <small>
                                    <del>{oldPrice}</del>
                                </small>
                            ) : null}
                        </h2>
                        <TicketSoldBar progress={1 - fractionOfTicketsSold} />
                        <h5 className="percent_tickets_sold">{`${percentageSold}% of tickets sold`}</h5>
                        <br />
                        <CountdownTimer
                            closes={closes}
                            passStyle="countdown_timer"
                        />
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
};

export default FeaturedSlider;
