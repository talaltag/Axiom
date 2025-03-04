"use strict";(()=>{var e={};e.id=4967,e.ids=[4967],e.modules={11185:e=>{e.exports=require("mongoose")},20145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},56249:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,n){return n in t?t[n]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,n)):"function"==typeof t&&"default"===n?t:void 0}}})},70230:(e,t,n)=>{n.r(t),n.d(t,{config:()=>d,default:()=>l,routeModule:()=>p});var r={};n.r(r),n.d(r,{default:()=>c});var s=n(71802),o=n(47153),a=n(56249),u=n(39352),i=n(70971);let c=(0,n(18606).Q)(async function(e,t){try{if(await (0,u.Z)(),"GET"===e.method)try{if(!await i.Z.findById(e.user.id))return t.status(404).json({success:!1,message:"User not found"});let{role:n="User"}=e.query,r={};r.role=n,r._id={$ne:null};let s=await i.Z.find(r).select("-password -walletBalance -friends").sort({createdAt:-1}),o=await i.Z.countDocuments(r);return t.status(200).json({success:!0,data:s,total:o})}catch(e){return t.status(401).json({success:!1,message:"Invalid token"})}return t.status(405).json({success:!1,message:"Method not allowed"})}catch(e){return console.error("Server error:",e),t.status(500).json({success:!1,message:e.message})}}),l=(0,a.l)(r,"default"),d=(0,a.l)(r,"config"),p=new s.PagesAPIRouteModule({definition:{kind:o.x.PAGES_API,page:"/api/agent/users",pathname:"/api/agent/users",bundlePath:"",filename:""},userland:r})},39352:(e,t,n)=>{n.d(t,{Z:()=>u});var r=n(11185),s=n.n(r);let o="mongodb+srv://nolantapps:oCOt2NNcEQKUZcuj@impacto-cluster.s20zbjj.mongodb.net/axiom?retryWrites=true&w=majority";if(!o)throw Error("Please define the MONGODB_URI environment variable inside .env.local");let a=global.mongoose;a||(a=global.mongoose={conn:null,promise:null});let u=async function(){if(a.conn)return a.conn;a.promise||(a.promise=s().connect(o,{bufferCommands:!0}));try{return a.conn=await a.promise,console.log("MongoDB Connected Successfully"),a.conn}catch(e){throw a.promise=null,console.error("MongoDB Connection Error:",e),e}}},18606:(e,t,n)=>{n.d(t,{Q:()=>s});let r=require("next-auth/jwt");function s(e){return async(t,n)=>{let s=await (0,r.getToken)({req:t,secret:process.env.JWT_SECRET});return s?(t.user=s,e(t,n)):n.status(401).json({success:!1,message:"Not authenticated"})}}},70971:(e,t,n)=>{n.d(t,{Z:()=>a});var r=n(11185),s=n.n(r);let o=new(s()).Schema({name:{type:String,required:!0},walletBalance:{type:Number,default:0},stripeConnectId:{type:String,default:null},stripeAccountStatus:{type:String,enum:["pending","active","rejected","restricted"],default:"pending"},email:{type:String,required:!0,unique:!0},password:{type:String,required:!0},role:{type:String,enum:["Admin","User","Agent","Super"],default:"User"},cName:String,profileImage:{type:String,required:!1},friends:[{type:s().Schema.Types.ObjectId,ref:"User"}],createdAt:{type:Date,default:Date.now}}),a=s().models.User||s().model("User",o)},47153:(e,t)=>{var n;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return n}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(n||(n={}))},71802:(e,t,n)=>{e.exports=n(20145)}};var t=require("../../../webpack-api-runtime.js");t.C(e);var n=t(t.s=70230);module.exports=n})();