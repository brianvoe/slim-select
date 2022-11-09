import{d,S as o,_ as r,g as h,o as a,c,a as e,f as s,t as u,i as v,h as S,w as g,b as i}from"./index.js";const _=d({name:"Methods",data(){return{selectedSingle:null,selectedSingleValue:"",selectedMultiple:null,selectedMultipleValue:"",setSingle:null,setMultiple:null,setDataSingle:null,setDataMultiple:null,setSearchSingle:null,setSearchMultiple:null,setSearchTextSingle:null,setEnableSingle:null,setEnableMultiple:null,setOpenCloseSingle:null,setOpenCloseMultiple:null,setDestroySingle:null,setDestroyMultiple:null}},mounted(){this.selectedSingle=new o({select:"#selectedSingle"}),this.selectedMultiple=new o({select:"#selectedMultiple"}),this.setSingle=new o({select:"#setSingle"}),this.setMultiple=new o({select:"#setMultiple"}),this.setDataSingle=new o({select:"#setDataSingle"}),this.setDataMultiple=new o({select:"#setDataMultiple"}),this.setData(),this.setSearchSingle=new o({select:"#setSearchSingle"}),this.setSearchMultiple=new o({select:"#setSearchMultiple"}),this.setSearchTextSingle=new o({select:"#setSearchTextSingle"}),this.setSearchTextSingle.setSearchText("Sorry No Results Here!!!"),this.setEnableSingle=new o({select:"#setEnableSingle"}),this.setEnableMultiple=new o({select:"#setEnableMultiple"}),this.setOpenCloseSingle=new o({select:"#setOpenCloseSingle"}),this.setOpenCloseMultiple=new o({select:"#setOpenCloseMultiple"}),this.setDestroySingle=new o({select:"#setDestroySingle"}),this.setDestroyMultiple=new o({select:"#setDestroyMultiple"})},methods:{getSelected(){this.selectedSingleValue=this.selectedSingle.selected(),this.selectedMultipleValue=this.selectedMultiple.selected()},setValue(){this.setSingle.set("value2"),this.setMultiple.set(["value2","value3"])},setData(){const t=[];for(let l=0;l<10;l++)t.push({text:"Bill Mister",selected:Math.random()<.5});this.setDataSingle.setData(t),this.setDataMultiple.setData(t)},setSearch(){setTimeout(()=>{this.setSearchSingle.open(),this.setSearchSingle.search("value 2"),this.setSearchMultiple.open(),this.setSearchMultiple.search("value 2")},100)},setEnable(){this.setEnableSingle.enable(),this.setEnableMultiple.enable()},setDisable(){this.setEnableSingle.disable(),this.setEnableMultiple.disable()},setOpenClose(){this.setOpenCloseSingle.data.contentOpen||(this.setOpenCloseSingle.open(),this.setOpenCloseMultiple.open())},setCreate(){this.setDestroySingle=new o({select:"#setDestroySingle"}),this.setDestroyMultiple=new o({select:"#setDestroyMultiple"})},setDestroy(){this.setDestroySingle.destroy(),this.setDestroyMultiple.destroy()}}}),b={id:"methods-content"},V={class:"content selectedSelects"},m=e("h2",{class:"header"},"selected",-1),M=e("p",null,"The selected method will return a string or array of the currently selected values",-1),D={class:"select-split"},w=i('<select id="selectedSingle"><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></select><select id="selectedMultiple" multiple><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></select>',2),y={key:0,style:{padding:"8px 0 8px 0"}},C=e("b",null,"Single Select Value:",-1),f=e("b",null,"Multi Select Value:",-1),k=e("pre",null,[s("        "),e("code",{class:"language-javascript"},`
          var select = new SlimSelect({
            select: '#select'
          })
          select.selected() // Will return a string or an array of string values
        `),s(`
      `)],-1),O={class:"content"},T=e("h2",{class:"header"},"set",-1),E=e("p",null," The set method will take a value and update the original select as well slim select. The value can either be a string or an array of strings depending on if its a single or multi select. ",-1),j={class:"select-split"},N=i('<select id="setSingle"><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></select><select id="setMultiple" multiple><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></select>',2),B=e("pre",null,[s("        "),e("code",{class:"language-javascript"},`
          var select = new SlimSelect({
            select: '#select'
          })
          select.set('value')
          // or
          select.set(['value1', 'value2'])
        `),s(`
      `)],-1),$={class:"content"},H=e("h2",{class:"header"},"setData",-1),R=e("p",null," The setData method can take in an array of objects. This will set the options of the original select and rerender slim select. ",-1),A={class:"select-split"},G=e("select",{id:"setDataSingle"},null,-1),W=e("select",{id:"setDataMultiple",multiple:""},null,-1),Y=e("pre",null,[s("        "),e("code",{class:"language-javascript"},`
          var select = new SlimSelect({
            select: '#select'
          })

          // Array of objects - Must have at least text value
          select.setData([
            {text: 'value1'},
            {text: 'value2'}
          ])
        `),s(`
      `)],-1),q={class:"content"},z=e("h2",{class:"header"},"search",-1),F=e("p",null,"The search method will update the search input field and search the data with the given value.",-1),I={class:"select-split"},J=i('<select id="setSearchSingle"><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></select><select id="setSearchMultiple" multiple><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></select>',2),K=e("pre",null,[s("        "),e("code",{class:"language-javascript"},`
          var select = new SlimSelect({
            select: '#select'
          })
          select.search('value')
        `),s(`
      `)],-1),L=i(`<div class="content"><h2 class="header">setSearchText</h2><p>The setSearchText method will update the search text value.</p><div class="select-split"><select id="setSearchTextSingle"><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></select></div><pre>        <code class="language-javascript">
          var select = new SlimSelect({
            select: &#39;#select&#39;
          })
          select.setSearch(&#39;Sorry No Results Here!!!&#39;)
        </code>
      </pre></div>`,1),P={class:"content"},Q=e("h2",{class:"header"},"disable / enable",-1),U=e("p",null,[s(" These methods will enable or disable the select dropdown. "),e("br"),s(" You may also set disabled on your original select and slim-select will pick that up. ")],-1),X={class:"select-split"},Z=i('<select id="setEnableSingle" disabled><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></select><select id="setEnableMultiple" multiple disabled><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></select>',2),x=e("pre",null,[s("        "),e("code",{class:"language-javascript"},`
          var select = new SlimSelect({
            select: '#select'
          })
          select.enable()
          // or
          select.disable()
        `),s(`
      `)],-1),ee={class:"content"},te=e("h2",{class:"header"},"open / close",-1),le=e("p",null,"The open/close methods will do just that.",-1),se={class:"select-split"},ne=i('<select id="setOpenCloseSingle"><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></select><select id="setOpenCloseMultiple" multiple><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></select>',2),oe=e("pre",null,[s("        "),e("code",{class:"language-javascript"},`
          var select = new SlimSelect({
            select: '#select',

            // Optional callbacks
            beforeOpen: function () { console.log('beforeOpen')},
            afterOpen: function () { console.log('afterOpen')},
            beforeClose: function () { console.log('beforeClose')},
            afterClose: function () { console.log('afterClose')}
          })
          select.open()
          // or
          select.close()
        `),s(`
      `)],-1),ie={class:"content"},ae=e("h2",{class:"header"},"destroy",-1),ce=e("p",null,"The destroy method will remove slim-select and display your original select.",-1),ue={class:"select-split"},pe=i('<select id="setDestroySingle"><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></select><select id="setDestroyMultiple" multiple><option value="value1">Value 1</option><option value="value2">Value 2</option><option value="value3">Value 3</option></select>',2),de=e("pre",null,[s("        "),e("code",{class:"language-javascript"},`
          var select = new SlimSelect({
            select: '#select'
          })
          select.destroy()
        `),s(`
      `)],-1);function re(t,l,he,ve,Se,ge){const p=h("router-link");return a(),c("div",b,[e("div",V,[m,M,e("div",D,[e("div",{class:"btn",onClick:l[0]||(l[0]=(...n)=>t.getSelected&&t.getSelected(...n))},"Get Selected"),w]),t.selectedSingleValue!==""?(a(),c("div",y,[e("div",null,[C,s(" "+u(t.selectedSingleValue),1)]),e("div",null,[f,s(" "+u(t.selectedMultipleValue),1)])])):v("",!0),k]),e("div",O,[T,E,e("div",j,[e("div",{class:"btn",onClick:l[1]||(l[1]=(...n)=>t.setValue&&t.setValue(...n))},"Set Value"),N]),B]),e("div",$,[H,R,e("p",null,[s(" To get a better break down of possible data options see "),S(p,{to:"/options"},{default:g(()=>[s("options/data")]),_:1})]),e("div",A,[e("div",{class:"btn",onClick:l[2]||(l[2]=(...n)=>t.setData&&t.setData(...n))},"Set Data"),G,W]),Y]),e("div",q,[z,F,e("div",I,[e("div",{class:"btn",onClick:l[3]||(l[3]=(...n)=>t.setSearch&&t.setSearch(...n))},"Set Search"),J]),K]),L,e("div",P,[Q,U,e("div",X,[t.setEnableSingle&&!t.setEnableSingle.config.isEnabled?(a(),c("div",{key:0,class:"btn",onClick:l[4]||(l[4]=(...n)=>t.setEnable&&t.setEnable(...n))},"Enable")):(a(),c("div",{key:1,class:"btn",onClick:l[5]||(l[5]=(...n)=>t.setDisable&&t.setDisable(...n))},"Disable")),Z]),x]),e("div",ee,[te,le,e("div",se,[e("div",{class:"btn",onClick:l[6]||(l[6]=(...n)=>t.setOpenClose&&t.setOpenClose(...n))},"Open/Close"),ne]),oe]),e("div",ie,[ae,ce,e("div",ue,[e("div",{class:"btn",onClick:l[7]||(l[7]=(...n)=>t.setCreate&&t.setCreate(...n))},"Create"),e("div",{class:"btn",onClick:l[8]||(l[8]=(...n)=>t.setDestroy&&t.setDestroy(...n))},"Destroy"),pe]),de])])}const be=r(_,[["render",re]]);export{be as default};
