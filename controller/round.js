const participantModel = require('../models/participant.model')
const groupModel = require('../models/group.model');
const roundModel = require('../models/round.model');
// start the game 
// for (let i = 0; i < 3; i++) {
  
  
// }
// setTimeout(myFunction, 3000);
function startRound(req, res) {
  roundModel.roundModel.findById(req.body.idround).then((round) => {
    let question = round.questions[1]
        res.json(question);
      // setTimeout(() => {
      //   res.json(question);
      // }, 1)
    })
  }





  
module.exports = {
  startRound
};