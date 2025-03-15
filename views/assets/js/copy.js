function copyUrl() {
	const copyText = document.getElementById("api-url");
	const btnText = document.getElementById("copy-btn");
	navigator.clipboard.writeText(copyText.innerHTML);
	btnText.innerHTML = "URL copied to clipboard!";
	setTimeout(() => {
		btnText.innerHTML = "Copy url";
	}, 2500);
}

document.addEventListener("DOMContentLoaded", () => {
	if (window.location.pathname === "/") {
		document.getElementById("copy-btn").addEventListener("click", () => {
			copyUrl();
		});
	}
});
