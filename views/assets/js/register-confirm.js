const { toast } = require("./toast")

if (window.location.pathname === "/auth/confirm") {
	document.addEventListener("DOMContentLoaded", () => {
		validateToken()
	})
}

async function validateToken () {
	const token = window.location.search.split("=")[1]
	const response = await fetch("/common/v1/auth/confirm?token=" + token, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ token })
	})
	const data = await response.json()
	if (response.ok) {
		toast(data.message, "success")
	} else {
		toast("Something went wrong.", "error")
	}
}
