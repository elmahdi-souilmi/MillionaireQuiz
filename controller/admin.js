const adminModel = require('../models/admin.model')
const participant = require('../models/participant.model')
const questionModel = require('../models/question.model')
const giftModel = require('../models/gift.model')
const jwt = require('jsonwebtoken')
const logger = require('../config/logger')
require('dotenv').config();
//log in admin
function logInAdmin(req, res) {

    adminModel.findOne({
        phoneNumber: `${req.body.phoneNumber}`,
        password: `${req.body.password}`
    }).then((Admin) => {
        if (Admin != null) {
            let token = jwt.sign({
                phoneNumber: Admin.phoneNumber,
                password: Admin.password
            }, process.env.ADMINAPISECRET, {
                expiresIn: process.env.JWTTIMEOUT
            })

            logger.info('admin with phone number: ' + Admin.phoneNumber + ' logged in');
            res.json({
                "token": token
            })
        } else {
            logger.error('addmin with phone number: ' + req.body.phoneNumber + ' not found');
            res.json({

                "message": "user not found"
            })
        }
    }).catch((error) => {
        res.json(error)
    })
}
// validate participant account 
function activateAccount(req, res) {
    jwt.verify(req.token, process.env.ADMINAPISECRET, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            participant.findOneAndUpdate({
                email: req.params.mail
            }, {
                $set: {
                    is_valid: true
                },
            }).then((succes) => {
                if (succes) {
                    logger.info('account activated');
                    res.json({
                        "message": " The account activated !!",
                        "fortest": authData
                    })
                } else {
                    logger.info('account not activated');
                    res.json({
                        "message": "Something went wrong !!"

                    })
                }
            }).catch((error) => {
                res.json(error)
            })
        }
    })

}
// add questions
function addQuestions(req, res) {
    jwt.verify(req.token, process.env.ADMINAPISECRET, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            let question = {
                question: req.body.question,
                right_answer: req.body.right_answer,
                false_answer: req.body.false_answer,
                pionts: req.body.pionts
            };
            questionModel.questionModel.create(question).then((result) => {
                logger.info('question added');
                res.json(result)
            })
        }
    })

}
// add gift
function addgift(req, res) {
    jwt.verify(req.token, process.env.ADMINAPISECRET, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            let gift = {
                Name: req.body.Name,
                image: req.body.image,
            };
            giftModel.giftModel.create(gift).then((gift) => {
                logger.info('gift added');
                res.json({
                    "gift added": gift,
                    "fortest": authData
                })
            })
        }
    })

}
module.exports = {
    logInAdmin,
    activateAccount,
    addQuestions,
    addgift
};