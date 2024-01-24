export const featuredCompetitionDataQuery = `
{
  products(filter: { feature_this_competition: { eq: "1" } }) {
    items {
      id
      sku
      name
      price_range {
        minimum_price {
          regular_price {
            value
            currency
          }
          final_price {
            value
            currency
          }
          discount {
            amount_off
            percent_off
          }
        }
      }
      image {
        url
        label
      }
      small_image {
        url
        label
      }
      thumbnail {
        url
        label
      }
      media_gallery_entries {
        file
        label
        position
        disabled
      }
      stock_status
      ... on ProductInterface {
        feature_this_competition
        competition_closes_on
      }
      ... on ConfigurableProduct {
        variants {
          product {
            sku
            stock_status
          }
        }
      }
    }
  }
}`;