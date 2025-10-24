import{d as s,f as i,S as l,_ as d,c as p,a as t,e as n,w as o,r,o as u}from"./index.js";const f=s({name:"Data",components:{ShikiStyle:i},mounted(){new l({select:this.$refs.dataSingle,data:[{placeholder:!0,text:"data placeholder"},{text:"Cat"},{text:"Dog"},{text:"Bird"}]}),new l({select:this.$refs.dataMultiple,data:[{placeholder:!0,text:"data placeholder"},{text:"Human"},{label:"Animals",options:[{text:"Cat"},{text:"Dog"},{text:"Bird"}]}]})}}),c={id:"data",class:"contents"},h={id:"types",class:"content"},x={id:"field",class:"content"},m={class:"row"},v={ref:"dataSingle"},b={ref:"dataMultiple",multiple:""};function y(g,e,w,O,S,_){const a=r("ShikiStyle");return u(),p("div",c,[t("div",h,[e[1]||(e[1]=t("h2",{class:"header"},"Data Types",-1)),e[2]||(e[2]=t("p",null," There are two types of data types. The option which consists of a variation of fields to customize the option. You can also provide an optgroup which has a label and an array of options. ",-1)),n(a,{language:"javascript"},{default:o(()=>[...e[0]||(e[0]=[t("pre",null,`          var optgroup = {
            label: 'label',   // Required
            selectAll: false, // Optional - default false
            closable: 'off',  // Optional - default 'off' - 'off', 'open', 'close'
            options: []       // Required - value is an array of options
          }

          var option = {
            text: 'text',        // Required
            value: 'value',      // Optional - value will be set by text if not set
            html: '<b>Html</b>', // Optional - will be used for display purposes if set
            selected: false,     // Optional - default is false
            display: true,       // Optional - default is true
            disabled: false,     // Optional - default is false
            mandatory: false,    // Optional - default is false
            placeholder: false,  // Optional - default is false
            class: '',           // Optional - default is not set
            style: '',           // Optional - default is not set
            data: {}             // Optional - If you have data attributes
          }
        `,-1)])]),_:1})]),t("div",x,[e[4]||(e[4]=t("h2",{class:"header"},"Data Field",-1)),e[5]||(e[5]=t("p",null," The data field is an array of options and optgroups. The data field can be used in place of the select element. The data field will also be used to update the options in the original select element. ",-1)),e[6]||(e[6]=t("p",null," The only required field is the text field. The value field will be set to the text field if not set. All other fields are optional and have default values if not set. ",-1)),t("div",m,[t("select",v,null,512),t("select",b,null,512)]),n(a,{language:"javascript"},{default:o(()=>[...e[3]||(e[3]=[t("pre",null,`          new SlimSelect({
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
          {
            placeholder: true,
            text: 'placeholder text'
          }
        `,-1)])]),_:1})])])}const B=d(f,[["render",y]]);export{B as default};
