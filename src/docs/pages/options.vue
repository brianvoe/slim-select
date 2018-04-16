<script>
import SlimSelect from "slim-select/index.ts";

export default {
  data() {
    return {
      beforeOnChangeSingle: null,
      beforeOnChangeMultiple: null,
      onChangeSingle: null,
      onChangeMultiple: null
    };
  },
  mounted() {
    /* eslint-disable no-new */
    let ajaxSingle = new SlimSelect({
      select: "#ajaxSingle",
      ajax: function(search, callback) {
        if (search.length < 3) {
          callback("Need 3 characters");
          return;
        }

        fetch("https://jsonplaceholder.typicode.com/users")
          .then(function(response) {
            return response.json();
          })
          .then(function(json) {
            let data = [];
            for (let i = 0; i < json.length; i++) {
              data.push({ text: json[i].name });
            }

            setTimeout(() => {
              callback(data);
            }, 1000);
          })
          .catch(function(error) {
            callback(false);
          });
      }
    });

    new SlimSelect({
      select: "#ajaxMultiple",
      ajax: function(search, callback) {
        fetch("https://jsonplaceholder.typicode.com/users")
          .then(function(response) {
            return response.json();
          })
          .then(function(json) {
            let data = [];
            for (let i = 0; i < json.length; i++) {
              data.push({ text: json[i].name });
            }

            setTimeout(() => {
              ajaxSingle.setSearchText("Sorry No Results.");
              callback(data);
            }, 1000);
          })
          .catch(function(error) {
            callback(false);
          });
      }
    });

    new SlimSelect({
      select: "#placeholderSingle",
      placeholder: "Placeholder Text Here"
    });

    new SlimSelect({
      select: "#placeholderMultiple",
      placeholder: "Placeholder Text Here"
    });

    new SlimSelect({
      select: "#allowDeselect",
      allowDeselect: true
    });

    new SlimSelect({
      select: "#addableSingle",
      addable: value => {
        return value;
      }
    });

    new SlimSelect({
      select: "#addableMultiple",
      addable: value => {
        return {
          text: value,
          value: value.toLowerCase()
        };
      }
    });

    new SlimSelect({
      select: "#select-class"
    });

    new SlimSelect({
      select: "#selectInnerHTMLSingle",
      data: [
        {
          innerHTML: "<b>Bold Text</b>",
          text: "Bold Text",
          value: "bold text"
        },
        {
          innerHTML: "<i>Slim Select you are awesome</i>",
          text: "Slim Select awesome"
        },
        {
          innerHTML: '<div style="border: solid 1px #666666;">Border</div>',
          text: "Border",
          value: "border"
        }
      ]
    });

    new SlimSelect({
      select: "#selectInnerHTMLMulti",
      data: [
        {
          innerHTML: "<b>Bold Text</b>",
          text: "Bold Text",
          value: "bold text"
        },
        {
          innerHTML: "<i>Slim Select you are awesome</i>",
          text: "Slim Select awesome"
        },
        {
          innerHTML: '<div style="border: solid 1px #666666;">Border</div>',
          text: "Border",
          value: "border"
        }
      ]
    });

    new SlimSelect({
      select: "#selectInnerHTMLSingleText",
      valuesUseText: true,
      data: [
        {
          innerHTML: "<b>Bold Text</b>",
          text: "Bold Text",
          value: "bold text"
        },
        {
          innerHTML: "<i>Slim Select you are awesome</i>",
          text: "Slim Select awesome"
        },
        {
          innerHTML: '<div style="border: solid 1px #666666;">Border</div>',
          text: "Border",
          value: "border"
        }
      ]
    });

    new SlimSelect({
      select: "#selectInnerHTMLMultiText",
      valuesUseText: true,
      data: [
        {
          innerHTML: "<b>Bold Text</b>",
          text: "Bold Text",
          value: "bold text"
        },
        {
          innerHTML: "<i>Slim Select you are awesome</i>",
          text: "Slim Select awesome"
        },
        {
          innerHTML: '<div style="border: solid 1px #666666;">Border</div>',
          text: "Border",
          value: "border"
        }
      ]
    });

    new SlimSelect({
      select: "#showSearch",
      showSearch: false
    });

    new SlimSelect({
      select: "#searchText",
      searchText: "Sorry nothing to see here"
    });

    new SlimSelect({
      select: "#searchPlaceholder",
      searchPlaceholder: "Search for the good stuff!"
    });

    new SlimSelect({
      select: "#searchHighlight",
      searchHighlight: true
    });

    new SlimSelect({
      select: "#closeOnSelectSingle",
      closeOnSelect: false
    });

    new SlimSelect({
      select: "#closeOnSelectMultiple",
      closeOnSelect: false
    });

    new SlimSelect({
      select: "#showContentUp",
      showContent: "up"
    });

    new SlimSelect({
      select: "#showContentDown",
      showContent: "down"
    });

    new SlimSelect({
      select: "#beforeOnChangeSingle",
      beforeOnChange: value => {
        this.beforeOnChangeSingle = value;
      }
    });

    new SlimSelect({
      select: "#beforeOnChangeMultiple",
      beforeOnChange: values => {
        this.beforeOnChangeMultiple = values;
      }
    });

    new SlimSelect({
      select: "#onChangeSingle",
      onChange: value => {
        this.onChangeSingle = value;
      }
    });

    new SlimSelect({
      select: "#onChangeMultiple",
      onChange: value => {
        this.onChangeMultiple = value;
      }
    });
  }
};
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
      <h2 class="header">ajax</h2>
      <p>
        Slim select allows you to syncronize result values from your ajax requests.<br />
        Call callback() method with slimselect data, false or string with specific string.
      </p>

      <div class="set-content">
        <select id="ajaxSingle"></select>
        <select id="ajaxMultiple" multiple></select>
      </div>

      <pre>
        <code class="language-javascript">
          new SlimSelect({
            select: '#placeholder',
            ajax: function (search, callback) {
              // Check search value. If you dont like it callback(false) or callback('Message String')
              if (search.length < 3) {
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
                for (let i = 0; i < json.length; i++) {
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
      <h2 class="header">css / class</h2>
      <p>
        Slim select will inherit any styles and classes that were added to the original select element.
      </p>

      <div class="set-content">
        <select id="select-class" class="select-class">
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      </div>

      <pre>
        <code class="language-html">
          &lt;select id="select-class" class="classItems"&gt;
            &lt;option value="value1"&gt;Value 1&lt;/option&gt;
            &lt;option value="value2"&gt;Value 2&lt;/option&gt;
            &lt;option value="value3"&gt;Value 3&lt;/option&gt;
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
      <h2 class="header">showSearch / searchText / searchHighlight</h2>
      <p>
        showSearch is a boolean value that will decide whether or not to show the search.
        Default is true.
      </p>
      <p>
        searchText is a string value that will show in the event there are no results.
        Default is 'No Results'.
      </p>
      <p>
        searchPlaceholder is a string value that will set the value of the input search placeholder text.
        Default is 'Search'.
      </p>
      <p>
        searchHighlight is a boolean value that will highlight search results.
        Default is false.
      </p>

      <div class="set-content">
        <select id="showSearch">
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="bird">Bird</option>
        </select>
        <select id="searchText">
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="bird">Bird</option>
        </select>
        <select id="searchPlaceholder">
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="bird">Bird</option>
        </select>
        <select id="searchHighlight">
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
        </select>
        <select id="closeOnSelectMultiple" multiple>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
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
  </div>
</template>
