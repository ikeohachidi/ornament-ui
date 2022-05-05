<template>
	<li>
		<component 
			v-for="(slot, index) in featuredSlots" 
			:key="index"
			:is="slot"
		/>
	</li>
</template>

<script setup lang="ts">
import { useSlots, computed } from "vue";
import { OrListLabel } from '..';

const props = defineProps<{
	checkable?: boolean; 
	value?: unknown;
}>()

const slots = useSlots();

const featuredSlots = computed(() => {
	if (slots.default && props.checkable) {
		const def = slots.default();

		def.forEach(d => {
			if (d.type === OrListLabel) {
				d.props = {
					checkable: true,
					value: props.value
				}
			}
		})

		return def
	}

	return null
}) 

</script>

<style lang="scss" scoped>
</style>