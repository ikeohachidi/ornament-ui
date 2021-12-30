const primitives = ['number', 'string', 'boolean'];

interface ListOption {
	optionLabel: string;
	optionValue: string;
}

const useListOption = <T extends ListOption, U>(props: T) => {
	return {
		getOptionValue: function(option: unknown): unknown {
			if (!primitives.includes(typeof option)) {
				return props.optionValue ? (option as Record<string, unknown>)[props.optionValue] : option;
			}

			return option;
		},
		getOptionLabel: function(option: unknown): unknown {
			if (!primitives.includes(typeof option)) {
				const optionObject = option as Record<string, unknown>;
				return (props.optionLabel && props.optionLabel in optionObject) ? optionObject[props.optionLabel] : option;
			}

			return option;
		}
	}
}

export {
	ListOption,
	useListOption
}