(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[6],{179:function(e,t,a){"use strict";var n=a(0),r=a.n(n),c=a(32);a(183);t.a=function(e){return e.href?r.a.createElement("a",{className:"button button--".concat(e.size||"default"," ").concat(e.inverse&&"button--inverse"," ").concat(e.danger&&"button--danger"),href:e.href,style:e.style},e.children):e.to?r.a.createElement(c.b,{to:e.to,exact:e.exact,className:"button button--".concat(e.size||"default"," ").concat(e.inverse&&"button--inverse"," ").concat(e.danger&&"button--danger"),style:e.style},e.children):r.a.createElement("button",{className:"button button--".concat(e.size||"default"," ").concat(e.inverse&&"button--inverse"," ").concat(e.danger&&"button--danger"),type:e.type,onClick:e.onClick,disabled:e.disabled,style:e.style},e.children)}},180:function(e,t,a){"use strict";var n=a(0),r=a.n(n);a(182);t.a=function(e){return r.a.createElement("div",{className:"card ".concat(e.className),style:e.style},e.children)}},182:function(e,t,a){},183:function(e,t,a){},184:function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));var n=a(75),r=a.n(n),c=a(85),l=a(3),o=a(0),s=function(){var e=Object(o.useState)(!1),t=Object(l.a)(e,2),a=t[0],n=t[1],s=Object(o.useState)(),i=Object(l.a)(s,2),u=i[0],m=i[1],d=Object(o.useRef)([]),p=Object(o.useCallback)(function(){var e=Object(c.a)(r.a.mark((function e(t){var a,c,l,o,s,i,u=arguments;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=u.length>1&&void 0!==u[1]?u[1]:"GET",c=u.length>2&&void 0!==u[2]?u[2]:null,l=u.length>3&&void 0!==u[3]?u[3]:{},n(!0),o=new AbortController,d.current.push(o),e.prev=6,e.next=9,fetch(t,{method:a,body:c,headers:l,signal:o.signal});case 9:return s=e.sent,e.next=12,s.json();case 12:if(i=e.sent,d.current=d.current.filter((function(e){return e!==o})),s.ok){e.next=16;break}throw new Error(i.message);case 16:return n(!1),e.abrupt("return",i);case 20:throw e.prev=20,e.t0=e.catch(6),m(e.t0.message),n(!1),e.t0;case 25:case"end":return e.stop()}}),e,null,[[6,20]])})));return function(t){return e.apply(this,arguments)}}(),[]);return Object(o.useEffect)((function(){return function(){d.current.forEach((function(e){return e.abort()}))}}),[]),{isLoading:a,error:u,sendRequest:p,clearError:function(){m(null)}}}},185:function(e,t,a){"use strict";var n=a(0),r=a.n(n),c=a(27),l=a(196);t.a=function(e){var t=e.isOpen,a=e.onClose,n=e.children,o=e.title,s=e.footer,i=e.deleteHandler;return r.a.createElement(r.a.Fragment,null,r.a.createElement(c.a,{isOpen:t,onClose:a,size:"lg"},r.a.createElement(c.h,null),r.a.createElement(c.d,null,r.a.createElement(c.g,{bg:"purple.600",color:"white",borderRadius:"6px 6px 0 0"},o),r.a.createElement(c.c,null),r.a.createElement(c.b,null,n),"map"===s?r.a.createElement(c.f,null,r.a.createElement(l.a,{colorScheme:"purple",mr:3,onClick:a},"Close")):"del"===s?r.a.createElement(c.f,null,r.a.createElement(l.a,{colorScheme:"red",mr:3,onClick:a},"Close"),r.a.createElement(l.a,{variant:"solid",colorScheme:"green",onClick:i},"Continue")):r.a.createElement(c.f,null,r.a.createElement(l.a,{colorScheme:"red",mr:3,onClick:a},"Close"),r.a.createElement(l.a,{variant:"solid",colorScheme:"green",onClick:a},"Continue")))))}},201:function(e,t,a){},207:function(e,t,a){},217:function(e,t,a){"use strict";a.r(t);var n=a(75),r=a.n(n),c=a(85),l=a(3),o=a(190),s=a(197),i=a(0),u=a.n(i),m=a(12),d=a(184),p=a(214),f=a(179),E=a(180),h=(a(201),a(185)),b=a(209),g=Object(b.c)({accessToken:"pk.eyJ1Ijoic2Fpc3JpZGhhciIsImEiOiJja3F4Z3V0YncwMHB1MndzNmIyZjhrMTMxIn0.K4KHxCX8T3rGbNCGMesXkw"}),v=function(e){var t=e.lat,a=e.lng;return u.a.createElement(g,{style:"mapbox://styles/saisridhar/ckqz2mkxo1fqv18p3h09exyes",zoom:[12],center:[a,t],containerStyle:{height:"30rem",width:"100%"}},u.a.createElement(b.b,{type:"symbol",id:"marker",layout:{"icon-image":"geo-alt-fill"}},u.a.createElement(b.a,{coordinates:[a,t]})))},y=a(174),k=a(213),O=a(28),x=function(e){var t=Object(d.a)(),a=t.isLoading,n=t.error,l=t.sendRequest,i=Object(y.a)(),m=i.isOpen,p=i.onOpen,b=i.onClose,g=Object(y.a)(),x=g.isOpen,C=g.onOpen,j=g.onClose,w=Object(O.c)((function(e){return e.auth.login.userId})),N=Object(O.c)((function(e){return e.auth.login.token})),z=function(){var t=Object(c.a)(r.a.mark((function t(){return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,l("".concat("https://mern-places3.herokuapp.com/api","/places/").concat(e.id),"DELETE",null,{Authorization:"Bearer ".concat(N)});case 3:e.onDelete(e.id),t.next=8;break;case 6:t.prev=6,t.t0=t.catch(0);case 8:case"end":return t.stop()}}),t,null,[[0,6]])})));return function(){return t.apply(this,arguments)}}();return u.a.createElement(u.a.Fragment,null,u.a.createElement(h.a,{isOpen:m,onClose:b,title:e.address,footer:"map"},u.a.createElement(v,{lat:e.coordinates.lat,lng:e.coordinates.lng})),u.a.createElement(h.a,{isOpen:x,onClose:j,title:"Are you sure you want to delete?",footer:"del",deleteHandler:z},u.a.createElement(k.a,{as:"h4",my:"2",fontSize:"1.1rem",fontWeight:"normal"},"This action is irreversible and the place will be lost forever."),a?u.a.createElement(o.a,{thickness:"4px",speed:"0.65s",emptyColor:"gray.200",color:"red",size:"xl",mx:"auto",mb:"1.1rem",display:"block"}):n&&u.a.createElement(s.a,{status:"error",my:"2rem",maxWidth:"38rem",mx:"auto"},u.a.createElement(s.b,null),n)),u.a.createElement("li",{className:"place-item"},u.a.createElement(E.a,{className:"place-item__content"},u.a.createElement("div",{className:"place-item__image"},u.a.createElement("img",{src:e.image,alt:e.title})),u.a.createElement("div",{className:"place-item__info"},u.a.createElement("h2",{className:"place-item__title"},u.a.createElement("b",null,e.title)),u.a.createElement("address",null,u.a.createElement("i",{className:"fa fa-location-arrow"}),"\xa0\xa0",e.address),u.a.createElement("p",null,e.description)),u.a.createElement("div",{className:"place-item__actions"},u.a.createElement(f.a,{onClick:p},"VIEW ON MAP"),w===e.creatorId&&u.a.createElement(u.a.Fragment,null,u.a.createElement(f.a,{to:"/places/".concat(e.id)},"EDIT"),u.a.createElement(f.a,{danger:!0,onClick:C},"DELETE"))))))},C=(a(207),function(e){return 0===e.items.length?u.a.createElement("div",{className:"place-list center"},u.a.createElement(E.a,null,u.a.createElement(p.a,{my:3},"No Places Found. Create one ?"),u.a.createElement(f.a,{to:"/places/new"},"Share Place"))):u.a.createElement("ul",{className:"place-list"},e.items.map((function(t){return u.a.createElement(x,{key:t.id,id:t.id,image:t.image,title:t.title,description:t.description,address:t.address,creatorId:t.creator,coordinates:t.location,onDelete:e.onDeletePlace})})))});t.default=function(){var e=Object(i.useState)(),t=Object(l.a)(e,2),a=t[0],n=t[1],p=Object(d.a)(),f=p.isLoading,E=p.error,h=p.sendRequest,b=Object(m.h)().userId;Object(i.useEffect)((function(){(function(){var e=Object(c.a)(r.a.mark((function e(){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,h("".concat("https://mern-places3.herokuapp.com/api","/places/user/").concat(b));case 3:t=e.sent,n(t.place),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}})()()}),[h,b]);return u.a.createElement(u.a.Fragment,null,f?u.a.createElement(o.a,{thickness:"4px",speed:"0.65s",emptyColor:"gray.200",color:"red",size:"xl",mx:"auto",mb:"1.1rem",display:"block"}):E&&u.a.createElement(s.a,{status:"error",my:"2rem",maxWidth:"38rem",mx:"auto"},u.a.createElement(s.b,null),E),a&&u.a.createElement(C,{items:a,onDeletePlace:function(e){n((function(t){return t.filter((function(t){return t.id!==e}))}))}}))}}}]);
//# sourceMappingURL=6.bbbc09fd.chunk.js.map