const roundModel = require("../models/round.model");
const groupModel = require('../models/group.model');
const questionModel = require('../models/question.model')
const giftModel = require('../models/gift.model')
const random = require('mongoose-simple-random');
// genarate 15 questins
let gift, questions
async function genarater() {

    await questionModel.questionModel.findRandom({}, {

        }, {
            limit: 3
        },
        function (err, data) {
            if (err) console.log(err);
            else {
                questions = data;
                questionsfunction();
            }
        });
    await giftModel.giftModel.findOneRandom(function (err, data) {
        console.log(data);
        gift = data;
        giftfunction();
    })
}

function questionsfunction() {
    return questions;
}

function giftfunction() {
    return gift;
}

// check if there is a group of 4 participant in the database 
async function createround() {
    
    setInterval(async function createround() {
        groupModel.groupModel.findOne({
            "participants.3": {
                "$exists": true
            },
            "used": false
        }).then( async (group) => {
            if (group === null) {
                console.log("there's no full group in the database");

            } else {
                await genarater()
                let round = {
                    group: group,
                    questions: questionsfunction(),
                    gift: giftfunction(),
                }
                roundModel.roundModel.create(round).then(async () => {
                    await groupModel.groupModel.findByIdAndUpdate(group._id, {
                        used: true
                    })
                    console.log(group._id)
                })
                console.log("round created")
            }
        })
    }, 9000);
}
module.exports = {
    createround,
    genarater
};