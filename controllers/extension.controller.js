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
			unsplash.photos
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
		} catch (error) {}
	}
}

module.exports = extensionController
