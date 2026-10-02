const express = require("express");
const linkRouter = express.Router();
const linkController = require("../controllers/link.controller");
const middleware = require("../middleware");

/**
 * @swagger
 * tags:
 *   - name: Links
 *     description: Endpoints for link management
 */

/**
 * @swagger
 * /common/v1/links:
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
linkRouter.get("/links", linkController.getLinks);

/**
 * @swagger
 * /common/v1/links/{userId}:
 *   get:
 *     summary: Get link by user ID
 *     tags: [Links]
 *     parameters:
 *       - in: path
 *         name: userId
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
linkRouter.get("/links/:userId", linkController.getLinkById);

/**
 * @swagger
 * /common/v1/links:
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
linkRouter.post("/links", middleware.verifyTokenFromCookie, linkController.createLink);

/**
 * @swagger
 * /common/v1/links/{userId}:
 *   patch:
 *     summary: Update a link partially
 *     tags: [Links]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
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
linkRouter.patch("/links/:userId", middleware.verifyTokenFromCookie, linkController.patchLinkById);

/**
 * @swagger
 * /common/v1/links/{userId}:
 *   delete:
 *     summary: Delete a link
 *     tags: [Links]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
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
linkRouter.delete("/links/:userId", middleware.verifyTokenFromCookie, linkController.deleteLinkById);

module.exports = linkRouter;
