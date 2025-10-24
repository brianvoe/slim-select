import{d as p,f as g,S as r,_ as v,c,a as e,e as s,w as u,r as a,o as m,b as d,g as S,i as $,n as C,t as k,A as T}from"./index.js";const R=[{text:"United States",value:"US",html:'<img src="https://flagcdn.com/us.svg" class="country"/> United States'},{text:"Canada",value:"CA",html:'<img src="https://flagcdn.com/ca.svg" class="country"/> Canada'},{text:"United Kingdom",value:"UK",html:'<img src="https://flagcdn.com/gb.svg" class="country"/> United Kingdom'},{text:"Germany",value:"DE",html:'<img src="https://flagcdn.com/de.svg" class="country"/> Germany'},{text:"Japan",value:"JP",html:'<img src="https://flagcdn.com/jp.svg" class="country"/> Japan'},{text:"France",value:"FR",html:'<img src="https://flagcdn.com/fr.svg" class="country"/> France'},{text:"Italy",value:"IT",html:'<img src="https://flagcdn.com/it.svg" class="country"/> Italy'},{text:"Australia",value:"AU",html:'<img src="https://flagcdn.com/au.svg" class="country"/> Australia'},{text:"Brazil",value:"BR",html:'<img src="https://flagcdn.com/br.svg" class="country"/> Brazil'},{text:"India",value:"IN",html:'<img src="https://flagcdn.com/in.svg" class="country"/> India'},{text:"Mexico",value:"MX",html:'<img src="https://flagcdn.com/mx.svg" class="country"/> Mexico'},{text:"Russia",value:"RU",html:'<img src="https://flagcdn.com/ru.svg" class="country"/> Russia'},{text:"China",value:"CN",html:'<img src="https://flagcdn.com/cn.svg" class="country"/> China'},{text:"South Korea",value:"KR",html:'<img src="https://flagcdn.com/kr.svg" class="country"/> South Korea'},{text:"South Africa",value:"ZA",html:'<img src="https://flagcdn.com/za.svg" class="country"/> South Africa'},{text:"Argentina",value:"AR",html:'<img src="https://flagcdn.com/ar.svg" class="country"/> Argentina'},{text:"Colombia",value:"CO",html:'<img src="https://flagcdn.com/co.svg" class="country"/> Colombia'},{text:"Chile",value:"CL",html:'<img src="https://flagcdn.com/cl.svg" class="country"/> Chile'},{text:"Spain",value:"ES",html:'<img src="https://flagcdn.com/es.svg" class="country"/> Spain'},{text:"Netherlands",value:"NL",html:'<img src="https://flagcdn.com/nl.svg" class="country"/> Netherlands'},{text:"Sweden",value:"SE",html:'<img src="https://flagcdn.com/se.svg" class="country"/> Sweden'},{text:"Switzerland",value:"CH",html:'<img src="https://flagcdn.com/ch.svg" class="country"/> Switzerland'},{text:"Norway",value:"NO",html:'<img src="https://flagcdn.com/no.svg" class="country"/> Norway'},{text:"Denmark",value:"DK",html:'<img src="https://flagcdn.com/dk.svg" class="country"/> Denmark'},{text:"Finland",value:"FI",html:'<img src="https://flagcdn.com/fi.svg" class="country"/> Finland'},{text:"Belgium",value:"BE",html:'<img src="https://flagcdn.com/be.svg" class="country"/> Belgium'},{text:"Portugal",value:"PT",html:'<img src="https://flagcdn.com/pt.svg" class="country"/> Portugal'},{text:"Greece",value:"GR",html:'<img src="https://flagcdn.com/gr.svg" class="country"/> Greece'},{text:"Poland",value:"PL",html:'<img src="https://flagcdn.com/pl.svg" class="country"/> Poland'},{text:"Turkey",value:"TR",html:'<img src="https://flagcdn.com/tr.svg" class="country"/> Turkey'},{text:"Saudi Arabia",value:"SA",html:'<img src="https://flagcdn.com/sa.svg" class="country"/> Saudi Arabia'},{text:"Israel",value:"IL",html:'<img src="https://flagcdn.com/il.svg" class="country"/> Israel'},{text:"Thailand",value:"TH",html:'<img src="https://flagcdn.com/th.svg" class="country"/> Thailand'},{text:"Indonesia",value:"ID",html:'<img src="https://flagcdn.com/id.svg" class="country"/> Indonesia'},{text:"Malaysia",value:"MY",html:'<img src="https://flagcdn.com/my.svg" class="country"/> Malaysia'},{text:"Singapore",value:"SG",html:'<img src="https://flagcdn.com/sg.svg" class="country"/> Singapore'},{text:"Philippines",value:"PH",html:'<img src="https://flagcdn.com/ph.svg" class="country"/> Philippines'},{text:"New Zealand",value:"NZ",html:'<img src="https://flagcdn.com/nz.svg" class="country"/> New Zealand'},{text:"Egypt",value:"EG",html:'<img src="https://flagcdn.com/eg.svg" class="country"/> Egypt'},{text:"Vietnam",value:"VN",html:'<img src="https://flagcdn.com/vn.svg" class="country"/> Vietnam'},{text:"Peru",value:"PE",html:'<img src="https://flagcdn.com/pe.svg" class="country"/> Peru'},{text:"Pakistan",value:"PK",html:'<img src="https://flagcdn.com/pk.svg" class="country"/> Pakistan'},{text:"Bangladesh",value:"BD",html:'<img src="https://flagcdn.com/bd.svg" class="country"/> Bangladesh'},{text:"Nigeria",value:"NG",html:'<img src="https://flagcdn.com/ng.svg" class="country"/> Nigeria'},{text:"Kenya",value:"KE",html:'<img src="https://flagcdn.com/ke.svg" class="country"/> Kenya'},{text:"Morocco",value:"MA",html:'<img src="https://flagcdn.com/ma.svg" class="country"/> Morocco'},{text:"Algeria",value:"DZ",html:'<img src="https://flagcdn.com/dz.svg" class="country"/> Algeria'},{text:"Ukraine",value:"UA",html:'<img src="https://flagcdn.com/ua.svg" class="country"/> Ukraine'},{text:"Venezuela",value:"VE",html:'<img src="https://flagcdn.com/ve.svg" class="country"/> Venezuela'}],A=p({name:"Countries",data(){return{countrySelect:null}},mounted(){this.countrySelect=new r({select:this.$refs.countrySelect,data:R,settings:{contentLocation:document.getElementById("localCountry")}})},components:{ShikiStyle:g}}),N={id:"countries",class:"content"},P={class:"row"},U={ref:"countrySelect",class:"countries"};function M(n,t,i,h,f,y){const l=a("ShikiStyle");return m(),c("div",N,[t[4]||(t[4]=e("h2",{class:"header"},"Countries",-1)),t[5]||(t[5]=e("p",null," This example demonstrates how to use HTML elements within SlimSelect options to display rich content like images, icons, or custom formatting. Perfect for country selectors, product catalogs, or any scenario where visual elements enhance user experience. ",-1)),e("div",P,[e("select",U,null,512),t[0]||(t[0]=e("div",{id:"localCountry"},null,-1))]),s(l,{language:"html"},{default:u(()=>[...t[1]||(t[1]=[e("pre",null,`        <select id="selectElement" class="countries"></select>
      `,-1)])]),_:1}),s(l,{language:"css"},{default:u(()=>[...t[2]||(t[2]=[e("pre",null,`        /* Main content enlargements */
        .countries.ss-main {
          height: 50px;
          font-size: 18px;
          font-weight: bold;
        }

        /* Target the class on the img */
        .countries.ss-main .ss-single .country {
          width: 30px;
          padding: 0 8px 0 8px;
        }

        /* Target the options */
        /* Update sizing and alignment */
        .countries.ss-content .ss-option {
          display: flex;
          align-items: center;
          height: 40px;
          font-size: 14px;
          font-weight: bold;
        }

        /* Target the class on the img */
        .countries.ss-content .ss-option .country {
          width: 30px;
          padding: 0 8px 0 8px;
        }
      `,-1)])]),_:1}),s(l,{language:"javascript"},{default:u(()=>[...t[3]||(t[3]=[e("pre",null,`        // Data
        const countries = [
          { 
            text: 'United States', 
            value: 'US', 
            html: '<img src="https://flagcdn.com/us.svg" class="country"/> United States' 
          },
          { 
            text: 'Canada', 
            value: 'CA', 
            html: '<img src="https://flagcdn.com/ca.svg" class="country"/> Canada' 
          },
          {
            text: 'United Kingdom',
            value: 'UK',
            html: '<img src="https://flagcdn.com/gb.svg" class="country"/> United Kingdom'
          },
          // etc...  
        ]

        var select = new SlimSelect({
          select: '#selectElement',
          data: countries
        })
        `,-1)])]),_:1})])}const E=v(A,[["render",M]]),F=p({name:"FormReset",data(){return{single:null,multiple:null}},mounted(){this.single=new r({select:this.$refs.single}),this.multiple=new r({select:this.$refs.multiple})},methods:{onSubmitSingle(n){n.preventDefault(),alert(JSON.stringify(this.single.getSelected()))},onSubmitMultiple(n){n.preventDefault(),alert(JSON.stringify(this.multiple.getSelected()))},onFormResetSingle(n){const t=n.target;setTimeout(()=>{this.single.setSelected(Array.from(t.elements.namedItem("select").selectedOptions).map(i=>i.value),!1)})},onFormResetMultiple(n){const t=n.target;setTimeout(()=>{this.multiple.setSelected(Array.from(t.elements.namedItem("select").selectedOptions).map(i=>i.value),!1)})}},components:{ShikiStyle:g}}),V={id:"formReset",class:"content"},I={class:"row"},K={ref:"single",name:"select"},q={ref:"multiple",name:"select",multiple:""};function L(n,t,i,h,f,y){const l=a("ShikiStyle");return m(),c("div",V,[t[12]||(t[12]=e("h2",{class:"header"},"Form Reset",-1)),t[13]||(t[13]=e("p",null," This example shows how to properly handle form reset functionality with SlimSelect. When a user clicks the reset button, SlimSelect will automatically restore the select to its original selected values, maintaining consistency with the native form behavior. ",-1)),e("div",I,[e("form",{class:"row",onSubmit:t[0]||(t[0]=(...o)=>n.onSubmitSingle&&n.onSubmitSingle(...o)),onReset:t[1]||(t[1]=(...o)=>n.onFormResetSingle&&n.onFormResetSingle(...o))},[e("select",K,[...t[4]||(t[4]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2",selected:""},"Value 2",-1),e("option",{value:"value3"},"Value 3",-1)])],512),t[5]||(t[5]=e("button",{type:"submit"},"Submit",-1)),t[6]||(t[6]=e("button",{type:"reset"},"Reset form",-1))],32),e("form",{class:"row",onSubmit:t[2]||(t[2]=(...o)=>n.onSubmitMultiple&&n.onSubmitMultiple(...o)),onReset:t[3]||(t[3]=(...o)=>n.onFormResetMultiple&&n.onFormResetMultiple(...o))},[e("select",q,[...t[7]||(t[7]=[e("option",{value:"value1"},"Value 1",-1),e("option",{value:"value2",selected:""},"Value 2",-1),e("option",{value:"value3",selected:""},"Value 3",-1)])],512),t[8]||(t[8]=e("button",{type:"submit"},"Submit",-1)),t[9]||(t[9]=e("button",{type:"reset"},"Reset form",-1))],32)]),s(l,{language:"html"},{default:u(()=>[...t[10]||(t[10]=[e("pre",null,`        <form id="form">
          <select id="selectElement" name="select">
            <option value="value1">Value 1</option>
            <option value="value2" selected>Value 2</option>
            <option value="value3">Value 3</option>
          </select>
          <button type="reset">Reset form</button>
        </form>
      `,-1)])]),_:1}),s(l,{language:"javascript"},{default:u(()=>[...t[11]||(t[11]=[e("pre",null,`        var select = new SlimSelect({
          select: '#selectElement'
        })

        document.querySelector('#form').addEventListener('reset', (e) => {
          // Updating SlimSelect from actual native select element value
          select.setSelected(
            Array.from(e.target.elements.select.selectedOptions).map((option) => option.value),
            false
          )
        })
      `,-1)])]),_:1})])}const D=v(F,[["render",L]]),O=p({name:"Required",data(){return{country:null,interests:null,priority:null,message:""}},mounted(){this.country=new r({select:this.$refs.country}),this.interests=new r({select:this.$refs.interests}),this.priority=new r({select:this.$refs.priority})},methods:{onSubmit(n){if(n.preventDefault(),n.target.checkValidity()){const i={country:this.country.getSelected()[0],interests:this.interests.getSelected(),priority:this.priority.getSelected()[0]};this.message=`✅ Form is valid! Submitted data:
${JSON.stringify(i,null,2)}`}else this.message="❌ Please fill in all required fields"}},components:{ShikiStyle:g}}),B={id:"required",class:"content"},z={class:"form-group"},H={id:"country-select",ref:"country",name:"country",required:""},G={class:"form-group"},J={id:"interests-select",ref:"interests",name:"interests",multiple:"",required:""},W={class:"form-group"},j={id:"priority-select",ref:"priority",name:"priority",required:""};function Z(n,t,i,h,f,y){const l=a("ShikiStyle");return m(),c("div",B,[t[10]||(t[10]=e("h2",{class:"header"},"Required Attribute",-1)),t[11]||(t[11]=e("p",null,[S(" This example demonstrates HTML5 form validation with SlimSelect using the "),e("code",null,"required"),S(" attribute. The form will prevent submission if required fields are empty, and SlimSelect seamlessly integrates with native browser validation to provide a consistent user experience. ")],-1)),e("form",{class:"required-form",onSubmit:t[0]||(t[0]=(...o)=>n.onSubmit&&n.onSubmit(...o))},[e("div",z,[t[2]||(t[2]=e("label",{for:"country-select"},"Country *",-1)),e("select",H,[...t[1]||(t[1]=[d('<option value="">Select a country</option><option value="usa">United States</option><option value="uk">United Kingdom</option><option value="canada">Canada</option><option value="australia">Australia</option><option value="germany">Germany</option>',6)])],512)]),e("div",G,[t[4]||(t[4]=e("label",{for:"interests-select"},"Interests * (Multiple)",-1)),e("select",J,[...t[3]||(t[3]=[d('<option value="sports">Sports</option><option value="music">Music</option><option value="technology">Technology</option><option value="travel">Travel</option><option value="reading">Reading</option><option value="art">Art</option>',6)])],512)]),e("div",W,[t[6]||(t[6]=e("label",{for:"priority-select"},"Priority *",-1)),e("select",j,[...t[5]||(t[5]=[d('<option value="">Select priority level</option><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="urgent">Urgent</option>',5)])],512)]),t[7]||(t[7]=e("button",{type:"submit",class:"button"},"Submit Form",-1)),n.message?(m(),c("div",{key:0,class:C(["message",n.message.includes("✅")?"success":"error"])},[e("pre",null,k(n.message),1)],2)):$("",!0)],32),t[12]||(t[12]=e("h3",null,"HTML",-1)),s(l,{language:"html"},{default:u(()=>[...t[8]||(t[8]=[e("pre",null,`        <form id="form">
          <label for="country">Country *</label>
          <select id="country" name="country" required>
            <option value="">Select a country</option>
            <option value="usa">United States</option>
            <option value="uk">United Kingdom</option>
          </select>

          <label for="interests">Interests *</label>
          <select id="interests" name="interests" multiple required>
            <option value="sports">Sports</option>
            <option value="music">Music</option>
            <option value="technology">Technology</option>
          </select>

          <button type="submit">Submit Form</button>
        </form>
      `,-1)])]),_:1}),t[13]||(t[13]=e("h3",null,"Javascript",-1)),s(l,{language:"javascript"},{default:u(()=>[...t[9]||(t[9]=[e("pre",null,`        new SlimSelect({
          select: '#country'
        })

        new SlimSelect({
          select: '#interests'
        })

        // Browser will automatically prevent form submission
        // if required fields are not filled
        document.querySelector('#form').addEventListener('submit', (e) => {
          e.preventDefault()

          if (e.target.checkValidity()) {
            console.log('Form is valid!')
            // Submit form data
          } else {
            console.log('Form is invalid - required fields not filled')
          }
        })
      `,-1)])]),_:1}),t[14]||(t[14]=d('<div class="alert"><p><strong>How it works:</strong> SlimSelect visually hides the original select element but keeps it focusable for native HTML5 validation. This means: </p><ul><li>✅ The <code>required</code> attribute works correctly</li><li>✅ Browser validation messages appear</li><li>✅ <code>form.checkValidity()</code> works as expected</li><li>✅ No console errors about unfocusable elements</li></ul></div>',1))])}const X=v(O,[["render",Z]]),Y=p({name:"TextOverflow",data(){return{singleConstrained:null,placeholderConstrained:null,multipleConstrained:null}},mounted(){this.placeholderConstrained=new r({select:this.$refs.placeholderConstrained}),this.singleConstrained=new r({select:this.$refs.singleConstrained}),this.multipleConstrained=new r({select:this.$refs.multipleConstrained})},components:{ShikiStyle:g}}),Q={id:"textOverflow",class:"content"},_={class:"constrained-container"},tt={class:"form-group"},et={ref:"placeholderConstrained"},nt={class:"constrained-container"},lt={class:"form-group"},st={ref:"singleConstrained"},ot={class:"constrained-container"},it={class:"form-group"},at={ref:"multipleConstrained",multiple:""};function rt(n,t,i,h,f,y){const l=a("ShikiStyle");return m(),c("div",Q,[t[8]||(t[8]=e("h2",{class:"header"},"Text Overflow Handling",-1)),t[9]||(t[9]=e("p",null," This example showcases SlimSelect's intelligent text overflow handling. When text is too long for the available space, SlimSelect automatically truncates it with ellipsis (...) while keeping essential UI elements like arrows and clear buttons visible. This prevents layout breaking and maintains a clean, professional appearance. ",-1)),t[10]||(t[10]=e("div",{class:"alert info"},[e("p",null,[e("strong",null,"Feature:"),S(" Text automatically truncates with ellipsis when it would overflow, ensuring the arrow/deselect buttons remain visible. ")])],-1)),t[11]||(t[11]=e("h3",null,"Placeholder Text - Constrained Width",-1)),e("div",_,[e("div",tt,[t[1]||(t[1]=e("label",null,"Select a very long placeholder option (250px max width)",-1)),e("select",et,[...t[0]||(t[0]=[e("option",{value:"","data-placeholder":"true"}," Please choose from a very long list of available options that might exceed the container width ",-1),e("option",{value:"option1"},"Option 1",-1),e("option",{value:"option2"},"Option 2",-1),e("option",{value:"option3"},"Option 3",-1)])],512)])]),t[12]||(t[12]=e("h3",null,"Single Select - Constrained Width",-1)),e("div",nt,[e("div",lt,[t[3]||(t[3]=e("label",null,"Country (250px max width)",-1)),e("select",st,[...t[2]||(t[2]=[e("option",{value:"short"},"USA",-1),e("option",{value:"medium"},"United Kingdom",-1),e("option",{value:"long",selected:""},"Democratic People's Republic of Korea (North Korea)",-1),e("option",{value:"very-long"},"Lao People's Democratic Republic (Laos) - Southeast Asia",-1)])],512)])]),t[13]||(t[13]=e("h3",null,"Multiple Select - Constrained Width",-1)),e("div",ot,[e("div",it,[t[5]||(t[5]=e("label",null,"Features (250px max width)",-1)),e("select",at,[...t[4]||(t[4]=[d('<option value="short" selected>AI</option><option value="medium" selected>Machine Learning</option><option value="long" selected>Natural Language Processing (NLP)</option><option value="very-long" selected>Computer Vision and Image Recognition Systems</option><option value="extremely-long">Deep Learning Neural Network Architecture Optimization</option>',5)])],512)])]),t[14]||(t[14]=e("h3",null,"HTML",-1)),s(l,{language:"html"},{default:u(()=>[...t[6]||(t[6]=[e("pre",null,`        <div style="max-width: 250px;">
          <!-- Selected value with long text -->
          <select id="selectElement">
            <option value="short">USA</option>
            <option value="long" selected>
              Democratic People's Republic of Korea (North Korea)
            </option>
          </select>
          
          <!-- Placeholder with long text -->
          <select id="placeholderElement">
            <option value="" selected disabled>
              Please choose from a very long list of available options
            </option>
            <option value="option1">Option 1</option>
          </select>
        </div>
      `,-1)])]),_:1}),t[15]||(t[15]=e("h3",null,"Javascript",-1)),s(l,{language:"javascript"},{default:u(()=>[...t[7]||(t[7]=[e("pre",null,`        // Selected value with long text
        new SlimSelect({
          select: '#selectElement'
        })
        
        // Placeholder with long text
        new SlimSelect({
          select: '#placeholderElement'
        })

        // Text automatically truncates with ellipsis (...)
        // Arrow and deselect buttons remain visible
        // Works for both selected values and placeholders
      `,-1)])]),_:1}),t[16]||(t[16]=e("div",{class:"alert"},[e("p",null,[e("strong",null,"How it works:")]),e("ul",null,[e("li",null,"✅ Long text is truncated with ellipsis (...)"),e("li",null,"✅ Arrow and clear buttons stay visible"),e("li",null,"✅ No text wrapping or layout breaking"),e("li",null,"✅ Works in both single and multi-select modes"),e("li",null,"✅ Works for selected values and placeholder text"),e("li",null,"✅ Dropdown shows full text when opened")])],-1))])}const ut=v(Y,[["render",rt]]),ct=p({name:"Examples",components:{ShikiStyle:g,AdSlot:T,Countries:E,FormReset:D,Required:X,TextOverflow:ut}}),mt={id:"examples",class:"contents"};function dt(n,t,i,h,f,y){const l=a("Countries"),o=a("FormReset"),x=a("AdSlot"),w=a("Required"),b=a("TextOverflow");return m(),c("div",mt,[s(l),s(o),s(x,{"ad-slot":"1270131515"}),s(w),s(b)])}const gt=v(ct,[["render",dt]]);export{gt as default};
