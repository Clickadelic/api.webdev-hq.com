const express = require("express");
const extensionRouter = express.Router();
const extensionController = require("../controllers/chrome-extension.controller");

/**
 * @openapi
 * /common/v1/extension/random-image:
 *   get:
 *     summary: Liefert ein zufälliges Bild aus der konfigurierten Unsplash-Collection
 *     tags:
 *       - Chrome Extension
 *     responses:
 *       200:
 *         description: Erfolgreich ein Bild abgerufen
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Fehler beim Abrufen des Bildes
 */
extensionRouter.get("/extension/random-image", extensionController.getRandomImage);

/**
 * @openapi
 * /common/v1/extension/seasonal-image:
 *   get:
 *     summary: Liefert ein saisonales Bild basierend auf dem aktuellen Monat
 *     tags:
 *       - Chrome Extension
 *     responses:
 *       200:
 *         description: Erfolgreich ein Bild abgerufen
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Fehler beim Abrufen des Bildes
 */
extensionRouter.get("/extension/seasonal-image", extensionController.getSeasonalImage);

module.exports = extensionRouter;
