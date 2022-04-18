const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
	activityTitle: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

ActivitySchema.virtual('creativities', {
	ref: 'Creativity',
	localField: '_id',
	foreignField: 'activity',
	justOne: false,
});
module.exports = mongoose.model('Activity', ActivitySchema);
