if (window.location.pathname === "/auth/confirm") {
	document.addEventListener("DOMContentLoaded", () => {
		validateToken()
	})
}

async function validateToken () {
	const messageBox = document.getElementById("message-box")
	messageBox.classList.remove("hidden")
	messageBox.classList.add("border-sky-500", "bg-sky-100", "text-sky-700")
	messageBox.innerHTML = "Verifying token..."
	const token = window.location.search.split("=")[1]
	const response = await fetch("/common/v1/auth/confirm?token=" + token, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ token })
	})
	const data = await response.json()
	if (response.ok) {
		messageBox.classList.remove("border-sky-500", "bg-sky-100", "text-sky-700")
		messageBox.classList.add("border-green-500", "bg-green-100", "text-green-700")
		messageBox.innerHTML = data.message
		setTimeout(() => {
			window.location.href = "/auth/login"
		}, 3500)
	} else {
		messageBox.classList.remove("hidden")
		messageBox.classList.add("border-rose-500", "bg-rose-100", "text-rose-700")
		messageBox.innerHTML = data.message
	}
}
