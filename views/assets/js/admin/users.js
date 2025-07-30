const toast = require("../toast")

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

function handleUserDeletion(id) {
	fetch(`/common/v1/users/${id}`, {
		method: "DELETE"
	})
	.then(response => response.json())
	.then(data => {
		if (data.message === "user_deleted") {
			document.getElementById(`user-${id}`).remove()
			toast("User deleted.", "success")
		} else {
			console.error(data.message)
		}
	})
	.catch(error => {
		console.error("Error:", error)
	})
}