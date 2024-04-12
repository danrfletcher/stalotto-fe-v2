export const getCustomerCartFromTokenQuery = () => {
    return `
        query {
            customerCart {
                id
                items {
                    product {
                        uid
                        sku
                        name
                    }
                    quantity
                }
            }
        }      
    `
}

export const getCustomerCartFromIdQuery =  `
    query getCartDetails($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            items {
                product {
                    uid
                    sku
                    name
                }
                quantity
            }
        }
    }      
`