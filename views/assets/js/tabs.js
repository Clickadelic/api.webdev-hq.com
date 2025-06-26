if (window.location.pathname === "/account") {
	document.addEventListener("DOMContentLoaded", () => {
		const tabButtons = document.querySelectorAll(".tab-btn")
		const tabPanes = document.querySelectorAll(".tab-pane")

		for (let i = 0; i < tabButtons.length; i++) {
			tabButtons[i].addEventListener("click", function () {
				// rimuove la classe "active" dai bottoni delle tab
				document.querySelector(".tab-btn.active").classList.remove("active")

				// aggiunge la classe "active" al bottone della tab corrente
				this.classList.add("active")

				// nasconde tutti i contenuti delle tab
				for (let j = 0; j < tabPanes.length; j++) {
					tabPanes[j].classList.remove("active")
				}

				// mostra il contenuto della tab corrente
				const tab = this.getAttribute("data-tab")
				document.querySelector(`.tab-pane[data-tab="${tab}"]`).classList.add("active")
			})
		}
	})
}
