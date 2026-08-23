import{a as e,n as t,t as n}from"./jsx-runtime-B-hcVAMW.js";import{t as r}from"./useNavigate-BkLYxs6i.js";import{n as i}from"./auth-BqalzaMc.js";var a=e(t()),o=n(),s=[`A`,`H`,`S`,`K`,`अ`,`क`,`म`,`स`,`⏎`,`⇧`,`␣`,`B`,`T`,`न`,`र`],c=[`c1`,`c2`,`c3`,`c4`];function l({side:e}){let t=(0,a.useMemo)(()=>{let t=[];for(let n=0;n<4;n++)for(let r=0;r<7;r++){let i=`iso-key `+c[(n+r)%c.length];n>=2&&(i+=` dim`),n>=3&&(i+=` faint`),t.push({id:`${e}-${n}-${r}`,cls:i,char:s[Math.floor(Math.random()*s.length)]})}return t},[e]);return(0,o.jsx)(`div`,{className:`iso-floor ${e}`,children:(0,o.jsx)(`div`,{className:`iso-grid`,children:t.map(e=>(0,o.jsx)(`div`,{className:e.cls,children:e.char},e.id))})})}function u(){let[e,t]=(0,a.useState)(`login`),[n,s]=(0,a.useState)(``),[c,u]=(0,a.useState)(``),[d,f]=(0,a.useState)(``),[p,m]=(0,a.useState)(!1),[h,g]=(0,a.useState)(!1),[_,v]=(0,a.useState)(!1),[y,b]=(0,a.useState)(``),[x,S]=(0,a.useState)(!1),[C,w]=(0,a.useState)(!1),[T,E]=(0,a.useState)(!1),[D,O]=(0,a.useState)(``),{login:k,signup:A,resetPassword:j,logout:M}=i();r();let N=e===`signup`,P=()=>{t(N?`login`:`signup`),g(!1),v(!1),S(!1)},F=e=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);return(0,o.jsxs)(`div`,{className:`login-root`,children:[(0,o.jsx)(`style`,{children:`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@500;700;800&family=Inter:wght@400;500;600;700&display=swap');

        .login-root {
          --ink:#122043; --muted:#6b7590; --primary:#2b52ff; --amber:#ff8a3d; --teal:#12b3a6; --success:#12b76a; --danger:#f04452; --line:#e3e8f2;
          margin:0; min-height:100vh; font-family:'Inter',sans-serif; color:var(--ink);
          background: radial-gradient(circle at 20% 15%, #1c2c58 0%, transparent 45%), radial-gradient(circle at 82% 85%, #0d3f52 0%, transparent 45%), linear-gradient(160deg,#0a0f24,#101a3d 55%,#0a0f24);
          display:flex; align-items:center; justify-content:center;
          position:relative; overflow:hidden; padding:24px;
        }

        /* Prevent parent app layouts from interfering */
        .login-root { width: 100vw; height: 100vh; position: fixed; top: 0; left: 0; z-index: 1000; }

        .iso-wrap { position:fixed; inset:0; z-index:0; display:flex; justify-content:space-between; align-items:flex-end; padding:0 2vw 0; pointer-events:none; }
        .iso-floor { perspective:900px; perspective-origin:50% 0%; width:46vw; max-width:620px; height:56vh; display:flex; align-items:flex-end; justify-content:center; }
        .iso-floor.left { transform-origin:right bottom; }
        .iso-floor.right { transform-origin:left bottom; }
        .iso-grid { display:grid; grid-template-columns:repeat(7,54px); grid-auto-rows:54px; gap:9px; transform:rotateX(58deg) rotateZ(0deg); }
        .iso-floor.left .iso-grid { transform:rotateX(58deg) rotateZ(18deg) translateX(6%); }
        .iso-floor.right .iso-grid { transform:rotateX(58deg) rotateZ(-18deg) translateX(-6%); }
        .iso-key { border-radius:8px; opacity:.9; box-shadow:0 6px 0 rgba(0,0,0,.28); display:flex; align-items:center; justify-content:center; font-family:'Manrope',sans-serif; font-weight:800; font-size:15px; color:rgba(255,255,255,.85); }
        .iso-key.c1 { background:linear-gradient(160deg,#2b52ff,#1b3ad1); }
        .iso-key.c2 { background:linear-gradient(160deg,#ff8a3d,#e06e22); }
        .iso-key.c3 { background:linear-gradient(160deg,#12b3a6,#0d8a80); }
        .iso-key.c4 { background:linear-gradient(160deg,#2a3564,#1a2247); }
        .iso-key.dim { opacity:.45; }
        .iso-key.faint { opacity:.22; }

        .vignette { position:fixed; inset:0; z-index:1; pointer-events:none; background:radial-gradient(circle at 50% 55%, transparent 0%, transparent 18%, rgba(10,15,36,.55) 46%, rgba(10,15,36,.92) 72%); }

        .card { position:relative; z-index:2; width:100%; max-width:400px; background:#fff; border-radius:24px; padding:38px 34px 30px; box-shadow:0 40px 80px -25px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.06); }
        .badge-wrap { display:flex; justify-content:center; margin-bottom:18px; }
        .badge { width:54px; height:54px; border-radius:16px; background:linear-gradient(135deg,var(--primary),var(--teal)); display:flex; align-items:center; justify-content:center; box-shadow:0 12px 22px -8px rgba(43,82,255,.5); }
        .badge svg { width:24px; height:24px; }
        .card h1 { font-family:'Manrope',sans-serif; font-weight:800; font-size:24px; text-align:center; margin:0 0 4px; color:var(--ink); }
        .sub { text-align:center; color:var(--muted); font-size:13.5px; margin:0 0 26px; font-family:'Inter',sans-serif; }

        .field { margin-bottom:16px; text-align:left; }
        .field label { display:block; font-size:13px; font-weight:700; color:var(--ink); margin-bottom:6px; font-family:'Inter',sans-serif; }
        .input-shell { position:relative; display:flex; align-items:center; background:#fff; border-radius:12px; border:1.5px solid var(--line); transition:.15s ease; }
        .input-shell:focus-within:not(.error) { border-color:var(--primary); box-shadow:0 0 0 4px rgba(43,82,255,.12); }
        .input-shell.error { border-color:var(--danger); box-shadow:0 0 0 4px rgba(240,68,82,.1); }
        .input-shell input { flex:1; border:none; outline:none; background:transparent; padding:12px 14px; font-size:14.5px; font-family:'Inter',sans-serif; color:var(--ink); border-radius:12px; width:100%; }
        .input-shell input::placeholder { color:#a7b0c4; }
        .eye-btn { background:none; border:none; cursor:pointer; padding:8px 12px 8px 4px; color:var(--muted); display:flex; }
        .eye-btn:hover { color:var(--ink); }
        .err-msg { font-size:11.5px; color:var(--danger); margin-top:5px; height:14px; opacity:0; transition:.15s ease; text-align:left; }
        .err-msg.show { opacity:1; }

        .row-between { display:flex; justify-content:flex-end; margin:2px 0 20px; }
        .link { color:var(--primary); font-size:13px; font-weight:600; text-decoration:none; cursor:pointer; }
        .link:hover { text-decoration:underline; }

        .submit-btn { width:100%; border:none; border-radius:12px; padding:14px; background:var(--ink); color:#fff; font-family:'Manrope',sans-serif; font-weight:800; font-size:15px; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; transition:transform .12s ease, background .2s ease; }
        .submit-btn:hover { background:#0a1330; }
        .submit-btn:active { transform:scale(.98); }
        .submit-btn:disabled { opacity:.75; cursor:default; }
        .spinner { width:15px;height:15px;border-radius:50%; border:2px solid rgba(255,255,255,.35); border-top-color:#fff; animation:spin .7s linear infinite; display:none; }
        .submit-btn.loading .spinner { display:inline-block; }
        @keyframes spin { to { transform:rotate(360deg); } }

        .footer-line { text-align:center; margin-top:22px; font-size:13.5px; color:var(--muted); }

        .success-view { display:none; text-align:center; }
        .success-view.show { display:block; animation:fadeUp .5s ease forwards; }
        .form-view.hide { display:none; }
        @keyframes fadeUp { from {opacity:0; transform:translateY(10px);} to {opacity:1; transform:translateY(0);} }
        .check-wrap { width:60px;height:60px;border-radius:50%;margin:0 auto 16px;background:rgba(18,183,106,.1); display:flex;align-items:center;justify-content:center; }
        .success-view h2 { font-family:'Manrope',sans-serif; font-weight:800; font-size:19px; margin:0 0 6px; color:var(--ink); }
        .success-view p { color:var(--muted); font-size:13.5px; margin:0 0 22px; }
        .ghost-btn { border:1.5px solid var(--line); background:#fff; color:var(--ink); font-family:'Manrope',sans-serif; font-weight:700; font-size:13.5px; padding:11px 20px; border-radius:12px; cursor:pointer; }
        .ghost-btn:hover { background:#f7f8fb; }

        @media (max-width:720px){ .iso-wrap { display:none; } }
      `}),(0,o.jsxs)(`div`,{className:`iso-wrap`,children:[(0,o.jsx)(l,{side:`left`}),(0,o.jsx)(l,{side:`right`})]}),(0,o.jsx)(`div`,{className:`vignette`}),(0,o.jsxs)(`div`,{className:`card`,children:[(0,o.jsx)(`div`,{className:`badge-wrap`,children:(0,o.jsx)(`div`,{className:`badge`,children:(0,o.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`2`,y:`6`,width:`20`,height:`13`,rx:`3`,stroke:`white`,strokeWidth:1.8}),(0,o.jsx)(`path`,{d:`M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h8`,stroke:`white`,strokeWidth:1.8,strokeLinecap:`round`})]})})}),(0,o.jsxs)(`div`,{className:`form-view ${T?`hide`:``}`,children:[(0,o.jsx)(`h1`,{children:N?`Create account`:`Welcome back`}),(0,o.jsx)(`p`,{className:`sub`,children:N?`नया खाता बनाएं`:`अपने खाते में प्रवेश करें`}),(0,o.jsxs)(`form`,{onSubmit:async e=>{e.preventDefault();let t=!0;if(F(c.trim())?g(!1):(g(!0),t=!1),d.length<6?(v(!0),t=!1):v(!1),t)if(w(!0),N){let e=await A(n,c,d);e.error?(w(!1),b(e.error),S(!0),setTimeout(()=>S(!1),3e3)):setTimeout(()=>{w(!1),O(n.trim()),E(!0)},1300)}else{let e=await k(c,d);e.error?(w(!1),b(e.error),S(!0),setTimeout(()=>S(!1),3e3)):setTimeout(()=>{w(!1),E(!0)},1300)}},children:[N&&(0,o.jsxs)(`div`,{className:`field`,children:[(0,o.jsx)(`label`,{children:`Full name`}),(0,o.jsx)(`div`,{className:`input-shell`,children:(0,o.jsx)(`input`,{type:`text`,placeholder:`Sazid Ahmed`,value:n,onChange:e=>s(e.target.value),required:!0})})]}),(0,o.jsxs)(`div`,{className:`field`,children:[(0,o.jsx)(`label`,{children:`Email`}),(0,o.jsx)(`div`,{className:`input-shell ${h?`error`:``}`,children:(0,o.jsx)(`input`,{type:`email`,placeholder:`you@example.com`,value:c,onChange:e=>{u(e.target.value),g(!1),S(!1)}})}),(0,o.jsx)(`div`,{className:`err-msg ${h||x?`show`:``}`,style:x?{color:`var(--success)`}:{},children:x?y:`Please enter a valid email address`})]}),(0,o.jsxs)(`div`,{className:`field`,children:[(0,o.jsx)(`label`,{children:`Password`}),(0,o.jsxs)(`div`,{className:`input-shell ${_?`error`:``}`,children:[(0,o.jsx)(`input`,{type:p?`text`:`password`,placeholder:`••••••••`,value:d,onChange:e=>{f(e.target.value),v(!1)}}),(0,o.jsx)(`button`,{className:`eye-btn`,type:`button`,"aria-label":`Show password`,onClick:()=>m(!p),children:(0,o.jsx)(`svg`,{viewBox:`0 0 24 24`,width:`19`,height:`19`,fill:`none`,stroke:`currentColor`,strokeWidth:1.8,children:p?(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(`path`,{d:`M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a20.6 20.6 0 0 1 5.06-5.94M9.9 4.24A10.94 10.94 0 0 1 12 5c7 0 11 7 11 7a20.6 20.6 0 0 1-2.16 3.19M14.12 14.12a3 3 0 1 1-4.24-4.24`}),(0,o.jsx)(`path`,{d:`M1 1l22 22`})]}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(`path`,{d:`M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z`}),(0,o.jsx)(`circle`,{cx:`12`,cy:`12`,r:`3`})]})})})]}),(0,o.jsx)(`div`,{className:`err-msg ${_?`show`:``}`,children:`Password must be at least 6 characters`})]}),(0,o.jsx)(`div`,{className:`row-between`,style:{visibility:N?`hidden`:`visible`},children:(0,o.jsx)(`a`,{className:`link`,onClick:async()=>{if(!F(c.trim())){g(!0);return}g(!1);let e=await j(c);b(e.error?e.error:`Reset link sent to your email (demo)`),S(!0),setTimeout(()=>{S(!1)},2600)},children:`Forgot password?`})}),(0,o.jsxs)(`button`,{type:`submit`,className:`submit-btn ${C?`loading`:``}`,disabled:C,children:[(0,o.jsx)(`span`,{className:`spinner`}),(0,o.jsx)(`span`,{className:`btn-text`,children:N?`Sign up`:`Login`})]})]}),(0,o.jsx)(`div`,{className:`footer-line`,children:N?(0,o.jsxs)(o.Fragment,{children:[`Already have an account? `,(0,o.jsx)(`a`,{className:`link`,onClick:P,children:`Login`})]}):(0,o.jsxs)(o.Fragment,{children:[`Don't have an account? `,(0,o.jsx)(`a`,{className:`link`,onClick:P,children:`Sign up`})]})})]}),(0,o.jsxs)(`div`,{className:`success-view ${T?`show`:``}`,children:[(0,o.jsx)(`div`,{className:`check-wrap`,children:(0,o.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`#12b76a`,strokeWidth:2.4,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,o.jsx)(`path`,{d:`M20 6 9 17l-5-5`})})}),(0,o.jsx)(`h2`,{children:N?D?`Welcome, ${D}!`:`Account created!`:`Welcome back!`}),(0,o.jsx)(`p`,{children:N?`आपका खाता सफलतापूर्वक बन गया है`:`आपने सफलतापूर्वक लॉगिन कर लिया है`}),(0,o.jsx)(`button`,{className:`ghost-btn`,onClick:async()=>{await M(),E(!1),u(``),f(``),s(``)},children:`Log out and try again`})]})]})]})}export{u as component};