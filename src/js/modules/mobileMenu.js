const MOBILE_MENU_BREAKPOINT = 992;
export default function mobileMenu() {
	const burger = document.getElementById('burger');
	const headerMenu = document.querySelector('.header .header-nav-wrap');

	burger.addEventListener('click', (e) => {
		if (burger.classList.contains('active')) {
			burger.classList.remove('active');

			headerMenu.classList.remove('active');
		} else {
			burger.classList.add('active');

			headerMenu.classList.add('active');
		}
	});

	document.querySelectorAll('.header-menu a + ul').forEach((item) => {
		const link = item.previousElementSibling;
		link.addEventListener('click', (e) => {
			if (window.innerWidth < MOBILE_MENU_BREAKPOINT) {
				e.preventDefault();

				if (link.classList.contains('active')) {
					item.classList.remove('active');

					link.classList.remove('active');
				} else {
					item.classList.add('active');

					link.classList.add('active');
				}
			}
		});
	});
}
