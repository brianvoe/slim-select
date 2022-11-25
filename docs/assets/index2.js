import{d as s,S as o,_ as a,o as i,c,a as e,f as t,e as v,r,b as h}from"./index.js";const E=s({name:"AlwaysOpen",mounted(){new o({select:this.$refs.alwaysOpenSingle,settings:{alwaysOpen:!0,contentLocation:this.$refs.alwaysOpenSingleContent,contentPosition:"relative"}}),new o({select:this.$refs.alwaysOpenMultiple,settings:{alwaysOpen:!0,contentLocation:this.$refs.alwaysOpenMultipleContent,contentPosition:"relative"}})}}),j={id:"alwaysOpen",class:"content"},q=e("h2",{class:"header"},"alwaysOpen",-1),I=e("p",null," alwaysOpen option is used to keep the select open at all times. This is useful for when you want to display the options at all times. ",-1),R={class:"row"},k={style:{height:"auto"}},G={ref:"alwaysOpenSingle"},N=e("option",{value:"value1"},"Value 1",-1),U=e("option",{value:"value2"},"Value 2",-1),Y=e("option",{value:"value3"},"Value 3",-1),W=[N,U,Y],F={ref:"alwaysOpenSingleContent"},z={style:{height:"auto"}},J={ref:"alwaysOpenMultiple",multiple:""},K=e("option",{value:"value1"},"Value 1",-1),Q=e("option",{value:"value2"},"Value 2",-1),X=e("option",{value:"value3"},"Value 3",-1),Z=e("option",{value:"value4"},"Value 4",-1),ee=[K,Q,X,Z],te={ref:"alwaysOpenMultipleContent"},oe=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
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
    `)],-1),le=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <select id="selectElement">
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>

        <!-- The content will go in this div -->
        <div id="local"></div>
      `),t(`
    `)],-1);function ne(l,n,u,d,p,_){return i(),c("div",j,[q,I,e("div",R,[e("div",k,[e("select",G,W,512),e("div",F,null,512)]),e("div",z,[e("select",J,ee,512),e("div",te,null,512)])]),oe,le])}const se=a(E,[["render",ne]]),ae=s({name:"Closable",mounted(){new o({select:this.$refs.closableSingle}),new o({select:this.$refs.closableMultiple})}}),ie={id:"closable",class:"content"},ce=v('<h2 class="header">closable</h2><p>closable is a optgroup settings that adds the ability to have closable optgroup options.</p><p>Values: <strong>&quot;off&quot;</strong> | <strong>&quot;open&quot;</strong> | <strong>&quot;close&quot;</strong></p><p>Default: <strong>&quot;off&quot;</strong></p><div class="alert info">You can set closable either by data or by html dataset added to the optgroup element</div>',5),ue={class:"row"},de={ref:"closableSingle"},pe=v('<optgroup label="Label 1" data-closable="off"><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></optgroup><optgroup label="Label 2" data-closable="open"><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option></optgroup><optgroup label="Label 3" data-closable="close"><option value="value7">Value 7</option><option value="value8">Value 8</option><option value="value9">Value 9</option></optgroup>',3),_e=[pe],re={ref:"closableMultiple",multiple:""},he=v('<optgroup label="Label 1" data-selectall="true" data-closable="off"><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></optgroup><optgroup label="Label 2" data-selectall="true" data-closable="open"><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option></optgroup><optgroup label="Label 3" data-selectall="true" data-closable="close"><option value="value7">Value 7</option><option value="value8">Value 8</option><option value="value9">Value 9</option></optgroup>',3),ve=[he],$e=e("br",null,null,-1),me=e("h3",null,"Via data",-1),ge=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
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
    `)],-1),fe=e("br",null,null,-1),we=e("h3",null,"Via html",-1),Se=e("pre",null,[t("      "),e("code",{class:"language-html"},`
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
    `)],-1);function be(l,n,u,d,p,_){return i(),c("div",ie,[ce,e("div",ue,[e("select",de,_e,512),e("select",re,ve,512)]),$e,me,ge,fe,we,Se])}const ye=a(ae,[["render",be]]),Ve=s({name:"CloseOnSelect",mounted(){new o({select:this.$refs.closeOnSelectSingle,settings:{closeOnSelect:!1}}),new o({select:this.$refs.closeOnSelectMultiple,settings:{closeOnSelect:!1,selectByGroup:!0}})}}),xe={id:"closeOnSelect",class:"content"},Oe=e("h2",{class:"header"},"closeOnSelect",-1),Me=e("p",null," closeOnSelect is a boolean value in which determines whether or not to close the content area upon selecting a value. ",-1),De={class:"row"},Pe={ref:"closeOnSelectSingle"},Te=v('<option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option><optgroup label="Super Values"><option value="value11">Value 1</option><option value="value22">Value 2</option><option value="value33">Value 3</option></optgroup>',4),Ce=[Te],Le={ref:"closeOnSelectMultiple",multiple:""},Be=v('<option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option><optgroup label="Super Values"><option value="value11">Value 1</option><option value="value22">Value 2</option><option value="value33">Value 3</option></optgroup>',4),Ae=[Be],He=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#search',
          settings: {
            closeOnSelect: false,
          },
        })
      `),t(`
    `)],-1);function Ee(l,n,u,d,p,_){return i(),c("div",xe,[Oe,Me,e("div",De,[e("select",Pe,Ce,512),e("select",Le,Ae,512)]),He])}const je=a(Ve,[["render",Ee]]),qe=s({name:"ContentLocation",mounted(){new o({select:this.$refs.contentLocation,settings:{contentLocation:this.$refs.local}})}}),Ie={id:"contentLocation",class:"content"},Re=e("h2",{class:"header"},"contentLocation",-1),ke=e("p",null," contentLocation will allow you to set the location of where the content section of slim select. By default every content div is appended to the body. ",-1),Ge=e("p",null," The content container is the bottom half of slim select. This includes the search input field and available options ",-1),Ne={class:"row"},Ue={ref:"contentLocation",style:{width:"50%"}},Ye=e("option",{value:"value1"},"Value 1",-1),We=e("option",{value:"value2"},"Value 2",-1),Fe=e("option",{value:"value3"},"Value 3",-1),ze=[Ye,We,Fe],Je={ref:"local"},Ke=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            contentLocation: document.getElementById('local')
          }
        })
      `),t(`
    `)],-1),Qe=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <select id="contentLocation">
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>

        <!-- The content will go in this div -->
        <div id="local"></div>
      `),t(`
    `)],-1);function Xe(l,n,u,d,p,_){return i(),c("div",Ie,[Re,ke,Ge,e("div",Ne,[e("select",Ue,ze,512),e("div",Je,null,512)]),Ke,Qe])}const Ze=a(qe,[["render",Xe]]),et=s({name:"ContentPosition",mounted(){new o({select:this.$refs.contentPositionRelative,settings:{contentPosition:"relative",contentLocation:this.$refs.contentPositionRelativeContent}}),new o({select:this.$refs.contentPositionAbsolute,settings:{contentPosition:"absolute"}})}});const tt={id:"contentPosition",class:"content"},ot=e("h2",{class:"header"},"contentPosition",-1),lt=e("p",null,[t("contentPosition will set the css position to either relative. Default is "),e("b",null,"'absolute'")],-1),nt=e("div",{class:"alert info"}," If you do use relative position be sure to set the contentLocation to an element that will work best for your use case. Otherwise SlimSelect will add you content to the body of the html. See example usage below. ",-1),st={class:"row"},at={ref:"contentPositionRelative",class:"relative"},it=e("option",{"data-placeholder":"true"},"Relative",-1),ct=e("option",{value:"value1"},"Value 1",-1),ut=e("option",{value:"value2"},"Value 2",-1),dt=e("option",{value:"value3"},"Value 3",-1),pt=[it,ct,ut,dt],_t={ref:"contentPositionRelativeContent"},rt={ref:"contentPositionAbsolute",class:"absolute"},ht=e("option",{"data-placeholder":"true"},"Absolute",-1),vt=e("option",{value:"value1"},"Value 1",-1),$t=e("option",{value:"value2"},"Value 2",-1),mt=e("option",{value:"value3"},"Value 3",-1),gt=[ht,vt,$t,mt],ft=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
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
    `)],-1);function wt(l,n,u,d,p,_){return i(),c("div",tt,[ot,lt,nt,e("div",st,[e("select",at,pt,512),e("div",_t,null,512),e("select",rt,gt,512)]),ft])}const St=a(et,[["render",wt]]),bt=s({name:"Css",mounted(){new o({select:this.$refs.selectClass}),new o({select:this.$refs.optionClass})}});const yt={id:"cssClass",class:"content"},Vt=e("h2",{class:"header"},"css class",-1),xt=e("p",null," Slim select will inherit any classes that were added to the original select element. This includes options as well. ",-1),Ot={class:"row"},Mt={ref:"selectClass",class:"select-class"},Dt=e("option",{value:"value1"},"Value 1",-1),Pt=e("option",{value:"value2"},"Value 2",-1),Tt=e("option",{value:"value3"},"Value 3",-1),Ct=[Dt,Pt,Tt],Lt={ref:"optionClass",class:"option-class"},Bt=e("option",{class:"red",value:"value1"},"Red",-1),At=e("option",{class:"green",value:"value2"},"Green",-1),Ht=e("option",{class:"blue",value:"value3"},"Blue",-1),Et=[Bt,At,Ht],jt=e("pre",null,[t("        "),e("code",{class:"language-html"},`
          <select id="select-class" class="classItems">
            <option class="red" value="value1">Value 1</option>
            <option class="green" value="value2">Value 2</option>
            <option class="blue" value="value3">Value 3</option>
          </select>
        `),t(`
      `)],-1);function qt(l,n,u,d,p,_){return i(),c("div",yt,[Vt,xt,e("div",Ot,[e("select",Mt,Ct,512),e("select",Lt,Et,512)]),jt])}const It=a(bt,[["render",qt]]),Rt=s({name:"DataAttributes",mounted(){new o({select:this.$refs.optionsSingle}),new o({select:this.$refs.optionsMultiple})}}),kt={id:"dataAttributes",class:"content"},Gt=e("h2",{class:"header"},"Data Attributes",-1),Nt=e("p",null," Slim select will take on attributes of the original as best as possible. Below are example usages of attributes added to the underlining select options that slim select picked up and used ",-1),Ut={class:"row"},Yt={ref:"optionsSingle"},Wt=v('<option data-placeholder="true"></option><option value="value1" data-info="Here is info">Data Attributes</option><option value="value2" disabled>Disabled Option</option><option value="value3" class="green">Class Green</option><option value="value4" style="color:purple;">Inline Style</option>',5),Ft=[Wt],zt={ref:"optionsMultiple",multiple:""},Jt=e("option",{value:"value1","data-info":"Here is info"},"Data Attributes",-1),Kt=e("option",{value:"value2",disabled:""},"Disabled Option",-1),Qt=e("option",{value:"value3",class:"green"},"Class Green",-1),Xt=e("option",{value:"value4",style:{color:"purple"}},"Inline Style",-1),Zt=[Jt,Kt,Qt,Xt];function eo(l,n,u,d,p,_){return i(),c("div",kt,[Gt,Nt,e("div",Ut,[e("select",Yt,Ft,512),e("select",zt,Zt,512)])])}const to=a(Rt,[["render",eo]]),oo=s({name:"Deselect",mounted(){new o({select:this.$refs.allowDeselectSingle,settings:{allowDeselect:!0}}),new o({select:this.$refs.allowDeselectMultiple,settings:{allowDeselect:!0}})}}),lo={id:"allowDeselect",class:"content"},no=e("h2",{class:"header"},"allowDeselect",-1),so=e("p",null,"This will allow you to deselect a value on a single/multiple select dropdown.",-1),ao=e("p",null,"Be sure to have an empty option data placeholder so slim select has an empty string value to select.",-1),io={class:"row"},co={ref:"allowDeselectSingle"},uo=e("option",{"data-placeholder":"true"},null,-1),po=e("option",{value:"value1"},"Value 1",-1),_o=e("option",{value:"value2"},"Value 2",-1),ro=e("option",{value:"value3"},"Value 3",-1),ho=[uo,po,_o,ro],vo={ref:"allowDeselectMultiple",multiple:""},$o=e("option",{"data-placeholder":"true"},null,-1),mo=e("option",{value:"value1"},"Value 1",-1),go=e("option",{value:"value2"},"Value 2",-1),fo=e("option",{value:"value3"},"Value 3",-1),wo=[$o,mo,go,fo],So=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            allowDeselect: true
          }
        })
      `),t(`
    `)],-1),bo=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <!-- Requires emtpy data-placeholder option -->
        <select id="allowDeselect">
          <option data-placeholder="true"></option>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      `),t(`
    `)],-1);function yo(l,n,u,d,p,_){return i(),c("div",lo,[no,so,ao,e("div",io,[e("select",co,ho,512),e("select",vo,wo,512)]),So,bo])}const Vo=a(oo,[["render",yo]]),xo=s({name:"Display",mounted(){const l=new o({select:this.$refs.selectdisplay}),n=[{value:"value1",text:"Value 1",display:!1},{value:"value2",text:"Value 2"},{value:"value3",text:"Value 3"}];l.setData(n),l.setSelected(["value1","value3"]),new o({select:this.$refs.selectdisplay2})}}),Oo={id:"display",class:"content"},Mo=e("h2",{class:"header"},"display",-1),Do=e("p",null,"Allows to hide elements of selected values.",-1),Po={class:"row"},To={ref:"selectdisplay",multiple:""},Co=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
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
    `)],-1),Lo=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <select id="selectMultiMandatory" multiple></select>
      `),t(`
    `)],-1),Bo=e("p",null,"Or",-1),Ao={class:"row"},Ho={ref:"selectdisplay2",multiple:""},Eo=e("option",{value:"value1",style:{display:"none"},selected:""},"Value 1",-1),jo=e("option",{value:"value2",selected:""},"Value 2",-1),qo=e("option",{value:"value3"},"Value 3",-1),Io=[Eo,jo,qo],Ro=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        const slim = new SlimSelect({
          select: '#selectElement'
        });
      `),t(`
    `)],-1),ko=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <select id="selectdisplay2" multiple>
          <option value="value1" style="display: none;" selected>Value 1</option>
          <option value="value2" selected>Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      `),t(`
    `)],-1);function Go(l,n,u,d,p,_){return i(),c("div",Oo,[Mo,Do,e("div",Po,[e("select",To,null,512)]),Co,Lo,Bo,e("div",Ao,[e("select",Ho,Io,512)]),Ro,ko])}const No=a(xo,[["render",Go]]),Uo=s({name:"HideSelected",mounted(){new o({select:this.$refs.hideSelectedSingle,settings:{hideSelected:!0}}),new o({select:this.$refs.hideSelectedMultiple,settings:{hideSelected:!0}})}}),Yo={id:"hideSelected",class:"content"},Wo=e("h2",{class:"header"},"hideSelected",-1),Fo=e("p",null,"hideSelected setting is used to hide the current selected option in the options dropdown.",-1),zo={class:"row"},Jo={ref:"hideSelectedSingle"},Ko=e("option",{"data-placeholder":"true"},null,-1),Qo=e("option",{value:"value1"},"Value 1",-1),Xo=e("option",{value:"value2"},"Value 2",-1),Zo=e("option",{value:"value3"},"Value 3",-1),el=[Ko,Qo,Xo,Zo],tl={ref:"hideSelectedMultiple",multiple:""},ol=e("option",{value:"value1"},"Value 1",-1),ll=e("option",{value:"value2"},"Value 2",-1),nl=e("option",{value:"value3"},"Value 3",-1),sl=[ol,ll,nl],al=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            hideSelected: true,
          }
        })
      `),t(`
    `)],-1),il=e("pre",null,[t("      "),e("code",{class:"language-html"},`
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
    `)],-1);function cl(l,n,u,d,p,_){return i(),c("div",Yo,[Wo,Fo,e("div",zo,[e("select",Jo,el,512),e("select",tl,sl,512)]),al,il])}const ul=a(Uo,[["render",cl]]),dl=s({name:"Html",mounted(){new o({select:this.$refs.selectHtmlSingle,settings:{searchHighlight:!0},data:[{html:"<b>Bold Text</b>",text:"Bold Text",value:"bold text"},{html:"<i>Slim Select you are awesome</i>",text:"Slim Select awesome"},{html:'<div style="border: solid 1px #666666;">Border</div>',text:"Border",value:"border"}]}),new o({select:this.$refs.selectHtmlMulti,settings:{searchHighlight:!0},data:[{html:"<b>Bold Text</b>",text:"Bold Text",value:"bold text"},{html:"<i>Slim Select you are awesome</i>",text:"Slim Select awesome"},{html:'<div style="border: solid 1px #666666;">Border</div>',text:"Border",value:"border"}]})}}),pl={id:"html",class:"content"},_l=e("h2",{class:"header"},"html",-1),rl=e("p",null," Slim select has the ability to set custom html for the selected values and options dropdown. By default if the html field is set it will use that for the selected values and the options dropdown. For a multiple select selected values it will always use the text field. ",-1),hl={class:"row"},vl={ref:"selectHtmlSingle"},$l={ref:"selectHtmlMulti",multiple:""},ml=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
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
    `)],-1);function gl(l,n,u,d,p,_){return i(),c("div",pl,[_l,rl,e("div",hl,[e("select",vl,null,512),e("select",$l,null,512)]),ml])}const fl=a(dl,[["render",gl]]),wl=s({name:"Mandatory",mounted(){const l=new o({select:this.$refs.selectMultiMandatory}),n=[{value:"value1",text:"Value 1",mandatory:!0},{value:"value2",text:"Value 2"},{value:"value3",text:"Value 3"}];l.setData(n),l.setSelected(["value1","value3"]),new o({select:this.$refs.selectMultiMandatory2})}}),Sl={id:"mandatory",class:"content"},bl=e("h2",{class:"header"},"mandatory",-1),yl=e("p",null," When using multi select you can set a mandatory on the option to prevent capability to deselect particular option. Note options with mandatory flag is not selected by default, you need select them yourselfs. ",-1),Vl={class:"row"},xl={ref:"selectMultiMandatory",multiple:""},Ol=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
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
    `)],-1),Ml=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <select id="selectMultiMandatory" multiple></select>
      `),t(`
    `)],-1),Dl=e("p",null,"Or",-1),Pl={class:"row"},Tl={ref:"selectMultiMandatory2",multiple:""},Cl=e("option",{value:"value1","data-mandatory":"true",selected:""},"Value 1",-1),Ll=e("option",{value:"value2",selected:""},"Value 2",-1),Bl=e("option",{value:"value3"},"Value 3",-1),Al=[Cl,Ll,Bl],Hl=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        const slim = new SlimSelect({
          select: '#selectElement'
        });
      `),t(`
    `)],-1),El=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <select id="selectMultiMandatory" multiple>
          <option value="value1" data-mandatory="true" selected>Value 1</option>
          <option value="value2" selected>Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      `),t(`
    `)],-1);function jl(l,n,u,d,p,_){return i(),c("div",Sl,[bl,yl,e("div",Vl,[e("select",xl,null,512)]),Ol,Ml,Dl,e("div",Pl,[e("select",Tl,Al,512)]),Hl,El])}const ql=a(wl,[["render",jl]]),Il=s({name:"MinMax",mounted(){new o({select:this.$refs.selectMultiMax,settings:{minSelected:2,maxSelected:5}})}}),Rl={id:"minmax",class:"content"},kl=e("h2",{class:"header"},"Min/Max Selected",-1),Gl=e("p",null,"When using multi select you can set a min and/or max on the amount of selections you can have.",-1),Nl={class:"row"},Ul={ref:"selectMultiMax",multiple:""},Yl=v('<option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option>',6),Wl=[Yl],Fl=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        let slim = new SlimSelect({
          select: '#selectElement',
          settings: {
            minSelected: 2,
            maxSelected: 5,
          },
        })
      `),t(`
    `)],-1),zl=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <select id="selectMultiMax" multiple>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
          <option value="value4">Value 4</option>
          <option value="value5">Value 5</option>
          <option value="value6">Value 6</option>
        </select>
      `),t(`
    `)],-1);function Jl(l,n,u,d,p,_){return i(),c("div",Rl,[kl,Gl,e("div",Nl,[e("select",Ul,Wl,512)]),Fl,zl])}const Kl=a(Il,[["render",Jl]]),Ql=s({name:"OpenPosition",mounted(){new o({select:this.$refs.openPositionUp,settings:{openPosition:"up"}}),new o({select:this.$refs.openPositionDown,settings:{openPosition:"down"}})}}),Xl={id:"openPosition",class:"content"},Zl=e("h2",{class:"header"},"openPosition",-1),en=e("p",null," openPosition is a string value that will decide where to show your content when it comes out. By default slim select will try to put the content where it can without going off screen. But you may want to always show it in one direction. ",-1),tn=e("p",null,[t("Possible Options: "),e("b",null,"'auto', 'up' or 'down'"),t(". Default is "),e("b",null,"'auto'")],-1),on={class:"row"},ln={ref:"openPositionUp"},nn=e("option",{value:"up1"},"Up 1",-1),sn=e("option",{value:"up2"},"Up 2",-1),an=e("option",{value:"up3"},"Up 3",-1),cn=[nn,sn,an],un={ref:"openPositionDown"},dn=e("option",{value:"down1"},"Down 1",-1),pn=e("option",{value:"down2"},"Down 2",-1),_n=e("option",{value:"down3"},"Down 3",-1),rn=[dn,pn,_n],hn=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            openPosition: 'auto' // 'auto', 'up' or 'down'
          }
        })
      `),t(`
    `)],-1);function vn(l,n,u,d,p,_){return i(),c("div",Xl,[Zl,en,tn,e("div",on,[e("select",ln,cn,512),e("select",un,rn,512)]),hn])}const $n=a(Ql,[["render",vn]]),mn=s({name:"Placeholder",mounted(){new o({select:this.$refs.placeholderSingle,settings:{placeholderText:"Custom Placeholder Text"}}),new o({select:this.$refs.placeholderMultiple,settings:{placeholderText:"Custom Placeholder Text"}})}}),gn={id:"placeholder",class:"content"},fn=e("h2",{class:"header"},"placeholderText",-1),wn=e("p",null,' Placeholders consists of setting the placeholder option value. The only difference is single selects require an empty option with data-placeholder set to true. Default value is "Select Value". ',-1),Sn={class:"row"},bn={ref:"placeholderSingle"},yn=e("option",{"data-placeholder":"true"},null,-1),Vn=e("option",{value:"value1"},"Value 1",-1),xn=e("option",{value:"value2"},"Value 2",-1),On=e("option",{value:"value3"},"Value 3",-1),Mn=[yn,Vn,xn,On],Dn={ref:"placeholderMultiple",multiple:""},Pn=e("option",{value:"value1"},"Value 1",-1),Tn=e("option",{value:"value2"},"Value 2",-1),Cn=e("option",{value:"value3"},"Value 3",-1),Ln=[Pn,Tn,Cn],Bn=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#placeholder',
          settings: {
            placeholderText: 'Custom Placeholder Text',
          }
        })
      `),t(`
    `)],-1),An=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <!-- Set empty option with data-placeholder if you to have placeholder -->
        <!-- text for single select, otherwise first option will be selected -->
        <select id="placeholderSingle">
          <option data-placeholder="true"></option>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      `),t(`
    `)],-1);function Hn(l,n,u,d,p,_){return i(),c("div",gn,[fn,wn,e("div",Sn,[e("select",bn,Mn,512),e("select",Dn,Ln,512)]),Bn,An])}const En=a(mn,[["render",Hn]]),jn=s({name:"Search",mounted(){new o({select:this.$refs.showSearchSingle,settings:{showSearch:!1}}),new o({select:this.$refs.searchTextSingle,settings:{searchText:"Sorry, nothing to see here"}}),new o({select:this.$refs.searchPlaceholderSingle,settings:{searchPlaceholder:"Search for the good stuff!"}}),new o({select:this.$refs.searchHighlightSingle,settings:{searchHighlight:!0}}),new o({select:this.$refs.showSearchMulti,settings:{showSearch:!1}}),new o({select:this.$refs.searchTextMulti,settings:{searchText:"Sorry nothing to see here"}}),new o({select:this.$refs.searchPlaceholderMulti,settings:{searchPlaceholder:"Search for the good stuff!"}}),new o({select:this.$refs.searchHighlightMulti,settings:{searchHighlight:!0}})}}),qn={id:"search",class:"content"},In=v('<h2 class="header">showSearch / searchText / searchingText / searchHighlight</h2><p><b>showSearch</b> - is a boolean value that will decide whether or not to show the search. Default is true.</p><p><b>searchText</b> - is a string value that will show in the event there are no results. Default is &#39;No Results&#39;. </p><p><b>searchingText</b> - is a string value that will show during an fetch search request. Default is &#39;Searching...&#39;. </p><p><b>searchPlaceholder</b> - is a string value that will set the value of the input search placeholder text. Default is &#39;Search&#39;. </p><p><b>searchHighlight</b> - is a boolean value that will highlight search results. Default is false.</p>',6),Rn={class:"row",style:{padding:"0 0 var(--spacing-half) 0"}},kn={ref:"showSearchSingle"},Gn=e("option",{value:"dog"},"Dog",-1),Nn=e("option",{value:"cat"},"Cat",-1),Un=e("option",{value:"bird"},"Bird",-1),Yn=[Gn,Nn,Un],Wn={ref:"searchTextSingle"},Fn=e("option",{value:"dog"},"Dog",-1),zn=e("option",{value:"cat"},"Cat",-1),Jn=e("option",{value:"bird"},"Bird",-1),Kn=[Fn,zn,Jn],Qn={ref:"searchPlaceholderSingle"},Xn=e("option",{value:"dog"},"Dog",-1),Zn=e("option",{value:"cat"},"Cat",-1),es=e("option",{value:"bird"},"Bird",-1),ts=[Xn,Zn,es],os={ref:"searchHighlightSingle"},ls=e("option",{value:"dog"},"Dog",-1),ns=e("option",{value:"cat"},"Cat",-1),ss=e("option",{value:"bird"},"Bird",-1),as=[ls,ns,ss],is={class:"row"},cs={ref:"showSearchMulti",multiple:""},us=e("option",{value:"dog"},"Dog",-1),ds=e("option",{value:"cat"},"Cat",-1),ps=e("option",{value:"bird"},"Bird",-1),_s=[us,ds,ps],rs={ref:"searchTextMulti",multiple:""},hs=e("option",{value:"dog"},"Dog",-1),vs=e("option",{value:"cat"},"Cat",-1),$s=e("option",{value:"bird"},"Bird",-1),ms=[hs,vs,$s],gs={ref:"searchPlaceholderMulti",multiple:""},fs=e("option",{value:"dog"},"Dog",-1),ws=e("option",{value:"cat"},"Cat",-1),Ss=e("option",{value:"bird"},"Bird",-1),bs=[fs,ws,Ss],ys={ref:"searchHighlightMulti",multiple:""},Vs=e("option",{value:"dog"},"Dog",-1),xs=e("option",{value:"cat"},"Cat",-1),Os=e("option",{value:"bird"},"Bird",-1),Ms=[Vs,xs,Os],Ds=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
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
    `)],-1);function Ps(l,n,u,d,p,_){return i(),c("div",qn,[In,e("div",Rn,[e("select",kn,Yn,512),e("select",Wn,Kn,512),e("select",Qn,ts,512),e("select",os,as,512)]),e("div",is,[e("select",cs,_s,512),e("select",rs,ms,512),e("select",gs,bs,512),e("select",ys,Ms,512)]),Ds])}const Ts=a(jn,[["render",Ps]]),Cs=s({name:"Select"}),Ls={id:"select",class:"content"},Bs=e("h2",{class:"header"},"select",-1),As=e("p",null," The select field is used to identify the select element that will be used to create slim select. You can use any value you normally would in a querySelector or pass the element directly. ",-1),Hs=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
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
    `)],-1),Es=[Bs,As,Hs];function js(l,n,u,d,p,_){return i(),c("div",Ls,Es)}const qs=a(Cs,[["render",js]]),Is=s({name:"SelectAll",mounted(){new o({select:this.$refs.selectAll})}}),Rs={id:"selectAll",class:"content"},ks=e("h2",{class:"header"},"selectAll",-1),Gs=e("p",null," selectAll is a setting that can be used to add a select all action to an optgroup. This setting can be set to true or false. If set to true, a select all option will be added to the top of the selected values. If set to false or not set at all, no select all action will be added to the optgroup. ",-1),Ns=e("div",{class:"alert info"},"You can set selectAll either by data or by html dataset added to the optgroup element",-1),Us={ref:"selectAll",multiple:""},Ys=v('<optgroup label="Label 1" data-selectall="true"><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></optgroup><optgroup label="Label 2"><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option></optgroup>',2),Ws=[Ys],Fs=e("br",null,null,-1),zs=e("h3",null,"Via data",-1),Js=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
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
    `)],-1),Ks=e("br",null,null,-1),Qs=e("h3",null,"Via html",-1),Xs=e("pre",null,[t("      "),e("code",{class:"language-html"},`
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
    `)],-1);function Zs(l,n,u,d,p,_){return i(),c("div",Rs,[ks,Gs,Ns,e("select",Us,Ws,512),Fs,zs,Js,Ks,Qs,Xs])}const ea=a(Is,[["render",Zs]]),ta=s({name:"ShowTooltip",mounted(){new o({select:this.$refs.showOptionTooltips,settings:{showOptionTooltips:!0}})}}),oa={id:"showOptionTooltips",class:"content"},la=e("h2",{class:"header"},"showOptionTooltips",-1),na=e("p",null," showOptionTooltips option is used to active displaying the on-hover tooltips for select options. The tooltip text is equal to the option text content. ",-1),sa={ref:"showOptionTooltips"},aa=e("option",{value:"value1"},"Value 1",-1),ia=e("option",{value:"value2"},"Value 2",-1),ca=e("option",{value:"value3"},"Value 3",-1),ua=[aa,ia,ca],da=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            showOptionTooltips: true,
          }
        })
      `),t(`
    `)],-1);function pa(l,n,u,d,p,_){return i(),c("div",oa,[la,na,e("select",sa,ua,512),da])}const _a=a(ta,[["render",pa]]),ra=s({name:"Styles",mounted(){new o({select:this.$refs.selectStyle}),new o({select:this.$refs.optionStyle})}}),ha={id:"inlineStyles",class:"content"},va=e("h2",{class:"header"},"inline styles",-1),$a=e("p",null," Slim select will inherit any styles that were added to the original select element. This includes options as well. ",-1),ma={class:"row"},ga={ref:"selectStyle",style:{color:"red"}},fa=e("option",{value:"value1"},"Value 1",-1),wa=e("option",{value:"value2"},"Value 2",-1),Sa=e("option",{value:"value3"},"Value 3",-1),ba=[fa,wa,Sa],ya={ref:"optionStyle"},Va=e("option",{style:{color:"red"},value:"value1"},"Red",-1),xa=e("option",{style:{color:"green"}},"Green",-1),Oa=e("option",{style:{color:"blue"}},"Blue",-1),Ma=[Va,xa,Oa],Da=e("pre",null,[t("      "),e("code",{class:"language-html"},`
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
    `)],-1);function Pa(l,n,u,d,p,_){return i(),c("div",ha,[va,$a,e("div",ma,[e("select",ga,ba,512),e("select",ya,Ma,512)]),Da])}const Ta=a(ra,[["render",Pa]]),Ca=s({name:"Settings",components:{Select:qs,AlwaysOpen:se,ContentLocation:Ze,ContentPosition:St,OpenPosition:$n,Placeholder:En,Deselect:Vo,Display:No,Mandatory:ql,MinMax:Kl,DataAttributes:to,Css:It,Styles:Ta,Html:fl,Search:Ts,CloseOnSelect:je,ShowTooltip:_a,SelectAll:ea,Closable:ye,HideSelected:ul}}),La={id:"settings",class:"contents"};function Ba(l,n,u,d,p,_){const $=r("Select"),m=r("AlwaysOpen"),g=r("ContentLocation"),f=r("ContentPosition"),w=r("OpenPosition"),S=r("Placeholder"),b=r("Deselect"),y=r("Display"),V=r("Mandatory"),x=r("MinMax"),O=r("DataAttributes"),M=r("Css"),D=r("Styles"),P=r("Html"),T=r("Search"),C=r("CloseOnSelect"),L=r("ShowTooltip"),B=r("SelectAll"),A=r("Closable"),H=r("HideSelected");return i(),c("div",La,[h($),h(m),h(g),h(f),h(w),h(S),h(b),h(y),h(V),h(x),h(O),h(M),h(D),h(P),h(T),h(C),h(L),h(B),h(A),h(H)])}const Ha=a(Ca,[["render",Ba]]);export{Ha as default};
