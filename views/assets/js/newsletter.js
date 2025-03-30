if (window.location.pathname === "/newsletter") {
	document.addEventListener("DOMContentLoaded", () => {
		document.getElementsByTagName("form")[0].addEventListener("submit", e => {
			handleNewsletterSubscribtion(e)
		})
	})
}

const handleNewsletterSubscribtion = async e => {
	e.preventDefault()
	const subscribername = document.querySelector("input[name='subscribername']").value
	const email = document.querySelector("input[name='email']").value
	const agreedToSubscription = document.querySelector("input[name='agreed-to-subscription']").checked

	if (!subscribername || !email || !agreedToSubscription) {
		showUserMessage("bg-rose-200", "Please fill out all fields.")
		return
	}

	const formData = {
		subscribername,
		email,
		agreedToSubscription
	}

	try {
		await fetch("/common/v1/newsletter/subscribe", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(formData)
		}).then(response => {
			if (response.ok) {
				subscribername.value = ""
				email.value = ""
				agreedToSubscription.checked = false
				showUserMessage("bg-green-200", "Subscribtion successful.")
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
