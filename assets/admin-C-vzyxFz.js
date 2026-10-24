import{s as l,i as _,a as v,g as D,C as f,D as I,T as j,B as w}from"./index-C3zjQX2G.js";const c=(e="")=>String(e).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);let m,i={tab:"profile",content:null,seeded:!1,user:null};async function q(e){m=e,m.innerHTML='<div class="loading"><p>Connexion…</p></div>',m.addEventListener("click",E);const{data:t}=await l.auth.getSession();if(!t.session)return S();if(i.user=t.session.user,!await _())return O();await g()}function H(){m==null||m.removeEventListener("click",E)}function S(){m.innerHTML=`
  <div class="adm-center">
    <div class="adm-box">
      <img src="${v("baie-sprite.png")}" class="adm-sprite" alt="" />
      <h1>Dashboard de Baie Sucrée</h1>
      <p>Connecte-toi avec Discord pour modifier le site.</p>
      <button class="adm-btn discord" data-act="login">Se connecter avec Discord</button>
      <a class="adm-back" href="#top">← Retour au site</a>
    </div>
  </div>`}function O(){var t,a,n;const e=((a=(t=i.user)==null?void 0:t.user_metadata)==null?void 0:a.full_name)||((n=i.user)==null?void 0:n.email)||"ce compte";m.innerHTML=`
  <div class="adm-center">
    <div class="adm-box">
      <h1>Accès réservé</h1>
      <p>Le compte Discord <b>${c(e)}</b> n’est pas autorisé à modifier ce site.</p>
      <button class="adm-btn" data-act="logout">Se déconnecter</button>
      <a class="adm-back" href="#top">← Retour au site</a>
    </div>
  </div>`}async function g(){const{data:e,error:t}=await l.from("content").select("*").order("position");if(t)return p("Erreur de chargement : "+t.message,!0),$("");i.seeded=e.some(a=>a.collection==="profile"),i.rows=e,i.content=i.seeded?D(e):null,k()}function k(){if(!i.seeded)return $(T());$(i.tab==="profile"?B():x(i.tab))}function $(e){var n,o;const t=i.user,a=((n=t==null?void 0:t.user_metadata)==null?void 0:n.full_name)||((o=t==null?void 0:t.user_metadata)==null?void 0:o.name)||(t==null?void 0:t.email)||"";m.innerHTML=`
  <div class="adm">
    <aside class="adm-side">
      <div class="adm-logo"><img src="${v("baie-sprite.png")}" alt="" /><b>Baie Sucrée</b><small>Dashboard</small></div>
      <nav>
        ${Object.entries(f).map(([s,d])=>`<button class="adm-tab ${i.tab===s?"on":""}" data-act="tab" data-k="${s}">${d.icon} ${c(d.label)}</button>`).join("")}
      </nav>
      <div class="adm-foot">
        <a href="#top" class="adm-btn ghost">Voir le site ↗</a>
        <button class="adm-btn ghost" data-act="backup">Sauvegarde JSON</button>
        <button class="adm-btn ghost" data-act="logout">Déconnexion<br /><small>${c(a)}</small></button>
      </div>
    </aside>
    <main class="adm-main" id="adm-main">${e}</main>
  </div>
  <dialog id="dlg" class="adm-dlg"></dialog>
  <div id="toasts"></div>`}function T(){return`
  <div class="adm-card">
    <h2>Bienvenue 🫐</h2>
    <p>La base est vide. Importe le contenu de départ (la fiche de Baie Sucrée) : tu pourras ensuite tout modifier, ajouter ou supprimer.</p>
    <button class="adm-btn" data-act="seed">Importer le contenu par défaut</button>
  </div>`}function L(e,t=""){if(e.type==="heading")return`<h3 class="adm-h">${c(e.label)}</h3>`;const a=`f_${e.key}`;let n;return e.type==="textarea"?n=`<textarea id="${a}" name="${e.key}" rows="${e.rows||4}">${c(t)}</textarea>`:e.type==="select"?n=`<select id="${a}" name="${e.key}">${e.options.map(([o,s])=>`<option value="${o}" ${o===t?"selected":""}>${c(s)}</option>`).join("")}</select>`:e.type==="image"?n=`<div class="adm-img">
      <img src="${c(v(t))}" alt="" id="prev_${e.key}" ${t?"":"hidden"} />
      <input type="text" id="${a}" name="${e.key}" value="${c(t)}" placeholder="URL de l’image" />
      <label class="adm-btn ghost">Téléverser une image<input type="file" accept="image/*" data-upload="${e.key}" hidden /></label>
    </div>`:n=`<input type="text" id="${a}" name="${e.key}" value="${c(t)}" />`,`<label class="adm-field" for="${a}"><span>${c(e.label)}</span>${n}</label>`}function B(){const e=f.profile,t=i.content.profile;return`
  <header class="adm-head"><h1>${e.icon} ${e.label}</h1></header>
  <form id="form" data-kind="profile" class="adm-card">
    ${e.fields.map(a=>L(a,t[a.key]??"")).join("")}
    <div class="adm-actions"><button class="adm-btn" type="submit">Enregistrer</button></div>
  </form>`}function x(e){const t=f[e],a=i.content[e],n=o=>j[o]||o;return`
  <header class="adm-head"><h1>${t.icon} ${t.label}</h1><button class="adm-btn" data-act="add" data-k="${e}">＋ Ajouter</button></header>
  <div class="adm-list">
    ${a.length?"":'<p class="adm-empty">Rien ici pour le moment.</p>'}
    ${a.map((o,s)=>`
    <div class="adm-row">
      <div class="adm-row-t"><b>${c(o[t.title]||"(sans titre)")}</b>${t.subtitle?`<small>${c(n(o[t.subtitle]||""))}</small>`:""}</div>
      <div class="adm-row-a">
        <button class="adm-ico" title="Monter" data-act="up" data-k="${e}" data-i="${s}" ${s===0?"disabled":""}>↑</button>
        <button class="adm-ico" title="Descendre" data-act="down" data-k="${e}" data-i="${s}" ${s===a.length-1?"disabled":""}>↓</button>
        <button class="adm-ico" title="Modifier" data-act="edit" data-k="${e}" data-i="${s}">✎</button>
        <button class="adm-ico danger" title="Supprimer" data-act="del" data-k="${e}" data-i="${s}">🗑</button>
      </div>
    </div>`).join("")}
  </div>`}function y(e,t){const a=f[e],n=document.getElementById("dlg");n.innerHTML=`
  <form id="form" data-kind="item" data-k="${e}" data-id="${(t==null?void 0:t._id)||""}" method="dialog">
    <h2>${t?"Modifier":"Ajouter"} · ${c(a.label)}</h2>
    ${a.fields.map(o=>L(o,(t==null?void 0:t[o.key])??"")).join("")}
    <div class="adm-actions">
      <button class="adm-btn ghost" type="button" data-act="close">Annuler</button>
      <button class="adm-btn" type="submit">Enregistrer</button>
    </div>
  </form>`,n.showModal()}async function E(e){const t=e.target.closest("[data-act]");if(!t)return;const{act:a,k:n}=t.dataset,o=Number(t.dataset.i);try{a==="login"?await l.auth.signInWithOAuth({provider:"discord",options:{redirectTo:location.origin+location.pathname+"#/admin"}}):a==="logout"?(await l.auth.signOut(),i={tab:"profile",content:null,seeded:!1,user:null},S()):a==="tab"?(i.tab=n,k()):a==="close"?document.getElementById("dlg").close():a==="add"?y(n,null):a==="edit"?y(n,i.content[n][o]):a==="del"?await C(n,o):a==="up"||a==="down"?await M(n,o,a==="up"?-1:1):a==="seed"?await R(t):a==="backup"&&U()}catch(s){p(s.message||String(s),!0)}}document.addEventListener("submit",async e=>{var n,o;const t=(o=(n=e.target).closest)==null?void 0:o.call(n,"#form");if(!t||!document.body.classList.contains("is-admin"))return;e.preventDefault();const a=t.querySelector("[type=submit]");a.disabled=!0;try{const s=Object.fromEntries(new FormData(t).entries());if(t.dataset.kind==="profile"){const d=i.content.profile._id,{error:r}=await l.from("content").update({data:s,updated_at:new Date().toISOString()}).eq("id",d);if(r)throw r}else{const d=t.dataset.k;if(t.dataset.id){const{error:r}=await l.from("content").update({data:s,updated_at:new Date().toISOString()}).eq("id",t.dataset.id);if(r)throw r}else{const r=i.content[d].reduce((u,h)=>Math.max(u,h._pos),-1)+1,{error:b}=await l.from("content").insert({collection:d,position:r,data:s});if(b)throw b}document.getElementById("dlg").close()}await g(),p("Enregistré ✔")}catch(s){p(s.message||String(s),!0),a.disabled=!1}});document.addEventListener("change",async e=>{var o,s;const t=(s=(o=e.target).closest)==null?void 0:s.call(o,"[data-upload]");if(!t||!t.files[0])return;const a=t.dataset.upload,n=t.files[0];try{p("Téléversement…");const d=`${Date.now()}-${n.name.replace(/[^\w.-]+/g,"_")}`,{error:r}=await l.storage.from(w).upload(d,n,{contentType:n.type});if(r)throw r;const b=l.storage.from(w).getPublicUrl(d).data.publicUrl;document.getElementById("f_"+a).value=b;const u=document.getElementById("prev_"+a);u.src=b,u.hidden=!1,p("Image téléversée ✔")}catch(d){p(d.message||String(d),!0)}});async function C(e,t){const a=i.content[e][t];if(!confirm(`Supprimer « ${a[f[e].title]||"cet élément"} » ?`))return;const{error:n}=await l.from("content").delete().eq("id",a._id);if(n)throw n;await g(),p("Supprimé")}async function M(e,t,a){var b;const n=i.content[e];if(n[t],!n[t+a])return;const s=n.map(u=>u._id);[s[t],s[t+a]]=[s[t+a],s[t]];const r=(b=(await Promise.all(s.map((u,h)=>l.from("content").update({position:h}).eq("id",u)))).find(u=>u.error))==null?void 0:b.error;if(r)throw r;await g()}async function R(e){e.disabled=!0;const t=[];for(const[n,o]of Object.entries(I))n==="profile"?t.push({collection:"profile",position:0,data:o}):o.forEach((s,d)=>t.push({collection:n,position:d,data:s}));const{error:a}=await l.from("content").insert(t);if(a)throw e.disabled=!1,a;await g(),p("Contenu importé ✔")}function U(){const e=new Blob([JSON.stringify(i.rows,null,2)],{type:"application/json"}),t=document.createElement("a");t.href=URL.createObjectURL(e),t.download=`baie-sucree-${new Date().toISOString().slice(0,10)}.json`,t.click(),URL.revokeObjectURL(t.href)}function p(e,t=!1){const a=document.getElementById("toasts");if(!a)return;const n=document.createElement("div");n.className="toast"+(t?" bad":""),n.textContent=e,a.appendChild(n),setTimeout(()=>n.remove(),3800)}export{H as cleanup,q as mount};
