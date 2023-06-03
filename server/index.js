// entry point for backend
const express = require('express');
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// const { UserModel } = require('./models/user');
// const { auth } = require('./middleware/auth');

const config = require('./config/key');

const port = process.env.PORT || config.PORT;
const uri = process.env.MONGODB_URI || config.MONGODB_URI;
const app = express();
// creating server
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/user'))

const server = http.createServer(app);
// connecting to mongodb
mongoose.connect(uri, {
    useNewUrlParser: true
}).then(() => {
    console.log('MONGDB connected!');
    server.listen(port, port, () => {
        console.log(`Backend is running on port ${port}`)
    })
}).catch(err => console.error(err))


// // route and link
// app.get('/', (req, res) => {
//     res.json({ "Hello": "I am happy to deploy our application" })
// })



// app.listen(port, () => {
//     console.log(`Backend is running on port ${port}`)
// });

module.exports = app