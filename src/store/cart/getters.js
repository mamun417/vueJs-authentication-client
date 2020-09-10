export function products(state) {
    return state.products
}

export function cartProducts(state) {
    return state.cartProducts.map(({id, quantity}) => {
        const product = state.products.find(p => p.id === id)

        return {
            ...product,
            quantity
        }
    })
}