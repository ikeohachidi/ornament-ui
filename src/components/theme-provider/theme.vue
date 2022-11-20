<template>
    <slot></slot>
</template>

<script setup lang="ts">
import { provide, PropType } from 'vue';
import { ComponentOptions, injectionKey } from '@/types';

const props = defineProps({
    theme: {
		type: Object as PropType<ComponentOptions>,
		default: () => ({})
	}
});

provide(injectionKey, props.theme);
</script>
