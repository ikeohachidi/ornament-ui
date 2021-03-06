import { mount } from '@vue/test-utils';
import { h } from 'vue';
import { OrList, OrListItem } from '.';

const factory = (props = {}, slots = {}) => {
	return mount(OrList, {
		attachTo: document.body,
		components: {
			OrListItem
		},
		props,
		slots
	})
}

describe('OrList', () => {
	it('should not display items if not wrapped in or-list-item', () => {
		const text = 'hello world';
		const component = factory({}, {
			default: text
		});

		expect(component.html()).not.toContain(text)
	})

	it('should display items in or-list-item', () => {
		const text = 'hello world';
		const component = factory({}, {
			default: h(OrListItem, text) 
		})

		expect(component.html()).toContain(text)
	})

	it('should display header and footer slot content', () => {
		const header = 'head';
		const footer = 'tail';
		const component = factory({}, {
			header,
			footer
		})

		expect(component.html()).toContain(header);
		expect(component.html()).toContain(footer);
	})
})