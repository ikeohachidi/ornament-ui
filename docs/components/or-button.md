# OrButton

Renders a button on screen that can be used for forms and in whatever contexts you'd like.


## Overview 

```html
<or-button>Some text here</or-button>
```
**Output**
<or-button>Some text here</or-button>

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