import{g as N,h as A,d as $,_ as M,c as O,b as I,a as r,e as V,o as _}from"./index.js";var q={exports:{}};(function(w,n){(function(k,v){w.exports=v()})(N,function(){return function k(v,y,S){var s=window,m="application/octet-stream",a=S||m,t=v,d=!y&&!S&&t,o=document.createElement("a"),j=function(e){return String(e)},l=s.Blob||s.MozBlob||s.WebKitBlob||j,p=y||"download",i,C;if(l=l.call?l.bind(s):Blob,String(this)==="true"&&(t=[t,a],a=t[0],t=t[1]),d&&d.length<2048&&(p=d.split("/").pop().split("?")[0],o.href=d,o.href.indexOf(d)!==-1)){var u=new XMLHttpRequest;return u.open("GET",d,!0),u.responseType="blob",u.onload=function(e){k(e.target.response,p,m)},setTimeout(function(){u.send()},0),u}if(/^data:([\w+-]+\/[\w+.-]+)?[,;]/.test(t))if(t.length>1024*1024*1.999&&l!==j)t=U(t),a=t.type||m;else return navigator.msSaveBlob?navigator.msSaveBlob(U(t),p):g(t);else if(/([\x80-\xff])/.test(t)){var f=0,B=new Uint8Array(t.length),T=B.length;for(f;f<T;++f)B[f]=t.charCodeAt(f);t=new l([B],{type:a})}i=t instanceof l?t:new l([t],{type:a});function U(e){var c=e.split(/[:;,]/),b=c[1],L=c[2]=="base64"?atob:decodeURIComponent,x=L(c.pop()),D=x.length,h=0,E=new Uint8Array(D);for(h;h<D;++h)E[h]=x.charCodeAt(h);return new l([E],{type:b})}function g(e,c){if("download"in o)return o.href=e,o.setAttribute("download",p),o.className="download-js-link",o.innerHTML="downloading...",o.style.display="none",document.body.appendChild(o),setTimeout(function(){o.click(),document.body.removeChild(o),c===!0&&setTimeout(function(){s.URL.revokeObjectURL(o.href)},250)},66),!0;if(/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent))return/^data:/.test(e)&&(e="data:"+e.replace(/^data:([\w\/\-\+]+)/,m)),window.open(e)||confirm(`Displaying New Document

Use Save As... to download, then click back to return to this page.`)&&(location.href=e),!0;var b=document.createElement("iframe");document.body.appendChild(b),!c&&/^data:/.test(e)&&(e="data:"+e.replace(/^data:([\w\/\-\+]+)/,m)),b.src=e,setTimeout(function(){document.body.removeChild(b)},333)}if(navigator.msSaveBlob)return navigator.msSaveBlob(i,p);if(s.URL)g(s.URL.createObjectURL(i),!0);else{if(typeof i=="string"||i.constructor===j)try{return g("data:"+a+";base64,"+s.btoa(i))}catch{return g("data:"+a+","+encodeURIComponent(i))}C=new FileReader,C.onload=function(e){g(this.result)},C.readAsDataURL(i)}return!0}})})(q);var J=q.exports;const R=A(J),F=$({name:"Install",methods:{downloadJs(){R("https://unpkg.com/slim-select@latest/dist/slimselect.min.js")},downloadCss(){R("https://unpkg.com/slim-select@latest/dist/slimselect.css")}}}),G={id:"install",class:"contents"},H={id:"download",class:"content"};function z(w,n,k,v,y,S){return _(),O("div",G,[n[5]||(n[5]=I(`<div id="npm" class="content"><h2>Npm</h2><p>Most common usage is npm</p><pre class="install-code">        <code class="language-bash">
          npm install slim-select
        </code>
      </pre><pre class="example-code">        <code class="language-javascript">
          import SlimSelect from &#39;slim-select&#39;

          new SlimSelect({
            select: &#39;#selectElement&#39;
          })
        </code>
      </pre></div><div id="cdn" class="content"><h2>Cdn</h2><p> Cdn has a url link you can grab. Cdn exists on both <a target="_blank" href="https://cdnjs.com">cdnjs.com</a> and <a target="_blank" href="https://unpkg.com">unpkg.com</a></p><p> See full list of available options.<br><strong>cdnjs</strong> - <a target="_blank" href="https://cdnjs.com/libraries/slim-select">cdnjs.com/libraries/slim-select</a><br><strong>unpkg</strong> - <a target="_blank" href="https://unpkg.com/browse/slim-select/dist/">https://unpkg.com/browse/slim-select/dist/</a></p><ul><li>slimselct.js - UMD unminified</li><li>slimselct.min.js - UMD minified</li><li>slimselect.cjs.js - CommonJS (for Node) and ES module (for bundlers) build</li><li>slimselect.umd.js - UMD build for browsers</li><li>slimselect.es.js - ES module build for modern browsers</li><li>slimselect.global.js - IIFE build for modern browsers</li></ul><div class="alert info">New releases may be delayed until the next time its indexed</div><pre class="install-code">        <code class="language-html">
          &lt;html&gt;
            &lt;head&gt;
              &lt;script src=&quot;https://unpkg.com/slim-select@latest/dist/slimselect.min.js&quot;&gt;&lt;/script&gt;
              &lt;link href=&quot;https://unpkg.com/slim-select@latest/dist/slimselect.css&quot; rel=&quot;stylesheet&quot;&gt;&lt;/link&gt;
            &lt;/head&gt;
            &lt;body&gt;
              &lt;select id=&quot;selectElement&quot;&gt;
                &lt;option&gt;Option 1&lt;/option&gt;
                &lt;option&gt;Option 2&lt;/option&gt;
                &lt;option&gt;Option 3&lt;/option&gt;
              &lt;/select&gt;
              &lt;script&gt;
                new SlimSelect({
                  select: &#39;#selectElement&#39;
                })
              &lt;/script&gt;
            &lt;/body&gt;
          &lt;/html&gt;
        </code>
      </pre></div>`,2)),r("div",H,[n[2]||(n[2]=r("h2",null,"Download",-1)),n[3]||(n[3]=r("p",null,"Download the latest minified umd version of slim select",-1)),n[4]||(n[4]=r("p",null,[V(" See full list of available downloadable options. "),r("a",{target:"_blank",href:"https://cdnjs.com/libraries/slim-select"},"cdnjs.com/libraries/slim-select")],-1)),r("div",{class:"btn",onClick:n[0]||(n[0]=s=>w.downloadJs())},"Download js"),r("div",{class:"btn",onClick:n[1]||(n[1]=s=>w.downloadCss())},"Download css")])])}const W=M(F,[["render",z]]);export{W as default};
