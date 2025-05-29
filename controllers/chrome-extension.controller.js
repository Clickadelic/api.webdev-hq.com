const createApi = require("unsplash-js").createApi

const unsplash = createApi({
	accessKey: process.env.UNSPLASH_ACCESS_KEY,
	fetch: fetch
})

const extensionController = {
	getDailyImage: async (req, res) => {
		try {
			const collection = unsplash.photos
				.getRandom({
					query: "nature",
					orientation: "landscape"
				})
				.then(response => {
					res.status(200).json(response)
				})
				.catch(error => {
					res.status(500).json({ error: error.message })
				})
			console.log(collection)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	},
	getRandomImage: async (req, res) => {
		try {
			const result = await unsplash.photos.getRandom({
				collectionIds: [process.env.UNSPLASH_COLLECTION_ID],
				orientation: "landscape"
			})

			if (!result || !("response" in result) || !result.response) {
				return res.status(500).json({ error: "No image found." })
			}

			// Sende die vollständige, native Unsplash-Antwort
			res.status(200).json(result.response)
		} catch (error) {
			console.error("Fehler beim Laden des Bildes von Unsplash:", error)
			res.status(500).json({ error: error.message })
		}
	}
}

module.exports = extensionController
