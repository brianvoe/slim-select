import{d as _,S as r,_ as g,o as a,c as l,f as n,t as d,i as v,a as e,F as O,j as w,k as V,g as p,h as f}from"./index.js";const y=_({name:"Error",data(){return{errorSingle:null,errMsg:""}},mounted(){this.errorSingle=new r({select:this.$refs.errorSingle,events:{error:t=>{this.errMsg=t.message}}})}}),M={id:"error",class:"content"},A=e("h2",{class:"header"},"error",-1),k=e("p",null,"The error event is fired when an error occurs. The error message is passed as the first argument.",-1),j=e("div",{class:"alert info"}," If you are are having issues with slim select finding the select element. Try delaying new SlimSelect() call as the select dom element might not be available yet. ",-1),F={key:0},T=e("b",null,"Error:",-1),E={class:"row"},B={ref:"notError"},x=e("option",{value:"1"},"Option 1",-1),L=e("option",{value:"2"},"Option 2",-1),N=e("option",{value:"3"},"Option 3",-1),D=[x,L,N],P=e("pre",null,[n("      "),e("code",{class:"language-javascript"},`
        var select = new SlimSelect({
          select: '#selectElement',
          events: {
            error: function(err) {
              console.error(err)
            }
          }
        })
      `),n(`
    `)],-1);function R(t,s,c,h,u,o){return a(),l("div",M,[A,k,j,t.errMsg!==""?(a(),l("div",F,[T,n(" "+d(t.errMsg),1)])):v("",!0),e("div",E,[e("select",B,D,512)]),P])}const H=g(y,[["render",R]]),I=_({name:"BeforeAfterChange",data(){return{beforeChangeSingle:[],beforeChangeMultiple:[],afterChangeSingle:[],afterChangeMultiple:[]}},mounted(){new r({select:this.$refs.beforeChangeSingle,events:{beforeChange:(t,s)=>{this.beforeChangeSingle=s}}}),new r({select:this.$refs.beforeChangeMultiple,events:{beforeChange:(t,s)=>(this.beforeChangeMultiple=s,!0)}}),new r({select:this.$refs.afterChangeSingle,events:{afterChange:t=>{this.afterChangeSingle=t}}}),new r({select:this.$refs.afterChangeMultiple,events:{afterChange:t=>{this.afterChangeMultiple=t}}})}}),J={id:"beforeChange",class:"content"},U=e("h2",{class:"header"},"beforeChange",-1),z=e("p",null," beforeOnChange will trigger a callback on an option click and will allow you the ability to halt if the value it produces isnt to your liking. In order to stop the change from happening just return false on the callback. Returning nothing or true will allow it to continue as normal. ",-1),q={key:0},G={ref:"beforeChangeSingle"},K=e("option",{value:"value1"},"Value 1",-1),Q=e("option",{value:"value2"},"Value 2",-1),W=e("option",{value:"value3"},"Value 3",-1),X=[K,Q,W],Y=e("br",null,null,-1),Z={key:1},ee={ref:"beforeChangeMultiple",multiple:""},te=e("option",{value:"value1",selected:""},"Value 1",-1),ne=e("option",{value:"value2"},"Value 2",-1),se=e("option",{value:"value3"},"Value 3",-1),oe=[te,ne,se],ae=e("pre",null,[n("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          events: {
            beforeChange: (newVal, oldVal) => {
              console.log(newVal)
              return false // this will stop the change from happening
            }
          }
        })
      `),n(`
    `)],-1),le={id:"afterChange",class:"content"},re=e("h2",{class:"header"},"afterChange",-1),ie=e("p",null,"afterChange will trigger a callback after the value of the select dropdown has changed.",-1),ce={key:0},he={ref:"afterChangeSingle"},ue=e("option",{value:"value1"},"Value 1",-1),de=e("option",{value:"value2"},"Value 2",-1),_e=e("option",{value:"value3"},"Value 3",-1),pe=[ue,de,_e],fe=e("br",null,null,-1),ge={key:1},ve={ref:"afterChangeMultiple",multiple:""},me=e("option",{value:"value1",selected:""},"Value 1",-1),$e=e("option",{value:"value2"},"Value 2",-1),be=e("option",{value:"value3"},"Value 3",-1),Se=[me,$e,be],Ce=e("pre",null,[n("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          events: {
            afterChange: (newVal) => {
              console.log(newVal)
            }
          }
        })
      `),n(`
    `)],-1);function we(t,s,c,h,u,o){return a(),l(O,null,[e("div",J,[U,z,t.beforeChangeSingle?(a(),l("div",q,[e("strong",null,"Before change: "+d(t.beforeChangeSingle),1)])):v("",!0),e("select",G,X,512),Y,t.beforeChangeMultiple?(a(),l("div",Z,[e("strong",null,"Before change: "+d(t.beforeChangeMultiple),1)])):v("",!0),e("select",ee,oe,512),ae]),e("div",le,[re,ie,t.afterChangeSingle?(a(),l("div",ce,[e("strong",null,"After change: "+d(t.afterChangeSingle),1)])):v("",!0),e("select",he,pe,512),fe,t.afterChangeMultiple?(a(),l("div",ge,[e("strong",null,"After change: "+d(t.afterChangeMultiple),1)])):v("",!0),e("select",ve,Se,512),Ce])],64)}const Oe=g(I,[["render",we]]),Ve=_({name:"BeForeAfterOpenClose",data(){return{beforeAfterOpenCloseSingle:null,singleState:"",beforeAfterOpenCloseMultiple:null,multipleState:""}},mounted(){this.beforeAfterOpenCloseSingle=new r({select:this.$refs.beforeAfterOpenCloseSingle,events:{beforeOpen:()=>{this.setState("single","beforeOpen")},afterOpen:()=>{this.setState("single","afterOpen")},beforeClose:()=>{this.setState("single","beforeClose")},afterClose:()=>{this.setState("single","afterClose")}}}),this.beforeAfterOpenCloseMultiple=new r({select:this.$refs.beforeAfterOpenCloseMultiple,events:{beforeOpen:()=>{this.setState("multiple","beforeOpen")},afterOpen:()=>{this.setState("multiple","afterOpen")},beforeClose:()=>{this.setState("multiple","beforeClose")},afterClose:()=>{this.setState("multiple","afterClose")}}})},methods:{setState(t,s){t==="single"?this.singleState=s:this.multipleState=s,setTimeout(()=>{t==="single"?this.singleState="":this.multipleState=""},1e3)}}}),ye={id:"open",class:"content"},Me=e("h2",{class:"header"},"beforeOpen / afterOpen / beforeClose / afterClose",-1),Ae=e("p",null," The beforeOpen, afterOpen, beforeClose, and afterClose events will fire before and after the select is opened and closed. ",-1),ke={class:"row"},je={ref:"beforeAfterOpenCloseSingle"},Fe=e("option",{value:"value1"},"Value 1",-1),Te=e("option",{value:"value2"},"Value 2",-1),Ee=e("option",{value:"value3"},"Value 3",-1),Be=[Fe,Te,Ee],xe={ref:"beforeAfterOpenCloseMultiple",multiple:""},Le=e("option",{value:"value1"},"Value 1",-1),Ne=e("option",{value:"value2"},"Value 2",-1),De=e("option",{value:"value3"},"Value 3",-1),Pe=[Le,Ne,De],Re=e("pre",null,[n("      "),e("code",{class:"language-javascript"},`
        var select = new SlimSelect({
          select: '#selectElement',
          events: {
            beforeOpen: () => {
              console.log('before open')
            },
            afterOpen: () => {
              console.log('after open')
            },
            beforeClose: () => {
              console.log('before close')
            },
            afterClose: () => {
              console.log('after close')
            },
          },
        })
      `),n(`
    `)],-1);function He(t,s,c,h,u,o){return a(),l("div",ye,[Me,Ae,e("div",ke,[e("div",null,[e("div",null,"State: "+d(t.singleState),1),e("select",je,Be,512)]),e("div",null,[e("div",null,"State: "+d(t.multipleState),1),e("select",xe,Pe,512)])]),Re])}const Ie=g(Ve,[["render",He]]),Je={id:"search",class:"content"},Ue=e("h2",{class:"header"},"search",-1),ze=e("p",null,[n(" Slim select allows you to syncronize result values from your promise response."),e("br"),n(" Call callback() method with slimselect data, false or string with specific string. ")],-1),qe={class:"row"},Ge=e("pre",null,[n("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          events: {
            search: (search, currentData) => {
              return new Promise((resolve, reject) => {
                if (search.length < 2) {
                  return reject('Search must be at least 2 characters')
                }

                // Fetch random first and last name data
                fetch('https://api.gofakeit.com/json', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    type: 'array',
                    rowcount: 10,
                    indent: false,
                    fields: [
                      { name: 'first_name', function: 'firstname', params: {} },
                      { name: 'last_name', function: 'lastname', params: {} },
                    ],
                  }),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    // Take data and generate array of options
                    const options = data.map((person) => {
                      return {
                        text: \`\${person.first_name} \${person.last_name}\`,
                        value: \`\${person.first_name} \${person.last_name}\`,
                      }
                    })

                    resolve(options)
                  })
              })
            }
          }
        })
      `),n(`
    `)],-1),Ke=_({__name:"search",setup(t){let s=[],c=w(null),h=w(null);fetch("https://api.gofakeit.com/json",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"array",rowcount:1e3,indent:!1,fields:[{name:"first_name",function:"firstname",params:{}},{name:"last_name",function:"lastname",params:{}}]})}).then(o=>o.json()).then(o=>{s=o}),V(()=>{new r({select:c.value,settings:{placeholderText:"Search First or Last Name",searchingText:"Searching Users...",searchHighlight:!0},events:{search:u}}),new r({select:h.value,settings:{placeholderText:"Search First or Last Name",searchingText:"Searching Users...",searchHighlight:!0},events:{search:u}})});function u(o,b){return new Promise((S,m)=>{if(o.length<2)return m("Search must be at least 2 characters");const $=s.filter(i=>i.first_name.toLowerCase().includes(o.toLowerCase())||i.last_name.toLowerCase().includes(o.toLowerCase()));if($.length===0)return m("No results found");let C=$.map(i=>({text:`${i.first_name} ${i.last_name}`,value:`${i.first_name} ${i.last_name}`}));setTimeout(()=>{S(C)},300)})}return(o,b)=>(a(),l("div",Je,[Ue,ze,e("div",qe,[e("select",{ref_key:"searchSingle",ref:c},null,512),e("select",{ref_key:"searchMultiple",ref:h,multiple:""},null,512)]),Ge]))}}),Qe=_({name:"SearchFilter",mounted(){new r({select:this.$refs.searchFilter,events:{searchFilter:(t,s)=>t.text.substr(0,s.length)===s}})}}),We={id:"searchFilter",class:"content"},Xe=e("h2",{class:"header"},"searchFilter",-1),Ye=e("p",null,"searchFilter event is used to replace the default matching algorithm.",-1),Ze=e("p",null,[n("See Data for the proper object interface of "),e("em",null,"option"),n(".")],-1),et={ref:"searchFilter"},tt=e("option",{value:"apple"},"Apple",-1),nt=e("option",{value:"orange"},"Orange",-1),st=e("option",{value:"pineapple"},"Pineapple",-1),ot=[tt,nt,st],at=e("pre",null,[n("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          events: {
            // Exact case sensitive start of string match
            searchFilter: (option, search) => {
              return option.text.substr(0, search.length) === search
            }
          }
        })
      `),n(`
    `)],-1);function lt(t,s,c,h,u,o){return a(),l("div",We,[Xe,Ye,Ze,e("select",et,ot,512),at])}const rt=g(Qe,[["render",lt]]),it=_({name:"Addable",mounted(){new r({select:this.$refs.addableSingle,events:{addable:t=>t}}),new r({select:this.$refs.addableMultiple,events:{addable:t=>({text:t,value:t.toLowerCase()})}})}}),ct={id:"addable",class:"content"},ht=e("h2",{class:"header"},"addable",-1),ut=e("p",null,"Slim select has the ability to dynamically add options via the search input field",-1),dt=e("p",null," addable is a callback which takes a function parameter. The return value can either be a string or an option object. ",-1),_t={class:"row"},pt={ref:"addableSingle"},ft=e("option",{value:"value1"},"Value 1",-1),gt=e("option",{value:"value2"},"Value 2",-1),vt=e("option",{value:"value3"},"Value 3",-1),mt=[ft,gt,vt],$t={ref:"addableMultiple",multiple:""},bt=e("option",{value:"value1"},"Value 1",-1),St=e("option",{value:"value2"},"Value 2",-1),Ct=e("option",{value:"value3"},"Value 3",-1),wt=[bt,St,Ct],Ot=e("pre",null,[n("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',

          events: {
            addable: function (value) {
              // return false or null if you do not want to allow value to be submitted
              if (value === 'bad') {return false}

              // Return the value string
              return value // Optional - value alteration // ex: value.toLowerCase()

              // Optional - Return a valid data object. See methods/setData for list of valid options
              return {
                text: value,
                value: value.toLowerCase()
              }
            }
          }
        })
      `),n(`
    `)],-1);function Vt(t,s,c,h,u,o){return a(),l("div",ct,[ht,ut,dt,e("div",_t,[e("select",pt,mt,512),e("select",$t,wt,512)]),Ot])}const yt=g(it,[["render",Vt]]),Mt=_({name:"Events",components:{Error:H,BeforeAfterChange:Oe,BeforeAfterOpenClose:Ie,Search:Ke,SearchFilter:rt,Addable:yt}}),At={id:"events",class:"contents"};function kt(t,s,c,h,u,o){const b=p("Error"),S=p("BeforeAfterChange"),m=p("BeforeAfterOpenClose"),$=p("Search"),C=p("SearchFilter"),i=p("Addable");return a(),l("div",At,[f(b),f(S),f(m),f($),f(C),f(i)])}const Ft=g(Mt,[["render",kt]]);export{Ft as default};
