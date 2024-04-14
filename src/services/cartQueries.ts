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
