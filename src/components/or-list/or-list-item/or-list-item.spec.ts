import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { OrListItem, Events } from '..';
import OrCheckbox from '@/components/or-checkbox';

const factory = (props = {}, slots = {}) => {
	return mount(OrListItem, {
		attachTo: document.body,
		components: {
			OrCheckbox
		},
		props,
		slots
	})
}

describe('OrListItem.vue', () => {
	it ('displays checkbox dependent on checkable prop value', async () => {
		const component = factory({
			checkable: false
		})

		expect(component.find('[data-testid="checkbox"]').exists()).toBeFalsy();

		await component.setProps({ checkable: true })
		expect(component.find('[data-testid="checkbox"]').exists()).toBeTruthy();
	})

	it ('displays default slot values', () => {
		const text = 'Hello world';
		const component = factory({}, {
			default: text 
		})

		expect(component.html()).toContain(text)
	})

	it('emits events on checkbox toggle', async () => {
		const value = 'hello world';
		const component = factory({
			checkable: true,
			value
		})

		const checkbox = component.find('[data-testid="checkbox"]');
		await checkbox.trigger('click')

		expect(component.emitted()).toHaveProperty(Events.ITEM_CHECK);

		await checkbox.trigger('click');

		expect(component.emitted()).toHaveProperty(Events.ITEM_UNCHECK);
	})
})