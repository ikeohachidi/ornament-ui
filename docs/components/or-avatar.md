# OrAvatar
A component usually used to visually represent a user.


**Usage**

Different ideas can be created by mixing and matching the prop values

<div class="flex" style="align-items: top">
    <or-avatar 
        img="https://media.giphy.com/media/K3Sbp8fOgKye4/giphy.gif"
        :dimension="90"
        :rounded="true"
        text="Lisa Simpson"
    />
    <or-avatar 
        class="ml-3"
        :dimension="90"
        :rounded="true"
        text="Lisa Simpson"
    />
    <or-avatar 
        class="ml-3"
        :dimension="90"
        :rounded="true"
        text="Lisa Simpson"
        :showText="false"
    />
    <or-avatar 
        img="https://media.giphy.com/media/K3Sbp8fOgKye4/giphy.gif"
        class="ml-3"
        :dimension="90"
        cornerRadius="lg"
        text="Lisa Simpson"
        textPosition="right"
    />
</div>

```html
<or-avatar 
    img="https://media.giphy.com/media/K3Sbp8fOgKye4/giphy.gif"
    :dimension="90"
    :rounded="true"
    text="Lisa Simpson"
/>
```

**NOTE:** The component should either have either have a valid url to the image in the `img` prop or at least a some text in the `text` prop.
This is because the component will usually fallback to create initials off the `text` prop if the image URL isn't valid.

# Props
| Prop | Default | Type | Values | Description
|--|--|--|--|--|
| img | | string | | URL to image
| text | | string | | Text to place with image
| dimension | 40 | number | size(height, width) of the image
| rounded | false | boolean | true, false | Make image circlar
| cornerRadius | sm | string | "sm", "md", "lg" | Number representing corner roundness
| textPosition | bottom | string | top, right, bottom, left | Position of the text to the image