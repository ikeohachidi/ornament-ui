# OrDropdown
Dropdown component, offers a more customizable UI to the `or-select` component.

## Basic
<or-dropdown :options="users" v-model="selectedUser" placeholder="Select user"/>

```html
<or-dropdown :options="users" v-model="selectedUser" placeholder="Select user"/>
```

## Formatting
The example above showed the dropdown options as is without any kind of formatting. We can change this by using scoped slots
<or-dropdown :options="users" v-model="selectedUser" placeholder="Select user">
    <template #value="{selected}">
        {{ selected.firstName }} {{ selected.lastName }}
    </template>
    <template #option="{option}">
        {{ option.firstName }} {{ option.lastName }}
    </template>
</or-dropdown>

```html
<or-dropdown :options="users" v-model="selectedUser" placeholder="Select user">
    <template #value="{selected}">
        {{ selected.firstName }} {{ selected.lastName }}
    </template>
    <template #option="{option}">
        {{ option.firstName }} {{ option.lastName }}
    </template>
</or-dropdown>
```


## Multiple selection (Chips)
The dropdown can also accept multiple selection by setting the `multi` prop to `true`

<or-dropdown :options="languages" v-model="selectedLanguages" placeholder="Select language" :multi="true" />

```html
<or-dropdown :options="languages" v-model="selectedLanguages" placeholder="Select language" :multi="true" />
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

        const selectedLanguages = ref([]);
        const languages = ref(['Javascript', 'C#', 'Elixir']);

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
| multi | false | false | Boolean | Determines if the dropdown will allow multiple selection ot items, displayed with comma separation
| chips | false | false | Boolean | selected items will displayed in a chip
| hasFilter | false | true | Boolean | If set to true an input will displayed in the dropdown which will be used to filter select items