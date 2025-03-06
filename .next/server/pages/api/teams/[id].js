"use strict";(()=>{var e={};e.id=6658,e.ids=[6658],e.modules={11185:e=>{e.exports=require("mongoose")},20145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},56249:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})},3808:(e,t,r)=>{r.r(t),r.d(t,{config:()=>c,default:()=>l,routeModule:()=>p});var n={};r.r(n),r.d(n,{default:()=>m});var i=r(71802),o=r(47153),a=r(56249),s=r(39352),u=r(16374),d=r(76319);async function m(e,t){let{id:r}=e.query;if(await (0,s.Z)(),"GET"===e.method)try{let e=await u.Z.findById(r);if(console.log("team",e),!e)return t.status(404).json({success:!1,message:"Team not found"});let n=await d.Z.findById(e.tournament);if(!n)return t.status(404).json({success:!1,message:"Tournament not found"});t.status(200).json({success:!0,data:{team:e,tournament:n}})}catch(e){t.status(500).json({success:!1,message:e.message})}else t.status(405).json({success:!1,message:"Method not allowed"})}let l=(0,a.l)(n,"default"),c=(0,a.l)(n,"config"),p=new i.PagesAPIRouteModule({definition:{kind:o.x.PAGES_API,page:"/api/teams/[id]",pathname:"/api/teams/[id]",bundlePath:"",filename:""},userland:n})},39352:(e,t,r)=>{r.d(t,{Z:()=>s});var n=r(11185),i=r.n(n);let o="mongodb+srv://nolantapps:oCOt2NNcEQKUZcuj@impacto-cluster.s20zbjj.mongodb.net/axiom?retryWrites=true&w=majority";if(!o)throw Error("Please define the MONGODB_URI environment variable inside .env.local");let a=global.mongoose;a||(a=global.mongoose={conn:null,promise:null});let s=async function(){if(a.conn)return a.conn;a.promise||(a.promise=i().connect(o,{bufferCommands:!0}));try{return a.conn=await a.promise,console.log("MongoDB Connected Successfully"),a.conn}catch(e){throw a.promise=null,console.error("MongoDB Connection Error:",e),e}}},16374:(e,t,r)=>{r.d(t,{Z:()=>a});var n=r(11185),i=r.n(n);let o=new(i()).Schema({name:{type:String,required:!0,unique:!0},members:[{type:i().Schema.Types.ObjectId,ref:"User"}],createdAt:{type:Date,default:Date.now}}),a=i().models.Team||i().model("Team",o)},76319:(e,t,r)=>{r.d(t,{Z:()=>a});var n=r(11185),i=r.n(n);let o=new(i()).Schema({name:{type:String,required:!0},type:{type:String,required:!0},game:{type:String,required:!0},platform:{type:String,required:!0},gameMode:{type:String,required:!0},teamSize:{type:String,required:!0},date:{type:String,required:!0},time:{type:String,required:!0},end:{type:String,required:!0},entryFee:{type:String,required:!0},category:{type:String,required:!0},restrictions:{type:String,required:!0},hasLimit:{type:String,required:!0},limit:{type:String},description:{type:String,required:!0},attributes:{type:String,required:!0},totalPrizePool:{type:String,required:!0},winnerCount:{type:Number,required:!0},prizeSplit:[Number],paymentMethod:{type:String,required:!0},images:[{type:String}],status:{type:String,required:!0}},{timestamps:!0}),a=i().models.Tournament||i().model("Tournament",o)},47153:(e,t)=>{var r;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return r}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(r||(r={}))},71802:(e,t,r)=>{e.exports=r(20145)}};var t=require("../../../webpack-api-runtime.js");t.C(e);var r=t(t.s=3808);module.exports=r})();