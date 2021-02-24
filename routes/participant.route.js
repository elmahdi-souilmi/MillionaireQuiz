const express = require('express');
const router = express.Router();
const Participant = require('../controller/participant');
const verifyToken = require('../service/token.verify')

//log in paricipant
router.get('/', (req, res) => {
    Participant.logInparticipant(req, res)
});
//sign up paricipant  
router.post('/', (req, res) => {
    Participant.signUpParticipant(req, res)
});
//create group
router.post('/:participantId', verifyToken,(req, res) => {
    Participant.createGroup(req, res)
});
//join group 
router.put('/', verifyToken, (req, res) => {
    Participant.joinGroup(req, res)
});
module.exports = router;