import{d as c,S as p,_ as v,o as a,c as s,a as e,F as n,i,f as l,t as r}from"./index.js";const b=c({name:"Selects",data(){return{states:[{abv:"AL",state:"Alabama"},{abv:"AK",state:"Alaska"},{abv:"AZ",state:"Arizona"},{abv:"AR",state:"Arkansas"},{abv:"CA",state:"California"},{abv:"CO",state:"Colorado"},{abv:"CT",state:"Connecticut"},{abv:"DE",state:"Delaware"},{abv:"FL",state:"Florida"},{abv:"GA",state:"Georgia"},{abv:"HI",state:"Hawaii"},{abv:"ID",state:"Idaho"},{abv:"IL",state:"Illinois"},{abv:"IN",state:"Indiana"},{abv:"IA",state:"Iowa"},{abv:"KS",state:"Kansas"},{abv:"KY",state:"Kentucky"},{abv:"LA",state:"Louisiana"},{abv:"ME",state:"Maine"},{abv:"MD",state:"Maryland"},{abv:"MA",state:"Massachusetts"},{abv:"MI",state:"Michigan"},{abv:"MN",state:"Minnesota"},{abv:"MS",state:"Mississippi"},{abv:"MO",state:"Missouri"},{abv:"MT",state:"Montana"},{abv:"NE",state:"Nebraska"},{abv:"NV",state:"Nevada"},{abv:"NH",state:"New Hampshire"},{abv:"NJ",state:"New Jersey"},{abv:"NM",state:"New Mexico"},{abv:"NY",state:"New York"},{abv:"NC",state:"North Carolina"},{abv:"ND",state:"North Dakota"},{abv:"OH",state:"Ohio"},{abv:"OK",state:"Oklahoma"},{abv:"OR",state:"Oregon"},{abv:"PA",state:"Pennsylvania"},{abv:"RI",state:"Rhode Island"},{abv:"SC",state:"South Carolina"},{abv:"SD",state:"South Dakota"},{abv:"TN",state:"Tennessee",selected:!0},{abv:"TX",state:"Texas"},{abv:"UT",state:"Utah"},{abv:"VT",state:"Vermont"},{abv:"VA",state:"Virginia"},{abv:"WA",state:"Washington"},{abv:"WV",state:"West Virginia"},{abv:"WI",state:"Wisconsin"},{abv:"WY",state:"Wyoming"}],foods:[{label:"Dairy",options:["Milk","Cheese","Butter","Ice Cream"]},{label:"Meat",options:["Beef","Ham","Pork","Sausage","Chicken","Turkey"]},{label:"Fruits",options:["Apple","Banana","Grape","Orange","Strawberry","Blueberry","Raspberry"]},{label:"Vegetables",options:["Carrot","Tomato","Broccoli","Celery","Corn","Pumpkin","Kale","Spinach"]}]}},mounted(){new p({select:this.$refs.single}),new p({select:this.$refs.singleOptgroup}),new p({select:this.$refs.multiple}),new p({select:this.$refs.multipleOptgroup}).setSelected(["Cheese","Apple","Corn"])}}),d={id:"selects",class:"contents"},h={id:"single",class:"content"},_=e("h2",{class:"header"},"Single",-1),g=e("p",null," Basic single select usage with Slim Select is extremely easy. Just set the select value to your select element. ",-1),m={class:"row"},V=e("h4",null,"Options",-1),y={ref:"single"},k=["value","selected"],M=e("h4",null,"Optgroups",-1),S={ref:"singleOptgroup"},N=["label"],O=["value"],f=e("pre",null,[l("        "),e("code",{class:"language-javascript"},`
          new SlimSelect({
            select: '#single'
          })
        `),l(`
      `)],-1),C=e("pre",null,[l("        "),e("code",{class:"language-html"},`
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
        `),l(`
      `)],-1),w={id:"multiple",class:"content"},A=e("h2",{class:"header"},"Multiple",-1),I=e("p",null," Multi selects work just the same as a single select. The only difference is setting the multiple attribute on your select. ",-1),T={class:"row"},D=e("h4",null,"Options",-1),L={ref:"multiple",multiple:""},B=["value","selected"],W=e("h4",null,"Optgroups",-1),$={ref:"multipleOptgroup",multiple:""},K=["label"],H=["value"],F=e("pre",null,[l("        "),e("code",{class:"language-javascript"},`
          new SlimSelect({
            select: '#multiple'
          })
        `),l(`
      `)],-1),G=e("pre",null,[l("        "),e("code",{class:"language-html"},`
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
        `),l(`
      `)],-1);function R(u,E,P,Y,j,x){return a(),s("div",d,[e("div",h,[_,g,e("div",m,[e("div",null,[V,e("select",y,[(a(!0),s(n,null,i(u.states,t=>(a(),s("option",{key:t.abv,value:t.abv,selected:t.selected},r(t.state),9,k))),128))],512)]),e("div",null,[M,e("select",S,[(a(!0),s(n,null,i(u.foods,t=>(a(),s("optgroup",{key:t.label,label:t.label},[(a(!0),s(n,null,i(t.options,o=>(a(),s("option",{key:o,value:o},r(o),9,O))),128))],8,N))),128))],512)])]),f,C]),e("div",w,[A,I,e("div",T,[e("div",null,[D,e("select",L,[(a(!0),s(n,null,i(u.states,t=>(a(),s("option",{value:t.abv,key:t.abv,selected:t.selected},r(t.state),9,B))),128))],512)]),e("div",null,[W,e("select",$,[(a(!0),s(n,null,i(u.foods,t=>(a(),s("optgroup",{key:t.label,label:t.label},[(a(!0),s(n,null,i(t.options,o=>(a(),s("option",{key:o,value:o},r(o),9,H))),128))],8,K))),128))],512)])]),F,G])])}const U=v(b,[["render",R]]);export{U as default};
