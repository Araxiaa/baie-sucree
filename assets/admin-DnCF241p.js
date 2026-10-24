import{s as l,i as D,a as w,T as f,g as I,C as g,D as T,b as j,B as y}from"./index-DmZr5UW0.js";const c=(t="")=>String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]);let m,i={tab:"profile",content:null,seeded:!1,user:null};async function H(t){m=t,m.innerHTML='<div class="loading"><p>Connexion…</p></div>',m.addEventListener("click",_);const{data:e}=await l.auth.getSession();if(!e.session)return k();if(i.user=e.session.user,!await D())return B();await h()}function N(){m==null||m.removeEventListener("click",_)}function k(){m.innerHTML=`
  <div class="adm-center">
    <div class="adm-box">
      <img src="${w("baie-sprite.png")}" class="adm-sprite" alt="" />
      <h1>Dashboard de Baie Sucrée</h1>
      <p>Connecte-toi avec Discord pour modifier le site.</p>
      <button class="adm-btn discord" data-act="login">Se connecter avec Discord</button>
      <a class="adm-back" href="#top">← Retour au site</a>
    </div>
  </div>`}function B(){var e,a,n;const t=((a=(e=i.user)==null?void 0:e.user_metadata)==null?void 0:a.full_name)||((n=i.user)==null?void 0:n.email)||"ce compte";m.innerHTML=`
  <div class="adm-center">
    <div class="adm-box">
      <h1>Accès réservé</h1>
      <p>Le compte Discord <b>${c(t)}</b> n’est pas autorisé à modifier ce site.</p>
      <button class="adm-btn" data-act="logout">Se déconnecter</button>
      <a class="adm-back" href="#top">← Retour au site</a>
    </div>
  </div>`}async function h(){const{data:t,error:e}=await l.from(f).select("*").order("position");if(e)return p("Erreur de chargement : "+e.message,!0),v("");i.seeded=t.some(a=>a.collection==="profile"),i.rows=t,i.content=i.seeded?I(t):null,L()}function L(){if(!i.seeded)return v(O());v(i.tab==="profile"?x():C(i.tab))}function v(t){var n,o;const e=i.user,a=((n=e==null?void 0:e.user_metadata)==null?void 0:n.full_name)||((o=e==null?void 0:e.user_metadata)==null?void 0:o.name)||(e==null?void 0:e.email)||"";m.innerHTML=`
  <div class="adm">
    <aside class="adm-side">
      <div class="adm-logo"><img src="${w("baie-sprite.png")}" alt="" /><b>Baie Sucrée</b><small>Dashboard</small></div>
      <nav>
        ${Object.entries(g).map(([s,d])=>`<button class="adm-tab ${i.tab===s?"on":""}" data-act="tab" data-k="${s}">${d.icon} ${c(d.label)}</button>`).join("")}
      </nav>
      <div class="adm-foot">
        <a href="#top" class="adm-btn ghost">Voir le site ↗</a>
        <button class="adm-btn ghost" data-act="backup">Sauvegarde JSON</button>
        <button class="adm-btn ghost" data-act="logout">Déconnexion<br /><small>${c(a)}</small></button>
      </div>
    </aside>
    <main class="adm-main" id="adm-main">${t}</main>
  </div>
  <dialog id="dlg" class="adm-dlg"></dialog>
  <div id="toasts"></div>`}function O(){return`
  <div class="adm-card">
    <h2>Bienvenue 🫐</h2>
    <p>La base est vide. Importe le contenu de départ (la fiche de Baie Sucrée) : tu pourras ensuite tout modifier, ajouter ou supprimer.</p>
    <button class="adm-btn" data-act="seed">Importer le contenu par défaut</button>
  </div>`}function E(t,e=""){if(t.type==="heading")return`<h3 class="adm-h">${c(t.label)}</h3>`;const a=`f_${t.key}`;let n;return t.type==="textarea"?n=`<textarea id="${a}" name="${t.key}" rows="${t.rows||4}">${c(e)}</textarea>`:t.type==="select"?n=`<select id="${a}" name="${t.key}">${t.options.map(([o,s])=>`<option value="${o}" ${o===e?"selected":""}>${c(s)}</option>`).join("")}</select>`:t.type==="image"?n=`<div class="adm-img">
      <img src="${c(w(e))}" alt="" id="prev_${t.key}" ${e?"":"hidden"} />
      <input type="text" id="${a}" name="${t.key}" value="${c(e)}" placeholder="URL de l’image" />
      <label class="adm-btn ghost">Téléverser une image<input type="file" accept="image/*" data-upload="${t.key}" hidden /></label>
    </div>`:n=`<input type="text" id="${a}" name="${t.key}" value="${c(e)}" />`,`<label class="adm-field" for="${a}"><span>${c(t.label)}</span>${n}</label>`}function x(){const t=g.profile,e=i.content.profile;return`
  <header class="adm-head"><h1>${t.icon} ${t.label}</h1></header>
  <form id="form" data-kind="profile" class="adm-card">
    ${t.fields.map(a=>E(a,e[a.key]??"")).join("")}
    <div class="adm-actions"><button class="adm-btn" type="submit">Enregistrer</button></div>
  </form>`}function C(t){const e=g[t],a=i.content[t],n=o=>j[o]||o;return`
  <header class="adm-head"><h1>${e.icon} ${e.label}</h1><button class="adm-btn" data-act="add" data-k="${t}">＋ Ajouter</button></header>
  <div class="adm-list">
    ${a.length?"":'<p class="adm-empty">Rien ici pour le moment.</p>'}
    ${a.map((o,s)=>`
    <div class="adm-row">
      <div class="adm-row-t"><b>${c(o[e.title]||"(sans titre)")}</b>${e.subtitle?`<small>${c(n(o[e.subtitle]||""))}</small>`:""}</div>
      <div class="adm-row-a">
        <button class="adm-ico" title="Monter" data-act="up" data-k="${t}" data-i="${s}" ${s===0?"disabled":""}>↑</button>
        <button class="adm-ico" title="Descendre" data-act="down" data-k="${t}" data-i="${s}" ${s===a.length-1?"disabled":""}>↓</button>
        <button class="adm-ico" title="Modifier" data-act="edit" data-k="${t}" data-i="${s}">✎</button>
        <button class="adm-ico danger" title="Supprimer" data-act="del" data-k="${t}" data-i="${s}">🗑</button>
      </div>
    </div>`).join("")}
  </div>`}function S(t,e){const a=g[t],n=document.getElementById("dlg");n.innerHTML=`
  <form id="form" data-kind="item" data-k="${t}" data-id="${(e==null?void 0:e._id)||""}" method="dialog">
    <h2>${e?"Modifier":"Ajouter"} · ${c(a.label)}</h2>
    ${a.fields.map(o=>E(o,(e==null?void 0:e[o.key])??"")).join("")}
    <div class="adm-actions">
      <button class="adm-btn ghost" type="button" data-act="close">Annuler</button>
      <button class="adm-btn" type="submit">Enregistrer</button>
    </div>
  </form>`,n.showModal()}async function _(t){const e=t.target.closest("[data-act]");if(!e)return;const{act:a,k:n}=e.dataset,o=Number(e.dataset.i);try{a==="login"?await l.auth.signInWithOAuth({provider:"discord",options:{redirectTo:location.origin+location.pathname+"#/admin"}}):a==="logout"?(await l.auth.signOut(),i={tab:"profile",content:null,seeded:!1,user:null},k()):a==="tab"?(i.tab=n,L()):a==="close"?document.getElementById("dlg").close():a==="add"?S(n,null):a==="edit"?S(n,i.content[n][o]):a==="del"?await M(n,o):a==="up"||a==="down"?await A(n,o,a==="up"?-1:1):a==="seed"?await R(e):a==="backup"&&U()}catch(s){p(s.message||String(s),!0)}}document.addEventListener("submit",async t=>{var n,o;const e=(o=(n=t.target).closest)==null?void 0:o.call(n,"#form");if(!e||!document.body.classList.contains("is-admin"))return;t.preventDefault();const a=e.querySelector("[type=submit]");a.disabled=!0;try{const s=Object.fromEntries(new FormData(e).entries());if(e.dataset.kind==="profile"){const d=i.content.profile._id,{error:r}=await l.from(f).update({data:s,updated_at:new Date().toISOString()}).eq("id",d);if(r)throw r}else{const d=e.dataset.k;if(e.dataset.id){const{error:r}=await l.from(f).update({data:s,updated_at:new Date().toISOString()}).eq("id",e.dataset.id);if(r)throw r}else{const r=i.content[d].reduce((u,$)=>Math.max(u,$._pos),-1)+1,{error:b}=await l.from(f).insert({collection:d,position:r,data:s});if(b)throw b}document.getElementById("dlg").close()}await h(),p("Enregistré ✔")}catch(s){p(s.message||String(s),!0),a.disabled=!1}});document.addEventListener("change",async t=>{var o,s;const e=(s=(o=t.target).closest)==null?void 0:s.call(o,"[data-upload]");if(!e||!e.files[0])return;const a=e.dataset.upload,n=e.files[0];try{p("Téléversement…");const d=`${Date.now()}-${n.name.replace(/[^\w.-]+/g,"_")}`,{error:r}=await l.storage.from(y).upload(d,n,{contentType:n.type});if(r)throw r;const b=l.storage.from(y).getPublicUrl(d).data.publicUrl;document.getElementById("f_"+a).value=b;const u=document.getElementById("prev_"+a);u.src=b,u.hidden=!1,p("Image téléversée ✔")}catch(d){p(d.message||String(d),!0)}});async function M(t,e){const a=i.content[t][e];if(!confirm(`Supprimer « ${a[g[t].title]||"cet élément"} » ?`))return;const{error:n}=await l.from(f).delete().eq("id",a._id);if(n)throw n;await h(),p("Supprimé")}async function A(t,e,a){var b;const n=i.content[t];if(n[e],!n[e+a])return;const s=n.map(u=>u._id);[s[e],s[e+a]]=[s[e+a],s[e]];const r=(b=(await Promise.all(s.map((u,$)=>l.from(f).update({position:$}).eq("id",u)))).find(u=>u.error))==null?void 0:b.error;if(r)throw r;await h()}async function R(t){t.disabled=!0;const e=[];for(const[n,o]of Object.entries(T))n==="profile"?e.push({collection:"profile",position:0,data:o}):o.forEach((s,d)=>e.push({collection:n,position:d,data:s}));const{error:a}=await l.from(f).insert(e);if(a)throw t.disabled=!1,a;await h(),p("Contenu importé ✔")}function U(){const t=new Blob([JSON.stringify(i.rows,null,2)],{type:"application/json"}),e=document.createElement("a");e.href=URL.createObjectURL(t),e.download=`baie-sucree-${new Date().toISOString().slice(0,10)}.json`,e.click(),URL.revokeObjectURL(e.href)}function p(t,e=!1){const a=document.getElementById("toasts");if(!a)return;const n=document.createElement("div");n.className="toast"+(e?" bad":""),n.textContent=t,a.appendChild(n),setTimeout(()=>n.remove(),3800)}export{N as cleanup,H as mount};
