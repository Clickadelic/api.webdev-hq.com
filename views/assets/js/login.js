const showUserMessage = require("./lib").showUserMessage

if (window.location.pathname === "/auth/login") {
	document.addEventListener("DOMContentLoaded", () => {
		document.getElementsByTagName("form")[0].addEventListener("submit", e => {
			handleLogin(e)
		})
	})
}

const handleLogin = async e => {
	e.preventDefault()

	const email = document.querySelector("input[name='email']").value
	const password = document.querySelector("input[name='password']").value

	if (!email || !password) {
		showUserMessage("bg-rose-200", "Please fill out all fields.")
		return
	}

	const formData = { email, password }

	try {
		const response = await fetch(`/common/v1/auth/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData)
		})

		const data = await response.json()

		if (response.ok) {
			localStorage.setItem("token", data.token) // Token speichern
			showUserMessage("bg-green-200", "Login successful.")
			setTimeout(() => (window.location.href = "/dashboard"), 1000) // Weiterleitung nach Login
		} else {
			showUserMessage("bg-rose-200", "Login failed.")
			console.log(data)
		}
	} catch (error) {
		console.log(error)
		showUserMessage("bg-rose-200", "Something went wrong.")
	}
}
