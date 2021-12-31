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

				<menu-node :nodes="item.children" v-if="item.children" />	
			</li>
		</ul>
		<div class="or-vertical-menu-footer" v-if="hasFooterSlot">
			<slot name="footer"></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { MenuNode } from '.';

interface Group {
	name?: string;
	icon?: string;
	children?: Child[];
}

interface Child {
	text?: string;
	icon?: string;
	children: Child[];
}

const props = withDefaults(defineProps<{
	menu: Group[];
	fixedHeader?: boolean;
	fixedFooter?: boolean;
}>(), {
	menu: () => ([])
})

const slots = useSlots();

const hasFooterSlot = computed(() => {
	return 'footer' in slots;
})

const hasHeaderSlot = computed(() => {
	return 'header' in slots;
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