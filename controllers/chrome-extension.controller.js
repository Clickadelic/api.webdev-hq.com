const createApi = require("unsplash-js").createApi

const unsplash = createApi({
	accessKey: process.env.UNSPLASH_ACCESS_KEY,
	fetch: fetch
})

const extensionController = {
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
	}
}

module.exports = extensionController
