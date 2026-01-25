const express = require("express")
const chromeExtensionRouter = express.Router()
const chromeExtensionController = require("../controllers/chrome-extension.controller")

/**
 * @swagger
 * tags:
 *   - name: Chrome Extension
 *     description: Public API endpoints for the Chrome browser extension
 */

/**
 * @swagger
 * /chrome-extension/random-image:
 *   get:
 *     summary: Get a random image
 *     description: Returns a random image for the Chrome extension background.
 *     tags: [Chrome Extension]
 *     responses:
 *       200:
 *         description: Random image returned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChromeExtensionImage'
 */
chromeExtensionRouter.get(
	"/chrome-extension/random-image",
	chromeExtensionController.getRandomImage
)

/**
 * @swagger
 * /chrome-extension/seasonal-image:
 *   get:
 *     summary: Get a seasonal image
 *     description: Returns an image based on the current season.
 *     tags: [Chrome Extension]
 *     responses:
 *       200:
 *         description: Seasonal image returned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChromeExtensionImage'
 */
chromeExtensionRouter.get(
	"/chrome-extension/seasonal-image",
	chromeExtensionController.getSeasonalImage
)

module.exports = chromeExtensionRouter
