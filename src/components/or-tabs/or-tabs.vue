<template>
	<div class="or-tab-headers" :class="[position]">
		<span 
			:class="{'active': activeSlotIndex === titleIndex}"
			v-for="(title, titleIndex) in tabTitles" 
			:key="titleIndex"
			@click="setActiveSlot(titleIndex)"
		>
			<template v-if="getSlotTitle(titleIndex)">
				<component :is="getSlotTitle(titleIndex)"/>
			</template>
			<template v-else>
				{{ title }}
			</template>
		</span>
	</div>
	<div class="or-tab-body">
		<template v-if="activeSlot">
			<component :is="activeSlot" :key="Date.now()"/>
		</template>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, useSlots, VNode, onMounted } from "vue";
import { OrTab } from '.';
import { Position } from '@/types/Position';

const slots = useSlots();

const props = withDefaults(defineProps<{
	position?: Position
}>(), {
	position: Position.LEFT
})

const emit = defineEmits<{
	(e: 'tabChanged', tabTitle: string): void;
}>()


const activeSlot = ref<VNode>();
const activeSlotIndex = ref<number>(0);

const defaultSlots = computed<VNode[]>(() => {
	if (slots.default) {
		return slots.default() as VNode[];
	}

	return []
})

const getSlotTitle = (index: number) => {
	if (!defaultSlots.value[index] || !(defaultSlots.value[index].children as typeof OrTab).title) return;

	return (defaultSlots.value[index].children as typeof OrTab).title;
}

const setActiveSlot = (titleIndex: number): void => {
	activeSlotIndex.value = titleIndex;
	activeSlot.value = defaultSlots.value[titleIndex]

	if (activeSlot.value.props) {
		emit('tabChanged', activeSlot.value.props.title);
	}
}

const tabTitles = computed<string[]>(() => {
	return defaultSlots.value.map(slot => {
		return slot.props!.title
	})
})

onMounted(() => {
	if (defaultSlots.value.length > 0) {
		setActiveSlot(0)
	}
})
</script>

<style lang="scss" scoped>
.or-tab-headers {
	display: flex;
	border-bottom: 1px solid var(--color-gray-2);
	color: var(--text-color-2) ;

	&.right {
		justify-content: flex-end;
	}

	&.center {
		justify-content: center;
	}

	span {
		display: inline-block;
		padding: 0.5em 1em;
		cursor: pointer;
		border-bottom: 2px solid transparent;
		transition: .2s;
		&:hover {
			background-color: var(--color-gray-3);
			border-bottom: 2px solid var(--color-gray-2);
		}

		&.active {
			border-color: var(--color-primary);
			color: var(--text-color-1)
		}
	}
}
</style>