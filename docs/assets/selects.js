import{d as g,f as c,S as r,_ as m,c as l,a as t,e as v,F as o,h as i,w as b,r as h,o as s,t as d}from"./index.js";const S=g({name:"Selects",components:{ShikiStyle:c},data(){return{states:[{abv:"AL",state:"Alabama"},{abv:"AK",state:"Alaska"},{abv:"AZ",state:"Arizona"},{abv:"AR",state:"Arkansas"},{abv:"CA",state:"California"},{abv:"CO",state:"Colorado"},{abv:"CT",state:"Connecticut"},{abv:"DE",state:"Delaware"},{abv:"FL",state:"Florida"},{abv:"GA",state:"Georgia"},{abv:"HI",state:"Hawaii"},{abv:"ID",state:"Idaho"},{abv:"IL",state:"Illinois"},{abv:"IN",state:"Indiana"},{abv:"IA",state:"Iowa"},{abv:"KS",state:"Kansas"},{abv:"KY",state:"Kentucky"},{abv:"LA",state:"Louisiana"},{abv:"ME",state:"Maine"},{abv:"MD",state:"Maryland"},{abv:"MA",state:"Massachusetts"},{abv:"MI",state:"Michigan"},{abv:"MN",state:"Minnesota"},{abv:"MS",state:"Mississippi"},{abv:"MO",state:"Missouri"},{abv:"MT",state:"Montana"},{abv:"NE",state:"Nebraska"},{abv:"NV",state:"Nevada"},{abv:"NH",state:"New Hampshire"},{abv:"NJ",state:"New Jersey"},{abv:"NM",state:"New Mexico"},{abv:"NY",state:"New York"},{abv:"NC",state:"North Carolina"},{abv:"ND",state:"North Dakota"},{abv:"OH",state:"Ohio"},{abv:"OK",state:"Oklahoma"},{abv:"OR",state:"Oregon"},{abv:"PA",state:"Pennsylvania"},{abv:"RI",state:"Rhode Island"},{abv:"SC",state:"South Carolina"},{abv:"SD",state:"South Dakota"},{abv:"TN",state:"Tennessee",selected:!0},{abv:"TX",state:"Texas"},{abv:"UT",state:"Utah"},{abv:"VT",state:"Vermont"},{abv:"VA",state:"Virginia"},{abv:"WA",state:"Washington"},{abv:"WV",state:"West Virginia"},{abv:"WI",state:"Wisconsin"},{abv:"WY",state:"Wyoming"}],foods:[{label:"Dairy",options:["Milk","Cheese","Butter","Ice Cream"]},{label:"Meat",options:["Beef","Ham","Pork","Sausage","Chicken","Turkey"]},{label:"Fruits",options:["Apple","Banana","Grape","Orange","Strawberry","Blueberry","Raspberry"]},{label:"Vegetables",options:["Carrot","Tomato","Broccoli","Celery","Corn","Pumpkin","Kale","Spinach"]}]}},mounted(){new r({select:this.$refs.single}),new r({select:this.$refs.singleOptgroup}),new r({select:this.$refs.multiple}),new r({select:this.$refs.multipleOptgroup}).setSelected(["Cheese","Apple","Corn"])}}),V={id:"selects",class:"contents"},y={id:"single",class:"content"},k={class:"row"},f={ref:"single"},M=["value","selected"],C={ref:"singleOptgroup"},N=["label"],O=["value"],w={id:"multiple",class:"content"},A={class:"row"},_={ref:"multiple",multiple:""},I=["value","selected"],T={ref:"multipleOptgroup",multiple:""},D=["label"],L=["value"];function B(u,e,W,$,K,H){const p=h("ShikiStyle");return s(),l("div",V,[t("div",y,[e[4]||(e[4]=t("h2",{class:"header"},"Single",-1)),e[5]||(e[5]=t("p",null," Basic single select usage with Slim Select is extremely easy. Just set the select value to your select element. ",-1)),t("div",k,[t("div",null,[e[0]||(e[0]=t("h4",null,"Options",-1)),t("select",f,[(s(!0),l(o,null,i(u.states,a=>(s(),l("option",{key:a.abv,value:a.abv,selected:a.selected},d(a.state),9,M))),128))],512)]),t("div",null,[e[1]||(e[1]=t("h4",null,"Optgroups",-1)),t("select",C,[(s(!0),l(o,null,i(u.foods,a=>(s(),l("optgroup",{key:a.label,label:a.label},[(s(!0),l(o,null,i(a.options,n=>(s(),l("option",{key:n,value:n},d(n),9,O))),128))],8,N))),128))],512)])]),v(p,{language:"javascript"},{default:b(()=>[...e[2]||(e[2]=[t("pre",null,`          new SlimSelect({
            select: '#single'
          })
        `,-1)])]),_:1}),v(p,{language:"html"},{default:b(()=>[...e[3]||(e[3]=[t("pre",null,`          <!-- Options -->
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
        `,-1)])]),_:1})]),t("div",w,[e[10]||(e[10]=t("h2",{class:"header"},"Multiple",-1)),e[11]||(e[11]=t("p",null," Multi selects work just the same as a single select. The only difference is setting the multiple attribute on your select. ",-1)),t("div",A,[t("div",null,[e[6]||(e[6]=t("h4",null,"Options",-1)),t("select",_,[(s(!0),l(o,null,i(u.states,a=>(s(),l("option",{value:a.abv,key:a.abv,selected:a.selected},d(a.state),9,I))),128))],512)]),t("div",null,[e[7]||(e[7]=t("h4",null,"Optgroups",-1)),t("select",T,[(s(!0),l(o,null,i(u.foods,a=>(s(),l("optgroup",{key:a.label,label:a.label},[(s(!0),l(o,null,i(a.options,n=>(s(),l("option",{key:n,value:n},d(n),9,L))),128))],8,D))),128))],512)])]),v(p,{language:"javascript"},{default:b(()=>[...e[8]||(e[8]=[t("pre",null,`          new SlimSelect({
            select: '#multiple'
          })
        `,-1)])]),_:1}),v(p,{language:"html"},{default:b(()=>[...e[9]||(e[9]=[t("pre",null,`          <!-- Options -->
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
        `,-1)])]),_:1})])])}const G=m(S,[["render",B]]);export{G as default};
