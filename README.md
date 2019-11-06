
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

[online demo](https://qq15725.github.io/vuetify-gen/packages/docs/dist/)

### toast

```javascript
this.$toast('message')
// timeout
this.$toast('message', 2000)
// persistent
this.$toast('message', 2000, true)
```

### notify

```javascript
this.$notify('message')
// color
this.$notify('message', 'success')
// timeout
this.$notify('message', 'success', 2000)
```

### confirm

```javascript
this.$confirm('title').then(() => { 
  console.log('ok') 
}).catch(() => {
  console.log('cancel') 
})
// confirm persistent
this.$confirm('title', true)
```

### form

```javascript
this.$form(
  'form title', [ 
   {
     is: 'v-text-field',
     name: 'username',
     props: {
       label: 'username label'
     }
   }
 ],
 // persistent
 true
).then(({ username }) => { 
  console.log('submit', username) 
}).catch(() => {
  console.log('cancel') 
})
```

### dateTimePicker

```javascript
this.$dateTimePicker().then(date => { 
  console.log('submit', date) 
}).catch(() => {
  console.log('cancel') 
})
// range
this.$dateTimePicker(true)
// persistent
this.$dateTimePicker(true, true)
```