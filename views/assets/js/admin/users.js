const { toast } = require("../toast")

if (window.location.pathname === "/admin/users") {
	document.addEventListener("DOMContentLoaded", function () {
		const deleteBtns = document.getElementsByClassName("delete-user-btn")
		// Set up delete buttons
		Array.from(deleteBtns).forEach(btn => {
			btn.addEventListener("click", e => {
				e.stopPropagation()
				const id = btn.getAttribute("data-user-id")
				handleUserDeletion(id)
			})
		})
	})
}

async function handleUserDeletion(id) {
	try {
		const response = await fetch(`/common/v1/users/${id}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" }
		})
		if (response.ok) {
			const userRow = document.querySelector(`#user-${id}`)
			userRow.classList.add("border-rose-500")
			userRow.remove()
			toast("User deleted.", "success")
		} else {
			toast("Deletion failed.", "error")
		}
	} catch (error) {
		toast("Something went wrong.", "error")
	}
}