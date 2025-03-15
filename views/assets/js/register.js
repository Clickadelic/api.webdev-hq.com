
if (window.location.pathname === "/register") {
	document.addEventListener("DOMContentLoaded", () => {
		document.getElementsByTagName("form")[0].addEventListener("submit", e => {
			handleRegister(e);
		});
	});
}

const handleRegister = e => {
	e.preventDefault();

	const username = document.querySelector("input[name='username']").value;
	const email = document.querySelector("input[name='email']").value;
	const password = document.querySelector("input[name='password']").value;
	const passwordRepeat = document.querySelector("input[name='password-repeat']").value;
	const agreedToTerms = document.querySelector("input[name='agreed-to-terms']").value;

	if (!username || !email || !password || !passwordRepeat || !agreedToTerms) {
		showRegisterMessage("alert", "Please fill out all fields.");
		return;
	}

	const formData = {
		username,
		email,
		password,
		passwordRepeat,
		agreedToTerms
	};
	alert("YOU MADE IT")
	
	console.log(formData)

	fetch("/common/v1/auth/register", {
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
			if (data.message === "login_successful") {
				showRegisterMessage("success", "Login successful!");
				document.querySelector("input[name='username']").value = "";
				document.querySelector("input[name='email']").value = "";
				document.querySelector("input[name='password']").value = "";
				document.querySelector("input[name='password-repeat']").value = "";
				document.querySelector("input[name='agreed-to-terms']").value = "";
			}
		})
		.catch(error => {
			console.error("There was a problem with the fetch operation:", error);
		});
};

const showRegisterMessage = (msgClass, message) => {
	const msgBox = document.getElementById("user-feedback");
	msgBox.classList.add(msgClass);
	msgBox.innerHTML = message;
	setTimeout(() => {
		msgBox.classList.remove(msgClass);
		msgBox.innerHTML = "";
	}, 2000);
	return;
};
