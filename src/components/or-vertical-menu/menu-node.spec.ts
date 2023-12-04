import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from 'vitest';
import { MenuNode } from "."; 

const action = vi.fn();

const nodes = [
	{ 
		text: 'Affiong Udosikai',
		action,
		children: [
			{
				text: 'Emiakpor Ebiri'
			}
		]
	},
	{ 
		text: 'Sensei Hocaha',
		children: [
			{
				text: 'Ebuka Ezenworo'
			}
		]
	}
]

const factory = (props = {}, slots = {}) => {
	return mount(MenuNode, {
		props: {
			nodes,
			...props
		},
		slots
	})
}

describe('MenuNode', () => {
	it('should have nodes rendered in DOM', () => {
		const wrapper = factory();
		nodes.forEach(node => {
			expect(wrapper.html()).toContain(node.text);
			expect(wrapper.html()).toContain(node.children[0].text);
		})
	})

	it('should toggle visibility of children content when parent is clicked', async () => {
		const wrapper = factory();
		const nodeParent = wrapper.find('[data-testid="single-node"] > div');
		const nodeChild = wrapper.find('[data-testid="single-node"] > ul');

		await nodeParent.trigger('click');
		expect(nodeChild.classes()).not.toContain('hidden');

		await nodeParent.trigger('click');
		expect(nodeChild.classes()).toContain('hidden');
	})

	it('fires node action when clicked', async () => {
		const wrapper = factory();
		await wrapper.find('[data-testid="single-node"] > div').trigger('click');
		expect(action).toHaveBeenCalled();
	})

	it('should render node-content slot with menu items', () => {
		const wrapper = factory({}, {
			"node-content": `
				<template #node-content="{ node }">
					content {{ node.text }}
				</template>
			`
		})
		nodes.forEach(node => {
			expect(wrapper.html()).toContain(`content ${node.text}`)
		})
	})
})