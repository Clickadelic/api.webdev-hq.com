if (window.location.pathname === "/emails") {
	document.addEventListener("DOMContentLoaded", function () {
		const emailBtn = document.getElementById("send-email-button");
		emailBtn.addEventListener("click", () => {
			console.log("Email button clicked");
		});
	});
}
