if (window.location.pathname === "/dashboard") {
	document.addEventListener("DOMContentLoaded", () => {
		fetch("/common/v1/links", {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		})
			.then(response => response.json())
			.then(data => {
				document.querySelector(".link-count").innerHTML = data.length
			})
			.catch(error => {
				console.error("Error fetching links:", error)
			})
	})
}
