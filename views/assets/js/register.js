console.log("Registering...")

if (window.location.pathname === "/") {
	document.addEventListener("DOMContentLoaded", function () {
		const register = document.getElementById("register")
		const username = document.getElementById("username")
		const password = document.getElementById("password")
		const passwordRepeat = document.getElementById("password_repeat")
		const agreedToTerms = document.getElementById("agreedToTerms")

		register.addEventListener("click", () => {
			if (!username.value || username.value.length < 4) {
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
			const form = document.getElementById("register-form")
			const response = fetch("/common/v1/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					username: username.value,
					email: username.value,
					password: password.value
				})
			})
				.then(res => res.json())
				.then(res => {
					if (res.error) {
						return alert(res.error)
					}
				})
		})
	})
}
