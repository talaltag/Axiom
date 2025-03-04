"use strict";(()=>{var e={};e.id=3349,e.ids=[3349],e.modules={11185:e=>{e.exports=require("mongoose")},20145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},56249:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})},46133:(e,t,r)=>{r.r(t),r.d(t,{config:()=>p,default:()=>l,routeModule:()=>y});var n={};r.r(n),r.d(n,{default:()=>c});var a=r(71802),s=r(47153),i=r(56249),u=r(39352),o=r(15284),d=r(76319),m=r(70971);let c=(0,r(18606).Q)(async function(e,t){if("POST"!==e.method)return t.status(405).json({success:!1,message:"Method not allowed"});let r=e.user.id;if(!r)return t.status(401).json({success:!1,message:"Unauthorized"});let{id:n}=e.query,{paymentToken:a,paymentMethod:s,amount:i}=e.body;if((!a||!s)&&"wallet"!==s)return t.status(400).json({success:!1,message:"Payment details required"});let c=await o.Z.findById(n);if(!c)return t.status(404).json({success:!1,message:"Tournament not found"});if(Math.abs(i-parseFloat(c.tournament.entryFee))>.01)return t.status(400).json({success:!1,message:"Payment amount does not match tournament fee"});try{await (0,u.Z)(),c.memberPayments||(c.memberPayments=[]);let e=c.memberPayments?.find(e=>e.userId.toString()===r.toString())||null,n=await d.Z.findById(c.tournament);if(!n)return t.status(404).json({success:!1,message:"Tournament not found"});if(e){if("wallet"===s){let e=await m.Z.findById(r);if(!e)return t.status(404).json({success:!1,message:"User not found"});if(e.walletBalance<n.entryFee)return t.status(400).json({success:!1,message:"Insufficient wallet balance"});e.walletBalance-=n.entryFee,await e.save()}return e.paymentStatus="completed",e.paymentToken=a,e.paymentMethod=s,e.paidAt=new Date,await c.save(),t.status(200).json({success:!0,data:c})}if(c.memberPayments.push({userId:r,paymentStatus:"completed",paymentToken:a,paymentMethod:s,paidAt:new Date}),"wallet"===s){let e=await m.Z.findById(r);if(!e)return t.status(404).json({success:!1,message:"User not found"});if(e.walletBalance<n.entryFee)return t.status(400).json({success:!1,message:"Insufficient wallet balance"});e.walletBalance-=n.entryFee,await e.save()}return await c.save(),t.status(200).json({success:!0,data:c})}catch(e){return console.error("Error updating payment status:",e),t.status(500).json({success:!1,message:"Error updating payment status"})}}),l=(0,i.l)(n,"default"),p=(0,i.l)(n,"config"),y=new a.PagesAPIRouteModule({definition:{kind:s.x.PAGES_API,page:"/api/tournament-registrations/[id]/pay",pathname:"/api/tournament-registrations/[id]/pay",bundlePath:"",filename:""},userland:n})},39352:(e,t,r)=>{r.d(t,{Z:()=>u});var n=r(11185),a=r.n(n);let s="mongodb+srv://nolantapps:oCOt2NNcEQKUZcuj@impacto-cluster.s20zbjj.mongodb.net/axiom?retryWrites=true&w=majority";if(!s)throw Error("Please define the MONGODB_URI environment variable inside .env.local");let i=global.mongoose;i||(i=global.mongoose={conn:null,promise:null});let u=async function(){if(i.conn)return i.conn;i.promise||(i.promise=a().connect(s,{bufferCommands:!0}));try{return i.conn=await i.promise,console.log("MongoDB Connected Successfully"),i.conn}catch(e){throw i.promise=null,console.error("MongoDB Connection Error:",e),e}}},18606:(e,t,r)=>{r.d(t,{Q:()=>a});let n=require("next-auth/jwt");function a(e){return async(t,r)=>{let a=await (0,n.getToken)({req:t,secret:process.env.JWT_SECRET});return a?(t.user=a,e(t,r)):r.status(401).json({success:!1,message:"Not authenticated"})}}},16374:(e,t,r)=>{r.d(t,{Z:()=>i});var n=r(11185),a=r.n(n);let s=new(a()).Schema({name:{type:String,required:!0,unique:!0},members:[{type:a().Schema.Types.ObjectId,ref:"User"}],createdAt:{type:Date,default:Date.now}}),i=a().models.Team||a().model("Team",s)},76319:(e,t,r)=>{r.d(t,{Z:()=>i});var n=r(11185),a=r.n(n);let s=new(a()).Schema({name:{type:String,required:!0},type:{type:String,required:!0},game:{type:String,required:!0},platform:{type:String,required:!0},gameMode:{type:String,required:!0},teamSize:{type:String,required:!0},date:{type:String,required:!0},time:{type:String,required:!0},end:{type:String,required:!0},entryFee:{type:String,required:!0},category:{type:String,required:!0},restrictions:{type:String,required:!0},hasLimit:{type:String,required:!0},limit:{type:String},description:{type:String,required:!0},attributes:{type:String,required:!0},totalPrizePool:{type:String,required:!0},winnerCount:{type:Number,required:!0},prizeSplit:[Number],paymentMethod:{type:String,required:!0},images:[{type:String}],status:{type:String,required:!0}},{timestamps:!0}),i=a().models.Tournament||a().model("Tournament",s)},15284:(e,t,r)=>{r.d(t,{Z:()=>d});var n=r(11185),a=r.n(n),s=r(16374);let i=new(a()).Schema({userId:{type:a().Schema.Types.ObjectId,ref:"User",required:!0},paymentStatus:{type:String,enum:["pending","completed"],default:"pending"},paymentToken:String,paymentMethod:String,paidAt:Date}),u=new(a()).Schema({userId:{type:a().Schema.Types.ObjectId,ref:"User",required:!0},score:{type:String,default:0}}),o=new(a()).Schema({tournament:{type:a().Schema.Types.ObjectId,ref:"Tournament",required:!0},organizer:{type:a().Schema.Types.ObjectId,ref:"User",required:!0},team:{type:a().Schema.Types.ObjectId,ref:s.Z,required:!0},memberPayments:[i],beforeTournamentScore:[u],afterTournamentScore:[u],createdAt:{type:Date,default:Date.now}}),d=a().models.TournamentRegistration||a().model("TournamentRegistration",o)},70971:(e,t,r)=>{r.d(t,{Z:()=>i});var n=r(11185),a=r.n(n);let s=new(a()).Schema({name:{type:String,required:!0},walletBalance:{type:Number,default:0},stripeConnectId:{type:String,default:null},stripeAccountStatus:{type:String,enum:["pending","active","rejected","restricted"],default:"pending"},email:{type:String,required:!0,unique:!0},password:{type:String,required:!0},role:{type:String,enum:["Admin","User","Agent","Super"],default:"User"},cName:String,profileImage:{type:String,required:!1},friends:[{type:a().Schema.Types.ObjectId,ref:"User"}],createdAt:{type:Date,default:Date.now}}),i=a().models.User||a().model("User",s)},47153:(e,t)=>{var r;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return r}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(r||(r={}))},71802:(e,t,r)=>{e.exports=r(20145)}};var t=require("../../../../webpack-api-runtime.js");t.C(e);var r=t(t.s=46133);module.exports=r})();