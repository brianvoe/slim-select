import{d as _,S as i,_ as g,o as l,c as r,f as s,t as d,i as v,a as e,F as y,j as O,k as V,O as M,r as p,b as f}from"./index.js";const A=_({name:"Error",data(){return{errorSingle:null,errMsg:""}},mounted(){this.errorSingle=new i({select:this.$refs.errorSingle,events:{error:t=>{this.errMsg=t.message}}})}}),k={id:"error",class:"content"},j=e("h2",{class:"header"},"error",-1),F=e("p",null,"The error event is fired when an error occurs. The error message is passed as the first argument.",-1),T=e("div",{class:"alert info"}," If you are are having issues with slim select finding the select element. Try delaying new SlimSelect() call as the select dom element might not be available yet. ",-1),E={key:0},x=e("b",null,"Error:",-1),B={class:"row"},D={ref:"notError"},L=e("option",{value:"1"},"Option 1",-1),N=e("option",{value:"2"},"Option 2",-1),P=e("option",{value:"3"},"Option 3",-1),R=[L,N,P],H=e("pre",null,[s("      "),e("code",{class:"language-javascript"},`
        var select = new SlimSelect({
          select: '#selectElement',
          events: {
            error: function(err) {
              console.error(err)
            }
          }
        })
      `),s(`
    `)],-1);function I(t,n,c,h,u,o){return l(),r("div",k,[j,F,T,t.errMsg!==""?(l(),r("div",E,[x,s(" "+d(t.errMsg),1)])):v("",!0),e("div",B,[e("select",D,R,512)]),H])}const J=g(A,[["render",I]]),U=_({name:"BeforeAfterChange",data(){return{beforeChangeSingle:[],beforeChangeMultiple:[],afterChangeSingle:[],afterChangeMultiple:[]}},mounted(){new i({select:this.$refs.beforeChangeSingle,settings:{allowDeselect:!0},events:{beforeChange:(t,n)=>(this.beforeChangeSingle=n,!0)}}),new i({select:this.$refs.beforeChangeMultiple,events:{beforeChange:(t,n)=>(this.beforeChangeMultiple=n,!0)}}),new i({select:this.$refs.afterChangeSingle,settings:{allowDeselect:!0},events:{afterChange:t=>{this.afterChangeSingle=t}}}),new i({select:this.$refs.afterChangeMultiple,events:{afterChange:t=>{this.afterChangeMultiple=t}}})}}),z={id:"beforeChange",class:"content"},q=e("h2",{class:"header"},"beforeChange",-1),G=e("p",null," beforeOnChange will trigger a callback on an option click and will allow you the ability to halt if the value it produces isnt to your liking. In order to stop the change from happening just return false on the callback. Returning nothing or true will allow it to continue as normal. ",-1),K=e("div",{class:"alert info"}," Be sure to return true to allow for the change to happen. False or nothing to cancel change. ",-1),Q={key:0},W={ref:"beforeChangeSingle"},X=e("option",{"data-placeholder":"true"},"Select Option",-1),Y=e("option",{value:"value1"},"Value 1",-1),Z=e("option",{value:"value2"},"Value 2",-1),ee=e("option",{value:"value3"},"Value 3",-1),te=[X,Y,Z,ee],ne=e("br",null,null,-1),se={key:1},oe={ref:"beforeChangeMultiple",multiple:""},ae=e("option",{value:"value1",selected:""},"Value 1",-1),le=e("option",{value:"value2"},"Value 2",-1),re=e("option",{value:"value3"},"Value 3",-1),ie=[ae,le,re],ce=e("pre",null,[s("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          events: {
            beforeChange: (newVal, oldVal) => {
              console.log(newVal)
              return false // this will stop the change from happening
            }
          }
        })
      `),s(`
    `)],-1),he={id:"afterChange",class:"content"},ue=e("h2",{class:"header"},"afterChange",-1),de=e("p",null,"afterChange will trigger a callback after the value of the select dropdown has changed.",-1),_e={key:0},pe={ref:"afterChangeSingle"},fe=e("option",{"data-placeholder":"true"},"Select Option",-1),ge=e("option",{value:"value1"},"Value 1",-1),ve=e("option",{value:"value2"},"Value 2",-1),me=e("option",{value:"value3"},"Value 3",-1),$e=[fe,ge,ve,me],be=e("br",null,null,-1),Se={key:1},Ce={ref:"afterChangeMultiple",multiple:""},we=e("option",{value:"value1",selected:""},"Value 1",-1),Oe=e("option",{value:"value2"},"Value 2",-1),ye=e("option",{value:"value3"},"Value 3",-1),Ve=[we,Oe,ye],Me=e("pre",null,[s("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          events: {
            afterChange: (newVal) => {
              console.log(newVal)
            }
          }
        })
      `),s(`
    `)],-1);function Ae(t,n,c,h,u,o){return l(),r(y,null,[e("div",z,[q,G,K,t.beforeChangeSingle?(l(),r("div",Q,[e("strong",null,"Before change: "+d(t.beforeChangeSingle),1)])):v("",!0),e("select",W,te,512),ne,t.beforeChangeMultiple?(l(),r("div",se,[e("strong",null,"Before change: "+d(t.beforeChangeMultiple),1)])):v("",!0),e("select",oe,ie,512),ce]),e("div",he,[ue,de,t.afterChangeSingle?(l(),r("div",_e,[e("strong",null,"After change: "+d(t.afterChangeSingle),1)])):v("",!0),e("select",pe,$e,512),be,t.afterChangeMultiple?(l(),r("div",Se,[e("strong",null,"After change: "+d(t.afterChangeMultiple),1)])):v("",!0),e("select",Ce,Ve,512),Me])],64)}const ke=g(U,[["render",Ae]]),je=_({name:"BeForeAfterOpenClose",data(){return{beforeAfterOpenCloseSingle:null,singleState:"",beforeAfterOpenCloseMultiple:null,multipleState:""}},mounted(){this.beforeAfterOpenCloseSingle=new i({select:this.$refs.beforeAfterOpenCloseSingle,events:{beforeOpen:()=>{this.setState("single","beforeOpen")},afterOpen:()=>{this.setState("single","afterOpen")},beforeClose:()=>{this.setState("single","beforeClose")},afterClose:()=>{this.setState("single","afterClose")}}}),this.beforeAfterOpenCloseMultiple=new i({select:this.$refs.beforeAfterOpenCloseMultiple,events:{beforeOpen:()=>{this.setState("multiple","beforeOpen")},afterOpen:()=>{this.setState("multiple","afterOpen")},beforeClose:()=>{this.setState("multiple","beforeClose")},afterClose:()=>{this.setState("multiple","afterClose")}}})},methods:{setState(t,n){t==="single"?this.singleState=n:this.multipleState=n,setTimeout(()=>{t==="single"?this.singleState="":this.multipleState=""},1e3)}}}),Fe={id:"open",class:"content"},Te=e("h2",{class:"header"},"beforeOpen / afterOpen / beforeClose / afterClose",-1),Ee=e("p",null," The beforeOpen, afterOpen, beforeClose, and afterClose events will fire before and after the select is opened and closed. ",-1),xe={class:"row"},Be={ref:"beforeAfterOpenCloseSingle"},De=e("option",{value:"value1"},"Value 1",-1),Le=e("option",{value:"value2"},"Value 2",-1),Ne=e("option",{value:"value3"},"Value 3",-1),Pe=[De,Le,Ne],Re={ref:"beforeAfterOpenCloseMultiple",multiple:""},He=e("option",{value:"value1"},"Value 1",-1),Ie=e("option",{value:"value2"},"Value 2",-1),Je=e("option",{value:"value3"},"Value 3",-1),Ue=[He,Ie,Je],ze=e("pre",null,[s("      "),e("code",{class:"language-javascript"},`
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
      `),s(`
    `)],-1);function qe(t,n,c,h,u,o){return l(),r("div",Fe,[Te,Ee,e("div",xe,[e("div",null,[e("div",null,"State: "+d(t.singleState),1),e("select",Be,Pe,512)]),e("div",null,[e("div",null,"State: "+d(t.multipleState),1),e("select",Re,Ue,512)])]),ze])}const Ge=g(je,[["render",qe]]),Ke={id:"search",class:"content"},Qe=e("h2",{class:"header"},"search",-1),We=e("p",null,[s(" Slim select allows you to syncronize result values from your promise response."),e("br"),s(" Call callback() method with slimselect data, false or string with specific string. ")],-1),Xe={class:"row"},Ye=e("pre",null,[s("      "),e("code",{class:"language-javascript"},`
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
                    // Take the data and create an array of options 
                    // excluding any that are already selected in currentData
                    const options = data
                      .filter((person) => {
                        return !currentData.some((optionData) => {
                          return optionData.value === \`\${person.first_name} \${person.last_name}\`
                        })
                      })
                      .map((person) => {
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
      `),s(`
    `)],-1),Ze=_({__name:"search",setup(t){let n=[],c=O(null),h=O(null);fetch("https://api.gofakeit.com/json",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"array",rowcount:1e3,indent:!1,fields:[{name:"first_name",function:"firstname",params:{}},{name:"last_name",function:"lastname",params:{}}]})}).then(o=>o.json()).then(o=>{n=o}),V(()=>{new i({select:c.value,settings:{placeholderText:"Search First or Last Name",searchingText:"Searching Users...",searchHighlight:!0},events:{search:u}}),new i({select:h.value,settings:{placeholderText:"Search First or Last Name",searchingText:"Searching Users...",searchHighlight:!0},events:{search:u}})});function u(o,m){return new Promise((S,$)=>{if(o.length<2)return $("Search must be at least 2 characters");const b=n.filter(a=>a.first_name.toLowerCase().includes(o.toLowerCase())||a.last_name.toLowerCase().includes(o.toLowerCase()));if(b.length===0)return $("No results found");const C=b.filter(a=>!m.some(w=>w instanceof M&&w.value===`${a.first_name} ${a.last_name}`)).map(a=>({text:`${a.first_name} ${a.last_name}`,value:`${a.first_name} ${a.last_name}`}));setTimeout(()=>{S(C)},300)})}return(o,m)=>(l(),r("div",Ke,[Qe,We,e("div",Xe,[e("select",{ref_key:"searchSingle",ref:c},null,512),e("select",{ref_key:"searchMultiple",ref:h,multiple:""},null,512)]),Ye]))}}),et=_({name:"SearchFilter",mounted(){new i({select:this.$refs.searchFilter,events:{searchFilter:(t,n)=>t.text.substr(0,n.length)===n}})}}),tt={id:"searchFilter",class:"content"},nt=e("h2",{class:"header"},"searchFilter",-1),st=e("p",null,"searchFilter event is used to replace the default matching algorithm.",-1),ot=e("p",null,[s("See Data for the proper object interface of "),e("em",null,"option"),s(".")],-1),at={ref:"searchFilter"},lt=e("option",{value:"apple"},"Apple",-1),rt=e("option",{value:"orange"},"Orange",-1),it=e("option",{value:"pineapple"},"Pineapple",-1),ct=[lt,rt,it],ht=e("pre",null,[s("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          events: {
            // Exact case sensitive start of string match
            searchFilter: (option, search) => {
              return option.text.substr(0, search.length) === search
            }
          }
        })
      `),s(`
    `)],-1);function ut(t,n,c,h,u,o){return l(),r("div",tt,[nt,st,ot,e("select",at,ct,512),ht])}const dt=g(et,[["render",ut]]),_t=_({name:"Addable",mounted(){new i({select:this.$refs.addableSingle,events:{addable:t=>({text:t,value:t.toLowerCase()})}}),new i({select:this.$refs.addableMultiple,events:{addable:t=>new Promise(n=>{setTimeout(()=>{n({text:t,value:t})},100)})}})}}),pt={id:"addable",class:"content"},ft=e("h2",{class:"header"},"addable",-1),gt=e("p",null,"Slim select has the ability to dynamically add options via the search input field",-1),vt=e("p",null," addable is a callback which takes a function parameter. The return value can either be a string or an option object. ",-1),mt={class:"row"},$t={ref:"addableSingle"},bt=e("option",{value:"value1"},"Value 1",-1),St=e("option",{value:"value2"},"Value 2",-1),Ct=e("option",{value:"value3"},"Value 3",-1),wt=[bt,St,Ct],Ot={ref:"addableMultiple",multiple:""},yt=e("option",{value:"value1"},"Value 1",-1),Vt=e("option",{value:"value2"},"Value 2",-1),Mt=e("option",{value:"value3"},"Value 3",-1),At=[yt,Vt,Mt],kt=e("pre",null,[s("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',

          events: {
            addable: function (value) {
              // return false or null if you do not want to allow value to be submitted
              if (value === 'bad') {return false}

              // Return the value string
              return value // Optional - value alteration // ex: value.toLowerCase()

              // Optional - Return a valid data object. 
              // See methods/setData for list of valid options
              return {
                text: value,
                value: value.toLowerCase()
              }

              // Optional - Return a promise with either a string or data object
              return new Promise((resolve) => {
                resolve({
                  text: value,
                  value: value,
                })
              })
            }
          }
        })
      `),s(`
    `)],-1);function jt(t,n,c,h,u,o){return l(),r("div",pt,[ft,gt,vt,e("div",mt,[e("select",$t,wt,512),e("select",Ot,At,512)]),kt])}const Ft=g(_t,[["render",jt]]),Tt=_({name:"Events",components:{Error:J,BeforeAfterChange:ke,BeforeAfterOpenClose:Ge,Search:Ze,SearchFilter:dt,Addable:Ft}}),Et={id:"events",class:"contents"};function xt(t,n,c,h,u,o){const m=p("Error"),S=p("BeforeAfterChange"),$=p("BeforeAfterOpenClose"),b=p("Search"),C=p("SearchFilter"),a=p("Addable");return l(),r("div",Et,[f(m),f(S),f($),f(b),f(C),f(a)])}const Dt=g(Tt,[["render",xt]]);export{Dt as default};
