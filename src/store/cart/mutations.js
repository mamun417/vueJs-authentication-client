import Vue from 'vue'

export function addToCart(state, id) {
    let findProduct = state.cartProducts.find(p => p.id === id)

    if (!findProduct) {
        state.cartProducts.push({
            id,
            quantity: 1
        })
    } else {
        findProduct.quantity++
    }
}

export function removeCart(state, index) {
    Vue.delete(state.cartProducts, index)
}
