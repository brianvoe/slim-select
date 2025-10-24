import{d as u,f as r,S as s,_ as p,c as d,a as t,e as l,w as i,r as n,o as c,b as S,g as y,A as Y}from"./index.js";const G=u({name:"AlwaysOpen",mounted(){new s({select:this.$refs.alwaysOpenSingle,settings:{alwaysOpen:!0,contentLocation:this.$refs.alwaysOpenSingleContent,contentPosition:"relative"}}),new s({select:this.$refs.alwaysOpenMultiple,settings:{alwaysOpen:!0,contentLocation:this.$refs.alwaysOpenMultipleContent,contentPosition:"relative"}})},components:{ShikiStyle:r}}),K={id:"alwaysOpen",class:"content"},J={class:"row"},Q={style:{height:"auto"}},X={ref:"alwaysOpenSingle"},Z={ref:"alwaysOpenSingleContent"},ee={style:{height:"auto"}},te={ref:"alwaysOpenMultiple",multiple:""},le={ref:"alwaysOpenMultipleContent"};function oe(a,e,v,h,m,g){const o=n("ShikiStyle");return c(),d("div",K,[e[4]||(e[4]=t("h2",{class:"header"},"alwaysOpen",-1)),e[5]||(e[5]=t("p",null," The alwaysOpen setting keeps the dropdown options visible at all times, transforming SlimSelect into a persistent list that users can interact with without needing to click to open it. This is particularly useful for creating custom interfaces that look more like lists or checkboxes. ",-1)),e[6]||(e[6]=t("p",null," This setting is commonly used when you want to display options permanently, such as in sidebar filters, configuration panels, or any interface where the dropdown should behave more like a persistent selection list rather than a traditional dropdown. ",-1)),t("div",J,[t("div",Q,[t("select",X,[...e[0]||(e[0]=[t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512),t("div",Z,null,512)]),t("div",ee,[t("select",te,[...e[1]||(e[1]=[t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1),t("option",{value:"value4"},"Value 4",-1)])],512),t("div",le,null,512)])]),l(o,{language:"javascript"},{default:i(()=>[...e[2]||(e[2]=[t("pre",null,`        new SlimSelect({
          select: '#selectElement',
          settings: {
            alwaysOpen: true,

            // In various situations it may be useful to set the contentLocation
            // to an element that will display best
            contentLocation: document.getElementById('local'),
            contentPosition: 'relative',
          }
        })
      `,-1)])]),_:1}),l(o,{language:"html"},{default:i(()=>[...e[3]||(e[3]=[t("pre",null,`        <select id="selectElement">
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>

        <!-- The content will go in this div -->
        <div id="local"></div>
      `,-1)])]),_:1})])}const ne=p(G,[["render",oe]]),se=u({name:"Closable",mounted(){new s({select:this.$refs.closableSingle}),new s({select:this.$refs.closableMultiple})},components:{ShikiStyle:r}}),ie={id:"closable",class:"content"},ae={class:"row"},ue={ref:"closableSingle"},re={ref:"closableMultiple",multiple:""};function pe(a,e,v,h,m,g){const o=n("ShikiStyle");return c(),d("div",ie,[e[4]||(e[4]=S('<h2 class="header">closable</h2><p> The closable setting allows optgroups to be collapsible, giving users the ability to expand or collapse groups of options. This is particularly useful for organizing large lists of options into manageable, collapsible sections. </p><p> This feature helps improve the user experience by reducing visual clutter and allowing users to focus on specific categories of options. Users can expand or collapse optgroups as needed, making navigation through large option lists much more efficient. </p><p>Values: <strong>&quot;off&quot;</strong> | <strong>&quot;open&quot;</strong> | <strong>&quot;close&quot;</strong></p><p>Default: <strong>&quot;off&quot;</strong></p><div class="alert info">You can set closable either by data or by html dataset added to the optgroup element</div>',6)),t("div",ae,[t("select",ue,[...e[0]||(e[0]=[S('<optgroup label="Label 1" data-closable="off"><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></optgroup><optgroup label="Label 2" data-closable="open"><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option></optgroup><optgroup label="Label 3" data-closable="close"><option value="value7">Value 7</option><option value="value8">Value 8</option><option value="value9">Value 9</option></optgroup>',3)])],512),t("select",re,[...e[1]||(e[1]=[S('<optgroup label="Label 1" data-selectall="true" data-closable="off"><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></optgroup><optgroup label="Label 2" data-selectall="true" data-closable="open"><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option></optgroup><optgroup label="Label 3" data-selectall="true" data-closable="close"><option value="value7">Value 7</option><option value="value8">Value 8</option><option value="value9">Value 9</option></optgroup>',3)])],512)]),e[5]||(e[5]=t("br",null,null,-1)),e[6]||(e[6]=t("h3",null,"Via data",-1)),l(o,{language:"javascript"},{default:i(()=>[...e[2]||(e[2]=[t("pre",null,`        new SlimSelect({
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
      `,-1)])]),_:1}),e[7]||(e[7]=t("br",null,null,-1)),e[8]||(e[8]=t("h3",null,"Via html",-1)),l(o,{language:"html"},{default:i(()=>[...e[3]||(e[3]=[t("pre",null,`        <select ref="closable" multiple>
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
      `,-1)])]),_:1})])}const de=p(se,[["render",pe]]),ce=u({name:"CloseOnSelect",mounted(){new s({select:this.$refs.closeOnSelectSingle,settings:{closeOnSelect:!1}}),new s({select:this.$refs.closeOnSelectMultiple,settings:{closeOnSelect:!1}})},components:{ShikiStyle:r}}),ve={id:"closeOnSelect",class:"content"},he={class:"row"},me={ref:"closeOnSelectSingle"},ge={ref:"closeOnSelectMultiple",multiple:""};function fe(a,e,v,h,m,g){const o=n("ShikiStyle");return c(),d("div",ve,[e[3]||(e[3]=t("h2",{class:"header"},"closeOnSelect",-1)),e[4]||(e[4]=t("p",null," The closeOnSelect setting controls whether the dropdown closes automatically after a user makes a selection. This behavior is particularly important for multi-select dropdowns where you might want to keep the dropdown open so users can make multiple selections without having to reopen it each time. ",-1)),e[5]||(e[5]=t("p",null," When set to false, the dropdown remains open after each selection, making it easier for users to select multiple options in succession. This is especially useful for multi-select scenarios where users need to choose several items from a list. ",-1)),t("div",he,[t("select",me,[...e[0]||(e[0]=[S('<option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option><optgroup label="Super Values"><option value="value11">Value 1</option><option value="value22">Value 2</option><option value="value33">Value 3</option></optgroup>',4)])],512),t("select",ge,[...e[1]||(e[1]=[S('<option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option><optgroup label="Super Values"><option value="value11">Value 1</option><option value="value22">Value 2</option><option value="value33">Value 3</option></optgroup>',4)])],512)]),l(o,{language:"javascript"},{default:i(()=>[...e[2]||(e[2]=[t("pre",null,`        new SlimSelect({
          select: '#search',
          settings: {
            closeOnSelect: false,
          },
        })
      `,-1)])]),_:1})])}const Se=p(ce,[["render",fe]]),ye=u({name:"ContentLocation",mounted(){new s({select:this.$refs.contentLocation,settings:{contentLocation:this.$refs.local}})},components:{ShikiStyle:r}}),we={id:"contentLocation",class:"content"},$e={class:"row"},be={ref:"contentLocation",style:{width:"50%"}},Ve={ref:"local"};function xe(a,e,v,h,m,g){const o=n("ShikiStyle");return c(),d("div",we,[e[3]||(e[3]=t("h2",{class:"header"},"contentLocation",-1)),e[4]||(e[4]=t("p",null," The contentLocation setting allows you to specify where the dropdown content (search input and options) should be rendered in the DOM. By default, SlimSelect appends the content to the document body, but you can redirect it to any container element. ",-1)),e[5]||(e[5]=t("p",null," This is particularly useful for maintaining proper z-index layering, avoiding overflow issues, or ensuring the dropdown appears within a specific container. The content container includes the search input field and all available options, giving you control over where this interactive area appears. ",-1)),t("div",$e,[t("select",be,[...e[0]||(e[0]=[t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512),t("div",Ve,null,512)]),l(o,{language:"javascript"},{default:i(()=>[...e[1]||(e[1]=[t("pre",null,`        new SlimSelect({
          select: '#selectElement',
          settings: {
            contentLocation: document.getElementById('local')
          }
        })
      `,-1)])]),_:1}),l(o,{language:"html"},{default:i(()=>[...e[2]||(e[2]=[t("pre",null,`        <select id="contentLocation">
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>

        <!-- The content will go in this div -->
        <div id="local"></div>
      `,-1)])]),_:1})])}const _e=p(ye,[["render",xe]]),Te=u({name:"ContentPosition",mounted(){new s({select:this.$refs.contentPositionRelative,settings:{contentPosition:"relative",contentLocation:this.$refs.contentPositionRelativeContent}}),new s({select:this.$refs.contentPositionAbsolute,settings:{contentPosition:"absolute"}}),new s({select:this.$refs.contentPositionFixed,settings:{contentPosition:"fixed"}})},components:{ShikiStyle:r}}),ke={id:"contentPosition",class:"content"},Me={class:"row"},Oe={ref:"contentPositionRelative",class:"relative"},Ce={ref:"contentPositionRelativeContent"},De={ref:"contentPositionAbsolute",class:"absolute"},Le={class:"row"},Pe={ref:"contentPositionFixed",class:"fixed"};function He(a,e,v,h,m,g){const o=n("ShikiStyle");return c(),d("div",ke,[e[4]||(e[4]=t("h2",{class:"header"},"contentPosition",-1)),e[5]||(e[5]=t("p",null," The contentPosition setting controls the CSS positioning of the dropdown content. You can choose between 'relative', 'absolute', or 'fixed' positioning to achieve the desired layout behavior and ensure proper display in different contexts. ",-1)),e[6]||(e[6]=t("p",null," This setting is crucial for handling complex layouts, modal dialogs, or responsive designs where the default absolute positioning might not work correctly. The default is 'absolute', but 'relative' is useful for inline layouts, and 'fixed' helps with modal and overlay scenarios. ",-1)),e[7]||(e[7]=t("div",{class:"alert info"}," If you do use relative position be sure to set the contentLocation to an element that will work best for your use case. Otherwise SlimSelect will add you content to the body of the html. See example usage below. ",-1)),e[8]||(e[8]=t("div",{class:"alert info"}," Fixed was added to address issues with fixed positioning in modals and other elements that have fixed positioning. ",-1)),t("div",Me,[t("select",Oe,[...e[0]||(e[0]=[t("option",{"data-placeholder":"true"},"Relative",-1),t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512),t("div",Ce,null,512),t("select",De,[...e[1]||(e[1]=[t("option",{"data-placeholder":"true"},"Absolute",-1),t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512)]),t("div",Le,[t("select",Pe,[...e[2]||(e[2]=[t("option",{"data-placeholder":"true"},"Fixed",-1),t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512)]),l(o,{language:"javascript"},{default:i(()=>[...e[3]||(e[3]=[t("pre",null,`        new SlimSelect({
          select: '#selectElement',
          settings: {
            contentPosition: 'relative' // 'absolute', 'relative' or 'fixed'

            // To help with relative positioning 
            // you can set the contentLocation
            contentLocation: document.getElementById('local')
          }
        })
      `,-1)])]),_:1})])}const Ae=p(Te,[["render",He]]),Be=u({name:"Css",mounted(){new s({select:this.$refs.selectClass}),new s({select:this.$refs.optionClass})},components:{ShikiStyle:r}}),Ee={id:"cssClass",class:"content"},je={class:"row"},qe={ref:"selectClass",class:"select-class"},Ue={ref:"optionClass",class:"option-class"};function Re(a,e,v,h,m,g){const o=n("ShikiStyle");return c(),d("div",Ee,[e[3]||(e[3]=t("h2",{class:"header"},"css class",-1)),e[4]||(e[4]=t("p",null," SlimSelect automatically inherits any CSS classes that were applied to the original select element and its options. This seamless inheritance allows you to maintain your existing styling while gaining all the enhanced functionality of SlimSelect. ",-1)),e[5]||(e[5]=t("p",null," This feature ensures that your custom CSS classes, whether applied to the main select element or individual options, are preserved and applied to the corresponding SlimSelect elements, making the transition from native selects to SlimSelect completely transparent from a styling perspective. ",-1)),t("div",je,[t("select",qe,[...e[0]||(e[0]=[t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512),t("select",Ue,[...e[1]||(e[1]=[t("option",{class:"red",value:"value1"},"Red",-1),t("option",{class:"green",value:"value2"},"Green",-1),t("option",{class:"blue",value:"value3"},"Blue",-1)])],512)]),l(o,{language:"html"},{default:i(()=>[...e[2]||(e[2]=[t("pre",null,`        <select id="select-class" class="classItems">
          <option class="red" value="value1">Value 1</option>
          <option class="green" value="value2">Value 2</option>
          <option class="blue" value="value3">Value 3</option>
        </select>
      `,-1)])]),_:1})])}const Fe=p(Be,[["render",Re]]),Ie=u({name:"CustomCss",mounted(){new s({select:this.$refs.mainSelect,cssClasses:{option:"primary-option"}}),new s({select:this.$refs.secondarySelect,cssClasses:{option:"secondary-option"}})},components:{ShikiStyle:r}}),ze={id:"cssClasses",class:"content"},We={class:"row"},Ne={ref:"mainSelect"},Ye={ref:"secondarySelect"};function Ge(a,e,v,h,m,g){const o=n("ShikiStyle");return c(),d("div",ze,[e[4]||(e[4]=t("h2",{class:"header"},"cssClasses",-1)),e[5]||(e[5]=t("p",null," The cssClasses setting allows you to override SlimSelect's default CSS classes with your own custom classes. This gives you complete control over the styling of different parts of the dropdown, enabling you to match your application's design system perfectly. ",-1)),e[6]||(e[6]=t("p",null," You can customize classes for various elements like options, the main container, search input, and more. This is particularly useful when you need to apply specific styling that integrates seamlessly with your existing CSS framework or design requirements. ",-1)),t("div",We,[t("select",Ne,[...e[0]||(e[0]=[t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512),t("select",Ye,[...e[1]||(e[1]=[t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512)]),l(o,{language:"html"},{default:i(()=>[...e[2]||(e[2]=[t("pre",null,`        <select id="primary-select">
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      `,-1)])]),_:1}),l(o,{language:"javascript"},{default:i(()=>[...e[3]||(e[3]=[t("pre",null,`        new SlimSelect({
          select: '#primary-select',
          cssClasses: {
            option: "primary-option" 
        })
      `,-1)])]),_:1})])}const Ke=p(Ie,[["render",Ge]]),Je=u({name:"DataAttributes",mounted(){new s({select:this.$refs.optionsSingle}),new s({select:this.$refs.optionsMultiple})},components:{ShikiStyle:r}}),Qe={id:"dataAttributes",class:"content"},Xe={class:"row"},Ze={ref:"optionsSingle"},et={ref:"optionsMultiple",multiple:""};function tt(a,e,v,h,m,g){return c(),d("div",Qe,[e[2]||(e[2]=t("h2",{class:"header"},"Data Attributes",-1)),e[3]||(e[3]=t("p",null," SlimSelect automatically inherits and preserves data attributes from the original select element and its options, ensuring that any custom data you've attached to your HTML elements is maintained in the enhanced interface. This includes standard HTML attributes like disabled, class, style, and custom data attributes. ",-1)),e[4]||(e[4]=t("p",null," This feature allows you to maintain all your existing HTML attributes and data while gaining the enhanced functionality of SlimSelect, making the transition seamless and preserving any custom behavior or styling that depends on these attributes. ",-1)),t("div",Xe,[t("select",Ze,[...e[0]||(e[0]=[S('<option data-placeholder="true"></option><option value="value1" data-info="Here is info">Data Attributes</option><option value="value2" disabled>Disabled Option</option><option value="value3" class="green">Class Green</option><option value="value4" style="color:purple;">Inline Style</option>',5)])],512),t("select",et,[...e[1]||(e[1]=[t("option",{value:"value1","data-info":"Here is info"},"Data Attributes",-1),t("option",{value:"value2",disabled:""},"Disabled Option",-1),t("option",{value:"value3",class:"green"},"Class Green",-1),t("option",{value:"value4",style:{color:"purple"}},"Inline Style",-1)])],512)])])}const lt=p(Je,[["render",tt]]),ot=u({name:"Deselect",mounted(){new s({select:this.$refs.allowDeselectSingle,settings:{allowDeselect:!0}}),new s({select:this.$refs.allowDeselectMultiple,settings:{allowDeselect:!0}})},components:{ShikiStyle:r}}),nt={id:"allowDeselect",class:"content"},st={class:"row"},it={ref:"allowDeselectSingle"},at={ref:"allowDeselectMultiple",multiple:""};function ut(a,e,v,h,m,g){const o=n("ShikiStyle");return c(),d("div",nt,[e[4]||(e[4]=t("h2",{class:"header"},"allowDeselect",-1)),e[5]||(e[5]=t("p",null,' The allowDeselect setting enables users to clear their selection and return to an empty state. This is particularly useful when you want to give users the ability to "unselect" a value, which is especially important for optional form fields. ',-1)),e[6]||(e[6]=t("p",null,' When enabled, users can click on the selected value to deselect it, returning the dropdown to its placeholder state. For this to work properly, you need an empty option with data-placeholder="true" in your HTML so SlimSelect has an empty value to select. ',-1)),t("div",st,[t("select",it,[...e[0]||(e[0]=[t("option",{"data-placeholder":"true"},null,-1),t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512),t("select",at,[...e[1]||(e[1]=[t("option",{"data-placeholder":"true"},null,-1),t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512)]),l(o,{language:"javascript"},{default:i(()=>[...e[2]||(e[2]=[t("pre",null,`        new SlimSelect({
          select: '#selectElement',
          settings: {
            allowDeselect: true
          }
        })
      `,-1)])]),_:1}),l(o,{language:"html"},{default:i(()=>[...e[3]||(e[3]=[t("pre",null,`        <!-- Requires emtpy data-placeholder option -->
        <select id="allowDeselect">
          <option data-placeholder="true"></option>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      `,-1)])]),_:1})])}const rt=p(ot,[["render",ut]]),pt=u({name:"Disabled",mounted(){new s({select:this.$refs.disabledSingle,settings:{disabled:!0}}),new s({select:this.$refs.disabledMultiple}),new s({select:this.$refs.disabledOptionSingle,data:[{text:"Option 1",value:"option1"},{text:"Option 2",value:"option2",disabled:!0},{text:"Option 3",value:"option3"}]}),new s({select:this.$refs.disabledOptionMultiple}),new s({select:this.$refs.disabledDynamicSingle}).select.showUI()},methods:{enableDisableDynamic(){const a=this.$refs.disabledDynamicSingle;a&&(a.disabled=!a.disabled)}},components:{ShikiStyle:r}}),dt={id:"disabled",class:"content"},ct={class:"row"},vt={ref:"disabledSingle"},ht={ref:"disabledMultiple",multiple:"",disabled:""},mt={class:"row"},gt={ref:"disabledOptionSingle"},ft={ref:"disabledOptionMultiple",multiple:""},St={class:"row"},yt={ref:"disabledDynamicSingle"};function wt(a,e,v,h,m,g){const o=n("ShikiStyle");return c(),d("div",dt,[e[8]||(e[8]=t("h2",{class:"header"},"disabled",-1)),e[9]||(e[9]=t("p",null," The disabled functionality allows you to disable the entire select dropdown or individual options, providing fine-grained control over user interactions. This is essential for creating dynamic interfaces where certain selections should be temporarily unavailable based on business logic or user permissions. ",-1)),e[10]||(e[10]=t("p",null," You can disable the entire dropdown through settings or HTML attributes, or disable specific options to prevent users from selecting them while keeping other options available. SlimSelect also provides methods to dynamically enable and disable elements programmatically. ",-1)),e[11]||(e[11]=t("div",{class:"alert info"},"Methods also are provided to enable and disable SlimSelect via method call.",-1)),t("div",ct,[t("select",vt,[...e[1]||(e[1]=[t("option",{value:"value1",selected:""},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512),t("select",ht,[...e[2]||(e[2]=[t("option",{value:"value1",selected:""},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512)]),e[12]||(e[12]=t("br",null,null,-1)),t("div",mt,[t("select",gt,[...e[3]||(e[3]=[t("option",{value:"value1",selected:""},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512),t("select",ft,[...e[4]||(e[4]=[t("option",{value:"value1",selected:""},"Value 1",-1),t("option",{value:"value2",disabled:""},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512)]),e[13]||(e[13]=t("br",null,null,-1)),t("div",St,[t("div",{class:"btn",onClick:e[0]||(e[0]=(...w)=>a.enableDisableDynamic&&a.enableDisableDynamic(...w))},"Enable/Disable Original Select"),t("select",yt,[...e[5]||(e[5]=[t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512)]),l(o,{language:"javascript"},{default:i(()=>[...e[6]||(e[6]=[t("pre",null,`        // Disable via settings
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
      `,-1)])]),_:1}),l(o,{language:"html"},{default:i(()=>[...e[7]||(e[7]=[t("pre",null,`        <select id="selectElement">
          <option value="value1" selected>Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>

        <select id="selectElement" multiple disabled>
          <option value="value1" selected>Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      `,-1)])]),_:1})])}const $t=p(pt,[["render",wt]]),bt=u({name:"Display",mounted(){const a=new s({select:this.$refs.selectdisplay}),e=[{value:"value1",text:"Value 1",display:!1},{value:"value2",text:"Value 2"},{value:"value3",text:"Value 3"}];a.setData(e),a.setSelected(["value1","value3"]),new s({select:this.$refs.selectdisplay2})},components:{ShikiStyle:r}}),Vt={id:"display",class:"content"},xt={class:"row"},_t={ref:"selectdisplay",multiple:""},Tt={class:"row"},kt={ref:"selectdisplay2",multiple:""};function Mt(a,e,v,h,m,g){const o=n("ShikiStyle");return c(),d("div",Vt,[e[5]||(e[5]=t("h2",{class:"header"},"display",-1)),e[6]||(e[6]=t("p",null," The display setting allows you to control the visibility of selected values in multi-select dropdowns. This is particularly useful when you want to hide certain selected values from the user interface while still maintaining them in the underlying data. ",-1)),e[7]||(e[7]=t("p",null," This feature is commonly used for managing hidden or system values, implementing complex selection logic, or creating user interfaces where some selections should remain invisible to users while still being part of the form data. ",-1)),t("div",xt,[t("select",_t,null,512)]),l(o,{language:"javascript"},{default:i(()=>[...e[0]||(e[0]=[t("pre",null,`        const displaySelect = new SlimSelect({
          select: '#selectElement'
        })

        const displayData = [
          { value: 'value1', text: 'Value 1', display: false },
          { value: 'value2', text: 'Value 2' },
          { value: 'value3', text: 'Value 3' },
        ]

        displaySelect.setData(displayData)
        displaySelect.set(['value1', 'value3'])
      `,-1)])]),_:1}),l(o,{language:"html"},{default:i(()=>[...e[1]||(e[1]=[t("pre",null,`        <select id="selectMultiMandatory" multiple></select>
      `,-1)])]),_:1}),e[8]||(e[8]=t("p",null,"Or",-1)),t("div",Tt,[t("select",kt,[...e[2]||(e[2]=[t("option",{value:"value1",style:{display:"none"},selected:""},"Value 1",-1),t("option",{value:"value2",selected:""},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512)]),l(o,{language:"javascript"},{default:i(()=>[...e[3]||(e[3]=[t("pre",null,`        const slim = new SlimSelect({
          select: '#selectElement'
        });
      `,-1)])]),_:1}),l(o,{language:"html"},{default:i(()=>[...e[4]||(e[4]=[t("pre",null,`        <select id="selectdisplay2" multiple>
          <option value="value1" style="display: none;" selected>Value 1</option>
          <option value="value2" selected>Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      `,-1)])]),_:1})])}const Ot=p(bt,[["render",Mt]]),Ct=u({name:"HideSelected",mounted(){new s({select:this.$refs.hideSelectedSingle,settings:{hideSelected:!0}}),new s({select:this.$refs.hideSelectedMultiple,settings:{hideSelected:!0}})},components:{ShikiStyle:r}}),Dt={id:"hideSelected",class:"content"},Lt={class:"row"},Pt={ref:"hideSelectedSingle"},Ht={ref:"hideSelectedMultiple",multiple:""};function At(a,e,v,h,m,g){const o=n("ShikiStyle");return c(),d("div",Dt,[e[4]||(e[4]=t("h2",{class:"header"},"hideSelected",-1)),e[5]||(e[5]=t("p",null," The hideSelected setting prevents already selected options from appearing in the dropdown list. This creates a cleaner interface by removing options that have already been chosen, making it easier for users to see what options are still available. ",-1)),e[6]||(e[6]=t("p",null," This feature is particularly useful for multi-select dropdowns where showing selected options in the list might be redundant or confusing. It helps users focus on the remaining choices and provides a more streamlined selection experience. ",-1)),t("div",Lt,[t("select",Pt,[...e[0]||(e[0]=[t("option",{"data-placeholder":"true"},null,-1),t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512),t("select",Ht,[...e[1]||(e[1]=[t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512)]),l(o,{language:"javascript"},{default:i(()=>[...e[2]||(e[2]=[t("pre",null,`        new SlimSelect({
          select: '#selectElement',
          settings: {
            hideSelected: true,
          }
        })
      `,-1)])]),_:1}),l(o,{language:"html"},{default:i(()=>[...e[3]||(e[3]=[t("pre",null,`        <select id="hideSelectedSingle">
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
      `,-1)])]),_:1})])}const Bt=p(Ct,[["render",At]]),Et=u({name:"Html",mounted(){new s({select:this.$refs.htmlSingle,settings:{searchHighlight:!0},data:[{html:"<b>Bold Text</b>",text:"Bold Text",value:"bold text"},{html:'<div style="border: solid 1px #666666;">Border</div>',text:"Border",value:"border"},{html:"<i>Slim Select is awesome</i>",text:"Slim Select is awesome"}]}),new s({select:this.$refs.htmlMulti,settings:{searchHighlight:!0}})},components:{ShikiStyle:r}}),jt={id:"html",class:"content"},qt={class:"row"},Ut={ref:"htmlSingle"},Rt={ref:"htmlMulti",multiple:""};function Ft(a,e,v,h,m,g){const o=n("ShikiStyle");return c(),d("div",jt,[e[3]||(e[3]=t("h2",{class:"header"},"html",-1)),e[4]||(e[4]=t("p",null," SlimSelect supports custom HTML content for both the dropdown options and selected values, allowing you to create rich, visually appealing interfaces with icons, formatting, colors, and other HTML elements. This feature enables you to go beyond plain text and create sophisticated user interfaces. ",-1)),e[5]||(e[5]=t("p",null," When the HTML field is provided, SlimSelect uses it for display purposes while maintaining the text field for functionality. For multi-select dropdowns, selected values always use the text field to ensure clean tag display, while the dropdown options can use the full HTML content for rich presentation. ",-1)),t("div",qt,[t("select",Ut,null,512),t("select",Rt,[...e[0]||(e[0]=[t("option",{value:"bold text","data-html":"<b>Bold Text</b>"},"Bold Text",-1),t("option",{value:"border","data-html":"<div style='border: solid 1px #666666;'>Border</div>"},"Border",-1),t("option",{value:"slim select","data-html":"<i>Slim Select is awesome</i>"},"Slim Select is awesome",-1)])],512)]),e[6]||(e[6]=t("h3",null,"Via data",-1)),l(o,{language:"javascript"},{default:i(()=>[...e[1]||(e[1]=[t("pre",null,`        var select = new SlimSelect({
          select: '#selectElement',
          data: [
            {html: '<b>Bold Text</b>', text: 'Bold Text', value: 'bold text'},
            {html: '<div style="border: solid 1px #666666;">Border</div>', text: 'Border', value: 'border'},
            {html: '<i>Slim Select is awesome</i>', text: 'Slim Select is awesome'}
          ]
        })
      `,-1)])]),_:1}),e[7]||(e[7]=t("h3",null,"Via data attribute",-1)),l(o,{language:"html"},{default:i(()=>[...e[2]||(e[2]=[t("pre",null,`        <select id="selectElement">
          <option value="bold text" data-html="<b>Bold Text</b>">Bold Text</option>
          <option value="border" data-html="<div style="border: solid 1px #666666;">Border</div>">Border</option>
          <option value="slim select" data-html="<i>Slim Select is awesome</i>">Slim Select awesome</option>
        </select>
      `,-1)])]),_:1})])}const It=p(Et,[["render",Ft]]),zt=u({name:"KeepOrder",mounted(){new s({select:this.$refs.keepOrder,settings:{keepOrder:!0}})},components:{ShikiStyle:r}}),Wt={id:"keepOrder",class:"content"},Nt={class:"row"},Yt={ref:"keepOrder",multiple:""};function Gt(a,e,v,h,m,g){const o=n("ShikiStyle");return c(),d("div",Wt,[e[2]||(e[2]=S('<h2 class="header">keepOrder</h2><p> The keepOrder setting controls how SlimSelect returns selected values in multi-select mode, allowing you to choose between DOM order (how options appear in the HTML) or selection order (the order in which users clicked/selected the options). </p><p> This setting is particularly useful when the order of selections matters for your application logic, such as when building ordered lists, prioritizing selections, or maintaining user interaction patterns. It gives you control over whether to preserve the original HTML structure or respect the user&#39;s selection sequence. </p><div class="alert"><p><strong>Important:</strong> This maintains <strong>selection order</strong> (the order you clicked), NOT DOM order! </p></div><p><strong>When false (default):</strong> Returns options in DOM order (how they appear in the HTML)</p><p><strong>When true:</strong> Returns options in the order they were clicked/selected by the user</p><h3>Example:</h3><p>If you have options: Apple, Banana, Cherry</p><ul><li>You click: Cherry → Apple → Banana</li><li><code>keepOrder: false</code> → returns <code>[&#39;Apple&#39;, &#39;Banana&#39;, &#39;Cherry&#39;]</code> (DOM order)</li><li><code>keepOrder: true</code> → returns <code>[&#39;Cherry&#39;, &#39;Apple&#39;, &#39;Banana&#39;]</code> (click order)</li></ul><p>Values: <strong>true</strong> | <strong>false</strong></p><p>Default: <strong>false</strong></p>',11)),t("div",Nt,[t("select",Yt,[...e[0]||(e[0]=[S('<option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option><optgroup label="Label 1"><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option></optgroup><optgroup label="Label 2"><option value="value7">Value 7</option><option value="value8">Value 8</option><option value="value9">Value 9</option></optgroup>',5)])],512)]),e[3]||(e[3]=t("br",null,null,-1)),e[4]||(e[4]=t("h3",null,"Via html",-1)),l(o,{language:"html"},{default:i(()=>[...e[1]||(e[1]=[t("pre",null,`        <select ref="closable" multiple>
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
      `,-1)])]),_:1})])}const Kt=p(zt,[["render",Gt]]),Jt=u({name:"Mandatory",mounted(){const a=new s({select:this.$refs.selectMultiMandatory}),e=[{value:"value1",text:"Value 1",mandatory:!0},{value:"value2",text:"Value 2"},{value:"value3",text:"Value 3"}];a.setData(e),a.setSelected(["value1","value3"]),new s({select:this.$refs.selectMultiMandatory2})},components:{ShikiStyle:r}}),Qt={id:"mandatory",class:"content"},Xt={class:"row"},Zt={ref:"selectMultiMandatory",multiple:""},el={class:"row"},tl={ref:"selectMultiMandatory2",multiple:""};function ll(a,e,v,h,m,g){const o=n("ShikiStyle");return c(),d("div",Qt,[e[5]||(e[5]=t("h2",{class:"header"},"mandatory",-1)),e[6]||(e[6]=t("p",null," The mandatory setting allows you to mark certain options as required in multi-select dropdowns, preventing users from deselecting them once they've been chosen. This is particularly useful for options that represent essential or system-required selections that must always remain active. ",-1)),e[7]||(e[7]=t("p",null," When an option is marked as mandatory, users can select it normally, but once selected, they cannot deselect it, ensuring that critical options remain part of the selection. Note that mandatory options are not selected by default - users must actively choose them, but once selected, they become permanently locked in the selection. ",-1)),t("div",Xt,[t("select",Zt,null,512)]),l(o,{language:"javascript"},{default:i(()=>[...e[0]||(e[0]=[t("pre",null,`        const slim = new SlimSelect({
          select: '#selectElement'
        });

        const data = [
          { value: 'value1', text: 'Value 1', mandatory: true },
          { value: 'value2', text: 'Value 2' },
          { value: 'value3', text: 'Value 3' },
        ]

        slim.setData(data)
        slim.set(["value1", "value3"])
      `,-1)])]),_:1}),l(o,{language:"html"},{default:i(()=>[...e[1]||(e[1]=[t("pre",null,`        <select id="selectMultiMandatory" multiple></select>
      `,-1)])]),_:1}),e[8]||(e[8]=t("p",null,"Or",-1)),t("div",el,[t("select",tl,[...e[2]||(e[2]=[t("option",{value:"value1","data-mandatory":"true",selected:""},"Value 1",-1),t("option",{value:"value2",selected:""},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512)]),l(o,{language:"javascript"},{default:i(()=>[...e[3]||(e[3]=[t("pre",null,`        const slim = new SlimSelect({
          select: '#selectElement'
        });
      `,-1)])]),_:1}),l(o,{language:"html"},{default:i(()=>[...e[4]||(e[4]=[t("pre",null,`        <select id="selectMultiMandatory" multiple>
          <option value="value1" data-mandatory="true" selected>Value 1</option>
          <option value="value2" selected>Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      `,-1)])]),_:1})])}const ol=p(Jt,[["render",ll]]),nl=u({name:"MaxValuesShown",mounted(){new s({select:this.$refs.maxValuesShown,settings:{maxValuesShown:5,maxValuesMessage:"{number} selected",allowDeselect:!0}})},components:{ShikiStyle:r}}),sl={id:"maxValuesShown",class:"content"},il={class:"row"},al={ref:"maxValuesShown",multiple:""};function ul(a,e,v,h,m,g){const o=n("ShikiStyle");return c(),d("div",sl,[e[3]||(e[3]=t("h2",{class:"header"},"maxValuesShown",-1)),e[4]||(e[4]=t("p",null," The maxValuesShown setting controls how many selected values are displayed individually before switching to a summary format. When the number of selected items exceeds this threshold, SlimSelect displays a count message instead of showing all individual values. ",-1)),e[5]||(e[5]=t("p",null," This feature prevents the dropdown from becoming cluttered with too many selected value tags, maintaining a clean and readable interface. The summary message can be customized using the maxValuesMessage setting, which supports the '{number}' placeholder for dynamic count display. ",-1)),e[6]||(e[6]=t("p",null,[t("strong",null,"Default:"),y(" 20")],-1)),t("div",il,[t("select",al,[...e[0]||(e[0]=[S('<option value="value1" selected>Value 1</option><option value="value2" selected>Value 2</option><option value="value3" selected>Value 3</option><option value="value4" selected>Value 4</option><option value="value5" selected>Value 5</option><option value="value6" selected>Value 6</option><option value="value7">Value 7</option><option value="value8">Value 8</option>',8)])],512)]),l(o,{language:"javascript"},{default:i(()=>[...e[1]||(e[1]=[t("pre",null,`        new SlimSelect({
          select: '#selectElement',
          settings: {
            maxValuesShown: 5, // Default 20
            maxValuesMessage: '{number} values selected', // Default '{number} selected'
          },
        });
      `,-1)])]),_:1}),l(o,{language:"html"},{default:i(()=>[...e[2]||(e[2]=[t("pre",null,`        <select id="maxValuesShown" multiple>
          <option value="value1" selected>Value 1</option>
          <option value="value2" selected>Value 2</option>
          <option value="value3" selected>Value 3</option>
          <option value="value4" selected>Value 4</option>
          <option value="value5" selected>Value 5</option>
          <option value="value6">Value 6</option>
          <option value="value7">Value 7</option>
          <option value="value8">Value 8</option>
        </select>
      `,-1)])]),_:1})])}const rl=p(nl,[["render",ul]]),pl=u({name:"MinMax",mounted(){new s({select:this.$refs.selectMultiMax,settings:{allowDeselect:!0,closeOnSelect:!1,minSelected:2,maxSelected:5},events:{addable:a=>a}})},components:{ShikiStyle:r}}),dl={id:"minmax",class:"content"},cl={class:"row"},vl={ref:"selectMultiMax",multiple:""};function hl(a,e,v,h,m,g){const o=n("ShikiStyle");return c(),d("div",dl,[e[3]||(e[3]=t("h2",{class:"header"},"Min/Max Selected",-1)),e[4]||(e[4]=t("p",null," The min/max selected settings allow you to enforce selection limits in multi-select dropdowns, ensuring users select the appropriate number of options for your application's requirements. This is essential for forms that need specific selection counts or business logic that depends on selection constraints. ",-1)),e[5]||(e[5]=t("p",null," You can set both minimum and maximum selection limits independently. The minimum setting ensures users select at least a certain number of options, while the maximum setting prevents them from selecting too many. This provides fine-grained control over user selections and helps maintain data integrity. ",-1)),t("div",cl,[t("select",vl,[...e[0]||(e[0]=[S('<option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option>',6)])],512)]),l(o,{language:"javascript"},{default:i(()=>[...e[1]||(e[1]=[t("pre",null,`        let slim = new SlimSelect({
          select: '#selectElement',
          settings: {
            minSelected: 2,
            maxSelected: 5,
          },
        })
      `,-1)])]),_:1}),l(o,{language:"html"},{default:i(()=>[...e[2]||(e[2]=[t("pre",null,`        <select id="selectMultiMax" multiple>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
          <option value="value4">Value 4</option>
          <option value="value5">Value 5</option>
          <option value="value6">Value 6</option>
        </select>
      `,-1)])]),_:1})])}const ml=p(pl,[["render",hl]]),gl=u({name:"OpenPosition",mounted(){new s({select:this.$refs.openPositionUp,settings:{openPosition:"up"}}),new s({select:this.$refs.openPositionDown,settings:{openPosition:"down"}})},components:{ShikiStyle:r}}),fl={id:"openPosition",class:"content"},Sl={class:"row"},yl={ref:"openPositionUp"},wl={ref:"openPositionDown"};function $l(a,e,v,h,m,g){const o=n("ShikiStyle");return c(),d("div",fl,[e[3]||(e[3]=t("h2",{class:"header"},"openPosition",-1)),e[4]||(e[4]=t("p",null," The openPosition setting controls the direction in which the dropdown content opens. By default, SlimSelect automatically determines the best direction based on available screen space, but you can force it to always open in a specific direction. ",-1)),e[5]||(e[5]=t("p",null," This setting is particularly useful for maintaining consistent user interface behavior, ensuring the dropdown always appears in a predictable location, or when you have specific design requirements that need the dropdown to open in a particular direction regardless of screen position. ",-1)),e[6]||(e[6]=t("p",null,[y("Possible Options: "),t("b",null,"'auto', 'up' or 'down'"),y(". Default is "),t("b",null,"'auto'")],-1)),t("div",Sl,[t("select",yl,[...e[0]||(e[0]=[t("option",{value:"up1"},"Up 1",-1),t("option",{value:"up2"},"Up 2",-1),t("option",{value:"up3"},"Up 3",-1)])],512),t("select",wl,[...e[1]||(e[1]=[t("option",{value:"down1"},"Down 1",-1),t("option",{value:"down2"},"Down 2",-1),t("option",{value:"down3"},"Down 3",-1)])],512)]),l(o,{language:"javascript"},{default:i(()=>[...e[2]||(e[2]=[t("pre",null,`        new SlimSelect({
          select: '#selectElement',
          settings: {
            openPosition: 'auto' // 'auto', 'up' or 'down'
          }
        })
      `,-1)])]),_:1})])}const bl=p(gl,[["render",$l]]),Vl=u({name:"Placeholder",mounted(){new s({select:this.$refs.placeholderSingle,settings:{placeholderText:"Custom Placeholder Text"}}),new s({select:this.$refs.placeholderMultiple,settings:{placeholderText:"Make Selection"}}),new s({select:this.$refs.placeholderNone,settings:{placeholderText:""}})},components:{ShikiStyle:r}}),xl={id:"placeholder",class:"content"},_l={class:"row"},Tl={ref:"placeholderSingle"},kl={ref:"placeholderMultiple",multiple:""},Ml={ref:"placeholderNone"};function Ol(a,e,v,h,m,g){const o=n("ShikiStyle");return c(),d("div",xl,[e[5]||(e[5]=t("h2",{class:"header"},"placeholderText",-1)),e[6]||(e[6]=t("p",null," The placeholderText setting allows you to customize the text that appears when no option is selected. This provides helpful guidance to users about what they should select and creates a more intuitive user experience. ",-1)),e[7]||(e[7]=t("p",null,` For single selects, you need an empty option with data-placeholder="true" in your HTML. For multiple selects, the placeholder appears automatically. The default value is "Select Value", but you can customize it to match your application's tone and requirements. `,-1)),e[8]||(e[8]=t("div",{class:"alert info"}," Notice you can also set placeholder to empty if that is what you would like to do as well. ",-1)),t("div",_l,[t("select",Tl,[...e[0]||(e[0]=[t("option",{"data-placeholder":"true"},null,-1),t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512),t("select",kl,[...e[1]||(e[1]=[t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512),t("select",Ml,[...e[2]||(e[2]=[t("option",{"data-placeholder":"true"},null,-1),t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512)]),l(o,{language:"javascript"},{default:i(()=>[...e[3]||(e[3]=[t("pre",null,`        new SlimSelect({
          select: '#placeholder',
          settings: {
            placeholderText: 'Custom Placeholder Text',
          }
        })
      `,-1)])]),_:1}),l(o,{language:"html"},{default:i(()=>[...e[4]||(e[4]=[t("pre",null,`        <!-- Set empty option with data-placeholder if you to have placeholder -->
        <!-- text for single select, otherwise first option will be selected -->
        <select id="placeholderSingle">
          <option data-placeholder="true"></option>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      `,-1)])]),_:1})])}const Cl=p(Vl,[["render",Ol]]),Dl=u({name:"ShowSearch",mounted(){new s({select:this.$refs.showSearchSingle,settings:{showSearch:!1}}),new s({select:this.$refs.showSearchMulti,settings:{showSearch:!1}})},components:{ShikiStyle:r}}),Ll={id:"showSearch",class:"content"},Pl={class:"row",style:{padding:"0 0 var(--spacing-half) 0"}},Hl={ref:"showSearchSingle"},Al={class:"row"},Bl={ref:"showSearchMulti",multiple:""};function El(a,e,v,h,m,g){const o=n("ShikiStyle");return c(),d("div",Ll,[e[3]||(e[3]=t("h2",{class:"header"},"showSearch",-1)),e[4]||(e[4]=t("p",null," The showSearch setting controls whether the search input field is displayed in the dropdown. When enabled, users can type to filter through options, making it easier to find specific values in long lists. ",-1)),e[5]||(e[5]=t("p",null," This feature is particularly useful for dropdowns with many options, as it significantly improves usability by allowing users to quickly locate and select the desired option without scrolling through the entire list. The default value is true, but you can disable it for simple dropdowns with few options. ",-1)),t("div",Pl,[t("select",Hl,[...e[0]||(e[0]=[t("option",{value:"dog"},"Dog",-1),t("option",{value:"cat"},"Cat",-1),t("option",{value:"bird"},"Bird",-1)])],512)]),t("div",Al,[t("select",Bl,[...e[1]||(e[1]=[t("option",{value:"dog"},"Dog",-1),t("option",{value:"cat"},"Cat",-1),t("option",{value:"bird"},"Bird",-1)])],512)]),l(o,{language:"javascript"},{default:i(()=>[...e[2]||(e[2]=[t("pre",null,`        new SlimSelect({
          select: '#selectElement',
          settings: {
            showSearch: false
          }
        })
      `,-1)])]),_:1})])}const jl=p(Dl,[["render",El]]),ql=u({name:"FocusSearch",mounted(){new s({select:this.$refs.focusSearchSingle,settings:{focusSearch:!1}}),new s({select:this.$refs.focusSearchMulti,settings:{focusSearch:!1}})},components:{ShikiStyle:r}}),Ul={id:"focusSearch",class:"content"},Rl={class:"row",style:{padding:"0 0 var(--spacing-half) 0"}},Fl={ref:"focusSearchSingle"},Il={class:"row"},zl={ref:"focusSearchMulti",multiple:""};function Wl(a,e,v,h,m,g){const o=n("ShikiStyle");return c(),d("div",Ul,[e[3]||(e[3]=t("h2",{class:"header"},"focusSearch",-1)),e[4]||(e[4]=t("p",null," The focusSearch setting controls whether the search input field automatically receives focus when the dropdown opens. When enabled, users can immediately start typing to search without needing to click on the search field first. ",-1)),e[5]||(e[5]=t("p",null," This feature improves the user experience by reducing the number of clicks required to search through options. However, you might want to disable it in certain scenarios where automatic focusing could interfere with other UI interactions or accessibility requirements. ",-1)),t("div",Rl,[t("select",Fl,[...e[0]||(e[0]=[t("option",{value:"dog"},"Dog",-1),t("option",{value:"cat"},"Cat",-1),t("option",{value:"bird"},"Bird",-1)])],512)]),t("div",Il,[t("select",zl,[...e[1]||(e[1]=[t("option",{value:"dog"},"Dog",-1),t("option",{value:"cat"},"Cat",-1),t("option",{value:"bird"},"Bird",-1)])],512)]),l(o,{language:"javascript"},{default:i(()=>[...e[2]||(e[2]=[t("pre",null,`        new SlimSelect({
          select: '#selectElement',
          settings: {
            focusSearch: false
          }
        })
      `,-1)])]),_:1})])}const Nl=p(ql,[["render",Wl]]),Yl=u({name:"SearchText",mounted(){new s({select:this.$refs.searchTextSingle,settings:{searchText:"Sorry, nothing to see here"}}),new s({select:this.$refs.searchTextMulti,settings:{searchText:"Sorry nothing to see here"}})},components:{ShikiStyle:r}}),Gl={id:"searchText",class:"content"},Kl={class:"row",style:{padding:"0 0 var(--spacing-half) 0"}},Jl={ref:"searchTextSingle"},Ql={class:"row"},Xl={ref:"searchTextMulti",multiple:""};function Zl(a,e,v,h,m,g){const o=n("ShikiStyle");return c(),d("div",Gl,[e[3]||(e[3]=t("h2",{class:"header"},"searchText",-1)),e[4]||(e[4]=t("p",null," The searchText setting allows you to customize the message that appears when a search query returns no matching results. This provides clear feedback to users when their search doesn't find any options, improving the overall user experience. ",-1)),e[5]||(e[5]=t("p",null,` You can use this setting to provide helpful guidance, such as "No matches found", "Try a different search term", or any other message that helps users understand why they're not seeing results and what they can do next. `,-1)),t("div",Kl,[t("select",Jl,[...e[0]||(e[0]=[t("option",{value:"dog"},"Dog",-1),t("option",{value:"cat"},"Cat",-1),t("option",{value:"bird"},"Bird",-1)])],512)]),t("div",Ql,[t("select",Xl,[...e[1]||(e[1]=[t("option",{value:"dog"},"Dog",-1),t("option",{value:"cat"},"Cat",-1),t("option",{value:"bird"},"Bird",-1)])],512)]),l(o,{language:"javascript"},{default:i(()=>[...e[2]||(e[2]=[t("pre",null,`        new SlimSelect({
          select: '#selectElement',
          settings: {
            searchText: 'Sorry, nothing to see here'
          }
        })
      `,-1)])]),_:1})])}const eo=p(Yl,[["render",Zl]]),to=u({name:"SearchPlaceholder",mounted(){new s({select:this.$refs.searchPlaceholderSingle,settings:{searchPlaceholder:"Search for the good stuff!"}}),new s({select:this.$refs.searchPlaceholderMulti,settings:{searchPlaceholder:"Search for the good stuff!"}})},components:{ShikiStyle:r}}),lo={id:"searchPlaceholder",class:"content"},oo={class:"row",style:{padding:"0 0 var(--spacing-half) 0"}},no={ref:"searchPlaceholderSingle"},so={class:"row"},io={ref:"searchPlaceholderMulti",multiple:""};function ao(a,e,v,h,m,g){const o=n("ShikiStyle");return c(),d("div",lo,[e[3]||(e[3]=t("h2",{class:"header"},"searchPlaceholder",-1)),e[4]||(e[4]=t("p",null," The searchPlaceholder setting allows you to customize the placeholder text that appears in the search input field. This provides helpful guidance to users about what they can search for and creates a more intuitive search experience. ",-1)),e[5]||(e[5]=t("p",null,' You can use this setting to provide context-specific instructions, such as "Search for countries", "Find users", or any other descriptive text that helps users understand how to use the search functionality effectively. ',-1)),t("div",oo,[t("select",no,[...e[0]||(e[0]=[t("option",{value:"dog"},"Dog",-1),t("option",{value:"cat"},"Cat",-1),t("option",{value:"bird"},"Bird",-1)])],512)]),t("div",so,[t("select",io,[...e[1]||(e[1]=[t("option",{value:"dog"},"Dog",-1),t("option",{value:"cat"},"Cat",-1),t("option",{value:"bird"},"Bird",-1)])],512)]),l(o,{language:"javascript"},{default:i(()=>[...e[2]||(e[2]=[t("pre",null,`        new SlimSelect({
          select: '#selectElement',
          settings: {
            searchPlaceholder: 'Search for the good stuff!'
          }
        })
      `,-1)])]),_:1})])}const uo=p(to,[["render",ao]]),ro=u({name:"SearchHighlight",data(){return{htmlData:[{text:"United States",value:"US",html:'<span style="color: #e74c3c;">🇺🇸</span> United States'},{text:"Canada",value:"CA",html:'<span style="color: #3498db;">🇨🇦</span> Canada'},{text:"United Kingdom",value:"UK",html:'<span style="color: #9b59b6;">🇬🇧</span> United Kingdom'},{text:"Germany",value:"DE",html:'<span style="color: #f39c12;">🇩🇪</span> Germany'},{text:"France",value:"FR",html:'<span style="color: #1abc9c;">🇫🇷</span> France'},{text:"Japan",value:"JP",html:'<span style="color: #e67e22;">🇯🇵</span> Japan'},{text:"Australia",value:"AU",html:'<span style="color: #16a085;">🇦🇺</span> Australia'},{text:"Brazil",value:"BR",html:'<span style="color: #27ae60;">🇧🇷</span> Brazil'}]}},mounted(){new s({select:this.$refs.searchHighlightSingle,settings:{searchHighlight:!0}}),new s({select:this.$refs.searchHighlightMulti,settings:{searchHighlight:!0}}),new s({select:this.$refs.searchHighlightHtml,settings:{searchHighlight:!0},data:this.htmlData})},components:{ShikiStyle:r}}),po={id:"searchHighlight",class:"content"},co={class:"row",style:{padding:"0 0 var(--spacing-half) 0"}},vo={ref:"searchHighlightSingle"},ho={class:"row",style:{padding:"0 0 var(--spacing-half) 0"}},mo={ref:"searchHighlightMulti",multiple:""},go={class:"row",style:{padding:"0 0 var(--spacing-half) 0"}},fo={ref:"searchHighlightHtml"};function So(a,e,v,h,m,g){const o=n("ShikiStyle");return c(),d("div",po,[e[3]||(e[3]=t("h2",{class:"header"},"searchHighlight",-1)),e[4]||(e[4]=t("p",null,[y(" The searchHighlight setting enables visual highlighting of matching text in search results, making it easier for users to see exactly what part of each option matches their search query. When enabled, matching text is wrapped in a "),t("code",null,"<mark>"),y(" element for clear visual distinction. ")],-1)),e[5]||(e[5]=t("p",null," This feature significantly improves the search experience by providing immediate visual feedback about search matches. It works with both plain text and HTML content, intelligently highlighting only the text portions while preserving all HTML structure, styles, and elements. ",-1)),t("div",co,[t("select",vo,[...e[0]||(e[0]=[S('<option value="javascript">JavaScript</option><option value="typescript">TypeScript</option><option value="python">Python</option><option value="java">Java</option><option value="csharp">C#</option><option value="cpp">C++</option><option value="ruby">Ruby</option><option value="php">PHP</option><option value="swift">Swift</option><option value="kotlin">Kotlin</option><option value="go">Go</option><option value="rust">Rust</option>',12)])],512)]),t("div",ho,[t("select",mo,[...e[1]||(e[1]=[S('<option value="javascript">JavaScript</option><option value="typescript">TypeScript</option><option value="python">Python</option><option value="java">Java</option><option value="csharp">C#</option><option value="cpp">C++</option><option value="ruby">Ruby</option><option value="php">PHP</option><option value="swift">Swift</option><option value="kotlin">Kotlin</option><option value="go">Go</option><option value="rust">Rust</option>',12)])],512)]),e[6]||(e[6]=t("div",{class:"alert info"},[t("strong",null,"Tip:"),y(' Try searching for "script", "Type", or even special characters like "#" or "+" to see the highlighting in action. The feature safely escapes special characters to prevent HTML breaking. ')],-1)),e[7]||(e[7]=t("h3",null,"HTML Content with Search Highlighting",-1)),e[8]||(e[8]=t("p",null," When using HTML in options, search highlighting intelligently highlights only the text content while preserving all HTML structure, styles, and elements. ",-1)),t("div",go,[t("select",fo,null,512)]),e[9]||(e[9]=t("div",{class:"alert info"},[t("strong",null,"Try it:"),y(' Search for "United", "States", "an", or even special characters like "<" in the example above. Notice how the emoji flags and colors remain intact while only the matching text is highlighted. ')],-1)),l(o,{language:"javascript"},{default:i(()=>[...e[2]||(e[2]=[t("pre",null,`        // Basic usage
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
      `,-1)])]),_:1})])}const yo=p(ro,[["render",So]]),wo=u({name:"Select",components:{ShikiStyle:r}}),$o={id:"select",class:"content"};function bo(a,e,v,h,m,g){const o=n("ShikiStyle");return c(),d("div",$o,[e[1]||(e[1]=t("h2",{class:"header"},"select",-1)),e[2]||(e[2]=t("p",null," The select field is the core configuration that identifies which HTML select element SlimSelect should transform. This is the most fundamental setting and must be provided for SlimSelect to work. You can use any valid CSS selector string or pass the DOM element directly. ",-1)),e[3]||(e[3]=t("p",null," This setting determines the target element that SlimSelect will replace with its enhanced dropdown interface, maintaining all the original functionality while adding advanced features like search, customization, and better user experience. ",-1)),l(o,{language:"javascript"},{default:i(()=>[...e[0]||(e[0]=[t("pre",null,`        new SlimSelect({
          select: '#selectElement',
          // or
          select: document.querySelector('#selectElement')
        })

        // If you already have a currenlty running SlimSelect but lost the reference to it.
        // You can access from the original select element.
        let el = document.querySelector('#selectElement')
        el.slim.open() // Or any other options/methods
      `,-1)])]),_:1})])}const Vo=p(wo,[["render",bo]]),xo=u({name:"SelectAll",mounted(){new s({select:this.$refs.selectAll})},components:{ShikiStyle:r}}),_o={id:"selectAll",class:"content"},To={ref:"selectAll",multiple:""};function ko(a,e,v,h,m,g){const o=n("ShikiStyle");return c(),d("div",_o,[e[3]||(e[3]=t("h2",{class:"header"},"selectAll",-1)),e[4]||(e[4]=t("p",null,' The selectAll setting adds a convenient "select all" option to optgroups, allowing users to quickly select all options within a specific group with a single click. This is particularly useful for multi-select dropdowns with categorized options. ',-1)),e[5]||(e[5]=t("p",null," When enabled, a select all option appears at the top of the optgroup, making it easy for users to select multiple related options without having to click each one individually. The selectAllText setting allows you to customize the text that appears for this option. ",-1)),e[6]||(e[6]=t("div",{class:"alert info"}," You can set selectAll/selectAllText either by data or by html dataset added to the optgroup element ",-1)),t("select",To,[...e[0]||(e[0]=[S('<optgroup label="Label 1" data-selectall="true" data-selectalltext="Select them all!"><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></optgroup><optgroup label="Label 2"><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option></optgroup>',2)])],512),e[7]||(e[7]=t("br",null,null,-1)),e[8]||(e[8]=t("h3",null,"Via data",-1)),l(o,{language:"javascript"},{default:i(()=>[...e[1]||(e[1]=[t("pre",null,`        new SlimSelect({
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
      `,-1)])]),_:1}),e[9]||(e[9]=t("br",null,null,-1)),e[10]||(e[10]=t("h3",null,"Via html",-1)),l(o,{language:"html"},{default:i(()=>[...e[2]||(e[2]=[t("pre",null,`        <select ref="selectAll" multiple>
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
      `,-1)])]),_:1})])}const Mo=p(xo,[["render",ko]]),Oo=u({name:"ShowTooltip",mounted(){new s({select:this.$refs.showOptionTooltips,settings:{showOptionTooltips:!0}})},components:{ShikiStyle:r}}),Co={id:"showOptionTooltips",class:"content"},Do={ref:"showOptionTooltips"};function Lo(a,e,v,h,m,g){const o=n("ShikiStyle");return c(),d("div",Co,[e[2]||(e[2]=t("h2",{class:"header"},"showOptionTooltips",-1)),e[3]||(e[3]=t("p",null," The showOptionTooltips setting enables hover tooltips for select options, providing additional context and information to users when they hover over options. This is particularly useful for options with long text that might be truncated or when you want to provide additional details about each option. ",-1)),e[4]||(e[4]=t("p",null," When enabled, tooltips automatically display the full text content of each option when users hover over them, ensuring that users can always see the complete information even when space is limited or text is truncated in the dropdown interface. ",-1)),t("select",Do,[...e[0]||(e[0]=[t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512),l(o,{language:"javascript"},{default:i(()=>[...e[1]||(e[1]=[t("pre",null,`        new SlimSelect({
          select: '#selectElement',
          settings: {
            showOptionTooltips: true,
          }
        })
      `,-1)])]),_:1})])}const Po=p(Oo,[["render",Lo]]),Ho=u({name:"Styles",mounted(){new s({select:this.$refs.selectStyle}),new s({select:this.$refs.optionStyle})},components:{ShikiStyle:r}}),Ao={id:"inlineStyles",class:"content"},Bo={class:"row"},Eo={ref:"selectStyle",style:{color:"red"}},jo={ref:"optionStyle"};function qo(a,e,v,h,m,g){const o=n("ShikiStyle");return c(),d("div",Ao,[e[3]||(e[3]=t("h2",{class:"header"},"inline styles",-1)),e[4]||(e[4]=t("p",null," SlimSelect automatically inherits any inline styles that were applied to the original select element and its options. This ensures that your existing styling, whether applied through inline styles or CSS classes, is seamlessly preserved when SlimSelect transforms the element. ",-1)),e[5]||(e[5]=t("p",null," This feature allows you to apply custom styling directly to your HTML elements and have those styles automatically carried over to the enhanced SlimSelect interface, maintaining visual consistency and reducing the need for additional CSS modifications. ",-1)),t("div",Bo,[t("select",Eo,[...e[0]||(e[0]=[t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512),t("select",jo,[...e[1]||(e[1]=[t("option",{style:{color:"red"},value:"value1"},"Red",-1),t("option",{style:{color:"green"}},"Green",-1),t("option",{style:{color:"blue"}},"Blue",-1)])],512)]),l(o,{language:"html"},{default:i(()=>[...e[2]||(e[2]=[t("pre",null,`        <select id="select-style" style="color: red;">
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>

        <select id="option-style">
          <option style="color: red;" value="value1">Red</option>
          <option style="color: green;">Green</option>
          <option style="color: blue;">Blue</option>
        </select>
      `,-1)])]),_:1})])}const Uo=p(Ho,[["render",qo]]),Ro=u({name:"Settings",components:{ShikiStyle:r,AdSlot:Y,Select:Vo,CssClasses:Ke,AlwaysOpen:ne,ContentLocation:_e,ContentPosition:Ae,OpenPosition:bl,Placeholder:Cl,Deselect:rt,Display:Ot,Disabled:$t,Mandatory:ol,MinMax:ml,DataAttributes:lt,MaxValuesShown:rl,Css:Fe,Styles:Uo,Html:It,KeepOrder:Kt,ShowSearch:jl,FocusSearch:Nl,SearchText:eo,SearchPlaceholder:uo,SearchHighlight:yo,CloseOnSelect:Se,ShowTooltip:Po,SelectAll:Mo,Closable:de,HideSelected:Bt}}),Fo={id:"settings",class:"contents"};function Io(a,e,v,h,m,g){const o=n("Select"),w=n("CssClasses"),f=n("AdSlot"),$=n("AlwaysOpen"),b=n("ContentLocation"),V=n("ContentPosition"),x=n("OpenPosition"),_=n("Placeholder"),T=n("SelectAll"),k=n("Deselect"),M=n("Display"),O=n("Disabled"),C=n("Mandatory"),D=n("MinMax"),L=n("DataAttributes"),P=n("Css"),H=n("Styles"),A=n("Html"),B=n("KeepOrder"),E=n("ShowSearch"),j=n("FocusSearch"),q=n("SearchText"),U=n("SearchPlaceholder"),R=n("SearchHighlight"),F=n("CloseOnSelect"),I=n("ShowTooltip"),z=n("Closable"),W=n("HideSelected"),N=n("MaxValuesShown");return c(),d("div",Fo,[l(o),l(w),l(f,{"ad-slot":"1270131515"}),l($),l(b),l(f,{"ad-slot":"1270131515"}),l(V),l(x),l(f,{"ad-slot":"1270131515"}),l(_),l(T),l(f,{"ad-slot":"1270131515"}),l(k),l(M),l(f,{"ad-slot":"1270131515"}),l(O),l(C),l(f,{"ad-slot":"1270131515"}),l(D),l(L),l(f,{"ad-slot":"1270131515"}),l(P),l(H),l(f,{"ad-slot":"1270131515"}),l(A),l(B),l(f,{"ad-slot":"1270131515"}),l(E),l(j),l(f,{"ad-slot":"1270131515"}),l(q),l(U),l(f,{"ad-slot":"1270131515"}),l(R),l(F),l(f,{"ad-slot":"1270131515"}),l(I),l(z),l(f,{"ad-slot":"1270131515"}),l(W),l(N)])}const Wo=p(Ro,[["render",Io]]);export{Wo as default};
