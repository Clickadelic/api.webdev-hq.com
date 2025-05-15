require("dotenv").config()

import { createApi } from "unsplash-js"

export const unsplash = createApi({
	accessKey: process.env.UNSPLASH_ACCESS_KEY,
	fetch: fetch
})

const extensionController = {
	getDailyImage: async (req, res) => {
		res.status(200).send({ message: "extension_image" })
	}
}

module.exports = extensionController
