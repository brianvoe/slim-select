<script>
  import SlimSelect from 'slim-select/index.ts'

  export default {
    data () {
      return {
        beforeOnChangeSingle: null,
        beforeOnChangeMultiple: null,
        onChangeSingle: null,
        onChangeMultiple: null
      }
    },
    mounted () {
      /* eslint-disable no-new */
      new SlimSelect({
        select: '#search',
        showSearch: false
      })

      new SlimSelect({
        select: '#placeholder',
        placeholder: 'Placeholder Text Here'
      })

      new SlimSelect({
        select: '#beforeOnChangeSingle',
        beforeOnChange: (value) => {
          this.beforeOnChangeSingle = value
        }
      })

      new SlimSelect({
        select: '#beforeOnChangeMultiple',
        beforeOnChange: (value) => {
          this.beforeOnChangeMultiple = value
        }
      })

      new SlimSelect({
        select: '#onChangeSingle',
        onChange: (value) => {
          this.onChangeSingle = value
        }
      })

      new SlimSelect({
        select: '#onChangeMultiple',
        onChange: (value) => {
          this.onChangeMultiple = value
        }
      })
    }
  }
</script>

<template>
  <div id="events-content">
    <h2>select</h2>
    <p>
      The select option is used to identify the select element that will be used to
      create slim select. You can any value you normally would in a querySelector.
    </p>

    <pre v-highlightjs><code class="javascript">
    new SlimSelect({
      select: '.element .you #want'
    })
    </code></pre>

    <br /><br /><br />

    <h2>placeholder</h2>
    <p>
      In order to show a placeholder you can
      Default is "Select Value".
    </p>

    <select id="placeholder" multiple="">
      <option value="value1">Value 1</option>
      <option value="value2">Value 2</option>
      <option value="value3">Value 3</option>
    </select>

    <h4></h4>
    <pre v-highlightjs><code class="javascript">
    // Single
    new SlimSelect({
      select: '#placeholder',
      placeholder: 'Placeholder Text Here'
    })

    // Multiple
    new SlimSelect({
      select: '#placeholder',
      placeholder: 'Placeholder Text Here'
    })
    </code></pre>

    <br /><br /><br />

    <h2>showSearch</h2>
    <p>
      Boolean value that will decide whether or not to show the search.
      Default is true.
    </p>

    <select id="search">
      <option value="value1">Value 1</option>
      <option value="value2">Value 2</option>
      <option value="value3">Value 3</option>
    </select>

    <pre v-highlightjs><code class="javascript">
    new SlimSelect({
      select: '#search',
      showSearch: false
    })
    </code></pre>

    <br /><br /><br />

    <h2>beforeOnChange</h2>
    <p>
      beforeOnChange will trigger a callback on an option click and will allow
      you the ability to halt if the value it produces isnt to your liking.
      In order to stop propagation just return false on the callback.
      Returning nothing or true will allow it to continue as normal.
    </p>
    <br />

    <div v-if="beforeOnChangeSingle"><strong>Before on change: {{beforeOnChangeSingle}}</strong></div>

    <select id="beforeOnChangeSingle">
      <option value="value1">Value 1</option>
      <option value="value2">Value 2</option>
      <option value="value3">Value 3</option>
    </select>
    <br /><br />

    <div v-if="beforeOnChangeMultiple"><strong>Before on change: {{beforeOnChangeMultiple}}</strong></div>

    <select id="beforeOnChangeMultiple" multiple>
      <option value="value1" selected>Value 1</option>
      <option value="value2">Value 2</option>
      <option value="value3">Value 3</option>
    </select>

    <pre v-highlightjs><code class="javascript">
    new SlimSelect({
      select: '#beforeOnChange',
      beforeOnChange: (info) => {
        console.log(info)
        return false // this will stop propagation
      }
    })
    </code></pre>

    <br /><br /><br />

    <h2>onChange</h2>
    <p>
      onChange will trigger a callback after the value of the select dropdown has changed.
    </p>
    <br />

    <div v-if="onChangeSingle"><strong>On change: {{onChangeSingle}}</strong></div>

    <select id="onChangeSingle">
      <option value="value1">Value 1</option>
      <option value="value2">Value 2</option>
      <option value="value3">Value 3</option>
    </select>
    <br /><br />

    <div v-if="onChangeMultiple"><strong>On change: {{onChangeMultiple}}</strong></div>

    <select id="onChangeMultiple" multiple>
      <option value="value1" selected>Value 1</option>
      <option value="value2">Value 2</option>
      <option value="value3">Value 3</option>
    </select>

    <pre v-highlightjs><code class="javascript">
    new SlimSelect({
      select: '#onChange',
      onChange: (info) => {
        console.log(info)
      }
    })
    </code></pre>
  </div>
</template>
