const { toast } = require("./toast")

let isEditing = false
let currentEditId = null

document.addEventListener("DOMContentLoaded", () => {
	if (window.location.pathname !== "/links") return

	const linkForm = document.getElementById("link-form")
	const editBtns = document.getElementsByClassName("edit-link-btn")
	const deleteBtns = document.getElementsByClassName("delete-link-btn")
	const createText = document.getElementById("create-link-btn-text")
	const updateText = document.getElementById("update-link-btn-text")
	const modal = document.getElementById("modal")

	// Form submit handler
	linkForm.addEventListener("submit", e => {
		e.preventDefault()
		isEditing ? handleLinkUpdate() : handleNewLink()
	})

	// Set up edit buttons
	Array.from(editBtns).forEach(btn => {
		btn.addEventListener("click", e => {
			e.stopPropagation()
			const linkId = btn.getAttribute("data-link-id")
			prepareLinkUpdate(linkId)
		})
	})

	// Set up delete buttons
	Array.from(deleteBtns).forEach(btn => {
		btn.addEventListener("click", e => {
			e.stopPropagation()
			const linkId = btn.getAttribute("data-link-id")
			handleLinkDeletion(linkId)
		})
	})

	function resetModalState() {
		isEditing = false
		currentEditId = null
		createText.classList.remove("hidden")
		updateText.classList.add("hidden")
	}

	async function handleNewLink() {
		const formData = getFormData()
		if (!validateFormData(formData)) return

		try {
			const response = await fetch(`/common/v1/links`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData)
			})

			if (response.ok) {
				toast("Link created.", "success")
				window.location.href = "/links"
			} else {
				toast("Link creation failed.", "error")
			}
		} catch (error) {
			toast("Something went wrong.", "error")
			console.error(error)
		}
	}

	async function prepareLinkUpdate(id) {
		if (!id) {
			toast("Link ID is missing.", "error")
			return
		}

		isEditing = true
		currentEditId = id
		createText.classList.add("hidden")
		updateText.classList.remove("hidden")

		modal.classList.remove("hidden")
		modal.classList.add("flex")

		try {
			const response = await fetch(`/common/v1/links/${id}`)
			const linkData = await response.json()

			if (!response.ok) {
				toast("Link not found.", "error")
				return
			}

			fillFormWithData(linkData)
		} catch (error) {
			console.error("Something went wrong:", error)
			toast("Something went wrong.", "error")
		}
	}

	async function handleLinkUpdate() {
		const formData = getFormData()
		formData.id = currentEditId

		if (!validateFormData(formData)) return

		try {
			const response = await fetch(`/common/v1/links/${formData.id}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData)
			})

			if (response.ok) {
				toast("Link updated.", "success")
				window.location.href = "/links"
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

	async function handleLinkDeletion(id) {

		try {
			const response = await fetch(`/common/v1/links/${id}`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ userId })
			})

			if (response.ok) {
				document.querySelector(`#link-${id}`).remove()
				toast("Link deleted.", "success")
			} else {
				toast("Deletion failed.", "error")
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
			url: document.querySelector("input[name='url']").value.trim(),
			description: document.querySelector("textarea[name='description']").value.trim(),
			isPublic: document.querySelector("input[name='is-public']").checked
		}
	}

	function fillFormWithData(data) {
		document.querySelector("input[name='title']").value = data.title || ""
		document.querySelector("input[name='url']").value = data.url || ""
		document.querySelector("textarea[name='description']").value = data.description || ""
		document.querySelector("input[name='is-public']").checked = !!data.isPublic
	}

	function validateFormData({ title, url, description }) {
		if (!title || !url || !description) {
			toast("Please fill out all required fields.", "error")
			return false
		}
		return true
	}
})
