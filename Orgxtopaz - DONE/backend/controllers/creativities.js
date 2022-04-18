const Creativity = require('../models/Creativity.js');

exports.createCreativity = async (request, response) => {
	// console.log(request.query);
	request.body.activity = request.query.activityId;
	// console.log(request.body);
	const creativity = await Creativity.create(request.body);
	//check if there is no activity created will response with 400 http code
	if (!creativity) {
		response.status(400).json({
			success: false,
			message: 'creativity not created',
		});
	}
	//else will response with http code 200
	response.status(200).json({
		success: true,
		data: creativity,
	});
};

exports.readCreativities = async (request, response) => {
	const creativities = await Creativity.find().populate({
		path: 'activity',
		select: 'activityTitle',
	});

	if (!creativities) {
		response.status(400).json({
			success: false,
			message: 'No creativity found',
		});
	}
	response.status(200).json({
		success: true,
		count: creativities.length,
		data: creativities,
	});
};

exports.updateCreativity = async (request, response) => {
	//update activity by ID
	const updatedCreativity = await Creativity.findByIdAndUpdate(
		request.params.id,
		request.body
	);

	if (!updatedCreativity) {
		response.status(400).json({
			success: true,
			message: `No creativity found with the id of ${request.params.id}`,
		});
	}

	response.status(200).json({
		success: true,
		data: updatedCreativity,
	});
};

exports.deleteCreativity = async (request, response) => {
	//deleteOne => delete by id
	const result = await Creativity.deleteOne({
		_id: request.params.id,
	});

	response.status(200).json({
		success: true,
		data: result,
	});
};
