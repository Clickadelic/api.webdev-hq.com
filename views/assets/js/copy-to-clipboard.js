if (document.getElementById("copy-to-clipboard") && window.location.pathname === "/") {
	const copyToClipboard = document.getElementById("copy-to-clipboard")
	const apiUrl = document.querySelector("code")
	copyToClipboard.addEventListener("click", () => {
		apiUrl.setAttribute("style", "color: #1581e6")
		navigator.clipboard.writeText(apiUrl.innerText)
		apiUrl.innerText = "Copied!"
		setTimeout(() => apiUrl.removeAttribute("style"), 2000)
		setTimeout(() => (apiUrl.innerText = "https://api.webdev-hq.com/common/v1/info"), 2000)
	})
}
