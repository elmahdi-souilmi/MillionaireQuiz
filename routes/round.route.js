const express = require('express');
const router = express.Router();
const round = require('../controller/round')
router.get('/', (req,res) => {
    round.startRound(req, res)
});
module.exports = router;