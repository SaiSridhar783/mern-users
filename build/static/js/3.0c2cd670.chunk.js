(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[3],{179:function(e,t,a){"use strict";var n=a(0),r=a.n(n),i=a(32);a(183);t.a=function(e){return e.href?r.a.createElement("a",{className:"button button--".concat(e.size||"default"," ").concat(e.inverse&&"button--inverse"," ").concat(e.danger&&"button--danger"),href:e.href,style:e.style},e.children):e.to?r.a.createElement(i.b,{to:e.to,exact:e.exact,className:"button button--".concat(e.size||"default"," ").concat(e.inverse&&"button--inverse"," ").concat(e.danger&&"button--danger"),style:e.style},e.children):r.a.createElement("button",{className:"button button--".concat(e.size||"default"," ").concat(e.inverse&&"button--inverse"," ").concat(e.danger&&"button--danger"),type:e.type,onClick:e.onClick,disabled:e.disabled,style:e.style},e.children)}},180:function(e,t,a){"use strict";var n=a(0),r=a.n(n);a(182);t.a=function(e){return r.a.createElement("div",{className:"card ".concat(e.className),style:e.style},e.children)}},181:function(e,t,a){"use strict";a.d(t,"c",(function(){return r})),a.d(t,"b",(function(){return i})),a.d(t,"a",(function(){return l})),a.d(t,"d",(function(){return c}));var n=a(60),r=function(){return{type:"REQUIRE"}},i=function(e){return{type:"MINLENGTH",val:e}},l=function(){return{type:"EMAIL"}},c=function(e,t){var a,r=!0,i=Object(n.a)(t);try{for(i.s();!(a=i.n()).done;){var l=a.value;"REQUIRE"===l.type&&(r=r&&e.trim().length>0),"MINLENGTH"===l.type&&(r=r&&e.trim().length>=l.val),"MAXLENGTH"===l.type&&(r=r&&e.trim().length<=l.val),"MIN"===l.type&&(r=r&&+e>=l.val),"MAX"===l.type&&(r=r&&+e<=l.val),"EMAIL"===l.type&&(r=r&&/^\S+@\S+\.\S+$/.test(e))}}catch(c){i.e(c)}finally{i.f()}return r}},182:function(e,t,a){},183:function(e,t,a){},186:function(e,t,a){"use strict";var n=a(3),r=a(39),i=a(0),l=a.n(i),c=a(181),o=(a(187),function(e,t){switch(t.type){case"CHANGE":return Object(r.a)(Object(r.a)({},e),{},{value:t.val,isValid:Object(c.d)(t.val,t.validators)});case"TOUCH":return Object(r.a)(Object(r.a)({},e),{},{isTouched:!0});default:return e}});t.a=function(e){var t=Object(i.useReducer)(o,{value:e.value||"",isTouched:!1,isValid:e.valid||!1}),a=Object(n.a)(t,2),r=a[0],c=a[1],s=e.id,u=e.onInput,d=r.value,p=r.isValid;Object(i.useEffect)((function(){u(s,d,p)}),[s,d,p,u]);var m=function(t){c({type:"CHANGE",val:t.target.value,validators:e.validators})},v=function(){c({type:"TOUCH"})},f="input"===e.element?l.a.createElement("input",{id:e.id,type:e.type,placeholder:e.placeholder,onChange:m,onBlur:v,value:r.value}):l.a.createElement("textarea",{id:e.id,rows:e.rows||3,onChange:m,onBlur:v,value:r.value});return l.a.createElement("div",{className:"form-control ".concat(!r.isValid&&r.isTouched&&"form-control--invalid")},l.a.createElement("label",{htmlFor:e.id},e.label),f,!r.isValid&&r.isTouched&&l.a.createElement("p",null,e.errorText))}},187:function(e,t,a){},188:function(e,t,a){"use strict";var n=a(3),r=a(6),i=a(39),l=a(0),c=function(e,t){switch(t.type){case"INPUT_CHANGE":var a=!0;for(var n in e.inputs)e.inputs[n]&&(a=n===t.inputId?a&&t.isValid:a&&e.inputs[n].isValid);return Object(i.a)(Object(i.a)({},e),{},{inputs:Object(i.a)(Object(i.a)({},e.inputs),{},Object(r.a)({},t.inputId,{value:t.value,isValid:t.isValid})),isValid:a});case"SET_DATA":return{inputs:t.inputs,isValid:t.formIsValid};default:return e}};t.a=function(e,t){var a=Object(l.useReducer)(c,{inputs:e,isValid:t}),r=Object(n.a)(a,2),i=r[0],o=r[1];return[i,Object(l.useCallback)((function(e,t,a){o({type:"INPUT_CHANGE",value:t,isValid:a,inputId:e})}),[]),Object(l.useCallback)((function(e,t){o({type:"SET_DATA",inputs:e,formIsValid:t})}),[])]}},190:function(e,t,a){"use strict";var n=a(47),r=a(164),i=a(177),l=a(70),c=a(117),o=a(52),s=a(7),u={border:"0px",clip:"rect(0px, 0px, 0px, 0px)",height:"1px",width:"1px",margin:"-1px",padding:"0px",overflow:"hidden",whiteSpace:"nowrap",position:"absolute"},d=Object(c.a)("span",{baseStyle:u});s.a&&(d.displayName="VisuallyHidden");var p=Object(c.a)("input",{baseStyle:u});s.a&&(p.displayName="VisuallyHiddenInput");var m=a(0);function v(){return(v=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}a.d(t,"a",(function(){return b}));var f=Object(n.b)({"0%":{transform:"rotate(0deg)"},"100%":{transform:"rotate(360deg)"}}),b=Object(r.a)((function(e,t){var a=Object(i.b)("Spinner",e),n=Object(l.b)(e),r=n.label,s=void 0===r?"Loading...":r,u=n.thickness,p=void 0===u?"2px":u,b=n.speed,h=void 0===b?"0.45s":b,y=n.emptyColor,O=void 0===y?"transparent":y,E=n.className,j=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(n,["label","thickness","speed","emptyColor","className"]),g=Object(o.a)("chakra-spinner",E),w=v({display:"inline-block",borderColor:"currentColor",borderStyle:"solid",borderRadius:"99999px",borderWidth:p,borderBottomColor:O,borderLeftColor:O,animation:f+" "+h+" linear infinite"},a);return m.createElement(c.a.div,v({ref:t,__css:w,className:g},j),s&&m.createElement(d,null,s))}));s.a&&(b.displayName="Spinner")},191:function(e,t,a){"use strict";var n=a(3),r=a(0),i=a.n(r),l=a(179);a(192);t.a=function(e){var t=Object(r.useState)(),a=Object(n.a)(t,2),c=a[0],o=a[1],s=Object(r.useState)(),u=Object(n.a)(s,2),d=u[0],p=u[1],m=Object(r.useState)(),v=Object(n.a)(m,2),f=v[0],b=v[1],h=Object(r.useRef)();Object(r.useEffect)((function(){if(c){var e=new FileReader;e.onload=function(){p(e.result)},e.readAsDataURL(c)}}),[c]);return i.a.createElement("div",{className:"form-control"},i.a.createElement("input",{id:e.id,ref:h,style:{display:"none"},type:"file",accept:".jpg,.png,.jpeg",onChange:function(){var t,a=f;h.current.files&&1===h.current.files.length?(t=h.current.files[0],o(t),b(!0),a=!0):(b(!1),a=!1),e.onInput(e.id,t,a)}}),i.a.createElement("div",{className:"image-upload ".concat(e.center&&"center")},i.a.createElement("div",{className:"image-upload__preview"},d?i.a.createElement("img",{src:d,alt:"Preview"}):i.a.createElement("p",null,"Please pick an image")),i.a.createElement(l.a,{type:"button",onClick:function(){h.current.click()}},"PICK IMAGE")),!f&&i.a.createElement("p",null,e.errorText))}},192:function(e,t,a){},197:function(e,t,a){"use strict";var n=a(3),r=a(164),i=a(70),l=a(177),c=a(82),o=a(117),s=a(52),u=a(116),d=a(0),p=a(111);function m(){return(m=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}var v=function(e){return d.createElement(p.a,m({viewBox:"0 0 24 24"},e),d.createElement("path",{fill:"currentColor",d:"M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"}))};function f(){return(f=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}a.d(t,"a",(function(){return j})),a.d(t,"b",(function(){return g}));var b={info:{icon:function(e){return d.createElement(p.a,m({viewBox:"0 0 24 24"},e),d.createElement("path",{fill:"currentColor",d:"M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm.25,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,12.25,5ZM14.5,18.5h-4a1,1,0,0,1,0-2h.75a.25.25,0,0,0,.25-.25v-4.5a.25.25,0,0,0-.25-.25H10.5a1,1,0,0,1,0-2h1a2,2,0,0,1,2,2v4.75a.25.25,0,0,0,.25.25h.75a1,1,0,1,1,0,2Z"}))},colorScheme:"blue"},warning:{icon:v,colorScheme:"orange"},success:{icon:function(e){return d.createElement(p.a,m({viewBox:"0 0 24 24"},e),d.createElement("path",{fill:"currentColor",d:"M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"}))},colorScheme:"green"},error:{icon:v,colorScheme:"red"}},h=Object(u.a)({name:"AlertContext",errorMessage:"useAlertContext: `context` is undefined. Seems you forgot to wrap alert components in `<Alert />`"}),y=Object(n.a)(h,2),O=y[0],E=y[1],j=Object(r.a)((function(e,t){var a,n=Object(i.b)(e),r=n.status,u=void 0===r?"info":r,p=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(n,["status"]),m=null!=(a=e.colorScheme)?a:b[u].colorScheme,v=Object(l.a)("Alert",f({},e,{colorScheme:m})),h=f({width:"100%",display:"flex",alignItems:"center",position:"relative",overflow:"hidden"},v.container);return d.createElement(O,{value:{status:u}},d.createElement(c.b,{value:v},d.createElement(o.a.div,f({role:"alert",ref:t},p,{className:Object(s.a)("chakra-alert",e.className),__css:h}))))})),g=function(e){var t=E().status,a=b[t].icon,n=Object(c.d)();return d.createElement(o.a.span,f({display:"inherit"},e,{className:Object(s.a)("chakra-alert__icon",e.className),__css:n.icon}),d.createElement(a,{w:"100%",h:"100%"}))}},208:function(e,t,a){},215:function(e,t,a){"use strict";a.r(t);var n=a(75),r=a.n(n),i=a(85),l=a(39),c=a(3),o=a(0),s=a.n(o),u=a(179),d=a(180),p=a(186),m=a(197),v=a(190),f=a(188),b=a(181),h=a(28),y=(a(208),a(34)),O=a(191);t.default=function(e){var t=Object(h.b)(),a=Object(h.c)((function(e){return e.auth})),n=a.loading,E=a.error,j=a.user,g=Object(h.c)((function(e){return e.auth.login})),w=g.loading,x=g.error,N=Object(o.useState)(!1),C=Object(c.a)(N,2),A=C[0],I=C[1],S=Object(f.a)({email:{value:"",isValid:!1},password:{value:"",isValid:!1}},!1),V=Object(c.a)(S,3),k=V[0],T=V[1],M=V[2],P=function(){var e=Object(i.a)(r.a.mark((function e(a){var n;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a.preventDefault(),A?((n=new FormData).append("email",k.inputs.email.value),n.append("password",k.inputs.password.value),n.append("name",k.inputs.name.value),n.append("image",k.inputs.image.value),t(y.a.authSignup(n))):t(y.a.authLogin({email:k.inputs.email.value,password:k.inputs.password.value}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return s.a.createElement(d.a,{className:"authentication"},s.a.createElement("h2",null,"Authentication Required"),s.a.createElement("hr",null),s.a.createElement("form",{onSubmit:P},A&&s.a.createElement(p.a,{id:"name",element:"input",type:"text",label:"Your Name",validators:[Object(b.c)()],errorText:"Please enter a name!",onInput:T,value:k.inputs.name.value,valid:k.inputs.name.isValid}),A&&s.a.createElement(O.a,{center:!0,id:"image",onInput:T,errorText:"Please Provide an image"}),s.a.createElement(p.a,{id:"email",element:"input",type:"email",label:"Email",validators:[Object(b.a)()],errorText:"Please enter a valid email!",onInput:T,value:k.inputs.email.value,valid:k.inputs.email.isValid}),s.a.createElement(p.a,{id:"password",element:"input",type:"password",label:"Password",validators:[Object(b.b)(8)],errorText:"Please enter a valid password (min 8 characters)!",onInput:T,value:k.inputs.password.value,valid:k.inputs.password.isValid}),j&&A&&s.a.createElement(m.a,{status:"success",my:"2rem"},s.a.createElement(m.b,null),"User created successfully! Continue to Login"),n?s.a.createElement(v.a,{thickness:"4px",speed:"0.65s",emptyColor:"gray.200",color:"red",size:"xl",mx:"auto",mb:"1.1rem",display:"block"}):E&&A&&s.a.createElement(m.a,{status:"error",my:"2rem"},s.a.createElement(m.b,null),E),w?s.a.createElement(v.a,{thickness:"4px",speed:"0.65s",emptyColor:"gray.200",color:"red",size:"xl",mx:"auto",mb:"1.1rem",display:"block"}):x&&!A&&s.a.createElement(m.a,{status:"error",my:"2rem"},s.a.createElement(m.b,null),x),s.a.createElement(u.a,{type:"submit",disabled:!k.isValid},A?"Create Account":"Login")),s.a.createElement(u.a,{inverse:!0,onClick:function(){A?M(Object(l.a)(Object(l.a)({},k.inputs),{},{name:void 0,image:void 0}),k.inputs.email.isValid&&k.inputs.password.isValid):M(Object(l.a)(Object(l.a)({},k.inputs),{},{name:{value:"",isValid:!1},image:{value:null,isValid:!1}}),!1),I((function(e){return!e}))},style:{textTransform:"uppercase"}},A?"SIGN IN instead":"SIGN UP instead"))}}}]);
//# sourceMappingURL=3.0c2cd670.chunk.js.map