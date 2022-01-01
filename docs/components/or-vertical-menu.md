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
The component takes a `menu` prop which should have the following structure 
```javascript
const menu = [
    {
        icon: '', // optional
        name: '', // optional
        children: [
            {
                icon: '', // optional
                text: '', // optional
                action: () => void, // optional
                children: [] // optional
            }
        ] 
    }
]
```
The first level of the `menu` props should have a `name` property not a `text`. As this first level is used to group menu items. 

The `children` are recursive and can go as deep as you'd like.

The `action` property is a function which is fired when that particular node is clicked on the menu.

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
| menu | [] | Object | {} | An array with the structure respresent the sidebar 

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