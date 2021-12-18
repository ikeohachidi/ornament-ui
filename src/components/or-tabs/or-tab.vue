<template>
    <div class="or-tab">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    title: string;
}>()
</script>

<style scoped>
.or-tab {
    padding: 1em;
}
</style>