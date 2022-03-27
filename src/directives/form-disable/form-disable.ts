import { Directive, DirectiveBinding } from "vue";

const action = (el: HTMLElement, value: boolean) => {
	const inputElements = el.querySelectorAll('input');
	const buttonElements = el.querySelectorAll('button');

	if (value) {
		inputElements.forEach(element => {
			element.disabled = true;
		})

		buttonElements.forEach(element => {
			element.disabled = true;
		})

		el.addEventListener('submit', (event: Event) => {
			event.preventDefault();
		}, true)
	} else {
		destroyAction(el)
	}
}

const destroyAction = (el: HTMLElement) => {
	const inputElements = el.querySelectorAll('input');
	const buttonElements = el.querySelectorAll('button');

	inputElements.forEach(element => {
		element.disabled = false;
	})

	buttonElements.forEach(element => {
		element.disabled = false;
	})

	el.removeEventListener('submit', () => {})
	el.removeEventListener('click', () => {})
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