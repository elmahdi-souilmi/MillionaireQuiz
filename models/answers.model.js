const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const answers = new Schema({
    idquestion:{
        type: String,
        required: true
    },
    reponse:{
        type: String,
        required: true
    }
})
const reponse = new Schema({
    idRound: {
        type: String,
        required: true
    },
    idparticipant: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true,
    },
    answers:{
        type: [answers]

    }
});
const reponseModel = mongoose.model("reponse", reponse);
// let carda = {

//     idRound: "idRound1",
//     idparticipant: "idparticipant1",
//      time: 10
//     answers: [{"idquestion":"idquestion1","reponse":"repons1" }]
// };
// adminModel.create(carda)
module.exports = reponseModel;