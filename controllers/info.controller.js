const infoController = {
	getInfo: async (req, res) => {
		try {
			const info = {
				title: "WebDev HQ API-Service",
				version: "1",
				website: "https://webdev-hq.com",
				platform: "web",
				license: "MIT",
				contact: "admin@webdev-hq.com",
				schema: "https://api.webdev-hq.com/docs",
				author: "Tobias Hopp"
			}
			res.status(200).json(info)
		} catch (error) {
			res.status(400).json({ error: error })
		}
	}
}

module.exports = infoController
