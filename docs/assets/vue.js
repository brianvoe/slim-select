import{d as S,S as O,_ as f,o as v,c as g,m as b,a as e,e as l,t as m,f as i,w as s,j as y,n as C,b as w,r as V}from"./index.js";const h=S({name:"SlimSelect",props:{modelValue:{type:[String,Array,void 0]},multiple:{type:Boolean,default:!1},data:{type:Array},settings:{type:Object},events:{type:Object,default:()=>({})}},emits:["update:modelValue"],data(){return{slim:null}},mounted(){let n={select:this.$refs.slim};this.data&&(n.data=this.data),this.settings&&(n.settings=this.settings),n.events=this.events||{};const t=n.events.afterChange;n.events.afterChange=a=>{const r=this.multiple?a.map(d=>d.value):a.length>0?a[0].value:"";this.value!==r&&(this.value=r),n.events&&t&&t(a)},this.slim=new O(n);let p=this.$props.multiple?this.slim.getSelected():this.slim.getSelected()[0];this.value!==p&&this.slim.setSelected(this.value)},beforeUnmount(){this.slim&&this.slim.destroy()},watch:{modelValue:{handler:function(n){var t;(t=this.slim)==null||t.setSelected(this.getCleanValue(n))},immediate:!0},data:{handler:function(n){this.slim&&this.slim.setData(n)},deep:!0}},computed:{value:{get(){return this.getCleanValue(this.$props.modelValue)},set(n){this.$emit("update:modelValue",n)}}},methods:{getSlimSelect(){return this.slim},getCleanValue(n){const t=this.$props.multiple;return typeof n=="string"?t?[n]:n:Array.isArray(n)?t?n:n[0]:t?[]:""}}}),$=["multiple"];function D(n,t,p,a,r,d){return v(),g("select",{multiple:n.multiple,ref:"slim"},[b(n.$slots,"default")],8,$)}const q=f(h,[["render",D]]),j=S({name:"Vue",components:{SlimSelect:q},data(){return{simpleSingle:"2",simpleMultiple:["2","3"],settings:{showSearch:!1},data:[{value:"value1",text:"Value 1"},{value:"value2",text:"Value 2"},{value:"value3",text:"Value 3"}],afterChangeData:[],events:{afterChange:this.afterChange},isDisabled:!1,errorClass:""}},mounted(){},methods:{changeData(){this.$refs.dataSingle.getSlimSelect().open(),this.$refs.dataMultiple.getSlimSelect().open(),setTimeout(()=>{this.data=[{value:"value4",text:"Value 4"},{value:"value5",text:"Value 5"},{value:"value6",text:"Value 6"}]},500)},afterChange(n){this.afterChangeData=n}}}),k={id:"vue",class:"content"},M={class:"row"},A={class:"row"},T={class:"row"},B={key:0},N={class:"row"},E={class:"row"},I={class:"row"};function U(n,t,p,a,r,d){const o=V("SlimSelect");return v(),g("div",k,[t[16]||(t[16]=e("h2",{class:"header"},"Vue",-1)),t[17]||(t[17]=e("h3",null,"Install",-1)),t[18]||(t[18]=e("p",null," Slim Select doesnt have a package to import(anymore) due to its requirements of maintianing it within the repository. But we have provided a set of code you can add to your own project to get it working. ",-1)),t[19]||(t[19]=e("a",{href:"https://github.com/slim-select/tree/master/src/slim-select/vue.vue"},"Download Component Here",-1)),t[20]||(t[20]=e("br",null,null,-1)),t[21]||(t[21]=e("br",null,null,-1)),t[22]||(t[22]=e("h3",null,"Simple example",-1)),e("div",M,[e("div",null,[e("div",null,[t[5]||(t[5]=e("strong",null,"Value",-1)),l(" "+m(n.simpleSingle),1)]),i(o,{modelValue:n.simpleSingle,"onUpdate:modelValue":t[0]||(t[0]=u=>n.simpleSingle=u),ref:"simpleSingle"},{default:s(()=>t[6]||(t[6]=[e("option",{value:"all"},"All",-1),e("option",{value:"1"},"Option 1",-1),e("option",{value:"2"},"Option 2",-1),e("option",{value:"3"},"Option 3",-1)])),_:1},8,["modelValue"])]),e("div",null,[e("div",null,[t[7]||(t[7]=e("strong",null,"Value",-1)),l(" "+m(n.simpleMultiple),1)]),i(o,{modelValue:n.simpleMultiple,"onUpdate:modelValue":t[1]||(t[1]=u=>n.simpleMultiple=u),ref:"simpleMultiple",multiple:""},{default:s(()=>t[8]||(t[8]=[e("option",{value:"1"},"Option 1",-1),e("option",{value:"2"},"Option 2",-1),e("option",{value:"3"},"Option 3",-1)])),_:1},8,["modelValue"])])]),t[23]||(t[23]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        import { defineComponent } from 'vue'
        import SlimSelect from '../your/path/to/slim-select/vue.vue'

        export default defineComponent({
          components: {
            SlimSelect,
          },
          data() {
            return {
              single: '2',
              multiple: ['2', '3']
            }
          }
        })
      `),l(`
    `)],-1)),t[24]||(t[24]=e("pre",null,[l("      "),e("code",{class:"language-html"},`
        <SlimSelect v-model="single">
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </SlimSelect>

        <SlimSelect v-model="multiple" multiple>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </SlimSelect>
      `),l(`
    `)],-1)),t[25]||(t[25]=e("br",null,null,-1)),t[26]||(t[26]=e("div",{class:"separator"},null,-1)),t[27]||(t[27]=e("br",null,null,-1)),t[28]||(t[28]=e("h3",null,"Settings",-1)),t[29]||(t[29]=e("p",null," Settings just like its passed as an object in normal SlimSelect will also be passed as an object to the component prop ",-1)),e("div",A,[i(o,{settings:n.settings},{default:s(()=>t[9]||(t[9]=[e("option",{value:"1"},"Option 1",-1),e("option",{value:"2"},"Option 2",-1),e("option",{value:"3"},"Option 3",-1)])),_:1},8,["settings"]),i(o,{settings:n.settings,multiple:""},{default:s(()=>t[10]||(t[10]=[e("option",{value:"1"},"Option 1",-1),e("option",{value:"2"},"Option 2",-1),e("option",{value:"3"},"Option 3",-1)])),_:1},8,["settings"])]),t[30]||(t[30]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        import { defineComponent } from 'vue'
        import SlimSelect from '../your/path/to/slim-select/vue.vue'

        export default defineComponent({
          components: {
            SlimSelect,
          },
          data() {
            return {
              settings: {
                showSearch: false,
              }
            }
          },
        })
      `),l(`
    `)],-1)),t[31]||(t[31]=e("pre",null,[l("      "),e("code",{class:"language-html"},`
        <SlimSelect :settings="settings">
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </SlimSelect>

        <SlimSelect :settings="settings" multiple>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </SlimSelect>
      `),l(`
    `)],-1)),t[32]||(t[32]=e("br",null,null,-1)),t[33]||(t[33]=e("div",{class:"separator"},null,-1)),t[34]||(t[34]=e("br",null,null,-1)),t[35]||(t[35]=e("h3",null,"Data",-1)),t[36]||(t[36]=e("p",null," Data just like its passed as an array in normal SlimSelct will also be passed as an array to the component prop. ",-1)),t[37]||(t[37]=e("div",{class:"alert info"}," You may pass data as a prop if you would like. But you can also have reactive options that when options change the select will update as well. See Reactivity below for more info. ",-1)),e("div",T,[e("div",{class:"btn info",onClick:t[2]||(t[2]=(...u)=>n.changeData&&n.changeData(...u))},"Change data"),i(o,{ref:"dataSingle",data:n.data},null,8,["data"]),i(o,{ref:"dataMultiple",data:n.data,multiple:""},null,8,["data"])]),t[38]||(t[38]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        import { defineComponent } from 'vue'
        import SlimSelect from '../your/path/to/slim-select/vue.vue'

        export default defineComponent({
          components: {
            SlimSelect,
          },
          data() {
            return {
              data: [
                { value: 'value1', text: 'Value 1' },
                { value: 'value2', text: 'Value 2' },
                { value: 'value3', text: 'Value 3' },
              ],
            }
          },
        })
      `),l(`
    `)],-1)),t[39]||(t[39]=e("pre",null,[l("      "),e("code",{class:"language-html"},`
        <SlimSelect :data="data" />

        <SlimSelect :data="data" multiple />
      `),l(`
    `)],-1)),t[40]||(t[40]=e("br",null,null,-1)),t[41]||(t[41]=e("div",{class:"separator"},null,-1)),t[42]||(t[42]=e("br",null,null,-1)),t[43]||(t[43]=e("h3",null,"Events",-1)),t[44]||(t[44]=e("p",null," Events just like its passed as an object in normal SlimSelct will also be passed as an object to the component prop. ",-1)),n.afterChangeData.length?(v(),g("div",B,[t[11]||(t[11]=e("strong",null,"afterChange:",-1)),l(" "+m(n.afterChangeData),1)])):y("",!0),e("div",N,[i(o,{events:n.events},{default:s(()=>t[12]||(t[12]=[e("option",{value:"1"},"Option 1",-1),e("option",{value:"2"},"Option 2",-1),e("option",{value:"3"},"Option 3",-1)])),_:1},8,["events"]),i(o,{events:n.events,multiple:""},{default:s(()=>t[13]||(t[13]=[e("option",{value:"1"},"Option 1",-1),e("option",{value:"2"},"Option 2",-1),e("option",{value:"3"},"Option 3",-1)])),_:1},8,["events"])]),t[45]||(t[45]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        import { defineComponent } from 'vue'
        import SlimSelect from '../your/path/to/slim-select/vue.vue'

        export default defineComponent({
          components: {
            SlimSelect,
          },
          data() {
            return {
              events: {
                afterChange: this.afterChange,
              },
            }
          },
          methods: {
            afterChange(newVal) {
              console.log(newVal)
            },
          },
        })
      `),l(`
    `)],-1)),t[46]||(t[46]=e("pre",null,[l("      "),e("code",{class:"language-html"},`
        <SlimSelect :events="events">
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </SlimSelect>

        <SlimSelect :events="events" multiple>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </SlimSelect>
      `),l(`
    `)],-1)),t[47]||(t[47]=e("br",null,null,-1)),t[48]||(t[48]=e("div",{class:"separator"},null,-1)),t[49]||(t[49]=e("br",null,null,-1)),t[50]||(t[50]=e("h3",null,"Attributes",-1)),t[51]||(t[51]=e("p",null,"There are certain attributes that are reactive to changes",-1)),t[52]||(t[52]=e("h4",null,"disabled",-1)),e("div",E,[e("div",{class:"btn",onClick:t[3]||(t[3]=u=>n.isDisabled=!n.isDisabled)},"Toggle Disabled"),i(o,{disabled:n.isDisabled},{default:s(()=>t[14]||(t[14]=[e("option",{value:"1"},"Option 1",-1),e("option",{value:"2"},"Option 2",-1),e("option",{value:"3"},"Option 3",-1)])),_:1},8,["disabled"])]),t[53]||(t[53]=e("pre",null,[l("      "),e("code",{class:"language-html"},`
        <SlimSelect :disabled="isDisabled">
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </SlimSelect>
      `),l(`
    `)],-1)),t[54]||(t[54]=e("h4",null,"class",-1)),e("div",I,[e("div",{class:"btn",onClick:t[4]||(t[4]=u=>n.errorClass=n.errorClass===""?"error":"")},"Toggle Error"),i(o,{class:C(["dynamicClass",n.errorClass])},{default:s(()=>t[15]||(t[15]=[e("option",{value:"1"},"Option 1",-1),e("option",{value:"2"},"Option 2",-1),e("option",{value:"3"},"Option 3",-1)])),_:1},8,["class"])]),t[55]||(t[55]=w(`<pre>      <code class="language-html">
        &lt;SlimSelect :class=&quot;myClass&quot;&gt;
          &lt;option value=&quot;1&quot;&gt;Option 1&lt;/option&gt;
          &lt;option value=&quot;2&quot;&gt;Option 2&lt;/option&gt;
          &lt;option value=&quot;3&quot;&gt;Option 3&lt;/option&gt;
        &lt;/SlimSelect&gt;
      </code>
    </pre><br><div class="separator"></div><br><h3>Reactivity</h3><p> Slim select handles the underlying select option alterations for you. But the issue is that if you allow Vue to also handle the select option alterations then you will have two things trying to alter the select options and that will cause Vue to error out. So for now you can add static options to the SlimSelect component but then no more altering after that. Any dynamic data should be passed into the data prop. </p><div class="alert info">That being said props added to the main SlimSelect component can be dynamic.</div><p> If anyone knows how to deal with this in a reasonable way please go the <a target="_blank" href="https://github.com/brianvoe/slim-select/issues/386">github repo</a> and submit a pr. </p><pre>      <code class="language-html">
        &lt;SlimSelect v-model=&quot;value&quot;&gt;

          //////////////////////
          // DON&#39;T DO THIS!!! //
          //////////////////////
          &lt;option v-for=&quot;d in data&quot; :key=&quot;d.id&quot; :value=&quot;d.value&quot; :selected=&quot;d.selected&quot;&gt;{{ d.text }}&lt;/option&gt;
        &lt;/SlimSelect&gt;
      </code>
    </pre>`,9))])}const R=f(j,[["render",U]]);export{R as default};
