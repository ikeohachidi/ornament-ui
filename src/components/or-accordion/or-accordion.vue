<template>
	<ul class="or-accordion-container" ref="accordionContainer">
		<li v-for="(slot, slotIndex) in defaultSlots" :key="slotIndex" class="or-accordion">
			<component 
				:is="slot" 
				@selectionChange="updateActiveSection" 
				:_isActive="activeSections.includes(slotIndex)" 
				:_multiple="multiple"
				:_index="slotIndex"
			/>
		</li>
	</ul>
</template>

<script setup lang="ts">
import { ref, useSlots, computed, VNode, onMounted } from "vue";

const props = withDefaults(defineProps<{
	multiple: boolean;
	activeSection: number;
}>(), {
	multiple: false
})

const slots = useSlots();

const activeSections = ref<number[]>([]);

const updateActiveSection = (section: number) => {
	if (props.multiple === false) {
		activeSections.value.includes(section)
			? activeSections.value = []
			: activeSections.value = [section];

		return
	}

	const sectionIndex = activeSections.value.findIndex(activeSection => activeSection === section);
	if (sectionIndex === -1) {
		activeSections.value.push(section);
		return
	}

	activeSections.value.splice(sectionIndex, 1);
}

const defaultSlots = computed<VNode[]>(() => {
	if (slots.default) return slots.default() as VNode[];

	return []
});

onMounted(() => {
	if (props.activeSection !== undefined) activeSections.value.push(props.activeSection);
})
</script>

<style lang="scss" scoped>
li {
	list-style: none;
}
</style>