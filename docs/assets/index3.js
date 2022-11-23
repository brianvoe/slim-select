import{d as _,S as r,_ as g,o as a,c as l,f as s,t as d,i as v,a as e,F as O,j as w,k as V,r as p,b as f}from"./index.js";const y=_({name:"Error",data(){return{errorSingle:null,errMsg:""}},mounted(){this.errorSingle=new r({select:this.$refs.errorSingle,events:{error:t=>{this.errMsg=t.message}}})}}),M={id:"error",class:"content"},A=e("h2",{class:"header"},"error",-1),k=e("p",null,"The error event is fired when an error occurs. The error message is passed as the first argument.",-1),j=e("div",{class:"alert info"}," If you are are having issues with slim select finding the select element. Try delaying new SlimSelect() call as the select dom element might not be available yet. ",-1),F={key:0},T=e("b",null,"Error:",-1),E={class:"row"},B={ref:"notError"},x=e("option",{value:"1"},"Option 1",-1),L=e("option",{value:"2"},"Option 2",-1),N=e("option",{value:"3"},"Option 3",-1),D=[x,L,N],P=e("pre",null,[s("      "),e("code",{class:"language-javascript"},`
        var select = new SlimSelect({
          select: '#selectElement',
          events: {
            error: function(err) {
              console.error(err)
            }
          }
        })
      `),s(`
    `)],-1);function R(t,n,c,h,u,o){return a(),l("div",M,[A,k,j,t.errMsg!==""?(a(),l("div",F,[T,s(" "+d(t.errMsg),1)])):v("",!0),e("div",E,[e("select",B,D,512)]),P])}const H=g(y,[["render",R]]),I=_({name:"BeforeAfterChange",data(){return{beforeChangeSingle:[],beforeChangeMultiple:[],afterChangeSingle:[],afterChangeMultiple:[]}},mounted(){new r({select:this.$refs.beforeChangeSingle,settings:{allowDeselect:!0},events:{beforeChange:(t,n)=>(this.beforeChangeSingle=n,!0)}}),new r({select:this.$refs.beforeChangeMultiple,events:{beforeChange:(t,n)=>(this.beforeChangeMultiple=n,!0)}}),new r({select:this.$refs.afterChangeSingle,settings:{allowDeselect:!0},events:{afterChange:t=>{this.afterChangeSingle=t}}}),new r({select:this.$refs.afterChangeMultiple,events:{afterChange:t=>{this.afterChangeMultiple=t}}})}}),J={id:"beforeChange",class:"content"},U=e("h2",{class:"header"},"beforeChange",-1),z=e("p",null," beforeOnChange will trigger a callback on an option click and will allow you the ability to halt if the value it produces isnt to your liking. In order to stop the change from happening just return false on the callback. Returning nothing or true will allow it to continue as normal. ",-1),q=e("div",{class:"alert info"}," Be sure to return true to allow for the change to happen. False or nothing to cancel change. ",-1),G={key:0},K={ref:"beforeChangeSingle"},Q=e("option",{"data-placeholder":"true"},"Select Option",-1),W=e("option",{value:"value1"},"Value 1",-1),X=e("option",{value:"value2"},"Value 2",-1),Y=e("option",{value:"value3"},"Value 3",-1),Z=[Q,W,X,Y],ee=e("br",null,null,-1),te={key:1},ne={ref:"beforeChangeMultiple",multiple:""},se=e("option",{value:"value1",selected:""},"Value 1",-1),oe=e("option",{value:"value2"},"Value 2",-1),ae=e("option",{value:"value3"},"Value 3",-1),le=[se,oe,ae],re=e("pre",null,[s("      "),e("code",{class:"language-javascript"},`
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
    `)],-1),ie={id:"afterChange",class:"content"},ce=e("h2",{class:"header"},"afterChange",-1),he=e("p",null,"afterChange will trigger a callback after the value of the select dropdown has changed.",-1),ue={key:0},de={ref:"afterChangeSingle"},_e=e("option",{"data-placeholder":"true"},"Select Option",-1),pe=e("option",{value:"value1"},"Value 1",-1),fe=e("option",{value:"value2"},"Value 2",-1),ge=e("option",{value:"value3"},"Value 3",-1),ve=[_e,pe,fe,ge],me=e("br",null,null,-1),$e={key:1},be={ref:"afterChangeMultiple",multiple:""},Se=e("option",{value:"value1",selected:""},"Value 1",-1),Ce=e("option",{value:"value2"},"Value 2",-1),we=e("option",{value:"value3"},"Value 3",-1),Oe=[Se,Ce,we],Ve=e("pre",null,[s("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          events: {
            afterChange: (newVal) => {
              console.log(newVal)
            }
          }
        })
      `),s(`
    `)],-1);function ye(t,n,c,h,u,o){return a(),l(O,null,[e("div",J,[U,z,q,t.beforeChangeSingle?(a(),l("div",G,[e("strong",null,"Before change: "+d(t.beforeChangeSingle),1)])):v("",!0),e("select",K,Z,512),ee,t.beforeChangeMultiple?(a(),l("div",te,[e("strong",null,"Before change: "+d(t.beforeChangeMultiple),1)])):v("",!0),e("select",ne,le,512),re]),e("div",ie,[ce,he,t.afterChangeSingle?(a(),l("div",ue,[e("strong",null,"After change: "+d(t.afterChangeSingle),1)])):v("",!0),e("select",de,ve,512),me,t.afterChangeMultiple?(a(),l("div",$e,[e("strong",null,"After change: "+d(t.afterChangeMultiple),1)])):v("",!0),e("select",be,Oe,512),Ve])],64)}const Me=g(I,[["render",ye]]),Ae=_({name:"BeForeAfterOpenClose",data(){return{beforeAfterOpenCloseSingle:null,singleState:"",beforeAfterOpenCloseMultiple:null,multipleState:""}},mounted(){this.beforeAfterOpenCloseSingle=new r({select:this.$refs.beforeAfterOpenCloseSingle,events:{beforeOpen:()=>{this.setState("single","beforeOpen")},afterOpen:()=>{this.setState("single","afterOpen")},beforeClose:()=>{this.setState("single","beforeClose")},afterClose:()=>{this.setState("single","afterClose")}}}),this.beforeAfterOpenCloseMultiple=new r({select:this.$refs.beforeAfterOpenCloseMultiple,events:{beforeOpen:()=>{this.setState("multiple","beforeOpen")},afterOpen:()=>{this.setState("multiple","afterOpen")},beforeClose:()=>{this.setState("multiple","beforeClose")},afterClose:()=>{this.setState("multiple","afterClose")}}})},methods:{setState(t,n){t==="single"?this.singleState=n:this.multipleState=n,setTimeout(()=>{t==="single"?this.singleState="":this.multipleState=""},1e3)}}}),ke={id:"open",class:"content"},je=e("h2",{class:"header"},"beforeOpen / afterOpen / beforeClose / afterClose",-1),Fe=e("p",null," The beforeOpen, afterOpen, beforeClose, and afterClose events will fire before and after the select is opened and closed. ",-1),Te={class:"row"},Ee={ref:"beforeAfterOpenCloseSingle"},Be=e("option",{value:"value1"},"Value 1",-1),xe=e("option",{value:"value2"},"Value 2",-1),Le=e("option",{value:"value3"},"Value 3",-1),Ne=[Be,xe,Le],De={ref:"beforeAfterOpenCloseMultiple",multiple:""},Pe=e("option",{value:"value1"},"Value 1",-1),Re=e("option",{value:"value2"},"Value 2",-1),He=e("option",{value:"value3"},"Value 3",-1),Ie=[Pe,Re,He],Je=e("pre",null,[s("      "),e("code",{class:"language-javascript"},`
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
    `)],-1);function Ue(t,n,c,h,u,o){return a(),l("div",ke,[je,Fe,e("div",Te,[e("div",null,[e("div",null,"State: "+d(t.singleState),1),e("select",Ee,Ne,512)]),e("div",null,[e("div",null,"State: "+d(t.multipleState),1),e("select",De,Ie,512)])]),Je])}const ze=g(Ae,[["render",Ue]]),qe={id:"search",class:"content"},Ge=e("h2",{class:"header"},"search",-1),Ke=e("p",null,[s(" Slim select allows you to syncronize result values from your promise response."),e("br"),s(" Call callback() method with slimselect data, false or string with specific string. ")],-1),Qe={class:"row"},We=e("pre",null,[s("      "),e("code",{class:"language-javascript"},`
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
      `),s(`
    `)],-1),Xe=_({__name:"search",setup(t){let n=[],c=w(null),h=w(null);fetch("https://api.gofakeit.com/json",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"array",rowcount:1e3,indent:!1,fields:[{name:"first_name",function:"firstname",params:{}},{name:"last_name",function:"lastname",params:{}}]})}).then(o=>o.json()).then(o=>{n=o}),V(()=>{new r({select:c.value,settings:{placeholderText:"Search First or Last Name",searchingText:"Searching Users...",searchHighlight:!0},events:{search:u}}),new r({select:h.value,settings:{placeholderText:"Search First or Last Name",searchingText:"Searching Users...",searchHighlight:!0},events:{search:u}})});function u(o,b){return new Promise((S,m)=>{if(o.length<2)return m("Search must be at least 2 characters");const $=n.filter(i=>i.first_name.toLowerCase().includes(o.toLowerCase())||i.last_name.toLowerCase().includes(o.toLowerCase()));if($.length===0)return m("No results found");let C=$.map(i=>({text:`${i.first_name} ${i.last_name}`,value:`${i.first_name} ${i.last_name}`}));setTimeout(()=>{S(C)},300)})}return(o,b)=>(a(),l("div",qe,[Ge,Ke,e("div",Qe,[e("select",{ref_key:"searchSingle",ref:c},null,512),e("select",{ref_key:"searchMultiple",ref:h,multiple:""},null,512)]),We]))}}),Ye=_({name:"SearchFilter",mounted(){new r({select:this.$refs.searchFilter,events:{searchFilter:(t,n)=>t.text.substr(0,n.length)===n}})}}),Ze={id:"searchFilter",class:"content"},et=e("h2",{class:"header"},"searchFilter",-1),tt=e("p",null,"searchFilter event is used to replace the default matching algorithm.",-1),nt=e("p",null,[s("See Data for the proper object interface of "),e("em",null,"option"),s(".")],-1),st={ref:"searchFilter"},ot=e("option",{value:"apple"},"Apple",-1),at=e("option",{value:"orange"},"Orange",-1),lt=e("option",{value:"pineapple"},"Pineapple",-1),rt=[ot,at,lt],it=e("pre",null,[s("      "),e("code",{class:"language-javascript"},`
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
    `)],-1);function ct(t,n,c,h,u,o){return a(),l("div",Ze,[et,tt,nt,e("select",st,rt,512),it])}const ht=g(Ye,[["render",ct]]),ut=_({name:"Addable",mounted(){new r({select:this.$refs.addableSingle,events:{addable:t=>({text:t,value:t.toLowerCase()})}}),new r({select:this.$refs.addableMultiple,events:{addable:t=>new Promise(n=>{setTimeout(()=>{n({text:t,value:t})},100)})}})}}),dt={id:"addable",class:"content"},_t=e("h2",{class:"header"},"addable",-1),pt=e("p",null,"Slim select has the ability to dynamically add options via the search input field",-1),ft=e("p",null," addable is a callback which takes a function parameter. The return value can either be a string or an option object. ",-1),gt={class:"row"},vt={ref:"addableSingle"},mt=e("option",{value:"value1"},"Value 1",-1),$t=e("option",{value:"value2"},"Value 2",-1),bt=e("option",{value:"value3"},"Value 3",-1),St=[mt,$t,bt],Ct={ref:"addableMultiple",multiple:""},wt=e("option",{value:"value1"},"Value 1",-1),Ot=e("option",{value:"value2"},"Value 2",-1),Vt=e("option",{value:"value3"},"Value 3",-1),yt=[wt,Ot,Vt],Mt=e("pre",null,[s("      "),e("code",{class:"language-javascript"},`
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
    `)],-1);function At(t,n,c,h,u,o){return a(),l("div",dt,[_t,pt,ft,e("div",gt,[e("select",vt,St,512),e("select",Ct,yt,512)]),Mt])}const kt=g(ut,[["render",At]]),jt=_({name:"Events",components:{Error:H,BeforeAfterChange:Me,BeforeAfterOpenClose:ze,Search:Xe,SearchFilter:ht,Addable:kt}}),Ft={id:"events",class:"contents"};function Tt(t,n,c,h,u,o){const b=p("Error"),S=p("BeforeAfterChange"),m=p("BeforeAfterOpenClose"),$=p("Search"),C=p("SearchFilter"),i=p("Addable");return a(),l("div",Ft,[f(b),f(S),f(m),f($),f(C),f(i)])}const Bt=g(jt,[["render",Tt]]);export{Bt as default};
