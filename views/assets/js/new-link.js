const showUserMessage = require("./lib").showUserMessage

if (window.location.pathname === "/links") {
	document.addEventListener("DOMContentLoaded", () => {
		document.getElementsByTagName("form")[0].addEventListener("submit", e => {
			handleNewLink(e)
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
			alert("Link created.")
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
