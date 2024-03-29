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

    this._vm.$setLocalStorage(state.cartKey, state.cartProducts)
}

export function removeCart(state, index) {
    Vue.delete(state.cartProducts, index)
    this._vm.$setLocalStorage(state.cartKey, state.cartProducts)

    if (!state.cartProducts.length) {
        this.commit('cart/removePromoCode')
    }
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

    this._vm.$setLocalStorage(state.cartKey, state.cartProducts)
}

export function empty(state) {
    state.cartProducts = [];
    this._vm.$setLocalStorage(state.cartKey, state.cartProducts)

    this.commit('cart/removePromoCode')
}

export function applyPromoCode(state, payload) {
    if (state.promotionCode.code) {
        this._vm.$errorToast('Promotion already applied!');
        return
    }

    state.promotionCode.code = payload.promotionCode
    this._vm.$setLocalStorage('promotionInfo', state.promotionCode)

    this._vm.$successToast('Promotion has been applied!');
}

export function removePromoCode(state) {
    state.promotionCode.code = null;
    this._vm.$setLocalStorage('promotionInfo', state.promotionCode)
}
