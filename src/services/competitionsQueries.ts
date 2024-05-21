import { CompetitionFilters } from './competitionsApi';

type sku = string;

export const competitionFilters = {
    featured: `feature_this_competition: { eq: "1" }`,
    setOfProducts: function (skus: sku[]) {
        return `sku: {in: ${JSON.stringify(skus)}}`;
    },
};

export const competitionSorts = {
    newestToOldest: `sort: { posted: DESC }`,
};

export const getCompetitionGraphQLQuery = ({
    baseFilter,
    pageSize,
    currentPage,
    skus,
}: CompetitionFilters): string => {
    if (skus) {
        baseFilter = competitionFilters.setOfProducts(skus);
    }

    const query = `
		{
			products(
				filter: { ${baseFilter ? baseFilter : ''} }
				${pageSize ? `pageSize: ${pageSize}` : ''}
				${currentPage ? `currentPage: ${currentPage}` : ''}
			) {
			items {
				uid
				sku
				url_key
					name
					thumbnail {
						url
						label
					}
					${
                        baseFilter === competitionFilters.featured
                            ? ``
                            : `
					media_gallery_entries {
						label
						file
					  }
					`
                    }
					... on VirtualProduct {
						original_price
						competition_closes_on
						starting_ticket_qtd
						creator
						winning_ticket_ids
					}
					price_range {
						minimum_price {
					final_price {
					value
					currency
					}
				}
					}
					only_x_left_in_stock
			}
			}
		}
	`;

    return query;
};
