import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Autoplay } from 'swiper';
import { displayMoney } from '../../utils/currency';
import usersData from '../../data/usersData';

import 'swiper/scss';
import 'swiper/scss/autoplay';
import 'swiper/scss/pagination';


const HeroSlider = () => {
    const creators = usersData.filter(creator => creator.tag === 'featured-creator');

    return (
        <Swiper
            modules={[Pagination, A11y, Autoplay]}
            loop={true}
            speed={400}
            spaceBetween={100}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{
                delay: 4000,
                disableOnInteraction: false,
            }}
        >
            {
                creators.map((creator, i) => {
                    const { id, username, tagline, heroImage, heroVideo, finalPrice, originalPrice } = creator;
                    const newPrice = displayMoney(finalPrice);
                    const oldPrice = displayMoney(originalPrice);
                    return (
                        <SwiperSlide
                            key={id}
                            className={`wrapper hero_wrapper hero_slide-${i}`}
                        >
                            <div className="hero_video">
                                <video className="video_content" autoPlay muted playsInline loop>
                                    <source src={heroVideo} type="video/mp4" />
                                </video>
                            </div>
                            <div className="hero_item_txt">
                                <h3>{username}</h3>
                                <h1>{tagline}</h1>
                                <h4 className="hero_price">
                                    Tickets {newPrice} &nbsp;
                                    <small><del>{oldPrice}</del></small>
                                </h4>
                                <Link to={`/u/${username}`} className="btn">Browse Competitions</Link>
                            </div>
                            <figure className="hero_item_img">
                                <img src={heroImage} alt="product-img" />
                            </figure>
                        </SwiperSlide>
                    );
                })
            }
        </Swiper>
    );
};

export default HeroSlider;