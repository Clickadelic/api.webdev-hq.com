const showUserMessage = require("./lib").showUserMessage

if (window.location.pathname === "/newsletter") {
	document.addEventListener("DOMContentLoaded", () => {
		document.getElementsByTagName("form")[0].addEventListener("submit", e => {
			handleNewsletterSubscribtion(e)
		})
	})
}

const handleNewsletterSubscribtion = async e => {
	e.preventDefault()
	const name = document.querySelector("input[name='name']").value
	const email = document.querySelector("input[name='email']").value
	const agreedToSubscription = document.querySelector("input[name='agreed-to-subscription']").checked

	if (!name || !email || !agreedToSubscription) {
		showUserMessage("bg-rose-200", "Please fill out all fields.")
		return
	}

	const formData = {
		name,
		email,
		agreedToSubscription
	}

	try {
		await fetch("/common/v1/newsletter/subscribe", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(formData)
		}).then(response => {
			if (response.status === 409) {
				showUserMessage("bg-rose-200", "E-mail is already subscribed.")
			}
			if (response.ok) {
				document.querySelector("input[name='name']").value = ""
				document.querySelector("input[name='email']").value = ""
				document.querySelector("input[name='agreed-to-subscription']").checked = false
				showUserMessage("bg-green-200", "Subscribtion successful.")
			}
		})
	} catch (error) {
		console.log(error)
	}
}
