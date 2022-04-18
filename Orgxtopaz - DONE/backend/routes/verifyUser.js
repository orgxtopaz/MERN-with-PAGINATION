const router = require('express').Router();
const verifyUser = require('../controllers/verifyUser')



router.post('/verifyUser',verifyUser);



module.exports = router;
