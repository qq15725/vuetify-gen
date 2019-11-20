## 表单生成

<v-form-gen-base></v-form-gen-base>

```javascript
[
  {
    is: 'text',
    name: 'name',
    data: {
      props: {
        label: 'post name',
        required: true
      }
    }
  },
  { is: 'v-divider' },
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
    data: {
      props: {
        label: 'xxx',
        placeholder: 'username label'
      }
    },
    cols: 6
  },
  { is: 'v-divider' },
  {
    tag: 'select',
    name: 'select',
    data: {
      props: {
        label: 'xxx',
        placeholder: 'username label',
        items: [
          'asdasdsd',
          'asdasdsdsadds'
        ]
      }
    },
    cols: 6
  },
  {
    tag: 'switch',
    name: 'switch',
    data: {
      props: {
        label: 'switch'
      }
    },
    cols: 6
  },
  {
    tag: 'checkbox',
    name: 'checkbox',
    data: {
      props: {
        label: 'checkbox1',
        value: 'checkbox1'
      }
    },
    cols: 6
  },
  {
    tag: 'radio',
    name: 'radio',
    data: {
      props: {
        label: 'radio',
        row: true,
        items: [
          {
            label: 'radio1',
            value: 1
          },
          {
            label: 'radio2',
            value: 2
          }
        ]
      }
    },
    cols: 6
  },
  {
    tag: 'slider',
    name: 'slider',
    cols: 6
  },
  {
    tag: 'date',
    name: 'date',
    cols: 6
  },
  {
    is: 'date',
    name: 'date',
    props: {
      hideTime: true
    },
    cols: 6
  }
]
```
