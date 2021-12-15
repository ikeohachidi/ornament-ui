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
	@apply border border-gray-200 overflow-hidden rounded-md;

	.or-list-item {
		@apply border-b border-gray-200 p-3;

		&:last-of-type {
			@apply border-b-0;
		}

		p:last-of-type {
			@apply text-gray-600 text-sm mt-2;
		}
	}
}
</style>