import{d as n,S as l,_ as o,c as s,a as e,f as a,o as i}from"./index.js";const d=n({name:"Data",mounted(){new l({select:this.$refs.dataSingle,data:[{placeholder:!0,text:"data placeholder"},{text:"Cat"},{text:"Dog"},{text:"Bird"}]}),new l({select:this.$refs.dataMultiple,data:[{placeholder:!0,text:"data placeholder"},{text:"Human"},{label:"Animals",options:[{text:"Cat"},{text:"Dog"},{text:"Bird"}]}]})}}),p={id:"data",class:"contents"},r={id:"field",class:"content"},u={class:"row"},f={ref:"dataSingle"},c={ref:"dataMultiple",multiple:""};function h(x,t,m,b,v,g){return i(),s("div",p,[t[4]||(t[4]=e("div",{id:"types",class:"content"},[e("h2",{class:"header"},"Data Types"),e("p",null," There are two types of data types. The option which consists of a variation of fields to customize the option. You can also provide an optgroup which has a label and an array of options. "),e("pre",null,[a("        "),e("code",{class:"language-javascript"},`
          var optgroup = {
            label: 'label', // Required
            selectAll: false, // Optional - default false
            closable: 'off', // Optional - default 'off' - 'off', 'open', 'close'
            options: [] // Required - value is an array of options
          }

          var option = {
            text: 'text', // Required
            value: 'value', // Optional - value will be set by text if not set
            html: '<b>Html</b>', // Optional - will be used for display purposes if set
            selected: false, // Optional - default is false
            display: true, // Optional - default is true
            disabled: false, // Optional - default is false
            mandatory: false, // Optional - default is false
            placeholder: false, // Optional - default is false
            class: '', // Optional - default is not set
            style: '', // Optional - default is not set
            data: {} // Optional - If you have data attributes
          }
        `),a(`
      `)])],-1)),e("div",r,[t[0]||(t[0]=e("h2",{class:"header"},"Data Field",-1)),t[1]||(t[1]=e("p",null," The data field is an array of options and optgroups. The data field can be used in place of the select element. The data field will also be used to update the options in the original select element. ",-1)),t[2]||(t[2]=e("p",null," The only required field is the text field. The value field will be set to the text field if not set. All other fields are optional and have default values if not set. ",-1)),e("div",u,[e("select",f,null,512),e("select",c,null,512)]),t[3]||(t[3]=e("pre",null,[a("        "),e("code",{class:"language-javascript"},`
          new SlimSelect({
            select: '#selectElement',
            
            // Options
            data: [
              {text: 'Value 1'},
              {text: 'Value 2'},
              {text: 'Value 3'}
            ],

            // Optgroup
            data: [
              {
                label: 'Animals',
                options: [
                  {text: 'Cat'},
                  {text: 'Dog'},
                  {text: 'Bird'}
                ]
              }
            ]

            // Mix - option and group options
            data: [
              {text: 'Human'}, // regular option
              {
                label: 'Animals',
                options: [
                  {text: 'Cat'},
                  {text: 'Dog'},
                  {text: 'Bird'}
                ]
              }
            ]
          })

          // If you want to set a placeholder set the first object placeholder to true
          {'placeholder': true, 'text': 'placeholder text'}
        `),a(`
      `)],-1))])])}const O=o(d,[["render",h]]);export{O as default};
