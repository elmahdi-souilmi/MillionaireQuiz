const mongoose = require("mongoose");
const participant = require("./participant.model")
const group = require("./group.model")
const question = require("./question.model")
const gift = require("./gift.model")
const Schema = mongoose.Schema;
const round = new Schema({
    group: group.group,
    questions: [question.question],
    gift: gift.gift,
    winner: participant.participant
});
const roundModel = mongoose.model("round", round);
module.exports = {
    roundModel,
    round
};