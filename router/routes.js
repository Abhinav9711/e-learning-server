const express = require('express');
const router = express.Router();

const { createUser, loginUser, getCourse, 
//    createCourse
 } = require('../controller/controller');

router.route("/signup").post(createUser);
router.route('/signin').post(loginUser);
router.route('/course').post(getCourse);
// router.route('/create').get(createCourse);
module.exports = router