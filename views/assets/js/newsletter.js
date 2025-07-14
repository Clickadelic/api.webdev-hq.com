const { toast } = require("./toast")

if (window.location.pathname === "/newsletter") {
	document.addEventListener("DOMContentLoaded", () => {
		document.getElementsByTagName("form")[0].addEventListener("submit", e => {
			handleNewsletterSubscribtion(e)
		})
	})
}

if (window.location.pathname === "/newsletter-confirm") {
	const params = new URLSearchParams(window.location.search)

	if (params.get("token")) {
		const token = params.get("token")
		fetch("/common/v1/newsletter/confirm", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ token })
		})
	}
}

const handleNewsletterSubscribtion = async e => {
	e.preventDefault()
	const name = document.querySelector("input[name='name']").value
	const email = document.querySelector("input[name='email']").value
	const agreedToSubscription = document.querySelector("input[name='agreed-to-subscription']").checked

	if (!name || !email || !agreedToSubscription) {
		toast("Please fill out all fields.", "error")
		document.querySelector("input[name='name']").focus()
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
				toast("E-mail is already subscribed.", "error")
			}
			if (response.ok) {
				document.querySelector("input[name='name']").value = ""
				document.querySelector("input[name='email']").value = ""
				document.querySelector("input[name='agreed-to-subscription']").checked = false
				toast("Subscribtion successful.", "success")
			} else {
				toast("Subscribtion failed.", "error")
			}
		})
	} catch (error) {
		console.log(error)
	}
}
