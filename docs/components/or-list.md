# OrList
A list rendering component

## Basic
<or-list :items="texts"/>
If the array passed to the `items` props has a `title` and `description` field they'll be arranged and styled on the dropdown else you'll have to use the `item` scoped slot

```html
<or-list :items="texts"/>
```

## Slots
You arent' limited to just using an array of objects with `title` and `description` properties you can pass an array with whatever kind of items you'd like. But the caveat to this is you'll have to style and format it yourself

<or-list :items="users">
    <template #item="{item}">
        <h3>Firstname: {{ item.firstname }}</h3>
        <p>Lastname:  {{ item.lastname }}</p>
    </template>
</or-list>

```html
<or-list :items="users">
    <template #item="{item}">
        <h3>Firstname: {{ item.firstname }}</h3>
        <p>Lastname:  {{ item.lastname }}</p>
    </template>
</or-list>
```

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
    setup() {
        const texts = ref([
            { title: 'Aristotle', description: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.'},
            { title: 'Socrates', description: 'The way to gain a good reputation is to endeavor to be what you desire to appear.'}
        ]);

        const users = ref([
            { firstname: 'Alapaher', lastname: 'Woriaybapri' },
            { firstname: 'Abdulazeez', lastname: 'Adams' },
        ])

        return {
            texts,
            users
        }
    }
})
</script>

# Props
| Prop | Required | Default | Type | Description |
|--|--|--|--|--|
| items | true | [] | Array<{title: string, description: string}> OR unknown[] | The items to be displayed on the list