# OrButton

Renders a button on screen that can be used for forms and in whatever contexts you'd like.


## Overview 

<or-button>Some text here</or-button>

```html
<or-button>Some text here</or-button>
```

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