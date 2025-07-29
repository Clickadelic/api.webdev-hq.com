const { toast } = require("./toast")

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
		toast("Please fill out all fields.", "error")
		document.querySelector("input[name='email']").focus()
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
			toast("Login successful.", "success")
			document.querySelector("input[name='email']").value = ""
			document.querySelector("input[name='password']").value = ""
			setTimeout(() => (window.location.href = `${process.env.SUCCESSFUL_LOGIN_REDIRECT}`), 2000) // Weiterleitung nach Login
		} else {
			toast(data.message || "Login failed.", "error")
			document.querySelector("input[name='email']").focus()
		}
	} catch (error) {
		console.log(error)
	}
}
