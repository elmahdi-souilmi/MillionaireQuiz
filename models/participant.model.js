const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const participant = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    is_valid: {
        type: Boolean,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    online: {
        type: Boolean,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    points: {
        type: Number,
        required: true,
    }
});
const participantModel = mongoose.model("participant", participant);
// let carda = {
//     fullName: "elmahdi souilmi",
//     age: 23,
//     is_valid: false,
//     phone: "0696235668",
//     email: "souilmi@elmahdi.com",
//     online: false,
//     password: "123456789",
//     points: 0
// };
// participantModel.create(carda)
module.exports ={
   participantModel,
   participant
} 