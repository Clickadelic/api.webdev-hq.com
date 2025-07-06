document.addEventListener("DOMContentLoaded", function () {
	const modal = document.getElementById("modal")
	const modalCloseBtns = document.getElementsByClassName("modal-close")
	const modalOpen = document.getElementById("modal-open")

	// HTMLCollection in Array umwandeln, dann EventListener setzen
	Array.from(modalCloseBtns).forEach(closeBtn => {
		closeBtn.addEventListener("click", () => {
			modal.classList.add("hidden")
			modal.classList.remove("flex")
		})
	})

	modal.addEventListener("click", event => {
		if (event.target === modal) {
			modal.classList.add("hidden")
			modal.classList.remove("flex")
		}
	})

	modalOpen?.addEventListener("click", () => {
		modal.classList.remove("hidden")
		modal.classList.add("flex")
	})
})
