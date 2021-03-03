export function authSuccess(state, userInfo) {
    localStorage.setItem('token', userInfo.access_token);
    state.token = userInfo.access_token;

    localStorage.setItem('user', JSON.stringify(userInfo.user));
    //state.user = userInfo.user;
}

export function updateToken(state, token) {
    localStorage.setItem('token', token)
    state.token = token
}

export function authOut(state) {
    localStorage.clear();
    state.token = '';
    //state.user = {};
}
