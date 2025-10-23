import{d as C,S as y,_ as V,c as m,j as h,o as v,a as t,e as i,t as d,w as a,r as S,f as n,F as w,h as $,b as O,i as c,n as k}from"./index.js";const q=C({name:"SlimSelect",props:{modelValue:{type:[String,Array,void 0]},multiple:{type:Boolean,default:!1},data:{type:Array},settings:{type:Object},events:{type:Object,default:()=>({})}},emits:["update:modelValue"],data(){return{slim:null}},mounted(){this.$slots.default&&this.$slots.default().length>0&&this.data&&console.warn("[SlimSelect Vue] Both slot content and data prop are provided. Data prop will take precedence and slot content will be ignored.");let e={select:this.$refs.slim};this.data&&(e.data=this.data),this.settings&&(e.settings=this.settings);const p=this.events?.afterChange;e.events={...this.events,afterChange:r=>{const f=this.multiple?r.map(o=>o.value):r.length>0?r[0].value:"";this.value!==f&&(this.value=f),p&&p(r)}},this.slim=new y(e);let g=this.$props.multiple?this.slim.getSelected():this.slim.getSelected()[0];this.value!==g&&this.slim.setSelected(this.value,!1)},updated(){if(this.slim&&!this.data){const l=this.slim.getSelected(),e=Array.isArray(this.value)?this.value:[this.value];JSON.stringify(l.sort())!==JSON.stringify(e.sort())&&this.slim.setSelected(this.value,!1)}},beforeUnmount(){this.slim&&this.slim.destroy()},watch:{modelValue:{handler:function(l){this.slim&&this.slim.setSelected(this.getCleanValue(l),!1)}},data:{handler:function(l){this.slim&&this.slim.setData(l)},deep:!0}},computed:{value:{get(){return this.getCleanValue(this.$props.modelValue)},set(l){this.$emit("update:modelValue",l)}}},methods:{getSlimSelect(){return this.slim},getCleanValue(l){const e=this.$props.multiple;return typeof l=="string"?e?[l]:l:Array.isArray(l)?e?l:l[0]:e?[]:""}}}),F=["multiple"];function j(l,e,p,g,r,f){return v(),m("select",{multiple:l.multiple,ref:"slim"},[h(l.$slots,"default")],8,F)}const b=V(q,[["render",j]]),D=C({name:"ComplexFieldExample",components:{SlimSelect:b},props:{modelValue:{type:Array,required:!0},fieldOptions:{type:Array,required:!0},label:{type:String,required:!0}},emits:["update:modelValue"],computed:{value:{get(){return this.modelValue||[]},set(l){this.$emit("update:modelValue",l)}}},methods:{handleChange(){}}}),A={class:"complex-field"},E=["value"],x={style:{"margin-top":"8px"}};function M(l,e,p,g,r,f){const o=S("SlimSelect");return v(),m("div",A,[t("h4",null,d(l.label),1),i(o,{modelValue:l.value,"onUpdate:modelValue":e[0]||(e[0]=u=>l.value=u),multiple:"",events:{afterChange:()=>l.handleChange()}},{default:a(()=>[(v(!0),m(w,null,$(l.fieldOptions,u=>(v(),m("option",{key:u.value,value:u.value},d(u.name),9,E))),128))]),_:1},8,["modelValue","events"]),t("div",x,[e[1]||(e[1]=t("strong",null,"Selected:",-1)),n(" "+d(l.value.join(", ")||"None"),1)])])}const P=V(D,[["render",M]]),N=C({name:"Vue",components:{SlimSelect:b,ComplexFieldExample:P},data(){return{simpleSingle:"2",simpleMultiple:["2","3"],settings:{showSearch:!1},data:[{value:"value1",text:"Value 1"},{value:"value2",text:"Value 2"},{value:"value3",text:"Value 3"}],afterChangeData:[],events:{afterChange:this.afterChange},isDisabled:!1,errorClass:"",customFieldsValues:{favoriteColors:["blue"],skills:["javascript","typescript"]},fieldOptions:{favoriteColors:[{value:"red",name:"Red"},{value:"blue",name:"Blue"},{value:"green",name:"Green"},{value:"yellow",name:"Yellow"}],skills:[{value:"javascript",name:"JavaScript"},{value:"typescript",name:"TypeScript"},{value:"vue",name:"Vue.js"},{value:"react",name:"React"},{value:"angular",name:"Angular"}]}}},mounted(){},methods:{changeData(){this.$refs.dataSingle.getSlimSelect().open(),this.$refs.dataMultiple.getSlimSelect().open(),setTimeout(()=>{this.data=[{value:"value4",text:"Value 4"},{value:"value5",text:"Value 5"},{value:"value6",text:"Value 6"}]},500)},afterChange(l){this.afterChangeData=l}}}),T={id:"vue",class:"content"},B={class:"row"},U={class:"row"},R={class:"row"},J={key:0},I={class:"row"},G={class:"row"},Y={class:"row"},z={class:"row"},K={class:"alert info",style:{"margin-top":"16px"}},L={style:{margin:"8px 0 0 0",background:"rgba(0, 0, 0, 0.1)",padding:"8px","border-radius":"4px"}};function H(l,e,p,g,r,f){const o=S("SlimSelect"),u=S("ComplexFieldExample");return v(),m("div",T,[e[19]||(e[19]=O(`<h2 class="header">Vue</h2><h3>Install</h3><p>Install the slim-select package:</p><pre>      <code class="language-bash">
        npm install slim-select
      </code>
    </pre><p>Import the Vue component and styles:</p><pre>      <code class="language-javascript">
        import SlimSelect from &#39;slim-select/vue&#39;
        import &#39;slim-select/styles&#39; // CSS
        // or
        import &#39;slim-select/scss&#39; // SCSS
      </code>
    </pre><br><h3>Simple example</h3>`,8)),t("div",B,[t("div",null,[t("div",null,[e[7]||(e[7]=t("strong",null,"Value",-1)),n(" "+d(l.simpleSingle),1)]),i(o,{modelValue:l.simpleSingle,"onUpdate:modelValue":e[0]||(e[0]=s=>l.simpleSingle=s),ref:"simpleSingle"},{default:a(()=>[...e[8]||(e[8]=[t("option",{value:"all"},"All",-1),t("option",{value:"1"},"Option 1",-1),t("option",{value:"2"},"Option 2",-1),t("option",{value:"3"},"Option 3",-1)])]),_:1},8,["modelValue"])]),t("div",null,[t("div",null,[e[9]||(e[9]=t("strong",null,"Value",-1)),n(" "+d(l.simpleMultiple),1)]),i(o,{modelValue:l.simpleMultiple,"onUpdate:modelValue":e[1]||(e[1]=s=>l.simpleMultiple=s),ref:"simpleMultiple",multiple:""},{default:a(()=>[...e[10]||(e[10]=[t("option",{value:"1"},"Option 1",-1),t("option",{value:"2"},"Option 2",-1),t("option",{value:"3"},"Option 3",-1)])]),_:1},8,["modelValue"])])]),e[20]||(e[20]=t("pre",null,[n("      "),t("code",{class:"language-javascript"},`
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
      `),n(`
    `)],-1)),e[21]||(e[21]=t("pre",null,[n("      "),t("code",{class:"language-html"},`
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
      `),n(`
    `)],-1)),e[22]||(e[22]=t("br",null,null,-1)),e[23]||(e[23]=t("div",{class:"separator"},null,-1)),e[24]||(e[24]=t("br",null,null,-1)),e[25]||(e[25]=t("h3",null,"Settings",-1)),e[26]||(e[26]=t("p",null," Settings just like its passed as an object in normal SlimSelect will also be passed as an object to the component prop ",-1)),t("div",U,[i(o,{settings:l.settings},{default:a(()=>[...e[11]||(e[11]=[t("option",{value:"1"},"Option 1",-1),t("option",{value:"2"},"Option 2",-1),t("option",{value:"3"},"Option 3",-1)])]),_:1},8,["settings"]),i(o,{settings:l.settings,multiple:""},{default:a(()=>[...e[12]||(e[12]=[t("option",{value:"1"},"Option 1",-1),t("option",{value:"2"},"Option 2",-1),t("option",{value:"3"},"Option 3",-1)])]),_:1},8,["settings"])]),e[27]||(e[27]=t("pre",null,[n("      "),t("code",{class:"language-javascript"},`
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
      `),n(`
    `)],-1)),e[28]||(e[28]=t("pre",null,[n("      "),t("code",{class:"language-html"},`
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
      `),n(`
    `)],-1)),e[29]||(e[29]=t("br",null,null,-1)),e[30]||(e[30]=t("div",{class:"separator"},null,-1)),e[31]||(e[31]=t("br",null,null,-1)),e[32]||(e[32]=t("h3",null,"Data",-1)),e[33]||(e[33]=t("p",null," Data just like its passed as an array in normal SlimSelct will also be passed as an array to the component prop. ",-1)),e[34]||(e[34]=t("div",{class:"alert info"}," You may pass data as a prop if you would like. But you can also have reactive options that when options change the select will update as well. See Reactivity below for more info. ",-1)),t("div",R,[t("div",{class:"btn info",onClick:e[2]||(e[2]=(...s)=>l.changeData&&l.changeData(...s))},"Change data"),i(o,{ref:"dataSingle",data:l.data},null,8,["data"]),i(o,{ref:"dataMultiple",data:l.data,multiple:""},null,8,["data"])]),e[35]||(e[35]=t("pre",null,[n("      "),t("code",{class:"language-javascript"},`
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
      `),n(`
    `)],-1)),e[36]||(e[36]=t("pre",null,[n("      "),t("code",{class:"language-html"},`
        <SlimSelect :data="data" />

        <SlimSelect :data="data" multiple />
      `),n(`
    `)],-1)),e[37]||(e[37]=t("br",null,null,-1)),e[38]||(e[38]=t("div",{class:"separator"},null,-1)),e[39]||(e[39]=t("br",null,null,-1)),e[40]||(e[40]=t("h3",null,"Events",-1)),e[41]||(e[41]=t("p",null," Events just like its passed as an object in normal SlimSelct will also be passed as an object to the component prop. ",-1)),l.afterChangeData.length?(v(),m("div",J,[e[13]||(e[13]=t("strong",null,"afterChange:",-1)),n(" "+d(l.afterChangeData),1)])):c("",!0),t("div",I,[i(o,{events:l.events},{default:a(()=>[...e[14]||(e[14]=[t("option",{value:"1"},"Option 1",-1),t("option",{value:"2"},"Option 2",-1),t("option",{value:"3"},"Option 3",-1)])]),_:1},8,["events"]),i(o,{events:l.events,multiple:""},{default:a(()=>[...e[15]||(e[15]=[t("option",{value:"1"},"Option 1",-1),t("option",{value:"2"},"Option 2",-1),t("option",{value:"3"},"Option 3",-1)])]),_:1},8,["events"])]),e[42]||(e[42]=t("pre",null,[n("      "),t("code",{class:"language-javascript"},`
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
      `),n(`
    `)],-1)),e[43]||(e[43]=t("pre",null,[n("      "),t("code",{class:"language-html"},`
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
      `),n(`
    `)],-1)),e[44]||(e[44]=t("br",null,null,-1)),e[45]||(e[45]=t("div",{class:"separator"},null,-1)),e[46]||(e[46]=t("br",null,null,-1)),e[47]||(e[47]=t("h3",null,"Attributes",-1)),e[48]||(e[48]=t("p",null,"There are certain attributes that are reactive to changes",-1)),e[49]||(e[49]=t("h4",null,"disabled",-1)),t("div",G,[t("div",{class:"btn",onClick:e[3]||(e[3]=s=>l.isDisabled=!l.isDisabled)},"Toggle Disabled"),i(o,{disabled:l.isDisabled},{default:a(()=>[...e[16]||(e[16]=[t("option",{value:"1"},"Option 1",-1),t("option",{value:"2"},"Option 2",-1),t("option",{value:"3"},"Option 3",-1)])]),_:1},8,["disabled"])]),e[50]||(e[50]=t("pre",null,[n("      "),t("code",{class:"language-html"},`
        <SlimSelect :disabled="isDisabled">
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </SlimSelect>
      `),n(`
    `)],-1)),e[51]||(e[51]=t("h4",null,"class",-1)),t("div",Y,[t("div",{class:"btn",onClick:e[4]||(e[4]=s=>l.errorClass=l.errorClass===""?"error":"")},"Toggle Error"),i(o,{class:k(["dynamicClass",l.errorClass])},{default:a(()=>[...e[17]||(e[17]=[t("option",{value:"1"},"Option 1",-1),t("option",{value:"2"},"Option 2",-1),t("option",{value:"3"},"Option 3",-1)])]),_:1},8,["class"])]),e[52]||(e[52]=t("pre",null,[n("      "),t("code",{class:"language-html"},`
        <SlimSelect :class="myClass">
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </SlimSelect>
      `),n(`
    `)],-1)),e[53]||(e[53]=t("br",null,null,-1)),e[54]||(e[54]=t("div",{class:"separator"},null,-1)),e[55]||(e[55]=t("br",null,null,-1)),e[56]||(e[56]=t("h3",null,"Complex Example: Custom Fields Pattern",-1)),e[57]||(e[57]=t("p",null," This example demonstrates a real-world use case similar to a CustomFields component that manages multiple dynamic form fields with computed values, reactive slot content, and bidirectional data flow. ",-1)),e[58]||(e[58]=t("div",{class:"alert info"},[t("strong",null,"Pattern:"),n(" Computed values → Reactive slots → v-model → afterChange callback → Update parent data ")],-1)),t("div",z,[i(u,{modelValue:l.customFieldsValues.favoriteColors,"onUpdate:modelValue":e[5]||(e[5]=s=>l.customFieldsValues.favoriteColors=s),"field-options":l.fieldOptions.favoriteColors,label:"Favorite Colors"},null,8,["modelValue","field-options"]),i(u,{modelValue:l.customFieldsValues.skills,"onUpdate:modelValue":e[6]||(e[6]=s=>l.customFieldsValues.skills=s),"field-options":l.fieldOptions.skills,label:"Skills"},null,8,["modelValue","field-options"])]),t("div",K,[e[18]||(e[18]=t("strong",null,"Parent Data:",-1)),t("pre",L,d(JSON.stringify(l.customFieldsValues,null,2)),1)]),e[59]||(e[59]=O(`<p><strong>Parent Component (vue.vue):</strong></p><pre>      <code class="language-javascript">
        import ComplexFieldExample from &#39;./complex.vue&#39;

        export default {
          components: { ComplexFieldExample },
          data() {
            return {
              // Parent stores the values
              customFieldsValues: {
                favoriteColors: [&#39;blue&#39;],
                skills: [&#39;javascript&#39;, &#39;typescript&#39;]
              },
              // Parent stores the options
              fieldOptions: {
                favoriteColors: [
                  { value: &#39;red&#39;, name: &#39;Red&#39; },
                  { value: &#39;blue&#39;, name: &#39;Blue&#39; },
                  { value: &#39;green&#39;, name: &#39;Green&#39; }
                ],
                skills: [
                  { value: &#39;javascript&#39;, name: &#39;JavaScript&#39; },
                  { value: &#39;typescript&#39;, name: &#39;TypeScript&#39; },
                  { value: &#39;vue&#39;, name: &#39;Vue.js&#39; }
                ]
              }
            }
          }
        }
      </code>
    </pre><pre>      <code class="language-html">
        &lt;!-- Parent template --&gt;
        &lt;ComplexFieldExample
          label=&quot;Favorite Colors&quot;
          v-model=&quot;customFieldsValues.favoriteColors&quot;
          :field-options=&quot;fieldOptions.favoriteColors&quot;
        /&gt;

        &lt;ComplexFieldExample
          label=&quot;Skills&quot;
          v-model=&quot;customFieldsValues.skills&quot;
          :field-options=&quot;fieldOptions.skills&quot;
        /&gt;
      </code>
    </pre><p><strong>Child Component (complex.vue):</strong></p><pre>      <code class="language-javascript">
        import SlimSelect from &#39;slim-select/vue&#39;

        export default {
          components: { SlimSelect },
          props: {
            modelValue: { type: Array, required: true },
            fieldOptions: { type: Array, required: true },
            label: { type: String, required: true }
          },
          emits: [&#39;update:modelValue&#39;],
          computed: {
            value: {
              get() { return this.modelValue || [] },
              set(newValue) { this.$emit(&#39;update:modelValue&#39;, newValue) }
            }
          },
          methods: {
            handleChange() {
              console.log(\`\${this.label} changed:\`, this.value)
            }
          }
        }
      </code>
    </pre><pre>      <code class="language-html">
        &lt;!-- Child template with reactive slot content --&gt;
        &lt;SlimSelect
          v-model=&quot;value&quot;
          multiple
          :events=&quot;{ afterChange: () =&gt; handleChange() }&quot;&gt;
          &lt;option
            v-for=&quot;option in fieldOptions&quot;
            :key=&quot;option.value&quot;
            :value=&quot;option.value&quot;&gt;
            {{ option.name }}
          &lt;/option&gt;
        &lt;/SlimSelect&gt;
      </code>
    </pre><div class="alert info"><strong>Key Features:</strong><ul><li>✅ <strong>Parent-child pattern</strong> - Parent stores data, child renders SlimSelect</li><li>✅ <strong>v-model on child</strong> - Two-way binding between parent and child</li><li>✅ <strong>Props down</strong> - fieldOptions and label passed to child</li><li>✅ <strong>Events up</strong> - Child emits update:modelValue to parent</li><li>✅ <strong>Reactive slots</strong> - Child uses v-for with SlimSelect slot options</li><li>✅ <strong>Computed value</strong> - Child computes value getter/setter for v-model</li><li>✅ <strong>afterChange callback</strong> - Custom logic in child component</li><li>✅ <strong>Fully reactive</strong> - Parent data changes flow to child automatically</li></ul></div>`,7))])}const W=V(N,[["render",H]]);export{W as default};
