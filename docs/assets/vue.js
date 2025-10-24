import{d as C,S as h,_ as V,c as d,j as w,o as m,f as y,a as t,e as n,t as r,w as o,r as S,g as f,F as $,h as k,i as F,b as j,n as D}from"./index.js";const A=C({name:"SlimSelect",props:{modelValue:{type:[String,Array,void 0]},multiple:{type:Boolean,default:!1},data:{type:Array},settings:{type:Object},events:{type:Object,default:()=>({})}},emits:["update:modelValue"],data(){return{slim:null}},mounted(){this.$slots.default&&this.$slots.default().length>0&&this.data&&console.warn("[SlimSelect Vue] Both slot content and data prop are provided. Data prop will take precedence and slot content will be ignored.");let e={select:this.$refs.slim};this.data&&(e.data=this.data),this.settings&&(e.settings=this.settings);const u=this.events?.afterChange;e.events={...this.events,afterChange:p=>{const g=this.multiple?p.map(i=>i.value):p.length>0?p[0].value:"";this.value!==g&&(this.value=g),u&&u(p)}},this.slim=new h(e);let v=this.$props.multiple?this.slim.getSelected():this.slim.getSelected()[0];this.value!==v&&this.slim.setSelected(this.value,!1)},updated(){if(this.slim&&!this.data){const l=this.slim.getSelected(),e=Array.isArray(this.value)?this.value:[this.value];JSON.stringify(l.sort())!==JSON.stringify(e.sort())&&this.slim.setSelected(this.value,!1)}},beforeUnmount(){this.slim&&this.slim.destroy()},watch:{modelValue:{handler:function(l){this.slim&&this.slim.setSelected(this.getCleanValue(l),!1)}},data:{handler:function(l){this.slim&&this.slim.setData(l)},deep:!0}},computed:{value:{get(){return this.getCleanValue(this.$props.modelValue)},set(l){this.$emit("update:modelValue",l)}}},methods:{getSlimSelect(){return this.slim},getCleanValue(l){const e=this.$props.multiple;return typeof l=="string"?e?[l]:l:Array.isArray(l)?e?l:l[0]:e?[]:""}}}),E=["multiple"];function x(l,e,u,v,p,g){return m(),d("select",{multiple:l.multiple,ref:"slim"},[w(l.$slots,"default")],8,E)}const b=V(A,[["render",x]]),M=C({name:"ComplexFieldExample",components:{ShikiStyle:y,SlimSelect:b},props:{modelValue:{type:Array,required:!0},fieldOptions:{type:Array,required:!0},label:{type:String,required:!0}},emits:["update:modelValue"],computed:{value:{get(){return this.modelValue||[]},set(l){this.$emit("update:modelValue",l)}}},methods:{handleChange(){}}}),P={class:"complex-field"},N=["value"],T={style:{"margin-top":"8px"}};function B(l,e,u,v,p,g){const i=S("SlimSelect");return m(),d("div",P,[t("h4",null,r(l.label),1),n(i,{modelValue:l.value,"onUpdate:modelValue":e[0]||(e[0]=s=>l.value=s),multiple:"",events:{afterChange:()=>l.handleChange()}},{default:o(()=>[(m(!0),d($,null,k(l.fieldOptions,s=>(m(),d("option",{key:s.value,value:s.value},r(s.name),9,N))),128))]),_:1},8,["modelValue","events"]),t("div",T,[e[1]||(e[1]=t("strong",null,"Selected:",-1)),f(" "+r(l.value.join(", ")||"None"),1)])])}const U=V(M,[["render",B]]),q=C({name:"Vue",components:{ShikiStyle:y,SlimSelect:b,ComplexFieldExample:U},data(){return{simpleSingle:"2",simpleMultiple:["2","3"],settings:{showSearch:!1},data:[{value:"value1",text:"Value 1"},{value:"value2",text:"Value 2"},{value:"value3",text:"Value 3"}],afterChangeData:[],events:{afterChange:this.afterChange},isDisabled:!1,errorClass:"",customFieldsValues:{favoriteColors:["blue"],skills:["javascript","typescript"]},fieldOptions:{favoriteColors:[{value:"red",name:"Red"},{value:"blue",name:"Blue"},{value:"green",name:"Green"},{value:"yellow",name:"Yellow"}],skills:[{value:"javascript",name:"JavaScript"},{value:"typescript",name:"TypeScript"},{value:"vue",name:"Vue.js"},{value:"react",name:"React"},{value:"angular",name:"Angular"}]}}},mounted(){},methods:{changeData(){this.$refs.dataSingle.getSlimSelect().open(),this.$refs.dataMultiple.getSlimSelect().open(),setTimeout(()=>{this.data=[{value:"value4",text:"Value 4"},{value:"value5",text:"Value 5"},{value:"value6",text:"Value 6"}]},500)},afterChange(l){this.afterChangeData=l}}}),R={id:"vue",class:"content"},J={class:"row"},I={class:"row"},G={class:"row"},Y={key:0},z={class:"row"},K={class:"row"},L={class:"row"},H={class:"row"},Q={class:"alert info",style:{"margin-top":"16px"}},W={style:{margin:"8px 0 0 0",background:"rgba(0, 0, 0, 0.1)",padding:"8px","border-radius":"4px"}};function X(l,e,u,v,p,g){const i=S("ShikiStyle"),s=S("SlimSelect"),O=S("ComplexFieldExample");return m(),d("div",R,[e[35]||(e[35]=t("h2",{class:"header"},"Vue",-1)),e[36]||(e[36]=t("h3",null,"Install",-1)),e[37]||(e[37]=t("p",null,"Install the slim-select package:",-1)),n(i,{language:"bash"},{default:o(()=>[...e[7]||(e[7]=[t("pre",null,`        npm install slim-select
      `,-1)])]),_:1}),e[38]||(e[38]=t("p",null,"Import the Vue component and styles:",-1)),n(i,{language:"javascript"},{default:o(()=>[...e[8]||(e[8]=[t("pre",null,`        import SlimSelect from 'slim-select/vue'
        import 'slim-select/styles' // CSS
        // or
        import 'slim-select/scss' // SCSS
      `,-1)])]),_:1}),e[39]||(e[39]=t("h3",null,"Simple example",-1)),t("div",J,[t("div",null,[t("div",null,[e[9]||(e[9]=t("strong",null,"Value",-1)),f(" "+r(l.simpleSingle),1)]),n(s,{modelValue:l.simpleSingle,"onUpdate:modelValue":e[0]||(e[0]=a=>l.simpleSingle=a),ref:"simpleSingle"},{default:o(()=>[...e[10]||(e[10]=[t("option",{value:"all"},"All",-1),t("option",{value:"1"},"Option 1",-1),t("option",{value:"2"},"Option 2",-1),t("option",{value:"3"},"Option 3",-1)])]),_:1},8,["modelValue"])]),t("div",null,[t("div",null,[e[11]||(e[11]=t("strong",null,"Value",-1)),f(" "+r(l.simpleMultiple),1)]),n(s,{modelValue:l.simpleMultiple,"onUpdate:modelValue":e[1]||(e[1]=a=>l.simpleMultiple=a),ref:"simpleMultiple",multiple:""},{default:o(()=>[...e[12]||(e[12]=[t("option",{value:"1"},"Option 1",-1),t("option",{value:"2"},"Option 2",-1),t("option",{value:"3"},"Option 3",-1)])]),_:1},8,["modelValue"])])]),n(i,{language:"javascript"},{default:o(()=>[...e[13]||(e[13]=[t("pre",null,`        import { defineComponent } from 'vue'
        import SlimSelect from 'slim-select/vue'

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
      `,-1)])]),_:1}),n(i,{language:"html"},{default:o(()=>[...e[14]||(e[14]=[t("pre",null,`        <SlimSelect v-model="single">
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </SlimSelect>

        <SlimSelect v-model="multiple" multiple>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </SlimSelect>
      `,-1)])]),_:1}),e[40]||(e[40]=t("div",{class:"separator"},null,-1)),e[41]||(e[41]=t("h3",null,"Settings",-1)),e[42]||(e[42]=t("p",null," Settings just like its passed as an object in normal SlimSelect will also be passed as an object to the component prop ",-1)),t("div",I,[n(s,{settings:l.settings},{default:o(()=>[...e[15]||(e[15]=[t("option",{value:"1"},"Option 1",-1),t("option",{value:"2"},"Option 2",-1),t("option",{value:"3"},"Option 3",-1)])]),_:1},8,["settings"]),n(s,{settings:l.settings,multiple:""},{default:o(()=>[...e[16]||(e[16]=[t("option",{value:"1"},"Option 1",-1),t("option",{value:"2"},"Option 2",-1),t("option",{value:"3"},"Option 3",-1)])]),_:1},8,["settings"])]),n(i,{language:"javascript"},{default:o(()=>[...e[17]||(e[17]=[t("pre",null,`        import { defineComponent } from 'vue'
        import SlimSelect from 'slim-select/vue'

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
        `,-1)])]),_:1}),n(i,{language:"html"},{default:o(()=>[...e[18]||(e[18]=[t("pre",null,`        <SlimSelect :settings="settings">
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </SlimSelect>

        <SlimSelect :settings="settings" multiple>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </SlimSelect>
      `,-1)])]),_:1}),e[43]||(e[43]=t("div",{class:"separator"},null,-1)),e[44]||(e[44]=t("h3",null,"Data",-1)),e[45]||(e[45]=t("p",null," Data just like its passed as an array in normal SlimSelct will also be passed as an array to the component prop. ",-1)),e[46]||(e[46]=t("div",{class:"alert info"}," You may pass data as a prop if you would like. But you can also have reactive options that when options change the select will update as well. See Reactivity below for more info. ",-1)),t("div",G,[t("div",{class:"btn info",onClick:e[2]||(e[2]=(...a)=>l.changeData&&l.changeData(...a))},"Change data"),n(s,{ref:"dataSingle",data:l.data},null,8,["data"]),n(s,{ref:"dataMultiple",data:l.data,multiple:""},null,8,["data"])]),n(i,{language:"javascript"},{default:o(()=>[...e[19]||(e[19]=[t("pre",null,`        import { defineComponent } from 'vue'
        import SlimSelect from 'slim-select/vue'

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
      `,-1)])]),_:1}),n(i,{language:"html"},{default:o(()=>[...e[20]||(e[20]=[t("pre",null,`        <SlimSelect :data="data" />

        <SlimSelect :data="data" multiple />
      `,-1)])]),_:1}),e[47]||(e[47]=t("div",{class:"separator"},null,-1)),e[48]||(e[48]=t("h3",null,"Events",-1)),e[49]||(e[49]=t("p",null," Events just like its passed as an object in normal SlimSelct will also be passed as an object to the component prop. ",-1)),l.afterChangeData.length?(m(),d("div",Y,[e[21]||(e[21]=t("strong",null,"afterChange:",-1)),f(" "+r(l.afterChangeData),1)])):F("",!0),t("div",z,[n(s,{events:l.events},{default:o(()=>[...e[22]||(e[22]=[t("option",{value:"1"},"Option 1",-1),t("option",{value:"2"},"Option 2",-1),t("option",{value:"3"},"Option 3",-1)])]),_:1},8,["events"]),n(s,{events:l.events,multiple:""},{default:o(()=>[...e[23]||(e[23]=[t("option",{value:"1"},"Option 1",-1),t("option",{value:"2"},"Option 2",-1),t("option",{value:"3"},"Option 3",-1)])]),_:1},8,["events"])]),n(i,{language:"javascript"},{default:o(()=>[...e[24]||(e[24]=[t("pre",null,`        import { defineComponent } from 'vue'
        import SlimSelect from 'slim-select/vue'

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
      `,-1)])]),_:1}),n(i,{language:"html"},{default:o(()=>[...e[25]||(e[25]=[t("pre",null,`        <SlimSelect :events="events">
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </SlimSelect>

        <SlimSelect :events="events" multiple>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </SlimSelect>
      `,-1)])]),_:1}),e[50]||(e[50]=t("div",{class:"separator"},null,-1)),e[51]||(e[51]=t("h3",null,"Attributes",-1)),e[52]||(e[52]=t("p",null,"There are certain attributes that are reactive to changes",-1)),e[53]||(e[53]=t("h4",null,"disabled",-1)),t("div",K,[t("div",{class:"btn",onClick:e[3]||(e[3]=a=>l.isDisabled=!l.isDisabled)},"Toggle Disabled"),n(s,{disabled:l.isDisabled},{default:o(()=>[...e[26]||(e[26]=[t("option",{value:"1"},"Option 1",-1),t("option",{value:"2"},"Option 2",-1),t("option",{value:"3"},"Option 3",-1)])]),_:1},8,["disabled"])]),n(i,{language:"html"},{default:o(()=>[...e[27]||(e[27]=[t("pre",null,`        <SlimSelect :disabled="isDisabled">
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </SlimSelect>
      `,-1)])]),_:1}),e[54]||(e[54]=t("h4",null,"class",-1)),t("div",L,[t("div",{class:"btn",onClick:e[4]||(e[4]=a=>l.errorClass=l.errorClass===""?"error":"")},"Toggle Error"),n(s,{class:D(["dynamicClass",l.errorClass])},{default:o(()=>[...e[28]||(e[28]=[t("option",{value:"1"},"Option 1",-1),t("option",{value:"2"},"Option 2",-1),t("option",{value:"3"},"Option 3",-1)])]),_:1},8,["class"])]),n(i,{language:"html"},{default:o(()=>[...e[29]||(e[29]=[t("pre",null,`        <SlimSelect :class="myClass">
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </SlimSelect>
      `,-1)])]),_:1}),e[55]||(e[55]=t("div",{class:"separator"},null,-1)),e[56]||(e[56]=t("h3",null,"Complex Example: Custom Fields Pattern",-1)),e[57]||(e[57]=t("p",null," This example demonstrates a real-world use case similar to a CustomFields component that manages multiple dynamic form fields with computed values, reactive slot content, and bidirectional data flow. ",-1)),e[58]||(e[58]=t("div",{class:"alert info"},[t("strong",null,"Pattern:"),f(" Computed values → Reactive slots → v-model → afterChange callback → Update parent data ")],-1)),t("div",H,[n(O,{modelValue:l.customFieldsValues.favoriteColors,"onUpdate:modelValue":e[5]||(e[5]=a=>l.customFieldsValues.favoriteColors=a),"field-options":l.fieldOptions.favoriteColors,label:"Favorite Colors"},null,8,["modelValue","field-options"]),n(O,{modelValue:l.customFieldsValues.skills,"onUpdate:modelValue":e[6]||(e[6]=a=>l.customFieldsValues.skills=a),"field-options":l.fieldOptions.skills,label:"Skills"},null,8,["modelValue","field-options"])]),t("div",Q,[e[30]||(e[30]=t("strong",null,"Parent Data:",-1)),t("pre",W,r(JSON.stringify(l.customFieldsValues,null,2)),1)]),e[59]||(e[59]=t("p",null,[t("strong",null,"Parent Component (vue.vue):")],-1)),n(i,{language:"javascript"},{default:o(()=>[...e[31]||(e[31]=[t("pre",null,`        import ComplexFieldExample from 'slim-select/vue'

        export default {
          components: { ComplexFieldExample },
          data() {
            return {
              // Parent stores the values
              customFieldsValues: {
                favoriteColors: ['blue'],
                skills: ['javascript', 'typescript']
              },
              // Parent stores the options
              fieldOptions: {
                favoriteColors: [
                  { value: 'red', name: 'Red' },
                  { value: 'blue', name: 'Blue' },
                  { value: 'green', name: 'Green' }
                ],
                skills: [
                  { value: 'javascript', name: 'JavaScript' },
                  { value: 'typescript', name: 'TypeScript' },
                  { value: 'vue', name: 'Vue.js' }
                ]
              }
            }
          }
        }
      `,-1)])]),_:1}),n(i,{language:"html"},{default:o(()=>[...e[32]||(e[32]=[t("pre",null,`        <!-- Parent template -->
        <ComplexFieldExample
          label="Favorite Colors"
          v-model="customFieldsValues.favoriteColors"
          :field-options="fieldOptions.favoriteColors"
        />

        <ComplexFieldExample
          label="Skills"
          v-model="customFieldsValues.skills"
          :field-options="fieldOptions.skills"
        />
      `,-1)])]),_:1}),e[60]||(e[60]=t("p",null,[t("strong",null,"Child Component (complex.vue):")],-1)),n(i,{language:"javascript"},{default:o(()=>[...e[33]||(e[33]=[t("pre",null,`        import SlimSelect from 'slim-select/vue'

        export default {
          components: { SlimSelect },
          props: {
            modelValue: { type: Array, required: true },
            fieldOptions: { type: Array, required: true },
            label: { type: String, required: true }
          },
          emits: ['update:modelValue'],
          computed: {
            value: {
              get() { return this.modelValue || [] },
              set(newValue) { this.$emit('update:modelValue', newValue) }
            }
          },
          methods: {
            handleChange() {
              console.log(\`\${this.label} changed:\`, this.value)
            }
          }
        }
      `,-1)])]),_:1}),n(i,{language:"html"},{default:o(()=>[...e[34]||(e[34]=[t("pre",null,`        <!-- Child template with reactive slot content -->
        <SlimSelect
          v-model="value"
          multiple
          :events="{ afterChange: () => handleChange() }">
          <option
            v-for="option in fieldOptions"
            :key="option.value"
            :value="option.value">
            {{ option.name }}
          </option>
        </SlimSelect>
      `,-1)])]),_:1}),e[61]||(e[61]=j('<div class="alert info"><strong>Key Features:</strong><ul><li>✅ <strong>Parent-child pattern</strong> - Parent stores data, child renders SlimSelect</li><li>✅ <strong>v-model on child</strong> - Two-way binding between parent and child</li><li>✅ <strong>Props down</strong> - fieldOptions and label passed to child</li><li>✅ <strong>Events up</strong> - Child emits update:modelValue to parent</li><li>✅ <strong>Reactive slots</strong> - Child uses v-for with SlimSelect slot options</li><li>✅ <strong>Computed value</strong> - Child computes value getter/setter for v-model</li><li>✅ <strong>afterChange callback</strong> - Custom logic in child component</li><li>✅ <strong>Fully reactive</strong> - Parent data changes flow to child automatically</li></ul></div>',1))])}const c=V(q,[["render",X]]);export{c as default};
