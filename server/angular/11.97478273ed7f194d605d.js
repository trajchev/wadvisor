(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{V1YL:function(e,t,n){"use strict";n.r(t),n.d(t,"UserModule",(function(){return z}));var i=n("hGdz"),o=n("tyNb"),r=n("fXoL"),c=n("3Pt+"),a=n("6E1o"),s=n("HDdC");const l=e=>{const t=e.value,n=new FileReader;return s.a.create(e=>{n.addEventListener("loadend",()=>{const t=new Uint8Array(n.result).subarray(0,4);let i="",o=!1;for(let e=0;e<t.length;e++)i+=t[e].toString(16);switch(i){case"89504e47":o=!0;break;case"ffd8ffe0":case"ffd8ffe1":case"ffd8ffe2":case"ffd8ffe3":case"ffd8ffe8":o=!0;break;default:o=!1}e.next(o?null:{invalidMimeType:!0}),e.complete()}),n.readAsArrayBuffer(t)})};var u=n("3now"),b=n("0IaG"),d=n("dNgK"),g=n("ofXK"),m=n("NFeN"),p=n("bTqV"),f=n("b/j1");function h(e,t){if(1&e){const e=r.Tb();r.Sb(0,"button",15),r.Zb("click",(function(){return r.rc(e),r.dc(2).onStartEdit()})),r.Sb(1,"mat-icon"),r.Ac(2,"edit"),r.Rb(),r.Rb()}}function w(e,t){if(1&e&&(r.Sb(0,"div",23),r.Nb(1,"img",24),r.Rb()),2&e){const e=r.dc(3);r.Ab(1),r.ic("src",e.imagePreview,r.tc)("alt","User Photo")}}function S(e,t){if(1&e){const e=r.Tb();r.Sb(0,"div"),r.Sb(1,"button",16),r.Zb("click",(function(){return r.rc(e),r.oc(8).click()})),r.Ac(2,"Select Photo"),r.Rb(),r.Sb(3,"button",17),r.Zb("click",(function(){return r.rc(e),r.dc(2).onCancelEdit()})),r.Ac(4,"Cancel"),r.Rb(),r.zc(5,w,2,2,"div",18),r.Sb(6,"form",19),r.Zb("ngSubmit",(function(){return r.rc(e),r.dc(2).onImageSave()})),r.Sb(7,"input",20,21),r.Zb("change",(function(t){return r.rc(e),r.dc(2).onImagePicked(t)})),r.Rb(),r.Sb(9,"button",22),r.Ac(10,"submit"),r.Rb(),r.Rb(),r.Rb()}if(2&e){const e=r.dc(2);r.Ab(5),r.ic("ngIf",e.imagePreview&&""!=e.imagePreview&&e.imageForm.get("photo").valid),r.Ab(1),r.ic("formGroup",e.imageForm),r.Ab(3),r.ic("disabled",!e.imageForm.valid)}}function v(e,t){1&e&&(r.Sb(0,"div",25),r.Sb(1,"h6",26),r.Ac(2,"Please activate your account by clicking on the link sent to the email address you provided during sign up. Until then, you can only see the About, ToS and App Usage pages. Hurry up, the link will expire after 24 hours"),r.Rb(),r.Rb())}function y(e,t){if(1&e){const e=r.Tb();r.Sb(0,"ul",27),r.Sb(1,"li",28),r.Sb(2,"span",29),r.Ac(3),r.Rb(),r.Ac(4,"users signed up with your link "),r.Rb(),r.Sb(5,"li",30),r.Sb(6,"span",29),r.Ac(7,"Recruitment link:"),r.Rb(),r.Sb(8,"code"),r.Ac(9),r.Rb(),r.Sb(10,"mat-icon",31),r.Zb("click",(function(){r.rc(e);const t=r.dc(2);return t.copyText(t.recruitmentLink+t.user.username)})),r.Ac(11,"content_copy"),r.Rb(),r.Rb(),r.Sb(12,"li",32),r.Ac(13," Share your Recruitment link with your friends so they can join and you get upgrade: "),r.Rb(),r.Sb(14,"li",33),r.Ac(15," Get 50 users to signup to get Pro account forever "),r.Rb(),r.Rb()}if(2&e){const e=r.dc(2);r.Ab(3),r.Bc(e.user.recruits||0),r.Ab(6),r.Bc(e.recruitmentLink+e.user.username)}}function M(e,t){if(1&e&&(r.Sb(0,"div",2),r.Sb(1,"div",3),r.Sb(2,"div",4),r.zc(3,h,3,0,"button",5),r.Nb(4,"img",6),r.zc(5,S,11,3,"div",7),r.Sb(6,"p"),r.Sb(7,"span"),r.Ac(8),r.Rb(),r.Rb(),r.Sb(9,"ul",8),r.Sb(10,"li"),r.Sb(11,"p",9),r.Sb(12,"mat-icon"),r.Ac(13,"email"),r.Rb(),r.Ac(14),r.Rb(),r.Rb(),r.Sb(15,"li"),r.Sb(16,"p",10),r.Sb(17,"mat-icon"),r.Ac(18,"account_box"),r.Rb(),r.Ac(19),r.Rb(),r.Rb(),r.Sb(20,"li"),r.Sb(21,"p",9),r.Sb(22,"mat-icon"),r.Ac(23,"group"),r.Rb(),r.Ac(24),r.ec(25,"strToDate"),r.Rb(),r.Rb(),r.Rb(),r.Rb(),r.Rb(),r.Sb(26,"div",11),r.Sb(27,"div",12),r.Sb(28,"h3"),r.Ac(29,"User Stats"),r.Rb(),r.zc(30,v,3,0,"div",13),r.zc(31,y,16,2,"ul",14),r.Rb(),r.Rb(),r.Rb()),2&e){const e=r.dc();r.Ab(3),r.ic("ngIf","unconfirmed"!=e.user.role),r.Ab(1),r.ic("src",e.user.photo,r.tc)("alt",e.user.username),r.Ab(1),r.ic("ngIf",e.editMode),r.Ab(3),r.Bc(e.user.username),r.Ab(6),r.Bc(e.user.email),r.Ab(5),r.Cc("",e.user.role," "),r.Ab(5),r.Bc(r.fc(25,10,e.user.createdAt)),r.Ab(6),r.ic("ngIf","unconfirmed"==e.user.role),r.Ab(1),r.ic("ngIf","unconfirmed"!=e.user.role)}}let P=(()=>{class e{constructor(e,t,n){this.userService=e,this.dialog=t,this._snackBar=n,this.recruitmentLink=`${window.location.protocol}//${window.location.hostname}/auth/register/`,this.editMode=!1,this.imagePicked=!1,this.durationInSeconds=3}ngOnInit(){this.getMyData(),this.imageForm=new c.i({photo:new c.f(null,{validators:[c.F.required],asyncValidators:[l]})})}getMyData(){this.userService.getUser().subscribe(e=>this.user=e)}copyText(e){let t=document.createElement("textarea");t.style.position="fixed",t.style.left="0",t.style.top="0",t.style.opacity="0",t.value=e,document.body.appendChild(t),t.focus(),t.select(),document.execCommand("copy"),document.body.removeChild(t),this.openSnackBar()}onStartEdit(){this.editMode=!this.editMode}onCancelEdit(){this.editMode=!1,this.imagePicked=!1,this.imageForm.patchValue({photo:null}),this.imageForm.get("photo").updateValueAndValidity()}onImagePicked(e){const t=e.target.files[0];this.imageForm.patchValue({photo:t}),this.imageForm.get("photo").updateValueAndValidity();const n=new FileReader;n.onload=()=>{this.imagePreview=n.result},n.readAsDataURL(t)}onImageSave(){this.userService.uploadPhoto(this.imageForm.value.photo).subscribe(e=>{this.user.photo="https://bwr-img.s3.eu-west-3.amazonaws.com/users/"+e.photo}),this.imagePicked=!1,this.editMode=!1,this.imageForm.reset()}openSnackBar(){this._snackBar.openFromComponent(a.a,{duration:1e3*this.durationInSeconds,data:"Link Copied"})}}return e.\u0275fac=function(t){return new(t||e)(r.Mb(u.a),r.Mb(b.b),r.Mb(d.b))},e.\u0275cmp=r.Gb({type:e,selectors:[["ba-account"]],decls:2,vars:1,consts:[[1,"ba-content"],["class","w3-row",4,"ngIf"],[1,"w3-row"],[1,"w3-col","l4","m12","w3-container"],[1,"w3-card","w3-padding","user"],["mat-raised-button","","color","primary","class","edit",3,"click",4,"ngIf"],[1,"photo",3,"src","alt"],[4,"ngIf"],[1,"w3-ul","info"],[1,"w3-animate-right"],[1,"w3-animate-left"],[1,"w3-col","l8","m12","w3-container"],[1,"w3-card","w3-padding","user-stats"],["class","w3-panel w3-pale-red w3-border",4,"ngIf"],["class","w3-ul",4,"ngIf"],["mat-raised-button","","color","primary",1,"edit",3,"click"],["type","button","mat-stroked-button","","color","primary",1,"w3-margin",3,"click"],["type","button","mat-stroked-button","","color","accent",1,"w3-margin",3,"click"],["class","image-preview",4,"ngIf"],[1,"w3-animate-zoom",3,"formGroup","ngSubmit"],["type","file","accept","image/*",1,"file-input",3,"change"],["filePicker",""],["type","submit","mat-raised-button","","color","primary",3,"disabled"],[1,"image-preview"],[3,"src","alt"],[1,"w3-panel","w3-pale-red","w3-border"],[1,"w3-padding"],[1,"w3-ul"],[1,"w3-panel","w3-light-gray","w3-leftbar","w3-border-green","w3-animate-left"],[1,"w3-tag","w3-pale-green","w3-padding"],[1,"w3-panel","w3-light-gray","w3-leftbar","w3-border-green","w3-animate-right"],["title","Copy link",3,"click"],[1,"w3-panel","w3-padding","w3-pale-green","w3-leftbar","w3-border-green","w3-animate-left"],[1,"w3-panel","w3-padding","w3-pale-green","w3-leftbar","w3-border-green","w3-animate-right"]],template:function(e,t){1&e&&(r.Sb(0,"div",0),r.zc(1,M,32,12,"div",1),r.Rb()),2&e&&(r.Ab(1),r.ic("ngIf",t.user))},directives:[g.t,m.a,p.b,c.H,c.s,c.j],pipes:[f.a],styles:["h3[_ngcontent-%COMP%]{font-family:Roboto,sans-serif;color:#54c479}p[_ngcontent-%COMP%]{color:#444;font-size:.8rem}.image-preview[_ngcontent-%COMP%]{height:10rem;width:10rem;margin:1rem auto}.image-preview[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:100%}.user[_ngcontent-%COMP%]{position:relative;text-align:center}.user[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-weight:500;color:#248e38}.user[_ngcontent-%COMP%]   .photo[_ngcontent-%COMP%]{position:relative;width:10rem;height:10rem;margin:1rem auto;border-radius:5rem;border:2px solid #afd91a;overflow:hidden}.user[_ngcontent-%COMP%]   .edit[_ngcontent-%COMP%]{position:absolute;top:0;right:0;display:none}.user[_ngcontent-%COMP%]:hover   .edit[_ngcontent-%COMP%]{display:block}.user-stats[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{font-size:.8rem}.user-stats[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .w3-tag[_ngcontent-%COMP%], .user-stats[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{font-weight:500}mat-icon[_ngcontent-%COMP%]{position:absolute;font-size:1rem;top:.5rem;right:1rem;cursor:pointer}.info[_ngcontent-%COMP%]{border-top:1px solid #eee}.info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{text-align:left;position:relative;padding-left:.4rem;color:#444;margin:0}.info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{top:.1rem;left:-1rem;color:#54c479;font-size:1rem;cursor:not-allowed}.file-input[_ngcontent-%COMP%]{width:0;height:0;overflow:hidden}.w3-panel[_ngcontent-%COMP%]{padding:0 1rem 0 0;margin:0}.w3-panel[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{margin-right:1rem}"]}),e})(),R=(()=>{class e{constructor(){}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=r.Gb({type:e,selectors:[["ba-user"]],decls:1,vars:0,template:function(e,t){1&e&&r.Nb(0,"ba-account")},directives:[P],styles:[""]}),e})();var A=n("AytR"),C=n("qXBG");function k(e,t){1&e&&(r.Sb(0,"div"),r.Sb(1,"h1"),r.Ac(2,"User confirmed successfully"),r.Rb(),r.Sb(3,"a",2),r.Ac(4,"Go To my account"),r.Rb(),r.Rb())}function O(e,t){1&e&&(r.Sb(0,"div"),r.Sb(1,"h3"),r.Ac(2,"Your account could not be confirmed. Please try again with the link we sent you"),r.Rb(),r.Rb())}const _=[{path:":token",component:(()=>{class e{constructor(e,t){this.authService=e,this.route=t,this.token=null,this.userUrl=A.a.BASE_URL+"/me",this.token=this.route.snapshot.paramMap.get("token")}ngOnInit(){this.authService.confirmUser(this.token),setTimeout(()=>{this.confirmOK=this.authService.confirmOK},1400)}}return e.\u0275fac=function(t){return new(t||e)(r.Mb(C.a),r.Mb(o.a))},e.\u0275cmp=r.Gb({type:e,selectors:[["ba-confirm-user"]],decls:3,vars:2,consts:[[1,"ba-content"],[4,"ngIf"],["href","userUrl"]],template:function(e,t){1&e&&(r.Sb(0,"div",0),r.zc(1,k,5,0,"div",1),r.zc(2,O,3,0,"div",1),r.Rb()),2&e&&(r.Ab(1),r.ic("ngIf",t.confirmOK),r.Ab(1),r.ic("ngIf",!t.confirmOK))},directives:[g.t],styles:[""]}),e})()},{path:"",pathMatch:"full",component:R}];let I=(()=>{class e{}return e.\u0275mod=r.Kb({type:e}),e.\u0275inj=r.Jb({factory:function(t){return new(t||e)},imports:[[o.h.forChild(_)],o.h]}),e})(),z=(()=>{class e{}return e.\u0275mod=r.Kb({type:e}),e.\u0275inj=r.Jb({factory:function(t){return new(t||e)},imports:[[i.a,I]]}),e})()}}]);