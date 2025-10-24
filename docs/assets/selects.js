import{d as b,S as r,_ as d,c as l,a as e,F as i,g as u,f as n,o as s,t as v}from"./index.js";const g=b({name:"Selects",data(){return{states:[{abv:"AL",state:"Alabama"},{abv:"AK",state:"Alaska"},{abv:"AZ",state:"Arizona"},{abv:"AR",state:"Arkansas"},{abv:"CA",state:"California"},{abv:"CO",state:"Colorado"},{abv:"CT",state:"Connecticut"},{abv:"DE",state:"Delaware"},{abv:"FL",state:"Florida"},{abv:"GA",state:"Georgia"},{abv:"HI",state:"Hawaii"},{abv:"ID",state:"Idaho"},{abv:"IL",state:"Illinois"},{abv:"IN",state:"Indiana"},{abv:"IA",state:"Iowa"},{abv:"KS",state:"Kansas"},{abv:"KY",state:"Kentucky"},{abv:"LA",state:"Louisiana"},{abv:"ME",state:"Maine"},{abv:"MD",state:"Maryland"},{abv:"MA",state:"Massachusetts"},{abv:"MI",state:"Michigan"},{abv:"MN",state:"Minnesota"},{abv:"MS",state:"Mississippi"},{abv:"MO",state:"Missouri"},{abv:"MT",state:"Montana"},{abv:"NE",state:"Nebraska"},{abv:"NV",state:"Nevada"},{abv:"NH",state:"New Hampshire"},{abv:"NJ",state:"New Jersey"},{abv:"NM",state:"New Mexico"},{abv:"NY",state:"New York"},{abv:"NC",state:"North Carolina"},{abv:"ND",state:"North Dakota"},{abv:"OH",state:"Ohio"},{abv:"OK",state:"Oklahoma"},{abv:"OR",state:"Oregon"},{abv:"PA",state:"Pennsylvania"},{abv:"RI",state:"Rhode Island"},{abv:"SC",state:"South Carolina"},{abv:"SD",state:"South Dakota"},{abv:"TN",state:"Tennessee",selected:!0},{abv:"TX",state:"Texas"},{abv:"UT",state:"Utah"},{abv:"VT",state:"Vermont"},{abv:"VA",state:"Virginia"},{abv:"WA",state:"Washington"},{abv:"WV",state:"West Virginia"},{abv:"WI",state:"Wisconsin"},{abv:"WY",state:"Wyoming"}],foods:[{label:"Dairy",options:["Milk","Cheese","Butter","Ice Cream"]},{label:"Meat",options:["Beef","Ham","Pork","Sausage","Chicken","Turkey"]},{label:"Fruits",options:["Apple","Banana","Grape","Orange","Strawberry","Blueberry","Raspberry"]},{label:"Vegetables",options:["Carrot","Tomato","Broccoli","Celery","Corn","Pumpkin","Kale","Spinach"]}]}},mounted(){new r({select:this.$refs.single}),new r({select:this.$refs.singleOptgroup}),new r({select:this.$refs.multiple}),new r({select:this.$refs.multipleOptgroup}).setSelected(["Cheese","Apple","Corn"])}}),c={id:"selects",class:"contents"},m={id:"single",class:"content"},h={class:"row"},V={ref:"single"},y=["value","selected"],k={ref:"singleOptgroup"},M=["label"],S=["value"],N={id:"multiple",class:"content"},O={class:"row"},f={ref:"multiple",multiple:""},C=["value","selected"],w={ref:"multipleOptgroup",multiple:""},A=["label"],I=["value"];function T(p,t,_,D,L,B){return s(),l("div",c,[e("div",m,[t[2]||(t[2]=e("h2",{class:"header"},"Single",-1)),t[3]||(t[3]=e("p",null," Basic single select usage with Slim Select is extremely easy. Just set the select value to your select element. ",-1)),e("div",h,[e("div",null,[t[0]||(t[0]=e("h4",null,"Options",-1)),e("select",V,[(s(!0),l(i,null,u(p.states,a=>(s(),l("option",{key:a.abv,value:a.abv,selected:a.selected},v(a.state),9,y))),128))],512)]),e("div",null,[t[1]||(t[1]=e("h4",null,"Optgroups",-1)),e("select",k,[(s(!0),l(i,null,u(p.foods,a=>(s(),l("optgroup",{key:a.label,label:a.label},[(s(!0),l(i,null,u(a.options,o=>(s(),l("option",{key:o,value:o},v(o),9,S))),128))],8,M))),128))],512)])]),t[4]||(t[4]=e("pre",null,[n("        "),e("code",{class:"language-javascript"},`
          new SlimSelect({
            select: '#single'
          })
        `),n(`
      `)],-1)),t[5]||(t[5]=e("pre",null,[n("        "),e("code",{class:"language-html"},`
          <!-- Options -->
          <select id="single">
            <option value="value 1">Value 1</option>
            <option value="value 2">Value 2</option>
            <option value="value 3">Value 3</option>
          </select>

          <!-- Optgroups -->
          <select id="single-optgroups">
            <optgroup label="Label 1">
              <option value="value 1">Value 1</option>
              <option value="value 2">Value 2</option>
              <option value="value 3">Value 3</option>
            </optgroup>
            <optgroup label="Label 2">
              <option value="value 21">Value 1</option>
              <option value="value 22">Value 2</option>
              <option value="value 23">Value 3</option>
            </optgroup>
          </select>
        `),n(`
      `)],-1))]),e("div",N,[t[8]||(t[8]=e("h2",{class:"header"},"Multiple",-1)),t[9]||(t[9]=e("p",null," Multi selects work just the same as a single select. The only difference is setting the multiple attribute on your select. ",-1)),e("div",O,[e("div",null,[t[6]||(t[6]=e("h4",null,"Options",-1)),e("select",f,[(s(!0),l(i,null,u(p.states,a=>(s(),l("option",{value:a.abv,key:a.abv,selected:a.selected},v(a.state),9,C))),128))],512)]),e("div",null,[t[7]||(t[7]=e("h4",null,"Optgroups",-1)),e("select",w,[(s(!0),l(i,null,u(p.foods,a=>(s(),l("optgroup",{key:a.label,label:a.label},[(s(!0),l(i,null,u(a.options,o=>(s(),l("option",{key:o,value:o},v(o),9,I))),128))],8,A))),128))],512)])]),t[10]||(t[10]=e("pre",null,[n("        "),e("code",{class:"language-javascript"},`
          new SlimSelect({
            select: '#multiple'
          })
        `),n(`
      `)],-1)),t[11]||(t[11]=e("pre",null,[n("        "),e("code",{class:"language-html"},`
          <!-- Options -->
          <select id="multiple" multiple>
            <option value="value 1">Value 1</option>
            <option value="value 2">Value 2</option>
            <option value="value 3">Value 3</option>
          </select>

          <!-- Optgroups -->
          <select id="multiple-optgroups" multiple>
            <optgroup label="Label 1">
              <option value="value 1">Value 1</option>
              <option value="value 2">Value 2</option>
              <option value="value 3">Value 3</option>
            </optgroup>
            <optgroup label="Label 2">
              <option value="value 21">Value 1</option>
              <option value="value 22">Value 2</option>
              <option value="value 23">Value 3</option>
            </optgroup>
          </select>
        `),n(`
      `)],-1))])])}const $=d(g,[["render",T]]);export{$ as default};
