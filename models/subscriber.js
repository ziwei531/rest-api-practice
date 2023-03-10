const mongoose = require("mongoose");

const subscriberSchema = new mongoose.Schema({
	//name, subscriber, subscribedToChannel, subscribedDate
	subscriberName: {
		type: String,
		required: true,
	},
	subscribedToChannel: {
		type: String,
		required: true,
	},
	subscribedDate: {
		type: Date,
		required: true,
		default: Date.now,
	},
});

module.exports = mongoose.model("Subscriber", subscriberSchema);
