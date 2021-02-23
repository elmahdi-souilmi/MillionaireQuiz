const adminModel = require('../models/admin.model')
const participant = require('../models/participant.model')
const questionModel = require('../models/question.model')
const giftModel = require('../models/gift.model')
//log in admin
function logInAdmin(req, res) {
    adminModel.findOne({
        phoneNumber: `${req.body.phoneNumber}`,
        password: `${req.body.password}`
    }).then((admin) => {
        if (admin === null) {
            res.json({
                "message": "login or password incorect"
            })
        } else 
        res.json(admin)
    }).catch((error) => {
        res.json(error)
    })
}
// validate participant account 
function activateAccount(req, res) {
    participant.findOneAndUpdate({
        email: req.params.mail
    }, {
        $set: {
            is_valid: true,
            age:32
        },
    }).then((succes) => {
      if (succes){
          res.json({"message":"the account activated !!"})
      }else
        res.json({
            "message": "something went wrong !!"
        })
    }).catch((error) => {
        res.json(error)
    })
}
// add questions
function addQuestions(req,res) {
    let question = {
        question: req.body.question,
        right_answer:req.body.right_answer,
        false_answer: req.body.false_answer,
        pionts: req.body.pionts
    };
    questionModel.questionModel.create(question).then((result) => {
            res.json(result)
    })
}
// add gift
function addgift(req, res) {
    let gift = {
        Name: req.body.Name,
        image: req.body.image,
    };
    giftModel.giftModel.create(gift).then((result) => {
        res.json(result)
    })
}
module.exports = {
    logInAdmin,
    activateAccount,
    addQuestions,
    addgift
};