import{d as n,S as a,_ as l,o,c as s,a as e,f as t}from"./index.js";const i=n({name:"Data",mounted(){new a({select:this.$refs.dataSingle,data:[{placeholder:!0,text:"data placeholder"},{text:"Cat"},{text:"Dog"},{text:"Bird"}]}),new a({select:this.$refs.dataMultiple,data:[{placeholder:!0,text:"data placeholder"},{text:"Human"},{label:"Animals",options:[{text:"Cat"},{text:"Dog"},{text:"Bird"}]}]})}}),d={id:"data",class:"contents"},p=e("div",{id:"types",class:"content"},[e("h2",{class:"header"},"Data Types"),e("p",null," There are two types of data types. The option which consists of a variation of fields to customize the option. You can also provide an optgroup which has a label and an array of options. "),e("pre",null,[t("        "),e("code",{class:"language-javascript"},`
          var optgroup = {
            label: 'label', // Required
            selectAll: false, // Optional - default false
            closabel: 'off', // Optional - default 'off' - 'off', 'open', 'close'
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
        `),t(`
      `)])],-1),r={id:"field",class:"content"},c=e("h2",{class:"header"},"Data Field",-1),u=e("p",null," The data field is an array of options and optgroups. The data field can be used in place of the select element. The data field will also be used to update the options in the original select element. ",-1),f=e("p",null," The only required field is the text field. The value field will be set to the text field if not set. All other fields are optional and have default values if not set. ",-1),h={class:"row"},x={ref:"dataSingle"},_={ref:"dataMultiple",multiple:""},m=e("pre",null,[t("        "),e("code",{class:"language-javascript"},`
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
        `),t(`
      `)],-1);function b(v,g,y,O,w,T){return o(),s("div",d,[p,e("div",r,[c,u,f,e("div",h,[e("select",x,null,512),e("select",_,null,512)]),m])])}const D=l(i,[["render",b]]);export{D as default};
