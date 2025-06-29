if (localStorage.getItem("token")) {
	document.addEventListener("DOMContentLoaded", () => {
		const logoutBtn = document.getElementById("logout-btn")

		logoutBtn.addEventListener("click", event => {
			event.stopPropagation()

			fetch("/common/v1/auth/logout", {
				method: "POST"
			}).then(response => {
				if (response.ok) {
					window.location.href = "/"
				}
			})
		})
	})
}
