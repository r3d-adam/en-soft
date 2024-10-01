import validate from 'validate.js';
import IMask from 'imask';

export default function forms() {
	const status = {
		error: 0,
		success: 1,
	};

	const statusSelector = '.status-label';

	// атрибут "name" инпутов, обязательные поля:
	const constraints = {
		name: {
			presence: true,
		},
		phone: {
			presence: true,
			format: {
				pattern:
					/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
				message: 'Неверный формат номера телефона',
			},
		},
		email: {
			presence: true,
		},
	};

	const setStatus = (form, newStatus) => {
		const statusEl = form.querySelector(statusSelector);
		if (statusEl && newStatus !== undefined) {
			if (newStatus === status.error) {
				statusEl.classList.remove('success');
				statusEl.classList.add('error');
			} else if (newStatus === status.success) {
				statusEl.classList.add('success');
				statusEl.classList.remove('error');
			}
		}
	};

	const changeInputHandler = (e) => {
		e.target.classList.remove('error');
	};

	// const validate = (form) => {
	// 	if (form) {
	// 		let isValid = true;
	// 		form.querySelectorAll('input[required], textarea[required]').forEach((element) => {
	// 			if (element.value === undefined || element.value.length === 0) {
	// 				element.classList.add('error');
	// 				isValid = false;
	// 			} else {
	// 				element.classList.remove('error');
	// 			}
	// 		});
	// 		// add more rules
	// 		return isValid;
	// 	}
	// };

	document.querySelectorAll('input[type="tel"]').forEach((input) => {
		IMask(input, {
			mask: '+{7}(000)000-00-00',
		});
	});

	document.querySelectorAll('form').forEach((form) => {
		form.addEventListener('submit', function (e) {
			e.preventDefault();

			const formData = new FormData(form);

			const formConstraints = {};
			// проверяем есть ли поля в форме из constraints
			for (const key of formData.keys()) {
				if (constraints[key]) {
					formConstraints[key] = constraints[key];
				}
			}

			// console.log(formConstraints);

			const validationErrors = validate(validate.collectFormValues(form), formConstraints);
			const isValid = !validationErrors;

			if (validationErrors && Object.keys(validationErrors)) {
				Object.keys(validationErrors).forEach((input) => {
					form[input].classList.add('error');
					form[input].addEventListener('change', changeInputHandler, { once: true });
				});
			}
			if (!isValid) {
				setStatus(form, status.error);
				return;
			}

			fetch('/files/fake-mail.php', {
				body: formData,
				method: 'POST',
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error(response.statusText);
					}
					return response.json();
				})
				.then((json) => {
					// при успешной отправке сервер должен посылать json с status: "success"
					if (json.status === 'success') {
						setStatus(form, status.success);
					} else {
						throw new Error('Ошибка отправки заявки');
					}
				})
				.catch((error) => {
					console.error(error);
					setStatus(form, status.error);
				})
				.finally(() => {
					form.reset();
				});
		});
	});
}
