const { UserModel } = require('../models/user');

let auth = (req, res, next) => {
    // token in cookie

    let token = req.cookies.x_auth;

    UserModel.findByToken(token, (err, user) => {
        if (err) {
            throw err;
        }
        if (!user) {
            return res.json({
                isAuth: false,
                error: true
            });
        }
        req.token = token;
        req.user = user;
        next();
    })
}

module.exports = { auth }