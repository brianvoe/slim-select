<script lang="ts">
import Vue from 'vue'
import SlimSelect from '@/slim-select'

export default Vue.extend({
  data() {
    return {
      addToBodySingle: null as any,
      addToBodyMultiple: null as any,
      beforeOnChangeSingle: null,
      beforeOnChangeMultiple: null,
      onChangeSingle: null,
      onChangeMultiple: null
    }
  },
  mounted() {
    new SlimSelect({
      select: '#dataSingle',
      data: [
        {text: 'data placeholder', placeholder: true},
        {text: 'Value 2'},
        {text: 'Value 3', value: ''}
      ]
    })

    new SlimSelect({
      select: '#dataMultiple',
      data: [
        {placeholder: true, text: 'data placeholder'},
        {text: 'Human'},
        {
          label: 'Animals',
          options: [
            {text: 'Cat'},
            {text: 'Dog'},
            {text: 'Bird', value: ''}
          ]
        }
      ]
    })

    new SlimSelect({ select: '#optionsSingle' })
    new SlimSelect({ select: '#optionsMultiple' })

    const ajaxSingle = new SlimSelect({
      select: '#ajaxSingle',
      placeholder: 'Search "Graham"',
      searchingText: 'Searching Users...',
      ajax(search: any, callback: any) {
        if (search.length < 3) {
          callback('Need 3 characters')
          return
        }

        fetch('https://jsonplaceholder.typicode.com/users')
          .then((response) => {
            return response.json()
          })
          .then((json) => {
            const data = [] as any
            for (const j of json) {
              data.push({ text: j.name })
            }

            callback(data)
          })
          .catch((error) => {
            callback(false)
          })
      }
    })

    const ajaxMulti = new SlimSelect({
      select: '#ajaxMultiple',
      placeholder: 'Search "Dennis"',
      ajax(search: any, callback: any) {
        fetch('https://jsonplaceholder.typicode.com/users')
          .then((response) => {
            return response.json()
          })
          .then((json) => {
            const data = [] as any
            for (const j of json) {
              data.push({ text: j.name })
            }

            setTimeout(() => {
              ajaxMulti.setSearchText('Sorry No Results.')
              callback(data)
            }, 1000)
          })
          .catch((error) => {
            callback(false)
          })
      }
    })

    const displaySelect = new SlimSelect({
      select: '#selectdisplay'
    })

    const displayData = [
      { value: 'A', text: 'A', display: false },
      { value: 'B', text: 'B' },
      { value: 'C', text: 'C' }
    ]

    displaySelect.setData(displayData)
    displaySelect.set(['A', 'C'])

    new SlimSelect({
      select: '#selectdisplay2'
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
      select: '#allowDeselect',
      allowDeselect: true
    })

    new SlimSelect({
      select: '#allowDeselectOption',
      allowDeselectOption: true
    })

    new SlimSelect({
      select: '#allowDeselectOptionMultiple',
      allowDeselectOption: true
    })


    new SlimSelect({
      select: '#deselectLabel',
      allowDeselect: true,
      deselectLabel: '<span class="red">✖</span>'
    })

    new SlimSelect({
      select: '#addableSingle',
      addable: (value: string) => {
        return value
      }
    })

    new SlimSelect({
      select: '#addableMultiple',
      addable: (value: string) => {
        return {
          text: value,
          value: value.toLowerCase()
        }
      }
    })

    const mandatorySelect = new SlimSelect({
      select: '#selectMultiMandatory'
    })

    const mandatoryData = [
      { value: 'A', text: 'A', mandatory: true },
      { value: 'B', text: 'B' },
      { value: 'C', text: 'C' }
    ]

    mandatorySelect.setData(mandatoryData)
    mandatorySelect.set(['A', 'C'])

    new SlimSelect({
      select: '#selectMultiMandatory2'
    })

    new SlimSelect({
      select: '#selectMultiLimit',
      limit: 2
    })

    new SlimSelect({ select: '#select-class' })
    new SlimSelect({ select: '#option-class' })

    new SlimSelect({ select: '#select-style' })
    new SlimSelect({ select: '#option-style' })

    new SlimSelect({
      select: '#selectInnerHTMLSingle',
      searchHighlight: true,
      data: [
        {
          innerHTML: '<b>Bold Text</b>',
          text: 'Bold Text',
          value: 'bold text'
        },
        {
          innerHTML: '<i>Slim Select you are awesome</i>',
          text: 'Slim Select awesome'
        },
        {
          innerHTML: '<div style="border: solid 1px #666666;">Border</div>',
          text: 'Border',
          value: 'border'
        }
      ]
    })

    new SlimSelect({
      select: '#selectInnerHTMLMulti',
      data: [
        {
          innerHTML: '<b>Bold Text</b>',
          text: 'Bold Text',
          value: 'bold text'
        },
        {
          innerHTML: '<i>Slim Select you are awesome</i>',
          text: 'Slim Select awesome'
        },
        {
          innerHTML: '<div style="border: solid 1px #666666;">Border</div>',
          text: 'Border',
          value: 'border'
        }
      ]
    })

    new SlimSelect({
      select: '#selectInnerHTMLSingleText',
      valuesUseText: true,
      data: [
        {
          innerHTML: '<b>Bold Text</b>',
          text: 'Bold Text',
          value: 'bold text'
        },
        {
          innerHTML: '<i>Slim Select you are awesome</i>',
          text: 'Slim Select awesome'
        },
        {
          innerHTML: '<div style="border: solid 1px #666666;">Border</div>',
          text: 'Border',
          value: 'border'
        }
      ]
    })

    new SlimSelect({
      select: '#selectInnerHTMLMultiText',
      valuesUseText: true,
      data: [
        {
          innerHTML: '<b>Bold Text</b>',
          text: 'Bold Text',
          value: 'bold text'
        },
        {
          innerHTML: '<i>Slim Select you are awesome</i>',
          text: 'Slim Select awesome'
        },
        {
          innerHTML: '<div style="border: solid 1px #666666;">Border</div>',
          text: 'Border',
          value: 'border'
        }
      ]
    })

    new SlimSelect({ select: '#showSearchSingle', showSearch: false })
    new SlimSelect({
      select: '#searchTextSingle', searchText: 'Sorry nothing to see here',
      beforeOpen: () => {console.log('beforeOpen')}, beforeClose: () => {console.log('beforeClose')},
      afterOpen: () => {console.log('afterOpen')}, afterClose: () => {console.log('afterClose')}
    })
    new SlimSelect({ select: '#searchPlaceholderSingle', searchPlaceholder: 'Search for the good stuff!' })
    new SlimSelect({ select: '#searchFocusSingle', searchFocus: false })
    new SlimSelect({ select: '#searchHighlightSingle', searchHighlight: true })
    new SlimSelect({ select: '#showSearchMulti', showSearch: false })
    new SlimSelect({ select: '#searchTextMulti', searchText: 'Sorry nothing to see here'})
    new SlimSelect({ select: '#searchPlaceholderMulti', searchPlaceholder: 'Search for the good stuff!' })
    new SlimSelect({ select: '#searchFocusMulti', searchFocus: false })
    new SlimSelect({ select: '#searchHighlightMulti', searchHighlight: true })

    new SlimSelect({
      select: '#closeOnSelectSingle',
      closeOnSelect: false
    })

    new SlimSelect({
      select: '#closeOnSelectMultiple',
      closeOnSelect: false,
      selectByGroup: true
    })

    new SlimSelect({
      select: '#showContentUp',
      showContent: 'up'
    })

    this.addToBodySingle = new SlimSelect({
      select: '#addToBodySingle',
      addToBody: true
    })

    this.addToBodyMultiple = new SlimSelect({
      select: '#addToBodyMultiple',
      addToBody: true,
      selectByGroup: true
    })

    new SlimSelect({
      select: '#showContentDown',
      showContent: 'down'
    })

    new SlimSelect({
      select: '#beforeOnChangeSingle',
      beforeOnChange: (value: any) => {
        this.beforeOnChangeSingle = value
      }
    })

    new SlimSelect({
      select: '#beforeOnChangeMultiple',
      beforeOnChange: (values: any) => {
        this.beforeOnChangeMultiple = values
      }
    })

    new SlimSelect({
      select: '#onChangeSingle',
      onChange: (value: any) => {
        this.onChangeSingle = value
      }
    })

    new SlimSelect({
      select: '#onChangeMultiple',
      onChange: (value: any) => {
        this.onChangeMultiple = value
      }
    })

    new SlimSelect({
      select: '#showOptionTooltips',
      showOptionTooltips: true
    })

    new SlimSelect({
      select: '#selectByGroup',
      selectByGroup: true
    })

    new SlimSelect({
      select: '#searchFilter',
      searchFilter: (option: any, search: any) => option.text.substr(0, search.length) === search
    })

    new SlimSelect({
      select: '#hideSelectedOption',
      hideSelectedOption: true
    })

    new SlimSelect({
      select: '#hideSelectedOptionMultiple',
      hideSelectedOption: true
    })
  },
  beforeDestroy() {
    this.addToBodySingle.destroy()
    this.addToBodyMultiple.destroy()
  }
})
</script>

<style lang="scss">
#options-content {
  .set-content {
    display: flex;

    > * {
      flex: 0 1 50%;
      width: 48%;
      margin: 0 5px 0 0;

      &:last-child {
        margin: 0 0 0 0;
      }
    }
  }

  .deselectLabel {
    .red { color: red; }
  }

  .select-class {
    .ss-single-selected {
      background-color: #5897fb;
      color: white;
      border: none;

      .ss-arrow * {
        border-color: white;
      }
    }
  }

  .ss-option {
    &.red { color: white; background-color: red; }
    &.green { color: white; background-color: green; }
    &.blue { color: white; background-color: blue; }
  }
}
</style>

<template>
  <div id="options-content">
    <div class="content">
      <h2 class="header">select</h2>
      <p>
        The select option is used to identify the select element that will be used to
        create slim select. You can any value you normally would in a querySelector
        or pass the element directly.
      </p>

      <pre>
        <code class="language-javascript">
          new SlimSelect({
            select: '.element .you #want',
            // or
            select: document.querySelector('.element .you #want')
          })

          // If you already have a created slim select you can select your div
          // and continue to use slim select off of the element using the .slim data value
          let el = document.querySelector('.element .you #want')
          el.slim.open() // Or any other options/methods
        </code>
      </pre>
    </div>

    <div class="content">
      <h2 class="header">data</h2>
      <p>Data is a value that can be set to initialize options in the select dropdown</p>

      <div class="set-content">
        <select id="dataSingle"></select>
        <select id="dataMultiple" multiple></select>
      </div>

      <pre>
        <code class="language-javascript">
          new SlimSelect({
            select: '.element .you #want',
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
        </code>
      </pre>

      <h4>Data Types</h4>
      <pre>
        <code class="language-javascript">
          var optgroup = {
            label: 'label', // Required
            options: [] // Required - value is an array of options
          }

          var option = {
            text: 'text', // Required
            value: 'value', // Optional - value will be set by text if not set
            innerHTML: '&lt;b&gt;Html&lt;/b&gt;', // Optional - will be used for display purposes if set
            selected: false, // Optional - default is false
            disabled: false, // Optional - default is false
            placeholder: false, // Optional - default is false
            class: '', // Optional - default is not set
            css: '', // Optional - default is not set
            data: {} // Optional - If you have data attributes
          }
        </code>
      </pre>
    </div>

    <div class="content">
      <h2 class="header">options</h2>
      <p>
        Slim select will take on attributes of the original as best as possible.
        Below are example usages of attributes added to the underlining select options that slim select picked up and used
      </p>

      <div class="set-content">
        <select id="optionsSingle">
          <option data-placeholder="true"></option>
          <option value="value1" data-info="Here is info">Data Attributes</option>
          <option value="value2" disabled>Disabled Option</option>
          <option value="value3" class="green">Class Green</option>
          <option value="value3" style="color: purple;">Inline Style</option>
        </select>
        <select id="optionsMultiple" multiple>
          <option value="value1" data-info="Here is info">Data Attributes</option>
          <option value="value2" disabled>Disabled Option</option>
          <option value="value3" class="green">Class Green</option>
          <option value="value3" style="color: purple;">Inline Style</option>
        </select>
      </div>
    </div>

    <div class="content">
      <h2 class="header">ajax</h2>
      <p>
        Slim select allows you to syncronize result values from your ajax requests.<br />
        Call callback() method with slimselect data, false or string with specific string.<br />
        <br />
        When doing fetch request for each ajax call be sure to debounce your request so you are not getting fetch race conditions.
      </p>

      <div class="set-content">
        <select id="ajaxSingle">
          <option data-placeholder="true"></option>
        </select>
        <select id="ajaxMultiple" multiple></select>
      </div>

      <pre>
        <code class="language-javascript">
          new SlimSelect({
            select: '#ajax',
            searchingText: 'Searching...', // Optional - Will show during ajax request
            ajax: function (search, callback) {
              // Check search value. If you dont like it callback(false) or callback('Message String')
              if (search.length &lt; 3) {
                callback('Need 3 characters')
                return
              }

              // Perform your own ajax request here
              fetch('https://jsonplaceholder.typicode.com/users')
              .then(function (response) {
                return response.json()
              })
              .then(function (json) {
                let data = []
                for (let i = 0; i &lt; json.length; i++) {
                  data.push({text: json[i].name})
                }
                
                // Upon successful fetch send data to callback function.
                // Be sure to send data back in the proper format.
                // Refer to the method setData for examples of proper format.
                callback(data)
              })
              .catch(function(error) {
                // If any erros happened send false back through the callback
                callback(false)
              })
            }
          })
        </code>
      </pre>
    </div>

    <div class="content">
      <h2 class="header">placeholder</h2>
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

      <pre>
        <code class="language-javascript">
          new SlimSelect({
            select: '#placeholder',
            placeholder: 'Placeholder Text Here'
          })
        </code>
      </pre>

      <pre>
        <code class="language-html">
          &lt;!-- Set empty option with data-placeholder if you to have placeholder --&gt;
          &lt;!-- text for single select, otherwise first option will be selected --&gt;
          &lt;select id="placeholderSingle"&gt;
            &lt;option data-placeholder="true"&gt;&lt;/option&gt;
            &lt;option value="value1"&gt;Value 1&lt;/option&gt;
            &lt;option value="value2"&gt;Value 2&lt;/option&gt;
            &lt;option value="value3"&gt;Value 3&lt;/option&gt;
          &lt;/select&gt;
        </code>
      </pre>
    </div>

    <div class="content">
      <h2 class="header">allowDeselect</h2>
      <p>
        This will allow you to deselect a value on a single select dropdown.<br />
        Be sure to have an empty option data placeholder so slim select has an empty string value to select.
      </p>

      <div class="set-content">
        <select id="allowDeselect">
          <option data-placeholder="true"></option>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      </div>

      <pre>
        <code class="language-javascript">
          new SlimSelect({
            select: '.element .you #want',
            allowDeselect: true
          })
        </code>
      </pre>
      <pre>
        <code class="language-html">
          &lt;!-- Requires emtpy data-placeholder option --&gt;
          &lt;select id="allowDeselect"&gt;
            &lt;option data-placeholder="true"&gt;&lt;/option&gt;
            &lt;option value="value1"&gt;Value 1&lt;/option&gt;
            &lt;option value="value2"&gt;Value 2&lt;/option&gt;
            &lt;option value="value3"&gt;Value 3&lt;/option&gt;
          &lt;/select&gt;
        </code>
      </pre>
    </div>

    <div class="content">
      <h2 class="header">display</h2>
      <p>Allows to hide elements of select options.</p>

      <div class="set-content">
        <select id="selectdisplay" multiple></select>
      </div>

      <pre>
        <code class="language-javascript">
            const displaySelect = new SlimSelect({
              select: '#selectdisplay'
            })

            const displayData = [
              { value: 'A', text: 'A', display: false },
              { value: 'B', text: 'B' },
              { value: 'C', text: 'C' }
            ]

            displaySelect.setData(displayData)
            displaySelect.set(['A', 'C'])
        </code>
      </pre>

      <pre>
        <code class="language-html">
          &lt;select id="selectMultiMandatory" multiple&gt;
          &lt;/select&gt;
        </code>
      </pre>

      <p>Or</p>
      <div class="set-content">
        <select id="selectdisplay2" multiple>
          <option value="A" style="display: none;" selected>A</option>
          <option value="B" selected>B</option>
          <option value="C">C</option>
        </select>
      </div>

      <pre>
        <code class="language-javascript">
            const slim = new SlimSelect({
                select: '#selectdisplay2'
            });
        </code>
      </pre>

      <pre>
        <code class="language-html">
          &lt;select id="selectdisplay2" multiple&gt;
            &lt;option value="A" style="display: none;" selected&gt;A&lt;/option&gt;
            &lt;option value="B" selected&gt;B&lt;/option&gt;
            &lt;option value="C"&gt;C&lt;/option&gt;
          &lt;/select&gt;
        </code>
      </pre>
    </div>

    <div class="content">
      <h2 class="header">allowDeselectOption</h2>
      <p>
        This will allow you to deselect a value in the dropdown. By simple clicking the option again.<br />
        Be sure to have an empty option data placeholder so slim select has an empty string value to select.
      </p>

      <div class="set-content">
        <select id="allowDeselectOption">
          <option data-placeholder="true"></option>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
        <select id="allowDeselectOptionMultiple" multiple>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      </div>

      <pre>
        <code class="language-javascript">
          new SlimSelect({
            select: '.element .you #want',
            allowDeselectOption: true
          })
        </code>
      </pre>
      <pre>
        <code class="language-html">
          &lt;!-- Requires emtpy data-placeholder option --&gt;
          &lt;select id="allowDeselectOption"&gt;
            &lt;option data-placeholder="true"&gt;&lt;/option&gt;
            &lt;option value="value1"&gt;Value 1&lt;/option&gt;
            &lt;option value="value2"&gt;Value 2&lt;/option&gt;
            &lt;option value="value3"&gt;Value 3&lt;/option&gt;
          &lt;/select&gt;
        </code>
      </pre>
    </div>

    <div class="content">
      <h2 class="header">deselectLabel</h2>
      <p>
        This will allow you to change the deselect label (default 'x') on single select lists,
        and the delete label on multiple-select lists.
      </p>
      <p>Note: Be aware of the lmited space available for it</p>

      <div class="set-content">
        <select id="deselectLabel" class="deselectLabel">
          <option data-placeholder="true"></option>
          <option selected value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      </div>

      <pre>
        <code class="language-javascript">
          new SlimSelect({
            select: '.element .you #want',
            allowDeselect: true,
            deselectLabel: '&lt;span class="red"&gt;✖&lt;/span&gt;'
          })
        </code>
      </pre>
      <pre>
        <code class="language-html">
          &lt;!-- Requires emtpy data-placeholder option --&gt;
          &lt;select id="deselectLabel"&gt;
            &lt;option data-placeholder="true"&gt;&lt;/option&gt;
            &lt;option value="value1"&gt;Value 1&lt;/option&gt;
            &lt;option value="value2"&gt;Value 2&lt;/option&gt;
            &lt;option value="value3"&gt;Value 3&lt;/option&gt;
          &lt;/select&gt;
        </code>
      </pre>
    </div>

    <div class="content">
      <h2 class="header">addable</h2>
      <p>
        Slim select has the ability to dynamically add options via the search input field
      </p>
      <p>
        addable is a callback which takes a function parameter.
        The return value is the string of the value you want added.
      </p>

      <div class="set-content">
        <select id="addableSingle">
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
        <select id="addableMultiple" multiple>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      </div>

      <pre>
        <code class="language-javascript">
          new SlimSelect({
            select: '.element .you #want',
            // Optional - In the event you want to alter/validate it as a return value
            addable: function (value) {
              // return false or null if you do not want to allow value to be submitted
              if (value === 'bad') {return false}

              // Return the value string
              return value // Optional - value alteration // ex: value.toLowerCase()

              // Optional - Return a valid data object. See methods/setData for list of valid options
              return {
                text: value,
                value: value.toLowerCase()
              }
            }
          })
        </code>
      </pre>
    </div>

    <div class="content">
      <h2 class="header">limit</h2>
      <p>When using multi select you can set a limit on the amount of selections you can have.</p>

      <div class="set-content">
        <select id="selectMultiLimit" multiple>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      </div>

      <pre>
        <code class="language-javascript">
          let slim = new SlimSelect({
            select: '#selectMultiLimit',
            limit: 2
          })
        </code>
      </pre>

      <pre>
        <code class="language-html">
          &lt;select id="selectMultiLimit" multiple&gt;
            &lt;option value="value1"&gt;Value 1&lt;/option&gt;
            &lt;option value="value2"&gt;Value 2&lt;/option&gt;
            &lt;option value="value3"&gt;Value 3&lt;/option&gt;
          &lt;/select&gt;
        </code>
      </pre>
    </div>

    <div class="content">
      <h2 class="header">mandatory</h2>
      <p>When using multi select you can set a mandatory on the option to prevent capability to deselect particular option. Note options with mandatory flag is not selected by default, you need select them yourselfs.</p>

      <div class="set-content">
        <select id="selectMultiMandatory" multiple></select>
      </div>

      <pre>
        <code class="language-javascript">
            const slim = new SlimSelect({
                select: '#selectMultiMandatory'
            });

            const data = [
                { value: 'A', text: 'A', mandatory: true },
                { value: 'B', text: 'B' },
                { value: 'C', text: 'C' }
            ]

            slim.setData(data)
            slim.set(["A", "C"])
        </code>
      </pre>

      <pre>
        <code class="language-html">
          &lt;select id="selectMultiMandatory" multiple&gt;
          &lt;/select&gt;
        </code>
      </pre>

      <p>Or</p>
      <div class="set-content">
        <select id="selectMultiMandatory2" multiple>
          <option value="A" data-mandatory="true" selected>A</option>
          <option value="B" selected>B</option>
          <option value="C">C</option>
        </select>
      </div>

      <pre>
        <code class="language-javascript">
            const slim = new SlimSelect({
                select: '#selectMultiMandatory2'
            });
        </code>
      </pre>

      <pre>
        <code class="language-html">
          &lt;select id="selectMultiMandatory" multiple&gt;
            &lt;option value="A" data-mandatory="true" selected&gt;A&lt;/option&gt;
            &lt;option value="B" selected&gt;B&lt;/option&gt;
            &lt;option value="C"&gt;C&lt;/option&gt;
          &lt;/select&gt;
        </code>
      </pre>
    </div>

    <div class="content">
      <h2 class="header">css class</h2>
      <p>
        Slim select will inherit any classes that were added to the original select element.
        This includes options as well.
      </p>

      <div class="set-content">
        <select id="select-class" class="select-class">
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
        <select id="option-class" class="option-class">
          <option class="red" value="value1">Red</option>
          <option class="green" value="value2">Green</option>
          <option class="blue" value="value3">Blue</option>
        </select>
      </div>

      <pre>
        <code class="language-html">
          &lt;select id="select-class" class="classItems"&gt;
            &lt;option class="red" value="value1"&gt;Value 1&lt;/option&gt;
            &lt;option class="green" value="value2"&gt;Value 2&lt;/option&gt;
            &lt;option class="blue" value="value3"&gt;Value 3&lt;/option&gt;
          &lt;/select&gt;
        </code>
      </pre>
    </div>

    <div class="content">
      <h2 class="header">inline styles</h2>
      <p>
        Slim select will inherit any styles that were added to the original select element.
        This includes options as well.
      </p>

      <div class="set-content">
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
      </div>

      <pre>
        <code class="language-html">
          &lt;select id="select-style" style="color: red;"&gt;
            &lt;option value="value1"&gt;Value 1&lt;/option&gt;
            &lt;option value="value2"&gt;Value 2&lt;/option&gt;
            &lt;option value="value3"&gt;Value 3&lt;/option&gt;
          &lt;/select&gt;

          &lt;select id="option-style"&gt;
            &lt;option style="color: red;" value="value1"&gt;Red&lt;/option&gt;
            &lt;option style="color: green;"&gt;Green&lt;/option&gt;
            &lt;option style="color: blue;"&gt;Blue&lt;/option&gt;
          &lt;/select&gt;
        </code>
      </pre>
    </div>

    <div class="content">
      <h2 class="header">innerHTML</h2>
      <p>
        Slim select has the ability to set custom html in content in the select option.
      </p>
      <p>
        Due to html spec we cant do this directly on the select dropdown, but we can pass them as data values to slim select
      </p>

      <div class="set-content">
        <select id="selectInnerHTMLSingle"></select>
        <select id="selectInnerHTMLMulti" multiple></select>
      </div>
      <div class="set-content" style="padding: 16px 0 0 0;">
        <h4>Use text for selected values</h4>
      </div>
      <div class="set-content">
        <select id="selectInnerHTMLSingleText"></select>
        <select id="selectInnerHTMLMultiText" multiple></select>
      </div>

      <pre>
        <code class="language-javascript">
          &lt;select id="select-innerHTML"&gt;&lt;/select&gt;

          var select = new SlimSelect({
            select: '#select-innerHTML',
            valuesUseText: false, // Use text instead of innerHTML for selected values - default false
            data: [
              {innerHTML: '&lt;img height="30" width="30" src="http://lorempixel.com/30/30" /&gt;&nbsp;Image', text: 'Image', value: 'image'},
              {innerHTML: '&lt;b&gt;Bold Text&lt;/b&gt;', text: 'Bold Text', value: 'bold text'},
              {innerHTML: '&lt;div style="border: solid 1px #666666;"&gt;Border&lt;/div&gt;', text: 'Border', value: 'border'},
              {innerHTML: '&lt;i&gt;Slim Select you are awesome&lt;/i&gt;', text: 'Slim Select awesome'}
            ]
          })
        </code>
      </pre>
    </div>

    <div class="content">
      <h2 class="header">showSearch / searchText / searchingText / searchFocus / searchHighlight</h2>
      <p>
        showSearch is a boolean value that will decide whether or not to show the search.
        Default is true.
      </p>
      <p>
        searchText is a string value that will show in the event there are no results.
        Default is 'No Results'.
      </p>
      <p>
        searchingText is a string value that will show during an ajax request.
        Default is 'Searching...'.
      </p>
      <p>
        searchPlaceholder is a string value that will set the value of the input search placeholder text.
        Default is 'Search'.
      </p>
      <p>
        searchFocus is a boolean value that will focus search input on opening.
        Default is true.
      </p>
      <p>
        searchHighlight is a boolean value that will highlight search results.
        Default is false.
      </p>

      <div class="set-content">
        <select id="showSearchSingle">
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="bird">Bird</option>
        </select>
        <select id="searchTextSingle">
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="bird">Bird</option>
        </select>
        <select id="searchPlaceholderSingle">
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="bird">Bird</option>
        </select>
        <select id="searchFocusSingle">
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="bird">Bird</option>
        </select>
        <select id="searchHighlightSingle">
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="bird">Bird</option>
        </select>
      </div>

      <div class="set-content">
        <select id="showSearchMulti" multiple>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="bird">Bird</option>
        </select>
        <select id="searchTextMulti" multiple>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="bird">Bird</option>
        </select>
        <select id="searchPlaceholderMulti" multiple>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="bird">Bird</option>
        </select>
        <select id="searchFocusMulti" multiple>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="bird">Bird</option>
        </select>
        <select id="searchHighlightMulti" multiple>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="bird">Bird</option>
        </select>
      </div>

      <pre>
        <code class="language-javascript">
          let slim = new SlimSelect({
            select: '#search',
            showSearch: false,
            searchText: 'Sorry nothing to see here',
            searchPlaceholder: 'Search for the good stuff!',
            searchFocus: false, // Whether or not to focus on the search input field
            searchHighlight: true
          })

          // You can also set search text via method
          slim.setSearchText('Searching...')
        </code>
      </pre>
    </div>

    <div class="content">
      <h2 class="header">closeOnSelect</h2>
      <p>
        closeOnSelect is a boolean value in which determines whether or not to
        close the content area upon selecting a value.
      </p>

      <div class="set-content">
        <select id="closeOnSelectSingle">
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
          <optgroup label="Super Values">
            <option value="value11">Value 1</option>
            <option value="value22">Value 2</option>
            <option value="value33">Value 3</option>
          </optgroup>
        </select>
        <select id="closeOnSelectMultiple" multiple>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
          <optgroup label="Super Values">
            <option value="value11">Value 1</option>
            <option value="value22">Value 2</option>
            <option value="value33">Value 3</option>
          </optgroup>
        </select>
      </div>

      <pre>
        <code class="language-javascript">
          new SlimSelect({
            select: '#search',
            closeOnSelect: false
          })
        </code>
      </pre>
    </div>

    <div class="content">
      <h2 class="header">showContent</h2>
      <p>
        showContent is a string value that will decide where to show your content when it comes out.
        By default slim select will try to put the content where it can without going off screen.
        But you may want to always show it in one direction.
      </p>
      <p>
        Possible Options: <b>'auto', 'up' or 'down'</b>. Default is <b>'auto'</b>
      </p>

      <div class="set-content">
        <select id="showContentUp">
          <option value="up1">Up 1</option>
          <option value="up2">Up 2</option>
          <option value="up3">Up 3</option>
        </select>
        <select id="showContentDown">
          <option value="down1">Down 1</option>
          <option value="down2">Down 2</option>
          <option value="down3">Down 3</option>
        </select>
      </div>

      <pre>
        <code class="language-javascript">
          new SlimSelect({
            select: '#showContent',
            showContent: 'auto' // 'auto', 'up' or 'down'
          })
        </code>
      </pre>
    </div>

    <div class="content">
      <h2 class="header">addToBody</h2>
      <p>
        addToBody is a boolean value that configures the select dropdown to be added directly to the document body, rather than the parent container.
        This allows using slim-select in scenarios where you have no control of the overflow state of the parent containers.

        Keep in mind that the widget has to be disposed explicitly by calling <b>destroy</b>.
      </p>
      <p>
        Possible Options: <b>true</b> or <b>false</b>. Default is <b>false</b>
      </p>

      <div class="set-content">
        <select id="addToBodySingle">
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
          <optgroup label="Super Values">
            <option value="value11">Value 1</option>
            <option value="value22">Value 2</option>
            <option value="value33">Value 3</option>
          </optgroup>
        </select>
        <select id="addToBodyMultiple" multiple>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
          <optgroup label="Super Values">
            <option value="value11">Value 1</option>
            <option value="value22">Value 2</option>
            <option value="value33">Value 3</option>
          </optgroup>
        </select>
      </div>

      <pre>
        <code class="language-javascript">
          new SlimSelect({
            select: '#showContent',
            addToBody: true
          })
        </code>
      </pre>
    </div>

    <div class="content">
      <h2 class="header">beforeOnChange</h2>
      <p>
        beforeOnChange will trigger a callback on an option click and will allow
        you the ability to halt if the value it produces isnt to your liking.
        In order to stop propagation just return false on the callback.
        Returning nothing or true will allow it to continue as normal.
      </p>

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

      <pre>
        <code class="language-javascript">
          new SlimSelect({
            select: '#beforeOnChange',
            beforeOnChange: (info) => {
              console.log(info)
              return false // this will stop propagation
            }
          })
        </code>
      </pre>
    </div>

    <div class="content">
      <h2 class="header">onChange</h2>
      <p>
        onChange will trigger a callback after the value of the select dropdown has changed.
      </p>

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

      <pre>
        <code class="language-javascript">
          new SlimSelect({
            select: '#onChange',
            onChange: (info) => {
              console.log(info)
            }
          })
        </code>
      </pre>
    </div>

    <div class="content">
      <h2 class="header">showOptionTooltips</h2>
      <p>
        showOptionTooltips option is used to active displaying the on-hover tooltips for select options.
        The tooltip text is equal to the option text content.
      </p>

      <select id="showOptionTooltips">
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>

      <pre>
        <code class="language-javascript">
          new SlimSelect({
            select: '#showOptionTooltips',
            showOptionTooltips: true
          })
        </code>
      </pre>
    </div>

    <div class="content">
      <h2 class="header">selectByGroup</h2>
      <p>
        selectByGroup option is used to enable the selection of all options under a specific group by clicking that option group's label.
      </p>

      <select id="selectByGroup" multiple>
        <optgroup label="Label 1">
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </optgroup>
      </select>

      <pre>
        <code class="language-javascript">
          new SlimSelect({
            select: '#selectByGroup',
            selectByGroup: true
          })
        </code>
      </pre>
    </div>

    <div class="content">
      <h2 class="header">searchFilter</h2>
      <p>
        searchFilter option is used to replace the default matching algorithm.
      </p>
      <p>
        See methods/setData for the proper object interface of <em>option</em>.
      </p>

      <select id="searchFilter">
        <option value="apple">Apple</option>
        <option value="orange">Orange</option>
        <option value="pineapple">Pineapple</option>
      </select>

      <pre>
        <code class="language-javascript">
          new SlimSelect({
            select: '#searchFilter',
            // Exact case sensitive start of string match
            searchFilter: (option, search) => {
              return option.text.substr(0, search.length) === search
            }
          })
        </code>
      </pre>
    </div>

    <div class="content">
      <h2 class="header">hideSelectedOption</h2>
      <p>
        hideSelectedOption option is used to hide the current selected option in the dropdown.
      </p>

      <div class="set-content">
        <select id="hideSelectedOption">
          <option data-placeholder="true"></option>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
        <select id="hideSelectedOptionMultiple" multiple>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      </div>

      <pre>
        <code class="language-javascript">
          new SlimSelect({
            select: '.element .you #want',
            hideSelectedOption: true
          })
        </code>
      </pre>
      <pre>
        <code class="language-html">
          &lt;select id="hideSelectedOption"&gt;
            &lt;option data-placeholder="true"&gt;&lt;/option&gt;
            &lt;option value="value1"&gt;Value 1&lt;/option&gt;
            &lt;option value="value2"&gt;Value 2&lt;/option&gt;
            &lt;option value="value3"&gt;Value 3&lt;/option&gt;
          &lt;/select&gt;

          &lt;select id="hideSelectedOptionMultiple"&gt;
            &lt;option value="value1"&gt;Value 1&lt;/option&gt;
            &lt;option value="value2"&gt;Value 2&lt;/option&gt;
            &lt;option value="value3"&gt;Value 3&lt;/option&gt;
          &lt;/select&gt;
        </code>
      </pre>
    </div>
  </div>
</template>
