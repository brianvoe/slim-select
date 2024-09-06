import{d as h,S as o,_ as m,o as r,c as i,a as e,e as l,t as d,j as b,F as V,k as O,l as y,O as x,r as g,f as v}from"./index.js";const M=h({name:"Error",data(){return{errorSingle:null,errMsg:""}},mounted(){this.errorSingle=new o({select:this.$refs.errorSingle,events:{error:n=>{this.errMsg=n.message}}})}}),A={id:"error",class:"content"},k={key:0},F={class:"row"},j={ref:"notError"};function T(n,t,p,f,c,s){return r(),i("div",A,[t[2]||(t[2]=e("h2",{class:"header"},"error",-1)),t[3]||(t[3]=e("p",null,"The error event is fired when an error occurs. The error message is passed as the first argument.",-1)),t[4]||(t[4]=e("div",{class:"alert info"}," If you are are having issues with slim select finding the select element. Try delaying new SlimSelect() call as the select dom element might not be available yet. ",-1)),n.errMsg!==""?(r(),i("div",k,[t[0]||(t[0]=e("b",null,"Error:",-1)),l(" "+d(n.errMsg),1)])):b("",!0),e("div",F,[e("select",j,t[1]||(t[1]=[e("option",{value:"1"},"Option 1",-1),e("option",{value:"2"},"Option 2",-1),e("option",{value:"3"},"Option 3",-1)]),512)]),t[5]||(t[5]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        var select = new SlimSelect({
          select: '#selectElement',
          events: {
            error: function(err) {
              console.error(err)
            }
          }
        })
      `),l(`
    `)],-1))])}const E=m(M,[["render",T]]),B=h({name:"BeforeAfterChange",data(){return{beforeChangeSingle:[],beforeChangeMultiple:[],afterChangeSingle:[],afterChangeMultiple:[]}},mounted(){new o({select:this.$refs.beforeChangeSingle,settings:{allowDeselect:!0},events:{beforeChange:(n,t)=>(this.beforeChangeSingle=t,!0)}}),new o({select:this.$refs.beforeChangeMultiple,events:{beforeChange:(n,t)=>(this.beforeChangeMultiple=t,!0)}}),new o({select:this.$refs.afterChangeSingle,settings:{allowDeselect:!0},events:{afterChange:n=>{this.afterChangeSingle=n}}}),new o({select:this.$refs.afterChangeMultiple,events:{afterChange:n=>{this.afterChangeMultiple=n}}})}}),L={id:"beforeChange",class:"content"},D={key:0},P={ref:"beforeChangeSingle"},N={key:1},R={ref:"beforeChangeMultiple",multiple:""},H={id:"afterChange",class:"content"},I={key:0},J={ref:"afterChangeSingle"},U={key:1},z={ref:"afterChangeMultiple",multiple:""};function q(n,t,p,f,c,s){return r(),i(V,null,[e("div",L,[t[2]||(t[2]=e("h2",{class:"header"},"beforeChange",-1)),t[3]||(t[3]=e("p",null," beforeOnChange will trigger a callback on an option click and will allow you the ability to halt if the value it produces isnt to your liking. In order to stop the change from happening just return false on the callback. Returning nothing or true will allow it to continue as normal. ",-1)),t[4]||(t[4]=e("div",{class:"alert info"}," Be sure to return true to allow for the change to happen. False or nothing to cancel change. ",-1)),n.beforeChangeSingle?(r(),i("div",D,[e("strong",null,"Before change: "+d(n.beforeChangeSingle),1)])):b("",!0),e("select",P,t[0]||(t[0]=[e("option",{"data-placeholder":"true"},"Select Option",-1),e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)]),512),t[5]||(t[5]=e("br",null,null,-1)),n.beforeChangeMultiple?(r(),i("div",N,[e("strong",null,"Before change: "+d(n.beforeChangeMultiple),1)])):b("",!0),e("select",R,t[1]||(t[1]=[e("option",{value:"value1",selected:""},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)]),512),t[6]||(t[6]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          events: {
            beforeChange: (newVal, oldVal) => {
              console.log(newVal)
              return false // this will stop the change from happening
            }
          }
        })
      `),l(`
    `)],-1))]),e("div",H,[t[9]||(t[9]=e("h2",{class:"header"},"afterChange",-1)),t[10]||(t[10]=e("p",null,"afterChange will trigger a callback after the value of the select dropdown has changed.",-1)),n.afterChangeSingle?(r(),i("div",I,[e("strong",null,"After change: "+d(n.afterChangeSingle),1)])):b("",!0),e("select",J,t[7]||(t[7]=[e("option",{"data-placeholder":"true"},"Select Option",-1),e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)]),512),t[11]||(t[11]=e("br",null,null,-1)),n.afterChangeMultiple?(r(),i("div",U,[e("strong",null,"After change: "+d(n.afterChangeMultiple),1)])):b("",!0),e("select",z,t[8]||(t[8]=[e("option",{value:"value1",selected:""},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)]),512),t[12]||(t[12]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          events: {
            afterChange: (newVal) => {
              console.log(newVal)
            }
          }
        })
      `),l(`
    `)],-1))])],64)}const G=m(B,[["render",q]]),K=h({name:"BeForeAfterOpenClose",data(){return{beforeAfterOpenCloseSingle:null,singleState:"",beforeAfterOpenCloseMultiple:null,multipleState:""}},mounted(){this.beforeAfterOpenCloseSingle=new o({select:this.$refs.beforeAfterOpenCloseSingle,events:{beforeOpen:()=>{console.log("before open"),this.setState("single","beforeOpen")},afterOpen:()=>{console.log("after open"),this.setState("single","afterOpen")},beforeClose:()=>{console.log("before close"),this.setState("single","beforeClose")},afterClose:()=>{console.log("after close"),this.setState("single","afterClose")}}}),this.beforeAfterOpenCloseMultiple=new o({select:this.$refs.beforeAfterOpenCloseMultiple,events:{beforeOpen:()=>{console.log("before open"),this.setState("multiple","beforeOpen")},afterOpen:()=>{console.log("after open"),this.setState("multiple","afterOpen")},beforeClose:()=>{console.log("before close"),this.setState("multiple","beforeClose")},afterClose:()=>{console.log("after close"),this.setState("multiple","afterClose")}}})},methods:{setState(n,t){n==="single"?this.singleState=t:this.multipleState=t,setTimeout(()=>{n==="single"?this.singleState="":this.multipleState=""},1e3)}}}),Q={id:"open",class:"content"},W={class:"row"},X={ref:"beforeAfterOpenCloseSingle"},Y={ref:"beforeAfterOpenCloseMultiple",multiple:""};function Z(n,t,p,f,c,s){return r(),i("div",Q,[t[2]||(t[2]=e("h2",{class:"header"},"beforeOpen / afterOpen / beforeClose / afterClose",-1)),t[3]||(t[3]=e("p",null," The beforeOpen, afterOpen, beforeClose, and afterClose events will fire before and after the select is opened and closed. ",-1)),e("div",W,[e("div",null,[e("div",null,"State: "+d(n.singleState),1),e("select",X,t[0]||(t[0]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)]),512)]),e("div",null,[e("div",null,"State: "+d(n.multipleState),1),e("select",Y,t[1]||(t[1]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)]),512)])]),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
      `),l(`
    `)],-1))])}const ee=m(K,[["render",Z]]),te={id:"search",class:"content"},ne={class:"row"},le=h({__name:"search",setup(n){let t=[],p=O(null),f=O(null);fetch("https://api.gofakeit.com/json",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"array",rowcount:1e3,indent:!1,fields:[{name:"first_name",function:"firstname",params:{}},{name:"last_name",function:"lastname",params:{}}]})}).then(s=>s.json()).then(s=>{t=s}),y(()=>{new o({select:p.value,settings:{placeholderText:"Search First or Last Name",searchingText:"Searching Users...",searchHighlight:!0},events:{search:c}}),new o({select:f.value,settings:{closeOnSelect:!1,placeholderText:"Search First or Last Name",searchingText:"Searching Users...",searchHighlight:!0},events:{search:c}})});function c(s,u){return new Promise(($,S)=>{if(s.length<2)return S("Search must be at least 2 characters");const C=t.filter(a=>a.first_name.toLowerCase().includes(s.toLowerCase())||a.last_name.toLowerCase().includes(s.toLowerCase()));if(C.length===0)return S("No results found");const w=C.filter(a=>!u.some(_=>_ instanceof x&&_.value===`${a.first_name} ${a.last_name}`)).map(a=>({text:`${a.first_name} ${a.last_name}`,value:`${a.first_name} ${a.last_name}`}));setTimeout(()=>{$([{label:"Results",selectAll:!0,options:w}])},300)})}return(s,u)=>(r(),i("div",te,[u[0]||(u[0]=e("h2",{class:"header"},"search",-1)),u[1]||(u[1]=e("p",null,[l(" Slim select allows you to syncronize result values from your promise response."),e("br"),l(" Call callback() method with slimselect data, false or string with specific string. ")],-1)),e("div",ne,[e("select",{ref_key:"searchSingle",ref:p},null,512),e("select",{ref_key:"searchMultiple",ref:f,multiple:""},null,512)]),u[2]||(u[2]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
      `),l(`
    `)],-1))]))}}),se=h({name:"SearchFilter",mounted(){new o({select:this.$refs.searchFilterSingle,settings:{searchHighlight:!0},events:{searchFilter:(n,t)=>n.text.toLowerCase().includes(t.toLowerCase())}}),new o({select:this.$refs.searchFilterMultiple,data:[{label:"Fruits",options:[{text:"Apple",value:"apple"},{text:"Banana",value:"banana"},{text:"Orange",value:"orange"}]},{label:"Vegetables",options:[{text:"Carrot",value:"carrot"},{text:"Potato",value:"potato"},{text:"Tomato",value:"tomato"}]},{label:"Meats",options:[{text:"Beef",value:"beef"},{text:"Chicken",value:"chicken"},{text:"Pork",value:"pork"}]},{label:"Seafood",options:[{text:"Crab",value:"crab"},{text:"Lobster",value:"lobster"},{text:"Shrimp",value:"shrimp"}]}],settings:{searchHighlight:!0},events:{searchFilter:(n,t)=>n.text.toLowerCase().includes(t.toLowerCase())}})}}),oe={id:"searchFilter",class:"content"},ae={class:"row"},re={ref:"searchFilterSingle"},ie={ref:"searchFilterMultiple"};function ue(n,t,p,f,c,s){return r(),i("div",oe,[t[2]||(t[2]=e("h2",{class:"header"},"searchFilter",-1)),t[3]||(t[3]=e("p",null,"searchFilter event is used to replace the default matching algorithm.",-1)),t[4]||(t[4]=e("p",null,[l("See Data for the proper object interface of "),e("em",null,"option"),l(".")],-1)),e("div",ae,[e("select",re,t[0]||(t[0]=[e("option",{value:"apple"},"Apple",-1),e("option",{value:"orange"},"Orange",-1),e("option",{value:"pineapple"},"Pineapple",-1)]),512),e("select",ie,t[1]||(t[1]=[e("option",{value:"apple"},"Apple",-1),e("option",{value:"orange"},"Orange",-1),e("option",{value:"pineapple"},"Pineapple",-1)]),512)]),t[5]||(t[5]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
      `),l(`
    `)],-1))])}const pe=m(se,[["render",ue]]),fe=h({name:"Addable",mounted(){new o({select:this.$refs.addableSingle,events:{addable:n=>({text:n,value:n.toLowerCase()})}}),new o({select:this.$refs.addableMultiple,events:{addable:n=>new Promise(t=>{setTimeout(()=>{t({text:n,value:n})},100)})}})}}),ce={id:"addable",class:"content"},de={class:"row"},he={ref:"addableSingle"},ge={ref:"addableMultiple",multiple:""};function ve(n,t,p,f,c,s){return r(),i("div",ce,[t[2]||(t[2]=e("h2",{class:"header"},"addable",-1)),t[3]||(t[3]=e("p",null,"Slim select has the ability to dynamically add options via the search input field",-1)),t[4]||(t[4]=e("p",null," addable is a callback which takes a function parameter. The return value can either be a string or an option object. ",-1)),e("div",de,[e("select",he,t[0]||(t[0]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)]),512),e("select",ge,t[1]||(t[1]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)]),512)]),t[5]||(t[5]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
      `),l(`
    `)],-1))])}const me=m(fe,[["render",ve]]),be=h({name:"Events",components:{Error:E,BeforeAfterChange:G,BeforeAfterOpenClose:ee,Search:le,SearchFilter:pe,Addable:me}}),Se={id:"events",class:"contents"};function Ce(n,t,p,f,c,s){const u=g("Error"),$=g("BeforeAfterChange"),S=g("BeforeAfterOpenClose"),C=g("Search"),w=g("SearchFilter"),a=g("Addable");return r(),i("div",Se,[v(u),v($),v(S),v(C),v(w),v(a)])}const we=m(be,[["render",Ce]]);export{we as default};
