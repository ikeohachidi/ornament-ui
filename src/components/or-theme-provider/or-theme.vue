<template>
    <slot></slot>
</template>

<script setup lang="ts">
import { computed, provide, PropType } from 'vue';
import { merge } from 'lodash/fp';
import { ComponentOptions, injectionKey } from '@/types';

const props = defineProps({
    theme: Object as PropType<ComponentOptions>
});

const optionsDefaults = {
	default: {
		primary: '#1F2937',
		secondary: '#5f27cd',
		danger: '#e74c3c',
		success: '#2ecc71',
		info: '#3498db',
		text: {
			primary: '#3c3c3f',
			secondary: '#59595e'
		},
		grey: {
			dark: '#cccccc',
			dark2: '#e6ebee77',
			dark3: '#e6ebee3b'
		}
	}
}

const theme = computed(() => {
    const m = merge(optionsDefaults, props.theme);

    return {
        ...m
    }
});

provide(injectionKey, theme.value);
</script>
