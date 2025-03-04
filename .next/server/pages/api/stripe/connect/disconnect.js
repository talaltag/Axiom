"use strict";(()=>{var e={};e.id=7107,e.ids=[7107],e.modules={11185:e=>{e.exports=require("mongoose")},20145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},36090:e=>{e.exports=import("stripe")},56249:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,n){return n in t?t[n]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,n)):"function"==typeof t&&"default"===n?t:void 0}}})},95902:(e,t,n)=>{n.a(e,async(e,r)=>{try{n.r(t),n.d(t,{config:()=>d,default:()=>u,routeModule:()=>l});var o=n(71802),s=n(47153),a=n(56249),i=n(67682),c=e([i]);i=(c.then?(await c)():c)[0];let u=(0,a.l)(i,"default"),d=(0,a.l)(i,"config"),l=new o.PagesAPIRouteModule({definition:{kind:s.x.PAGES_API,page:"/api/stripe/connect/disconnect",pathname:"/api/stripe/connect/disconnect",bundlePath:"",filename:""},userland:i});r()}catch(e){r(e)}})},39352:(e,t,n)=>{n.d(t,{Z:()=>i});var r=n(11185),o=n.n(r);let s="mongodb+srv://nolantapps:oCOt2NNcEQKUZcuj@impacto-cluster.s20zbjj.mongodb.net/axiom?retryWrites=true&w=majority";if(!s)throw Error("Please define the MONGODB_URI environment variable inside .env.local");let a=global.mongoose;a||(a=global.mongoose={conn:null,promise:null});let i=async function(){if(a.conn)return a.conn;a.promise||(a.promise=o().connect(s,{bufferCommands:!0}));try{return a.conn=await a.promise,console.log("MongoDB Connected Successfully"),a.conn}catch(e){throw a.promise=null,console.error("MongoDB Connection Error:",e),e}}},18606:(e,t,n)=>{n.d(t,{Q:()=>o});let r=require("next-auth/jwt");function o(e){return async(t,n)=>{let o=await (0,r.getToken)({req:t,secret:process.env.JWT_SECRET});return o?(t.user=o,e(t,n)):n.status(401).json({success:!1,message:"Not authenticated"})}}},70971:(e,t,n)=>{n.d(t,{Z:()=>a});var r=n(11185),o=n.n(r);let s=new(o()).Schema({name:{type:String,required:!0},walletBalance:{type:Number,default:0},stripeConnectId:{type:String,default:null},stripeAccountStatus:{type:String,enum:["pending","active","rejected","restricted"],default:"pending"},email:{type:String,required:!0,unique:!0},password:{type:String,required:!0},role:{type:String,enum:["Admin","User","Agent","Super"],default:"User"},cName:String,profileImage:{type:String,required:!1},friends:[{type:o().Schema.Types.ObjectId,ref:"User"}],createdAt:{type:Date,default:Date.now}}),a=o().models.User||o().model("User",s)},67682:(e,t,n)=>{n.a(e,async(e,r)=>{try{n.r(t),n.d(t,{default:()=>l});var o=n(18606),s=n(39352),a=n(70971),i=n(36090),c=e([i]);let d=new(i=(c.then?(await c)():c)[0]).default(process.env.STRIPE_SECRET_KEY,{apiVersion:"2023-10-16"});async function u(e,t){if("POST"!==e.method)return t.status(405).json({success:!1,message:"Method not allowed"});try{await (0,s.Z)();let n=e.user.id,r=await a.Z.findById(n);if(!r||!r.stripeConnectId)return t.status(404).json({success:!1,message:"User or Stripe account not found"});await d.accounts.del(r.stripeConnectId),await a.Z.findByIdAndUpdate(n,{$unset:{stripeConnectId:1},stripeAccountStatus:null}),t.status(200).json({success:!0})}catch(e){console.error("Stripe disconnect error:",e),t.status(500).json({success:!1,message:"Failed to disconnect Stripe account",error:e.message})}}let l=(0,o.Q)(u);r()}catch(e){r(e)}})},47153:(e,t)=>{var n;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return n}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(n||(n={}))},71802:(e,t,n)=>{e.exports=n(20145)}};var t=require("../../../../webpack-api-runtime.js");t.C(e);var n=t(t.s=95902);module.exports=n})();