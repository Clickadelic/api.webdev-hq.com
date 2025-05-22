const handleRegister = async e => {
	e.preventDefault()
	console.log("Event", e)
	const name = document.querySelector("input[name='name']").value
	const email = document.querySelector("input[name='email']").value
	const password = document.querySelector("input[name='password']").value
	const passwordRepeat = document.querySelector("input[name='password-repeat']").value
	const agreedToTerms = document.querySelector("input[name='agreed-to-terms']").checked
	console.log("Register.js: ", name, email, password, passwordRepeat, agreedToTerms)

	// Frontend-Validierung (gut, diese beizubehalten, bevor ein Request gesendet wird)
	if (!name || !email || !password || !passwordRepeat || !agreedToTerms) {
		showUserMessage("bg-rose-200 text-muted-foreground", "Please fill out all fields.")
		return
	}

	if (password !== passwordRepeat) {
		showUserMessage("bg-rose-200 text-muted-foreground", "Passwords do not match.")
		return
	}

	// Zusätzliche Frontend-Validierung, die deinem Backend entspricht (optional, aber empfohlen)
	if (name.length < 4) {
		showUserMessage("bg-rose-200 text-muted-foreground", "Username must be at least 4 characters.")
		return
	}
	if (email.length < 5) {
		showUserMessage("bg-rose-200 text-muted-foreground", "Email must be at least 5 characters.")
		return
	}
	if (password.length < 6) {
		showUserMessage("bg-rose-200 text-muted-foreground", "Password must be at least 6 characters.")
		return
	}

	const formData = {
		username: name, // Wichtig: Backend erwartet 'username', nicht 'name'
		email,
		password,
		passwordRepeat,
		agreedToTerms
	}

	try {
		console.log("Frontend start fetch:", formData)
		const response = await fetch("/common/v1/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(formData)
		})

		const responseData = await response.json() // Immer den Body parsen

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
	} catch (error) {
		console.error("Fetch error:", error) // Nutze console.error für Fehler
		showUserMessage("bg-rose-200", "Network error or unhandled exception.")
	}
}
