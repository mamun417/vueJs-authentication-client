export function isLoggedIn(state) {
    return !!state.token
}

export function token(state) {
    return state.token;
}

export function user(state) {
    return state.user;
}

export function tokenRefreshing(state) {
    return state.tokenRefreshing;
}
