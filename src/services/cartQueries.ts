interface AddToCartItem {
    quantity: number;
    sku: string;
}

export const getCustomerCartFromTokenQuery = (): string => {
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

export const createAnonymousCartQuery = `
    mutation {
        createEmptyCart
    }  
`

export const addToCartQuery = (cartId: string, cartItems: AddToCartItem[]) => {
    const cartItemsString = cartItems.map(item => `{quantity: ${item.quantity}, sku: "${item.sku}"}`).join(", ");

    return `
        mutation {
            addProductsToCart(
            cartId: "${cartId}",
            cartItems: ${cartItemsString}
            ) {
            cart {
                items {
                uid
                product {
                    name
                    sku
                    uid
                }
                quantity
                }
            }
            }
        }
                
    `
}