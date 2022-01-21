# OrButton
A button is usually use to initialize some business logic when it's clicked.

Ornament has 3 button modes
- Solid
- Outline
- Text

And the buttons come in 4 different colors
- Primary
- Success
- Danger
- Info

**Solid Buttons**
<or-button>Primary Button</or-button>
<or-button class="success ml-2">Success Button</or-button>
<or-button class="danger ml-2">Danger Button</or-button>
<or-button class="info ml-2">Info Button</or-button>

```html
<or-button>Primary Button</or-button>
<or-button class="success">Success Button</or-button>
<or-button class="danger">Danger Button</or-button>
<or-button class="info">Info Button</or-button>
```

**Outline Buttons**
<or-button class="outline">Primary Button</or-button>
<or-button class="outline success ml-2">Success Button</or-button>
<or-button class="outline danger ml-2">Danger Button</or-button>
<or-button class="outline info ml-2">Info Button</or-button>

```html
<or-button class="outline">Primary Button</or-button>
<or-button class="outline success">Success Button</or-button>
<or-button class="outline danger">Danger Button</or-button>
<or-button class="outline info">Info Button</or-button>
```

**Text Buttons**
<or-button class="text">Primary Button</or-button>
<or-button class="text success ml-2">Success Button</or-button>
<or-button class="text danger ml-2">Danger Button</or-button>
<or-button class="text info ml-2">Info Button</or-button>

```html
<or-button class="text">Primary Button</or-button>
<or-button class="text success">Success Button</or-button>
<or-button class="text danger">Danger Button</or-button>
<or-button class="text info">Info Button</or-button>
```

**Loading**
<or-button :is-loading="true">Button</or-button>

The default loader type is `pulse` which renders the [OrPulsingLoader Component](or-loaders.html)  the other value is `circular` which would
render the [OrCircularLoader Component](or-loaders.html)

```html
<or-button :is-loading="true">Button</or-button>
```

## Props
| Prop | Default | Type | Values | Description
|--|--|--|--|--|
| size | "sm" | string | "sm", "md", "lg" | Constrols size of component
| isLoading | false | boolean | true, false | Button loading state
| loader | pulse | string | pulse, circular | Loader type