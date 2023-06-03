// entry point for backend
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// const { UserModel } = require('./models/user');
// const { auth } = require('./middleware/auth');

const config = require('./config/key');

const port = process.env.PORT || config.PORT;
const uri = config.MONGODB_URI;

// connecting to mongodb
mongoose.connect(uri, {
    useNewUrlParser: true
}).then(() => console.log('MONGDB connected!')).catch(err => console.error(err))

// creating server
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/user'))

// // route and link
// app.get('/', (req, res) => {
//     res.json({ "Hello": "I am happy to deploy our application" })
// })


app.listen(port, () => {
    console.log(`Backend is running on port ${port}`)
});

module.exports = app