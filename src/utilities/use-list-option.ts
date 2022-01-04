const primitives = ['number', 'string', 'boolean'];

interface Option {}
interface ListOption {
	options: Option[];
	optionLabel?: keyof Option;
	optionValue?: keyof Option;
}

const useListOption = <T extends ListOption>(props: T) => {
	return {
		/**
		 * 
		 * @param option is a single element in the props options array
		 * @returns the value of the key specified in props.optionValue 
		 */
		getOptionValue: function<T>(option: T): T {
			if (option && !primitives.includes(typeof option)) {
				return props.optionValue ? (option as Record<string, unknown>)[props.optionValue] as T : option;
			}

			return option;
		},
		/**
		 * 
		 * @param option is a single element in the options array
		 * @returns the value of the key specified in props.optionLabel
		 */
		getOptionLabel: function(option: unknown): unknown {
			if (option && !primitives.includes(typeof option)) {
				const optionObject = option as Record<string, unknown>;
				return (props.optionLabel && props.optionLabel in optionObject) ? optionObject[props.optionLabel] : option;
			}

			return option;
		},
		findOption: (value: unknown): Option => {
			if (props.optionValue) {
				const index = props.options.findIndex(option => option[props.optionValue!] === value);
				if (index !== -1) return props.options[index]
			}

			return value as Option;
		}
	}
}

export {
	Option,
	ListOption,
	useListOption
}