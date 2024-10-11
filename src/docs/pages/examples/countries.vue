<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '../../../slim-select'

const countries = [
  {
    text: 'United States',
    value: 'US',
    html: '<span><img src="https://flagcdn.com/us.svg" width="20"/> United States</span>'
  },
  { text: 'Canada', value: 'CA', html: '<span><img src="https://flagcdn.com/ca.svg" width="20"/> Canada</span>' },
  {
    text: 'United Kingdom',
    value: 'UK',
    html: '<span><img src="https://flagcdn.com/gb.svg" width="20"/> United Kingdom</span>'
  },
  { text: 'Germany', value: 'DE', html: '<span><img src="https://flagcdn.com/de.svg" width="20"/> Germany</span>' },
  { text: 'Japan', value: 'JP', html: '<span><img src="https://flagcdn.com/jp.svg" width="20"/> Japan</span>' },
  { text: 'France', value: 'FR', html: '<span><img src="https://flagcdn.com/fr.svg" width="20"/> France</span>' },
  { text: 'Italy', value: 'IT', html: '<span><img src="https://flagcdn.com/it.svg" width="20"/> Italy</span>' },
  { text: 'Australia', value: 'AU', html: '<span><img src="https://flagcdn.com/au.svg" width="20"/> Australia</span>' },
  { text: 'Brazil', value: 'BR', html: '<span><img src="https://flagcdn.com/br.svg" width="20"/> Brazil</span>' },
  { text: 'India', value: 'IN', html: '<span><img src="https://flagcdn.com/in.svg" width="20"/> India</span>' },
  { text: 'Mexico', value: 'MX', html: '<span><img src="https://flagcdn.com/mx.svg" width="20"/> Mexico</span>' },
  { text: 'Russia', value: 'RU', html: '<span><img src="https://flagcdn.com/ru.svg" width="20"/> Russia</span>' },
  { text: 'China', value: 'CN', html: '<span><img src="https://flagcdn.com/cn.svg" width="20"/> China</span>' },
  {
    text: 'South Korea',
    value: 'KR',
    html: '<span><img src="https://flagcdn.com/kr.svg" width="20"/> South Korea</span>'
  },
  {
    text: 'South Africa',
    value: 'ZA',
    html: '<span><img src="https://flagcdn.com/za.svg" width="20"/> South Africa</span>'
  },
  { text: 'Argentina', value: 'AR', html: '<span><img src="https://flagcdn.com/ar.svg" width="20"/> Argentina</span>' },
  { text: 'Colombia', value: 'CO', html: '<span><img src="https://flagcdn.com/co.svg" width="20"/> Colombia</span>' },
  { text: 'Chile', value: 'CL', html: '<span><img src="https://flagcdn.com/cl.svg" width="20"/> Chile</span>' },
  { text: 'Spain', value: 'ES', html: '<span><img src="https://flagcdn.com/es.svg" width="20"/> Spain</span>' },
  {
    text: 'Netherlands',
    value: 'NL',
    html: '<span><img src="https://flagcdn.com/nl.svg" width="20"/> Netherlands</span>'
  },
  { text: 'Sweden', value: 'SE', html: '<span><img src="https://flagcdn.com/se.svg" width="20"/> Sweden</span>' },
  {
    text: 'Switzerland',
    value: 'CH',
    html: '<span><img src="https://flagcdn.com/ch.svg" width="20"/> Switzerland</span>'
  },
  { text: 'Norway', value: 'NO', html: '<span><img src="https://flagcdn.com/no.svg" width="20"/> Norway</span>' },
  { text: 'Denmark', value: 'DK', html: '<span><img src="https://flagcdn.com/dk.svg" width="20"/> Denmark</span>' },
  { text: 'Finland', value: 'FI', html: '<span><img src="https://flagcdn.com/fi.svg" width="20"/> Finland</span>' },
  { text: 'Belgium', value: 'BE', html: '<span><img src="https://flagcdn.com/be.svg" width="20"/> Belgium</span>' },
  { text: 'Portugal', value: 'PT', html: '<span><img src="https://flagcdn.com/pt.svg" width="20"/> Portugal</span>' },
  { text: 'Greece', value: 'GR', html: '<span><img src="https://flagcdn.com/gr.svg" width="20"/> Greece</span>' },
  { text: 'Poland', value: 'PL', html: '<span><img src="https://flagcdn.com/pl.svg" width="20"/> Poland</span>' },
  { text: 'Turkey', value: 'TR', html: '<span><img src="https://flagcdn.com/tr.svg" width="20"/> Turkey</span>' },
  {
    text: 'Saudi Arabia',
    value: 'SA',
    html: '<span><img src="https://flagcdn.com/sa.svg" width="20"/> Saudi Arabia</span>'
  },
  { text: 'Israel', value: 'IL', html: '<span><img src="https://flagcdn.com/il.svg" width="20"/> Israel</span>' },
  { text: 'Thailand', value: 'TH', html: '<span><img src="https://flagcdn.com/th.svg" width="20"/> Thailand</span>' },
  { text: 'Indonesia', value: 'ID', html: '<span><img src="https://flagcdn.com/id.svg" width="20"/> Indonesia</span>' },
  { text: 'Malaysia', value: 'MY', html: '<span><img src="https://flagcdn.com/my.svg" width="20"/> Malaysia</span>' },
  { text: 'Singapore', value: 'SG', html: '<span><img src="https://flagcdn.com/sg.svg" width="20"/> Singapore</span>' },
  {
    text: 'Philippines',
    value: 'PH',
    html: '<span><img src="https://flagcdn.com/ph.svg" width="20"/> Philippines</span>'
  },
  {
    text: 'New Zealand',
    value: 'NZ',
    html: '<span><img src="https://flagcdn.com/nz.svg" width="20"/> New Zealand</span>'
  },
  { text: 'Egypt', value: 'EG', html: '<span><img src="https://flagcdn.com/eg.svg" width="20"/> Egypt</span>' },
  { text: 'Vietnam', value: 'VN', html: '<span><img src="https://flagcdn.com/vn.svg" width="20"/> Vietnam</span>' },
  { text: 'Peru', value: 'PE', html: '<span><img src="https://flagcdn.com/pe.svg" width="20"/> Peru</span>' },
  { text: 'Pakistan', value: 'PK', html: '<span><img src="https://flagcdn.com/pk.svg" width="20"/> Pakistan</span>' },
  {
    text: 'Bangladesh',
    value: 'BD',
    html: '<span><img src="https://flagcdn.com/bd.svg" width="20"/> Bangladesh</span>'
  },
  { text: 'Nigeria', value: 'NG', html: '<span><img src="https://flagcdn.com/ng.svg" width="20"/> Nigeria</span>' },
  { text: 'Kenya', value: 'KE', html: '<span><img src="https://flagcdn.com/ke.svg" width="20"/> Kenya</span>' },
  { text: 'Morocco', value: 'MA', html: '<span><img src="https://flagcdn.com/ma.svg" width="20"/> Morocco</span>' },
  { text: 'Algeria', value: 'DZ', html: '<span><img src="https://flagcdn.com/dz.svg" width="20"/> Algeria</span>' },
  { text: 'Ukraine', value: 'UA', html: '<span><img src="https://flagcdn.com/ua.svg" width="20"/> Ukraine</span>' },
  { text: 'Venezuela', value: 'VE', html: '<span><img src="https://flagcdn.com/ve.svg" width="20"/> Venezuela</span>' }
]

export default defineComponent({
  name: 'Countries',
  data() {
    return {
      countrySelect: null as SlimSelect | null
    }
  },
  mounted() {
    this.countrySelect = new SlimSelect({
      select: this.$refs.countrySelect as HTMLSelectElement,
      data: countries
    })
  }
})
</script>

<template>
  <div id="countries" class="content">
    <h2 class="header">Countries Example</h2>
    <p>Showcasing the use of html field for displaying</p>
    <div class="alert info">
      If you are are having issues with slim select finding the select element. Try delaying new SlimSelect() call as
      the select dom element might not be available yet.
    </div>

    <div class="row">
      <select ref="countrySelect"></select>
    </div>

    <pre>
      <code class="language-javascript">
        const countries = [
          { 
            text: 'United States',
            value: 'US', 
            html: '&lt;span&gt;&lt;img src="https://flagcdn.com/us.svg" width="20"/&gt; United States&lt;/span&gt;'
          },
          { 
            text: 'Canada', 
            value: 'CA', 
            html: '&lt;span&gt;&lt;img src="https://flagcdn.com/ca.svg" width="20"/&gt; Canada&lt;/span&gt;' 
          },
          { 
            text: 'United Kingdom', 
            value: 'UK', 
            html: '&lt;span&gt;&lt;img src="https://flagcdn.com/gb.svg" width="20"/&gt; United Kingdom&lt;/span&gt;' 
          }
          // etc...  
        ]
        var select = new SlimSelect({
          select: '#selectElement',
          data: countries
        })
      </code>
    </pre>
  </div>
</template>
