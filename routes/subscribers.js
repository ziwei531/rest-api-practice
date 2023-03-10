const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscriber");

//getting all
router.get("/", async (req, res) => {
	try {
		const subscribers = await Subscriber.find();
		res.json(subscribers);
	} catch (error) {
		//500 = database error
		res.status(500).json({ message: error.message });
	}
});

//getting one
router.get("/:id", getSubscriber, (req, res) => {
	res.send(res.subscriber.subscriberName);
});

//creating one
router.post("/", (req, res) => {
	const subscriber = new Subscriber({
		subscriberName: req.body.subscriberName,
		subscribedToChannel: req.body.subscribedToChannel,
	});

	try {
		const newSubscriber = subscriber.save();
		res.status(201).json(newSubscriber); //201 = created
	} catch (error) {
		res.status(400).json({ message: error.message }); //400 = bad request by user
	}
});

//updating one
router.patch("/:id", getSubscriber, async (req, res) => {
	if (req.body.subscriberName != null) {
		res.subscriber.subscriberName = req.body.subscriberName;
	}
	if (req.body.subscribedToChannel != null) {
		res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
	}
	try {
		const updatedSubscriber = await res.subscriber.save();
		res.json(updatedSubscriber);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

//deleting one
router.delete("/:id", getSubscriber, async (req, res) => {
	try {
		console.log(res.subscriber);
		await Subscriber.deleteOne({ _id: res.subscriber._id }); //remove from database
		res.json({ message: "Deleted Subscriber" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

async function getSubscriber(req, res, next) {
	let subscriber;
	try {
		subscriber = await Subscriber.findById(req.params.id);
		if (subscriber == null) {
			return res.status(404).json({ message: "Cannot find subscriber" });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}

	res.subscriber = subscriber;
	next(); //move on to the next function
}

module.exports = router;
