import { register } from './api.js';
import { isEmptyField } from './utils.js';
window.addEventListener('DOMContentLoaded', init);

const form = document.querySelector('form');
form.addEventListener('submit', onSubmit);

function init() {
	document.getElementById('user').style.display = 'none';
	document.querySelector('nav .email span').textContent = 'guest';
}

async function onSubmit(event) {
	event.preventDefault();

	if (isEmptyField(form)) {
		alert('Please, fill all fields');
		return;
	}

	const formData = new FormData(event.target);
	const data = {
		email: formData.get('email'),
		password: formData.get('password'),
	};
	const repass = formData.get('rePass');

	if (repass != data.password) {
		alert("Passwords don't match");
		return;
	}

	try {
		const result = await register(data);

		const userData = {
			email: result.email,
			id: result._id,
			accessToken: result.accessToken,
		};

		sessionStorage.setItem('userData', JSON.stringify(userData));
		window.location = './index.html';
	} catch (error) {
		alert(error.message);
	}
}
