

const prisma = require("../prisma")
const { paginate } = require("../lib/utils")

const linkController = {
	getLinks: async (req, res) => {
		try {
			// 1️⃣ Page & Limit aus Query holen
			const page = parseInt(req.query.page) || 1;
			const limit = parseInt(req.query.limit) || 10;

			// 2️⃣ Pagination-Funktion aufrufen
			const { data, pagination } = await paginate(prisma.link, page, limit, {
				orderBy: { createdAt: "desc" },
			});

			// 3️⃣ Ergebnis senden
			res.json({ pagination, data });
		} catch (error) {
			console.error("getLinks error:", error);
			res.status(500).json({
				message: error.message || "Internal server error.",
			});
		}
	},
	getLinkById: async (req, res) => {
		const id = req.params.id
		try {
			const link = await prisma.link.findUnique({ where: { id } })
			if (!link) {
				return res.status(404).send({ message: "Link not found." })
			}
			return res.status(200).send(link)
		} catch (error) {
			console.error("getLinkById error:", error)
			return res.status(500).send({ message: error.message || "Internal server error." })
		}
	},
	createLink: async (req, res) => {
		const { title, description, url, isPublic, userId } = req.body
		if (
			!title || typeof title !== "string" || title.trim() === "" ||
			!description || typeof description !== "string" ||
			!url || typeof url !== "string" ||
			typeof isPublic === "undefined" ||
			!userId || typeof userId !== "string" || userId.trim() === ""
		) {
			return res.status(400).send({ message: "Missing or invalid fields." })
		}

		try {
			const existingLink = await prisma.link.findFirst({ where: { url } })
			if (existingLink) {
				return res.status(409).send({ message: "Link already exists." })
			}

			await prisma.link.create({
				data: {
					title,
					url,
					description,
					isPublic,
					userId
				}
			})
			return res.status(201).send({ message: "Link created." })
		} catch (error) {
			console.error("createLink error:", error)
			return res.status(500).send({ message: error.message || "Internal server error." })
		}
	},
	patchLinkById: async (req, res) => {
		const { id, title, description, url, isPublic, userId } = req.body

		if (
			!id || typeof id !== "string" || id.trim() === "" ||
			!title || typeof title !== "string" || title.trim() === "" ||
			!description || typeof description !== "string" ||
			!url || typeof url !== "string" ||
			typeof isPublic === "undefined" ||
			!userId || typeof userId !== "string" || userId.trim() === ""
		) {
			return res.status(400).send({ message: "Missing or invalid fields." })
		}

		try {
			const existingLink = await prisma.link.findUnique({ where: { id } })
			if (!existingLink) {
				return res.status(404).send({ message: "Link not found." })
			}

			await prisma.link.update({
				where: { id },
				data: { title, description, url, isPublic }
			})
			return res.status(200).send({ message: "Link edited." })
		} catch (error) {
			console.error("patchLink error:", error)
			return res.status(500).send({ message: error.message || "Internal server error." })
		}
	},
	deleteLinkById: async (req, res) => {
		const { id } = req.params

		if (!id) {
			return res.status(400).send({ message: "Missing fields." })
		}

		try {
			const link = await prisma.link.findUnique({ where: { id } })
			if (!link) {
				return res.status(404).send({ message: "Link not found." })
			}

			await prisma.link.delete({ where: { id } })
			return res.status(200).send({ message: "Link deleted." })
		} catch (error) {
			console.error("deleteLink error:", error)
			return res.status(500).send({ message: error.message || "Internal server error." })
		}
	},
	getLinksByUserId: async (req, res) => {
		const { userId } = req.params

		if (!userId) {
			return res.status(400).send({ message: "Missing fields." })
		}

		try {
			const links = await prisma.link.findMany({ where: { userId } })
			return res.status(200).send(links)
		} catch (error) {
			console.error("getLinksByUserId error:", error)
			return res.status(500).send({ message: error.message || "Internal server error." })
		}
	}
}

module.exports = linkController

