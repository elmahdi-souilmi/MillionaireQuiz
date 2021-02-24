const participantModel = require('../models/participant.model')
const groupModel = require('../models/group.model');
const roundModel = require('../models/round.model');
const reponseModel = require('../models/answers.model')
// get the question ids 
function startRound(req, res) {
  roundModel.roundModel.findById(req.body.idround).then((round) => {
    let questions = [];
    round.questions.forEach(question => {
      console.log(question)
      questions.push(question._id)
    });
    res.json(questions);
  })
}
// show quetion by id 
function showQuestion(req, res) {
  roundModel.roundModel.findById(req.body.idround).then((round) => {
    let questionfinded;
    round.questions.forEach(question => {
      if (question._id == req.body.idquestion) {
        questionfinded = question
      }
    });
    res.json(questionfinded);
  })
}
// set the answers 
function saveanswer(req, res) {
  let answer = {
    idRound: req.body.idRound,
    idparticipant: req.body.idparticipant,
    time: req.body.time,
    answers: req.body.answers
  };
  reponseModel.create(answer).then(
    res.json({
      "message": "answer created"
    })
  )
}
// update the pionts 
async function updatepionts(req, res) {
  let rightQuestionArray = []
  let participantsArray = []
  let rightAnswers = await roundModel.roundModel.findById(req.body.idround).then((round) => {
    return round.questions
  })
  let participant = await roundModel.roundModel.findById(req.body.idround).then((round) => {
    return round.group.participants
  })
  for (let i = 0; i < rightAnswers.length; i++) {
    rightQuestionArray.push(rightAnswers[i].right_answer)
  }
  for (let i = 0; i < participant.length; i++) {
    participantsArray.push(participant[i]._id)
  }
  for (let i = 0; i < participantsArray.length; i++) {
    let score = 0;
    let participantansers = await reponseModel.findOne({
      idparticipant: "603045bafdb13f5ab440fd01",
      "idRound": req.body.idround
    }).then((answer)=>{
      return answer.answers;
      })
    for (let y = 0; y < participantansers.length; y++) {
      if (participantansers[y].reponse == rightQuestionArray[y]) {
        score += 10
      }
    }
    let round = await roundModel.roundModel.findById(req.body.idround).then((round) => {
     return round
     //.group.participants.find(participant => participant._id == "603045bafdb13f5ab440fd01")
    })
    round.group.participants.id("603045bafdb13f5ab440fd01").points = score
    //participant.points = score;
    await round.save(function (err) {
      // emmbeded comment with author updated     
    });

    //participant.save();
    console.log(participant)
  }

  //console.log(rightQuestionArray)
  res.json(participantsArray)
}

module.exports = {
  startRound,
  showQuestion,
  saveanswer,
  updatepionts
};