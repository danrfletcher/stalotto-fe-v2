import axios, { AxiosError } from 'axios';
import { featuredCompetitionDataQuery } from './competitionsQueries';

const baseURL = import.meta.env.VITE_API_BASE_URL;

interface FeaturedCompetition {
    id: number;
    thumbnail: string;
    title: string;
    finalPrice: number;
    originalPrice: number;
    totalTickets: number;
    ticketsRemaining: number;
    closes: Date;
}

class GraphQLError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "GraphQLError";
    }
  }

export const getFeaturedCompetitionData = async (): Promise<FeaturedCompetition[] | string> => {
    try {
        const response = await axios.post(`${baseURL}/graphql`, {
          query: featuredCompetitionDataQuery,
        });
    
        if (response.data.errors) {
            throw new GraphQLError("GraphQL error");
        }
    
        const items = response.data.data.products.items;
        if (items.length === 0) {
          return "No featured competitions at the moment!";
        }
        return items;
    } catch (err: unknown) {
        let axiosError = err as AxiosError;

    if (err instanceof GraphQLError) {
      return "Request malformed. We're having trouble fetching featured competitions. Try reloading your browser or clearing the browser cache.";
    } else if (axios.isAxiosError(axiosError)) {
      if (axiosError.response?.status === 500 && axiosError.response.data.errors?.some((e: any) => e.extensions?.debugMessage?.includes("not declared in GraphQL schema"))) {
        return "Request malformed. We're having trouble fetching featured competitions. Try reloading your browser or clearing the browser cache.";
      }

      switch (axiosError.response?.status) {
        case 400:
          return "Request malformed. We're having trouble fetching featured competitions. Try reloading your browser or clearing the browser cache.";
        case 500:
          return "We're having trouble fetching featured competitions. Please try again later.";
        default:
          return "We're having trouble fetching featured competitions. Please try again later.";
      }
    } else {
      return "We're having trouble fetching featured competitions. Please try again later.";
    }
    }
};