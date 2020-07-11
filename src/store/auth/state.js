export default function () {
    return {
        token: localStorage.getItem('token') || '',
        user: localStorage.getItem('user') ? localStorage.getItem('user') : {}
    }
}
