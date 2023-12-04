import { mount  } from "@vue/test-utils";
import { describe, it, expect } from 'vitest';
import { Events } from ".";
import OrTree from ".";

const nodes = [
	{
		label: 'fruits',
		children: [
			{
				label: 'sweet',
				children: [
					{
						label: 'mango',
						children: [
							{
								label: 'ripe'
							},
							{
								label: 'unripe'
							}
						]
					},
					{
						label: 'orange',
						children: [
							{
								label: 'Ripe'
							},
							{
								label: 'unripe'
							}
						]
					}
				]
			},
			{
				label: 'bitter',
				children: [
					{
						label: 'egg plant'
					},
					{
						label: 'cashew'
					}
				]
			}
		]
	},
	{
		label: "vegetables",
		children: [
			{
				label: 'Bitter'
			},
			{
				label: 'Sweet'
			}
		]
	}
];

const factory = (props = {}) => {
	return mount(OrTree, {
		props: {
			...props,
			nodes
		}
	})
}

describe('OrTree.vue', () => {
	it('it includes all nodes in DOM', () => {
		const component = factory();
		const items = ['fruits', 'vegetables', 'ripe', 'bitter'];

		items.forEach(item => {
			expect(component.html()).toContain(item);
		})
	})

	it('emits node event when clicked', async() => {
		const component = factory();
		const metaEl = component.findAll('[data-testid="metadata"]')[2];

		await metaEl.trigger('click');

		expect(component.emitted(Events.NODE_CLICK)).toBeTruthy();
	})

	it('toggles visibility of children tree when clicked', async() => {
		const component = factory();
		// collapser in the first node 
		const collapser = component.find('[data-testid="collapser"]');
		// child of the first node
		const childTree = component.find('[data-testid="metadata"] + .or-tree');

		await collapser.trigger('click');

		expect(childTree.classes()).toContain('hidden')
	})
})