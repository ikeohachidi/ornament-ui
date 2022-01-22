<template>
	<ul class="or-accordion-container" ref="accordionContainer">
		<li v-for="(slot, slotIndex) in defaultSlots" :key="slotIndex" class="or-accordion">
			<component 
				:is="slot" 
				@selectionChange="updateActiveSection" 
				:_isActive="activeSection === slotIndex" 
				:_index="slotIndex"
			/>
		</li>
	</ul>
</template>

<script setup lang="ts">
import { ref, useSlots, computed, VNode } from "vue";

const slots = useSlots();

const activeSection = ref(-1);

const updateActiveSection = (newActiveSection: number) => {
	if (activeSection.value === newActiveSection) {
		activeSection.value = -1;
		return
	}

	activeSection.value = newActiveSection;
}

const defaultSlots = computed<VNode[]>(() => {
	if (slots.default) return slots.default() as VNode[];

	return []
});
</script>

<style lang="scss" scoped>
li {
	list-style: none;
}
</style>