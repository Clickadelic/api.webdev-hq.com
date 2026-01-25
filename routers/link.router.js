const express = require("express")
const linkRouter = express.Router()
const linkController = require("../controllers/link.controller")
const middleware = require("../middleware")

/**
 * @swagger
 * tags:
 *   - name: Links
 *     description: Link management API
 */

/**
 * @swagger
 * /links:
 *   get:
 *     summary: Get all links
 *     tags: [Links]
 *     responses:
 *       200:
 *         description: List of links
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Link'
 */
linkRouter.get("/links", linkController.getLinks)

/**
 * @swagger
 * /links/{id}:
 *   get:
 *     summary: Get link by ID
 *     tags: [Links]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Link found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Link'
 *       404:
 *         description: Link not found
 */
linkRouter.get("/links/:id", linkController.getLinkById)

/**
 * @swagger
 * /links:
 *   post:
 *     summary: Create a new link
 *     tags: [Links]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LinkCreate'
 *     responses:
 *       201:
 *         description: Link created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Link'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
linkRouter.post(
    "/links",
    middleware.verifyTokenFromCookie,
    linkController.createLink
)

/**
 * @swagger
 * /links/{id}:
 *   patch:
 *     summary: Update a link partially
 *     tags: [Links]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LinkUpdate'
 *     responses:
 *       200:
 *         description: Link updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Link'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Link not found
 */
linkRouter.patch(
    "/links/:id",
    middleware.verifyTokenFromCookie,
    linkController.patchLinkById
)

/**
 * @swagger
 * /links/{id}:
 *   delete:
 *     summary: Delete a link
 *     tags: [Links]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Link deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Link not found
 */
linkRouter.delete(
    "/links/:id",
    middleware.verifyTokenFromCookie,
    linkController.deleteLinkById
)

/**
 * @swagger
 * /links/user/{username}:
 *   get:
 *     summary: Get all links by username
 *     tags: [Links]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of links for user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Link'
 *       404:
 *         description: User not found
 */
linkRouter.get("/links/user/:username", linkController.getLinksByUsername)

module.exports = linkRouter
