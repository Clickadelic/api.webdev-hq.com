const { toast } = require("./toast")

if (window.location.pathname === "/auth/confirm") {
	document.addEventListener("DOMContentLoaded", () => {
		const token = window.location.search.split("=")[1]
		console.log(token)
		if (token) {
			fetch("/common/v1/auth/confirm?token=" + token, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ token })
			})
				.then(response => response.json())
				.then(data => {
					if (data.message) {
						toast(data.message, "success")
					} else {
						toast("Something went wrong.", "error")
					}
				})
				.catch(error => {
					console.error("Error fetching links:", error)
				})
		}
	})
}
