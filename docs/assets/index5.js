import{d as v,S,_,o as r,c as m,l as f,r as g,a as t,f as o,t as h,b as i,w as a,i as O,e as V}from"./index.js";const b=v({name:"SlimSelect",props:{modelValue:{type:[String,Array,void 0]},multiple:{type:Boolean,default:!1},data:{type:Array},settings:{type:Object},events:{type:Object}},emits:["update:modelValue"],data(){return{slim:null}},mounted(){let e={select:this.$refs.slim};this.data&&(e.data=this.data),this.settings&&(e.settings=this.settings),this.events&&(e.events=this.events),e.events||(e.events={});const n=e.events.afterChange;e.events.afterChange=s=>{const p=this.multiple?s.map(c=>c.value):s[0].value;this.value!==p&&(this.value=p),e.events&&n&&n(s)},this.slim=new S(e);let u=this.$props.multiple?this.slim.getSelected():this.slim.getSelected()[0];this.value!==u&&this.slim.setSelected(this.value)},beforeUnmount(){this.slim&&this.slim.destroy()},watch:{modelValue:{handler:function(e){var n;(n=this.slim)==null||n.setSelected(this.getCleanValue(e))},immediate:!0},data:{handler:function(e){this.slim&&this.slim.setData(e)},deep:!0}},computed:{value:{get(){return this.getCleanValue(this.$props.modelValue)},set(e){this.$emit("update:modelValue",e)}}},methods:{getSlimSelect(){return this.slim},getCleanValue(e){const n=this.$props.multiple;return typeof e=="string"?n?[e]:e:Array.isArray(e)?n?e:e[0]:n?[]:""}}}),y=["multiple"];function C(e,n,u,s,p,c){return r(),m("select",{multiple:e.multiple,ref:"slim"},[f(e.$slots,"default")],8,y)}const w=_(b,[["render",C]]),$=v({name:"Vue",components:{SlimSelect:w},data(){return{simpleSingle:"2",simpleMultiple:["2","3"],settings:{showSearch:!1},data:[{value:"value1",text:"Value 1"},{value:"value2",text:"Value 2"},{value:"value3",text:"Value 3"}],afterChangeData:[],events:{afterChange:this.afterChange}}},mounted(){},methods:{changeData(){this.$refs.dataSingle.getSlimSelect().open(),this.$refs.dataMultiple.getSlimSelect().open(),setTimeout(()=>{this.data=[{value:"value4",text:"Value 4"},{value:"value5",text:"Value 5"},{value:"value6",text:"Value 6"}]},500)},afterChange(e){this.afterChangeData=e}}}),q={id:"vue",class:"content"},k=t("h2",{class:"header"},"Vue",-1),j=t("h3",null,"Install",-1),D=t("p",null," The vue component is in a sub package under SlimSelect. All functionality still work in the implementation. I have also added a v-model bind capability to it as well. ",-1),M=t("pre",null,[o("      "),t("code",{class:"language-bash"},`
        npm install @slim-select/vue
      `),o(`
    `)],-1),A=t("br",null,null,-1),B=t("h3",null,"Simple example",-1),N={class:"row"},T=t("strong",null,"Value",-1),x=t("option",{value:"all"},"All",-1),E=t("option",{value:"1"},"Option 1",-1),I=t("option",{value:"2"},"Option 2",-1),U=t("option",{value:"3"},"Option 3",-1),R=t("strong",null,"Value",-1),H=t("option",{value:"1"},"Option 1",-1),Y=t("option",{value:"2"},"Option 2",-1),z=t("option",{value:"3"},"Option 3",-1),F=t("pre",null,[o("      "),t("code",{class:"language-javascript"},`
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
      `),o(`
    `)],-1),G=t("pre",null,[o("      "),t("code",{class:"language-html"},`
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
      `),o(`
    `)],-1),J=t("br",null,null,-1),K=t("div",{class:"separator"},null,-1),L=t("br",null,null,-1),P=t("h3",null,"Settings",-1),Q=t("p",null," Settings just like its passed as an object in normal SlimSelct will also be passed as an object to the component prop ",-1),W={class:"row"},X=t("option",{value:"1"},"Option 1",-1),Z=t("option",{value:"2"},"Option 2",-1),tt=t("option",{value:"3"},"Option 3",-1),et=t("option",{value:"1"},"Option 1",-1),nt=t("option",{value:"2"},"Option 2",-1),ot=t("option",{value:"3"},"Option 3",-1),lt=t("pre",null,[o("      "),t("code",{class:"language-javascript"},`
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
      `),o(`
    `)],-1),it=t("pre",null,[o("      "),t("code",{class:"language-html"},`
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
      `),o(`
    `)],-1),st=t("br",null,null,-1),at=t("div",{class:"separator"},null,-1),ut=t("br",null,null,-1),pt=t("h3",null,"Data",-1),dt=t("p",null," Data just like its passed as an array in normal SlimSelct will also be passed as an array to the component prop. ",-1),ct=t("div",{class:"alert info"}," You may pass data as a prop if you would like. But you can also have reactive options that when options change the select will update as well. See Reactivity below for more info. ",-1),rt={class:"row"},mt=t("pre",null,[o("      "),t("code",{class:"language-javascript"},`
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
      `),o(`
    `)],-1),ht=t("pre",null,[o("      "),t("code",{class:"language-html"},`
        <SlimSelect :data="data" />

        <SlimSelect :data="data" multiple />
      `),o(`
    `)],-1),vt=t("br",null,null,-1),_t=t("div",{class:"separator"},null,-1),gt=t("br",null,null,-1),St=t("h3",null,"Events",-1),ft=t("p",null," Events just like its passed as an object in normal SlimSelct will also be passed as an object to the component prop. ",-1),Ot={key:0},Vt=t("strong",null,"afterChange:",-1),bt={class:"row"},yt=t("option",{value:"1"},"Option 1",-1),Ct=t("option",{value:"2"},"Option 2",-1),wt=t("option",{value:"3"},"Option 3",-1),$t=t("option",{value:"1"},"Option 1",-1),qt=t("option",{value:"2"},"Option 2",-1),kt=t("option",{value:"3"},"Option 3",-1),jt=V(`<pre>      <code class="language-javascript">
        import { defineComponent } from &#39;vue&#39;
        import SlimSelect from &#39;@slim-select/vue&#39;

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
      </code>
    </pre><pre>      <code class="language-html">
        &lt;SlimSelect :events=&quot;events&quot;&gt;
          &lt;option value=&quot;1&quot;&gt;Option 1&lt;/option&gt;
          &lt;option value=&quot;2&quot;&gt;Option 2&lt;/option&gt;
          &lt;option value=&quot;3&quot;&gt;Option 3&lt;/option&gt;
        &lt;/SlimSelect&gt;

        &lt;SlimSelect :events=&quot;events&quot; multiple&gt;
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
    </pre>`,10);function Dt(e,n,u,s,p,c){const l=g("SlimSelect");return r(),m("div",q,[k,j,D,M,A,B,t("div",N,[t("div",null,[t("div",null,[T,o(" "+h(e.simpleSingle),1)]),i(l,{modelValue:e.simpleSingle,"onUpdate:modelValue":n[0]||(n[0]=d=>e.simpleSingle=d),ref:"simpleSingle"},{default:a(()=>[x,E,I,U]),_:1},8,["modelValue"])]),t("div",null,[t("div",null,[R,o(" "+h(e.simpleMultiple),1)]),i(l,{modelValue:e.simpleMultiple,"onUpdate:modelValue":n[1]||(n[1]=d=>e.simpleMultiple=d),ref:"simpleMultiple",multiple:""},{default:a(()=>[H,Y,z]),_:1},8,["modelValue"])])]),F,G,J,K,L,P,Q,t("div",W,[i(l,{settings:e.settings},{default:a(()=>[X,Z,tt]),_:1},8,["settings"]),i(l,{settings:e.settings,multiple:""},{default:a(()=>[et,nt,ot]),_:1},8,["settings"])]),lt,it,st,at,ut,pt,dt,ct,t("div",rt,[t("div",{class:"btn info",onClick:n[2]||(n[2]=(...d)=>e.changeData&&e.changeData(...d))},"Change data"),i(l,{ref:"dataSingle",data:e.data},null,8,["data"]),i(l,{ref:"dataMultiple",data:e.data,multiple:""},null,8,["data"])]),mt,ht,vt,_t,gt,St,ft,e.afterChangeData.length?(r(),m("div",Ot,[Vt,o(" "+h(e.afterChangeData),1)])):O("",!0),t("div",bt,[i(l,{events:e.events},{default:a(()=>[yt,Ct,wt]),_:1},8,["events"]),i(l,{events:e.events,multiple:""},{default:a(()=>[$t,qt,kt]),_:1},8,["events"])]),jt])}const Mt=_($,[["render",Dt]]),At=v({name:"Events",components:{Vue:Mt}}),Bt={id:"frameworks",class:"contents"};function Nt(e,n,u,s,p,c){const l=g("Vue");return r(),m("div",Bt,[i(l)])}const xt=_(At,[["render",Nt]]);export{xt as default};
