const createApi = require("unsplash-js").createApi

// Test
const unsplash = createApi({
	accessKey: process.env.UNSPLASH_ACCESS_KEY,
	fetch: fetch
})

const extensionController = {
	/**
	 * Returns a random image from the Unsplash collection specified in the environment variables.
	 *
	 * @returns {Promise<Object>} A JSON object containing the image data.
	 * @throws {Error} An error occurred while fetching the image from Unsplash.
	 */
	getRandomImage: async (req, res) => {
		try {
			const response = await unsplash.photos.getRandom({
				collectionIds: [process.env.UNSPLASH_COLLECTION_ID],
				orientation: "landscape"
			})
			if (!response || !response.status || response.status !== 200) {
				return res.status(500).json({ error: "No image found." })
			}
			res.status(200).json(response)
		} catch (error) {
			console.error("Error loading image from Unsplash:", error)
			res.status(500).json({ error: error.message })
		}
	},
	getSeasonalImage: async (req, res) => {
		const currentMonth = new Date().getMonth() + 1

		let collectionIds = ""
		if (currentMonth >= 5 && currentMonth <= 9) {
			collectionIds = process.env.UNSPLASH_SUMMER_COLLECTION_ID
		} else if (currentMonth >= 9 && currentMonth <= 11) {
			collectionIds = process.env.UNSPLASH_FALL_COLLECTION_ID
		} else if (currentMonth >= 11 && currentMonth <= 4) {
			collectionIds = process.env.UNSPLASH_WINTER_COLLECTION_ID
		} else {
			collectionIds = process.env.UNSPLASH_SPRING_COLLECTION_ID
		}
		try {
			const response = await unsplash.photos.getRandom({
				collectionIds,
				orientation: "landscape"
			})
			if (!response || !response.status || response.status !== 200) {
				return res.status(500).json({ error: "No image found." })
			}
			res.status(200).json(response)
		} catch (error) {}
	}
}

module.exports = extensionController
