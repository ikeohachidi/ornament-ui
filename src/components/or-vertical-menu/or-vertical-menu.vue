<template>
	<div class="or-vertical-menu" :style="style">
		<div class="or-vertical-menu-header" v-if="hasHeaderSlot">
			<slot name="header"></slot>
		</div>
		<ul class="or-vertical-menu-body">
			<menu-node :nodes="menu">
				<template #node-content="props: Props">
					<slot name="node-content" v-bind="props"></slot>
				</template>
			</menu-node>
		</ul>
		<div class="or-vertical-menu-footer" v-if="hasFooterSlot">
			<slot name="footer"></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, CSSProperties, onMounted, useSlots } from 'vue';
import { Events, Node } from '.';
import { emitter } from '@/utilities/use-shared-event';

interface Props {
	menu: Node[];
	width?: number | 'full';
	height?: number | 'full';
	activeNodeFunc?: (node: Node) => boolean;
}

const props = withDefaults(defineProps<Props>(), {
	width: 300,
	height: 'full',
	activeNodeFunc: (node: Node) => false
})

const emits = defineEmits<{
	(e: Events.NODE_CLICK, value: Node): void
}>()

const slots = useSlots();

const hasFooterSlot = computed(() => {
	return 'footer' in slots;
})

const hasHeaderSlot = computed(() => {
	return 'header' in slots;
})

const style = computed<CSSProperties>(() => {
	return {
		width: props.width >= 0 ? `${props.width}px` : '100%',
		height: props.height >= 0 ? `${props.height}px` : '100%',
	}
})

onMounted(() => {
	emitter.on(Events.NODE_CLICK, (node: Node) => { emits(Events.NODE_CLICK, node) })
})
</script>

<style lang="scss" scoped>

.or-vertical-menu {
	background-color: var(--color-primary);
	color: #fff;
	display: flex;
	flex-direction: column;
}

.or-vertical-menu-body, 
.or-vertical-menu-header, 
.or-vertical-menu-footer {
	padding: 20px 10px;
	width: 100%;
	box-sizing: border-box;
}

.or-vertical-menu-body {
	overflow-y: auto;
	margin: 0;
	li {
		margin-bottom: 10px;

		&:last-of-type {
			margin-bottom: 0;
		}
	}
}
.or-vertical-menu-body {
	flex-grow: 1;
}

.or-vertical-menu-group-name {
	text-transform: uppercase;
	margin-bottom: 4px;
	display: flex;
	align-items: center;
}

.or-vertical-menu-header {
	border-bottom: 1px solid rgba(255, 255, 255, 0.096);
}

.or-vertical-menu-footer {
	border-top: 1px solid rgba(255, 255, 255, 0.096);
}
</style>