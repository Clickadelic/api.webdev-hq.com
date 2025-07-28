const { toast } = require("./toast")
let isEditing = false

if (window.location.pathname === "/links") {
	document.addEventListener("DOMContentLoaded", () => {
		// Form-Submit: Neuer Link
		const linkForm = document.getElementById("link-form")
		linkForm.addEventListener("submit", e => {
			isEditing ? handleLinkUpdate(e) : handleNewLink(e)
		})

		const editBtns = document.getElementsByClassName("edit-link-btn")
		const deleteBtns = document.getElementsByClassName("delete-link-btn")

		for (let i = 0; i < editBtns.length; i++) {
			editBtns[i].addEventListener("click", e => {
				e.stopPropagation()
				prepareLinkUpdate(editBtns[i].getAttribute("data-link-id"))
			})
		}

		for (let i = 0; i < deleteBtns.length; i++) {
			deleteBtns[i].addEventListener("click", e => {
				e.stopPropagation()
				handleLinkDeletion(deleteBtns[i].getAttribute("data-link-id"))
			})
		}

	})
}

// Neuer Link
const handleNewLink = async e => {
	e.preventDefault()

	const userId = document.querySelector("input[name='userId']").value
	const title = document.querySelector("input[name='title']").value
	const url = document.querySelector("input[name='url']").value
	const isPublic = document.querySelector("input[name='is-public']").checked
	const description = document.querySelector("textarea[name='description']").value

	if (!userId || !title || !url || !description) {
		toast("Please fill out all fields.", "error")
		return
	}

	const formData = { userId, title, url, description, isPublic }

	try {
		const response = await fetch(`/common/v1/links`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData)
		})

		const data = await response.json()

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

// Link bearbeiten (öffnet dein vorhandenes Modal)
const prepareLinkUpdate = async id => {
	const modal = document.getElementById("modal")
	const form = document.getElementsByTagName("form")[0]
	const createText = document.getElementById("create-link-btn-text")
	const updateText = document.getElementById("update-link-btn-text")

	createText.classList.add("hidden")
	updateText.classList.remove("hidden")

	if (!id) {
		toast("Link ID is missing.", "error")
		return
	}

	modal.classList.remove("hidden")
	modal.classList.add("flex")

	try {
		const response = await fetch(`/common/v1/links/${id}`)
		const linkData = await response.json()
		if (!response.ok) {
			toast("Link not found.", "error")
			return
		}

		form.querySelector("input[name='userId']").value = linkData.title
		form.querySelector("input[name='title']").value = linkData.title
		form.querySelector("input[name='url']").value = linkData.url
		form.querySelector("textarea[name='description']").value = linkData.description
		form.querySelector("input[name='is-public']").checked = linkData.isPublic

		form.addEventListener("submit", e => {
			handleLinkUpdate(id)
		})
	} catch (error) {
		console.error("Something went wrong:", error)
		toast("Something went wrong.", "error")
	}
}

const handleLinkUpdate = async (id) => {
	isEditing = true

	const title = document.querySelector("input[name='title']").value
	const url = document.querySelector("input[name='url']").value
	const description = document.querySelector("textarea[name='description']").value
	const isPublic = document.querySelector("input[name='id']").checked
	const userId = document.querySelector("input[name='userId']").value

	const formData = { id, title, url, description, isPublic, userId }
	
	try {
		const response = await fetch(`/common/v1/links/${id}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData)
		})
		
		const data = await response.json()
		
		if (response.ok) {
			toast("Link updated.", "success")
			window.location.href = "/links"
		} else {
			toast("Update failed.", "error")
			console.log(data)
		}
	} catch (error) {
		toast("Something went wrong.", "error")
		console.log(error)
	}
}

// Link löschen
const handleLinkDeletion = async (id) => {
	
	try {
		const response = await fetch(`/common/v1/links/${id}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" }
		})

		const data = await response.json()

		if (response.ok) {
			document.querySelector(`#link-${id}`).remove()
			toast("Link deleted.", "success")
		} else {
			toast("Deletion failed.", "error")
		}
	} catch (error) {
		toast("Something went wrong.", "error")
		console.log(error)
	}
}
