"use strict";(()=>{var e={};e.id=9177,e.ids=[9177],e.modules={46486:e=>{e.exports=require("fortnite-api-io")},11185:e=>{e.exports=require("mongoose")},20145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},56249:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,n){return n in t?t[n]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,n)):"function"==typeof t&&"default"===n?t:void 0}}})},71941:(e,t,n)=>{n.r(t),n.d(t,{config:()=>p,default:()=>f,routeModule:()=>g});var s={};n.r(s),n.d(s,{default:()=>m});var r=n(71802),o=n(47153),a=n(56249),u=n(18606),i=n(39352),c=n(88631),l=n(46486),d=n.n(l);let m=(0,u.Q)(async function(e,t){let n=new(d())(process.env.FORTNITE_API_KEY,{defaultLanguage:"en",ignoreWarnings:!1});if("POST"==e.method)try{await (0,i.Z)();let{username:s}=e.body,r=await n.getAccountIdByUsername(s);if(!r.result)return t.status(500).json({success:!1,message:r.error?.code});if(!(await n.getGlobalPlayerStats(r.account_id)).result)return t.status(500).json({success:!1,message:"Failed to retrieve account stats"});let o=await c.Z.findOneAndUpdate({userId:e.user.id,platformType:"fortnite"},{accountId:r.account_id,username:s},{upsert:!0,new:!0});t.status(200).json({success:!0,message:"Account successfully integrated",data:o})}catch(e){t.status(500).json({success:!1,message:"Failed to integrate account",error:e.message})}if("GET"==e.method){let{stats:s}=e.query;try{let r=await c.Z.findOne({platformType:"fortnite",userId:e.user.id});if(r&&!s){let e=await n.getGlobalPlayerStats(r.accountId);if(!e.result)return t.status(500).json({success:!1,message:e.error});t.status(200).json(e)}else r?t.status(200).json({success:!0,data:r}):t.status(404).json({success:!1,message:"Account not found"})}catch(e){t.status(500).json({success:!1,message:"Failed to integrate account",error:e.message})}}return t.status(405).json({success:!1,message:"Method not allowed"})}),f=(0,a.l)(s,"default"),p=(0,a.l)(s,"config"),g=new r.PagesAPIRouteModule({definition:{kind:o.x.PAGES_API,page:"/api/platforms/fortnite/connect",pathname:"/api/platforms/fortnite/connect",bundlePath:"",filename:""},userland:s})},39352:(e,t,n)=>{n.d(t,{Z:()=>u});var s=n(11185),r=n.n(s);let o="mongodb+srv://nolantapps:oCOt2NNcEQKUZcuj@impacto-cluster.s20zbjj.mongodb.net/axiom?retryWrites=true&w=majority";if(!o)throw Error("Please define the MONGODB_URI environment variable inside .env.local");let a=global.mongoose;a||(a=global.mongoose={conn:null,promise:null});let u=async function(){if(a.conn)return a.conn;a.promise||(a.promise=r().connect(o,{bufferCommands:!0}));try{return a.conn=await a.promise,console.log("MongoDB Connected Successfully"),a.conn}catch(e){throw a.promise=null,console.error("MongoDB Connection Error:",e),e}}},18606:(e,t,n)=>{n.d(t,{Q:()=>r});let s=require("next-auth/jwt");function r(e){return async(t,n)=>{let r=await (0,s.getToken)({req:t,secret:process.env.JWT_SECRET});return r?(t.user=r,e(t,n)):n.status(401).json({success:!1,message:"Not authenticated"})}}},88631:(e,t,n)=>{n.d(t,{Z:()=>a});var s=n(11185),r=n.n(s);let o=new(r()).Schema({userId:{type:r().Schema.Types.ObjectId,ref:"User",required:!0},platformType:{type:String,required:!0,enum:["pubg","fortnite","valorant"]},accountId:{type:String,required:!0},username:{type:String,required:!0}},{timestamps:!0}),a=r().models.Platform||r().model("Platform",o)},47153:(e,t)=>{var n;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return n}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(n||(n={}))},71802:(e,t,n)=>{e.exports=n(20145)}};var t=require("../../../../webpack-api-runtime.js");t.C(e);var n=t(t.s=71941);module.exports=n})();