// Rebuild native SVG layout assets: node scripts/build-assets.mjs
// Optional artwork: put assets/avatar.(jpg|png|webp) and assets/background.(jpg|png|webp) to embed them. No remote requests or dependencies.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assets = path.join(root, 'assets');
mkdirSync(assets, { recursive: true });
const C = { bg: '#0c1a2e', panel: '#11223a', line: '#27405f', ink: '#eaf4ff', muted: '#9bb3d0', violet: '#63B3ED', cyan: '#00F5D4', rose: '#ff8fa3', gold: '#ffd28a' };
const esc = s => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const mime = { jpg: 'jpeg', jpeg: 'jpeg', png: 'png', webp: 'webp' };
function image(base) {
  for (const ext of Object.keys(mime)) {
    const file = path.join(assets, `${base}.${ext}`);
    if (existsSync(file)) return `data:image/${mime[ext]};base64,${readFileSync(file).toString('base64')}`;
  }
  return null; // no image: fall back to generated artwork
}
const bg = image('background');
const avatar = image('avatar');
const text = (x, y, value, size = 20, fill = C.ink, extra = '') => `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" ${extra}>${esc(value)}</text>`;
const style = `<style>
  text{font-family:Inter,'Segoe UI',Arial,sans-serif} .mono{font-family:'Cascadia Code','SFMono-Regular',Consolas,monospace}
  .pulse{animation:pulse 3s ease-in-out infinite} .cursor{animation:blink 1.2s steps(1) infinite}
  .float{animation:float 9s ease-in-out infinite}
  @keyframes pulse{0%,100%{opacity:.45}50%{opacity:1}} @keyframes blink{0%,49%{opacity:1}50%,100%{opacity:0}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
  @media(prefers-reduced-motion:reduce){*{animation:none!important} .typing{clip-path:none!important}}
</style>`;
function svg(w, h, title, body, defs = '') {
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title"><title id="title">${esc(title)}</title>${style}<defs>${defs}</defs>${body}</svg>\n`;
}
function save(name, content) { writeFileSync(path.join(assets, `${name}.svg`), content); }
function pill(x, y, label, color = C.violet, size = 13) {
  const w = label.length * size * .62 + 28;
  return `<rect x="${x}" y="${y}" width="${w}" height="${size+20}" rx="${(size+20)/2}" fill="${color}" fill-opacity=".09" stroke="${color}" stroke-opacity=".28"/>${text(x+14,y+size+9,label,size,color,'class="mono"')}`;
}

// Editorial cover: artwork, typography, atmospheric details and an anime avatar.
for (const mobile of [false, true]) {
  const w = mobile ? 600 : 1200, h = mobile ? 640 : 460;
  const defs = `<clipPath id="canvas"><rect width="${w}" height="${h}" rx="24"/></clipPath>
    <linearGradient id="shade" x2="1" y2=".25"><stop stop-color="#0a1626" stop-opacity=".9"/><stop offset=".55" stop-color="#0a1626" stop-opacity=".4"/><stop offset="1" stop-color="#0a1626" stop-opacity=".18"/></linearGradient>
    <linearGradient id="bottom" x2="0" y2="1"><stop stop-color="#0a1626" stop-opacity="0"/><stop offset="1" stop-color="#0a1626" stop-opacity=".95"/></linearGradient>
    <linearGradient id="accent"><stop stop-color="${C.cyan}"/><stop offset=".5" stop-color="${C.violet}"/><stop offset="1" stop-color="${C.rose}"/></linearGradient>
    <linearGradient id="sky" x2="1" y2="1"><stop stop-color="#0a1626"/><stop offset=".55" stop-color="#0f2c4a"/><stop offset="1" stop-color="#0b3b40"/></linearGradient>
    <radialGradient id="glow"><stop stop-color="${C.cyan}" stop-opacity=".28"/><stop offset="1" stop-color="${C.cyan}" stop-opacity="0"/></radialGradient>
    <clipPath id="portrait"><circle cx="${mobile ? 480 : 966}" cy="${mobile ? 122 : 212}" r="${mobile ? 67 : 105}"/></clipPath>`;
  const inset = mobile ? 34 : 62;
  let s = `<g clip-path="url(#canvas)"><rect width="${w}" height="${h}" fill="${C.bg}"/>
    ${bg ? `<image href="${bg}" x="0" y="0" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice"/>` : `<rect width="${w}" height="${h}" fill="url(#sky)"/><circle cx="${w*.8}" cy="${h*.35}" r="${h*.7}" fill="url(#glow)"/><path d="M0 ${h*.86}Q${w*.25} ${h*.7} ${w*.5} ${h*.84}T${w} ${h*.8}V${h}H0Z" fill="${C.violet}" fill-opacity=".07"/>`}
    <rect width="${w}" height="${h}" fill="url(#shade)"/>
    <rect width="${w}" height="${h}" fill="url(#bottom)"/>
    <path d="M${w*.66} 0L${w*.52} ${h}M${w*.68} 0L${w*.54} ${h}" stroke="${C.violet}" stroke-opacity=".09" stroke-width="1"/>
    <rect x="${inset}" y="${mobile?40:38}" width="6" height="6" rx="1" fill="${C.cyan}" class="pulse"/>
    ${text(inset+18,mobile?47:45,'MOE SHINN / PNGTUBER VIỆT NAM',mobile?14:13,C.cyan,'class="mono" letter-spacing="2"')}
    ${text(inset,mobile?174:126,mobile?'PNGTUBER VIỆT NAM':'PNGTUBER · MINECRAFT · TOOL MAKER',14,C.rose,'class="mono" letter-spacing="5"')}
    ${text(inset-4,mobile?260:245,'MOE SHINN',mobile?62:92,C.ink,'font-weight="800" letter-spacing="-3"')}
    ${text(inset+2,mobile?314:292,'SHINN MOEJI',mobile?30:30,C.violet,'class="mono" letter-spacing="8"')}
    <path d="M${inset} ${mobile?342:318}H${mobile?530:620}" stroke="url(#accent)" stroke-opacity=".65"/>
    ${text(inset,mobile?386:354,'Stream. Code. Minecraft.',mobile?26:23,C.ink,'font-weight="500"')}
    ${text(inset,mobile?423:389,'Một cái tool nhỏ mới đang được mày mò_',mobile?17:15,C.muted,'class="mono"')}`;
  const cx = mobile?480:966, cy = mobile?122:212, r = mobile?67:105;
  s += `<g class="float"><circle cx="${cx}" cy="${cy}" r="${r+17}" fill="${C.bg}" fill-opacity=".24" stroke="${C.violet}" stroke-opacity=".3"/>
    <circle cx="${cx}" cy="${cy}" r="${r+8}" fill="none" stroke="${C.cyan}" stroke-opacity=".6" stroke-dasharray="3 12"/>
    ${avatar ? `<image href="${avatar}" x="${cx-r}" y="${cy-r}" width="${r*2}" height="${r*2}" clip-path="url(#portrait)" preserveAspectRatio="xMidYMid slice"/>` : `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#accent)" fill-opacity=".22"/>${text(cx,cy+r*.36,'M',r*1.1,C.ink,'text-anchor="middle" font-weight="800"')}`}
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${C.ink}" stroke-opacity=".2"/></g>`;
  if (!mobile) {
    s += `${text(cx,361,'Xin chào',20,C.ink,'text-anchor="middle" letter-spacing="3"')}
      ${text(cx,387,'CHÚC BẠN MỘT NGÀY CHILL',10,C.muted,'class="mono" text-anchor="middle" letter-spacing="1.4"')}`;
  } else {
    s += pill(inset,465,'PNGTUBER / MINECRAFT / TOOLS',C.violet,15);
    s += text(inset,572,'Xin chào · chúc bạn một ngày chill',13,C.muted,'class="mono"');
  }
  for (let i=0;i<12;i++) {
    const x=(i*137+741)%w, y=(i*73+66)%(h-60);
    s += `<circle cx="${x}" cy="${y}" r="${i%3===0?2:1}" fill="${i%2?C.cyan:C.rose}" opacity=".45" class="pulse" style="animation-delay:${i*.3}s"/>`;
  }
  s += `<path d="M${inset} ${h-23}H${w-inset}" stroke="${C.line}"/>${text(inset,h-9,'PROFILE / MOESHINN',9,C.muted,'class="mono" letter-spacing="1.6"')}${text(w-inset,h-9,'CHAPTER 01',9,C.muted,'class="mono" text-anchor="end" letter-spacing="1.6"')}</g>
    <rect x=".5" y=".5" width="${w-1}" height="${h-1}" rx="24" fill="none" stroke="${C.violet}" stroke-opacity=".28"/>`;
  save(mobile?'hero-mobile':'hero',svg(w,h,'Moe Shinn — PNGtuber Việt Nam · Minecraft · Tool maker',s,defs));
}

for (const [key,n,title,subtitle] of [
  ['about','01','GIỚI THIỆU','MEET SHINN'], ['arsenal','02','CÔNG NGHỆ','MY TOOLBOX'],
  ['projects','03','DỰ ÁN','PROJECT ARCHIVE'], ['connect','04','LIÊN HỆ','SAY HELLO']
]) {
  save(`section-${key}`,svg(1000,74,`${n} — ${title}`,
    `<rect x="0" y="10" width="1000" height="54" rx="12" fill="${C.bg}"/>${text(18,44,n,16,C.violet,'class="mono"')}
    <path d="M53 24V50" stroke="${C.line}"/>${text(72,45,title,21,C.ink,'font-weight="700" letter-spacing="1.4"')}
    ${text(976,43,subtitle,10,C.muted,'class="mono" text-anchor="end" letter-spacing="1.6"')}`));
  save(`section-${key}-mobile`,svg(600,76,`${n} — ${title}`,
    `<rect x="0" y="6" width="600" height="64" rx="12" fill="${C.bg}"/>${text(18,46,n,21,C.violet,'class="mono"')}
    <path d="M60 24V53" stroke="${C.line}"/>${text(80,47,title,25,C.ink,'font-weight="700" letter-spacing=".5"')}`));
}

for (const mobile of [false,true]) {
  const w=mobile?600:1200,h=mobile?342:266,p=mobile?28:40;
  let s=`<rect x=".5" y=".5" width="${w-1}" height="${h-1}" rx="18" fill="${C.bg}" stroke="${C.line}"/>
    <path d="M0 48H${w}" stroke="${C.line}"/>
    <circle cx="${p}" cy="24" r="4" fill="${C.rose}"/><circle cx="${p+17}" cy="24" r="4" fill="${C.gold}"/><circle cx="${p+34}" cy="24" r="4" fill="${C.cyan}"/>
    ${text(w-p,29,'shinn@moeshinn: ~',mobile?13:12,C.muted,'class="mono" text-anchor="end"')}
    ${text(p,90,'❯',23,C.cyan,'class="mono"')}
    <g class="typing" clip-path="url(#typing)">${text(p+28,90,'cat shinn.yml',mobile?22:21,C.ink,'class="mono"')}</g>
    ${text(p,135,'handle',mobile?24:18,C.muted,'class="mono"')}${text(p+150,135,'MoeShinn',mobile?26:20,C.violet,'class="mono"')}
    ${text(p,173,'quests',mobile?24:18,C.muted,'class="mono"')}${text(p+150,173,mobile?'PNGtuber · Minecraft':'PNGtuber · Minecraft · tool nhẹ cho máy yếu',mobile?25:20,C.ink,'class="mono"')}`;
  if(mobile) s+=text(p+150,206,'tool nhẹ cho máy yếu',25,C.ink,'class="mono"');
  const last=mobile?251:216;
  s+=`${text(p,last,'building',mobile?23:18,C.muted,'class="mono"')}${text(p+150,last,'My-Server-Manager',mobile?26:20,C.cyan,'class="mono"')}
    <rect x="${p+150+(mobile?272:212)}" y="${last-19}" width="10" height="23" rx="1" fill="${C.cyan}" class="cursor"/>`;
  if(mobile)s+=text(p,307,'# máy yếu cũng chạy mượt',15,C.muted,'class="mono"');
  const defs=`<clipPath id="typing"><rect x="${p+28}" y="60" width="230" height="40"><animate attributeName="width" values="0;230;230" keyTimes="0;.28;1" dur="8s" repeatCount="indefinite"/></rect></clipPath>`;
  save(mobile?'terminal-mobile':'terminal',svg(w,h,'Profile terminal — MoeShinn',s,defs));
}

const tools=[['Py','Python','TOOLS & AUTOMATION',C.gold],['TS','TypeScript','TYPED APPS',C.cyan],['JS','JavaScript','WEB & DESKTOP',C.gold],['</>','HTML / CSS','INTERFACES',C.rose],['MC','Minecraft','SERVERS & PLUGINS',C.cyan],['Ez','Ezy Tuber','PNGTUBER',C.violet]];
for(const mobile of [false,true]){
  const w=mobile?600:1200,cols=mobile?2:6,gap=12,cw=(w-gap*(cols-1))/cols,ch=mobile?148:156,rows=Math.ceil(tools.length/cols),h=rows*ch+(rows-1)*gap;
  let s='';
  tools.forEach(([symbol,name,sub,color],i)=>{
    const x=(i%cols)*(cw+gap),y=Math.floor(i/cols)*(ch+gap);
    s+=`<rect x="${x+.5}" y="${y+.5}" width="${cw-1}" height="${ch-1}" rx="16" fill="${C.bg}" stroke="${C.line}"/>
      <rect x="${x+19}" y="${y+18}" width="42" height="37" rx="10" fill="${color}" fill-opacity=".1"/>
      ${text(x+40,y+43,symbol,19,color,'class="mono" text-anchor="middle" font-weight="700"')}
      ${text(x+19,y+92,name,mobile?24:21,C.ink,'font-weight="600"')}
      ${text(x+19,y+121,sub,mobile?12:10,C.muted,'class="mono" letter-spacing="1"')}
      <path d="M${x+19} ${y+ch-12}H${x+cw-19}" stroke="${color}" stroke-opacity=".18"/>`;
  });
  save(mobile?'arsenal-mobile':'arsenal',svg(w,h,'Toolbox — Python, TypeScript, JavaScript, HTML/CSS, Minecraft, Ezy Tuber',s));
}

const projects=[
  {key:'server',n:'01',name:'My-Server-Manager',category:'MINECRAFT SERVER',color:C.violet,stack:'JAVA SERVERS / MODRINTH / PLAYIT.GG',desc:'Tạo và quản lí nhiều server Minecraft Java trong một ứng dụng.',short:'Quản lí nhiều server Minecraft Java.',symbol:'>_'},
  {key:'picture',n:'02',name:'Picture-Lite',category:'IMAGE TOOL',color:C.cyan,stack:'BATCH COMPRESSION / FOR WEB DEVS',desc:'Nén ảnh đơn hoặc hàng loạt, tiện cho lập trình viên web.',short:'Nén ảnh đơn / hàng loạt.',symbol:'[ ]'},
  {key:'upscaler',n:'03',name:'See-through Upscaler',category:'AUTOMATION',color:C.rose,stack:'REALESRGAN / LOCAL GUI',desc:'Tự tách layer see-through và upscale ảnh anime, chạy local.',short:'Tách layer & upscale ảnh anime.',symbol:'↑'},
  {key:'lightplayer',n:'04',name:'LightPlayer',category:'MEDIA TOOL',color:C.gold,stack:'HTML / LIGHTWEIGHT PLAYER',desc:'Trình phát video nhẹ chạy bằng HTML.',short:'Trình phát video nhẹ bằng HTML.',symbol:'▶'},
];
for(const project of projects)for(const mobile of [false,true]){
  const {key,n,name,category,color,stack,desc,short,symbol}=project;
  const w=mobile?600:1200,h=mobile?230:164,left=mobile?24:119;
  let s=`<rect x=".5" y=".5" width="${w-1}" height="${h-1}" rx="18" fill="${C.bg}" stroke="${C.line}"/>
    <rect x="1" y="27" width="3" height="${h-54}" rx="1.5" fill="${color}"/>
    ${text(left,mobile?34:31,`${n} / ${category}`,11,color,'class="mono" letter-spacing="1.7"')}
    ${text(left,mobile?82:72,name,mobile?34:32,C.ink,'font-weight="700" letter-spacing="-.5"')}
    ${text(left,mobile?120:107,mobile?short:desc,mobile?24:20,C.muted)}
    ${text(left,mobile?191:141,stack,mobile?13:11,color,'class="mono" letter-spacing="1.2"')}
    ${text(w-27,mobile?193:89,'↗',mobile?24:30,color,'text-anchor="end"')}`;
  if(!mobile)s+=`<rect x="28" y="49" width="64" height="64" rx="18" fill="${color}" fill-opacity=".08" stroke="${color}" stroke-opacity=".2"/>${text(60,90,symbol,23,color,'class="mono" text-anchor="middle"')}${text(w-60,34,'VIEW REPOSITORY',10,C.muted,'class="mono" text-anchor="end" letter-spacing="1.4"')}`;
  save(`project-${key}${mobile?'-mobile':''}`,svg(w,h,`${name} — ${desc}`,s));
}

save('connect',svg(420,64,'Visit the Moe Shinn blog',`<rect x="1" y="1" width="418" height="62" rx="16" fill="${C.bg}" stroke="${C.violet}" stroke-opacity=".65"/><circle cx="27" cy="32" r="4" fill="${C.cyan}" class="pulse"/>${text(47,39,'BLOG / MOESHINN.GITHUB.IO',18,C.ink,'class="mono" letter-spacing="1"')}${text(386,40,'↗',24,C.violet,'text-anchor="end"')}`));
save('footer',svg(1200,126,'Cảm ơn đã ghé thăm — Moe Shinn',`<defs><linearGradient id="g"><stop stop-color="${C.cyan}"/><stop offset=".5" stop-color="${C.violet}"/><stop offset="1" stop-color="${C.rose}"/></linearGradient></defs><rect x="0" y="0" width="1200" height="126" rx="18" fill="${C.bg}"/><path d="M35 1H1165" stroke="url(#g)" stroke-opacity=".6"/>${text(600,53,'CẢM ƠN ĐÃ GHÉ THĂM.',21,C.ink,'text-anchor="middle" font-weight="600" letter-spacing="3"')}${text(600,87,'MOESHINN / HẸN GẶP LẠI Ở STREAM SAU',11,C.muted,'class="mono" text-anchor="middle" letter-spacing="2"')}`));
save('footer-mobile',svg(600,140,'Cảm ơn đã ghé thăm — Moe Shinn',`<rect width="600" height="140" rx="18" fill="${C.bg}"/><path d="M25 1H575" stroke="${C.violet}" stroke-opacity=".6"/>${text(300,61,'CẢM ƠN ĐÃ GHÉ THĂM.',24,C.ink,'text-anchor="middle" font-weight="600" letter-spacing=".5"')}${text(300,103,'MOESHINN / HẸN GẶP LẠI Ở STREAM SAU',14,C.muted,'class="mono" text-anchor="middle" letter-spacing=".6"')}`));
console.log('Built 25 SVG assets.');
