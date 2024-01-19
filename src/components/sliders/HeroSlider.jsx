import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Autoplay } from 'swiper';
import { displayMoney } from '../../utils/currency';
import productsData from '../../data/productsData';
import featuredCreatorsData from '../../data/featuredCreatorsData';

import 'swiper/scss';
import 'swiper/scss/autoplay';
import 'swiper/scss/pagination';


const HeroSlider = () => {

    const heroProducts = featuredCreatorsData;

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
                heroProducts.map((item, i) => {
                    const { id, title, tagline, heroImage, heroVideo, finalPrice, originalPrice, path } = item;
                    const newPrice = displayMoney(finalPrice);
                    const oldPrice = displayMoney(originalPrice);
                    return (
                        <SwiperSlide
                            key={id}
                            className={`wrapper hero_wrapper hero_slide-${i}`}
                        >
                            <div className="hero_video">
                                <video className="video_content" autoPlay muted playsinline loop>
                                    <source src={heroVideo} type="video/mp4" />
                                </video>
                            </div>
                            <div className="hero_item_txt">
                                <h3>{title}</h3>
                                <h1>{tagline}</h1>
                                <h4 className="hero_price">
                                    Tickets From {newPrice} &nbsp;
                                    <small><del>{oldPrice}</del></small>
                                </h4>
                                <Link to={path} className="btn">Browse Competitions</Link>
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