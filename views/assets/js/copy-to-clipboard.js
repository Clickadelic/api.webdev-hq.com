if (window.location.pathname === "/") {
	const copyToClipboard = document.getElementById("copy-to-clipboard")
	const apiUrl = document.querySelector("code").innerText
	copyToClipboard.addEventListener("click", () => {
		navigator.clipboard.writeText(apiUrl)
		alert("Copied to clipboard")
	})
}
