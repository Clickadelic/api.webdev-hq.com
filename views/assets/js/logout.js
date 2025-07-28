if (window.location.pathname === localStorage.getItem("token") || window.location.pathname !== "/newsletter" ||  window.location.pathname !== "/auth/confirm") {
	document.addEventListener("DOMContentLoaded", () => {
		if(document.getElementById("logout-btn")) {
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
		}

	})
}
