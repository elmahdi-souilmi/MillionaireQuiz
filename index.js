const mongoose = require('mongoose');
const express = require('express');
//const cors = require("cors");
const app = express();
const dbConfig = require('./config/config');
const bodyParser = require('body-parser');


const admin = require('./routes/admin.route')
const participant = require('./routes/participant.route');
const round = require('./routes/round.route')
const createround = require('./service/round.services')
app.use(express.json())
//app.use(cors());
mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
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
createround.genarater()
createround.createround()
 
app.listen(2022, () => {
    console.log(`fastFood app listening at port: 2022`)
})