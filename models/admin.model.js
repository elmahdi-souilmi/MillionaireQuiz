const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const admin = new Schema({
    FullName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});
const adminModel = mongoose.model("admin", admin);
// let admin = {

//     FullName: "souilmi elmahdi",
//     phoneNumber: "0696235668",
//     password: "123456789"
// };
// adminModel.create(admin)
module.exports = adminModel;