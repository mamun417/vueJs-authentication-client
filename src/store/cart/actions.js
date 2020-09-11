export function addToCart(context, id) {
    context.commit('addToCart', id)
}

export function removeCart(context, index) {
    context.commit('removeCart', index)
}
