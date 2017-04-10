<script>
  import SlimSelect from 'slim-select/index.ts'

  export default {
    data () {
      return {
        states: [
          {abv: 'AL', state: 'Alabama'},
          {abv: 'AK', state: 'Alaska'},
          {abv: 'AZ', state: 'Arizona'},
          {abv: 'AR', state: 'Arkansas'},
          {abv: 'CA', state: 'California'},
          {abv: 'CO', state: 'Colorado'},
          {abv: 'CT', state: 'Connecticut'},
          {abv: 'DE', state: 'Delaware'},
          {abv: 'DC', state: 'District Of Columbia'},
          {abv: 'FL', state: 'Florida'},
          {abv: 'GA', state: 'Georgia'},
          {abv: 'HI', state: 'Hawaii'},
          {abv: 'ID', state: 'Idaho'},
          {abv: 'IL', state: 'Illinois', selected: true},
          {abv: 'IN', state: 'Indiana'},
          {abv: 'IA', state: 'Iowa'},
          {abv: 'KS', state: 'Kansas'},
          {abv: 'KY', state: 'Kentucky'},
          {abv: 'LA', state: 'Louisiana'},
          {abv: 'ME', state: 'Maine'},
          {abv: 'MD', state: 'Maryland'},
          {abv: 'MA', state: 'Massachusetts'},
          {abv: 'MI', state: 'Michigan'},
          {abv: 'MN', state: 'Minnesota'},
          {abv: 'MS', state: 'Mississippi'},
          {abv: 'MO', state: 'Missouri'},
          {abv: 'MT', state: 'Montana'},
          {abv: 'NE', state: 'Nebraska'},
          {abv: 'NV', state: 'Nevada'},
          {abv: 'NH', state: 'New Hampshire'},
          {abv: 'NJ', state: 'New Jersey'},
          {abv: 'NM', state: 'New Mexico'},
          {abv: 'NY', state: 'New York'},
          {abv: 'NC', state: 'North Carolina'},
          {abv: 'ND', state: 'North Dakota'},
          {abv: 'OH', state: 'Ohio'},
          {abv: 'OK', state: 'Oklahoma'},
          {abv: 'OR', state: 'Oregon'},
          {abv: 'PA', state: 'Pennsylvania'},
          {abv: 'RI', state: 'Rhode Island'},
          {abv: 'SC', state: 'South Carolina'},
          {abv: 'SD', state: 'South Dakota'},
          {abv: 'TN', state: 'Tennessee'},
          {abv: 'TX', state: 'Texas'},
          {abv: 'UT', state: 'Utah'},
          {abv: 'VT', state: 'Vermont'},
          {abv: 'VA', state: 'Virginia'},
          {abv: 'WA', state: 'Washington'},
          {abv: 'WV', state: 'West Virginia'},
          {abv: 'WI', state: 'Wisconsin'},
          {abv: 'WY', state: 'Wyoming'}
        ]
      }
    },
    mounted () {
      /* eslint-disable no-new */
      new SlimSelect({
        select: '#single'
      })

      new SlimSelect({
        select: '#multiple'
      })

      new SlimSelect({
        select: '#group'
      })
    }
  }
</script>

<template>
  <div id="simple-content">
    <h2>Single</h2>
    <p>
      Basic single select usage with Slim Select is extremely easy.
      Just set the select value to your select element.
    </p>
    <select id="single">
      <option v-for="value in states" :value="value.abv" :selected="value.selected">{{value.state}}</option>
    </select>

    <pre v-highlightjs><code class="javascript">
    new SlimSelect({
      select: '#simple-select'
    })
    </code></pre>

    <pre v-highlightjs><code class="html">
    &lt;select id="simple-select"&gt;
      &lt;option value="value 1"&gt;Value 1&lt;/option&gt;
      &lt;option value="value 2"&gt;Value 2&lt;/option&gt;
      &lt;option value="value 3"&gt;Value 3&lt;/option&gt;
    &lt;/select&gt;
    </code></pre>

    <br /><br />

    <h2>Multiple</h2>
    <p>
      Multi selects work just the same as a single select.
      The only difference is setting the multiple attribute on your select.
    </p>
    <select id="multiple" multiple>
      <option v-for="value in states" :value="value.abv" :selected="value.selected">{{value.state}}</option>
    </select>

    <pre v-highlightjs><code class="javascript">
    new SlimSelect({
      select: '#multiple'
    })
    </code></pre>

    <pre v-highlightjs><code class="html">
    &lt;select id="multiple" multiple&gt;
      &lt;option value="value 1"&gt;Value 1&lt;/option&gt;
      &lt;option value="value 2"&gt;Value 2&lt;/option&gt;
      &lt;option value="value 3"&gt;Value 3&lt;/option&gt;
    &lt;/select&gt;
    </code></pre>

    <br /><br />

    <h2>Group</h2>
    <p>
      Basic single select usage with Slim Select is extremely easy.
      Just set the select value to your select element.
    </p>
    <select id="group">
      <optgroup label="Label 1">
        <option value="value 11">Value 1</option>
        <option value="value 12">Value 2</option>
        <option value="value 13">Value 3</option>
      </optgroup>
      <optgroup label="Label 2">
        <option value="value 21">Value 1</option>
        <option value="value 22">Value 2</option>
        <option value="value 23">Value 3</option>
      </optgroup>
    </select>

    <pre v-highlightjs><code class="javascript">
    new SlimSelect({
      select: '#group'
    })
    </code></pre>

    <pre v-highlightjs><code class="html">
    &lt;select id="group"&gt;
      &lt;optgroup label="Label 1"&gt;
        &lt;option value="value 1"&gt;Value 1&lt;/option&gt;
        &lt;option value="value 2"&gt;Value 2&lt;/option&gt;
        &lt;option value="value 3"&gt;Value 3&lt;/option&gt;
      &lt;/optgroup&gt;
      &lt;optgroup label="Label 2"&gt;
        &lt;option value="value 21"&gt;Value 1&lt;/option&gt;
        &lt;option value="value 22"&gt;Value 2&lt;/option&gt;
        &lt;option value="value 23"&gt;Value 3&lt;/option&gt;
      &lt;/optgroup&gt;
    &lt;/select&gt;
    </code></pre>
  </div>
</template>
