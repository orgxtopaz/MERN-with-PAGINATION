const router = require('express').Router();
const login = require('../controllers/auth')



router.post('/login',login); ///DISPLAY ALL TOTAL ATTENDANCE 



module.exports = router;
