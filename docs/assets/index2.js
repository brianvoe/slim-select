import { d as n, S as o, _ as a, o as i, c, a as e, f as t, b as v, g as r, h as p } from './index.js'
const O = n({
    name: 'CloseOnSelect',
    mounted() {
      new o({ select: this.$refs.closeOnSelectSingle, settings: { closeOnSelect: !1 } }),
        new o({ select: this.$refs.closeOnSelectMultiple, settings: { closeOnSelect: !1, selectByGroup: !0 } })
    },
  }),
  G = { class: 'content' },
  j = e('h2', { class: 'header' }, 'closeOnSelect', -1),
  L = e(
    'p',
    null,
    ' closeOnSelect is a boolean value in which determines whether or not to close the content area upon selecting a value. ',
    -1,
  ),
  U = { class: 'select-split' },
  A = { ref: 'closeOnSelectSingle' },
  q = v(
    '<option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option><optgroup label="Super Values"><option value="value11">Value 1</option><option value="value22">Value 2</option><option value="value33">Value 3</option></optgroup>',
    4,
  ),
  I = [q],
  N = { ref: 'closeOnSelectMultiple', multiple: '' },
  k = v(
    '<option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option><optgroup label="Super Values"><option value="value11">Value 1</option><option value="value22">Value 2</option><option value="value33">Value 3</option></optgroup>',
    4,
  ),
  R = [k],
  E = e(
    'pre',
    null,
    [
      t('      '),
      e(
        'code',
        { class: 'language-javascript' },
        `
        new SlimSelect({
          select: '#search',
          settings: {
            closeOnSelect: false,
          },
        })
      `,
      ),
      t(`
    `),
    ],
    -1,
  )
function W(s, l, u, d, _, h) {
  return i(), c('div', G, [j, L, e('div', U, [e('select', A, I, 512), e('select', N, R, 512)]), E])
}
const Y = a(O, [['render', W]]),
  z = n({
    name: 'ContentLocation',
    mounted() {
      new o({ select: this.$refs.contentLocation, settings: { contentLocation: this.$refs.local } })
    },
  }),
  F = { class: 'content' },
  J = e('h2', { class: 'header' }, 'contentLocation', -1),
  K = e(
    'p',
    null,
    ' contentLocation will allow you to set the location of where the content section of slim select. By default every content div is appended to the body. ',
    -1,
  ),
  Q = e(
    'p',
    null,
    ' The content container is the bottom half of slim select. This includes the search input field and available options ',
    -1,
  ),
  X = { class: 'select-split' },
  Z = { ref: 'contentLocation', style: { width: '50%' } },
  ee = e('option', { value: 'value1' }, 'Value 1', -1),
  te = e('option', { value: 'value2' }, 'Value 2', -1),
  oe = e('option', { value: 'value3' }, 'Value 3', -1),
  se = [ee, te, oe],
  le = { ref: 'local' },
  ne = e(
    'pre',
    null,
    [
      t('      '),
      e(
        'code',
        { class: 'language-javascript' },
        `
        new SlimSelect({
          select: '#selectElement',
          settings: {
            contentLocation: document.getElementById('local'), 
          }
        })
      `,
      ),
      t(`
    `),
    ],
    -1,
  ),
  ae = e(
    'pre',
    null,
    [
      t('      '),
      e(
        'code',
        { class: 'language-html' },
        `
        <select id="contentLocation">
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>

        <!-- The content will go in this div -->
        <div id="local"></div>
      `,
      ),
      t(`
    `),
    ],
    -1,
  )
function ie(s, l, u, d, _, h) {
  return i(), c('div', F, [J, K, Q, e('div', X, [e('select', Z, se, 512), e('div', le, null, 512)]), ne, ae])
}
const ce = a(z, [['render', ie]]),
  ue = n({
    name: 'ContentPosition',
    mounted() {
      new o({ select: this.$refs.contentPositionUp, settings: { contentPosition: 'up' } }),
        new o({ select: this.$refs.contentPositionDown, settings: { contentPosition: 'down' } })
    },
  }),
  de = { class: 'content' },
  _e = e('h2', { class: 'header' }, 'contentPosition', -1),
  he = e(
    'p',
    null,
    ' contentPosition is a string value that will decide where to show your content when it comes out. By default slim select will try to put the content where it can without going off screen. But you may want to always show it in one direction. ',
    -1,
  ),
  re = e(
    'p',
    null,
    [t('Possible Options: '), e('b', null, "'auto', 'up' or 'down'"), t('. Default is '), e('b', null, "'auto'")],
    -1,
  ),
  pe = { class: 'select-split' },
  ve = { ref: 'contentPositionUp' },
  $e = e('option', { value: 'up1' }, 'Up 1', -1),
  me = e('option', { value: 'up2' }, 'Up 2', -1),
  ge = e('option', { value: 'up3' }, 'Up 3', -1),
  fe = [$e, me, ge],
  Se = { ref: 'contentPositionDown' },
  we = e('option', { value: 'down1' }, 'Down 1', -1),
  ye = e('option', { value: 'down2' }, 'Down 2', -1),
  xe = e('option', { value: 'down3' }, 'Down 3', -1),
  Ve = [we, ye, xe],
  be = e(
    'pre',
    null,
    [
      t('      '),
      e(
        'code',
        { class: 'language-javascript' },
        `
        new SlimSelect({
          select: '#contentPosition',
          settings: {
            contentPosition: 'auto' // 'auto', 'up' or 'down'
          }
        })
      `,
      ),
      t(`
    `),
    ],
    -1,
  )
function Me(s, l, u, d, _, h) {
  return i(), c('div', de, [_e, he, re, e('div', pe, [e('select', ve, fe, 512), e('select', Se, Ve, 512)]), be])
}
const Te = a(ue, [['render', Me]]),
  De = n({
    name: 'Css',
    mounted() {
      new o({ select: this.$refs.selectClass }), new o({ select: this.$refs.optionClass })
    },
  })
const Be = { class: 'content' },
  Ce = e('h2', { class: 'header' }, 'css class', -1),
  Pe = e(
    'p',
    null,
    ' Slim select will inherit any classes that were added to the original select element. This includes options as well. ',
    -1,
  ),
  He = { class: 'select-split' },
  Oe = { ref: 'selectClass', class: 'select-class' },
  Ge = e('option', { value: 'value1' }, 'Value 1', -1),
  je = e('option', { value: 'value2' }, 'Value 2', -1),
  Le = e('option', { value: 'value3' }, 'Value 3', -1),
  Ue = [Ge, je, Le],
  Ae = { ref: 'optionClass', class: 'option-class' },
  qe = e('option', { class: 'red', value: 'value1' }, 'Red', -1),
  Ie = e('option', { class: 'green', value: 'value2' }, 'Green', -1),
  Ne = e('option', { class: 'blue', value: 'value3' }, 'Blue', -1),
  ke = [qe, Ie, Ne],
  Re = e(
    'pre',
    null,
    [
      t('        '),
      e(
        'code',
        { class: 'language-html' },
        `
          <select id="select-class" class="classItems">
            <option class="red" value="value1">Value 1</option>
            <option class="green" value="value2">Value 2</option>
            <option class="blue" value="value3">Value 3</option>
          </select>
        `,
      ),
      t(`
      `),
    ],
    -1,
  )
function Ee(s, l, u, d, _, h) {
  return i(), c('div', Be, [Ce, Pe, e('div', He, [e('select', Oe, Ue, 512), e('select', Ae, ke, 512)]), Re])
}
const We = a(De, [['render', Ee]]),
  Ye = n({
    name: 'DataAttributes',
    mounted() {
      new o({ select: this.$refs.optionsSingle }), new o({ select: this.$refs.optionsMultiple })
    },
  }),
  ze = { class: 'content' },
  Fe = e('h2', { class: 'header' }, 'Data Attributes', -1),
  Je = e(
    'p',
    null,
    ' Slim select will take on attributes of the original as best as possible. Below are example usages of attributes added to the underlining select options that slim select picked up and used ',
    -1,
  ),
  Ke = { class: 'select-split' },
  Qe = { ref: 'optionsSingle' },
  Xe = v(
    '<option data-placeholder="true"></option><option value="value1" data-info="Here is info">Data Attributes</option><option value="value2" disabled>Disabled Option</option><option value="value3" class="green">Class Green</option><option value="value4" style="color:purple;">Inline Style</option>',
    5,
  ),
  Ze = [Xe],
  et = { ref: 'optionsMultiple', multiple: '' },
  tt = e('option', { value: 'value1', 'data-info': 'Here is info' }, 'Data Attributes', -1),
  ot = e('option', { value: 'value2', disabled: '' }, 'Disabled Option', -1),
  st = e('option', { value: 'value3', class: 'green' }, 'Class Green', -1),
  lt = e('option', { value: 'value4', style: { color: 'purple' } }, 'Inline Style', -1),
  nt = [tt, ot, st, lt]
function at(s, l, u, d, _, h) {
  return i(), c('div', ze, [Fe, Je, e('div', Ke, [e('select', Qe, Ze, 512), e('select', et, nt, 512)])])
}
const it = a(Ye, [['render', at]]),
  ct = n({
    name: 'Deselect',
    mounted() {
      new o({ select: this.$refs.allowDeselectSingle, settings: { allowDeselect: !0 } }),
        new o({ select: this.$refs.allowDeselectMultiple, settings: { allowDeselect: !0 } })
    },
  }),
  ut = { class: 'content' },
  dt = e('h2', { class: 'header' }, 'allowDeselect', -1),
  _t = e('p', null, 'This will allow you to deselect a value on a single/multiple select dropdown.', -1),
  ht = e(
    'p',
    null,
    'Be sure to have an empty option data placeholder so slim select has an empty string value to select.',
    -1,
  ),
  rt = { class: 'select-split' },
  pt = { ref: 'allowDeselectSingle' },
  vt = e('option', { 'data-placeholder': 'true' }, null, -1),
  $t = e('option', { value: 'value1' }, 'Value 1', -1),
  mt = e('option', { value: 'value2' }, 'Value 2', -1),
  gt = e('option', { value: 'value3' }, 'Value 3', -1),
  ft = [vt, $t, mt, gt],
  St = { ref: 'allowDeselectMultiple', multiple: '' },
  wt = e('option', { 'data-placeholder': 'true' }, null, -1),
  yt = e('option', { value: 'value1' }, 'Value 1', -1),
  xt = e('option', { value: 'value2' }, 'Value 2', -1),
  Vt = e('option', { value: 'value3' }, 'Value 3', -1),
  bt = [wt, yt, xt, Vt],
  Mt = e(
    'pre',
    null,
    [
      t('      '),
      e(
        'code',
        { class: 'language-javascript' },
        `
        new SlimSelect({
          select: '#selectElement',
          settings: {
            allowDeselect: true
          }
        })
      `,
      ),
      t(`
    `),
    ],
    -1,
  ),
  Tt = e(
    'pre',
    null,
    [
      t('      '),
      e(
        'code',
        { class: 'language-html' },
        `
        <!-- Requires emtpy data-placeholder option -->
        <select id="allowDeselect">
          <option data-placeholder="true"></option>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      `,
      ),
      t(`
    `),
    ],
    -1,
  )
function Dt(s, l, u, d, _, h) {
  return i(), c('div', ut, [dt, _t, ht, e('div', rt, [e('select', pt, ft, 512), e('select', St, bt, 512)]), Mt, Tt])
}
const Bt = a(ct, [['render', Dt]]),
  Ct = n({
    name: 'Display',
    mounted() {
      const s = new o({ select: this.$refs.selectdisplay }),
        l = [
          { value: 'value1', text: 'Value 1', display: !1 },
          { value: 'value2', text: 'Value 2' },
          { value: 'value3', text: 'Value 3' },
        ]
      s.setData(l), s.setSelected(['value1', 'value3']), new o({ select: this.$refs.selectdisplay2 })
    },
  }),
  Pt = { class: 'content' },
  Ht = e('h2', { class: 'header' }, 'display', -1),
  Ot = e('p', null, 'Allows to hide elements of selected values.', -1),
  Gt = { class: 'select-split' },
  jt = { ref: 'selectdisplay', multiple: '' },
  Lt = e(
    'pre',
    null,
    [
      t('      '),
      e(
        'code',
        { class: 'language-javascript' },
        `
        const displaySelect = new SlimSelect({
          select: '#selectElement'
        })

        const displayData = [
          { value: 'value1', text: 'Value 1', display: false },
          { value: 'value2', text: 'Value 2' },
          { value: 'value3', text: 'Value 3' },
        ]

        displaySelect.setData(displayData)
        displaySelect.set(['value1', 'value3'])
      `,
      ),
      t(`
    `),
    ],
    -1,
  ),
  Ut = e(
    'pre',
    null,
    [
      t('      '),
      e(
        'code',
        { class: 'language-html' },
        `
        <select id="selectMultiMandatory" multiple></select>
      `,
      ),
      t(`
    `),
    ],
    -1,
  ),
  At = e('p', null, 'Or', -1),
  qt = { class: 'select-split' },
  It = { ref: 'selectdisplay2', multiple: '' },
  Nt = e('option', { value: 'value1', style: { display: 'none' }, selected: '' }, 'Value 1', -1),
  kt = e('option', { value: 'value2', selected: '' }, 'Value 2', -1),
  Rt = e('option', { value: 'value3' }, 'Value 3', -1),
  Et = [Nt, kt, Rt],
  Wt = e(
    'pre',
    null,
    [
      t('      '),
      e(
        'code',
        { class: 'language-javascript' },
        `
        const slim = new SlimSelect({
          select: '#selectElement'
        });
      `,
      ),
      t(`
    `),
    ],
    -1,
  ),
  Yt = e(
    'pre',
    null,
    [
      t('      '),
      e(
        'code',
        { class: 'language-html' },
        `
        <select id="selectdisplay2" multiple>
          <option value="value1" style="display: none;" selected>Value 1</option>
          <option value="value2" selected>Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      `,
      ),
      t(`
    `),
    ],
    -1,
  )
function zt(s, l, u, d, _, h) {
  return (
    i(),
    c('div', Pt, [
      Ht,
      Ot,
      e('div', Gt, [e('select', jt, null, 512)]),
      Lt,
      Ut,
      At,
      e('div', qt, [e('select', It, Et, 512)]),
      Wt,
      Yt,
    ])
  )
}
const Ft = a(Ct, [['render', zt]]),
  Jt = n({
    name: 'HideSelected',
    mounted() {
      new o({ select: this.$refs.hideSelectedSingle, settings: { hideSelected: !0 } }),
        new o({ select: this.$refs.hideSelectedMultiple, settings: { hideSelected: !0 } })
    },
  }),
  Kt = { class: 'content' },
  Qt = e('h2', { class: 'header' }, 'hideSelected', -1),
  Xt = e('p', null, 'hideSelected setting is used to hide the current selected option in the dropdown.', -1),
  Zt = { class: 'select-split' },
  eo = { ref: 'hideSelectedSingle' },
  to = e('option', { 'data-placeholder': 'true' }, null, -1),
  oo = e('option', { value: 'value1' }, 'Value 1', -1),
  so = e('option', { value: 'value2' }, 'Value 2', -1),
  lo = e('option', { value: 'value3' }, 'Value 3', -1),
  no = [to, oo, so, lo],
  ao = { ref: 'hideSelectedMultiple', multiple: '' },
  io = e('option', { value: 'value1' }, 'Value 1', -1),
  co = e('option', { value: 'value2' }, 'Value 2', -1),
  uo = e('option', { value: 'value3' }, 'Value 3', -1),
  _o = [io, co, uo],
  ho = e(
    'pre',
    null,
    [
      t('        '),
      e(
        'code',
        { class: 'language-javascript' },
        `
          new SlimSelect({
            select: '#selectElement',
            hideSelectedOption: true
          })
        `,
      ),
      t(`
      `),
    ],
    -1,
  ),
  ro = e(
    'pre',
    null,
    [
      t('      '),
      e(
        'code',
        { class: 'language-html' },
        `
        <select id="hideSelectedSingle">
          <option data-placeholder="true"></option>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>

        <select id="hideSelectedMultiple">
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      `,
      ),
      t(`
    `),
    ],
    -1,
  )
function po(s, l, u, d, _, h) {
  return i(), c('div', Kt, [Qt, Xt, e('div', Zt, [e('select', eo, no, 512), e('select', ao, _o, 512)]), ho, ro])
}
const vo = a(Jt, [['render', po]]),
  $o = n({
    name: 'Html',
    mounted() {
      new o({
        select: this.$refs.selectHtmlSingle,
        settings: { searchHighlight: !0 },
        data: [
          { html: '<b>Bold Text</b>', text: 'Bold Text', value: 'bold text' },
          { html: '<i>Slim Select you are awesome</i>', text: 'Slim Select awesome' },
          { html: '<div style="border: solid 1px #666666;">Border</div>', text: 'Border', value: 'border' },
        ],
      }),
        new o({
          select: this.$refs.selectHtmlMulti,
          data: [
            { html: '<b>Bold Text</b>', text: 'Bold Text', value: 'bold text' },
            { html: '<i>Slim Select you are awesome</i>', text: 'Slim Select awesome' },
            { html: '<div style="border: solid 1px #666666;">Border</div>', text: 'Border', value: 'border' },
          ],
        }),
        new o({
          select: this.$refs.selectHtmlSingleText,
          settings: { valuesUseText: !0 },
          data: [
            { html: '<b>Bold Text</b>', text: 'Bold Text', value: 'bold text' },
            { html: '<i>Slim Select you are awesome</i>', text: 'Slim Select awesome' },
            { html: '<div style="border: solid 1px #666666;">Border</div>', text: 'Border', value: 'border' },
          ],
        }),
        new o({
          select: this.$refs.selectHtmlMultiText,
          settings: { valuesUseText: !0 },
          data: [
            { html: '<b>Bold Text</b>', text: 'Bold Text', value: 'bold text' },
            { html: '<i>Slim Select you are awesome</i>', text: 'Slim Select awesome' },
            { html: '<div style="border: solid 1px #666666;">Border</div>', text: 'Border', value: 'border' },
          ],
        })
    },
  }),
  mo = { class: 'content' },
  go = e('h2', { class: 'header' }, 'html', -1),
  fo = e('p', null, 'Slim select has the ability to set custom html in content in the select option.', -1),
  So = e(
    'p',
    null,
    ' Due to html spec we cant do this directly on the select dropdown, but we can pass them as data values to slim select ',
    -1,
  ),
  wo = { class: 'select-split' },
  yo = { ref: 'selectHtmlSingle' },
  xo = { ref: 'selectHtmlMulti', multiple: '' },
  Vo = e(
    'div',
    { class: 'select-split', style: { padding: '16px 0 0 0' } },
    [e('h4', null, 'Use text for selected values')],
    -1,
  ),
  bo = { class: 'select-split' },
  Mo = { ref: 'selectHtmlSingleText' },
  To = { ref: 'selectHtmlMultiText', multiple: '' },
  Do = e(
    'pre',
    null,
    [
      t('      '),
      e(
        'code',
        { class: 'language-javascript' },
        `
        <select id="select-html"></select>

        var select = new SlimSelect({
          select: '#select-html',
          valuesUseText: false, // Use text instead of html for selected values - default false
          data: [
            {html: '<img height="30" width="30" src="http://lorempixel.com/30/30" />\xA0Image', text: 'Image', value: 'image'},
            {html: '<b>Bold Text</b>', text: 'Bold Text', value: 'bold text'},
            {html: '<div style="border: solid 1px #666666;">Border</div>', text: 'Border', value: 'border'},
            {html: '<i>Slim Select you are awesome</i>', text: 'Slim Select awesome'}
          ]
        })
      `,
      ),
      t(`
    `),
    ],
    -1,
  )
function Bo(s, l, u, d, _, h) {
  return (
    i(),
    c('div', mo, [
      go,
      fo,
      So,
      e('div', wo, [e('select', yo, null, 512), e('select', xo, null, 512)]),
      Vo,
      e('div', bo, [e('select', Mo, null, 512), e('select', To, null, 512)]),
      Do,
    ])
  )
}
const Co = a($o, [['render', Bo]]),
  Po = n({
    name: 'Mandatory',
    mounted() {
      const s = new o({ select: this.$refs.selectMultiMandatory }),
        l = [
          { value: 'value1', text: 'Value 1', mandatory: !0 },
          { value: 'value2', text: 'Value 2' },
          { value: 'value3', text: 'Value 3' },
        ]
      s.setData(l), s.setSelected(['value1', 'value3']), new o({ select: this.$refs.selectMultiMandatory2 })
    },
  }),
  Ho = { class: 'content' },
  Oo = e('h2', { class: 'header' }, 'mandatory', -1),
  Go = e(
    'p',
    null,
    ' When using multi select you can set a mandatory on the option to prevent capability to deselect particular option. Note options with mandatory flag is not selected by default, you need select them yourselfs. ',
    -1,
  ),
  jo = { class: 'select-split' },
  Lo = { ref: 'selectMultiMandatory', multiple: '' },
  Uo = e(
    'pre',
    null,
    [
      t('      '),
      e(
        'code',
        { class: 'language-javascript' },
        `
        const slim = new SlimSelect({
          select: '#selectElement'
        });

        const data = [
          { value: 'value1', text: 'Value 1', mandatory: true },
          { value: 'value2', text: 'Value 2' },
          { value: 'value3', text: 'Value 3' },
        ]

        slim.setData(data)
        slim.set(["value1", "value3"])
      `,
      ),
      t(`
    `),
    ],
    -1,
  ),
  Ao = e(
    'pre',
    null,
    [
      t('      '),
      e(
        'code',
        { class: 'language-html' },
        `
        <select id="selectMultiMandatory" multiple></select>
      `,
      ),
      t(`
    `),
    ],
    -1,
  ),
  qo = e('p', null, 'Or', -1),
  Io = { class: 'select-split' },
  No = { ref: 'selectMultiMandatory2', multiple: '' },
  ko = e('option', { value: 'value1', 'data-mandatory': 'true', selected: '' }, 'Value 1', -1),
  Ro = e('option', { value: 'value2', selected: '' }, 'Value 2', -1),
  Eo = e('option', { value: 'value3' }, 'Value 3', -1),
  Wo = [ko, Ro, Eo],
  Yo = e(
    'pre',
    null,
    [
      t('      '),
      e(
        'code',
        { class: 'language-javascript' },
        `
        const slim = new SlimSelect({
          select: '#selectElement'
        });
      `,
      ),
      t(`
    `),
    ],
    -1,
  ),
  zo = e(
    'pre',
    null,
    [
      t('      '),
      e(
        'code',
        { class: 'language-html' },
        `
        <select id="selectMultiMandatory" multiple>
          <option value="value1" data-mandatory="true" selected>Value 1</option>
          <option value="value2" selected>Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      `,
      ),
      t(`
    `),
    ],
    -1,
  )
function Fo(s, l, u, d, _, h) {
  return (
    i(),
    c('div', Ho, [
      Oo,
      Go,
      e('div', jo, [e('select', Lo, null, 512)]),
      Uo,
      Ao,
      qo,
      e('div', Io, [e('select', No, Wo, 512)]),
      Yo,
      zo,
    ])
  )
}
const Jo = a(Po, [['render', Fo]]),
  Ko = n({
    name: 'MinMax',
    mounted() {
      new o({ select: this.$refs.selectMultiMax, settings: { minSelected: 2, maxSelected: 5 } })
    },
  }),
  Qo = { class: 'content' },
  Xo = e('h2', { class: 'header' }, 'Min/Max Selected', -1),
  Zo = e(
    'p',
    null,
    'When using multi select you can set a min and/or max on the amount of selections you can have.',
    -1,
  ),
  es = { class: 'select-split' },
  ts = { ref: 'selectMultiMax', multiple: '' },
  os = v(
    '<option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option>',
    6,
  ),
  ss = [os],
  ls = e(
    'pre',
    null,
    [
      t('      '),
      e(
        'code',
        { class: 'language-javascript' },
        `
        let slim = new SlimSelect({
          select: '#selectElement',
          settings: {
            minSelected: 2,
            maxSelected: 5,
          },
        })
      `,
      ),
      t(`
    `),
    ],
    -1,
  ),
  ns = e(
    'pre',
    null,
    [
      t('      '),
      e(
        'code',
        { class: 'language-html' },
        `
        <select id="selectMultiMax" multiple>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
          <option value="value4">Value 4</option>
          <option value="value5">Value 5</option>
          <option value="value6">Value 6</option>
        </select>
      `,
      ),
      t(`
    `),
    ],
    -1,
  )
function as(s, l, u, d, _, h) {
  return i(), c('div', Qo, [Xo, Zo, e('div', es, [e('select', ts, ss, 512)]), ls, ns])
}
const is = a(Ko, [['render', as]]),
  cs = n({
    name: 'Placeholder',
    mounted() {
      new o({ select: this.$refs.placeholderSingle, settings: { placeholderText: 'Custom Placeholder Text' } }),
        new o({ select: this.$refs.placeholderMultiple, settings: { placeholderText: 'Custom Placeholder Text' } })
    },
  }),
  us = { class: 'content' },
  ds = e('h2', { class: 'header' }, 'placeholderText', -1),
  _s = e(
    'p',
    null,
    ' Placeholders consists of setting the placeholder option value. The only difference is single selects require an empty option with data-placeholder set to true. Default value is "Select Value". ',
    -1,
  ),
  hs = { class: 'select-split' },
  rs = { ref: 'placeholderSingle' },
  ps = e('option', { 'data-placeholder': 'true' }, null, -1),
  vs = e('option', { value: 'value1' }, 'Value 1', -1),
  $s = e('option', { value: 'value2' }, 'Value 2', -1),
  ms = e('option', { value: 'value3' }, 'Value 3', -1),
  gs = [ps, vs, $s, ms],
  fs = { ref: 'placeholderMultiple', multiple: '' },
  Ss = e('option', { value: 'value1' }, 'Value 1', -1),
  ws = e('option', { value: 'value2' }, 'Value 2', -1),
  ys = e('option', { value: 'value3' }, 'Value 3', -1),
  xs = [Ss, ws, ys],
  Vs = e(
    'pre',
    null,
    [
      t('      '),
      e(
        'code',
        { class: 'language-javascript' },
        `
        new SlimSelect({
          select: '#placeholder',
          settings: {
            placeholderText: 'Custom Placeholder Text',
          }
        })
      `,
      ),
      t(`
    `),
    ],
    -1,
  ),
  bs = e(
    'pre',
    null,
    [
      t('      '),
      e(
        'code',
        { class: 'language-html' },
        `
        <!-- Set empty option with data-placeholder if you to have placeholder -->
        <!-- text for single select, otherwise first option will be selected -->
        <select id="placeholderSingle">
          <option data-placeholder="true"></option>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      `,
      ),
      t(`
    `),
    ],
    -1,
  )
function Ms(s, l, u, d, _, h) {
  return i(), c('div', us, [ds, _s, e('div', hs, [e('select', rs, gs, 512), e('select', fs, xs, 512)]), Vs, bs])
}
const Ts = a(cs, [['render', Ms]]),
  Ds = n({
    name: 'Search',
    mounted() {
      new o({ select: this.$refs.showSearchSingle, settings: { showSearch: !1 } }),
        new o({ select: this.$refs.searchTextSingle, settings: { searchText: 'Sorry, nothing to see here' } }),
        new o({
          select: this.$refs.searchPlaceholderSingle,
          settings: { searchPlaceholder: 'Search for the good stuff!' },
        }),
        new o({ select: this.$refs.searchHighlightSingle, settings: { searchHighlight: !0 } }),
        new o({ select: this.$refs.showSearchMulti, settings: { showSearch: !1 } }),
        new o({ select: this.$refs.searchTextMulti, settings: { searchText: 'Sorry nothing to see here' } }),
        new o({
          select: this.$refs.searchPlaceholderMulti,
          settings: { searchPlaceholder: 'Search for the good stuff!' },
        }),
        new o({ select: this.$refs.searchHighlightMulti, settings: { searchHighlight: !0 } })
    },
  }),
  Bs = { id: 'search', class: 'content' },
  Cs = v(
    '<h2 class="header">showSearch / searchText / searchingText / searchHighlight</h2><p><b>showSearch</b> - is a boolean value that will decide whether or not to show the search. Default is true.</p><p><b>searchText</b> - is a string value that will show in the event there are no results. Default is &#39;No Results&#39;. </p><p><b>searchingText</b> - is a string value that will show during an fetch search request. Default is &#39;Searching...&#39;. </p><p><b>searchPlaceholder</b> - is a string value that will set the value of the input search placeholder text. Default is &#39;Search&#39;. </p><p><b>searchHighlight</b> - is a boolean value that will highlight search results. Default is false.</p>',
    6,
  ),
  Ps = { class: 'select-split', style: { padding: '0 0 var(--spacing-half) 0' } },
  Hs = { ref: 'showSearchSingle' },
  Os = e('option', { value: 'dog' }, 'Dog', -1),
  Gs = e('option', { value: 'cat' }, 'Cat', -1),
  js = e('option', { value: 'bird' }, 'Bird', -1),
  Ls = [Os, Gs, js],
  Us = { ref: 'searchTextSingle' },
  As = e('option', { value: 'dog' }, 'Dog', -1),
  qs = e('option', { value: 'cat' }, 'Cat', -1),
  Is = e('option', { value: 'bird' }, 'Bird', -1),
  Ns = [As, qs, Is],
  ks = { ref: 'searchPlaceholderSingle' },
  Rs = e('option', { value: 'dog' }, 'Dog', -1),
  Es = e('option', { value: 'cat' }, 'Cat', -1),
  Ws = e('option', { value: 'bird' }, 'Bird', -1),
  Ys = [Rs, Es, Ws],
  zs = { ref: 'searchHighlightSingle' },
  Fs = e('option', { value: 'dog' }, 'Dog', -1),
  Js = e('option', { value: 'cat' }, 'Cat', -1),
  Ks = e('option', { value: 'bird' }, 'Bird', -1),
  Qs = [Fs, Js, Ks],
  Xs = { class: 'select-split' },
  Zs = { ref: 'showSearchMulti', multiple: '' },
  el = e('option', { value: 'dog' }, 'Dog', -1),
  tl = e('option', { value: 'cat' }, 'Cat', -1),
  ol = e('option', { value: 'bird' }, 'Bird', -1),
  sl = [el, tl, ol],
  ll = { ref: 'searchTextMulti', multiple: '' },
  nl = e('option', { value: 'dog' }, 'Dog', -1),
  al = e('option', { value: 'cat' }, 'Cat', -1),
  il = e('option', { value: 'bird' }, 'Bird', -1),
  cl = [nl, al, il],
  ul = { ref: 'searchPlaceholderMulti', multiple: '' },
  dl = e('option', { value: 'dog' }, 'Dog', -1),
  _l = e('option', { value: 'cat' }, 'Cat', -1),
  hl = e('option', { value: 'bird' }, 'Bird', -1),
  rl = [dl, _l, hl],
  pl = { ref: 'searchHighlightMulti', multiple: '' },
  vl = e('option', { value: 'dog' }, 'Dog', -1),
  $l = e('option', { value: 'cat' }, 'Cat', -1),
  ml = e('option', { value: 'bird' }, 'Bird', -1),
  gl = [vl, $l, ml],
  fl = e(
    'pre',
    null,
    [
      t('      '),
      e(
        'code',
        { class: 'language-javascript' },
        `
        let slim = new SlimSelect({
          select: '#selectElement',
          settings: {
            showSearch: false,
            searchText: 'Sorry nothing to see here',
            searchPlaceholder: 'Search for the good stuff!',
            searchHighlight: true
          }
        })
      `,
      ),
      t(`
    `),
    ],
    -1,
  )
function Sl(s, l, u, d, _, h) {
  return (
    i(),
    c('div', Bs, [
      Cs,
      e('div', Ps, [
        e('select', Hs, Ls, 512),
        e('select', Us, Ns, 512),
        e('select', ks, Ys, 512),
        e('select', zs, Qs, 512),
      ]),
      e('div', Xs, [
        e('select', Zs, sl, 512),
        e('select', ll, cl, 512),
        e('select', ul, rl, 512),
        e('select', pl, gl, 512),
      ]),
      fl,
    ])
  )
}
const wl = a(Ds, [['render', Sl]]),
  yl = n({ name: 'Select' }),
  xl = { class: 'content' },
  Vl = e('h2', { class: 'header' }, 'select', -1),
  bl = e(
    'p',
    null,
    ' The select field is used to identify the select element that will be used to create slim select. You can use any value you normally would in a querySelector or pass the element directly. ',
    -1,
  ),
  Ml = e(
    'pre',
    null,
    [
      t('      '),
      e(
        'code',
        { class: 'language-javascript' },
        `
        new SlimSelect({
          select: '#selectElement',
          // or
          select: document.querySelector('#selectElement')
        })

        // If you already have a currenlty running SlimSelect but lost the reference to it.
        You can access from the original select element.
        let el = document.querySelector('#selectElement')
        el.slim.open() // Or any other options/methods
      `,
      ),
      t(`
    `),
    ],
    -1,
  ),
  Tl = [Vl, bl, Ml]
function Dl(s, l, u, d, _, h) {
  return i(), c('div', xl, Tl)
}
const Bl = a(yl, [['render', Dl]]),
  Cl = n({
    name: 'SelectByGroup',
    mounted() {
      new o({ select: this.$refs.selectByGroup, settings: { selectByGroup: !0 } })
    },
  }),
  Pl = { class: 'content' },
  Hl = e('h2', { class: 'header' }, 'selectByGroup', -1),
  Ol = e(
    'p',
    null,
    " selectByGroup option is used to enable the selection of all options under a specific group by clicking that option group's label. ",
    -1,
  ),
  Gl = { ref: 'selectByGroup', multiple: '' },
  jl = e(
    'optgroup',
    { label: 'Label 1' },
    [
      e('option', { value: 'value1' }, 'Value 1'),
      e('option', { value: 'value2' }, 'Value 2'),
      e('option', { value: 'value3' }, 'Value 3'),
    ],
    -1,
  ),
  Ll = [jl],
  Ul = e(
    'pre',
    null,
    [
      t('      '),
      e(
        'code',
        { class: 'language-javascript' },
        `
        new SlimSelect({
          select: '#selectByGroup',
          settings: {
            selectByGroup: true
          }
        })
      `,
      ),
      t(`
    `),
    ],
    -1,
  )
function Al(s, l, u, d, _, h) {
  return i(), c('div', Pl, [Hl, Ol, e('select', Gl, Ll, 512), Ul])
}
const ql = a(Cl, [['render', Al]]),
  Il = n({
    name: 'ShowTooltip',
    mounted() {
      new o({ select: this.$refs.showOptionTooltips, settings: { showOptionTooltips: !0 } })
    },
  }),
  Nl = { class: 'content' },
  kl = e('h2', { class: 'header' }, 'showOptionTooltips', -1),
  Rl = e(
    'p',
    null,
    ' showOptionTooltips option is used to active displaying the on-hover tooltips for select options. The tooltip text is equal to the option text content. ',
    -1,
  ),
  El = { ref: 'showOptionTooltips' },
  Wl = e('option', { value: 'value1' }, 'Value 1', -1),
  Yl = e('option', { value: 'value2' }, 'Value 2', -1),
  zl = e('option', { value: 'value3' }, 'Value 3', -1),
  Fl = [Wl, Yl, zl],
  Jl = e(
    'pre',
    null,
    [
      t('      '),
      e(
        'code',
        { class: 'language-javascript' },
        `
        new SlimSelect({
          select: '#showOptionTooltips',
          settings: {
            showOptionTooltips: true,
          }
        })
      `,
      ),
      t(`
    `),
    ],
    -1,
  )
function Kl(s, l, u, d, _, h) {
  return i(), c('div', Nl, [kl, Rl, e('select', El, Fl, 512), Jl])
}
const Ql = a(Il, [['render', Kl]]),
  Xl = n({
    name: 'Styles',
    mounted() {
      new o({ select: this.$refs.selectStyle }), new o({ select: this.$refs.optionStyle })
    },
  }),
  Zl = { class: 'content' },
  en = e('h2', { class: 'header' }, 'inline styles', -1),
  tn = e(
    'p',
    null,
    ' Slim select will inherit any styles that were added to the original select element. This includes options as well. ',
    -1,
  ),
  on = { class: 'select-split' },
  sn = { ref: 'selectStyle', style: { color: 'red' } },
  ln = e('option', { value: 'value1' }, 'Value 1', -1),
  nn = e('option', { value: 'value2' }, 'Value 2', -1),
  an = e('option', { value: 'value3' }, 'Value 3', -1),
  cn = [ln, nn, an],
  un = { ref: 'optionStyle' },
  dn = e('option', { style: { color: 'red' }, value: 'value1' }, 'Red', -1),
  _n = e('option', { style: { color: 'green' } }, 'Green', -1),
  hn = e('option', { style: { color: 'blue' } }, 'Blue', -1),
  rn = [dn, _n, hn],
  pn = e(
    'pre',
    null,
    [
      t('      '),
      e(
        'code',
        { class: 'language-html' },
        `
        <select id="select-style" style="color: red;">
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>

        <select id="option-style">
          <option style="color: red;" value="value1">Red</option>
          <option style="color: green;">Green</option>
          <option style="color: blue;">Blue</option>
        </select>
      `,
      ),
      t(`
    `),
    ],
    -1,
  )
function vn(s, l, u, d, _, h) {
  return i(), c('div', Zl, [en, tn, e('div', on, [e('select', sn, cn, 512), e('select', un, rn, 512)]), pn])
}
const $n = a(Xl, [['render', vn]]),
  mn = n({
    name: 'Settings',
    components: {
      Select: Bl,
      ContentLocation: ce,
      Placeholder: Ts,
      Deselect: Bt,
      Display: Ft,
      Mandatory: Jo,
      MinMax: is,
      DataAttributes: it,
      Css: We,
      Styles: $n,
      Html: Co,
      Search: wl,
      CloseOnSelect: Y,
      ContentPosition: Te,
      ShowTooltip: Ql,
      SelectByGroup: ql,
      HideSelected: vo,
    },
  }),
  gn = { id: 'settings', class: 'contents' }
function fn(s, l, u, d, _, h) {
  const $ = r('Select'),
    m = r('ContentLocation'),
    g = r('Placeholder'),
    f = r('Deselect'),
    S = r('Display'),
    w = r('Mandatory'),
    y = r('MinMax'),
    x = r('DataAttributes'),
    V = r('Css'),
    b = r('Styles'),
    M = r('Html'),
    T = r('Search'),
    D = r('CloseOnSelect'),
    B = r('ContentPosition'),
    C = r('ShowTooltip'),
    P = r('SelectByGroup'),
    H = r('HideSelected')
  return (
    i(),
    c('div', gn, [p($), p(m), p(g), p(f), p(S), p(w), p(y), p(x), p(V), p(b), p(M), p(T), p(D), p(B), p(C), p(P), p(H)])
  )
}
const wn = a(mn, [['render', fn]])
export { wn as default }
