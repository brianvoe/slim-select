import{d as g,S as s,_ as v,c as l,a as t,i as m,f as o,t as h,o as a,F as O,O as x,A,e as d,r as f}from"./index.js";const V=g({name:"Error",data(){return{errorSingle:null,errMsg:""}},mounted(){this.errorSingle=new s({select:this.$refs.errorSingle,events:{error:n=>{this.errMsg=n.message}}})}}),_={id:"error",class:"content"},T={key:0},k={class:"row"},M={ref:"notError"};function F(n,e,p,i,r,c){return a(),l("div",_,[e[2]||(e[2]=t("h2",{class:"header"},"error",-1)),e[3]||(e[3]=t("p",null," The error event provides a centralized way to handle any errors that occur within SlimSelect. This includes initialization errors, API call failures, validation errors, or any other unexpected issues that might arise during the component's lifecycle. ",-1)),e[4]||(e[4]=t("p",null," By implementing an error handler, you can provide better user feedback, log errors for debugging, or implement fallback behavior when something goes wrong. The error object contains detailed information about what went wrong and where it occurred. ",-1)),e[5]||(e[5]=t("div",{class:"alert info"}," If you are are having issues with slim select finding the select element. Try delaying new SlimSelect() call as the select dom element might not be available yet. ",-1)),n.errMsg!==""?(a(),l("div",T,[e[0]||(e[0]=t("b",null,"Error:",-1)),o(" "+h(n.errMsg),1)])):m("",!0),t("div",k,[t("select",M,[...e[1]||(e[1]=[t("option",{value:"1"},"Option 1",-1),t("option",{value:"2"},"Option 2",-1),t("option",{value:"3"},"Option 3",-1)])],512)]),e[6]||(e[6]=t("pre",null,[o("      "),t("code",{class:"language-javascript"},`
        var select = new SlimSelect({
          select: '#selectElement',
          events: {
            error: function(err) {
              console.error(err)
            }
          }
        })
      `),o(`
    `)],-1))])}const E=v(V,[["render",F]]),P=g({name:"BeforeAfterChange",data(){return{beforeChangeSingle:[],beforeChangeMultiple:[],afterChangeSingle:[],afterChangeMultiple:[]}},mounted(){new s({select:this.$refs.beforeChangeSingle,settings:{allowDeselect:!0},events:{beforeChange:(n,e)=>(this.beforeChangeSingle=e,!0)}}),new s({select:this.$refs.beforeChangeMultiple,events:{beforeChange:(n,e)=>(this.beforeChangeMultiple=e,!0)}}),new s({select:this.$refs.afterChangeSingle,settings:{allowDeselect:!0},events:{afterChange:n=>{this.afterChangeSingle=n}}}),new s({select:this.$refs.afterChangeMultiple,events:{afterChange:n=>{this.afterChangeMultiple=n}}})}}),B={id:"beforeChange",class:"content"},j={key:0},D={ref:"beforeChangeSingle"},L={key:1},N={ref:"beforeChangeMultiple",multiple:""},I={id:"afterChange",class:"content"},R={key:0},U={ref:"afterChangeSingle"},z={key:1},H={ref:"afterChangeMultiple",multiple:""};function Y(n,e,p,i,r,c){return a(),l(O,null,[t("div",B,[e[2]||(e[2]=t("h2",{class:"header"},"beforeChange",-1)),e[3]||(e[3]=t("p",null," The beforeChange event allows you to intercept and validate changes before they are applied to the select element. This powerful feature enables you to implement custom validation logic, confirmation dialogs, or conditional logic that can prevent unwanted selections. ",-1)),e[4]||(e[4]=t("p",null," Your callback function receives both the new value and the old value, allowing you to make informed decisions about whether to allow the change. Return false to prevent the change, or return true (or nothing) to allow it to proceed. ",-1)),e[5]||(e[5]=t("div",{class:"alert info"}," Be sure to return true to allow for the change to happen. False or nothing to cancel change. ",-1)),n.beforeChangeSingle?(a(),l("div",j,[t("strong",null,"Before change: "+h(n.beforeChangeSingle),1)])):m("",!0),t("select",D,[...e[0]||(e[0]=[t("option",{"data-placeholder":"true"},"Select Option",-1),t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512),e[6]||(e[6]=t("br",null,null,-1)),n.beforeChangeMultiple?(a(),l("div",L,[t("strong",null,"Before change: "+h(n.beforeChangeMultiple),1)])):m("",!0),t("select",N,[...e[1]||(e[1]=[t("option",{value:"value1",selected:""},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512),e[7]||(e[7]=t("pre",null,[o("      "),t("code",{class:"language-javascript"},`
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
    `)],-1))]),t("div",I,[e[10]||(e[10]=t("h2",{class:"header"},"afterChange",-1)),e[11]||(e[11]=t("p",null," The afterChange event fires after a selection has been made and provides you with the new selected value. This is the perfect place to trigger side effects like updating other UI elements, making API calls, or performing any actions that should happen when the selection changes. ",-1)),e[12]||(e[12]=t("p",null," Unlike beforeChange, this event cannot prevent the change from happening - it's purely for responding to completed changes and updating your application state accordingly. ",-1)),n.afterChangeSingle?(a(),l("div",R,[t("strong",null,"After change: "+h(n.afterChangeSingle),1)])):m("",!0),t("select",U,[...e[8]||(e[8]=[t("option",{"data-placeholder":"true"},"Select Option",-1),t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512),e[13]||(e[13]=t("br",null,null,-1)),n.afterChangeMultiple?(a(),l("div",z,[t("strong",null,"After change: "+h(n.afterChangeMultiple),1)])):m("",!0),t("select",H,[...e[9]||(e[9]=[t("option",{value:"value1",selected:""},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512),e[14]||(e[14]=t("pre",null,[o("      "),t("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          events: {
            afterChange: (newVal) => {
              console.log(newVal)
            }
          }
        })
      `),o(`
    `)],-1))])],64)}const J=v(P,[["render",Y]]),q=g({name:"BeForeAfterOpenClose",data(){return{beforeAfterOpenCloseSingle:null,singleState:"",beforeAfterOpenCloseMultiple:null,multipleState:""}},mounted(){this.beforeAfterOpenCloseSingle=new s({select:this.$refs.beforeAfterOpenCloseSingle,events:{beforeOpen:()=>{console.log("before open"),this.setState("single","beforeOpen")},afterOpen:()=>{console.log("after open"),this.setState("single","afterOpen")},beforeClose:()=>{console.log("before close"),this.setState("single","beforeClose")},afterClose:()=>{console.log("after close"),this.setState("single","afterClose")}}}),this.beforeAfterOpenCloseMultiple=new s({select:this.$refs.beforeAfterOpenCloseMultiple,events:{beforeOpen:()=>{console.log("before open"),this.setState("multiple","beforeOpen")},afterOpen:()=>{console.log("after open"),this.setState("multiple","afterOpen")},beforeClose:()=>{console.log("before close"),this.setState("multiple","beforeClose")},afterClose:()=>{console.log("after close"),this.setState("multiple","afterClose")}}})},methods:{setState(n,e){n==="single"?this.singleState=e:this.multipleState=e,setTimeout(()=>{n==="single"?this.singleState="":this.multipleState=""},1e3)}}}),W={id:"open",class:"content"},G={class:"row"},K={ref:"beforeAfterOpenCloseSingle"},Q={ref:"beforeAfterOpenCloseMultiple",multiple:""};function X(n,e,p,i,r,c){return a(),l("div",W,[e[2]||(e[2]=t("h2",{class:"header"},"beforeOpen / afterOpen / beforeClose / afterClose",-1)),e[3]||(e[3]=t("p",null," These events provide fine-grained control over the dropdown's open and close lifecycle. The beforeOpen and afterOpen events fire when the dropdown is being opened, while beforeClose and afterClose fire when it's being closed. ",-1)),e[4]||(e[4]=t("p",null," These events are perfect for implementing custom animations, loading states, analytics tracking, or any UI behavior that needs to respond to the dropdown's visibility changes. You can use them to show/hide other elements, trigger animations, or perform cleanup operations. ",-1)),t("div",G,[t("div",null,[t("div",null,"State: "+h(n.singleState),1),t("select",K,[...e[0]||(e[0]=[t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512)]),t("div",null,[t("div",null,"State: "+h(n.multipleState),1),t("select",Q,[...e[1]||(e[1]=[t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512)])]),e[5]||(e[5]=t("pre",null,[o("      "),t("code",{class:"language-javascript"},`
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
    `)],-1))])}const Z=v(q,[["render",X]]),ee=g({name:"SearchEvent",mounted(){new s({select:this.$refs.searchSingle,settings:{placeholderText:"Search First Name",searchingText:"Searching Users...",searchHighlight:!0,allowDeselect:!0},events:{search:this.searchPromise}}),new s({select:this.$refs.searchMultiple,settings:{closeOnSelect:!1,placeholderText:"Search First Name",searchingText:"Searching Users...",searchHighlight:!0,allowDeselect:!0},events:{search:this.searchPromise}})},methods:{searchPromise(n,e){return new Promise((p,i)=>{if(n.length<2)return i("Search must be at least 2 characters");fetch("https://api.gofakeit.com/statics/users",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({first_name:n})}).then(r=>r.json()).then(r=>{if(!r||r.length===0)return i("No results found");const c=r.filter(u=>!e.some(b=>b instanceof x&&b.value===`${u.first_name} ${u.last_name}`)).map(u=>({text:`${u.first_name} ${u.last_name}`,value:`${u.first_name} ${u.last_name}`}));p([{label:"Results",selectAll:!0,options:c}])}).catch(r=>{i("Error fetching results")})})}}}),te={id:"search",class:"content"},ne={class:"row"},oe={ref:"searchSingle"},re={ref:"searchMultiple",multiple:""};function se(n,e,p,i,r,c){return a(),l("div",te,[e[0]||(e[0]=t("h2",{class:"header"},"search",-1)),e[1]||(e[1]=t("p",null," The search event enables dynamic data loading from external APIs or data sources. This powerful feature allows you to fetch results asynchronously based on user input, making it perfect for autocomplete functionality, user search, or any scenario where you need to load data on demand. ",-1)),e[2]||(e[2]=t("p",null," When a user types in the search field, your callback function receives the search term and current data. You can return a Promise that resolves with new options, reject with an error message, or return false to prevent the search. ",-1)),t("div",ne,[t("select",oe,null,512),t("select",re,null,512)]),e[3]||(e[3]=t("pre",null,[o("      "),t("code",{class:"language-javascript"},`
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
      `),o(`
    `)],-1))])}const le=v(ee,[["render",se]]),ae=g({name:"SearchFilter",mounted(){new s({select:this.$refs.searchFilterSingle,settings:{searchHighlight:!0},events:{searchFilter:(n,e)=>n.text.toLowerCase().includes(e.toLowerCase())}}),new s({select:this.$refs.searchFilterMultiple,data:[{label:"Fruits",options:[{text:"Apple",value:"apple"},{text:"Banana",value:"banana"},{text:"Orange",value:"orange"}]},{label:"Vegetables",options:[{text:"Carrot",value:"carrot"},{text:"Potato",value:"potato"},{text:"Tomato",value:"tomato"}]},{label:"Meats",options:[{text:"Beef",value:"beef"},{text:"Chicken",value:"chicken"},{text:"Pork",value:"pork"}]},{label:"Seafood",options:[{text:"Crab",value:"crab"},{text:"Lobster",value:"lobster"},{text:"Shrimp",value:"shrimp"}]}],settings:{searchHighlight:!0},events:{searchFilter:(n,e)=>n.text.toLowerCase().includes(e.toLowerCase())}})}}),ie={id:"searchFilter",class:"content"},ue={class:"row"},pe={ref:"searchFilterSingle"},ce={ref:"searchFilterMultiple"};function de(n,e,p,i,r,c){return a(),l("div",ie,[e[2]||(e[2]=t("h2",{class:"header"},"searchFilter",-1)),e[3]||(e[3]=t("p",null," The searchFilter event allows you to customize how SlimSelect filters through existing options when users search. By default, SlimSelect uses a case-insensitive substring match, but you can override this behavior to implement custom filtering logic. ",-1)),e[4]||(e[4]=t("p",null," This is perfect for implementing advanced search features like fuzzy matching, exact phrase matching, or custom business logic for filtering options based on your specific requirements. ",-1)),t("div",ue,[t("select",pe,[...e[0]||(e[0]=[t("option",{value:"apple"},"Apple",-1),t("option",{value:"orange"},"Orange",-1),t("option",{value:"pineapple"},"Pineapple",-1)])],512),t("select",ce,[...e[1]||(e[1]=[t("option",{value:"apple"},"Apple",-1),t("option",{value:"orange"},"Orange",-1),t("option",{value:"pineapple"},"Pineapple",-1)])],512)]),e[5]||(e[5]=t("pre",null,[o("      "),t("code",{class:"language-javascript"},`
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
    `)],-1))])}const fe=v(ae,[["render",de]]),he=g({name:"Addable",mounted(){new s({select:this.$refs.addableSingle,events:{addable:n=>n.toLowerCase()==="value"?new Error("You cant set that value"):{text:n,value:n.toLowerCase()}}}),new s({select:this.$refs.addableMultiple,events:{addable:n=>new Promise(e=>{setTimeout(()=>{e({text:n,value:n})},100)})}})}}),ge={id:"addable",class:"content"},ve={class:"row"},me={ref:"addableSingle"},be={ref:"addableMultiple",multiple:""};function we(n,e,p,i,r,c){return a(),l("div",ge,[e[2]||(e[2]=t("h2",{class:"header"},"addable",-1)),e[3]||(e[3]=t("p",null," The addable event enables users to create new options on-the-fly by typing in the search field. This powerful feature transforms SlimSelect into a dynamic, user-driven component that can grow and adapt based on user input. ",-1)),e[4]||(e[4]=t("p",null," Perfect for scenarios like tag creation, user-defined categories, or any situation where you want to allow users to add new options that don't already exist. You can implement validation, formatting, or even async operations to create the new option. ",-1)),t("div",ve,[t("select",me,[...e[0]||(e[0]=[t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512),t("select",be,[...e[1]||(e[1]=[t("option",{value:"value1"},"Value 1",-1),t("option",{value:"value2"},"Value 2",-1),t("option",{value:"value3"},"Value 3",-1)])],512)]),e[5]||(e[5]=t("pre",null,[o("      "),t("code",{class:"language-javascript"},`
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
      `),o(`
    `)],-1))])}const Se=v(he,[["render",we]]),$e=g({name:"Events",components:{AdSlot:A,Error:E,BeforeAfterChange:J,BeforeAfterOpenClose:Z,Search:le,SearchFilter:fe,Addable:Se}}),Ce={id:"events",class:"contents"};function ye(n,e,p,i,r,c){const u=f("Error"),b=f("BeforeAfterChange"),w=f("AdSlot"),S=f("BeforeAfterOpenClose"),$=f("Search"),C=f("SearchFilter"),y=f("Addable");return a(),l("div",Ce,[d(u),d(b),d(w,{"ad-slot":"1270131515"}),d(S),d($),d(w,{"ad-slot":"1270131515"}),d(C),d(y)])}const xe=v($e,[["render",ye]]);export{xe as default};
