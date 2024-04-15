import axios from 'axios';
import { getStaticPageQuery } from './staticPageQueries';
import { StaticPageDataClass } from '../models/staticPages';

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const getStaticPage = async (pageIdentifier): Promise<StaticPageDataClass | Error> => {
    try {
        const page = await axios.post(`${baseURL}/graphql`, {
            query: getStaticPageQuery,
            variables: {
                id: pageIdentifier,
            },
        });
        if (page.data.data.cmsPage) {
            const data = page.data.data.cmsPage;
            return new StaticPageDataClass({
                identifier: data.identifier,
                urlKey: data.url_key,
                title: data.title,
                innerHtml: data.content,
                metaTitle: data.meta_title,
                metaDescription: data.meta_description,
                metaKeywords: data.meta_keywords,
            });
        } else {
            throw new Error('Error fetching static page from the server');
        }
    } catch (err) {
        throw err;
    }
};
