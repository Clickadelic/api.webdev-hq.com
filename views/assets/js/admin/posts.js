const { toast } = require("../toast")

let isEditing = false
let currentEditId = null
const redirectUrl = "/admin/posts"

document.addEventListener("DOMContentLoaded", () => {
	if (window.location.pathname !== "/admin/posts" && window.location.pathname !== "/admin/posts/create") return

	const postForm = document.getElementById("post-form")
	const editBtns = document.getElementsByClassName("edit-post-btn")
	const deleteBtns = document.getElementsByClassName("delete-post-btn")
	const createText = document.getElementById("create-post-btn-text")
	const updateText = document.getElementById("update-post-btn-text")
	const modal = document.getElementById("modal")

	// Form submit handler
	postForm.addEventListener("submit", e => {
		e.preventDefault()
		isEditing ? handlePostUpdate() : handleNewPost()
		handleNewPost()
	})

	// Set up edit buttons
	Array.from(editBtns).forEach(btn => {
		btn.addEventListener("click", e => {
			e.stopPropagation()
			const id = btn.getAttribute("data-post-id")
			preparePostUpdate(id)
		})
	})

	// Set up delete buttons
	Array.from(deleteBtns).forEach(btn => {
		btn.addEventListener("click", e => {
			e.stopPropagation()
			const id = btn.getAttribute("data-post-id")
			handlePostDeletion(id)
		})
	})

	function resetModalState() {
		isEditing = false
		currentEditId = null
		createText.classList.remove("hidden")
		updateText.classList.add("hidden")
	}

	async function handleNewPost() {
		const formData = getFormData()
		if (!validateFormData(formData)) return

		try {
			const response = await fetch(`/common/v1/posts`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData)
			})

			if (response.ok) {
				toast("Post created.", "success")
                setTimeout(() => {
                    window.location.href = redirectUrl
                }, 1500)
			} else {
				toast("Post creation failed.", "error")
			}
		} catch (error) {
			toast("Something went wrong.", "error")
			console.error(error)
		}
	}

	async function preparePostUpdate(id) {
		if (!id) {
			toast("Post ID is missing.", "error")
			return
		}

		isEditing = true
		currentEditId = id
		createText.classList.add("hidden")
		updateText.classList.remove("hidden")

		modal.classList.remove("hidden")
		modal.classList.add("flex")

		try {
			const response = await fetch(`/common/v1/posts/${id}`)
			const postData = await response.json()

			if (!response.ok) {
				toast("Post not found.", "error")
				return
			}

			fillFormWithData(postData)
		} catch (error) {
			console.error("Something went wrong:", error)
			toast("Something went wrong.", "error")
		}
	}

	async function handlePostUpdate() {
		const formData = getFormData()
		formData.id = currentEditId

		if (!validateFormData(formData)) return

		try {
			const response = await fetch(`/common/v1/posts/${formData.id}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData)
			})

			if (response.ok) {
				toast("Post updated.", "success")
				window.location.href = redirectUrl
			} else {
				const data = await response.json()
				console.log(data)
				toast("Update failed.", "error")
			}
		} catch (error) {
			toast("Something went wrong.", "error")
			console.error(error)
		}
	}

	async function handlePostDeletion(id) {

		try {
			const response = await fetch(`/common/v1/posts/${id}`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" }
			})

			if (response.ok) {
				const postRow = document.querySelector(`#post-${id}`)
				postRow.classList.add("border-rose-500")
				postRow.remove()
				toast("Post deleted.", "success")
			} else {
				toast("Post deletion failed.", "error")
			}
		} catch (error) {
			toast("Something went wrong.", "error")
			console.error(error)
		}
	}

	// Helpers
	function getFormData() {
		return {
			title: document.querySelector("input[name='title']").value.trim(),
			description: document.querySelector("textarea[name='description']").value.trim(),
            slug: document.querySelector("input[name='slug']").value.trim(),
			content: document.querySelector("textarea[name='content']").value.trim(),
            status: document.querySelector("select[name='post-status']").value.trim(),
			userId: document.querySelector("input[name='user-id']").value.trim(),
		}
	}

	function fillFormWithData(data) {
		document.querySelector("input[name='user-id']").value = data.userId || ""
		document.querySelector("input[name='title']").value = data.title || ""
		document.querySelector("textarea[name='description']").value = data.description || ""
		document.querySelector("select[name='post-status']").value = data.status || ""
		document.querySelector("input[name='slug']").value = data.slug || ""
		document.querySelector("textarea[name='content']").value = data.content || ""

	}

	function validateFormData({ title, description, content, slug, status }) {
		if (!title || !description || !content || !slug || !status) {
			toast("Please fill out all required fields.", "error")
			return false
		}
		return true
	}
})
