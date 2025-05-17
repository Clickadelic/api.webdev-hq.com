document.addEventListener("DOMContentLoaded", () => {
	const button = document.getElementById("menu-button")
	const menu = document.getElementById("dropdown-menu")
	const megaMenuBtn = document.getElementById("mega-menu-btn")
	const megaMenu = document.getElementsByClassName("mega-menu")[0]

	megaMenuBtn.addEventListener("click", event => {
		event.stopPropagation()
		megaMenuBtn.classList.toggle("text-mantis-primary")
		megaMenu.classList.toggle("hidden")
	})

	document.addEventListener("click", event => {
		if (!megaMenuBtn.contains(event.target) && !megaMenu.contains(event.target)) {
			megaMenu.classList.add("hidden")
			megaMenuBtn.classList.remove("text-mantis-primary")
		}
	})
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
