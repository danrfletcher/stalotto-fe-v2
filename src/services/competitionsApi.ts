import axios, { AxiosError } from 'axios';
import {
    competitionFilters,
    getCompetitionGraphQLQuery,
} from './competitionsQueries';

const baseURL = import.meta.env.VITE_API_BASE_URL;

interface ProductImage {
    src: string;
    label: string;
}

export interface Competition {
    id: string; //uid
    sku: number;
    urlKey: string;
    thumbnail: ProductImage;
    images?: ProductImage[];
    title: string;
    finalPrice: number;
    originalPrice: number;
    totalTickets: number;
    ticketsRemaining: number;
    closes: Date;
    creator: string;
    winningTicketIDs;
}

export class GraphQLError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'GraphQLError';
    }
}

type tag = 'featured' | 'none';

export interface CompetitionFilters {
    tag?: tag;
    skus?: string[] | null;
    baseFilter?: string;
    pageSize?: number | null;
    currentPage?: number | null;
}

export const getFilteredCompetitionData = async ({
    tag = 'none',
    skus = null,
    pageSize,
    currentPage,
}: CompetitionFilters = {}): Promise<Competition[] | string> => {
    const noContent = `No ${
        tag === 'featured' ? 'featured' : ''
    }competitions at the moment!`;
    const badRequest = `We're having trouble fetching ${
        tag === 'featured' ? 'featured ' : ''
    }competitions. Try reloading your browser or clearing the browser cache.`;
    const serverError = `We're having trouble fetching ${
        tag === 'featured' ? 'featured ' : ''
    }competitions. Please try again later.`;

    const getQuery = (): string | undefined => {
        switch (tag) {
            case 'featured':
                return getCompetitionGraphQLQuery({
                    baseFilter: competitionFilters.featured,
                });
            default:
                return getCompetitionGraphQLQuery({
                    pageSize: pageSize ? pageSize : null,
                    currentPage: currentPage ? currentPage : null,
                    skus: skus ? skus : null,
                });
        }
    };

    try {
        const response = await axios.post(`${baseURL}/graphql`, {
            query: getQuery(),
        });

        if (response.data.errors) {
            throw new GraphQLError('GraphQL error');
        }
        const items = response.data.data.products.items.map(item => {
            const result: Competition = {
                id: item.uid,
                sku: item.sku,
                urlKey: item.url_key,
                title: item.name,
                finalPrice: item.price_range.minimum_price.final_price.value,
                originalPrice: item.original_price,
                totalTickets: item.starting_ticket_qtd,
                ticketsRemaining: item.only_x_left_in_stock,
                closes: new Date(item.competition_closes_on),
                creator: item.creator,
                thumbnail: {
                    src: item.thumbnail.url,
                    label: item.thumbnail.label,
                },
                winningTicketIDs: (function () {
                    if (item.winning_ticket_ids) {
                        let idList: string[] = [];
                        item.winning_ticket_ids
                            .split(',')
                            .forEach(ticketId => idList.push(ticketId));
                        return idList;
                    }
                })(),
            };

            if (tag === 'none') {
                result.images = (function () {
                    return item.media_gallery_entries.map(image => {
                        return {
                            src: `${baseURL}/pub/media/catalog/product${image.file}`,
                            label: image.label,
                        };
                    });
                })();
            }

            return result;
        });

        if (items.length === 0) {
            return noContent;
        }
        return items;
    } catch (err: unknown) {
        let axiosError = err as AxiosError<any>;

        if (err instanceof GraphQLError) {
            return badRequest;
        } else if (axios.isAxiosError(axiosError)) {
            const errors = axiosError.response?.data?.errors;

            if (
                axiosError.response?.status === 500 &&
                errors?.some((e: any) =>
                    e.extensions?.debugMessage?.includes(
                        'not declared in GraphQL schema',
                    ),
                )
            ) {
                return badRequest;
            }

            switch (axiosError.response?.status) {
                case 400:
                    return badRequest;
                case 500:
                    return serverError;
                default:
                    return serverError;
            }
        } else {
            return serverError;
        }
    }
};