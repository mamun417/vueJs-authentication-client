module.exports = {
    // options...
    publicPath: process.env.NODE_ENV === 'production'
        ? 'production-path'
        : '/',
}
