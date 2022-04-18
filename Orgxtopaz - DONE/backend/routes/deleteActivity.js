const router = require('express').Router();
const deleteActivity = require('../controllers/deleteActivity')



router.post('/deleteActivity/:id',deleteActivity); 



module.exports = router;
