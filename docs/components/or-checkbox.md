# OrCheckbox
A styled checkbox component perfect for multiple option selection. Also has a switch mode.

## Basic

Passing an array to the v-model directive will add/remove the value of the `or-checkbox` component and passing
a primitive will update the value, essentially making the `or-checkbox` component act like a radio

<or-checkbox v-model="users" value="Francis">Francis</or-checkbox> <br>
<or-checkbox v-model="users" value="Jerry">Jerry</or-checkbox>

**Value:** {{ users }}

```html
<or-checkbox v-model="users" value="Francis">Francis</or-checkbox> <br>
<or-checkbox v-model="users" value="Jerry">Jerry</or-checkbox>
```

### Switch
The appearance of the checkbox can also be changed to look like a switch with the `switch` prop.
<or-checkbox v-model="users" value="Gloria" :switch="true">Gloria</or-checkbox>

**Value:** {{ users }}

```html
<or-checkbox v-model="users" value="Gloria" :switch="true">Gloria</or-checkbox>
```

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
    setup() {
        const users = ref([]);

        return {
            users
        }
    }
})
</script>

# Props
| Prop | Required | Default | Type | Description |
|--|--|--|--|--|
| value | true | null | object | Value of checkbox 
| uncheckedValue | false | null | string | Value of the checkbox when unchecked
| isSwitch | false | false | boolean | Controls if the checkbox renders as a switch 