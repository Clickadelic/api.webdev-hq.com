const infoController = {
	getInfo: async (req, res) => {
		try {
			const info = {
				title: "Tobias Hopp - Personal API",
				version: "0.0.1",
				author: "Tobias Hopp",
				license: "MIT",
				website: "https://www.tobias-hopp.de",
				contact: "mail@tobias-hopp.de"
			};
			res.status(200).json(info);
		} catch (error) {
			res.status(400).json({ error: error });
		}
	}
};

module.exports = infoController;
