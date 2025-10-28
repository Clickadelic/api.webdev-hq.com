const express = require("express");
const middleware = require("../middleware");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");

/**
 * @openapi
 * tags:
 *   - name: Posts
 *     description: Endpunkte zur Verwaltung von Posts (Blogartikel, Rezepte etc.)
 */

/**
 * @openapi
 * /common/v1/posts:
 *   get:
 *     summary: Gibt alle Posts zurück
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Erfolgreiche Antwort – gibt alle Posts zurück
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */

/**
 * @openapi
 * /common/v1/posts:
 *   post:
 *     summary: Erstellt einen neuen Post
 *     tags: [Posts]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostCreate'
 *     responses:
 *       201:
 *         description: Post erfolgreich erstellt
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Ungültige Eingabedaten
 *       401:
 *         description: Nicht autorisiert
 */

/**
 * @openapi
 * /common/v1/posts/{id}:
 *   get:
 *     summary: Gibt einen bestimmten Post anhand seiner ID zurück
 *     tags: [Posts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Die ID des Posts
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Erfolgreiche Antwort – Post gefunden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post nicht gefunden
 */

/**
 * @openapi
 * /common/v1/posts/{id}:
 *   patch:
 *     summary: Aktualisiert einen bestehenden Post teilweise
 *     tags: [Posts]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Die ID des Posts
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostUpdate'
 *     responses:
 *       200:
 *         description: Post erfolgreich aktualisiert
 *       400:
 *         description: Ungültige Daten
 *       401:
 *         description: Nicht autorisiert
 *       404:
 *         description: Post nicht gefunden
 */

/**
 * @openapi
 * /common/v1/posts/{id}:
 *   delete:
 *     summary: Löscht einen bestimmten Post
 *     tags: [Posts]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Die ID des Posts
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Post erfolgreich gelöscht
 *       404:
 *         description: Post nicht gefunden
 *       401:
 *         description: Nicht autorisiert
 */

// Protected Routes
postRouter.get("/posts", postController.getPosts);
postRouter.post("/posts", postController.createPost);
postRouter.get("/posts/:id", postController.getPostById);
// postRouter.patch("/posts/:id", postController.updatePost);
// postRouter.delete("/posts/:id", postController.deletePost);

module.exports = postRouter