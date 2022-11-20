import{d as l,S as o,_ as i,o as a,c,a as e,f as t,b as v,g as r,h as p}from"./index.js";const j=l({name:"AlwaysOpen",mounted(){new o({select:this.$refs.alwaysOpenSingle,settings:{alwaysOpen:!0,contentLocation:this.$refs.alwaysOpenSingleContent,contentPosition:"relative"}}),new o({select:this.$refs.alwaysOpenMultiple,settings:{alwaysOpen:!0,contentLocation:this.$refs.alwaysOpenMultipleContent,contentPosition:"relative"}})}}),L={id:"alwaysOpen",class:"content"},G=e("h2",{class:"header"},"alwaysOpen",-1),A=e("p",null," alwaysOpen option is used to keep the select open at all times. This is useful for when you want to display the options at all times. ",-1),I={class:"row"},R={style:{height:"auto"}},k={ref:"alwaysOpenSingle"},q=e("option",{value:"value1"},"Value 1",-1),N=e("option",{value:"value2"},"Value 2",-1),U=e("option",{value:"value3"},"Value 3",-1),W=[q,N,U],Y={ref:"alwaysOpenSingleContent"},F={style:{height:"auto"}},z={ref:"alwaysOpenMultiple",multiple:""},J=e("option",{value:"value1"},"Value 1",-1),K=e("option",{value:"value2"},"Value 2",-1),Q=e("option",{value:"value3"},"Value 3",-1),X=e("option",{value:"value4"},"Value 4",-1),Z=[J,K,Q,X],ee={ref:"alwaysOpenMultipleContent"},te=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
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
    `)],-1),oe=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <select id="selectElement">
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>

        <!-- The content will go in this div -->
        <div id="local"></div>
      `),t(`
    `)],-1);function se(s,n,u,d,_,h){return a(),c("div",L,[G,A,e("div",I,[e("div",R,[e("select",k,W,512),e("div",Y,null,512)]),e("div",F,[e("select",z,Z,512),e("div",ee,null,512)])]),te,oe])}const ne=i(j,[["render",se]]),le=l({name:"CloseOnSelect",mounted(){new o({select:this.$refs.closeOnSelectSingle,settings:{closeOnSelect:!1}}),new o({select:this.$refs.closeOnSelectMultiple,settings:{closeOnSelect:!1,selectByGroup:!0}})}}),ie={id:"closeOnSelect",class:"content"},ae=e("h2",{class:"header"},"closeOnSelect",-1),ce=e("p",null," closeOnSelect is a boolean value in which determines whether or not to close the content area upon selecting a value. ",-1),ue={class:"row"},de={ref:"closeOnSelectSingle"},_e=v('<option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option><optgroup label="Super Values"><option value="value11">Value 1</option><option value="value22">Value 2</option><option value="value33">Value 3</option></optgroup>',4),he=[_e],re={ref:"closeOnSelectMultiple",multiple:""},pe=v('<option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option><optgroup label="Super Values"><option value="value11">Value 1</option><option value="value22">Value 2</option><option value="value33">Value 3</option></optgroup>',4),ve=[pe],$e=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#search',
          settings: {
            closeOnSelect: false,
          },
        })
      `),t(`
    `)],-1);function me(s,n,u,d,_,h){return a(),c("div",ie,[ae,ce,e("div",ue,[e("select",de,he,512),e("select",re,ve,512)]),$e])}const ge=i(le,[["render",me]]),fe=l({name:"ContentLocation",mounted(){new o({select:this.$refs.contentLocation,settings:{contentLocation:this.$refs.local}})}}),we={id:"contentLocation",class:"content"},Se=e("h2",{class:"header"},"contentLocation",-1),ye=e("p",null," contentLocation will allow you to set the location of where the content section of slim select. By default every content div is appended to the body. ",-1),Ve=e("p",null," The content container is the bottom half of slim select. This includes the search input field and available options ",-1),be={class:"row"},xe={ref:"contentLocation",style:{width:"50%"}},Me=e("option",{value:"value1"},"Value 1",-1),De=e("option",{value:"value2"},"Value 2",-1),Oe=e("option",{value:"value3"},"Value 3",-1),Pe=[Me,De,Oe],Be={ref:"local"},Te=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            contentLocation: document.getElementById('local')
          }
        })
      `),t(`
    `)],-1),Ce=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <select id="contentLocation">
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>

        <!-- The content will go in this div -->
        <div id="local"></div>
      `),t(`
    `)],-1);function He(s,n,u,d,_,h){return a(),c("div",we,[Se,ye,Ve,e("div",be,[e("select",xe,Pe,512),e("div",Be,null,512)]),Te,Ce])}const Ee=i(fe,[["render",He]]),je=l({name:"ContentPosition",mounted(){new o({select:this.$refs.contentPositionRelative,settings:{contentPosition:"relative",contentLocation:this.$refs.contentPositionRelativeContent}}),new o({select:this.$refs.contentPositionAbsolute,settings:{contentPosition:"absolute"}})}});const Le={id:"contentPosition",class:"content"},Ge=e("h2",{class:"header"},"contentPosition",-1),Ae=e("p",null,[t("contentPosition will set the css position to either relative. Default is "),e("b",null,"'absolute'")],-1),Ie=e("div",{class:"alert info"}," If you do use relative position be sure to set the contentLocation to an element that will work best for your use case. Otherwise SlimSelect will add you content to the body of the html. See example usage below. ",-1),Re={class:"row"},ke={ref:"contentPositionRelative",class:"relative"},qe=e("option",{"data-placeholder":"true"},"Relative",-1),Ne=e("option",{value:"value1"},"Value 1",-1),Ue=e("option",{value:"value2"},"Value 2",-1),We=e("option",{value:"value3"},"Value 3",-1),Ye=[qe,Ne,Ue,We],Fe={ref:"contentPositionRelativeContent"},ze={ref:"contentPositionAbsolute",class:"absolute"},Je=e("option",{"data-placeholder":"true"},"Absolute",-1),Ke=e("option",{value:"value1"},"Value 1",-1),Qe=e("option",{value:"value2"},"Value 2",-1),Xe=e("option",{value:"value3"},"Value 3",-1),Ze=[Je,Ke,Qe,Xe],et=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
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
    `)],-1);function tt(s,n,u,d,_,h){return a(),c("div",Le,[Ge,Ae,Ie,e("div",Re,[e("select",ke,Ye,512),e("div",Fe,null,512),e("select",ze,Ze,512)]),et])}const ot=i(je,[["render",tt]]),st=l({name:"Css",mounted(){new o({select:this.$refs.selectClass}),new o({select:this.$refs.optionClass})}});const nt={id:"cssClass",class:"content"},lt=e("h2",{class:"header"},"css class",-1),it=e("p",null," Slim select will inherit any classes that were added to the original select element. This includes options as well. ",-1),at={class:"row"},ct={ref:"selectClass",class:"select-class"},ut=e("option",{value:"value1"},"Value 1",-1),dt=e("option",{value:"value2"},"Value 2",-1),_t=e("option",{value:"value3"},"Value 3",-1),ht=[ut,dt,_t],rt={ref:"optionClass",class:"option-class"},pt=e("option",{class:"red",value:"value1"},"Red",-1),vt=e("option",{class:"green",value:"value2"},"Green",-1),$t=e("option",{class:"blue",value:"value3"},"Blue",-1),mt=[pt,vt,$t],gt=e("pre",null,[t("        "),e("code",{class:"language-html"},`
          <select id="select-class" class="classItems">
            <option class="red" value="value1">Value 1</option>
            <option class="green" value="value2">Value 2</option>
            <option class="blue" value="value3">Value 3</option>
          </select>
        `),t(`
      `)],-1);function ft(s,n,u,d,_,h){return a(),c("div",nt,[lt,it,e("div",at,[e("select",ct,ht,512),e("select",rt,mt,512)]),gt])}const wt=i(st,[["render",ft]]),St=l({name:"DataAttributes",mounted(){new o({select:this.$refs.optionsSingle}),new o({select:this.$refs.optionsMultiple})}}),yt={id:"dataAttributes",class:"content"},Vt=e("h2",{class:"header"},"Data Attributes",-1),bt=e("p",null," Slim select will take on attributes of the original as best as possible. Below are example usages of attributes added to the underlining select options that slim select picked up and used ",-1),xt={class:"row"},Mt={ref:"optionsSingle"},Dt=v('<option data-placeholder="true"></option><option value="value1" data-info="Here is info">Data Attributes</option><option value="value2" disabled>Disabled Option</option><option value="value3" class="green">Class Green</option><option value="value4" style="color:purple;">Inline Style</option>',5),Ot=[Dt],Pt={ref:"optionsMultiple",multiple:""},Bt=e("option",{value:"value1","data-info":"Here is info"},"Data Attributes",-1),Tt=e("option",{value:"value2",disabled:""},"Disabled Option",-1),Ct=e("option",{value:"value3",class:"green"},"Class Green",-1),Ht=e("option",{value:"value4",style:{color:"purple"}},"Inline Style",-1),Et=[Bt,Tt,Ct,Ht];function jt(s,n,u,d,_,h){return a(),c("div",yt,[Vt,bt,e("div",xt,[e("select",Mt,Ot,512),e("select",Pt,Et,512)])])}const Lt=i(St,[["render",jt]]),Gt=l({name:"Deselect",mounted(){new o({select:this.$refs.allowDeselectSingle,settings:{allowDeselect:!0}}),new o({select:this.$refs.allowDeselectMultiple,settings:{allowDeselect:!0}})}}),At={id:"allowDeselect",class:"content"},It=e("h2",{class:"header"},"allowDeselect",-1),Rt=e("p",null,"This will allow you to deselect a value on a single/multiple select dropdown.",-1),kt=e("p",null,"Be sure to have an empty option data placeholder so slim select has an empty string value to select.",-1),qt={class:"row"},Nt={ref:"allowDeselectSingle"},Ut=e("option",{"data-placeholder":"true"},null,-1),Wt=e("option",{value:"value1"},"Value 1",-1),Yt=e("option",{value:"value2"},"Value 2",-1),Ft=e("option",{value:"value3"},"Value 3",-1),zt=[Ut,Wt,Yt,Ft],Jt={ref:"allowDeselectMultiple",multiple:""},Kt=e("option",{"data-placeholder":"true"},null,-1),Qt=e("option",{value:"value1"},"Value 1",-1),Xt=e("option",{value:"value2"},"Value 2",-1),Zt=e("option",{value:"value3"},"Value 3",-1),eo=[Kt,Qt,Xt,Zt],to=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            allowDeselect: true
          }
        })
      `),t(`
    `)],-1),oo=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <!-- Requires emtpy data-placeholder option -->
        <select id="allowDeselect">
          <option data-placeholder="true"></option>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      `),t(`
    `)],-1);function so(s,n,u,d,_,h){return a(),c("div",At,[It,Rt,kt,e("div",qt,[e("select",Nt,zt,512),e("select",Jt,eo,512)]),to,oo])}const no=i(Gt,[["render",so]]),lo=l({name:"Display",mounted(){const s=new o({select:this.$refs.selectdisplay}),n=[{value:"value1",text:"Value 1",display:!1},{value:"value2",text:"Value 2"},{value:"value3",text:"Value 3"}];s.setData(n),s.setSelected(["value1","value3"]),new o({select:this.$refs.selectdisplay2})}}),io={id:"display",class:"content"},ao=e("h2",{class:"header"},"display",-1),co=e("p",null,"Allows to hide elements of selected values.",-1),uo={class:"row"},_o={ref:"selectdisplay",multiple:""},ho=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
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
    `)],-1),ro=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <select id="selectMultiMandatory" multiple></select>
      `),t(`
    `)],-1),po=e("p",null,"Or",-1),vo={class:"row"},$o={ref:"selectdisplay2",multiple:""},mo=e("option",{value:"value1",style:{display:"none"},selected:""},"Value 1",-1),go=e("option",{value:"value2",selected:""},"Value 2",-1),fo=e("option",{value:"value3"},"Value 3",-1),wo=[mo,go,fo],So=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        const slim = new SlimSelect({
          select: '#selectElement'
        });
      `),t(`
    `)],-1),yo=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <select id="selectdisplay2" multiple>
          <option value="value1" style="display: none;" selected>Value 1</option>
          <option value="value2" selected>Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      `),t(`
    `)],-1);function Vo(s,n,u,d,_,h){return a(),c("div",io,[ao,co,e("div",uo,[e("select",_o,null,512)]),ho,ro,po,e("div",vo,[e("select",$o,wo,512)]),So,yo])}const bo=i(lo,[["render",Vo]]),xo=l({name:"HideSelected",mounted(){new o({select:this.$refs.hideSelectedSingle,settings:{hideSelected:!0}}),new o({select:this.$refs.hideSelectedMultiple,settings:{hideSelected:!0}})}}),Mo={id:"hideSelected",class:"content"},Do=e("h2",{class:"header"},"hideSelected",-1),Oo=e("p",null,"hideSelected setting is used to hide the current selected option in the options dropdown.",-1),Po={class:"row"},Bo={ref:"hideSelectedSingle"},To=e("option",{"data-placeholder":"true"},null,-1),Co=e("option",{value:"value1"},"Value 1",-1),Ho=e("option",{value:"value2"},"Value 2",-1),Eo=e("option",{value:"value3"},"Value 3",-1),jo=[To,Co,Ho,Eo],Lo={ref:"hideSelectedMultiple",multiple:""},Go=e("option",{value:"value1"},"Value 1",-1),Ao=e("option",{value:"value2"},"Value 2",-1),Io=e("option",{value:"value3"},"Value 3",-1),Ro=[Go,Ao,Io],ko=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            hideSelected: true,
          }
        })
      `),t(`
    `)],-1),qo=e("pre",null,[t("      "),e("code",{class:"language-html"},`
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
    `)],-1);function No(s,n,u,d,_,h){return a(),c("div",Mo,[Do,Oo,e("div",Po,[e("select",Bo,jo,512),e("select",Lo,Ro,512)]),ko,qo])}const Uo=i(xo,[["render",No]]),Wo=l({name:"Html",mounted(){new o({select:this.$refs.selectHtmlSingle,settings:{searchHighlight:!0},data:[{html:"<b>Bold Text</b>",text:"Bold Text",value:"bold text"},{html:"<i>Slim Select you are awesome</i>",text:"Slim Select awesome"},{html:'<div style="border: solid 1px #666666;">Border</div>',text:"Border",value:"border"}]}),new o({select:this.$refs.selectHtmlMulti,settings:{searchHighlight:!0},data:[{html:"<b>Bold Text</b>",text:"Bold Text",value:"bold text"},{html:"<i>Slim Select you are awesome</i>",text:"Slim Select awesome"},{html:'<div style="border: solid 1px #666666;">Border</div>',text:"Border",value:"border"}]})}}),Yo={id:"html",class:"content"},Fo=e("h2",{class:"header"},"html",-1),zo=e("p",null," Slim select has the ability to set custom html for the selected values and options dropdown. By default if the html field is set it will use that for the selected values and the options dropdown. For a multiple select selected values it will always use the text field. ",-1),Jo={class:"row"},Ko={ref:"selectHtmlSingle"},Qo={ref:"selectHtmlMulti",multiple:""},Xo=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
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
    `)],-1);function Zo(s,n,u,d,_,h){return a(),c("div",Yo,[Fo,zo,e("div",Jo,[e("select",Ko,null,512),e("select",Qo,null,512)]),Xo])}const es=i(Wo,[["render",Zo]]),ts=l({name:"Mandatory",mounted(){const s=new o({select:this.$refs.selectMultiMandatory}),n=[{value:"value1",text:"Value 1",mandatory:!0},{value:"value2",text:"Value 2"},{value:"value3",text:"Value 3"}];s.setData(n),s.setSelected(["value1","value3"]),new o({select:this.$refs.selectMultiMandatory2})}}),os={id:"mandatory",class:"content"},ss=e("h2",{class:"header"},"mandatory",-1),ns=e("p",null," When using multi select you can set a mandatory on the option to prevent capability to deselect particular option. Note options with mandatory flag is not selected by default, you need select them yourselfs. ",-1),ls={class:"row"},is={ref:"selectMultiMandatory",multiple:""},as=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
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
    `)],-1),cs=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <select id="selectMultiMandatory" multiple></select>
      `),t(`
    `)],-1),us=e("p",null,"Or",-1),ds={class:"row"},_s={ref:"selectMultiMandatory2",multiple:""},hs=e("option",{value:"value1","data-mandatory":"true",selected:""},"Value 1",-1),rs=e("option",{value:"value2",selected:""},"Value 2",-1),ps=e("option",{value:"value3"},"Value 3",-1),vs=[hs,rs,ps],$s=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        const slim = new SlimSelect({
          select: '#selectElement'
        });
      `),t(`
    `)],-1),ms=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <select id="selectMultiMandatory" multiple>
          <option value="value1" data-mandatory="true" selected>Value 1</option>
          <option value="value2" selected>Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      `),t(`
    `)],-1);function gs(s,n,u,d,_,h){return a(),c("div",os,[ss,ns,e("div",ls,[e("select",is,null,512)]),as,cs,us,e("div",ds,[e("select",_s,vs,512)]),$s,ms])}const fs=i(ts,[["render",gs]]),ws=l({name:"MinMax",mounted(){new o({select:this.$refs.selectMultiMax,settings:{minSelected:2,maxSelected:5}})}}),Ss={id:"minmax",class:"content"},ys=e("h2",{class:"header"},"Min/Max Selected",-1),Vs=e("p",null,"When using multi select you can set a min and/or max on the amount of selections you can have.",-1),bs={class:"row"},xs={ref:"selectMultiMax",multiple:""},Ms=v('<option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option><option value="value4">Value 4</option><option value="value5">Value 5</option><option value="value6">Value 6</option>',6),Ds=[Ms],Os=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        let slim = new SlimSelect({
          select: '#selectElement',
          settings: {
            minSelected: 2,
            maxSelected: 5,
          },
        })
      `),t(`
    `)],-1),Ps=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <select id="selectMultiMax" multiple>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
          <option value="value4">Value 4</option>
          <option value="value5">Value 5</option>
          <option value="value6">Value 6</option>
        </select>
      `),t(`
    `)],-1);function Bs(s,n,u,d,_,h){return a(),c("div",Ss,[ys,Vs,e("div",bs,[e("select",xs,Ds,512)]),Os,Ps])}const Ts=i(ws,[["render",Bs]]),Cs=l({name:"OpenPosition",mounted(){new o({select:this.$refs.openPositionUp,settings:{openPosition:"up"}}),new o({select:this.$refs.openPositionDown,settings:{openPosition:"down"}})}}),Hs={id:"openPosition",class:"content"},Es=e("h2",{class:"header"},"openPosition",-1),js=e("p",null," openPosition is a string value that will decide where to show your content when it comes out. By default slim select will try to put the content where it can without going off screen. But you may want to always show it in one direction. ",-1),Ls=e("p",null,[t("Possible Options: "),e("b",null,"'auto', 'up' or 'down'"),t(". Default is "),e("b",null,"'auto'")],-1),Gs={class:"row"},As={ref:"openPositionUp"},Is=e("option",{value:"up1"},"Up 1",-1),Rs=e("option",{value:"up2"},"Up 2",-1),ks=e("option",{value:"up3"},"Up 3",-1),qs=[Is,Rs,ks],Ns={ref:"openPositionDown"},Us=e("option",{value:"down1"},"Down 1",-1),Ws=e("option",{value:"down2"},"Down 2",-1),Ys=e("option",{value:"down3"},"Down 3",-1),Fs=[Us,Ws,Ys],zs=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            openPosition: 'auto' // 'auto', 'up' or 'down'
          }
        })
      `),t(`
    `)],-1);function Js(s,n,u,d,_,h){return a(),c("div",Hs,[Es,js,Ls,e("div",Gs,[e("select",As,qs,512),e("select",Ns,Fs,512)]),zs])}const Ks=i(Cs,[["render",Js]]),Qs=l({name:"Placeholder",mounted(){new o({select:this.$refs.placeholderSingle,settings:{placeholderText:"Custom Placeholder Text"}}),new o({select:this.$refs.placeholderMultiple,settings:{placeholderText:"Custom Placeholder Text"}})}}),Xs={id:"placeholder",class:"content"},Zs=e("h2",{class:"header"},"placeholderText",-1),en=e("p",null,' Placeholders consists of setting the placeholder option value. The only difference is single selects require an empty option with data-placeholder set to true. Default value is "Select Value". ',-1),tn={class:"row"},on={ref:"placeholderSingle"},sn=e("option",{"data-placeholder":"true"},null,-1),nn=e("option",{value:"value1"},"Value 1",-1),ln=e("option",{value:"value2"},"Value 2",-1),an=e("option",{value:"value3"},"Value 3",-1),cn=[sn,nn,ln,an],un={ref:"placeholderMultiple",multiple:""},dn=e("option",{value:"value1"},"Value 1",-1),_n=e("option",{value:"value2"},"Value 2",-1),hn=e("option",{value:"value3"},"Value 3",-1),rn=[dn,_n,hn],pn=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#placeholder',
          settings: {
            placeholderText: 'Custom Placeholder Text',
          }
        })
      `),t(`
    `)],-1),vn=e("pre",null,[t("      "),e("code",{class:"language-html"},`
        <!-- Set empty option with data-placeholder if you to have placeholder -->
        <!-- text for single select, otherwise first option will be selected -->
        <select id="placeholderSingle">
          <option data-placeholder="true"></option>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      `),t(`
    `)],-1);function $n(s,n,u,d,_,h){return a(),c("div",Xs,[Zs,en,e("div",tn,[e("select",on,cn,512),e("select",un,rn,512)]),pn,vn])}const mn=i(Qs,[["render",$n]]),gn=l({name:"Search",mounted(){new o({select:this.$refs.showSearchSingle,settings:{showSearch:!1}}),new o({select:this.$refs.searchTextSingle,settings:{searchText:"Sorry, nothing to see here"}}),new o({select:this.$refs.searchPlaceholderSingle,settings:{searchPlaceholder:"Search for the good stuff!"}}),new o({select:this.$refs.searchHighlightSingle,settings:{searchHighlight:!0}}),new o({select:this.$refs.showSearchMulti,settings:{showSearch:!1}}),new o({select:this.$refs.searchTextMulti,settings:{searchText:"Sorry nothing to see here"}}),new o({select:this.$refs.searchPlaceholderMulti,settings:{searchPlaceholder:"Search for the good stuff!"}}),new o({select:this.$refs.searchHighlightMulti,settings:{searchHighlight:!0}})}}),fn={id:"search",class:"content"},wn=v('<h2 class="header">showSearch / searchText / searchingText / searchHighlight</h2><p><b>showSearch</b> - is a boolean value that will decide whether or not to show the search. Default is true.</p><p><b>searchText</b> - is a string value that will show in the event there are no results. Default is &#39;No Results&#39;. </p><p><b>searchingText</b> - is a string value that will show during an fetch search request. Default is &#39;Searching...&#39;. </p><p><b>searchPlaceholder</b> - is a string value that will set the value of the input search placeholder text. Default is &#39;Search&#39;. </p><p><b>searchHighlight</b> - is a boolean value that will highlight search results. Default is false.</p>',6),Sn={class:"row",style:{padding:"0 0 var(--spacing-half) 0"}},yn={ref:"showSearchSingle"},Vn=e("option",{value:"dog"},"Dog",-1),bn=e("option",{value:"cat"},"Cat",-1),xn=e("option",{value:"bird"},"Bird",-1),Mn=[Vn,bn,xn],Dn={ref:"searchTextSingle"},On=e("option",{value:"dog"},"Dog",-1),Pn=e("option",{value:"cat"},"Cat",-1),Bn=e("option",{value:"bird"},"Bird",-1),Tn=[On,Pn,Bn],Cn={ref:"searchPlaceholderSingle"},Hn=e("option",{value:"dog"},"Dog",-1),En=e("option",{value:"cat"},"Cat",-1),jn=e("option",{value:"bird"},"Bird",-1),Ln=[Hn,En,jn],Gn={ref:"searchHighlightSingle"},An=e("option",{value:"dog"},"Dog",-1),In=e("option",{value:"cat"},"Cat",-1),Rn=e("option",{value:"bird"},"Bird",-1),kn=[An,In,Rn],qn={class:"row"},Nn={ref:"showSearchMulti",multiple:""},Un=e("option",{value:"dog"},"Dog",-1),Wn=e("option",{value:"cat"},"Cat",-1),Yn=e("option",{value:"bird"},"Bird",-1),Fn=[Un,Wn,Yn],zn={ref:"searchTextMulti",multiple:""},Jn=e("option",{value:"dog"},"Dog",-1),Kn=e("option",{value:"cat"},"Cat",-1),Qn=e("option",{value:"bird"},"Bird",-1),Xn=[Jn,Kn,Qn],Zn={ref:"searchPlaceholderMulti",multiple:""},el=e("option",{value:"dog"},"Dog",-1),tl=e("option",{value:"cat"},"Cat",-1),ol=e("option",{value:"bird"},"Bird",-1),sl=[el,tl,ol],nl={ref:"searchHighlightMulti",multiple:""},ll=e("option",{value:"dog"},"Dog",-1),il=e("option",{value:"cat"},"Cat",-1),al=e("option",{value:"bird"},"Bird",-1),cl=[ll,il,al],ul=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
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
    `)],-1);function dl(s,n,u,d,_,h){return a(),c("div",fn,[wn,e("div",Sn,[e("select",yn,Mn,512),e("select",Dn,Tn,512),e("select",Cn,Ln,512),e("select",Gn,kn,512)]),e("div",qn,[e("select",Nn,Fn,512),e("select",zn,Xn,512),e("select",Zn,sl,512),e("select",nl,cl,512)]),ul])}const _l=i(gn,[["render",dl]]),hl=l({name:"Select"}),rl={id:"select",class:"content"},pl=e("h2",{class:"header"},"select",-1),vl=e("p",null," The select field is used to identify the select element that will be used to create slim select. You can use any value you normally would in a querySelector or pass the element directly. ",-1),$l=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
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
    `)],-1),ml=[pl,vl,$l];function gl(s,n,u,d,_,h){return a(),c("div",rl,ml)}const fl=i(hl,[["render",gl]]),wl=l({name:"SelectByGroup",mounted(){new o({select:this.$refs.selectByGroup,settings:{selectByGroup:!0}})}}),Sl={id:"selectByGroup",class:"content"},yl=e("h2",{class:"header"},"selectByGroup",-1),Vl=e("p",null," selectByGroup option is used to enable the selection of all options under a specific group by clicking that option group's label. ",-1),bl={ref:"selectByGroup",multiple:""},xl=e("optgroup",{label:"Label 1"},[e("option",{value:"value1"},"Value 1"),e("option",{value:"value2"},"Value 2"),e("option",{value:"value3"},"Value 3")],-1),Ml=[xl],Dl=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectByGroup',
          settings: {
            selectByGroup: true
          }
        })
      `),t(`
    `)],-1);function Ol(s,n,u,d,_,h){return a(),c("div",Sl,[yl,Vl,e("select",bl,Ml,512),Dl])}const Pl=i(wl,[["render",Ol]]),Bl=l({name:"ShowTooltip",mounted(){new o({select:this.$refs.showOptionTooltips,settings:{showOptionTooltips:!0}})}}),Tl={id:"showOptionTooltips",class:"content"},Cl=e("h2",{class:"header"},"showOptionTooltips",-1),Hl=e("p",null," showOptionTooltips option is used to active displaying the on-hover tooltips for select options. The tooltip text is equal to the option text content. ",-1),El={ref:"showOptionTooltips"},jl=e("option",{value:"value1"},"Value 1",-1),Ll=e("option",{value:"value2"},"Value 2",-1),Gl=e("option",{value:"value3"},"Value 3",-1),Al=[jl,Ll,Gl],Il=e("pre",null,[t("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            showOptionTooltips: true,
          }
        })
      `),t(`
    `)],-1);function Rl(s,n,u,d,_,h){return a(),c("div",Tl,[Cl,Hl,e("select",El,Al,512),Il])}const kl=i(Bl,[["render",Rl]]),ql=l({name:"Styles",mounted(){new o({select:this.$refs.selectStyle}),new o({select:this.$refs.optionStyle})}}),Nl={id:"inlineStyles",class:"content"},Ul=e("h2",{class:"header"},"inline styles",-1),Wl=e("p",null," Slim select will inherit any styles that were added to the original select element. This includes options as well. ",-1),Yl={class:"row"},Fl={ref:"selectStyle",style:{color:"red"}},zl=e("option",{value:"value1"},"Value 1",-1),Jl=e("option",{value:"value2"},"Value 2",-1),Kl=e("option",{value:"value3"},"Value 3",-1),Ql=[zl,Jl,Kl],Xl={ref:"optionStyle"},Zl=e("option",{style:{color:"red"},value:"value1"},"Red",-1),ei=e("option",{style:{color:"green"}},"Green",-1),ti=e("option",{style:{color:"blue"}},"Blue",-1),oi=[Zl,ei,ti],si=e("pre",null,[t("      "),e("code",{class:"language-html"},`
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
    `)],-1);function ni(s,n,u,d,_,h){return a(),c("div",Nl,[Ul,Wl,e("div",Yl,[e("select",Fl,Ql,512),e("select",Xl,oi,512)]),si])}const li=i(ql,[["render",ni]]),ii=l({name:"Settings",components:{Select:fl,AlwaysOpen:ne,ContentLocation:Ee,ContentPosition:ot,OpenPosition:Ks,Placeholder:mn,Deselect:no,Display:bo,Mandatory:fs,MinMax:Ts,DataAttributes:Lt,Css:wt,Styles:li,Html:es,Search:_l,CloseOnSelect:ge,ShowTooltip:kl,SelectByGroup:Pl,HideSelected:Uo}}),ai={id:"settings",class:"contents"};function ci(s,n,u,d,_,h){const $=r("Select"),m=r("AlwaysOpen"),g=r("ContentLocation"),f=r("ContentPosition"),w=r("OpenPosition"),S=r("Placeholder"),y=r("Deselect"),V=r("Display"),b=r("Mandatory"),x=r("MinMax"),M=r("DataAttributes"),D=r("Css"),O=r("Styles"),P=r("Html"),B=r("Search"),T=r("CloseOnSelect"),C=r("ShowTooltip"),H=r("SelectByGroup"),E=r("HideSelected");return a(),c("div",ai,[p($),p(m),p(g),p(f),p(w),p(S),p(y),p(V),p(b),p(x),p(M),p(D),p(O),p(P),p(B),p(T),p(C),p(H),p(E)])}const di=i(ii,[["render",ci]]);export{di as default};
