var fe=Object.defineProperty;var me=(n,s,e)=>s in n?fe(n,s,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[s]=e;var U=(n,s,e)=>(me(n,typeof s!="symbol"?s+"":s,e),e),Z=(n,s,e)=>{if(!s.has(n))throw TypeError("Cannot "+e)};var t=(n,s,e)=>(Z(n,s,"read from private field"),e?e.call(n):s.get(n)),a=(n,s,e)=>{if(s.has(n))throw TypeError("Cannot add the same private member more than once");s instanceof WeakSet?s.add(n):s.set(n,e)},l=(n,s,e,i)=>(Z(n,s,"write to private field"),i?i.call(n,e):s.set(n,e),e);var E=(n,s,e)=>(Z(n,s,"access private method"),e);import{d as O,a as W,p as u,r as ee,b as ge,c as ye,e as ve,f as C,g as te,h as Se,T as A,i as re,C as Ee,j as we,$ as Te,k as Pe}from"./vendor-kpPZX1kI.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function e(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(o){if(o.ep)return;o.ep=!0;const r=e(o);fetch(o.href,r)}})();const xe=O();var p,d;class Le{constructor(){a(this,p,new Map);a(this,d,new Map)}destroy(){t(this,p).clear(),t(this,d).clear()}unset(s,e){if(e)t(this,p).has(e)&&t(this,d).has(s)&&(t(this,p).get(e).delete(s),t(this,d).get(s).delete(e));else if(t(this,d).has(s)){for(const i of t(this,d).get(s))t(this,p).get(i).delete(s);t(this,d).delete(s)}}set(s,e,i){if(typeof e=="string")t(this,p).has(e)||t(this,p).set(e,new Map),t(this,d).has(s)||t(this,d).set(s,new Set),t(this,d).get(s).add(e),t(this,p).get(e).set(s,i);else if(typeof e=="object")for(const[o,r]of Object.entries(e))this.set(s,o,r)}get(s,e){if(e){if(t(this,p).has(e)&&t(this,d).has(s)&&t(this,d).get(s).has(e))return t(this,p).get(e).get(s)}else if(t(this,d).has(s)){let i={};for(const o of t(this,d).get(s))i[o]=t(this,p).get(o).get(s);return i}}}p=new WeakMap,d=new WeakMap;const be=O();function Ue(){return(n,s)=>(W(n,Event,s),s)}const Ie=O();function Ce(){return(n,s)=>(W(n,Request,s),s)}function se(...n){return(s,e)=>(n.forEach(i=>i==null?void 0:i(s,e)),e)}var h,w,m,x,L,k,D,M;class ke extends u.Plugins.ScenePlugin{constructor(){super(...arguments);a(this,h,void 0);a(this,w,new Map);a(this,m,new Set);a(this,x,new Set);a(this,L,new Set);a(this,k,null);a(this,D,null);a(this,M,null)}addSystem(e,i,o=!0){t(this,w).set(e,i),o&&t(this,m).add(e)}removeSystem(e){t(this,w).delete(e),t(this,m).delete(e)}disableSystem(e){t(this,m).delete(e)}enableSystem(e){t(this,m).add(e)}preUpdate(e,i){var o,r;if(t(this,L).size){for(const c of t(this,L))this.addEntity(c);t(this,L).clear()}if(t(this,x).size){for(const c of t(this,x))this.addEntity(c);t(this,x).clear()}for(const c of t(this,m))(r=(o=t(this,w).get(c)).preUpdate)==null||r.call(o,t(this,h),e,i)}update(e,i){var o,r;for(const c of t(this,m))(r=(o=t(this,w).get(c)).update)==null||r.call(o,t(this,h),e,i)}postUpdate(e,i){var o,r,c,j,b;for(const S of t(this,m))(r=(o=t(this,w).get(S)).postUpdate)==null||r.call(o,t(this,h),e,i);for(const S of((c=t(this,D))==null?void 0:c.call(this,t(this,h)))||[])ee(t(this,h),S);for(const S of((j=t(this,M))==null?void 0:j.call(this,t(this,h)))||[])ee(t(this,h),S);for(const S of((b=t(this,k))==null?void 0:b.call(this,t(this,h)))||[])t(this,h).data.unset(S)}addEntity(...e){return se(...e)(t(this,h),ge(t(this,h)))}removeEntity(e){ee(t(this,h),e)}emit(...e){e.length&&t(this,x).add(se(Ue(),...e))}request(...e){e.length&&t(this,L).add(se(Ce(),...e))}boot(){l(this,h,ye({data:new Le,scene:this.scene})),l(this,k,ve(C([xe]))),l(this,D,C([be])),l(this,M,C([Ie])),this.scene.events.on(u.Scenes.Events.PRE_UPDATE,this.preUpdate,this),this.scene.events.on(u.Scenes.Events.UPDATE,this.update,this),this.scene.events.on(u.Scenes.Events.POST_UPDATE,this.postUpdate,this)}destroy(){this.scene.events.off(u.Scenes.Events.PRE_UPDATE,this.preUpdate),this.scene.events.off(u.Scenes.Events.UPDATE,this.update),this.scene.events.off(u.Scenes.Events.POST_UPDATE,this.postUpdate),t(this,m).clear(),t(this,w).clear(),t(this,x).clear(),t(this,L).clear(),te(t(this,h),t(this,D)),te(t(this,h),t(this,M)),te(t(this,h),t(this,k)),Se(t(this,h))}}h=new WeakMap,w=new WeakMap,m=new WeakMap,x=new WeakMap,L=new WeakMap,k=new WeakMap,D=new WeakMap,M=new WeakMap;function De(n,s,e,i,o){n[0]=s,n[1]=e,n[2]=i,n[3]=o}var B=(n=>(n[n.Set=0]="Set",n[n.Add=1]="Add",n))(B||{});const P=O({vec2:[A.f32,2]});function Me(n,s){return(e,i)=>(W(e,P,i),ae(P.vec2[i],n,s),i)}const T=O({eid:A.eid,vec2:[A.f32,2],type:A.ui8}),I=O({mat2:[A.f32,4]});function Oe(n,s,e,i){return(o,r)=>(W(o,I,r),De(I.mat2[r],n,s,e,i),r)}var G,F,oe;let je=(oe=class{constructor(){a(this,G,void 0);a(this,F,void 0);l(this,G,re(C([P,I]))),l(this,F,C([Ee(P),I]))}preUpdate(s){t(this,G).call(this,s).forEach(e=>{ie(P.vec2[e],I.mat2[e])})}postUpdate(s){t(this,F).call(this,s).forEach(e=>{ie(P.vec2[e],I.mat2[e])})}},G=new WeakMap,F=new WeakMap,oe);var R;class Ae{constructor(){a(this,R,void 0);l(this,R,re(C([T])))}preUpdate(s){t(this,R).call(this,s).forEach(e=>{const i=T.eid[e];if(we(s,P,i))switch(T.type[e]){case B.Set:Fe(P.vec2[i],T.vec2[e]);break;case B.Add:Re(P.vec2[i],T.vec2[e]);break}})}}R=new WeakMap;function Ge(n,s,e){return(i,o)=>(W(i,T,o),T.type[o]=B.Set,T.eid[o]=n,ae(T.vec2[o],s,e),o)}function Fe(n,s){n[0]=s[0],n[1]=s[1]}function ae(n,s,e){n[0]=s,n[1]=e}function Re(n,s){n[0]+=s[0],n[1]+=s[1]}function ie(n,s){n[0]=Math.min(Math.max(s[0],n[0]),s[2]),n[1]=Math.min(Math.max(s[1],n[1]),s[3])}const qe=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/i;function Qe(n){if(typeof n!="string"||!n)return null;const s=n.toLowerCase();return qe.test(s)&&["8","9","a","b"].indexOf(s.charAt(19))!==-1?s:null}var f,q,g,y,v,Q,$,_,z,H,ce,K,he,V,le,X,ue,N,ne,J,de,Y,pe;class $e extends u.Plugins.BasePlugin{constructor(e){super(e);a(this,H);a(this,K);a(this,V);a(this,X);a(this,N);a(this,J);a(this,Y);a(this,f,null);a(this,q,null);a(this,g,null);a(this,y,null);a(this,v,!1);a(this,Q,void 0);a(this,$,void 0);a(this,_,void 0);a(this,z,void 0);l(this,Q,new Promise(i=>{l(this,$,i)})),l(this,_,new Promise(i=>{l(this,z,i)}))}init({remote:e=null,enabled:i=!1}){l(this,g,Qe(e)),l(this,v,i||!!e)&&(l(this,f,new Te),t(this,f).on("connection",o=>E(this,N,ne).call(this,o)).on("open",o=>E(this,J,de).call(this,o)).on("error",o=>E(this,Y,pe).call(this,o)))}start(){t(this,v)&&(t(this,f).disconnected&&!t(this,f).destroyed&&t(this,f).reconnect(),t(this,g)&&t(this,f).connect(t(this,g)))}stop(){t(this,v)&&t(this,f).disconnect()}sendText(e){t(this,v)&&t(this,y)&&t(this,y).send(e)}sendSync(e){t(this,v)&&t(this,y)&&t(this,y).send(e)}destroy(){t(this,v)&&t(this,f).destroy()}get id(){return t(this,q)}get remote(){return t(this,g)}get open(){return t(this,Q)}get connect(){return t(this,_)}get enabled(){return t(this,v)}}f=new WeakMap,q=new WeakMap,g=new WeakMap,y=new WeakMap,v=new WeakMap,Q=new WeakMap,$=new WeakMap,_=new WeakMap,z=new WeakMap,H=new WeakSet,ce=function(){console.log("open"),t(this,y).on("close",()=>E(this,K,he).call(this)).on("data",e=>E(this,V,le).call(this,e)).on("error",e=>E(this,X,ue).call(this,e))},K=new WeakSet,he=function(){console.log("close")},V=new WeakSet,le=function(e){console.log(e)},X=new WeakSet,ue=function(e){console.error(e)},N=new WeakSet,ne=function(e){l(this,y,e),t(this,g)||l(this,g,e.peer),t(this,z).call(this),t(this,y).on("open",()=>E(this,H,ce).call(this))},J=new WeakSet,de=function(e){l(this,q,e),t(this,$).call(this),t(this,g)&&E(this,N,ne).call(this,t(this,f).connect(t(this,g)))},Y=new WeakSet,pe=function(e){console.error(e)};class _e extends u.Scene{constructor(){super({key:"GameOver"})}preload(){}create(){this.data.set({score:0,lives:3}),this.add.text(200,200,"GAME OVER")}}class ze extends u.Scene{constructor(){super("Game");U(this,"ecs")}init(){}create(){this.scene.launch("UI"),this.data.set({level:0,lives:3}),this.ecs.addSystem("position-request",new Ae),this.ecs.addSystem("position-limits",new je);const e=this.ecs.addEntity(Me(10,10),Oe(0,0,40,40));this.ecs.request(Ge(e,30,50));const i=this.make.tilemap({key:"map"}),o=i.addTilesetImage("TilesetInterior","TilesetInterior"),r=i.addTilesetImage("TilesetInteriorFloor","TilesetInteriorFloor"),c=i.addTilesetImage("TilesetDungeon","TilesetDungeon");i.createLayer("Floor",[r],40,40);const j=i.createLayer("Walls",[o],40,40),b=i.createLayer("Stones",[c],40,40);j.setCollision([162,166,163,184,210,244,215,179,291,262,279,195,245,276,273,274,246,278,198,280,275,261,193,310,307,311]),b.setCollision(739),this.sys.events.on("wake",this.wake,this)}openMenu(){this.scene.sleep("UI"),this.scene.switch("Menu")}wake(){this.scene.run("UI")}}class Ne extends u.Scene{constructor(){super({key:"InviteLink"});U(this,"peerjs")}preload(){this.load.image("nine","assets/ui/nine.png"),this.load.image("nineLight","assets/ui/nineLight.png")}create(){const e=`${location.origin}${location.pathname}?r=${this.peerjs.id}`;console.log(e);const{modules:{size:i,data:o}}=Pe(e),r=Array.from({length:i},(j,b)=>Array.from(o.subarray(i*b,i*(b+1))).map(S=>45-S)),c=this.make.tilemap({data:r,tileWidth:16,tileHeight:16});this.add.nineslice(this.scale.width/2,this.scale.height/2,"nineLight","nineLight",340,340,16,16,16,16),c.createLayer(0,[c.addTilesetImage("TilesetDungeon")],92,92).setScale(.5),this.peerjs.connect.then(()=>{this.scene.switch("Game")})}startGame(){this.scene.switch("Game")}}class We extends u.Scene{constructor(){super({key:"Menu"})}preload(){}create(){}closeMenu(){this.scene.switch("Game")}}class Be extends u.Scene{constructor(){super({key:"Preload"});U(this,"peerjs")}preload(){this.load.pack("pack","assets/pack.json"),this.load.atlasXML("ui","assets/ui/atlas.png","assets/ui/atlas.xml")}create(){this.peerjs.enabled?this.peerjs.open.then(()=>{this.peerjs.remote?this.scene.switch("Game"):this.scene.switch("InviteLink")}):this.scene.switch("Game")}}class He extends u.Scene{constructor(){super({key:"UI"});U(this,"scoreText",null);U(this,"livesText",null)}preload(){}create(){this.data.set({score:0,lives:3}),this.scoreText=this.add.text(44,0,"Score: "+this.data.get("score"),{fontFamily:"Pixel",fontSize:"24px"}),this.livesText=this.add.text(384,0,"Lives: "+this.data.get("lives"),{fontFamily:"Pixel",fontSize:"24px"})}setScore(e){var i;this.data.set("score",e),(i=this.scoreText)==null||i.setText("Score: "+e)}setLives(e){var i;this.data.set("lives",e),(i=this.livesText)==null||i.setText("Lives: "+e)}}class Ke extends u.Game{constructor(s=480,e=480){const i=new URL(location.href).searchParams,o=i.get("r"),r=i.has("peerjs"),c={type:u.WEBGL,width:s,height:e,parent:"game",scale:{mode:u.Scale.FIT,autoCenter:u.Scale.CENTER_BOTH},plugins:{global:[{key:"peerjsPlugin",plugin:$e,start:!0,mapping:"peerjs",data:{remote:o,enabled:r}}],scene:[{key:"ecsPlugin",plugin:ke,mapping:"ecs"}]},scene:[Be,ze,We,He,_e,Ne],backgroundColor:"#141b1b"};super(c)}}window.bomberman=new Ke;