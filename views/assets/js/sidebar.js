if(document.getElementById("btn-sidebar-toggle")) {
    document.getElementById("btn-sidebar-toggle").addEventListener("click", () => {
        toggleDashboardSidebar()
    })
}

function toggleDashboardSidebar() {

    const sidebar = document.getElementById("main-sidebar")
    const logoText = document.getElementById("logo-text")

    if(logoText.classList.contains("lg:flex")) {
        sidebar.classList.remove("lg:flex")
    }

    if(sidebar.classList.contains("md:w-64")) {
        sidebar.classList.remove("md:w-64")
        sidebar.classList.add("md:w-16")
    } else {
        sidebar.classList.add("hidden")
    }
}

