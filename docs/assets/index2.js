import{d as s,S as o,a,o as i,c,b as e,g as t,f as v,r as h,e as r}from"./index.js";const q=s({name:"AlwaysOpen",mounted(){new o({select:this.$refs.alwaysOpenSingle,settings:{alwaysOpen:!0,contentLocation:this.$refs.alwaysOpenSingleContent,contentPosition:"relative"}}),new o({select:this.$refs.alwaysOpenMultiple,settings:{alwaysOpen:!0,contentLocation:this.$refs.alwaysOpenMultipleContent,contentPosition:"relative"}})}}),k={id:"alwaysOpen",class:"content"},I=e("h2",{class:"header"},"alwaysOpen",-1),R=e("p",null," alwaysOpen option is used to keep the select open at all times. This is useful for when you want to display the options at all times. ",-1),N={class:"row"},G={style:{height:"auto"}},U={ref:"alwaysOpenSingle"},Y=e("option",{value:"value1"},"Value 1",-1),W=e("option",{value:"value2"},"Value 2",-1),z=e("option",{value:"value3"},"Value 3",-1),F=[Y,W,z],J={ref:"alwaysOpenSingleContent"},K={style:{height:"auto"}},Q={ref:"alwaysOpenMultiple",multiple:""},X=e("option",{value:"value1"},"Value 1",-1),Z=e("option",{value:"value2"},"Value 2",-1),ee=e("option",{value:"value3"},"Value 3",-1),te=e("option",{value:"value4"},"Value 4",-1),oe=[X,Z,ee,te],le={ref:"alwaysOpenMultipleContent"},ne=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
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
    `)],-1),se=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <select id="selectElement">
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>

        <!-- The content will go in this div -->
        <div id="local"></div>
      `),t(`
    `)],-1);function ae(l,n,u,d,p,_){return i(),c("div",k,[I,R,e("div",N,[e("div",G,[e("select",U,F,512),e("div",J,null,512)]),e("div",K,[e("select",Q,oe,512),e("div",le,null,512)])]),ne,se])}const ie=a(q,[["render",ae]]),ce=s({name:"Closable",mounted(){new o({select:this.$refs.closableSingle}),new o({select:this.$refs.closableMultiple})}}),ue={id:"closable",class:"content"},de=v('<h2 class="header">closable</h2><p>closable is a optgroup settings that adds the ability to have closable optgroup options.</p><p>Values: <strong>&quot;off&quot;</strong> | <strong>&quot;open&quot;</strong> | <strong>&quot;close&quot;</strong></p><p>Default: <strong>&quot;off&quot;</strong></p><div class="alert info">You can set closable either by data or by html dataset added to the optgroup element</div>',5),pe={class:"row"},_e={ref:"closableSingle"},he=v('<optgroup label="Label 1" data-closable="off"><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></optgroup><optgroup label="Label 2" data-closable="open"><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option></optgroup><optgroup label="Label 3" data-closable="close"><option value="value7">Value 7</option><option value="value8">Value 8</option><option value="value9">Value 9</option></optgroup>',3),re=[he],ve={ref:"closableMultiple",multiple:""},$e=v('<optgroup label="Label 1" data-selectall="true" data-closable="off"><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></optgroup><optgroup label="Label 2" data-selectall="true" data-closable="open"><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option></optgroup><optgroup label="Label 3" data-selectall="true" data-closable="close"><option value="value7">Value 7</option><option value="value8">Value 8</option><option value="value9">Value 9</option></optgroup>',3),me=[$e],ge=e("br",null,null,-1),fe=e("h3",null,"Via data",-1),we=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
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
    `)],-1),be=e("br",null,null,-1),Ve=e("h3",null,"Via html",-1),Se=e("pre",null,[t("      "),e("code",{class:"language-html"},`
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
    `)],-1);function ye(l,n,u,d,p,_){return i(),c("div",ue,[de,e("div",pe,[e("select",_e,re,512),e("select",ve,me,512)]),ge,fe,we,be,Ve,Se])}const xe=a(ce,[["render",ye]]),De=s({name:"CloseOnSelect",mounted(){new o({select:this.$refs.closeOnSelectSingle,settings:{closeOnSelect:!1}}),new o({select:this.$refs.closeOnSelectMultiple,settings:{closeOnSelect:!1,selectByGroup:!0}})}}),Oe={id:"closeOnSelect",class:"content"},Me=e("h2",{class:"header"},"closeOnSelect",-1),Te=e("p",null," closeOnSelect is a boolean value in which determines whether or not to close the content area upon selecting a value. ",-1),Pe={class:"row"},Ce={ref:"closeOnSelectSingle"},Be=v('<option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option><optgroup label="Super Values"><option value="value11">Value 1</option><option value="value22">Value 2</option><option value="value33">Value 3</option></optgroup>',4),Le=[Be],Ee={ref:"closeOnSelectMultiple",multiple:""},Ae=v('<option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option><optgroup label="Super Values"><option value="value11">Value 1</option><option value="value22">Value 2</option><option value="value33">Value 3</option></optgroup>',4),je=[Ae],He=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#search',
          settings: {
            closeOnSelect: false,
          },
        })
      `),t(`
    `)],-1);function qe(l,n,u,d,p,_){return i(),c("div",Oe,[Me,Te,e("div",Pe,[e("select",Ce,Le,512),e("select",Ee,je,512)]),He])}const ke=a(De,[["render",qe]]),Ie=s({name:"ContentLocation",mounted(){new o({select:this.$refs.contentLocation,settings:{contentLocation:this.$refs.local}})}}),Re={id:"contentLocation",class:"content"},Ne=e("h2",{class:"header"},"contentLocation",-1),Ge=e("p",null," contentLocation will allow you to set the location of where the content section of slim select. By default every content div is appended to the body. ",-1),Ue=e("p",null," The content container is the bottom half of slim select. This includes the search input field and available options ",-1),Ye={class:"row"},We={ref:"contentLocation",style:{width:"50%"}},ze=e("option",{value:"value1"},"Value 1",-1),Fe=e("option",{value:"value2"},"Value 2",-1),Je=e("option",{value:"value3"},"Value 3",-1),Ke=[ze,Fe,Je],Qe={ref:"local"},Xe=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            contentLocation: document.getElementById('local')
          }
        })
      `),t(`
    `)],-1),Ze=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <select id="contentLocation">
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>

        <!-- The content will go in this div -->
        <div id="local"></div>
      `),t(`
    `)],-1);function et(l,n,u,d,p,_){return i(),c("div",Re,[Ne,Ge,Ue,e("div",Ye,[e("select",We,Ke,512),e("div",Qe,null,512)]),Xe,Ze])}const tt=a(Ie,[["render",et]]),ot=s({name:"ContentPosition",mounted(){new o({select:this.$refs.contentPositionRelative,settings:{contentPosition:"relative",contentLocation:this.$refs.contentPositionRelativeContent}}),new o({select:this.$refs.contentPositionAbsolute,settings:{contentPosition:"absolute"}})}});const lt={id:"contentPosition",class:"content"},nt=e("h2",{class:"header"},"contentPosition",-1),st=e("p",null,[t("contentPosition will set the css position to either relative. Default is "),e("b",null,"'absolute'")],-1),at=e("div",{class:"alert info"}," If you do use relative position be sure to set the contentLocation to an element that will work best for your use case. Otherwise SlimSelect will add you content to the body of the html. See example usage below. ",-1),it={class:"row"},ct={ref:"contentPositionRelative",class:"relative"},ut=e("option",{"data-placeholder":"true"},"Relative",-1),dt=e("option",{value:"value1"},"Value 1",-1),pt=e("option",{value:"value2"},"Value 2",-1),_t=e("option",{value:"value3"},"Value 3",-1),ht=[ut,dt,pt,_t],rt={ref:"contentPositionRelativeContent"},vt={ref:"contentPositionAbsolute",class:"absolute"},$t=e("option",{"data-placeholder":"true"},"Absolute",-1),mt=e("option",{value:"value1"},"Value 1",-1),gt=e("option",{value:"value2"},"Value 2",-1),ft=e("option",{value:"value3"},"Value 3",-1),wt=[$t,mt,gt,ft],bt=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
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
    `)],-1);function Vt(l,n,u,d,p,_){return i(),c("div",lt,[nt,st,at,e("div",it,[e("select",ct,ht,512),e("div",rt,null,512),e("select",vt,wt,512)]),bt])}const St=a(ot,[["render",Vt]]),yt=s({name:"Css",mounted(){new o({select:this.$refs.selectClass}),new o({select:this.$refs.optionClass})}});const xt={id:"cssClass",class:"content"},Dt=e("h2",{class:"header"},"css class",-1),Ot=e("p",null," Slim select will inherit any classes that were added to the original select element. This includes options as well. ",-1),Mt={class:"row"},Tt={ref:"selectClass",class:"select-class"},Pt=e("option",{value:"value1"},"Value 1",-1),Ct=e("option",{value:"value2"},"Value 2",-1),Bt=e("option",{value:"value3"},"Value 3",-1),Lt=[Pt,Ct,Bt],Et={ref:"optionClass",class:"option-class"},At=e("option",{class:"red",value:"value1"},"Red",-1),jt=e("option",{class:"green",value:"value2"},"Green",-1),Ht=e("option",{class:"blue",value:"value3"},"Blue",-1),qt=[At,jt,Ht],kt=e("pre",null,[t("        "),e("code",{class:"language-html"},`
          <select id="select-class" class="classItems">
            <option class="red" value="value1">Value 1</option>
            <option class="green" value="value2">Value 2</option>
            <option class="blue" value="value3">Value 3</option>
          </select>
        `),t(`
      `)],-1);function It(l,n,u,d,p,_){return i(),c("div",xt,[Dt,Ot,e("div",Mt,[e("select",Tt,Lt,512),e("select",Et,qt,512)]),kt])}const Rt=a(yt,[["render",It]]),Nt=s({name:"DataAttributes",mounted(){new o({select:this.$refs.optionsSingle}),new o({select:this.$refs.optionsMultiple})}}),Gt={id:"dataAttributes",class:"content"},Ut=e("h2",{class:"header"},"Data Attributes",-1),Yt=e("p",null," Slim select will take on attributes of the original as best as possible. Below are example usages of attributes added to the underlining select options that slim select picked up and used ",-1),Wt={class:"row"},zt={ref:"optionsSingle"},Ft=v('<option data-placeholder="true"></option><option value="value1" data-info="Here is info">Data Attributes</option><option value="value2" disabled>Disabled Option</option><option value="value3" class="green">Class Green</option><option value="value4" style="color:purple;">Inline Style</option>',5),Jt=[Ft],Kt={ref:"optionsMultiple",multiple:""},Qt=e("option",{value:"value1","data-info":"Here is info"},"Data Attributes",-1),Xt=e("option",{value:"value2",disabled:""},"Disabled Option",-1),Zt=e("option",{value:"value3",class:"green"},"Class Green",-1),eo=e("option",{value:"value4",style:{color:"purple"}},"Inline Style",-1),to=[Qt,Xt,Zt,eo];function oo(l,n,u,d,p,_){return i(),c("div",Gt,[Ut,Yt,e("div",Wt,[e("select",zt,Jt,512),e("select",Kt,to,512)])])}const lo=a(Nt,[["render",oo]]),no=s({name:"Deselect",mounted(){new o({select:this.$refs.allowDeselectSingle,settings:{allowDeselect:!0}}),new o({select:this.$refs.allowDeselectMultiple,settings:{allowDeselect:!0}})}}),so={id:"allowDeselect",class:"content"},ao=e("h2",{class:"header"},"allowDeselect",-1),io=e("p",null,"This will allow you to deselect a value on a single/multiple select dropdown.",-1),co=e("p",null,"Be sure to have an empty option data placeholder so slim select has an empty string value to select.",-1),uo={class:"row"},po={ref:"allowDeselectSingle"},_o=e("option",{"data-placeholder":"true"},null,-1),ho=e("option",{value:"value1"},"Value 1",-1),ro=e("option",{value:"value2"},"Value 2",-1),vo=e("option",{value:"value3"},"Value 3",-1),$o=[_o,ho,ro,vo],mo={ref:"allowDeselectMultiple",multiple:""},go=e("option",{"data-placeholder":"true"},null,-1),fo=e("option",{value:"value1"},"Value 1",-1),wo=e("option",{value:"value2"},"Value 2",-1),bo=e("option",{value:"value3"},"Value 3",-1),Vo=[go,fo,wo,bo],So=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            allowDeselect: true
          }
        })
      `),t(`
    `)],-1),yo=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <!-- Requires emtpy data-placeholder option -->
        <select id="allowDeselect">
          <option data-placeholder="true"></option>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      `),t(`
    `)],-1);function xo(l,n,u,d,p,_){return i(),c("div",so,[ao,io,co,e("div",uo,[e("select",po,$o,512),e("select",mo,Vo,512)]),So,yo])}const Do=a(no,[["render",xo]]),Oo=s({name:"Display",mounted(){const l=new o({select:this.$refs.selectdisplay}),n=[{value:"value1",text:"Value 1",display:!1},{value:"value2",text:"Value 2"},{value:"value3",text:"Value 3"}];l.setData(n),l.setSelected(["value1","value3"]),new o({select:this.$refs.selectdisplay2})}}),Mo={id:"display",class:"content"},To=e("h2",{class:"header"},"display",-1),Po=e("p",null,"Allows to hide elements of selected values.",-1),Co={class:"row"},Bo={ref:"selectdisplay",multiple:""},Lo=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
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
    `)],-1),Eo=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <select id="selectMultiMandatory" multiple></select>
      `),t(`
    `)],-1),Ao=e("p",null,"Or",-1),jo={class:"row"},Ho={ref:"selectdisplay2",multiple:""},qo=e("option",{value:"value1",style:{display:"none"},selected:""},"Value 1",-1),ko=e("option",{value:"value2",selected:""},"Value 2",-1),Io=e("option",{value:"value3"},"Value 3",-1),Ro=[qo,ko,Io],No=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        const slim = new SlimSelect({
          select: '#selectElement'
        });
      `),t(`
    `)],-1),Go=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <select id="selectdisplay2" multiple>
          <option value="value1" style="display: none;" selected>Value 1</option>
          <option value="value2" selected>Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      `),t(`
    `)],-1);function Uo(l,n,u,d,p,_){return i(),c("div",Mo,[To,Po,e("div",Co,[e("select",Bo,null,512)]),Lo,Eo,Ao,e("div",jo,[e("select",Ho,Ro,512)]),No,Go])}const Yo=a(Oo,[["render",Uo]]),Wo=s({name:"Disabled",mounted(){new o({select:this.$refs.disabledSingle,settings:{disabled:!0}}),new o({select:this.$refs.disabledMultiple}),new o({select:this.$refs.disabledOptionSingle,data:[{text:"Option 1",value:"option1"},{text:"Option 2",value:"option2",disabled:!0},{text:"Option 3",value:"option3"}]}),new o({select:this.$refs.disabledOptionMultiple}),new o({select:this.$refs.disabledDynamicSingle}).select.showUI()},methods:{enableDisableDynamic(){const l=this.$refs.disabledDynamicSingle;l&&(l.disabled=!l.disabled)}}}),zo={id:"disabled",class:"content"},Fo=e("h2",{class:"header"},"disabled",-1),Jo=e("p",null,"Allows the ability to disable the select dropdown as well as individual options",-1),Ko=e("div",{class:"alert info"},"Methods also are provided to enable and disable SlimSelect via method call.",-1),Qo={class:"row"},Xo={ref:"disabledSingle"},Zo=e("option",{value:"value1",selected:""},"Value 1",-1),el=e("option",{value:"value2"},"Value 2",-1),tl=e("option",{value:"value3"},"Value 3",-1),ol=[Zo,el,tl],ll={ref:"disabledMultiple",multiple:"",disabled:""},nl=e("option",{value:"value1",selected:""},"Value 1",-1),sl=e("option",{value:"value2"},"Value 2",-1),al=e("option",{value:"value3"},"Value 3",-1),il=[nl,sl,al],cl=e("br",null,null,-1),ul={class:"row"},dl={ref:"disabledOptionSingle"},pl=e("option",{value:"value1",selected:""},"Value 1",-1),_l=e("option",{value:"value2"},"Value 2",-1),hl=e("option",{value:"value3"},"Value 3",-1),rl=[pl,_l,hl],vl={ref:"disabledOptionMultiple",multiple:""},$l=e("option",{value:"value1",selected:""},"Value 1",-1),ml=e("option",{value:"value2",disabled:""},"Value 2",-1),gl=e("option",{value:"value3"},"Value 3",-1),fl=[$l,ml,gl],wl=e("br",null,null,-1),bl={class:"row"},Vl={ref:"disabledDynamicSingle"},Sl=e("option",{value:"value1"},"Value 1",-1),yl=e("option",{value:"value2"},"Value 2",-1),xl=e("option",{value:"value3"},"Value 3",-1),Dl=[Sl,yl,xl],Ol=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
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
    `)],-1),Ml=e("pre",null,[t("      "),e("code",{class:"language-html"},`
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
    `)],-1);function Tl(l,n,u,d,p,_){return i(),c("div",zo,[Fo,Jo,Ko,e("div",Qo,[e("select",Xo,ol,512),e("select",ll,il,512)]),cl,e("div",ul,[e("select",dl,rl,512),e("select",vl,fl,512)]),wl,e("div",bl,[e("div",{class:"btn",onClick:n[0]||(n[0]=(...$)=>l.enableDisableDynamic&&l.enableDisableDynamic(...$))},"Enable/Disable Original Select"),e("select",Vl,Dl,512)]),Ol,Ml])}const Pl=a(Wo,[["render",Tl]]),Cl=s({name:"HideSelected",mounted(){new o({select:this.$refs.hideSelectedSingle,settings:{hideSelected:!0}}),new o({select:this.$refs.hideSelectedMultiple,settings:{hideSelected:!0}})}}),Bl={id:"hideSelected",class:"content"},Ll=e("h2",{class:"header"},"hideSelected",-1),El=e("p",null,"hideSelected setting is used to hide the current selected option in the options dropdown.",-1),Al={class:"row"},jl={ref:"hideSelectedSingle"},Hl=e("option",{"data-placeholder":"true"},null,-1),ql=e("option",{value:"value1"},"Value 1",-1),kl=e("option",{value:"value2"},"Value 2",-1),Il=e("option",{value:"value3"},"Value 3",-1),Rl=[Hl,ql,kl,Il],Nl={ref:"hideSelectedMultiple",multiple:""},Gl=e("option",{value:"value1"},"Value 1",-1),Ul=e("option",{value:"value2"},"Value 2",-1),Yl=e("option",{value:"value3"},"Value 3",-1),Wl=[Gl,Ul,Yl],zl=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
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
    `)],-1);function Jl(l,n,u,d,p,_){return i(),c("div",Bl,[Ll,El,e("div",Al,[e("select",jl,Rl,512),e("select",Nl,Wl,512)]),zl,Fl])}const Kl=a(Cl,[["render",Jl]]),Ql=s({name:"MaxValuesShown",mounted(){new o({select:this.$refs.maxValuesShown,settings:{maxValuesShown:5,maxValuesMessage:"{number} selected",allowDeselect:!0}})}}),Xl={id:"maxValuesShown",class:"content"},Zl=e("h2",{class:"header"},"maxValuesShown",-1),en=e("p",null," When using multiselect you can set a threshold so when selecting more items than the input value, the items will not display as values, but the 'n selected' will be displayed. The text that will be displayed can be customized with the use of '{number}' in the maxValuesMessage setting. ",-1),tn=e("p",null,[e("strong",null,"Default:"),t(" 20")],-1),on={class:"row"},ln={ref:"maxValuesShown",multiple:""},nn=v('<option value="value1" selected>Value 1</option><option value="value2" selected>Value 2</option><option value="value3" selected>Value 3</option><option value="value4" selected>Value 4</option><option value="value5" selected>Value 5</option><option value="value6" selected>Value 6</option><option value="value7">Value 7</option><option value="value8">Value 8</option>',8),sn=[nn],an=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            maxValuesShown: 5, // Default 20
            maxValuesMessage: '{number} values selected', // Default '{number} selected'
          },
        });
      `),t(`
    `)],-1),cn=e("pre",null,[t("      "),e("code",{class:"language-html"},`
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
    `)],-1);function un(l,n,u,d,p,_){return i(),c("div",Xl,[Zl,en,tn,e("div",on,[e("select",ln,sn,512)]),an,cn])}const dn=a(Ql,[["render",un]]),pn=s({name:"Html",mounted(){new o({select:this.$refs.htmlSingle,settings:{searchHighlight:!0},data:[{html:"<b>Bold Text</b>",text:"Bold Text",value:"bold text"},{html:'<div style="border: solid 1px #666666;">Border</div>',text:"Border",value:"border"},{html:"<i>Slim Select is awesome</i>",text:"Slim Select is awesome"}]}),new o({select:this.$refs.htmlMulti,settings:{searchHighlight:!0}})}}),_n={id:"html",class:"content"},hn=e("h2",{class:"header"},"html",-1),rn=e("p",null," Slim select has the ability to set custom html for the selected values and options dropdown. By default if the html field is set it will use that for the selected values and the options dropdown. For a multiple select selected values it will always use the text field. ",-1),vn={class:"row"},$n={ref:"htmlSingle"},mn={ref:"htmlMulti",multiple:""},gn=e("option",{value:"bold text","data-html":"<b>Bold Text</b>"},"Bold Text",-1),fn=e("option",{value:"border","data-html":"<div style='border: solid 1px #666666;'>Border</div>"},"Border",-1),wn=e("option",{value:"slim select","data-html":"<i>Slim Select is awesome</i>"},"Slim Select is awesome",-1),bn=[gn,fn,wn],Vn=e("h3",null,"Via data",-1),Sn=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        var select = new SlimSelect({
          select: '#selectElement',
          data: [
            {html: '<b>Bold Text</b>', text: 'Bold Text', value: 'bold text'},
            {html: '<div style="border: solid 1px #666666;">Border</div>', text: 'Border', value: 'border'},
            {html: '<i>Slim Select is awesome</i>', text: 'Slim Select is awesome'}
          ]
        })
      `),t(`
    `)],-1),yn=e("h3",null,"Via data attribute",-1),xn=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <select id="selectElement">
          <option value="bold text" data-html="<b>Bold Text</b>">Bold Text</option>
          <option value="border" data-html="<div style="border: solid 1px #666666;">Border</div>">Border</option>
          <option value="slim select" data-html="<i>Slim Select is awesome</i>">Slim Select awesome</option>
        </select>
      `),t(`
    `)],-1);function Dn(l,n,u,d,p,_){return i(),c("div",_n,[hn,rn,e("div",vn,[e("select",$n,null,512),e("select",mn,bn,512)]),Vn,Sn,yn,xn])}const On=a(pn,[["render",Dn]]),Mn=s({name:"Mandatory",mounted(){const l=new o({select:this.$refs.selectMultiMandatory}),n=[{value:"value1",text:"Value 1",mandatory:!0},{value:"value2",text:"Value 2"},{value:"value3",text:"Value 3"}];l.setData(n),l.setSelected(["value1","value3"]),new o({select:this.$refs.selectMultiMandatory2})}}),Tn={id:"mandatory",class:"content"},Pn=e("h2",{class:"header"},"mandatory",-1),Cn=e("p",null," When using multi select you can set a mandatory on the option to prevent capability to deselect particular option. Note options with mandatory flag is not selected by default, you need select them yourselfs. ",-1),Bn={class:"row"},Ln={ref:"selectMultiMandatory",multiple:""},En=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
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
    `)],-1),An=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <select id="selectMultiMandatory" multiple></select>
      `),t(`
    `)],-1),jn=e("p",null,"Or",-1),Hn={class:"row"},qn={ref:"selectMultiMandatory2",multiple:""},kn=e("option",{value:"value1","data-mandatory":"true",selected:""},"Value 1",-1),In=e("option",{value:"value2",selected:""},"Value 2",-1),Rn=e("option",{value:"value3"},"Value 3",-1),Nn=[kn,In,Rn],Gn=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        const slim = new SlimSelect({
          select: '#selectElement'
        });
      `),t(`
    `)],-1),Un=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <select id="selectMultiMandatory" multiple>
          <option value="value1" data-mandatory="true" selected>Value 1</option>
          <option value="value2" selected>Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      `),t(`
    `)],-1);function Yn(l,n,u,d,p,_){return i(),c("div",Tn,[Pn,Cn,e("div",Bn,[e("select",Ln,null,512)]),En,An,jn,e("div",Hn,[e("select",qn,Nn,512)]),Gn,Un])}const Wn=a(Mn,[["render",Yn]]),zn=s({name:"MinMax",mounted(){new o({select:this.$refs.selectMultiMax,settings:{allowDeselect:!0,closeOnSelect:!1,minSelected:2,maxSelected:5},events:{addable:l=>l}})}}),Fn={id:"minmax",class:"content"},Jn=e("h2",{class:"header"},"Min/Max Selected",-1),Kn=e("p",null,"When using multi select you can set a min and/or max on the amount of selections you can have.",-1),Qn={class:"row"},Xn={ref:"selectMultiMax",multiple:""},Zn=v('<option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option>',6),es=[Zn],ts=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        let slim = new SlimSelect({
          select: '#selectElement',
          settings: {
            minSelected: 2,
            maxSelected: 5,
          },
        })
      `),t(`
    `)],-1),os=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <select id="selectMultiMax" multiple>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
          <option value="value4">Value 4</option>
          <option value="value5">Value 5</option>
          <option value="value6">Value 6</option>
        </select>
      `),t(`
    `)],-1);function ls(l,n,u,d,p,_){return i(),c("div",Fn,[Jn,Kn,e("div",Qn,[e("select",Xn,es,512)]),ts,os])}const ns=a(zn,[["render",ls]]),ss=s({name:"OpenPosition",mounted(){new o({select:this.$refs.openPositionUp,settings:{openPosition:"up"}}),new o({select:this.$refs.openPositionDown,settings:{openPosition:"down"}})}}),as={id:"openPosition",class:"content"},is=e("h2",{class:"header"},"openPosition",-1),cs=e("p",null," openPosition is a string value that will decide where to show your content when it comes out. By default slim select will try to put the content where it can without going off screen. But you may want to always show it in one direction. ",-1),us=e("p",null,[t("Possible Options: "),e("b",null,"'auto', 'up' or 'down'"),t(". Default is "),e("b",null,"'auto'")],-1),ds={class:"row"},ps={ref:"openPositionUp"},_s=e("option",{value:"up1"},"Up 1",-1),hs=e("option",{value:"up2"},"Up 2",-1),rs=e("option",{value:"up3"},"Up 3",-1),vs=[_s,hs,rs],$s={ref:"openPositionDown"},ms=e("option",{value:"down1"},"Down 1",-1),gs=e("option",{value:"down2"},"Down 2",-1),fs=e("option",{value:"down3"},"Down 3",-1),ws=[ms,gs,fs],bs=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            openPosition: 'auto' // 'auto', 'up' or 'down'
          }
        })
      `),t(`
    `)],-1);function Vs(l,n,u,d,p,_){return i(),c("div",as,[is,cs,us,e("div",ds,[e("select",ps,vs,512),e("select",$s,ws,512)]),bs])}const Ss=a(ss,[["render",Vs]]),ys=s({name:"Placeholder",mounted(){new o({select:this.$refs.placeholderSingle,settings:{placeholderText:"Custom Placeholder Text"}}),new o({select:this.$refs.placeholderMultiple,settings:{placeholderText:"Custom Placeholder Text"}}),new o({select:this.$refs.placeholderNone,settings:{placeholderText:""}})}}),xs={id:"placeholder",class:"content"},Ds=e("h2",{class:"header"},"placeholderText",-1),Os=e("p",null,' Placeholders consists of setting the placeholder option value. The only difference is single selects require an empty option with data-placeholder set to true. Default value is "Select Value". ',-1),Ms=e("div",{class:"alert info"}," Notice you can also set placeholder to empty if that is what you would like to do as well. ",-1),Ts={class:"row"},Ps={ref:"placeholderSingle"},Cs=e("option",{"data-placeholder":"true"},null,-1),Bs=e("option",{value:"value1"},"Value 1",-1),Ls=e("option",{value:"value2"},"Value 2",-1),Es=e("option",{value:"value3"},"Value 3",-1),As=[Cs,Bs,Ls,Es],js={ref:"placeholderMultiple",multiple:""},Hs=e("option",{value:"value1"},"Value 1",-1),qs=e("option",{value:"value2"},"Value 2",-1),ks=e("option",{value:"value3"},"Value 3",-1),Is=[Hs,qs,ks],Rs={ref:"placeholderNone"},Ns=e("option",{"data-placeholder":"true"},null,-1),Gs=e("option",{value:"value1"},"Value 1",-1),Us=e("option",{value:"value2"},"Value 2",-1),Ys=e("option",{value:"value3"},"Value 3",-1),Ws=[Ns,Gs,Us,Ys],zs=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#placeholder',
          settings: {
            placeholderText: 'Custom Placeholder Text',
          }
        })
      `),t(`
    `)],-1),Fs=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <!-- Set empty option with data-placeholder if you to have placeholder -->
        <!-- text for single select, otherwise first option will be selected -->
        <select id="placeholderSingle">
          <option data-placeholder="true"></option>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      `),t(`
    `)],-1);function Js(l,n,u,d,p,_){return i(),c("div",xs,[Ds,Os,Ms,e("div",Ts,[e("select",Ps,As,512),e("select",js,Is,512),e("select",Rs,Ws,512)]),zs,Fs])}const Ks=a(ys,[["render",Js]]),Qs=s({name:"Search",mounted(){new o({select:this.$refs.showSearchSingle,settings:{showSearch:!1}}),new o({select:this.$refs.searchTextSingle,settings:{searchText:"Sorry, nothing to see here"}}),new o({select:this.$refs.searchPlaceholderSingle,settings:{searchPlaceholder:"Search for the good stuff!"}}),new o({select:this.$refs.searchHighlightSingle,settings:{searchHighlight:!0}}),new o({select:this.$refs.showSearchMulti,settings:{showSearch:!1}}),new o({select:this.$refs.searchTextMulti,settings:{searchText:"Sorry nothing to see here"}}),new o({select:this.$refs.searchPlaceholderMulti,settings:{searchPlaceholder:"Search for the good stuff!"}}),new o({select:this.$refs.searchHighlightMulti,settings:{searchHighlight:!0}})}}),Xs={id:"search",class:"content"},Zs=v('<h2 class="header">showSearch / searchText / searchingText / searchHighlight</h2><p><b>showSearch</b> - is a boolean value that will decide whether or not to show the search. Default is true.</p><p><b>searchText</b> - is a string value that will show in the event there are no results. Default is &#39;No Results&#39;. </p><p><b>searchingText</b> - is a string value that will show during an fetch search request. Default is &#39;Searching...&#39;. </p><p><b>searchPlaceholder</b> - is a string value that will set the value of the input search placeholder text. Default is &#39;Search&#39;. </p><p><b>searchHighlight</b> - is a boolean value that will highlight search results. Default is false.</p>',6),ea={class:"row",style:{padding:"0 0 var(--spacing-half) 0"}},ta={ref:"showSearchSingle"},oa=e("option",{value:"dog"},"Dog",-1),la=e("option",{value:"cat"},"Cat",-1),na=e("option",{value:"bird"},"Bird",-1),sa=[oa,la,na],aa={ref:"searchTextSingle"},ia=e("option",{value:"dog"},"Dog",-1),ca=e("option",{value:"cat"},"Cat",-1),ua=e("option",{value:"bird"},"Bird",-1),da=[ia,ca,ua],pa={ref:"searchPlaceholderSingle"},_a=e("option",{value:"dog"},"Dog",-1),ha=e("option",{value:"cat"},"Cat",-1),ra=e("option",{value:"bird"},"Bird",-1),va=[_a,ha,ra],$a={ref:"searchHighlightSingle"},ma=e("option",{value:"dog"},"Dog",-1),ga=e("option",{value:"cat"},"Cat",-1),fa=e("option",{value:"bird"},"Bird",-1),wa=[ma,ga,fa],ba={class:"row"},Va={ref:"showSearchMulti",multiple:""},Sa=e("option",{value:"dog"},"Dog",-1),ya=e("option",{value:"cat"},"Cat",-1),xa=e("option",{value:"bird"},"Bird",-1),Da=[Sa,ya,xa],Oa={ref:"searchTextMulti",multiple:""},Ma=e("option",{value:"dog"},"Dog",-1),Ta=e("option",{value:"cat"},"Cat",-1),Pa=e("option",{value:"bird"},"Bird",-1),Ca=[Ma,Ta,Pa],Ba={ref:"searchPlaceholderMulti",multiple:""},La=e("option",{value:"dog"},"Dog",-1),Ea=e("option",{value:"cat"},"Cat",-1),Aa=e("option",{value:"bird"},"Bird",-1),ja=[La,Ea,Aa],Ha={ref:"searchHighlightMulti",multiple:""},qa=e("option",{value:"dog"},"Dog",-1),ka=e("option",{value:"cat"},"Cat",-1),Ia=e("option",{value:"bird"},"Bird",-1),Ra=[qa,ka,Ia],Na=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
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
    `)],-1);function Ga(l,n,u,d,p,_){return i(),c("div",Xs,[Zs,e("div",ea,[e("select",ta,sa,512),e("select",aa,da,512),e("select",pa,va,512),e("select",$a,wa,512)]),e("div",ba,[e("select",Va,Da,512),e("select",Oa,Ca,512),e("select",Ba,ja,512),e("select",Ha,Ra,512)]),Na])}const Ua=a(Qs,[["render",Ga]]),Ya=s({name:"Select"}),Wa={id:"select",class:"content"},za=e("h2",{class:"header"},"select",-1),Fa=e("p",null," The select field is used to identify the select element that will be used to create slim select. You can use any value you normally would in a querySelector or pass the element directly. ",-1),Ja=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
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
    `)],-1),Ka=[za,Fa,Ja];function Qa(l,n,u,d,p,_){return i(),c("div",Wa,Ka)}const Xa=a(Ya,[["render",Qa]]),Za=s({name:"SelectAll",mounted(){new o({select:this.$refs.selectAll})}}),ei={id:"selectAll",class:"content"},ti=e("h2",{class:"header"},"selectAll",-1),oi=e("p",null," selectAll is a setting that can be used to add a select all action to an optgroup. This setting can be set to true or false. If set to true, a select all option will be added to the top of the selected values. If set to false or not set at all, no select all action will be added to the optgroup. ",-1),li=e("div",{class:"alert info"},"You can set selectAll either by data or by html dataset added to the optgroup element",-1),ni={ref:"selectAll",multiple:""},si=v('<optgroup label="Label 1" data-selectall="true"><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></optgroup><optgroup label="Label 2"><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option></optgroup>',2),ai=[si],ii=e("br",null,null,-1),ci=e("h3",null,"Via data",-1),ui=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
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
    `)],-1),di=e("br",null,null,-1),pi=e("h3",null,"Via html",-1),_i=e("pre",null,[t("      "),e("code",{class:"language-html"},`
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
    `)],-1);function hi(l,n,u,d,p,_){return i(),c("div",ei,[ti,oi,li,e("select",ni,ai,512),ii,ci,ui,di,pi,_i])}const ri=a(Za,[["render",hi]]),vi=s({name:"ShowTooltip",mounted(){new o({select:this.$refs.showOptionTooltips,settings:{showOptionTooltips:!0}})}}),$i={id:"showOptionTooltips",class:"content"},mi=e("h2",{class:"header"},"showOptionTooltips",-1),gi=e("p",null," showOptionTooltips option is used to active displaying the on-hover tooltips for select options. The tooltip text is equal to the option text content. ",-1),fi={ref:"showOptionTooltips"},wi=e("option",{value:"value1"},"Value 1",-1),bi=e("option",{value:"value2"},"Value 2",-1),Vi=e("option",{value:"value3"},"Value 3",-1),Si=[wi,bi,Vi],yi=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            showOptionTooltips: true,
          }
        })
      `),t(`
    `)],-1);function xi(l,n,u,d,p,_){return i(),c("div",$i,[mi,gi,e("select",fi,Si,512),yi])}const Di=a(vi,[["render",xi]]),Oi=s({name:"Styles",mounted(){new o({select:this.$refs.selectStyle}),new o({select:this.$refs.optionStyle})}}),Mi={id:"inlineStyles",class:"content"},Ti=e("h2",{class:"header"},"inline styles",-1),Pi=e("p",null," Slim select will inherit any styles that were added to the original select element. This includes options as well. ",-1),Ci={class:"row"},Bi={ref:"selectStyle",style:{color:"red"}},Li=e("option",{value:"value1"},"Value 1",-1),Ei=e("option",{value:"value2"},"Value 2",-1),Ai=e("option",{value:"value3"},"Value 3",-1),ji=[Li,Ei,Ai],Hi={ref:"optionStyle"},qi=e("option",{style:{color:"red"},value:"value1"},"Red",-1),ki=e("option",{style:{color:"green"}},"Green",-1),Ii=e("option",{style:{color:"blue"}},"Blue",-1),Ri=[qi,ki,Ii],Ni=e("pre",null,[t("      "),e("code",{class:"language-html"},`
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
    `)],-1);function Gi(l,n,u,d,p,_){return i(),c("div",Mi,[Ti,Pi,e("div",Ci,[e("select",Bi,ji,512),e("select",Hi,Ri,512)]),Ni])}const Ui=a(Oi,[["render",Gi]]),Yi=s({name:"Settings",components:{Select:Xa,AlwaysOpen:ie,ContentLocation:tt,ContentPosition:St,OpenPosition:Ss,Placeholder:Ks,Deselect:Do,Display:Yo,Disabled:Pl,Mandatory:Wn,MinMax:ns,DataAttributes:lo,MaxValuesShown:dn,Css:Rt,Styles:Ui,Html:On,Search:Ua,CloseOnSelect:ke,ShowTooltip:Di,SelectAll:ri,Closable:xe,HideSelected:Kl}}),Wi={id:"settings",class:"contents"};function zi(l,n,u,d,p,_){const $=h("Select"),m=h("AlwaysOpen"),g=h("ContentLocation"),f=h("ContentPosition"),w=h("OpenPosition"),b=h("Placeholder"),V=h("Deselect"),S=h("Display"),y=h("Disabled"),x=h("Mandatory"),D=h("MinMax"),O=h("DataAttributes"),M=h("Css"),T=h("Styles"),P=h("Html"),C=h("Search"),B=h("CloseOnSelect"),L=h("ShowTooltip"),E=h("SelectAll"),A=h("Closable"),j=h("HideSelected"),H=h("MaxValuesShown");return i(),c("div",Wi,[r($),r(m),r(g),r(f),r(w),r(b),r(V),r(S),r(y),r(x),r(D),r(O),r(M),r(T),r(P),r(C),r(B),r(L),r(E),r(A),r(j),r(H)])}const Ji=a(Yi,[["render",zi]]);export{Ji as default};
