import { mount } from "@vue/test-utils";
import { OrVerticalMenu } from '@/plugin';

const menu = [
	{
		name: 'Primary',
		children: [
			{ icon: 'user-fill', text: 'User', onClick: () => {} },
			{ icon: 'shield-line', text: 'Security', children: [
				{ text: 'Keys' },
				{ text: 'Environment' },
			]}
		]
	},
	{
		name: '',
		children: [
			{ icon: 'user-fill', text: 'User', onClick: () => {} },
			{ icon: 'shield-line', text: 'Security' }
		]
	}
]

const slots = {
	header: '<p>Header Slot</p>',
	footer: '<p>Footer Slot</p>',
}

const wrapper = mount(OrVerticalMenu, {
	props: {
		menu
	},
	slots
})

describe('OrVerticalMenu', () => {
	it('display content', () => {
		expect(wrapper.html()).toContain('Primary');
		expect(wrapper.html()).toContain('Security');
	})

	it('toggles display of hidden children when parent is clicked', async () => {
		const groupParent = wrapper.find('.or-group-parent');
		const groupParentChildren = wrapper.find('.or-group-parent + ul');

		await groupParent.trigger('click');
		expect(groupParentChildren.classes()).toContain('show');

		await groupParent.trigger('click');
		expect(groupParentChildren.classes()).toContain('show');
	})

	it('displays position slot content', () => {
		expect(wrapper.find('.or-menu-header').html()).toContain(slots.header);
		expect(wrapper.find('.or-menu-footer').html()).toContain(slots.footer);
	})
})