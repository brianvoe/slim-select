import{d as v,S as g,_,o as m,c as h,m as S,r as f,a as t,f as n,t as r,b as i,w as s,j as b,n as O,e as C}from"./index.js";const y=v({name:"SlimSelect",props:{modelValue:{type:[String,Array,void 0]},multiple:{type:Boolean,default:!1},data:{type:Array},settings:{type:Object},events:{type:Object}},emits:["update:modelValue"],data(){return{slim:null}},mounted(){let e={select:this.$refs.slim};this.data&&(e.data=this.data),this.settings&&(e.settings=this.settings),e.events=this.events||{};const o=e.events.afterChange;e.events.afterChange=a=>{const d=this.multiple?a.map(c=>c.value):a.length>0?a[0].value:"";this.value!==d&&(this.value=d),e.events&&o&&o(a)},this.slim=new g(e);let p=this.$props.multiple?this.slim.getSelected():this.slim.getSelected()[0];this.value!==p&&this.slim.setSelected(this.value)},beforeUnmount(){this.slim&&this.slim.destroy()},watch:{modelValue:{handler:function(e){var o;(o=this.slim)==null||o.setSelected(this.getCleanValue(e))},immediate:!0},data:{handler:function(e){this.slim&&this.slim.setData(e)},deep:!0}},computed:{value:{get(){return this.getCleanValue(this.$props.modelValue)},set(e){this.$emit("update:modelValue",e)}}},methods:{getSlimSelect(){return this.slim},getCleanValue(e){const o=this.$props.multiple;return typeof e=="string"?o?[e]:e:Array.isArray(e)?o?e:e[0]:o?[]:""}}}),V=["multiple"];function w(e,o,p,a,d,c){return m(),h("select",{multiple:e.multiple,ref:"slim"},[S(e.$slots,"default")],8,V)}const $=_(y,[["render",w]]),D=v({name:"Vue",components:{SlimSelect:$},data(){return{simpleSingle:"2",simpleMultiple:["2","3"],settings:{showSearch:!1},data:[{value:"value1",text:"Value 1"},{value:"value2",text:"Value 2"},{value:"value3",text:"Value 3"}],afterChangeData:[],events:{afterChange:this.afterChange},isDisabled:!1,errorClass:""}},mounted(){},methods:{changeData(){this.$refs.dataSingle.getSlimSelect().open(),this.$refs.dataMultiple.getSlimSelect().open(),setTimeout(()=>{this.data=[{value:"value4",text:"Value 4"},{value:"value5",text:"Value 5"},{value:"value6",text:"Value 6"}]},500)},afterChange(e){this.afterChangeData=e}}}),q={id:"vue",class:"content"},k=t("h2",{class:"header"},"Vue",-1),j=t("h3",null,"Install",-1),M=t("p",null," The vue component is in a sub package under SlimSelect. All functionality still work in the implementation. I have also added a v-model bind capability to it as well. ",-1),A=t("pre",null,[n("      "),t("code",{class:"language-bash"},`
        npm install @slim-select/vue
      `),n(`
    `)],-1),T=t("br",null,null,-1),B=t("h3",null,"Simple example",-1),N={class:"row"},E=t("strong",null,"Value",-1),I=t("option",{value:"all"},"All",-1),U=t("option",{value:"1"},"Option 1",-1),R=t("option",{value:"2"},"Option 2",-1),z=t("option",{value:"3"},"Option 3",-1),H=t("strong",null,"Value",-1),Y=t("option",{value:"1"},"Option 1",-1),F=t("option",{value:"2"},"Option 2",-1),G=t("option",{value:"3"},"Option 3",-1),J=t("pre",null,[n("      "),t("code",{class:"language-javascript"},`
        import { defineComponent } from 'vue'
        import SlimSelect from '@slim-select/vue'

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
    `)],-1),K=t("pre",null,[n("      "),t("code",{class:"language-html"},`
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
    `)],-1),L=t("br",null,null,-1),P=t("div",{class:"separator"},null,-1),Q=t("br",null,null,-1),W=t("h3",null,"Settings",-1),X=t("p",null," Settings just like its passed as an object in normal SlimSelect will also be passed as an object to the component prop ",-1),Z={class:"row"},x=t("option",{value:"1"},"Option 1",-1),tt=t("option",{value:"2"},"Option 2",-1),et=t("option",{value:"3"},"Option 3",-1),nt=t("option",{value:"1"},"Option 1",-1),ot=t("option",{value:"2"},"Option 2",-1),lt=t("option",{value:"3"},"Option 3",-1),it=t("pre",null,[n("      "),t("code",{class:"language-javascript"},`
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
    `)],-1),st=t("pre",null,[n("      "),t("code",{class:"language-html"},`
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
    `)],-1),at=t("br",null,null,-1),ut=t("div",{class:"separator"},null,-1),pt=t("br",null,null,-1),dt=t("h3",null,"Data",-1),ct=t("p",null," Data just like its passed as an array in normal SlimSelct will also be passed as an array to the component prop. ",-1),rt=t("div",{class:"alert info"}," You may pass data as a prop if you would like. But you can also have reactive options that when options change the select will update as well. See Reactivity below for more info. ",-1),mt={class:"row"},ht=t("pre",null,[n("      "),t("code",{class:"language-javascript"},`
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
    `)],-1),vt=t("pre",null,[n("      "),t("code",{class:"language-html"},`
        <SlimSelect :data="data" />

        <SlimSelect :data="data" multiple />
      `),n(`
    `)],-1),_t=t("br",null,null,-1),gt=t("div",{class:"separator"},null,-1),St=t("br",null,null,-1),ft=t("h3",null,"Events",-1),bt=t("p",null," Events just like its passed as an object in normal SlimSelct will also be passed as an object to the component prop. ",-1),Ot={key:0},Ct=t("strong",null,"afterChange:",-1),yt={class:"row"},Vt=t("option",{value:"1"},"Option 1",-1),wt=t("option",{value:"2"},"Option 2",-1),$t=t("option",{value:"3"},"Option 3",-1),Dt=t("option",{value:"1"},"Option 1",-1),qt=t("option",{value:"2"},"Option 2",-1),kt=t("option",{value:"3"},"Option 3",-1),jt=t("pre",null,[n("      "),t("code",{class:"language-javascript"},`
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
      `),n(`
    `)],-1),Mt=t("pre",null,[n("      "),t("code",{class:"language-html"},`
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
    `)],-1),At=t("br",null,null,-1),Tt=t("div",{class:"separator"},null,-1),Bt=t("br",null,null,-1),Nt=t("h3",null,"Attributes",-1),Et=t("p",null,"There are certain attributes that are reactive to changes",-1),It=t("h4",null,"disabled",-1),Ut={class:"row"},Rt=t("option",{value:"1"},"Option 1",-1),zt=t("option",{value:"2"},"Option 2",-1),Ht=t("option",{value:"3"},"Option 3",-1),Yt=t("pre",null,[n("      "),t("code",{class:"language-html"},`
        <SlimSelect :disabled="isDisabled">
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </SlimSelect>
      `),n(`
    `)],-1),Ft=t("h4",null,"class",-1),Gt={class:"row"},Jt=t("option",{value:"1"},"Option 1",-1),Kt=t("option",{value:"2"},"Option 2",-1),Lt=t("option",{value:"3"},"Option 3",-1),Pt=C(`<pre>      <code class="language-html">
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
    </pre>`,9);function Qt(e,o,p,a,d,c){const l=f("SlimSelect");return m(),h("div",q,[k,j,M,A,T,B,t("div",N,[t("div",null,[t("div",null,[E,n(" "+r(e.simpleSingle),1)]),i(l,{modelValue:e.simpleSingle,"onUpdate:modelValue":o[0]||(o[0]=u=>e.simpleSingle=u),ref:"simpleSingle"},{default:s(()=>[I,U,R,z]),_:1},8,["modelValue"])]),t("div",null,[t("div",null,[H,n(" "+r(e.simpleMultiple),1)]),i(l,{modelValue:e.simpleMultiple,"onUpdate:modelValue":o[1]||(o[1]=u=>e.simpleMultiple=u),ref:"simpleMultiple",multiple:""},{default:s(()=>[Y,F,G]),_:1},8,["modelValue"])])]),J,K,L,P,Q,W,X,t("div",Z,[i(l,{settings:e.settings},{default:s(()=>[x,tt,et]),_:1},8,["settings"]),i(l,{settings:e.settings,multiple:""},{default:s(()=>[nt,ot,lt]),_:1},8,["settings"])]),it,st,at,ut,pt,dt,ct,rt,t("div",mt,[t("div",{class:"btn info",onClick:o[2]||(o[2]=(...u)=>e.changeData&&e.changeData(...u))},"Change data"),i(l,{ref:"dataSingle",data:e.data},null,8,["data"]),i(l,{ref:"dataMultiple",data:e.data,multiple:""},null,8,["data"])]),ht,vt,_t,gt,St,ft,bt,e.afterChangeData.length?(m(),h("div",Ot,[Ct,n(" "+r(e.afterChangeData),1)])):b("",!0),t("div",yt,[i(l,{events:e.events},{default:s(()=>[Vt,wt,$t]),_:1},8,["events"]),i(l,{events:e.events,multiple:""},{default:s(()=>[Dt,qt,kt]),_:1},8,["events"])]),jt,Mt,At,Tt,Bt,Nt,Et,It,t("div",Ut,[t("div",{class:"btn",onClick:o[3]||(o[3]=u=>e.isDisabled=!e.isDisabled)},"Toggle Disabled"),i(l,{disabled:e.isDisabled},{default:s(()=>[Rt,zt,Ht]),_:1},8,["disabled"])]),Yt,Ft,t("div",Gt,[t("div",{class:"btn",onClick:o[4]||(o[4]=u=>e.errorClass=e.errorClass===""?"error":"")},"Toggle Error"),i(l,{class:O(["dynamicClass",e.errorClass])},{default:s(()=>[Jt,Kt,Lt]),_:1},8,["class"])]),Pt])}const Xt=_(D,[["render",Qt]]);export{Xt as default};
