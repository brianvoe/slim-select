<script>
  import SlimSelect from 'slim-select/index.ts'
  import Chance from 'chance'
  let chance = new Chance()

export default {
    data () {
      return {
        setSingle: null,
        setMultiple: null,
        setDataSingle: null,
        setDataMultiple: null,
        setSearchSingle: null,
        setSearchMultiple: null,
        setEnableSingle: null,
        setEnableMultiple: null,
        setOpenCloseSingle: null,
        setOpenCloseMultiple: null,
        setDestroySingle: null,
        setDestroyMultiple: null
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

      // Search
      this.setSearchSingle = new SlimSelect({
        select: '#setSearchSingle'
      })
      this.setSearchMultiple = new SlimSelect({
        select: '#setSearchMultiple'
      })

      // Enable / Disable
      this.setEnableSingle = new SlimSelect({
        select: '#setEnableSingle'
      })
      this.setEnableSingle.disable()
      this.setEnableMultiple = new SlimSelect({
        select: '#setEnableMultiple'
      })
      this.setEnableMultiple.disable()

      // Open / Close
      this.setOpenCloseSingle = new SlimSelect({
        select: '#setOpenCloseSingle'
      })
      this.setOpenCloseMultiple = new SlimSelect({
        select: '#setOpenCloseMultiple'
      })

      // Destroy
      this.setDestroySingle = new SlimSelect({
        select: '#setDestroySingle'
      })
      this.setDestroyMultiple = new SlimSelect({
        select: '#setDestroyMultiple'
      })
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
      },
      setSearch (e) {
        setTimeout(() => {
          this.setSearchSingle.open()
          this.setSearchSingle.search('value 2')
          this.setSearchMultiple.open()
          this.setSearchMultiple.search('value 2')
        }, 100)
      },
      setEnable () {
        this.setEnableSingle.enable()
        this.setEnableMultiple.enable()
      },
      setDisable () {
        this.setEnableSingle.disable()
        this.setEnableMultiple.disable()
      },
      setOpenClose () {
        if (!this.setOpenCloseSingle.data.contentOpen) {
          setTimeout(() => {
            this.setOpenCloseSingle.open()
            this.setOpenCloseMultiple.open()
          }, 100)
        }
      },
      setDestroy () {
        this.setDestroySingle.destroy()
        this.setDestroyMultiple.destroy()
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
      <div class="btn" @click="setValue">Set Value</div>
      <select id="setSingle">
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
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

    <h4>Data Types</h4>
    <pre v-highlightjs><code class="javascript">
    var optgroup = {
      label: 'label', // Required
      options: [] // Required - value is an array of options
    }

    var option = {
      text: 'text', // Required
      value: 'value', // Optional - value will be set by text if not set
      innerHTML: '&lt;b&gt;Html&lt;/b&gt;', // Optional - will be used for dispay purposes if set
      disabled: false, // Optional - default is false
      placeholder: false // Optional - default is false
    }
    </code></pre>

    <br /><br /><br />

    <h2>search</h2>
    <p>
      The search method will update the search input field and search the data with the given value.
    </p>

    <div class="set-content">
      <div class="btn" @click="setSearch">Set Search</div>
      <select id="setSearchSingle">
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
      <select id="setSearchMultiple" multiple>
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
    </div>
    <pre v-highlightjs><code class="javascript">
    var select = new SlimSelect({
      select: '#select'
    })
    select.search('value')
    </code></pre>

    <br /><br /><br />

    <h2>disable / enable</h2>
    <p>
      These methods will enable or disable the select dropdown.
      <br />
      You may also set disabled on your original select and slim-select will pick that up.
    </p>

    <div class="set-content">
      <div class="btn" @click="setEnable" v-if="setEnableSingle && !setEnableSingle.config.isEnabled">Enable</div>
      <div class="btn" @click="setDisable" v-else>Disable</div>

      <select id="setEnableSingle">
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
      <select id="setEnableMultiple" multiple>
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
    </div>
    <pre v-highlightjs><code class="javascript">
    var select = new SlimSelect({
      select: '#select'
    })
    select.enable()
    // or
    select.disable()
    </code></pre>

    <br /><br /><br />

    <h2>open / close</h2>
    <p>
      The open/close methods will do just that.
    </p>

    <div class="set-content">
      <div class="btn" @click="setOpenClose">Open/Close</div>
      <select id="setOpenCloseSingle">
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
      <select id="setOpenCloseMultiple" multiple>
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
    </div>
    <pre v-highlightjs><code class="javascript">
    var select = new SlimSelect({
      select: '#select'
    })
    select.open()
    // or
    select.close()
    </code></pre>

    <br /><br /><br />

    <h2>destroy</h2>
    <p>
      The destroy method will remove slim-select and display your original select.
    </p>

    <div class="set-content">
      <div class="btn" @click="setDestroy">Destroy</div>
      <select id="setDestroySingle">
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
      <select id="setDestroyMultiple" multiple>
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
    </div>
    <pre v-highlightjs><code class="javascript">
    var select = new SlimSelect({
      select: '#select'
    })
    select.destroy()
    </code></pre>
  </div>
</template>
