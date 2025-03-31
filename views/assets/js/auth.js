export const fetchProtectedData = async () => {
	const token = localStorage.getItem("token")

	if (!token) {
		console.log("Kein Token vorhanden. Bitte einloggen.")
		return
	}

	try {
		const response = await fetch("/dashboard", {
			method: "GET",
			headers: { Authorization: `Bearer ${token}` }
		})

		if (response.ok) {
			const data = await response.json()
			console.log("Geschützte Daten:", data)
		} else {
			console.log("Zugriff verweigert.")
		}
	} catch (error) {
		console.log("Fehler beim Abrufen der Daten:", error)
	}
}
