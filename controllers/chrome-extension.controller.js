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
  	const currentMonth = new Date().getMonth() + 1; // 1 = Januar
  	console.log("Current Month:", currentMonth);

	// Monatslogik sauber aufgeteilt
	let collectionId;
	if (currentMonth >= 5 && currentMonth <= 9) {
		// Mai - September: Sommer
		collectionId = process.env.UNSPLASH_SUMMER_COLLECTION_ID;
	} else if (currentMonth >= 10 && currentMonth <= 11) {
		// Oktober - November: Herbst
		collectionId = process.env.UNSPLASH_FALL_COLLECTION_ID;
	} else if (currentMonth === 12 || (currentMonth >= 1 && currentMonth <= 2)) {
		// Dezember - Februar: Winter
		collectionId = process.env.UNSPLASH_WINTER_COLLECTION_ID;
	} else {
		// März - April: Frühling
		collectionId = process.env.UNSPLASH_SPRING_COLLECTION_ID;
	}

	console.log("Using Collection ID:", collectionId);

	// collectionIds muss ein Array sein
	const collectionIds = [collectionId];

	try {
		const response = await unsplash.photos.getRandom({
		collectionIds,
		orientation: "landscape",
		});

		if (!response || !response.status || response.status !== 200) {
		return res.status(500).json({ error: "No image found." });
		}

		res.status(200).json(response);
	} catch (error) {
		console.error("Error loading image from Unsplash:", error);
		res.status(500).json({ error: error.message });
	}
	}

}

module.exports = extensionController
