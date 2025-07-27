document.addEventListener("DOMContentLoaded", function () {
	const modal = document.getElementById("modal")
	const modalCloseBtns = document.getElementsByClassName("modal-close")
	const modalOpenBtns = document.getElementsByClassName("modal-open")

	// HTMLCollection in Array umwandeln, dann EventListener setzen
	Array.from(modalCloseBtns).forEach(closeBtn => {
		closeBtn.addEventListener("click", () => {
			modal.classList.add("hidden")
			modal.classList.remove("flex")
		})
	})
	// HTMLCollection in Array umwandeln, dann EventListener setzen
	Array.from(modalOpenBtns).forEach(openBtn => {
		openBtn.addEventListener("click", () => {
			modal.classList.add("flex")
			modal.classList.remove("hidden")
		})
	})

	modal.addEventListener("click", event => {
		if (event.target === modal) {
			modal.classList.add("hidden")
			modal.classList.remove("flex")
		}
	})
})
