import{d as a,S as o,_ as u,c as r,a as t,f as l,o as p,b as g,A as W,e as s,r as i}from"./index.js";const N=a({name:"AlwaysOpen",mounted(){new o({select:this.$refs.alwaysOpenSingle,settings:{alwaysOpen:!0,contentLocation:this.$refs.alwaysOpenSingleContent,contentPosition:"relative"}}),new o({select:this.$refs.alwaysOpenMultiple,settings:{alwaysOpen:!0,contentLocation:this.$refs.alwaysOpenMultipleContent,contentPosition:"relative"}})}}),Y={id:"alwaysOpen",class:"content"},G={class:"row"},K={style:{height:"auto"}},J={ref:"alwaysOpenSingle"},Q={ref:"alwaysOpenSingleContent"},X={style:{height:"auto"}},Z={ref:"alwaysOpenMultiple",multiple:""},ee={ref:"alwaysOpenMultipleContent"};function te(n,e,d,c,v,h){return p(),r("div",Y,[e[2]||(e[2]=t("h2",{class:"header"},"alwaysOpen",-1)),e[3]||(e[3]=t("p",null," The alwaysOpen setting keeps the dropdown options visible at all times, transforming SlimSelect into a persistent list that users can interact with without needing to click to open it. This is particularly useful for creating custom interfaces that look more like lists or checkboxes. ",-1)),e[4]||(e[4]=t("p",null," This setting is commonly used when you want to display options permanently, such as in sidebar filters, configuration panels, or any interface where the dropdown should behave more like a persistent selection list rather than a traditional dropdown. ",-1)),t("div",G,[t("div",K,[t("select",J,[...e[0]||(e[0]=[t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512),t("div",Q,null,512)]),t("div",X,[t("select",Z,[...e[1]||(e[1]=[t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1),t("option",{value:"value4"},"Value 4",-1)])],512),t("div",ee,null,512)])]),e[5]||(e[5]=t("pre",null,[l("      "),t("code",{class:"language-javascript"},`
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
    `)],-1)),e[6]||(e[6]=t("pre",null,[l("      "),t("code",{class:"language-html"},`
        <select id="selectElement">
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>

        <!-- The content will go in this div -->
        <div id="local"></div>
      `),l(`
    `)],-1))])}const le=u(N,[["render",te]]),oe=a({name:"Closable",mounted(){new o({select:this.$refs.closableSingle}),new o({select:this.$refs.closableMultiple})}}),ne={id:"closable",class:"content"},se={class:"row"},ie={ref:"closableSingle"},ae={ref:"closableMultiple",multiple:""};function ue(n,e,d,c,v,h){return p(),r("div",ne,[e[2]||(e[2]=g('<h2 class="header">closable</h2><p> The closable setting allows optgroups to be collapsible, giving users the ability to expand or collapse groups of options. This is particularly useful for organizing large lists of options into manageable, collapsible sections. </p><p> This feature helps improve the user experience by reducing visual clutter and allowing users to focus on specific categories of options. Users can expand or collapse optgroups as needed, making navigation through large option lists much more efficient. </p><p>Values: <strong>&quot;off&quot;</strong> | <strong>&quot;open&quot;</strong> | <strong>&quot;close&quot;</strong></p><p>Default: <strong>&quot;off&quot;</strong></p><div class="alert info">You can set closable either by data or by html dataset added to the optgroup element</div>',6)),t("div",se,[t("select",ie,[...e[0]||(e[0]=[g('<optgroup label="Label 1" data-closable="off"><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></optgroup><optgroup label="Label 2" data-closable="open"><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option></optgroup><optgroup label="Label 3" data-closable="close"><option value="value7">Value 7</option><option value="value8">Value 8</option><option value="value9">Value 9</option></optgroup>',3)])],512),t("select",ae,[...e[1]||(e[1]=[g('<optgroup label="Label 1" data-selectall="true" data-closable="off"><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></optgroup><optgroup label="Label 2" data-selectall="true" data-closable="open"><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option></optgroup><optgroup label="Label 3" data-selectall="true" data-closable="close"><option value="value7">Value 7</option><option value="value8">Value 8</option><option value="value9">Value 9</option></optgroup>',3)])],512)]),e[3]||(e[3]=t("br",null,null,-1)),e[4]||(e[4]=t("h3",null,"Via data",-1)),e[5]||(e[5]=t("pre",null,[l("      "),t("code",{class:"language-javascript"},`
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
    `)],-1)),e[6]||(e[6]=t("br",null,null,-1)),e[7]||(e[7]=t("h3",null,"Via html",-1)),e[8]||(e[8]=t("pre",null,[l("      "),t("code",{class:"language-html"},`
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
    `)],-1))])}const re=u(oe,[["render",ue]]),pe=a({name:"CloseOnSelect",mounted(){new o({select:this.$refs.closeOnSelectSingle,settings:{closeOnSelect:!1}}),new o({select:this.$refs.closeOnSelectMultiple,settings:{closeOnSelect:!1}})}}),de={id:"closeOnSelect",class:"content"},ce={class:"row"},ve={ref:"closeOnSelectSingle"},he={ref:"closeOnSelectMultiple",multiple:""};function me(n,e,d,c,v,h){return p(),r("div",de,[e[2]||(e[2]=t("h2",{class:"header"},"closeOnSelect",-1)),e[3]||(e[3]=t("p",null," The closeOnSelect setting controls whether the dropdown closes automatically after a user makes a selection. This behavior is particularly important for multi-select dropdowns where you might want to keep the dropdown open so users can make multiple selections without having to reopen it each time. ",-1)),e[4]||(e[4]=t("p",null," When set to false, the dropdown remains open after each selection, making it easier for users to select multiple options in succession. This is especially useful for multi-select scenarios where users need to choose several items from a list. ",-1)),t("div",ce,[t("select",ve,[...e[0]||(e[0]=[g('<option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option><optgroup label="Super Values"><option value="value11">Value 1</option><option value="value22">Value 2</option><option value="value33">Value 3</option></optgroup>',4)])],512),t("select",he,[...e[1]||(e[1]=[g('<option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option><optgroup label="Super Values"><option value="value11">Value 1</option><option value="value22">Value 2</option><option value="value33">Value 3</option></optgroup>',4)])],512)]),e[5]||(e[5]=t("pre",null,[l("      "),t("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#search',
          settings: {
            closeOnSelect: false,
          },
        })
      `),l(`
    `)],-1))])}const ge=u(pe,[["render",me]]),fe=a({name:"ContentLocation",mounted(){new o({select:this.$refs.contentLocation,settings:{contentLocation:this.$refs.local}})}}),we={id:"contentLocation",class:"content"},ye={class:"row"},$e={ref:"contentLocation",style:{width:"50%"}},Se={ref:"local"};function be(n,e,d,c,v,h){return p(),r("div",we,[e[1]||(e[1]=t("h2",{class:"header"},"contentLocation",-1)),e[2]||(e[2]=t("p",null," The contentLocation setting allows you to specify where the dropdown content (search input and options) should be rendered in the DOM. By default, SlimSelect appends the content to the document body, but you can redirect it to any container element. ",-1)),e[3]||(e[3]=t("p",null," This is particularly useful for maintaining proper z-index layering, avoiding overflow issues, or ensuring the dropdown appears within a specific container. The content container includes the search input field and all available options, giving you control over where this interactive area appears. ",-1)),t("div",ye,[t("select",$e,[...e[0]||(e[0]=[t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512),t("div",Se,null,512)]),e[4]||(e[4]=t("pre",null,[l("      "),t("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            contentLocation: document.getElementById('local')
          }
        })
      `),l(`
    `)],-1)),e[5]||(e[5]=t("pre",null,[l("      "),t("code",{class:"language-html"},`
        <select id="contentLocation">
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>

        <!-- The content will go in this div -->
        <div id="local"></div>
      `),l(`
    `)],-1))])}const Ve=u(fe,[["render",be]]),xe=a({name:"ContentPosition",mounted(){new o({select:this.$refs.contentPositionRelative,settings:{contentPosition:"relative",contentLocation:this.$refs.contentPositionRelativeContent}}),new o({select:this.$refs.contentPositionAbsolute,settings:{contentPosition:"absolute"}}),new o({select:this.$refs.contentPositionFixed,settings:{contentPosition:"fixed"}})}}),Te={id:"contentPosition",class:"content"},Me={class:"row"},Oe={ref:"contentPositionRelative",class:"relative"},Ce={ref:"contentPositionRelativeContent"},_e={ref:"contentPositionAbsolute",class:"absolute"},De={class:"row"},ke={ref:"contentPositionFixed",class:"fixed"};function Le(n,e,d,c,v,h){return p(),r("div",Te,[e[3]||(e[3]=t("h2",{class:"header"},"contentPosition",-1)),e[4]||(e[4]=t("p",null," The contentPosition setting controls the CSS positioning of the dropdown content. You can choose between 'relative', 'absolute', or 'fixed' positioning to achieve the desired layout behavior and ensure proper display in different contexts. ",-1)),e[5]||(e[5]=t("p",null," This setting is crucial for handling complex layouts, modal dialogs, or responsive designs where the default absolute positioning might not work correctly. The default is 'absolute', but 'relative' is useful for inline layouts, and 'fixed' helps with modal and overlay scenarios. ",-1)),e[6]||(e[6]=t("div",{class:"alert info"}," If you do use relative position be sure to set the contentLocation to an element that will work best for your use case. Otherwise SlimSelect will add you content to the body of the html. See example usage below. ",-1)),e[7]||(e[7]=t("div",{class:"alert info"}," Fixed was added to address issues with fixed positioning in modals and other elements that have fixed positioning. ",-1)),t("div",Me,[t("select",Oe,[...e[0]||(e[0]=[t("option",{"data-placeholder":"true"},"Relative",-1),t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512),t("div",Ce,null,512),t("select",_e,[...e[1]||(e[1]=[t("option",{"data-placeholder":"true"},"Absolute",-1),t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512)]),t("div",De,[t("select",ke,[...e[2]||(e[2]=[t("option",{"data-placeholder":"true"},"Fixed",-1),t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512)]),e[8]||(e[8]=t("pre",null,[l("      "),t("code",{class:"language-javascript"},`
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
    `)],-1))])}const Pe=u(xe,[["render",Le]]),He=a({name:"Css",mounted(){new o({select:this.$refs.selectClass}),new o({select:this.$refs.optionClass})}}),Ae={id:"cssClass",class:"content"},Be={class:"row"},Ee={ref:"selectClass",class:"select-class"},je={ref:"optionClass",class:"option-class"};function qe(n,e,d,c,v,h){return p(),r("div",Ae,[e[2]||(e[2]=t("h2",{class:"header"},"css class",-1)),e[3]||(e[3]=t("p",null," SlimSelect automatically inherits any CSS classes that were applied to the original select element and its options. This seamless inheritance allows you to maintain your existing styling while gaining all the enhanced functionality of SlimSelect. ",-1)),e[4]||(e[4]=t("p",null," This feature ensures that your custom CSS classes, whether applied to the main select element or individual options, are preserved and applied to the corresponding SlimSelect elements, making the transition from native selects to SlimSelect completely transparent from a styling perspective. ",-1)),t("div",Be,[t("select",Ee,[...e[0]||(e[0]=[t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512),t("select",je,[...e[1]||(e[1]=[t("option",{class:"red",value:"value1"},"Red",-1),t("option",{class:"green",value:"value2"},"Green",-1),t("option",{class:"blue",value:"value3"},"Blue",-1)])],512)]),e[5]||(e[5]=t("pre",null,[l("        "),t("code",{class:"language-html"},`
          <select id="select-class" class="classItems">
            <option class="red" value="value1">Value 1</option>
            <option class="green" value="value2">Value 2</option>
            <option class="blue" value="value3">Value 3</option>
          </select>
        `),l(`
      `)],-1))])}const Ue=u(He,[["render",qe]]),Re=a({name:"CustomCss",mounted(){new o({select:this.$refs.mainSelect,cssClasses:{option:"primary-option"}}),new o({select:this.$refs.secondarySelect,cssClasses:{option:"secondary-option"}})}}),Fe={id:"cssClasses",class:"content"},Ie={class:"row"},ze={ref:"mainSelect"},We={ref:"secondarySelect"};function Ne(n,e,d,c,v,h){return p(),r("div",Fe,[e[2]||(e[2]=t("h2",{class:"header"},"cssClasses",-1)),e[3]||(e[3]=t("p",null," The cssClasses setting allows you to override SlimSelect's default CSS classes with your own custom classes. This gives you complete control over the styling of different parts of the dropdown, enabling you to match your application's design system perfectly. ",-1)),e[4]||(e[4]=t("p",null," You can customize classes for various elements like options, the main container, search input, and more. This is particularly useful when you need to apply specific styling that integrates seamlessly with your existing CSS framework or design requirements. ",-1)),t("div",Ie,[t("select",ze,[...e[0]||(e[0]=[t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512),t("select",We,[...e[1]||(e[1]=[t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512)]),e[5]||(e[5]=t("pre",null,[l("      "),t("code",{class:"language-html"},`
        <select id="primary-select">
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      `),l(`
    `)],-1)),e[6]||(e[6]=t("pre",null,[l("      "),t("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#primary-select',
          cssClasses: {
            option: "primary-option" 
        })
      `),l(`
    `)],-1))])}const Ye=u(Re,[["render",Ne]]),Ge=a({name:"DataAttributes",mounted(){new o({select:this.$refs.optionsSingle}),new o({select:this.$refs.optionsMultiple})}}),Ke={id:"dataAttributes",class:"content"},Je={class:"row"},Qe={ref:"optionsSingle"},Xe={ref:"optionsMultiple",multiple:""};function Ze(n,e,d,c,v,h){return p(),r("div",Ke,[e[2]||(e[2]=t("h2",{class:"header"},"Data Attributes",-1)),e[3]||(e[3]=t("p",null," SlimSelect automatically inherits and preserves data attributes from the original select element and its options, ensuring that any custom data you've attached to your HTML elements is maintained in the enhanced interface. This includes standard HTML attributes like disabled, class, style, and custom data attributes. ",-1)),e[4]||(e[4]=t("p",null," This feature allows you to maintain all your existing HTML attributes and data while gaining the enhanced functionality of SlimSelect, making the transition seamless and preserving any custom behavior or styling that depends on these attributes. ",-1)),t("div",Je,[t("select",Qe,[...e[0]||(e[0]=[g('<option data-placeholder="true"></option><option value="value1" data-info="Here is info">Data Attributes</option><option value="value2" disabled>Disabled Option</option><option value="value3" class="green">Class Green</option><option value="value4" style="color:purple;">Inline Style</option>',5)])],512),t("select",Xe,[...e[1]||(e[1]=[t("option",{value:"value1","data-info":"Here is info"},"Data Attributes",-1),t("option",{value:"value2",disabled:""},"Disabled Option",-1),t("option",{value:"value3",class:"green"},"Class Green",-1),t("option",{value:"value4",style:{color:"purple"}},"Inline Style",-1)])],512)])])}const et=u(Ge,[["render",Ze]]),tt=a({name:"Deselect",mounted(){new o({select:this.$refs.allowDeselectSingle,settings:{allowDeselect:!0}}),new o({select:this.$refs.allowDeselectMultiple,settings:{allowDeselect:!0}})}}),lt={id:"allowDeselect",class:"content"},ot={class:"row"},nt={ref:"allowDeselectSingle"},st={ref:"allowDeselectMultiple",multiple:""};function it(n,e,d,c,v,h){return p(),r("div",lt,[e[2]||(e[2]=t("h2",{class:"header"},"allowDeselect",-1)),e[3]||(e[3]=t("p",null,' The allowDeselect setting enables users to clear their selection and return to an empty state. This is particularly useful when you want to give users the ability to "unselect" a value, which is especially important for optional form fields. ',-1)),e[4]||(e[4]=t("p",null,' When enabled, users can click on the selected value to deselect it, returning the dropdown to its placeholder state. For this to work properly, you need an empty option with data-placeholder="true" in your HTML so SlimSelect has an empty value to select. ',-1)),t("div",ot,[t("select",nt,[...e[0]||(e[0]=[t("option",{"data-placeholder":"true"},null,-1),t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512),t("select",st,[...e[1]||(e[1]=[t("option",{"data-placeholder":"true"},null,-1),t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512)]),e[5]||(e[5]=t("pre",null,[l("      "),t("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            allowDeselect: true
          }
        })
      `),l(`
    `)],-1)),e[6]||(e[6]=t("pre",null,[l("      "),t("code",{class:"language-html"},`
        <!-- Requires emtpy data-placeholder option -->
        <select id="allowDeselect">
          <option data-placeholder="true"></option>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      `),l(`
    `)],-1))])}const at=u(tt,[["render",it]]),ut=a({name:"Disabled",mounted(){new o({select:this.$refs.disabledSingle,settings:{disabled:!0}}),new o({select:this.$refs.disabledMultiple}),new o({select:this.$refs.disabledOptionSingle,data:[{text:"Option 1",value:"option1"},{text:"Option 2",value:"option2",disabled:!0},{text:"Option 3",value:"option3"}]}),new o({select:this.$refs.disabledOptionMultiple}),new o({select:this.$refs.disabledDynamicSingle}).select.showUI()},methods:{enableDisableDynamic(){const n=this.$refs.disabledDynamicSingle;n&&(n.disabled=!n.disabled)}}}),rt={id:"disabled",class:"content"},pt={class:"row"},dt={ref:"disabledSingle"},ct={ref:"disabledMultiple",multiple:"",disabled:""},vt={class:"row"},ht={ref:"disabledOptionSingle"},mt={ref:"disabledOptionMultiple",multiple:""},gt={class:"row"},ft={ref:"disabledDynamicSingle"};function wt(n,e,d,c,v,h){return p(),r("div",rt,[e[6]||(e[6]=t("h2",{class:"header"},"disabled",-1)),e[7]||(e[7]=t("p",null," The disabled functionality allows you to disable the entire select dropdown or individual options, providing fine-grained control over user interactions. This is essential for creating dynamic interfaces where certain selections should be temporarily unavailable based on business logic or user permissions. ",-1)),e[8]||(e[8]=t("p",null," You can disable the entire dropdown through settings or HTML attributes, or disable specific options to prevent users from selecting them while keeping other options available. SlimSelect also provides methods to dynamically enable and disable elements programmatically. ",-1)),e[9]||(e[9]=t("div",{class:"alert info"},"Methods also are provided to enable and disable SlimSelect via method call.",-1)),t("div",pt,[t("select",dt,[...e[1]||(e[1]=[t("option",{value:"value1",selected:""},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512),t("select",ct,[...e[2]||(e[2]=[t("option",{value:"value1",selected:""},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512)]),e[10]||(e[10]=t("br",null,null,-1)),t("div",vt,[t("select",ht,[...e[3]||(e[3]=[t("option",{value:"value1",selected:""},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512),t("select",mt,[...e[4]||(e[4]=[t("option",{value:"value1",selected:""},"Value 1",-1),t("option",{value:"value2",disabled:""},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512)]),e[11]||(e[11]=t("br",null,null,-1)),t("div",gt,[t("div",{class:"btn",onClick:e[0]||(e[0]=(...f)=>n.enableDisableDynamic&&n.enableDisableDynamic(...f))},"Enable/Disable Original Select"),t("select",ft,[...e[5]||(e[5]=[t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512)]),e[12]||(e[12]=t("pre",null,[l("      "),t("code",{class:"language-javascript"},`
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
    `)],-1)),e[13]||(e[13]=t("pre",null,[l("      "),t("code",{class:"language-html"},`
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
    `)],-1))])}const yt=u(ut,[["render",wt]]),$t=a({name:"Display",mounted(){const n=new o({select:this.$refs.selectdisplay}),e=[{value:"value1",text:"Value 1",display:!1},{value:"value2",text:"Value 2"},{value:"value3",text:"Value 3"}];n.setData(e),n.setSelected(["value1","value3"]),new o({select:this.$refs.selectdisplay2})}}),St={id:"display",class:"content"},bt={class:"row"},Vt={ref:"selectdisplay",multiple:""},xt={class:"row"},Tt={ref:"selectdisplay2",multiple:""};function Mt(n,e,d,c,v,h){return p(),r("div",St,[e[1]||(e[1]=t("h2",{class:"header"},"display",-1)),e[2]||(e[2]=t("p",null," The display setting allows you to control the visibility of selected values in multi-select dropdowns. This is particularly useful when you want to hide certain selected values from the user interface while still maintaining them in the underlying data. ",-1)),e[3]||(e[3]=t("p",null," This feature is commonly used for managing hidden or system values, implementing complex selection logic, or creating user interfaces where some selections should remain invisible to users while still being part of the form data. ",-1)),t("div",bt,[t("select",Vt,null,512)]),e[4]||(e[4]=t("pre",null,[l("      "),t("code",{class:"language-javascript"},`
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
    `)],-1)),e[5]||(e[5]=t("pre",null,[l("      "),t("code",{class:"language-html"},`
        <select id="selectMultiMandatory" multiple></select>
      `),l(`
    `)],-1)),e[6]||(e[6]=t("p",null,"Or",-1)),t("div",xt,[t("select",Tt,[...e[0]||(e[0]=[t("option",{value:"value1",style:{display:"none"},selected:""},"Value 1",-1),t("option",{value:"value2",selected:""},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512)]),e[7]||(e[7]=t("pre",null,[l("      "),t("code",{class:"language-javascript"},`
        const slim = new SlimSelect({
          select: '#selectElement'
        });
      `),l(`
    `)],-1)),e[8]||(e[8]=t("pre",null,[l("      "),t("code",{class:"language-html"},`
        <select id="selectdisplay2" multiple>
          <option value="value1" style="display: none;" selected>Value 1</option>
          <option value="value2" selected>Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      `),l(`
    `)],-1))])}const Ot=u($t,[["render",Mt]]),Ct=a({name:"HideSelected",mounted(){new o({select:this.$refs.hideSelectedSingle,settings:{hideSelected:!0}}),new o({select:this.$refs.hideSelectedMultiple,settings:{hideSelected:!0}})}}),_t={id:"hideSelected",class:"content"},Dt={class:"row"},kt={ref:"hideSelectedSingle"},Lt={ref:"hideSelectedMultiple",multiple:""};function Pt(n,e,d,c,v,h){return p(),r("div",_t,[e[2]||(e[2]=t("h2",{class:"header"},"hideSelected",-1)),e[3]||(e[3]=t("p",null," The hideSelected setting prevents already selected options from appearing in the dropdown list. This creates a cleaner interface by removing options that have already been chosen, making it easier for users to see what options are still available. ",-1)),e[4]||(e[4]=t("p",null," This feature is particularly useful for multi-select dropdowns where showing selected options in the list might be redundant or confusing. It helps users focus on the remaining choices and provides a more streamlined selection experience. ",-1)),t("div",Dt,[t("select",kt,[...e[0]||(e[0]=[t("option",{"data-placeholder":"true"},null,-1),t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512),t("select",Lt,[...e[1]||(e[1]=[t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512)]),e[5]||(e[5]=t("pre",null,[l("      "),t("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            hideSelected: true,
          }
        })
      `),l(`
    `)],-1)),e[6]||(e[6]=t("pre",null,[l("      "),t("code",{class:"language-html"},`
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
    `)],-1))])}const Ht=u(Ct,[["render",Pt]]),At=a({name:"Html",mounted(){new o({select:this.$refs.htmlSingle,settings:{searchHighlight:!0},data:[{html:"<b>Bold Text</b>",text:"Bold Text",value:"bold text"},{html:'<div style="border: solid 1px #666666;">Border</div>',text:"Border",value:"border"},{html:"<i>Slim Select is awesome</i>",text:"Slim Select is awesome"}]}),new o({select:this.$refs.htmlMulti,settings:{searchHighlight:!0}})}}),Bt={id:"html",class:"content"},Et={class:"row"},jt={ref:"htmlSingle"},qt={ref:"htmlMulti",multiple:""};function Ut(n,e,d,c,v,h){return p(),r("div",Bt,[e[1]||(e[1]=t("h2",{class:"header"},"html",-1)),e[2]||(e[2]=t("p",null," SlimSelect supports custom HTML content for both the dropdown options and selected values, allowing you to create rich, visually appealing interfaces with icons, formatting, colors, and other HTML elements. This feature enables you to go beyond plain text and create sophisticated user interfaces. ",-1)),e[3]||(e[3]=t("p",null," When the HTML field is provided, SlimSelect uses it for display purposes while maintaining the text field for functionality. For multi-select dropdowns, selected values always use the text field to ensure clean tag display, while the dropdown options can use the full HTML content for rich presentation. ",-1)),t("div",Et,[t("select",jt,null,512),t("select",qt,[...e[0]||(e[0]=[t("option",{value:"bold text","data-html":"<b>Bold Text</b>"},"Bold Text",-1),t("option",{value:"border","data-html":"<div style='border: solid 1px #666666;'>Border</div>"},"Border",-1),t("option",{value:"slim select","data-html":"<i>Slim Select is awesome</i>"},"Slim Select is awesome",-1)])],512)]),e[4]||(e[4]=t("h3",null,"Via data",-1)),e[5]||(e[5]=t("pre",null,[l("      "),t("code",{class:"language-javascript"},`
        var select = new SlimSelect({
          select: '#selectElement',
          data: [
            {html: '<b>Bold Text</b>', text: 'Bold Text', value: 'bold text'},
            {html: '<div style="border: solid 1px #666666;">Border</div>', text: 'Border', value: 'border'},
            {html: '<i>Slim Select is awesome</i>', text: 'Slim Select is awesome'}
          ]
        })
      `),l(`
    `)],-1)),e[6]||(e[6]=t("h3",null,"Via data attribute",-1)),e[7]||(e[7]=t("pre",null,[l("      "),t("code",{class:"language-html"},`
        <select id="selectElement">
          <option value="bold text" data-html="<b>Bold Text</b>">Bold Text</option>
          <option value="border" data-html="<div style="border: solid 1px #666666;">Border</div>">Border</option>
          <option value="slim select" data-html="<i>Slim Select is awesome</i>">Slim Select awesome</option>
        </select>
      `),l(`
    `)],-1))])}const Rt=u(At,[["render",Ut]]),Ft=a({name:"KeepOrder",mounted(){new o({select:this.$refs.keepOrder,settings:{keepOrder:!0}})}}),It={id:"keepOrder",class:"content"},zt={class:"row"},Wt={ref:"keepOrder",multiple:""};function Nt(n,e,d,c,v,h){return p(),r("div",It,[e[1]||(e[1]=g('<h2 class="header">keepOrder</h2><p> The keepOrder setting controls how SlimSelect returns selected values in multi-select mode, allowing you to choose between DOM order (how options appear in the HTML) or selection order (the order in which users clicked/selected the options). </p><p> This setting is particularly useful when the order of selections matters for your application logic, such as when building ordered lists, prioritizing selections, or maintaining user interaction patterns. It gives you control over whether to preserve the original HTML structure or respect the user&#39;s selection sequence. </p><div class="alert"><p><strong>Important:</strong> This maintains <strong>selection order</strong> (the order you clicked), NOT DOM order! </p></div><p><strong>When false (default):</strong> Returns options in DOM order (how they appear in the HTML)</p><p><strong>When true:</strong> Returns options in the order they were clicked/selected by the user</p><h3>Example:</h3><p>If you have options: Apple, Banana, Cherry</p><ul><li>You click: Cherry → Apple → Banana</li><li><code>keepOrder: false</code> → returns <code>[&#39;Apple&#39;, &#39;Banana&#39;, &#39;Cherry&#39;]</code> (DOM order)</li><li><code>keepOrder: true</code> → returns <code>[&#39;Cherry&#39;, &#39;Apple&#39;, &#39;Banana&#39;]</code> (click order)</li></ul><p>Values: <strong>true</strong> | <strong>false</strong></p><p>Default: <strong>false</strong></p>',11)),t("div",zt,[t("select",Wt,[...e[0]||(e[0]=[g('<option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option><optgroup label="Label 1"><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option></optgroup><optgroup label="Label 2"><option value="value7">Value 7</option><option value="value8">Value 8</option><option value="value9">Value 9</option></optgroup>',5)])],512)]),e[2]||(e[2]=t("br",null,null,-1)),e[3]||(e[3]=t("h3",null,"Via html",-1)),e[4]||(e[4]=t("pre",null,[l("      "),t("code",{class:"language-html"},`
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
    `)],-1))])}const Yt=u(Ft,[["render",Nt]]),Gt=a({name:"Mandatory",mounted(){const n=new o({select:this.$refs.selectMultiMandatory}),e=[{value:"value1",text:"Value 1",mandatory:!0},{value:"value2",text:"Value 2"},{value:"value3",text:"Value 3"}];n.setData(e),n.setSelected(["value1","value3"]),new o({select:this.$refs.selectMultiMandatory2})}}),Kt={id:"mandatory",class:"content"},Jt={class:"row"},Qt={ref:"selectMultiMandatory",multiple:""},Xt={class:"row"},Zt={ref:"selectMultiMandatory2",multiple:""};function el(n,e,d,c,v,h){return p(),r("div",Kt,[e[1]||(e[1]=t("h2",{class:"header"},"mandatory",-1)),e[2]||(e[2]=t("p",null," The mandatory setting allows you to mark certain options as required in multi-select dropdowns, preventing users from deselecting them once they've been chosen. This is particularly useful for options that represent essential or system-required selections that must always remain active. ",-1)),e[3]||(e[3]=t("p",null," When an option is marked as mandatory, users can select it normally, but once selected, they cannot deselect it, ensuring that critical options remain part of the selection. Note that mandatory options are not selected by default - users must actively choose them, but once selected, they become permanently locked in the selection. ",-1)),t("div",Jt,[t("select",Qt,null,512)]),e[4]||(e[4]=t("pre",null,[l("      "),t("code",{class:"language-javascript"},`
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
    `)],-1)),e[5]||(e[5]=t("pre",null,[l("      "),t("code",{class:"language-html"},`
        <select id="selectMultiMandatory" multiple></select>
      `),l(`
    `)],-1)),e[6]||(e[6]=t("p",null,"Or",-1)),t("div",Xt,[t("select",Zt,[...e[0]||(e[0]=[t("option",{value:"value1","data-mandatory":"true",selected:""},"Value 1",-1),t("option",{value:"value2",selected:""},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512)]),e[7]||(e[7]=t("pre",null,[l("      "),t("code",{class:"language-javascript"},`
        const slim = new SlimSelect({
          select: '#selectElement'
        });
      `),l(`
    `)],-1)),e[8]||(e[8]=t("pre",null,[l("      "),t("code",{class:"language-html"},`
        <select id="selectMultiMandatory" multiple>
          <option value="value1" data-mandatory="true" selected>Value 1</option>
          <option value="value2" selected>Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      `),l(`
    `)],-1))])}const tl=u(Gt,[["render",el]]),ll=a({name:"MaxValuesShown",mounted(){new o({select:this.$refs.maxValuesShown,settings:{maxValuesShown:5,maxValuesMessage:"{number} selected",allowDeselect:!0}})}}),ol={id:"maxValuesShown",class:"content"},nl={class:"row"},sl={ref:"maxValuesShown",multiple:""};function il(n,e,d,c,v,h){return p(),r("div",ol,[e[1]||(e[1]=t("h2",{class:"header"},"maxValuesShown",-1)),e[2]||(e[2]=t("p",null," The maxValuesShown setting controls how many selected values are displayed individually before switching to a summary format. When the number of selected items exceeds this threshold, SlimSelect displays a count message instead of showing all individual values. ",-1)),e[3]||(e[3]=t("p",null," This feature prevents the dropdown from becoming cluttered with too many selected value tags, maintaining a clean and readable interface. The summary message can be customized using the maxValuesMessage setting, which supports the '{number}' placeholder for dynamic count display. ",-1)),e[4]||(e[4]=t("p",null,[t("strong",null,"Default:"),l(" 20")],-1)),t("div",nl,[t("select",sl,[...e[0]||(e[0]=[g('<option value="value1" selected>Value 1</option><option value="value2" selected>Value 2</option><option value="value3" selected>Value 3</option><option value="value4" selected>Value 4</option><option value="value5" selected>Value 5</option><option value="value6" selected>Value 6</option><option value="value7">Value 7</option><option value="value8">Value 8</option>',8)])],512)]),e[5]||(e[5]=t("pre",null,[l("      "),t("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            maxValuesShown: 5, // Default 20
            maxValuesMessage: '{number} values selected', // Default '{number} selected'
          },
        });
      `),l(`
    `)],-1)),e[6]||(e[6]=t("pre",null,[l("      "),t("code",{class:"language-html"},`
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
    `)],-1))])}const al=u(ll,[["render",il]]),ul=a({name:"MinMax",mounted(){new o({select:this.$refs.selectMultiMax,settings:{allowDeselect:!0,closeOnSelect:!1,minSelected:2,maxSelected:5},events:{addable:n=>n}})}}),rl={id:"minmax",class:"content"},pl={class:"row"},dl={ref:"selectMultiMax",multiple:""};function cl(n,e,d,c,v,h){return p(),r("div",rl,[e[1]||(e[1]=t("h2",{class:"header"},"Min/Max Selected",-1)),e[2]||(e[2]=t("p",null," The min/max selected settings allow you to enforce selection limits in multi-select dropdowns, ensuring users select the appropriate number of options for your application's requirements. This is essential for forms that need specific selection counts or business logic that depends on selection constraints. ",-1)),e[3]||(e[3]=t("p",null," You can set both minimum and maximum selection limits independently. The minimum setting ensures users select at least a certain number of options, while the maximum setting prevents them from selecting too many. This provides fine-grained control over user selections and helps maintain data integrity. ",-1)),t("div",pl,[t("select",dl,[...e[0]||(e[0]=[g('<option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option>',6)])],512)]),e[4]||(e[4]=t("pre",null,[l("      "),t("code",{class:"language-javascript"},`
        let slim = new SlimSelect({
          select: '#selectElement',
          settings: {
            minSelected: 2,
            maxSelected: 5,
          },
        })
      `),l(`
    `)],-1)),e[5]||(e[5]=t("pre",null,[l("      "),t("code",{class:"language-html"},`
        <select id="selectMultiMax" multiple>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
          <option value="value4">Value 4</option>
          <option value="value5">Value 5</option>
          <option value="value6">Value 6</option>
        </select>
      `),l(`
    `)],-1))])}const vl=u(ul,[["render",cl]]),hl=a({name:"OpenPosition",mounted(){new o({select:this.$refs.openPositionUp,settings:{openPosition:"up"}}),new o({select:this.$refs.openPositionDown,settings:{openPosition:"down"}})}}),ml={id:"openPosition",class:"content"},gl={class:"row"},fl={ref:"openPositionUp"},wl={ref:"openPositionDown"};function yl(n,e,d,c,v,h){return p(),r("div",ml,[e[2]||(e[2]=t("h2",{class:"header"},"openPosition",-1)),e[3]||(e[3]=t("p",null," The openPosition setting controls the direction in which the dropdown content opens. By default, SlimSelect automatically determines the best direction based on available screen space, but you can force it to always open in a specific direction. ",-1)),e[4]||(e[4]=t("p",null," This setting is particularly useful for maintaining consistent user interface behavior, ensuring the dropdown always appears in a predictable location, or when you have specific design requirements that need the dropdown to open in a particular direction regardless of screen position. ",-1)),e[5]||(e[5]=t("p",null,[l("Possible Options: "),t("b",null,"'auto', 'up' or 'down'"),l(". Default is "),t("b",null,"'auto'")],-1)),t("div",gl,[t("select",fl,[...e[0]||(e[0]=[t("option",{value:"up1"},"Up 1",-1),t("option",{value:"up2"},"Up 2",-1),t("option",{value:"up3"},"Up 3",-1)])],512),t("select",wl,[...e[1]||(e[1]=[t("option",{value:"down1"},"Down 1",-1),t("option",{value:"down2"},"Down 2",-1),t("option",{value:"down3"},"Down 3",-1)])],512)]),e[6]||(e[6]=t("pre",null,[l("      "),t("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            openPosition: 'auto' // 'auto', 'up' or 'down'
          }
        })
      `),l(`
    `)],-1))])}const $l=u(hl,[["render",yl]]),Sl=a({name:"Placeholder",mounted(){new o({select:this.$refs.placeholderSingle,settings:{placeholderText:"Custom Placeholder Text"}}),new o({select:this.$refs.placeholderMultiple,settings:{placeholderText:"Make Selection"}}),new o({select:this.$refs.placeholderNone,settings:{placeholderText:""}})}}),bl={id:"placeholder",class:"content"},Vl={class:"row"},xl={ref:"placeholderSingle"},Tl={ref:"placeholderMultiple",multiple:""},Ml={ref:"placeholderNone"};function Ol(n,e,d,c,v,h){return p(),r("div",bl,[e[3]||(e[3]=t("h2",{class:"header"},"placeholderText",-1)),e[4]||(e[4]=t("p",null," The placeholderText setting allows you to customize the text that appears when no option is selected. This provides helpful guidance to users about what they should select and creates a more intuitive user experience. ",-1)),e[5]||(e[5]=t("p",null,` For single selects, you need an empty option with data-placeholder="true" in your HTML. For multiple selects, the placeholder appears automatically. The default value is "Select Value", but you can customize it to match your application's tone and requirements. `,-1)),e[6]||(e[6]=t("div",{class:"alert info"}," Notice you can also set placeholder to empty if that is what you would like to do as well. ",-1)),t("div",Vl,[t("select",xl,[...e[0]||(e[0]=[t("option",{"data-placeholder":"true"},null,-1),t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512),t("select",Tl,[...e[1]||(e[1]=[t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512),t("select",Ml,[...e[2]||(e[2]=[t("option",{"data-placeholder":"true"},null,-1),t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512)]),e[7]||(e[7]=t("pre",null,[l("      "),t("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#placeholder',
          settings: {
            placeholderText: 'Custom Placeholder Text',
          }
        })
      `),l(`
    `)],-1)),e[8]||(e[8]=t("pre",null,[l("      "),t("code",{class:"language-html"},`
        <!-- Set empty option with data-placeholder if you to have placeholder -->
        <!-- text for single select, otherwise first option will be selected -->
        <select id="placeholderSingle">
          <option data-placeholder="true"></option>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      `),l(`
    `)],-1))])}const Cl=u(Sl,[["render",Ol]]),_l=a({name:"ShowSearch",mounted(){new o({select:this.$refs.showSearchSingle,settings:{showSearch:!1}}),new o({select:this.$refs.showSearchMulti,settings:{showSearch:!1}})}}),Dl={id:"showSearch",class:"content"},kl={class:"row",style:{padding:"0 0 var(--spacing-half) 0"}},Ll={ref:"showSearchSingle"},Pl={class:"row"},Hl={ref:"showSearchMulti",multiple:""};function Al(n,e,d,c,v,h){return p(),r("div",Dl,[e[2]||(e[2]=t("h2",{class:"header"},"showSearch",-1)),e[3]||(e[3]=t("p",null," The showSearch setting controls whether the search input field is displayed in the dropdown. When enabled, users can type to filter through options, making it easier to find specific values in long lists. ",-1)),e[4]||(e[4]=t("p",null," This feature is particularly useful for dropdowns with many options, as it significantly improves usability by allowing users to quickly locate and select the desired option without scrolling through the entire list. The default value is true, but you can disable it for simple dropdowns with few options. ",-1)),t("div",kl,[t("select",Ll,[...e[0]||(e[0]=[t("option",{value:"dog"},"Dog",-1),t("option",{value:"cat"},"Cat",-1),t("option",{value:"bird"},"Bird",-1)])],512)]),t("div",Pl,[t("select",Hl,[...e[1]||(e[1]=[t("option",{value:"dog"},"Dog",-1),t("option",{value:"cat"},"Cat",-1),t("option",{value:"bird"},"Bird",-1)])],512)]),e[5]||(e[5]=t("pre",null,[l("      "),t("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            showSearch: false
          }
        })
      `),l(`
    `)],-1))])}const Bl=u(_l,[["render",Al]]),El=a({name:"FocusSearch",mounted(){new o({select:this.$refs.focusSearchSingle,settings:{focusSearch:!1}}),new o({select:this.$refs.focusSearchMulti,settings:{focusSearch:!1}})}}),jl={id:"focusSearch",class:"content"},ql={class:"row",style:{padding:"0 0 var(--spacing-half) 0"}},Ul={ref:"focusSearchSingle"},Rl={class:"row"},Fl={ref:"focusSearchMulti",multiple:""};function Il(n,e,d,c,v,h){return p(),r("div",jl,[e[2]||(e[2]=t("h2",{class:"header"},"focusSearch",-1)),e[3]||(e[3]=t("p",null," The focusSearch setting controls whether the search input field automatically receives focus when the dropdown opens. When enabled, users can immediately start typing to search without needing to click on the search field first. ",-1)),e[4]||(e[4]=t("p",null," This feature improves the user experience by reducing the number of clicks required to search through options. However, you might want to disable it in certain scenarios where automatic focusing could interfere with other UI interactions or accessibility requirements. ",-1)),t("div",ql,[t("select",Ul,[...e[0]||(e[0]=[t("option",{value:"dog"},"Dog",-1),t("option",{value:"cat"},"Cat",-1),t("option",{value:"bird"},"Bird",-1)])],512)]),t("div",Rl,[t("select",Fl,[...e[1]||(e[1]=[t("option",{value:"dog"},"Dog",-1),t("option",{value:"cat"},"Cat",-1),t("option",{value:"bird"},"Bird",-1)])],512)]),e[5]||(e[5]=t("pre",null,[l("      "),t("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            focusSearch: false
          }
        })
      `),l(`
    `)],-1))])}const zl=u(El,[["render",Il]]),Wl=a({name:"SearchText",mounted(){new o({select:this.$refs.searchTextSingle,settings:{searchText:"Sorry, nothing to see here"}}),new o({select:this.$refs.searchTextMulti,settings:{searchText:"Sorry nothing to see here"}})}}),Nl={id:"searchText",class:"content"},Yl={class:"row",style:{padding:"0 0 var(--spacing-half) 0"}},Gl={ref:"searchTextSingle"},Kl={class:"row"},Jl={ref:"searchTextMulti",multiple:""};function Ql(n,e,d,c,v,h){return p(),r("div",Nl,[e[2]||(e[2]=t("h2",{class:"header"},"searchText",-1)),e[3]||(e[3]=t("p",null," The searchText setting allows you to customize the message that appears when a search query returns no matching results. This provides clear feedback to users when their search doesn't find any options, improving the overall user experience. ",-1)),e[4]||(e[4]=t("p",null,` You can use this setting to provide helpful guidance, such as "No matches found", "Try a different search term", or any other message that helps users understand why they're not seeing results and what they can do next. `,-1)),t("div",Yl,[t("select",Gl,[...e[0]||(e[0]=[t("option",{value:"dog"},"Dog",-1),t("option",{value:"cat"},"Cat",-1),t("option",{value:"bird"},"Bird",-1)])],512)]),t("div",Kl,[t("select",Jl,[...e[1]||(e[1]=[t("option",{value:"dog"},"Dog",-1),t("option",{value:"cat"},"Cat",-1),t("option",{value:"bird"},"Bird",-1)])],512)]),e[5]||(e[5]=t("pre",null,[l("      "),t("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            searchText: 'Sorry, nothing to see here'
          }
        })
      `),l(`
    `)],-1))])}const Xl=u(Wl,[["render",Ql]]),Zl=a({name:"SearchPlaceholder",mounted(){new o({select:this.$refs.searchPlaceholderSingle,settings:{searchPlaceholder:"Search for the good stuff!"}}),new o({select:this.$refs.searchPlaceholderMulti,settings:{searchPlaceholder:"Search for the good stuff!"}})}}),eo={id:"searchPlaceholder",class:"content"},to={class:"row",style:{padding:"0 0 var(--spacing-half) 0"}},lo={ref:"searchPlaceholderSingle"},oo={class:"row"},no={ref:"searchPlaceholderMulti",multiple:""};function so(n,e,d,c,v,h){return p(),r("div",eo,[e[2]||(e[2]=t("h2",{class:"header"},"searchPlaceholder",-1)),e[3]||(e[3]=t("p",null," The searchPlaceholder setting allows you to customize the placeholder text that appears in the search input field. This provides helpful guidance to users about what they can search for and creates a more intuitive search experience. ",-1)),e[4]||(e[4]=t("p",null,' You can use this setting to provide context-specific instructions, such as "Search for countries", "Find users", or any other descriptive text that helps users understand how to use the search functionality effectively. ',-1)),t("div",to,[t("select",lo,[...e[0]||(e[0]=[t("option",{value:"dog"},"Dog",-1),t("option",{value:"cat"},"Cat",-1),t("option",{value:"bird"},"Bird",-1)])],512)]),t("div",oo,[t("select",no,[...e[1]||(e[1]=[t("option",{value:"dog"},"Dog",-1),t("option",{value:"cat"},"Cat",-1),t("option",{value:"bird"},"Bird",-1)])],512)]),e[5]||(e[5]=t("pre",null,[l("      "),t("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            searchPlaceholder: 'Search for the good stuff!'
          }
        })
      `),l(`
    `)],-1))])}const io=u(Zl,[["render",so]]),ao=a({name:"SearchHighlight",data(){return{htmlData:[{text:"United States",value:"US",html:'<span style="color: #e74c3c;">🇺🇸</span> United States'},{text:"Canada",value:"CA",html:'<span style="color: #3498db;">🇨🇦</span> Canada'},{text:"United Kingdom",value:"UK",html:'<span style="color: #9b59b6;">🇬🇧</span> United Kingdom'},{text:"Germany",value:"DE",html:'<span style="color: #f39c12;">🇩🇪</span> Germany'},{text:"France",value:"FR",html:'<span style="color: #1abc9c;">🇫🇷</span> France'},{text:"Japan",value:"JP",html:'<span style="color: #e67e22;">🇯🇵</span> Japan'},{text:"Australia",value:"AU",html:'<span style="color: #16a085;">🇦🇺</span> Australia'},{text:"Brazil",value:"BR",html:'<span style="color: #27ae60;">🇧🇷</span> Brazil'}]}},mounted(){new o({select:this.$refs.searchHighlightSingle,settings:{searchHighlight:!0}}),new o({select:this.$refs.searchHighlightMulti,settings:{searchHighlight:!0}}),new o({select:this.$refs.searchHighlightHtml,settings:{searchHighlight:!0},data:this.htmlData})}}),uo={id:"searchHighlight",class:"content"},ro={class:"row",style:{padding:"0 0 var(--spacing-half) 0"}},po={ref:"searchHighlightSingle"},co={class:"row",style:{padding:"0 0 var(--spacing-half) 0"}},vo={ref:"searchHighlightMulti",multiple:""},ho={class:"row",style:{padding:"0 0 var(--spacing-half) 0"}},mo={ref:"searchHighlightHtml"};function go(n,e,d,c,v,h){return p(),r("div",uo,[e[2]||(e[2]=t("h2",{class:"header"},"searchHighlight",-1)),e[3]||(e[3]=t("p",null,[l(" The searchHighlight setting enables visual highlighting of matching text in search results, making it easier for users to see exactly what part of each option matches their search query. When enabled, matching text is wrapped in a "),t("code",null,"<mark>"),l(" element for clear visual distinction. ")],-1)),e[4]||(e[4]=t("p",null," This feature significantly improves the search experience by providing immediate visual feedback about search matches. It works with both plain text and HTML content, intelligently highlighting only the text portions while preserving all HTML structure, styles, and elements. ",-1)),t("div",ro,[t("select",po,[...e[0]||(e[0]=[g('<option value="javascript">JavaScript</option><option value="typescript">TypeScript</option><option value="python">Python</option><option value="java">Java</option><option value="csharp">C#</option><option value="cpp">C++</option><option value="ruby">Ruby</option><option value="php">PHP</option><option value="swift">Swift</option><option value="kotlin">Kotlin</option><option value="go">Go</option><option value="rust">Rust</option>',12)])],512)]),t("div",co,[t("select",vo,[...e[1]||(e[1]=[g('<option value="javascript">JavaScript</option><option value="typescript">TypeScript</option><option value="python">Python</option><option value="java">Java</option><option value="csharp">C#</option><option value="cpp">C++</option><option value="ruby">Ruby</option><option value="php">PHP</option><option value="swift">Swift</option><option value="kotlin">Kotlin</option><option value="go">Go</option><option value="rust">Rust</option>',12)])],512)]),e[5]||(e[5]=t("div",{class:"alert info"},[t("strong",null,"Tip:"),l(' Try searching for "script", "Type", or even special characters like "#" or "+" to see the highlighting in action. The feature safely escapes special characters to prevent HTML breaking. ')],-1)),e[6]||(e[6]=t("h3",null,"HTML Content with Search Highlighting",-1)),e[7]||(e[7]=t("p",null," When using HTML in options, search highlighting intelligently highlights only the text content while preserving all HTML structure, styles, and elements. ",-1)),t("div",ho,[t("select",mo,null,512)]),e[8]||(e[8]=t("div",{class:"alert info"},[t("strong",null,"Try it:"),l(' Search for "United", "States", "an", or even special characters like "<" in the example above. Notice how the emoji flags and colors remain intact while only the matching text is highlighted. ')],-1)),e[9]||(e[9]=t("pre",null,[l("      "),t("code",{class:"language-javascript"},`
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
    `)],-1))])}const fo=u(ao,[["render",go]]),wo=a({name:"Select"}),yo={id:"select",class:"content"};function $o(n,e,d,c,v,h){return p(),r("div",yo,[...e[0]||(e[0]=[t("h2",{class:"header"},"select",-1),t("p",null," The select field is the core configuration that identifies which HTML select element SlimSelect should transform. This is the most fundamental setting and must be provided for SlimSelect to work. You can use any valid CSS selector string or pass the DOM element directly. ",-1),t("p",null," This setting determines the target element that SlimSelect will replace with its enhanced dropdown interface, maintaining all the original functionality while adding advanced features like search, customization, and better user experience. ",-1),t("pre",null,[l("      "),t("code",{class:"language-javascript"},`
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
    `)],-1)])])}const So=u(wo,[["render",$o]]),bo=a({name:"SelectAll",mounted(){new o({select:this.$refs.selectAll})}}),Vo={id:"selectAll",class:"content"},xo={ref:"selectAll",multiple:""};function To(n,e,d,c,v,h){return p(),r("div",Vo,[e[1]||(e[1]=t("h2",{class:"header"},"selectAll",-1)),e[2]||(e[2]=t("p",null,' The selectAll setting adds a convenient "select all" option to optgroups, allowing users to quickly select all options within a specific group with a single click. This is particularly useful for multi-select dropdowns with categorized options. ',-1)),e[3]||(e[3]=t("p",null," When enabled, a select all option appears at the top of the optgroup, making it easy for users to select multiple related options without having to click each one individually. The selectAllText setting allows you to customize the text that appears for this option. ",-1)),e[4]||(e[4]=t("div",{class:"alert info"}," You can set selectAll/selectAllText either by data or by html dataset added to the optgroup element ",-1)),t("select",xo,[...e[0]||(e[0]=[g('<optgroup label="Label 1" data-selectall="true" data-selectalltext="Select them all!"><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></optgroup><optgroup label="Label 2"><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option></optgroup>',2)])],512),e[5]||(e[5]=t("br",null,null,-1)),e[6]||(e[6]=t("h3",null,"Via data",-1)),e[7]||(e[7]=t("pre",null,[l("      "),t("code",{class:"language-javascript"},`
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
    `)],-1)),e[8]||(e[8]=t("br",null,null,-1)),e[9]||(e[9]=t("h3",null,"Via html",-1)),e[10]||(e[10]=t("pre",null,[l("      "),t("code",{class:"language-html"},`
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
    `)],-1))])}const Mo=u(bo,[["render",To]]),Oo=a({name:"ShowTooltip",mounted(){new o({select:this.$refs.showOptionTooltips,settings:{showOptionTooltips:!0}})}}),Co={id:"showOptionTooltips",class:"content"},_o={ref:"showOptionTooltips"};function Do(n,e,d,c,v,h){return p(),r("div",Co,[e[1]||(e[1]=t("h2",{class:"header"},"showOptionTooltips",-1)),e[2]||(e[2]=t("p",null," The showOptionTooltips setting enables hover tooltips for select options, providing additional context and information to users when they hover over options. This is particularly useful for options with long text that might be truncated or when you want to provide additional details about each option. ",-1)),e[3]||(e[3]=t("p",null," When enabled, tooltips automatically display the full text content of each option when users hover over them, ensuring that users can always see the complete information even when space is limited or text is truncated in the dropdown interface. ",-1)),t("select",_o,[...e[0]||(e[0]=[t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512),e[4]||(e[4]=t("pre",null,[l("      "),t("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            showOptionTooltips: true,
          }
        })
      `),l(`
    `)],-1))])}const ko=u(Oo,[["render",Do]]),Lo=a({name:"Styles",mounted(){new o({select:this.$refs.selectStyle}),new o({select:this.$refs.optionStyle})}}),Po={id:"inlineStyles",class:"content"},Ho={class:"row"},Ao={ref:"selectStyle",style:{color:"red"}},Bo={ref:"optionStyle"};function Eo(n,e,d,c,v,h){return p(),r("div",Po,[e[2]||(e[2]=t("h2",{class:"header"},"inline styles",-1)),e[3]||(e[3]=t("p",null," SlimSelect automatically inherits any inline styles that were applied to the original select element and its options. This ensures that your existing styling, whether applied through inline styles or CSS classes, is seamlessly preserved when SlimSelect transforms the element. ",-1)),e[4]||(e[4]=t("p",null," This feature allows you to apply custom styling directly to your HTML elements and have those styles automatically carried over to the enhanced SlimSelect interface, maintaining visual consistency and reducing the need for additional CSS modifications. ",-1)),t("div",Ho,[t("select",Ao,[...e[0]||(e[0]=[t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512),t("select",Bo,[...e[1]||(e[1]=[t("option",{style:{color:"red"},value:"value1"},"Red",-1),t("option",{style:{color:"green"}},"Green",-1),t("option",{style:{color:"blue"}},"Blue",-1)])],512)]),e[5]||(e[5]=t("pre",null,[l("      "),t("code",{class:"language-html"},`
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
    `)],-1))])}const jo=u(Lo,[["render",Eo]]),qo=a({name:"Settings",components:{AdSlot:W,Select:So,CssClasses:Ye,AlwaysOpen:le,ContentLocation:Ve,ContentPosition:Pe,OpenPosition:$l,Placeholder:Cl,Deselect:at,Display:Ot,Disabled:yt,Mandatory:tl,MinMax:vl,DataAttributes:et,MaxValuesShown:al,Css:Ue,Styles:jo,Html:Rt,KeepOrder:Yt,ShowSearch:Bl,FocusSearch:zl,SearchText:Xl,SearchPlaceholder:io,SearchHighlight:fo,CloseOnSelect:ge,ShowTooltip:ko,SelectAll:Mo,Closable:re,HideSelected:Ht}}),Uo={id:"settings",class:"contents"};function Ro(n,e,d,c,v,h){const f=i("Select"),w=i("CssClasses"),m=i("AdSlot"),y=i("AlwaysOpen"),$=i("ContentLocation"),S=i("ContentPosition"),b=i("OpenPosition"),V=i("Placeholder"),x=i("SelectAll"),T=i("Deselect"),M=i("Display"),O=i("Disabled"),C=i("Mandatory"),_=i("MinMax"),D=i("DataAttributes"),k=i("Css"),L=i("Styles"),P=i("Html"),H=i("KeepOrder"),A=i("ShowSearch"),B=i("FocusSearch"),E=i("SearchText"),j=i("SearchPlaceholder"),q=i("SearchHighlight"),U=i("CloseOnSelect"),R=i("ShowTooltip"),F=i("Closable"),I=i("HideSelected"),z=i("MaxValuesShown");return p(),r("div",Uo,[s(f),s(w),s(m,{"ad-slot":"1270131515"}),s(y),s($),s(m,{"ad-slot":"1270131515"}),s(S),s(b),s(m,{"ad-slot":"1270131515"}),s(V),s(x),s(m,{"ad-slot":"1270131515"}),s(T),s(M),s(m,{"ad-slot":"1270131515"}),s(O),s(C),s(m,{"ad-slot":"1270131515"}),s(_),s(D),s(m,{"ad-slot":"1270131515"}),s(k),s(L),s(m,{"ad-slot":"1270131515"}),s(P),s(H),s(m,{"ad-slot":"1270131515"}),s(A),s(B),s(m,{"ad-slot":"1270131515"}),s(E),s(j),s(m,{"ad-slot":"1270131515"}),s(q),s(U),s(m,{"ad-slot":"1270131515"}),s(R),s(F),s(m,{"ad-slot":"1270131515"}),s(I),s(z)])}const Io=u(qo,[["render",Ro]]);export{Io as default};
