import { shallowMount } from "@vue/test-utils";
import { MenuNode } from "."; 

const action = jest.fn();

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
const wrapper = shallowMount(MenuNode, {
	props: {
		nodes
	}
})

describe('MenuNode', () => {
	it('should have nodes rendered in DOM', () => {
		nodes.forEach(node => {
			expect(wrapper.html()).toContain(node.text);
			expect(wrapper.html()).toContain(node.children[0].text);
		})
	})

	it('should toggle visibility of children content when parent is clicked', async () => {
		const nodeParent = wrapper.find('[data-testid="single-node"] > div');
		const nodeChild = wrapper.find('[data-testid="single-node"] > ul');

		await nodeParent.trigger('click');
		expect(nodeChild.classes()).not.toContain('hidden');

		await nodeParent.trigger('click');
		expect(nodeChild.classes()).toContain('hidden');
	})

	it('fires node action when clicked', async () => {
		await wrapper.find('[data-testid="single-node"] > div').trigger('click');
		expect(action).toHaveBeenCalled();
	})
})