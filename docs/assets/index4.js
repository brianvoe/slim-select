import{d,S as r,_ as h,c as o,a as e,i as m,e as l,t as c,o as a,F as O,O as _,f as g,r as v}from"./index.js";const V=d({name:"Error",data(){return{errorSingle:null,errMsg:""}},mounted(){this.errorSingle=new r({select:this.$refs.errorSingle,events:{error:n=>{this.errMsg=n.message}}})}}),x={id:"error",class:"content"},y={key:0},A={class:"row"},M={ref:"notError"};function k(n,t,p,i,s,f){return a(),o("div",x,[t[2]||(t[2]=e("h2",{class:"header"},"error",-1)),t[3]||(t[3]=e("p",null,"The error event is fired when an error occurs. The error message is passed as the first argument.",-1)),t[4]||(t[4]=e("div",{class:"alert info"}," If you are are having issues with slim select finding the select element. Try delaying new SlimSelect() call as the select dom element might not be available yet. ",-1)),n.errMsg!==""?(a(),o("div",y,[t[0]||(t[0]=e("b",null,"Error:",-1)),l(" "+c(n.errMsg),1)])):m("",!0),e("div",A,[e("select",M,[...t[1]||(t[1]=[e("option",{value:"1"},"Option 1",-1),e("option",{value:"2"},"Option 2",-1),e("option",{value:"3"},"Option 3",-1)])],512)]),t[5]||(t[5]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        var select = new SlimSelect({
          select: '#selectElement',
          events: {
            error: function(err) {
              console.error(err)
            }
          }
        })
      `),l(`
    `)],-1))])}const F=h(V,[["render",k]]),E=d({name:"BeforeAfterChange",data(){return{beforeChangeSingle:[],beforeChangeMultiple:[],afterChangeSingle:[],afterChangeMultiple:[]}},mounted(){new r({select:this.$refs.beforeChangeSingle,settings:{allowDeselect:!0},events:{beforeChange:(n,t)=>(this.beforeChangeSingle=t,!0)}}),new r({select:this.$refs.beforeChangeMultiple,events:{beforeChange:(n,t)=>(this.beforeChangeMultiple=t,!0)}}),new r({select:this.$refs.afterChangeSingle,settings:{allowDeselect:!0},events:{afterChange:n=>{this.afterChangeSingle=n}}}),new r({select:this.$refs.afterChangeMultiple,events:{afterChange:n=>{this.afterChangeMultiple=n}}})}}),T={id:"beforeChange",class:"content"},j={key:0},B={ref:"beforeChangeSingle"},P={key:1},D={ref:"beforeChangeMultiple",multiple:""},L={id:"afterChange",class:"content"},N={key:0},R={ref:"afterChangeSingle"},H={key:1},I={ref:"afterChangeMultiple",multiple:""};function U(n,t,p,i,s,f){return a(),o(O,null,[e("div",T,[t[2]||(t[2]=e("h2",{class:"header"},"beforeChange",-1)),t[3]||(t[3]=e("p",null," beforeOnChange will trigger a callback on an option click and will allow you the ability to halt if the value it produces isnt to your liking. In order to stop the change from happening just return false on the callback. Returning nothing or true will allow it to continue as normal. ",-1)),t[4]||(t[4]=e("div",{class:"alert info"}," Be sure to return true to allow for the change to happen. False or nothing to cancel change. ",-1)),n.beforeChangeSingle?(a(),o("div",j,[e("strong",null,"Before change: "+c(n.beforeChangeSingle),1)])):m("",!0),e("select",B,[...t[0]||(t[0]=[e("option",{"data-placeholder":"true"},"Select Option",-1),e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),t[5]||(t[5]=e("br",null,null,-1)),n.beforeChangeMultiple?(a(),o("div",P,[e("strong",null,"Before change: "+c(n.beforeChangeMultiple),1)])):m("",!0),e("select",D,[...t[1]||(t[1]=[e("option",{value:"value1",selected:""},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),t[6]||(t[6]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))]),e("div",L,[t[9]||(t[9]=e("h2",{class:"header"},"afterChange",-1)),t[10]||(t[10]=e("p",null,"afterChange will trigger a callback after the value of the select dropdown has changed.",-1)),n.afterChangeSingle?(a(),o("div",N,[e("strong",null,"After change: "+c(n.afterChangeSingle),1)])):m("",!0),e("select",R,[...t[7]||(t[7]=[e("option",{"data-placeholder":"true"},"Select Option",-1),e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),t[11]||(t[11]=e("br",null,null,-1)),n.afterChangeMultiple?(a(),o("div",H,[e("strong",null,"After change: "+c(n.afterChangeMultiple),1)])):m("",!0),e("select",I,[...t[8]||(t[8]=[e("option",{value:"value1",selected:""},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),t[12]||(t[12]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
        new SlimSelect({
          select: '#selectElement',
          events: {
            afterChange: (newVal) => {
              console.log(newVal)
            }
          }
        })
      `),l(`
    `)],-1))])],64)}const J=h(E,[["render",U]]),z=d({name:"BeForeAfterOpenClose",data(){return{beforeAfterOpenCloseSingle:null,singleState:"",beforeAfterOpenCloseMultiple:null,multipleState:""}},mounted(){this.beforeAfterOpenCloseSingle=new r({select:this.$refs.beforeAfterOpenCloseSingle,events:{beforeOpen:()=>{console.log("before open"),this.setState("single","beforeOpen")},afterOpen:()=>{console.log("after open"),this.setState("single","afterOpen")},beforeClose:()=>{console.log("before close"),this.setState("single","beforeClose")},afterClose:()=>{console.log("after close"),this.setState("single","afterClose")}}}),this.beforeAfterOpenCloseMultiple=new r({select:this.$refs.beforeAfterOpenCloseMultiple,events:{beforeOpen:()=>{console.log("before open"),this.setState("multiple","beforeOpen")},afterOpen:()=>{console.log("after open"),this.setState("multiple","afterOpen")},beforeClose:()=>{console.log("before close"),this.setState("multiple","beforeClose")},afterClose:()=>{console.log("after close"),this.setState("multiple","afterClose")}}})},methods:{setState(n,t){n==="single"?this.singleState=t:this.multipleState=t,setTimeout(()=>{n==="single"?this.singleState="":this.multipleState=""},1e3)}}}),Y={id:"open",class:"content"},q={class:"row"},G={ref:"beforeAfterOpenCloseSingle"},K={ref:"beforeAfterOpenCloseMultiple",multiple:""};function Q(n,t,p,i,s,f){return a(),o("div",Y,[t[2]||(t[2]=e("h2",{class:"header"},"beforeOpen / afterOpen / beforeClose / afterClose",-1)),t[3]||(t[3]=e("p",null," The beforeOpen, afterOpen, beforeClose, and afterClose events will fire before and after the select is opened and closed. ",-1)),e("div",q,[e("div",null,[e("div",null,"State: "+c(n.singleState),1),e("select",G,[...t[0]||(t[0]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512)]),e("div",null,[e("div",null,"State: "+c(n.multipleState),1),e("select",K,[...t[1]||(t[1]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512)])]),t[4]||(t[4]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const W=h(z,[["render",Q]]),X=d({name:"SearchEvent",mounted(){new r({select:this.$refs.searchSingle,settings:{placeholderText:"Search First Name",searchingText:"Searching Users...",searchHighlight:!0,allowDeselect:!0},events:{search:this.searchPromise}}),new r({select:this.$refs.searchMultiple,settings:{closeOnSelect:!1,placeholderText:"Search First Name",searchingText:"Searching Users...",searchHighlight:!0,allowDeselect:!0},events:{search:this.searchPromise}})},methods:{searchPromise(n,t){return new Promise((p,i)=>{if(n.length<2)return i("Search must be at least 2 characters");fetch("https://api.gofakeit.com/statics/users",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({first_name:n})}).then(s=>s.json()).then(s=>{if(!s||s.length===0)return i("No results found");const f=s.filter(u=>!t.some(b=>b instanceof _&&b.value===`${u.first_name} ${u.last_name}`)).map(u=>({text:`${u.first_name} ${u.last_name}`,value:`${u.first_name} ${u.last_name}`}));p([{label:"Results",selectAll:!0,options:f}])}).catch(s=>{i("Error fetching results")})})}}}),Z={id:"search",class:"content"},ee={class:"row"},te={ref:"searchSingle"},ne={ref:"searchMultiple",multiple:""};function le(n,t,p,i,s,f){return a(),o("div",Z,[t[0]||(t[0]=e("h2",{class:"header"},"search",-1)),t[1]||(t[1]=e("p",null,[l(" Slim select allows you to syncronize result values from your promise response."),e("br"),l(" Call callback() method with slimselect data, false or string with specific string. ")],-1)),e("div",ee,[e("select",te,null,512),e("select",ne,null,512)]),t[2]||(t[2]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const se=h(X,[["render",le]]),re=d({name:"SearchFilter",mounted(){new r({select:this.$refs.searchFilterSingle,settings:{searchHighlight:!0},events:{searchFilter:(n,t)=>n.text.toLowerCase().includes(t.toLowerCase())}}),new r({select:this.$refs.searchFilterMultiple,data:[{label:"Fruits",options:[{text:"Apple",value:"apple"},{text:"Banana",value:"banana"},{text:"Orange",value:"orange"}]},{label:"Vegetables",options:[{text:"Carrot",value:"carrot"},{text:"Potato",value:"potato"},{text:"Tomato",value:"tomato"}]},{label:"Meats",options:[{text:"Beef",value:"beef"},{text:"Chicken",value:"chicken"},{text:"Pork",value:"pork"}]},{label:"Seafood",options:[{text:"Crab",value:"crab"},{text:"Lobster",value:"lobster"},{text:"Shrimp",value:"shrimp"}]}],settings:{searchHighlight:!0},events:{searchFilter:(n,t)=>n.text.toLowerCase().includes(t.toLowerCase())}})}}),oe={id:"searchFilter",class:"content"},ae={class:"row"},ie={ref:"searchFilterSingle"},ue={ref:"searchFilterMultiple"};function pe(n,t,p,i,s,f){return a(),o("div",oe,[t[2]||(t[2]=e("h2",{class:"header"},"searchFilter",-1)),t[3]||(t[3]=e("p",null,"searchFilter event is used to replace the default matching algorithm.",-1)),t[4]||(t[4]=e("p",null,[l("See Data for the proper object interface of "),e("em",null,"option"),l(".")],-1)),e("div",ae,[e("select",ie,[...t[0]||(t[0]=[e("option",{value:"apple"},"Apple",-1),e("option",{value:"orange"},"Orange",-1),e("option",{value:"pineapple"},"Pineapple",-1)])],512),e("select",ue,[...t[1]||(t[1]=[e("option",{value:"apple"},"Apple",-1),e("option",{value:"orange"},"Orange",-1),e("option",{value:"pineapple"},"Pineapple",-1)])],512)]),t[5]||(t[5]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const fe=h(re,[["render",pe]]),ce=d({name:"Addable",mounted(){new r({select:this.$refs.addableSingle,events:{addable:n=>n.toLowerCase()==="value"?new Error("You cant set that value"):{text:n,value:n.toLowerCase()}}}),new r({select:this.$refs.addableMultiple,events:{addable:n=>new Promise(t=>{setTimeout(()=>{t({text:n,value:n})},100)})}})}}),de={id:"addable",class:"content"},he={class:"row"},ge={ref:"addableSingle"},ve={ref:"addableMultiple",multiple:""};function me(n,t,p,i,s,f){return a(),o("div",de,[t[2]||(t[2]=e("h2",{class:"header"},"addable",-1)),t[3]||(t[3]=e("p",null,"Slim select has the ability to dynamically add options via the search input field",-1)),t[4]||(t[4]=e("p",null," addable is a callback which takes a function parameter. The return value can either be a string or an option object. ",-1)),e("div",he,[e("select",ge,[...t[0]||(t[0]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),e("select",ve,[...t[1]||(t[1]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2"},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512)]),t[5]||(t[5]=e("pre",null,[l("      "),e("code",{class:"language-javascript"},`
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
    `)],-1))])}const be=h(ce,[["render",me]]),Se=d({name:"Events",components:{Error:F,BeforeAfterChange:J,BeforeAfterOpenClose:W,Search:se,SearchFilter:fe,Addable:be}}),$e={id:"events",class:"contents"};function Ce(n,t,p,i,s,f){const u=v("Error"),b=v("BeforeAfterChange"),S=v("BeforeAfterOpenClose"),$=v("Search"),C=v("SearchFilter"),w=v("Addable");return a(),o("div",$e,[g(u),g(b),g(S),g($),g(C),g(w)])}const Oe=h(Se,[["render",Ce]]);export{Oe as default};
