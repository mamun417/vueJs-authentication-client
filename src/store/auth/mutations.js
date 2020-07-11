export function storeUser(state, userInfo) {
    localStorage.setItem('token', userInfo.access_token);
    localStorage.setItem('user', userInfo.user);

    state.token = userInfo.access_token;
    state.user = userInfo.user;
}
