import{d,S as r,_ as $,o,c as l,a as e,t as f,i as g,F as y,f as n,j as S,k as V,g as v,h as m}from"./index.js";const k=d({name:"BeforeAfterChange",data(){return{beforeChangeSingle:[],beforeChangeMultiple:[],afterChangeSingle:[],afterChangeMultiple:[]}},mounted(){new r({select:this.$refs.beforeChangeSingle,events:{beforeChange:(t,s)=>{this.beforeChangeSingle=t}}}),new r({select:this.$refs.beforeChangeMultiple,events:{beforeChange:(t,s)=>(this.beforeChangeMultiple=t,!0)}}),new r({select:this.$refs.afterChangeSingle,events:{afterChange:t=>{this.afterChangeSingle=t}}}),new r({select:this.$refs.afterChangeMultiple,events:{afterChange:t=>{this.afterChangeMultiple=t}}})}}),M={class:"content"},j=e("h2",{class:"header"},"beforeOnChange",-1),F=e("p",null," beforeOnChange will trigger a callback on an option click and will allow you the ability to halt if the value it produces isnt to your liking. In order to stop the change from happening just return false on the callback. Returning nothing or true will allow it to continue as normal. ",-1),x={key:0},O={ref:"beforeChangeSingle"},T=e("option",{value:"value1"},"Value 1",-1),A=e("option",{value:"value2"},"Value 2",-1),B=e("option",{value:"value3"},"Value 3",-1),L=[T,A,B],N=e("br",null,null,-1),D=e("br",null,null,-1),P={key:1},E={ref:"beforeChangeMultiple",multiple:""},R=e("option",{value:"value1",selected:""},"Value 1",-1),H=e("option",{value:"value2"},"Value 2",-1),I=e("option",{value:"value3"},"Value 3",-1),J=[R,H,I],U=e("pre",null,[n("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '.element .you #want',
          events: {
            beforeChange: (newVal, oldVal) => {
              console.log(newVal)
              return false // this will stop the change from happening
            }
          }
        })
      `),n(`
    `)],-1),z={class:"content"},q=e("h2",{class:"header"},"afterChange",-1),G=e("p",null,"afterChange will trigger a callback after the value of the select dropdown has changed.",-1),K={key:0},Q={ref:"afterChangeSingle"},W=e("option",{value:"value1"},"Value 1",-1),X=e("option",{value:"value2"},"Value 2",-1),Y=e("option",{value:"value3"},"Value 3",-1),Z=[W,X,Y],ee=e("br",null,null,-1),te=e("br",null,null,-1),ne={key:1},ae={ref:"afterChangeMultiple",multiple:""},se=e("option",{value:"value1",selected:""},"Value 1",-1),oe=e("option",{value:"value2"},"Value 2",-1),le=e("option",{value:"value3"},"Value 3",-1),re=[se,oe,le],ie=e("pre",null,[n("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '.element .you #want',
          events: {
            afterChange: (newVal) => {
              console.log(newVal)
            }
          }
        })
      `),n(`
    `)],-1);function ce(t,s,c,h,u,a){return o(),l(y,null,[e("div",M,[j,F,t.beforeChangeSingle?(o(),l("div",x,[e("strong",null,"Before on change: "+f(t.beforeChangeSingle),1)])):g("",!0),e("select",O,L,512),N,D,t.beforeChangeMultiple?(o(),l("div",P,[e("strong",null,"Before on change: "+f(t.beforeChangeMultiple),1)])):g("",!0),e("select",E,J,512),U]),e("div",z,[q,G,t.afterChangeSingle?(o(),l("div",K,[e("strong",null,"On change: "+f(t.afterChangeSingle),1)])):g("",!0),e("select",Q,Z,512),ee,te,t.afterChangeMultiple?(o(),l("div",ne,[e("strong",null,"On change: "+f(t.afterChangeMultiple),1)])):g("",!0),e("select",ae,re,512),ie])],64)}const he=$(k,[["render",ce]]),ue={id:"search",class:"content"},de=e("h2",{class:"header"},"search",-1),_e=e("p",null,[n(" Slim select allows you to syncronize result values from your promise response."),e("br"),n(" Call callback() method with slimselect data, false or string with specific string. ")],-1),pe={class:"select-split"},fe=e("pre",null,[n("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '.element .you #want',
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
                    rowcount: 1000,
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
    `)],-1),ge=d({__name:"search",setup(t){let s=[],c=S(null),h=S(null);fetch("https://api.gofakeit.com/json",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"array",rowcount:1e3,indent:!1,fields:[{name:"first_name",function:"firstname",params:{}},{name:"last_name",function:"lastname",params:{}}]})}).then(a=>a.json()).then(a=>{s=a}),V(()=>{new r({select:c.value,settings:{placeholderText:"Search First or Last Name",searchingText:"Searching Users...",searchHighlight:!0},events:{search:u}}),new r({select:h.value,settings:{placeholderText:"Search First or Last Name",searchingText:"Searching Users...",searchHighlight:!0},events:{search:u}})});function u(a,b){return new Promise((C,_)=>{if(a.length<2)return _("Search must be at least 2 characters");const p=s.filter(i=>i.first_name.toLowerCase().includes(a.toLowerCase())||i.last_name.toLowerCase().includes(a.toLowerCase()));if(p.length===0)return _("No results found");let w=p.map(i=>({text:`${i.first_name} ${i.last_name}`,value:`${i.first_name} ${i.last_name}`}));setTimeout(()=>{C(w)},300)})}return(a,b)=>(o(),l("div",ue,[de,_e,e("div",pe,[e("select",{ref_key:"searchSingle",ref:c},null,512),e("select",{ref_key:"searchMultiple",ref:h,multiple:""},null,512)]),fe]))}}),ve=d({name:"SearchFilter",mounted(){new r({select:this.$refs.searchFilter,events:{searchFilter:(t,s)=>t.text.substr(0,s.length)===s}})}}),me={class:"content"},$e=e("h2",{class:"header"},"searchFilter",-1),be=e("p",null,"searchFilter event is used to replace the default matching algorithm.",-1),Ce=e("p",null,[n("See Data for the proper object interface of "),e("em",null,"option"),n(".")],-1),Se={ref:"searchFilter"},we=e("option",{value:"apple"},"Apple",-1),ye=e("option",{value:"orange"},"Orange",-1),Ve=e("option",{value:"pineapple"},"Pineapple",-1),ke=[we,ye,Ve],Me=e("pre",null,[n("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '.element .you #want',
          events: {
            // Exact case sensitive start of string match
            searchFilter: (option, search) => {
              return option.text.substr(0, search.length) === search
            }
          }
        })
      `),n(`
    `)],-1);function je(t,s,c,h,u,a){return o(),l("div",me,[$e,be,Ce,e("select",Se,ke,512),Me])}const Fe=$(ve,[["render",je]]),xe=d({name:"Addable",mounted(){new r({select:this.$refs.addableSingle,events:{addable:t=>t}}),new r({select:this.$refs.addableMultiple,events:{addable:t=>({text:t,value:t.toLowerCase()})}})}}),Oe={class:"content"},Te=e("h2",{class:"header"},"addable",-1),Ae=e("p",null,"Slim select has the ability to dynamically add options via the search input field",-1),Be=e("p",null," addable is a callback which takes a function parameter. The return value is the string of the value you want added. ",-1),Le={class:"select-split"},Ne={ref:"addableSingle"},De=e("option",{value:"value1"},"Value 1",-1),Pe=e("option",{value:"value2"},"Value 2",-1),Ee=e("option",{value:"value3"},"Value 3",-1),Re=[De,Pe,Ee],He={ref:"addableMultiple",multiple:""},Ie=e("option",{value:"value1"},"Value 1",-1),Je=e("option",{value:"value2"},"Value 2",-1),Ue=e("option",{value:"value3"},"Value 3",-1),ze=[Ie,Je,Ue],qe=e("pre",null,[n("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '.element .you #want',
          // Optional - In the event you want to alter/validate it as a return value
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
        })
      `),n(`
    `)],-1);function Ge(t,s,c,h,u,a){return o(),l("div",Oe,[Te,Ae,Be,e("div",Le,[e("select",Ne,Re,512),e("select",He,ze,512)]),qe])}const Ke=$(xe,[["render",Ge]]),Qe=d({name:"Events",components:{BeforeAfterChange:he,Search:ge,SearchFilter:Fe,Addable:Ke}}),We={id:"events",class:"contents"};function Xe(t,s,c,h,u,a){const b=v("BeforeAfterChange"),C=v("Search"),_=v("SearchFilter"),p=v("Addable");return o(),l("div",We,[m(b),m(C),m(_),m(p)])}const Ze=$(Qe,[["render",Xe]]);export{Ze as default};
