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

export function cartTotal(state) {
    let total = 0

    state.cartProducts.forEach(({id, quantity}) => {
        const product = state.products.find(p => p.id === id)
        total += product.price * quantity
    })

    if (state.promotionCode.code) {
        total = total - total * (10 / 100)
    }

    return total.toFixed()
}

export function promotionInfo(state) {
    return state.promotionCode
}
