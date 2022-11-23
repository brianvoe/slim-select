# Slim Select Vue

## slimselectjs.com

Vue integration for the SlimSelect

See the website for the best details on how to use the vue integration

[![NPM Downloads](https://img.shields.io/npm/dt/@slim-select/vue)](https://www.npmjs.com/package/@slim-select/vue)

## Support

[![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/brianvoe)

<a href="https://www.buymeacoffee.com/brianvoe" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>

## Installation

```bash
npm install @slim-select/vue
```

## Usage

```javascript
import { defineComponent } from 'vue'
import SlimSelect from '@slim-select/vue'

export default defineComponent({
  components: {
    SlimSelect,
  },
})
```

```html
<SlimSelect>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
  <option value="3">Option 3</option>
</SlimSelect>

<SlimSelect multiple>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
  <option value="3">Option 3</option>
</SlimSelect>
```
