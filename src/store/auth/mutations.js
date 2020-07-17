export function authSuccess(state, userInfo) {
    localStorage.setItem('token', userInfo.access_token);
    localStorage.setItem('user', JSON.stringify(userInfo.user));

    state.token = userInfo.access_token;
    state.user = userInfo.user;
}

export function authOut(state) {
    localStorage.clear();

    state.token = '';
    state.user = {};
}
