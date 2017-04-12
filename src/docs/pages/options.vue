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
        select: '#showSearch',
        showSearch: false
      })

      new SlimSelect({
        select: '#searchText',
        searchText: 'Sorry nothing to see here'
      })

      new SlimSelect({
        select: '#placeholderSingle',
        placeholder: 'Placeholder Text Here'
      })

      new SlimSelect({
        select: '#placeholderMultiple',
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

<style lang="scss">
  #options-content {
    .set-content {
      display: flex;

      > * {
        flex: 0 1 50%;
        width: 48%;
        margin: 0 5px 0 5px;

        &:first-child { margin: 0 5px 0 0; }
        &:last-child { margin: 0 0 0 5px; }
      }
    }
  }
</style>

<template>
  <div id="options-content">
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
      Placeholders consists of setting the placeholder option value.
      The only difference is single selects require an empty option with data-placeholder set to true.
      Default value is "Select Value".
    </p>

    <div class="set-content">
      <select id="placeholderSingle">
        <option data-placeholder="true"></option>
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
      <select id="placeholderMultiple" multiple>
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
    </div>

    <pre v-highlightjs><code class="javascript">
    new SlimSelect({
      select: '#placeholder',
      placeholder: 'Placeholder Text Here'
    })
    </code></pre>

    <pre v-highlightjs><code class="html">
    &lt;!-- Single Selects require emtpy data-placeholder option --&gt;
    &lt;select id="placeholderSingle"&gt;
      &lt;option data-placeholder="true"&gt;&lt;/option&gt;
      &lt;option value="value1"&gt;Value 1&lt;/option&gt;
      &lt;option value="value2"&gt;Value 2&lt;/option&gt;
      &lt;option value="value3"&gt;Value 3&lt;/option&gt;
    &lt;/select&gt;
    </code></pre>

    <br /><br /><br />

    <h2>showSearch / searchText</h2>
    <p>
      showSearch is a boolean value that will decide whether or not to show the search.
      Default is true.
    </p>
    <p>
      searchText is a string value that will show in the event there are no results.
      Default is 'No Results'.
    </p>

    <div class="set-content">
      <select id="showSearch">
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
      <select id="searchText">
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
    </div>

    <pre v-highlightjs><code class="javascript">
    new SlimSelect({
      select: '#search',
      showSearch: false,
      searchText: 'Sorry couldnt find anything'
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
