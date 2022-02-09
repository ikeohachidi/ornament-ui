import { mount } from "@vue/test-utils";
import OrInputTags from ".";
import OrChips from "../or-chips";

const factory = (props = {}, slots = {}) => {
	return mount(OrInputTags, { 
		attachTo: document.body,
		components: {
			'or-chips': OrChips
		},
		props: {
			modelValue: [],
			...props,
		},
		slots,
	});
}
describe('OrInputTags base behaviour', () => {
	const options = [ 'orange', 'pepper' ];
	const wrapper = factory({ options });
	const componentWrapperEl = wrapper.find('[data-testid="wrapper"]');
	const inputFilterEl = wrapper.find('[data-testid="filter-input"]');

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

		expect(wrapper.emitted('update:modelValue')![0]).toEqual([['pepper']])
	})

	it('should set value on enter keydown', async () => {
		await inputFilterEl.setValue('or');
		await inputFilterEl.trigger('keydown.enter');

		expect((wrapper.emitted('update:modelValue')![1] as string[])[0]).toContainEqual('orange')
	})

	it('should remove last entry if backspace is pressed on empty input', async () => {
		await inputFilterEl.setValue('')
		await inputFilterEl.trigger('keydown.backspace');

		expect(wrapper.findComponent({ ref: 'chips' })).not.toContain('pepper');
	})
})

describe('OrInputTags options config', () => {
	const options = [
		{ label: 'Excellent', value: 'A+' },
		{ label: 'Alright', value: 'B' }
	];

	it('should display options according to set optionLabel', async () => {
		const wrapper = factory({
			optionLabel: 'label',
			options,
		});

		await wrapper.find('[data-testid="filter-input"]').setValue('e');

		options.forEach(option => {
			expect(wrapper.html()).toContain(option.label);
			expect(wrapper.html()).not.toContain(option.value);
		})
	})

	it('should emit value according to set optionValue', async () => {
		const wrapper = factory({
			optionValue: 'value',
			options,
		});

		const inputEl = wrapper.find('[data-testid="filter-input"]');
		await inputEl.setValue('e');
		await inputEl.trigger('keydown.enter');

		expect(wrapper.emitted('update:modelValue')![0]).toEqual([[options[0].value]]);
	})
})