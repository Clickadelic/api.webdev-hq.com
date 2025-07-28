const { toast } = require("./toast")

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
			toast("Please fill out all fields.", "error")
			return
		}

		if (password !== passwordRepeat) {
			toast("Passwords do not match.", "error")
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
				toast(errorMessage, "error") // Zeige die Backend-Fehlermeldung
				return
			}

			// Wenn response.ok true ist (z.B. 200 OK), ist alles in Ordnung
			toast("Please confirm your e-mail.", "success")
			// Optional: Weiterleitung oder andere Aktionen bei Erfolg
			// window.location.href = "/confirmation-sent";
			document.querySelector("input[name='username']").value = ""
			document.querySelector("input[name='email']").value = ""
			document.querySelector("input[name='password']").value = ""
			document.querySelector("input[name='password-repeat']").value = ""
			document.querySelector("input[name='agreed-to-terms']").checked = false
		} catch (error) {
			console.error("Fetch error:", error) // Nutze console.error für Fehler
			toast("Network error or unhandled exception.")
		}
	}
}

if (window.location.pathname === "/auth/confirm") {
  document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get("token")

    const messageBox = document.getElementById("message-box")
	
    if (token) {
		fetch("/common/v1/auth/confirm?token=" + encodeURIComponent(token), {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		})
        .then(response => response.json()).
		then(data => {
			console.log("Response data is", data.message)
			toast(data.message, "Account has been verified.")
			messageBox.innerHTML = data.message
		})
        .catch(error => {
          console.error("Error confirming email:", error)
          toast("Something went wrong.", "error")
        })
    } else {
      toast("Token missing.", "error")
    }
  })
}

