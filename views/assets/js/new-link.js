const showUserMessage = require("./lib").showUserMessage

if (window.location.pathname === "/links") {
	document.addEventListener("DOMContentLoaded", () => {
		document.getElementsByTagName("form")[0].addEventListener("submit", e => {
			handleNewLink(e)
		})
		fetch("/common/v1/links", {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		})
			.then(response => response.json())
			.then(data => {
				data.forEach(link => {
					const linkContainer = document.createElement("li")
					linkContainer.classList.add("w-full", "flex", "flex-col", "items-start", "mb-2")
					linkContainer.innerHTML = `
						<a href="${link.url}" target="_blank" class="text-mantis-primary">${link.title}</a>
						<p class="text-slate-400 text-sm">${link.description}</p>
					`
					document.querySelector(".links").appendChild(linkContainer)
				})
			})
			.catch(error => {
				console.error("Error fetching links:", error)
			})
	})
}

const handleNewLink = async e => {
	e.preventDefault()

	const userId = document.querySelector("input[name='userId']").value
	const title = document.querySelector("input[name='title']").value
	const url = document.querySelector("input[name='url']").value
	const description = document.querySelector("textarea[name='description']").value

	console.log(userId, title, url, description)

	if (!userId || !title || !url || !description) {
		showUserMessage("bg-rose-200", "Please fill out all fields.")
		return
	}

	const formData = { userId, title, url, description }

	try {
		const response = await fetch(`/common/v1/links/new`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData)
		})

		const data = await response.json()

		if (response.ok) {
			showUserMessage("bg-emerald-200", "Link created.")
			window.location.href = "/links"
		} else {
			showUserMessage("bg-rose-200", "Creation failed.")
			console.log(data)
		}
	} catch (error) {
		console.log(error)
		showUserMessage("bg-rose-200", "Something went wrong.")
	}
}
