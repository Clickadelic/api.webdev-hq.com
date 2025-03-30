if (window.location.pathname === "/newsletter") {
	document.addEventListener("DOMContentLoaded", () => {
		document.getElementsByTagName("form")[0].addEventListener("submit", e => {
			handleNewsletterSubscribtion(e)
		})
	})
}

const handleNewsletterSubscribtion = async e => {
	e.preventDefault()

	const username = document.querySelector("input[name='username']").value
	const email = document.querySelector("input[name='email']").value
	const agreedToTerms = document.querySelector("input[name='agreed-to-terms']").checked

	if (!username || !password || !passwordRepeat || !agreedToTerms) {
		showUserMessage("bg-rose-200", "Please fill out all fields.")
		return
	}

	if (password !== passwordRepeat) {
		showUserMessage("bg-rose-200", "Passwords do not match.")
		return
	}

	const formData = {
		username,
		email,
		password,
		passwordRepeat,
		agreedToTerms
	}

	try {
		await fetch("/common/v1/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(formData)
		}).then(response => {
			if (response.ok) {
				showUserMessage("bg-green-200", "Registration successful.")
			}
		})
	} catch (error) {
		console.log(error)
	}
}

const showUserMessage = (messageClasses, message) => {
	const messageBox = document.getElementById("message-box")
	messageBox.classList.add(messageClasses)
	messageBox.innerHTML = message
	setTimeout(() => {
		messageBox.classList.remove(messageClasses)
		messageBox.innerHTML = ""
	}, 2000)
	return
}
