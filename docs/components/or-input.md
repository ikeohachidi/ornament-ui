# OrInput
Creates a customized input element

```html
<or-input v-model="text" placeholder="some text here"/>
```
**Output**
<or-input v-model="text" placeholder="some text here"/>


# Props
| Prop | Default | Values |
|--|--|--|
| size | "sm" | "sm", "md", "lg"


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