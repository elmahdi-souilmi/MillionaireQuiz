const express = require('express');
const router = express.Router();
const admin = require('../controller/admin');
//log in admin
router.get('/', (req, res) => {
    admin.logInAdmin(req, res)
});
//verify account
router.put('/:mail',(res, req)=>{
    admin.activateAccount(res,req)
})
//add question
router.post('/addQuestion', (res, req) => {
    admin.addQuestions(res, req)
})
// add gift 
router.post('/addgift', (res, req) => {
    admin.addgift(res, req)
})
module.exports = router;