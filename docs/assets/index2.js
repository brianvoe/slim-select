import{d as n,S as u,_ as c,o as e,c as a,a as s,b as d,f as h,r as p}from"./index.js";const v=[{text:"United States",value:"US",html:'<img src="https://flagcdn.com/us.svg" class="country"/> United States'},{text:"Canada",value:"CA",html:'<img src="https://flagcdn.com/ca.svg" class="country"/> Canada'},{text:"United Kingdom",value:"UK",html:'<img src="https://flagcdn.com/gb.svg" class="country"/> United Kingdom'},{text:"Germany",value:"DE",html:'<img src="https://flagcdn.com/de.svg" class="country"/> Germany'},{text:"Japan",value:"JP",html:'<img src="https://flagcdn.com/jp.svg" class="country"/> Japan'},{text:"France",value:"FR",html:'<img src="https://flagcdn.com/fr.svg" class="country"/> France'},{text:"Italy",value:"IT",html:'<img src="https://flagcdn.com/it.svg" class="country"/> Italy'},{text:"Australia",value:"AU",html:'<img src="https://flagcdn.com/au.svg" class="country"/> Australia'},{text:"Brazil",value:"BR",html:'<img src="https://flagcdn.com/br.svg" class="country"/> Brazil'},{text:"India",value:"IN",html:'<img src="https://flagcdn.com/in.svg" class="country"/> India'},{text:"Mexico",value:"MX",html:'<img src="https://flagcdn.com/mx.svg" class="country"/> Mexico'},{text:"Russia",value:"RU",html:'<img src="https://flagcdn.com/ru.svg" class="country"/> Russia'},{text:"China",value:"CN",html:'<img src="https://flagcdn.com/cn.svg" class="country"/> China'},{text:"South Korea",value:"KR",html:'<img src="https://flagcdn.com/kr.svg" class="country"/> South Korea'},{text:"South Africa",value:"ZA",html:'<img src="https://flagcdn.com/za.svg" class="country"/> South Africa'},{text:"Argentina",value:"AR",html:'<img src="https://flagcdn.com/ar.svg" class="country"/> Argentina'},{text:"Colombia",value:"CO",html:'<img src="https://flagcdn.com/co.svg" class="country"/> Colombia'},{text:"Chile",value:"CL",html:'<img src="https://flagcdn.com/cl.svg" class="country"/> Chile'},{text:"Spain",value:"ES",html:'<img src="https://flagcdn.com/es.svg" class="country"/> Spain'},{text:"Netherlands",value:"NL",html:'<img src="https://flagcdn.com/nl.svg" class="country"/> Netherlands'},{text:"Sweden",value:"SE",html:'<img src="https://flagcdn.com/se.svg" class="country"/> Sweden'},{text:"Switzerland",value:"CH",html:'<img src="https://flagcdn.com/ch.svg" class="country"/> Switzerland'},{text:"Norway",value:"NO",html:'<img src="https://flagcdn.com/no.svg" class="country"/> Norway'},{text:"Denmark",value:"DK",html:'<img src="https://flagcdn.com/dk.svg" class="country"/> Denmark'},{text:"Finland",value:"FI",html:'<img src="https://flagcdn.com/fi.svg" class="country"/> Finland'},{text:"Belgium",value:"BE",html:'<img src="https://flagcdn.com/be.svg" class="country"/> Belgium'},{text:"Portugal",value:"PT",html:'<img src="https://flagcdn.com/pt.svg" class="country"/> Portugal'},{text:"Greece",value:"GR",html:'<img src="https://flagcdn.com/gr.svg" class="country"/> Greece'},{text:"Poland",value:"PL",html:'<img src="https://flagcdn.com/pl.svg" class="country"/> Poland'},{text:"Turkey",value:"TR",html:'<img src="https://flagcdn.com/tr.svg" class="country"/> Turkey'},{text:"Saudi Arabia",value:"SA",html:'<img src="https://flagcdn.com/sa.svg" class="country"/> Saudi Arabia'},{text:"Israel",value:"IL",html:'<img src="https://flagcdn.com/il.svg" class="country"/> Israel'},{text:"Thailand",value:"TH",html:'<img src="https://flagcdn.com/th.svg" class="country"/> Thailand'},{text:"Indonesia",value:"ID",html:'<img src="https://flagcdn.com/id.svg" class="country"/> Indonesia'},{text:"Malaysia",value:"MY",html:'<img src="https://flagcdn.com/my.svg" class="country"/> Malaysia'},{text:"Singapore",value:"SG",html:'<img src="https://flagcdn.com/sg.svg" class="country"/> Singapore'},{text:"Philippines",value:"PH",html:'<img src="https://flagcdn.com/ph.svg" class="country"/> Philippines'},{text:"New Zealand",value:"NZ",html:'<img src="https://flagcdn.com/nz.svg" class="country"/> New Zealand'},{text:"Egypt",value:"EG",html:'<img src="https://flagcdn.com/eg.svg" class="country"/> Egypt'},{text:"Vietnam",value:"VN",html:'<img src="https://flagcdn.com/vn.svg" class="country"/> Vietnam'},{text:"Peru",value:"PE",html:'<img src="https://flagcdn.com/pe.svg" class="country"/> Peru'},{text:"Pakistan",value:"PK",html:'<img src="https://flagcdn.com/pk.svg" class="country"/> Pakistan'},{text:"Bangladesh",value:"BD",html:'<img src="https://flagcdn.com/bd.svg" class="country"/> Bangladesh'},{text:"Nigeria",value:"NG",html:'<img src="https://flagcdn.com/ng.svg" class="country"/> Nigeria'},{text:"Kenya",value:"KE",html:'<img src="https://flagcdn.com/ke.svg" class="country"/> Kenya'},{text:"Morocco",value:"MA",html:'<img src="https://flagcdn.com/ma.svg" class="country"/> Morocco'},{text:"Algeria",value:"DZ",html:'<img src="https://flagcdn.com/dz.svg" class="country"/> Algeria'},{text:"Ukraine",value:"UA",html:'<img src="https://flagcdn.com/ua.svg" class="country"/> Ukraine'},{text:"Venezuela",value:"VE",html:'<img src="https://flagcdn.com/ve.svg" class="country"/> Venezuela'}],y=n({name:"Countries",data(){return{countrySelect:null}},mounted(){this.countrySelect=new u({select:this.$refs.countrySelect,data:v,settings:{contentLocation:document.getElementById("localCountry")}})}}),f={id:"countries",class:"content"},x={class:"row"},S={ref:"countrySelect",class:"countries"};function C(l,t,o,r,g,m){return e(),a("div",f,[t[1]||(t[1]=s("h2",{class:"header"},"Countries",-1)),t[2]||(t[2]=s("p",null,"Showcasing the use of html elements for displaying images or other rich content",-1)),t[3]||(t[3]=s("br",null,null,-1)),s("div",x,[s("select",S,null,512),t[0]||(t[0]=s("div",{id:"localCountry"},null,-1))]),t[4]||(t[4]=d(`<br><pre>      <code class="language-html">
        &lt;select id=&quot;selectElement&quot; class=&quot;countries&quot;&gt;&lt;/select&gt;
      </code>
    </pre><pre>      <code class="language-css">
        // Main content enlargements
        .countries.ss-main {
          height: 50px;
          font-size: 18px;
          font-weight: bold;
        }

        // Target the class on the img
        .countries.ss-main .ss-single .country {
          width: 30px;
          padding: 0 8px 0 8px;
        }

        // Target the options
        // Update sizing and alignment
        .countries.ss-content .ss-option {
          display: flex;
          align-items: center;
          height: 40px;
          font-size: 14px;
          font-weight: bold;
        }

        // Target the class on the img
        .countries.ss-content .ss-option .country {
          width: 30px;
          padding: 0 8px 0 8px;
        }
      </code>
    </pre><pre>      <code class="language-javascript">
        // Data
        const countries = [
          { 
            text: &#39;United States&#39;, 
            value: &#39;US&#39;, 
            html: &#39;<img src="https://flagcdn.com/us.svg" class="country"> United States&#39; 
          },
          { 
            text: &#39;Canada&#39;, 
            value: &#39;CA&#39;, 
            html: &#39;<img src="https://flagcdn.com/ca.svg" class="country"> Canada&#39; 
          },
          {
            text: &#39;United Kingdom&#39;,
            value: &#39;UK&#39;,
            html: &#39;<img src="https://flagcdn.com/gb.svg" class="country"> United Kingdom&#39;
          },
          // etc...  
        ]

        var select = new SlimSelect({
          select: &#39;#selectElement&#39;,
          data: countries
        })
      </code>
    </pre>`,4))])}const A=c(y,[["render",C]]),N=n({name:"Examples",components:{Countries:A}}),U={id:"examples",class:"contents"};function w(l,t,o,r,g,m){const i=p("Countries");return e(),a("div",U,[h(i)])}const E=c(N,[["render",w]]);export{E as default};
