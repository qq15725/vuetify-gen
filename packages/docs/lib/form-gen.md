## 表单生成

<v-form-gen-base></v-form-gen-base>

```javascript
[
  {
    tag: 'text',
    name: 'name',
    data: {
      props: {
        label: 'post name',
        required: true
      }
    }
  },
  { tag: 'v-divider' },
  {
    tag: 'input',
    name: 'input',
    data: {
      props: {
        label: 'xxx',
        placeholder: 'username label'
      },
      directives: [
        {
          name: 'mask',
          value: '####-####-####'
        }
      ]
    },
    cols: 6
  },
  {
    tag: 'number',
    name: 'number',
    props: {
      label: 'xxx',
      placeholder: 'username label'
    },
    cols: 6
  },
  { tag: 'v-divider' },
  {
    tag: 'select',
    name: 'select',
    props: {
      label: 'username',
      items: [
        'asdasdsd',
        'asdasdsdsadds'
      ]
    },
    cols: 12
  },
  { tag: 'v-divider' },
  {
    tag: 'date',
    name: 'date',
    props: {
      label: '日期时间选择'
    }
  },
  { tag: 'v-divider' },
  {
    tag: 'date',
    name: 'date',
    props: {
      label: '日期选择',
      hideTime: true
    }
  }
]
```
