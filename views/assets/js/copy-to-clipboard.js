if (window.location.pathname === "/") {
	const copyToClipboard = document.getElementById("copy-to-clipboard")
	const apiUrl = document.querySelector("code")
	copyToClipboard.addEventListener("click", () => {
		apiUrl.setAttribute("style", "color: #1581e6")
		apiUrl.innerText = "Copied!"
		navigator.clipboard.writeText(apiUrl.innerText)
		setTimeout(() => apiUrl.removeAttribute("style"), 2000)
		setTimeout(() => (apiUrl.innerText = "https://api.webdev-hq.com/common/v1"), 2000)
	})
}
