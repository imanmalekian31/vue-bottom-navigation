"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("vue"),t=require("vue-router"),n=function(){return n=Object.assign||function(e){for(var t,n=1,o=arguments.length;n<o;n++)for(var l in t=arguments[n])Object.prototype.hasOwnProperty.call(t,l)&&(e[l]=t[l]);return e},n.apply(this,arguments)};function o(e,t,n){if(n||2===arguments.length)for(var o,l=0,a=t.length;l<a;l++)!o&&l in t||(o||(o=Array.prototype.slice.call(t,0,l)),o[l]=t[l]);return e.concat(o||Array.prototype.slice.call(t))}var l=function(t){return e.pushScopeId("data-v-02d52b78"),t=t(),e.popScopeId(),t},a={class:"btn-container"},r=["onClick"],i={class:"active-label"},c={key:0,class:"btn-badge"},u={class:"btn-title"},d={class:"btn-child-parent"},s=["onClick"],v={class:"btn-child-title"},f={key:0,class:"btn-child-badge"},p={id:"sweep"},m=[l((function(){return e.createElementVNode("div",{id:"sweep-right"},null,-1)})),l((function(){return e.createElementVNode("div",{id:"sweep-center"},null,-1)})),l((function(){return e.createElementVNode("div",{id:"sweep-left"},null,-1)}))],h=e.defineComponent({__name:"CurvedBottomNavigation",props:{modelValue:{type:[Number,String,null],required:!0,default:null},options:{type:Array,required:!0,default:function(){return[]}},foregroundColor:{type:String,required:!1,default:"#42A5F5"},backgroundColor:{type:String,required:!1,default:"#FFFFFF"},iconColor:{type:String,required:!1,default:"#0000008A"},badgeColor:{type:String,required:!1,default:"#FBC02D"},replaceRoute:{type:Boolean,required:!1,default:!1}},emits:["update:modelValue"],setup:function(l,h){var g=h.emit,b=l,y=t.useRouter(),k=t.useRoute(),B=e.ref([]),C=e.ref(!1),N=e.ref(!0),V=e.computed((function(){var e=((B.value.find((function(e){return e.isActive}))||{}).childs||[]).length;return{"--color-foreground":b.foregroundColor,"--color-background":b.backgroundColor,"--color-icon":b.iconColor,"--color-badge":b.badgeColor,"--width-parent":"".concat(45*e,"px")}})),E=e.computed((function(){return B.value.find((function(e){return e.isActive}))}));function w(){var e="",t=document.querySelector(".btn-container").offsetWidth||window.innerWidth;b.options.forEach((function(n,o){var l=45*(n.childs||[]).length/2-35,a=".btn-item-".concat(o,".checked .btn-class-showable .btn-child-parent");(n.childs||[]).length>1&&(0===o&&F(n)&&(e+="".concat(a,"{transform:translateX(").concat(l,"px)}")),o===b.options.length-1&&F(n)&&(e+="".concat(a,"{transform:translateX(-").concat(l,"px)}")));var r=t/b.options.length;e+=".btn-item-".concat(o,"{width:").concat(r,"px !important;}");var i=o*t/b.options.length+t/b.options.length/4;e+=".btn-item-".concat(o,".checked ~ #sweep{transform:translateX(").concat(i,"px)}"),F(n)&&(n.childs||[]).forEach((function(t,l){e+=".btn-item-".concat(o,".checked .btn-class-showable .btn-child:nth-child(").concat(l+1,"){transform:translateX(").concat(45*(.5+l)-45*(n.childs||[]).length/2,"px)}")}))})),document.getElementById("sweep").style.left="\n      ".concat(t/b.options.length/4-67.5,"px");var n=document.getElementsByTagName("head")[0],o=document.createElement("style");o.id="bottom-navigation-style",o.styleSheet?o.styleSheet.cssText=e:o.appendChild(document.createTextNode(e)),n.appendChild(o)}function S(e,t){void 0===t&&(t=!1),B.value.forEach((function(t){return t.isActive=_(t,e.id)})),t||(g("update:modelValue",e.id),N.value=!1,setTimeout((function(){N.value=!0}),0),e.path&&Object.keys(e.path).length&&(b.replaceRoute?y.replace(e.path).catch((function(){})):y.push(e.path)))}function x(){C.value=!C.value}function _(e,t){return void 0===t&&(t=b.modelValue),e.id==t||Boolean((e.childs||[]).find((function(e){return e.id==t})))}function q(){e.nextTick((function(){var e=document.getElementById("bottom-navigation-style");e&&e.remove()})),w()}function F(e){return Boolean((e.childs||[]).length)}return e.watch((function(){return b.modelValue}),(function(e,t){if(e!=t&&N.value){var n=[];B.value.forEach((function(e){F(e)&&e.childs&&n.push.apply(n,e.childs)}));var l=o(o([],B.value,!0),n,!0).find((function(t){return t.id==e}));l&&S(l,F(l))}})),e.watch((function(){return b.options}),(function(e){e&&(B.value=e.map((function(e){return n(n({},e),{isActive:_(e)})})),w())}),{deep:!0}),e.watch(k,(function(t){t&&e.nextTick((function(){var e=[];B.value.forEach((function(t){F(t)&&t.childs&&e.push.apply(e,t.childs)}));var n=o(o([],B.value,!0),e,!0).filter((function(e){return e.path})).find((function(e){return"string"==typeof e.path?e.path===t.path:(e.path||{}).name===t.name}));n&&S(n,F(n))}))}),{immediate:!0}),e.onMounted((function(){w(),window.addEventListener("resize",q)})),e.onBeforeUnmount((function(){return window.removeEventListener("resize",q)})),B.value=b.options.map((function(e){return n(n({},e),{isActive:_(e)})})),function(t,n){return e.openBlock(),e.createElementBlock("div",{class:"btn-container_foreground",style:e.normalizeStyle(V.value)},[e.createElementVNode("div",a,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(B.value,(function(n,o){var l,a;return e.openBlock(),e.createElementBlock("div",{key:"label-".concat(o),class:e.normalizeClass((l={},l["btn-item-".concat(o," labels btn-item")]=!0,l.checked=n.isActive,l.unchecked=!n.isActive,l)),onClick:function(e){return function(e){C.value&&!e.isActive||x(),S(e,F(e))}(n)}},[e.createElementVNode("div",i,[n.badge?(e.openBlock(),e.createElementBlock("div",c,e.toDisplayString(n.badge),1)):e.createCommentVNode("v-if",!0),e.renderSlot(t.$slots,"icon",{props:n},(function(){return[e.createElementVNode("i",{class:e.normalizeClass("".concat(n.icon))},null,2)]}))]),e.createElementVNode("div",u,[e.renderSlot(t.$slots,"title",{props:n},(function(){return[e.createTextVNode(e.toDisplayString(n.title),1)]}))]),F(n)?(e.openBlock(),e.createElementBlock("div",{key:0,class:e.normalizeClass((a={},a["btn-super-parent"]=n.isActive,a["btn-class-showable"]=C.value,a))},[e.createElementVNode("div",d,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(n.childs||[],(function(n,o){return e.openBlock(),e.createElementBlock("div",{key:o,class:"btn-child",onClick:e.withModifiers((function(e){return function(e){S(e),x()}(n)}),["stop"])},[e.renderSlot(t.$slots,"child-icon",{props:n},(function(){return[e.createElementVNode("i",{class:e.normalizeClass("".concat(n.icon))},null,2)]})),e.createElementVNode("span",v,[e.renderSlot(t.$slots,"child-title",{props:n},(function(){return[e.createTextVNode(e.toDisplayString(n.title),1)]}))]),n.badge?(e.openBlock(),e.createElementBlock("div",f,e.toDisplayString(n.badge),1)):e.createCommentVNode("v-if",!0)],8,s)})),128))])],2)):e.createCommentVNode("v-if",!0)],10,r)})),128)),e.withDirectives(e.createElementVNode("div",p,m,512),[[e.vShow,E.value]])])],4)}}});h.__scopeId="data-v-02d52b78",h.__file="src/components/CurvedBottomNavigation.vue";var g=["to","onClick"],b={class:"gr-btn-title"},y={class:"gr-hidden-title"},k=e.defineComponent({__name:"GrowBottomNavigation",props:{modelValue:{type:[Number,String,null],required:!0,default:null},options:{type:Array,required:!0,default:function(){return[]}},color:{type:String,required:!1,default:"#74CBBB"},replaceRoute:{type:Boolean,required:!1,default:!1}},emits:["update:modelValue"],setup:function(n,o){var l=o.emit,a=n,r=t.useRouter(),i=t.useRoute(),c=e.ref(0),u=e.ref(0),d=e.ref([]),s=e.ref(!0),v=e.computed((function(){var e=(d.value[u.value]||{}).title,t=95;e&&15*e.length>110&&(t=95+(15*e.length-110)/2);var n=(d.value[u.value]||{}).color||a.color;return{"--color":n,"--color-background":n+"30","--active-width":"".concat(t,"px")}}));function f(e,t){t!==u.value&&(u.value=t,null!==c.value&&(d.value[c.value].selected=!1),d.value[t].selected=!0,c.value=u.value,function(e){l("update:modelValue",e.id),s.value=!1,setTimeout((function(){s.value=!0}),0),e.path&&Object.keys(e.path).length&&(a.replaceRoute?r.replace(e.path).catch((function(){})):r.push(e.path))}(e))}e.watch((function(){return a.modelValue}),(function(e,t){if(e!=t&&s.value){var n=d.value.findIndex((function(t){return t.id==e}));n>-1&&f(d.value[n],n)}})),e.watch(i,(function(t){t&&e.nextTick((function(){var e=d.value.findIndex((function(e){return"string"==typeof e.path?e.path===t.path:(e.path||{}).name===t.name}));e>-1&&f(d.value[e],e)}))}),{immediate:!0}),d.value=a.options.slice();var p=d.value.findIndex((function(e){return e.id==a.modelValue||"object"==typeof e.path&&(e.path||{}).name==(i||{}).name}));return p>-1&&(u.value=p,c.value=p,d.value[p].selected=!0),function(t,n){return e.openBlock(),e.createElementBlock("div",{class:"gr-btn-container-foreground",style:e.normalizeStyle(v.value)},[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(d.value,(function(n,o){return e.openBlock(),e.createElementBlock("div",{key:"grow-button-".concat(o),class:e.normalizeClass(["gr-btn-container",{"gr-btn-container-active":n.selected}]),to:n.path,onClick:function(e){return f(n,o)}},[e.createElementVNode("div",{class:e.normalizeClass(["gr-btn-item",{"gr-btn-item-active":n.selected}])},[e.createElementVNode("div",{class:e.normalizeClass(["gr-btn-icon",{"gr-btn-icon-active":n.selected}])},[e.renderSlot(t.$slots,"icon",{props:n},(function(){return[e.createElementVNode("i",{class:e.normalizeClass("".concat(n.icon))},null,2)]}))],2),e.createElementVNode("div",b,[e.createElementVNode("span",y,[e.renderSlot(t.$slots,"title",{props:n},(function(){return[e.createTextVNode(e.toDisplayString(n.title),1)]}))]),e.createElementVNode("span",{class:e.normalizeClass(["gr-animated-title",{"gr-animated-title-active":n.selected}])},[e.renderSlot(t.$slots,"title",{props:n},(function(){return[e.createTextVNode(e.toDisplayString(n.title),1)]}))],2)])],2)],10,g)})),128))],4)}}});k.__scopeId="data-v-7301d7fc",k.__file="src/components/GrowBottomNavigation.vue";var B=["onClick"],C={class:"rg-btn-item"},N={key:0,class:"rg-btn-badge"},V=e.defineComponent({__name:"RingBottomNavigation",props:{modelValue:{type:[Number,String,null],required:!0,default:null},options:{type:Array,required:!0,default:function(){return[]}},titleColor:{type:String,required:!1,default:"#669C35"},borderColor:{type:String,required:!1,default:"#4F7A28"},badgeColor:{type:String,required:!1,default:"#FBC02D"},iconColor:{type:String,required:!1},replaceRoute:{type:Boolean,required:!1,default:!1}},emits:["update:modelValue"],setup:function(n,o){var l=o.emit,a=n,r=t.useRouter(),i=t.useRoute(),c=e.ref(0),u=e.ref(0),d=e.ref([]),s=e.ref(!0),v=e.computed((function(){return{"--border-color":a.borderColor,"--icon-color":a.iconColor,"--background-color":a.backgroundColor,"--title-color":a.titleColor,"--badge-color":a.badgeColor}}));function f(e,t){if(t!==u.value){if(u.value=t,null!==c.value){var n=c.value;setTimeout((function(){d.value[n].deselect=!1}),100),d.value[c.value].selected=!1,d.value[c.value].deselect=!0}d.value[t].selected=!0,c.value=u.value,function(e){l("update:modelValue",e.id),s.value=!1,setTimeout((function(){s.value=!0}),0),e.path&&Object.keys(e.path).length&&(a.replaceRoute?r.replace(e.path).catch((function(){})):r.push(e.path))}(e)}}e.watch((function(){return a.modelValue}),(function(e,t){if(e!=t&&s.value){var n=d.value.findIndex((function(t){return t.id==e}));n>-1&&f(d.value[n],n)}})),e.watch(i,(function(t){t&&e.nextTick((function(){var e=d.value.findIndex((function(e){return"string"==typeof e.path?e.path===t.path:(e.path||{}).name===t.name}));e>-1&&f(d.value[e],e)}))}),{immediate:!0}),d.value=a.options.slice();var p=d.value.findIndex((function(e){return e.id==a.modelValue||"object"==typeof e.path&&(e.path||{}).name==(i||{}).name}));return p>-1&&(u.value=p,c.value=p,d.value[p].selected=!0),function(t,n){return e.openBlock(),e.createElementBlock("div",{class:"rg-btn-container-foreground",style:e.normalizeStyle(v.value)},[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(d.value,(function(n,o){return e.openBlock(),e.createElementBlock("div",{key:"ring-btn-".concat(o),class:"rg-btn-container",onClick:function(e){return f(n,o)}},[e.createElementVNode("div",C,[e.createElementVNode("div",{class:e.normalizeClass([{"rg-btn-border":n.selected},{"rg-btn-border-deselect":n.deselect}])},null,2),e.createElementVNode("div",{class:e.normalizeClass(["rg-btn-icon",{"rg-btn-icon-active":n.selected},{"rg-btn-icon-deselect":n.deselect}])},[e.renderSlot(t.$slots,"icon",{props:n},(function(){return[e.createElementVNode("i",{class:e.normalizeClass("".concat(n.icon))},null,2)]})),n.badge?(e.openBlock(),e.createElementBlock("div",N)):e.createCommentVNode("v-if",!0)],2),e.createElementVNode("div",{class:e.normalizeClass(["rg-btn-title",{"rg-btn-title-active":n.selected}])},[e.renderSlot(t.$slots,"title",{props:n},(function(){return[e.createTextVNode(e.toDisplayString(n.title),1)]}))],2)])],8,B)})),128))],4)}}});V.__scopeId="data-v-a2867cc2",V.__file="src/components/RingBottomNavigation.vue";var E=["onClick"],w={class:"sm-btn-item"},S=e.defineComponent({__name:"SwipeBottomNavigation",props:{modelValue:{type:[Number,String,null],required:!0,default:null},options:{type:Array,required:!0,default:function(){return[]}},swiperColor:{type:String,required:!1,default:"#8066C7"},backgroundColor:{type:String,required:!1,default:"#FFFFFF"},iconColor:{type:String,required:!1,default:"#8066C7"},replaceRoute:{type:Boolean,required:!1,default:!1}},emits:["update:modelValue"],setup:function(n,o){var l=o.emit,a=n,r=t.useRouter(),i=t.useRoute(),c=e.ref(0),u=e.ref(0),d=e.ref([]),s=e.ref(!0),v=e.ref(0),f=e.ref(),p=e.ref(),m=e.computed((function(){return{"--swiper-color":a.swiperColor,"--icon-color":a.iconColor,"--background-color":a.backgroundColor}}));function h(){p.value&&Array.isArray(p.value)&&(v.value=p.value[0].offsetWidth),f.value&&(f.value.style.width=v.value+"px",f.value.style.transform="translateX(".concat(v.value*u.value,"px)"))}function g(){h()}function b(e,t){t!==u.value&&(u.value=t,null!==c.value&&(d.value[c.value].selected=!1),d.value[t].selected=!0,c.value=u.value,function(e){l("update:modelValue",e.id),s.value=!1,setTimeout((function(){s.value=!0}),0),e.path&&Object.keys(e.path).length&&(a.replaceRoute?r.replace(e.path).catch((function(){})):r.push(e.path))}(e))}e.watch((function(){return u.value}),(function(e){f.value&&(f.value.style.transform="translateX(".concat(v.value*e,"px)"))})),e.watch((function(){return a.modelValue}),(function(e,t){if(e!=t&&s.value){var n=d.value.findIndex((function(t){return t.id==e}));n>-1&&b(d.value[n],n)}})),e.watch(i,(function(t){t&&e.nextTick((function(){var e=d.value.findIndex((function(e){return"string"==typeof e.path?e.path===t.path:(e.path||{}).name===t.name}));e>-1&&b(d.value[e],e)}))}),{immediate:!0}),e.onMounted((function(){h(),window.addEventListener("resize",g)})),e.onBeforeUnmount((function(){return window.removeEventListener("resize",g)})),d.value=a.options.slice();var y=d.value.findIndex((function(e){return e.id==a.modelValue||"object"==typeof e.path&&(e.path||{}).name==(i||{}).name}));return y>-1&&(u.value=y,c.value=y,d.value[y].selected=!0),function(t,n){return e.openBlock(),e.createElementBlock("div",{class:"sm-btn-container-foreground",style:e.normalizeStyle(m.value)},[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(d.value,(function(n,o){return e.openBlock(),e.createElementBlock("div",{key:"simple-btn-".concat(o),ref_for:!0,ref_key:"btnContainerRef",ref:p,class:"sm-btn-container",onClick:function(e){return b(n,o)}},[e.createElementVNode("div",w,[e.createElementVNode("div",{class:e.normalizeClass(["sm-btn-icon",{"sm-btn-icon-active":n.selected}])},[e.renderSlot(t.$slots,"icon",{props:n},(function(){return[e.createElementVNode("i",{class:e.normalizeClass("".concat(n.icon))},null,2)]}))],2),e.createElementVNode("div",{class:e.normalizeClass(["sm-btn-title",{"sm-btn-title-active":n.selected}])},[e.renderSlot(t.$slots,"title",{props:n},(function(){return[e.createTextVNode(e.toDisplayString(n.title),1)]}))],2)])],8,E)})),128)),e.createElementVNode("div",{ref_key:"borderSwiperRef",ref:f,class:"border-swiper"},null,512)],4)}}});S.__scopeId="data-v-22a64d79",S.__file="src/components/SwipeBottomNavigation.vue";var x=["onClick"],_={class:"wn-btn-item"},q={key:0,class:"wn-btn-badge"},F=e.defineComponent({__name:"WindowsBottomNavigation",props:{modelValue:{type:[Number,String,null],required:!0,default:null},options:{type:Array,required:!0,default:function(){return[]}},borderColor:{type:String,required:!1,default:"#9B9B9B"},backgroundColor:{type:String,required:!1,default:"#FFFFFF"},badgeColor:{type:String,required:!1,default:"#828282"},replaceRoute:{type:Boolean,required:!1,default:!1}},emits:["update:modelValue"],setup:function(n,o){var l=o.emit,a=n,r=t.useRouter(),i=t.useRoute(),c=e.ref(0),u=e.ref(0),d=e.ref([]),s=e.ref(!0),v=e.computed((function(){return{"--border-color":a.borderColor,"--background-color":a.backgroundColor,"--badge-color":a.badgeColor}}));function f(e,t){if(t!==u.value){if(u.value=t,null!==c.value){var n=c.value;setTimeout((function(){d.value[n].deselect=!1}),300),d.value[c.value].selected=!1,d.value[c.value].deselect=!0}d.value[t].selected=!0,c.value=u.value,function(e){l("update:modelValue",e.id),s.value=!1,setTimeout((function(){s.value=!0}),0),e.path&&Object.keys(e.path).length&&(a.replaceRoute?r.replace(e.path).catch((function(){})):r.push(e.path))}(e)}}e.watch((function(){return a.modelValue}),(function(e,t){if(e!=t&&s.value){var n=d.value.findIndex((function(t){return t.id==e}));n>-1&&f(d.value[n],n)}})),e.watch(i,(function(t){t&&e.nextTick((function(){var e=d.value.findIndex((function(e){return"string"==typeof e.path?e.path===t.path:(e.path||{}).name===t.name}));e>-1&&f(d.value[e],e)}))}),{immediate:!0}),d.value=a.options.slice();var p=d.value.findIndex((function(e){return e.id==a.modelValue||"object"==typeof e.path&&(e.path||{}).name==(i||{}).name}));return p>-1&&(u.value=p,c.value=p,d.value[p].selected=!0),function(t,n){return e.openBlock(),e.createElementBlock("div",{class:"wn-btn-container-foreground",style:e.normalizeStyle(v.value)},[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(d.value,(function(n,o){return e.openBlock(),e.createElementBlock("div",{key:"windows-btn-".concat(o),class:"wn-btn-container",onClick:function(e){return f(n,o)}},[e.createElementVNode("div",_,[e.createElementVNode("div",{class:e.normalizeClass(["wn-btn-icon",{"wn-btn-icon-active":n.selected},{"wn-btn-icon-deselect":n.deselect}]),style:e.normalizeStyle("color:".concat(n.color))},[e.renderSlot(t.$slots,"icon",{props:n},(function(){return[e.createElementVNode("i",{class:e.normalizeClass("".concat(n.icon))},null,2)]})),n.badge?(e.openBlock(),e.createElementBlock("div",q,e.toDisplayString(n.badge),1)):e.createCommentVNode("v-if",!0)],6),e.createElementVNode("div",{class:e.normalizeClass(["wn-btn-border",{"wn-btn-border-selected":n.selected},{"wn-btn-border-deselect":n.deselect}])},null,2)])],8,x)})),128))],4)}}});F.__scopeId="data-v-67637842",F.__file="src/components/WindowsBottomNavigation.vue";var z=["onClick"],R={class:"hill-btn-item"},I={key:0,class:"hill-btn-badge"},T=function(t){return e.pushScopeId("data-v-089e8330"),t=t(),e.popScopeId(),t}((function(){return e.createElementVNode("div",{id:"hill",class:"hill"},[e.createElementVNode("div",{class:"hill-left"}),e.createElementVNode("div",{class:"hill-right"})],-1)})),A=e.defineComponent({__name:"HillBottomNavigation",props:{modelValue:{type:[Number,String,null],required:!0,default:null},options:{type:Array,required:!0,default:function(){return[]}},color:{type:String,required:!1,default:"#8B5CF6"},backgroundColor:{type:String,required:!1,default:"#FFFFFF"},badgeColor:{type:String,required:!1,default:"#FBC02D"},replaceRoute:{type:Boolean,required:!1,default:!1}},emits:["update:modelValue"],setup:function(n,o){var l=o.emit,a=n,r=t.useRouter(),i=t.useRoute(),c=e.ref(0),u=e.ref(0),d=e.ref([]),s=e.ref(!0),v=e.computed((function(){return{"--color":a.color,"--background-color":a.backgroundColor,"--badge-color":a.badgeColor}}));function f(){var e,t=(null===(e=document.querySelector(".hill-btn-container"))||void 0===e?void 0:e.clientWidth)||0;document.querySelector("#hill").style.left="\n      ".concat(t/2-13+u.value*t,"px")}function p(e,t){var n;if(t!==u.value){if(u.value=t,null!==c.value){var o=c.value;setTimeout((function(){d.value[o].deselect=!1}),100),d.value[c.value].selected=!1,d.value[c.value].deselect=!0}d.value[t].selected=!0,c.value=u.value,function(e){l("update:modelValue",e.id),s.value=!1,setTimeout((function(){s.value=!0}),0),e.path&&Object.keys(e.path).length&&(a.replaceRoute?r.replace(e.path).catch((function(){})):r.push(e.path))}(e);var i=(null===(n=document.querySelector(".hill-btn-container"))||void 0===n?void 0:n.clientWidth)||0;document.querySelector("#hill").style.left="".concat(i/2-13+t*i,"px")}}e.watch((function(){return a.modelValue}),(function(e,t){if(e!=t&&s.value){var n=d.value.findIndex((function(t){return t.id==e}));n>-1&&p(d.value[n],n)}})),e.onMounted((function(){f(),window.addEventListener("resize",f)})),e.onBeforeUnmount((function(){return window.removeEventListener("resize",f)})),d.value=a.options.slice();var m=d.value.findIndex((function(e){return e.id==a.modelValue||"object"==typeof e.path&&(e.path||{}).name==(i||{}).name}));return m>-1&&(u.value=m,c.value=m,d.value[m].selected=!0),function(t,n){return e.openBlock(),e.createElementBlock("div",{class:"hill-btn-container-foreground",style:e.normalizeStyle(v.value)},[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(d.value,(function(n,o){return e.openBlock(),e.createElementBlock("div",{key:"ring-btn-".concat(o),class:"hill-btn-container",onClick:function(e){return p(n,o)}},[e.createElementVNode("div",R,[e.createElementVNode("div",{class:e.normalizeClass(["hill-btn-icon",{"hill-btn-icon-active":n.selected},{"hill-btn-icon-deselect":n.deselect}])},[e.renderSlot(t.$slots,"icon",{props:n},(function(){return[e.createElementVNode("i",{class:e.normalizeClass("".concat(n.icon))},null,2)]})),(n.badge||0)>0?(e.openBlock(),e.createElementBlock("div",I)):e.createCommentVNode("v-if",!0)],2)])],8,z)})),128)),T],4)}}});A.__scopeId="data-v-089e8330",A.__file="src/components/HillBottomNavigation.vue";var j=["onClick"],L={class:"fl-btn-item"},$=e.defineComponent({__name:"FlashlightBottomNavigation",props:{modelValue:{type:[Number,String,null],required:!0,default:null},options:{type:Array,required:!0,default:function(){return[]}},flashlightColor:{type:String,required:!1,default:"#FFFFFF"},backgroundColor:{type:String,required:!1,default:"#646365"},iconColor:{type:String,required:!1,default:"#312F31"},replaceRoute:{type:Boolean,required:!1,default:!1}},emits:["update:modelValue"],setup:function(n,o){var l=o.emit,a=n,r=t.useRouter(),i=t.useRoute(),c=e.ref(0),u=e.ref(0),d=e.ref([]),s=e.ref(!0),v=e.ref(0),f=e.ref(),p=e.ref(),m=e.ref(),h=e.computed((function(){var e=a.flashlightColor.slice(1),t=parseInt(e.substring(0,2),16),n=parseInt(e.substring(2,4),16),o=parseInt(e.substring(4,6),16);return{"--swiper-color":a.flashlightColor,"--flashlight-color-rgb":"".concat(t,", ").concat(n,", ").concat(o),"--icon-color":a.iconColor,"--background-color":a.backgroundColor}}));function g(){m.value&&Array.isArray(m.value)&&(v.value=m.value[0].offsetWidth),p.value&&(p.value.style.width="64px",p.value.style.transform="translateX(".concat(v.value*(u.value+1)-(v.value/2+32),"px)")),f.value&&(f.value.style.transform="translateX(".concat(v.value*(u.value+1)-(v.value/2+35),"px)"))}function b(){g()}function y(e,t){t!==u.value&&(u.value=t,null!==c.value&&(d.value[c.value].selected=!1),d.value[t].selected=!0,c.value=u.value,function(e){l("update:modelValue",e.id),s.value=!1,setTimeout((function(){s.value=!0}),0),e.path&&Object.keys(e.path).length&&(a.replaceRoute?r.replace(e.path).catch((function(){})):r.push(e.path))}(e))}e.watch(u,(function(e){p.value&&(p.value.style.transform="translateX(".concat(v.value*(e+1)-(v.value/2+32),"px)")),f.value&&(f.value.style.transform="translateX(".concat(v.value*(e+1)-(v.value/2+35),"px)"))})),e.watch((function(){return a.modelValue}),(function(e,t){if(e!=t&&s.value){var n=d.value.findIndex((function(t){return t.id==e}));n>-1&&y(d.value[n],n)}})),e.watch(i,(function(t){t&&e.nextTick((function(){var e=d.value.findIndex((function(e){return"string"==typeof e.path?e.path===t.path:(e.path||{}).name===t.name}));e>-1&&y(d.value[e],e)}))}),{immediate:!0}),e.onMounted((function(){g(),window.addEventListener("resize",b)})),e.onBeforeUnmount((function(){return window.removeEventListener("resize",b)})),d.value=a.options.slice();var k=d.value.findIndex((function(e){return e.id==a.modelValue||"object"==typeof e.path&&(e.path||{}).name==(i||{}).name}));return k>-1&&(u.value=k,c.value=k,d.value[k].selected=!0),function(t,n){return e.openBlock(),e.createElementBlock("div",{class:"fl-btn-container-foreground",style:e.normalizeStyle(h.value)},[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(d.value,(function(n,o){return e.openBlock(),e.createElementBlock("div",{key:"flashlight-btn-".concat(o),ref_for:!0,ref_key:"btnContainerRef",ref:m,class:"fl-btn-container",onClick:function(e){return y(n,o)}},[e.createElementVNode("div",L,[e.createElementVNode("div",{class:e.normalizeClass(["fl-btn-icon",{"fl-btn-icon-active":n.selected}])},[e.renderSlot(t.$slots,"icon",{props:n},(function(){return[e.createElementVNode("i",{class:e.normalizeClass("".concat(n.icon))},null,2)]}))],2)])],8,j)})),128)),e.createElementVNode("div",{ref_key:"flashlightRef",ref:f,class:"fl-flashlight"},null,512),e.createElementVNode("div",{ref_key:"flashlightShadowRef",ref:p,class:"fl-flashlight-shadow"},null,512)],4)}}});$.__scopeId="data-v-252f6995",$.__file="src/components/FlashlightBottomNavigation.vue";var D={install:function(e){e.component("CurvedBottomNavigation",h),e.component("GrowBottomNavigation",k),e.component("SwipeBottomNavigation",S),e.component("RingBottomNavigation",V),e.component("WindowsBottomNavigation",F),e.component("HillBottomNavigation",A),e.component("FlashlightBottomNavigation",$)}};exports.CurvedBottomNavigation=h,exports.FlashlightBottomNavigation=$,exports.GrowBottomNavigation=k,exports.HillBottomNavigation=A,exports.RingBottomNavigation=V,exports.SwipeBottomNavigation=S,exports.WindowsBottomNavigation=F,exports.default=D;
