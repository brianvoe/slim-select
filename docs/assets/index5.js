import{d as m,S as O,_,o as c,c as d,l as y,r as g,a as e,b as s,w as i,f as n,t as r,i as b,F as S,h as f}from"./index.js";const C=m({name:"SlimSelect",props:{data:{type:Array},settings:{type:Object},events:{type:Object}},data(){return{slim:null}},mounted(){let t={select:this.$refs.slim};this.data&&(t.data=this.data),this.settings&&(t.settings=this.settings),this.events&&(t.events=this.events),this.slim=new O(t)},beforeUnmount(){this.slim&&this.slim.destroy()},watch:{data:{handler:function(t){this.slim&&this.slim.setData(t)},deep:!0}},methods:{getSlimSelect(){return this.slim}}}),w={ref:"slim"};function D(t,o,p,u,h,v){return c(),d("select",w,[y(t.$slots,"default")],512)}const $=_(C,[["render",D]]),V=m({name:"Vue",components:{SlimSelect:$},data(){return{settings:{showSearch:!1},data:[{value:"value1",text:"Value 1"},{value:"value2",text:"Value 2"},{value:"value3",text:"Value 3"}],dynamicData:[],afterChangeData:[],events:{afterChange:this.afterChange}}},mounted(){},methods:{changeData(){this.$refs.dataSingle.getSlimSelect().open(),this.$refs.dataMultiple.getSlimSelect().open(),setTimeout(()=>{this.data=[{value:"value4",text:"Value 4"},{value:"value5",text:"Value 5"},{value:"value6",text:"Value 6"}]},500)},afterChange(t){this.afterChangeData=t},randomDynamicData(){fetch("https://api.gofakeit.com/json",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"array",rowcount:20,indent:!1,fields:[{name:"key",function:"password",params:{lower:!0,upper:!0,numeric:!0,special:!1,space:!1,length:10}},{name:"first_name",function:"firstname",params:{}},{name:"last_name",function:"lastname",params:{}},{name:"selected",function:"number",params:{min:1,max:10}}]})}).then(t=>t.json()).then(t=>{this.dynamicData=t.map(o=>({id:o.id,text:`${o.first_name} ${o.last_name}`,value:`${o.first_name} ${o.last_name}`,selected:o.selected>=8}))})}}}),j={id:"vue",class:"content"},x=e("h2",{class:"header"},"Vue",-1),k=e("h3",null,"Install",-1),M=e("p",null,"The vue component is in a sub package under SlimSelect",-1),T=e("pre",null,[n("      "),e("code",{class:"language-bash"},`
        npm install @slim-select/vue
      `),n(`
    `)],-1),N=e("br",null,null,-1),B=e("h3",null,"Simple example",-1),E={class:"row"},F=e("option",{value:"1"},"Option 1",-1),R=e("option",{value:"2"},"Option 2",-1),A=e("option",{value:"3"},"Option 3",-1),I=e("option",{value:"1"},"Option 1",-1),J=e("option",{value:"2"},"Option 2",-1),L=e("option",{value:"3"},"Option 3",-1),P=e("pre",null,[n("      "),e("code",{class:"language-javascript"},`
        import { defineComponent } from 'vue'
        import SlimSelect from '@slim-select/vue'

        export default defineComponent({
          components: {
            SlimSelect,
          },
        })
      `),n(`
    `)],-1),U=e("pre",null,[n("      "),e("code",{class:"language-html"},`
        <SlimSelect>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </SlimSelect>

        <SlimSelect multiple>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </SlimSelect>
      `),n(`
    `)],-1),Y=e("br",null,null,-1),q=e("div",{class:"separator"},null,-1),z=e("br",null,null,-1),G=e("h3",null,"Settings",-1),H=e("p",null," Settings just like its passed as an object in normal SlimSelct will also be passed as an object to the component prop ",-1),K={class:"row"},Q=e("option",{value:"1"},"Option 1",-1),W=e("option",{value:"2"},"Option 2",-1),X=e("option",{value:"3"},"Option 3",-1),Z=e("option",{value:"1"},"Option 1",-1),ee=e("option",{value:"2"},"Option 2",-1),te=e("option",{value:"3"},"Option 3",-1),ne=e("pre",null,[n("      "),e("code",{class:"language-javascript"},`
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
      `),n(`
    `)],-1),oe=e("pre",null,[n("      "),e("code",{class:"language-html"},`
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
    `)],-1),le=e("br",null,null,-1),ae=e("div",{class:"separator"},null,-1),se=e("br",null,null,-1),ie=e("h3",null,"Data",-1),ce=e("p",null," Data just like its passed as an array in normal SlimSelct will also be passed as an array to the component prop. ",-1),de=e("div",{class:"alert info"}," You may pass data as a prop if you would like. But you can also have reactive options that when options change the select will update as well. See Reactivity below for more info. ",-1),pe={class:"row"},ue=e("pre",null,[n("      "),e("code",{class:"language-javascript"},`
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
      `),n(`
    `)],-1),re=e("pre",null,[n("      "),e("code",{class:"language-html"},`
        <SlimSelect :data="data" />

        <SlimSelect :data="data" multiple />
      `),n(`
    `)],-1),me=e("br",null,null,-1),_e=e("div",{class:"separator"},null,-1),he=e("br",null,null,-1),ve=e("h3",null,"Events",-1),Se=e("p",null," Events just like its passed as an object in normal SlimSelct will also be passed as an object to the component prop. ",-1),fe={key:0},ge=e("strong",null,"afterChange:",-1),Oe={class:"row"},ye=e("option",{value:"1"},"Option 1",-1),be=e("option",{value:"2"},"Option 2",-1),Ce=e("option",{value:"3"},"Option 3",-1),we=e("option",{value:"1"},"Option 1",-1),De=e("option",{value:"2"},"Option 2",-1),$e=e("option",{value:"3"},"Option 3",-1),Ve=e("pre",null,[n("      "),e("code",{class:"language-javascript"},`
        import { defineComponent } from 'vue'
        import SlimSelect from '@slim-select/vue'

        export default defineComponent({
          components: {
            SlimSelect,
          },
          data() {
            return {
              data: [],
            }
          },
          methods: {
            afterChange(newVal) {
              console.log(newVal)
            },
          },
        })
      `),n(`
    `)],-1),je=e("pre",null,[n("      "),e("code",{class:"language-html"},`
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
    `)],-1),xe=e("br",null,null,-1),ke=e("div",{class:"separator"},null,-1),Me=e("br",null,null,-1),Te=e("h3",null,"Reactivity",-1),Ne=e("p",null," Slim select will look out for any options changes that happen to the select options and SlimSelect will update accordingly. This is done via mutation observers. ",-1),Be={class:"row"},Ee=["value","selected"],Fe=["value","selected"],Re=e("pre",null,[n("      "),e("code",{class:"language-javascript"},`
        import { defineComponent } from 'vue'
        import SlimSelect from '@slim-select/vue'

        export default defineComponent({
          components: {
            SlimSelect,
          },
          data() {
            return {
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
      `),n(`
    `)],-1),Ae=e("pre",null,[n("      "),e("code",{class:"language-html"},`
        <SlimSelect :events="events">
          <option v-for="d in dynamicData" :key="d.id" :value="d.value" :selected="d.selected">{{ d.text }}</option>
        </SlimSelect>

        <SlimSelect :events="events" multiple>
          <option v-for="d in dynamicData" :value="d.value" :selected="d.selected">{{ d.text }}</option>
        </SlimSelect>
      `),n(`
    `)],-1);function Ie(t,o,p,u,h,v){const l=g("SlimSelect");return c(),d("div",j,[x,k,M,T,N,B,e("div",E,[s(l,null,{default:i(()=>[F,R,A]),_:1}),s(l,{multiple:""},{default:i(()=>[I,J,L]),_:1})]),P,U,Y,q,z,G,H,e("div",K,[s(l,{settings:t.settings},{default:i(()=>[Q,W,X]),_:1},8,["settings"]),s(l,{settings:t.settings,multiple:""},{default:i(()=>[Z,ee,te]),_:1},8,["settings"])]),ne,oe,le,ae,se,ie,ce,de,e("div",pe,[e("div",{class:"btn info",onClick:o[0]||(o[0]=(...a)=>t.changeData&&t.changeData(...a))},"Change data"),s(l,{ref:"dataSingle",data:t.data},null,8,["data"]),s(l,{ref:"dataMultiple",data:t.data,multiple:""},null,8,["data"])]),ue,re,me,_e,he,ve,Se,t.afterChangeData.length?(c(),d("div",fe,[ge,n(" "+r(t.afterChangeData),1)])):b("",!0),e("div",Oe,[s(l,{events:t.events},{default:i(()=>[ye,be,Ce]),_:1},8,["events"]),s(l,{events:t.events,multiple:""},{default:i(()=>[we,De,$e]),_:1},8,["events"])]),Ve,je,xe,ke,Me,Te,Ne,e("div",Be,[e("div",{class:"btn info",onClick:o[1]||(o[1]=(...a)=>t.randomDynamicData&&t.randomDynamicData(...a))},"Change data"),s(l,{ref:"randomDynamic"},{default:i(()=>[(c(!0),d(S,null,f(t.dynamicData,a=>(c(),d("option",{key:a.id,value:a.value,selected:a.selected},r(a.text),9,Ee))),128))]),_:1},512),s(l,{multiple:""},{default:i(()=>[(c(!0),d(S,null,f(t.dynamicData,a=>(c(),d("option",{value:a.value,selected:a.selected},r(a.text),9,Fe))),256))]),_:1})]),Re,Ae])}const Je=_(V,[["render",Ie]]),Le=m({name:"Events",components:{Vue:Je}}),Pe={id:"frameworks",class:"contents"};function Ue(t,o,p,u,h,v){const l=g("Vue");return c(),d("div",Pe,[s(l)])}const qe=_(Le,[["render",Ue]]);export{qe as default};
