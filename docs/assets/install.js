import{g as L,d as N,_ as A,o as $,c as M,a,e as O,f as I}from"./index.js";var R={exports:{}};(function(w,c){(function(k,v){w.exports=v()})(L,function(){return function k(v,y,S){var o=window,m="application/octet-stream",i=S||m,t=v,d=!y&&!S&&t,n=document.createElement("a"),_=function(e){return String(e)},s=o.Blob||o.MozBlob||o.WebKitBlob||_,p=y||"download",l,j;if(s=s.call?s.bind(o):Blob,String(this)==="true"&&(t=[t,i],i=t[0],t=t[1]),d&&d.length<2048&&(p=d.split("/").pop().split("?")[0],n.href=d,n.href.indexOf(d)!==-1)){var u=new XMLHttpRequest;return u.open("GET",d,!0),u.responseType="blob",u.onload=function(e){k(e.target.response,p,m)},setTimeout(function(){u.send()},0),u}if(/^data:([\w+-]+\/[\w+.-]+)?[,;]/.test(t))if(t.length>1024*1024*1.999&&s!==_)t=B(t),i=t.type||m;else return navigator.msSaveBlob?navigator.msSaveBlob(B(t),p):g(t);else if(/([\x80-\xff])/.test(t)){var f=0,C=new Uint8Array(t.length),q=C.length;for(f;f<q;++f)C[f]=t.charCodeAt(f);t=new s([C],{type:i})}l=t instanceof s?t:new s([t],{type:i});function B(e){var r=e.split(/[:;,]/),b=r[1],T=r[2]=="base64"?atob:decodeURIComponent,U=T(r.pop()),D=U.length,h=0,x=new Uint8Array(D);for(h;h<D;++h)x[h]=U.charCodeAt(h);return new s([x],{type:b})}function g(e,r){if("download"in n)return n.href=e,n.setAttribute("download",p),n.className="download-js-link",n.innerHTML="downloading...",n.style.display="none",document.body.appendChild(n),setTimeout(function(){n.click(),document.body.removeChild(n),r===!0&&setTimeout(function(){o.URL.revokeObjectURL(n.href)},250)},66),!0;if(/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent))return/^data:/.test(e)&&(e="data:"+e.replace(/^data:([\w\/\-\+]+)/,m)),window.open(e)||confirm(`Displaying New Document

Use Save As... to download, then click back to return to this page.`)&&(location.href=e),!0;var b=document.createElement("iframe");document.body.appendChild(b),!r&&/^data:/.test(e)&&(e="data:"+e.replace(/^data:([\w\/\-\+]+)/,m)),b.src=e,setTimeout(function(){document.body.removeChild(b)},333)}if(navigator.msSaveBlob)return navigator.msSaveBlob(l,p);if(o.URL)g(o.URL.createObjectURL(l),!0);else{if(typeof l=="string"||l.constructor===_)try{return g("data:"+i+";base64,"+o.btoa(l))}catch{return g("data:"+i+","+encodeURIComponent(l))}j=new FileReader,j.onload=function(e){g(this.result)},j.readAsDataURL(l)}return!0}})})(R);const E=R.exports,V=N({name:"Install",methods:{downloadJs(){E("https://unpkg.com/slim-select@latest/dist/slimselect.min.js")},downloadCss(){E("https://unpkg.com/slim-select@latest/dist/slimselect.css")}}}),J={id:"install",class:"contents"},G=O(`<div id="npm" class="content"><h2>Npm</h2><p>Most common usage is npm</p><pre class="install-code">        <code class="language-bash">
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
              
              &lt;script&gt;
                new SlimSelect({
                  select: &#39;#selectElement&#39;
                })
              &lt;script&gt;
            &lt;/head&gt;
            &lt;body&gt;
              &lt;select id=&quot;selectElement&quot;&gt;
                &lt;option&gt;Option 1&lt;/option&gt;
                &lt;option&gt;Option 2&lt;/option&gt;
                &lt;option&gt;Option 3&lt;/option&gt;
              &lt;/select&gt;
            &lt;/body&gt;
          &lt;/html&gt;
        </code>
      </pre></div>`,2),H={id:"download",class:"content"},z=a("h2",null,"Download",-1),F=a("p",null,"Download the latest minified umd version of slim select",-1),K=a("p",null,[I(" See full list of available downloadable options. "),a("a",{target:"_blank",href:"https://cdnjs.com/libraries/slim-select"},"cdnjs.com/libraries/slim-select")],-1);function W(w,c,k,v,y,S){return $(),M("div",J,[G,a("div",H,[z,F,K,a("div",{class:"btn",onClick:c[0]||(c[0]=o=>w.downloadJs())},"Download js"),a("div",{class:"btn",onClick:c[1]||(c[1]=o=>w.downloadCss())},"Download css")])])}const P=A(V,[["render",W]]);export{P as default};
