const participantModel = require('../models/participant.model')
const groupModel = require('../models/group.model')
const crypto = require('crypto');
const {
    error
} = require('console');
//log in  participant
function logInparticipant(req, res) {
    participant.findOne({
        email: `${req.body.email}`,
        password: `${req.body.password}`
    }).then((admin) => {
        if (admin === null) {
            res.json({
                "message": " Email or password incorect"
            })
        } else
            res.json(admin)
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
        res.json(result)
    }).catch((error) => {
        res.json(error)
    })
}
// create a groupe
async function createGroup(req, res) {
    let groupCreature = await participantModel.participantModel.findById(req.params.participantId)
    let group = {
        participants: groupCreature,
        used: false,
        codegroup: crypto.randomBytes(4).toString('hex')
    };
    groupModel.groupModel.create(group).then(res.json({
        "message": ` group created by ${groupCreature.fullName}`
    })).catch(error => {
        res.json({
            "error": error
        })
    })
}
// join a group 
async function joinGroup(req, res) {
    let groupjoiner = await participantModel.participantModel.findById(req.body.participantId)
    groupModel.groupModel.findOneAndUpdate({
        "codegroup": req.body.codegroup
    }, {
        $push: {
            participants: groupjoiner
        }
    }).then(res.json({
        "message": ` ${groupjoiner.fullName} join the group`
    }))
}
module.exports = {
    logInparticipant,
    signUpParticipant,
    createGroup,
    joinGroup
}