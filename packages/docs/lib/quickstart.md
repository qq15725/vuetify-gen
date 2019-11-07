
## install
 
```bash
npm install vuetify-gen --save
```

## create plugins/vuetify-gen.js

```javascript
import Vue from 'vue'
// your plugins/vuetify
import vuetify from './vuetify'
import * as components from 'vuetify-gen/lib/components'
import vuetifyGen from 'vuetify-gen'

Vue.use(vuetifyGen, {
  vuetify,
  components
})
```
