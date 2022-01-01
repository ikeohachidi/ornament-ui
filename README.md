# Ornament UI

A UI component library for Vue 3.

**Note:** Thanks for trying this out. Please take notice that this project is still in active development and doesn't have a v1 yet. As such you can
expect it'll be buggy. If you find any bugs or just want a feature please create an issue. **Thanks** 

See it in action [Ornament Docs](https://ornament.netlify.com)

# Getting started

## Installation

### NPM
To install in your project NPM is the preferred way to go as it is what is used in development and what Ornament is built with.
```shell
$ npm install ornament-ui
```
### Yarn 
Yarn installation
```shell
$ yarn add ornament-ui
```


## Registeration

#### Global (plugin)
To use as a plugin which will enable Ornament globally in every vue file and will also have no need for component registeration
```typescript
// main.ts || main.js
import OrnamentUI from 'ornament-ui';

const app = createApp(App)
    .use(OrnamentUI)
    .mount('#app')
``` 

#### Global (single component)
The approach above can also be used to register single components globally
```typescript
// main.ts || main.js
import { OrInput } from 'ornament-ui';

const app = createApp(App)
    .component('or-input', OrInput)
    .mount('#app')
```

#### Per component
Ornament can also be registered at a component level
```typescript
import { defineComponent } from 'vue';
import { OrInput } from 'ornament-ui';

export default defineComponent({
    components: {
        OrInput
    }
})
```