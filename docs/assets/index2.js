import{d,S as o,_ as g,c as r,a as e,b as i,o as c,f as a,h as b,n as w,t as q,A as $,e as u,r as m}from"./index.js";const C=[{text:"United States",value:"US",html:'<img src="https://flagcdn.com/us.svg" class="country"/> United States'},{text:"Canada",value:"CA",html:'<img src="https://flagcdn.com/ca.svg" class="country"/> Canada'},{text:"United Kingdom",value:"UK",html:'<img src="https://flagcdn.com/gb.svg" class="country"/> United Kingdom'},{text:"Germany",value:"DE",html:'<img src="https://flagcdn.com/de.svg" class="country"/> Germany'},{text:"Japan",value:"JP",html:'<img src="https://flagcdn.com/jp.svg" class="country"/> Japan'},{text:"France",value:"FR",html:'<img src="https://flagcdn.com/fr.svg" class="country"/> France'},{text:"Italy",value:"IT",html:'<img src="https://flagcdn.com/it.svg" class="country"/> Italy'},{text:"Australia",value:"AU",html:'<img src="https://flagcdn.com/au.svg" class="country"/> Australia'},{text:"Brazil",value:"BR",html:'<img src="https://flagcdn.com/br.svg" class="country"/> Brazil'},{text:"India",value:"IN",html:'<img src="https://flagcdn.com/in.svg" class="country"/> India'},{text:"Mexico",value:"MX",html:'<img src="https://flagcdn.com/mx.svg" class="country"/> Mexico'},{text:"Russia",value:"RU",html:'<img src="https://flagcdn.com/ru.svg" class="country"/> Russia'},{text:"China",value:"CN",html:'<img src="https://flagcdn.com/cn.svg" class="country"/> China'},{text:"South Korea",value:"KR",html:'<img src="https://flagcdn.com/kr.svg" class="country"/> South Korea'},{text:"South Africa",value:"ZA",html:'<img src="https://flagcdn.com/za.svg" class="country"/> South Africa'},{text:"Argentina",value:"AR",html:'<img src="https://flagcdn.com/ar.svg" class="country"/> Argentina'},{text:"Colombia",value:"CO",html:'<img src="https://flagcdn.com/co.svg" class="country"/> Colombia'},{text:"Chile",value:"CL",html:'<img src="https://flagcdn.com/cl.svg" class="country"/> Chile'},{text:"Spain",value:"ES",html:'<img src="https://flagcdn.com/es.svg" class="country"/> Spain'},{text:"Netherlands",value:"NL",html:'<img src="https://flagcdn.com/nl.svg" class="country"/> Netherlands'},{text:"Sweden",value:"SE",html:'<img src="https://flagcdn.com/se.svg" class="country"/> Sweden'},{text:"Switzerland",value:"CH",html:'<img src="https://flagcdn.com/ch.svg" class="country"/> Switzerland'},{text:"Norway",value:"NO",html:'<img src="https://flagcdn.com/no.svg" class="country"/> Norway'},{text:"Denmark",value:"DK",html:'<img src="https://flagcdn.com/dk.svg" class="country"/> Denmark'},{text:"Finland",value:"FI",html:'<img src="https://flagcdn.com/fi.svg" class="country"/> Finland'},{text:"Belgium",value:"BE",html:'<img src="https://flagcdn.com/be.svg" class="country"/> Belgium'},{text:"Portugal",value:"PT",html:'<img src="https://flagcdn.com/pt.svg" class="country"/> Portugal'},{text:"Greece",value:"GR",html:'<img src="https://flagcdn.com/gr.svg" class="country"/> Greece'},{text:"Poland",value:"PL",html:'<img src="https://flagcdn.com/pl.svg" class="country"/> Poland'},{text:"Turkey",value:"TR",html:'<img src="https://flagcdn.com/tr.svg" class="country"/> Turkey'},{text:"Saudi Arabia",value:"SA",html:'<img src="https://flagcdn.com/sa.svg" class="country"/> Saudi Arabia'},{text:"Israel",value:"IL",html:'<img src="https://flagcdn.com/il.svg" class="country"/> Israel'},{text:"Thailand",value:"TH",html:'<img src="https://flagcdn.com/th.svg" class="country"/> Thailand'},{text:"Indonesia",value:"ID",html:'<img src="https://flagcdn.com/id.svg" class="country"/> Indonesia'},{text:"Malaysia",value:"MY",html:'<img src="https://flagcdn.com/my.svg" class="country"/> Malaysia'},{text:"Singapore",value:"SG",html:'<img src="https://flagcdn.com/sg.svg" class="country"/> Singapore'},{text:"Philippines",value:"PH",html:'<img src="https://flagcdn.com/ph.svg" class="country"/> Philippines'},{text:"New Zealand",value:"NZ",html:'<img src="https://flagcdn.com/nz.svg" class="country"/> New Zealand'},{text:"Egypt",value:"EG",html:'<img src="https://flagcdn.com/eg.svg" class="country"/> Egypt'},{text:"Vietnam",value:"VN",html:'<img src="https://flagcdn.com/vn.svg" class="country"/> Vietnam'},{text:"Peru",value:"PE",html:'<img src="https://flagcdn.com/pe.svg" class="country"/> Peru'},{text:"Pakistan",value:"PK",html:'<img src="https://flagcdn.com/pk.svg" class="country"/> Pakistan'},{text:"Bangladesh",value:"BD",html:'<img src="https://flagcdn.com/bd.svg" class="country"/> Bangladesh'},{text:"Nigeria",value:"NG",html:'<img src="https://flagcdn.com/ng.svg" class="country"/> Nigeria'},{text:"Kenya",value:"KE",html:'<img src="https://flagcdn.com/ke.svg" class="country"/> Kenya'},{text:"Morocco",value:"MA",html:'<img src="https://flagcdn.com/ma.svg" class="country"/> Morocco'},{text:"Algeria",value:"DZ",html:'<img src="https://flagcdn.com/dz.svg" class="country"/> Algeria'},{text:"Ukraine",value:"UA",html:'<img src="https://flagcdn.com/ua.svg" class="country"/> Ukraine'},{text:"Venezuela",value:"VE",html:'<img src="https://flagcdn.com/ve.svg" class="country"/> Venezuela'}],T=d({name:"Countries",data(){return{countrySelect:null}},mounted(){this.countrySelect=new o({select:this.$refs.countrySelect,data:C,settings:{contentLocation:document.getElementById("localCountry")}})}}),R={id:"countries",class:"content"},k={class:"row"},A={ref:"countrySelect",class:"countries"};function N(n,t,s,p,v,h){return c(),r("div",R,[t[1]||(t[1]=e("h2",{class:"header"},"Countries",-1)),t[2]||(t[2]=e("p",null," This example demonstrates how to use HTML elements within SlimSelect options to display rich content like images, icons, or custom formatting. Perfect for country selectors, product catalogs, or any scenario where visual elements enhance user experience. ",-1)),t[3]||(t[3]=e("br",null,null,-1)),e("div",k,[e("select",A,null,512),t[0]||(t[0]=e("div",{id:"localCountry"},null,-1))]),t[4]||(t[4]=i(`<br><pre>      <code class="language-html">
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
    </pre>`,4))])}const P=g(T,[["render",N]]),U=d({name:"FormReset",data(){return{single:null,multiple:null}},mounted(){this.single=new o({select:this.$refs.single}),this.multiple=new o({select:this.$refs.multiple})},methods:{onSubmitSingle(n){n.preventDefault(),alert(JSON.stringify(this.single.getSelected()))},onSubmitMultiple(n){n.preventDefault(),alert(JSON.stringify(this.multiple.getSelected()))},onFormResetSingle(n){const t=n.target;setTimeout(()=>{this.single.setSelected(Array.from(t.elements.namedItem("select").selectedOptions).map(s=>s.value),!1)})},onFormResetMultiple(n){const t=n.target;setTimeout(()=>{this.multiple.setSelected(Array.from(t.elements.namedItem("select").selectedOptions).map(s=>s.value),!1)})}}}),M={id:"formReset",class:"content"},E={class:"row"},F={ref:"single",name:"select"},V={ref:"multiple",name:"select",multiple:""};function I(n,t,s,p,v,h){return c(),r("div",M,[t[10]||(t[10]=e("h2",{class:"header"},"Form Reset",-1)),t[11]||(t[11]=e("p",null," This example shows how to properly handle form reset functionality with SlimSelect. When a user clicks the reset button, SlimSelect will automatically restore the select to its original selected values, maintaining consistency with the native form behavior. ",-1)),e("div",E,[e("form",{class:"row",onSubmit:t[0]||(t[0]=(...l)=>n.onSubmitSingle&&n.onSubmitSingle(...l)),onReset:t[1]||(t[1]=(...l)=>n.onFormResetSingle&&n.onFormResetSingle(...l))},[e("select",F,[...t[4]||(t[4]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2",selected:""},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),t[5]||(t[5]=e("button",{type:"submit"},"Submit",-1)),t[6]||(t[6]=e("button",{type:"reset"},"Reset form",-1))],32),e("form",{class:"row",onSubmit:t[2]||(t[2]=(...l)=>n.onSubmitMultiple&&n.onSubmitMultiple(...l)),onReset:t[3]||(t[3]=(...l)=>n.onFormResetMultiple&&n.onFormResetMultiple(...l))},[e("select",V,[...t[7]||(t[7]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2",selected:""},"Value 2",-1),e("option",{value:"value3",selected:""},"Value 3",-1)])],512),t[8]||(t[8]=e("button",{type:"submit"},"Submit",-1)),t[9]||(t[9]=e("button",{type:"reset"},"Reset form",-1))],32)]),t[12]||(t[12]=e("pre",null,[a("      "),e("code",{class:"language-html"},`
        <form id="form">
          <select id="selectElement" name="select">
            <option value="value1">Value 1</option>
            <option value="value2" selected>Value 2</option>
            <option value="value3">Value 3</option>
          </select>
          <button type="reset">Reset form</button>
        </form>
      `),a(`
    `)],-1)),t[13]||(t[13]=e("pre",null,[a("      "),e("code",{class:"language-javascript"},`
        var select = new SlimSelect({
          select: '#selectElement'
        })

        document.querySelector('#form').addEventListener('reset', (e) => {
          // Updating SlimSelect from actual native select element value
          select.setSelected(
            Array.from(e.target.elements.select.selectedOptions).map((option) => option.value),
            false
          )
        })
      `),a(`
    `)],-1))])}const K=g(U,[["render",I]]),L=d({name:"Required",data(){return{country:null,interests:null,priority:null,message:""}},mounted(){this.country=new o({select:this.$refs.country}),this.interests=new o({select:this.$refs.interests}),this.priority=new o({select:this.$refs.priority})},methods:{onSubmit(n){if(n.preventDefault(),n.target.checkValidity()){const s={country:this.country.getSelected()[0],interests:this.interests.getSelected(),priority:this.priority.getSelected()[0]};this.message=`✅ Form is valid! Submitted data:
${JSON.stringify(s,null,2)}`}else this.message="❌ Please fill in all required fields"}}}),D={id:"required",class:"content"},O={class:"form-group"},B={id:"country-select",ref:"country",name:"country",required:""},z={class:"form-group"},H={id:"interests-select",ref:"interests",name:"interests",multiple:"",required:""},G={class:"form-group"},J={id:"priority-select",ref:"priority",name:"priority",required:""};function W(n,t,s,p,v,h){return c(),r("div",D,[t[8]||(t[8]=e("h2",{class:"header"},"Required Attribute",-1)),t[9]||(t[9]=e("p",null,[a(" This example demonstrates HTML5 form validation with SlimSelect using the "),e("code",null,"required"),a(" attribute. The form will prevent submission if required fields are empty, and SlimSelect seamlessly integrates with native browser validation to provide a consistent user experience. ")],-1)),e("form",{class:"required-form",onSubmit:t[0]||(t[0]=(...l)=>n.onSubmit&&n.onSubmit(...l))},[e("div",O,[t[2]||(t[2]=e("label",{for:"country-select"},"Country *",-1)),e("select",B,[...t[1]||(t[1]=[i('<option value="">Select a country</option><option value="usa">United States</option><option value="uk">United Kingdom</option><option value="canada">Canada</option><option value="australia">Australia</option><option value="germany">Germany</option>',6)])],512)]),e("div",z,[t[4]||(t[4]=e("label",{for:"interests-select"},"Interests * (Multiple)",-1)),e("select",H,[...t[3]||(t[3]=[i('<option value="sports">Sports</option><option value="music">Music</option><option value="technology">Technology</option><option value="travel">Travel</option><option value="reading">Reading</option><option value="art">Art</option>',6)])],512)]),e("div",G,[t[6]||(t[6]=e("label",{for:"priority-select"},"Priority *",-1)),e("select",J,[...t[5]||(t[5]=[i('<option value="">Select priority level</option><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="urgent">Urgent</option>',5)])],512)]),t[7]||(t[7]=e("button",{type:"submit",class:"button"},"Submit Form",-1)),n.message?(c(),r("div",{key:0,class:w(["message",n.message.includes("✅")?"success":"error"])},[e("pre",null,q(n.message),1)],2)):b("",!0)],32),t[10]||(t[10]=i(`<h3>HTML</h3><pre>      <code class="language-html">
        &lt;form id=&quot;form&quot;&gt;
          &lt;label for=&quot;country&quot;&gt;Country *&lt;/label&gt;
          &lt;select id=&quot;country&quot; name=&quot;country&quot; required&gt;
            &lt;option value=&quot;&quot;&gt;Select a country&lt;/option&gt;
            &lt;option value=&quot;usa&quot;&gt;United States&lt;/option&gt;
            &lt;option value=&quot;uk&quot;&gt;United Kingdom&lt;/option&gt;
          &lt;/select&gt;

          &lt;label for=&quot;interests&quot;&gt;Interests *&lt;/label&gt;
          &lt;select id=&quot;interests&quot; name=&quot;interests&quot; multiple required&gt;
            &lt;option value=&quot;sports&quot;&gt;Sports&lt;/option&gt;
            &lt;option value=&quot;music&quot;&gt;Music&lt;/option&gt;
            &lt;option value=&quot;technology&quot;&gt;Technology&lt;/option&gt;
          &lt;/select&gt;

          &lt;button type=&quot;submit&quot;&gt;Submit Form&lt;/button&gt;
        &lt;/form&gt;
      </code>
    </pre><h3>Javascript</h3><pre>      <code class="language-javascript">
        new SlimSelect({
          select: &#39;#country&#39;
        })

        new SlimSelect({
          select: &#39;#interests&#39;
        })

        // Browser will automatically prevent form submission
        // if required fields are not filled
        document.querySelector(&#39;#form&#39;).addEventListener(&#39;submit&#39;, (e) =&gt; {
          e.preventDefault()

          if (e.target.checkValidity()) {
            console.log(&#39;Form is valid!&#39;)
            // Submit form data
          } else {
            console.log(&#39;Form is invalid - required fields not filled&#39;)
          }
        })
      </code>
    </pre><div class="alert"><p><strong>How it works:</strong> SlimSelect visually hides the original select element but keeps it focusable for native HTML5 validation. This means: </p><ul><li>✅ The <code>required</code> attribute works correctly</li><li>✅ Browser validation messages appear</li><li>✅ <code>form.checkValidity()</code> works as expected</li><li>✅ No console errors about unfocusable elements</li></ul></div>`,5))])}const j=g(L,[["render",W]]),Z=d({name:"TextOverflow",data(){return{singleConstrained:null,placeholderConstrained:null,multipleConstrained:null}},mounted(){this.placeholderConstrained=new o({select:this.$refs.placeholderConstrained}),this.singleConstrained=new o({select:this.$refs.singleConstrained}),this.multipleConstrained=new o({select:this.$refs.multipleConstrained})}}),X={id:"textOverflow",class:"content"},Y={class:"constrained-container"},Q={class:"form-group"},_={ref:"placeholderConstrained"},tt={class:"constrained-container"},et={class:"form-group"},nt={ref:"singleConstrained"},lt={class:"constrained-container"},st={class:"form-group"},ot={ref:"multipleConstrained",multiple:""};function it(n,t,s,p,v,h){return c(),r("div",X,[t[6]||(t[6]=e("h2",{class:"header"},"Text Overflow Handling",-1)),t[7]||(t[7]=e("p",null," This example showcases SlimSelect's intelligent text overflow handling. When text is too long for the available space, SlimSelect automatically truncates it with ellipsis (...) while keeping essential UI elements like arrows and clear buttons visible. This prevents layout breaking and maintains a clean, professional appearance. ",-1)),t[8]||(t[8]=e("div",{class:"alert info"},[e("p",null,[e("strong",null,"Feature:"),a(" Text automatically truncates with ellipsis when it would overflow, ensuring the arrow/deselect buttons remain visible. ")])],-1)),t[9]||(t[9]=e("h3",null,"Placeholder Text - Constrained Width",-1)),e("div",Y,[e("div",Q,[t[1]||(t[1]=e("label",null,"Select a very long placeholder option (250px max width)",-1)),e("select",_,[...t[0]||(t[0]=[e("option",{value:"","data-placeholder":"true"}," Please choose from a very long list of available options that might exceed the container width ",-1),e("option",{value:"option1"},"Option 1",-1),e("option",{value:"option2"},"Option 2",-1),e("option",{value:"option3"},"Option 3",-1)])],512)])]),t[10]||(t[10]=e("h3",null,"Single Select - Constrained Width",-1)),e("div",tt,[e("div",et,[t[3]||(t[3]=e("label",null,"Country (250px max width)",-1)),e("select",nt,[...t[2]||(t[2]=[e("option",{value:"short"},"USA",-1),e("option",{value:"medium"},"United Kingdom",-1),e("option",{value:"long",selected:""},"Democratic People's Republic of Korea (North Korea)",-1),e("option",{value:"very-long"},"Lao People's Democratic Republic (Laos) - Southeast Asia",-1)])],512)])]),t[11]||(t[11]=e("h3",null,"Multiple Select - Constrained Width",-1)),e("div",lt,[e("div",st,[t[5]||(t[5]=e("label",null,"Features (250px max width)",-1)),e("select",ot,[...t[4]||(t[4]=[i('<option value="short" selected>AI</option><option value="medium" selected>Machine Learning</option><option value="long" selected>Natural Language Processing (NLP)</option><option value="very-long" selected>Computer Vision and Image Recognition Systems</option><option value="extremely-long">Deep Learning Neural Network Architecture Optimization</option>',5)])],512)])]),t[12]||(t[12]=i(`<h3>HTML</h3><pre>      <code class="language-html">
        &lt;div style=&quot;max-width: 250px;&quot;&gt;
          &lt;!-- Selected value with long text --&gt;
          &lt;select id=&quot;selectElement&quot;&gt;
            &lt;option value=&quot;short&quot;&gt;USA&lt;/option&gt;
            &lt;option value=&quot;long&quot; selected&gt;
              Democratic People&#39;s Republic of Korea (North Korea)
            &lt;/option&gt;
          &lt;/select&gt;
          
          &lt;!-- Placeholder with long text --&gt;
          &lt;select id=&quot;placeholderElement&quot;&gt;
            &lt;option value=&quot;&quot; selected disabled&gt;
              Please choose from a very long list of available options
            &lt;/option&gt;
            &lt;option value=&quot;option1&quot;&gt;Option 1&lt;/option&gt;
          &lt;/select&gt;
        &lt;/div&gt;
      </code>
    </pre><h3>Javascript</h3><pre>      <code class="language-javascript">
        // Selected value with long text
        new SlimSelect({
          select: &#39;#selectElement&#39;
        })
        
        // Placeholder with long text
        new SlimSelect({
          select: &#39;#placeholderElement&#39;
        })

        // Text automatically truncates with ellipsis (...)
        // Arrow and deselect buttons remain visible
        // Works for both selected values and placeholders
      </code>
    </pre><div class="alert"><p><strong>How it works:</strong></p><ul><li>✅ Long text is truncated with ellipsis (...)</li><li>✅ Arrow and clear buttons stay visible</li><li>✅ No text wrapping or layout breaking</li><li>✅ Works in both single and multi-select modes</li><li>✅ Works for selected values and placeholder text</li><li>✅ Dropdown shows full text when opened</li></ul></div>`,5))])}const at=g(Z,[["render",it]]),rt=d({name:"Examples",components:{AdSlot:$,Countries:P,FormReset:K,Required:j,TextOverflow:at}}),ct={id:"examples",class:"contents"};function ut(n,t,s,p,v,h){const l=m("Countries"),f=m("FormReset"),y=m("AdSlot"),S=m("Required"),x=m("TextOverflow");return c(),r("div",ct,[u(l),u(f),u(y,{"ad-slot":"1270131515"}),u(S),u(x)])}const dt=g(rt,[["render",ut]]);export{dt as default};
