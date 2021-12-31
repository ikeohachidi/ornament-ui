<template>
	<ul class="or-vertical-menu-children">
		<li data-testid="single-node" class="or-vertical-menu-child" v-for="(node, nodeIndex) in nodes" :key="`${nodeIndex}-uniqueKey()`">
			<div class="flex center p-1" @click.exact="toggleChildrenVisibility">
				<i :class="`ri-${node.icon} ri-1x`" v-if="node.icon"></i>
				<span v-if="node.text" class="inline-block ml-1">{{ node.text }}</span>

				<i class="ri-arrow-drop-up-line dropdown-icon ml-auto" v-if="node.children"></i>
			</div>
			<menu-node :nodes="node.children" v-if="node.children" class="ml-3 hidden"/>	
		</li>
	</ul>
</template>

<script setup lang="ts">

interface Child {
	text?: string;
	icon?: string;
	children: Child[];
}

const props = defineProps<{
	nodes: Child[]
}>()

const toggleChildrenVisibility = (event: InputEvent) => {
	const element = event.target as HTMLElement;
	if (!element) return;

	const nextSibling = element.nextElementSibling
	if (!nextSibling) return;

	nextSibling.classList.toggle('hidden');
	element.classList.toggle('collapse');
}

const uniqueKey = () => {
	return `key-${Date.now()}`
}
</script>

<style lang="scss" scoped>
i {
	color: #cbd0dbd5;
}

.or-vertical-menu-children {
	padding: 0;
	list-style: none;
	transition: .2s;
}

.or-vertical-menu-child > div {
	cursor: pointer;

	* {
		pointer-events: none;
	}

	.dropdown-icon {
		transform: rotateZ(180deg);
		transition: .2s;
	}

	&.collapse .dropdown-icon {
		transform: rotateZ(0deg);
	}
}

.hidden {
	max-height: 0;
	overflow-y: hidden;
}
</style>