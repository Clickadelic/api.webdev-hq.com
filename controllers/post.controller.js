const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const postController = {
    getPosts: async (req, res) => {
        try {
            const posts = await prisma.post.findMany()
            return res.status(200).send(posts)
        } catch (error) {
            console.error("getPosts error:", error)
            return res.status(500).send({ message: error.message || "internal_server_error" })
        }
    },
    getPostById: async (req, res) => {
        const id = req.params.id
        try {
            const post = await prisma.post.findUnique({ where: { id } })
            if (!post) {
                return res.status(404).send({ message: "post_not_found" })
            }
            return res.status(200).send(post)
        } catch (error) {
            console.error("getPostById error:", error)
            return res.status(500).send({ message: error.message || "internal_server_error" })
        }
    },
    createPost: async (req, res) => {
        const { title, description, slug, content, status } = req.body

        if (
            !title || typeof title !== "string" || title.trim() === "" ||
            !description || typeof description !== "string" ||
            !slug || typeof slug !== "string" || slug.trim() === "" ||
            !content || typeof content !== "string" ||
            !status || typeof status !== "string" || status.trim() === ""
        ) {
            return res.status(400).send({ message: "missing_or_invalid_fields" })
        }

        try {
            // TODO: Check if post already exists
            await prisma.post.create({
                data: {
                    title,
                    description,
                    slug,
                    content,
                    status
                }
            })
            return res.status(201).send({ message: "post_created" })
        } catch (error) {
            console.error("createPost error:", error)
            return res.status(500).send({ message: error.message || "internal_server_error" })
        }
    },
    patchPost: async (req, res) => {
        const { id, title, description, status,  slug, } = req.body

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
    deletePost: async (req, res) => {
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

module.exports = postController

