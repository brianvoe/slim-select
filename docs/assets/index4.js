import{d as g,S as r,_ as v,c as o,a as e,i as m,e as l,t as h,o as a,F as _,O as V,A,f,r as d}from"./index.js";const x=g({name:"Error",data(){return{errorSingle:null,errMsg:""}},mounted(){this.errorSingle=new r({select:this.$refs.errorSingle,events:{error:n=>{this.errMsg=n.message}}})}}),y={id:"error",class:"content"},M={key:0},k={class:"row"},F={ref:"notError"};function E(n,t,p,i,s,c){return a(),o("div",y,[t[2]||(t[2]=e("h2",{class:"header"},"error",-1)),t[3]||(t[3]=e("p",null,"The error event is fired when an error occurs. The error message is passed as the first argument.",-1)),t[4]||(t[4]=e("div",{class:"alert info"}," If you are are having issues with slim select finding the select element. Try delaying new SlimSelect() call as the select dom element might not be available yet. ",-1)),n.errMsg!==""?(a(),o("div",M,[t[0]||(t[0]=e("b",null,"Error:",-1)),l(" "+h(n.errMsg),1)])):m("",!0),e("div",k,[e("select",F,[...t[1]||(t[1]=[e("option",{value:"1"},"Option 1",-1),e("option",{value:"2"},"Option 2",-1),e("option",{value:"3"},"Option 3",-1)])],512)]),t[5]||(t[5]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        var select = new SlimSelect({
          select: '#selectElement',
          events: {
            error: function(err) {
              console.error(err)
            }
          }
        })
      `),l(`
    `)],-1))])}const T=v(x,[["render",E]]),j=g({name:"BeforeAfterChange",data(){return{beforeChangeSingle:[],beforeChangeMultiple:[],afterChangeSingle:[],afterChangeMultiple:[]}},mounted(){new r({select:this.$refs.beforeChangeSingle,settings:{allowDeselect:!0},events:{beforeChange:(n,t)=>(this.beforeChangeSingle=t,!0)}}),new r({select:this.$refs.beforeChangeMultiple,events:{beforeChange:(n,t)=>(this.beforeChangeMultiple=t,!0)}}),new r({select:this.$refs.afterChangeSingle,settings:{allowDeselect:!0},events:{afterChange:n=>{this.afterChangeSingle=n}}}),new r({select:this.$refs.afterChangeMultiple,events:{afterChange:n=>{this.afterChangeMultiple=n}}})}}),B={id:"beforeChange",class:"content"},P={key:0},D={ref:"beforeChangeSingle"},L={key:1},N={ref:"beforeChangeMultiple",multiple:""},R={id:"afterChange",class:"content"},H={key:0},I={ref:"afterChangeSingle"},U={key:1},J={ref:"afterChangeMultiple",multiple:""};function z(n,t,p,i,s,c){return a(),o(_,null,[e("div",B,[t[2]||(t[2]=e("h2",{class:"header"},"beforeChange",-1)),t[3]||(t[3]=e("p",null," beforeOnChange will trigger a callback on an option click and will allow you the ability to halt if the value it produces isnt to your liking. In order to stop the change from happening just return false on the callback. Returning nothing or true will allow it to continue as normal. ",-1)),t[4]||(t[4]=e("div",{class:"alert info"}," Be sure to return true to allow for the change to happen. False or nothing to cancel change. ",-1)),n.beforeChangeSingle?(a(),o("div",P,[e("strong",null,"Before change: "+h(n.beforeChangeSingle),1)])):m("",!0),e("select",D,[...t[0]||(t[0]=[e("option",{"data-placeholder":"true"},"Select Option",-1),e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),t[5]||(t[5]=e("br",null,null,-1)),n.beforeChangeMultiple?(a(),o("div",L,[e("strong",null,"Before change: "+h(n.beforeChangeMultiple),1)])):m("",!0),e("select",N,[...t[1]||(t[1]=[e("option",{value:"value1",selected:""},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),t[6]||(t[6]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))]),e("div",R,[t[9]||(t[9]=e("h2",{class:"header"},"afterChange",-1)),t[10]||(t[10]=e("p",null,"afterChange will trigger a callback after the value of the select dropdown has changed.",-1)),n.afterChangeSingle?(a(),o("div",H,[e("strong",null,"After change: "+h(n.afterChangeSingle),1)])):m("",!0),e("select",I,[...t[7]||(t[7]=[e("option",{"data-placeholder":"true"},"Select Option",-1),e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),t[11]||(t[11]=e("br",null,null,-1)),n.afterChangeMultiple?(a(),o("div",U,[e("strong",null,"After change: "+h(n.afterChangeMultiple),1)])):m("",!0),e("select",J,[...t[8]||(t[8]=[e("option",{value:"value1",selected:""},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),t[12]||(t[12]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          events: {
            afterChange: (newVal) => {
              console.log(newVal)
            }
          }
        })
      `),l(`
    `)],-1))])],64)}const Y=v(j,[["render",z]]),q=g({name:"BeForeAfterOpenClose",data(){return{beforeAfterOpenCloseSingle:null,singleState:"",beforeAfterOpenCloseMultiple:null,multipleState:""}},mounted(){this.beforeAfterOpenCloseSingle=new r({select:this.$refs.beforeAfterOpenCloseSingle,events:{beforeOpen:()=>{console.log("before open"),this.setState("single","beforeOpen")},afterOpen:()=>{console.log("after open"),this.setState("single","afterOpen")},beforeClose:()=>{console.log("before close"),this.setState("single","beforeClose")},afterClose:()=>{console.log("after close"),this.setState("single","afterClose")}}}),this.beforeAfterOpenCloseMultiple=new r({select:this.$refs.beforeAfterOpenCloseMultiple,events:{beforeOpen:()=>{console.log("before open"),this.setState("multiple","beforeOpen")},afterOpen:()=>{console.log("after open"),this.setState("multiple","afterOpen")},beforeClose:()=>{console.log("before close"),this.setState("multiple","beforeClose")},afterClose:()=>{console.log("after close"),this.setState("multiple","afterClose")}}})},methods:{setState(n,t){n==="single"?this.singleState=t:this.multipleState=t,setTimeout(()=>{n==="single"?this.singleState="":this.multipleState=""},1e3)}}}),G={id:"open",class:"content"},K={class:"row"},Q={ref:"beforeAfterOpenCloseSingle"},W={ref:"beforeAfterOpenCloseMultiple",multiple:""};function X(n,t,p,i,s,c){return a(),o("div",G,[t[2]||(t[2]=e("h2",{class:"header"},"beforeOpen / afterOpen / beforeClose / afterClose",-1)),t[3]||(t[3]=e("p",null," The beforeOpen, afterOpen, beforeClose, and afterClose events will fire before and after the select is opened and closed. ",-1)),e("div",K,[e("div",null,[e("div",null,"State: "+h(n.singleState),1),e("select",Q,[...t[0]||(t[0]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512)]),e("div",null,[e("div",null,"State: "+h(n.multipleState),1),e("select",W,[...t[1]||(t[1]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512)])]),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const Z=v(q,[["render",X]]),ee=g({name:"SearchEvent",mounted(){new r({select:this.$refs.searchSingle,settings:{placeholderText:"Search First Name",searchingText:"Searching Users...",searchHighlight:!0,allowDeselect:!0},events:{search:this.searchPromise}}),new r({select:this.$refs.searchMultiple,settings:{closeOnSelect:!1,placeholderText:"Search First Name",searchingText:"Searching Users...",searchHighlight:!0,allowDeselect:!0},events:{search:this.searchPromise}})},methods:{searchPromise(n,t){return new Promise((p,i)=>{if(n.length<2)return i("Search must be at least 2 characters");fetch("https://api.gofakeit.com/statics/users",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({first_name:n})}).then(s=>s.json()).then(s=>{if(!s||s.length===0)return i("No results found");const c=s.filter(u=>!t.some(b=>b instanceof V&&b.value===`${u.first_name} ${u.last_name}`)).map(u=>({text:`${u.first_name} ${u.last_name}`,value:`${u.first_name} ${u.last_name}`}));p([{label:"Results",selectAll:!0,options:c}])}).catch(s=>{i("Error fetching results")})})}}}),te={id:"search",class:"content"},ne={class:"row"},le={ref:"searchSingle"},se={ref:"searchMultiple",multiple:""};function re(n,t,p,i,s,c){return a(),o("div",te,[t[0]||(t[0]=e("h2",{class:"header"},"search",-1)),t[1]||(t[1]=e("p",null,[l(" Slim select allows you to syncronize result values from your promise response."),e("br"),l(" Call callback() method with slimselect data, false or string with specific string. ")],-1)),e("div",ne,[e("select",le,null,512),e("select",se,null,512)]),t[2]||(t[2]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          settings: {
            placeholderText: 'Search First',
            searchingText: 'Searching Users...',
            searchHighlight: true,
            allowDeselect: true
          },
          events: {
            search: (search, currentData) => {
              return new Promise((resolve, reject) => {
                if (search.length < 2) {
                  return reject('Search must be at least 2 characters')
                }

                // Fetch users from gofakeit API based on search term
                fetch('https://api.gofakeit.com/statics/users', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    first_name: search
                  })
                })
                  .then((response) => response.json())
                  .then((data) => {
                    if (!data || data.length === 0) {
                      return reject('No results found')
                    }

                    // Take the results and create an array of options 
                    // excluding any that are already selected in currentData
                    const options = data
                      .filter((person) => {
                        return !currentData.some((dataItem) => {
                          // check if option has a value property
                          return dataItem instanceof Option && 
                                 dataItem.value === \`\${person.first_name} \${person.last_name}\`
                        })
                      })
                      .map((person) => {
                        return {
                          text: \`\${person.first_name} \${person.last_name}\`,
                          value: \`\${person.first_name} \${person.last_name}\`
                        }
                      })

                    resolve([{ label: 'Results', selectAll: true, options: options }])
                  })
                  .catch((error) => {
                    reject('Error fetching results')
                  })
              })
            }
          }
        })
      `),l(`
    `)],-1))])}const oe=v(ee,[["render",re]]),ae=g({name:"SearchFilter",mounted(){new r({select:this.$refs.searchFilterSingle,settings:{searchHighlight:!0},events:{searchFilter:(n,t)=>n.text.toLowerCase().includes(t.toLowerCase())}}),new r({select:this.$refs.searchFilterMultiple,data:[{label:"Fruits",options:[{text:"Apple",value:"apple"},{text:"Banana",value:"banana"},{text:"Orange",value:"orange"}]},{label:"Vegetables",options:[{text:"Carrot",value:"carrot"},{text:"Potato",value:"potato"},{text:"Tomato",value:"tomato"}]},{label:"Meats",options:[{text:"Beef",value:"beef"},{text:"Chicken",value:"chicken"},{text:"Pork",value:"pork"}]},{label:"Seafood",options:[{text:"Crab",value:"crab"},{text:"Lobster",value:"lobster"},{text:"Shrimp",value:"shrimp"}]}],settings:{searchHighlight:!0},events:{searchFilter:(n,t)=>n.text.toLowerCase().includes(t.toLowerCase())}})}}),ie={id:"searchFilter",class:"content"},ue={class:"row"},pe={ref:"searchFilterSingle"},ce={ref:"searchFilterMultiple"};function fe(n,t,p,i,s,c){return a(),o("div",ie,[t[2]||(t[2]=e("h2",{class:"header"},"searchFilter",-1)),t[3]||(t[3]=e("p",null,"searchFilter event is used to replace the default matching algorithm.",-1)),t[4]||(t[4]=e("p",null,[l("See Data for the proper object interface of "),e("em",null,"option"),l(".")],-1)),e("div",ue,[e("select",pe,[...t[0]||(t[0]=[e("option",{value:"apple"},"Apple",-1),e("option",{value:"orange"},"Orange",-1),e("option",{value:"pineapple"},"Pineapple",-1)])],512),e("select",ce,[...t[1]||(t[1]=[e("option",{value:"apple"},"Apple",-1),e("option",{value:"orange"},"Orange",-1),e("option",{value:"pineapple"},"Pineapple",-1)])],512)]),t[5]||(t[5]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const de=v(ae,[["render",fe]]),he=g({name:"Addable",mounted(){new r({select:this.$refs.addableSingle,events:{addable:n=>n.toLowerCase()==="value"?new Error("You cant set that value"):{text:n,value:n.toLowerCase()}}}),new r({select:this.$refs.addableMultiple,events:{addable:n=>new Promise(t=>{setTimeout(()=>{t({text:n,value:n})},100)})}})}}),ge={id:"addable",class:"content"},ve={class:"row"},me={ref:"addableSingle"},be={ref:"addableMultiple",multiple:""};function Se(n,t,p,i,s,c){return a(),o("div",ge,[t[2]||(t[2]=e("h2",{class:"header"},"addable",-1)),t[3]||(t[3]=e("p",null,"Slim select has the ability to dynamically add options via the search input field",-1)),t[4]||(t[4]=e("p",null," addable is a callback which takes a function parameter. The return value can either be a string or an option object. ",-1)),e("div",ve,[e("select",me,[...t[0]||(t[0]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),e("select",be,[...t[1]||(t[1]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512)]),t[5]||(t[5]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',

          events: {
            // Allow anything
            addable: function (value) { return value },

            // or 

            // Decide what is allowed to be added
            addable: function (value) {
              // return false or null if you do not want to allow value to be submitted
              if (value === 'bad') { return false }

              // return new 

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
    `)],-1))])}const $e=v(he,[["render",Se]]),Ce=g({name:"Events",components:{AdSense:A,Error:T,BeforeAfterChange:Y,BeforeAfterOpenClose:Z,Search:oe,SearchFilter:de,Addable:$e}}),we={id:"events",class:"contents"};function Oe(n,t,p,i,s,c){const u=d("Error"),b=d("BeforeAfterChange"),S=d("AdSense"),$=d("BeforeAfterOpenClose"),C=d("Search"),w=d("SearchFilter"),O=d("Addable");return a(),o("div",we,[f(u),f(b),f(S),f($),f(C),f(S),f(w),f(O)])}const Ve=v(Ce,[["render",Oe]]);export{Ve as default};
