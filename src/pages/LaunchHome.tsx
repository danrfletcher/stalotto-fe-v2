import { useContext, useEffect } from 'react';
import Services from '../components/common/Services';
import { BounceLoader } from 'react-spinners';
import loadingContext from '../contexts/loading/loadingContext';
import { Helmet } from 'react-helmet-async';
import MainSlider from '../components/sliders/MainSlider';
import useCartUpdater from '../hooks/useCartUpdater';

const LaunchHome = () => {
    //loading state variables
    const {
        toggleItemsLoaded, //function to toggle loading states
        isUserDataLoaded, //user data loads silently in the background
        isCartDataLoaded, //cart data loads silently in the background
        isFirstLoad,
        toggleIsFirstLoad, //first load logic for loading spinner
    } = useContext(loadingContext);

    //first page load logic for loading spinner
    useEffect(() => {
        if (isUserDataLoaded && isCartDataLoaded && isFirstLoad) {
            toggleItemsLoaded(['isHomeLoaded']);
            toggleIsFirstLoad();
        }
    }, [isCartDataLoaded, isUserDataLoaded]);

    return isFirstLoad ? (
        <div className="loading-spinner">
            <BounceLoader color="#a9afc3" />
        </div>
    ) : (
        <>
            <Helmet>
                <title>Stalotto | Rust to Mexico Launch Special</title>
            </Helmet>
            <main
                className={isFirstLoad ? 'content-hidden' : 'content-visible'}
            >
                <section id="hero">
                    <MainSlider />
                </section>
                <Services />
            </main>
        </>
    );
};

export default LaunchHome;
