import { Directive, DirectiveBinding } from "vue";

const action = (el: HTMLElement, value: boolean) => {
	const inputElements = el.querySelectorAll('input');

	if (value) {
		inputElements.forEach(element => {
			element.disabled = true;
		})

		el.addEventListener('submit', (event: SubmitEvent) => {
			event.preventDefault();
		}, true)
	} else {
		destroyAction(el)
	}
}

const destroyAction = (el: HTMLElement) => {
	const inputElements = el.querySelectorAll('input');

	inputElements.forEach(element => {
		element.disabled = false;
	})
	el.removeEventListener('submit', () => {})
}

const FormDisable: Directive = {
	mounted(el: HTMLElement, { value }: DirectiveBinding) {
		action(el, value);
	},
	updated(el: HTMLElement, { value }: DirectiveBinding) {
		action(el, value);
	},
	unmounted(el: HTMLElement) {
		destroyAction(el);
	}
}

export default FormDisable;