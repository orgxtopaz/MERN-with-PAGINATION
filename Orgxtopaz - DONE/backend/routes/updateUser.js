const router = require('express').Router();
const updateUser = require('../controllers/updateUser')



router.post('/updateUser',updateUser); 



module.exports = router;
