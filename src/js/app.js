import Swiper from 'swiper';
import MicroModal from 'micromodal';
import { Navigation, Pagination, Parallax, EffectFade } from 'swiper/modules';
import forms from './modules/forms.js';
import mobileMenu from './modules/mobileMenu.js';
import animations from './modules/animations.js';

document.addEventListener('DOMContentLoaded', () => {
	forms();
	mobileMenu();
	animations();

	(function Hero() {
		const heroSliderSelector = '.hero-slider';
		if (!document.querySelector(heroSliderSelector)) {
			return;
		}

		const swiper = new Swiper(heroSliderSelector, {
			modules: [Navigation, Pagination, EffectFade, Parallax],
			pagination: {
				el: '.swiper-pagination',
				type: 'fraction',
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			loop: true,
			effect: 'fade',
			crossFade: true,
			parallax: true,
			speed: 500,
		});
	})();

	(function ShowMore() {
		const btnSelector = '.btn-show-more';
		const cardsContainerSelector = '.cards';
		const classHide = 'd-none';

		const btn = document.querySelector(btnSelector);

		if (!btn) {
			return;
		}

		document.querySelector(btnSelector).addEventListener('click', (e) => {
			e.preventDefault();

			const cardsContainer = document.querySelector(cardsContainerSelector);
			if (cardsContainer) {
				[...cardsContainer.children].forEach((card) => {
					card.classList.remove(classHide);
				});
			}
		});
	})();

	(function Modal() {
		MicroModal.init({
			openClass: 'is-open',
			disableScroll: true,
			onShow: (modal) => (document.documentElement.style.overflow = 'hidden'),
			onClose: (modal) => (document.documentElement.style.overflow = ''),
		});
	})();
});
