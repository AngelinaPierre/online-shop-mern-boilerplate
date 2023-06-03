// entry point for backend
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { UserModel } = require('../models/user');
const { auth } = require('../middleware/auth');

const config = require('../config/key');

const port = process.env.PORT || config.PORT;
const uri = config.MONGODB_URI;

// connecting to mongodb
mongoose.connect(uri, {
    useNewUrlParser: true
}).then(() => console.log('MONGDB connected!')).catch(err => console.error(err))

// creating server
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// route and link
app.get('/', (req, res) => {
    res.json({ "Hello": "I am happy to deploy our application" })
})



// user register routing
app.post('/api/users/register', (req, res) => {
    // req  = json, use bodyParser to be able to read.
    const user = new UserModel(req.body); // creating a user using mongodb info retrived from the client

    // pre save code in (user.js)

    user.save().then((doc) => {
        return res.status(200).json({
            success: true,
            userData: doc
        })
    }).catch((err) => {
        return res.json({ success: false, err });
    })
})

// Login authentication routing
app.get('/api/users/auth', auth, (req, res) => {
    res.status(200).json({
        _id: req._id,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role
    })
})


// login routing
app.post('/api/users/login', (req, res) => {
    // find email in database

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
})

// logout routing = using token
app.get('/api/users/logout', auth, (req, res) => {
    // find specific logged user id

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
})


app.listen(port, () => {
    console.log(`Backend is running on port ${port}`)
});

module.exports = app