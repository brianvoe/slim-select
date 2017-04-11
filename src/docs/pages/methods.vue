<script>
  import SlimSelect from 'slim-select/index.ts'
  import Chance from 'chance'
  let chance = new Chance()

export default {
    data () {
      return {
        setSingle: null,
        setMultiple: null
      }
    },
    mounted () {
      // Set
      this.setSingle = new SlimSelect({
        select: '#setSingle'
      })
      this.setMultiple = new SlimSelect({
        select: '#setMultiple'
      })

      // Set Data
      this.setDataSingle = new SlimSelect({
        select: '#setDataSingle'
      })
      this.setDataMultiple = new SlimSelect({
        select: '#setDataMultiple'
      })

      this.setData()
    },
    methods: {
      setValue () {
        this.setSingle.set('value2')
        this.setMultiple.set(['value2', 'value3'])
      },
      setData () {
        let values = []
        for (var i = 0; i < 10; i++) {
          values.push({
            text: chance.first() + ' ' + chance.last(),
            selected: chance.bool()
          })
        }
        this.setDataSingle.setData(values)
        this.setDataMultiple.setData(values)
      }
    }
  }
</script>

<style lang="scss">
  #methods-content {
    .set-content {
      display: flex;
      > * {
        margin: 0 5px 0 5px;

        &:first-child { margin: 0 5px 0 0; }
        &:last-child { margin: 0 0 0 5px; }
      }
    }
  }
</style>

<template>
  <div id="methods-content">
    <h2>set</h2>
    <p>
      The set method will take a value and update the original select as well
      slim select. The value can either be a string or an array of strings
      depending on if its a single or multi select.
    </p>

    <div class="set-content">
      <div class="btn" @click="setValue">Set value</div>
      <select id="setSingle">
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
      </select>
      <select id="setMultiple" multiple>
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
    </div>
    <pre v-highlightjs><code class="javascript">
    var select = new SlimSelect({
      select: '#select'
    })
    select.set('value')
    // or
    select.set(['value1', 'value2'])
    </code></pre>

    <br /><br /><br />

    <h2>setData</h2>
    <p>
      The setData method can take in an array of objects. This will set the options
      of the original select and rerender slim select.
    </p>

    <div class="set-content">
      <div class="btn" @click="setData">Set Data</div>
      <select id="setDataSingle"></select>
      <select id="setDataMultiple" multiple></select>
    </div>
    <pre v-highlightjs><code class="javascript">
    var select = new SlimSelect({
      select: '#select'
    })

    // Array of objects - Must have at least text value
    select.setData([
      {text: 'value1'},
      {text: 'value2'}
    ])
    </code></pre>

    <pre v-highlightjs><code class="javascript">
    var optgroup = {
      label: 'label', // Required
      options: [] // Required - value is an array of options
    }

    var option = {
      text: 'text', // Required
      value: 'value', // Optional - value will be set by text if not set
      innerHTML: '&lt;b&gt;Html&lt;/b&gt;', // Optional - will be used for dispay purposes if set
      disabled: false // Optional - default if false
    }
    </code></pre>
  </div>
</template>
