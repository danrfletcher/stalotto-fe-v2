//200
export const featuredCompetitionDataQuery = `
{
	products(filter: { feature_this_competition: { eq: "1" } }) {
	  items {
		id
			  name
			  thumbnail {
				  url
			  }
			  ... on VirtualProduct {
				  original_price
				  competition_closes_on
				  starting_ticket_qtd
				  creator
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

//200(400)
// export const featuredCompetitionDataQuery = `
// {
//   products(filter: { feature_this_competition: { eq: "1" } }) {
//     items {
//       id
// 			name
// 			thumbnail {
// 				url
// 			}
// 			... on VirtualProduct {
// 				original_price
// 				competition_closes_on
// 				starting_ticket_qtd
// 			}
// 			price_range {
// 				minimum_price {
//           final_price {
//             value
//             currency
//           }
//         }
// 			}
// 			invalid_prop
//     }
//   }
// }
// `;

//500(400)
// export const featuredCompetitionDataQuery = `
// {
//   products(filter: { feature_this_competition: { eq: "1" } }) {
//     items {
//       id
// 			name
// 			thumbnail {
// 				url
// 			}
// 			... on InvalidProduct {
// 				original_price
// 				competition_closes_on
// 				starting_ticket_qtd
// 			}
// 			price_range {
// 				minimum_price {
//           final_price {
//             value
//             currency
//           }
//         }
// 			}
//     }
//   }
// }
// `;


