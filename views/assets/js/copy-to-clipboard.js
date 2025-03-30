if (window.location.pathname === "/") {
	document.addEventListener("DOMContentLoaded", function () {
		const copyToClipboard = document.getElementById("copy-to-clipboard")
		copyToClipboard.addEventListener("click", () => {
			navigator.clipboard.writeText(window.location.href)
		})
	})
}
