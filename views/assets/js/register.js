const showUserMessage = require("./lib").showUserMessage

if (window.location.pathname === "/auth/register") {
	document.addEventListener("DOMContentLoaded", () => {
		document.getElementsByTagName("form")[0].addEventListener("submit", e => {
			handleRegister(e)
		})
	})

	const handleRegister = async e => {
		e.preventDefault()

		const username = document.querySelector("input[name='username']").value
		const email = document.querySelector("input[name='email']").value
		const password = document.querySelector("input[name='password']").value
		const passwordRepeat = document.querySelector("input[name='password-repeat']").value
		const agreedToTerms = document.querySelector("input[name='agreed-to-terms']").checked

		// Frontend-Validierung (gut, diese beizubehalten, bevor ein Request gesendet wird)
		if (!username || !email || !password || !passwordRepeat || !agreedToTerms) {
			showUserMessage("bg-rose-200", "Please fill out all fields.")
			return
		}

		if (password !== passwordRepeat) {
			showUserMessage("bg-rose-200", "Passwords do not match.")
			return
		}

		const formData = {
			username,
			email,
			password,
			passwordRepeat,
			agreedToTerms
		}

		try {
			const response = await fetch("/common/v1/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(formData)
			})

			const responseData = await response.json() // Body parsen

			if (!response.ok) {
				// Wenn response.ok false ist (z.B. 400 Bad Request), behandle den Fehler
				const errorMessage = responseData.message || "An unknown error occurred."
				showUserMessage("bg-rose-200", errorMessage) // Zeige die Backend-Fehlermeldung
				return
			}

			// Wenn response.ok true ist (z.B. 200 OK), ist alles in Ordnung
			showUserMessage("bg-green-200", "Please confirm your e-mail.")
			// Optional: Weiterleitung oder andere Aktionen bei Erfolg
			// window.location.href = "/confirmation-sent";
			document.querySelector("input[name='username']").value = ""
			document.querySelector("input[name='email']").value = ""
			document.querySelector("input[name='password']").value = ""
			document.querySelector("input[name='password-repeat']").value = ""
			document.querySelector("input[name='agreed-to-terms']").checked = false
		} catch (error) {
			console.error("Fetch error:", error) // Nutze console.error für Fehler
			showUserMessage("bg-rose-200", "Network error or unhandled exception.")
		}
	}
}
