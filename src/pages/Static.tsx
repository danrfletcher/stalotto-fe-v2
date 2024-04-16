import { useContext, useEffect, useState } from 'react';
import { BounceLoader, PulseLoader } from 'react-spinners';
import loadingContext from '../contexts/loading/loadingContext';
import { useParams } from 'react-router';
import { getStaticPage } from '../services/staticPageApi';
import { StaticPageDataFetchError } from '../data/errors';
import { StaticPageDataClass } from '../models/staticPages';
import { Helmet } from 'react-helmet-async';

const Static: React.FC = () => {
    //loading spinners
    const {
        isFirstLoad,
        toggleIsFirstLoad, //first load logic for loading spinner
    } = useContext(loadingContext);

    const [isStaticDataLoaded, setIsStaticDataLoaded] = useState<Boolean>(false);

    useEffect(() => {
        if (isStaticDataLoaded) toggleIsFirstLoad(); //toggle first load off, allowing page to load
    }, [isStaticDataLoaded]);

    //page data
    const { staticPageUrlKey } = useParams();

    const [pageContent, setPageContent] = useState<StaticPageDataClass | Error>(
        new StaticPageDataClass({
            identifier: '',
            urlKey: '',
            title: '',
            innerHtml: '',
            metaTitle: '',
            metaDescription: '',
            metaKeywords: '',
        })
    );

    const fetchStaticPageData = async () => {
        setIsStaticDataLoaded(false);
        try {
            const StaticPageData = await getStaticPage(staticPageUrlKey);
            setPageContent(StaticPageData);
        } catch (err) {
            console.error('Error fetching static page data: ', err);
            setPageContent(new StaticPageDataFetchError());
        }
        setIsStaticDataLoaded(true);
    };

    useEffect(() => {
        fetchStaticPageData();
    }, [staticPageUrlKey]);

    //fetching data & setting components as loaded
    return isFirstLoad ? (
        <div className="loading-spinner">
            <BounceLoader color="#a9afc3" />
        </div>
    ) : (
        <>
            <Helmet>
                <title>{`Stalotto | ${isStaticDataLoaded ? (pageContent instanceof StaticPageDataClass ? pageContent.title : 'Error Getting Data') : 'Info Page'}`}</title>
            </Helmet>
            <main className={isFirstLoad ? 'content-hidden' : 'content-visible'}>
                <section id="hero">
                    <div className="container">
                        {isStaticDataLoaded &&
                            (pageContent instanceof StaticPageDataClass ? (
                                <article className="static_content" dangerouslySetInnerHTML={{ __html: pageContent.innerHtml }}></article>
                            ) : (
                                <p>{pageContent.message}</p>
                            ))}
                        {!isStaticDataLoaded && <PulseLoader color="#a9afc3" className="static_pulse_loader" />}
                    </div>
                </section>
            </main>
        </>
    );
};

export default Static;
