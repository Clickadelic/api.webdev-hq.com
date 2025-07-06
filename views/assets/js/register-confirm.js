const showUserMessage = require("./lib").showUserMessage

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
						showUserMessage("bg-emerald-200", data.message)
					}
				})
				.catch(error => {
					console.error("Error fetching links:", error)
				})
		}
	})
}
