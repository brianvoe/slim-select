import{d as s,S as o,_ as a,c as i,a as e,e as l,o as u,b as m,f as v,r as h}from"./index.js";const N=s({name:"AlwaysOpen",mounted(){new o({select:this.$refs.alwaysOpenSingle,settings:{alwaysOpen:!0,contentLocation:this.$refs.alwaysOpenSingleContent,contentPosition:"relative"}}),new o({select:this.$refs.alwaysOpenMultiple,settings:{alwaysOpen:!0,contentLocation:this.$refs.alwaysOpenMultipleContent,contentPosition:"relative"}})}}),G={id:"alwaysOpen",class:"content"},K={class:"row"},W={style:{height:"auto"}},J={ref:"alwaysOpenSingle"},Y={ref:"alwaysOpenSingleContent"},z={style:{height:"auto"}},Q={ref:"alwaysOpenMultiple",multiple:""},X={ref:"alwaysOpenMultipleContent"};function Z(n,t,p,r,d,c){return u(),i("div",G,[t[2]||(t[2]=e("h2",{class:"header"},"alwaysOpen",-1)),t[3]||(t[3]=e("p",null," alwaysOpen option is used to keep the select open at all times. This is useful for when you want to display the options at all times. ",-1)),e("div",K,[e("div",W,[e("select",J,[...t[0]||(t[0]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),e("div",Y,null,512)]),e("div",z,[e("select",Q,[...t[1]||(t[1]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1),e("option",{value:"value4"},"Value 4",-1)])],512),e("div",X,null,512)])]),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const ee=a(N,[["render",Z]]),te=s({name:"Closable",mounted(){new o({select:this.$refs.closableSingle}),new o({select:this.$refs.closableMultiple})}}),le={id:"closable",class:"content"},oe={class:"row"},ne={ref:"closableSingle"},se={ref:"closableMultiple",multiple:""};function ae(n,t,p,r,d,c){return u(),i("div",le,[t[2]||(t[2]=m('<h2 class="header">closable</h2><p>closable is a optgroup settings that adds the ability to have closable optgroup options.</p><p>Values: <strong>&quot;off&quot;</strong> | <strong>&quot;open&quot;</strong> | <strong>&quot;close&quot;</strong></p><p>Default: <strong>&quot;off&quot;</strong></p><div class="alert info">You can set closable either by data or by html dataset added to the optgroup element</div>',5)),e("div",oe,[e("select",ne,[...t[0]||(t[0]=[m('<optgroup label="Label 1" data-closable="off"><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></optgroup><optgroup label="Label 2" data-closable="open"><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option></optgroup><optgroup label="Label 3" data-closable="close"><option value="value7">Value 7</option><option value="value8">Value 8</option><option value="value9">Value 9</option></optgroup>',3)])],512),e("select",se,[...t[1]||(t[1]=[m('<optgroup label="Label 1" data-selectall="true" data-closable="off"><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></optgroup><optgroup label="Label 2" data-selectall="true" data-closable="open"><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option></optgroup><optgroup label="Label 3" data-selectall="true" data-closable="close"><option value="value7">Value 7</option><option value="value8">Value 8</option><option value="value9">Value 9</option></optgroup>',3)])],512)]),t[3]||(t[3]=e("br",null,null,-1)),t[4]||(t[4]=e("h3",null,"Via data",-1)),t[5]||(t[5]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const ie=a(te,[["render",ae]]),ue=s({name:"CloseOnSelect",mounted(){new o({select:this.$refs.closeOnSelectSingle,settings:{closeOnSelect:!1}}),new o({select:this.$refs.closeOnSelectMultiple,settings:{closeOnSelect:!1,selectByGroup:!0}})}}),pe={id:"closeOnSelect",class:"content"},re={class:"row"},de={ref:"closeOnSelectSingle"},ce={ref:"closeOnSelectMultiple",multiple:""};function ve(n,t,p,r,d,c){return u(),i("div",pe,[t[2]||(t[2]=e("h2",{class:"header"},"closeOnSelect",-1)),t[3]||(t[3]=e("p",null," closeOnSelect is a boolean value in which determines whether or not to close the content area upon selecting a value. ",-1)),e("div",re,[e("select",de,[...t[0]||(t[0]=[m('<option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option><optgroup label="Super Values"><option value="value11">Value 1</option><option value="value22">Value 2</option><option value="value33">Value 3</option></optgroup>',4)])],512),e("select",ce,[...t[1]||(t[1]=[m('<option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option><optgroup label="Super Values"><option value="value11">Value 1</option><option value="value22">Value 2</option><option value="value33">Value 3</option></optgroup>',4)])],512)]),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#search',
          settings: {
            closeOnSelect: false,
          },
        })
      `),l(`
    `)],-1))])}const he=a(ue,[["render",ve]]),me=s({name:"ContentLocation",mounted(){new o({select:this.$refs.contentLocation,settings:{contentLocation:this.$refs.local}})}}),ge={id:"contentLocation",class:"content"},fe={class:"row"},$e={ref:"contentLocation",style:{width:"50%"}},we={ref:"local"};function Se(n,t,p,r,d,c){return u(),i("div",ge,[t[1]||(t[1]=e("h2",{class:"header"},"contentLocation",-1)),t[2]||(t[2]=e("p",null," contentLocation will allow you to set the location of where the content section of slim select. By default every content div is appended to the body. ",-1)),t[3]||(t[3]=e("p",null," The content container is the bottom half of slim select. This includes the search input field and available options ",-1)),e("div",fe,[e("select",$e,[...t[0]||(t[0]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),e("div",we,null,512)]),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const Ve=a(me,[["render",Se]]),be=s({name:"ContentPosition",mounted(){new o({select:this.$refs.contentPositionRelative,settings:{contentPosition:"relative",contentLocation:this.$refs.contentPositionRelativeContent}}),new o({select:this.$refs.contentPositionAbsolute,settings:{contentPosition:"absolute"}}),new o({select:this.$refs.contentPositionFixed,settings:{contentPosition:"fixed"}})}}),ye={id:"contentPosition",class:"content"},xe={class:"row"},_e={ref:"contentPositionRelative",class:"relative"},Oe={ref:"contentPositionRelativeContent"},De={ref:"contentPositionAbsolute",class:"absolute"},Me={class:"row"},Ce={ref:"contentPositionFixed",class:"fixed"};function Te(n,t,p,r,d,c){return u(),i("div",ye,[t[3]||(t[3]=e("h2",{class:"header"},"contentPosition",-1)),t[4]||(t[4]=e("p",null,[l("contentPosition will set the css position to relative, absolute or fixed. Default is "),e("b",null,"'absolute'")],-1)),t[5]||(t[5]=e("div",{class:"alert info"}," If you do use relative position be sure to set the contentLocation to an element that will work best for your use case. Otherwise SlimSelect will add you content to the body of the html. See example usage below. ",-1)),t[6]||(t[6]=e("div",{class:"alert info"}," Fixed was added to address issues with fixed positioning in modals and other elements that have fixed positioning. ",-1)),e("div",xe,[e("select",_e,[...t[0]||(t[0]=[e("option",{"data-placeholder":"true"},"Relative",-1),e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),e("div",Oe,null,512),e("select",De,[...t[1]||(t[1]=[e("option",{"data-placeholder":"true"},"Absolute",-1),e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512)]),e("div",Me,[e("select",Ce,[...t[2]||(t[2]=[e("option",{"data-placeholder":"true"},"Fixed",-1),e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512)]),t[7]||(t[7]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const Pe=a(be,[["render",Te]]),Be=s({name:"Css",mounted(){new o({select:this.$refs.selectClass}),new o({select:this.$refs.optionClass})}}),Le={id:"cssClass",class:"content"},Ae={class:"row"},He={ref:"selectClass",class:"select-class"},Ee={ref:"optionClass",class:"option-class"};function je(n,t,p,r,d,c){return u(),i("div",Le,[t[2]||(t[2]=e("h2",{class:"header"},"css class",-1)),t[3]||(t[3]=e("p",null," Slim select will inherit any classes that were added to the original select element. This includes options as well. ",-1)),e("div",Ae,[e("select",He,[...t[0]||(t[0]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),e("select",Ee,[...t[1]||(t[1]=[e("option",{class:"red",value:"value1"},"Red",-1),e("option",{class:"green",value:"value2"},"Green",-1),e("option",{class:"blue",value:"value3"},"Blue",-1)])],512)]),t[4]||(t[4]=e("pre",null,[l("        "),e("code",{class:"language-html"},`
          <select id="select-class" class="classItems">
            <option class="red" value="value1">Value 1</option>
            <option class="green" value="value2">Value 2</option>
            <option class="blue" value="value3">Value 3</option>
          </select>
        `),l(`
      `)],-1))])}const ke=a(Be,[["render",je]]),qe=s({name:"CustomCss",mounted(){new o({select:this.$refs.mainSelect,cssClasses:{option:"primary-option"}}),new o({select:this.$refs.secondarySelect,cssClasses:{option:"secondary-option"}})}}),Re={id:"cssClasses",class:"content"},Ue={class:"row"},Ie={ref:"mainSelect"},Fe={ref:"secondarySelect"};function Ne(n,t,p,r,d,c){return u(),i("div",Re,[t[2]||(t[2]=e("h2",{class:"header"},"cssClasses",-1)),t[3]||(t[3]=e("p",null,"You can override the default CSS classes by setting them during initialization.",-1)),e("div",Ue,[e("select",Ie,[...t[0]||(t[0]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),e("select",Fe,[...t[1]||(t[1]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512)]),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-html"},`
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
    `)],-1))])}const Ge=a(qe,[["render",Ne]]),Ke=s({name:"DataAttributes",mounted(){new o({select:this.$refs.optionsSingle}),new o({select:this.$refs.optionsMultiple})}}),We={id:"dataAttributes",class:"content"},Je={class:"row"},Ye={ref:"optionsSingle"},ze={ref:"optionsMultiple",multiple:""};function Qe(n,t,p,r,d,c){return u(),i("div",We,[t[2]||(t[2]=e("h2",{class:"header"},"Data Attributes",-1)),t[3]||(t[3]=e("p",null," Slim select will take on attributes of the original as best as possible. Below are example usages of attributes added to the underlining select options that slim select picked up and used ",-1)),e("div",Je,[e("select",Ye,[...t[0]||(t[0]=[m('<option data-placeholder="true"></option><option value="value1" data-info="Here is info">Data Attributes</option><option value="value2" disabled>Disabled Option</option><option value="value3" class="green">Class Green</option><option value="value4" style="color:purple;">Inline Style</option>',5)])],512),e("select",ze,[...t[1]||(t[1]=[e("option",{value:"value1","data-info":"Here is info"},"Data Attributes",-1),e("option",{value:"value2",disabled:""},"Disabled Option",-1),e("option",{value:"value3",class:"green"},"Class Green",-1),e("option",{value:"value4",style:{color:"purple"}},"Inline Style",-1)])],512)])])}const Xe=a(Ke,[["render",Qe]]),Ze=s({name:"Deselect",mounted(){new o({select:this.$refs.allowDeselectSingle,settings:{allowDeselect:!0}}),new o({select:this.$refs.allowDeselectMultiple,settings:{allowDeselect:!0}})}}),et={id:"allowDeselect",class:"content"},tt={class:"row"},lt={ref:"allowDeselectSingle"},ot={ref:"allowDeselectMultiple",multiple:""};function nt(n,t,p,r,d,c){return u(),i("div",et,[t[2]||(t[2]=e("h2",{class:"header"},"allowDeselect",-1)),t[3]||(t[3]=e("p",null,"This will allow you to deselect a value on a single/multiple select dropdown.",-1)),t[4]||(t[4]=e("p",null,"Be sure to have an empty option data placeholder so slim select has an empty string value to select.",-1)),e("div",tt,[e("select",lt,[...t[0]||(t[0]=[e("option",{"data-placeholder":"true"},null,-1),e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),e("select",ot,[...t[1]||(t[1]=[e("option",{"data-placeholder":"true"},null,-1),e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512)]),t[5]||(t[5]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const st=a(Ze,[["render",nt]]),at=s({name:"Disabled",mounted(){new o({select:this.$refs.disabledSingle,settings:{disabled:!0}}),new o({select:this.$refs.disabledMultiple}),new o({select:this.$refs.disabledOptionSingle,data:[{text:"Option 1",value:"option1"},{text:"Option 2",value:"option2",disabled:!0},{text:"Option 3",value:"option3"}]}),new o({select:this.$refs.disabledOptionMultiple}),new o({select:this.$refs.disabledDynamicSingle}).select.showUI()},methods:{enableDisableDynamic(){const n=this.$refs.disabledDynamicSingle;n&&(n.disabled=!n.disabled)}}}),it={id:"disabled",class:"content"},ut={class:"row"},pt={ref:"disabledSingle"},rt={ref:"disabledMultiple",multiple:"",disabled:""},dt={class:"row"},ct={ref:"disabledOptionSingle"},vt={ref:"disabledOptionMultiple",multiple:""},ht={class:"row"},mt={ref:"disabledDynamicSingle"};function gt(n,t,p,r,d,c){return u(),i("div",it,[t[6]||(t[6]=e("h2",{class:"header"},"disabled",-1)),t[7]||(t[7]=e("p",null,"Allows the ability to disable the select dropdown as well as individual options",-1)),t[8]||(t[8]=e("div",{class:"alert info"},"Methods also are provided to enable and disable SlimSelect via method call.",-1)),e("div",ut,[e("select",pt,[...t[1]||(t[1]=[e("option",{value:"value1",selected:""},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),e("select",rt,[...t[2]||(t[2]=[e("option",{value:"value1",selected:""},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512)]),t[9]||(t[9]=e("br",null,null,-1)),e("div",dt,[e("select",ct,[...t[3]||(t[3]=[e("option",{value:"value1",selected:""},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),e("select",vt,[...t[4]||(t[4]=[e("option",{value:"value1",selected:""},"Value 1",-1),e("option",{value:"value2",disabled:""},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512)]),t[10]||(t[10]=e("br",null,null,-1)),e("div",ht,[e("div",{class:"btn",onClick:t[0]||(t[0]=(...g)=>n.enableDisableDynamic&&n.enableDisableDynamic(...g))},"Enable/Disable Original Select"),e("select",mt,[...t[5]||(t[5]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512)]),t[11]||(t[11]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const ft=a(at,[["render",gt]]),$t=s({name:"Display",mounted(){const n=new o({select:this.$refs.selectdisplay}),t=[{value:"value1",text:"Value 1",display:!1},{value:"value2",text:"Value 2"},{value:"value3",text:"Value 3"}];n.setData(t),n.setSelected(["value1","value3"]),new o({select:this.$refs.selectdisplay2})}}),wt={id:"display",class:"content"},St={class:"row"},Vt={ref:"selectdisplay",multiple:""},bt={class:"row"},yt={ref:"selectdisplay2",multiple:""};function xt(n,t,p,r,d,c){return u(),i("div",wt,[t[1]||(t[1]=e("h2",{class:"header"},"display",-1)),t[2]||(t[2]=e("p",null,"Allows to hide elements of selected values.",-1)),e("div",St,[e("select",Vt,null,512)]),t[3]||(t[3]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1)),t[5]||(t[5]=e("p",null,"Or",-1)),e("div",bt,[e("select",yt,[...t[0]||(t[0]=[e("option",{value:"value1",style:{display:"none"},selected:""},"Value 1",-1),e("option",{value:"value2",selected:""},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512)]),t[6]||(t[6]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const _t=a($t,[["render",xt]]),Ot=s({name:"HideSelected",mounted(){new o({select:this.$refs.hideSelectedSingle,settings:{hideSelected:!0}}),new o({select:this.$refs.hideSelectedMultiple,settings:{hideSelected:!0}})}}),Dt={id:"hideSelected",class:"content"},Mt={class:"row"},Ct={ref:"hideSelectedSingle"},Tt={ref:"hideSelectedMultiple",multiple:""};function Pt(n,t,p,r,d,c){return u(),i("div",Dt,[t[2]||(t[2]=e("h2",{class:"header"},"hideSelected",-1)),t[3]||(t[3]=e("p",null,"hideSelected setting is used to hide the current selected option in the options dropdown.",-1)),e("div",Mt,[e("select",Ct,[...t[0]||(t[0]=[e("option",{"data-placeholder":"true"},null,-1),e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),e("select",Tt,[...t[1]||(t[1]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512)]),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const Bt=a(Ot,[["render",Pt]]),Lt=s({name:"Html",mounted(){new o({select:this.$refs.htmlSingle,settings:{searchHighlight:!0},data:[{html:"<b>Bold Text</b>",text:"Bold Text",value:"bold text"},{html:'<div style="border: solid 1px #666666;">Border</div>',text:"Border",value:"border"},{html:"<i>Slim Select is awesome</i>",text:"Slim Select is awesome"}]}),new o({select:this.$refs.htmlMulti,settings:{searchHighlight:!0}})}}),At={id:"html",class:"content"},Ht={class:"row"},Et={ref:"htmlSingle"},jt={ref:"htmlMulti",multiple:""};function kt(n,t,p,r,d,c){return u(),i("div",At,[t[1]||(t[1]=e("h2",{class:"header"},"html",-1)),t[2]||(t[2]=e("p",null," Slim select has the ability to set custom html for the selected values and options dropdown. By default if the html field is set it will use that for the selected values and the options dropdown. For a multiple select selected values it will always use the text field. ",-1)),e("div",Ht,[e("select",Et,null,512),e("select",jt,[...t[0]||(t[0]=[e("option",{value:"bold text","data-html":"<b>Bold Text</b>"},"Bold Text",-1),e("option",{value:"border","data-html":"<div style='border: solid 1px #666666;'>Border</div>"},"Border",-1),e("option",{value:"slim select","data-html":"<i>Slim Select is awesome</i>"},"Slim Select is awesome",-1)])],512)]),t[3]||(t[3]=e("h3",null,"Via data",-1)),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const qt=a(Lt,[["render",kt]]),Rt=s({name:"KeepOrder",mounted(){new o({select:this.$refs.keepOrder,settings:{keepOrder:!0}})}}),Ut={id:"keepOrder",class:"content"},It={class:"row"},Ft={ref:"keepOrder",multiple:""};function Nt(n,t,p,r,d,c){return u(),i("div",Ut,[t[1]||(t[1]=m('<h2 class="header">keepOrder</h2><p><code>keepOrder</code> controls the order returned by <code>getSelected()</code> in multi-select mode.</p><div class="alert"><p><strong>Important:</strong> This maintains <strong>selection order</strong> (the order you clicked), NOT DOM order! </p></div><p><strong>When false (default):</strong> Returns options in DOM order (how they appear in the HTML)</p><p><strong>When true:</strong> Returns options in the order they were clicked/selected by the user</p><h3>Example:</h3><p>If you have options: Apple, Banana, Cherry</p><ul><li>You click: Cherry → Apple → Banana</li><li><code>keepOrder: false</code> → returns <code>[&#39;Apple&#39;, &#39;Banana&#39;, &#39;Cherry&#39;]</code> (DOM order)</li><li><code>keepOrder: true</code> → returns <code>[&#39;Cherry&#39;, &#39;Apple&#39;, &#39;Banana&#39;]</code> (click order)</li></ul><p>Values: <strong>true</strong> | <strong>false</strong></p><p>Default: <strong>false</strong></p>',10)),e("div",It,[e("select",Ft,[...t[0]||(t[0]=[m('<option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option><optgroup label="Label 1"><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option></optgroup><optgroup label="Label 2"><option value="value7">Value 7</option><option value="value8">Value 8</option><option value="value9">Value 9</option></optgroup>',5)])],512)]),t[2]||(t[2]=e("br",null,null,-1)),t[3]||(t[3]=e("h3",null,"Via html",-1)),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-html"},`
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
    `)],-1))])}const Gt=a(Rt,[["render",Nt]]),Kt=s({name:"Mandatory",mounted(){const n=new o({select:this.$refs.selectMultiMandatory}),t=[{value:"value1",text:"Value 1",mandatory:!0},{value:"value2",text:"Value 2"},{value:"value3",text:"Value 3"}];n.setData(t),n.setSelected(["value1","value3"]),new o({select:this.$refs.selectMultiMandatory2})}}),Wt={id:"mandatory",class:"content"},Jt={class:"row"},Yt={ref:"selectMultiMandatory",multiple:""},zt={class:"row"},Qt={ref:"selectMultiMandatory2",multiple:""};function Xt(n,t,p,r,d,c){return u(),i("div",Wt,[t[1]||(t[1]=e("h2",{class:"header"},"mandatory",-1)),t[2]||(t[2]=e("p",null," When using multi select you can set a mandatory on the option to prevent capability to deselect particular option. Note options with mandatory flag is not selected by default, you need select them yourselfs. ",-1)),e("div",Jt,[e("select",Yt,null,512)]),t[3]||(t[3]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1)),t[5]||(t[5]=e("p",null,"Or",-1)),e("div",zt,[e("select",Qt,[...t[0]||(t[0]=[e("option",{value:"value1","data-mandatory":"true",selected:""},"Value 1",-1),e("option",{value:"value2",selected:""},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512)]),t[6]||(t[6]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const Zt=a(Kt,[["render",Xt]]),el=s({name:"MaxValuesShown",mounted(){new o({select:this.$refs.maxValuesShown,settings:{maxValuesShown:5,maxValuesMessage:"{number} selected",allowDeselect:!0}})}}),tl={id:"maxValuesShown",class:"content"},ll={class:"row"},ol={ref:"maxValuesShown",multiple:""};function nl(n,t,p,r,d,c){return u(),i("div",tl,[t[1]||(t[1]=e("h2",{class:"header"},"maxValuesShown",-1)),t[2]||(t[2]=e("p",null," When using multiselect you can set a threshold so when selecting more items than the input value, the items will not display as values, but the 'n selected' will be displayed. The text that will be displayed can be customized with the use of '{number}' in the maxValuesMessage setting. ",-1)),t[3]||(t[3]=e("p",null,[e("strong",null,"Default:"),l(" 20")],-1)),e("div",ll,[e("select",ol,[...t[0]||(t[0]=[m('<option value="value1" selected>Value 1</option><option value="value2" selected>Value 2</option><option value="value3" selected>Value 3</option><option value="value4" selected>Value 4</option><option value="value5" selected>Value 5</option><option value="value6" selected>Value 6</option><option value="value7">Value 7</option><option value="value8">Value 8</option>',8)])],512)]),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const sl=a(el,[["render",nl]]),al=s({name:"MinMax",mounted(){new o({select:this.$refs.selectMultiMax,settings:{allowDeselect:!0,closeOnSelect:!1,minSelected:2,maxSelected:5},events:{addable:n=>n}})}}),il={id:"minmax",class:"content"},ul={class:"row"},pl={ref:"selectMultiMax",multiple:""};function rl(n,t,p,r,d,c){return u(),i("div",il,[t[1]||(t[1]=e("h2",{class:"header"},"Min/Max Selected",-1)),t[2]||(t[2]=e("p",null,"When using multi select you can set a min and/or max on the amount of selections you can have.",-1)),e("div",ul,[e("select",pl,[...t[0]||(t[0]=[m('<option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option>',6)])],512)]),t[3]||(t[3]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const dl=a(al,[["render",rl]]),cl=s({name:"OpenPosition",mounted(){new o({select:this.$refs.openPositionUp,settings:{openPosition:"up"}}),new o({select:this.$refs.openPositionDown,settings:{openPosition:"down"}})}}),vl={id:"openPosition",class:"content"},hl={class:"row"},ml={ref:"openPositionUp"},gl={ref:"openPositionDown"};function fl(n,t,p,r,d,c){return u(),i("div",vl,[t[2]||(t[2]=e("h2",{class:"header"},"openPosition",-1)),t[3]||(t[3]=e("p",null," openPosition is a string value that will decide where to show your content when it comes out. By default slim select will try to put the content where it can without going off screen. But you may want to always show it in one direction. ",-1)),t[4]||(t[4]=e("p",null,[l("Possible Options: "),e("b",null,"'auto', 'up' or 'down'"),l(". Default is "),e("b",null,"'auto'")],-1)),e("div",hl,[e("select",ml,[...t[0]||(t[0]=[e("option",{value:"up1"},"Up 1",-1),e("option",{value:"up2"},"Up 2",-1),e("option",{value:"up3"},"Up 3",-1)])],512),e("select",gl,[...t[1]||(t[1]=[e("option",{value:"down1"},"Down 1",-1),e("option",{value:"down2"},"Down 2",-1),e("option",{value:"down3"},"Down 3",-1)])],512)]),t[5]||(t[5]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            openPosition: 'auto' // 'auto', 'up' or 'down'
          }
        })
      `),l(`
    `)],-1))])}const $l=a(cl,[["render",fl]]),wl=s({name:"Placeholder",mounted(){new o({select:this.$refs.placeholderSingle,settings:{placeholderText:"Custom Placeholder Text"}}),new o({select:this.$refs.placeholderMultiple,settings:{placeholderText:"Make Selection"}}),new o({select:this.$refs.placeholderNone,settings:{placeholderText:""}})}}),Sl={id:"placeholder",class:"content"},Vl={class:"row"},bl={ref:"placeholderSingle"},yl={ref:"placeholderMultiple",multiple:""},xl={ref:"placeholderNone"};function _l(n,t,p,r,d,c){return u(),i("div",Sl,[t[3]||(t[3]=e("h2",{class:"header"},"placeholderText",-1)),t[4]||(t[4]=e("p",null,' Placeholders consists of setting the placeholder option value. The only difference is single selects require an empty option with data-placeholder set to true. Default value is "Select Value". ',-1)),t[5]||(t[5]=e("div",{class:"alert info"}," Notice you can also set placeholder to empty if that is what you would like to do as well. ",-1)),e("div",Vl,[e("select",bl,[...t[0]||(t[0]=[e("option",{"data-placeholder":"true"},null,-1),e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),e("select",yl,[...t[1]||(t[1]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),e("select",xl,[...t[2]||(t[2]=[e("option",{"data-placeholder":"true"},null,-1),e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512)]),t[6]||(t[6]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const Ol=a(wl,[["render",_l]]),Dl=s({name:"ShowSearch",mounted(){new o({select:this.$refs.showSearchSingle,settings:{showSearch:!1}}),new o({select:this.$refs.showSearchMulti,settings:{showSearch:!1}})}}),Ml={id:"showSearch",class:"content"},Cl={class:"row",style:{padding:"0 0 var(--spacing-half) 0"}},Tl={ref:"showSearchSingle"},Pl={class:"row"},Bl={ref:"showSearchMulti",multiple:""};function Ll(n,t,p,r,d,c){return u(),i("div",Ml,[t[2]||(t[2]=e("h2",{class:"header"},"showSearch",-1)),t[3]||(t[3]=e("p",null,[e("b",null,"showSearch"),l(" - is a boolean value that will decide whether or not to show the search input. Default is true. ")],-1)),e("div",Cl,[e("select",Tl,[...t[0]||(t[0]=[e("option",{value:"dog"},"Dog",-1),e("option",{value:"cat"},"Cat",-1),e("option",{value:"bird"},"Bird",-1)])],512)]),e("div",Pl,[e("select",Bl,[...t[1]||(t[1]=[e("option",{value:"dog"},"Dog",-1),e("option",{value:"cat"},"Cat",-1),e("option",{value:"bird"},"Bird",-1)])],512)]),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            showSearch: false
          }
        })
      `),l(`
    `)],-1))])}const Al=a(Dl,[["render",Ll]]),Hl=s({name:"FocusSearch",mounted(){new o({select:this.$refs.focusSearchSingle,settings:{focusSearch:!1}}),new o({select:this.$refs.focusSearchMulti,settings:{focusSearch:!1}})}}),El={id:"focusSearch",class:"content"},jl={class:"row",style:{padding:"0 0 var(--spacing-half) 0"}},kl={ref:"focusSearchSingle"},ql={class:"row"},Rl={ref:"focusSearchMulti",multiple:""};function Ul(n,t,p,r,d,c){return u(),i("div",El,[t[2]||(t[2]=e("h2",{class:"header"},"focusSearch",-1)),t[3]||(t[3]=e("p",null," Boolean value that will decide whether or not to automatically focus on the search input when the dropdown opens. Default is true. ",-1)),e("div",jl,[e("select",kl,[...t[0]||(t[0]=[e("option",{value:"dog"},"Dog",-1),e("option",{value:"cat"},"Cat",-1),e("option",{value:"bird"},"Bird",-1)])],512)]),e("div",ql,[e("select",Rl,[...t[1]||(t[1]=[e("option",{value:"dog"},"Dog",-1),e("option",{value:"cat"},"Cat",-1),e("option",{value:"bird"},"Bird",-1)])],512)]),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            focusSearch: false
          }
        })
      `),l(`
    `)],-1))])}const Il=a(Hl,[["render",Ul]]),Fl=s({name:"SearchText",mounted(){new o({select:this.$refs.searchTextSingle,settings:{searchText:"Sorry, nothing to see here"}}),new o({select:this.$refs.searchTextMulti,settings:{searchText:"Sorry nothing to see here"}})}}),Nl={id:"searchText",class:"content"},Gl={class:"row",style:{padding:"0 0 var(--spacing-half) 0"}},Kl={ref:"searchTextSingle"},Wl={class:"row"},Jl={ref:"searchTextMulti",multiple:""};function Yl(n,t,p,r,d,c){return u(),i("div",Nl,[t[2]||(t[2]=e("h2",{class:"header"},"searchText",-1)),t[3]||(t[3]=e("p",null,"String value that will show in the event there are no search results. Default is 'No Results'.",-1)),e("div",Gl,[e("select",Kl,[...t[0]||(t[0]=[e("option",{value:"dog"},"Dog",-1),e("option",{value:"cat"},"Cat",-1),e("option",{value:"bird"},"Bird",-1)])],512)]),e("div",Wl,[e("select",Jl,[...t[1]||(t[1]=[e("option",{value:"dog"},"Dog",-1),e("option",{value:"cat"},"Cat",-1),e("option",{value:"bird"},"Bird",-1)])],512)]),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            searchText: 'Sorry, nothing to see here'
          }
        })
      `),l(`
    `)],-1))])}const zl=a(Fl,[["render",Yl]]),Ql=s({name:"SearchPlaceholder",mounted(){new o({select:this.$refs.searchPlaceholderSingle,settings:{searchPlaceholder:"Search for the good stuff!"}}),new o({select:this.$refs.searchPlaceholderMulti,settings:{searchPlaceholder:"Search for the good stuff!"}})}}),Xl={id:"searchPlaceholder",class:"content"},Zl={class:"row",style:{padding:"0 0 var(--spacing-half) 0"}},eo={ref:"searchPlaceholderSingle"},to={class:"row"},lo={ref:"searchPlaceholderMulti",multiple:""};function oo(n,t,p,r,d,c){return u(),i("div",Xl,[t[2]||(t[2]=e("h2",{class:"header"},"searchPlaceholder",-1)),t[3]||(t[3]=e("p",null,"String value that will set the placeholder text of the search input. Default is 'Search'.",-1)),e("div",Zl,[e("select",eo,[...t[0]||(t[0]=[e("option",{value:"dog"},"Dog",-1),e("option",{value:"cat"},"Cat",-1),e("option",{value:"bird"},"Bird",-1)])],512)]),e("div",to,[e("select",lo,[...t[1]||(t[1]=[e("option",{value:"dog"},"Dog",-1),e("option",{value:"cat"},"Cat",-1),e("option",{value:"bird"},"Bird",-1)])],512)]),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            searchPlaceholder: 'Search for the good stuff!'
          }
        })
      `),l(`
    `)],-1))])}const no=a(Ql,[["render",oo]]),so=s({name:"SearchHighlight",data(){return{htmlData:[{text:"United States",value:"US",html:'<span style="color: #e74c3c;">🇺🇸</span> United States'},{text:"Canada",value:"CA",html:'<span style="color: #3498db;">🇨🇦</span> Canada'},{text:"United Kingdom",value:"UK",html:'<span style="color: #9b59b6;">🇬🇧</span> United Kingdom'},{text:"Germany",value:"DE",html:'<span style="color: #f39c12;">🇩🇪</span> Germany'},{text:"France",value:"FR",html:'<span style="color: #1abc9c;">🇫🇷</span> France'},{text:"Japan",value:"JP",html:'<span style="color: #e67e22;">🇯🇵</span> Japan'},{text:"Australia",value:"AU",html:'<span style="color: #16a085;">🇦🇺</span> Australia'},{text:"Brazil",value:"BR",html:'<span style="color: #27ae60;">🇧🇷</span> Brazil'}]}},mounted(){new o({select:this.$refs.searchHighlightSingle,settings:{searchHighlight:!0}}),new o({select:this.$refs.searchHighlightMulti,settings:{searchHighlight:!0}}),new o({select:this.$refs.searchHighlightHtml,settings:{searchHighlight:!0},data:this.htmlData})}}),ao={id:"searchHighlight",class:"content"},io={class:"row",style:{padding:"0 0 var(--spacing-half) 0"}},uo={ref:"searchHighlightSingle"},po={class:"row",style:{padding:"0 0 var(--spacing-half) 0"}},ro={ref:"searchHighlightMulti",multiple:""},co={class:"row",style:{padding:"0 0 var(--spacing-half) 0"}},vo={ref:"searchHighlightHtml"};function ho(n,t,p,r,d,c){return u(),i("div",ao,[t[2]||(t[2]=e("h2",{class:"header"},"searchHighlight",-1)),t[3]||(t[3]=e("p",null,[l(" Boolean value that will highlight matching text in search results. Default is false. When enabled, matching text will be highlighted with a "),e("code",null,"<mark>"),l(" element. ")],-1)),e("div",io,[e("select",uo,[...t[0]||(t[0]=[m('<option value="javascript">JavaScript</option><option value="typescript">TypeScript</option><option value="python">Python</option><option value="java">Java</option><option value="csharp">C#</option><option value="cpp">C++</option><option value="ruby">Ruby</option><option value="php">PHP</option><option value="swift">Swift</option><option value="kotlin">Kotlin</option><option value="go">Go</option><option value="rust">Rust</option>',12)])],512)]),e("div",po,[e("select",ro,[...t[1]||(t[1]=[m('<option value="javascript">JavaScript</option><option value="typescript">TypeScript</option><option value="python">Python</option><option value="java">Java</option><option value="csharp">C#</option><option value="cpp">C++</option><option value="ruby">Ruby</option><option value="php">PHP</option><option value="swift">Swift</option><option value="kotlin">Kotlin</option><option value="go">Go</option><option value="rust">Rust</option>',12)])],512)]),t[4]||(t[4]=e("div",{class:"alert info"},[e("strong",null,"Tip:"),l(' Try searching for "script", "Type", or even special characters like "#" or "+" to see the highlighting in action. The feature safely escapes special characters to prevent HTML breaking. ')],-1)),t[5]||(t[5]=e("h3",null,"HTML Content with Search Highlighting",-1)),t[6]||(t[6]=e("p",null," When using HTML in options, search highlighting intelligently highlights only the text content while preserving all HTML structure, styles, and elements. ",-1)),e("div",co,[e("select",vo,null,512)]),t[7]||(t[7]=e("div",{class:"alert info"},[e("strong",null,"Try it:"),l(' Search for "United", "States", "an", or even special characters like "<" in the example above. Notice how the emoji flags and colors remain intact while only the matching text is highlighted. ')],-1)),t[8]||(t[8]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const mo=a(so,[["render",ho]]),go=s({name:"Select"}),fo={id:"select",class:"content"};function $o(n,t,p,r,d,c){return u(),i("div",fo,[...t[0]||(t[0]=[e("h2",{class:"header"},"select",-1),e("p",null," The select field is used to identify the select element that will be used to create slim select. You can use any value you normally would in a querySelector or pass the element directly. ",-1),e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1)])])}const wo=a(go,[["render",$o]]),So=s({name:"SelectAll",mounted(){new o({select:this.$refs.selectAll})}}),Vo={id:"selectAll",class:"content"},bo={ref:"selectAll",multiple:""};function yo(n,t,p,r,d,c){return u(),i("div",Vo,[t[1]||(t[1]=e("h2",{class:"header"},"selectAll",-1)),t[2]||(t[2]=e("p",null," selectAll is a setting that can be used to add a select all action to an optgroup. This setting can be set to true or false. If set to true, a select all option will be added to the top of the selected values. If set to false or not set at all, no select all action will be added to the optgroup. ",-1)),t[3]||(t[3]=e("p",null,"selectAllText is a setting that can be used to change the text of the select all optgroup.",-1)),t[4]||(t[4]=e("div",{class:"alert info"}," You can set selectAll/selectAllText either by data or by html dataset added to the optgroup element ",-1)),e("select",bo,[...t[0]||(t[0]=[m('<optgroup label="Label 1" data-selectall="true" data-selectalltext="Select them all!"><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></optgroup><optgroup label="Label 2"><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option></optgroup>',2)])],512),t[5]||(t[5]=e("br",null,null,-1)),t[6]||(t[6]=e("h3",null,"Via data",-1)),t[7]||(t[7]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const xo=a(So,[["render",yo]]),_o=s({name:"ShowTooltip",mounted(){new o({select:this.$refs.showOptionTooltips,settings:{showOptionTooltips:!0}})}}),Oo={id:"showOptionTooltips",class:"content"},Do={ref:"showOptionTooltips"};function Mo(n,t,p,r,d,c){return u(),i("div",Oo,[t[1]||(t[1]=e("h2",{class:"header"},"showOptionTooltips",-1)),t[2]||(t[2]=e("p",null," showOptionTooltips option is used to active displaying the on-hover tooltips for select options. The tooltip text is equal to the option text content. ",-1)),e("select",Do,[...t[0]||(t[0]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),t[3]||(t[3]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            showOptionTooltips: true,
          }
        })
      `),l(`
    `)],-1))])}const Co=a(_o,[["render",Mo]]),To=s({name:"Styles",mounted(){new o({select:this.$refs.selectStyle}),new o({select:this.$refs.optionStyle})}}),Po={id:"inlineStyles",class:"content"},Bo={class:"row"},Lo={ref:"selectStyle",style:{color:"red"}},Ao={ref:"optionStyle"};function Ho(n,t,p,r,d,c){return u(),i("div",Po,[t[2]||(t[2]=e("h2",{class:"header"},"inline styles",-1)),t[3]||(t[3]=e("p",null," Slim select will inherit any styles that were added to the original select element. This includes options as well. ",-1)),e("div",Bo,[e("select",Lo,[...t[0]||(t[0]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),e("select",Ao,[...t[1]||(t[1]=[e("option",{style:{color:"red"},value:"value1"},"Red",-1),e("option",{style:{color:"green"}},"Green",-1),e("option",{style:{color:"blue"}},"Blue",-1)])],512)]),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-html"},`
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
    `)],-1))])}const Eo=a(To,[["render",Ho]]),jo=s({name:"Settings",components:{Select:wo,CssClasses:Ge,AlwaysOpen:ee,ContentLocation:Ve,ContentPosition:Pe,OpenPosition:$l,Placeholder:Ol,Deselect:st,Display:_t,Disabled:ft,Mandatory:Zt,MinMax:dl,DataAttributes:Xe,MaxValuesShown:sl,Css:ke,Styles:Eo,Html:qt,KeepOrder:Gt,ShowSearch:Al,FocusSearch:Il,SearchText:zl,SearchPlaceholder:no,SearchHighlight:mo,CloseOnSelect:he,ShowTooltip:Co,SelectAll:xo,Closable:ie,HideSelected:Bt}}),ko={id:"settings",class:"contents"};function qo(n,t,p,r,d,c){const g=h("Select"),f=h("CssClasses"),$=h("AlwaysOpen"),w=h("ContentLocation"),S=h("ContentPosition"),V=h("OpenPosition"),b=h("Placeholder"),y=h("SelectAll"),x=h("Deselect"),_=h("Display"),O=h("Disabled"),D=h("Mandatory"),M=h("MinMax"),C=h("DataAttributes"),T=h("Css"),P=h("Styles"),B=h("Html"),L=h("KeepOrder"),A=h("ShowSearch"),H=h("FocusSearch"),E=h("SearchText"),j=h("SearchPlaceholder"),k=h("SearchHighlight"),q=h("CloseOnSelect"),R=h("ShowTooltip"),U=h("Closable"),I=h("HideSelected"),F=h("MaxValuesShown");return u(),i("div",ko,[v(g),v(f),v($),v(w),v(S),v(V),v(b),v(y),v(x),v(_),v(O),v(D),v(M),v(C),v(T),v(P),v(B),v(L),v(A),v(H),v(E),v(j),v(k),v(q),v(R),v(U),v(I),v(F)])}const Uo=a(jo,[["render",qo]]);export{Uo as default};
