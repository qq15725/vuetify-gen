
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

## use 

```javascript
// gen toast
this.$toast('toast')


// gen confirm
this.$confirm('confirm').then(() => { 
  console.log('ok') 
}).catch(() => {
  console.log('cancel') 
})


// gen form
this.$form({
  title: 'form title',
  items: [ 
    {
      is: 'v-text-field',
      name: 'username',
      props: {
        label: 'username label'
      }
    }   
  ]
}).then(({ username }) => { 
  console.log('submit', username) 
}).catch(() => {
  console.log('cancel') 
})
```