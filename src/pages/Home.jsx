import React, { useContext, useEffect, useState } from 'react';
import HeroSlider from '../components/sliders/HeroSlider';
import FeaturedSlider from '../components/sliders/FeaturedSlider';
import SectionsHead from '../components/common/SectionsHead';
import TopProducts from '../components/product/TopProducts';
import Services from '../components/common/Services';
import { BounceLoader } from 'react-spinners';
import loadingContext from '../contexts/loading/loadingContext';
import commonContext from '../contexts/common/commonContext';
import { getFilteredCompetitionData } from '../services/competitionsApi';


const Home = () => {

    //loading state variables
    const {
        isHeroSliderLoaded, toggleIsHeroSliderLoaded, //hero slider component

        isFeaturedSliderLoaded, toggleIsFeaturedSliderLoaded, //featured competitions slider component

        isTopProductsLoaded, toggleIsTopProductsLoaded, //top products component

        isServicesLoaded, toggleIsServicesLoaded, //services component

        isFirstLoad, toggleIsFirstLoad, //first load logic for loading spinner
    } = useContext(loadingContext);


    //page data
    const { 
        setFeaturedCompetitions, //featured competitions component

        setFilteredCompetitions, //top products component
    } = useContext(commonContext);


    //fetching data & setting component loading states
    useEffect(() => {

        //hero slider - data currently hardcoded
        if (!isHeroSliderLoaded) {
            toggleIsHeroSliderLoaded();
        }

        //featured competitions component
        const setFeaturedCompetitionsAsLoaded = () => {
            if (!isFeaturedSliderLoaded) {
                toggleIsFeaturedSliderLoaded();
            };
        };
        const fetchFeaturedCompetitions = async () => {
            try {
                //fetch data
                const data = await getFilteredCompetitionData({tag: "featured"});
                setFeaturedCompetitions(data);
                
                //set context state for this component to loaded after data is received
                setFeaturedCompetitionsAsLoaded();
            } catch (err) {
                setFeaturedCompetitionsAsLoaded();
            }
        }
        fetchFeaturedCompetitions();

        //top products component - data currently hardcoded
        const setTopCompetitionsAsLoaded = () => {
            if (!isTopProductsLoaded) {
                toggleIsTopProductsLoaded();
            };
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
        }
        fetchTopProducts();


        if (!isTopProductsLoaded) {
            toggleIsTopProductsLoaded();
        }

        //services component - data currently hardcoded
        if (!isServicesLoaded) {
            toggleIsServicesLoaded();
        }
    },[]);


    //finalizing first page load logic for loading spinner
    useEffect(() => {
        if (isHeroSliderLoaded && isFeaturedSliderLoaded && isTopProductsLoaded && isServicesLoaded && isFirstLoad) {
            toggleIsFirstLoad();
        }
    }, [isHeroSliderLoaded, isFeaturedSliderLoaded, isTopProductsLoaded, isServicesLoaded])

    return (
        isFirstLoad ? (
            <div className="loading-spinner">
                <BounceLoader color="#a9afc3" />
            </div>
            ) : (
            <main className={isFirstLoad ? 'content-hidden' : 'content-visible'}>
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
        )
    );
};

export default Home;