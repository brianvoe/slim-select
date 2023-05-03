import{d as _,S as a,_ as g,o as r,c as i,f as o,t as d,j as v,a as e,F as V,k as O,l as y,O as x,r as p,b as f}from"./index.js";const M=_({name:"Error",data(){return{errorSingle:null,errMsg:""}},mounted(){this.errorSingle=new a({select:this.$refs.errorSingle,events:{error:t=>{this.errMsg=t.message}}})}}),k={id:"error",class:"content"},A=e("h2",{class:"header"},"error",-1),F=e("p",null,"The error event is fired when an error occurs. The error message is passed as the first argument.",-1),j=e("div",{class:"alert info"}," If you are are having issues with slim select finding the select element. Try delaying new SlimSelect() call as the select dom element might not be available yet. ",-1),T={key:0},E=e("b",null,"Error:",-1),B={class:"row"},L={ref:"notError"},D=e("option",{value:"1"},"Option 1",-1),P=e("option",{value:"2"},"Option 2",-1),N=e("option",{value:"3"},"Option 3",-1),H=[D,P,N],R=e("pre",null,[o("      "),e("code",{class:"language-javascript"},`
        var select = new SlimSelect({
          select: '#selectElement',
          events: {
            error: function(err) {
              console.error(err)
            }
          }
        })
      `),o(`
    `)],-1);function I(t,n,c,h,u,s){return r(),i("div",k,[A,F,j,t.errMsg!==""?(r(),i("div",T,[E,o(" "+d(t.errMsg),1)])):v("",!0),e("div",B,[e("select",L,H,512)]),R])}const J=g(M,[["render",I]]),U=_({name:"BeforeAfterChange",data(){return{beforeChangeSingle:[],beforeChangeMultiple:[],afterChangeSingle:[],afterChangeMultiple:[]}},mounted(){new a({select:this.$refs.beforeChangeSingle,settings:{allowDeselect:!0},events:{beforeChange:(t,n)=>(this.beforeChangeSingle=n,!0)}}),new a({select:this.$refs.beforeChangeMultiple,events:{beforeChange:(t,n)=>(this.beforeChangeMultiple=n,!0)}}),new a({select:this.$refs.afterChangeSingle,settings:{allowDeselect:!0},events:{afterChange:t=>{this.afterChangeSingle=t}}}),new a({select:this.$refs.afterChangeMultiple,events:{afterChange:t=>{this.afterChangeMultiple=t}}})}}),z={id:"beforeChange",class:"content"},q=e("h2",{class:"header"},"beforeChange",-1),G=e("p",null," beforeOnChange will trigger a callback on an option click and will allow you the ability to halt if the value it produces isnt to your liking. In order to stop the change from happening just return false on the callback. Returning nothing or true will allow it to continue as normal. ",-1),K=e("div",{class:"alert info"}," Be sure to return true to allow for the change to happen. False or nothing to cancel change. ",-1),Q={key:0},W={ref:"beforeChangeSingle"},X=e("option",{"data-placeholder":"true"},"Select Option",-1),Y=e("option",{value:"value1"},"Value 1",-1),Z=e("option",{value:"value2"},"Value 2",-1),ee=e("option",{value:"value3"},"Value 3",-1),te=[X,Y,Z,ee],ne=e("br",null,null,-1),oe={key:1},se={ref:"beforeChangeMultiple",multiple:""},ae=e("option",{value:"value1",selected:""},"Value 1",-1),le=e("option",{value:"value2"},"Value 2",-1),re=e("option",{value:"value3"},"Value 3",-1),ie=[ae,le,re],ce=e("pre",null,[o("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          events: {
            beforeChange: (newVal, oldVal) => {
              console.log(newVal)
              return false // this will stop the change from happening
            }
          }
        })
      `),o(`
    `)],-1),he={id:"afterChange",class:"content"},ue=e("h2",{class:"header"},"afterChange",-1),de=e("p",null,"afterChange will trigger a callback after the value of the select dropdown has changed.",-1),_e={key:0},pe={ref:"afterChangeSingle"},fe=e("option",{"data-placeholder":"true"},"Select Option",-1),ge=e("option",{value:"value1"},"Value 1",-1),ve=e("option",{value:"value2"},"Value 2",-1),me=e("option",{value:"value3"},"Value 3",-1),$e=[fe,ge,ve,me],be=e("br",null,null,-1),Se={key:1},Ce={ref:"afterChangeMultiple",multiple:""},we=e("option",{value:"value1",selected:""},"Value 1",-1),Oe=e("option",{value:"value2"},"Value 2",-1),Ve=e("option",{value:"value3"},"Value 3",-1),ye=[we,Oe,Ve],xe=e("pre",null,[o("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          events: {
            afterChange: (newVal) => {
              console.log(newVal)
            }
          }
        })
      `),o(`
    `)],-1);function Me(t,n,c,h,u,s){return r(),i(V,null,[e("div",z,[q,G,K,t.beforeChangeSingle?(r(),i("div",Q,[e("strong",null,"Before change: "+d(t.beforeChangeSingle),1)])):v("",!0),e("select",W,te,512),ne,t.beforeChangeMultiple?(r(),i("div",oe,[e("strong",null,"Before change: "+d(t.beforeChangeMultiple),1)])):v("",!0),e("select",se,ie,512),ce]),e("div",he,[ue,de,t.afterChangeSingle?(r(),i("div",_e,[e("strong",null,"After change: "+d(t.afterChangeSingle),1)])):v("",!0),e("select",pe,$e,512),be,t.afterChangeMultiple?(r(),i("div",Se,[e("strong",null,"After change: "+d(t.afterChangeMultiple),1)])):v("",!0),e("select",Ce,ye,512),xe])],64)}const ke=g(U,[["render",Me]]),Ae=_({name:"BeForeAfterOpenClose",data(){return{beforeAfterOpenCloseSingle:null,singleState:"",beforeAfterOpenCloseMultiple:null,multipleState:""}},mounted(){this.beforeAfterOpenCloseSingle=new a({select:this.$refs.beforeAfterOpenCloseSingle,events:{beforeOpen:()=>{console.log("before open"),this.setState("single","beforeOpen")},afterOpen:()=>{console.log("after open"),this.setState("single","afterOpen")},beforeClose:()=>{console.log("before close"),this.setState("single","beforeClose")},afterClose:()=>{console.log("after close"),this.setState("single","afterClose")}}}),this.beforeAfterOpenCloseMultiple=new a({select:this.$refs.beforeAfterOpenCloseMultiple,events:{beforeOpen:()=>{console.log("before open"),this.setState("multiple","beforeOpen")},afterOpen:()=>{console.log("after open"),this.setState("multiple","afterOpen")},beforeClose:()=>{console.log("before close"),this.setState("multiple","beforeClose")},afterClose:()=>{console.log("after close"),this.setState("multiple","afterClose")}}})},methods:{setState(t,n){t==="single"?this.singleState=n:this.multipleState=n,setTimeout(()=>{t==="single"?this.singleState="":this.multipleState=""},1e3)}}}),Fe={id:"open",class:"content"},je=e("h2",{class:"header"},"beforeOpen / afterOpen / beforeClose / afterClose",-1),Te=e("p",null," The beforeOpen, afterOpen, beforeClose, and afterClose events will fire before and after the select is opened and closed. ",-1),Ee={class:"row"},Be={ref:"beforeAfterOpenCloseSingle"},Le=e("option",{value:"value1"},"Value 1",-1),De=e("option",{value:"value2"},"Value 2",-1),Pe=e("option",{value:"value3"},"Value 3",-1),Ne=[Le,De,Pe],He={ref:"beforeAfterOpenCloseMultiple",multiple:""},Re=e("option",{value:"value1"},"Value 1",-1),Ie=e("option",{value:"value2"},"Value 2",-1),Je=e("option",{value:"value3"},"Value 3",-1),Ue=[Re,Ie,Je],ze=e("pre",null,[o("      "),e("code",{class:"language-javascript"},`
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
      `),o(`
    `)],-1);function qe(t,n,c,h,u,s){return r(),i("div",Fe,[je,Te,e("div",Ee,[e("div",null,[e("div",null,"State: "+d(t.singleState),1),e("select",Be,Ne,512)]),e("div",null,[e("div",null,"State: "+d(t.multipleState),1),e("select",He,Ue,512)])]),ze])}const Ge=g(Ae,[["render",qe]]),Ke={id:"search",class:"content"},Qe=e("h2",{class:"header"},"search",-1),We=e("p",null,[o(" Slim select allows you to syncronize result values from your promise response."),e("br"),o(" Call callback() method with slimselect data, false or string with specific string. ")],-1),Xe={class:"row"},Ye=e("pre",null,[o("      "),e("code",{class:"language-javascript"},`
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
      `),o(`
    `)],-1),Ze=_({__name:"search",setup(t){let n=[],c=O(null),h=O(null);fetch("https://api.gofakeit.com/json",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"array",rowcount:1e3,indent:!1,fields:[{name:"first_name",function:"firstname",params:{}},{name:"last_name",function:"lastname",params:{}}]})}).then(s=>s.json()).then(s=>{n=s}),y(()=>{new a({select:c.value,settings:{placeholderText:"Search First or Last Name",searchingText:"Searching Users...",searchHighlight:!0},events:{search:u}}),new a({select:h.value,settings:{placeholderText:"Search First or Last Name",searchingText:"Searching Users...",searchHighlight:!0},events:{search:u}})});function u(s,m){return new Promise((S,$)=>{if(s.length<2)return $("Search must be at least 2 characters");const b=n.filter(l=>l.first_name.toLowerCase().includes(s.toLowerCase())||l.last_name.toLowerCase().includes(s.toLowerCase()));if(b.length===0)return $("No results found");const C=b.filter(l=>!m.some(w=>w instanceof x&&w.value===`${l.first_name} ${l.last_name}`)).map(l=>({text:`${l.first_name} ${l.last_name}`,value:`${l.first_name} ${l.last_name}`}));setTimeout(()=>{S(C)},300)})}return(s,m)=>(r(),i("div",Ke,[Qe,We,e("div",Xe,[e("select",{ref_key:"searchSingle",ref:c},null,512),e("select",{ref_key:"searchMultiple",ref:h,multiple:""},null,512)]),Ye]))}}),et=_({name:"SearchFilter",mounted(){new a({select:this.$refs.searchFilterSingle,settings:{searchHighlight:!0},events:{searchFilter:(t,n)=>t.text.toLowerCase().includes(n.toLowerCase())}}),new a({select:this.$refs.searchFilterMultiple,data:[{label:"Fruits",options:[{text:"Apple",value:"apple"},{text:"Banana",value:"banana"},{text:"Orange",value:"orange"}]},{label:"Vegetables",options:[{text:"Carrot",value:"carrot"},{text:"Potato",value:"potato"},{text:"Tomato",value:"tomato"}]},{label:"Meats",options:[{text:"Beef",value:"beef"},{text:"Chicken",value:"chicken"},{text:"Pork",value:"pork"}]},{label:"Seafood",options:[{text:"Crab",value:"crab"},{text:"Lobster",value:"lobster"},{text:"Shrimp",value:"shrimp"}]}],settings:{searchHighlight:!0},events:{searchFilter:(t,n)=>t.text.toLowerCase().includes(n.toLowerCase())}})}}),tt={id:"searchFilter",class:"content"},nt=e("h2",{class:"header"},"searchFilter",-1),ot=e("p",null,"searchFilter event is used to replace the default matching algorithm.",-1),st=e("p",null,[o("See Data for the proper object interface of "),e("em",null,"option"),o(".")],-1),at={class:"row"},lt={ref:"searchFilterSingle"},rt=e("option",{value:"apple"},"Apple",-1),it=e("option",{value:"orange"},"Orange",-1),ct=e("option",{value:"pineapple"},"Pineapple",-1),ht=[rt,it,ct],ut={ref:"searchFilterMultiple"},dt=e("option",{value:"apple"},"Apple",-1),_t=e("option",{value:"orange"},"Orange",-1),pt=e("option",{value:"pineapple"},"Pineapple",-1),ft=[dt,_t,pt],gt=e("pre",null,[o("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          events: {
            // Example: Exact case sensitive start of string match
            searchFilter: (option, search) => {
              return option.text.substr(0, search.length) === search
            }

            // Default
            searchFilter: (option, search) => {
              return option.text.toLowerCase().indexOf(search.toLowerCase()) !== -1
            }
          }
        })
      `),o(`
    `)],-1);function vt(t,n,c,h,u,s){return r(),i("div",tt,[nt,ot,st,e("div",at,[e("select",lt,ht,512),e("select",ut,ft,512)]),gt])}const mt=g(et,[["render",vt]]),$t=_({name:"Addable",mounted(){new a({select:this.$refs.addableSingle,events:{addable:t=>({text:t,value:t.toLowerCase()})}}),new a({select:this.$refs.addableMultiple,events:{addable:t=>new Promise(n=>{setTimeout(()=>{n({text:t,value:t})},100)})}})}}),bt={id:"addable",class:"content"},St=e("h2",{class:"header"},"addable",-1),Ct=e("p",null,"Slim select has the ability to dynamically add options via the search input field",-1),wt=e("p",null," addable is a callback which takes a function parameter. The return value can either be a string or an option object. ",-1),Ot={class:"row"},Vt={ref:"addableSingle"},yt=e("option",{value:"value1"},"Value 1",-1),xt=e("option",{value:"value2"},"Value 2",-1),Mt=e("option",{value:"value3"},"Value 3",-1),kt=[yt,xt,Mt],At={ref:"addableMultiple",multiple:""},Ft=e("option",{value:"value1"},"Value 1",-1),jt=e("option",{value:"value2"},"Value 2",-1),Tt=e("option",{value:"value3"},"Value 3",-1),Et=[Ft,jt,Tt],Bt=e("pre",null,[o("      "),e("code",{class:"language-javascript"},`
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
      `),o(`
    `)],-1);function Lt(t,n,c,h,u,s){return r(),i("div",bt,[St,Ct,wt,e("div",Ot,[e("select",Vt,kt,512),e("select",At,Et,512)]),Bt])}const Dt=g($t,[["render",Lt]]),Pt=_({name:"Events",components:{Error:J,BeforeAfterChange:ke,BeforeAfterOpenClose:Ge,Search:Ze,SearchFilter:mt,Addable:Dt}}),Nt={id:"events",class:"contents"};function Ht(t,n,c,h,u,s){const m=p("Error"),S=p("BeforeAfterChange"),$=p("BeforeAfterOpenClose"),b=p("Search"),C=p("SearchFilter"),l=p("Addable");return r(),i("div",Nt,[f(m),f(S),f($),f(b),f(C),f(l)])}const It=g(Pt,[["render",Ht]]);export{It as default};
