import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import useActive from '../../hooks/useActive';
import competitionsData from '../../data/competitionData';
import ProductCard from './ProductCard';
import commonContext from '../../contexts/common/commonContext';


const TopProducts = () => {

    const { setCurrentHash, currentHash } = useContext(commonContext);
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

    // handle smooth scrolling to elements on the page
    useEffect(() => {
        console.log("currentHash:", currentHash.slice(1));
        if (currentHash.startsWith('#comp-')) {
            const hashCategory = currentHash.replace('#comp-', '').toLowerCase();
            const encodedProductsCategory = productsCategory.map(category => category.toLowerCase().split(' ').join('-'));
            
            if (encodedProductsCategory.includes(hashCategory)) {
                const categoryIndex = encodedProductsCategory.indexOf(hashCategory);
                handleActive(categoryIndex); // Activate the relevant competition tab
                const decodedCategory = productsCategory[categoryIndex]; 
                setProducts(competitionsData.filter(item => item.state === decodedCategory)); // Set the correct products

                //handleProducts(decodedCategory, categoryIndex);

                document.getElementById('comp')?.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        } else if (currentHash.length === 0) {
            document.body?.scrollIntoView({
                behavior: 'smooth'
              });
        } else {
            document.getElementById(currentHash.slice(1))?.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }, [currentHash]);

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