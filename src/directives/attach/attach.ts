import type { Directive, DirectiveBinding } from "vue";

const action = (el: HTMLElement, binding: DirectiveBinding): void => {
		/**
		 * get the cordinates of the bind and use that to update
		 * the position of the element the directive has been attched
		 * to
		 */

		const { value, modifiers } = binding;

		if (!value) throw new Error('v-attach directive doesn\'t have a value');

		const boundEl = document.querySelector(`.${value}`);
		if (!boundEl) return;

		const { left, top } = boundEl.getBoundingClientRect()

		el.style.position = 'fixed';
		el.style.top = `${top}px`;
		el.style.left = `${left}px`;

		if (modifiers.fullWidth) {
			el.style.width = window.getComputedStyle(boundEl) .width;
		}
}

const attach: Directive = {
	mounted(el: HTMLElement, binding: DirectiveBinding) {
		action(el, binding);
		window.addEventListener('scroll', () => action(el, binding), true)
	},
}

export default attach;