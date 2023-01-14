import{g as L,d as N,_ as A,o as $,c as M,a,e as O,f as I}from"./index.js";var B={},V={get exports(){return B},set exports(d){B=d}};(function(d,m){(function(k,v){d.exports=v()})(L,function(){return function k(v,y,S){var o=window,p="application/octet-stream",i=S||p,t=v,r=!y&&!S&&t,n=document.createElement("a"),_=function(e){return String(e)},s=o.Blob||o.MozBlob||o.WebKitBlob||_,u=y||"download",l,j;if(s=s.call?s.bind(o):Blob,String(this)==="true"&&(t=[t,i],i=t[0],t=t[1]),r&&r.length<2048&&(u=r.split("/").pop().split("?")[0],n.href=r,n.href.indexOf(r)!==-1)){var f=new XMLHttpRequest;return f.open("GET",r,!0),f.responseType="blob",f.onload=function(e){k(e.target.response,u,p)},setTimeout(function(){f.send()},0),f}if(/^data:([\w+-]+\/[\w+.-]+)?[,;]/.test(t))if(t.length>1024*1024*1.999&&s!==_)t=U(t),i=t.type||p;else return navigator.msSaveBlob?navigator.msSaveBlob(U(t),u):b(t);else if(/([\x80-\xff])/.test(t)){var g=0,C=new Uint8Array(t.length),q=C.length;for(g;g<q;++g)C[g]=t.charCodeAt(g);t=new s([C],{type:i})}l=t instanceof s?t:new s([t],{type:i});function U(e){var c=e.split(/[:;,]/),h=c[1],T=c[2]=="base64"?atob:decodeURIComponent,x=T(c.pop()),D=x.length,w=0,E=new Uint8Array(D);for(w;w<D;++w)E[w]=x.charCodeAt(w);return new s([E],{type:h})}function b(e,c){if("download"in n)return n.href=e,n.setAttribute("download",u),n.className="download-js-link",n.innerHTML="downloading...",n.style.display="none",document.body.appendChild(n),setTimeout(function(){n.click(),document.body.removeChild(n),c===!0&&setTimeout(function(){o.URL.revokeObjectURL(n.href)},250)},66),!0;if(/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent))return/^data:/.test(e)&&(e="data:"+e.replace(/^data:([\w\/\-\+]+)/,p)),window.open(e)||confirm(`Displaying New Document

Use Save As... to download, then click back to return to this page.`)&&(location.href=e),!0;var h=document.createElement("iframe");document.body.appendChild(h),!c&&/^data:/.test(e)&&(e="data:"+e.replace(/^data:([\w\/\-\+]+)/,p)),h.src=e,setTimeout(function(){document.body.removeChild(h)},333)}if(navigator.msSaveBlob)return navigator.msSaveBlob(l,u);if(o.URL)b(o.URL.createObjectURL(l),!0);else{if(typeof l=="string"||l.constructor===_)try{return b("data:"+i+";base64,"+o.btoa(l))}catch{return b("data:"+i+","+encodeURIComponent(l))}j=new FileReader,j.onload=function(e){b(this.result)},j.readAsDataURL(l)}return!0}})})(V);const R=B,J=N({name:"Install",methods:{downloadJs(){R("https://unpkg.com/slim-select@latest/dist/slimselect.min.js")},downloadCss(){R("https://unpkg.com/slim-select@latest/dist/slimselect.css")}}}),G={id:"install",class:"contents"},H=O(`<div id="npm" class="content"><h2>Npm</h2><p>Most common usage is npm</p><pre class="install-code">        <code class="language-bash">
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
      </pre></div>`,2),z={id:"download",class:"content"},F=a("h2",null,"Download",-1),K=a("p",null,"Download the latest minified umd version of slim select",-1),W=a("p",null,[I(" See full list of available downloadable options. "),a("a",{target:"_blank",href:"https://cdnjs.com/libraries/slim-select"},"cdnjs.com/libraries/slim-select")],-1);function X(d,m,k,v,y,S){return $(),M("div",G,[H,a("div",z,[F,K,W,a("div",{class:"btn",onClick:m[0]||(m[0]=o=>d.downloadJs())},"Download js"),a("div",{class:"btn",onClick:m[1]||(m[1]=o=>d.downloadCss())},"Download css")])])}const Q=A(J,[["render",X]]);export{Q as default};
