const express = require('express');
const router = express.Router();
const round = require('../controller/round')
//get all the ids of questions in the round by passing idRound
router.get('/', (req,res) => {
    round.startRound(req, res)   
});
// get question by idQuestion
router.get('/question', (req, res) => {
    round.showQuestion(req, res)
});
// create answers collection by passing idParticipant and idround 
router.post('/reponse', (req, res) => {
    round.saveanswer(req, res)
});
// push an answers to answers collection by passing idQuestion answer
router.put('/reponse', (req, res) => {
    round.pushanswer(req, res)
});
// update the participant pionts
router.put('/pionts', (req, res) => {
    round.updatepionts(req, res)
});

module.exports = router;