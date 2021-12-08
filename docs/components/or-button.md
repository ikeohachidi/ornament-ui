# OrButton
Renders a button on screen that can be used for forms and in whatever contexts you'd like.

**Basic**
<or-button>Button</or-button>

```html
<or-button>Button</or-button>
```

**Loading**
<or-button :is-loading="true">Button</or-button>

```html
<or-button :is-loading="true">Button</or-button>
```

## Props
| Prop | Default | Type | Values | Description
|--|--|--|--|--|
| size | "sm" | string | "sm", "md", "lg" | Constrols size of component
| isLoading | false | boolean | true, false | Button loading state