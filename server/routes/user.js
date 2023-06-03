const express = require('express');
const router = express.Router();
const { UserModel } = require('../models/user');

const { auth } = require('../middleware/auth');

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
    });
});

router.post("/register", (req, res) => {

    const user = new UserModel(req.body);


    user.save().then((doc) => {
        return res.status(200).json({
            success: true,
            userData: doc
        })
    }).catch((err) => {
        return res.json({ success: false, err });
    })
});

router.post("/login", (req, res) => {

    UserModel.findOne({
        email: req.body.email
    }).then((user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: 'Auth failed, email not found'
            })
        } else {
            // confirm if password is the same has in the database
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (!isMatch) {
                    console.log("!ismatched")
                    return res.json({
                        loginSuccess: false,
                        message: 'Wrong Password'
                    })
                }

            });
            // generate token
            user.generateToken((err, user) => {
                if (err) {
                    return res.status(400).send(err);
                } else {
                    return res.cookie('x_auth', user.token).status(200).json({
                        loginSuccess: true,
                        userData: user
                    })
                }
            })
        }
    }).catch(err => {
        res.status(400).send(err)
    })
});

router.get("/logout", auth, (req, res) => {
    UserModel.findByIdAndUpdate(
        { _id: req.user._id },
        { token: '' },
        { returnOriginal: false }
    ).then(doc => {
        return res.status(200).send({
            success: true,
            userData: doc
        })
    }).catch(err => {
        return res.status(400).json({
            success: false,
            err
        })
    })
});

module.exports = router;
