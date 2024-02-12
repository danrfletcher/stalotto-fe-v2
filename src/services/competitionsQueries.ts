import { CompetitionFilters } from "./competitionsApi";

export const competitionFilters = {
	featured: `feature_this_competition: { eq: "1" }`,
	singleProduct: function(sku) {
		return `sku: { eq: "${sku}" }`
	},
};

export const competitionSorts = {
	newestToOldest: `sort: { posted: DESC }`
}

export const getCompetitionGraphQLQuery = ({baseFilter, pageSize, currentPage, sku}: CompetitionFilters): string => {
	if (sku) {
		baseFilter = competitionFilters.singleProduct(sku);
	}

	const query = `
		{
			products(
				filter: { ${baseFilter ? baseFilter : ""} }
				${pageSize ? `pageSize: ${pageSize}` : ""}
				${currentPage ? `currentPage: ${currentPage}` : ""}
			) {
			items {
				id
				sku
				url_key
					name
					thumbnail {
						url
						label
					}
					${baseFilter === competitionFilters.featured ? `` : (`
					media_gallery_entries {
						label
						file
					  }
					`)}
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
}
