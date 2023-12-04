import { shallowMount } from "@vue/test-utils";
import { describe, it, expect } from 'vitest';
import FormDisable from "."; 

const component = shallowMount({
	directives: {
		FormDisable
	},
	data() {
		return {
			isDisabled: true
		}
	},
	template: `
		<div v-form-disable="isDisabled">
			<input id="input"/>
			<button id="btn"></button>
		</div>
	`
})

describe('FormDisable directive', () => {
	it ('disables all children input elements', async () => {
		const inputEl = component.find('#input');
		const btnEl = component.find('#btn');

		expect(inputEl.attributes('disabled')).toBe("");

		await btnEl.trigger('click');

		expect(component.emitted()).toEqual({});
	})

	it ('resets disable attribute', async () => {
		await component.setData({ isDisabled: false });

		const inputEl = component.find('#input');
		const btnEl = component.find('#btn');

		expect(inputEl.attributes('disabled')).toBeUndefined()

		await btnEl.trigger('click');

		expect(component.emitted()).toHaveProperty('click');
	})
})