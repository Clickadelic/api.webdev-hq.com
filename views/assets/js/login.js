if (window.location.pathname === "/login") {
	document.addEventListener("DOMContentLoaded", () => {
		document.getElementsByTagName("form")[0].addEventListener("submit", e => {
			handleLogin(e);
		});
	});
}

const handleLogin = e => {
	e.preventDefault();

	const username = document.querySelector("input[name='username']").value;
	const password = document.querySelector("input[name='password']").value;

	if (!username || !password) {
		showLoginMessage("alert", "Please fill out all fields.");
		return;
	}

	const formData = {
		username,
		password
	};

	fetch("/common/v1/auth/login", {
		method: "post",
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
				showLoginMessage("success", "Login successful!");
				document.querySelector("input[name='username']").value = "";
				document.querySelector("input[name='password']").value = "";
			}
		})
		.catch(error => {
			console.error("There was a problem with the fetch operation:", error);
		});
};

const showLoginMessage = (msgClass, message) => {
	const msgBox = document.getElementById("user-feedback");
	msgBox.classList.add(msgClass);
	msgBox.innerHTML = message;
	setTimeout(() => {
		msgBox.classList.remove(msgClass);
		msgBox.innerHTML = "";
	}, 2000);
	return;
};
