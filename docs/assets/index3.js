import{d as s,S as o,_ as a,c as i,a as e,e as l,o as u,b as h,f as v,r as m}from"./index.js";const I=s({name:"AlwaysOpen",mounted(){new o({select:this.$refs.alwaysOpenSingle,settings:{alwaysOpen:!0,contentLocation:this.$refs.alwaysOpenSingleContent,contentPosition:"relative"}}),new o({select:this.$refs.alwaysOpenMultiple,settings:{alwaysOpen:!0,contentLocation:this.$refs.alwaysOpenMultipleContent,contentPosition:"relative"}})}}),R={id:"alwaysOpen",class:"content"},N={class:"row"},G={style:{height:"auto"}},U={ref:"alwaysOpenSingle"},Y={ref:"alwaysOpenSingleContent"},F={style:{height:"auto"}},W={ref:"alwaysOpenMultiple",multiple:""},K={ref:"alwaysOpenMultipleContent"};function z(n,t,p,r,d,c){return u(),i("div",R,[t[2]||(t[2]=e("h2",{class:"header"},"alwaysOpen",-1)),t[3]||(t[3]=e("p",null," alwaysOpen option is used to keep the select open at all times. This is useful for when you want to display the options at all times. ",-1)),e("div",N,[e("div",G,[e("select",U,[...t[0]||(t[0]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),e("div",Y,null,512)]),e("div",F,[e("select",W,[...t[1]||(t[1]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1),e("option",{value:"value4"},"Value 4",-1)])],512),e("div",K,null,512)])]),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const J=a(I,[["render",z]]),Q=s({name:"Closable",mounted(){new o({select:this.$refs.closableSingle}),new o({select:this.$refs.closableMultiple})}}),X={id:"closable",class:"content"},Z={class:"row"},ee={ref:"closableSingle"},te={ref:"closableMultiple",multiple:""};function le(n,t,p,r,d,c){return u(),i("div",X,[t[2]||(t[2]=h('<h2 class="header">closable</h2><p>closable is a optgroup settings that adds the ability to have closable optgroup options.</p><p>Values: <strong>&quot;off&quot;</strong> | <strong>&quot;open&quot;</strong> | <strong>&quot;close&quot;</strong></p><p>Default: <strong>&quot;off&quot;</strong></p><div class="alert info">You can set closable either by data or by html dataset added to the optgroup element</div>',5)),e("div",Z,[e("select",ee,[...t[0]||(t[0]=[h('<optgroup label="Label 1" data-closable="off"><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></optgroup><optgroup label="Label 2" data-closable="open"><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option></optgroup><optgroup label="Label 3" data-closable="close"><option value="value7">Value 7</option><option value="value8">Value 8</option><option value="value9">Value 9</option></optgroup>',3)])],512),e("select",te,[...t[1]||(t[1]=[h('<optgroup label="Label 1" data-selectall="true" data-closable="off"><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></optgroup><optgroup label="Label 2" data-selectall="true" data-closable="open"><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option></optgroup><optgroup label="Label 3" data-selectall="true" data-closable="close"><option value="value7">Value 7</option><option value="value8">Value 8</option><option value="value9">Value 9</option></optgroup>',3)])],512)]),t[3]||(t[3]=e("br",null,null,-1)),t[4]||(t[4]=e("h3",null,"Via data",-1)),t[5]||(t[5]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const oe=a(Q,[["render",le]]),ne=s({name:"CloseOnSelect",mounted(){new o({select:this.$refs.closeOnSelectSingle,settings:{closeOnSelect:!1}}),new o({select:this.$refs.closeOnSelectMultiple,settings:{closeOnSelect:!1,selectByGroup:!0}})}}),se={id:"closeOnSelect",class:"content"},ae={class:"row"},ie={ref:"closeOnSelectSingle"},ue={ref:"closeOnSelectMultiple",multiple:""};function pe(n,t,p,r,d,c){return u(),i("div",se,[t[2]||(t[2]=e("h2",{class:"header"},"closeOnSelect",-1)),t[3]||(t[3]=e("p",null," closeOnSelect is a boolean value in which determines whether or not to close the content area upon selecting a value. ",-1)),e("div",ae,[e("select",ie,[...t[0]||(t[0]=[h('<option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option><optgroup label="Super Values"><option value="value11">Value 1</option><option value="value22">Value 2</option><option value="value33">Value 3</option></optgroup>',4)])],512),e("select",ue,[...t[1]||(t[1]=[h('<option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option><optgroup label="Super Values"><option value="value11">Value 1</option><option value="value22">Value 2</option><option value="value33">Value 3</option></optgroup>',4)])],512)]),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#search',
          settings: {
            closeOnSelect: false,
          },
        })
      `),l(`
    `)],-1))])}const re=a(ne,[["render",pe]]),de=s({name:"ContentLocation",mounted(){new o({select:this.$refs.contentLocation,settings:{contentLocation:this.$refs.local}})}}),ce={id:"contentLocation",class:"content"},ve={class:"row"},me={ref:"contentLocation",style:{width:"50%"}},he={ref:"local"};function ge(n,t,p,r,d,c){return u(),i("div",ce,[t[1]||(t[1]=e("h2",{class:"header"},"contentLocation",-1)),t[2]||(t[2]=e("p",null," contentLocation will allow you to set the location of where the content section of slim select. By default every content div is appended to the body. ",-1)),t[3]||(t[3]=e("p",null," The content container is the bottom half of slim select. This includes the search input field and available options ",-1)),e("div",ve,[e("select",me,[...t[0]||(t[0]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),e("div",he,null,512)]),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const fe=a(de,[["render",ge]]),$e=s({name:"ContentPosition",mounted(){new o({select:this.$refs.contentPositionRelative,settings:{contentPosition:"relative",contentLocation:this.$refs.contentPositionRelativeContent}}),new o({select:this.$refs.contentPositionAbsolute,settings:{contentPosition:"absolute"}}),new o({select:this.$refs.contentPositionFixed,settings:{contentPosition:"fixed"}})}}),we={id:"contentPosition",class:"content"},Ve={class:"row"},be={ref:"contentPositionRelative",class:"relative"},Se={ref:"contentPositionRelativeContent"},ye={ref:"contentPositionAbsolute",class:"absolute"},xe={class:"row"},_e={ref:"contentPositionFixed",class:"fixed"};function Oe(n,t,p,r,d,c){return u(),i("div",we,[t[3]||(t[3]=e("h2",{class:"header"},"contentPosition",-1)),t[4]||(t[4]=e("p",null,[l("contentPosition will set the css position to relative, absolute or fixed. Default is "),e("b",null,"'absolute'")],-1)),t[5]||(t[5]=e("div",{class:"alert info"}," If you do use relative position be sure to set the contentLocation to an element that will work best for your use case. Otherwise SlimSelect will add you content to the body of the html. See example usage below. ",-1)),t[6]||(t[6]=e("div",{class:"alert info"}," Fixed was added to address issues with fixed positioning in modals and other elements that have fixed positioning. ",-1)),e("div",Ve,[e("select",be,[...t[0]||(t[0]=[e("option",{"data-placeholder":"true"},"Relative",-1),e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),e("div",Se,null,512),e("select",ye,[...t[1]||(t[1]=[e("option",{"data-placeholder":"true"},"Absolute",-1),e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512)]),e("div",xe,[e("select",_e,[...t[2]||(t[2]=[e("option",{"data-placeholder":"true"},"Fixed",-1),e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512)]),t[7]||(t[7]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const De=a($e,[["render",Oe]]),Me=s({name:"Css",mounted(){new o({select:this.$refs.selectClass}),new o({select:this.$refs.optionClass})}}),Ce={id:"cssClass",class:"content"},Te={class:"row"},Pe={ref:"selectClass",class:"select-class"},Be={ref:"optionClass",class:"option-class"};function Le(n,t,p,r,d,c){return u(),i("div",Ce,[t[2]||(t[2]=e("h2",{class:"header"},"css class",-1)),t[3]||(t[3]=e("p",null," Slim select will inherit any classes that were added to the original select element. This includes options as well. ",-1)),e("div",Te,[e("select",Pe,[...t[0]||(t[0]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),e("select",Be,[...t[1]||(t[1]=[e("option",{class:"red",value:"value1"},"Red",-1),e("option",{class:"green",value:"value2"},"Green",-1),e("option",{class:"blue",value:"value3"},"Blue",-1)])],512)]),t[4]||(t[4]=e("pre",null,[l("        "),e("code",{class:"language-html"},`
          <select id="select-class" class="classItems">
            <option class="red" value="value1">Value 1</option>
            <option class="green" value="value2">Value 2</option>
            <option class="blue" value="value3">Value 3</option>
          </select>
        `),l(`
      `)],-1))])}const Ae=a(Me,[["render",Le]]),Ee=s({name:"CustomCss",mounted(){new o({select:this.$refs.mainSelect,cssClasses:{option:"primary-option"}}),new o({select:this.$refs.secondarySelect,cssClasses:{option:"secondary-option"}})}}),je={id:"cssClasses",class:"content"},ke={class:"row"},He={ref:"mainSelect"},qe={ref:"secondarySelect"};function Ie(n,t,p,r,d,c){return u(),i("div",je,[t[2]||(t[2]=e("h2",{class:"header"},"cssClasses",-1)),t[3]||(t[3]=e("p",null,"You can override the default CSS classes by setting them during initialization.",-1)),e("div",ke,[e("select",He,[...t[0]||(t[0]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),e("select",qe,[...t[1]||(t[1]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512)]),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-html"},`
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
    `)],-1))])}const Re=a(Ee,[["render",Ie]]),Ne=s({name:"DataAttributes",mounted(){new o({select:this.$refs.optionsSingle}),new o({select:this.$refs.optionsMultiple})}}),Ge={id:"dataAttributes",class:"content"},Ue={class:"row"},Ye={ref:"optionsSingle"},Fe={ref:"optionsMultiple",multiple:""};function We(n,t,p,r,d,c){return u(),i("div",Ge,[t[2]||(t[2]=e("h2",{class:"header"},"Data Attributes",-1)),t[3]||(t[3]=e("p",null," Slim select will take on attributes of the original as best as possible. Below are example usages of attributes added to the underlining select options that slim select picked up and used ",-1)),e("div",Ue,[e("select",Ye,[...t[0]||(t[0]=[h('<option data-placeholder="true"></option><option value="value1" data-info="Here is info">Data Attributes</option><option value="value2" disabled>Disabled Option</option><option value="value3" class="green">Class Green</option><option value="value4" style="color:purple;">Inline Style</option>',5)])],512),e("select",Fe,[...t[1]||(t[1]=[e("option",{value:"value1","data-info":"Here is info"},"Data Attributes",-1),e("option",{value:"value2",disabled:""},"Disabled Option",-1),e("option",{value:"value3",class:"green"},"Class Green",-1),e("option",{value:"value4",style:{color:"purple"}},"Inline Style",-1)])],512)])])}const Ke=a(Ne,[["render",We]]),ze=s({name:"Deselect",mounted(){new o({select:this.$refs.allowDeselectSingle,settings:{allowDeselect:!0}}),new o({select:this.$refs.allowDeselectMultiple,settings:{allowDeselect:!0}})}}),Je={id:"allowDeselect",class:"content"},Qe={class:"row"},Xe={ref:"allowDeselectSingle"},Ze={ref:"allowDeselectMultiple",multiple:""};function et(n,t,p,r,d,c){return u(),i("div",Je,[t[2]||(t[2]=e("h2",{class:"header"},"allowDeselect",-1)),t[3]||(t[3]=e("p",null,"This will allow you to deselect a value on a single/multiple select dropdown.",-1)),t[4]||(t[4]=e("p",null,"Be sure to have an empty option data placeholder so slim select has an empty string value to select.",-1)),e("div",Qe,[e("select",Xe,[...t[0]||(t[0]=[e("option",{"data-placeholder":"true"},null,-1),e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),e("select",Ze,[...t[1]||(t[1]=[e("option",{"data-placeholder":"true"},null,-1),e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512)]),t[5]||(t[5]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const tt=a(ze,[["render",et]]),lt=s({name:"Disabled",mounted(){new o({select:this.$refs.disabledSingle,settings:{disabled:!0}}),new o({select:this.$refs.disabledMultiple}),new o({select:this.$refs.disabledOptionSingle,data:[{text:"Option 1",value:"option1"},{text:"Option 2",value:"option2",disabled:!0},{text:"Option 3",value:"option3"}]}),new o({select:this.$refs.disabledOptionMultiple}),new o({select:this.$refs.disabledDynamicSingle}).select.showUI()},methods:{enableDisableDynamic(){const n=this.$refs.disabledDynamicSingle;n&&(n.disabled=!n.disabled)}}}),ot={id:"disabled",class:"content"},nt={class:"row"},st={ref:"disabledSingle"},at={ref:"disabledMultiple",multiple:"",disabled:""},it={class:"row"},ut={ref:"disabledOptionSingle"},pt={ref:"disabledOptionMultiple",multiple:""},rt={class:"row"},dt={ref:"disabledDynamicSingle"};function ct(n,t,p,r,d,c){return u(),i("div",ot,[t[6]||(t[6]=e("h2",{class:"header"},"disabled",-1)),t[7]||(t[7]=e("p",null,"Allows the ability to disable the select dropdown as well as individual options",-1)),t[8]||(t[8]=e("div",{class:"alert info"},"Methods also are provided to enable and disable SlimSelect via method call.",-1)),e("div",nt,[e("select",st,[...t[1]||(t[1]=[e("option",{value:"value1",selected:""},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),e("select",at,[...t[2]||(t[2]=[e("option",{value:"value1",selected:""},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512)]),t[9]||(t[9]=e("br",null,null,-1)),e("div",it,[e("select",ut,[...t[3]||(t[3]=[e("option",{value:"value1",selected:""},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),e("select",pt,[...t[4]||(t[4]=[e("option",{value:"value1",selected:""},"Value 1",-1),e("option",{value:"value2",disabled:""},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512)]),t[10]||(t[10]=e("br",null,null,-1)),e("div",rt,[e("div",{class:"btn",onClick:t[0]||(t[0]=(...g)=>n.enableDisableDynamic&&n.enableDisableDynamic(...g))},"Enable/Disable Original Select"),e("select",dt,[...t[5]||(t[5]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512)]),t[11]||(t[11]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const vt=a(lt,[["render",ct]]),mt=s({name:"Display",mounted(){const n=new o({select:this.$refs.selectdisplay}),t=[{value:"value1",text:"Value 1",display:!1},{value:"value2",text:"Value 2"},{value:"value3",text:"Value 3"}];n.setData(t),n.setSelected(["value1","value3"]),new o({select:this.$refs.selectdisplay2})}}),ht={id:"display",class:"content"},gt={class:"row"},ft={ref:"selectdisplay",multiple:""},$t={class:"row"},wt={ref:"selectdisplay2",multiple:""};function Vt(n,t,p,r,d,c){return u(),i("div",ht,[t[1]||(t[1]=e("h2",{class:"header"},"display",-1)),t[2]||(t[2]=e("p",null,"Allows to hide elements of selected values.",-1)),e("div",gt,[e("select",ft,null,512)]),t[3]||(t[3]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1)),t[5]||(t[5]=e("p",null,"Or",-1)),e("div",$t,[e("select",wt,[...t[0]||(t[0]=[e("option",{value:"value1",style:{display:"none"},selected:""},"Value 1",-1),e("option",{value:"value2",selected:""},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512)]),t[6]||(t[6]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const bt=a(mt,[["render",Vt]]),St=s({name:"HideSelected",mounted(){new o({select:this.$refs.hideSelectedSingle,settings:{hideSelected:!0}}),new o({select:this.$refs.hideSelectedMultiple,settings:{hideSelected:!0}})}}),yt={id:"hideSelected",class:"content"},xt={class:"row"},_t={ref:"hideSelectedSingle"},Ot={ref:"hideSelectedMultiple",multiple:""};function Dt(n,t,p,r,d,c){return u(),i("div",yt,[t[2]||(t[2]=e("h2",{class:"header"},"hideSelected",-1)),t[3]||(t[3]=e("p",null,"hideSelected setting is used to hide the current selected option in the options dropdown.",-1)),e("div",xt,[e("select",_t,[...t[0]||(t[0]=[e("option",{"data-placeholder":"true"},null,-1),e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),e("select",Ot,[...t[1]||(t[1]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512)]),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const Mt=a(St,[["render",Dt]]),Ct=s({name:"Html",mounted(){new o({select:this.$refs.htmlSingle,settings:{searchHighlight:!0},data:[{html:"<b>Bold Text</b>",text:"Bold Text",value:"bold text"},{html:'<div style="border: solid 1px #666666;">Border</div>',text:"Border",value:"border"},{html:"<i>Slim Select is awesome</i>",text:"Slim Select is awesome"}]}),new o({select:this.$refs.htmlMulti,settings:{searchHighlight:!0}})}}),Tt={id:"html",class:"content"},Pt={class:"row"},Bt={ref:"htmlSingle"},Lt={ref:"htmlMulti",multiple:""};function At(n,t,p,r,d,c){return u(),i("div",Tt,[t[1]||(t[1]=e("h2",{class:"header"},"html",-1)),t[2]||(t[2]=e("p",null," Slim select has the ability to set custom html for the selected values and options dropdown. By default if the html field is set it will use that for the selected values and the options dropdown. For a multiple select selected values it will always use the text field. ",-1)),e("div",Pt,[e("select",Bt,null,512),e("select",Lt,[...t[0]||(t[0]=[e("option",{value:"bold text","data-html":"<b>Bold Text</b>"},"Bold Text",-1),e("option",{value:"border","data-html":"<div style='border: solid 1px #666666;'>Border</div>"},"Border",-1),e("option",{value:"slim select","data-html":"<i>Slim Select is awesome</i>"},"Slim Select is awesome",-1)])],512)]),t[3]||(t[3]=e("h3",null,"Via data",-1)),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const Et=a(Ct,[["render",At]]),jt=s({name:"KeepOrder",mounted(){new o({select:this.$refs.keepOrder,settings:{keepOrder:!0}})}}),kt={id:"keepOrder",class:"content"},Ht={class:"row"},qt={ref:"keepOrder",multiple:""};function It(n,t,p,r,d,c){return u(),i("div",kt,[t[1]||(t[1]=h('<h2 class="header">keepOrder</h2><p><code>keepOrder</code> controls the order returned by <code>getSelected()</code> in multi-select mode.</p><div class="alert"><p><strong>Important:</strong> This maintains <strong>selection order</strong> (the order you clicked), NOT DOM order! </p></div><p><strong>When false (default):</strong> Returns options in DOM order (how they appear in the HTML)</p><p><strong>When true:</strong> Returns options in the order they were clicked/selected by the user</p><h3>Example:</h3><p>If you have options: Apple, Banana, Cherry</p><ul><li>You click: Cherry → Apple → Banana</li><li><code>keepOrder: false</code> → returns <code>[&#39;Apple&#39;, &#39;Banana&#39;, &#39;Cherry&#39;]</code> (DOM order)</li><li><code>keepOrder: true</code> → returns <code>[&#39;Cherry&#39;, &#39;Apple&#39;, &#39;Banana&#39;]</code> (click order)</li></ul><p>Values: <strong>true</strong> | <strong>false</strong></p><p>Default: <strong>false</strong></p>',10)),e("div",Ht,[e("select",qt,[...t[0]||(t[0]=[h('<option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option><optgroup label="Label 1"><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option></optgroup><optgroup label="Label 2"><option value="value7">Value 7</option><option value="value8">Value 8</option><option value="value9">Value 9</option></optgroup>',5)])],512)]),t[2]||(t[2]=e("br",null,null,-1)),t[3]||(t[3]=e("h3",null,"Via html",-1)),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-html"},`
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
    `)],-1))])}const Rt=a(jt,[["render",It]]),Nt=s({name:"Mandatory",mounted(){const n=new o({select:this.$refs.selectMultiMandatory}),t=[{value:"value1",text:"Value 1",mandatory:!0},{value:"value2",text:"Value 2"},{value:"value3",text:"Value 3"}];n.setData(t),n.setSelected(["value1","value3"]),new o({select:this.$refs.selectMultiMandatory2})}}),Gt={id:"mandatory",class:"content"},Ut={class:"row"},Yt={ref:"selectMultiMandatory",multiple:""},Ft={class:"row"},Wt={ref:"selectMultiMandatory2",multiple:""};function Kt(n,t,p,r,d,c){return u(),i("div",Gt,[t[1]||(t[1]=e("h2",{class:"header"},"mandatory",-1)),t[2]||(t[2]=e("p",null," When using multi select you can set a mandatory on the option to prevent capability to deselect particular option. Note options with mandatory flag is not selected by default, you need select them yourselfs. ",-1)),e("div",Ut,[e("select",Yt,null,512)]),t[3]||(t[3]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1)),t[5]||(t[5]=e("p",null,"Or",-1)),e("div",Ft,[e("select",Wt,[...t[0]||(t[0]=[e("option",{value:"value1","data-mandatory":"true",selected:""},"Value 1",-1),e("option",{value:"value2",selected:""},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512)]),t[6]||(t[6]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const zt=a(Nt,[["render",Kt]]),Jt=s({name:"MaxValuesShown",mounted(){new o({select:this.$refs.maxValuesShown,settings:{maxValuesShown:5,maxValuesMessage:"{number} selected",allowDeselect:!0}})}}),Qt={id:"maxValuesShown",class:"content"},Xt={class:"row"},Zt={ref:"maxValuesShown",multiple:""};function el(n,t,p,r,d,c){return u(),i("div",Qt,[t[1]||(t[1]=e("h2",{class:"header"},"maxValuesShown",-1)),t[2]||(t[2]=e("p",null," When using multiselect you can set a threshold so when selecting more items than the input value, the items will not display as values, but the 'n selected' will be displayed. The text that will be displayed can be customized with the use of '{number}' in the maxValuesMessage setting. ",-1)),t[3]||(t[3]=e("p",null,[e("strong",null,"Default:"),l(" 20")],-1)),e("div",Xt,[e("select",Zt,[...t[0]||(t[0]=[h('<option value="value1" selected>Value 1</option><option value="value2" selected>Value 2</option><option value="value3" selected>Value 3</option><option value="value4" selected>Value 4</option><option value="value5" selected>Value 5</option><option value="value6" selected>Value 6</option><option value="value7">Value 7</option><option value="value8">Value 8</option>',8)])],512)]),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const tl=a(Jt,[["render",el]]),ll=s({name:"MinMax",mounted(){new o({select:this.$refs.selectMultiMax,settings:{allowDeselect:!0,closeOnSelect:!1,minSelected:2,maxSelected:5},events:{addable:n=>n}})}}),ol={id:"minmax",class:"content"},nl={class:"row"},sl={ref:"selectMultiMax",multiple:""};function al(n,t,p,r,d,c){return u(),i("div",ol,[t[1]||(t[1]=e("h2",{class:"header"},"Min/Max Selected",-1)),t[2]||(t[2]=e("p",null,"When using multi select you can set a min and/or max on the amount of selections you can have.",-1)),e("div",nl,[e("select",sl,[...t[0]||(t[0]=[h('<option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option>',6)])],512)]),t[3]||(t[3]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const il=a(ll,[["render",al]]),ul=s({name:"OpenPosition",mounted(){new o({select:this.$refs.openPositionUp,settings:{openPosition:"up"}}),new o({select:this.$refs.openPositionDown,settings:{openPosition:"down"}})}}),pl={id:"openPosition",class:"content"},rl={class:"row"},dl={ref:"openPositionUp"},cl={ref:"openPositionDown"};function vl(n,t,p,r,d,c){return u(),i("div",pl,[t[2]||(t[2]=e("h2",{class:"header"},"openPosition",-1)),t[3]||(t[3]=e("p",null," openPosition is a string value that will decide where to show your content when it comes out. By default slim select will try to put the content where it can without going off screen. But you may want to always show it in one direction. ",-1)),t[4]||(t[4]=e("p",null,[l("Possible Options: "),e("b",null,"'auto', 'up' or 'down'"),l(". Default is "),e("b",null,"'auto'")],-1)),e("div",rl,[e("select",dl,[...t[0]||(t[0]=[e("option",{value:"up1"},"Up 1",-1),e("option",{value:"up2"},"Up 2",-1),e("option",{value:"up3"},"Up 3",-1)])],512),e("select",cl,[...t[1]||(t[1]=[e("option",{value:"down1"},"Down 1",-1),e("option",{value:"down2"},"Down 2",-1),e("option",{value:"down3"},"Down 3",-1)])],512)]),t[5]||(t[5]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            openPosition: 'auto' // 'auto', 'up' or 'down'
          }
        })
      `),l(`
    `)],-1))])}const ml=a(ul,[["render",vl]]),hl=s({name:"Placeholder",mounted(){new o({select:this.$refs.placeholderSingle,settings:{placeholderText:"Custom Placeholder Text"}}),new o({select:this.$refs.placeholderMultiple,settings:{placeholderText:"Make Selection"}}),new o({select:this.$refs.placeholderNone,settings:{placeholderText:""}})}}),gl={id:"placeholder",class:"content"},fl={class:"row"},$l={ref:"placeholderSingle"},wl={ref:"placeholderMultiple",multiple:""},Vl={ref:"placeholderNone"};function bl(n,t,p,r,d,c){return u(),i("div",gl,[t[3]||(t[3]=e("h2",{class:"header"},"placeholderText",-1)),t[4]||(t[4]=e("p",null,' Placeholders consists of setting the placeholder option value. The only difference is single selects require an empty option with data-placeholder set to true. Default value is "Select Value". ',-1)),t[5]||(t[5]=e("div",{class:"alert info"}," Notice you can also set placeholder to empty if that is what you would like to do as well. ",-1)),e("div",fl,[e("select",$l,[...t[0]||(t[0]=[e("option",{"data-placeholder":"true"},null,-1),e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),e("select",wl,[...t[1]||(t[1]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),e("select",Vl,[...t[2]||(t[2]=[e("option",{"data-placeholder":"true"},null,-1),e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512)]),t[6]||(t[6]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const Sl=a(hl,[["render",bl]]),yl=s({name:"Search",mounted(){new o({select:this.$refs.showSearchSingle,settings:{showSearch:!1}}),new o({select:this.$refs.focusSearchSingle,settings:{focusSearch:!1}}),new o({select:this.$refs.searchTextSingle,settings:{searchText:"Sorry, nothing to see here"}}),new o({select:this.$refs.searchPlaceholderSingle,settings:{searchPlaceholder:"Search for the good stuff!"}}),new o({select:this.$refs.searchHighlightSingle,settings:{searchHighlight:!0}}),new o({select:this.$refs.showSearchMulti,settings:{showSearch:!1}}),new o({select:this.$refs.focusSearchMulti,settings:{focusSearch:!1}}),new o({select:this.$refs.searchTextMulti,settings:{searchText:"Sorry nothing to see here"}}),new o({select:this.$refs.searchPlaceholderMulti,settings:{searchPlaceholder:"Search for the good stuff!"}}),new o({select:this.$refs.searchHighlightMulti,settings:{searchHighlight:!0}})}}),xl={id:"search",class:"content"},_l={class:"row",style:{padding:"0 0 var(--spacing-half) 0"}},Ol={ref:"showSearchSingle"},Dl={ref:"focusSearchSingle"},Ml={ref:"searchTextSingle"},Cl={ref:"searchPlaceholderSingle"},Tl={ref:"searchHighlightSingle"},Pl={class:"row"},Bl={ref:"showSearchMulti",multiple:""},Ll={ref:"focusSearchMulti",multiple:""},Al={ref:"searchTextMulti",multiple:""},El={ref:"searchPlaceholderMulti",multiple:""},jl={ref:"searchHighlightMulti",multiple:""};function kl(n,t,p,r,d,c){return u(),i("div",xl,[t[10]||(t[10]=h('<h2 class="header">showSearch / focusSearch / searchText / searchingText / searchHighlight</h2><p><b>showSearch</b> - is a boolean value that will decide whether or not to show the search. Default is true.</p><p><b>focusSearch</b> - is a boolean value that will decide whether or not to focus on the search on open. Default is true. </p><p><b>searchText</b> - is a string value that will show in the event there are no results. Default is &#39;No Results&#39;. </p><p><b>searchingText</b> - is a string value that will show during an fetch search request. Default is &#39;Searching...&#39;. </p><p><b>searchPlaceholder</b> - is a string value that will set the value of the input search placeholder text. Default is &#39;Search&#39;. </p><p><b>searchHighlight</b> - is a boolean value that will highlight search results. Default is false.</p>',7)),e("div",_l,[e("select",Ol,[...t[0]||(t[0]=[e("option",{value:"dog"},"Dog",-1),e("option",{value:"cat"},"Cat",-1),e("option",{value:"bird"},"Bird",-1)])],512),e("select",Dl,[...t[1]||(t[1]=[e("option",{value:"dog"},"Dog",-1),e("option",{value:"cat"},"Cat",-1),e("option",{value:"bird"},"Bird",-1)])],512),e("select",Ml,[...t[2]||(t[2]=[e("option",{value:"dog"},"Dog",-1),e("option",{value:"cat"},"Cat",-1),e("option",{value:"bird"},"Bird",-1)])],512),e("select",Cl,[...t[3]||(t[3]=[e("option",{value:"dog"},"Dog",-1),e("option",{value:"cat"},"Cat",-1),e("option",{value:"bird"},"Bird",-1)])],512),e("select",Tl,[...t[4]||(t[4]=[e("option",{value:"dog"},"Dog",-1),e("option",{value:"cat"},"Cat",-1),e("option",{value:"bird"},"Bird",-1)])],512)]),e("div",Pl,[e("select",Bl,[...t[5]||(t[5]=[e("option",{value:"dog"},"Dog",-1),e("option",{value:"cat"},"Cat",-1),e("option",{value:"bird"},"Bird",-1)])],512),e("select",Ll,[...t[6]||(t[6]=[e("option",{value:"dog"},"Dog",-1),e("option",{value:"cat"},"Cat",-1),e("option",{value:"bird"},"Bird",-1)])],512),e("select",Al,[...t[7]||(t[7]=[e("option",{value:"dog"},"Dog",-1),e("option",{value:"cat"},"Cat",-1),e("option",{value:"bird"},"Bird",-1)])],512),e("select",El,[...t[8]||(t[8]=[e("option",{value:"dog"},"Dog",-1),e("option",{value:"cat"},"Cat",-1),e("option",{value:"bird"},"Bird",-1)])],512),e("select",jl,[...t[9]||(t[9]=[e("option",{value:"dog"},"Dog",-1),e("option",{value:"cat"},"Cat",-1),e("option",{value:"bird"},"Bird",-1)])],512)]),t[11]||(t[11]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const Hl=a(yl,[["render",kl]]),ql=s({name:"Select"}),Il={id:"select",class:"content"};function Rl(n,t,p,r,d,c){return u(),i("div",Il,[...t[0]||(t[0]=[e("h2",{class:"header"},"select",-1),e("p",null," The select field is used to identify the select element that will be used to create slim select. You can use any value you normally would in a querySelector or pass the element directly. ",-1),e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1)])])}const Nl=a(ql,[["render",Rl]]),Gl=s({name:"SelectAll",mounted(){new o({select:this.$refs.selectAll})}}),Ul={id:"selectAll",class:"content"},Yl={ref:"selectAll",multiple:""};function Fl(n,t,p,r,d,c){return u(),i("div",Ul,[t[1]||(t[1]=e("h2",{class:"header"},"selectAll",-1)),t[2]||(t[2]=e("p",null," selectAll is a setting that can be used to add a select all action to an optgroup. This setting can be set to true or false. If set to true, a select all option will be added to the top of the selected values. If set to false or not set at all, no select all action will be added to the optgroup. ",-1)),t[3]||(t[3]=e("p",null,"selectAllText is a setting that can be used to change the text of the select all optgroup.",-1)),t[4]||(t[4]=e("div",{class:"alert info"}," You can set selectAll/selectAllText either by data or by html dataset added to the optgroup element ",-1)),e("select",Yl,[...t[0]||(t[0]=[h('<optgroup label="Label 1" data-selectall="true" data-selectalltext="Select them all!"><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></optgroup><optgroup label="Label 2"><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option></optgroup>',2)])],512),t[5]||(t[5]=e("br",null,null,-1)),t[6]||(t[6]=e("h3",null,"Via data",-1)),t[7]||(t[7]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const Wl=a(Gl,[["render",Fl]]),Kl=s({name:"ShowTooltip",mounted(){new o({select:this.$refs.showOptionTooltips,settings:{showOptionTooltips:!0}})}}),zl={id:"showOptionTooltips",class:"content"},Jl={ref:"showOptionTooltips"};function Ql(n,t,p,r,d,c){return u(),i("div",zl,[t[1]||(t[1]=e("h2",{class:"header"},"showOptionTooltips",-1)),t[2]||(t[2]=e("p",null," showOptionTooltips option is used to active displaying the on-hover tooltips for select options. The tooltip text is equal to the option text content. ",-1)),e("select",Jl,[...t[0]||(t[0]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),t[3]||(t[3]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            showOptionTooltips: true,
          }
        })
      `),l(`
    `)],-1))])}const Xl=a(Kl,[["render",Ql]]),Zl=s({name:"Styles",mounted(){new o({select:this.$refs.selectStyle}),new o({select:this.$refs.optionStyle})}}),eo={id:"inlineStyles",class:"content"},to={class:"row"},lo={ref:"selectStyle",style:{color:"red"}},oo={ref:"optionStyle"};function no(n,t,p,r,d,c){return u(),i("div",eo,[t[2]||(t[2]=e("h2",{class:"header"},"inline styles",-1)),t[3]||(t[3]=e("p",null," Slim select will inherit any styles that were added to the original select element. This includes options as well. ",-1)),e("div",to,[e("select",lo,[...t[0]||(t[0]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),e("select",oo,[...t[1]||(t[1]=[e("option",{style:{color:"red"},value:"value1"},"Red",-1),e("option",{style:{color:"green"}},"Green",-1),e("option",{style:{color:"blue"}},"Blue",-1)])],512)]),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-html"},`
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
    `)],-1))])}const so=a(Zl,[["render",no]]),ao=s({name:"Settings",components:{Select:Nl,CssClasses:Re,AlwaysOpen:J,ContentLocation:fe,ContentPosition:De,OpenPosition:ml,Placeholder:Sl,Deselect:tt,Display:bt,Disabled:vt,Mandatory:zt,MinMax:il,DataAttributes:Ke,MaxValuesShown:tl,Css:Ae,Styles:so,Html:Et,KeepOrder:Rt,Search:Hl,CloseOnSelect:re,ShowTooltip:Xl,SelectAll:Wl,Closable:oe,HideSelected:Mt}}),io={id:"settings",class:"contents"};function uo(n,t,p,r,d,c){const g=m("Select"),f=m("CssClasses"),$=m("AlwaysOpen"),w=m("ContentLocation"),V=m("ContentPosition"),b=m("OpenPosition"),S=m("Placeholder"),y=m("SelectAll"),x=m("Deselect"),_=m("Display"),O=m("Disabled"),D=m("Mandatory"),M=m("MinMax"),C=m("DataAttributes"),T=m("Css"),P=m("Styles"),B=m("Html"),L=m("KeepOrder"),A=m("Search"),E=m("CloseOnSelect"),j=m("ShowTooltip"),k=m("Closable"),H=m("HideSelected"),q=m("MaxValuesShown");return u(),i("div",io,[v(g),v(f),v($),v(w),v(V),v(b),v(S),v(y),v(x),v(_),v(O),v(D),v(M),v(C),v(T),v(P),v(B),v(L),v(A),v(E),v(j),v(k),v(H),v(q)])}const ro=a(ao,[["render",uo]]);export{ro as default};
