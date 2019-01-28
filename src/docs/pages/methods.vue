<script lang="ts">
import Vue from 'vue'
import SlimSelect from '@/slim-select'
import Chance from 'chance'
const chance = new Chance()

export default Vue.extend({
  data() {
    return {
      selectedSingle: null as any,
      selectedSingleValue: '',
      selectedMultiple: null as any,
      selectedMultipleValue: '',
      setSingle: null as any,
      setMultiple: null as any,
      setDataSingle: null as any,
      setDataMultiple: null as any,
      setSearchSingle: null as any,
      setSearchMultiple: null as any,
      setSearchTextSingle: null as any,
      setEnableSingle: null as any,
      setEnableMultiple: null as any,
      setOpenCloseSingle: null as any,
      setOpenCloseMultiple: null as any,
      setDestroySingle: null as any,
      setDestroyMultiple: null as any
    }
  },
  mounted() {
    // Selected
    this.selectedSingle = new SlimSelect({
      select: '#selectedSingle'
    })
    this.selectedMultiple = new SlimSelect({
      select: '#selectedMultiple'
    })

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

    // setSearchText
    this.setSearchTextSingle = new SlimSelect({
      select: '#setSearchTextSingle'
    })
    this.setSearchTextSingle.setSearchText('Sorry No Results Here!!!')

    // Enable / Disable
    this.setEnableSingle = new SlimSelect({
      select: '#setEnableSingle'
    })
    this.setEnableMultiple = new SlimSelect({
      select: '#setEnableMultiple'
    })

    // Open / Close
    this.setOpenCloseSingle = new SlimSelect({
      select: '#setOpenCloseSingle'
      // Optional callbacks
      // beforeOpen() { console.log('beforeOpen') },
      // afterOpen() { console.log('afterOpen') },
      // beforeClose() { console.log('beforeClose') },
      // afterClose() { console.log('afterClose') }
    })
    this.setOpenCloseMultiple = new SlimSelect({
      select: '#setOpenCloseMultiple'
      // Optional callbacks
      // beforeOpen() { console.log('beforeOpen') },
      // afterOpen() { console.log('afterOpen') },
      // beforeClose() { console.log('beforeClose') },
      // afterClose() { console.log('afterClose') }
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
    getSelected() {
      this.selectedSingleValue = this.selectedSingle.selected()
      this.selectedMultipleValue = this.selectedMultiple.selected()
    },
    setValue() {
      this.setSingle.set('value2')
      this.setMultiple.set(['value2', 'value3'])
    },
    setData() {
      const values = []
      for (let i = 0; i < 10; i++) {
        values.push({
          text: chance.first() + ' ' + chance.last(),
          selected: chance.bool()
        })
      }
      this.setDataSingle.setData(values)
      this.setDataMultiple.setData(values)
    },
    setSearch() {
      setTimeout(() => {
        this.setSearchSingle.open()
        this.setSearchSingle.search('value 2')
        this.setSearchMultiple.open()
        this.setSearchMultiple.search('value 2')
      }, 100)
    },
    setEnable() {
      this.setEnableSingle.enable()
      this.setEnableMultiple.enable()
    },
    setDisable() {
      this.setEnableSingle.disable()
      this.setEnableMultiple.disable()
    },
    setOpenClose() {
      if (!this.setOpenCloseSingle.data.contentOpen) {
        this.setOpenCloseSingle.open()
        this.setOpenCloseMultiple.open()
      }
    },
    setCreate() {
      this.setDestroySingle = new SlimSelect({
        select: '#setDestroySingle'
      })

      this.setDestroyMultiple = new SlimSelect({
        select: '#setDestroyMultiple'
      })
    },
    setDestroy() {
      this.setDestroySingle.destroy()
      this.setDestroyMultiple.destroy()

    }
  }
})
</script>

<style lang="scss">
  #methods-content {
    .set-content {
      display: flex;

      > * {
        margin: 0 5px 0 0;

        &:last-child { margin: 0 0 0 5px; }
      }
    }
  }
</style>

<template>
  <div id="methods-content">
    <div class="content selectedSelects">
      <h2 class="header">selected</h2>
      <p>
        The selected method will return a string or array of the currently selected values
      </p>

      <div class="set-content">
        <div class="btn" @click="getSelected">Get Selected</div>
        <select id="selectedSingle">
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
        <select id="selectedMultiple" multiple>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      </div>
      <div v-if="selectedSingleValue !== ''" style="padding: 8px 0 8px 0;">
        <div><b>Single Select Value:</b> {{selectedSingleValue}}</div>
        <div><b>Multi Select Value:</b> {{selectedMultipleValue}}</div>
      </div>
      <pre>
        <code class="language-javascript">
          var select = new SlimSelect({
            select: '#select'
          })
          select.selected() // Will return a string or an array of string values
        </code>
      </pre>
    </div>

    <div class="content">
      <h2 class="header">set</h2>
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
      <pre>
        <code class="language-javascript">
          var select = new SlimSelect({
            select: '#select'
          })
          select.set('value')
          // or
          select.set(['value1', 'value2'])
        </code>
      </pre>
    </div>

    <div class="content">
      <h2 class="header">setData</h2>
      <p>
        The setData method can take in an array of objects. This will set the options
        of the original select and rerender slim select.
      </p>
      <p>To get a better break down of possible data options see <router-link to="/options">options/data</router-link></p>

      <div class="set-content">
        <div class="btn" @click="setData">Set Data</div>
        <select id="setDataSingle"></select>
        <select id="setDataMultiple" multiple></select>
      </div>
      <pre>
        <code class="language-javascript">
          var select = new SlimSelect({
            select: '#select'
          })

          // Array of objects - Must have at least text value
          select.setData([
            {text: 'value1'},
            {text: 'value2'}
          ])
        </code>
      </pre>
    </div>

    <div class="content">
      <h2 class="header">search</h2>
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
      <pre>
        <code class="language-javascript">
          var select = new SlimSelect({
            select: '#select'
          })
          select.search('value')
        </code>
      </pre>
    </div>

    <div class="content">
      <h2 class="header">setSearchText</h2>
      <p>
        The setSearchText method will update the search text value.
      </p>

      <div class="set-content">
        <select id="setSearchTextSingle">
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      </div>
      <pre>
        <code class="language-javascript">
          var select = new SlimSelect({
            select: '#select'
          })
          select.setSearch('Sorry No Results Here!!!')
        </code>
      </pre>
    </div>

    <div class="content">
      <h2 class="header">disable / enable</h2>
      <p>
        These methods will enable or disable the select dropdown.
        <br />
        You may also set disabled on your original select and slim-select will pick that up.
      </p>

      <div class="set-content">
        <div class="btn" @click="setEnable" v-if="setEnableSingle && !setEnableSingle.config.isEnabled">Enable</div>
        <div class="btn" @click="setDisable" v-else>Disable</div>

        <select id="setEnableSingle" disabled>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
        <select id="setEnableMultiple" multiple disabled>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      </div>
      <pre>
        <code class="language-javascript">
          var select = new SlimSelect({
            select: '#select'
          })
          select.enable()
          // or
          select.disable()
        </code>
      </pre>
    </div>

    <div class="content">
      <h2 class="header">open / close</h2>
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
      <pre>
        <code class="language-javascript">
          var select = new SlimSelect({
            select: '#select',

            // Optional callbacks
            beforeOpen: function () { console.log('beforeOpen')},
            afterOpen: function () { console.log('afterOpen')},
            beforeClose: function () { console.log('beforeClose')},
            afterClose: function () { console.log('afterClose')}
          })
          select.open()
          // or
          select.close()
        </code>
      </pre>
    </div>

    <div class="content">
      <h2 class="header">destroy</h2>
      <p>
        The destroy method will remove slim-select and display your original select.
      </p>

      <div class="set-content">
        <div class="btn" @click="setCreate">Create</div>
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
      <pre>
        <code class="language-javascript">
          var select = new SlimSelect({
            select: '#select'
          })
          select.destroy()
        </code>
      </pre>
    </div>
  </div>
</template>
