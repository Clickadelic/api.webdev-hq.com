if (window.location.pathname === "/login") {
	document.addEventListener("DOMContentLoaded", () => {
		document.getElementsByTagName("form")[0].addEventListener("submit", e => {
			handleLogin(e)
		})
	})
}

const handleLogin = async e => {
	e.preventDefault()

	const username = document.querySelector("input[name='username']").value
	const password = document.querySelector("input[name='password']").value

	if (!username || !password) {
		showUserMessage("bg-rose-200", "Please fill out all fields.")
		return
	}

	const formData = { username, password }

	try {
		const response = await fetch("/common/v1/auth/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData)
		})

		const data = await response.json() // Server-Antwort parsen

		if (response.ok) {
			localStorage.setItem("token", data.token) // Token speichern
			showUserMessage("bg-green-200", "Login successful.")
			setTimeout(() => (window.location.href = "/dashboard"), 1000) // Weiterleitung nach Login
		} else {
			showUserMessage("bg-rose-200", data.message || "Login failed.")
		}
	} catch (error) {
		console.log(error)
		showUserMessage("bg-rose-200", "Something went wrong.")
	}
}

const showUserMessage = (messageClasses, message) => {
	const messageBox = document.getElementById("message-box")
	messageBox.classList.add(messageClasses)
	messageBox.innerHTML = message
	setTimeout(() => {
		messageBox.classList.remove(messageClasses)
		messageBox.innerHTML = ""
	}, 2000)
	return
}
