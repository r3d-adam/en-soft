// Проверка поддержки webp, добавление класса webp или no-webp для html
export function isWebp() {
	// Проверка поддержки  webp
	function testWebP(callback) {
		const webP = new Image();
		// eslint-disable-next-line no-multi-assign
		webP.onload = webP.onerror = function () {
			callback(webP.height === 2);
		};
		webP.src =
			'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
	}
	// Добавление класса _webP или _no-webp для HTML
	testWebP(function (support) {
		const className = support === true ? 'webp' : 'no-webp';
		document.documentElement.classList.add(className);
	});
}
