(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{"55i6":function(t,e,c){"use strict";c.d(e,"a",(function(){return s}));var r=c("lJxs"),i=c("AytR"),a=c("fXoL"),n=c("tk/3");let s=(()=>{class t{constructor(t){this.http=t}createTicket(t,e){return this.http.post(i.a.ENDPOINT_API+"tickets",{title:t,description:e})}getTicket(t){return this.http.get(`${i.a.ENDPOINT_API}tickets/${t}`)}getTickets(){return this.http.get(i.a.ENDPOINT_API+"tickets").pipe(Object(r.a)(t=>t.data))}updateTicket(t,e){return this.http.patch(`${i.a.ENDPOINT_API}tickets/tip/${t}`,{tip:e})}deleteTicket(t){return this.http.delete(`${i.a.ENDPOINT_API}tickets/${t}`)}deleteBetMatch(t){return this.http.delete(`${i.a.ENDPOINT_API}tickets/match/${t}`)}}return t.\u0275fac=function(e){return new(e||t)(a.Wb(n.b))},t.\u0275prov=a.Ib({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},"5tNe":function(t,e,c){"use strict";function r(t,e,c,r){var i,a=arguments.length,n=a<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,c):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,c,r);else for(var s=t.length-1;s>=0;s--)(i=t[s])&&(n=(a<3?i(n):a>3?i(e,c,n):i(e,c))||n);return a>3&&n&&Object.defineProperty(e,c,n),n}c.d(e,"a",(function(){return d}));var i=c("LRne"),a=c("5+tZ"),n=c("lJxs"),s=c("JIr8"),o=c("snw9"),u=c("qR5Z"),p=c("fXoL"),b=c("55i6");let d=(()=>{class t{constructor(t,e){this.actions$=t,this.ticketService=e,this.loadTickets$=this.actions$.pipe(Object(o.d)(u.j.Load),Object(a.a)(t=>this.ticketService.getTickets().pipe(Object(n.a)(t=>new u.i(t)),Object(s.a)(t=>Object(i.a)(new u.h(t)))))),this.createTicket$=this.actions$.pipe(Object(o.d)(u.j.CreateTicket),Object(n.a)(t=>t.payload),Object(a.a)(t=>this.ticketService.createTicket(t.title,t.description).pipe(Object(n.a)(t=>new u.c(t.data)),Object(s.a)(t=>Object(i.a)(new u.b(t)))))),this.deleteTicket$=this.actions$.pipe(Object(o.d)(u.j.DeleteTicket),Object(n.a)(t=>t.payload),Object(a.a)(t=>this.ticketService.deleteTicket(t).pipe(Object(n.a)(()=>new u.f(t)),Object(s.a)(t=>Object(i.a)(new u.e(t))))))}}return t.\u0275fac=function(e){return new(e||t)(p.Wb(o.a),p.Wb(b.a))},t.\u0275prov=p.Ib({token:t,factory:t.\u0275fac}),r([Object(o.b)()],t.prototype,"loadTickets$",void 0),r([Object(o.b)()],t.prototype,"createTicket$",void 0),r([Object(o.b)()],t.prototype,"deleteTicket$",void 0),t})()},"8IKM":function(t,e,c){"use strict";c.d(e,"a",(function(){return a}));var r=c("wd/R"),i=c("fXoL");let a=(()=>{class t{transform(t,e){return r(1e3*parseInt(t)).format("H:mm | DD.MM.YYYY")}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275pipe=i.Lb({name:"msToDate",type:t,pure:!0}),t})()},"b/j1":function(t,e,c){"use strict";c.d(e,"a",(function(){return a}));var r=c("wd/R"),i=c("fXoL");let a=(()=>{class t{transform(t,...e){return r(t).format("H:mm | DD.MM.YYYY")}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275pipe=i.Lb({name:"strToDate",type:t,pure:!0}),t})()},bS68:function(t,e,c){"use strict";c.d(e,"a",(function(){return a}));var r=c("qR5Z");const i={tickets:[],betmatches:[],error:""};function a(t=i,e){switch(e.type){case r.j.LoadSuccess:return Object.assign(Object.assign({},t),{tickets:[...e.payload],error:""});case r.j.LoadFail:return Object.assign(Object.assign({},t),{tickets:[],error:e.payload});case r.j.CreateTicketSuccess:return Object.assign(Object.assign({},t),{tickets:[...t.tickets,e.payload],error:""});case r.j.CreateTicketFail:return Object.assign(Object.assign({},t),{error:e.payload});case r.j.DeleteTicketSuccess:return Object.assign(Object.assign({},t),{tickets:t.tickets.filter(t=>t.id!==e.payload),error:""});default:return t}}},vhQE:function(t,e,c){"use strict";c.d(e,"b",(function(){return a})),c.d(e,"a",(function(){return n}));var r=c("kt0X");const i=Object(r.o)("tickets"),a=Object(r.p)(i,t=>t.tickets),n=Object(r.p)(i,t=>t.error)}}]);