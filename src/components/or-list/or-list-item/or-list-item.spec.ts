import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { OrListItem } from '..';

const factory = (props = {}, slots = {}) => {
	return mount(OrListItem, {
		attachTo: document.body,
		props,
		slots
	})
}

describe('OrListItem.vue', () => {
	it ('displays the header and body prop by default', () => {
		const header = 'Header Text';
		const body = 'Body Text';

		const component = factory({
			header,
			body
		});

		expect(component.html()).toContain(header)
		expect(component.html()).toContain(body)
	});

	it ('displays content of slots', () => {
		const prefix = 'Prefix Text';
		const suffix = 'Suffix Text';

		const component = factory({}, {
			prefix,
			suffix
		});

		expect(component.html()).toContain(prefix);
		expect(component.html()).toContain(suffix);
	});
})