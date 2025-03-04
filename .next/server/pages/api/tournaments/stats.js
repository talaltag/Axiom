"use strict";(()=>{var e={};e.id=6117,e.ids=[6117],e.modules={11185:e=>{e.exports=require("mongoose")},20145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},56249:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})},74552:(e,t,r)=>{r.r(t),r.d(t,{config:()=>p,default:()=>l,routeModule:()=>f});var a={};r.r(a),r.d(a,{default:()=>c});var n=r(71802),s=r(47153),o=r(56249),u=r(15284),d=r(18606),i=r(11185),m=r.n(i);let c=(0,d.Q)(async function(e,t){if(!process.env.MONGODB_URI)return t.status(500).json({success:!1,message:"MongoDB URI not configured"});let r=new(m()).Types.ObjectId(e.user.id);if("GET"!==e.method)return t.status(405).json({success:!1,message:"Method not allowed"});try{let e=await u.Z.aggregate([{$lookup:{from:"teams",localField:"team",foreignField:"_id",as:"teamData"}},{$unwind:"$teamData"},{$lookup:{from:"tournaments",localField:"tournament",foreignField:"_id",as:"tournamentData"}},{$unwind:"$tournamentData"},{$lookup:{from:"users",localField:"afterTournamentScore.userId",foreignField:"_id",as:"userData"}},{$match:{$or:[{organizer:r},{$and:[{"memberPayments.userId":r}]}],"tournamentData.status":"completed"}},{$sort:{"tournamentData.createdAt":-1}},{$limit:1},{$addFields:{sortedScores:{$sortArray:{input:"$afterTournamentScore",sortBy:{score:-1}}}}},{$project:{_id:1,tournament:"$tournamentData",team:"$teamData",organizer:1,afterTournamentScore:{$map:{input:"$sortedScores",as:"score",in:{userId:"$$score.userId",score:"$$score.score",user:{$arrayElemAt:[{$filter:{input:"$userData",as:"user",cond:{$eq:["$$user._id","$$score.userId"]}}},0]}}}},beforeTournamentScore:1,createdAt:"$tournamentData.createdAt"}}]);return t.status(200).json({success:!0,data:e[0]??null})}catch(e){return t.status(500).json({success:!1,message:e.message})}}),l=(0,o.l)(a,"default"),p=(0,o.l)(a,"config"),f=new n.PagesAPIRouteModule({definition:{kind:s.x.PAGES_API,page:"/api/tournaments/stats",pathname:"/api/tournaments/stats",bundlePath:"",filename:""},userland:a})},18606:(e,t,r)=>{r.d(t,{Q:()=>n});let a=require("next-auth/jwt");function n(e){return async(t,r)=>{let n=await (0,a.getToken)({req:t,secret:process.env.JWT_SECRET});return n?(t.user=n,e(t,r)):r.status(401).json({success:!1,message:"Not authenticated"})}}},16374:(e,t,r)=>{r.d(t,{Z:()=>o});var a=r(11185),n=r.n(a);let s=new(n()).Schema({name:{type:String,required:!0,unique:!0},members:[{type:n().Schema.Types.ObjectId,ref:"User"}],createdAt:{type:Date,default:Date.now}}),o=n().models.Team||n().model("Team",s)},15284:(e,t,r)=>{r.d(t,{Z:()=>i});var a=r(11185),n=r.n(a),s=r(16374);let o=new(n()).Schema({userId:{type:n().Schema.Types.ObjectId,ref:"User",required:!0},paymentStatus:{type:String,enum:["pending","completed"],default:"pending"},paymentToken:String,paymentMethod:String,paidAt:Date}),u=new(n()).Schema({userId:{type:n().Schema.Types.ObjectId,ref:"User",required:!0},score:{type:String,default:0}}),d=new(n()).Schema({tournament:{type:n().Schema.Types.ObjectId,ref:"Tournament",required:!0},organizer:{type:n().Schema.Types.ObjectId,ref:"User",required:!0},team:{type:n().Schema.Types.ObjectId,ref:s.Z,required:!0},memberPayments:[o],beforeTournamentScore:[u],afterTournamentScore:[u],createdAt:{type:Date,default:Date.now}}),i=n().models.TournamentRegistration||n().model("TournamentRegistration",d)},47153:(e,t)=>{var r;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return r}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(r||(r={}))},71802:(e,t,r)=>{e.exports=r(20145)}};var t=require("../../../webpack-api-runtime.js");t.C(e);var r=t(t.s=74552);module.exports=r})();