if (window.location.pathname === "/register") {
	document.addEventListener("DOMContentLoaded", () => {
		const form = document.getElementsByTagName("form")[0]
		const username = document.getElementById("username")
		const email = document.getElementById("email") // Added email field
		const password = document.getElementById("password")
		const passwordRepeat = document.getElementById("password-repeat")
		const agreedToTerms = document.getElementById("agreed-to-terms")

		form.addEventListener("submit", e => {
			e.preventDefault()
			console.log("Reading values")
			if (!username.value || username.value.length < 4) {
				return alert("min_3_characters")
			}
			if (!email.value || email.value.length < 4) {
				return alert("min_3_characters")
			}
			if (!password.value || password.value.length < 6) {
				return alert("min_6_characters")
			}
			if (!passwordRepeat.value || password.value != passwordRepeat.value) {
				return alert("both_passwords_must_match")
			}
			if (!agreedToTerms.checked) {
				return alert("terms_not_accepted")
			}
			form.submit()
		})
	})
}
