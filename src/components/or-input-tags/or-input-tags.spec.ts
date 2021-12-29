import { mount } from "@vue/test-utils";
import { OrChips, OrInputTags } from "@/plugin";

const props = {
	modelValue: [],
	options: [ 'orange', 'pepper' ]
}
const wrapper = mount(OrInputTags, { 
	attachTo: document.body,
	components: {
		'or-chips': OrChips
	},
	props,
});

const componentWrapperEl = wrapper.find('[data-testid="wrapper"]');
const inputFilterEl = wrapper.find('[data-testid="filter-input"]');

describe('OrInputTags', () => {
	it('should focus on input on component click', async () => {
		await componentWrapperEl.trigger('click');
		expect(inputFilterEl.html()).toBe(document.activeElement?.outerHTML);
	})

	it('should filter options on filter input', async () => {
		await inputFilterEl.setValue('pep');
		expect(wrapper.find('.or-input-tags-options')).not.toContain('orange');
	})

	it('should should set value on click', async () => {
		await wrapper.find('.or-input-tags-options li').trigger('click');
		expect(wrapper.findComponent({ ref: 'chips' }).html()).toContain('pepper');
	})

	it('should remove last entry if backspace is pressed on empty input', async () => {
		await inputFilterEl.setValue('')
		await inputFilterEl.trigger('keydown.backspace');

		expect(wrapper.findComponent({ ref: 'chips' })).not.toContain('pepper');
	})
})