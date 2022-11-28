import{d as s,S as o,_ as a,o as i,c,a as e,f as t,e as v,r as h,b as r}from"./index.js";const j=s({name:"AlwaysOpen",mounted(){new o({select:this.$refs.alwaysOpenSingle,settings:{alwaysOpen:!0,contentLocation:this.$refs.alwaysOpenSingleContent,contentPosition:"relative"}}),new o({select:this.$refs.alwaysOpenMultiple,settings:{alwaysOpen:!0,contentLocation:this.$refs.alwaysOpenMultipleContent,contentPosition:"relative"}})}}),q={id:"alwaysOpen",class:"content"},I=e("h2",{class:"header"},"alwaysOpen",-1),R=e("p",null," alwaysOpen option is used to keep the select open at all times. This is useful for when you want to display the options at all times. ",-1),k={class:"row"},N={style:{height:"auto"}},U={ref:"alwaysOpenSingle"},G=e("option",{value:"value1"},"Value 1",-1),Y=e("option",{value:"value2"},"Value 2",-1),W=e("option",{value:"value3"},"Value 3",-1),F=[G,Y,W],z={ref:"alwaysOpenSingleContent"},J={style:{height:"auto"}},K={ref:"alwaysOpenMultiple",multiple:""},Q=e("option",{value:"value1"},"Value 1",-1),X=e("option",{value:"value2"},"Value 2",-1),Z=e("option",{value:"value3"},"Value 3",-1),ee=e("option",{value:"value4"},"Value 4",-1),te=[Q,X,Z,ee],oe={ref:"alwaysOpenMultipleContent"},le=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
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
      `),t(`
    `)],-1),ne=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <select id="selectElement">
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>

        <!-- The content will go in this div -->
        <div id="local"></div>
      `),t(`
    `)],-1);function se(l,n,u,d,p,_){return i(),c("div",q,[I,R,e("div",k,[e("div",N,[e("select",U,F,512),e("div",z,null,512)]),e("div",J,[e("select",K,te,512),e("div",oe,null,512)])]),le,ne])}const ae=a(j,[["render",se]]),ie=s({name:"Closable",mounted(){new o({select:this.$refs.closableSingle}),new o({select:this.$refs.closableMultiple})}}),ce={id:"closable",class:"content"},ue=v('<h2 class="header">closable</h2><p>closable is a optgroup settings that adds the ability to have closable optgroup options.</p><p>Values: <strong>&quot;off&quot;</strong> | <strong>&quot;open&quot;</strong> | <strong>&quot;close&quot;</strong></p><p>Default: <strong>&quot;off&quot;</strong></p><div class="alert info">You can set closable either by data or by html dataset added to the optgroup element</div>',5),de={class:"row"},pe={ref:"closableSingle"},_e=v('<optgroup label="Label 1" data-closable="off"><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></optgroup><optgroup label="Label 2" data-closable="open"><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option></optgroup><optgroup label="Label 3" data-closable="close"><option value="value7">Value 7</option><option value="value8">Value 8</option><option value="value9">Value 9</option></optgroup>',3),he=[_e],re={ref:"closableMultiple",multiple:""},ve=v('<optgroup label="Label 1" data-selectall="true" data-closable="off"><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></optgroup><optgroup label="Label 2" data-selectall="true" data-closable="open"><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option></optgroup><optgroup label="Label 3" data-selectall="true" data-closable="close"><option value="value7">Value 7</option><option value="value8">Value 8</option><option value="value9">Value 9</option></optgroup>',3),$e=[ve],me=e("br",null,null,-1),ge=e("h3",null,"Via data",-1),fe=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
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
      `),t(`
    `)],-1),we=e("br",null,null,-1),Se=e("h3",null,"Via html",-1),be=e("pre",null,[t("      "),e("code",{class:"language-html"},`
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
      `),t(`
    `)],-1);function Ve(l,n,u,d,p,_){return i(),c("div",ce,[ue,e("div",de,[e("select",pe,he,512),e("select",re,$e,512)]),me,ge,fe,we,Se,be])}const ye=a(ie,[["render",Ve]]),xe=s({name:"CloseOnSelect",mounted(){new o({select:this.$refs.closeOnSelectSingle,settings:{closeOnSelect:!1}}),new o({select:this.$refs.closeOnSelectMultiple,settings:{closeOnSelect:!1,selectByGroup:!0}})}}),Me={id:"closeOnSelect",class:"content"},Oe=e("h2",{class:"header"},"closeOnSelect",-1),Ce=e("p",null," closeOnSelect is a boolean value in which determines whether or not to close the content area upon selecting a value. ",-1),De={class:"row"},Le={ref:"closeOnSelectSingle"},Te=v('<option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option><optgroup label="Super Values"><option value="value11">Value 1</option><option value="value22">Value 2</option><option value="value33">Value 3</option></optgroup>',4),Pe=[Te],Be={ref:"closeOnSelectMultiple",multiple:""},Ae=v('<option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option><optgroup label="Super Values"><option value="value11">Value 1</option><option value="value22">Value 2</option><option value="value33">Value 3</option></optgroup>',4),Ee=[Ae],He=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#search',
          settings: {
            closeOnSelect: false,
          },
        })
      `),t(`
    `)],-1);function je(l,n,u,d,p,_){return i(),c("div",Me,[Oe,Ce,e("div",De,[e("select",Le,Pe,512),e("select",Be,Ee,512)]),He])}const qe=a(xe,[["render",je]]),Ie=s({name:"ContentLocation",mounted(){new o({select:this.$refs.contentLocation,settings:{contentLocation:this.$refs.local}})}}),Re={id:"contentLocation",class:"content"},ke=e("h2",{class:"header"},"contentLocation",-1),Ne=e("p",null," contentLocation will allow you to set the location of where the content section of slim select. By default every content div is appended to the body. ",-1),Ue=e("p",null," The content container is the bottom half of slim select. This includes the search input field and available options ",-1),Ge={class:"row"},Ye={ref:"contentLocation",style:{width:"50%"}},We=e("option",{value:"value1"},"Value 1",-1),Fe=e("option",{value:"value2"},"Value 2",-1),ze=e("option",{value:"value3"},"Value 3",-1),Je=[We,Fe,ze],Ke={ref:"local"},Qe=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            contentLocation: document.getElementById('local')
          }
        })
      `),t(`
    `)],-1),Xe=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <select id="contentLocation">
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>

        <!-- The content will go in this div -->
        <div id="local"></div>
      `),t(`
    `)],-1);function Ze(l,n,u,d,p,_){return i(),c("div",Re,[ke,Ne,Ue,e("div",Ge,[e("select",Ye,Je,512),e("div",Ke,null,512)]),Qe,Xe])}const et=a(Ie,[["render",Ze]]),tt=s({name:"ContentPosition",mounted(){new o({select:this.$refs.contentPositionRelative,settings:{contentPosition:"relative",contentLocation:this.$refs.contentPositionRelativeContent}}),new o({select:this.$refs.contentPositionAbsolute,settings:{contentPosition:"absolute"}})}});const ot={id:"contentPosition",class:"content"},lt=e("h2",{class:"header"},"contentPosition",-1),nt=e("p",null,[t("contentPosition will set the css position to either relative. Default is "),e("b",null,"'absolute'")],-1),st=e("div",{class:"alert info"}," If you do use relative position be sure to set the contentLocation to an element that will work best for your use case. Otherwise SlimSelect will add you content to the body of the html. See example usage below. ",-1),at={class:"row"},it={ref:"contentPositionRelative",class:"relative"},ct=e("option",{"data-placeholder":"true"},"Relative",-1),ut=e("option",{value:"value1"},"Value 1",-1),dt=e("option",{value:"value2"},"Value 2",-1),pt=e("option",{value:"value3"},"Value 3",-1),_t=[ct,ut,dt,pt],ht={ref:"contentPositionRelativeContent"},rt={ref:"contentPositionAbsolute",class:"absolute"},vt=e("option",{"data-placeholder":"true"},"Absolute",-1),$t=e("option",{value:"value1"},"Value 1",-1),mt=e("option",{value:"value2"},"Value 2",-1),gt=e("option",{value:"value3"},"Value 3",-1),ft=[vt,$t,mt,gt],wt=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            contentPosition: 'relative' // 'absolute' or 'relative'

            // To help with relative positioning 
            // you can set the contentLocation
            contentLocation: document.getElementById('local')
          }
        })
      `),t(`
    `)],-1);function St(l,n,u,d,p,_){return i(),c("div",ot,[lt,nt,st,e("div",at,[e("select",it,_t,512),e("div",ht,null,512),e("select",rt,ft,512)]),wt])}const bt=a(tt,[["render",St]]),Vt=s({name:"Css",mounted(){new o({select:this.$refs.selectClass}),new o({select:this.$refs.optionClass})}});const yt={id:"cssClass",class:"content"},xt=e("h2",{class:"header"},"css class",-1),Mt=e("p",null," Slim select will inherit any classes that were added to the original select element. This includes options as well. ",-1),Ot={class:"row"},Ct={ref:"selectClass",class:"select-class"},Dt=e("option",{value:"value1"},"Value 1",-1),Lt=e("option",{value:"value2"},"Value 2",-1),Tt=e("option",{value:"value3"},"Value 3",-1),Pt=[Dt,Lt,Tt],Bt={ref:"optionClass",class:"option-class"},At=e("option",{class:"red",value:"value1"},"Red",-1),Et=e("option",{class:"green",value:"value2"},"Green",-1),Ht=e("option",{class:"blue",value:"value3"},"Blue",-1),jt=[At,Et,Ht],qt=e("pre",null,[t("        "),e("code",{class:"language-html"},`
          <select id="select-class" class="classItems">
            <option class="red" value="value1">Value 1</option>
            <option class="green" value="value2">Value 2</option>
            <option class="blue" value="value3">Value 3</option>
          </select>
        `),t(`
      `)],-1);function It(l,n,u,d,p,_){return i(),c("div",yt,[xt,Mt,e("div",Ot,[e("select",Ct,Pt,512),e("select",Bt,jt,512)]),qt])}const Rt=a(Vt,[["render",It]]),kt=s({name:"DataAttributes",mounted(){new o({select:this.$refs.optionsSingle}),new o({select:this.$refs.optionsMultiple})}}),Nt={id:"dataAttributes",class:"content"},Ut=e("h2",{class:"header"},"Data Attributes",-1),Gt=e("p",null," Slim select will take on attributes of the original as best as possible. Below are example usages of attributes added to the underlining select options that slim select picked up and used ",-1),Yt={class:"row"},Wt={ref:"optionsSingle"},Ft=v('<option data-placeholder="true"></option><option value="value1" data-info="Here is info">Data Attributes</option><option value="value2" disabled>Disabled Option</option><option value="value3" class="green">Class Green</option><option value="value4" style="color:purple;">Inline Style</option>',5),zt=[Ft],Jt={ref:"optionsMultiple",multiple:""},Kt=e("option",{value:"value1","data-info":"Here is info"},"Data Attributes",-1),Qt=e("option",{value:"value2",disabled:""},"Disabled Option",-1),Xt=e("option",{value:"value3",class:"green"},"Class Green",-1),Zt=e("option",{value:"value4",style:{color:"purple"}},"Inline Style",-1),eo=[Kt,Qt,Xt,Zt];function to(l,n,u,d,p,_){return i(),c("div",Nt,[Ut,Gt,e("div",Yt,[e("select",Wt,zt,512),e("select",Jt,eo,512)])])}const oo=a(kt,[["render",to]]),lo=s({name:"Deselect",mounted(){new o({select:this.$refs.allowDeselectSingle,settings:{allowDeselect:!0}}),new o({select:this.$refs.allowDeselectMultiple,settings:{allowDeselect:!0}})}}),no={id:"allowDeselect",class:"content"},so=e("h2",{class:"header"},"allowDeselect",-1),ao=e("p",null,"This will allow you to deselect a value on a single/multiple select dropdown.",-1),io=e("p",null,"Be sure to have an empty option data placeholder so slim select has an empty string value to select.",-1),co={class:"row"},uo={ref:"allowDeselectSingle"},po=e("option",{"data-placeholder":"true"},null,-1),_o=e("option",{value:"value1"},"Value 1",-1),ho=e("option",{value:"value2"},"Value 2",-1),ro=e("option",{value:"value3"},"Value 3",-1),vo=[po,_o,ho,ro],$o={ref:"allowDeselectMultiple",multiple:""},mo=e("option",{"data-placeholder":"true"},null,-1),go=e("option",{value:"value1"},"Value 1",-1),fo=e("option",{value:"value2"},"Value 2",-1),wo=e("option",{value:"value3"},"Value 3",-1),So=[mo,go,fo,wo],bo=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            allowDeselect: true
          }
        })
      `),t(`
    `)],-1),Vo=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <!-- Requires emtpy data-placeholder option -->
        <select id="allowDeselect">
          <option data-placeholder="true"></option>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      `),t(`
    `)],-1);function yo(l,n,u,d,p,_){return i(),c("div",no,[so,ao,io,e("div",co,[e("select",uo,vo,512),e("select",$o,So,512)]),bo,Vo])}const xo=a(lo,[["render",yo]]),Mo=s({name:"Display",mounted(){const l=new o({select:this.$refs.selectdisplay}),n=[{value:"value1",text:"Value 1",display:!1},{value:"value2",text:"Value 2"},{value:"value3",text:"Value 3"}];l.setData(n),l.setSelected(["value1","value3"]),new o({select:this.$refs.selectdisplay2})}}),Oo={id:"display",class:"content"},Co=e("h2",{class:"header"},"display",-1),Do=e("p",null,"Allows to hide elements of selected values.",-1),Lo={class:"row"},To={ref:"selectdisplay",multiple:""},Po=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
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
      `),t(`
    `)],-1),Bo=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <select id="selectMultiMandatory" multiple></select>
      `),t(`
    `)],-1),Ao=e("p",null,"Or",-1),Eo={class:"row"},Ho={ref:"selectdisplay2",multiple:""},jo=e("option",{value:"value1",style:{display:"none"},selected:""},"Value 1",-1),qo=e("option",{value:"value2",selected:""},"Value 2",-1),Io=e("option",{value:"value3"},"Value 3",-1),Ro=[jo,qo,Io],ko=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        const slim = new SlimSelect({
          select: '#selectElement'
        });
      `),t(`
    `)],-1),No=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <select id="selectdisplay2" multiple>
          <option value="value1" style="display: none;" selected>Value 1</option>
          <option value="value2" selected>Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      `),t(`
    `)],-1);function Uo(l,n,u,d,p,_){return i(),c("div",Oo,[Co,Do,e("div",Lo,[e("select",To,null,512)]),Po,Bo,Ao,e("div",Eo,[e("select",Ho,Ro,512)]),ko,No])}const Go=a(Mo,[["render",Uo]]),Yo=s({name:"HideSelected",mounted(){new o({select:this.$refs.hideSelectedSingle,settings:{hideSelected:!0}}),new o({select:this.$refs.hideSelectedMultiple,settings:{hideSelected:!0}})}}),Wo={id:"hideSelected",class:"content"},Fo=e("h2",{class:"header"},"hideSelected",-1),zo=e("p",null,"hideSelected setting is used to hide the current selected option in the options dropdown.",-1),Jo={class:"row"},Ko={ref:"hideSelectedSingle"},Qo=e("option",{"data-placeholder":"true"},null,-1),Xo=e("option",{value:"value1"},"Value 1",-1),Zo=e("option",{value:"value2"},"Value 2",-1),el=e("option",{value:"value3"},"Value 3",-1),tl=[Qo,Xo,Zo,el],ol={ref:"hideSelectedMultiple",multiple:""},ll=e("option",{value:"value1"},"Value 1",-1),nl=e("option",{value:"value2"},"Value 2",-1),sl=e("option",{value:"value3"},"Value 3",-1),al=[ll,nl,sl],il=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            hideSelected: true,
          }
        })
      `),t(`
    `)],-1),cl=e("pre",null,[t("      "),e("code",{class:"language-html"},`
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
      `),t(`
    `)],-1);function ul(l,n,u,d,p,_){return i(),c("div",Wo,[Fo,zo,e("div",Jo,[e("select",Ko,tl,512),e("select",ol,al,512)]),il,cl])}const dl=a(Yo,[["render",ul]]),pl=s({name:"SelectedChipsLimit",mounted(){new o({settings:{selectedChipsLimit:5,selectedChipsLimitMessage:"$NUMBER selected",allowDeselect:!0},select:this.$refs.selectedChipsLimit})}}),_l={id:"selectedChipsLimit",class:"content"},hl=e("h2",{class:"header"},"selectedChipsLimit",-1),rl=e("p",null," When using multiselect you can set a threshold so when selecting more items than the input value, the items will not display as chips, but the 'Selected (n items)' will be displayed. The text that will be displayed can be customized with the use of '$NUMBER' in the valuesThresholdFormat setting. ",-1),vl={class:"row"},$l={ref:"selectedChipsLimit",multiple:""},ml=v('<option value="value1" selected>Value 1</option><option value="value2" selected>Value 2</option><option value="value3" selected>Value 3</option><option value="value4" selected>Value 4</option><option value="value5" selected>Value 5</option><option value="value6">Value 6</option><option value="value7">Value 7</option><option value="value8">Value 8</option>',8),gl=[ml],fl=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        const slim = new SlimSelect({
          select: '#selectElement',
          settings: {
            selectedChipsLimit: 5,
            selectedChipsLimitMessage: '$NUMBER selected',
          },
        });
      `),t(`
    `)],-1),wl=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <select id="selectedChipsLimit" multiple>
          <option value="value1" selected>Value 1</option>
          <option value="value2" selected>Value 2</option>
          <option value="value3" selected>Value 3</option>
          <option value="value4" selected>Value 4</option>
          <option value="value5" selected>Value 5</option>
          <option value="value6">Value 6</option>
          <option value="value7">Value 7</option>
          <option value="value8">Value 8</option>
        </select>
      `),t(`
    `)],-1);function Sl(l,n,u,d,p,_){return i(),c("div",_l,[hl,rl,e("div",vl,[e("select",$l,gl,512)]),fl,wl])}const bl=a(pl,[["render",Sl]]),Vl=s({name:"Html",mounted(){new o({select:this.$refs.selectHtmlSingle,settings:{searchHighlight:!0},data:[{html:"<b>Bold Text</b>",text:"Bold Text",value:"bold text"},{html:"<i>Slim Select you are awesome</i>",text:"Slim Select awesome"},{html:'<div style="border: solid 1px #666666;">Border</div>',text:"Border",value:"border"}]}),new o({select:this.$refs.selectHtmlMulti,settings:{searchHighlight:!0},data:[{html:"<b>Bold Text</b>",text:"Bold Text",value:"bold text"},{html:"<i>Slim Select you are awesome</i>",text:"Slim Select awesome"},{html:'<div style="border: solid 1px #666666;">Border</div>',text:"Border",value:"border"}]})}}),yl={id:"html",class:"content"},xl=e("h2",{class:"header"},"html",-1),Ml=e("p",null," Slim select has the ability to set custom html for the selected values and options dropdown. By default if the html field is set it will use that for the selected values and the options dropdown. For a multiple select selected values it will always use the text field. ",-1),Ol={class:"row"},Cl={ref:"selectHtmlSingle"},Dl={ref:"selectHtmlMulti",multiple:""},Ll=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        var select = new SlimSelect({
          select: '#selectElement',
          data: [
            {html: '<img height="30" width="30" src="http://lorempixel.com/30/30" />\xA0Image', text: 'Image', value: 'image'},
            {html: '<b>Bold Text</b>', text: 'Bold Text', value: 'bold text'},
            {html: '<div style="border: solid 1px #666666;">Border</div>', text: 'Border', value: 'border'},
            {html: '<i>Slim Select you are awesome</i>', text: 'Slim Select awesome'}
          ]
        })
      `),t(`
    `)],-1);function Tl(l,n,u,d,p,_){return i(),c("div",yl,[xl,Ml,e("div",Ol,[e("select",Cl,null,512),e("select",Dl,null,512)]),Ll])}const Pl=a(Vl,[["render",Tl]]),Bl=s({name:"Mandatory",mounted(){const l=new o({select:this.$refs.selectMultiMandatory}),n=[{value:"value1",text:"Value 1",mandatory:!0},{value:"value2",text:"Value 2"},{value:"value3",text:"Value 3"}];l.setData(n),l.setSelected(["value1","value3"]),new o({select:this.$refs.selectMultiMandatory2})}}),Al={id:"mandatory",class:"content"},El=e("h2",{class:"header"},"mandatory",-1),Hl=e("p",null," When using multi select you can set a mandatory on the option to prevent capability to deselect particular option. Note options with mandatory flag is not selected by default, you need select them yourselfs. ",-1),jl={class:"row"},ql={ref:"selectMultiMandatory",multiple:""},Il=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
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
      `),t(`
    `)],-1),Rl=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <select id="selectMultiMandatory" multiple></select>
      `),t(`
    `)],-1),kl=e("p",null,"Or",-1),Nl={class:"row"},Ul={ref:"selectMultiMandatory2",multiple:""},Gl=e("option",{value:"value1","data-mandatory":"true",selected:""},"Value 1",-1),Yl=e("option",{value:"value2",selected:""},"Value 2",-1),Wl=e("option",{value:"value3"},"Value 3",-1),Fl=[Gl,Yl,Wl],zl=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        const slim = new SlimSelect({
          select: '#selectElement'
        });
      `),t(`
    `)],-1),Jl=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <select id="selectMultiMandatory" multiple>
          <option value="value1" data-mandatory="true" selected>Value 1</option>
          <option value="value2" selected>Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      `),t(`
    `)],-1);function Kl(l,n,u,d,p,_){return i(),c("div",Al,[El,Hl,e("div",jl,[e("select",ql,null,512)]),Il,Rl,kl,e("div",Nl,[e("select",Ul,Fl,512)]),zl,Jl])}const Ql=a(Bl,[["render",Kl]]),Xl=s({name:"MinMax",mounted(){new o({select:this.$refs.selectMultiMax,settings:{minSelected:2,maxSelected:5}})}}),Zl={id:"minmax",class:"content"},en=e("h2",{class:"header"},"Min/Max Selected",-1),tn=e("p",null,"When using multi select you can set a min and/or max on the amount of selections you can have.",-1),on={class:"row"},ln={ref:"selectMultiMax",multiple:""},nn=v('<option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option>',6),sn=[nn],an=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        let slim = new SlimSelect({
          select: '#selectElement',
          settings: {
            minSelected: 2,
            maxSelected: 5,
          },
        })
      `),t(`
    `)],-1),cn=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <select id="selectMultiMax" multiple>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
          <option value="value4">Value 4</option>
          <option value="value5">Value 5</option>
          <option value="value6">Value 6</option>
        </select>
      `),t(`
    `)],-1);function un(l,n,u,d,p,_){return i(),c("div",Zl,[en,tn,e("div",on,[e("select",ln,sn,512)]),an,cn])}const dn=a(Xl,[["render",un]]),pn=s({name:"OpenPosition",mounted(){new o({select:this.$refs.openPositionUp,settings:{openPosition:"up"}}),new o({select:this.$refs.openPositionDown,settings:{openPosition:"down"}})}}),_n={id:"openPosition",class:"content"},hn=e("h2",{class:"header"},"openPosition",-1),rn=e("p",null," openPosition is a string value that will decide where to show your content when it comes out. By default slim select will try to put the content where it can without going off screen. But you may want to always show it in one direction. ",-1),vn=e("p",null,[t("Possible Options: "),e("b",null,"'auto', 'up' or 'down'"),t(". Default is "),e("b",null,"'auto'")],-1),$n={class:"row"},mn={ref:"openPositionUp"},gn=e("option",{value:"up1"},"Up 1",-1),fn=e("option",{value:"up2"},"Up 2",-1),wn=e("option",{value:"up3"},"Up 3",-1),Sn=[gn,fn,wn],bn={ref:"openPositionDown"},Vn=e("option",{value:"down1"},"Down 1",-1),yn=e("option",{value:"down2"},"Down 2",-1),xn=e("option",{value:"down3"},"Down 3",-1),Mn=[Vn,yn,xn],On=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            openPosition: 'auto' // 'auto', 'up' or 'down'
          }
        })
      `),t(`
    `)],-1);function Cn(l,n,u,d,p,_){return i(),c("div",_n,[hn,rn,vn,e("div",$n,[e("select",mn,Sn,512),e("select",bn,Mn,512)]),On])}const Dn=a(pn,[["render",Cn]]),Ln=s({name:"Placeholder",mounted(){new o({select:this.$refs.placeholderSingle,settings:{placeholderText:"Custom Placeholder Text"}}),new o({select:this.$refs.placeholderMultiple,settings:{placeholderText:"Custom Placeholder Text"}})}}),Tn={id:"placeholder",class:"content"},Pn=e("h2",{class:"header"},"placeholderText",-1),Bn=e("p",null,' Placeholders consists of setting the placeholder option value. The only difference is single selects require an empty option with data-placeholder set to true. Default value is "Select Value". ',-1),An={class:"row"},En={ref:"placeholderSingle"},Hn=e("option",{"data-placeholder":"true"},null,-1),jn=e("option",{value:"value1"},"Value 1",-1),qn=e("option",{value:"value2"},"Value 2",-1),In=e("option",{value:"value3"},"Value 3",-1),Rn=[Hn,jn,qn,In],kn={ref:"placeholderMultiple",multiple:""},Nn=e("option",{value:"value1"},"Value 1",-1),Un=e("option",{value:"value2"},"Value 2",-1),Gn=e("option",{value:"value3"},"Value 3",-1),Yn=[Nn,Un,Gn],Wn=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#placeholder',
          settings: {
            placeholderText: 'Custom Placeholder Text',
          }
        })
      `),t(`
    `)],-1),Fn=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <!-- Set empty option with data-placeholder if you to have placeholder -->
        <!-- text for single select, otherwise first option will be selected -->
        <select id="placeholderSingle">
          <option data-placeholder="true"></option>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      `),t(`
    `)],-1);function zn(l,n,u,d,p,_){return i(),c("div",Tn,[Pn,Bn,e("div",An,[e("select",En,Rn,512),e("select",kn,Yn,512)]),Wn,Fn])}const Jn=a(Ln,[["render",zn]]),Kn=s({name:"Search",mounted(){new o({select:this.$refs.showSearchSingle,settings:{showSearch:!1}}),new o({select:this.$refs.searchTextSingle,settings:{searchText:"Sorry, nothing to see here"}}),new o({select:this.$refs.searchPlaceholderSingle,settings:{searchPlaceholder:"Search for the good stuff!"}}),new o({select:this.$refs.searchHighlightSingle,settings:{searchHighlight:!0}}),new o({select:this.$refs.showSearchMulti,settings:{showSearch:!1}}),new o({select:this.$refs.searchTextMulti,settings:{searchText:"Sorry nothing to see here"}}),new o({select:this.$refs.searchPlaceholderMulti,settings:{searchPlaceholder:"Search for the good stuff!"}}),new o({select:this.$refs.searchHighlightMulti,settings:{searchHighlight:!0}})}}),Qn={id:"search",class:"content"},Xn=v('<h2 class="header">showSearch / searchText / searchingText / searchHighlight</h2><p><b>showSearch</b> - is a boolean value that will decide whether or not to show the search. Default is true.</p><p><b>searchText</b> - is a string value that will show in the event there are no results. Default is &#39;No Results&#39;. </p><p><b>searchingText</b> - is a string value that will show during an fetch search request. Default is &#39;Searching...&#39;. </p><p><b>searchPlaceholder</b> - is a string value that will set the value of the input search placeholder text. Default is &#39;Search&#39;. </p><p><b>searchHighlight</b> - is a boolean value that will highlight search results. Default is false.</p>',6),Zn={class:"row",style:{padding:"0 0 var(--spacing-half) 0"}},es={ref:"showSearchSingle"},ts=e("option",{value:"dog"},"Dog",-1),os=e("option",{value:"cat"},"Cat",-1),ls=e("option",{value:"bird"},"Bird",-1),ns=[ts,os,ls],ss={ref:"searchTextSingle"},as=e("option",{value:"dog"},"Dog",-1),is=e("option",{value:"cat"},"Cat",-1),cs=e("option",{value:"bird"},"Bird",-1),us=[as,is,cs],ds={ref:"searchPlaceholderSingle"},ps=e("option",{value:"dog"},"Dog",-1),_s=e("option",{value:"cat"},"Cat",-1),hs=e("option",{value:"bird"},"Bird",-1),rs=[ps,_s,hs],vs={ref:"searchHighlightSingle"},$s=e("option",{value:"dog"},"Dog",-1),ms=e("option",{value:"cat"},"Cat",-1),gs=e("option",{value:"bird"},"Bird",-1),fs=[$s,ms,gs],ws={class:"row"},Ss={ref:"showSearchMulti",multiple:""},bs=e("option",{value:"dog"},"Dog",-1),Vs=e("option",{value:"cat"},"Cat",-1),ys=e("option",{value:"bird"},"Bird",-1),xs=[bs,Vs,ys],Ms={ref:"searchTextMulti",multiple:""},Os=e("option",{value:"dog"},"Dog",-1),Cs=e("option",{value:"cat"},"Cat",-1),Ds=e("option",{value:"bird"},"Bird",-1),Ls=[Os,Cs,Ds],Ts={ref:"searchPlaceholderMulti",multiple:""},Ps=e("option",{value:"dog"},"Dog",-1),Bs=e("option",{value:"cat"},"Cat",-1),As=e("option",{value:"bird"},"Bird",-1),Es=[Ps,Bs,As],Hs={ref:"searchHighlightMulti",multiple:""},js=e("option",{value:"dog"},"Dog",-1),qs=e("option",{value:"cat"},"Cat",-1),Is=e("option",{value:"bird"},"Bird",-1),Rs=[js,qs,Is],ks=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        let slim = new SlimSelect({
          select: '#selectElement',
          settings: {
            showSearch: false,
            searchText: 'Sorry nothing to see here',
            searchPlaceholder: 'Search for the good stuff!',
            searchHighlight: true
          }
        })
      `),t(`
    `)],-1);function Ns(l,n,u,d,p,_){return i(),c("div",Qn,[Xn,e("div",Zn,[e("select",es,ns,512),e("select",ss,us,512),e("select",ds,rs,512),e("select",vs,fs,512)]),e("div",ws,[e("select",Ss,xs,512),e("select",Ms,Ls,512),e("select",Ts,Es,512),e("select",Hs,Rs,512)]),ks])}const Us=a(Kn,[["render",Ns]]),Gs=s({name:"Select"}),Ys={id:"select",class:"content"},Ws=e("h2",{class:"header"},"select",-1),Fs=e("p",null," The select field is used to identify the select element that will be used to create slim select. You can use any value you normally would in a querySelector or pass the element directly. ",-1),zs=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          // or
          select: document.querySelector('#selectElement')
        })

        // If you already have a currenlty running SlimSelect but lost the reference to it.
        // You can access from the original select element.
        let el = document.querySelector('#selectElement')
        el.slim.open() // Or any other options/methods
      `),t(`
    `)],-1),Js=[Ws,Fs,zs];function Ks(l,n,u,d,p,_){return i(),c("div",Ys,Js)}const Qs=a(Gs,[["render",Ks]]),Xs=s({name:"SelectAll",mounted(){new o({select:this.$refs.selectAll})}}),Zs={id:"selectAll",class:"content"},ea=e("h2",{class:"header"},"selectAll",-1),ta=e("p",null," selectAll is a setting that can be used to add a select all action to an optgroup. This setting can be set to true or false. If set to true, a select all option will be added to the top of the selected values. If set to false or not set at all, no select all action will be added to the optgroup. ",-1),oa=e("div",{class:"alert info"},"You can set selectAll either by data or by html dataset added to the optgroup element",-1),la={ref:"selectAll",multiple:""},na=v('<optgroup label="Label 1" data-selectall="true"><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></optgroup><optgroup label="Label 2"><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option></optgroup>',2),sa=[na],aa=e("br",null,null,-1),ia=e("h3",null,"Via data",-1),ca=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          data: [
            {
              label: 'Label 1',
              selectAll: true,
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
      `),t(`
    `)],-1),ua=e("br",null,null,-1),da=e("h3",null,"Via html",-1),pa=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <select ref="selectAll" multiple>
          <optgroup label="Label 1" data-selectall="true">
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
      `),t(`
    `)],-1);function _a(l,n,u,d,p,_){return i(),c("div",Zs,[ea,ta,oa,e("select",la,sa,512),aa,ia,ca,ua,da,pa])}const ha=a(Xs,[["render",_a]]),ra=s({name:"ShowTooltip",mounted(){new o({select:this.$refs.showOptionTooltips,settings:{showOptionTooltips:!0}})}}),va={id:"showOptionTooltips",class:"content"},$a=e("h2",{class:"header"},"showOptionTooltips",-1),ma=e("p",null," showOptionTooltips option is used to active displaying the on-hover tooltips for select options. The tooltip text is equal to the option text content. ",-1),ga={ref:"showOptionTooltips"},fa=e("option",{value:"value1"},"Value 1",-1),wa=e("option",{value:"value2"},"Value 2",-1),Sa=e("option",{value:"value3"},"Value 3",-1),ba=[fa,wa,Sa],Va=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            showOptionTooltips: true,
          }
        })
      `),t(`
    `)],-1);function ya(l,n,u,d,p,_){return i(),c("div",va,[$a,ma,e("select",ga,ba,512),Va])}const xa=a(ra,[["render",ya]]),Ma=s({name:"Styles",mounted(){new o({select:this.$refs.selectStyle}),new o({select:this.$refs.optionStyle})}}),Oa={id:"inlineStyles",class:"content"},Ca=e("h2",{class:"header"},"inline styles",-1),Da=e("p",null," Slim select will inherit any styles that were added to the original select element. This includes options as well. ",-1),La={class:"row"},Ta={ref:"selectStyle",style:{color:"red"}},Pa=e("option",{value:"value1"},"Value 1",-1),Ba=e("option",{value:"value2"},"Value 2",-1),Aa=e("option",{value:"value3"},"Value 3",-1),Ea=[Pa,Ba,Aa],Ha={ref:"optionStyle"},ja=e("option",{style:{color:"red"},value:"value1"},"Red",-1),qa=e("option",{style:{color:"green"}},"Green",-1),Ia=e("option",{style:{color:"blue"}},"Blue",-1),Ra=[ja,qa,Ia],ka=e("pre",null,[t("      "),e("code",{class:"language-html"},`
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
      `),t(`
    `)],-1);function Na(l,n,u,d,p,_){return i(),c("div",Oa,[Ca,Da,e("div",La,[e("select",Ta,Ea,512),e("select",Ha,Ra,512)]),ka])}const Ua=a(Ma,[["render",Na]]),Ga=s({name:"Settings",components:{Select:Qs,AlwaysOpen:ae,ContentLocation:et,ContentPosition:bt,OpenPosition:Dn,Placeholder:Jn,Deselect:xo,Display:Go,Mandatory:Ql,MinMax:dn,DataAttributes:oo,SelectedChipsLimit:bl,Css:Rt,Styles:Ua,Html:Pl,Search:Us,CloseOnSelect:qe,ShowTooltip:xa,SelectAll:ha,Closable:ye,HideSelected:dl}}),Ya={id:"settings",class:"contents"};function Wa(l,n,u,d,p,_){const $=h("Select"),m=h("AlwaysOpen"),g=h("ContentLocation"),f=h("ContentPosition"),w=h("OpenPosition"),S=h("Placeholder"),b=h("Deselect"),V=h("Display"),y=h("Mandatory"),x=h("MinMax"),M=h("DataAttributes"),O=h("Css"),C=h("Styles"),D=h("Html"),L=h("Search"),T=h("CloseOnSelect"),P=h("ShowTooltip"),B=h("SelectAll"),A=h("Closable"),E=h("HideSelected"),H=h("SelectedChipsLimit");return i(),c("div",Ya,[r($),r(m),r(g),r(f),r(w),r(S),r(b),r(V),r(y),r(x),r(M),r(O),r(C),r(D),r(L),r(T),r(P),r(B),r(A),r(E),r(H)])}const za=a(Ga,[["render",Wa]]);export{za as default};
