import { d as n, S as a, _ as l, o as s, c as o, a as t, f as e } from './index.js'
const i = n({
    name: 'Data',
    mounted() {
      new a({
        select: this.$refs.dataSingle,
        data: [{ placeholder: !0, text: 'data placeholder' }, { text: 'Cat' }, { text: 'Dog' }, { text: 'Bird' }],
      }),
        new a({
          select: this.$refs.dataMultiple,
          data: [
            { placeholder: !0, text: 'data placeholder' },
            { text: 'Human' },
            { label: 'Animals', options: [{ text: 'Cat' }, { text: 'Dog' }, { text: 'Bird' }] },
          ],
        })
    },
  }),
  d = { id: 'data' },
  c = { class: 'content' },
  r = t('h2', { class: 'header' }, 'data', -1),
  p = t('p', null, 'Data is a value that can be set to initialize options in the select dropdown', -1),
  u = { class: 'select-split' },
  f = { ref: 'dataSingle' },
  h = { ref: 'dataMultiple', multiple: '' },
  x = t(
    'pre',
    null,
    [
      e('        '),
      t(
        'code',
        { class: 'language-javascript' },
        `
          new SlimSelect({
            select: '#selectElement',
            data: [
              {text: 'Value 1'},
              {text: 'Value 2'},
              {text: 'Value 3'}
            ],
            // groups
            data: [
              {
                label: 'Animals',
                options: [
                  {text: 'Cat'},
                  {text: 'Dog'},
                  {text: 'Bird'}
                ]
              }
            ]
            // Mix - option and group options
            data: [
              {text: 'Human'}, // regular option
              {
                label: 'Animals',
                options: [
                  {text: 'Cat'},
                  {text: 'Dog'},
                  {text: 'Bird'}
                ]
              }
            ]
          })

          // If you want to set a placeholder set the first object placeholder to true
          {'placeholder': true, 'text': 'placeholder text'}
        `,
      ),
      e(`
      `),
    ],
    -1,
  ),
  _ = t('h4', null, 'Data Types', -1),
  m = t(
    'pre',
    null,
    [
      e('        '),
      t(
        'code',
        { class: 'language-javascript' },
        `
          var optgroup = {
            label: 'label', // Required
            options: [] // Required - value is an array of options
          }

          var option = {
            text: 'text', // Required
            value: 'value', // Optional - value will be set by text if not set
            html: '<b>Html</b>', // Optional - will be used for display purposes if set
            selected: false, // Optional - default is false
            disabled: false, // Optional - default is false
            placeholder: false, // Optional - default is false
            class: '', // Optional - default is not set
            style: '', // Optional - default is not set
            data: {} // Optional - If you have data attributes
          }
        `,
      ),
      e(`
      `),
    ],
    -1,
  )
function b(g, v, w, y, O, B) {
  return (
    s(),
    o('div', d, [t('div', c, [r, p, t('div', u, [t('select', f, null, 512), t('select', h, null, 512)]), x, _, m])])
  )
}
const S = l(i, [['render', b]])
export { S as default }
