const { toast } = require("./toast")

if (window.location.pathname === "/auth/reset-password") {
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
		toast("Please fill out all fields.", "error")
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
			toast("Password reset email sent.", "success")
		} else {
			toast("Password reset failed.", "error")
		}
	} catch (error) {
		toast("Something went wrong.", "error")
		console.log(error)
	}
}
