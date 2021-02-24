const express = require('express');
const router = express.Router();
const admin = require('../controller/admin');
const verifyToken = require('../service/token.verify')
//log in admin
router.get('/', (req, res) => {
    admin.logInAdmin(req, res)
});
//verify account
router.put('/:mail', verifyToken, (res, req) => {
    admin.activateAccount(res, req)
})
//add question
router.post('/addQuestion', verifyToken, (res, req) => {
    admin.addQuestions(res, req)
})
// add gift 
router.post('/addgift', verifyToken, (res, req) => {
    admin.addgift(res, req)
})
module.exports = router;