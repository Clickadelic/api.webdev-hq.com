const toast = require("./toast")

if (window.location.pathname === "/profile") {
	document.addEventListener("DOMContentLoaded", function () {
		const tabs = document.querySelectorAll("[data-tab]")
		const contents = document.querySelectorAll("[data-content]")

		tabs.forEach(tab => {
			tab.addEventListener("click", () => {
				// Aktive Klasse bei allen Tabs entfernen
				tabs.forEach(t => t.classList.remove("border-b-2", "border-blue-500", "text-mantis-primary"))

				// Inhalte ausblenden
				contents.forEach(c => c.classList.add("hidden"))

				// Aktiven Tab hervorheben
				tab.classList.add("border-b-2", "border-mantis-primary", "text-mantis-primary")

				// Zugehörigen Inhalt anzeigen
				const target = tab.getAttribute("data-tab")
				document.querySelector(`[data-content="${target}"]`).classList.remove("hidden")
			})
		})

		// Ersten Tab aktivieren beim Laden
		tabs[0].click()

	})
	// Profil Löschen
	const deleteProfileBtn = document.getElementById("user-delete-btn")
	deleteProfileBtn.addEventListener("click", (e) => {
		handleProfileDeletion(e)
	})
}

const handleAccountUpdate = async e => {
	e.preventDefault()
	const form = e.target
	const formData = new FormData(form)
	const data = Object.fromEntries(formData)
	try {
		const response = await fetch(`/common/v1/users/${data.id}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data)
		})

		if (response.ok) {
			toast("Account updated.", "success")
		} else {
			toast("Update failed.", "error")
		}
	} catch (error) {
		toast("Something went wrong.", "error")
		console.error(error)
	}
}

const handleProfileDeletion = async (e) => {
	e.preventDefault()
	const userId = document.getElementById("user-id").value

	try {
		const response = await fetch(`/common/v1/users/${userId}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" }
		})

		if (response.ok) {
			toast("Account deleted, you will be logged out.", "success")
			
		} else {
			toast("Deletion failed.", "error")
		}
	} catch (error) {
		toast("Something went wrong.", "error")
		console.error(error)
	}
}
