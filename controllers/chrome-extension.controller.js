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
		const today = new Date();
		const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());

		try {
			// Prüfen, ob heute schon ein Bild existiert
			const existingImage = await prisma.backgroundImage.findFirst({
			where: {
				createdAt: {
				gte: startOfDay,
				},
			},
			});

			if (existingImage) {
				// Falls ja, einfach zurückgeben
				return res.status(200).json(existingImage);
			}

			// Sonst neue Collection bestimmen
			const currentMonth = today.getMonth() + 1;
			
			let collectionId;

			if (currentMonth >= 5 && currentMonth <= 9) {
				collectionId = process.env.UNSPLASH_SUMMER_COLLECTION_ID;
			} else if (currentMonth >= 10 && currentMonth <= 11) {
				collectionId = process.env.UNSPLASH_FALL_COLLECTION_ID;
			} else if (currentMonth === 12 || (currentMonth >= 1 && currentMonth <= 2)) {
				collectionId = process.env.UNSPLASH_WINTER_COLLECTION_ID;
			} else {
				collectionId = process.env.UNSPLASH_SPRING_COLLECTION_ID;
			}

			const collectionIds = [collectionId];

			// Bild von Unsplash laden
			const response = await unsplash.photos.getRandom({
				collectionIds,
				orientation: "landscape",
			});

			if (!response || !response.status || response.status !== 200) {
				return res.status(500).json({ error: "No image found." });
			}

			const photo = response.response.results
			? response.response.results[0]
			: response.response;

			// Bild in DB speichern
			const savedImage = await prisma.backgroundImage.create({
				data: {
					url: photo.urls.full,
					altText: photo.alt_description || null,
					collection: collectionId,
				},
			});

			res.status(200).json(savedImage);
		} catch (error) {
			console.error("Error loading image from Unsplash:", error);
			res.status(500).json({ error: error.message });
		}
	}
}

module.exports = extensionController
