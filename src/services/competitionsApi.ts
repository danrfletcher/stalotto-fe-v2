import axios from 'axios';
import { featuredCompetitionDataQuery } from './competitionsQueries';

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const getFeaturedCompetitionData = async () => {
    let competitionsInventoryData;
    const competitionsData = await axios.post(`${baseURL}/graphql`, {
        featuredCompetitionDataQuery
    });
    console.log("⚡ ~ competitionsData:", competitionsData.data)
}

