export const getCustomerCartFromIdQuery = `
query getCartDetails($cartId: String!) {
  cart(cart_id: $cartId) {
    id
    items {
        uid
        product {
            sku
            uid
            url_key
            name
            thumbnail {
                url
            }
            media_gallery_entries {
                label
                file
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
      quantity
    }
  }
}    
`;

export const createAnonymousCartQuery = `
    mutation {
        createEmptyCart
    }  
`;

export const setQtdCartItemQuery = (cartItemUid, qtd) => {
    return `
        mutation {
            updateCartItems(
            input: {
                cart_id: "${localStorage.cartId}",
                cart_items: [
                    {
                        cart_item_uid: "${cartItemUid}",
                        quantity: ${qtd}  
                    }
                ]
            }
            ) {
                cart {
                    items {
                        uid
                        product {
                            uid
                            name
                            sku
                        }
                        quantity
                    }
                }
            }
        }      
    `;
};

export const addProductToCartQuery = (sku: string, qtd: number) => {
    return `
        mutation {
            addProductsToCart(
                cartId: "${localStorage.cartId}",
                cartItems: [
                    {
                        quantity: ${qtd},
                        sku: "${sku}",
                    }
                ]
            ) {
                cart {
                items {
                    quantity
                    uid
                    product {
                        only_x_left_in_stock
                        name
                        sku
                        url_key
                        uid
                        media_gallery {
                            label
                            url
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
                    }
                  }
                }
            }
        }
    `;
};

export const getCartTotalQuery = `
    query GetCartDetails($cartId: String!) {
            cart(cart_id: $cartId) {
                    prices {
                            grand_total {
                                    value
                                    currency
                            }
                    }
            }
    }
`;

export const saveAddressQuery = `
    mutation CreateCustomerAddress(
    $firstName: String!, 
    $lastName: String!, 
    $street: [String!]!,
    $city: String!, 
    $region: String!, 
    $postcode: String!, 
    $countryCode: CountryCodeEnum!, 
    $telephone: String!, 
    $defaultBilling: Boolean
    ) {
    createCustomerAddress(input: {
        firstname: $firstName,
        lastname: $lastName,
        street: $street
        city: $city,
        region: {
          region: $region,
        },
        postcode: $postcode,
        country_code: $countryCode,
        telephone: $telephone,
        default_shipping: $defaultBilling,
        default_billing: $defaultBilling
    }) {
        id
        firstname
        lastname
        street
        city
        region {
        region
        region_code
        }
        postcode
        country_code
        telephone
        default_shipping
        default_billing
    }
    }
`;

export const getSavedAddressesQuery = `
    query {
    customer {
        firstname
        lastname
        addresses {
        id
        firstname
        lastname
        street
        city
        region {
            region
            region_code
        }
        postcode
        country_code
        telephone
        default_shipping
        default_billing
        }
    }
    }
`;
