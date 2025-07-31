const prisma = require("../lib/prisma")

const linkController = {
	getLinks: async (req, res) => {
		try {
			const links = await prisma.link.findMany()
			return res.status(200).send(links)
		} catch (error) {
			console.error("getLinks error:", error)
			return res.status(500).send({ message: error.message || "internal_server_error" })
		}
	},
	getLinkById: async (req, res) => {
		const id = req.params.id
		try {
			const link = await prisma.link.findUnique({ where: { id } })
			if (!link) {
				return res.status(404).send({ message: "link_not_found" })
			}
			return res.status(200).send(link)
		} catch (error) {
			console.error("getLinkById error:", error)
			return res.status(500).send({ message: error.message || "internal_server_error" })
		}
	},
	createLink: async (req, res) => {
		const { title, description, url, isPublic } = req.body

		if (
			!title || typeof title !== "string" || title.trim() === "" ||
			!description || typeof description !== "string" ||
			!url || typeof url !== "string" ||
			typeof isPublic === "undefined"
		) {
			return res.status(400).send({ message: "missing_or_invalid_fields" })
		}

		try {
			const existingLink = await prisma.link.findFirst({ where: { url } })
			if (existingLink) {
				return res.status(409).send({ message: "link_already_exists" })
			}

			await prisma.link.create({
				data: {
					title,
					url,
					description,
					isPublic
				}
			})
			return res.status(201).send({ message: "link_created" })
		} catch (error) {
			console.error("createLink error:", error)
			return res.status(500).send({ message: error.message || "internal_server_error" })
		}
	},
	patchLinkById: async (req, res) => {
		const { id, title, description, url, isPublic } = req.body

		if (
			!id || typeof id !== "string" ||
			!title || typeof title !== "string" || title.trim() === "" ||
			!description || typeof description !== "string" ||
			!url || typeof url !== "string" ||
			typeof isPublic === "undefined"
		) {
			return res.status(400).send({ message: "missing_or_invalid_fields" })
		}

		try {
			const existingLink = await prisma.link.findUnique({ where: { id } })
			if (!existingLink) {
				return res.status(404).send({ message: "link_not_found" })
			}

			await prisma.link.update({
				where: { id },
				data: { title, description, url, isPublic }
			})
			return res.status(200).send({ message: "link_edited" })
		} catch (error) {
			console.error("patchLink error:", error)
			return res.status(500).send({ message: error.message || "internal_server_error" })
		}
	},
	deleteLinkById: async (req, res) => {
		const { id } = req.params

		if (!id) {
			return res.status(400).send({ message: "missing_fields" })
		}

		try {
			const link = await prisma.link.findUnique({ where: { id } })
			if (!link) {
				return res.status(404).send({ message: "link_not_found" })
			}

			await prisma.link.delete({ where: { id } })
			return res.status(200).send({ message: "link_deleted" })
		} catch (error) {
			console.error("deleteLink error:", error)
			return res.status(500).send({ message: error.message || "internal_server_error" })
		}
	}
}

module.exports = linkController

