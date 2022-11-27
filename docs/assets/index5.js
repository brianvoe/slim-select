import{d as v,S as y,_,o as u,c as d,l as O,r as g,a as e,f as l,t as c,b as a,w as s,i as V,F as f,h as S}from"./index.js";const C=v({name:"SlimSelect",props:{modelValue:{type:[String,Array,void 0]},multiple:{type:Boolean,default:!1},data:{type:Array},settings:{type:Object},events:{type:Object}},emits:["update:modelValue"],data(){return{slim:null}},mounted(){let t={select:this.$refs.slim};this.data&&(t.data=this.data),this.settings&&(t.settings=this.settings),this.events&&(t.events=this.events),t.events||(t.events={});const n=t.events.afterChange;t.events.afterChange=p=>{const r=this.multiple?p.map(h=>h.value):p[0].value;this.value!==r&&(this.value=r),t.events&&n&&n(p)},this.slim=new y(t);let m=this.$props.multiple?this.slim.getSelected():this.slim.getSelected()[0];this.value!==m&&(this.value=m)},beforeUnmount(){this.slim&&this.slim.destroy()},watch:{data:{handler:function(t){this.slim&&this.slim.setData(t)},deep:!0}},computed:{value:{get(){const t=this.$props.multiple,n=this.$props.modelValue;return n===void 0?t?[]:"":t&&typeof n=="string"?[n]:!t&&Array.isArray(n)?n[0]:t?[]:""},set(t){this.$emit("update:modelValue",t)}}},methods:{getSlimSelect(){return this.slim}}}),$=["multiple"];function b(t,n,m,p,r,h){return u(),d("select",{multiple:t.multiple,ref:"slim"},[O(t.$slots,"default")],8,$)}const w=_(C,[["render",b]]),D=v({name:"Vue",components:{SlimSelect:w},data(){return{simpleSingle:"",simpleMultiple:[],dynamicSingle:"",dynamicMultiple:[],settings:{showSearch:!1},data:[{value:"value1",text:"Value 1"},{value:"value2",text:"Value 2"},{value:"value3",text:"Value 3"}],dynamicData:[],afterChangeData:[],events:{afterChange:this.afterChange}}},mounted(){},methods:{changeData(){this.$refs.dataSingle.getSlimSelect().open(),this.$refs.dataMultiple.getSlimSelect().open(),setTimeout(()=>{this.data=[{value:"value4",text:"Value 4"},{value:"value5",text:"Value 5"},{value:"value6",text:"Value 6"}]},500)},afterChange(t){this.afterChangeData=t},randomDynamicData(){fetch("https://api.gofakeit.com/json",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"array",rowcount:20,indent:!1,fields:[{name:"key",function:"password",params:{lower:!0,upper:!0,numeric:!0,special:!1,space:!1,length:10}},{name:"first_name",function:"firstname",params:{}},{name:"last_name",function:"lastname",params:{}},{name:"selected",function:"number",params:{min:1,max:10}}]})}).then(t=>t.json()).then(t=>{this.dynamicData=t.map(n=>({id:n.id,text:`${n.first_name} ${n.last_name}`,value:`${n.first_name} ${n.last_name}`,selected:n.selected>=8}))})}}}),j={id:"vue",class:"content"},k=e("h2",{class:"header"},"Vue",-1),M=e("h3",null,"Install",-1),A=e("p",null," The vue component is in a sub package under SlimSelect. All functionality still work in the implementation. I have also added a v-model bind capability to it as well. ",-1),T=e("pre",null,[l("      "),e("code",{class:"language-bash"},`
        npm install @slim-select/vue
      `),l(`
    `)],-1),B=e("br",null,null,-1),N=e("h3",null,"Simple example",-1),U={class:"row"},x=e("strong",null,"Value",-1),E=e("option",{value:"1"},"Option 1",-1),F=e("option",{value:"2"},"Option 2",-1),I=e("option",{value:"3"},"Option 3",-1),R=e("strong",null,"Value",-1),J=e("option",{value:"1"},"Option 1",-1),L=e("option",{value:"2"},"Option 2",-1),P=e("option",{value:"3"},"Option 3",-1),Y=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        import { defineComponent } from 'vue'
        import SlimSelect from '@slim-select/vue'

        export default defineComponent({
          components: {
            SlimSelect,
          },
          data() {
            return {
              single: '',
              multiple: []
            }
          }
        })
      `),l(`
    `)],-1),q=e("pre",null,[l("      "),e("code",{class:"language-html"},`
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
    `)],-1),z=e("br",null,null,-1),G=e("div",{class:"separator"},null,-1),H=e("br",null,null,-1),K=e("h3",null,"Settings",-1),Q=e("p",null," Settings just like its passed as an object in normal SlimSelct will also be passed as an object to the component prop ",-1),W={class:"row"},X=e("option",{value:"1"},"Option 1",-1),Z=e("option",{value:"2"},"Option 2",-1),ee=e("option",{value:"3"},"Option 3",-1),te=e("option",{value:"1"},"Option 1",-1),ne=e("option",{value:"2"},"Option 2",-1),le=e("option",{value:"3"},"Option 3",-1),oe=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        import { defineComponent } from 'vue'
        import SlimSelect from '@slim-select/vue'

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
    `)],-1),ie=e("pre",null,[l("      "),e("code",{class:"language-html"},`
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
    `)],-1),ae=e("br",null,null,-1),se=e("div",{class:"separator"},null,-1),ue=e("br",null,null,-1),de=e("h3",null,"Data",-1),pe=e("p",null," Data just like its passed as an array in normal SlimSelct will also be passed as an array to the component prop. ",-1),ce=e("div",{class:"alert info"}," You may pass data as a prop if you would like. But you can also have reactive options that when options change the select will update as well. See Reactivity below for more info. ",-1),me={class:"row"},re=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        import { defineComponent } from 'vue'
        import SlimSelect from '@slim-select/vue'

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
    `)],-1),he=e("pre",null,[l("      "),e("code",{class:"language-html"},`
        <SlimSelect :data="data" />

        <SlimSelect :data="data" multiple />
      `),l(`
    `)],-1),ve=e("br",null,null,-1),_e=e("div",{class:"separator"},null,-1),fe=e("br",null,null,-1),Se=e("h3",null,"Events",-1),ge=e("p",null," Events just like its passed as an object in normal SlimSelct will also be passed as an object to the component prop. ",-1),ye={key:0},Oe=e("strong",null,"afterChange:",-1),Ve={class:"row"},Ce=e("option",{value:"1"},"Option 1",-1),$e=e("option",{value:"2"},"Option 2",-1),be=e("option",{value:"3"},"Option 3",-1),we=e("option",{value:"1"},"Option 1",-1),De=e("option",{value:"2"},"Option 2",-1),je=e("option",{value:"3"},"Option 3",-1),ke=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        import { defineComponent } from 'vue'
        import SlimSelect from '@slim-select/vue'

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
    `)],-1),Me=e("pre",null,[l("      "),e("code",{class:"language-html"},`
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
    `)],-1),Ae=e("br",null,null,-1),Te=e("div",{class:"separator"},null,-1),Be=e("br",null,null,-1),Ne=e("h3",null,"Reactivity",-1),Ue=e("p",null," Slim select will look out for any options changes that happen to the select options and SlimSelect will update accordingly. This is done via mutation observers. ",-1),xe={class:"row"},Ee=e("strong",null,"Value:",-1),Fe=["value","selected"],Ie=e("strong",null,"Value:",-1),Re=["value","selected"],Je=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        import { defineComponent } from 'vue'
        import SlimSelect from '@slim-select/vue'

        export default defineComponent({
          components: {
            SlimSelect,
          },
          data() {
            return {
              singleValue: '',
              mutipleValue: [],
              dynamicData: []
            }
          },
          methods: {
            changeData() {
              this.dynamicData = [
                { id: 1, value: 1, text: 'Option 1', selected: true },
                { id: 2, value: 2, text: 'Option 2', selected: false },
                { id: 3, value: 3, text: 'Option 3', selected: false },
              ]
            },
          },
        })
      `),l(`
    `)],-1),Le=e("pre",null,[l("      "),e("code",{class:"language-html"},`
        <SlimSelect v-model="singleValue">
          <option v-for="d in dynamicData" :key="d.id" :value="d.value" :selected="d.selected">{{ d.text }}</option>
        </SlimSelect>

        <SlimSelect v-model="mutipleValue" multiple>
          <option v-for="d in dynamicData" :value="d.value" :selected="d.selected">{{ d.text }}</option>
        </SlimSelect>
      `),l(`
    `)],-1);function Pe(t,n,m,p,r,h){const i=g("SlimSelect");return u(),d("div",j,[k,M,A,T,B,N,e("div",U,[e("div",null,[e("div",null,[x,l(" "+c(t.simpleSingle),1)]),a(i,{modelValue:t.simpleSingle,"onUpdate:modelValue":n[0]||(n[0]=o=>t.simpleSingle=o),ref:"simpleSingle"},{default:s(()=>[E,F,I]),_:1},8,["modelValue"])]),e("div",null,[e("div",null,[R,l(" "+c(t.simpleMultiple),1)]),a(i,{modelValue:t.simpleMultiple,"onUpdate:modelValue":n[1]||(n[1]=o=>t.simpleMultiple=o),ref:"simpleMultiple",multiple:""},{default:s(()=>[J,L,P]),_:1},8,["modelValue"])])]),Y,q,z,G,H,K,Q,e("div",W,[a(i,{settings:t.settings},{default:s(()=>[X,Z,ee]),_:1},8,["settings"]),a(i,{settings:t.settings,multiple:""},{default:s(()=>[te,ne,le]),_:1},8,["settings"])]),oe,ie,ae,se,ue,de,pe,ce,e("div",me,[e("div",{class:"btn info",onClick:n[2]||(n[2]=(...o)=>t.changeData&&t.changeData(...o))},"Change data"),a(i,{ref:"dataSingle",data:t.data},null,8,["data"]),a(i,{ref:"dataMultiple",data:t.data,multiple:""},null,8,["data"])]),re,he,ve,_e,fe,Se,ge,t.afterChangeData.length?(u(),d("div",ye,[Oe,l(" "+c(t.afterChangeData),1)])):V("",!0),e("div",Ve,[a(i,{events:t.events},{default:s(()=>[Ce,$e,be]),_:1},8,["events"]),a(i,{events:t.events,multiple:""},{default:s(()=>[we,De,je]),_:1},8,["events"])]),ke,Me,Ae,Te,Be,Ne,Ue,e("div",xe,[e("div",{class:"btn info",onClick:n[3]||(n[3]=(...o)=>t.randomDynamicData&&t.randomDynamicData(...o))},"Change data"),e("div",null,[e("div",null,[Ee,l(" "+c(t.dynamicSingle),1)]),a(i,{modelValue:t.dynamicSingle,"onUpdate:modelValue":n[4]||(n[4]=o=>t.dynamicSingle=o)},{default:s(()=>[(u(!0),d(f,null,S(t.dynamicData,o=>(u(),d("option",{key:o.id,value:o.value,selected:o.selected},c(o.text),9,Fe))),128))]),_:1},8,["modelValue"])]),e("div",null,[e("div",null,[Ie,l(" "+c(t.dynamicMultiple),1)]),a(i,{modelValue:t.dynamicMultiple,"onUpdate:modelValue":n[5]||(n[5]=o=>t.dynamicMultiple=o),multiple:""},{default:s(()=>[(u(!0),d(f,null,S(t.dynamicData,o=>(u(),d("option",{value:o.value,selected:o.selected},c(o.text),9,Re))),256))]),_:1},8,["modelValue"])])]),Je,Le])}const Ye=_(D,[["render",Pe]]),qe=v({name:"Events",components:{Vue:Ye}}),ze={id:"frameworks",class:"contents"};function Ge(t,n,m,p,r,h){const i=g("Vue");return u(),d("div",ze,[a(i)])}const Ke=_(qe,[["render",Ge]]);export{Ke as default};
