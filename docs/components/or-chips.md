# OrChips
A component to display chips

## Basic
<or-chips v-model="users"/>

Pass an array of strings
{{ users }}

```html
<or-chips v-model="users" />
```

Chips entries can also be removed by setting the `has-remove` prop to true.
<or-chips v-model="languages" has-remove />

```html
<or-chips v-model="languages" has-remove />
```

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
    setup() {
        const users = ref(['Sam', 'Jindu', 'Murph', 'Ansa']);
        const languages = ref(['javascript', 'go', 'elixir']) 

        return {
            users,
            languages
        }
    }
})
</script>

# Props
| Prop | Required | Default | Type | Description |
|--|--|--|--|--|
| hasRemove | false | false | boolean | If set to true will render an "X" which when clicked can remove the chip 