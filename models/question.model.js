const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const random = require('mongoose-simple-random');
const question = new Schema({
    question: {
        type: String,
        required: true,
    },
    right_answer: {
        type: String,
        required: true,
    },
    false_answer: {
        type: [String],
        required: true,
    },
    pionts: {
        type: Number,
        required: true,
    },

});
question.plugin(random);
const questionModel = mongoose.model("question", question);
module.exports = {
        questionModel,
        question,
}