# OrAvatar

**Basic**
<or-avatar 
    img="https://media.giphy.com/media/K3Sbp8fOgKye4/giphy.gif"
    :dimension="90"
    :rounded="true"
    text="Lisa Simpson"
/>

```html
<or-avatar 
    img="https://media.giphy.com/media/K3Sbp8fOgKye4/giphy.gif"
    :dimension="90"
    :rounded="true"
    text="Lisa Simpson"
/>
```

# Props
| Prop | Default | Type | Values | Description
|--|--|--|--|--|
| img | | string | | URL to image
| text | | string | | Text to place with image
| dimension | 40 | number | size(height, width) of the image
| rounded | false | boolean | true, false | Make image circlar
| cornerRadius | sm | string | "sm", "md", "lg" | Number representing corner roundness
| textPosition | bottom | string | top, right, bottom, left | Position of the text to the image