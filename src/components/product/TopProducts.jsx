import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import useActive from '../../hooks/useActive';
import ProductCard from './ProductCard';
import commonContext from '../../contexts/common/commonContext';
import { PulseLoader } from 'react-spinners';
import loadingContext from '../../contexts/loading/loadingContext.jsx';


const TopProducts = () => {

    //displaying product groups & categories business logic
    const { setCurrentHash, currentHash } = useContext(commonContext);

    const { filteredCompetitions, setFilteredCompetitions } = useContext(commonContext);
    const [initialLoad, setInitialLoad] = useState(true);
    const [initialCompetitionData, setInitialCompetitionData] = useState([]);
    
    useEffect(() => {
        if (initialLoad && Array.isArray(filteredCompetitions)) {
            if (filteredCompetitions.length > 0) {
                setInitialCompetitionData(structuredClone(filteredCompetitions));
                setInitialLoad(false);
            }
          }
    },[filteredCompetitions, initialLoad])

    const { activeClass, handleActive } = useActive(0);

    // making a unique set of product's category
    const productsCategory = [
        'Latest',
        //'Now Live',
        //'Winners',
        //'Pending Draw'
    ];

    // handling product's filtering
    const handleProducts = (category, i) => { //latest displays 25 most recent competitions, fetched on page load
        if (category === 'Latest') {
            setFilteredCompetitions(initialCompetitionData);
            handleActive(i);
            return;
        } else if (category === 'Now Live') { //now live fetches 25 most recent live competitions
            setFilteredCompetitions('This section is coming soon! 1');
            handleActive(i);
            return; 
        } else if (category === 'Winners') { //winners fetches 25 most recently won competitions
            setFilteredCompetitions('This section is coming soon! 2');
            handleActive(i);
            return;
        } else if (category === 'Pending Draw') { //pending draw fetches 25 most recent competitions with no winningTicketID yet
            setFilteredCompetitions('This section is coming soon! 3');
            handleActive(i);
            return;
        };

        //Winner Announced if winningticketId not null
        //Now live if closes is in the future.
        //Pending draw if closes is in the past & no winningticketID
    };

    return (
        <>
            <div className="products_filter_tabs">
                <ul className="tabs">
                    {
                        productsCategory.map((item, i) => (
                            <li
                                key={i}
                                className={`tabs_item ${activeClass(i)}`}
                                onClick={() => handleProducts(item, i)}
                            >
                                {item}
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="wrapper products_wrapper">
                {
                    filteredCompetitions === null ? (
                        <div className="card products_card browse_card loading_card">
                                <div className="tp_loader_container">
                                <PulseLoader color="#a9afc3" className="tp_pulse_loader" />
                            </div>
                        </div>
                    ) : typeof filteredCompetitions === 'string' ? (
                        <div className="card products_card browse_card">
                            <p className="comp_placeholder">{filteredCompetitions}</p>
                        </div>
                    ) : (
                        filteredCompetitions.slice(0, 22).map(item => (
                            <ProductCard
                                key={item.id}
                                {...item}
                            />
                        ))
                    )
                }
                <div className="card products_card browse_card">
                    <Link to="/competitions">
                        Browse All <br /> Competitions <BsArrowRight />
                    </Link>
                </div>
            </div>
        </>
    );
};

export default TopProducts;