const { toast } = require("./toast")


document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname !== "/posts/create") return

    const postForm = document.getElementById("post-form")

    // Form submit handler
    postForm.addEventListener("submit", e => {
        e.preventDefault()
        handleNewPost()
    })

    // Set up edit buttons
    Array.from(editBtns).forEach(btn => {
        btn.addEventListener("click", e => {
            e.stopPropagation()
            const linkId = btn.getAttribute("data-post-id")
            prepareLinkUpdate(linkId)
        })
    })

    // Set up delete buttons
    Array.from(deleteBtns).forEach(btn => {
        btn.addEventListener("click", e => {
            e.stopPropagation()
            const linkId = btn.getAttribute("data-post-id")
            handlePostDeletion(postId)
        })
    })

    async function handleNewPost() {
        const formData = getFormData()
        console.log(formData)
        if (!validateFormData(formData)) return

        try {
            const response = await fetch(`/common/v1/posts`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                toast("Post created.", "success")
                window.location.href = "/posts"
            } else {
                toast("Post creation failed.", "error")
            }
        } catch (error) {
            toast("Something went wrong.", "error")
            console.error(error)
        }
    }

    // Helpers
    function getFormData() {
        return {
            // title, description, slug, content, status
            title: document.querySelector("input[name='title']").value.trim(),
            description: document.querySelector("textarea[name='description']").value.trim(),
            slug: document.querySelector("input[name='slug']").value.trim(),
            content: document.querySelector("textarea[name='content']").value.trim(),
            status: document.querySelector("select[name='status']").value
        }
    }

    function validateFormData({ title, description, slug, content, status }) {
        if (!title || !description || !slug || !content || !status) {
            toast("Please fill out all required fields.", "error")
            return false
        }
        return true
    }
})
