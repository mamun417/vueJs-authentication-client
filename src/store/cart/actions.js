export function addToCart(context, id) {
    context.commit('addToCart', id)
}

export function removeCart(context, index) {
    context.commit('removeCart', index)
}

export function updateQuantity(context, payload) {
    context.commit('updateQuantity', payload)
}

export function empty(context) {
    context.commit('empty')
}
