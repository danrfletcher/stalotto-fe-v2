import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, A11y, Autoplay } from 'swiper';
import { displayMoney } from '../../utils/currency';
import { getFeaturedCompetitionData } from '../../services/competitionsApi.ts'
import 'swiper/scss';
import 'swiper/scss/autoplay';
import 'swiper/scss/pagination';
import "swiper/scss/effect-coverflow";
import { CountdownTimer } from './CountdownTimer';
import { TicketSoldBar } from './TicketSoldBar';
import commonContext from '../../contexts/common/commonContext';

const FeaturedSlider = () => {
    
    //component data
    const { featuredCompetitions, setFeaturedCompetitions } = useContext(commonContext);
    

    return (
        <Swiper
            modules={[EffectCoverflow, Pagination, A11y, Autoplay]}
            loop={true}
            speed={400}
            spaceBetween={100}
            slidesPerView={"auto"}
            pagination={{ clickable: true }}
            effect={"coverflow"}
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
                    spaceBetween: 200
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 250
                },
            }}
            className="featured_swiper"
        >
            {
                featuredCompetitions.map((item) => {
                    const { id, creator, name, original_price } = item;
                    
                    const thumbnail_src = item.thumbnail.url;
                    const final_price = item.price_range.minimum_price.final_price.value;
                    const total_tickets = item.starting_ticket_qtd;
                    const tickets_remaining = item.only_x_left_in_stock;
                    const closes = new Date(item.competition_closes_on);
                    
                    const newPrice = displayMoney(final_price);
                    const oldPrice = displayMoney(original_price);

                    const fractionOfTicketsSold = (total_tickets - tickets_remaining) / total_tickets;
                    const percentageSold = Math.round(fractionOfTicketsSold * 100)

                    return (
                        <SwiperSlide key={id} className="featured_slides">
                            <div className="featured_title">{name}</div>
                            <figure className="featured_img">
                                <Link to={`/competition-details/${id}`}>
                                    <img src={thumbnail_src} alt="" />
                                </Link>
                            </figure>
                            <h2 className="products_price">
                                {newPrice} <span>/Ticket</span>&nbsp; 
                                {oldPrice > newPrice ? (<small><del>{oldPrice}</del></small>) : null }
                            </h2>
                            <TicketSoldBar progress={1 - fractionOfTicketsSold} />
                            <h5 className="percent_tickets_sold">{`${percentageSold}% of tickets sold`}</h5>
                            <br />
                            <CountdownTimer closes={closes} passStyle="countdown_timer" />
                        </SwiperSlide>
                    );
                })
            }
        </Swiper>
    )
};

export default FeaturedSlider;