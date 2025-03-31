document.addEventListener("DOMContentLoaded", function () {
	const menuBtn = document.getElementById("menu-btn")
	const megaMenu = document.getElementsByClassName("mega-menu")[0]

	menuBtn.addEventListener("click", event => {
		event.stopPropagation()
		menuBtn.classList.toggle("text-mantis-primary")
		megaMenu.classList.toggle("hidden")
	})

	document.addEventListener("click", event => {
		if (!menuBtn.contains(event.target) && !megaMenu.contains(event.target)) {
			megaMenu.classList.add("hidden")
			menuBtn.classList.remove("text-mantis-primary")
		}
	})
})
