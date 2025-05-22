document.addEventListener("DOMContentLoaded", () => {
	const megaMenuBtn = document.getElementById("mega-menu-btn")
	const megaMenu = document.getElementsByClassName("mega-menu-content")[0]

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
})
