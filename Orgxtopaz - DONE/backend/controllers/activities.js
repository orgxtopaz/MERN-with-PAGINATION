const Activity = require('../models/Activity.js');

exports.createActivity = async (req, res) => {
	console.log(req.body);
	const activity = await Activity.create(req.body);

	if (!activity) {
		res.status(400).json({
			success: false,
			message: 'no activity created',
		});
	}

	res.status(200).json({
		success: true,
		data: activity,
	});
};

exports.readActivites = async (req, res) => {
	const activities = await Activity.find();

	if (!activities) {
		res.status(400).json({
			success: false,
			message: 'error finding activities',
		});
	}

	res.status(200).json({
		success: true,
		data: activities,
		count: activities.length,
	});
};

exports.getSingleActivity = async (req, res) => {
	const activity = await Activity.findOne({
		_id: req.params.id,
	});

	if (!activity) {
		res.status(400).json({
			success: false,
			message: 'not found',
		});
	}

	res.status(200).json({
		success: true,
		data: activity,
	});
};
