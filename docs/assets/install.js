import{e as N,d as $,_ as O,o as V,c as I,a as n,f as B,t as R,b as M}from"./index.js";var U={exports:{}};(function(d,y){(function(w,g){d.exports=g()})(N,function(){return function w(g,j,_){var o=window,p="application/octet-stream",c=_||p,e=g,a=!j&&!_&&e,s=document.createElement("a"),k=function(t){return String(t)},i=o.Blob||o.MozBlob||o.WebKitBlob||k,m=j||"download",l,S;if(i=i.call?i.bind(o):Blob,String(this)==="true"&&(e=[e,c],c=e[0],e=e[1]),a&&a.length<2048&&(m=a.split("/").pop().split("?")[0],s.href=a,s.href.indexOf(a)!==-1)){var u=new XMLHttpRequest;return u.open("GET",a,!0),u.responseType="blob",u.onload=function(t){w(t.target.response,m,p)},setTimeout(function(){u.send()},0),u}if(/^data:([\w+-]+\/[\w+.-]+)?[,;]/.test(e))if(e.length>1024*1024*1.999&&i!==k)e=C(e),c=e.type||p;else return navigator.msSaveBlob?navigator.msSaveBlob(C(e),m):f(e);else if(/([\x80-\xff])/.test(e)){var b=0,x=new Uint8Array(e.length),A=x.length;for(b;b<A;++b)x[b]=e.charCodeAt(b);e=new i([x],{type:c})}l=e instanceof i?e:new i([e],{type:c});function C(t){var r=t.split(/[:;,]/),h=r[1],E=r[2]=="base64"?atob:decodeURIComponent,T=E(r.pop()),D=T.length,v=0,L=new Uint8Array(D);for(v;v<D;++v)L[v]=T.charCodeAt(v);return new i([L],{type:h})}function f(t,r){if("download"in s)return s.href=t,s.setAttribute("download",m),s.className="download-js-link",s.innerHTML="downloading...",s.style.display="none",document.body.appendChild(s),setTimeout(function(){s.click(),document.body.removeChild(s),r===!0&&setTimeout(function(){o.URL.revokeObjectURL(s.href)},250)},66),!0;if(/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent))return/^data:/.test(t)&&(t="data:"+t.replace(/^data:([\w\/\-\+]+)/,p)),window.open(t)||confirm(`Displaying New Document

Use Save As... to download, then click back to return to this page.`)&&(location.href=t),!0;var h=document.createElement("iframe");document.body.appendChild(h),!r&&/^data:/.test(t)&&(t="data:"+t.replace(/^data:([\w\/\-\+]+)/,p)),h.src=t,setTimeout(function(){document.body.removeChild(h)},333)}if(navigator.msSaveBlob)return navigator.msSaveBlob(l,m);if(o.URL)f(o.URL.createObjectURL(l),!0);else{if(typeof l=="string"||l.constructor===k)try{return f("data:"+c+";base64,"+o.btoa(l))}catch{return f("data:"+c+","+encodeURIComponent(l))}S=new FileReader,S.onload=function(t){f(this.result)},S.readAsDataURL(l)}return!0}})})(U);const H=U.exports,G="slim-select",q="Slim advanced select dropdown",z="2.0.0",J="Brian Voelker <brian@webiswhatido.com> (http://webiswhatido.com)",K="https://slimselectjs.com",W="MIT",X={url:"https://github.com/brianvoe/slim-select/issues"},F="dist/slimselect.js",P="dist/slimselect.es.js",Q="dist/slimselect.js",Y="dist/index.d.ts",Z="dist/index.d.ts",ee="dist/slimselect.css",te="src/slim-select/slimselect.scss",se={type:"git",url:"git+https://github.com/brianvoe/slim-select.git"},ne=["select","vanilla","dropdown","search","multiselect"],oe={jestinit:"ts-jest config:init",dev:"vite --port=1111",format:'prettier --write --cache --parser typescript "src/**/*.ts"',build:"npm run build:clean && npm run build:docs && npm run build:library","build:clean":"rimraf ./dist/*","build:docs":"vite build","build:library":"npm run build:library:js && npm run build:library:css","build:library:js":"cd src/slim-select && rollup --config ./rollup.config.mjs && cd ../../","build:library:css":"cd src/slim-select && sass ./slimselect.scss ../../dist/slimselect.css --style=compressed && cd ../../",test:"jest"},ie={"@jest/globals":"^29.3.1","@rollup/plugin-typescript":"^9.0.2","@types/downloadjs":"^1.4.3","@vitejs/plugin-vue":"^3.2.0",clipboard:"^2.0.11",downloadjs:"^1.4.7",jest:"^29.3.1","jest-environment-jsdom":"^29.3.1",prettier:"^2.7.1",prismjs:"^1.29.0",rimraf:"^3.0.2",rollup:"^2.79.1","rollup-plugin-terser":"^7.0.2",sass:"^1.56.1","ts-jest":"^29.0.3",tslib:"^2.4.1",typescript:"^4.9.3",vite:"^3.2.4",vue:"^3.2.45","vue-router":"^4.1.6","vue-tsc":"^1.0.9",vuex:"^4.0.2"},le={name:G,description:q,version:z,author:J,homepage:K,license:W,bugs:X,main:F,module:P,unpkg:Q,types:Y,typings:Z,style:ee,sass:te,repository:se,keywords:ne,scripts:oe,devDependencies:ie},ce=$({name:"Install",data:()=>({version:le.version}),methods:{downloadLink(){H(`https://cdnjs.cloudflare.com/ajax/libs/slim-select/${this.version}/slimselect.min.js`)}}}),ae={id:"install",class:"contents"},re=M(`<div id="npm" class="content"><h2>Npm</h2><p>Most common usage is npm</p><pre class="install-code">        <code class="language-bash">
          npm install slim-select
        </code>
      </pre><pre class="example-code">        <code class="language-javascript">
          import SlimSelect from &#39;slim-select&#39;

          new SlimSelect({
            select: &#39;#selectElement&#39;
          })
        </code>
      </pre></div>`,1),de={id:"cdn",class:"content"},pe=n("h2",null,"Cdn",-1),me=n("p",null,"Cdn has a url link you can grab.",-1),ue=n("p",null,[B(" See full list of available options. "),n("a",{target:"_blank",href:"https://cdnjs.com/libraries/slim-select"},"cdnjs.com/libraries/slim-select")],-1),be=n("div",{class:"alert info"},"New releases may be delayed until the next time its indexed",-1),fe={class:"install-code"},he={class:"language-html"},ve={id:"download",class:"content"},ge=n("h2",null,"Download",-1),ye=n("p",null,"Download the latest minified version of slim select",-1);function we(d,y,w,g,j,_){return V(),I("div",ae,[re,n("div",de,[pe,me,ue,be,n("pre",fe,[B("        "),n("code",he,`
          <html>
            <head>
              <script src="https://cdnjs.cloudflare.com/ajax/libs/slim-select/`+R(d.version)+`/slimselect.js"><\/script>
              <link href="https://cdnjs.cloudflare.com/ajax/libs/slim-select/`+R(d.version)+`/slimselect.css" rel="stylesheet"></link>
              
              <script>
                new SlimSelect({
                  select: '#selectElement'
                })
              <script>
            </head>
            <body>
              <select id="selectElement">
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </body>
          </html>
        `,1),B(`
      `)])]),n("div",ve,[ge,ye,n("div",{class:"btn",onClick:y[0]||(y[0]=o=>d.downloadLink())},"Click Here To Download")])])}const _e=O(ce,[["render",we]]);export{_e as default};
