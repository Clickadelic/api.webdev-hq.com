const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const subscriberController = {
	registerSubscriber: async (req, res) => {
		try {
			const subscriber = await prisma.subscriber.findUnique({
				where: {
					email: req.body.email
				}
			});
			if (subscriber) {
				return res.status(409).send({ message: "email_already_subscribed" });
			}
			const newSubscriber = {
				subscribername: req.body.subscribername,
				email: req.body.email,
				agreedToSubscription: req.body.agreedToSubscription
			};
			await prisma.subscriber.create({
				data: newSubscriber
			});
			res.status(201).send({ message: "user_successfully_subscribed" });
		} catch (error) {
			res.status(504).send({ message: error });
		}
	},
	unregisterSubscriber: async (req, res) => {
		try {
			const subscriber = await prisma.subscriber.findUnique({
				where: {
					email: req.body.email
				}
			});
			if (subscriber) {
				return res.status(200).send({ message: "email_unsubscribed" });
			}
			res.status(200).send({ message: "email_not_subscribed" });
		} catch (error) {
			res.status(504).send({ message: error });
		}
	}

};

module.exports = subscriberController;
