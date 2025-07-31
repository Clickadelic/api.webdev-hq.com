const prisma = require("../prisma")

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
        const { title, description, slug, content, status, userId } = req.body

        if (
            !title || typeof title !== "string" || title.trim() === "" ||
            !description || typeof description !== "string" ||
            !slug || typeof slug !== "string" || slug.trim() === "" ||
            !content || typeof content !== "string" ||
            !status || typeof status !== "string" || status.trim() === "" ||
            !userId || typeof userId !== "string" || userId.trim() === ""
        ) {
            return res.status(400).send({ message: "Missing or invalid fields" })
        }

        try {
            // TODO: Check if post already exists
            await prisma.post.create({
                data: {
                    title,
                    description,
                    slug,
                    content,
                    status,
                    userId
                }
            })
            return res.status(201).send({ message: "Post has been created." })
        } catch (error) {
            console.error("createPost error:", error)
            return res.status(500).send({ message: error.message || "Internal server error" })
        }
    },
    patchPostById: async (req, res) => {
        const { id, title, description, content, status, slug, } = req.body

        if (
            !title || typeof title !== "string" || title.trim() === "" ||
            !description || typeof description !== "string" ||
            !slug || typeof slug !== "string" || slug.trim() === "" ||
            !content || typeof content !== "string" ||
            !status || typeof status !== "string" || status.trim() === ""
        ) {
            return res.status(400).send({ message: "Missing or invalid fields" })
        }

        try {
            const existingPost = await prisma.post.findUnique({ where: { id } })
            if (!existingPost) {
                return res.status(404).send({ message: "post_not_found" })
            }

            await prisma.post.update({
                where: { id },
                data: { title, description, content, status, slug }
            })
            return res.status(200).send({ message: "post_edited" })
        } catch (error) {
            console.error("patchPost error:", error)
            return res.status(500).send({ message: error.message || "internal_server_error" })
        }
    },
    deletePostById: async (req, res) => {
        const { id } = req.params

        if (!id) {
            return res.status(400).send({ message: "missing_fields" })
        }

        try {
            const link = await prisma.post.findUnique({ where: { id } })
            if (!link) {
                return res.status(404).send({ message: "post_not_found" })
            }

            await prisma.post.delete({ where: { id } })
            return res.status(200).send({ message: "post_deleted" })
        } catch (error) {
            console.error("deleteLink error:", error)
            return res.status(500).send({ message: error.message || "internal_server_error" })
        }
    }
}

module.exports = postController

