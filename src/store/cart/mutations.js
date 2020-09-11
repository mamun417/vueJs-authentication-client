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

export function updateQuantity(state, payload) {
    let id = payload.id
    let updateType = payload.type
    let findProduct = state.cartProducts.find(p => p.id === id)

    if (findProduct) {
        if (updateType === 'down' && findProduct.quantity === 1) {
            return
        }

        updateType === 'up' ? findProduct.quantity++ : findProduct.quantity--
    }
}
