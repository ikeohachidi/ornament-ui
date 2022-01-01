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
        text: 'Users',
        children: [
            { icon: 'user-unfollow-line', text: 'Blocked Users' },
        ]
    },
    {
        icon: 'bank-card-line',
        text: 'Payments'
    },
]
```

**Anatomy of the menu prop**
The `menu` prop is of a `Node` type which looks like
```javascript
interface Node {
	text?: string;
	icon?: string;
	collapsed?: boolean;
	action: (node: Node) => unknown;
	children: Node[];
}
```

The first level of the `menu` props should have a `name` property not a `text`. As this first level is used to group menu items. 

**Breakdown**
- `icon`: ornament uses remixicon by default so pass any remix icon class here **Note: Omit the "or" from the class**.
- `text`: Every child node should have this as it gives information about an item. 
- `collapsed`: By default all child nodes are hidden. The `collapsed` property serves to manually show a node.
- `action`: a callback function that runs when the node is clicked. It's first argument is the node itself.
- `children`: Every node can have this and it can be as as deeply nested 


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

## Recipe
**Navigation Menu**
By default the vertical menu doesn't do any routing neither does it have an the clicked item have any visual cue.
This is done on purpose since the vertical menu can serve many purposes.

A Navigation menu can be quickly achieved with this component with the following lines of code 

```html
<or-vertical-menu :menu="menu" :active-node-func="isNodeActive" @node-click="pushRoute" />
```

```javascript
import { useRouter } from 'vue-router';

const route = useRouter();

const menu = [
    {
        text: 'users',
        children: [
            { text: 'List', route: 'users/list' },
            { text: 'Edit', route: 'users/edit', pushRoute: (node) =>  }
        ]
    }
]

const isNodeActive = (node: Node) => route.name.toLowerCase() === node.text.toLowerCase();
const pushRoute = (node: Node) => route.push({ path: node.route });
```

## Props
| Prop | Default | Type | Values | Description
|--|--|--|--|--|
| menu | [] | Object | {} | An array with the structure respresent the sidebar 
| height | 'full' | number | numbers | specifies the height of the vertical menu, if none is given it tries to take the full height of it's container.
| width | 'full' | number | numbers | specifies the width of the vertical menu, if none is given it tries to take the full width of it's container.
| activeNodeFunc | (node) => false | Function | Function | A function which determins if the node gets a UI visual indicator, returns false by default.

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
                text: 'Users',
                children: [
                    { icon: 'user-unfollow-line', text: 'Deleted Users' },
                    { icon: 'user-unfollow-line', text: 'Blocked Users' },
                ]
            },
            {
                text: 'Payments',
                children: [
                    { icon: 'arrow-up-line', text: 'Deposits' },
                    { icon: 'arrow-down-line', text: 'Withdrawals' },
                ]
            },
        ]

        return { menu }
    }
})
</script>