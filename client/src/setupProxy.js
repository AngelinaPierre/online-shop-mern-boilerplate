const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://online-shop-mern-boilerplate.vercel.app/',
            changeOrigin: true,
        })
    );
};