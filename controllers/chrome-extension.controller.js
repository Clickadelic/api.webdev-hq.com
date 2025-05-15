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
				collectionIds: ["9LE6ljYNQlE"], // Deine Unsplash-Kollektion-ID
				orientation: "landscape"
			})

			console.log("Unsplash API Result:", result)

			const image = result && "response" in result ? result.response : undefined

			if (!image || !image.urls) {
				return res.status(500).json({ error: "Kein Bild gefunden oder ungültige Antwortstruktur." })
			}

			// Du kannst hier z.B. nur die URL oder das ganze Bildobjekt zurückgeben
			res.status(200).json({
				id: image.id,
				description: image.description || image.alt_description,
				url: image.urls.full,
				author: image.user?.name,
				authorUrl: image.user?.links.html,
				link: image.links.html
			})
		} catch (error) {
			console.error("Fehler beim Laden des Bildes von Unsplash:", error)
			res.status(500).json({ error: error.message })
		}
	}
}

module.exports = extensionController
