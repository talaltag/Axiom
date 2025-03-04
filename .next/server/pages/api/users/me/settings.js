"use strict";(()=>{var e={};e.id=9132,e.ids=[9132],e.modules={11185:e=>{e.exports=require("mongoose")},20145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},56249:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,n){return n in t?t[n]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,n)):"function"==typeof t&&"default"===n?t:void 0}}})},64994:(e,t,n)=>{n.r(t),n.d(t,{config:()=>m,default:()=>p,routeModule:()=>g});var r={};n.r(r),n.d(r,{default:()=>c});var s=n(71802),o=n(47153),a=n(56249),i=n(39352),u=n(55895),d=n(18606),l=n(70971);let c=(0,d.Q)(async function(e,t){if(await (0,i.Z)(),"POST"===e.method)try{let{module:n,type:r,enabled:s}=e.body,o=e.user.id,a=await u.Z.findOne({userId:o,module:n,type:r});a?(a.enabled=s,a.updatedAt=new Date,await a.save()):a=await u.Z.create({userId:o,module:n,type:r,enabled:s}),t.status(200).json({success:!0,data:a})}catch(e){console.error("Error saving settings:",e),t.status(500).json({success:!1,message:"Error saving settings"})}else if("GET"===e.method)try{let n=e.user.id,[r,s]=await Promise.all([u.Z.find({userId:n}),l.Z.findById(e.user.id).select("-password -friends")]);t.status(200).json({success:!0,data:{settings:r,user:s}})}catch(e){console.error("Error fetching settings:",e),t.status(500).json({success:!1,message:"Error fetching settings"})}else t.status(405).json({success:!1,message:"Method not allowed"})}),p=(0,a.l)(r,"default"),m=(0,a.l)(r,"config"),g=new s.PagesAPIRouteModule({definition:{kind:o.x.PAGES_API,page:"/api/users/me/settings",pathname:"/api/users/me/settings",bundlePath:"",filename:""},userland:r})},39352:(e,t,n)=>{n.d(t,{Z:()=>i});var r=n(11185),s=n.n(r);let o="mongodb+srv://nolantapps:oCOt2NNcEQKUZcuj@impacto-cluster.s20zbjj.mongodb.net/axiom?retryWrites=true&w=majority";if(!o)throw Error("Please define the MONGODB_URI environment variable inside .env.local");let a=global.mongoose;a||(a=global.mongoose={conn:null,promise:null});let i=async function(){if(a.conn)return a.conn;a.promise||(a.promise=s().connect(o,{bufferCommands:!0}));try{return a.conn=await a.promise,console.log("MongoDB Connected Successfully"),a.conn}catch(e){throw a.promise=null,console.error("MongoDB Connection Error:",e),e}}},18606:(e,t,n)=>{n.d(t,{Q:()=>s});let r=require("next-auth/jwt");function s(e){return async(t,n)=>{let s=await (0,r.getToken)({req:t,secret:process.env.JWT_SECRET});return s?(t.user=s,e(t,n)):n.status(401).json({success:!1,message:"Not authenticated"})}}},55895:(e,t,n)=>{n.d(t,{Z:()=>a});var r=n(11185),s=n.n(r);let o=new(s()).Schema({userId:{type:s().Schema.Types.ObjectId,ref:"User",required:!0},module:{type:String,required:!0},type:{type:String,required:!0},enabled:{type:Boolean,default:!0},createdAt:{type:Date,default:Date.now},updatedAt:{type:Date,default:Date.now}}),a=s().models.Settings||s().model("Settings",o)},70971:(e,t,n)=>{n.d(t,{Z:()=>a});var r=n(11185),s=n.n(r);let o=new(s()).Schema({name:{type:String,required:!0},walletBalance:{type:Number,default:0},stripeConnectId:{type:String,default:null},stripeAccountStatus:{type:String,enum:["pending","active","rejected","restricted"],default:"pending"},email:{type:String,required:!0,unique:!0},password:{type:String,required:!0},role:{type:String,enum:["Admin","User","Agent","Super"],default:"User"},cName:String,profileImage:{type:String,required:!1},friends:[{type:s().Schema.Types.ObjectId,ref:"User"}],createdAt:{type:Date,default:Date.now}}),a=s().models.User||s().model("User",o)},47153:(e,t)=>{var n;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return n}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(n||(n={}))},71802:(e,t,n)=>{e.exports=n(20145)}};var t=require("../../../../webpack-api-runtime.js");t.C(e);var n=t(t.s=64994);module.exports=n})();