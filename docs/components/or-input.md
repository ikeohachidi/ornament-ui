# OrInput
An input element to take a users input

**Basic**
<or-input v-model="text" placeholder="Some text here" />

```html
<or-input v-model="text" placeholder="Some text here"/>
```

# Props
| Prop | Default | Values | Description
|--|--|--|--|
| size | "sm" | "sm", "md", "lg" | Controls size of the component 
| clear | false | boolean | boolean | If true will add an "x" icon which when clicked will clear the input's component
| afterIcon | null | remixicon class | **Note: remove the "ri" in class name**Icon to be placed before the input
| beforeIcon | null | remixicon class | **Note: remove the "ri" in class name**Icon to be placed after the input

## Slots
| Name | Scoped slots | Description
|--|--|--|
| before | null | Content to be placed to the left of the input
| after | null | Content to be placed to the right of the input
| node-content | node | Can be used to further customise the display of nodes in the menu