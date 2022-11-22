import{d as n,S as f,_ as o,o as c,c as i,l as h,g as m,a as e,h as u,w as $,f as p}from"./index.js";const S=n({name:"SlimSelect",props:{settings:{type:Object}},data(){return{slim:null}},mounted(){let t={select:this.$refs.slim};this.settings&&(t.settings=this.settings),this.slim=new f(t)},beforeUnmount(){this.slim&&this.slim.destroy()}}),v={ref:"slim"};function g(t,r,a,l,_,d){return c(),i("select",v,[h(t.$slots,"default")],512)}const V=o(S,[["render",g]]),x=n({name:"Vue",components:{SlimSelect:V}}),w={id:"error",class:"content"},O=e("h2",{class:"header"},"Vue",-1),k={class:"row"},B=e("option",{value:"1"},"Option 1",-1),C=e("option",{value:"2"},"Option 2",-1),E=e("option",{value:"3"},"Option 3",-1),N=e("pre",null,[p("      "),e("code",{class:"language-javascript"},`
        var select = new SlimSelect({
          select: '#selectElement',
          events: {
            error: function(err) {
              console.error(err)
            }
          }
        })
      `),p(`
    `)],-1);function b(t,r,a,l,_,d){const s=m("SlimSelect");return c(),i("div",w,[O,e("div",k,[u(s,null,{default:$(()=>[B,C,E]),_:1})]),N])}const j=o(x,[["render",b]]),y=n({name:"Events",components:{Vue:j}}),T={id:"frameworks",class:"contents"};function U(t,r,a,l,_,d){const s=m("Vue");return c(),i("div",T,[u(s)])}const z=o(y,[["render",U]]);export{z as default};
