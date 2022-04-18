const router = require('express').Router();

const {
	createActivity,
	readActivites,
	getSingleActivity,
} = require('../controllers/activities');

router.route('/').post(createActivity).get(readActivites);
router.route('/:id').get(getSingleActivity);

module.exports = router;
