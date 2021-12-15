# OrInputTags
Creates an input that displays results in a dropdown as a user types.

## Basic
<or-input-tags :options="users" v-model="selectedUser" placeholder="Select user"/>

```html
<or-input-tags :options="users" v-model="selectedUser" placeholder="Select user"/>
```

## Formatting
The example above showed the dropdown options as is without any kind of formatting. We can change this by using scoped slots
<or-input-tags :options="users" v-model="selectedUser" placeholder="Select user">
    <template #value="{selected}">
        {{ selected.firstName }} {{ selected.lastName }}
    </template>
    <template #option="{option}">
        {{ option.firstName }} {{ option.lastName }}
    </template>
</or-input-tags>

```html
<or-input-tags :options="users" v-model="selectedUser" placeholder="Select user">
    <template #value="{selected}">
        {{ selected.firstName }} {{ selected.lastName }}
    </template>
    <template #option="{option}">
        {{ option.firstName }} {{ option.lastName }}
    </template>
</or-input-tags>
```

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
    setup() {
        const selectedUser = ref();

        const users = ref([
            { firstName: 'Murphy', lastName: 'Ochuba' },
            { firstName: 'John', lastName: 'Ansa' },
            { firstName: 'Endurance', lastName: 'Egbe' },
        ]);

        const selectedLanguages = ref(['Javascript', 'C#', 'Elixir'])
        const languages = ref(['Javascript', 'C#', 'Elixir'])

        return {
            selectedUser,
            users,
            selectedLanguages,
            languages
        }
    }
})
</script>

# Props
| Prop | Required | Default | Type | Description |
|--|--|--|--|--|
| options | true | [] | Array | The items to be displayed on the dropdown