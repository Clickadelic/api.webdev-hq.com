const { toast } = require("./toast")
let isEditing = false

if (window.location.pathname === "/links") {
	document.addEventListener("DOMContentLoaded", () => {
		// Form-Submit: Neuer Link
		document.getElementsByTagName("form")[0].addEventListener("submit", e => {
			isEditing ? handleLinkUpdate(e) : handleNewLink(e)
		})

		// Alle Links abrufen und anzeigen
		fetch("/common/v1/links", {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		})
			.then(response => response.json())
			.then(data => {
				if (data.length === 0) {
					document.querySelector(".links").innerHTML = `<p class="text-slate-400">No links found.</p>`
					return
				}
				data.forEach(link => {
					const linkItem = document.createElement("li")
					linkItem.id = `link-${link.id}`
					linkItem.classList.add("w-full", "flex", "justify-between", "mb-2")
					linkItem.innerHTML = `
						<div>
							<a href="${link.url}" target="_blank" class="text-mantis-primary">${link.title}</a>
							<p class="text-slate-400 text-sm">${link.description}</p>
						</div>
						<div class="flex flex-row gap-2">
							<button id="edit-link-${link.id}" class="modal-open rounded bg-slate-100 p-2 px-4 text-slate-400 hover:cursor-pointer hover:border-mantis-primary">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
									<path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293z"/>
								</svg>
							</button>
							<button id="delete-link-${link.id}" class="rounded bg-slate-100 p-2 px-4 text-rose-400 hover:cursor-pointer">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
									<path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
								</svg>
							</button>
						</div>
					`
					document.querySelector(".links").appendChild(linkItem)
				})
			})
			.then(() => {
				// Edit-Handler
				document.querySelectorAll("[id^='edit-link-']").forEach(button => {
					button.addEventListener("click", e => {
						prepareLinkUpdate(e.currentTarget.id.split("-")[2])
					})
				})

				// Delete-Handler
				document.querySelectorAll("[id^='delete-link-']").forEach(button => {
					button.addEventListener("click", e => {
						const linkId = e.currentTarget.id.split("-")[2]
						handleLinkDeletion(e, linkId)
					})
				})
			})
			.catch(error => {
				console.error("Error fetching links:", error)
			})
	})
}

// Neuer Link
const handleNewLink = async e => {
	e.preventDefault()
	form.reset()
	const userId = document.querySelector("input[name='userId']").value
	const title = document.querySelector("input[name='title']").value
	const url = document.querySelector("input[name='url']").value
	const description = document.querySelector("textarea[name='description']").value

	if (!userId || !title || !url || !description) {
		toast("Please fill out all fields.", "error")
		return
	}

	const formData = { userId, title, url, description }

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
			toast("Creation failed.", "error")
			console.log(data)
		}
	} catch (error) {
		toast("Something went wrong.", "error")
		console.log(error)
	}
}

// Link bearbeiten (öffnet dein vorhandenes Modal)
const prepareLinkUpdate = async linkId => {
	isEditing = true
	document.querySelector("input[name='id']").value = linkId
	const modal = document.getElementById("modal")
	const form = document.getElementsByTagName("form")[0]

	if (!linkId) {
		toast("Link ID is missing.", "error")
		return
	}

	modal.classList.remove("hidden")
	modal.classList.add("flex")

	try {
		const response = await fetch(`/common/v1/links/${linkId}`)
		const linkData = await response.json()
		if (!response.ok) {
			toast("Link not found.", "error")
			return
		}

		form.querySelector("input[name='title']").value = linkData.title
		form.querySelector("input[name='url']").value = linkData.url
		form.querySelector("textarea[name='description']").value = linkData.description

		form.addEventListener("submit", e => {
			handleLinkUpdate(e, linkId)
		})
	} catch (error) {
		console.error("Something went wrong:", error)
		toast("Something went wrong.", "error")
	}
}

// Link löschen
const handleLinkDeletion = async (e, linkId) => {
	e.preventDefault()

	try {
		const response = await fetch(`/common/v1/links/${linkId}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" }
		})

		const data = await response.json()

		if (response.ok) {
			document.querySelector(`#link-${linkId}`).remove()
			toast("Link deleted.", "success")
		} else {
			toast("Deletion failed.", "error")
		}
	} catch (error) {
		toast("Something went wrong.", "error")
		console.log(error)
	}
}
