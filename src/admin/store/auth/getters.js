export function isLoggedIn(state) {
    return !!state.token
}

export function token(state) {
    return state.token;
}
