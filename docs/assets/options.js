import{d as m,S as e,_ as y,o as s,c as u,e as t,t as c,g as p,a as r}from"./index.js";const f=m({name:"Options",data(){return{addToBodySingle:null,addToBodyMultiple:null,beforeOnChangeSingle:null,beforeOnChangeMultiple:null,onChangeSingle:null,onChangeMultiple:null}},mounted(){new e({select:"#dataSingle",data:[{text:"data placeholder",placeholder:!0},{text:"Value 2"},{text:"Value 3",value:""}]}),new e({select:"#dataMultiple",data:[{placeholder:!0,text:"data placeholder"},{text:"Human"},{label:"Animals",options:[{text:"Cat"},{text:"Dog"},{text:"Bird",value:""}]}]}),new e({select:"#optionsSingle"}),new e({select:"#optionsMultiple"}),new e({select:"#ajaxSingle",placeholder:'Search "Graham"',searchingText:"Searching Users...",ajax(l,n){if(l.length<3){n("Need 3 characters");return}fetch("https://jsonplaceholder.typicode.com/users").then(a=>a.json()).then(a=>{const i=[];for(const v of a)i.push({text:v.name});n(i)}).catch(a=>{n(!1)})}});const o=new e({select:"#ajaxMultiple",placeholder:'Search "Dennis"',ajax(l,n){fetch("https://jsonplaceholder.typicode.com/users").then(a=>a.json()).then(a=>{const i=[];for(const v of a)i.push({text:v.name});setTimeout(()=>{o.setSearchText("Sorry No Results."),n(i)},1e3)}).catch(a=>{n(!1)})}}),d=new e({select:"#selectdisplay"}),g=[{value:"A",text:"A",display:!1},{value:"B",text:"B"},{value:"C",text:"C"}];d.setData(g),d.set(["A","C"]),new e({select:"#selectdisplay2"}),new e({select:"#placeholderSingle",placeholder:"Placeholder Text Here"}),new e({select:"#placeholderMultiple",placeholder:"Placeholder Text Here"}),new e({select:"#allowDeselect",allowDeselect:!0}),new e({select:"#allowDeselectOption",allowDeselectOption:!0}),new e({select:"#allowDeselectOptionMultiple",allowDeselectOption:!0}),new e({select:"#deselectLabel",allowDeselect:!0,deselectLabel:'<span class="red">\u2716</span>'}),new e({select:"#addableSingle",addable:l=>l}),new e({select:"#addableMultiple",addable:l=>({text:l,value:l.toLowerCase()})});const h=new e({select:"#selectMultiMandatory"}),w=[{value:"A",text:"A",mandatory:!0},{value:"B",text:"B"},{value:"C",text:"C"}];h.setData(w),h.set(["A","C"]),new e({select:"#selectMultiMandatory2"}),new e({select:"#selectMultiLimit",limit:2}),new e({select:"#select-class"}),new e({select:"#option-class"}),new e({select:"#select-style"}),new e({select:"#option-style"}),new e({select:"#selectInnerHTMLSingle",searchHighlight:!0,data:[{innerHTML:"<b>Bold Text</b>",text:"Bold Text",value:"bold text"},{innerHTML:"<i>Slim Select you are awesome</i>",text:"Slim Select awesome"},{innerHTML:'<div style="border: solid 1px #666666;">Border</div>',text:"Border",value:"border"}]}),new e({select:"#selectInnerHTMLMulti",data:[{innerHTML:"<b>Bold Text</b>",text:"Bold Text",value:"bold text"},{innerHTML:"<i>Slim Select you are awesome</i>",text:"Slim Select awesome"},{innerHTML:'<div style="border: solid 1px #666666;">Border</div>',text:"Border",value:"border"}]}),new e({select:"#selectInnerHTMLSingleText",valuesUseText:!0,data:[{innerHTML:"<b>Bold Text</b>",text:"Bold Text",value:"bold text"},{innerHTML:"<i>Slim Select you are awesome</i>",text:"Slim Select awesome"},{innerHTML:'<div style="border: solid 1px #666666;">Border</div>',text:"Border",value:"border"}]}),new e({select:"#selectInnerHTMLMultiText",valuesUseText:!0,data:[{innerHTML:"<b>Bold Text</b>",text:"Bold Text",value:"bold text"},{innerHTML:"<i>Slim Select you are awesome</i>",text:"Slim Select awesome"},{innerHTML:'<div style="border: solid 1px #666666;">Border</div>',text:"Border",value:"border"}]}),new e({select:"#showSearchSingle",showSearch:!1}),new e({select:"#searchTextSingle",searchText:"Sorry nothing to see here",beforeOpen:()=>{console.log("beforeOpen")},beforeClose:()=>{console.log("beforeClose")},afterOpen:()=>{console.log("afterOpen")},afterClose:()=>{console.log("afterClose")}}),new e({select:"#searchPlaceholderSingle",searchPlaceholder:"Search for the good stuff!"}),new e({select:"#searchFocusSingle",searchFocus:!1}),new e({select:"#searchHighlightSingle",searchHighlight:!0}),new e({select:"#showSearchMulti",showSearch:!1}),new e({select:"#searchTextMulti",searchText:"Sorry nothing to see here"}),new e({select:"#searchPlaceholderMulti",searchPlaceholder:"Search for the good stuff!"}),new e({select:"#searchFocusMulti",searchFocus:!1}),new e({select:"#searchHighlightMulti",searchHighlight:!0}),new e({select:"#closeOnSelectSingle",closeOnSelect:!1}),new e({select:"#closeOnSelectMultiple",closeOnSelect:!1,selectByGroup:!0}),new e({select:"#showContentUp",showContent:"up"}),this.addToBodySingle=new e({select:"#addToBodySingle",addToBody:!0}),this.addToBodyMultiple=new e({select:"#addToBodyMultiple",addToBody:!0,selectByGroup:!0}),new e({select:"#showContentDown",showContent:"down"}),new e({select:"#beforeOnChangeSingle",beforeOnChange:l=>{this.beforeOnChangeSingle=l}}),new e({select:"#beforeOnChangeMultiple",beforeOnChange:l=>{this.beforeOnChangeMultiple=l}}),new e({select:"#onChangeSingle",onChange:l=>{this.onChangeSingle=l}}),new e({select:"#onChangeMultiple",onChange:l=>{this.onChangeMultiple=l}}),new e({select:"#showOptionTooltips",showOptionTooltips:!0}),new e({select:"#selectByGroup",selectByGroup:!0}),new e({select:"#searchFilter",searchFilter:(l,n)=>l.text.substr(0,n.length)===n}),new e({select:"#hideSelectedOption",hideSelectedOption:!0}),new e({select:"#hideSelectedOptionMultiple",hideSelectedOption:!0})},beforeDestroy(){this.addToBodySingle.destroy(),this.addToBodyMultiple.destroy()}});const S={id:"options-content"},b=r(`<div class="content"><h2 class="header">select</h2><p> The select option is used to identify the select element that will be used to create slim select. You can any value you normally would in a querySelector or pass the element directly. </p><pre>        <code class="language-javascript">
          new SlimSelect({
            select: &#39;.element .you #want&#39;,
            // or
            select: document.querySelector(&#39;.element .you #want&#39;)
          })

          // If you already have a created slim select you can select your div
          // and continue to use slim select off of the element using the .slim data value
          let el = document.querySelector(&#39;.element .you #want&#39;)
          el.slim.open() // Or any other options/methods
        </code>
      </pre></div><div class="content"><h2 class="header">data</h2><p>Data is a value that can be set to initialize options in the select dropdown</p><div class="set-content"><select id="dataSingle"></select><select id="dataMultiple" multiple></select></div><pre>        <code class="language-javascript">
          new SlimSelect({
            select: &#39;.element .you #want&#39;,
            data: [
              {text: &#39;Value 1&#39;},
              {text: &#39;Value 2&#39;},
              {text: &#39;Value 3&#39;}
            ],
            // groups
            data: [
              {
                label: &#39;Animals&#39;,
                options: [
                  {text: &#39;Cat&#39;},
                  {text: &#39;Dog&#39;},
                  {text: &#39;Bird&#39;}
                ]
              }
            ]
            // Mix - option and group options
            data: [
              {text: &#39;Human&#39;}, // regular option
              {
                label: &#39;Animals&#39;,
                options: [
                  {text: &#39;Cat&#39;},
                  {text: &#39;Dog&#39;},
                  {text: &#39;Bird&#39;}
                ]
              }
            ]
          })

          // If you want to set a placeholder set the first object placeholder to true
          {&#39;placeholder&#39;: true, &#39;text&#39;: &#39;placeholder text&#39;}
        </code>
      </pre><h4>Data Types</h4><pre>        <code class="language-javascript">
          var optgroup = {
            label: &#39;label&#39;, // Required
            options: [] // Required - value is an array of options
          }

          var option = {
            text: &#39;text&#39;, // Required
            value: &#39;value&#39;, // Optional - value will be set by text if not set
            innerHTML: &#39;&lt;b&gt;Html&lt;/b&gt;&#39;, // Optional - will be used for display purposes if set
            selected: false, // Optional - default is false
            disabled: false, // Optional - default is false
            placeholder: false, // Optional - default is false
            class: &#39;&#39;, // Optional - default is not set
            css: &#39;&#39;, // Optional - default is not set
            data: {} // Optional - If you have data attributes
          }
        </code>
      </pre></div><div class="content"><h2 class="header">options</h2><p> Slim select will take on attributes of the original as best as possible. Below are example usages of attributes added to the underlining select options that slim select picked up and used </p><div class="set-content"><select id="optionsSingle"><option data-placeholder="true"></option><option value="value1" data-info="Here is info">Data Attributes</option><option value="value2" disabled>Disabled Option</option><option value="value3" class="green">Class Green</option><option value="value3" style="color:purple;">Inline Style</option></select><select id="optionsMultiple" multiple><option value="value1" data-info="Here is info">Data Attributes</option><option value="value2" disabled>Disabled Option</option><option value="value3" class="green">Class Green</option><option value="value3" style="color:purple;">Inline Style</option></select></div></div><div class="content"><h2 class="header">ajax</h2><p> Slim select allows you to syncronize result values from your ajax requests.<br> Call callback() method with slimselect data, false or string with specific string.<br><br> When doing fetch request for each ajax call be sure to debounce your request so you are not getting fetch race conditions. </p><div class="set-content"><select id="ajaxSingle"><option data-placeholder="true"></option></select><select id="ajaxMultiple" multiple></select></div><pre>        <code class="language-javascript">
          new SlimSelect({
            select: &#39;#ajax&#39;,
            searchingText: &#39;Searching...&#39;, // Optional - Will show during ajax request
            ajax: function (search, callback) {
              // Check search value. If you dont like it callback(false) or callback(&#39;Message String&#39;)
              if (search.length &lt; 3) {
                callback(&#39;Need 3 characters&#39;)
                return
              }

              // Perform your own ajax request here
              fetch(&#39;https://jsonplaceholder.typicode.com/users&#39;)
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
      </pre></div><div class="content"><h2 class="header">placeholder</h2><p> Placeholders consists of setting the placeholder option value. The only difference is single selects require an empty option with data-placeholder set to true. Default value is &quot;Select Value&quot;. </p><div class="set-content"><select id="placeholderSingle"><option data-placeholder="true"></option><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></select><select id="placeholderMultiple" multiple><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></select></div><pre>        <code class="language-javascript">
          new SlimSelect({
            select: &#39;#placeholder&#39;,
            placeholder: &#39;Placeholder Text Here&#39;
          })
        </code>
      </pre><pre>        <code class="language-html">
          &lt;!-- Set empty option with data-placeholder if you to have placeholder --&gt;
          &lt;!-- text for single select, otherwise first option will be selected --&gt;
          &lt;select id=&quot;placeholderSingle&quot;&gt;
            &lt;option data-placeholder=&quot;true&quot;&gt;&lt;/option&gt;
            &lt;option value=&quot;value1&quot;&gt;Value 1&lt;/option&gt;
            &lt;option value=&quot;value2&quot;&gt;Value 2&lt;/option&gt;
            &lt;option value=&quot;value3&quot;&gt;Value 3&lt;/option&gt;
          &lt;/select&gt;
        </code>
      </pre></div><div class="content"><h2 class="header">allowDeselect</h2><p> This will allow you to deselect a value on a single select dropdown.<br> Be sure to have an empty option data placeholder so slim select has an empty string value to select. </p><div class="set-content"><select id="allowDeselect"><option data-placeholder="true"></option><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></select></div><pre>        <code class="language-javascript">
          new SlimSelect({
            select: &#39;.element .you #want&#39;,
            allowDeselect: true
          })
        </code>
      </pre><pre>        <code class="language-html">
          &lt;!-- Requires emtpy data-placeholder option --&gt;
          &lt;select id=&quot;allowDeselect&quot;&gt;
            &lt;option data-placeholder=&quot;true&quot;&gt;&lt;/option&gt;
            &lt;option value=&quot;value1&quot;&gt;Value 1&lt;/option&gt;
            &lt;option value=&quot;value2&quot;&gt;Value 2&lt;/option&gt;
            &lt;option value=&quot;value3&quot;&gt;Value 3&lt;/option&gt;
          &lt;/select&gt;
        </code>
      </pre></div><div class="content"><h2 class="header">display</h2><p>Allows to hide elements of select options.</p><div class="set-content"><select id="selectdisplay" multiple></select></div><pre>        <code class="language-javascript">
            const displaySelect = new SlimSelect({
              select: &#39;#selectdisplay&#39;
            })

            const displayData = [
              { value: &#39;A&#39;, text: &#39;A&#39;, display: false },
              { value: &#39;B&#39;, text: &#39;B&#39; },
              { value: &#39;C&#39;, text: &#39;C&#39; }
            ]

            displaySelect.setData(displayData)
            displaySelect.set([&#39;A&#39;, &#39;C&#39;])
        </code>
      </pre><pre>        <code class="language-html">
          &lt;select id=&quot;selectMultiMandatory&quot; multiple&gt;
          &lt;/select&gt;
        </code>
      </pre><p>Or</p><div class="set-content"><select id="selectdisplay2" multiple><option value="A" style="display:none;" selected>A</option><option value="B" selected>B</option><option value="C">C</option></select></div><pre>        <code class="language-javascript">
            const slim = new SlimSelect({
                select: &#39;#selectdisplay2&#39;
            });
        </code>
      </pre><pre>        <code class="language-html">
          &lt;select id=&quot;selectdisplay2&quot; multiple&gt;
            &lt;option value=&quot;A&quot; style=&quot;display: none;&quot; selected&gt;A&lt;/option&gt;
            &lt;option value=&quot;B&quot; selected&gt;B&lt;/option&gt;
            &lt;option value=&quot;C&quot;&gt;C&lt;/option&gt;
          &lt;/select&gt;
        </code>
      </pre></div><div class="content"><h2 class="header">allowDeselectOption</h2><p> This will allow you to deselect a value in the dropdown. By simple clicking the option again.<br> Be sure to have an empty option data placeholder so slim select has an empty string value to select. </p><div class="set-content"><select id="allowDeselectOption"><option data-placeholder="true"></option><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></select><select id="allowDeselectOptionMultiple" multiple><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></select></div><pre>        <code class="language-javascript">
          new SlimSelect({
            select: &#39;.element .you #want&#39;,
            allowDeselectOption: true
          })
        </code>
      </pre><pre>        <code class="language-html">
          &lt;!-- Requires emtpy data-placeholder option --&gt;
          &lt;select id=&quot;allowDeselectOption&quot;&gt;
            &lt;option data-placeholder=&quot;true&quot;&gt;&lt;/option&gt;
            &lt;option value=&quot;value1&quot;&gt;Value 1&lt;/option&gt;
            &lt;option value=&quot;value2&quot;&gt;Value 2&lt;/option&gt;
            &lt;option value=&quot;value3&quot;&gt;Value 3&lt;/option&gt;
          &lt;/select&gt;
        </code>
      </pre></div><div class="content"><h2 class="header">deselectLabel</h2><p> This will allow you to change the deselect label (default &#39;x&#39;) on single select lists, and the delete label on multiple-select lists. </p><p>Note: Be aware of the lmited space available for it</p><div class="set-content"><select id="deselectLabel" class="deselectLabel"><option data-placeholder="true"></option><option selected value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></select></div><pre>        <code class="language-javascript">
          new SlimSelect({
            select: &#39;.element .you #want&#39;,
            allowDeselect: true,
            deselectLabel: &#39;&lt;span class=&quot;red&quot;&gt;\u2716&lt;/span&gt;&#39;
          })
        </code>
      </pre><pre>        <code class="language-html">
          &lt;!-- Requires emtpy data-placeholder option --&gt;
          &lt;select id=&quot;deselectLabel&quot;&gt;
            &lt;option data-placeholder=&quot;true&quot;&gt;&lt;/option&gt;
            &lt;option value=&quot;value1&quot;&gt;Value 1&lt;/option&gt;
            &lt;option value=&quot;value2&quot;&gt;Value 2&lt;/option&gt;
            &lt;option value=&quot;value3&quot;&gt;Value 3&lt;/option&gt;
          &lt;/select&gt;
        </code>
      </pre></div><div class="content"><h2 class="header">addable</h2><p> Slim select has the ability to dynamically add options via the search input field </p><p> addable is a callback which takes a function parameter. The return value is the string of the value you want added. </p><div class="set-content"><select id="addableSingle"><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></select><select id="addableMultiple" multiple><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></select></div><pre>        <code class="language-javascript">
          new SlimSelect({
            select: &#39;.element .you #want&#39;,
            // Optional - In the event you want to alter/validate it as a return value
            addable: function (value) {
              // return false or null if you do not want to allow value to be submitted
              if (value === &#39;bad&#39;) {return false}

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
      </pre></div><div class="content"><h2 class="header">limit</h2><p>When using multi select you can set a limit on the amount of selections you can have.</p><div class="set-content"><select id="selectMultiLimit" multiple><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></select></div><pre>        <code class="language-javascript">
          let slim = new SlimSelect({
            select: &#39;#selectMultiLimit&#39;,
            limit: 2
          })
        </code>
      </pre><pre>        <code class="language-html">
          &lt;select id=&quot;selectMultiLimit&quot; multiple&gt;
            &lt;option value=&quot;value1&quot;&gt;Value 1&lt;/option&gt;
            &lt;option value=&quot;value2&quot;&gt;Value 2&lt;/option&gt;
            &lt;option value=&quot;value3&quot;&gt;Value 3&lt;/option&gt;
          &lt;/select&gt;
        </code>
      </pre></div><div class="content"><h2 class="header">mandatory</h2><p>When using multi select you can set a mandatory on the option to prevent capability to deselect particular option. Note options with mandatory flag is not selected by default, you need select them yourselfs.</p><div class="set-content"><select id="selectMultiMandatory" multiple></select></div><pre>        <code class="language-javascript">
            const slim = new SlimSelect({
                select: &#39;#selectMultiMandatory&#39;
            });

            const data = [
                { value: &#39;A&#39;, text: &#39;A&#39;, mandatory: true },
                { value: &#39;B&#39;, text: &#39;B&#39; },
                { value: &#39;C&#39;, text: &#39;C&#39; }
            ]

            slim.setData(data)
            slim.set([&quot;A&quot;, &quot;C&quot;])
        </code>
      </pre><pre>        <code class="language-html">
          &lt;select id=&quot;selectMultiMandatory&quot; multiple&gt;
          &lt;/select&gt;
        </code>
      </pre><p>Or</p><div class="set-content"><select id="selectMultiMandatory2" multiple><option value="A" data-mandatory="true" selected>A</option><option value="B" selected>B</option><option value="C">C</option></select></div><pre>        <code class="language-javascript">
            const slim = new SlimSelect({
                select: &#39;#selectMultiMandatory2&#39;
            });
        </code>
      </pre><pre>        <code class="language-html">
          &lt;select id=&quot;selectMultiMandatory&quot; multiple&gt;
            &lt;option value=&quot;A&quot; data-mandatory=&quot;true&quot; selected&gt;A&lt;/option&gt;
            &lt;option value=&quot;B&quot; selected&gt;B&lt;/option&gt;
            &lt;option value=&quot;C&quot;&gt;C&lt;/option&gt;
          &lt;/select&gt;
        </code>
      </pre></div><div class="content"><h2 class="header">css class</h2><p> Slim select will inherit any classes that were added to the original select element. This includes options as well. </p><div class="set-content"><select id="select-class" class="select-class"><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></select><select id="option-class" class="option-class"><option class="red" value="value1">Red</option><option class="green" value="value2">Green</option><option class="blue" value="value3">Blue</option></select></div><pre>        <code class="language-html">
          &lt;select id=&quot;select-class&quot; class=&quot;classItems&quot;&gt;
            &lt;option class=&quot;red&quot; value=&quot;value1&quot;&gt;Value 1&lt;/option&gt;
            &lt;option class=&quot;green&quot; value=&quot;value2&quot;&gt;Value 2&lt;/option&gt;
            &lt;option class=&quot;blue&quot; value=&quot;value3&quot;&gt;Value 3&lt;/option&gt;
          &lt;/select&gt;
        </code>
      </pre></div><div class="content"><h2 class="header">inline styles</h2><p> Slim select will inherit any styles that were added to the original select element. This includes options as well. </p><div class="set-content"><select id="select-style" style="color:red;"><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></select><select id="option-style"><option style="color:red;" value="value1">Red</option><option style="color:green;">Green</option><option style="color:blue;">Blue</option></select></div><pre>        <code class="language-html">
          &lt;select id=&quot;select-style&quot; style=&quot;color: red;&quot;&gt;
            &lt;option value=&quot;value1&quot;&gt;Value 1&lt;/option&gt;
            &lt;option value=&quot;value2&quot;&gt;Value 2&lt;/option&gt;
            &lt;option value=&quot;value3&quot;&gt;Value 3&lt;/option&gt;
          &lt;/select&gt;

          &lt;select id=&quot;option-style&quot;&gt;
            &lt;option style=&quot;color: red;&quot; value=&quot;value1&quot;&gt;Red&lt;/option&gt;
            &lt;option style=&quot;color: green;&quot;&gt;Green&lt;/option&gt;
            &lt;option style=&quot;color: blue;&quot;&gt;Blue&lt;/option&gt;
          &lt;/select&gt;
        </code>
      </pre></div><div class="content"><h2 class="header">innerHTML</h2><p> Slim select has the ability to set custom html in content in the select option. </p><p> Due to html spec we cant do this directly on the select dropdown, but we can pass them as data values to slim select </p><div class="set-content"><select id="selectInnerHTMLSingle"></select><select id="selectInnerHTMLMulti" multiple></select></div><div class="set-content" style="padding:16px 0 0 0;"><h4>Use text for selected values</h4></div><div class="set-content"><select id="selectInnerHTMLSingleText"></select><select id="selectInnerHTMLMultiText" multiple></select></div><pre>        <code class="language-javascript">
          &lt;select id=&quot;select-innerHTML&quot;&gt;&lt;/select&gt;

          var select = new SlimSelect({
            select: &#39;#select-innerHTML&#39;,
            valuesUseText: false, // Use text instead of innerHTML for selected values - default false
            data: [
              {innerHTML: &#39;&lt;img height=&quot;30&quot; width=&quot;30&quot; src=&quot;http://lorempixel.com/30/30&quot; /&gt;\xA0Image&#39;, text: &#39;Image&#39;, value: &#39;image&#39;},
              {innerHTML: &#39;&lt;b&gt;Bold Text&lt;/b&gt;&#39;, text: &#39;Bold Text&#39;, value: &#39;bold text&#39;},
              {innerHTML: &#39;&lt;div style=&quot;border: solid 1px #666666;&quot;&gt;Border&lt;/div&gt;&#39;, text: &#39;Border&#39;, value: &#39;border&#39;},
              {innerHTML: &#39;&lt;i&gt;Slim Select you are awesome&lt;/i&gt;&#39;, text: &#39;Slim Select awesome&#39;}
            ]
          })
        </code>
      </pre></div><div class="content"><h2 class="header">showSearch / searchText / searchingText / searchFocus / searchHighlight</h2><p> showSearch is a boolean value that will decide whether or not to show the search. Default is true. </p><p> searchText is a string value that will show in the event there are no results. Default is &#39;No Results&#39;. </p><p> searchingText is a string value that will show during an ajax request. Default is &#39;Searching...&#39;. </p><p> searchPlaceholder is a string value that will set the value of the input search placeholder text. Default is &#39;Search&#39;. </p><p> searchFocus is a boolean value that will focus search input on opening. Default is true. </p><p> searchHighlight is a boolean value that will highlight search results. Default is false. </p><div class="set-content"><select id="showSearchSingle"><option value="dog">Dog</option><option value="cat">Cat</option><option value="bird">Bird</option></select><select id="searchTextSingle"><option value="dog">Dog</option><option value="cat">Cat</option><option value="bird">Bird</option></select><select id="searchPlaceholderSingle"><option value="dog">Dog</option><option value="cat">Cat</option><option value="bird">Bird</option></select><select id="searchFocusSingle"><option value="dog">Dog</option><option value="cat">Cat</option><option value="bird">Bird</option></select><select id="searchHighlightSingle"><option value="dog">Dog</option><option value="cat">Cat</option><option value="bird">Bird</option></select></div><div class="set-content"><select id="showSearchMulti" multiple><option value="dog">Dog</option><option value="cat">Cat</option><option value="bird">Bird</option></select><select id="searchTextMulti" multiple><option value="dog">Dog</option><option value="cat">Cat</option><option value="bird">Bird</option></select><select id="searchPlaceholderMulti" multiple><option value="dog">Dog</option><option value="cat">Cat</option><option value="bird">Bird</option></select><select id="searchFocusMulti" multiple><option value="dog">Dog</option><option value="cat">Cat</option><option value="bird">Bird</option></select><select id="searchHighlightMulti" multiple><option value="dog">Dog</option><option value="cat">Cat</option><option value="bird">Bird</option></select></div><pre>        <code class="language-javascript">
          let slim = new SlimSelect({
            select: &#39;#search&#39;,
            showSearch: false,
            searchText: &#39;Sorry nothing to see here&#39;,
            searchPlaceholder: &#39;Search for the good stuff!&#39;,
            searchFocus: false, // Whether or not to focus on the search input field
            searchHighlight: true
          })

          // You can also set search text via method
          slim.setSearchText(&#39;Searching...&#39;)
        </code>
      </pre></div><div class="content"><h2 class="header">closeOnSelect</h2><p> closeOnSelect is a boolean value in which determines whether or not to close the content area upon selecting a value. </p><div class="set-content"><select id="closeOnSelectSingle"><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option><optgroup label="Super Values"><option value="value11">Value 1</option><option value="value22">Value 2</option><option value="value33">Value 3</option></optgroup></select><select id="closeOnSelectMultiple" multiple><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option><optgroup label="Super Values"><option value="value11">Value 1</option><option value="value22">Value 2</option><option value="value33">Value 3</option></optgroup></select></div><pre>        <code class="language-javascript">
          new SlimSelect({
            select: &#39;#search&#39;,
            closeOnSelect: false
          })
        </code>
      </pre></div><div class="content"><h2 class="header">showContent</h2><p> showContent is a string value that will decide where to show your content when it comes out. By default slim select will try to put the content where it can without going off screen. But you may want to always show it in one direction. </p><p> Possible Options: <b>&#39;auto&#39;, &#39;up&#39; or &#39;down&#39;</b>. Default is <b>&#39;auto&#39;</b></p><div class="set-content"><select id="showContentUp"><option value="up1">Up 1</option><option value="up2">Up 2</option><option value="up3">Up 3</option></select><select id="showContentDown"><option value="down1">Down 1</option><option value="down2">Down 2</option><option value="down3">Down 3</option></select></div><pre>        <code class="language-javascript">
          new SlimSelect({
            select: &#39;#showContent&#39;,
            showContent: &#39;auto&#39; // &#39;auto&#39;, &#39;up&#39; or &#39;down&#39;
          })
        </code>
      </pre></div><div class="content"><h2 class="header">addToBody</h2><p> addToBody is a boolean value that configures the select dropdown to be added directly to the document body, rather than the parent container. This allows using slim-select in scenarios where you have no control of the overflow state of the parent containers. Keep in mind that the widget has to be disposed explicitly by calling <b>destroy</b>. </p><p> Possible Options: <b>true</b> or <b>false</b>. Default is <b>false</b></p><div class="set-content"><select id="addToBodySingle"><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option><optgroup label="Super Values"><option value="value11">Value 1</option><option value="value22">Value 2</option><option value="value33">Value 3</option></optgroup></select><select id="addToBodyMultiple" multiple><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option><optgroup label="Super Values"><option value="value11">Value 1</option><option value="value22">Value 2</option><option value="value33">Value 3</option></optgroup></select></div><pre>        <code class="language-javascript">
          new SlimSelect({
            select: &#39;#showContent&#39;,
            addToBody: true
          })
        </code>
      </pre></div>`,19),q={class:"content"},x=t("h2",{class:"header"},"beforeOnChange",-1),V=t("p",null," beforeOnChange will trigger a callback on an option click and will allow you the ability to halt if the value it produces isnt to your liking. In order to stop propagation just return false on the callback. Returning nothing or true will allow it to continue as normal. ",-1),M={key:0},T=t("select",{id:"beforeOnChangeSingle"},[t("option",{value:"value1"},"Value 1"),t("option",{value:"value2"},"Value 2"),t("option",{value:"value3"},"Value 3")],-1),C=t("br",null,null,-1),B=t("br",null,null,-1),O={key:1},D=r(`<select id="beforeOnChangeMultiple" multiple><option value="value1" selected>Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></select><pre>        <code class="language-javascript">
          new SlimSelect({
            select: &#39;#beforeOnChange&#39;,
            beforeOnChange: (info) =&gt; {
              console.log(info)
              return false // this will stop propagation
            }
          })
        </code>
      </pre>`,2),j={class:"content"},_=t("h2",{class:"header"},"onChange",-1),H=t("p",null," onChange will trigger a callback after the value of the select dropdown has changed. ",-1),L={key:0},A=t("select",{id:"onChangeSingle"},[t("option",{value:"value1"},"Value 1"),t("option",{value:"value2"},"Value 2"),t("option",{value:"value3"},"Value 3")],-1),k=t("br",null,null,-1),I=t("br",null,null,-1),F={key:1},P=r(`<select id="onChangeMultiple" multiple><option value="value1" selected>Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></select><pre>        <code class="language-javascript">
          new SlimSelect({
            select: &#39;#onChange&#39;,
            onChange: (info) =&gt; {
              console.log(info)
            }
          })
        </code>
      </pre>`,2),G=r(`<div class="content"><h2 class="header">showOptionTooltips</h2><p> showOptionTooltips option is used to active displaying the on-hover tooltips for select options. The tooltip text is equal to the option text content. </p><select id="showOptionTooltips"><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></select><pre>        <code class="language-javascript">
          new SlimSelect({
            select: &#39;#showOptionTooltips&#39;,
            showOptionTooltips: true
          })
        </code>
      </pre></div><div class="content"><h2 class="header">selectByGroup</h2><p> selectByGroup option is used to enable the selection of all options under a specific group by clicking that option group&#39;s label. </p><select id="selectByGroup" multiple><optgroup label="Label 1"><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></optgroup></select><pre>        <code class="language-javascript">
          new SlimSelect({
            select: &#39;#selectByGroup&#39;,
            selectByGroup: true
          })
        </code>
      </pre></div><div class="content"><h2 class="header">searchFilter</h2><p> searchFilter option is used to replace the default matching algorithm. </p><p> See methods/setData for the proper object interface of <em>option</em>. </p><select id="searchFilter"><option value="apple">Apple</option><option value="orange">Orange</option><option value="pineapple">Pineapple</option></select><pre>        <code class="language-javascript">
          new SlimSelect({
            select: &#39;#searchFilter&#39;,
            // Exact case sensitive start of string match
            searchFilter: (option, search) =&gt; {
              return option.text.substr(0, search.length) === search
            }
          })
        </code>
      </pre></div><div class="content"><h2 class="header">hideSelectedOption</h2><p> hideSelectedOption option is used to hide the current selected option in the dropdown. </p><div class="set-content"><select id="hideSelectedOption"><option data-placeholder="true"></option><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></select><select id="hideSelectedOptionMultiple" multiple><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></select></div><pre>        <code class="language-javascript">
          new SlimSelect({
            select: &#39;.element .you #want&#39;,
            hideSelectedOption: true
          })
        </code>
      </pre><pre>        <code class="language-html">
          &lt;select id=&quot;hideSelectedOption&quot;&gt;
            &lt;option data-placeholder=&quot;true&quot;&gt;&lt;/option&gt;
            &lt;option value=&quot;value1&quot;&gt;Value 1&lt;/option&gt;
            &lt;option value=&quot;value2&quot;&gt;Value 2&lt;/option&gt;
            &lt;option value=&quot;value3&quot;&gt;Value 3&lt;/option&gt;
          &lt;/select&gt;

          &lt;select id=&quot;hideSelectedOptionMultiple&quot;&gt;
            &lt;option value=&quot;value1&quot;&gt;Value 1&lt;/option&gt;
            &lt;option value=&quot;value2&quot;&gt;Value 2&lt;/option&gt;
            &lt;option value=&quot;value3&quot;&gt;Value 3&lt;/option&gt;
          &lt;/select&gt;
        </code>
      </pre></div>`,4);function R(o,d,g,h,w,l){return s(),u("div",S,[b,t("div",q,[x,V,o.beforeOnChangeSingle?(s(),u("div",M,[t("strong",null,"Before on change: "+c(o.beforeOnChangeSingle),1)])):p("",!0),T,C,B,o.beforeOnChangeMultiple?(s(),u("div",O,[t("strong",null,"Before on change: "+c(o.beforeOnChangeMultiple),1)])):p("",!0),D]),t("div",j,[_,H,o.onChangeSingle?(s(),u("div",L,[t("strong",null,"On change: "+c(o.onChangeSingle),1)])):p("",!0),A,k,I,o.onChangeMultiple?(s(),u("div",F,[t("strong",null,"On change: "+c(o.onChangeMultiple),1)])):p("",!0),P]),G])}const N=y(f,[["render",R]]);export{N as default};
