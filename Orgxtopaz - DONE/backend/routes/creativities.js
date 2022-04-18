const router = require('express').Router();

const {
	createCreativity,
	readCreativities,
	updateCreativity,
	deleteCreativity,
} = require('../controllers/creativities.js');

router.route('/').post(createCreativity).get(readCreativities);
router.route('/:id').put(updateCreativity).delete(deleteCreativity);

module.exports = router;
