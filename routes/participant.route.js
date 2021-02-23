const express = require('express');
const router = express.Router();
const Participant = require('../controller/participant');
//log in paricipant
router.get('/', (req, res) => {
    Participant.logInparticipant(req, res)
});
//sign up  paricipant  
router.post('/', (req, res) => {
    Participant.signUpParticipant(req, res)
});
//create group
router.post('/:participantId', (req, res) => {
    Participant.createGroup(req, res)
});
//join group 
router.put('/', (req, res) => {
    Participant.joinGroup(req, res)
});
module.exports = router;