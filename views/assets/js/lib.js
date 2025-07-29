export const validateEmail = email => {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return re.test(String(email).toLowerCase())
}

export const validatePassword = password => {
	const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
	return re.test(String(password).toLowerCase())
}

export const getCookie = name => {
	const value = `; ${document.cookie}`
	const parts = value.split(`; ${name}=`)
	if (parts.length === 2) return parts.pop().split(";").shift()
}

export const getFormData = name => {
	return {
		title: document.querySelector("input[name='title']").value.trim(),
		url: document.querySelector("input[name='url']").value.trim(),
		description: document.querySelector("textarea[name='description']").value.trim(),
		isPublic: document.querySelector("input[name='is-public']").checked
	}
}

export const fillFormWithData(data) {
	document.querySelector("input[name='title']").value = data.title || ""
	document.querySelector("input[name='url']").value = data.url || ""
	document.querySelector("textarea[name='description']").value = data.description || ""
	document.querySelector("input[name='is-public']").checked = !!data.isPublic
}

export const validateFormData({ title, url, description }) {
	if (!title || !url || !description) {
		toast("Please fill out all required fields.", "error")
		return false
	}
	return true
}
