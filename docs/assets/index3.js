import{d as i,S as o,_ as u,c as p,a as e,e as l,o as r,b as g,A as G,f as s,r as a}from"./index.js";const K=i({name:"AlwaysOpen",mounted(){new o({select:this.$refs.alwaysOpenSingle,settings:{alwaysOpen:!0,contentLocation:this.$refs.alwaysOpenSingleContent,contentPosition:"relative"}}),new o({select:this.$refs.alwaysOpenMultiple,settings:{alwaysOpen:!0,contentLocation:this.$refs.alwaysOpenMultipleContent,contentPosition:"relative"}})}}),W={id:"alwaysOpen",class:"content"},J={class:"row"},Y={style:{height:"auto"}},z={ref:"alwaysOpenSingle"},Q={ref:"alwaysOpenSingleContent"},X={style:{height:"auto"}},Z={ref:"alwaysOpenMultiple",multiple:""},ee={ref:"alwaysOpenMultipleContent"};function te(n,t,d,c,v,h){return r(),p("div",W,[t[2]||(t[2]=e("h2",{class:"header"},"alwaysOpen",-1)),t[3]||(t[3]=e("p",null," alwaysOpen option is used to keep the select open at all times. This is useful for when you want to display the options at all times. ",-1)),e("div",J,[e("div",Y,[e("select",z,[...t[0]||(t[0]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),e("div",Q,null,512)]),e("div",X,[e("select",Z,[...t[1]||(t[1]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1),e("option",{value:"value4"},"Value 4",-1)])],512),e("div",ee,null,512)])]),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            alwaysOpen: true,

            // In various situations it may be useful to set the contentLocation
            // to an element that will display best
            contentLocation: document.getElementById('local'), ,
            contentPosition: 'relative',
          }
        })
      `),l(`
    `)],-1)),t[5]||(t[5]=e("pre",null,[l("      "),e("code",{class:"language-html"},`
        <select id="selectElement">
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>

        <!-- The content will go in this div -->
        <div id="local"></div>
      `),l(`
    `)],-1))])}const le=u(K,[["render",te]]),oe=i({name:"Closable",mounted(){new o({select:this.$refs.closableSingle}),new o({select:this.$refs.closableMultiple})}}),ne={id:"closable",class:"content"},se={class:"row"},ae={ref:"closableSingle"},ie={ref:"closableMultiple",multiple:""};function ue(n,t,d,c,v,h){return r(),p("div",ne,[t[2]||(t[2]=g('<h2 class="header">closable</h2><p>closable is a optgroup settings that adds the ability to have closable optgroup options.</p><p>Values: <strong>&quot;off&quot;</strong> | <strong>&quot;open&quot;</strong> | <strong>&quot;close&quot;</strong></p><p>Default: <strong>&quot;off&quot;</strong></p><div class="alert info">You can set closable either by data or by html dataset added to the optgroup element</div>',5)),e("div",se,[e("select",ae,[...t[0]||(t[0]=[g('<optgroup label="Label 1" data-closable="off"><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></optgroup><optgroup label="Label 2" data-closable="open"><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option></optgroup><optgroup label="Label 3" data-closable="close"><option value="value7">Value 7</option><option value="value8">Value 8</option><option value="value9">Value 9</option></optgroup>',3)])],512),e("select",ie,[...t[1]||(t[1]=[g('<optgroup label="Label 1" data-selectall="true" data-closable="off"><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></optgroup><optgroup label="Label 2" data-selectall="true" data-closable="open"><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option></optgroup><optgroup label="Label 3" data-selectall="true" data-closable="close"><option value="value7">Value 7</option><option value="value8">Value 8</option><option value="value9">Value 9</option></optgroup>',3)])],512)]),t[3]||(t[3]=e("br",null,null,-1)),t[4]||(t[4]=e("h3",null,"Via data",-1)),t[5]||(t[5]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          data: [
            {
              label: 'Label 1',
              closable: 'off',
              options: [
                { text: 'Option 1', value: '1' },
                { text: 'Option 2', value: '2' },
                { text: 'Option 3', value: '3' },
              ],
            },
            {
              label: 'Label 2',
              closable: 'open',
              options: [
                { text: 'Option 4', value: '4' },
                { text: 'Option 5', value: '5' },
                { text: 'Option 6', value: '6' },
              ],
            },
            {
              label: 'Label 3',
              closable: 'close',
              options: [
                { text: 'Option 7', value: '7' },
                { text: 'Option 8', value: '8' },
                { text: 'Option 9', value: '9' },
              ],
            },
          ],
        })
      `),l(`
    `)],-1)),t[6]||(t[6]=e("br",null,null,-1)),t[7]||(t[7]=e("h3",null,"Via html",-1)),t[8]||(t[8]=e("pre",null,[l("      "),e("code",{class:"language-html"},`
        <select ref="closable" multiple>
          <optgroup label="Label 1" data-closable="off">
            <option value="value1">Value 1</option>
            <option value="value2">Value 2</option>
            <option value="value3">Value 3</option>
          </optgroup>
          <optgroup label="Label 2" data-closable="open">
            <option value="value4">Value 4</option>
            <option value="value5">Value 5</option>
            <option value="value6">Value 6</option>
          </optgroup>
          <optgroup label="Label 3" data-closable="close">
            <option value="value7">Value 7</option>
            <option value="value8">Value 8</option>
            <option value="value9">Value 9</option>
          </optgroup>
        </select>
      `),l(`
    `)],-1))])}const pe=u(oe,[["render",ue]]),re=i({name:"CloseOnSelect",mounted(){new o({select:this.$refs.closeOnSelectSingle,settings:{closeOnSelect:!1}}),new o({select:this.$refs.closeOnSelectMultiple,settings:{closeOnSelect:!1}})}}),de={id:"closeOnSelect",class:"content"},ce={class:"row"},ve={ref:"closeOnSelectSingle"},he={ref:"closeOnSelectMultiple",multiple:""};function me(n,t,d,c,v,h){return r(),p("div",de,[t[2]||(t[2]=e("h2",{class:"header"},"closeOnSelect",-1)),t[3]||(t[3]=e("p",null," closeOnSelect is a boolean value in which determines whether or not to close the content area upon selecting a value. ",-1)),e("div",ce,[e("select",ve,[...t[0]||(t[0]=[g('<option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option><optgroup label="Super Values"><option value="value11">Value 1</option><option value="value22">Value 2</option><option value="value33">Value 3</option></optgroup>',4)])],512),e("select",he,[...t[1]||(t[1]=[g('<option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option><optgroup label="Super Values"><option value="value11">Value 1</option><option value="value22">Value 2</option><option value="value33">Value 3</option></optgroup>',4)])],512)]),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#search',
          settings: {
            closeOnSelect: false,
          },
        })
      `),l(`
    `)],-1))])}const ge=u(re,[["render",me]]),fe=i({name:"ContentLocation",mounted(){new o({select:this.$refs.contentLocation,settings:{contentLocation:this.$refs.local}})}}),$e={id:"contentLocation",class:"content"},we={class:"row"},Se={ref:"contentLocation",style:{width:"50%"}},Ve={ref:"local"};function be(n,t,d,c,v,h){return r(),p("div",$e,[t[1]||(t[1]=e("h2",{class:"header"},"contentLocation",-1)),t[2]||(t[2]=e("p",null," contentLocation will allow you to set the location of where the content section of slim select. By default every content div is appended to the body. ",-1)),t[3]||(t[3]=e("p",null," The content container is the bottom half of slim select. This includes the search input field and available options ",-1)),e("div",we,[e("select",Se,[...t[0]||(t[0]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),e("div",Ve,null,512)]),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            contentLocation: document.getElementById('local')
          }
        })
      `),l(`
    `)],-1)),t[5]||(t[5]=e("pre",null,[l("      "),e("code",{class:"language-html"},`
        <select id="contentLocation">
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>

        <!-- The content will go in this div -->
        <div id="local"></div>
      `),l(`
    `)],-1))])}const ye=u(fe,[["render",be]]),xe=i({name:"ContentPosition",mounted(){new o({select:this.$refs.contentPositionRelative,settings:{contentPosition:"relative",contentLocation:this.$refs.contentPositionRelativeContent}}),new o({select:this.$refs.contentPositionAbsolute,settings:{contentPosition:"absolute"}}),new o({select:this.$refs.contentPositionFixed,settings:{contentPosition:"fixed"}})}}),_e={id:"contentPosition",class:"content"},Oe={class:"row"},De={ref:"contentPositionRelative",class:"relative"},Me={ref:"contentPositionRelativeContent"},Ce={ref:"contentPositionAbsolute",class:"absolute"},Te={class:"row"},Pe={ref:"contentPositionFixed",class:"fixed"};function Be(n,t,d,c,v,h){return r(),p("div",_e,[t[3]||(t[3]=e("h2",{class:"header"},"contentPosition",-1)),t[4]||(t[4]=e("p",null,[l("contentPosition will set the css position to relative, absolute or fixed. Default is "),e("b",null,"'absolute'")],-1)),t[5]||(t[5]=e("div",{class:"alert info"}," If you do use relative position be sure to set the contentLocation to an element that will work best for your use case. Otherwise SlimSelect will add you content to the body of the html. See example usage below. ",-1)),t[6]||(t[6]=e("div",{class:"alert info"}," Fixed was added to address issues with fixed positioning in modals and other elements that have fixed positioning. ",-1)),e("div",Oe,[e("select",De,[...t[0]||(t[0]=[e("option",{"data-placeholder":"true"},"Relative",-1),e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),e("div",Me,null,512),e("select",Ce,[...t[1]||(t[1]=[e("option",{"data-placeholder":"true"},"Absolute",-1),e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512)]),e("div",Te,[e("select",Pe,[...t[2]||(t[2]=[e("option",{"data-placeholder":"true"},"Fixed",-1),e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512)]),t[7]||(t[7]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            contentPosition: 'relative' // 'absolute', 'relative' or 'fixed'

            // To help with relative positioning 
            // you can set the contentLocation
            contentLocation: document.getElementById('local')
          }
        })
      `),l(`
    `)],-1))])}const Le=u(xe,[["render",Be]]),Ae=i({name:"Css",mounted(){new o({select:this.$refs.selectClass}),new o({select:this.$refs.optionClass})}}),He={id:"cssClass",class:"content"},Ee={class:"row"},je={ref:"selectClass",class:"select-class"},ke={ref:"optionClass",class:"option-class"};function qe(n,t,d,c,v,h){return r(),p("div",He,[t[2]||(t[2]=e("h2",{class:"header"},"css class",-1)),t[3]||(t[3]=e("p",null," Slim select will inherit any classes that were added to the original select element. This includes options as well. ",-1)),e("div",Ee,[e("select",je,[...t[0]||(t[0]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),e("select",ke,[...t[1]||(t[1]=[e("option",{class:"red",value:"value1"},"Red",-1),e("option",{class:"green",value:"value2"},"Green",-1),e("option",{class:"blue",value:"value3"},"Blue",-1)])],512)]),t[4]||(t[4]=e("pre",null,[l("        "),e("code",{class:"language-html"},`
          <select id="select-class" class="classItems">
            <option class="red" value="value1">Value 1</option>
            <option class="green" value="value2">Value 2</option>
            <option class="blue" value="value3">Value 3</option>
          </select>
        `),l(`
      `)],-1))])}const Re=u(Ae,[["render",qe]]),Ue=i({name:"CustomCss",mounted(){new o({select:this.$refs.mainSelect,cssClasses:{option:"primary-option"}}),new o({select:this.$refs.secondarySelect,cssClasses:{option:"secondary-option"}})}}),Ie={id:"cssClasses",class:"content"},Fe={class:"row"},Ne={ref:"mainSelect"},Ge={ref:"secondarySelect"};function Ke(n,t,d,c,v,h){return r(),p("div",Ie,[t[2]||(t[2]=e("h2",{class:"header"},"cssClasses",-1)),t[3]||(t[3]=e("p",null,"You can override the default CSS classes by setting them during initialization.",-1)),e("div",Fe,[e("select",Ne,[...t[0]||(t[0]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),e("select",Ge,[...t[1]||(t[1]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512)]),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-html"},`
        <select id="primary-select">
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      `),l(`
    `)],-1)),t[5]||(t[5]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#primary-select',
          cssClasses: {
            option: "primary-option" 
        })
      `),l(`
    `)],-1))])}const We=u(Ue,[["render",Ke]]),Je=i({name:"DataAttributes",mounted(){new o({select:this.$refs.optionsSingle}),new o({select:this.$refs.optionsMultiple})}}),Ye={id:"dataAttributes",class:"content"},ze={class:"row"},Qe={ref:"optionsSingle"},Xe={ref:"optionsMultiple",multiple:""};function Ze(n,t,d,c,v,h){return r(),p("div",Ye,[t[2]||(t[2]=e("h2",{class:"header"},"Data Attributes",-1)),t[3]||(t[3]=e("p",null," Slim select will take on attributes of the original as best as possible. Below are example usages of attributes added to the underlining select options that slim select picked up and used ",-1)),e("div",ze,[e("select",Qe,[...t[0]||(t[0]=[g('<option data-placeholder="true"></option><option value="value1" data-info="Here is info">Data Attributes</option><option value="value2" disabled>Disabled Option</option><option value="value3" class="green">Class Green</option><option value="value4" style="color:purple;">Inline Style</option>',5)])],512),e("select",Xe,[...t[1]||(t[1]=[e("option",{value:"value1","data-info":"Here is info"},"Data Attributes",-1),e("option",{value:"value2",disabled:""},"Disabled Option",-1),e("option",{value:"value3",class:"green"},"Class Green",-1),e("option",{value:"value4",style:{color:"purple"}},"Inline Style",-1)])],512)])])}const et=u(Je,[["render",Ze]]),tt=i({name:"Deselect",mounted(){new o({select:this.$refs.allowDeselectSingle,settings:{allowDeselect:!0}}),new o({select:this.$refs.allowDeselectMultiple,settings:{allowDeselect:!0}})}}),lt={id:"allowDeselect",class:"content"},ot={class:"row"},nt={ref:"allowDeselectSingle"},st={ref:"allowDeselectMultiple",multiple:""};function at(n,t,d,c,v,h){return r(),p("div",lt,[t[2]||(t[2]=e("h2",{class:"header"},"allowDeselect",-1)),t[3]||(t[3]=e("p",null,"This will allow you to deselect a value on a single/multiple select dropdown.",-1)),t[4]||(t[4]=e("p",null,"Be sure to have an empty option data placeholder so slim select has an empty string value to select.",-1)),e("div",ot,[e("select",nt,[...t[0]||(t[0]=[e("option",{"data-placeholder":"true"},null,-1),e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),e("select",st,[...t[1]||(t[1]=[e("option",{"data-placeholder":"true"},null,-1),e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512)]),t[5]||(t[5]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            allowDeselect: true
          }
        })
      `),l(`
    `)],-1)),t[6]||(t[6]=e("pre",null,[l("      "),e("code",{class:"language-html"},`
        <!-- Requires emtpy data-placeholder option -->
        <select id="allowDeselect">
          <option data-placeholder="true"></option>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      `),l(`
    `)],-1))])}const it=u(tt,[["render",at]]),ut=i({name:"Disabled",mounted(){new o({select:this.$refs.disabledSingle,settings:{disabled:!0}}),new o({select:this.$refs.disabledMultiple}),new o({select:this.$refs.disabledOptionSingle,data:[{text:"Option 1",value:"option1"},{text:"Option 2",value:"option2",disabled:!0},{text:"Option 3",value:"option3"}]}),new o({select:this.$refs.disabledOptionMultiple}),new o({select:this.$refs.disabledDynamicSingle}).select.showUI()},methods:{enableDisableDynamic(){const n=this.$refs.disabledDynamicSingle;n&&(n.disabled=!n.disabled)}}}),pt={id:"disabled",class:"content"},rt={class:"row"},dt={ref:"disabledSingle"},ct={ref:"disabledMultiple",multiple:"",disabled:""},vt={class:"row"},ht={ref:"disabledOptionSingle"},mt={ref:"disabledOptionMultiple",multiple:""},gt={class:"row"},ft={ref:"disabledDynamicSingle"};function $t(n,t,d,c,v,h){return r(),p("div",pt,[t[6]||(t[6]=e("h2",{class:"header"},"disabled",-1)),t[7]||(t[7]=e("p",null,"Allows the ability to disable the select dropdown as well as individual options",-1)),t[8]||(t[8]=e("div",{class:"alert info"},"Methods also are provided to enable and disable SlimSelect via method call.",-1)),e("div",rt,[e("select",dt,[...t[1]||(t[1]=[e("option",{value:"value1",selected:""},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),e("select",ct,[...t[2]||(t[2]=[e("option",{value:"value1",selected:""},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512)]),t[9]||(t[9]=e("br",null,null,-1)),e("div",vt,[e("select",ht,[...t[3]||(t[3]=[e("option",{value:"value1",selected:""},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),e("select",mt,[...t[4]||(t[4]=[e("option",{value:"value1",selected:""},"Value 1",-1),e("option",{value:"value2",disabled:""},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512)]),t[10]||(t[10]=e("br",null,null,-1)),e("div",gt,[e("div",{class:"btn",onClick:t[0]||(t[0]=(...f)=>n.enableDisableDynamic&&n.enableDisableDynamic(...f))},"Enable/Disable Original Select"),e("select",ft,[...t[5]||(t[5]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512)]),t[11]||(t[11]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        // Disable via settings
        new SlimSelect({
          select: '#selectElement',
          settings: {
            disabled: true,
          },
        })

        // Disable via disabled html attribute
        new SlimSelect({
          select: '#selectElement',
        })
      `),l(`
    `)],-1)),t[12]||(t[12]=e("pre",null,[l("      "),e("code",{class:"language-html"},`
        <select id="selectElement">
          <option value="value1" selected>Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>

        <select id="selectElement" multiple disabled>
          <option value="value1" selected>Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      `),l(`
    `)],-1))])}const wt=u(ut,[["render",$t]]),St=i({name:"Display",mounted(){const n=new o({select:this.$refs.selectdisplay}),t=[{value:"value1",text:"Value 1",display:!1},{value:"value2",text:"Value 2"},{value:"value3",text:"Value 3"}];n.setData(t),n.setSelected(["value1","value3"]),new o({select:this.$refs.selectdisplay2})}}),Vt={id:"display",class:"content"},bt={class:"row"},yt={ref:"selectdisplay",multiple:""},xt={class:"row"},_t={ref:"selectdisplay2",multiple:""};function Ot(n,t,d,c,v,h){return r(),p("div",Vt,[t[1]||(t[1]=e("h2",{class:"header"},"display",-1)),t[2]||(t[2]=e("p",null,"Allows to hide elements of selected values.",-1)),e("div",bt,[e("select",yt,null,512)]),t[3]||(t[3]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        const displaySelect = new SlimSelect({
          select: '#selectElement'
        })

        const displayData = [
          { value: 'value1', text: 'Value 1', display: false },
          { value: 'value2', text: 'Value 2' },
          { value: 'value3', text: 'Value 3' },
        ]

        displaySelect.setData(displayData)
        displaySelect.set(['value1', 'value3'])
      `),l(`
    `)],-1)),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-html"},`
        <select id="selectMultiMandatory" multiple></select>
      `),l(`
    `)],-1)),t[5]||(t[5]=e("p",null,"Or",-1)),e("div",xt,[e("select",_t,[...t[0]||(t[0]=[e("option",{value:"value1",style:{display:"none"},selected:""},"Value 1",-1),e("option",{value:"value2",selected:""},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512)]),t[6]||(t[6]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        const slim = new SlimSelect({
          select: '#selectElement'
        });
      `),l(`
    `)],-1)),t[7]||(t[7]=e("pre",null,[l("      "),e("code",{class:"language-html"},`
        <select id="selectdisplay2" multiple>
          <option value="value1" style="display: none;" selected>Value 1</option>
          <option value="value2" selected>Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      `),l(`
    `)],-1))])}const Dt=u(St,[["render",Ot]]),Mt=i({name:"HideSelected",mounted(){new o({select:this.$refs.hideSelectedSingle,settings:{hideSelected:!0}}),new o({select:this.$refs.hideSelectedMultiple,settings:{hideSelected:!0}})}}),Ct={id:"hideSelected",class:"content"},Tt={class:"row"},Pt={ref:"hideSelectedSingle"},Bt={ref:"hideSelectedMultiple",multiple:""};function Lt(n,t,d,c,v,h){return r(),p("div",Ct,[t[2]||(t[2]=e("h2",{class:"header"},"hideSelected",-1)),t[3]||(t[3]=e("p",null,"hideSelected setting is used to hide the current selected option in the options dropdown.",-1)),e("div",Tt,[e("select",Pt,[...t[0]||(t[0]=[e("option",{"data-placeholder":"true"},null,-1),e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),e("select",Bt,[...t[1]||(t[1]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512)]),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            hideSelected: true,
          }
        })
      `),l(`
    `)],-1)),t[5]||(t[5]=e("pre",null,[l("      "),e("code",{class:"language-html"},`
        <select id="hideSelectedSingle">
          <option data-placeholder="true"></option>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>

        <select id="hideSelectedMultiple">
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      `),l(`
    `)],-1))])}const At=u(Mt,[["render",Lt]]),Ht=i({name:"Html",mounted(){new o({select:this.$refs.htmlSingle,settings:{searchHighlight:!0},data:[{html:"<b>Bold Text</b>",text:"Bold Text",value:"bold text"},{html:'<div style="border: solid 1px #666666;">Border</div>',text:"Border",value:"border"},{html:"<i>Slim Select is awesome</i>",text:"Slim Select is awesome"}]}),new o({select:this.$refs.htmlMulti,settings:{searchHighlight:!0}})}}),Et={id:"html",class:"content"},jt={class:"row"},kt={ref:"htmlSingle"},qt={ref:"htmlMulti",multiple:""};function Rt(n,t,d,c,v,h){return r(),p("div",Et,[t[1]||(t[1]=e("h2",{class:"header"},"html",-1)),t[2]||(t[2]=e("p",null," Slim select has the ability to set custom html for the selected values and options dropdown. By default if the html field is set it will use that for the selected values and the options dropdown. For a multiple select selected values it will always use the text field. ",-1)),e("div",jt,[e("select",kt,null,512),e("select",qt,[...t[0]||(t[0]=[e("option",{value:"bold text","data-html":"<b>Bold Text</b>"},"Bold Text",-1),e("option",{value:"border","data-html":"<div style='border: solid 1px #666666;'>Border</div>"},"Border",-1),e("option",{value:"slim select","data-html":"<i>Slim Select is awesome</i>"},"Slim Select is awesome",-1)])],512)]),t[3]||(t[3]=e("h3",null,"Via data",-1)),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        var select = new SlimSelect({
          select: '#selectElement',
          data: [
            {html: '<b>Bold Text</b>', text: 'Bold Text', value: 'bold text'},
            {html: '<div style="border: solid 1px #666666;">Border</div>', text: 'Border', value: 'border'},
            {html: '<i>Slim Select is awesome</i>', text: 'Slim Select is awesome'}
          ]
        })
      `),l(`
    `)],-1)),t[5]||(t[5]=e("h3",null,"Via data attribute",-1)),t[6]||(t[6]=e("pre",null,[l("      "),e("code",{class:"language-html"},`
        <select id="selectElement">
          <option value="bold text" data-html="<b>Bold Text</b>">Bold Text</option>
          <option value="border" data-html="<div style="border: solid 1px #666666;">Border</div>">Border</option>
          <option value="slim select" data-html="<i>Slim Select is awesome</i>">Slim Select awesome</option>
        </select>
      `),l(`
    `)],-1))])}const Ut=u(Ht,[["render",Rt]]),It=i({name:"KeepOrder",mounted(){new o({select:this.$refs.keepOrder,settings:{keepOrder:!0}})}}),Ft={id:"keepOrder",class:"content"},Nt={class:"row"},Gt={ref:"keepOrder",multiple:""};function Kt(n,t,d,c,v,h){return r(),p("div",Ft,[t[1]||(t[1]=g('<h2 class="header">keepOrder</h2><p><code>keepOrder</code> controls the order returned by <code>getSelected()</code> in multi-select mode.</p><div class="alert"><p><strong>Important:</strong> This maintains <strong>selection order</strong> (the order you clicked), NOT DOM order! </p></div><p><strong>When false (default):</strong> Returns options in DOM order (how they appear in the HTML)</p><p><strong>When true:</strong> Returns options in the order they were clicked/selected by the user</p><h3>Example:</h3><p>If you have options: Apple, Banana, Cherry</p><ul><li>You click: Cherry → Apple → Banana</li><li><code>keepOrder: false</code> → returns <code>[&#39;Apple&#39;, &#39;Banana&#39;, &#39;Cherry&#39;]</code> (DOM order)</li><li><code>keepOrder: true</code> → returns <code>[&#39;Cherry&#39;, &#39;Apple&#39;, &#39;Banana&#39;]</code> (click order)</li></ul><p>Values: <strong>true</strong> | <strong>false</strong></p><p>Default: <strong>false</strong></p>',10)),e("div",Nt,[e("select",Gt,[...t[0]||(t[0]=[g('<option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option><optgroup label="Label 1"><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option></optgroup><optgroup label="Label 2"><option value="value7">Value 7</option><option value="value8">Value 8</option><option value="value9">Value 9</option></optgroup>',5)])],512)]),t[2]||(t[2]=e("br",null,null,-1)),t[3]||(t[3]=e("h3",null,"Via html",-1)),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-html"},`
        <select ref="closable" multiple>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
          <optgroup label="Label 1">
            <option value="value4">Value 4</option>
            <option value="value5">Value 5</option>
            <option value="value6">Value 6</option>
          </optgroup>
          <optgroup label="Label 2">
            <option value="value7">Value 7</option>
            <option value="value8">Value 8</option>
            <option value="value9">Value 9</option>
          </optgroup>
        </select>
      `),l(`
    `)],-1))])}const Wt=u(It,[["render",Kt]]),Jt=i({name:"Mandatory",mounted(){const n=new o({select:this.$refs.selectMultiMandatory}),t=[{value:"value1",text:"Value 1",mandatory:!0},{value:"value2",text:"Value 2"},{value:"value3",text:"Value 3"}];n.setData(t),n.setSelected(["value1","value3"]),new o({select:this.$refs.selectMultiMandatory2})}}),Yt={id:"mandatory",class:"content"},zt={class:"row"},Qt={ref:"selectMultiMandatory",multiple:""},Xt={class:"row"},Zt={ref:"selectMultiMandatory2",multiple:""};function el(n,t,d,c,v,h){return r(),p("div",Yt,[t[1]||(t[1]=e("h2",{class:"header"},"mandatory",-1)),t[2]||(t[2]=e("p",null," When using multi select you can set a mandatory on the option to prevent capability to deselect particular option. Note options with mandatory flag is not selected by default, you need select them yourselfs. ",-1)),e("div",zt,[e("select",Qt,null,512)]),t[3]||(t[3]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        const slim = new SlimSelect({
          select: '#selectElement'
        });

        const data = [
          { value: 'value1', text: 'Value 1', mandatory: true },
          { value: 'value2', text: 'Value 2' },
          { value: 'value3', text: 'Value 3' },
        ]

        slim.setData(data)
        slim.set(["value1", "value3"])
      `),l(`
    `)],-1)),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-html"},`
        <select id="selectMultiMandatory" multiple></select>
      `),l(`
    `)],-1)),t[5]||(t[5]=e("p",null,"Or",-1)),e("div",Xt,[e("select",Zt,[...t[0]||(t[0]=[e("option",{value:"value1","data-mandatory":"true",selected:""},"Value 1",-1),e("option",{value:"value2",selected:""},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512)]),t[6]||(t[6]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        const slim = new SlimSelect({
          select: '#selectElement'
        });
      `),l(`
    `)],-1)),t[7]||(t[7]=e("pre",null,[l("      "),e("code",{class:"language-html"},`
        <select id="selectMultiMandatory" multiple>
          <option value="value1" data-mandatory="true" selected>Value 1</option>
          <option value="value2" selected>Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      `),l(`
    `)],-1))])}const tl=u(Jt,[["render",el]]),ll=i({name:"MaxValuesShown",mounted(){new o({select:this.$refs.maxValuesShown,settings:{maxValuesShown:5,maxValuesMessage:"{number} selected",allowDeselect:!0}})}}),ol={id:"maxValuesShown",class:"content"},nl={class:"row"},sl={ref:"maxValuesShown",multiple:""};function al(n,t,d,c,v,h){return r(),p("div",ol,[t[1]||(t[1]=e("h2",{class:"header"},"maxValuesShown",-1)),t[2]||(t[2]=e("p",null," When using multiselect you can set a threshold so when selecting more items than the input value, the items will not display as values, but the 'n selected' will be displayed. The text that will be displayed can be customized with the use of '{number}' in the maxValuesMessage setting. ",-1)),t[3]||(t[3]=e("p",null,[e("strong",null,"Default:"),l(" 20")],-1)),e("div",nl,[e("select",sl,[...t[0]||(t[0]=[g('<option value="value1" selected>Value 1</option><option value="value2" selected>Value 2</option><option value="value3" selected>Value 3</option><option value="value4" selected>Value 4</option><option value="value5" selected>Value 5</option><option value="value6" selected>Value 6</option><option value="value7">Value 7</option><option value="value8">Value 8</option>',8)])],512)]),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            maxValuesShown: 5, // Default 20
            maxValuesMessage: '{number} values selected', // Default '{number} selected'
          },
        });
      `),l(`
    `)],-1)),t[5]||(t[5]=e("pre",null,[l("      "),e("code",{class:"language-html"},`
        <select id="maxValuesShown" multiple>
          <option value="value1" selected>Value 1</option>
          <option value="value2" selected>Value 2</option>
          <option value="value3" selected>Value 3</option>
          <option value="value4" selected>Value 4</option>
          <option value="value5" selected>Value 5</option>
          <option value="value6">Value 6</option>
          <option value="value7">Value 7</option>
          <option value="value8">Value 8</option>
        </select>
      `),l(`
    `)],-1))])}const il=u(ll,[["render",al]]),ul=i({name:"MinMax",mounted(){new o({select:this.$refs.selectMultiMax,settings:{allowDeselect:!0,closeOnSelect:!1,minSelected:2,maxSelected:5},events:{addable:n=>n}})}}),pl={id:"minmax",class:"content"},rl={class:"row"},dl={ref:"selectMultiMax",multiple:""};function cl(n,t,d,c,v,h){return r(),p("div",pl,[t[1]||(t[1]=e("h2",{class:"header"},"Min/Max Selected",-1)),t[2]||(t[2]=e("p",null,"When using multi select you can set a min and/or max on the amount of selections you can have.",-1)),e("div",rl,[e("select",dl,[...t[0]||(t[0]=[g('<option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option>',6)])],512)]),t[3]||(t[3]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        let slim = new SlimSelect({
          select: '#selectElement',
          settings: {
            minSelected: 2,
            maxSelected: 5,
          },
        })
      `),l(`
    `)],-1)),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-html"},`
        <select id="selectMultiMax" multiple>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
          <option value="value4">Value 4</option>
          <option value="value5">Value 5</option>
          <option value="value6">Value 6</option>
        </select>
      `),l(`
    `)],-1))])}const vl=u(ul,[["render",cl]]),hl=i({name:"OpenPosition",mounted(){new o({select:this.$refs.openPositionUp,settings:{openPosition:"up"}}),new o({select:this.$refs.openPositionDown,settings:{openPosition:"down"}})}}),ml={id:"openPosition",class:"content"},gl={class:"row"},fl={ref:"openPositionUp"},$l={ref:"openPositionDown"};function wl(n,t,d,c,v,h){return r(),p("div",ml,[t[2]||(t[2]=e("h2",{class:"header"},"openPosition",-1)),t[3]||(t[3]=e("p",null," openPosition is a string value that will decide where to show your content when it comes out. By default slim select will try to put the content where it can without going off screen. But you may want to always show it in one direction. ",-1)),t[4]||(t[4]=e("p",null,[l("Possible Options: "),e("b",null,"'auto', 'up' or 'down'"),l(". Default is "),e("b",null,"'auto'")],-1)),e("div",gl,[e("select",fl,[...t[0]||(t[0]=[e("option",{value:"up1"},"Up 1",-1),e("option",{value:"up2"},"Up 2",-1),e("option",{value:"up3"},"Up 3",-1)])],512),e("select",$l,[...t[1]||(t[1]=[e("option",{value:"down1"},"Down 1",-1),e("option",{value:"down2"},"Down 2",-1),e("option",{value:"down3"},"Down 3",-1)])],512)]),t[5]||(t[5]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            openPosition: 'auto' // 'auto', 'up' or 'down'
          }
        })
      `),l(`
    `)],-1))])}const Sl=u(hl,[["render",wl]]),Vl=i({name:"Placeholder",mounted(){new o({select:this.$refs.placeholderSingle,settings:{placeholderText:"Custom Placeholder Text"}}),new o({select:this.$refs.placeholderMultiple,settings:{placeholderText:"Make Selection"}}),new o({select:this.$refs.placeholderNone,settings:{placeholderText:""}})}}),bl={id:"placeholder",class:"content"},yl={class:"row"},xl={ref:"placeholderSingle"},_l={ref:"placeholderMultiple",multiple:""},Ol={ref:"placeholderNone"};function Dl(n,t,d,c,v,h){return r(),p("div",bl,[t[3]||(t[3]=e("h2",{class:"header"},"placeholderText",-1)),t[4]||(t[4]=e("p",null,' Placeholders consists of setting the placeholder option value. The only difference is single selects require an empty option with data-placeholder set to true. Default value is "Select Value". ',-1)),t[5]||(t[5]=e("div",{class:"alert info"}," Notice you can also set placeholder to empty if that is what you would like to do as well. ",-1)),e("div",yl,[e("select",xl,[...t[0]||(t[0]=[e("option",{"data-placeholder":"true"},null,-1),e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),e("select",_l,[...t[1]||(t[1]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),e("select",Ol,[...t[2]||(t[2]=[e("option",{"data-placeholder":"true"},null,-1),e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512)]),t[6]||(t[6]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#placeholder',
          settings: {
            placeholderText: 'Custom Placeholder Text',
          }
        })
      `),l(`
    `)],-1)),t[7]||(t[7]=e("pre",null,[l("      "),e("code",{class:"language-html"},`
        <!-- Set empty option with data-placeholder if you to have placeholder -->
        <!-- text for single select, otherwise first option will be selected -->
        <select id="placeholderSingle">
          <option data-placeholder="true"></option>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      `),l(`
    `)],-1))])}const Ml=u(Vl,[["render",Dl]]),Cl=i({name:"ShowSearch",mounted(){new o({select:this.$refs.showSearchSingle,settings:{showSearch:!1}}),new o({select:this.$refs.showSearchMulti,settings:{showSearch:!1}})}}),Tl={id:"showSearch",class:"content"},Pl={class:"row",style:{padding:"0 0 var(--spacing-half) 0"}},Bl={ref:"showSearchSingle"},Ll={class:"row"},Al={ref:"showSearchMulti",multiple:""};function Hl(n,t,d,c,v,h){return r(),p("div",Tl,[t[2]||(t[2]=e("h2",{class:"header"},"showSearch",-1)),t[3]||(t[3]=e("p",null,[e("b",null,"showSearch"),l(" - is a boolean value that will decide whether or not to show the search input. Default is true. ")],-1)),e("div",Pl,[e("select",Bl,[...t[0]||(t[0]=[e("option",{value:"dog"},"Dog",-1),e("option",{value:"cat"},"Cat",-1),e("option",{value:"bird"},"Bird",-1)])],512)]),e("div",Ll,[e("select",Al,[...t[1]||(t[1]=[e("option",{value:"dog"},"Dog",-1),e("option",{value:"cat"},"Cat",-1),e("option",{value:"bird"},"Bird",-1)])],512)]),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            showSearch: false
          }
        })
      `),l(`
    `)],-1))])}const El=u(Cl,[["render",Hl]]),jl=i({name:"FocusSearch",mounted(){new o({select:this.$refs.focusSearchSingle,settings:{focusSearch:!1}}),new o({select:this.$refs.focusSearchMulti,settings:{focusSearch:!1}})}}),kl={id:"focusSearch",class:"content"},ql={class:"row",style:{padding:"0 0 var(--spacing-half) 0"}},Rl={ref:"focusSearchSingle"},Ul={class:"row"},Il={ref:"focusSearchMulti",multiple:""};function Fl(n,t,d,c,v,h){return r(),p("div",kl,[t[2]||(t[2]=e("h2",{class:"header"},"focusSearch",-1)),t[3]||(t[3]=e("p",null," Boolean value that will decide whether or not to automatically focus on the search input when the dropdown opens. Default is true. ",-1)),e("div",ql,[e("select",Rl,[...t[0]||(t[0]=[e("option",{value:"dog"},"Dog",-1),e("option",{value:"cat"},"Cat",-1),e("option",{value:"bird"},"Bird",-1)])],512)]),e("div",Ul,[e("select",Il,[...t[1]||(t[1]=[e("option",{value:"dog"},"Dog",-1),e("option",{value:"cat"},"Cat",-1),e("option",{value:"bird"},"Bird",-1)])],512)]),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            focusSearch: false
          }
        })
      `),l(`
    `)],-1))])}const Nl=u(jl,[["render",Fl]]),Gl=i({name:"SearchText",mounted(){new o({select:this.$refs.searchTextSingle,settings:{searchText:"Sorry, nothing to see here"}}),new o({select:this.$refs.searchTextMulti,settings:{searchText:"Sorry nothing to see here"}})}}),Kl={id:"searchText",class:"content"},Wl={class:"row",style:{padding:"0 0 var(--spacing-half) 0"}},Jl={ref:"searchTextSingle"},Yl={class:"row"},zl={ref:"searchTextMulti",multiple:""};function Ql(n,t,d,c,v,h){return r(),p("div",Kl,[t[2]||(t[2]=e("h2",{class:"header"},"searchText",-1)),t[3]||(t[3]=e("p",null,"String value that will show in the event there are no search results. Default is 'No Results'.",-1)),e("div",Wl,[e("select",Jl,[...t[0]||(t[0]=[e("option",{value:"dog"},"Dog",-1),e("option",{value:"cat"},"Cat",-1),e("option",{value:"bird"},"Bird",-1)])],512)]),e("div",Yl,[e("select",zl,[...t[1]||(t[1]=[e("option",{value:"dog"},"Dog",-1),e("option",{value:"cat"},"Cat",-1),e("option",{value:"bird"},"Bird",-1)])],512)]),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            searchText: 'Sorry, nothing to see here'
          }
        })
      `),l(`
    `)],-1))])}const Xl=u(Gl,[["render",Ql]]),Zl=i({name:"SearchPlaceholder",mounted(){new o({select:this.$refs.searchPlaceholderSingle,settings:{searchPlaceholder:"Search for the good stuff!"}}),new o({select:this.$refs.searchPlaceholderMulti,settings:{searchPlaceholder:"Search for the good stuff!"}})}}),eo={id:"searchPlaceholder",class:"content"},to={class:"row",style:{padding:"0 0 var(--spacing-half) 0"}},lo={ref:"searchPlaceholderSingle"},oo={class:"row"},no={ref:"searchPlaceholderMulti",multiple:""};function so(n,t,d,c,v,h){return r(),p("div",eo,[t[2]||(t[2]=e("h2",{class:"header"},"searchPlaceholder",-1)),t[3]||(t[3]=e("p",null,"String value that will set the placeholder text of the search input. Default is 'Search'.",-1)),e("div",to,[e("select",lo,[...t[0]||(t[0]=[e("option",{value:"dog"},"Dog",-1),e("option",{value:"cat"},"Cat",-1),e("option",{value:"bird"},"Bird",-1)])],512)]),e("div",oo,[e("select",no,[...t[1]||(t[1]=[e("option",{value:"dog"},"Dog",-1),e("option",{value:"cat"},"Cat",-1),e("option",{value:"bird"},"Bird",-1)])],512)]),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            searchPlaceholder: 'Search for the good stuff!'
          }
        })
      `),l(`
    `)],-1))])}const ao=u(Zl,[["render",so]]),io=i({name:"SearchHighlight",data(){return{htmlData:[{text:"United States",value:"US",html:'<span style="color: #e74c3c;">🇺🇸</span> United States'},{text:"Canada",value:"CA",html:'<span style="color: #3498db;">🇨🇦</span> Canada'},{text:"United Kingdom",value:"UK",html:'<span style="color: #9b59b6;">🇬🇧</span> United Kingdom'},{text:"Germany",value:"DE",html:'<span style="color: #f39c12;">🇩🇪</span> Germany'},{text:"France",value:"FR",html:'<span style="color: #1abc9c;">🇫🇷</span> France'},{text:"Japan",value:"JP",html:'<span style="color: #e67e22;">🇯🇵</span> Japan'},{text:"Australia",value:"AU",html:'<span style="color: #16a085;">🇦🇺</span> Australia'},{text:"Brazil",value:"BR",html:'<span style="color: #27ae60;">🇧🇷</span> Brazil'}]}},mounted(){new o({select:this.$refs.searchHighlightSingle,settings:{searchHighlight:!0}}),new o({select:this.$refs.searchHighlightMulti,settings:{searchHighlight:!0}}),new o({select:this.$refs.searchHighlightHtml,settings:{searchHighlight:!0},data:this.htmlData})}}),uo={id:"searchHighlight",class:"content"},po={class:"row",style:{padding:"0 0 var(--spacing-half) 0"}},ro={ref:"searchHighlightSingle"},co={class:"row",style:{padding:"0 0 var(--spacing-half) 0"}},vo={ref:"searchHighlightMulti",multiple:""},ho={class:"row",style:{padding:"0 0 var(--spacing-half) 0"}},mo={ref:"searchHighlightHtml"};function go(n,t,d,c,v,h){return r(),p("div",uo,[t[2]||(t[2]=e("h2",{class:"header"},"searchHighlight",-1)),t[3]||(t[3]=e("p",null,[l(" Boolean value that will highlight matching text in search results. Default is false. When enabled, matching text will be highlighted with a "),e("code",null,"<mark>"),l(" element. ")],-1)),e("div",po,[e("select",ro,[...t[0]||(t[0]=[g('<option value="javascript">JavaScript</option><option value="typescript">TypeScript</option><option value="python">Python</option><option value="java">Java</option><option value="csharp">C#</option><option value="cpp">C++</option><option value="ruby">Ruby</option><option value="php">PHP</option><option value="swift">Swift</option><option value="kotlin">Kotlin</option><option value="go">Go</option><option value="rust">Rust</option>',12)])],512)]),e("div",co,[e("select",vo,[...t[1]||(t[1]=[g('<option value="javascript">JavaScript</option><option value="typescript">TypeScript</option><option value="python">Python</option><option value="java">Java</option><option value="csharp">C#</option><option value="cpp">C++</option><option value="ruby">Ruby</option><option value="php">PHP</option><option value="swift">Swift</option><option value="kotlin">Kotlin</option><option value="go">Go</option><option value="rust">Rust</option>',12)])],512)]),t[4]||(t[4]=e("div",{class:"alert info"},[e("strong",null,"Tip:"),l(' Try searching for "script", "Type", or even special characters like "#" or "+" to see the highlighting in action. The feature safely escapes special characters to prevent HTML breaking. ')],-1)),t[5]||(t[5]=e("h3",null,"HTML Content with Search Highlighting",-1)),t[6]||(t[6]=e("p",null," When using HTML in options, search highlighting intelligently highlights only the text content while preserving all HTML structure, styles, and elements. ",-1)),e("div",ho,[e("select",mo,null,512)]),t[7]||(t[7]=e("div",{class:"alert info"},[e("strong",null,"Try it:"),l(' Search for "United", "States", "an", or even special characters like "<" in the example above. Notice how the emoji flags and colors remain intact while only the matching text is highlighted. ')],-1)),t[8]||(t[8]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        // Basic usage
        new SlimSelect({
          select: '#selectElement',
          settings: {
            searchHighlight: true
          }
        })

        // With HTML content - highlighting preserves structure
        new SlimSelect({
          select: '#selectElement',
          settings: {
            searchHighlight: true
          },
          data: [
            {
              text: 'United States',
              value: 'US',
              html: '<span style="color: red;">🇺🇸</span> United States'
            },
            {
              text: 'Canada',
              value: 'CA',
              html: '<span style="color: blue;">🇨🇦</span> Canada'
            }
          ]
        })
      `),l(`
    `)],-1))])}const fo=u(io,[["render",go]]),$o=i({name:"Select"}),wo={id:"select",class:"content"};function So(n,t,d,c,v,h){return r(),p("div",wo,[...t[0]||(t[0]=[e("h2",{class:"header"},"select",-1),e("p",null," The select field is used to identify the select element that will be used to create slim select. You can use any value you normally would in a querySelector or pass the element directly. ",-1),e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          // or
          select: document.querySelector('#selectElement')
        })

        // If you already have a currenlty running SlimSelect but lost the reference to it.
        // You can access from the original select element.
        let el = document.querySelector('#selectElement')
        el.slim.open() // Or any other options/methods
      `),l(`
    `)],-1)])])}const Vo=u($o,[["render",So]]),bo=i({name:"SelectAll",mounted(){new o({select:this.$refs.selectAll})}}),yo={id:"selectAll",class:"content"},xo={ref:"selectAll",multiple:""};function _o(n,t,d,c,v,h){return r(),p("div",yo,[t[1]||(t[1]=e("h2",{class:"header"},"selectAll",-1)),t[2]||(t[2]=e("p",null," selectAll is a setting that can be used to add a select all action to an optgroup. This setting can be set to true or false. If set to true, a select all option will be added to the top of the selected values. If set to false or not set at all, no select all action will be added to the optgroup. ",-1)),t[3]||(t[3]=e("p",null,"selectAllText is a setting that can be used to change the text of the select all optgroup.",-1)),t[4]||(t[4]=e("div",{class:"alert info"}," You can set selectAll/selectAllText either by data or by html dataset added to the optgroup element ",-1)),e("select",xo,[...t[0]||(t[0]=[g('<optgroup label="Label 1" data-selectall="true" data-selectalltext="Select them all!"><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></optgroup><optgroup label="Label 2"><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option></optgroup>',2)])],512),t[5]||(t[5]=e("br",null,null,-1)),t[6]||(t[6]=e("h3",null,"Via data",-1)),t[7]||(t[7]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          data: [
            {
              label: 'Label 1',
              selectAll: true,
              selectAllText: 'Select them all!',
              options: [
                { text: 'Option 1', value: '1' },
                { text: 'Option 2', value: '2' },
                { text: 'Option 3', value: '3' },
              ],
            },
            {
              label: 'Label 2',
              selectAll: false,
              options: [
                { text: 'Option 4', value: '4' },
                { text: 'Option 5', value: '5' },
                { text: 'Option 6', value: '6' },
              ],
            },
          ],
        })
      `),l(`
    `)],-1)),t[8]||(t[8]=e("br",null,null,-1)),t[9]||(t[9]=e("h3",null,"Via html",-1)),t[10]||(t[10]=e("pre",null,[l("      "),e("code",{class:"language-html"},`
        <select ref="selectAll" multiple>
          <optgroup label="Label 1" data-selectall="true" data-selectalltext="Select them all!">
            <option value="value1">Value 1</option>
            <option value="value2">Value 2</option>
            <option value="value3">Value 3</option>
          </optgroup>
          <optgroup label="Label 2">
            <option value="value4">Value 4</option>
            <option value="value5">Value 5</option>
            <option value="value6">Value 6</option>
          </optgroup>
        </select>
      `),l(`
    `)],-1))])}const Oo=u(bo,[["render",_o]]),Do=i({name:"ShowTooltip",mounted(){new o({select:this.$refs.showOptionTooltips,settings:{showOptionTooltips:!0}})}}),Mo={id:"showOptionTooltips",class:"content"},Co={ref:"showOptionTooltips"};function To(n,t,d,c,v,h){return r(),p("div",Mo,[t[1]||(t[1]=e("h2",{class:"header"},"showOptionTooltips",-1)),t[2]||(t[2]=e("p",null," showOptionTooltips option is used to active displaying the on-hover tooltips for select options. The tooltip text is equal to the option text content. ",-1)),e("select",Co,[...t[0]||(t[0]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),t[3]||(t[3]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            showOptionTooltips: true,
          }
        })
      `),l(`
    `)],-1))])}const Po=u(Do,[["render",To]]),Bo=i({name:"Styles",mounted(){new o({select:this.$refs.selectStyle}),new o({select:this.$refs.optionStyle})}}),Lo={id:"inlineStyles",class:"content"},Ao={class:"row"},Ho={ref:"selectStyle",style:{color:"red"}},Eo={ref:"optionStyle"};function jo(n,t,d,c,v,h){return r(),p("div",Lo,[t[2]||(t[2]=e("h2",{class:"header"},"inline styles",-1)),t[3]||(t[3]=e("p",null," Slim select will inherit any styles that were added to the original select element. This includes options as well. ",-1)),e("div",Ao,[e("select",Ho,[...t[0]||(t[0]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),e("select",Eo,[...t[1]||(t[1]=[e("option",{style:{color:"red"},value:"value1"},"Red",-1),e("option",{style:{color:"green"}},"Green",-1),e("option",{style:{color:"blue"}},"Blue",-1)])],512)]),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-html"},`
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
      `),l(`
    `)],-1))])}const ko=u(Bo,[["render",jo]]),qo=i({name:"Settings",components:{AdSense:G,Select:Vo,CssClasses:We,AlwaysOpen:le,ContentLocation:ye,ContentPosition:Le,OpenPosition:Sl,Placeholder:Ml,Deselect:it,Display:Dt,Disabled:wt,Mandatory:tl,MinMax:vl,DataAttributes:et,MaxValuesShown:il,Css:Re,Styles:ko,Html:Ut,KeepOrder:Wt,ShowSearch:El,FocusSearch:Nl,SearchText:Xl,SearchPlaceholder:ao,SearchHighlight:fo,CloseOnSelect:ge,ShowTooltip:Po,SelectAll:Oo,Closable:pe,HideSelected:At}}),Ro={id:"settings",class:"contents"};function Uo(n,t,d,c,v,h){const f=a("Select"),$=a("CssClasses"),m=a("AdSense"),w=a("AlwaysOpen"),S=a("ContentLocation"),V=a("ContentPosition"),b=a("OpenPosition"),y=a("Placeholder"),x=a("SelectAll"),_=a("Deselect"),O=a("Display"),D=a("Disabled"),M=a("Mandatory"),C=a("MinMax"),T=a("DataAttributes"),P=a("Css"),B=a("Styles"),L=a("Html"),A=a("KeepOrder"),H=a("ShowSearch"),E=a("FocusSearch"),j=a("SearchText"),k=a("SearchPlaceholder"),q=a("SearchHighlight"),R=a("CloseOnSelect"),U=a("ShowTooltip"),I=a("Closable"),F=a("HideSelected"),N=a("MaxValuesShown");return r(),p("div",Ro,[s(f),s($),s(m),s(w),s(S),s(m),s(V),s(b),s(m),s(y),s(x),s(m),s(_),s(O),s(m),s(D),s(M),s(m),s(C),s(T),s(m),s(P),s(B),s(m),s(L),s(A),s(m),s(H),s(E),s(m),s(j),s(k),s(m),s(q),s(R),s(m),s(U),s(I),s(m),s(F),s(N)])}const Fo=u(qo,[["render",Uo]]);export{Fo as default};
