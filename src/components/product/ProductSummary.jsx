import React from 'react';
import useActive from '../../hooks/useActive';
import CompetitionComments from './CompetitionComments';
import { PostComment } from './PostComment';


const ProductSummary = (props) => {

    const { title, info, category, type, connectivity, description, specifications, comments, totalComments } = props;

    const { active, handleActive, activeClass } = useActive('specs');
    return (
        <>
            <section id="product_summary" className="section">
                <div className="container">

                    {/*===== Product-Summary-Tabs =====*/}
                    <div className="prod_summary_tabs">
                        <ul className="tabs">
                            <li
                                className={`tabs_item ${activeClass('specs')}`}
                                onClick={() => handleActive('specs')}
                            >
                                Specifications
                            </li>
                            <li
                                className={`tabs_item ${activeClass('overview')}`}
                                onClick={() => handleActive('overview')}
                            >
                                Overview
                            </li>
                            <li
                                className={`tabs_item ${activeClass('reviews')}`}
                                onClick={() => handleActive('reviews')}
                            >
                                Comments
                            </li>
                        </ul>
                    </div>

                    {/*===== Product-Summary-Details =====*/}
                    <div className="prod_summary_details">
                        {
                            active === 'specs' ? (
                                <div className="prod_specs">
                                    <ul>
                                        {specifications.map((specification) => {
                                            return (
                                                <li key={specification.specificationId}>
                                                    <span>{specification.text}</span>
                                                    <span>{specification.value}</span>
                                                </li>
                                            )
                                        })}
                                        <li>
                                            <span>Category</span>
                                            <span>{category}</span>
                                        </li>
                                    </ul>
                                </div>
                            ) : active === 'overview' ? (
                                <div className="prod_overview">
                                    {description}
                                </div>
                            ) : (
                                <div className="prod_reviews">
                                    <h3 className="no_of_comments">{totalComments > 0 ? `${totalComments} Comments` : `No Comments`}</h3>
                                    <ul>
                                        <PostComment buttonType="fixed" />
                                        {
                                            comments.map(item => (
                                                <CompetitionComments
                                                    key={item.commentId}
                                                    nestingLevel={0}
                                                    {...item}
                                                />
                                            ))
                                        }
                                    </ul>
                                </div>
                            )

                        }

                    </div>

                </div>
            </section>
        </>
    );
};

export default ProductSummary;