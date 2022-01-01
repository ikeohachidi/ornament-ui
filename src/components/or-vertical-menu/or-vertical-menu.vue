<template>
	<div class="or-vertical-menu" :style="style">
		<div class="or-vertical-menu-header" v-if="hasHeaderSlot">
			<slot name="header"></slot>
		</div>
		<ul class="or-vertical-menu-body">
			<li v-for="(item, itemIndex) in menu" :key="itemIndex">
				<div class="or-vertical-menu-group-name">
					<i :class="`ri-${item.icon}`" v-if="item.icon"></i>
					<span v-if="item.name">{{ item.name }}</span>
				</div>

				<menu-node :nodes="item.children" v-if="item.children">	
					<template #node-content="props">
						<slot name="node-content" v-bind="props"></slot>
					</template>
				</menu-node>
			</li>
		</ul>
		<div class="or-vertical-menu-footer" v-if="hasFooterSlot">
			<slot name="footer"></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, CSSProperties, onMounted, useSlots } from 'vue';
import { MenuNode, Events, Group, Node } from '.';
import useEvent from '@/utilities/use-shared-event';

const props = withDefaults(defineProps<{
	menu: Group[];
	width?: number | 'full';
	height?: number | 'full';
}>(), {
	menu: () => ([]),
	width: 300,
	height: 'full'
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

const nodeContentSlot = computed(() => {
	return 'node-content' in slots
})

const style = computed<CSSProperties>(() => {
	return {
		width: props.width >= 0 ? `${props.width}px` : '100%',
		height: props.height >= 0 ? `${props.height}px` : '100%',
	}
})

onMounted(() => {
	useEvent(Events.NODE_CLICK)
		.listen((node: Node) => { emits(Events.NODE_CLICK, node) })
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
	padding: 10px;
	width: 100%;
	box-sizing: border-box;
}

.or-vertical-menu-body {
	overflow-y: auto;
	margin: 0;
	padding: 20px 10px;
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