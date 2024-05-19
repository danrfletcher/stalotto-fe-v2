import React, { useContext } from 'react';
import { BsExclamationCircle } from 'react-icons/bs';
import useDocTitle from '../hooks/useDocTitle';
import FilterBar from '../components/filters/FilterBar';
import ProductCard from '../components/product/ProductCard';
import Services from '../components/common/Services';
import EmptyView from '../components/common/EmptyView';
import commonContext from '../contexts/common/commonContext.jsx';
import { useState } from 'react';
import { useEffect } from 'react';
import loadingContext from '../contexts/loading/loadingContext.jsx';
import { getFilteredCompetitionData } from '../services/competitionsApi';
import { BounceLoader, PulseLoader } from 'react-spinners';

const AllProducts = () => {
    useDocTitle('All Products');

    const {
        isFirstLoad,
        toggleIsFirstLoad,
        isUserDataLoaded,
        isCartDataLoaded,
    } = useContext(loadingContext);

    const { filteredCompetitions, setFilteredCompetitions } =
        useContext(commonContext);
    const [setInitialLoad] = useState(true);

    useEffect(() => {
        const fetchTopProducts = async () => {
            try {
                //fetch data
                const data = await getFilteredCompetitionData();
                setFilteredCompetitions(data);

                //set context state for this component to loaded after data is received
                setInitialLoad(false);
                if (isFirstLoad) {
                    toggleIsFirstLoad();
                }
            } catch (err) {
                setInitialLoad(false);
            }
        };
        fetchTopProducts();
    }, []);

    return isFirstLoad && !isUserDataLoaded && !isCartDataLoaded ? (
        <div className="loading-spinner">
            <BounceLoader color="#a9afc3" />
        </div>
    ) : filteredCompetitions === null ? (
        <PulseLoader color="#a9afc3" className="centered_pulse_loader" />
    ) : typeof filteredCompetitions === 'string' ? (
        <p>{filteredCompetitions}</p>
    ) : (
        <>
            <section id="all_products" className="section">
                <FilterBar />

                <div className="container">
                    {Array.isArray(filteredCompetitions) &&
                    filteredCompetitions.length > 0 ? (
                        <div className="wrapper products_wrapper">
                            {filteredCompetitions.map((item) => (
                                <ProductCard key={item.id} {...item} />
                            ))}
                        </div>
                    ) : (
                        <EmptyView
                            icon={<BsExclamationCircle />}
                            msg="No Results Found"
                        />
                    )}
                </div>
            </section>
            <Services />
        </>
    );
};

export default AllProducts;
