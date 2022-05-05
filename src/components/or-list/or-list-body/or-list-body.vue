<template>
	<p class="or-list-body">
		<slot></slot>
	</p>
</template>

<script setup lang="ts">
import { onMounted, useAttrs } from "vue";

const attrs = useAttrs();

onMounted(() => {

})
</script>

<style lang="scss" scoped>
@import '@/scss/color.scss';

.or-list-body {
	color: $text-color-2;
}
</style>