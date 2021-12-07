import { defineComponent } from "vue";

const primitives = ['number', 'string', 'boolean'];

export default defineComponent({
	props: {
		optionLabel: {
			type: String,
			default: 'label'
		},
		optionValue: {
			type: String,
			default: ''
		} 
	},
	methods: {
		getOptionValue: function(option: unknown) {
			if (!primitives.includes(typeof option)) {
				if (this.$props.optionValue) return (option as Record<string, unknown>)[this.$props.optionValue] || option;
			}

			return option;
		},
		getOptionLabel: function(option: unknown) {
			if (!primitives.includes(typeof option)) {
				const optionObject = option as Record<string, unknown>;
				if (this.$props.optionLabel && this.$props.optionLabel in optionObject) return optionObject[this.$props.optionLabel];

				return option;
			}

			return option;
		}
	}
})