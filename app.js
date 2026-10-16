const STORAGE_KEY = "ara-ai-play-v2";
const ADMIN_SESSION_KEY = "ara-ai-admin-session";
// 데모용 UI 잠금 코드입니다. 실제 운영 보안용으로는 사용하면 안 됩니다.
const DEMO_ADMIN_CODE = "ARAI2026";

const seedApps = [
  {
    id:"app1", title:"분리수거 대작전", category:"게임", grade:"5학년", author:"별빛고래",
    description:"분리수거 방법을 게임으로 배우는 환경 학습 프로그램",
    story:"친구들이 분리수거를 재미있게 연습할 수 있게 만들었습니다.",
    aiUse:"게임 아이디어를 정리하고 JavaScript 코드 오류를 고칠 때 AI를 활용했습니다.",
    url:"https://example.com", image:"", emoji:"♻️", createdAt:"2026-10-15",
    views:174, likes:31, approved:true, managementCode:"1234",
    reactions:{"재미있어요":17,"아이디어 좋아요":11,"배움이 있어요":9},
    feedback:[
      {type:"칭찬해요",nickname:"초록별",text:"캐릭터가 움직여서 재미있어요!",date:"2026-10-15"},
      {type:"제안해요",nickname:"하늘토끼",text:"2단계가 추가되면 더 재미있을 것 같아요.",date:"2026-10-15"}
    ]
  },
  {id:"app2", title:"우주 탈출 미션", category:"게임", grade:"6학년", author:"우주감자", description:"문제를 풀면서 우주선을 탈출하는 미션형 게임", story:"친구들과 함께 문제를 해결하는 게임을 만들고 싶었습니다.", aiUse:"배경 스토리와 문제 아이디어를 만드는 데 AI를 활용했습니다.", url:"https://example.com", image:"", emoji:"🚀", createdAt:"2026-10-13", views:225, likes:42, approved:true, managementCode:"1234", reactions:{"재미있어요":24,"아이디어 좋아요":18,"배움이 있어요":6}, feedback:[]},
  {id:"app3", title:"영단어 스피드 퀴즈", category:"학습", grade:"4학년", author:"노랑여우", description:"초등 영단어를 빠르게 맞히는 타이머 퀴즈", story:"영어 단어를 게임처럼 외울 수 있게 만들었습니다.", aiUse:"퀴즈 문제 구성과 화면 디자인 아이디어를 도움받았습니다.", url:"https://example.com", image:"", emoji:"🔤", createdAt:"2026-10-11", views:148, likes:28, approved:true, managementCode:"1234", reactions:{"재미있어요":9,"아이디어 좋아요":7,"배움이 있어요":15}, feedback:[]},
  {id:"app4", title:"급식 메뉴 추천기", category:"생활", grade:"5학년", author:"맛있는구름", description:"기분과 좋아하는 재료를 선택하면 메뉴를 추천해주는 앱", story:"오늘 뭐 먹지? 고민을 줄여주는 프로그램을 만들고 싶었습니다.", aiUse:"조건문 구조와 추천 문장을 만드는 데 AI를 활용했습니다.", url:"https://example.com", image:"", emoji:"🍱", createdAt:"2026-10-09", views:312, likes:51, approved:true, managementCode:"1234", reactions:{"재미있어요":13,"아이디어 좋아요":31,"배움이 있어요":4}, feedback:[]},
  {id:"app5", title:"우리말 맞춤법 탐험", category:"학습", grade:"6학년", author:"책벌레곰", description:"헷갈리기 쉬운 맞춤법을 문제로 풀어보는 학습 앱", story:"맞춤법 공부를 조금 더 재미있게 하고 싶었습니다.", aiUse:"문제 예시를 만들고 설명 문장을 쉽게 바꾸는 데 AI를 활용했습니다.", url:"https://example.com", image:"", emoji:"📚", createdAt:"2026-10-07", views:132, likes:25, approved:true, managementCode:"1234", reactions:{"재미있어요":5,"아이디어 좋아요":6,"배움이 있어요":19}, feedback:[]},
  {id:"app6", title:"나만의 캐릭터 메이커", category:"창작", grade:"3학년", author:"분홍별", description:"눈, 입, 색을 골라 나만의 캐릭터를 만드는 창작 도구", story:"친구들이 각자 다른 캐릭터를 만들 수 있게 하고 싶었습니다.", aiUse:"버튼을 누르면 모양이 바뀌는 코드를 만들 때 도움받았습니다.", url:"https://example.com", image:"", emoji:"🎨", createdAt:"2026-10-14", views:196, likes:38, approved:true, managementCode:"1234", reactions:{"재미있어요":18,"아이디어 좋아요":21,"배움이 있어요":2}, feedback:[]},
  {id:"pending1", title:"날씨 옷차림 도우미", category:"생활", grade:"4학년", author:"구름빵", description:"날씨를 선택하면 알맞은 옷차림을 알려주는 앱", story:"아침마다 어떤 옷을 입을지 고민해서 만들었습니다.", aiUse:"조건에 맞는 안내 문구를 만드는 데 AI를 활용했습니다.", url:"https://example.com", image:"", emoji:"🌦️", createdAt:"2026-10-16", views:0, likes:0, approved:false, managementCode:"1234", reactions:{"재미있어요":0,"아이디어 좋아요":0,"배움이 있어요":0}, feedback:[]}
];

let state = loadState();
let currentRoute = "home";
let categoryFilter = "전체";
let detailId = null;
let editingId = null;
let currentGalleryType = "new";

function loadState(){
  try{
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if(saved?.apps){
      saved.apps = saved.apps.map(a=>({...a, managementCode:a.managementCode||"1234"}));
      return saved;
    }
  }catch(e){}
  const initial = { apps: structuredClone(seedApps) };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  return initial;
}
function saveState(){localStorage.setItem(STORAGE_KEY, JSON.stringify(state));}
function approvedApps(){return state.apps.filter(a=>a.approved);}
function pendingApps(){return state.apps.filter(a=>!a.approved);}
function score(app){return (app.likes||0)*5 + (app.views||0) + (app.feedback?.length||0)*3;}
function isNew(app){
  const now = new Date();
  const d = new Date(app.createdAt+"T00:00:00");
  return (now-d)/(1000*60*60*24) <= 7;
}
function escapeHTML(str=""){return String(str).replace(/[&<>"']/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[s]));}
function toast(msg){
  const el=document.querySelector("#toast"); el.textContent=msg; el.classList.add("show");
  clearTimeout(window._toastTimer); window._toastTimer=setTimeout(()=>el.classList.remove("show"),1800);
}
function isAdmin(){return sessionStorage.getItem(ADMIN_SESSION_KEY)==="ok";}
function categoryEmoji(cat){return ({게임:"🎮",학습:"📚",생활:"🌿",창작:"🎨",과학:"🧪",퀴즈:"🧠",기타:"✨"})[cat]||"✨";}
function setRoute(route, options={}){
  if(route==="admin" && !isAdmin()){
    openAdminLogin();
    return;
  }
  currentRoute=route;
  if(options.detailId) detailId=options.detailId;
  document.querySelectorAll(".nav-btn").forEach(b=>b.classList.toggle("active", b.dataset.route===route));
  render(); window.scrollTo({top:0,behavior:"smooth"});
}
function appCard(app, options={}){
  return `<article class="app-card" data-open="${app.id}">
    <div class="thumb">
      ${app.image?`<img src="${escapeHTML(app.image)}" alt="${escapeHTML(app.title)} 대표 이미지">`:`<div class="thumb-emoji">${app.emoji||categoryEmoji(app.category)}</div>`}
      ${isNew(app)?`<span class="badge new">NEW</span>`:""}
      ${options.popular?`<span class="popular-badge">👑 인기</span>`:""}
    </div>
    <div class="card-body">
      <h4 class="card-title">${escapeHTML(app.title)}</h4>
      <div class="card-desc">${escapeHTML(app.description)}</div>
      <div class="card-meta"><span>${escapeHTML(app.grade)} · ${escapeHTML(app.author)}</span><span>${escapeHTML(app.category)}</span></div>
      <div class="card-stats"><span>👀 ${app.views||0}</span><span>❤️ ${app.likes||0}</span><span>💬 ${app.feedback?.length||0}</span></div>
    </div>
  </article>`;
}
function sectionHeader(title,desc="",route=null){return `<div class="section-head"><div><h3>${title}</h3>${desc?`<p>${desc}</p>`:""}</div>${route?`<button class="link-btn" data-route="${route}">전체보기 →</button>`:""}</div>`;}

function renderHome(){
  const apps=approvedApps();
  const popular=[...apps].sort((a,b)=>score(b)-score(a)).slice(0,4);
  const newest=[...apps].sort((a,b)=>b.createdAt.localeCompare(a.createdAt)).slice(0,4);
  const categories=["게임","학습","생활","창작","과학","퀴즈"];
  return `<section class="hero"><div><h2>친구들이 AI와 함께 만든<br>멋진 작품을 만나보세요.</h2><p>게임, 학습 도구, 생활 아이디어까지. 작품을 실행하고 좋은 점을 찾아 피드백을 남겨보세요.</p><div class="hero-actions"><button class="hero-primary" data-route="new">✨ 새 작품 보기</button><button class="hero-secondary" data-route="submit">＋ 내 작품 등록</button></div></div><div class="hero-art"><div class="hero-device"><div>🎮</div><div>🧠</div><div>🎨</div><div>🚀</div></div></div></section>
  <section class="section">${sectionHeader("🔥 지금 인기 있는 작품","친구들이 많이 보고 좋아한 작품이에요.","popular")}<div class="app-grid">${popular.map(a=>appCard(a,{popular:true})).join("")}</div></section>
  <section class="section">${sectionHeader("✨ 새로 나온 작품","최근 등록된 작품을 가장 먼저 만나보세요.","new")}<div class="app-grid">${newest.map(a=>appCard(a)).join("")}</div></section>
  <section class="section">${sectionHeader("🧭 카테고리","관심 있는 분야의 작품을 골라보세요.")}<div class="category-strip">${categories.map(c=>`<button class="category-card" data-category-link="${c}"><span>${categoryEmoji(c)}</span>${c}</button>`).join("")}</div></section>
  <section class="section">${sectionHeader("🏆 TOP 5","추천·실행·피드백을 함께 반영한 랭킹입니다.","ranking")}<div class="rank-list">${[...apps].sort((a,b)=>score(b)-score(a)).slice(0,5).map((a,i)=>rankRow(a,i)).join("")}</div></section>`;
}

function renderGallery(type){
  currentGalleryType=type;
  let apps=approvedApps(); let title="작품";
  if(type==="new"){title="✨ 신규작";apps=[...apps].sort((a,b)=>b.createdAt.localeCompare(a.createdAt));}
  if(type==="popular"){title="🔥 인기작";apps=[...apps].sort((a,b)=>score(b)-score(a));}
  if(categoryFilter!=="전체") apps=apps.filter(a=>a.category===categoryFilter);
  return `${sectionHeader(title,"카테고리와 검색으로 원하는 작품을 찾아보세요.")}
    <div class="filters">${["전체","게임","학습","생활","창작","과학","퀴즈"].map(c=>`<button class="chip ${categoryFilter===c?"active":""}" data-category="${c}">${categoryEmoji(c)} ${c}</button>`).join("")}</div>
    <div class="search-row"><input id="searchInput" placeholder="작품 이름, 설명, 제작자 검색"><select id="gradeFilter"><option value="">전체 학년</option><option>1학년</option><option>2학년</option><option>3학년</option><option>4학년</option><option>5학년</option><option>6학년</option></select></div>
    <div id="galleryGrid" class="app-grid">${apps.map(a=>appCard(a,{popular:type==="popular"})).join("")}</div>`;
}
function rankRow(a,i){return `<div class="rank-row" data-open="${a.id}" role="button" tabindex="0"><div class="rank-num">${i===0?"🥇":i===1?"🥈":i===2?"🥉":i+1}</div><div class="rank-icon">${a.image?`<img src="${escapeHTML(a.image)}" alt="">`:a.emoji||categoryEmoji(a.category)}</div><div><div class="rank-title">${escapeHTML(a.title)}</div><div class="rank-sub">${escapeHTML(a.grade)} · ${escapeHTML(a.author)} · ${escapeHTML(a.category)}</div></div><div class="rank-score">${score(a)}점</div></div>`;}
function renderRanking(){
  const apps=[...approvedApps()].filter(a=>categoryFilter==="전체"||a.category===categoryFilter).sort((a,b)=>score(b)-score(a));
  return `${sectionHeader("🏆 작품 랭킹","인기점수 = 추천×5 + 실행횟수 + 피드백×3")}<div class="filters">${["전체","게임","학습","생활","창작","과학","퀴즈"].map(c=>`<button class="chip ${categoryFilter===c?"active":""}" data-category="${c}">${categoryEmoji(c)} ${c}</button>`).join("")}</div><div class="rank-list">${apps.map((a,i)=>rankRow(a,i)).join("")}</div>`;
}
function renderSubmit(){
  const edit=editingId?state.apps.find(a=>a.id===editingId):null;
  const v=(name)=>edit?escapeHTML(edit[name]||""):"";
  return `${sectionHeader(edit?"✏️ 작품 수정":"＋ 내 작품 등록",edit?"수정 후 저장하면 기존 작품에 반영됩니다.":"등록한 작품은 교사가 확인한 뒤 공개됩니다.")}
  <div class="panel"><form id="submitForm" class="form-grid">
    <label>작품 이름<input name="title" maxlength="40" required value="${v("title")}" placeholder="예: 우주 수학 대작전"></label>
    <label>카테고리<select name="category" required>${["게임","학습","생활","창작","과학","퀴즈","기타"].map(c=>`<option ${edit?.category===c?"selected":""}>${c}</option>`).join("")}</select></label>
    <label>학년<select name="grade" required>${[1,2,3,4,5,6].map(n=>`<option ${edit?.grade===n+"학년"?"selected":""}>${n}학년</option>`).join("")}</select></label>
    <label>닉네임<input name="author" maxlength="12" required value="${v("author")}" placeholder="실명 대신 닉네임을 추천해요"></label>
    <label class="full">웹앱 주소<input name="url" type="url" required value="${v("url")}" placeholder="https://..."></label>
    <label class="full">대표 이미지 주소 <span class="small">(선택)</span><input name="image" type="url" value="${v("image")}" placeholder="https://...jpg / png"></label>
    <label class="full">작품 소개<textarea name="description" maxlength="140" required>${v("description")}</textarea></label>
    <label class="full">왜 만들었나요?<textarea name="story" maxlength="220" required>${v("story")}</textarea></label>
    <label class="full">AI를 어떻게 활용했나요?<textarea name="aiUse" maxlength="220" required>${v("aiUse")}</textarea></label>
    ${edit?"":`<label class="full">수정·삭제 코드<input name="managementCode" type="password" maxlength="20" required placeholder="나중에 작품을 수정하거나 삭제할 때 사용할 코드"><span class="code-help">친구에게 알려주지 말고 기억해두세요. 이 데모 버전에서는 브라우저에 저장되므로 실제 보안 기능은 아닙니다.</span></label>`}
    <div class="full note">개인정보가 들어간 화면이나 링크는 등록하지 마세요. 작품 링크는 교사가 확인한 후 공개하는 것을 권장합니다.</div>
    <button class="primary full" type="submit">${edit?"수정 내용 저장":"교사에게 등록 요청 보내기"}</button>
  </form></div>`;
}
function renderAdmin(){
  if(!isAdmin()) return `<div class="empty"><div class="emoji">🔒</div>교사 관리 로그인이 필요합니다.</div>`;
  const pend=pendingApps(), apps=approvedApps(), totalViews=apps.reduce((s,a)=>s+(a.views||0),0);
  return `${sectionHeader("🧑‍🏫 교사 관리","승인 대기 작품을 확인하고 공개 여부를 결정합니다.")}
  <div class="stats-grid"><div class="stat-card"><span>공개 작품</span><strong>${apps.length}</strong></div><div class="stat-card"><span>승인 대기</span><strong>${pend.length}</strong></div><div class="stat-card"><span>전체 실행</span><strong>${totalViews}</strong></div><div class="stat-card"><span>전체 피드백</span><strong>${apps.reduce((s,a)=>s+(a.feedback?.length||0),0)}</strong></div></div>
  <div class="panel"><h3 style="margin-top:0">승인 대기 작품</h3>${pend.length?pend.map(a=>adminRow(a,true)).join(""):`<div class="empty"><div class="emoji">✅</div>승인 대기 작품이 없습니다.</div>`}</div>
  <div class="panel" style="margin-top:20px"><h3 style="margin-top:0">공개 작품 관리</h3>${apps.map(a=>adminRow(a,false)).join("")}</div>
  <div class="panel" style="margin-top:20px"><h3 style="margin-top:0">관리자 세션</h3><p class="small">현재 버전은 정적 사이트라 관리자 코드를 완전히 숨길 수 없습니다. 실제 운영에서는 Firebase Authentication 같은 서버 기반 인증이 필요합니다.</p><button class="ghost" id="adminLogout">교사 관리 로그아웃</button></div>`;
}
function adminRow(a,pending){return `<div class="admin-row"><div class="rank-icon">${a.image?`<img src="${escapeHTML(a.image)}" alt="">`:a.emoji||categoryEmoji(a.category)}</div><div><div class="rank-title">${escapeHTML(a.title)}</div><div class="rank-sub">${escapeHTML(a.grade)} · ${escapeHTML(a.author)} · ${escapeHTML(a.category)}</div><div class="small">${escapeHTML(a.description)}</div></div><div class="admin-actions"><button class="secondary" data-preview="${a.id}">${pending?"미리보기":"보기"}</button>${pending?`<button class="primary" data-approve="${a.id}">승인</button>`:`<button class="ghost" data-unpublish="${a.id}">비공개</button>`}<button class="danger" data-admin-delete="${a.id}">삭제</button></div></div>`;}
function renderDetail(){
  const a=state.apps.find(x=>x.id===detailId); if(!a) return `<div class="empty"><div class="emoji">🔎</div>작품을 찾을 수 없습니다.</div>`;
  const rank=[...approvedApps()].sort((x,y)=>score(y)-score(x)).findIndex(x=>x.id===a.id);
  return `<button class="ghost" data-back="1" style="margin-bottom:16px">← 돌아가기</button><div class="panel detail">
    <div class="detail-hero">${a.image?`<img src="${escapeHTML(a.image)}" alt="${escapeHTML(a.title)} 대표 이미지">`:a.emoji||categoryEmoji(a.category)}</div>
    <div><div class="detail-tags"><span class="tag">${escapeHTML(a.category)}</span><span class="tag">${escapeHTML(a.grade)}</span>${isNew(a)?`<span class="tag">NEW</span>`:""}${rank>=0&&rank<4?`<span class="tag">👑 인기작</span>`:""}${!a.approved?`<span class="tag">승인 대기</span>`:""}</div>
    <h2>${escapeHTML(a.title)}</h2><p style="color:#6b7280">${escapeHTML(a.description)}</p><div class="detail-stats"><span>👀 ${a.views||0}</span><span>❤️ ${a.likes||0}</span><span>💬 ${a.feedback?.length||0}</span></div>
    <div class="detail-actions"><button class="primary" data-launch="${a.id}">▶ 웹앱 실행하기</button><button class="secondary" data-like="${a.id}">❤️ 추천하기</button><button class="ghost" data-feedback="${a.id}">💬 피드백 남기기</button></div>
    <div class="owner-tools"><button class="ghost" data-owner-edit="${a.id}">✏️ 작성자 수정</button><button class="danger" data-owner-delete="${a.id}">🗑 작성자 삭제</button></div>
    <div class="content-block"><h4>👤 만든 친구</h4><p>${escapeHTML(a.grade)} · ${escapeHTML(a.author)}</p></div>
    <div class="content-block"><h4>💭 왜 만들었나요?</h4><p>${escapeHTML(a.story)}</p></div>
    <div class="content-block"><h4>🤖 AI를 어떻게 활용했나요?</h4><p>${escapeHTML(a.aiUse)}</p></div>
    <div class="content-block"><h4>친구들의 반응</h4><div class="reactions">${Object.entries(a.reactions||{}).map(([k,v])=>`<button class="react-btn" data-react="${a.id}" data-react-name="${k}">${k==="재미있어요"?"😆":k==="아이디어 좋아요"?"💡":"📚"} ${k} ${v}</button>`).join("")}</div></div>
    <div class="content-block"><h4>💬 피드백</h4>${a.feedback?.length?a.feedback.slice().reverse().map(f=>`<div class="feedback-item"><div class="feedback-head"><span class="feedback-type">${escapeHTML(f.type)} · ${escapeHTML(f.nickname)}</span><span class="small">${escapeHTML(f.date)}</span></div><div class="feedback-text">${escapeHTML(f.text)}</div></div>`).join(""):`<p>아직 피드백이 없습니다. 첫 피드백을 남겨보세요!</p>`}</div>
    </div></div>`;
}
function render(){
  const root=document.querySelector("#app");
  if(currentRoute==="home") root.innerHTML=renderHome();
  else if(currentRoute==="new") root.innerHTML=renderGallery("new");
  else if(currentRoute==="popular") root.innerHTML=renderGallery("popular");
  else if(currentRoute==="ranking") root.innerHTML=renderRanking();
  else if(currentRoute==="submit") root.innerHTML=renderSubmit();
  else if(currentRoute==="admin") root.innerHTML=renderAdmin();
  else if(currentRoute==="detail") root.innerHTML=renderDetail();
  bindDynamic();
}

function bindDynamic(){
  document.querySelectorAll("[data-route]").forEach(el=>el.onclick=()=>{categoryFilter="전체"; if(el.dataset.route!=="submit") editingId=null; setRoute(el.dataset.route);});
  document.querySelectorAll("[data-open]").forEach(el=>el.onclick=()=>setRoute("detail",{detailId:el.dataset.open}));
  document.querySelectorAll("[data-category-link]").forEach(el=>el.onclick=()=>{categoryFilter=el.dataset.categoryLink;setRoute("popular");});
  document.querySelectorAll("[data-category]").forEach(el=>el.onclick=()=>{categoryFilter=el.dataset.category;render();});
  const s=document.querySelector("#searchInput"),g=document.querySelector("#gradeFilter"); if(s)s.oninput=filterGallery;if(g)g.onchange=filterGallery;

  const form=document.querySelector("#submitForm");
  if(form) form.onsubmit=(e)=>{
    e.preventDefault(); const d=Object.fromEntries(new FormData(form).entries());
    if(editingId){
      const a=state.apps.find(x=>x.id===editingId); if(!a)return;
      Object.assign(a,{title:d.title,category:d.category,grade:d.grade,author:d.author,url:d.url,image:d.image,description:d.description,story:d.story,aiUse:d.aiUse,emoji:categoryEmoji(d.category)});
      saveState(); const id=editingId; editingId=null; toast("작품을 수정했습니다."); setRoute("detail",{detailId:id});
    }else{
      const app={id:"app"+Date.now(),...d,createdAt:new Date().toISOString().slice(0,10),views:0,likes:0,approved:false,emoji:categoryEmoji(d.category),reactions:{"재미있어요":0,"아이디어 좋아요":0,"배움이 있어요":0},feedback:[]};
      state.apps.unshift(app);saveState();toast("작품 등록 요청이 저장되었습니다.");setRoute("home");
    }
  };

  document.querySelectorAll("[data-preview]").forEach(b=>b.onclick=()=>setRoute("detail",{detailId:b.dataset.preview}));
  document.querySelectorAll("[data-approve]").forEach(b=>b.onclick=()=>{const a=state.apps.find(x=>x.id===b.dataset.approve);if(a){a.approved=true;saveState();toast("작품을 공개했습니다.");render();}});
  document.querySelectorAll("[data-unpublish]").forEach(b=>b.onclick=()=>{const a=state.apps.find(x=>x.id===b.dataset.unpublish);if(a){a.approved=false;saveState();toast("작품을 비공개로 전환했습니다.");render();}});
  document.querySelectorAll("[data-admin-delete]").forEach(b=>b.onclick=()=>{if(isAdmin()&&confirm("관리자 권한으로 이 작품을 삭제할까요?")){state.apps=state.apps.filter(x=>x.id!==b.dataset.adminDelete);saveState();render();}});
  const logout=document.querySelector("#adminLogout"); if(logout) logout.onclick=()=>{sessionStorage.removeItem(ADMIN_SESSION_KEY);toast("교사 관리에서 로그아웃했습니다.");setRoute("home");};
  const back=document.querySelector("[data-back]"); if(back) back.onclick=()=>setRoute("home");

  document.querySelectorAll("[data-launch]").forEach(b=>b.onclick=()=>{const a=state.apps.find(x=>x.id===b.dataset.launch);if(a){a.views=(a.views||0)+1;saveState();render();window.open(a.url,"_blank","noopener,noreferrer");}});
  document.querySelectorAll("[data-like]").forEach(b=>b.onclick=()=>{const a=state.apps.find(x=>x.id===b.dataset.like);if(a){a.likes=(a.likes||0)+1;saveState();render();toast("추천했어요! ❤️");}});
  document.querySelectorAll("[data-react]").forEach(b=>b.onclick=()=>{const a=state.apps.find(x=>x.id===b.dataset.react);if(a){a.reactions[b.dataset.reactName]=(a.reactions[b.dataset.reactName]||0)+1;saveState();render();toast("반응을 남겼어요!");}});
  document.querySelectorAll("[data-feedback]").forEach(b=>b.onclick=()=>{document.querySelector("#feedbackAppId").value=b.dataset.feedback;document.querySelector("#feedbackDialog").showModal();});
  document.querySelectorAll("[data-owner-edit]").forEach(b=>b.onclick=()=>openManageCode(b.dataset.ownerEdit,"edit"));
  document.querySelectorAll("[data-owner-delete]").forEach(b=>b.onclick=()=>openManageCode(b.dataset.ownerDelete,"delete"));
}
function filterGallery(){
  const q=(document.querySelector("#searchInput")?.value||"").toLowerCase(); const grade=document.querySelector("#gradeFilter")?.value||"";
  let apps=approvedApps().filter(a=>categoryFilter==="전체"||a.category===categoryFilter);
  if(currentGalleryType==="new")apps.sort((a,b)=>b.createdAt.localeCompare(a.createdAt));
  if(currentGalleryType==="popular")apps.sort((a,b)=>score(b)-score(a));
  apps=apps.filter(a=>{const hay=[a.title,a.description,a.author,a.category].join(" ").toLowerCase();return (!q||hay.includes(q))&&(!grade||a.grade===grade);});
  const grid=document.querySelector("#galleryGrid");
  grid.innerHTML=apps.length?apps.map(a=>appCard(a,{popular:currentGalleryType==="popular"})).join(""):`<div class="empty" style="grid-column:1/-1"><div class="emoji">🔎</div>조건에 맞는 작품이 없습니다.</div>`;
  grid.querySelectorAll("[data-open]").forEach(el=>el.onclick=()=>setRoute("detail",{detailId:el.dataset.open}));
}

function openAdminLogin(){document.querySelector("#adminCodeInput").value="";document.querySelector("#adminLoginDialog").showModal();setTimeout(()=>document.querySelector("#adminCodeInput").focus(),50);}

function bindDialogUtilities(){
  ["feedbackDialog","adminLoginDialog","manageCodeDialog"].forEach(id=>{
    const dialog=document.getElementById(id);
    if(!dialog || dialog.dataset.bound) return;
    dialog.dataset.bound="1";
    dialog.addEventListener("click",e=>{ if(e.target===dialog) dialog.close(); });
  });
}

function openManageCode(id,action){
  document.querySelector("#manageTargetId").value=id; document.querySelector("#manageAction").value=action; document.querySelector("#manageCodeInput").value="";
  document.querySelector("#manageDialogTitle").textContent=action==="edit"?"작품 수정 권한 확인":"작품 삭제 권한 확인";
  document.querySelector("#manageCodeDialog").showModal(); setTimeout(()=>document.querySelector("#manageCodeInput").focus(),50);
}

document.querySelector("#feedbackClose").addEventListener("click",()=>document.querySelector("#feedbackDialog").close());
document.querySelector("#adminLoginClose").addEventListener("click",()=>document.querySelector("#adminLoginDialog").close());
document.querySelector("#manageCodeClose").addEventListener("click",()=>document.querySelector("#manageCodeDialog").close());

document.querySelector("#feedbackForm").addEventListener("submit",e=>{
  e.preventDefault(); const id=document.querySelector("#feedbackAppId").value; const a=state.apps.find(x=>x.id===id); if(!a)return;
  a.feedback.push({type:document.querySelector("#feedbackType").value,nickname:document.querySelector("#feedbackNickname").value.trim(),text:document.querySelector("#feedbackText").value.trim(),date:new Date().toISOString().slice(0,10)});
  saveState();document.querySelector("#feedbackDialog").close();e.target.reset();render();toast("피드백을 등록했습니다.");
});

document.querySelector("#adminLoginForm").addEventListener("submit",e=>{
  e.preventDefault(); const code=document.querySelector("#adminCodeInput").value;
  if(code!==DEMO_ADMIN_CODE){toast("관리자 코드가 맞지 않습니다.");return;}
  sessionStorage.setItem(ADMIN_SESSION_KEY,"ok");document.querySelector("#adminLoginDialog").close();setRoute("admin");toast("교사 관리에 로그인했습니다.");
});

document.querySelector("#manageCodeForm").addEventListener("submit",e=>{
  e.preventDefault(); const id=document.querySelector("#manageTargetId").value; const action=document.querySelector("#manageAction").value; const code=document.querySelector("#manageCodeInput").value;
  const a=state.apps.find(x=>x.id===id); if(!a)return;
  if(code!==a.managementCode){toast("수정·삭제 코드가 맞지 않습니다.");return;}
  document.querySelector("#manageCodeDialog").close();
  if(action==="edit"){editingId=id;setRoute("submit");}
  if(action==="delete"&&confirm("이 작품을 정말 삭제할까요?")){state.apps=state.apps.filter(x=>x.id!==id);saveState();toast("작품을 삭제했습니다.");setRoute("home");}
});

document.querySelector(".brand").onclick=()=>setRoute("home");
bindDialogUtilities();
render();
