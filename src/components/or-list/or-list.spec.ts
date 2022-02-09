import { mount } from '@vue/test-utils';
import { OrList, OrListItem } from '.';

const items = [
	{
		title: 'veggie',
		description: 'vegetable'
	},
	{
		title: 'fruit',
		description: 'oranges'
	}
];

const factory = (props = {}, slots = {}) => {
	return mount(OrList, {
		components: {
			'or-list-item': OrListItem
		},
		props: {
			items,
			...props
		},
		slots
	})
}

describe('OrList', () => {
	it ('should display items', () => {
		const wrapper = factory();

		items.forEach(item => {
			expect(wrapper.html()).toContain(item.title)
			expect(wrapper.html()).toContain(item.description)
		})
	})

	it('should discard props items rendering when slots is used', () => {
		const wrapper = factory({}, {
			default: `
				<or-list-item>Socrates</or-list-item>
			`
		});

		items.forEach(item => {
			expect(wrapper.html()).not.toContain(item.title)
			expect(wrapper.html()).not.toContain(item.description)
		})

		expect(wrapper.html()).toContain('Socrates')
	})
})