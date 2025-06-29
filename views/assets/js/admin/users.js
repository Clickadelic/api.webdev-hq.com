if (window.location.pathname === "/admin/users") {
	document.addEventListener("DOMContentLoaded", function () {
		const users = fetch("/common/v1/users", {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		})
			.then(response => {
				if (response.ok) {
					return response.json()
				}
			})
			.then(data => {
				data.forEach(user => {
					const userRow = document.createElement("tr")
					userRow.id = `user-${user.id}`
					userRow.classList.add("w-full", "flex", "justify-between", "mb-2")

					userRow.innerHTML = `
						<td class="w-1/3">${user.username}</td>
						<td class="w-1/3">${user.email}</td>
						<td class="w-1/3">${user.role}</td>
					`

					const table = document.getElementById("users-table")
					table.appendChild(userRow)
				})
			})
			.catch(error => {
				console.error("Error fetching users:", error)
			})
	})
}
