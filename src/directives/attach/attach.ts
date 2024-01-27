import type { Directive, DirectiveBinding } from "vue";

const action = async (el: HTMLElement, binding: DirectiveBinding): Promise<void> => {
		/**
		 * get the position of the binded element and use that to update
		 * the position of the element the directive has been attched to
		 */

		const { value, modifiers } = binding;

		if (!value) throw new Error('v-attach directive doesn\'t have a value');

		const boundEl = document.querySelector(`.${value}`);
		if (!boundEl) return;

		const { left, top, bottom } = boundEl.getBoundingClientRect()
		const { height: elHeight, bottom: elBottom, top: elTop } = el.getBoundingClientRect();

		if (modifiers.fullWidth) {
			el.style.width = window.getComputedStyle(boundEl).width;
		}

		el.style.position = 'fixed';
		el.style.left = `${left}px`;

		/**
		 * the item is comfortably in the viewport
		 * just continue doing regular updates
		 */
		if (elTop >= 0 && elBottom <= window.innerHeight) {
			if (el.classList.contains('or-item-bottom')) {
				el.style.top = `${top}px`;
				return;
			}

			if (el.classList.contains('or-item-top')) {
				el.style.top = `${bottom - elHeight}px`;
				return;
			}
		}

		if (
			/**
			 * if setting the item to the bottom of the bound el
			 * would make it go past the bottom of the window 
			 */
			(top + elHeight) > window.innerHeight
			||
			elBottom >= window.innerHeight
		) {
			el.classList.remove('or-item-bottom');
			el.classList.add('or-item-top')
			el.style.top = `${bottom - elHeight}px`;
		} else {
			el.classList.remove('or-item-top');
			el.classList.add('or-item-bottom');
			el.style.top = `${top}px`;
		}
}

const attach: Directive = {
	mounted(el: HTMLElement, binding: DirectiveBinding) {
		if (document.readyState === 'complete') {
			action(el, binding);
		} else {
			window.addEventListener('load', () => action(el, binding));
		}

		window.addEventListener('scroll', () => action(el, binding), true)
	},
}

export default attach;