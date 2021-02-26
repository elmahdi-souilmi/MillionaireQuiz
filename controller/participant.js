const participantModel = require('../models/participant.model')
const groupModel = require('../models/group.model')
const crypto = require('crypto');
const jwt = require('jsonwebtoken')
const sendSms = require('../service/sendSms')
const sendmail = require('../service/sendMail')
require('dotenv').config();
console.log(process.env.PARTICIPANTSECRET);
//log in participant
function logInparticipant(req, res) {
    participantModel.participantModel.findOne({
        email: `${req.body.email}`,
        password: `${req.body.password}`
    }).then((participant) => {
        if (participant != null) {
            let token = jwt.sign({
                name: participant.email,
                password: participant.password
            }, process.env.PARTICIPANTSECRET, {
                expiresIn: process.env.JWTTIMEOUT
            })
            logger.info('participant with the email: ' + participant.email + 'just logged in');
            res.json({
                "token": token
            })
        } else {
            res.json({
                "message": "user not found"
            })
        }
    }).catch((error) => {
        res.json(error)
    })
}
//sign up participant
function signUpParticipant(req, res) {
    let Participant = {
        fullName: req.body.fullName,
        age: req.body.age,
        is_valid: false,
        phone: req.body.phone,
        email: req.body.email,
        online: true,
        password: req.body.password,
        points: 0
    };
    participantModel.participantModel.create(Participant).then((result) => {
        // call sms sender 
        sendSms(result.fullName);

        //call email sender
        sendmail(result.fullName)
        res.json({"message":"user created"})
    }).catch((error) => {
        res.json(error, {
            "message": "created did not created"
        })
    })
}
// create a groupe
async function createGroup(req, res) {
    jwt.verify(req.token, process.env.PARTICIPANTSECRET, async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            let groupCreature = await participantModel.participantModel.findById(req.params.participantId)
            let group = {
                participants: groupCreature,
                used: false,
                codegroup: crypto.randomBytes(4).toString('hex')
            };
            groupModel.groupModel.create(group).then(res.json({
                "message": ` group created by ${groupCreature.fullName}`,
                "authon": authData
            })).catch(error => {
                res.json({
                    "error": error
                })
            })
        }
    })

}
// join a group 
async function joinGroup(req, res) {
    jwt.verify(req.token, process.env.PARTICIPANTSECRET, async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            let groupjoiner = await participantModel.participantModel.findById(req.body.participantId)
            groupModel.groupModel.findOneAndUpdate({
                "codegroup": req.body.codegroup
            }, {
                $push: {
                    participants: groupjoiner
                }
            }).then(res.json({
                "message": ` ${groupjoiner.fullName} join the group`,
                "just for test": authData

            }))
        }
    })

}
module.exports = {
    logInparticipant,
    signUpParticipant,
    createGroup,
    joinGroup
}