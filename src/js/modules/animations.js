import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';

export default function animations() {
	if (window.innerWidth >= 1170) {
		gsap.registerPlugin(ScrollTrigger);

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.about-list',
				start: 'center bottom', // Начать анимацию при попадании элемента в центр экрана
			},
		});

		const tlStats = gsap.timeline({
			scrollTrigger: {
				trigger: '.callback .stats',
				start: 'center bottom', // Начать анимацию при попадании элемента в центр экрана
			},
		});

		document.querySelectorAll('.about-list .item-number').forEach((item) => {
			const numEl = item.querySelector('span');

			if (numEl) {
				const finalValue = numEl.textContent;
				numEl.textContent = 0;
				tl.to(
					numEl,
					{
						textContent: finalValue, // Конечное значение счетчика
						duration: 3, // Длительность анимации
						ease: 'power1.out',
						snap: { textContent: 1 }, // Округление до целого числа
					},
					0,
				);
			}
		});

		const items = gsap.utils.toArray('.callback .stats .item-number span');
		const formatter = getFormatter(1);

		tlStats.from(items, {
			textContent: 0,
			duration: 3,
			ease: 'power1.in',
			onUpdate() {
				let i = items.length;
				while (i--) {
					items[i].innerText = formatter(items[i].innerText);
				}
			},
		});

		function getFormatter(increment, pad) {
			let snap = gsap.utils.snap(increment),
				exp = /\B(?=(\d{3})+(?!\d))/g,
				snapWithCommas = (value) => (snap(+value) + '').replace(exp, ','),
				whole = increment % 1 === 0,
				decimals = whole ? 0 : ((increment + '').split('.')[1] || '0').length;
			return !pad || whole
				? snapWithCommas
				: (value) => {
						let s = snapWithCommas(value),
							i = s.indexOf('.');
						~i || (i = s.length);
						return (
							s.substr(0, i) +
							'.' +
							(s.substr(i + 1, s.length - i - 1) + '00000000').substr(0, decimals)
						);
				  };
		}
	}
}
