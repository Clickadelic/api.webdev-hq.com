console.log("Mega menu...")

document.addEventListener("DOMContentLoaded", function () {
	const menuBtn = document.getElementById("menu-btn")
	const megaMenu = document.getElementsByClassName("mega-menu")[0]

	menuBtn.addEventListener("click", () => {
		megaMenu.classList.toggle("hidden")
	})
})
