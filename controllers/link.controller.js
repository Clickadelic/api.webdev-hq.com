const fs = require("fs")
const path = require("path")
const crypto = require("crypto")

const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const handlebars = require("handlebars")
const transporter = require("../mail")

const linkController = {
	getLinks: async (req, res) => {
		try {
			const links = await prisma.link.findMany()
			res.status(200).send(links)
		} catch (error) {
			return res.status(504).send({ message: error })
		}
	},
	getLinkById: async (req, res) => {
		const id = req.params.id
		try {
			const link = await prisma.link.findUnique({
				where: {
					id
				}
			})
			if (!link) {
				return res.status(404).send({ message: "link_not_found" })
			}
			res.status(200).send(link)
		} catch (error) {
			return res.status(504).send({ message: error })
		}
	},
	createLink: async (req, res) => {
		const userId = req.body.userId
		const title = req.body.title
		const description = req.body.description
		const url = req.body.url

		if (!title || !description || !url) {
			return res.status(400).send({ message: "missing_fields" })
		}
		try {
			const existingLink = await prisma.link.findFirst({
				where: {
					url
				}
			})
			console.log("Existing link:", existingLink)
			if (existingLink) {
				return res.status(409).send({ message: "link_already_exists" })
			}
			await prisma.link.create({
				data: {
					title,
					url,
					description,
					userId
				}
			})
			res.status(201).send({ message: "link_created" })
		} catch (error) {
			return res.status(504).send({ message: error })
		}
	},
	patchLink: async (req, res) => {
		const id = req.body.id
		const title = req.body.title
		const description = req.body.description
		const url = req.body.url
		const userId = req.body.userId
		console.log("Patch link data:", { id, title, description, url, userId })

		if (!id || !title || !description || !url || !userId) {
			return res.status(400).send({ message: "missing_fields" })
		}
		try {
			await prisma.link.update({
				where: {
					id
				},
				and: {
					userId
				},
				data: {
					title,
					description,
					url
				}
			})
			res.status(200).send({ message: "link_edited" })
		} catch (error) {
			return res.status(504).send({ message: error })
		}
	},
	deleteLink: async (req, res) => {
		const id = req.params.id
		try {
			await prisma.link.delete({
				where: {
					id
				}
			})
			res.status(200).send({ message: "link_deleted" })
		} catch (error) {
			return res.status(504).send({ message: error })
		}
	}
}

module.exports = linkController
