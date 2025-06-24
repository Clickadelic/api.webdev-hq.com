document.addEventListener("DOMContentLoaded", () => {
	const btns = document.getElementsByClassName("dropdown-btn")
	const dropdowns = document.getElementsByClassName("dropdown-menu")

	for (let i = 0; i < btns.length; i++) {
		btns[i].addEventListener("click", e => {
			e.stopPropagation() // Verhindert sofortiges Schließen
			dropdowns[i].classList.toggle("hidden")
			const expanded = btns[i].getAttribute("aria-expanded") === "true"
			btns[i].setAttribute("aria-expanded", String(!expanded))
		})
	}

	// Click outside handler
	document.addEventListener("click", () => {
		for (let i = 0; i < dropdowns.length; i++) {
			if (!dropdowns[i].classList.contains("hidden")) {
				dropdowns[i].classList.add("hidden")
				btns[i].setAttribute("aria-expanded", "false")
			}
		}
	})
})
