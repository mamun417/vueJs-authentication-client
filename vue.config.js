module.exports = {
    // options...
    publicPath: process.env.NODE_ENV === 'production'
        ? '/demo/vue-auth'
        : '/'
}
