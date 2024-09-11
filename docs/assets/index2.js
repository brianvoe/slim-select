import{d as s,S as o,_ as a,o as i,c as u,a as e,e as l,b as g,r as v,f as m}from"./index.js";const I=s({name:"AlwaysOpen",mounted(){new o({select:this.$refs.alwaysOpenSingle,settings:{alwaysOpen:!0,contentLocation:this.$refs.alwaysOpenSingleContent,contentPosition:"relative"}}),new o({select:this.$refs.alwaysOpenMultiple,settings:{alwaysOpen:!0,contentLocation:this.$refs.alwaysOpenMultipleContent,contentPosition:"relative"}})}}),R={id:"alwaysOpen",class:"content"},N={class:"row"},G={style:{height:"auto"}},U={ref:"alwaysOpenSingle"},Y={ref:"alwaysOpenSingleContent"},K={style:{height:"auto"}},W={ref:"alwaysOpenMultiple",multiple:""},z={ref:"alwaysOpenMultipleContent"};function F(n,t,p,r,d,c){return i(),u("div",R,[t[2]||(t[2]=e("h2",{class:"header"},"alwaysOpen",-1)),t[3]||(t[3]=e("p",null," alwaysOpen option is used to keep the select open at all times. This is useful for when you want to display the options at all times. ",-1)),e("div",N,[e("div",G,[e("select",U,t[0]||(t[0]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)]),512),e("div",Y,null,512)]),e("div",K,[e("select",W,t[1]||(t[1]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1),e("option",{value:"value4"},"Value 4",-1)]),512),e("div",z,null,512)])]),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const J=a(I,[["render",F]]),Q=s({name:"Closable",mounted(){new o({select:this.$refs.closableSingle}),new o({select:this.$refs.closableMultiple})}}),X={id:"closable",class:"content"},Z={class:"row"},ee={ref:"closableSingle"},te={ref:"closableMultiple",multiple:""};function le(n,t,p,r,d,c){return i(),u("div",X,[t[2]||(t[2]=g('<h2 class="header">closable</h2><p>closable is a optgroup settings that adds the ability to have closable optgroup options.</p><p>Values: <strong>&quot;off&quot;</strong> | <strong>&quot;open&quot;</strong> | <strong>&quot;close&quot;</strong></p><p>Default: <strong>&quot;off&quot;</strong></p><div class="alert info">You can set closable either by data or by html dataset added to the optgroup element</div>',5)),e("div",Z,[e("select",ee,t[0]||(t[0]=[g('<optgroup label="Label 1" data-closable="off"><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></optgroup><optgroup label="Label 2" data-closable="open"><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option></optgroup><optgroup label="Label 3" data-closable="close"><option value="value7">Value 7</option><option value="value8">Value 8</option><option value="value9">Value 9</option></optgroup>',3)]),512),e("select",te,t[1]||(t[1]=[g('<optgroup label="Label 1" data-selectall="true" data-closable="off"><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></optgroup><optgroup label="Label 2" data-selectall="true" data-closable="open"><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option></optgroup><optgroup label="Label 3" data-selectall="true" data-closable="close"><option value="value7">Value 7</option><option value="value8">Value 8</option><option value="value9">Value 9</option></optgroup>',3)]),512)]),t[3]||(t[3]=e("br",null,null,-1)),t[4]||(t[4]=e("h3",null,"Via data",-1)),t[5]||(t[5]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const oe=a(Q,[["render",le]]),ne=s({name:"CloseOnSelect",mounted(){new o({select:this.$refs.closeOnSelectSingle,settings:{closeOnSelect:!1}}),new o({select:this.$refs.closeOnSelectMultiple,settings:{closeOnSelect:!1,selectByGroup:!0}})}}),se={id:"closeOnSelect",class:"content"},ae={class:"row"},ie={ref:"closeOnSelectSingle"},ue={ref:"closeOnSelectMultiple",multiple:""};function pe(n,t,p,r,d,c){return i(),u("div",se,[t[2]||(t[2]=e("h2",{class:"header"},"closeOnSelect",-1)),t[3]||(t[3]=e("p",null," closeOnSelect is a boolean value in which determines whether or not to close the content area upon selecting a value. ",-1)),e("div",ae,[e("select",ie,t[0]||(t[0]=[g('<option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option><optgroup label="Super Values"><option value="value11">Value 1</option><option value="value22">Value 2</option><option value="value33">Value 3</option></optgroup>',4)]),512),e("select",ue,t[1]||(t[1]=[g('<option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option><optgroup label="Super Values"><option value="value11">Value 1</option><option value="value22">Value 2</option><option value="value33">Value 3</option></optgroup>',4)]),512)]),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#search',
          settings: {
            closeOnSelect: false,
          },
        })
      `),l(`
    `)],-1))])}const re=a(ne,[["render",pe]]),de=s({name:"ContentLocation",mounted(){new o({select:this.$refs.contentLocation,settings:{contentLocation:this.$refs.local}})}}),ce={id:"contentLocation",class:"content"},ve={class:"row"},me={ref:"contentLocation",style:{width:"50%"}},ge={ref:"local"};function he(n,t,p,r,d,c){return i(),u("div",ce,[t[1]||(t[1]=e("h2",{class:"header"},"contentLocation",-1)),t[2]||(t[2]=e("p",null," contentLocation will allow you to set the location of where the content section of slim select. By default every content div is appended to the body. ",-1)),t[3]||(t[3]=e("p",null," The content container is the bottom half of slim select. This includes the search input field and available options ",-1)),e("div",ve,[e("select",me,t[0]||(t[0]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)]),512),e("div",ge,null,512)]),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const fe=a(de,[["render",he]]),$e=s({name:"ContentPosition",mounted(){new o({select:this.$refs.contentPositionRelative,settings:{contentPosition:"relative",contentLocation:this.$refs.contentPositionRelativeContent}}),new o({select:this.$refs.contentPositionAbsolute,settings:{contentPosition:"absolute"}})}}),we={id:"contentPosition",class:"content"},Ve={class:"row"},be={ref:"contentPositionRelative",class:"relative"},Se={ref:"contentPositionRelativeContent"},ye={ref:"contentPositionAbsolute",class:"absolute"};function xe(n,t,p,r,d,c){return i(),u("div",we,[t[2]||(t[2]=e("h2",{class:"header"},"contentPosition",-1)),t[3]||(t[3]=e("p",null,[l("contentPosition will set the css position to either relative. Default is "),e("b",null,"'absolute'")],-1)),t[4]||(t[4]=e("div",{class:"alert info"}," If you do use relative position be sure to set the contentLocation to an element that will work best for your use case. Otherwise SlimSelect will add you content to the body of the html. See example usage below. ",-1)),e("div",Ve,[e("select",be,t[0]||(t[0]=[e("option",{"data-placeholder":"true"},"Relative",-1),e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)]),512),e("div",Se,null,512),e("select",ye,t[1]||(t[1]=[e("option",{"data-placeholder":"true"},"Absolute",-1),e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)]),512)]),t[5]||(t[5]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            contentPosition: 'relative' // 'absolute' or 'relative'

            // To help with relative positioning 
            // you can set the contentLocation
            contentLocation: document.getElementById('local')
          }
        })
      `),l(`
    `)],-1))])}const _e=a($e,[["render",xe]]),Oe=s({name:"Css",mounted(){new o({select:this.$refs.selectClass}),new o({select:this.$refs.optionClass})}}),De={id:"cssClass",class:"content"},Me={class:"row"},Ce={ref:"selectClass",class:"select-class"},Te={ref:"optionClass",class:"option-class"};function Pe(n,t,p,r,d,c){return i(),u("div",De,[t[2]||(t[2]=e("h2",{class:"header"},"css class",-1)),t[3]||(t[3]=e("p",null," Slim select will inherit any classes that were added to the original select element. This includes options as well. ",-1)),e("div",Me,[e("select",Ce,t[0]||(t[0]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)]),512),e("select",Te,t[1]||(t[1]=[e("option",{class:"red",value:"value1"},"Red",-1),e("option",{class:"green",value:"value2"},"Green",-1),e("option",{class:"blue",value:"value3"},"Blue",-1)]),512)]),t[4]||(t[4]=e("pre",null,[l("        "),e("code",{class:"language-html"},`
          <select id="select-class" class="classItems">
            <option class="red" value="value1">Value 1</option>
            <option class="green" value="value2">Value 2</option>
            <option class="blue" value="value3">Value 3</option>
          </select>
        `),l(`
      `)],-1))])}const Be=a(Oe,[["render",Pe]]),Le=s({name:"CustomCss",mounted(){new o({select:this.$refs.mainSelect,cssClasses:{option:"primary-option"}}),new o({select:this.$refs.secondarySelect,cssClasses:{option:"secondary-option"}})}}),Ae={id:"cssClasses",class:"content"},Ee={class:"row"},je={ref:"mainSelect"},He={ref:"secondarySelect"};function ke(n,t,p,r,d,c){return i(),u("div",Ae,[t[2]||(t[2]=e("h2",{class:"header"},"cssClasses",-1)),t[3]||(t[3]=e("p",null,"You can override the default CSS classes by setting them during initialization.",-1)),e("div",Ee,[e("select",je,t[0]||(t[0]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)]),512),e("select",He,t[1]||(t[1]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)]),512)]),t[4]||(t[4]=e("pre",null,[l("          "),e("code",{class:"language-html"},`
          <select id="primary-select">
            <option value="value1">Value 1</option>
            <option value="value2">Value 2</option>
            <option value="value3">Value 3</option>
          </select>
          `),l(`
      `)],-1)),t[5]||(t[5]=e("pre",null,[l("        "),e("code",{class:"language-javascript"},`
          new SlimSelect({
            select: '#primary-select',
            cssClasses: {
              option: "primary-option" 
          })
        `),l(`
      `)],-1))])}const qe=a(Le,[["render",ke]]),Ie=s({name:"DataAttributes",mounted(){new o({select:this.$refs.optionsSingle}),new o({select:this.$refs.optionsMultiple})}}),Re={id:"dataAttributes",class:"content"},Ne={class:"row"},Ge={ref:"optionsSingle"},Ue={ref:"optionsMultiple",multiple:""};function Ye(n,t,p,r,d,c){return i(),u("div",Re,[t[2]||(t[2]=e("h2",{class:"header"},"Data Attributes",-1)),t[3]||(t[3]=e("p",null," Slim select will take on attributes of the original as best as possible. Below are example usages of attributes added to the underlining select options that slim select picked up and used ",-1)),e("div",Ne,[e("select",Ge,t[0]||(t[0]=[g('<option data-placeholder="true"></option><option value="value1" data-info="Here is info">Data Attributes</option><option value="value2" disabled>Disabled Option</option><option value="value3" class="green">Class Green</option><option value="value4" style="color:purple;">Inline Style</option>',5)]),512),e("select",Ue,t[1]||(t[1]=[e("option",{value:"value1","data-info":"Here is info"},"Data Attributes",-1),e("option",{value:"value2",disabled:""},"Disabled Option",-1),e("option",{value:"value3",class:"green"},"Class Green",-1),e("option",{value:"value4",style:{color:"purple"}},"Inline Style",-1)]),512)])])}const Ke=a(Ie,[["render",Ye]]),We=s({name:"Deselect",mounted(){new o({select:this.$refs.allowDeselectSingle,settings:{allowDeselect:!0}}),new o({select:this.$refs.allowDeselectMultiple,settings:{allowDeselect:!0}})}}),ze={id:"allowDeselect",class:"content"},Fe={class:"row"},Je={ref:"allowDeselectSingle"},Qe={ref:"allowDeselectMultiple",multiple:""};function Xe(n,t,p,r,d,c){return i(),u("div",ze,[t[2]||(t[2]=e("h2",{class:"header"},"allowDeselect",-1)),t[3]||(t[3]=e("p",null,"This will allow you to deselect a value on a single/multiple select dropdown.",-1)),t[4]||(t[4]=e("p",null,"Be sure to have an empty option data placeholder so slim select has an empty string value to select.",-1)),e("div",Fe,[e("select",Je,t[0]||(t[0]=[e("option",{"data-placeholder":"true"},null,-1),e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)]),512),e("select",Qe,t[1]||(t[1]=[e("option",{"data-placeholder":"true"},null,-1),e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)]),512)]),t[5]||(t[5]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const Ze=a(We,[["render",Xe]]),et=s({name:"Disabled",mounted(){new o({select:this.$refs.disabledSingle,settings:{disabled:!0}}),new o({select:this.$refs.disabledMultiple}),new o({select:this.$refs.disabledOptionSingle,data:[{text:"Option 1",value:"option1"},{text:"Option 2",value:"option2",disabled:!0},{text:"Option 3",value:"option3"}]}),new o({select:this.$refs.disabledOptionMultiple}),new o({select:this.$refs.disabledDynamicSingle}).select.showUI()},methods:{enableDisableDynamic(){const n=this.$refs.disabledDynamicSingle;n&&(n.disabled=!n.disabled)}}}),tt={id:"disabled",class:"content"},lt={class:"row"},ot={ref:"disabledSingle"},nt={ref:"disabledMultiple",multiple:"",disabled:""},st={class:"row"},at={ref:"disabledOptionSingle"},it={ref:"disabledOptionMultiple",multiple:""},ut={class:"row"},pt={ref:"disabledDynamicSingle"};function rt(n,t,p,r,d,c){return i(),u("div",tt,[t[6]||(t[6]=e("h2",{class:"header"},"disabled",-1)),t[7]||(t[7]=e("p",null,"Allows the ability to disable the select dropdown as well as individual options",-1)),t[8]||(t[8]=e("div",{class:"alert info"},"Methods also are provided to enable and disable SlimSelect via method call.",-1)),e("div",lt,[e("select",ot,t[1]||(t[1]=[e("option",{value:"value1",selected:""},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)]),512),e("select",nt,t[2]||(t[2]=[e("option",{value:"value1",selected:""},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)]),512)]),t[9]||(t[9]=e("br",null,null,-1)),e("div",st,[e("select",at,t[3]||(t[3]=[e("option",{value:"value1",selected:""},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)]),512),e("select",it,t[4]||(t[4]=[e("option",{value:"value1",selected:""},"Value 1",-1),e("option",{value:"value2",disabled:""},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)]),512)]),t[10]||(t[10]=e("br",null,null,-1)),e("div",ut,[e("div",{class:"btn",onClick:t[0]||(t[0]=(...h)=>n.enableDisableDynamic&&n.enableDisableDynamic(...h))},"Enable/Disable Original Select"),e("select",pt,t[5]||(t[5]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)]),512)]),t[11]||(t[11]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const dt=a(et,[["render",rt]]),ct=s({name:"Display",mounted(){const n=new o({select:this.$refs.selectdisplay}),t=[{value:"value1",text:"Value 1",display:!1},{value:"value2",text:"Value 2"},{value:"value3",text:"Value 3"}];n.setData(t),n.setSelected(["value1","value3"]),new o({select:this.$refs.selectdisplay2})}}),vt={id:"display",class:"content"},mt={class:"row"},gt={ref:"selectdisplay",multiple:""},ht={class:"row"},ft={ref:"selectdisplay2",multiple:""};function $t(n,t,p,r,d,c){return i(),u("div",vt,[t[1]||(t[1]=e("h2",{class:"header"},"display",-1)),t[2]||(t[2]=e("p",null,"Allows to hide elements of selected values.",-1)),e("div",mt,[e("select",gt,null,512)]),t[3]||(t[3]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1)),t[5]||(t[5]=e("p",null,"Or",-1)),e("div",ht,[e("select",ft,t[0]||(t[0]=[e("option",{value:"value1",style:{display:"none"},selected:""},"Value 1",-1),e("option",{value:"value2",selected:""},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)]),512)]),t[6]||(t[6]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const wt=a(ct,[["render",$t]]),Vt=s({name:"HideSelected",mounted(){new o({select:this.$refs.hideSelectedSingle,settings:{hideSelected:!0}}),new o({select:this.$refs.hideSelectedMultiple,settings:{hideSelected:!0}})}}),bt={id:"hideSelected",class:"content"},St={class:"row"},yt={ref:"hideSelectedSingle"},xt={ref:"hideSelectedMultiple",multiple:""};function _t(n,t,p,r,d,c){return i(),u("div",bt,[t[2]||(t[2]=e("h2",{class:"header"},"hideSelected",-1)),t[3]||(t[3]=e("p",null,"hideSelected setting is used to hide the current selected option in the options dropdown.",-1)),e("div",St,[e("select",yt,t[0]||(t[0]=[e("option",{"data-placeholder":"true"},null,-1),e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)]),512),e("select",xt,t[1]||(t[1]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)]),512)]),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const Ot=a(Vt,[["render",_t]]),Dt=s({name:"Html",mounted(){new o({select:this.$refs.htmlSingle,settings:{searchHighlight:!0},data:[{html:"<b>Bold Text</b>",text:"Bold Text",value:"bold text"},{html:'<div style="border: solid 1px #666666;">Border</div>',text:"Border",value:"border"},{html:"<i>Slim Select is awesome</i>",text:"Slim Select is awesome"}]}),new o({select:this.$refs.htmlMulti,settings:{searchHighlight:!0}})}}),Mt={id:"html",class:"content"},Ct={class:"row"},Tt={ref:"htmlSingle"},Pt={ref:"htmlMulti",multiple:""};function Bt(n,t,p,r,d,c){return i(),u("div",Mt,[t[1]||(t[1]=e("h2",{class:"header"},"html",-1)),t[2]||(t[2]=e("p",null," Slim select has the ability to set custom html for the selected values and options dropdown. By default if the html field is set it will use that for the selected values and the options dropdown. For a multiple select selected values it will always use the text field. ",-1)),e("div",Ct,[e("select",Tt,null,512),e("select",Pt,t[0]||(t[0]=[e("option",{value:"bold text","data-html":"<b>Bold Text</b>"},"Bold Text",-1),e("option",{value:"border","data-html":"<div style='border: solid 1px #666666;'>Border</div>"},"Border",-1),e("option",{value:"slim select","data-html":"<i>Slim Select is awesome</i>"},"Slim Select is awesome",-1)]),512)]),t[3]||(t[3]=e("h3",null,"Via data",-1)),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const Lt=a(Dt,[["render",Bt]]),At=s({name:"KeepOrder",mounted(){new o({select:this.$refs.keepOrder,settings:{keepOrder:!0}})}}),Et={id:"keepOrder",class:"content"},jt={class:"row"},Ht={ref:"keepOrder",multiple:""};function kt(n,t,p,r,d,c){return i(),u("div",Et,[t[1]||(t[1]=e("h2",{class:"header"},"keepOrder",-1)),t[2]||(t[2]=e("p",null," keepOrder if true will maintain the order in which options are selected. If true the selected options order will be in the order of the dropdown options. As long as slim select isnt fully rerendered the order will be maintained. ",-1)),t[3]||(t[3]=e("p",null,[l("Values: "),e("strong",null,"true"),l(" | "),e("strong",null,"false")],-1)),t[4]||(t[4]=e("p",null,[l("Default: "),e("strong",null,"false")],-1)),e("div",jt,[e("select",Ht,t[0]||(t[0]=[g('<option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option><optgroup label="Label 1"><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option></optgroup><optgroup label="Label 2"><option value="value7">Value 7</option><option value="value8">Value 8</option><option value="value9">Value 9</option></optgroup>',5)]),512)]),t[5]||(t[5]=e("br",null,null,-1)),t[6]||(t[6]=e("h3",null,"Via html",-1)),t[7]||(t[7]=e("pre",null,[l("      "),e("code",{class:"language-html"},`
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
    `)],-1))])}const qt=a(At,[["render",kt]]),It=s({name:"Mandatory",mounted(){const n=new o({select:this.$refs.selectMultiMandatory}),t=[{value:"value1",text:"Value 1",mandatory:!0},{value:"value2",text:"Value 2"},{value:"value3",text:"Value 3"}];n.setData(t),n.setSelected(["value1","value3"]),new o({select:this.$refs.selectMultiMandatory2})}}),Rt={id:"mandatory",class:"content"},Nt={class:"row"},Gt={ref:"selectMultiMandatory",multiple:""},Ut={class:"row"},Yt={ref:"selectMultiMandatory2",multiple:""};function Kt(n,t,p,r,d,c){return i(),u("div",Rt,[t[1]||(t[1]=e("h2",{class:"header"},"mandatory",-1)),t[2]||(t[2]=e("p",null," When using multi select you can set a mandatory on the option to prevent capability to deselect particular option. Note options with mandatory flag is not selected by default, you need select them yourselfs. ",-1)),e("div",Nt,[e("select",Gt,null,512)]),t[3]||(t[3]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1)),t[5]||(t[5]=e("p",null,"Or",-1)),e("div",Ut,[e("select",Yt,t[0]||(t[0]=[e("option",{value:"value1","data-mandatory":"true",selected:""},"Value 1",-1),e("option",{value:"value2",selected:""},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)]),512)]),t[6]||(t[6]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const Wt=a(It,[["render",Kt]]),zt=s({name:"MaxValuesShown",mounted(){new o({select:this.$refs.maxValuesShown,settings:{maxValuesShown:5,maxValuesMessage:"{number} selected",allowDeselect:!0}})}}),Ft={id:"maxValuesShown",class:"content"},Jt={class:"row"},Qt={ref:"maxValuesShown",multiple:""};function Xt(n,t,p,r,d,c){return i(),u("div",Ft,[t[1]||(t[1]=e("h2",{class:"header"},"maxValuesShown",-1)),t[2]||(t[2]=e("p",null," When using multiselect you can set a threshold so when selecting more items than the input value, the items will not display as values, but the 'n selected' will be displayed. The text that will be displayed can be customized with the use of '{number}' in the maxValuesMessage setting. ",-1)),t[3]||(t[3]=e("p",null,[e("strong",null,"Default:"),l(" 20")],-1)),e("div",Jt,[e("select",Qt,t[0]||(t[0]=[g('<option value="value1" selected>Value 1</option><option value="value2" selected>Value 2</option><option value="value3" selected>Value 3</option><option value="value4" selected>Value 4</option><option value="value5" selected>Value 5</option><option value="value6" selected>Value 6</option><option value="value7">Value 7</option><option value="value8">Value 8</option>',8)]),512)]),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const Zt=a(zt,[["render",Xt]]),el=s({name:"MinMax",mounted(){new o({select:this.$refs.selectMultiMax,settings:{allowDeselect:!0,closeOnSelect:!1,minSelected:2,maxSelected:5},events:{addable:n=>n}})}}),tl={id:"minmax",class:"content"},ll={class:"row"},ol={ref:"selectMultiMax",multiple:""};function nl(n,t,p,r,d,c){return i(),u("div",tl,[t[1]||(t[1]=e("h2",{class:"header"},"Min/Max Selected",-1)),t[2]||(t[2]=e("p",null,"When using multi select you can set a min and/or max on the amount of selections you can have.",-1)),e("div",ll,[e("select",ol,t[0]||(t[0]=[g('<option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option>',6)]),512)]),t[3]||(t[3]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const sl=a(el,[["render",nl]]),al=s({name:"OpenPosition",mounted(){new o({select:this.$refs.openPositionUp,settings:{openPosition:"up"}}),new o({select:this.$refs.openPositionDown,settings:{openPosition:"down"}})}}),il={id:"openPosition",class:"content"},ul={class:"row"},pl={ref:"openPositionUp"},rl={ref:"openPositionDown"};function dl(n,t,p,r,d,c){return i(),u("div",il,[t[2]||(t[2]=e("h2",{class:"header"},"openPosition",-1)),t[3]||(t[3]=e("p",null," openPosition is a string value that will decide where to show your content when it comes out. By default slim select will try to put the content where it can without going off screen. But you may want to always show it in one direction. ",-1)),t[4]||(t[4]=e("p",null,[l("Possible Options: "),e("b",null,"'auto', 'up' or 'down'"),l(". Default is "),e("b",null,"'auto'")],-1)),e("div",ul,[e("select",pl,t[0]||(t[0]=[e("option",{value:"up1"},"Up 1",-1),e("option",{value:"up2"},"Up 2",-1),e("option",{value:"up3"},"Up 3",-1)]),512),e("select",rl,t[1]||(t[1]=[e("option",{value:"down1"},"Down 1",-1),e("option",{value:"down2"},"Down 2",-1),e("option",{value:"down3"},"Down 3",-1)]),512)]),t[5]||(t[5]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            openPosition: 'auto' // 'auto', 'up' or 'down'
          }
        })
      `),l(`
    `)],-1))])}const cl=a(al,[["render",dl]]),vl=s({name:"Placeholder",mounted(){new o({select:this.$refs.placeholderSingle,settings:{placeholderText:"Custom Placeholder Text"}}),new o({select:this.$refs.placeholderMultiple,settings:{placeholderText:"Make Selection"}}),new o({select:this.$refs.placeholderNone,settings:{placeholderText:""}})}}),ml={id:"placeholder",class:"content"},gl={class:"row"},hl={ref:"placeholderSingle"},fl={ref:"placeholderMultiple",multiple:""},$l={ref:"placeholderNone"};function wl(n,t,p,r,d,c){return i(),u("div",ml,[t[3]||(t[3]=e("h2",{class:"header"},"placeholderText",-1)),t[4]||(t[4]=e("p",null,' Placeholders consists of setting the placeholder option value. The only difference is single selects require an empty option with data-placeholder set to true. Default value is "Select Value". ',-1)),t[5]||(t[5]=e("div",{class:"alert info"}," Notice you can also set placeholder to empty if that is what you would like to do as well. ",-1)),e("div",gl,[e("select",hl,t[0]||(t[0]=[e("option",{"data-placeholder":"true"},null,-1),e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)]),512),e("select",fl,t[1]||(t[1]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)]),512),e("select",$l,t[2]||(t[2]=[e("option",{"data-placeholder":"true"},null,-1),e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)]),512)]),t[6]||(t[6]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const Vl=a(vl,[["render",wl]]),bl=s({name:"Search",mounted(){new o({select:this.$refs.showSearchSingle,settings:{showSearch:!1}}),new o({select:this.$refs.focusSearchSingle,settings:{focusSearch:!1}}),new o({select:this.$refs.searchTextSingle,settings:{searchText:"Sorry, nothing to see here"}}),new o({select:this.$refs.searchPlaceholderSingle,settings:{searchPlaceholder:"Search for the good stuff!"}}),new o({select:this.$refs.searchHighlightSingle,settings:{searchHighlight:!0}}),new o({select:this.$refs.showSearchMulti,settings:{showSearch:!1}}),new o({select:this.$refs.focusSearchMulti,settings:{focusSearch:!1}}),new o({select:this.$refs.searchTextMulti,settings:{searchText:"Sorry nothing to see here"}}),new o({select:this.$refs.searchPlaceholderMulti,settings:{searchPlaceholder:"Search for the good stuff!"}}),new o({select:this.$refs.searchHighlightMulti,settings:{searchHighlight:!0}})}}),Sl={id:"search",class:"content"},yl={class:"row",style:{padding:"0 0 var(--spacing-half) 0"}},xl={ref:"showSearchSingle"},_l={ref:"focusSearchSingle"},Ol={ref:"searchTextSingle"},Dl={ref:"searchPlaceholderSingle"},Ml={ref:"searchHighlightSingle"},Cl={class:"row"},Tl={ref:"showSearchMulti",multiple:""},Pl={ref:"focusSearchMulti",multiple:""},Bl={ref:"searchTextMulti",multiple:""},Ll={ref:"searchPlaceholderMulti",multiple:""},Al={ref:"searchHighlightMulti",multiple:""};function El(n,t,p,r,d,c){return i(),u("div",Sl,[t[10]||(t[10]=g('<h2 class="header">showSearch / focusSearch / searchText / searchingText / searchHighlight</h2><p><b>showSearch</b> - is a boolean value that will decide whether or not to show the search. Default is true.</p><p><b>focusSearch</b> - is a boolean value that will decide whether or not to focus on the search on open. Default is true. </p><p><b>searchText</b> - is a string value that will show in the event there are no results. Default is &#39;No Results&#39;. </p><p><b>searchingText</b> - is a string value that will show during an fetch search request. Default is &#39;Searching...&#39;. </p><p><b>searchPlaceholder</b> - is a string value that will set the value of the input search placeholder text. Default is &#39;Search&#39;. </p><p><b>searchHighlight</b> - is a boolean value that will highlight search results. Default is false.</p>',7)),e("div",yl,[e("select",xl,t[0]||(t[0]=[e("option",{value:"dog"},"Dog",-1),e("option",{value:"cat"},"Cat",-1),e("option",{value:"bird"},"Bird",-1)]),512),e("select",_l,t[1]||(t[1]=[e("option",{value:"dog"},"Dog",-1),e("option",{value:"cat"},"Cat",-1),e("option",{value:"bird"},"Bird",-1)]),512),e("select",Ol,t[2]||(t[2]=[e("option",{value:"dog"},"Dog",-1),e("option",{value:"cat"},"Cat",-1),e("option",{value:"bird"},"Bird",-1)]),512),e("select",Dl,t[3]||(t[3]=[e("option",{value:"dog"},"Dog",-1),e("option",{value:"cat"},"Cat",-1),e("option",{value:"bird"},"Bird",-1)]),512),e("select",Ml,t[4]||(t[4]=[e("option",{value:"dog"},"Dog",-1),e("option",{value:"cat"},"Cat",-1),e("option",{value:"bird"},"Bird",-1)]),512)]),e("div",Cl,[e("select",Tl,t[5]||(t[5]=[e("option",{value:"dog"},"Dog",-1),e("option",{value:"cat"},"Cat",-1),e("option",{value:"bird"},"Bird",-1)]),512),e("select",Pl,t[6]||(t[6]=[e("option",{value:"dog"},"Dog",-1),e("option",{value:"cat"},"Cat",-1),e("option",{value:"bird"},"Bird",-1)]),512),e("select",Bl,t[7]||(t[7]=[e("option",{value:"dog"},"Dog",-1),e("option",{value:"cat"},"Cat",-1),e("option",{value:"bird"},"Bird",-1)]),512),e("select",Ll,t[8]||(t[8]=[e("option",{value:"dog"},"Dog",-1),e("option",{value:"cat"},"Cat",-1),e("option",{value:"bird"},"Bird",-1)]),512),e("select",Al,t[9]||(t[9]=[e("option",{value:"dog"},"Dog",-1),e("option",{value:"cat"},"Cat",-1),e("option",{value:"bird"},"Bird",-1)]),512)]),t[11]||(t[11]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        let slim = new SlimSelect({
          select: '#selectElement',
          settings: {
            showSearch: false, // used in example
            focusSearch: false, // used in example
            searchText: 'Sorry nothing to see here', // used in example
            searchPlaceholder: 'Search for the good stuff!', // used in example
            searchHighlight: true // used in example
          }
        })
      `),l(`
    `)],-1))])}const jl=a(bl,[["render",El]]),Hl=s({name:"Select"}),kl={id:"select",class:"content"};function ql(n,t,p,r,d,c){return i(),u("div",kl,t[0]||(t[0]=[e("h2",{class:"header"},"select",-1),e("p",null," The select field is used to identify the select element that will be used to create slim select. You can use any value you normally would in a querySelector or pass the element directly. ",-1),e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1)]))}const Il=a(Hl,[["render",ql]]),Rl=s({name:"SelectAll",mounted(){new o({select:this.$refs.selectAll})}}),Nl={id:"selectAll",class:"content"},Gl={ref:"selectAll",multiple:""};function Ul(n,t,p,r,d,c){return i(),u("div",Nl,[t[1]||(t[1]=e("h2",{class:"header"},"selectAll",-1)),t[2]||(t[2]=e("p",null," selectAll is a setting that can be used to add a select all action to an optgroup. This setting can be set to true or false. If set to true, a select all option will be added to the top of the selected values. If set to false or not set at all, no select all action will be added to the optgroup. ",-1)),t[3]||(t[3]=e("p",null,"selectAllText is a setting that can be used to change the text of the select all optgroup.",-1)),t[4]||(t[4]=e("div",{class:"alert info"}," You can set selectAll/selectAllText either by data or by html dataset added to the optgroup element ",-1)),e("select",Gl,t[0]||(t[0]=[g('<optgroup label="Label 1" data-selectall="true" data-selectalltext="Select them all!"><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></optgroup><optgroup label="Label 2"><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option></optgroup>',2)]),512),t[5]||(t[5]=e("br",null,null,-1)),t[6]||(t[6]=e("h3",null,"Via data",-1)),t[7]||(t[7]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const Yl=a(Rl,[["render",Ul]]),Kl=s({name:"ShowTooltip",mounted(){new o({select:this.$refs.showOptionTooltips,settings:{showOptionTooltips:!0}})}}),Wl={id:"showOptionTooltips",class:"content"},zl={ref:"showOptionTooltips"};function Fl(n,t,p,r,d,c){return i(),u("div",Wl,[t[1]||(t[1]=e("h2",{class:"header"},"showOptionTooltips",-1)),t[2]||(t[2]=e("p",null," showOptionTooltips option is used to active displaying the on-hover tooltips for select options. The tooltip text is equal to the option text content. ",-1)),e("select",zl,t[0]||(t[0]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)]),512),t[3]||(t[3]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            showOptionTooltips: true,
          }
        })
      `),l(`
    `)],-1))])}const Jl=a(Kl,[["render",Fl]]),Ql=s({name:"Styles",mounted(){new o({select:this.$refs.selectStyle}),new o({select:this.$refs.optionStyle})}}),Xl={id:"inlineStyles",class:"content"},Zl={class:"row"},eo={ref:"selectStyle",style:{color:"red"}},to={ref:"optionStyle"};function lo(n,t,p,r,d,c){return i(),u("div",Xl,[t[2]||(t[2]=e("h2",{class:"header"},"inline styles",-1)),t[3]||(t[3]=e("p",null," Slim select will inherit any styles that were added to the original select element. This includes options as well. ",-1)),e("div",Zl,[e("select",eo,t[0]||(t[0]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)]),512),e("select",to,t[1]||(t[1]=[e("option",{style:{color:"red"},value:"value1"},"Red",-1),e("option",{style:{color:"green"}},"Green",-1),e("option",{style:{color:"blue"}},"Blue",-1)]),512)]),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-html"},`
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
    `)],-1))])}const oo=a(Ql,[["render",lo]]),no=s({name:"Settings",components:{Select:Il,CssClasses:qe,AlwaysOpen:J,ContentLocation:fe,ContentPosition:_e,OpenPosition:cl,Placeholder:Vl,Deselect:Ze,Display:wt,Disabled:dt,Mandatory:Wt,MinMax:sl,DataAttributes:Ke,MaxValuesShown:Zt,Css:Be,Styles:oo,Html:Lt,KeepOrder:qt,Search:jl,CloseOnSelect:re,ShowTooltip:Jl,SelectAll:Yl,Closable:oe,HideSelected:Ot}}),so={id:"settings",class:"contents"};function ao(n,t,p,r,d,c){const h=v("Select"),f=v("CssClasses"),$=v("AlwaysOpen"),w=v("ContentLocation"),V=v("ContentPosition"),b=v("OpenPosition"),S=v("Placeholder"),y=v("SelectAll"),x=v("Deselect"),_=v("Display"),O=v("Disabled"),D=v("Mandatory"),M=v("MinMax"),C=v("DataAttributes"),T=v("Css"),P=v("Styles"),B=v("Html"),L=v("KeepOrder"),A=v("Search"),E=v("CloseOnSelect"),j=v("ShowTooltip"),H=v("Closable"),k=v("HideSelected"),q=v("MaxValuesShown");return i(),u("div",so,[m(h),m(f),m($),m(w),m(V),m(b),m(S),m(y),m(x),m(_),m(O),m(D),m(M),m(C),m(T),m(P),m(B),m(L),m(A),m(E),m(j),m(H),m(k),m(q)])}const uo=a(no,[["render",ao]]);export{uo as default};
