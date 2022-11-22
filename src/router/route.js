const express = require ('express')
const router = express.Router();

const {createIntern} = require ('../controller/internController')
const {createColleges, getCollegeDetails} = require('../controller/collegeController')

router.post ('/functionup/colleges', createColleges)
router.post  ('/functionup/interns', createIntern)
router.get ('/functionup/collegeDetails', getCollegeDetails)

module.exports = router;