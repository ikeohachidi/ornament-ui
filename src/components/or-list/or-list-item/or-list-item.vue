<template>
	<li class="or-list-item">
		<div class="or-list-item-prefix" v-if="slots.prefix">
			<slot name="prefix"></slot>
		</div>
		<div class="or-list-item-content">
			<h3 v-if="header">{{ header }}</h3>
			<p v-if="body"></p>
			<slot></slot>
		</div>
		<div class="or-list-item-suffix" v-if="slots.suffix">
			<slot name="suffix"></slot>
		</div>
	</li>
</template>

<script setup lang="ts">
import { useSlots } from 'vue';

defineProps<{
	header?: string;
	body?: string	
}>();

const slots = useSlots();
</script>

<style lang="scss" scoped>
@import "@/scss/utilities.scss";

.or-list-item {
	display: flex;
	padding: 10px;
	margin-top: -1px;
	@include border-y(1px solid var(--color-gray-2));

	&-prefix,
	&-suffix {
		flex: 1;
		height: 100%;
	}

	&-prefix {
		margin-right: 10px;
	}

	&-suffix {
		margin-left: 10px;
	}

	&-content {
		flex: 2;
		height: 100%;
	}
}
</style>