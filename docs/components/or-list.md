# OrList
A list rendering component

## Basic
<or-list :items="texts"/>
If the array passed to the `items` props has a `header` and `body` field they'll be arranged and styled on the dropdown else you'll have to use the `data` scoped slot

```html
<or-list :items="texts"/>
```


You can also utilise the `or-list-item` component to display content
<or-list>
    <or-list-item>
        <template #prefix>
            This is the prefix
        </template>
        <div>
            <h1>Hello world</h1>
            <p>Description</p>
        </div>
        <template #suffix>
            This is the Prefix
        </template>
    </or-list-item>
</or-list>

```html
<or-list>
    <or-list-item>
        <template #prefix>
            This is the prefix
        </template>
        <div>
            <h1>Hello world</h1>
            <p>Description</p>
        </div>
        <template #suffix>
            This is the prefix
        </template>
    </or-list-item>
</or-list>
```

## Slots
You arent' limited to just using an array of objects with `header` and `body` properties you can pass an array with whatever kind of items you'd like. But the caveat to this is you'll have to style and format it yourself

<or-list :items="users">
    <template #item="{ data }">
        <h3>Firstname: {{ data.firstname }}</h3>
        <p>Lastname:  {{ data.lastname }}</p>
    </template>
</or-list>

```html
<or-list :items="users">
    <template #item="{ data }">
        <h3>Firstname: {{ data.firstname }}</h3>
        <p>Lastname:  {{ data.lastname }}</p>
    </template>
</or-list>
```

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
    setup() {
        const texts = ref([
            { header: 'Aristotle', body: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.'},
            { header: 'Socrates', body: 'The way to gain a good reputation is to endeavor to be what you desire to appear.'}
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
| items | true | [] | Array<{header: string, body: string}> OR any[] | The items to be displayed on the list