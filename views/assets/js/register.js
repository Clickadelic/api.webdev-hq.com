if (window.location.pathname === "/register") {
	document.addEventListener("DOMContentLoaded", function () {
		const form = document.getElementsByTagName("form")[0]
		const username = document.getElementById("username")
		const email = document.getElementById("email") // Added email field
		const password = document.getElementById("password")
		const passwordRepeat = document.getElementById("password-repeat")
		const agreedToTerms = document.getElementById("agreed-to-terms")
		form.addEventListener("submit", async e => {
			e.preventDefault()

			console.log(username.value, email.value, password.value, passwordRepeat.value, agreedToTerms.checked)

			// Call the registerUser function here
			await registerUser(username.value, email.value, password.value, passwordRepeat.value, agreedToTerms.checked)
		})
	})
}

const registerUser = async (username, email, password, passwordRepeat, agreedToTerms) => {
	try {
		const response = await fetch("/common/v1/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				username: username,
				email: email,
				password: password,
				passwordRepeat: passwordRepeat,
				agreedToTerms: agreedToTerms
			})
		})

		const result = await response.json()

		if (result.error) {
			return alert(result.error)
		}

		// Handle successful registration (e.g., redirect or show message)
		alert("Registration successful!")
	} catch (error) {
		console.error("Registration error:", error)
		alert("An error occurred during registration.")
	}
}
