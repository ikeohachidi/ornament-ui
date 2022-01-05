# OrDropdown
Dropdown component, offers a more customizable UI to the `or-select` component.

## Usage 
<or-dropdown :options="users" v-model="selectedUser" />

```html
<or-dropdown :options="users" v-model="selectedUser" />
```

### Formatting text 
If the value of the dropdown is an object, it is displayed as is, without any formatting. With the `optionLabel` prop the displayed can be chosen
from a key in the object 

<or-dropdown :options="users" v-model="selectedUser" optionLabel="firstName"/>

```html
<or-dropdown :options="users" v-model="selectedUser" optionLabel="firstName"/>
```

**NOTE** Keep in mind that the value of the dropdown is still the full object `{ firstName: string, lastName: string }`. This in turn can be changed to
a key in the object with the `optionValue`. 

**Further formatting can be achieved using the `value` and `option` slots**

<or-dropdown :options="users" v-model="selectedUser">
    <template #value="{selected}">
        <span v-if="selected && selected.firstName">
            {{ selected.firstName }}
        </span>
    </template>
    <template #option="{option, index}">
        <span v-if="index === 2">
            😀 {{ option.firstName }}
        </span>
        <span v-else>
            {{ option.firstName }} {{ option.lastName[0] }}
        </span>
    </template>
</or-dropdown>


```html
<or-dropdown :options="users" v-model="selectedUser">
    <template #value="{selected}">
        <span v-if="selected && selected.firstName">
            {{ selected.firstName }}
        </span>
    </template>
    <template #option="{option, index}">
        <span v-if="index === 2">
            😀 {{ option.firstName }}
        </span>
        <span v-else>
            {{ option.firstName }} {{ option.lastName[0] }}
        </span>
    </template>
</or-dropdown>
```

## Multiple selection 
The dropdown can also accept multiple selection by setting the `multi` prop to `true`

<or-dropdown :options="languages" v-model="selectedLanguages" :multi="true" />

```html
<or-dropdown :options="languages" v-model="selectedLanguages" :multi="true"/>
```

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
    setup() {
        const selectedUser = ref({ firstName: 'Murphy', lastName: 'Ochuba' });

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
| chips | false | false | Boolean | Selected items will be displayed in a chip
| hasFilter | false | true | Boolean | If set to true an input will displayed in the dropdown which will be used to filter select items

# Slots
| Name | Scoped slots | Description
|--|--|--|
| value | selected | Currently selected value of the dropdown 
| option | option, index | `option` represents a single element in the `options` props and `index` is it's index