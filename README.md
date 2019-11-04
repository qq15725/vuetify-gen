
## install
 
```
npm install vuetify-gen --save
```

## create vuetify-gen.js

```
import Vue from 'vue'
import vuetify from './vuetify'
import * as components from 'vuetify-gen/lib/components'
import vuetifyGen from 'vuetify-gen'

Vue.use(vuetifyGen, {
  vuetify,
  components
})
```

## use 

```
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
      label: 'username label'
    }   
  ]
}).then(() => { 
  console.log('submit') 
}).catch(() => {
  console.log('cancel') 
})
```