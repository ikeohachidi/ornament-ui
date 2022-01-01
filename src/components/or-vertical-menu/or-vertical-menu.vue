<template>
	<div class="or-vertical-menu">
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
import { computed, onMounted, useSlots } from 'vue';
import { MenuNode, Events, Group, Node } from '.';
import useEvent from '@/utilities/use-shared-event';

const props = withDefaults(defineProps<{
	menu: Group[];
	fixedHeader?: boolean;
	fixedFooter?: boolean;
}>(), {
	menu: () => ([])
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

onMounted(() => {
	useEvent(Events.NODE_CLICK)
		.listen((node: Node) => { emits(Events.NODE_CLICK, node) })
})
</script>

<style lang="scss" scoped>

.or-vertical-menu {
	background-color: var(--color-primary);
	color: #fff;
	border-radius: 6px;
}

.or-vertical-menu-body {
	li {
		margin-bottom: 10px;

		&:last-of-type {
			margin-bottom: 0;
		}
	}
}

.or-vertical-menu-body, 
.or-vertical-menu-header, 
.or-vertical-menu-footer {
	padding: 10px;
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