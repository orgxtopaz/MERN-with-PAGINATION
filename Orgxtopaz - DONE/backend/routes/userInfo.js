const router = require('express').Router();
const userInfo = require('../controllers/userInfo')



router.post('/userInfo',userInfo); 



module.exports = router;
