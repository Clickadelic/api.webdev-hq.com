const infoController = {
	getInfo: async (req, res) => {
		try {
			const info = {
				title: "WebDev HQ API",
				version: "1",
				author: "Tobias Hopp",
				platform: "web",
				license: "MIT",
				website: "https://webdev-hq.com",
				contact: "admin@webdev-hq.com",
				schema: "https://api.webdev-hq.com/docs"
			}
			res.status(200).json(info)
		} catch (error) {
			res.status(400).json({ error: error })
		}
	}
}

module.exports = infoController
