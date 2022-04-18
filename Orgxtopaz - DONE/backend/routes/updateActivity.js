const router = require('express').Router();
const updateActivity = require('../controllers/updateActivity')



router.post('/updateActivity',updateActivity); 



module.exports = router;
