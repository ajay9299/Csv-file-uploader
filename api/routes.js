const router = require('express').Router();

const studentRoute = require('./routes/studentData');
const userRoute = require('./routes/user');

router.use('/user',userRoute);
router.use('/student',studentRoute);

module.exports = router;