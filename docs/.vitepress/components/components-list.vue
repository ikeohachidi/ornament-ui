<template>
    <section>
        <ul>
            <li
                v-for="(file, i) in fileMap"
                :key="i"
                @click="goToRoute(file.componentName)"
            >
                <span
                    class="component-name"
                    :class="{'has-docs': componentHasDocs(file.name)}"
                >{{ file.name }}</span>
            </li>
        </ul>
    </section>
</template>

<script setup>
import { useRouter } from 'vitepress';
import { onMounted, ref, reactive } from 'vue';

const router = useRouter();

let fileMap = ref([]);
let docsFileMap = reactive({});

const goToRoute = (route) => {
    router.go(`/components/${route}`);
};

const componentHasDocs = (component) => {
    return component in docsFileMap;
}

onMounted(async() => {
    const docFiles = import.meta.glob(`../../components/*.md`);

    for (let [key] of Object.entries(docFiles)) {
        const ks = key.split('/');

        docsFileMap[ks[ks.length - 1].replace('.md', '')] = true;
    }

    const files = import.meta.glob(`../../../src/components/**/*.vue`);
    /**
     * array of object with type { name: string, component_name: string }
     */
    for (let [key, value] of Object.entries(files)) {
        const val = await value();
        const ks = key.split('/');

        fileMap.value.push({
            name: val.default.name || val.default.__name,
            componentName: ks[ks.length - 1].replace('.vue', ''),
        });
    }
});
</script>

<style lang="scss">
.component-name {
    cursor: pointer;

    &.has-docs {
        color: var(--vp-c-brand-1);
        text-decoration: underline;
    }
}
</style>