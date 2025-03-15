
if (window.location.pathname === "/newsletter") {
	document.addEventListener("DOMContentLoaded", () => {
		document.getElementsByTagName("form")[0].addEventListener("submit", e => {
			handleSubscribtion(e);
		});
	});
}

const handleSubscribtion = e => {
	e.preventDefault();

	const subscribername = document.querySelector("input[name='subscribername']").value;
	const email = document.querySelector("input[name='email']").value;
	const agreedToSubscribtion = document.querySelector("input[name='agreed-to-subscribtion']").value;

	if (!subscribername ||!email) {
		showLoginMessage("alert", "Please enter a name and an e-mail address.");
		return;
	}

	const formData = {
        subscribername,
		email,
        agreedToSubscribtion
	};

	console.log(formData)

	fetch("/common/v1/subscribers/subscribe", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(formData)
	})
		.then(res => {
			if (!res.ok) {
				throw new Error("Network response was not ok");
			}
			return res.json();
		})
		.then(data => {
			if (data.message === "user_successfully_subscribed") {
				showSubscribtionMessage("success", "Subscribtion successful!");
				document.querySelector("input[name='subscribername']").value = "";
				document.querySelector("input[name='email']").value = "";
			}
		})
		.catch(error => {
			console.error("There was a problem with the fetch operation:", error);
		});
};

const showSubscribtionMessage = (msgClass, message) => {
	const msgBox = document.getElementById("user-feedback");
	msgBox.classList.add(msgClass);
	msgBox.innerHTML = message;
	setTimeout(() => {
		msgBox.classList.remove(msgClass);
		msgBox.innerHTML = "";
	}, 2000);
	return;
};
