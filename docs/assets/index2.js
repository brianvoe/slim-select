import{d as s,S as o,_ as a,o as i,c,a as e,f as t,e as v,r as h,b as r}from"./index.js";const q=s({name:"AlwaysOpen",mounted(){new o({select:this.$refs.alwaysOpenSingle,settings:{alwaysOpen:!0,contentLocation:this.$refs.alwaysOpenSingleContent,contentPosition:"relative"}}),new o({select:this.$refs.alwaysOpenMultiple,settings:{alwaysOpen:!0,contentLocation:this.$refs.alwaysOpenMultipleContent,contentPosition:"relative"}})}}),I={id:"alwaysOpen",class:"content"},R=e("h2",{class:"header"},"alwaysOpen",-1),N=e("p",null," alwaysOpen option is used to keep the select open at all times. This is useful for when you want to display the options at all times. ",-1),G={class:"row"},U={style:{height:"auto"}},K={ref:"alwaysOpenSingle"},Y=e("option",{value:"value1"},"Value 1",-1),W=e("option",{value:"value2"},"Value 2",-1),z=e("option",{value:"value3"},"Value 3",-1),F=[Y,W,z],J={ref:"alwaysOpenSingleContent"},Q={style:{height:"auto"}},X={ref:"alwaysOpenMultiple",multiple:""},Z=e("option",{value:"value1"},"Value 1",-1),ee=e("option",{value:"value2"},"Value 2",-1),te=e("option",{value:"value3"},"Value 3",-1),oe=e("option",{value:"value4"},"Value 4",-1),le=[Z,ee,te,oe],ne={ref:"alwaysOpenMultipleContent"},se=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
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
    `)],-1),ae=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <select id="selectElement">
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>

        <!-- The content will go in this div -->
        <div id="local"></div>
      `),t(`
    `)],-1);function ie(l,n,u,d,p,_){return i(),c("div",I,[R,N,e("div",G,[e("div",U,[e("select",K,F,512),e("div",J,null,512)]),e("div",Q,[e("select",X,le,512),e("div",ne,null,512)])]),se,ae])}const ce=a(q,[["render",ie]]),ue=s({name:"Closable",mounted(){new o({select:this.$refs.closableSingle}),new o({select:this.$refs.closableMultiple})}}),de={id:"closable",class:"content"},pe=v('<h2 class="header">closable</h2><p>closable is a optgroup settings that adds the ability to have closable optgroup options.</p><p>Values: <strong>&quot;off&quot;</strong> | <strong>&quot;open&quot;</strong> | <strong>&quot;close&quot;</strong></p><p>Default: <strong>&quot;off&quot;</strong></p><div class="alert info">You can set closable either by data or by html dataset added to the optgroup element</div>',5),_e={class:"row"},he={ref:"closableSingle"},re=v('<optgroup label="Label 1" data-closable="off"><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></optgroup><optgroup label="Label 2" data-closable="open"><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option></optgroup><optgroup label="Label 3" data-closable="close"><option value="value7">Value 7</option><option value="value8">Value 8</option><option value="value9">Value 9</option></optgroup>',3),ve=[re],$e={ref:"closableMultiple",multiple:""},me=v('<optgroup label="Label 1" data-selectall="true" data-closable="off"><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></optgroup><optgroup label="Label 2" data-selectall="true" data-closable="open"><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option></optgroup><optgroup label="Label 3" data-selectall="true" data-closable="close"><option value="value7">Value 7</option><option value="value8">Value 8</option><option value="value9">Value 9</option></optgroup>',3),ge=[me],fe=e("br",null,null,-1),we=e("h3",null,"Via data",-1),be=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
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
    `)],-1),Ve=e("br",null,null,-1),Se=e("h3",null,"Via html",-1),ye=e("pre",null,[t("      "),e("code",{class:"language-html"},`
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
    `)],-1);function xe(l,n,u,d,p,_){return i(),c("div",de,[pe,e("div",_e,[e("select",he,ve,512),e("select",$e,ge,512)]),fe,we,be,Ve,Se,ye])}const Oe=a(ue,[["render",xe]]),De=s({name:"CloseOnSelect",mounted(){new o({select:this.$refs.closeOnSelectSingle,settings:{closeOnSelect:!1}}),new o({select:this.$refs.closeOnSelectMultiple,settings:{closeOnSelect:!1,selectByGroup:!0}})}}),Me={id:"closeOnSelect",class:"content"},Te=e("h2",{class:"header"},"closeOnSelect",-1),Pe=e("p",null," closeOnSelect is a boolean value in which determines whether or not to close the content area upon selecting a value. ",-1),Ce={class:"row"},Le={ref:"closeOnSelectSingle"},Be=v('<option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option><optgroup label="Super Values"><option value="value11">Value 1</option><option value="value22">Value 2</option><option value="value33">Value 3</option></optgroup>',4),Ae=[Be],Ee={ref:"closeOnSelectMultiple",multiple:""},je=v('<option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option><optgroup label="Super Values"><option value="value11">Value 1</option><option value="value22">Value 2</option><option value="value33">Value 3</option></optgroup>',4),ke=[je],He=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#search',
          settings: {
            closeOnSelect: false,
          },
        })
      `),t(`
    `)],-1);function qe(l,n,u,d,p,_){return i(),c("div",Me,[Te,Pe,e("div",Ce,[e("select",Le,Ae,512),e("select",Ee,ke,512)]),He])}const Ie=a(De,[["render",qe]]),Re=s({name:"ContentLocation",mounted(){new o({select:this.$refs.contentLocation,settings:{contentLocation:this.$refs.local}})}}),Ne={id:"contentLocation",class:"content"},Ge=e("h2",{class:"header"},"contentLocation",-1),Ue=e("p",null," contentLocation will allow you to set the location of where the content section of slim select. By default every content div is appended to the body. ",-1),Ke=e("p",null," The content container is the bottom half of slim select. This includes the search input field and available options ",-1),Ye={class:"row"},We={ref:"contentLocation",style:{width:"50%"}},ze=e("option",{value:"value1"},"Value 1",-1),Fe=e("option",{value:"value2"},"Value 2",-1),Je=e("option",{value:"value3"},"Value 3",-1),Qe=[ze,Fe,Je],Xe={ref:"local"},Ze=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            contentLocation: document.getElementById('local')
          }
        })
      `),t(`
    `)],-1),et=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <select id="contentLocation">
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>

        <!-- The content will go in this div -->
        <div id="local"></div>
      `),t(`
    `)],-1);function tt(l,n,u,d,p,_){return i(),c("div",Ne,[Ge,Ue,Ke,e("div",Ye,[e("select",We,Qe,512),e("div",Xe,null,512)]),Ze,et])}const ot=a(Re,[["render",tt]]),lt=s({name:"ContentPosition",mounted(){new o({select:this.$refs.contentPositionRelative,settings:{contentPosition:"relative",contentLocation:this.$refs.contentPositionRelativeContent}}),new o({select:this.$refs.contentPositionAbsolute,settings:{contentPosition:"absolute"}})}}),nt={id:"contentPosition",class:"content"},st=e("h2",{class:"header"},"contentPosition",-1),at=e("p",null,[t("contentPosition will set the css position to either relative. Default is "),e("b",null,"'absolute'")],-1),it=e("div",{class:"alert info"}," If you do use relative position be sure to set the contentLocation to an element that will work best for your use case. Otherwise SlimSelect will add you content to the body of the html. See example usage below. ",-1),ct={class:"row"},ut={ref:"contentPositionRelative",class:"relative"},dt=e("option",{"data-placeholder":"true"},"Relative",-1),pt=e("option",{value:"value1"},"Value 1",-1),_t=e("option",{value:"value2"},"Value 2",-1),ht=e("option",{value:"value3"},"Value 3",-1),rt=[dt,pt,_t,ht],vt={ref:"contentPositionRelativeContent"},$t={ref:"contentPositionAbsolute",class:"absolute"},mt=e("option",{"data-placeholder":"true"},"Absolute",-1),gt=e("option",{value:"value1"},"Value 1",-1),ft=e("option",{value:"value2"},"Value 2",-1),wt=e("option",{value:"value3"},"Value 3",-1),bt=[mt,gt,ft,wt],Vt=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
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
    `)],-1);function St(l,n,u,d,p,_){return i(),c("div",nt,[st,at,it,e("div",ct,[e("select",ut,rt,512),e("div",vt,null,512),e("select",$t,bt,512)]),Vt])}const yt=a(lt,[["render",St]]),xt=s({name:"Css",mounted(){new o({select:this.$refs.selectClass}),new o({select:this.$refs.optionClass})}}),Ot={id:"cssClass",class:"content"},Dt=e("h2",{class:"header"},"css class",-1),Mt=e("p",null," Slim select will inherit any classes that were added to the original select element. This includes options as well. ",-1),Tt={class:"row"},Pt={ref:"selectClass",class:"select-class"},Ct=e("option",{value:"value1"},"Value 1",-1),Lt=e("option",{value:"value2"},"Value 2",-1),Bt=e("option",{value:"value3"},"Value 3",-1),At=[Ct,Lt,Bt],Et={ref:"optionClass",class:"option-class"},jt=e("option",{class:"red",value:"value1"},"Red",-1),kt=e("option",{class:"green",value:"value2"},"Green",-1),Ht=e("option",{class:"blue",value:"value3"},"Blue",-1),qt=[jt,kt,Ht],It=e("pre",null,[t("        "),e("code",{class:"language-html"},`
          <select id="select-class" class="classItems">
            <option class="red" value="value1">Value 1</option>
            <option class="green" value="value2">Value 2</option>
            <option class="blue" value="value3">Value 3</option>
          </select>
        `),t(`
      `)],-1);function Rt(l,n,u,d,p,_){return i(),c("div",Ot,[Dt,Mt,e("div",Tt,[e("select",Pt,At,512),e("select",Et,qt,512)]),It])}const Nt=a(xt,[["render",Rt]]),Gt=s({name:"DataAttributes",mounted(){new o({select:this.$refs.optionsSingle}),new o({select:this.$refs.optionsMultiple})}}),Ut={id:"dataAttributes",class:"content"},Kt=e("h2",{class:"header"},"Data Attributes",-1),Yt=e("p",null," Slim select will take on attributes of the original as best as possible. Below are example usages of attributes added to the underlining select options that slim select picked up and used ",-1),Wt={class:"row"},zt={ref:"optionsSingle"},Ft=v('<option data-placeholder="true"></option><option value="value1" data-info="Here is info">Data Attributes</option><option value="value2" disabled>Disabled Option</option><option value="value3" class="green">Class Green</option><option value="value4" style="color:purple;">Inline Style</option>',5),Jt=[Ft],Qt={ref:"optionsMultiple",multiple:""},Xt=e("option",{value:"value1","data-info":"Here is info"},"Data Attributes",-1),Zt=e("option",{value:"value2",disabled:""},"Disabled Option",-1),eo=e("option",{value:"value3",class:"green"},"Class Green",-1),to=e("option",{value:"value4",style:{color:"purple"}},"Inline Style",-1),oo=[Xt,Zt,eo,to];function lo(l,n,u,d,p,_){return i(),c("div",Ut,[Kt,Yt,e("div",Wt,[e("select",zt,Jt,512),e("select",Qt,oo,512)])])}const no=a(Gt,[["render",lo]]),so=s({name:"Deselect",mounted(){new o({select:this.$refs.allowDeselectSingle,settings:{allowDeselect:!0}}),new o({select:this.$refs.allowDeselectMultiple,settings:{allowDeselect:!0}})}}),ao={id:"allowDeselect",class:"content"},io=e("h2",{class:"header"},"allowDeselect",-1),co=e("p",null,"This will allow you to deselect a value on a single/multiple select dropdown.",-1),uo=e("p",null,"Be sure to have an empty option data placeholder so slim select has an empty string value to select.",-1),po={class:"row"},_o={ref:"allowDeselectSingle"},ho=e("option",{"data-placeholder":"true"},null,-1),ro=e("option",{value:"value1"},"Value 1",-1),vo=e("option",{value:"value2"},"Value 2",-1),$o=e("option",{value:"value3"},"Value 3",-1),mo=[ho,ro,vo,$o],go={ref:"allowDeselectMultiple",multiple:""},fo=e("option",{"data-placeholder":"true"},null,-1),wo=e("option",{value:"value1"},"Value 1",-1),bo=e("option",{value:"value2"},"Value 2",-1),Vo=e("option",{value:"value3"},"Value 3",-1),So=[fo,wo,bo,Vo],yo=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            allowDeselect: true
          }
        })
      `),t(`
    `)],-1),xo=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <!-- Requires emtpy data-placeholder option -->
        <select id="allowDeselect">
          <option data-placeholder="true"></option>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      `),t(`
    `)],-1);function Oo(l,n,u,d,p,_){return i(),c("div",ao,[io,co,uo,e("div",po,[e("select",_o,mo,512),e("select",go,So,512)]),yo,xo])}const Do=a(so,[["render",Oo]]),Mo=s({name:"Disabled",mounted(){new o({select:this.$refs.disabledSingle,settings:{disabled:!0}}),new o({select:this.$refs.disabledMultiple}),new o({select:this.$refs.disabledOptionSingle,data:[{text:"Option 1",value:"option1"},{text:"Option 2",value:"option2",disabled:!0},{text:"Option 3",value:"option3"}]}),new o({select:this.$refs.disabledOptionMultiple}),new o({select:this.$refs.disabledDynamicSingle}).select.showUI()},methods:{enableDisableDynamic(){const l=this.$refs.disabledDynamicSingle;l&&(l.disabled=!l.disabled)}}}),To={id:"disabled",class:"content"},Po=e("h2",{class:"header"},"disabled",-1),Co=e("p",null,"Allows the ability to disable the select dropdown as well as individual options",-1),Lo=e("div",{class:"alert info"},"Methods also are provided to enable and disable SlimSelect via method call.",-1),Bo={class:"row"},Ao={ref:"disabledSingle"},Eo=e("option",{value:"value1",selected:""},"Value 1",-1),jo=e("option",{value:"value2"},"Value 2",-1),ko=e("option",{value:"value3"},"Value 3",-1),Ho=[Eo,jo,ko],qo={ref:"disabledMultiple",multiple:"",disabled:""},Io=e("option",{value:"value1",selected:""},"Value 1",-1),Ro=e("option",{value:"value2"},"Value 2",-1),No=e("option",{value:"value3"},"Value 3",-1),Go=[Io,Ro,No],Uo=e("br",null,null,-1),Ko={class:"row"},Yo={ref:"disabledOptionSingle"},Wo=e("option",{value:"value1",selected:""},"Value 1",-1),zo=e("option",{value:"value2"},"Value 2",-1),Fo=e("option",{value:"value3"},"Value 3",-1),Jo=[Wo,zo,Fo],Qo={ref:"disabledOptionMultiple",multiple:""},Xo=e("option",{value:"value1",selected:""},"Value 1",-1),Zo=e("option",{value:"value2",disabled:""},"Value 2",-1),el=e("option",{value:"value3"},"Value 3",-1),tl=[Xo,Zo,el],ol=e("br",null,null,-1),ll={class:"row"},nl={ref:"disabledDynamicSingle"},sl=e("option",{value:"value1"},"Value 1",-1),al=e("option",{value:"value2"},"Value 2",-1),il=e("option",{value:"value3"},"Value 3",-1),cl=[sl,al,il],ul=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
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
      `),t(`
    `)],-1),dl=e("pre",null,[t("      "),e("code",{class:"language-html"},`
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
      `),t(`
    `)],-1);function pl(l,n,u,d,p,_){return i(),c("div",To,[Po,Co,Lo,e("div",Bo,[e("select",Ao,Ho,512),e("select",qo,Go,512)]),Uo,e("div",Ko,[e("select",Yo,Jo,512),e("select",Qo,tl,512)]),ol,e("div",ll,[e("div",{class:"btn",onClick:n[0]||(n[0]=(...$)=>l.enableDisableDynamic&&l.enableDisableDynamic(...$))},"Enable/Disable Original Select"),e("select",nl,cl,512)]),ul,dl])}const _l=a(Mo,[["render",pl]]),hl=s({name:"Display",mounted(){const l=new o({select:this.$refs.selectdisplay}),n=[{value:"value1",text:"Value 1",display:!1},{value:"value2",text:"Value 2"},{value:"value3",text:"Value 3"}];l.setData(n),l.setSelected(["value1","value3"]),new o({select:this.$refs.selectdisplay2})}}),rl={id:"display",class:"content"},vl=e("h2",{class:"header"},"display",-1),$l=e("p",null,"Allows to hide elements of selected values.",-1),ml={class:"row"},gl={ref:"selectdisplay",multiple:""},fl=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
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
    `)],-1),wl=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <select id="selectMultiMandatory" multiple></select>
      `),t(`
    `)],-1),bl=e("p",null,"Or",-1),Vl={class:"row"},Sl={ref:"selectdisplay2",multiple:""},yl=e("option",{value:"value1",style:{display:"none"},selected:""},"Value 1",-1),xl=e("option",{value:"value2",selected:""},"Value 2",-1),Ol=e("option",{value:"value3"},"Value 3",-1),Dl=[yl,xl,Ol],Ml=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        const slim = new SlimSelect({
          select: '#selectElement'
        });
      `),t(`
    `)],-1),Tl=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <select id="selectdisplay2" multiple>
          <option value="value1" style="display: none;" selected>Value 1</option>
          <option value="value2" selected>Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      `),t(`
    `)],-1);function Pl(l,n,u,d,p,_){return i(),c("div",rl,[vl,$l,e("div",ml,[e("select",gl,null,512)]),fl,wl,bl,e("div",Vl,[e("select",Sl,Dl,512)]),Ml,Tl])}const Cl=a(hl,[["render",Pl]]),Ll=s({name:"HideSelected",mounted(){new o({select:this.$refs.hideSelectedSingle,settings:{hideSelected:!0}}),new o({select:this.$refs.hideSelectedMultiple,settings:{hideSelected:!0}})}}),Bl={id:"hideSelected",class:"content"},Al=e("h2",{class:"header"},"hideSelected",-1),El=e("p",null,"hideSelected setting is used to hide the current selected option in the options dropdown.",-1),jl={class:"row"},kl={ref:"hideSelectedSingle"},Hl=e("option",{"data-placeholder":"true"},null,-1),ql=e("option",{value:"value1"},"Value 1",-1),Il=e("option",{value:"value2"},"Value 2",-1),Rl=e("option",{value:"value3"},"Value 3",-1),Nl=[Hl,ql,Il,Rl],Gl={ref:"hideSelectedMultiple",multiple:""},Ul=e("option",{value:"value1"},"Value 1",-1),Kl=e("option",{value:"value2"},"Value 2",-1),Yl=e("option",{value:"value3"},"Value 3",-1),Wl=[Ul,Kl,Yl],zl=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            hideSelected: true,
          }
        })
      `),t(`
    `)],-1),Fl=e("pre",null,[t("      "),e("code",{class:"language-html"},`
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
    `)],-1);function Jl(l,n,u,d,p,_){return i(),c("div",Bl,[Al,El,e("div",jl,[e("select",kl,Nl,512),e("select",Gl,Wl,512)]),zl,Fl])}const Ql=a(Ll,[["render",Jl]]),Xl=s({name:"Html",mounted(){new o({select:this.$refs.htmlSingle,settings:{searchHighlight:!0},data:[{html:"<b>Bold Text</b>",text:"Bold Text",value:"bold text"},{html:'<div style="border: solid 1px #666666;">Border</div>',text:"Border",value:"border"},{html:"<i>Slim Select is awesome</i>",text:"Slim Select is awesome"}]}),new o({select:this.$refs.htmlMulti,settings:{searchHighlight:!0}})}}),Zl={id:"html",class:"content"},en=e("h2",{class:"header"},"html",-1),tn=e("p",null," Slim select has the ability to set custom html for the selected values and options dropdown. By default if the html field is set it will use that for the selected values and the options dropdown. For a multiple select selected values it will always use the text field. ",-1),on={class:"row"},ln={ref:"htmlSingle"},nn={ref:"htmlMulti",multiple:""},sn=e("option",{value:"bold text","data-html":"<b>Bold Text</b>"},"Bold Text",-1),an=e("option",{value:"border","data-html":"<div style='border: solid 1px #666666;'>Border</div>"},"Border",-1),cn=e("option",{value:"slim select","data-html":"<i>Slim Select is awesome</i>"},"Slim Select is awesome",-1),un=[sn,an,cn],dn=e("h3",null,"Via data",-1),pn=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        var select = new SlimSelect({
          select: '#selectElement',
          data: [
            {html: '<b>Bold Text</b>', text: 'Bold Text', value: 'bold text'},
            {html: '<div style="border: solid 1px #666666;">Border</div>', text: 'Border', value: 'border'},
            {html: '<i>Slim Select is awesome</i>', text: 'Slim Select is awesome'}
          ]
        })
      `),t(`
    `)],-1),_n=e("h3",null,"Via data attribute",-1),hn=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <select id="selectElement">
          <option value="bold text" data-html="<b>Bold Text</b>">Bold Text</option>
          <option value="border" data-html="<div style="border: solid 1px #666666;">Border</div>">Border</option>
          <option value="slim select" data-html="<i>Slim Select is awesome</i>">Slim Select awesome</option>
        </select>
      `),t(`
    `)],-1);function rn(l,n,u,d,p,_){return i(),c("div",Zl,[en,tn,e("div",on,[e("select",ln,null,512),e("select",nn,un,512)]),dn,pn,_n,hn])}const vn=a(Xl,[["render",rn]]),$n=s({name:"KeepOrder",mounted(){new o({select:this.$refs.keepOrder,settings:{keepOrder:!0}})}}),mn={id:"keepOrder",class:"content"},gn=e("h2",{class:"header"},"keepOrder",-1),fn=e("p",null," keepOrder if true will maintain the order in which options are selected. If true the selected options order will be in the order of the dropdown options. As long as slim select isnt fully rerendered the order will be maintained. ",-1),wn=e("p",null,[t("Values: "),e("strong",null,"true"),t(" | "),e("strong",null,"false")],-1),bn=e("p",null,[t("Default: "),e("strong",null,"false")],-1),Vn={class:"row"},Sn={ref:"keepOrder",multiple:""},yn=v('<option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option><optgroup label="Label 1"><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option></optgroup><optgroup label="Label 2"><option value="value7">Value 7</option><option value="value8">Value 8</option><option value="value9">Value 9</option></optgroup>',5),xn=[yn],On=e("br",null,null,-1),Dn=e("h3",null,"Via html",-1),Mn=e("pre",null,[t("      "),e("code",{class:"language-html"},`
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
      `),t(`
    `)],-1);function Tn(l,n,u,d,p,_){return i(),c("div",mn,[gn,fn,wn,bn,e("div",Vn,[e("select",Sn,xn,512)]),On,Dn,Mn])}const Pn=a($n,[["render",Tn]]),Cn=s({name:"Mandatory",mounted(){const l=new o({select:this.$refs.selectMultiMandatory}),n=[{value:"value1",text:"Value 1",mandatory:!0},{value:"value2",text:"Value 2"},{value:"value3",text:"Value 3"}];l.setData(n),l.setSelected(["value1","value3"]),new o({select:this.$refs.selectMultiMandatory2})}}),Ln={id:"mandatory",class:"content"},Bn=e("h2",{class:"header"},"mandatory",-1),An=e("p",null," When using multi select you can set a mandatory on the option to prevent capability to deselect particular option. Note options with mandatory flag is not selected by default, you need select them yourselfs. ",-1),En={class:"row"},jn={ref:"selectMultiMandatory",multiple:""},kn=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
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
    `)],-1),Hn=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <select id="selectMultiMandatory" multiple></select>
      `),t(`
    `)],-1),qn=e("p",null,"Or",-1),In={class:"row"},Rn={ref:"selectMultiMandatory2",multiple:""},Nn=e("option",{value:"value1","data-mandatory":"true",selected:""},"Value 1",-1),Gn=e("option",{value:"value2",selected:""},"Value 2",-1),Un=e("option",{value:"value3"},"Value 3",-1),Kn=[Nn,Gn,Un],Yn=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        const slim = new SlimSelect({
          select: '#selectElement'
        });
      `),t(`
    `)],-1),Wn=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <select id="selectMultiMandatory" multiple>
          <option value="value1" data-mandatory="true" selected>Value 1</option>
          <option value="value2" selected>Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      `),t(`
    `)],-1);function zn(l,n,u,d,p,_){return i(),c("div",Ln,[Bn,An,e("div",En,[e("select",jn,null,512)]),kn,Hn,qn,e("div",In,[e("select",Rn,Kn,512)]),Yn,Wn])}const Fn=a(Cn,[["render",zn]]),Jn=s({name:"MaxValuesShown",mounted(){new o({select:this.$refs.maxValuesShown,settings:{maxValuesShown:5,maxValuesMessage:"{number} selected",allowDeselect:!0}})}}),Qn={id:"maxValuesShown",class:"content"},Xn=e("h2",{class:"header"},"maxValuesShown",-1),Zn=e("p",null," When using multiselect you can set a threshold so when selecting more items than the input value, the items will not display as values, but the 'n selected' will be displayed. The text that will be displayed can be customized with the use of '{number}' in the maxValuesMessage setting. ",-1),es=e("p",null,[e("strong",null,"Default:"),t(" 20")],-1),ts={class:"row"},os={ref:"maxValuesShown",multiple:""},ls=v('<option value="value1" selected>Value 1</option><option value="value2" selected>Value 2</option><option value="value3" selected>Value 3</option><option value="value4" selected>Value 4</option><option value="value5" selected>Value 5</option><option value="value6" selected>Value 6</option><option value="value7">Value 7</option><option value="value8">Value 8</option>',8),ns=[ls],ss=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            maxValuesShown: 5, // Default 20
            maxValuesMessage: '{number} values selected', // Default '{number} selected'
          },
        });
      `),t(`
    `)],-1),as=e("pre",null,[t("      "),e("code",{class:"language-html"},`
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
      `),t(`
    `)],-1);function is(l,n,u,d,p,_){return i(),c("div",Qn,[Xn,Zn,es,e("div",ts,[e("select",os,ns,512)]),ss,as])}const cs=a(Jn,[["render",is]]),us=s({name:"MinMax",mounted(){new o({select:this.$refs.selectMultiMax,settings:{allowDeselect:!0,closeOnSelect:!1,minSelected:2,maxSelected:5},events:{addable:l=>l}})}}),ds={id:"minmax",class:"content"},ps=e("h2",{class:"header"},"Min/Max Selected",-1),_s=e("p",null,"When using multi select you can set a min and/or max on the amount of selections you can have.",-1),hs={class:"row"},rs={ref:"selectMultiMax",multiple:""},vs=v('<option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option>',6),$s=[vs],ms=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        let slim = new SlimSelect({
          select: '#selectElement',
          settings: {
            minSelected: 2,
            maxSelected: 5,
          },
        })
      `),t(`
    `)],-1),gs=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <select id="selectMultiMax" multiple>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
          <option value="value4">Value 4</option>
          <option value="value5">Value 5</option>
          <option value="value6">Value 6</option>
        </select>
      `),t(`
    `)],-1);function fs(l,n,u,d,p,_){return i(),c("div",ds,[ps,_s,e("div",hs,[e("select",rs,$s,512)]),ms,gs])}const ws=a(us,[["render",fs]]),bs=s({name:"OpenPosition",mounted(){new o({select:this.$refs.openPositionUp,settings:{openPosition:"up"}}),new o({select:this.$refs.openPositionDown,settings:{openPosition:"down"}})}}),Vs={id:"openPosition",class:"content"},Ss=e("h2",{class:"header"},"openPosition",-1),ys=e("p",null," openPosition is a string value that will decide where to show your content when it comes out. By default slim select will try to put the content where it can without going off screen. But you may want to always show it in one direction. ",-1),xs=e("p",null,[t("Possible Options: "),e("b",null,"'auto', 'up' or 'down'"),t(". Default is "),e("b",null,"'auto'")],-1),Os={class:"row"},Ds={ref:"openPositionUp"},Ms=e("option",{value:"up1"},"Up 1",-1),Ts=e("option",{value:"up2"},"Up 2",-1),Ps=e("option",{value:"up3"},"Up 3",-1),Cs=[Ms,Ts,Ps],Ls={ref:"openPositionDown"},Bs=e("option",{value:"down1"},"Down 1",-1),As=e("option",{value:"down2"},"Down 2",-1),Es=e("option",{value:"down3"},"Down 3",-1),js=[Bs,As,Es],ks=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            openPosition: 'auto' // 'auto', 'up' or 'down'
          }
        })
      `),t(`
    `)],-1);function Hs(l,n,u,d,p,_){return i(),c("div",Vs,[Ss,ys,xs,e("div",Os,[e("select",Ds,Cs,512),e("select",Ls,js,512)]),ks])}const qs=a(bs,[["render",Hs]]),Is=s({name:"Placeholder",mounted(){new o({select:this.$refs.placeholderSingle,settings:{placeholderText:"Custom Placeholder Text"}}),new o({select:this.$refs.placeholderMultiple,settings:{placeholderText:"Make Selection"}}),new o({select:this.$refs.placeholderNone,settings:{placeholderText:""}})}}),Rs={id:"placeholder",class:"content"},Ns=e("h2",{class:"header"},"placeholderText",-1),Gs=e("p",null,' Placeholders consists of setting the placeholder option value. The only difference is single selects require an empty option with data-placeholder set to true. Default value is "Select Value". ',-1),Us=e("div",{class:"alert info"}," Notice you can also set placeholder to empty if that is what you would like to do as well. ",-1),Ks={class:"row"},Ys={ref:"placeholderSingle"},Ws=e("option",{"data-placeholder":"true"},null,-1),zs=e("option",{value:"value1"},"Value 1",-1),Fs=e("option",{value:"value2"},"Value 2",-1),Js=e("option",{value:"value3"},"Value 3",-1),Qs=[Ws,zs,Fs,Js],Xs={ref:"placeholderMultiple",multiple:""},Zs=e("option",{value:"value1"},"Value 1",-1),ea=e("option",{value:"value2"},"Value 2",-1),ta=e("option",{value:"value3"},"Value 3",-1),oa=[Zs,ea,ta],la={ref:"placeholderNone"},na=e("option",{"data-placeholder":"true"},null,-1),sa=e("option",{value:"value1"},"Value 1",-1),aa=e("option",{value:"value2"},"Value 2",-1),ia=e("option",{value:"value3"},"Value 3",-1),ca=[na,sa,aa,ia],ua=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#placeholder',
          settings: {
            placeholderText: 'Custom Placeholder Text',
          }
        })
      `),t(`
    `)],-1),da=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <!-- Set empty option with data-placeholder if you to have placeholder -->
        <!-- text for single select, otherwise first option will be selected -->
        <select id="placeholderSingle">
          <option data-placeholder="true"></option>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      `),t(`
    `)],-1);function pa(l,n,u,d,p,_){return i(),c("div",Rs,[Ns,Gs,Us,e("div",Ks,[e("select",Ys,Qs,512),e("select",Xs,oa,512),e("select",la,ca,512)]),ua,da])}const _a=a(Is,[["render",pa]]),ha=s({name:"Search",mounted(){new o({select:this.$refs.showSearchSingle,settings:{showSearch:!1}}),new o({select:this.$refs.searchTextSingle,settings:{searchText:"Sorry, nothing to see here"}}),new o({select:this.$refs.searchPlaceholderSingle,settings:{searchPlaceholder:"Search for the good stuff!"}}),new o({select:this.$refs.searchHighlightSingle,settings:{searchHighlight:!0}}),new o({select:this.$refs.showSearchMulti,settings:{showSearch:!1}}),new o({select:this.$refs.searchTextMulti,settings:{searchText:"Sorry nothing to see here"}}),new o({select:this.$refs.searchPlaceholderMulti,settings:{searchPlaceholder:"Search for the good stuff!"}}),new o({select:this.$refs.searchHighlightMulti,settings:{searchHighlight:!0}})}}),ra={id:"search",class:"content"},va=v('<h2 class="header">showSearch / searchText / searchingText / searchHighlight</h2><p><b>showSearch</b> - is a boolean value that will decide whether or not to show the search. Default is true.</p><p><b>searchText</b> - is a string value that will show in the event there are no results. Default is &#39;No Results&#39;. </p><p><b>searchingText</b> - is a string value that will show during an fetch search request. Default is &#39;Searching...&#39;. </p><p><b>searchPlaceholder</b> - is a string value that will set the value of the input search placeholder text. Default is &#39;Search&#39;. </p><p><b>searchHighlight</b> - is a boolean value that will highlight search results. Default is false.</p>',6),$a={class:"row",style:{padding:"0 0 var(--spacing-half) 0"}},ma={ref:"showSearchSingle"},ga=e("option",{value:"dog"},"Dog",-1),fa=e("option",{value:"cat"},"Cat",-1),wa=e("option",{value:"bird"},"Bird",-1),ba=[ga,fa,wa],Va={ref:"searchTextSingle"},Sa=e("option",{value:"dog"},"Dog",-1),ya=e("option",{value:"cat"},"Cat",-1),xa=e("option",{value:"bird"},"Bird",-1),Oa=[Sa,ya,xa],Da={ref:"searchPlaceholderSingle"},Ma=e("option",{value:"dog"},"Dog",-1),Ta=e("option",{value:"cat"},"Cat",-1),Pa=e("option",{value:"bird"},"Bird",-1),Ca=[Ma,Ta,Pa],La={ref:"searchHighlightSingle"},Ba=e("option",{value:"dog"},"Dog",-1),Aa=e("option",{value:"cat"},"Cat",-1),Ea=e("option",{value:"bird"},"Bird",-1),ja=[Ba,Aa,Ea],ka={class:"row"},Ha={ref:"showSearchMulti",multiple:""},qa=e("option",{value:"dog"},"Dog",-1),Ia=e("option",{value:"cat"},"Cat",-1),Ra=e("option",{value:"bird"},"Bird",-1),Na=[qa,Ia,Ra],Ga={ref:"searchTextMulti",multiple:""},Ua=e("option",{value:"dog"},"Dog",-1),Ka=e("option",{value:"cat"},"Cat",-1),Ya=e("option",{value:"bird"},"Bird",-1),Wa=[Ua,Ka,Ya],za={ref:"searchPlaceholderMulti",multiple:""},Fa=e("option",{value:"dog"},"Dog",-1),Ja=e("option",{value:"cat"},"Cat",-1),Qa=e("option",{value:"bird"},"Bird",-1),Xa=[Fa,Ja,Qa],Za={ref:"searchHighlightMulti",multiple:""},ei=e("option",{value:"dog"},"Dog",-1),ti=e("option",{value:"cat"},"Cat",-1),oi=e("option",{value:"bird"},"Bird",-1),li=[ei,ti,oi],ni=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
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
    `)],-1);function si(l,n,u,d,p,_){return i(),c("div",ra,[va,e("div",$a,[e("select",ma,ba,512),e("select",Va,Oa,512),e("select",Da,Ca,512),e("select",La,ja,512)]),e("div",ka,[e("select",Ha,Na,512),e("select",Ga,Wa,512),e("select",za,Xa,512),e("select",Za,li,512)]),ni])}const ai=a(ha,[["render",si]]),ii=s({name:"Select"}),ci={id:"select",class:"content"},ui=e("h2",{class:"header"},"select",-1),di=e("p",null," The select field is used to identify the select element that will be used to create slim select. You can use any value you normally would in a querySelector or pass the element directly. ",-1),pi=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
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
    `)],-1),_i=[ui,di,pi];function hi(l,n,u,d,p,_){return i(),c("div",ci,_i)}const ri=a(ii,[["render",hi]]),vi=s({name:"SelectAll",mounted(){new o({select:this.$refs.selectAll})}}),$i={id:"selectAll",class:"content"},mi=e("h2",{class:"header"},"selectAll",-1),gi=e("p",null," selectAll is a setting that can be used to add a select all action to an optgroup. This setting can be set to true or false. If set to true, a select all option will be added to the top of the selected values. If set to false or not set at all, no select all action will be added to the optgroup. ",-1),fi=e("p",null,"selectAllText is a setting that can be used to change the text of the select all optgroup.",-1),wi=e("div",{class:"alert info"},"You can set selectAll/selectAllText either by data or by html dataset added to the optgroup element",-1),bi={ref:"selectAll",multiple:""},Vi=v('<optgroup label="Label 1" data-selectall="true" data-selectalltext="Select them all!"><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></optgroup><optgroup label="Label 2"><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option></optgroup>',2),Si=[Vi],yi=e("br",null,null,-1),xi=e("h3",null,"Via data",-1),Oi=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
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
      `),t(`
    `)],-1),Di=e("br",null,null,-1),Mi=e("h3",null,"Via html",-1),Ti=e("pre",null,[t("      "),e("code",{class:"language-html"},`
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
      `),t(`
    `)],-1);function Pi(l,n,u,d,p,_){return i(),c("div",$i,[mi,gi,fi,wi,e("select",bi,Si,512),yi,xi,Oi,Di,Mi,Ti])}const Ci=a(vi,[["render",Pi]]),Li=s({name:"ShowTooltip",mounted(){new o({select:this.$refs.showOptionTooltips,settings:{showOptionTooltips:!0}})}}),Bi={id:"showOptionTooltips",class:"content"},Ai=e("h2",{class:"header"},"showOptionTooltips",-1),Ei=e("p",null," showOptionTooltips option is used to active displaying the on-hover tooltips for select options. The tooltip text is equal to the option text content. ",-1),ji={ref:"showOptionTooltips"},ki=e("option",{value:"value1"},"Value 1",-1),Hi=e("option",{value:"value2"},"Value 2",-1),qi=e("option",{value:"value3"},"Value 3",-1),Ii=[ki,Hi,qi],Ri=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            showOptionTooltips: true,
          }
        })
      `),t(`
    `)],-1);function Ni(l,n,u,d,p,_){return i(),c("div",Bi,[Ai,Ei,e("select",ji,Ii,512),Ri])}const Gi=a(Li,[["render",Ni]]),Ui=s({name:"Styles",mounted(){new o({select:this.$refs.selectStyle}),new o({select:this.$refs.optionStyle})}}),Ki={id:"inlineStyles",class:"content"},Yi=e("h2",{class:"header"},"inline styles",-1),Wi=e("p",null," Slim select will inherit any styles that were added to the original select element. This includes options as well. ",-1),zi={class:"row"},Fi={ref:"selectStyle",style:{color:"red"}},Ji=e("option",{value:"value1"},"Value 1",-1),Qi=e("option",{value:"value2"},"Value 2",-1),Xi=e("option",{value:"value3"},"Value 3",-1),Zi=[Ji,Qi,Xi],ec={ref:"optionStyle"},tc=e("option",{style:{color:"red"},value:"value1"},"Red",-1),oc=e("option",{style:{color:"green"}},"Green",-1),lc=e("option",{style:{color:"blue"}},"Blue",-1),nc=[tc,oc,lc],sc=e("pre",null,[t("      "),e("code",{class:"language-html"},`
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
    `)],-1);function ac(l,n,u,d,p,_){return i(),c("div",Ki,[Yi,Wi,e("div",zi,[e("select",Fi,Zi,512),e("select",ec,nc,512)]),sc])}const ic=a(Ui,[["render",ac]]),cc=s({name:"Settings",components:{Select:ri,AlwaysOpen:ce,ContentLocation:ot,ContentPosition:yt,OpenPosition:qs,Placeholder:_a,Deselect:Do,Display:Cl,Disabled:_l,Mandatory:Fn,MinMax:ws,DataAttributes:no,MaxValuesShown:cs,Css:Nt,Styles:ic,Html:vn,KeepOrder:Pn,Search:ai,CloseOnSelect:Ie,ShowTooltip:Gi,SelectAll:Ci,Closable:Oe,HideSelected:Ql}}),uc={id:"settings",class:"contents"};function dc(l,n,u,d,p,_){const $=h("Select"),m=h("AlwaysOpen"),g=h("ContentLocation"),f=h("ContentPosition"),w=h("OpenPosition"),b=h("Placeholder"),V=h("SelectAll"),S=h("Deselect"),y=h("Display"),x=h("Disabled"),O=h("Mandatory"),D=h("MinMax"),M=h("DataAttributes"),T=h("Css"),P=h("Styles"),C=h("Html"),L=h("KeepOrder"),B=h("Search"),A=h("CloseOnSelect"),E=h("ShowTooltip"),j=h("Closable"),k=h("HideSelected"),H=h("MaxValuesShown");return i(),c("div",uc,[r($),r(m),r(g),r(f),r(w),r(b),r(V),r(S),r(y),r(x),r(O),r(D),r(M),r(T),r(P),r(C),r(L),r(B),r(A),r(E),r(j),r(k),r(H)])}const _c=a(cc,[["render",dc]]);export{_c as default};
