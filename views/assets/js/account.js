if (window.location.pathname === "/account") {
	document.addEventListener("DOMContentLoaded", function () {
		const tabs = document.querySelectorAll("[data-tab]")
		const contents = document.querySelectorAll("[data-content]")

		tabs.forEach(tab => {
			tab.addEventListener("click", () => {
				// Aktive Klasse bei allen Tabs entfernen
				tabs.forEach(t => t.classList.remove("border-b-2", "border-blue-500", "text-blue-600"))

				// Inhalte ausblenden
				contents.forEach(c => c.classList.add("hidden"))

				// Aktiven Tab hervorheben
				tab.classList.add("border-b-2", "border-blue-500", "text-blue-600")

				// Zugehörigen Inhalt anzeigen
				const target = tab.getAttribute("data-tab")
				document.querySelector(`[data-content="${target}"]`).classList.remove("hidden")
			})
		})

		// Ersten Tab aktivieren beim Laden
		tabs[0].click()
	})
}
