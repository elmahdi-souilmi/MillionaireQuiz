const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const random = require('mongoose-simple-random');
const gift = new Schema({
    Name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },

});
gift.plugin(random)
const giftModel = mongoose.model("gift",gift);
module.exports ={
   giftModel,
   gift 
} 