const mongoose = require("mongoose");
const participantModel = require("./participant.model");
const Schema = mongoose.Schema;
const group = new Schema({

    participants: {
        type: [participantModel.participant],
        required: false
    },
    codegroup: {
        type: String,
        required: true
    },
    used: {
        type: Boolean,
        required: true
    }

});
const groupModel = mongoose.model("group", group);
module.exports = {
    groupModel,
    group
}