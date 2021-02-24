const express = require('express');
const router = express.Router();
const round = require('../controller/round')
//get all the id of question in the round
router.get('/', (req,res) => {
    round.startRound(req, res)   
});
// get question by id
router.get('/question', (req, res) => {
    round.showQuestion(req, res)
});
// save reponse  by user and id question 
router.post('/reponse', (req, res) => {
    round.saveanswer(req, res)
});
// check the winner 
router.put('/pionts', (req, res) => {
    round.updatepionts(req, res)
});
module.exports = router;