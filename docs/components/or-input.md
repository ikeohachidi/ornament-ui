## OrInput

Page for input

<or-input v-model="text"/>

<script lang="ts">

import { defineComponent, ref } from 'vue';

export default defineComponent({
    setup() {
        const text = ref('');

        return {
            text
        }
    }
})
</script>