import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import useActive from '../../hooks/useActive';
import competitionsData from '../../data/competitionData';
import ProductCard from './ProductCard';


const TopProducts = () => {

    const [products, setProducts] = useState(competitionsData);
    const { activeClass, handleActive } = useActive(0);

    // making a unique set of product's category
    const productsCategory = [
        'Latest',
        ...new Set(competitionsData.map(item => item.state))
    ];

    // handling product's filtering
    const handleProducts = (category, i) => {
        if (category === 'Latest') {
            setProducts(competitionsData);
            handleActive(i);
            return;
        }

        const filteredProducts = competitionsData.filter(item => item.state === category);
        setProducts(filteredProducts);
        handleActive(i);
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
                    products.slice(0, 11).map(item => (
                        <ProductCard
                            key={item.id}
                            {...item}
                        />
                    ))
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