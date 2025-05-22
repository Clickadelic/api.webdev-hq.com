const showUserMessage = require("./lib").showUserMessage

if (window.location.pathname === "/register") {
	document.addEventListener("DOMContentLoaded", () => {
		document.getElementsByTagName("form")[0].addEventListener("submit", e => {
			handleRegister(e)
		})
	})
}

const handleRegister = async e => {
	e.preventDefault()

	const name = document.querySelector("input[name='name']").value
	const email = document.querySelector("input[name='email']").value
	const password = document.querySelector("input[name='password']").value
	const passwordRepeat = document.querySelector("input[name='password-repeat']").value
	const agreedToTerms = document.querySelector("input[name='agreed-to-terms']").checked

	if (!name || !password || !passwordRepeat || !agreedToTerms) {
		showUserMessage("bg-rose-200 text-muted-foreground", "Please fill out all fields.")
		return
	}

	if (password !== passwordRepeat) {
		showUserMessage("bg-rose-200 text-muted-foreground", "Passwords do not match.")
		return
	}

	const formData = {
		name,
		email,
		password,
		passwordRepeat,
		agreedToTerms
	}

	try {
		await fetch("/common/v1/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(formData)
		}).then(response => {
			if (response.status === 400 && message === "min_3_characters") {
				showUserMessage("bg-rose-200", "Min 3 chars.")
				return
			}
			if (response.ok) {
				showUserMessage("bg-green-200", "Please confirm your e-mail.")
				return
			}
		})
	} catch (error) {
		console.log(error)
	}
}
