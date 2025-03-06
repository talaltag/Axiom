"use strict";(()=>{var e={};e.id=7007,e.ids=[7007],e.modules={98432:e=>{e.exports=require("bcryptjs")},11185:e=>{e.exports=require("mongoose")},20145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},56249:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})},16154:(e,t,r)=>{r.r(t),r.d(t,{config:()=>m,default:()=>p,routeModule:()=>f});var n={};r.r(n),r.d(n,{default:()=>c});var o=r(71802),s=r(47153),a=r(56249),i=r(98432),u=r.n(i),l=r(39352),d=r(70971);if(!d.Z)throw Error("Failed to import User model");async function c(e,t){if("POST"!==e.method)return t.status(405).json({message:"Method not allowed"});try{await (0,l.Z)();let{name:r,email:n,password:o,role:s="User",cName:a}=e.body;if(!r||!n||!o)return t.status(400).json({success:!1,message:"Please provide all required fields"});if(await d.Z.findOne({email:n}))return t.status(400).json({success:!1,message:"Email already exists"});let i=await u().hash(o,10),c={...(await d.Z.create({name:r,email:n,password:i,role:s,cName:a})).toObject(),password:void 0};return t.status(201).json({success:!0,data:c})}catch(e){t.status(500).json({success:!1,message:e instanceof Error?e.message:"Server error during login"})}}let p=(0,a.l)(n,"default"),m=(0,a.l)(n,"config"),f=new o.PagesAPIRouteModule({definition:{kind:s.x.PAGES_API,page:"/api/auth/register",pathname:"/api/auth/register",bundlePath:"",filename:""},userland:n})},39352:(e,t,r)=>{r.d(t,{Z:()=>i});var n=r(11185),o=r.n(n);let s="mongodb+srv://nolantapps:oCOt2NNcEQKUZcuj@impacto-cluster.s20zbjj.mongodb.net/axiom?retryWrites=true&w=majority";if(!s)throw Error("Please define the MONGODB_URI environment variable inside .env.local");let a=global.mongoose;a||(a=global.mongoose={conn:null,promise:null});let i=async function(){if(a.conn)return a.conn;a.promise||(a.promise=o().connect(s,{bufferCommands:!0}));try{return a.conn=await a.promise,console.log("MongoDB Connected Successfully"),a.conn}catch(e){throw a.promise=null,console.error("MongoDB Connection Error:",e),e}}},70971:(e,t,r)=>{r.d(t,{Z:()=>a});var n=r(11185),o=r.n(n);let s=new(o()).Schema({name:{type:String,required:!0},walletBalance:{type:Number,default:0},stripeConnectId:{type:String,default:null},stripeAccountStatus:{type:String,enum:["pending","active","rejected","restricted"],default:"pending"},email:{type:String,required:!0,unique:!0},password:{type:String,required:!0},role:{type:String,enum:["Admin","User","Agent","Super"],default:"User"},cName:String,profileImage:{type:String,required:!1},friends:[{type:o().Schema.Types.ObjectId,ref:"User"}],createdAt:{type:Date,default:Date.now}}),a=o().models.User||o().model("User",s)},47153:(e,t)=>{var r;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return r}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(r||(r={}))},71802:(e,t,r)=>{e.exports=r(20145)}};var t=require("../../../webpack-api-runtime.js");t.C(e);var r=t(t.s=16154);module.exports=r})();