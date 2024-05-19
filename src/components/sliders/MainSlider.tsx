import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Autoplay } from 'swiper';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';

import 'swiper/scss';
import 'swiper/scss/autoplay';
import 'swiper/scss/pagination';
import useCartUpdater from '../../hooks/useCartUpdater';

const MainSlider = () => {
    const { addToCart } = useCartUpdater();
    const naviagate = useNavigate();

    // handling Add-to-cart Actions
    const handleAddItem = () => {
        addToCart(5, 1);
    };

    return (
        <>
            <Helmet>
                <style type="text/css">
                    {`
                        .hero_slide_text::before {
                            content: "Launch Special";
                        }
                    `}
                </style>
            </Helmet>
            <Swiper
                modules={[Pagination, A11y, Autoplay]}
                loop={true}
                speed={400}
                spaceBetween={100}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={false}
                allowTouchMove={false}
            >
                <SwiperSlide className={`wrapper hero_wrapper hero_slide_text`}>
                    <div className="hero_video">
                        <video
                            className="video_content"
                            autoPlay
                            muted
                            playsInline
                            loop
                        >
                            <source
                                src="/videos/rust2romepromo.mp4"
                                type="video/mp4"
                            />
                        </video>
                    </div>
                    <div className="hero_item_txt">
                        <h3 style={{ cursor: 'pointer !important' }}>
                            scottyfairno, conallbdoyle and{' '}
                            <a
                                target="_blank"
                                href="https://www.rust2rome.com/"
                            >
                                Rust2Rome
                            </a>
                        </h3>
                        <h1>
                            10 Days with Scotty & conall on The Best Banger
                            Rally Of All Time
                        </h1>
                        <h4 className="hero_price">
                            Tickets £3.99 &nbsp;
                            <small>
                                <del>£4.99</del>
                            </small>
                        </h4>
                        <button
                            onClick={() =>
                                naviagate(
                                    '/competition/5-scottyfairno,%20conallbdoyle,%20rust2rome-rust-to-rome-launch-special',
                                )
                            }
                            className="btn"
                            style={{ marginRight: '16px' }}
                        >
                            View Experience
                        </button>
                        <button onClick={handleAddItem} className="btn">
                            Add to Cart
                        </button>
                    </div>
                    <figure className="hero_item_img">
                        <img src="/images/rust2fairno.png" alt="product-img" />
                    </figure>
                </SwiperSlide>
            </Swiper>
        </>
    );
};

export default MainSlider;
