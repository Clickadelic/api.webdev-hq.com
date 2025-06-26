const showUserMessage = require("./lib").showUserMessage

if (window.location.pathname === "/forgot-password") {
	document.addEventListener("DOMContentLoaded", () => {
		document.getElementsByTagName("form")[0].addEventListener("submit", e => {
			handlePasswordReset(e)
		})
	})
}

const handlePasswordReset = async e => {
	e.preventDefault()
	const form = e.target

	const email = document.querySelector("input[name='email']").value

	if (!email) {
		showUserMessage("bg-rose-200", "Please fill out all fields.")
		return
	}

	const formData = { email }

	try {
		const response = await fetch(`/common/v1/auth/reset-password`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData)
		})

		if (response.ok) {
			document.querySelector("input[name='email']").value = ""
			showUserMessage("bg-emerald-200", "Password reset email sent.")
		} else {
			showUserMessage("bg-rose-200", "Password reset failed.")
		}
	} catch (error) {
		showUserMessage("bg-rose-200", "Something went wrong.")
		console.log(error)
	}
}
