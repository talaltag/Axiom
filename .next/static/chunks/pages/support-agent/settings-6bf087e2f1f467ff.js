(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7246],{44704:function(e,s,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/support-agent/settings",function(){return t(39572)}])},70525:function(e,s,t){"use strict";t.d(s,{Z:function(){return p}});var r=t(85893),o=t(67294),n=t(58589),i=t(98842),a=t(25062),l=t(4683),d=t(38824),c=t(77424),h=t(41664),x=t.n(h),f=t(25675),m=t.n(f);function p(e){let{role:s}=e,[t,h]=(0,o.useState)([]),[f,p]=(0,o.useState)(0);(0,o.useEffect)(()=>{u()},[]);let u=async()=>{try{let e=localStorage.getItem("token"),s=await fetch("/api/notifications",{headers:{Authorization:"Bearer ".concat(e)}}),t=await s.json();t.success&&(h(t.data),p(t.data.filter(e=>!e.isRead).length))}catch(e){console.error("Error fetching notifications:",e)}};return(0,r.jsxs)(n.Z,{children:[(0,r.jsxs)(i.Z,{nav:!0,className:"position-relative",children:[(0,r.jsx)(c.Z,{size:20}),f>0&&(0,r.jsx)(a.Z,{color:"danger",pill:!0,className:"position-absolute",style:{top:"-5px",right:"-5px"},children:f})]}),(0,r.jsxs)(l.Z,{end:!0,className:"notification-dropdown p-0",style:{width:"320px",maxHeight:"400px"},children:[(0,r.jsxs)("div",{className:"p-2 border-bottom d-flex justify-content-between align-items-center",children:[(0,r.jsx)("h6",{className:"mb-0",children:"Notifications"}),(0,r.jsx)(x(),{href:s?"/".concat(s,"/notifications"):"/user/notifications",className:"text-muted small",children:"View All"})]}),(0,r.jsx)("div",{style:{maxHeight:"300px",overflowY:"auto"},children:0===t.length?(0,r.jsx)(d.Z,{text:!0,children:"No notifications"}):t.slice(0,5).map(e=>(0,r.jsx)(d.Z,{className:"border-bottom",children:(0,r.jsxs)("div",{className:"d-flex align-items-center",children:[(0,r.jsx)(m(),{src:"/user1.png",alt:"User",width:40,height:40,className:"rounded-circle me-2"}),(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{className:"fw-bold",children:e.title}),(0,r.jsx)("small",{className:"text-muted",children:new Date(e.createdAt).toLocaleString()})]})]})},e._id))})]})]})}},36931:function(e,s,t){"use strict";t.d(s,{Z:function(){return P}});var r=t(85893),o=t(67294),n=t(79862),i=t(84082),a=t(35510),l=t(16987),d=t(58589),c=t(98842),h=t(4683),x=t(38824),f=t(11163),m=t(45007),p=t(44109),u=t(25675),g=t.n(u),j=t(81912),w=t(77662),b=t(48903),Z=t(4868),y=t(70525),v=t(33299),N=t(41664),D=t.n(N);function P(e){var s,t;let{children:u}=e,N=(0,f.useRouter)(),P=(0,m.I0)(),[C,S]=(0,o.useState)(!0),z=(0,v.useSession)(),k=[{text:"Chat",path:"/support-agent",icon:(0,r.jsx)(j.Z,{size:18})},{text:"Settings",path:"/support-agent/settings",icon:(0,r.jsx)(w.Z,{size:18})}];return(0,r.jsxs)("div",{className:"d-flex",children:[(0,r.jsxs)(n.Z,{vertical:!0,className:"bg-white border-end sidebar ".concat(C?"open":""),style:{width:C?"240px":"64px",height:"100vh",position:"fixed",left:0,top:0,zIndex:1030,transition:"all 0.3s ease-in-out"},children:[(0,r.jsx)("div",{className:"p-3 d-flex align-items-center mb-2",children:(0,r.jsxs)("div",{className:"d-flex w-100 align-items-center justify-content-between",children:[C&&(0,r.jsx)(g(),{src:"/axiom-logo.png",alt:"Axiom",width:70,height:45}),(0,r.jsx)(i.Z,{className:"p-0",color:"initial",onClick:()=>S(!C),children:(0,r.jsx)(b.Z,{size:24,style:{transform:C?"rotate(0deg)":"rotate(180deg)",transition:"transform 0.3s ease-in-out"}})})]})}),k.map(e=>(0,r.jsx)(a.Z,{children:(0,r.jsxs)(D(),{href:e.path,className:"d-flex align-items-center mb-2 px-3 py-2 ".concat(N.pathname===e.path?"bg-warning text-dark":"text-muted"),style:{textDecoration:"none"},children:[e.icon,C&&(0,r.jsx)("span",{className:"ms-2",children:e.text})]})},e.text))]}),(0,r.jsxs)("div",{style:{marginLeft:C?"240px":"64px",transition:"margin-left 0.3s ease-in-out",width:"100%"},children:[(0,r.jsx)(l.Z,{className:"bg-white border-bottom px-4",container:!1,children:(0,r.jsx)(n.Z,{className:"ms-auto d-flex align-items-center",navbar:!0,children:(0,r.jsxs)("div",{className:"d-flex align-items-center me-3",children:[(0,r.jsx)(y.Z,{role:"support-agent"})," ",(0,r.jsxs)(d.Z,{dropup:!0,inNavbar:!0,nav:!0,className:"ms-3",children:[(0,r.jsx)(c.Z,{nav:!0,children:(0,r.jsx)(g(),{src:(null==z?void 0:null===(t=z.data)||void 0===t?void 0:null===(s=t.user)||void 0===s?void 0:s.profileImage)||"/profile-avatar.png",alt:"User",width:32,height:32,className:"rounded-circle"})}),(0,r.jsx)(h.Z,{end:!0,className:"position-absolute",children:(0,r.jsxs)(x.Z,{onClick:()=>{P((0,p.kS)()),(0,v.signOut)({redirect:!1}).then(()=>N.push("/auth/login"))},children:[(0,r.jsx)(Z.Z,{size:14,className:"me-2"}),"Logout"]})})]})]})})}),(0,r.jsx)("main",{className:"p-4",children:u})]})]})}},39572:function(e,s,t){"use strict";t.r(s),t.d(s,{default:function(){return w}});var r=t(85893),o=t(67294),n=t(53637),i=t(35773),a=t(95305),l=t(21442),d=t(89163),c=t(3126),h=t(87261),x=t(60994),f=t(35762),m=t(84082),p=t(44309),u=t(12590),g=t(36931),j=t(33299);function w(){let[e,s]=(0,o.useState)(!1),[t,w]=(0,o.useState)(!1),[b,Z]=(0,o.useState)(!1),y=(0,j.useSession)(),[v,N]=(0,o.useState)({name:"",oldPassword:"",newPassword:"",confirmPassword:""}),D=async e=>{if(e.preventDefault(),!v.name.trim()){alert("Full name is required");return}let s=v.oldPassword||v.newPassword||v.confirmPassword;if(s){if(!v.oldPassword||!v.newPassword||!v.confirmPassword){alert("All password fields are required when updating password");return}if(v.newPassword!==v.confirmPassword){alert("New password and confirm password do not match");return}}try{let e=new FormData;e.append("name",v.name),s&&(e.append("oldPassword",v.oldPassword),e.append("newPassword",v.newPassword));let t=document.querySelector('input[type="file"]');t&&t.files&&t.files[0]&&e.append("profileImage",t.files[0]);let r=await fetch("/api/agent/profile",{method:"PUT",body:e}),o=await r.json();if(r.ok)alert("Profile updated successfully"),N(e=>({...e,oldPassword:"",newPassword:"",confirmPassword:""}));else throw Error(o.message||"Failed to update profile")}catch(e){console.error("Error updating profile:",e),alert(e.message||"Failed to update profile")}},P=r=>{switch(r){case"old":s(!e);break;case"new":w(!t);break;case"confirm":Z(!b)}};return(0,o.useEffect)(()=>{var e;(null==y?void 0:null===(e=y.data)||void 0===e?void 0:e.user)&&N({...v,name:y.data.user.name})},[y]),(0,r.jsx)(g.Z,{children:(0,r.jsxs)(n.Z,{fluid:!0,className:"px-4 py-2",children:[(0,r.jsx)("div",{className:"mb-1",children:(0,r.jsx)("h2",{style:{marginBottom:"6px",fontSize:"24px",fontWeight:500,color:"#101828"},children:"Settings"})}),(0,r.jsx)("p",{style:{color:"#667085",fontSize:"14px",marginBottom:"32px"},children:"Manage your team and preferences here."}),(0,r.jsx)(i.Z,{children:(0,r.jsx)(a.Z,{md:8,style:{width:"100%"},children:(0,r.jsxs)("div",{className:"mb-4",children:[(0,r.jsxs)("div",{style:{position:"relative",width:"fit-content",marginBottom:"2rem"},children:[(0,r.jsx)("img",{src:"/user1.png",alt:"Profile",className:"rounded-circle",width:100,height:100}),(0,r.jsx)("div",{style:{position:"absolute",bottom:-5,right:-5,backgroundColor:"#FFD700",borderRadius:"50%",width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",border:"2px solid white"},children:(0,r.jsxs)("label",{children:[(0,r.jsx)("span",{style:{fontSize:"1.2rem"},children:"\uD83D\uDCF8"}),(0,r.jsx)("input",{type:"file",className:"d-none",accept:"image/*",onChange:e=>{if(e.target.files&&e.target.files[0]){let s=e.target.files[0],t=new FileReader;t.onloadend=()=>{let e=document.querySelector('img[alt="Profile"]');e&&"string"==typeof t.result&&(e.src=t.result)},t.readAsDataURL(s)}}})]})})]}),(0,r.jsxs)(l.Z,{onSubmit:D,children:[(0,r.jsx)(i.Z,{children:(0,r.jsx)(a.Z,{md:6,children:(0,r.jsxs)(d.Z,{children:[(0,r.jsx)(c.Z,{style:{color:"#344054",fontSize:"14px",fontWeight:"500",marginBottom:"6px"},children:"Full Name"}),(0,r.jsx)(h.Z,{type:"text",value:v.name,onChange:e=>N({...v,name:e.target.value}),placeholder:"Full name",style:{height:"44px",backgroundColor:"#fff",borderColor:"#D0D5DD",color:"#667085",fontSize:"16px",padding:"10px 14px"}})]})})}),(0,r.jsx)("h5",{className:"mt-4 mb-3",children:"Password"}),(0,r.jsxs)(i.Z,{children:[(0,r.jsx)(a.Z,{md:4,children:(0,r.jsxs)(d.Z,{children:[(0,r.jsx)(c.Z,{style:{color:"#344054",fontSize:"14px",fontWeight:"500",marginBottom:"6px"},children:"Old Password"}),(0,r.jsxs)(x.Z,{children:[(0,r.jsx)(h.Z,{type:e?"text":"password",value:v.oldPassword,onChange:e=>N({...v,oldPassword:e.target.value}),placeholder:"Enter...",style:{height:"44px",borderRight:"none",backgroundColor:"#fff",borderColor:"#D0D5DD",color:"#667085",fontSize:"16px"}}),(0,r.jsx)(f.Z,{className:"cursor-pointer",onClick:()=>P("old"),style:{backgroundColor:"#fff",borderLeft:"none",borderColor:"#D0D5DD"},children:e?(0,r.jsx)(p.Z,{size:20,style:{color:"#667085"}}):(0,r.jsx)(u.Z,{size:20,style:{color:"#667085"}})})]})]})}),(0,r.jsx)(a.Z,{md:4,children:(0,r.jsxs)(d.Z,{children:[(0,r.jsx)(c.Z,{style:{color:"#344054",fontSize:"14px",fontWeight:"500",marginBottom:"6px"},children:"New Password"}),(0,r.jsxs)(x.Z,{children:[(0,r.jsx)(h.Z,{type:t?"text":"password",value:v.newPassword,onChange:e=>N({...v,newPassword:e.target.value}),placeholder:"Enter...",style:{height:"44px",borderRight:"none",backgroundColor:"#fff",borderColor:"#D0D5DD",color:"#667085",fontSize:"16px"}}),(0,r.jsx)(f.Z,{className:"cursor-pointer",onClick:()=>P("new"),style:{backgroundColor:"#fff",borderLeft:"none",borderColor:"#D0D5DD"},children:t?(0,r.jsx)(p.Z,{size:20,style:{color:"#667085"}}):(0,r.jsx)(u.Z,{size:20,style:{color:"#667085"}})})]})]})}),(0,r.jsx)(a.Z,{md:4,children:(0,r.jsxs)(d.Z,{children:[(0,r.jsx)(c.Z,{style:{color:"#344054",fontSize:"14px",fontWeight:"500",marginBottom:"6px"},children:"Confirm Password"}),(0,r.jsxs)(x.Z,{children:[(0,r.jsx)(h.Z,{type:b?"text":"password",value:v.confirmPassword,onChange:e=>N({...v,confirmPassword:e.target.value}),placeholder:"Enter...",style:{height:"44px",borderRight:"none",backgroundColor:"#fff",borderColor:"#D0D5DD",color:"#667085",fontSize:"16px"}}),(0,r.jsx)(f.Z,{className:"cursor-pointer",onClick:()=>P("confirm"),style:{backgroundColor:"#fff",borderLeft:"none",borderColor:"#D0D5DD"},children:b?(0,r.jsx)(p.Z,{size:20,style:{color:"#667085"}}):(0,r.jsx)(u.Z,{size:20,style:{color:"#667085"}})})]})]})})]}),(0,r.jsx)("div",{className:"text-end mt-4",children:(0,r.jsx)(m.Z,{color:"warning",style:{width:"170px",height:"44px",backgroundColor:"#FFD700",border:"none",borderRadius:"8px",fontSize:"16px",fontWeight:500,float:"right"},children:"Update"})})]})]})})})]})})}}},function(e){e.O(0,[9594,1664,5714,8682,6201,2888,9774,179],function(){return e(e.s=44704)}),_N_E=e.O()}]);