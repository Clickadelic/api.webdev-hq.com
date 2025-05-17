document.addEventListener("DOMContentLoaded", () => {
	const button = document.getElementById("menu-button")
	const menu = document.getElementById("dropdown-menu")

	button.addEventListener("click", e => {
		e.stopPropagation() // Verhindert sofortiges Schließen
		menu.classList.toggle("hidden")
		const expanded = button.getAttribute("aria-expanded") === "true"
		button.setAttribute("aria-expanded", String(!expanded))
	})

	// Klick außerhalb schließt Dropdown
	document.addEventListener("click", e => {
		if (!button.contains(e.target)) {
			menu.classList.add("hidden")
			button.setAttribute("aria-expanded", "false")
		}
	})

	// ESC-Taste schließt Dropdown
	document.addEventListener("keydown", e => {
		if (e.key === "Escape") {
			menu.classList.add("hidden")
			button.setAttribute("aria-expanded", "false")
		}
	})
})
