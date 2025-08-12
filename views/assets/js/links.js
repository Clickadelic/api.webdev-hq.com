const { toast } = require("./toast")

let isEditing = false
let currentEditId = null
const redirectUrl = "/links"

if (window.location.pathname === "/links") {
	document.addEventListener("DOMContentLoaded", () => {
		
		const linkForm = document.getElementById("link-form")
		const editBtns = document.getElementsByClassName("edit-link-btn")
		const deleteBtns = document.getElementsByClassName("delete-link-btn")
		const createText = document.getElementById("create-link-btn-text")
		const updateText = document.getElementById("update-link-btn-text")
		const modal = document.getElementById("modal")

		/**
		 * Form submit handler
		 */
		linkForm.addEventListener("submit", e => {
			e.preventDefault()
			isEditing ? handleLinkUpdate() : handleCreateLink()
		})

		/**
		 * Set up edit buttons
		 */
		Array.from(editBtns).forEach(btn => {
			btn.addEventListener("click", e => {
				e.stopPropagation()
				const linkId = btn.getAttribute("data-link-id")
				prepareLinkUpdate(linkId)
			})
		})

		/**
		 * Set up delete buttons
		 */
		Array.from(deleteBtns).forEach(btn => {
			btn.addEventListener("click", e => {
				e.stopPropagation()
				const linkId = btn.getAttribute("data-link-id")
				handleLinkDeletion(linkId)
			})
		})

		/**
		 * Resets the modal state to default (create link) when the modal is closed.
		 */
		function resetModalState() {
			isEditing = false
			currentEditId = null
			createText.classList.remove("hidden")
			updateText.classList.add("hidden")
		}

		/**
		 * Handles creating a new link.
		 *
		 * Submits the form data to /common/v1/links with method POST.
		 * If the response is OK (200), it redirects to the redirectUrl and shows a success toast.
		 * If the response is not OK, it shows an error toast with the status text.
		 * If there is an error with the request, it shows an error toast with the error message and logs the error.
		 */
		async function handleCreateLink() {
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
					window.location.href = redirectUrl
				} else {
					toast(response.statusText, "error")
				}
			} catch (error) {
				toast("Something went wrong.", "error")
				console.error(error)
			}
		}

		/**
		 * Prepares the link update form by fetching the link data and filling the form with it.
		 *
		 * @param {number} id - The ID of the link to update.
		 * @returns {Promise<void>}
		 */
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

		/**
		 * Handles the submission of the link update form.
		 *
		 * Sends a PATCH request to the API to update the link with the given ID.
		 * If the request is successful, displays a success toast and redirects to the link list page.
		 * If the request fails, displays an error toast.
		 *
		 * @returns {Promise<void>}
		 */
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
					window.location.href = redirectUrl
				} else {
					toast("Link update failed.", "error")
				}
			} catch (error) {
				toast("Something went wrong.", "error")
				console.error(error)
			}
		}

		/**
		 * Handles deleting a link by sending a DELETE request to the API.
		 * If the request is successful, removes the link from the link list and shows a success toast.
		 * If the request fails, shows an error toast.
		 * If there is an error with the request, shows an error toast with the error message and logs the error.
		 *
		 * @param {number} id - The ID of the link to delete.
		 * @returns {Promise<void>}
		 */
		async function handleLinkDeletion(id) {

			try {
				const response = await fetch(`/common/v1/links/${id}`, {
					method: "DELETE",
					headers: { "Content-Type": "application/json" }
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

		
		/**
		 * Returns an object containing the form data.
		 *
		 * @return {object} The form data.
		 * @property {number} userId - The ID of the user who created the link.
		 * @property {number} id - The ID of the link.
		 * @property {string} title - The title of the link.
		 * @property {string} url - The URL of the link.
		 * @property {string} description - The description of the link.
		 * @property {boolean} isPublic - Whether the link is public or not.
		 */
		function getFormData() {
			return {
				userId: document.querySelector("input[name='user-id']").value.trim(),
				id: document.querySelector("input[name='id']").value.trim(),
				title: document.querySelector("input[name='title']").value.trim(),
				url: document.querySelector("input[name='url']").value.trim(),
				description: document.querySelector("textarea[name='description']").value.trim(),
				isPublic: document.querySelector("input[name='is-public']").checked,
			}
		}

		/**
		 * Fills the form with the given data.
		 *
		 * @param {object} data - The data to fill the form with.
		 * @param {number} [data.userId] - The ID of the user who created the link.
		 * @param {number} [data.id] - The ID of the link.
		 * @param {string} [data.title] - The title of the link.
		 * @param {string} [data.url] - The URL of the link.
		 * @param {string} [data.description] - The description of the link.
		 * @param {boolean} [data.isPublic] - Whether the link is public or not.
		 */
		function fillFormWithData(data) {
			document.querySelector("input[name='user-id']").value = data.userId || ""
			document.querySelector("input[name='id']").value = data.id || ""
			document.querySelector("input[name='title']").value = data.title || ""
			document.querySelector("input[name='url']").value = data.url || ""
			document.querySelector("textarea[name='description']").value = data.description || ""
			document.querySelector("input[name='is-public']").checked = !!data.isPublic || false
		}

		/**
		 * Validates the given form data.
		 *
		 * @param {object} data - The data to validate.
		 * @param {string} data.title - The title of the link.
		 * @param {string} data.url - The URL of the link.
		 * @param {string} data.description - The description of the link.
		 * @param {number} data.userId - The ID of the user who created the link.
		 *
		 * @returns {boolean} Whether the data is valid or not.
		 */
		function validateFormData({ title, url, description, userId }) {
			if (!title || !url || !description || !userId) {
				toast("Please fill out all required fields.", "error")
				return false
			}
			return true
		}
	})
}
