<template>
	<input 
		class="or-radio"
		type="radio" 
		data-testid="or-radio"
		:id="inputElementId" 
		v-bind="$attrs"
		v-model="inputValue"
		ref="radioElement"
		:checked="isChecked"
	>
	<label class="or-radio-label" :for="inputElementId">
		<span class="or-radio-label-text"><slot></slot></span>
	</label>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { uid } from 'uid';

const props = defineProps<{
	modelValue: unknown;
	value: unknown;
}>();

const emit = defineEmits<{
	(e: 'update:modelValue', value: unknown): void;
}>();

const radioElement = ref<HTMLInputElement>();

const inputElementId = computed(() => {
	return `or-radio-${uid()}`;
});

const isChecked = computed(() => inputValue.value === props.value);

const inputValue = computed({
	get() {
		return props.modelValue;
	},
	set() {
		emit('update:modelValue', props.value);
	}
});

onMounted(() => {
	if ((props.modelValue === props.value) && radioElement.value) {
		radioElement.value.checked = true;
	}
});
</script>

<style lang="scss" scoped>

$radius: 20px;

.or-radio {
	display: none;
	cursor: pointer;

	&:checked {
		+ .or-radio-label:before {
			box-shadow: inset 0px 0px 0px 6px var(--color-primary);
			background-color: #fff;
		}
	}
}

.or-radio-label {
	display: flex;
	align-items: center;

	.or-radio-label-text {
		margin-left: 4px;
	}
}

.or-radio-label:before { 
	content: '';
	height: $radius;
	width: $radius;
	background-color: var(--color-gray-3);
	border-radius: 999px;
	border: 2px solid var(--color-gray-3);
	display: inline-block;
	transition: .5s;
}
</style>