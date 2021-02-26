const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();
//const cors = require("cors");
const app = express();
const bodyParser = require('body-parser');


const admin = require('./routes/admin.route')
const participant = require('./routes/participant.route');
const round = require('./routes/round.route')
const createround = require('./service/round.services')
app.use(express.json())
//app.use(cors());

mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log("mongodb connected.."));
app.use(bodyParser.urlencoded({
    extended: true,
    useUnifiedTopology: true
}));
//routes
app.use('/admin', admin);
app.use('/participant', participant);
app.use('/round', round)
createround.createround()
module.exports = app