<template>
	<ul class="or-list">
		<template v-if="slots.length > 0">
			<li class="or-list-item" v-for="(vSlot, vSlotIndex) in slots" :key="vSlotIndex" >
				<component :is="vSlot" />
			</li>
		</template>
		<template v-else>
			<li v-for="(item, itemIndex) in items" :key="itemIndex" class="or-list-item">
				<slot name="item" :item="item">
					<p v-if="item.title">{{ item.title }}</p>
					<p v-if="item.description">{{ item.description }}</p>
				</slot>
			</li>
		</template>
	</ul>
</template>

<script setup lang="ts">
import useDefaultSlots from "@/utilities/use-default-slots";

interface ListItem {
	title: string;
	description: string;
}

const props = withDefaults(defineProps<{
	items?: ListItem[]
}>(), {
	items: () => ([])
})

const slots = useDefaultSlots();
</script>

<style lang="scss" scoped>
.or-list {
	border: 1px solid var(--color-gray-2);
	overflow: hidden;
	border-radius: var(--radius-1);

	.or-list-item {
		border-bottom: 1px solid var(--color-gray-2);
		padding: 1em;

		&:last-of-type {
			border-bottom: none;
		}

		p:first-of-type {
			margin-top: 0;
			margin-bottom: 0.5em;
		}

		p:last-of-type {
			color: var(--text-color-2);
			font-size: 14px;
			margin-top: 1em;
			margin-bottom: 0;
		}
	}
}
</style>