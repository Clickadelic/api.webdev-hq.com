const infoController = {
	/**
	 * Returns information about the API service.
	 *
	 * @returns {Object} API service information
	 * @returns {string} title - The title of the API service
	 * @returns {string} version - The version of the API service
	 * @returns {string} website - The website of the API service
	 * @returns {string} platform - The platform of the API service
	 * @returns {string} license - The license of the API service
	 * @returns {string} contact - The contact information of the API service
	 * @returns {string} schema - The schema of the API service
	 * @returns {string} author - The author of the API service
	 */
	getInfo: (req, res) => {
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
			return res.status(200).json(info)
		} catch (error) {
			return res.status(400).json({ error: error })
		}
	},
	/**
	 * Returns the health check of the API service.
	 *
	 * @returns {Object} API service health check
	 * @returns {string} status - The status of the API service
	 * @returns {string} timestamp - The timestamp of the health check
	 */
	getHealthCheck: (req, res) => {
		try {
			return res.status(200).json({ status: "ok", timestamp: new Date().toISOString() })
		} catch (error) {
			return res.status(400).json({ error: error })
		}
	}
}

module.exports = infoController
