import{d as g,f as v,S as a,_ as m,c as i,a as t,i as S,e as l,g as O,t as h,w as f,r as s,o as u,F as k,O as x,A}from"./index.js";const V=g({name:"Error",data(){return{errorSingle:null,errMsg:""}},mounted(){this.errorSingle=new a({select:this.$refs.errorSingle,events:{error:n=>{this.errMsg=n.message}}})},components:{ShikiStyle:v}}),T={id:"error",class:"content"},M={key:0},F={style:{color:"red"}},E={class:"row"},P={ref:"notError"};function B(n,e,c,p,r,d){const o=s("ShikiStyle");return u(),i("div",T,[e[4]||(e[4]=t("h2",{class:"header"},"error",-1)),e[5]||(e[5]=t("p",null," The error event provides a centralized way to handle any errors that occur within SlimSelect. This includes initialization errors, API call failures, validation errors, or any other unexpected issues that might arise during the component's lifecycle. ",-1)),e[6]||(e[6]=t("p",null," By implementing an error handler, you can provide better user feedback, log errors for debugging, or implement fallback behavior when something goes wrong. The error object contains detailed information about what went wrong and where it occurred. ",-1)),e[7]||(e[7]=t("div",{class:"alert info"}," If you are are having issues with slim select finding the select element. Try delaying new SlimSelect() call as the select dom element might not be available yet. ",-1)),n.errMsg!==""?(u(),i("div",M,[e[0]||(e[0]=t("b",null,"Error:",-1)),e[1]||(e[1]=O()),t("span",F,h(n.errMsg),1)])):S("",!0),t("div",E,[t("select",P,[...e[2]||(e[2]=[t("option",{value:"1"},"Option 1",-1),t("option",{value:"2"},"Option 2",-1),t("option",{value:"3"},"Option 3",-1)])],512)]),l(o,{language:"javascript"},{default:f(()=>[...e[3]||(e[3]=[t("pre",null,`        var select = new SlimSelect({
          select: '#selectElement',
          events: {
            error: function(err) {
              console.error(err)
            }
          }
        })
      `,-1)])]),_:1})])}const j=m(V,[["render",B]]),D=g({name:"BeforeAfterChange",data(){return{beforeChangeSingle:[],beforeChangeMultiple:[],afterChangeSingle:[],afterChangeMultiple:[]}},mounted(){new a({select:this.$refs.beforeChangeSingle,settings:{allowDeselect:!0},events:{beforeChange:(n,e)=>(this.beforeChangeSingle=e,!0)}}),new a({select:this.$refs.beforeChangeMultiple,events:{beforeChange:(n,e)=>(this.beforeChangeMultiple=e,!0)}}),new a({select:this.$refs.afterChangeSingle,settings:{allowDeselect:!0},events:{afterChange:n=>{this.afterChangeSingle=n}}}),new a({select:this.$refs.afterChangeMultiple,events:{afterChange:n=>{this.afterChangeMultiple=n}}})},components:{ShikiStyle:v}}),L={id:"beforeChange",class:"content"},N={key:0},I={ref:"beforeChangeSingle"},R={key:1},U={ref:"beforeChangeMultiple",multiple:""},z={id:"afterChange",class:"content"},H={key:0},Y={ref:"afterChangeSingle"},J={key:1},q={ref:"afterChangeMultiple",multiple:""};function W(n,e,c,p,r,d){const o=s("ShikiStyle");return u(),i(k,null,[t("div",L,[e[3]||(e[3]=t("h2",{class:"header"},"beforeChange",-1)),e[4]||(e[4]=t("p",null," The beforeChange event allows you to intercept and validate changes before they are applied to the select element. This powerful feature enables you to implement custom validation logic, confirmation dialogs, or conditional logic that can prevent unwanted selections. ",-1)),e[5]||(e[5]=t("p",null," Your callback function receives both the new value and the old value, allowing you to make informed decisions about whether to allow the change. Return false to prevent the change, or return true (or nothing) to allow it to proceed. ",-1)),e[6]||(e[6]=t("div",{class:"alert info"}," Be sure to return true to allow for the change to happen. False or nothing to cancel change. ",-1)),n.beforeChangeSingle?(u(),i("div",N,[t("strong",null,"Before change: "+h(n.beforeChangeSingle),1)])):S("",!0),t("select",I,[...e[0]||(e[0]=[t("option",{"data-placeholder":"true"},"Select Option",-1),t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512),e[7]||(e[7]=t("br",null,null,-1)),n.beforeChangeMultiple?(u(),i("div",R,[t("strong",null,"Before change: "+h(n.beforeChangeMultiple),1)])):S("",!0),t("select",U,[...e[1]||(e[1]=[t("option",{value:"value1",selected:""},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512),l(o,{language:"javascript"},{default:f(()=>[...e[2]||(e[2]=[t("pre",null,`        new SlimSelect({
          select: '#selectElement',
          events: {
            beforeChange: (newVal, oldVal) => {
              console.log(newVal)
              return false // this will stop the change from happening
            }
          }
        })
      `,-1)])]),_:1})]),t("div",z,[e[11]||(e[11]=t("h2",{class:"header"},"afterChange",-1)),e[12]||(e[12]=t("p",null," The afterChange event fires after a selection has been made and provides you with the new selected value. This is the perfect place to trigger side effects like updating other UI elements, making API calls, or performing any actions that should happen when the selection changes. ",-1)),e[13]||(e[13]=t("p",null," Unlike beforeChange, this event cannot prevent the change from happening - it's purely for responding to completed changes and updating your application state accordingly. ",-1)),n.afterChangeSingle?(u(),i("div",H,[t("strong",null,"After change: "+h(n.afterChangeSingle),1)])):S("",!0),t("select",Y,[...e[8]||(e[8]=[t("option",{"data-placeholder":"true"},"Select Option",-1),t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512),e[14]||(e[14]=t("br",null,null,-1)),n.afterChangeMultiple?(u(),i("div",J,[t("strong",null,"After change: "+h(n.afterChangeMultiple),1)])):S("",!0),t("select",q,[...e[9]||(e[9]=[t("option",{value:"value1",selected:""},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512),l(o,{language:"javascript"},{default:f(()=>[...e[10]||(e[10]=[t("pre",null,`        new SlimSelect({
          select: '#selectElement',
          events: {
            afterChange: (newVal) => {
              console.log(newVal)
            }
          }
        })
      `,-1)])]),_:1})])],64)}const G=m(D,[["render",W]]),K=g({name:"BeForeAfterOpenClose",data(){return{beforeAfterOpenCloseSingle:null,singleState:"",beforeAfterOpenCloseMultiple:null,multipleState:""}},mounted(){this.beforeAfterOpenCloseSingle=new a({select:this.$refs.beforeAfterOpenCloseSingle,events:{beforeOpen:()=>{console.log("before open"),this.setState("single","beforeOpen")},afterOpen:()=>{console.log("after open"),this.setState("single","afterOpen")},beforeClose:()=>{console.log("before close"),this.setState("single","beforeClose")},afterClose:()=>{console.log("after close"),this.setState("single","afterClose")}}}),this.beforeAfterOpenCloseMultiple=new a({select:this.$refs.beforeAfterOpenCloseMultiple,events:{beforeOpen:()=>{console.log("before open"),this.setState("multiple","beforeOpen")},afterOpen:()=>{console.log("after open"),this.setState("multiple","afterOpen")},beforeClose:()=>{console.log("before close"),this.setState("multiple","beforeClose")},afterClose:()=>{console.log("after close"),this.setState("multiple","afterClose")}}})},methods:{setState(n,e){n==="single"?this.singleState=e:this.multipleState=e,setTimeout(()=>{n==="single"?this.singleState="":this.multipleState=""},1e3)}},components:{ShikiStyle:v}}),Q={id:"open",class:"content"},X={class:"row"},Z={ref:"beforeAfterOpenCloseSingle"},ee={ref:"beforeAfterOpenCloseMultiple",multiple:""};function te(n,e,c,p,r,d){const o=s("ShikiStyle");return u(),i("div",Q,[e[3]||(e[3]=t("h2",{class:"header"},"beforeOpen / afterOpen / beforeClose / afterClose",-1)),e[4]||(e[4]=t("p",null," These events provide fine-grained control over the dropdown's open and close lifecycle. The beforeOpen and afterOpen events fire when the dropdown is being opened, while beforeClose and afterClose fire when it's being closed. ",-1)),e[5]||(e[5]=t("p",null," These events are perfect for implementing custom animations, loading states, analytics tracking, or any UI behavior that needs to respond to the dropdown's visibility changes. You can use them to show/hide other elements, trigger animations, or perform cleanup operations. ",-1)),t("div",X,[t("div",null,[t("div",null,"State: "+h(n.singleState),1),t("select",Z,[...e[0]||(e[0]=[t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512)]),t("div",null,[t("div",null,"State: "+h(n.multipleState),1),t("select",ee,[...e[1]||(e[1]=[t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512)])]),l(o,{language:"javascript"},{default:f(()=>[...e[2]||(e[2]=[t("pre",null,`        var select = new SlimSelect({
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
      `,-1)])]),_:1})])}const ne=m(K,[["render",te]]),oe=g({name:"SearchEvent",mounted(){new a({select:this.$refs.searchSingle,settings:{placeholderText:"Search First Name",searchingText:"Searching Users...",searchHighlight:!0,allowDeselect:!0},events:{search:this.searchPromise}}),new a({select:this.$refs.searchMultiple,settings:{closeOnSelect:!1,placeholderText:"Search First Name",searchingText:"Searching Users...",searchHighlight:!0,allowDeselect:!0},events:{search:this.searchPromise}})},methods:{searchPromise(n,e){return new Promise((c,p)=>{if(n.length<2)return p("Search must be at least 2 characters");fetch("https://api.gofakeit.com/statics/users",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({first_name:n})}).then(r=>r.json()).then(r=>{if(!r||r.length===0)return p("No results found");const d=r.filter(o=>!e.some(b=>b instanceof x&&b.value===`${o.first_name} ${o.last_name}`)).map(o=>({text:`${o.first_name} ${o.last_name}`,value:`${o.first_name} ${o.last_name}`}));c([{label:"Results",selectAll:!0,options:d}])}).catch(r=>{p("Error fetching results")})})}},components:{ShikiStyle:v}}),le={id:"search",class:"content"},re={class:"row"},se={ref:"searchSingle"},ae={ref:"searchMultiple",multiple:""};function ie(n,e,c,p,r,d){const o=s("ShikiStyle");return u(),i("div",le,[e[1]||(e[1]=t("h2",{class:"header"},"search",-1)),e[2]||(e[2]=t("p",null," The search event enables dynamic data loading from external APIs or data sources. This powerful feature allows you to fetch results asynchronously based on user input, making it perfect for autocomplete functionality, user search, or any scenario where you need to load data on demand. ",-1)),e[3]||(e[3]=t("p",null," When a user types in the search field, your callback function receives the search term and current data. You can return a Promise that resolves with new options, reject with an error message, or return false to prevent the search. ",-1)),t("div",re,[t("select",se,null,512),t("select",ae,null,512)]),l(o,{language:"javascript"},{default:f(()=>[...e[0]||(e[0]=[t("pre",null,`        new SlimSelect({
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
      `,-1)])]),_:1})])}const ue=m(oe,[["render",ie]]),pe=g({name:"SearchFilter",mounted(){new a({select:this.$refs.searchFilterSingle,settings:{searchHighlight:!0},events:{searchFilter:(n,e)=>n.text.toLowerCase().includes(e.toLowerCase())}}),new a({select:this.$refs.searchFilterMultiple,data:[{label:"Fruits",options:[{text:"Apple",value:"apple"},{text:"Banana",value:"banana"},{text:"Orange",value:"orange"}]},{label:"Vegetables",options:[{text:"Carrot",value:"carrot"},{text:"Potato",value:"potato"},{text:"Tomato",value:"tomato"}]},{label:"Meats",options:[{text:"Beef",value:"beef"},{text:"Chicken",value:"chicken"},{text:"Pork",value:"pork"}]},{label:"Seafood",options:[{text:"Crab",value:"crab"},{text:"Lobster",value:"lobster"},{text:"Shrimp",value:"shrimp"}]}],settings:{searchHighlight:!0},events:{searchFilter:(n,e)=>n.text.toLowerCase().includes(e.toLowerCase())}})},components:{ShikiStyle:v}}),ce={id:"searchFilter",class:"content"},de={class:"row"},he={ref:"searchFilterSingle"},fe={ref:"searchFilterMultiple"};function ge(n,e,c,p,r,d){const o=s("ShikiStyle");return u(),i("div",ce,[e[3]||(e[3]=t("h2",{class:"header"},"searchFilter",-1)),e[4]||(e[4]=t("p",null," The searchFilter event allows you to customize how SlimSelect filters through existing options when users search. By default, SlimSelect uses a case-insensitive substring match, but you can override this behavior to implement custom filtering logic. ",-1)),e[5]||(e[5]=t("p",null," This is perfect for implementing advanced search features like fuzzy matching, exact phrase matching, or custom business logic for filtering options based on your specific requirements. ",-1)),t("div",de,[t("select",he,[...e[0]||(e[0]=[t("option",{value:"apple"},"Apple",-1),t("option",{value:"orange"},"Orange",-1),t("option",{value:"pineapple"},"Pineapple",-1)])],512),t("select",fe,[...e[1]||(e[1]=[t("option",{value:"apple"},"Apple",-1),t("option",{value:"orange"},"Orange",-1),t("option",{value:"pineapple"},"Pineapple",-1)])],512)]),l(o,{language:"javascript"},{default:f(()=>[...e[2]||(e[2]=[t("pre",null,`        new SlimSelect({
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
      `,-1)])]),_:1})])}const ve=m(pe,[["render",ge]]),me=g({name:"Addable",mounted(){new a({select:this.$refs.addableSingle,events:{addable:n=>n.toLowerCase()==="value"?new Error("You cant set that value"):{text:n,value:n.toLowerCase()}}}),new a({select:this.$refs.addableMultiple,events:{addable:n=>new Promise(e=>{setTimeout(()=>{e({text:n,value:n})},100)})}})},components:{ShikiStyle:v}}),Se={id:"addable",class:"content"},be={class:"row"},we={ref:"addableSingle"},$e={ref:"addableMultiple",multiple:""};function Ce(n,e,c,p,r,d){const o=s("ShikiStyle");return u(),i("div",Se,[e[3]||(e[3]=t("h2",{class:"header"},"addable",-1)),e[4]||(e[4]=t("p",null," The addable event enables users to create new options on-the-fly by typing in the search field. This powerful feature transforms SlimSelect into a dynamic, user-driven component that can grow and adapt based on user input. ",-1)),e[5]||(e[5]=t("p",null," Perfect for scenarios like tag creation, user-defined categories, or any situation where you want to allow users to add new options that don't already exist. You can implement validation, formatting, or even async operations to create the new option. ",-1)),t("div",be,[t("select",we,[...e[0]||(e[0]=[t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512),t("select",$e,[...e[1]||(e[1]=[t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512)]),l(o,{language:"javascript"},{default:f(()=>[...e[2]||(e[2]=[t("pre",null,`        new SlimSelect({
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
      `,-1)])]),_:1})])}const ye=m(me,[["render",Ce]]),_e=g({name:"Events",components:{ShikiStyle:v,AdSlot:A,Error:j,BeforeAfterChange:G,BeforeAfterOpenClose:ne,Search:ue,SearchFilter:ve,Addable:ye}}),Oe={id:"events",class:"contents"};function ke(n,e,c,p,r,d){const o=s("Error"),b=s("BeforeAfterChange"),w=s("AdSlot"),$=s("BeforeAfterOpenClose"),C=s("Search"),y=s("SearchFilter"),_=s("Addable");return u(),i("div",Oe,[l(o),l(b),l(w,{"ad-slot":"1270131515"}),l($),l(C),l(w,{"ad-slot":"1270131515"}),l(y),l(_)])}const Ae=m(_e,[["render",ke]]);export{Ae as default};
