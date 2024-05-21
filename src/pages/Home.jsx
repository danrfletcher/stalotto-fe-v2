import React, { useContext, useEffect } from 'react';
import HeroSlider from '../components/sliders/HeroSlider';
import FeaturedSlider from '../components/sliders/FeaturedSlider';
import SectionsHead from '../components/common/SectionsHead';
import TopProducts from '../components/product/TopProducts';
import Services from '../components/common/Services';
import { BounceLoader } from 'react-spinners';
import loadingContext from '../contexts/loading/loadingContext';
import commonContext from '../contexts/common/commonContext';
import { getFilteredCompetitionData } from '../services/competitionsApi';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    //loading state variables
    const {
        toggleItemsLoaded, //function to toggle loading states
        isUserDataLoaded, //user data loads silently in the background
        isCartDataLoaded, //cart data loads silently in the background
        isHeroSliderLoaded, //hero slider component
        isFeaturedSliderLoaded, //featured competitions slider component
        isTopProductsLoaded, //top products component
        isServicesLoaded, //services component
        isFirstLoad,
        toggleIsFirstLoad, //first load logic for loading spinner
    } = useContext(loadingContext);

    //finalizing first page load logic for loading spinner
    useEffect(() => {
        if (
            isUserDataLoaded &&
            isCartDataLoaded &&
            isHeroSliderLoaded &&
            isFeaturedSliderLoaded &&
            isTopProductsLoaded &&
            isServicesLoaded &&
            isFirstLoad
        ) {
            toggleItemsLoaded(['isHomeLoaded']);
            toggleIsFirstLoad();
        }
    }, [
        isUserDataLoaded,
        isCartDataLoaded,
        isHeroSliderLoaded,
        isFeaturedSliderLoaded,
        isTopProductsLoaded,
        isServicesLoaded,
        isUserDataLoaded,
    ]);

    //page data
    const {
        setFeaturedCompetitions, //featured competitions component

        setFilteredCompetitions, //top products component
    } = useContext(commonContext);

    //fetching data & setting component loading states
    useEffect(() => {
        //hero slider - data currently hardcoded
        if (!isHeroSliderLoaded) {
            toggleItemsLoaded(['isHeroSliderLoaded']);
        }

        //featured competitions component
        const setFeaturedCompetitionsAsLoaded = () => {
            if (!isFeaturedSliderLoaded) {
                toggleItemsLoaded(['isFeaturedSliderLoaded']);
            }
        };
        const fetchFeaturedCompetitions = async () => {
            try {
                //fetch data
                const data = await getFilteredCompetitionData({
                    tag: 'featured',
                });
                setFeaturedCompetitions(data);

                //set context state for this component to loaded after data is received
                setFeaturedCompetitionsAsLoaded();
            } catch (err) {
                setFeaturedCompetitionsAsLoaded();
            }
        };
        fetchFeaturedCompetitions();

        //top products component - data currently hardcoded
        const setTopCompetitionsAsLoaded = () => {
            if (!isTopProductsLoaded) {
                toggleItemsLoaded(['isTopProductsLoaded']);
            }
        };
        const fetchTopProducts = async () => {
            try {
                //fetch data
                const data = await getFilteredCompetitionData();
                setFilteredCompetitions(data);

                //set context state for this component to loaded after data is received
                setTopCompetitionsAsLoaded();
            } catch (err) {
                setTopCompetitionsAsLoaded();
            }
        };
        fetchTopProducts();

        if (!isTopProductsLoaded) {
            toggleItemsLoaded(['isTopProductsLoaded']);
        }

        //services component - data currently hardcoded
        if (!isServicesLoaded) {
            toggleItemsLoaded(['isServicesLoaded']);
        }
    }, []);

    return isFirstLoad ? (
        <div className="loading-spinner">
            <BounceLoader color="#a9afc3" />
        </div>
    ) : (
        <>
            <Helmet>
                <title>
                    Stalotto | Competitions by Your Favourite Creators
                </title>
            </Helmet>
            <main
                className={isFirstLoad ? 'content-hidden' : 'content-visible'}
            >
                <section id="hero">
                    <HeroSlider />
                </section>

                <section id="featured" className="section">
                    <div className="container">
                        <SectionsHead heading="Featured Competitions" />
                        <FeaturedSlider />
                    </div>
                </section>

                <section id="comp" className="section">
                    <div className="container">
                        <SectionsHead heading="All Competitions" />
                        <TopProducts />
                    </div>
                </section>

                <Services />
            </main>
        </>
    );
};

export default Home;
