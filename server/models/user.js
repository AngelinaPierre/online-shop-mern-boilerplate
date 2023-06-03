const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10; // qtd of characters

const userSchema = new mongoose.Schema({
    name: { type: String, maxLength: 50 },
    lastname: { type: String, maxLength: 50 },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, minLength: 5 },
    role: {
        type: Number,
        default: 0
    },
    token: { type: String },
    tokenExpiration: { type: Number }
})

// function to hash password
userSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) {
                return next(err);
            } else {
                bcrypt.hash(user.password, salt, function (err, hash) {
                    if (err) {
                        return next(err);
                    } else {
                        user.password = hash;
                        next();
                    }
                })
            }
        })
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function (plainPassword, callback) {
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) {
            return callback(err);
        } else {
            return callback(null, isMatch);
        }
    })
};

userSchema.methods.generateToken = function (callback) {
    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'secret')
    user.token = token;

    user.save().then(res => callback(null, res)).catch(err => callback(err))

}

userSchema.statics.findByToken = function (token, callback) {
    var user = this;
    // decoding the token
    jwt.verify(token, 'secret', function (err, decode) { // decode = user._id
        user.findOne({
            "_id": decode,
            "token": token
        }).then(user => {
            callback(null, user)
        }).catch(err => callback(err))
    })
}


const UserModel = mongoose.model('Users', userSchema);
module.exports = { UserModel }