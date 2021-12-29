import { mount } from "@vue/test-utils";
import { OrCheckbox, OrChips, OrDropdown, OrInput } from "@/plugin";

const options = ['orange', 'pepper'];

const wrapper = mount(OrDropdown, {
	components: {
		'or-input': OrInput,
		'or-chips': OrChips,
		'or-checkbox': OrCheckbox,
	},
	props: {
		options,
		hasFilter: true,
		placeholder: 'Food'
	},
	data: function() {
		return {
			filterTerm: ''
		}
	}
})

const filterInputEl =  wrapper.findComponent({ ref: 'filterInput' });
const optionsTriggerEl = wrapper.find('[data-testid="options-trigger"]');
const optionsListEl = wrapper.find('.or-dropdown-list');

describe('OrDropdown', () => {

	it('has options', () => {
		options.forEach(option => {
			expect(wrapper.html()).toContain(option);
		})
	})

	it('has options hidden', () => {
		expect(wrapper.find('.or-dropdown-list').classes()).not.toContain('show');
	})

	it('displays options list', async () => {
		await optionsTriggerEl.trigger('click');
		expect(optionsListEl.classes()).toContain('show');
	})

	it('sets selected value', async() => {
		await wrapper.find('.or-dropdown-item').trigger('click');
		expect(wrapper.find('.or-dropdown-value').html()).toContain(options[0])
	})

	it('filters options', async () => {
		await filterInputEl.setValue(options[1]);
		expect(optionsListEl.html()).not.toContain(options[0])
	})

	it('hides options when list root nodes are not clicked', async () => {
		await optionsTriggerEl.trigger('click');
		expect(optionsListEl.classes()).not.toContain('show');
	})
	// TODO: test for multi selection
})