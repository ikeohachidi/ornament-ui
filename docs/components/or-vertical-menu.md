# OrVerticalMenu
A component used for displaying hierachical content in a vertical orientation. 
Common uses include a navigation sidebar or just to display things in a "tree like" structure.

**Note** This component should be mistaken as a tree component which is usually used for displaying 
folder content hierachies. 

### Installation

**Note** If you registered the library with the Ornament Plugin then you don't have to do this.

```javascript
import { OrVerticalMenu } from 'ornament-ui';
```


## Usage
<or-vertical-menu :menu="menu">
</or-vertical-menu>

```html
<or-vertical-menu :menu="menu">
</or-vertical-menu>
```

Where `menu` is
```javascript
const menu = [
    {
        name: 'Management',
        children: [
            { 
                icon: 'user-3-line', 
                text: 'Users',
                children: [
                    { icon: 'user-unfollow-line', text: 'Blocked Users' },
                ]
            },
            { icon: 'bank-card-line', text: 'Payments' },
        ]
    },
    {
        children: [
            { icon: 'settings-2-line', text: 'Settings' },
            { icon: 'logout-box-r-line', text: 'Settings' },
        ]
    }
]
```

**Anatomy of the menu prop**
```javascript
const menu = [
    {
        icon: '', // optional
        name: '', // optional
        children: [
            {
                icon: '', // optional
                text: '', // optional
                collapsed: true, // optional 
                action: (node) => void, // optional
                children: [] // optional
            }
        ] 
    }
]
```
The first level of the `menu` props should have a `name` property not a `text`. As this first level is used to group menu items. 

**Breakdown**
- `icon`: ornament uses remixicon by default so pass any remix icon class here.
- `name`: Name of group **Note** This is only used on the first level of the menu.
- `text`: Every child node should have this as it serves information like a title. 
- `collapsed`: By default all child nodes are collapsed. The `collapsed` property serves to manually show a node.
- `action`: a callback function that runs when the node is clicked. It's first argument is the node itself.
- `children`: Every node has this and it can be as nested as you want it to be.


## Customization
The content of each node can be further customized using the `node-content` slot.
<or-vertical-menu :menu="menu">
    <template #node-content="{ node }">
        >>> {{ node.text }}
    </template>
</or-vertical-menu>

```html
<or-vertical-menu :menu="menu">
    <template #node-content="{ node }">
        >>> {{ node.text }}
    </template>
</or-vertical-menu>
```

## Props
| Prop | Default | Type | Values | Description
|--|--|--|--|--|
| menu | [] | Object | {} | An array with the structure respresent the sidebar 

## Slots
| Name | Scoped slots | Description
|--|--|--|
| header | null | Content to be placed at head of menu container
| footer | null | Content to be placed at foot of menu container
| node-content | node | Can be used to further customise the display of nodes in the menu

## Events
| Name | Values | Description
|--|--|--|
| node-clicked | node | Emitted everytime a node is clicked

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        const menu = [
            { 
                name: 'Management',
                children: [
                    { 
                        icon: 'user-3-line', 
                        text: 'Users',
                        children: [
                            { icon: 'user-unfollow-line', text: 'Blocked Users' },
                        ]
                    },
                    { icon: 'bank-card-line', text: 'Payments' },
                ]
            },
            {
                children: [
                    { icon: 'settings-2-line', text: 'Settings' },
                    { icon: 'logout-box-r-line', text: 'Settings' },
                ]
	        }
        ]

        return { menu }
    }
})
</script>