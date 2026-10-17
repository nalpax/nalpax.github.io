import * as THREE from "./vendor/three.module.min.js";
import { RoomEnvironment } from "./vendor/RoomEnvironment.js";
import { mergeVertices } from "./vendor/BufferGeometryUtils.js";

const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = matchMedia("(pointer: fine)").matches;
const lite = !fine || innerWidth < 760;
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };
const ease = (t) => 1 - Math.pow(1 - t, 3);

/* =====================================================================
   ДАННЫЕ. Характеристики и цены — по открытым источникам, ориентировочно.
   ===================================================================== */
const MODELS = [
  { id: "f80", name: "F80", years: "2025 —", tag: "Гиперкар-флагман, 799 штук", arch: "mid", L: 4.84, W: 2.06, H: 1.14, r: .37, wing: true, tail: "bar", skirt: .36, hp: "1 200", acc: "2,15 с", top: "350 км/ч", eng: "V6 гибрид", price: 3900000 },
  { id: "849", name: "849 Testarossa", years: "2025 —", tag: "Гибридный V8 на смену SF90", arch: "mid", L: 4.72, W: 2.0, H: 1.2, r: .36, tail: "bar", skirt: .24, hp: "1 050", acc: "2,3 с", top: "330 км/ч", eng: "V8 гибрид", price: 520000 },
  { id: "12c", name: "12Cilindri", years: "2024 —", tag: "Атмосферный V12 спереди", arch: "front", L: 4.73, W: 2.18, H: 1.29, r: .37, tail: "bar", skirt: .2, hp: "830", acc: "2,9 с", top: "340+ км/ч", eng: "V12 6,5 л", price: 423000 },
  { id: "812", name: "812 Superfast", fav: true, years: "2017 — 2023", tag: "Любимая. V12 и 800 сил", arch: "front", L: 4.66, W: 1.97, H: 1.28, r: .36, tail: "quad", skirt: .2, hp: "800", acc: "2,9 с", top: "340 км/ч", eng: "V12 6,5 л", price: 335000 },
  { id: "sf90", name: "SF90 Stradale", years: "2019 —", tag: "Первый серийный подключаемый гибрид", arch: "mid", L: 4.71, W: 1.97, H: 1.19, r: .36, tail: "slim", skirt: .24, hp: "1 000", acc: "2,5 с", top: "340 км/ч", eng: "V8 гибрид", price: 524000 },
  { id: "296", name: "296 GTB", years: "2022 —", tag: "V6 гибрид, 830 сил", arch: "mid", L: 4.57, W: 1.96, H: 1.19, r: .35, tail: "slim", skirt: .22, hp: "830", acc: "2,9 с", top: "330+ км/ч", eng: "V6 гибрид", price: 322000 },
  { id: "puro", name: "Purosangue", years: "2023 —", tag: "Четыре двери и V12", arch: "suv", L: 4.97, W: 2.03, H: 1.59, r: .4, tail: "slim", skirt: .3, hp: "725", acc: "3,3 с", top: "310 км/ч", eng: "V12 6,5 л", price: 398000 },
];
const PAINTS = [
  { n: "Rosso Corsa", c: "#c40000", p: 0 },
  { n: "Nero Daytona", c: "#0c0c0e", p: 0 },
  { n: "Giallo Modena", c: "#f0be00", p: 0 },
  { n: "Bianco Avus", c: "#ecebe6", p: 0 },
  { n: "Grigio Titanio", c: "#5c6064", p: 0 },
  { n: "Rosso Magma", c: "#9c2a12", p: 12000 },
  { n: "Blu Tour de France", c: "#1a2c66", p: 12000 },
  { n: "Verde British", c: "#0e3627", p: 12000 },
];
const ROOFS = [{ n: "В цвет кузова", p: 0 }, { n: "Nero, двухцветная", p: 4800 }];
const WHEELS = [
  { n: "Стандарт", c: "#c9ccd0", spokes: 5, p: 0 },
  { n: "Кованые", c: "#27282b", spokes: 10, p: 9600 },
  { n: "Карбон", c: "#ffffff", spokes: 5, carbon: true, p: 22400 },
];
const CALIPERS = [
  { n: "Чёрные", c: "#141414", p: 0 },
  { n: "Rosso", c: "#d40000", p: 1600 },
  { n: "Giallo", c: "#f5c400", p: 1600 },
  { n: "Алюминий", c: "#b8bcc2", p: 1600 },
];
const PACKS = [{ n: "Стандарт", p: 0 }, { n: "Carbon Pack", p: 38000 }];
const fmt$ = (v) => "$" + v.toLocaleString("en-US");

/* =====================================================================
   СТАРТОВЫЕ ОГНИ
   ===================================================================== */
let introStart = () => {};
(() => {
  const box = $("#lights"), pods = $$(".pod", box);
  let seen = false;
  try { seen = sessionStorage.getItem("fz-intro") === "1"; sessionStorage.setItem("fz-intro", "1"); } catch (e) {}
  let done = false;
  const go = () => {
    if (done) return; done = true;
    pods.forEach((p) => p.classList.remove("on"));
    box.classList.add("go");
    document.body.classList.add("ready");
    document.body.classList.remove("intro");
    setTimeout(() => box.remove(), 1200);
  };
  $("#l-skip").addEventListener("click", go);
  if (reduce || seen) { box.remove(); document.body.classList.add("ready"); document.body.classList.remove("intro"); done = true; return; }
  // огни запускаются, когда главная сцена уже построена — иначе на слабом телефоне их не видно
  introStart = () => requestAnimationFrame(() => {
    pods.forEach((p, i) => setTimeout(() => !done && p.classList.add("on"), 300 + i * 420));
    setTimeout(go, 300 + 4 * 420 + 650 + Math.random() * 500);
  });
})();
$$(".word span").forEach((s, i) => (s.style.transitionDelay = 200 + i * 70 + "ms"));

/* =====================================================================
   КУРСОР-СПИДОМЕТР И СЛЕД «СТОП-СИГНАЛОВ»
   ===================================================================== */
if (fine && !reduce) {
  document.body.classList.add("has-cur");
  const cur = $(".cur"), val = $(".cur .val"), kmh = $("#kmh"), cv = $("#streak"), cx = cv.getContext("2d");
  let x = -200, y = -200, px = x, py = y, speed = 0, pts = [];
  const size = () => { cv.width = innerWidth * devicePixelRatio; cv.height = innerHeight * devicePixelRatio; cx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0); };
  size(); addEventListener("resize", size);
  addEventListener("pointermove", (e) => {
    if (Math.hypot(e.clientX - x, e.clientY - y) > 300) { pts = []; px = e.clientX; py = e.clientY; }
    x = e.clientX; y = e.clientY;
  });
  document.addEventListener("pointerleave", () => { x = y = -200; pts = []; });
  document.addEventListener("pointerover", (e) => cur.classList.toggle("hot", !!e.target.closest("a, button, canvas, .sw button, input")));
  (function loop() {
    requestAnimationFrame(loop);
    const d = Math.hypot(x - px, y - py);
    speed = lerp(speed, d, .2);
    px = x; py = y;
    cur.style.transform = `translate(${x}px,${y}px)`;
    const v = clamp(speed / 60);
    val.style.strokeDashoffset = 100 - v * 75;
    kmh.textContent = Math.round(v * 340) + " KM/H";
    const now = performance.now();
    if (d > .5) pts.push({ x, y, t: now });
    while (pts.length && now - pts[0].t > 380) pts.shift();
    cx.clearRect(0, 0, innerWidth, innerHeight);
    if (pts.length < 2) return;
    cx.lineCap = "round"; cx.shadowColor = "#ff1a0a"; cx.shadowBlur = 12;
    // два параллельных следа — как фонари уезжающей машины
    for (const off of [-4, 4]) {
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1], b = pts[i], dx = b.x - a.x, dy = b.y - a.y, len = Math.hypot(dx, dy) || 1;
        const nx = -dy / len * off, ny = dx / len * off, life = 1 - (now - b.t) / 380;
        cx.strokeStyle = `rgba(255,${30 + life * 40 | 0},20,${life * .85})`;
        cx.lineWidth = 1 + life * 2.2;
        cx.beginPath(); cx.moveTo(a.x + nx, a.y + ny); cx.lineTo(b.x + nx, b.y + ny); cx.stroke();
      }
    }
  })();
}

/* =====================================================================
   ШИФТ-ЛАМПЫ (прогресс прокрутки) И ИНДИКАТОР ПЕРЕДАЧИ
   ===================================================================== */
const shift = $("#shift");
shift.innerHTML = Array.from({ length: 15 }, (_, i) => `<i class="${i >= 10 ? "b" : i >= 5 ? "r" : ""}"></i>`).join("");
const leds = [...shift.children];
let flashAll = 0;
function updShift() {
  const max = document.documentElement.scrollHeight - innerHeight, p = max > 0 ? scrollY / max : 0;
  const n = flashAll > performance.now() ? 15 : Math.round(p * 15);
  leds.forEach((l, i) => l.classList.toggle("on", i < n));
  $("#nav").classList.toggle("solid", scrollY > 40);
}
addEventListener("scroll", () => requestAnimationFrame(updShift), { passive: true });
updShift();
(() => {
  const box = $("#gear-box"), name = $("#gear-name"), links = $$(".links a");
  let current = "N";
  const set = (g, label, id) => {
    links.forEach((a) => a.classList.toggle("on", a.dataset.sec === id));
    if (g === current) return;
    current = g;
    const old = box.querySelector("span:not(.out)"), nw = document.createElement("span");
    nw.textContent = g; nw.className = "in"; box.appendChild(nw);
    requestAnimationFrame(() => { nw.className = ""; old && old.classList.add("out"); });
    setTimeout(() => old && old.remove(), 500);
    name.textContent = label;
  };
  const secs = $$("[data-gear]");
  const pick = () => {
    const mid = innerHeight * .45;
    let best = secs[0];
    for (const s of secs) if (s.getBoundingClientRect().top <= mid) best = s;
    set(best.dataset.gear, best.dataset.gname, { top: "hero", specs: "specs", anatomy: "anatomy", config: "config" }[best.id]);
  };
  addEventListener("scroll", () => requestAnimationFrame(pick), { passive: true });
  pick();
})();

// появление
const rvIO = new IntersectionObserver((es) => es.forEach((e) => {
  if (!e.isIntersecting) return;
  e.target.classList.add("in"); rvIO.unobserve(e.target);
}), { threshold: .15 });
$$(".rv").forEach((el, i) => { el.style.transitionDelay = (i % 4) * 90 + "ms"; rvIO.observe(el); });

/* =====================================================================
   ХАРАКТЕРИСТИКИ: счётчики, тахометр, лаунч-контроль
   ===================================================================== */
const fmtNum = (v, dec, sep) => {
  const s = v.toFixed(dec).replace(".", ",");
  return sep ? s.replace(/\B(?=(\d{3})+(?!\d))/g, " ") : s;
};
new IntersectionObserver((es, io) => es.forEach((e) => {
  if (!e.isIntersecting) return;
  io.unobserve(e.target);
  $$("[data-count]", e.target).forEach((el) => {
    const to = +el.dataset.count, dec = +(el.dataset.dec || 0), sep = el.hasAttribute("data-sep"), t0 = performance.now();
    (function step(t) {
      const k = reduce ? 1 : clamp((t - t0) / 1600);
      el.textContent = fmtNum(to * ease(k), dec, sep);
      if (k < 1) requestAnimationFrame(step);
    })(t0);
  });
}), { threshold: .4 }).observe($(".cells"));

const tacho = (() => {
  const el = $("#tacho"), NS = "http://www.w3.org/2000/svg", C = 200, R = 172;
  const ang = (v) => 135 + v / 10 * 270, pt = (r, a) => [C + r * Math.cos(a * Math.PI / 180), C + r * Math.sin(a * Math.PI / 180)];
  const arc = (r, a0, a1) => { const [x0, y0] = pt(r, a0), [x1, y1] = pt(r, a1); return `M${x0} ${y0} A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1} ${y1}`; };
  let s = `<svg viewBox="0 0 400 400" aria-hidden="true">
    <defs><radialGradient id="tg"><stop offset="0" stop-color="#1a1a1d"/><stop offset="1" stop-color="#09090a"/></radialGradient></defs>
    <circle cx="200" cy="200" r="196" fill="url(#tg)" stroke="#232326" stroke-width="2"/>
    <path d="${arc(R, 135, 405)}" fill="none" stroke="rgba(243,240,234,.12)" stroke-width="2"/>
    <path d="${arc(R - 7, ang(8.5), ang(10))}" fill="none" stroke="#ff2a1a" stroke-width="12" opacity=".9"/>
    <path id="t-sweep" d="${arc(R - 7, 135, 405)}" fill="none" stroke="rgba(255,42,26,.35)" stroke-width="12" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100"/>`;
  for (let v = 0; v <= 10; v += .5) {
    const major = v % 1 === 0, [x1, y1] = pt(R, ang(v)), [x2, y2] = pt(R - (major ? 22 : 12), ang(v));
    s += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${v >= 8.5 ? "#ff2a1a" : "#f3f0ea"}" stroke-width="${major ? 3 : 1.5}"/>`;
    if (major) { const [tx, ty] = pt(R - 46, ang(v)); s += `<text x="${tx}" y="${ty + 8}" text-anchor="middle" font-family="Oswald" font-size="24" fill="${v >= 9 ? "#ff2a1a" : "#f3f0ea"}">${v}</text>`; }
  }
  s += `<text x="200" y="138" text-anchor="middle" font-family="Oswald" font-size="13" letter-spacing="4" fill="#8f8b86">F80 · V6 HYBRID</text>
    <g id="t-needle"><path d="M196 206 L200 46 L204 206 Z" fill="#ff2a1a"/></g>
    <circle cx="200" cy="200" r="16" fill="#0b0b0c" stroke="#3a3a3e" stroke-width="2"/></svg>`;
  el.insertAdjacentHTML("afterbegin", s);
  const needle = $("#t-needle", el), sweep = $("#t-sweep", el), read = $("#rpm-read");
  let v = 0, target = 0, anim = null;
  function set(x) { v = x; needle.setAttribute("transform", `rotate(${ang(x) - 270} 200 200)`); sweep.setAttribute("stroke-dashoffset", 100 - x * 10); read.textContent = x.toFixed(1).replace(".", ","); }
  set(0);
  function run(seq) {
    // seq: [[значение, длительность мс], ...]
    cancelAnimationFrame(anim);
    let i = 0, from = v, t0 = performance.now();
    (function step(t) {
      if (i >= seq.length) return;
      const [to, dur] = seq[i], k = clamp((t - t0) / dur);
      set(lerp(from, to, ease(k)));
      if (k >= 1) { i++; from = to; t0 = t; }
      anim = requestAnimationFrame(step);
    })(t0);
  }
  new IntersectionObserver(([e]) => e.isIntersecting && run([[9.6, 900], [1.1, 1300]]), { threshold: .5 }).observe(el);
  return { run };
})();

(() => {
  const box = $("#launch"), bars = $$(".lane i", box), labels = $$(".lane b", box);
  let raf;
  const run = () => {
    cancelAnimationFrame(raf);
    const t0 = performance.now();
    (function step(t) {
      const s = (t - t0) / 1000;
      bars.forEach((b, i) => {
        const T = +b.dataset.t, k = clamp(s / T);
        b.style.width = k * 100 + "%";
        labels[i].textContent = Math.min(s, T).toFixed(2);
      });
      if (s < 6) raf = requestAnimationFrame(step);
    })(t0);
  };
  new IntersectionObserver(([e], io) => { if (e.isIntersecting) { run(); io.disconnect(); } }, { threshold: .6 }).observe(box);
  $("#relaunch").addEventListener("click", run);
})();

/* =====================================================================
   ЗВУК V-образного мотора (синтез, только по нажатию)
   ===================================================================== */
let actx;
function revSound() {
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    actx.resume();
    const ac = actx, t = ac.currentTime;
    const out = ac.createGain(); out.gain.value = 0; out.connect(ac.destination);
    const lp = ac.createBiquadFilter(); lp.type = "lowpass"; lp.Q.value = 6; lp.connect(out);
    const sh = ac.createWaveShaper(), curve = new Float32Array(1024);
    for (let i = 0; i < 1024; i++) { const x = i / 512 - 1; curve[i] = Math.tanh(x * 3.2); }
    sh.curve = curve; sh.connect(lp);
    const trem = ac.createGain(); trem.gain.value = .75; trem.connect(sh);
    const lfo = ac.createOscillator(), lfoG = ac.createGain(); lfo.frequency.value = 23; lfoG.gain.value = .25; lfo.connect(lfoG); lfoG.connect(trem.gain);
    const oscs = [["sawtooth", 1, 0], ["square", .5, 0], ["sawtooth", 1.01, 7]].map(([type, mul, det]) => {
      const o = ac.createOscillator(); o.type = type; o.detune.value = det; const g = ac.createGain(); g.gain.value = type === "square" ? .35 : .5; o.connect(g); g.connect(trem); o.mul = mul; return o;
    });
    const F = [[0, 22], [.35, 28], [.55, 72], [.75, 62], [1.35, 260], [1.75, 95], [2.25, 210], [2.65, 80], [3.6, 70]];
    for (const o of oscs) { o.frequency.setValueAtTime(F[0][1] * o.mul, t); F.slice(1).forEach(([s, f]) => o.frequency.exponentialRampToValueAtTime(f * o.mul, t + s)); }
    lp.frequency.setValueAtTime(300, t); F.slice(1).forEach(([s, f]) => lp.frequency.exponentialRampToValueAtTime(Math.min(4000, f * 7), t + s));
    out.gain.setValueAtTime(0, t); out.gain.linearRampToValueAtTime(.12, t + .3); out.gain.linearRampToValueAtTime(.32, t + .6); out.gain.setValueAtTime(.32, t + 3); out.gain.linearRampToValueAtTime(0, t + 4);
    [...oscs, lfo].forEach((o) => { o.start(t); o.stop(t + 4.1); });
  } catch (e) { /* без звука — не страшно */ }
}

/* =====================================================================
   КОНФИГУРАТОР — состояние и интерфейс (работает и без 3D)
   ===================================================================== */
const state = { model: "812", paint: 0, roof: 1, wheel: 1, cal: 2, pack: 0 };
const curModel = () => MODELS.find((m) => m.id === state.model);
const total = () => curModel().price + PAINTS[state.paint].p + ROOFS[state.roof].p + WHEELS[state.wheel].p + CALIPERS[state.cal].p + PACKS[state.pack].p;
const cfgHooks = [];

function setOdo(el, value) {
  const str = fmt$(value);
  if (el.dataset.len !== String(str.length)) {
    el.innerHTML = [...str].map((ch) => /\d/.test(ch) ? `<span class="d"><i>${[..."0123456789"].map((n) => `<span>${n}</span>`).join("")}</i></span>` : `<span class="s">${ch}</span>`).join("");
    el.dataset.len = str.length;
    el.offsetHeight;
  }
  [...el.children].forEach((c, i) => { if (c.classList.contains("d")) { c.firstChild.style.transitionDelay = i * 40 + "ms"; c.firstChild.style.transform = `translateY(${-(+str[i]) * 1.1}em)`; } });
}

(() => {
  $("#tabs").innerHTML = MODELS.map((m) => `<button type="button" class="tab" role="tab" data-id="${m.id}"><small>${m.years}${m.fav ? ' · <span class="fav">★ любимая</span>' : ""}</small><b>${m.name}</b></button>`).join("");
  $("#o-colors").innerHTML = PAINTS.map((p, i) => `<button type="button" data-i="${i}" style="background:${p.c}" aria-label="${p.n}" title="${p.n}${p.p ? " +" + fmt$(p.p) : ""}"></button>`).join("");
  $("#o-cals").innerHTML = CALIPERS.map((p, i) => `<button type="button" data-i="${i}" style="background:${p.c}" aria-label="${p.n}" title="${p.n}"></button>`).join("");
  const seg = (sel, list) => ($(sel).innerHTML = list.map((o, i) => `<button type="button" data-i="${i}">${o.n}<small>${o.p ? "+" + fmt$(o.p) : "включено"}</small></button>`).join(""));
  seg("#o-roofs", ROOFS); seg("#o-wheels", WHEELS); seg("#o-packs", PACKS);
  const bind = (sel, key) => $(sel).addEventListener("click", (e) => { const b = e.target.closest("[data-i]"); if (!b) return; state[key] = +b.dataset.i; render(key); });
  bind("#o-colors", "paint"); bind("#o-cals", "cal"); bind("#o-roofs", "roof"); bind("#o-wheels", "wheel"); bind("#o-packs", "pack");
  $("#tabs").addEventListener("click", (e) => { const b = e.target.closest("[data-id]"); if (!b || b.dataset.id === state.model) return; state.model = b.dataset.id; render("model"); });
  function render(changed) {
    const m = curModel();
    $$("#tabs .tab").forEach((t) => t.classList.toggle("on", t.dataset.id === m.id));
    $("#v-years").textContent = m.years; $("#v-name").textContent = m.name; $("#v-tag").textContent = m.tag;
    $("#v-hp").textContent = m.hp + " л.с."; $("#v-acc").textContent = m.acc; $("#v-top").textContent = m.top; $("#v-eng").textContent = m.eng;
    const on = (sel, i) => $$(`${sel} [data-i]`).forEach((b) => b.classList.toggle("on", +b.dataset.i === i));
    on("#o-colors", state.paint); on("#o-cals", state.cal); on("#o-roofs", state.roof); on("#o-wheels", state.wheel); on("#o-packs", state.pack);
    $("#o-color").textContent = PAINTS[state.paint].n + (PAINTS[state.paint].p ? " · +" + fmt$(PAINTS[state.paint].p) : "");
    $("#o-roof").textContent = ROOFS[state.roof].n; $("#o-wheel").textContent = WHEELS[state.wheel].n; $("#o-cal").textContent = CALIPERS[state.cal].n; $("#o-pack").textContent = PACKS[state.pack].n;
    setOdo($("#odo"), total());
    cfgHooks.forEach((f) => f(changed));
  }
  render("init");

  // лист сборки
  const sheet = $("#sheet");
  const code = () => [state.model, PAINTS[state.paint].n.split(" ").map((w) => w[0]).join(""), "R" + state.roof, "W" + state.wheel, "C" + state.cal, "P" + state.pack].join("-").toUpperCase();
  const lines = () => {
    const m = curModel();
    return [["Модель", `${m.name} · ${fmt$(m.price)}`], ["Цвет", PAINTS[state.paint].n + (PAINTS[state.paint].p ? ` · +${fmt$(PAINTS[state.paint].p)}` : "")], ["Крыша", ROOFS[state.roof].n], ["Диски", WHEELS[state.wheel].n], ["Суппорта", CALIPERS[state.cal].n], ["Комплектация", PACKS[state.pack].n], ["Мощность", m.hp + " л.с."], ["0–100 км/ч", m.acc]];
  };
  const open = () => {
    $("#sheet-title").textContent = curModel().name;
    $("#sheet-code").textContent = code();
    $("#sheet-list").innerHTML = lines().map(([a, b]) => `<dt>${a}</dt><dd>${b}</dd>`).join("");
    $("#sheet-sum").textContent = fmt$(total());
    sheet.classList.add("open"); sheet.setAttribute("aria-hidden", "false");
  };
  const close = () => { sheet.classList.remove("open"); sheet.setAttribute("aria-hidden", "true"); };
  $("#build").addEventListener("click", open);
  $("#sheet-close").addEventListener("click", close);
  sheet.addEventListener("click", (e) => e.target === sheet && close());
  addEventListener("keydown", (e) => e.key === "Escape" && close());
  $("#sheet-copy").addEventListener("click", async (e) => {
    const txt = [`Ferrari ${curModel().name} — ${code()}`, ...lines().map(([a, b]) => `${a}: ${b}`), `Итого: ${fmt$(total())}`].join("\n");
    try { await navigator.clipboard.writeText(txt); e.target.textContent = "Скопировано ✓"; } catch (err) { e.target.textContent = "Не вышло"; }
    setTimeout(() => (e.target.textContent = "Скопировать"), 1600);
  });
})();

/* =====================================================================
   3D: процедурная машина
   ===================================================================== */
const ARCH = {
  front: {
    top: [[1, .30], [.995, .42], [.965, .52], [.88, .60], [.78, .645], [.66, .655], [.62, .66], [.40, .675], [.24, .69], [.12, .69], [.04, .665], [0, .56], [0, .32]],
    green: [[.645, .60], [.625, .655], [.50, .92], [.42, .985], [.31, .975], [.19, .83], [.075, .675], [.07, .60]],
    roof: [[.50, .92], [.42, .985], [.31, .975], [.215, .86]],
    belt: .665, wheels: [.205, .795],
  },
  mid: {
    top: [[1, .26], [.995, .36], [.965, .47], [.90, .60], [.81, .70], [.72, .67], [.66, .62], [.45, .64], [.30, .70], [.12, .72], [.035, .70], [0, .60], [0, .30]],
    green: [[.69, .58], [.665, .62], [.555, .90], [.47, .995], [.38, .985], [.30, .86], [.22, .73], [.21, .62]],
    roof: [[.555, .90], [.47, .995], [.38, .985], [.315, .885]],
    belt: .64, wheels: [.19, .80],
  },
  suv: {
    top: [[1, .30], [.995, .42], [.965, .53], [.88, .585], [.78, .60], [.68, .615], [.40, .63], [.14, .65], [.04, .64], [0, .56], [0, .30]],
    green: [[.70, .59], [.68, .615], [.57, .90], [.50, .975], [.30, .97], [.17, .95], [.075, .82], [.04, .64], [.04, .58]],
    roof: [[.57, .90], [.50, .975], [.30, .97], [.17, .95], [.09, .85]],
    belt: .62, wheels: [.19, .80],
  },
};

let carbonTex = null;
function getCarbon() {
  if (carbonTex) return carbonTex;
  const c = document.createElement("canvas"); c.width = c.height = 64;
  const x = c.getContext("2d");
  for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) {
    const g = x.createLinearGradient(i * 8, j * 8, i * 8 + 8, j * 8 + 8);
    const a = (i + j) % 2 ? ["#2b2b2e", "#111113"] : ["#121214", "#262629"];
    g.addColorStop(0, a[0]); g.addColorStop(1, a[1]);
    x.fillStyle = g; x.fillRect(i * 8, j * 8, 8, 8);
  }
  carbonTex = new THREE.CanvasTexture(c);
  carbonTex.wrapS = carbonTex.wrapT = THREE.RepeatWrapping; carbonTex.repeat.set(10, 10); carbonTex.colorSpace = THREE.SRGBColorSpace;
  return carbonTex;
}

function makeMats() {
  const phys = (c) => new THREE.MeshPhysicalMaterial({ color: c, metalness: .45, roughness: .28, clearcoat: 1, clearcoatRoughness: .05 });
  return {
    paint: phys("#c40000"),
    roof: new THREE.MeshPhysicalMaterial({ color: "#0c0c0e", metalness: .2, roughness: .25, clearcoat: 1, clearcoatRoughness: .08 }),
    glass: new THREE.MeshPhysicalMaterial({ color: "#07080b", metalness: .85, roughness: .05, clearcoat: 1 }),
    trim: new THREE.MeshStandardMaterial({ color: "#0c0c0d", metalness: .35, roughness: .42 }),
    skirt: new THREE.MeshStandardMaterial({ color: "#0d0d0e", metalness: .4, roughness: .4 }),
    tire: new THREE.MeshStandardMaterial({ color: "#121212", roughness: .9 }),
    rim: new THREE.MeshStandardMaterial({ color: "#c9ccd0", metalness: 1, roughness: .22 }),
    disc: new THREE.MeshStandardMaterial({ color: "#8a8a8c", metalness: .9, roughness: .4 }),
    caliper: new THREE.MeshStandardMaterial({ color: "#f5c400", metalness: .2, roughness: .35 }),
    head: new THREE.MeshBasicMaterial({ color: "#eef2ff" }),
    tail: new THREE.MeshBasicMaterial({ color: "#ff1408" }),
    engine: new THREE.MeshStandardMaterial({ color: "#3b3b3e", metalness: .85, roughness: .38 }),
    cam: new THREE.MeshStandardMaterial({ color: "#b30000", metalness: .3, roughness: .62 }),
    alu: new THREE.MeshStandardMaterial({ color: "#b9bcc1", metalness: .95, roughness: .28 }),
    leather: new THREE.MeshStandardMaterial({ color: "#191515", roughness: .75 }),
    carbon: new THREE.MeshStandardMaterial({ color: "#ffffff", map: getCarbon(), metalness: .5, roughness: .32 }),
  };
}

function buildCar(m, mats, opt = {}) {
  const A = ARCH[m.arch], L = m.L, W = m.W, H = m.H, r = m.r, clear = m.arch === "suv" ? .17 : .1;
  const xR = (A.wheels[0] - .5) * L, xF = (A.wheels[1] - .5) * L, beltY = A.belt * H, R = r + .055;
  const BT = .07, hw = W / 2;
  const car = new THREE.Group(), parts = [];
  const part = (obj, ex, label) => { car.add(obj); const p = { obj, base: obj.position.clone(), rot: obj.rotation.clone(), ex, label }; parts.push(p); return p; };
  const V2 = (u, v) => new THREE.Vector2((u - .5) * L, v * H);

  // ширина кузова в точке (x, y): сужение носа/хвоста, завал боковин, «бёдра» над колёсами
  function sc(x, y) {
    const u = x / L + .5;
    let s = 1 - .2 * Math.pow(smooth(.82, 1.03, u), 1.5) - .12 * Math.pow(smooth(.15, -.03, u), 1.5);
    s *= 1 - .09 * smooth(beltY - .18, beltY + .12, y);
    const haunch = Math.exp(-(((x - xR) / .6) ** 2)) + Math.exp(-(((x - xF) / .55) ** 2));
    s *= 1 + .04 * haunch * (1 - smooth(beltY - .1, beltY + .05, y));
    s *= 1 - .07 * smooth(.38, .06, y);
    return s;
  }
  const halfW = (x, y) => hw * sc(x, y);
  function solid(shape, depth, deform, o = {}) {
    let g = new THREE.ExtrudeGeometry(shape, { depth, steps: o.steps ?? 6, curveSegments: o.cs ?? (lite ? 14 : 22), bevelEnabled: true, bevelThickness: o.bt ?? BT, bevelSize: o.bs ?? .05, bevelSegments: o.seg ?? 4 });
    g.translate(0, 0, -depth / 2);
    g.deleteAttribute("normal"); g.deleteAttribute("uv");
    g = mergeVertices(g, 1e-4);
    const pos = g.attributes.position, v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) { v.fromBufferAttribute(pos, i); deform(v); pos.setXYZ(i, v.x, v.y, v.z); }
    g.computeVertexNormals();
    return g;
  }
  function lowerPath(s) {
    const xb = -L / 2, xf = L / 2;
    s.lineTo(xb + .04, clear + .07); s.lineTo(xb + .16, clear);
    s.lineTo(xR - R, clear); s.lineTo(xR - R, r); s.absarc(xR, r, R, Math.PI, 0, true); s.lineTo(xR + R, clear);
    s.lineTo(xF - R, clear); s.lineTo(xF - R, r); s.absarc(xF, r, R, Math.PI, 0, true); s.lineTo(xF + R, clear);
    s.lineTo(xf - .14, clear + .01); s.lineTo(xf - .02, clear + .09);
  }

  // --- кузов
  const bodyS = new THREE.Shape(), TP = A.top.map(([u, v]) => V2(u, v));
  bodyS.moveTo(TP[0].x, TP[0].y); bodyS.splineThru(TP.slice(1)); lowerPath(bodyS); bodyS.closePath();
  const bodyG = solid(bodyS, W - 2 * BT, (v) => {
    const u = v.x / L + .5, s = sc(v.x, v.y);
    v.z *= s;
    const zn = Math.abs(v.z) / hw, top = smooth(beltY * .74, beltY * .93, v.y);
    v.y -= .045 * (1 - zn * zn) * top * smooth(.6, .72, u) * (1 - smooth(.94, 1, u)); // ложбина капота между крыльями
    v.y -= .02 * zn * zn * top * smooth(.3, .1, u);
  }, { steps: 8 });
  const shell = [];
  shell.push(new THREE.Mesh(bodyG, mats.paint));

  // --- кабина (стекло) и крыша
  const gs = new THREE.Shape(), GP = A.green.map(([u, v]) => V2(u, v));
  gs.moveTo(GP[0].x, GP[0].y); gs.splineThru(GP.slice(1, -1)); gs.lineTo(GP.at(-1).x, GP.at(-1).y); gs.closePath();
  const gW = W * .84 - 2 * BT;
  const gScale = (x, y) => (1 - .2 * Math.pow(smooth(.82, 1.03, x / L + .5), 1.5) - .1 * Math.pow(smooth(.15, -.03, x / L + .5), 1.5)) * (1 - .2 * smooth(beltY, H, y));
  const cabin = new THREE.Mesh(solid(gs, gW, (v) => { v.z *= gScale(v.x, v.y); v.y -= .03 * (Math.abs(v.z) / hw) ** 2 * smooth(H * .85, H, v.y); }, { bs: .03, steps: 6 }), mats.glass);
  const rs = new THREE.Shape(), RP = A.roof.map(([u, v]) => V2(u, v + .008)), RB = A.roof.map(([u, v]) => V2(u, v - .03)).reverse();
  rs.moveTo(RP[0].x, RP[0].y); rs.splineThru(RP.slice(1)); rs.lineTo(RB[0].x, RB[0].y); rs.splineThru(RB.slice(1)); rs.closePath();
  const roof = new THREE.Mesh(solid(rs, gW * .9, (v) => { v.z *= gScale(v.x, v.y); v.y -= .03 * (Math.abs(v.z) / hw) ** 2; }, { bt: .02, bs: .015, seg: 2, steps: 6 }), mats.roof);

  // --- пороги/юбки (чёрные или карбон)
  const sk = Math.max(m.skirt * H, clear + .12);
  const box2 = (x0, x1, y0, y1) => { const s = new THREE.Shape(); s.moveTo(x0, y0); s.lineTo(x1, y0); s.lineTo(x1, y1); s.lineTo(x0, y1); s.closePath(); return s; };
  for (const [x0, x1, y1] of [[xR + R + .02, xF - R - .02, sk], [xF + R + .02, L / 2 - .1, Math.min(sk, H * .2)], [-L / 2 + .1, xR - R - .02, Math.min(sk, H * .26)]]) {
    const g = solid(box2(x0, x1, clear - .01, y1), W - 2 * BT, (v) => (v.z *= sc(v.x, v.y) * 1.012), { bt: .05, bs: .03, seg: 2, steps: 2, cs: 4 });
    shell.push(new THREE.Mesh(g, mats.skirt));
  }

  // --- детали кузова
  const mesh = (geo, mat, x, y, z, rx = 0, ry = 0, rz = 0) => { const o = new THREE.Mesh(geo, mat); o.position.set(x, y, z); o.rotation.set(rx, ry, rz); return o; };
  const boxG = (a, b, c) => new THREE.BoxGeometry(a, b, c);
  const sph = new THREE.SphereGeometry(.5, 24, 16);
  const front = m.arch !== "mid";
  // решётка и диффузор
  shell.push(mesh(boxG(.08, H * .11, W * .58), mats.trim, L / 2 - .05, H * .2, 0));
  shell.push(mesh(boxG(.36, .1, W * .72), mats.skirt, -L / 2 + .2, clear + .05, 0));
  for (let i = -2; i <= 2; i++) shell.push(mesh(boxG(.3, .12, .012), mats.trim, -L / 2 + .2, clear + .08, i * W * .14));
  // зеркала
  const mirX = (A.green[0][0] - .55) * L;
  for (const s of [-1, 1]) {
    const z = s * (halfW(mirX, beltY) + .1);
    const mir = mesh(sph, mats.paint, mirX, beltY + .07, z); mir.scale.set(.17, .085, .1); shell.push(mir);
    shell.push(mesh(boxG(.05, .05, .1), mats.trim, mirX + .02, beltY + .03, z - s * .07));
  }
  // боковые воздухозаборники
  for (const s of [-1, 1]) {
    if (front) { const x = xF - R - .28, y = beltY * .58; shell.push(mesh(boxG(.36, .16, .04), mats.trim, x, y, s * (halfW(x, y) - .006), 0, 0, -.12)); }
    else { const x = xR + R + .26, y = beltY * .6; shell.push(mesh(boxG(.5, .26, .05), mats.trim, x, y, s * (halfW(x, y) - .01), 0, 0, .18)); }
  }
  shell.forEach((o) => part(o, { d: [0, 1.75, 0], r: [0, 0, 0], delay: 0 }, null));
  const shellPart = parts[0];

  part(cabin, { d: [0, 2.6, 0], r: [0, 0, .06], delay: .06 });
  const roofPart = part(roof, { d: [0, 3.25, 0], r: [0, 0, -.08], delay: .12 });

  // фары и фонари
  const lights = new THREE.Group(), tails = new THREE.Group();
  const hx = L / 2 - .17, hy = A.top[2][1] * H - .03;
  for (const s of [-1, 1]) {
    const hl = mesh(sph, mats.head, hx, hy, s * hw * .6, 0, s * .4, -.15); hl.scale.set(.24, .03, .1); lights.add(hl);
    const hk = mesh(sph, mats.trim, hx - .015, hy - .012, s * hw * .6, 0, s * .4, -.15); hk.scale.set(.27, .05, .13); lights.add(hk);
  }
  const ty = A.top.at(-2)[1] * H * .98 + (m.arch === "mid" ? -.02 : 0);
  if (m.tail === "quad") {
    for (const z of [-.6, -.32, .32, .6]) tails.add(mesh(new THREE.CylinderGeometry(.068, .068, .05, 24), mats.tail, -L / 2 + .02, ty - .02, z * hw * 1.02, 0, 0, Math.PI / 2));
  } else if (m.tail === "bar") {
    tails.add(mesh(boxG(.04, .03, W * .74), mats.tail, -L / 2 + .02, ty, 0));
  } else {
    for (const s of [-1, 1]) tails.add(mesh(boxG(.04, .04, W * .24), mats.tail, -L / 2 + .025, ty, s * W * .25));
  }
  part(lights, { d: [1.1, 1.75, 0], r: [0, 0, 0], delay: .1 });
  part(tails, { d: [-1.1, 1.75, 0], r: [0, 0, 0], delay: .1 });
  // выхлоп
  const exG = new THREE.Group(), exGeo = new THREE.CylinderGeometry(.05, .05, .16, 20);
  const exZ = m.arch === "mid" ? [-.11, .11] : [-.36, -.22, .22, .36];
  for (const z of exZ) exG.add(mesh(exGeo, mats.alu, -L / 2 + .02, m.arch === "mid" ? H * .42 : clear + .14, z, 0, 0, Math.PI / 2));
  // антикрыло
  if (m.wing) {
    const wx = -L / 2 + .32, wy = A.top.at(-3)[1] * H;
    for (const s of [-1, 1]) part(mesh(boxG(.06, .16, .03), mats.carbon, wx + .03, wy + .07, s * .42), { d: [-.3, 2.3, 0], r: [0, 0, 0], delay: .15 });
    part(mesh(boxG(.34, .035, W * .86), mats.carbon, wx, wy + .15, 0, 0, 0, .1), { d: [-.4, 2.6, 0], r: [0, 0, .2], delay: .18 });
  }

  // --- колёса и тормоза
  const wheelMeshes = [], spokeGroups = [];
  const tw = m.arch === "suv" ? .3 : .285;
  const tireProf = [[r * .72, -tw / 2], [r - .035, -tw / 2], [r - .008, -tw / 2 + .03], [r, 0], [r - .008, tw / 2 - .03], [r - .035, tw / 2], [r * .72, tw / 2]].map(([a, b]) => new THREE.Vector2(a, b));
  const tireGeo = new THREE.LatheGeometry(tireProf, lite ? 28 : 40);
  const barrelGeo = new THREE.CylinderGeometry(r * .72, r * .72, tw * .86, 36, 1, true);
  const lipGeo = new THREE.TorusGeometry(r * .715, .014, 8, 48);
  const discGeo = new THREE.CylinderGeometry(r * .56, r * .56, .032, 36);
  const calGeo = new THREE.BoxGeometry(.11, .085, .22);
  for (const [x, s] of [[xF, 1], [xF, -1], [xR, 1], [xR, -1]]) {
    const z = s * (hw - tw / 2 + .015);
    const w = new THREE.Group(); w.position.set(x, r, z); w.rotation.x = s * Math.PI / 2;
    w.add(new THREE.Mesh(tireGeo, mats.tire), new THREE.Mesh(barrelGeo, mats.rim));
    const lip = new THREE.Mesh(lipGeo, mats.rim); lip.rotation.x = Math.PI / 2; lip.position.y = tw / 2 - .02; w.add(lip);
    const sp = new THREE.Group(); sp.position.y = tw / 2 - .035; w.add(sp); spokeGroups.push(sp);
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(r * .15, r * .17, .05, 24), mats.rim); hub.position.y = tw / 2 - .03; w.add(hub);
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(r * .07, r * .07, .055, 20), mats.caliper); cap.position.y = tw / 2 - .025; w.add(cap);
    wheelMeshes.push(w);
    part(w, { d: [x > 0 ? .25 : -.25, 0, s * 1.55], r: [0, 0, 0], delay: .16 }, "wheel");
    const br = new THREE.Group(); br.position.copy(w.position); br.rotation.copy(w.rotation);
    const disc = new THREE.Mesh(discGeo, mats.disc); disc.position.y = tw / 2 - .12; br.add(disc);
    const cal = new THREE.Mesh(calGeo, mats.caliper); cal.position.set(-r * .42 * .7, tw / 2 - .1, -r * .42 * .7); cal.rotation.y = Math.PI / 4; br.add(cal);
    part(br, { d: [0, .1, s * .9], r: [0, 0, 0], delay: .3 }, "brake");
  }
  function setSpokes(n) {
    for (const g of spokeGroups) {
      g.clear();
      for (let i = 0; i < n; i++) {
        const a = i / n * Math.PI * 2, b = new THREE.Mesh(new THREE.BoxGeometry(r * .6, .03, n > 6 ? .035 : .06), mats.rim);
        b.position.set(Math.cos(a) * r * .38, 0, Math.sin(a) * r * .38); b.rotation.y = -a; g.add(b);
      }
    }
  }
  setSpokes(5);
  part(exG, { d: [-1.4, -.1, 0], r: [0, 0, 0], delay: .35 }, "exhaust");

  // --- внутренности (только для анатомии)
  const internals = {};
  if (opt.internals) {
    const eng = new THREE.Group(), ex = xF - .52;
    eng.add(mesh(boxG(.86, .34, .5), mats.engine, 0, 0, 0));
    for (const s of [-1, 1]) {
      eng.add(mesh(boxG(.84, .075, .16), mats.cam, 0, .23, s * .17, s * .45));
      for (let i = 0; i < 6; i++) eng.add(mesh(new THREE.CylinderGeometry(.028, .028, .1, 12), mats.trim, -.33 + i * .132, .3, s * .2));
    }
    eng.add(mesh(boxG(.62, .08, .16), mats.trim, 0, .34, 0));
    eng.add(mesh(new THREE.CylinderGeometry(.13, .13, .12, 24), mats.alu, .48, -.02, 0, 0, 0, Math.PI / 2));
    eng.position.set(ex, .5, 0);
    internals.engine = part(eng, { d: [.5, 1.05, 0], r: [0, .3, 0], delay: .22 }, "engine");
    const gb = mesh(boxG(.52, .3, .42), mats.alu, xR + .12, .4, 0);
    internals.gearbox = part(gb, { d: [-.9, .55, 0], r: [0, -.3, 0], delay: .28 }, "gearbox");
    part(mesh(new THREE.CylinderGeometry(.055, .055, ex - xR - .7, 16), mats.alu, (ex + xR) / 2 - .05, .34, 0, 0, 0, Math.PI / 2), { d: [0, .2, 0], r: [0, 0, 0], delay: .3 });
    // выпускные трубы
    const pipes = new THREE.Group();
    for (const s of [-1, 1]) {
      const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(ex - .2, .45, s * .32), new THREE.Vector3(ex - .6, .2, s * .36), new THREE.Vector3(xR + .3, .2, s * .36), new THREE.Vector3(-L / 2 + .25, .22, s * .3)]);
      pipes.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 40, .038, 10), mats.alu));
    }
    internals.pipes = part(pipes, { d: [-.4, -.35, 0], r: [0, 0, 0], delay: .34 }, "pipes");
    // кокпит
    const cock = new THREE.Group(), sx = (A.green[0][0] - .5) * L - .95;
    for (const s of [-1, 1]) {
      const seat = new THREE.Group();
      seat.add(mesh(boxG(.5, .1, .46), mats.leather, 0, 0, 0), mesh(boxG(.1, .6, .46), mats.leather, -.24, .3, 0, 0, 0, .22), mesh(boxG(.08, .14, .26), mats.leather, -.33, .66, 0, 0, 0, .22));
      seat.add(mesh(boxG(.012, .58, .03), mats.cam, -.18, .3, 0, 0, 0, .22));
      seat.position.set(sx, .3, s * .36); cock.add(seat);
    }
    const sw = mesh(new THREE.TorusGeometry(.17, .022, 10, 32), mats.leather, sx + .52, .72, -.36, 0, Math.PI / 2, 0); sw.rotation.set(0, Math.PI / 2, 0); sw.rotateX(-.35); cock.add(sw);
    cock.add(mesh(boxG(.22, .16, W * .76), mats.carbon, sx + .75, .7, 0));
    internals.cockpit = part(cock, { d: [0, 1.25, 0], r: [0, 0, 0], delay: .26 }, "cockpit");
    // рама и пол
    const frame = new THREE.Group(), fl = xF - xR + .9;
    for (const y of [.2, .52]) for (const s of [-1, 1]) frame.add(mesh(new THREE.CylinderGeometry(.03, .03, fl, 10), mats.alu, (xF + xR) / 2, y, s * hw * .62, 0, 0, Math.PI / 2));
    for (let i = 0; i <= 4; i++) { const x = xR - .4 + i * fl / 4; frame.add(mesh(new THREE.CylinderGeometry(.025, .025, hw * 1.24, 8), mats.alu, x, .2, 0, Math.PI / 2, 0, 0)); frame.add(mesh(new THREE.CylinderGeometry(.022, .022, .32, 8), mats.alu, x, .36, hw * .62)); frame.add(mesh(new THREE.CylinderGeometry(.022, .022, .32, 8), mats.alu, x, .36, -hw * .62)); }
    internals.frame = part(frame, { d: [0, -.3, 0], r: [0, 0, 0], delay: .4 }, "frame");
    part(mesh(boxG(fl - .3, .03, W * .74), mats.carbon, (xF + xR) / 2, .13, 0), { d: [0, -.65, 0], r: [0, 0, 0], delay: .42 });
    part(mesh(boxG(.07, .34, W * .5), mats.alu, L / 2 - .42, .35, 0), { d: [1.2, .2, 0], r: [0, 0, 0], delay: .3 });
    // пружины подвески
    for (const [x, s] of [[xF, 1], [xF, -1], [xR, 1], [xR, -1]]) {
      const pts = []; for (let i = 0; i <= 80; i++) { const a = i / 80 * Math.PI * 14; pts.push(new THREE.Vector3(Math.cos(a) * .06, i / 80 * .32, Math.sin(a) * .06)); }
      const spr = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 160, .011, 6), mats.cam);
      spr.position.set(x, .36, s * (hw - .5));
      part(spr, { d: [0, .5, s * .45], r: [0, 0, 0], delay: .32 });
    }
  }

  // подписи для анатомии
  if (opt.internals) {
    internals.wheel = parts.find((p) => p.label === "wheel");
    internals.brake = parts.find((p) => p.label === "brake");
    internals.shell = shellPart;
    internals.roof = roofPart;
  }
  return {
    group: car, parts, internals, wheels: wheelMeshes, lights, tails, L, W,
    setSpokes,
    explode(e) {
      for (const p of parts) {
        const k = ease(smooth(p.ex.delay * .9, p.ex.delay * .9 + .55, e));
        p.obj.position.set(p.base.x + p.ex.d[0] * k, p.base.y + p.ex.d[1] * k, p.base.z + p.ex.d[2] * k);
        p.obj.rotation.set(p.rot.x + p.ex.r[0] * k, p.rot.y + p.ex.r[1] * k, p.rot.z + p.ex.r[2] * k);
      }
    },
  };
}

function disposeGroup(g) {
  g.traverse((o) => { if (o.geometry) o.geometry.dispose(); });
}

function shadowPlane(L, W, strength = .75) {
  const c = document.createElement("canvas"); c.width = c.height = 256;
  const x = c.getContext("2d"), g = x.createRadialGradient(128, 128, 10, 128, 128, 128);
  g.addColorStop(0, `rgba(0,0,0,${strength})`); g.addColorStop(.55, `rgba(0,0,0,${strength * .45})`); g.addColorStop(1, "rgba(0,0,0,0)");
  x.fillStyle = g; x.fillRect(0, 0, 256, 256);
  const t = new THREE.CanvasTexture(c);
  const m = new THREE.Mesh(new THREE.PlaneGeometry(L * 1.35, W * 1.9), new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false }));
  m.rotation.x = -Math.PI / 2; m.position.y = .004;
  return m;
}

function makeStage(canvas, o = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, lite ? 1.5 : 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = o.exposure ?? 1;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  const pm = new THREE.PMREMGenerator(renderer);
  scene.environment = pm.fromScene(new RoomEnvironment(), .04).texture;
  scene.environmentIntensity = o.env ?? .55;
  pm.dispose();
  const key = new THREE.DirectionalLight("#fff4ea", 2.2); key.position.set(4, 7, 5); scene.add(key);
  const rim = new THREE.PointLight("#ff2a1a", o.rim ?? 18, 14); rim.position.set(-4, 1.2, -3); scene.add(rim);
  const camera = new THREE.PerspectiveCamera(o.fov ?? 30, 1, .1, 120);
  const st = { renderer, scene, camera, tick: null, visible: false, raf: 0, onResize: null };
  const resize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
    st.onResize && st.onResize(w, h);
  };
  new ResizeObserver(resize).observe(canvas); resize();
  let last = performance.now();
  const loop = (t) => {
    st.raf = 0;
    if (!st.visible) return;
    const dt = Math.min(.05, (t - last) / 1000); last = t;
    st.tick && st.tick(t, dt);
    renderer.render(scene, camera);
    st.raf = requestAnimationFrame(loop);
  };
  new IntersectionObserver(([e]) => { st.visible = e.isIntersecting; if (st.visible && !st.raf) { last = performance.now(); st.raf = requestAnimationFrame(loop); } }, { rootMargin: "100px" }).observe(canvas);
  return st;
}

// расстояние камеры, чтобы машина длиной L занимала долю fill ширины кадра
function fitDist(cam, L, fill, min) {
  const vf = cam.fov * Math.PI / 180, hf = 2 * Math.atan(Math.tan(vf / 2) * cam.aspect);
  return Math.max(min, (L / 2) / (Math.tan(hf / 2) * fill));
}

function dragSpin(canvas, target, o = {}) {
  let down = false, lx = 0, vel = 0, lastTouch = -1e9;
  canvas.addEventListener("pointerdown", (e) => { down = true; lx = e.clientX; vel = 0; lastTouch = performance.now(); o.onStart && o.onStart(); });
  addEventListener("pointermove", (e) => { if (!down) return; const dx = e.clientX - lx; lx = e.clientX; vel = dx * .006; target.rotation.y += vel; lastTouch = performance.now(); });
  const up = () => { down = false; };
  addEventListener("pointerup", up); addEventListener("pointercancel", up);
  return (dt) => {
    if (down) return;
    target.rotation.y += vel; vel *= .93;
    if (performance.now() - lastTouch > 2600 && !reduce) target.rotation.y += (o.auto ?? .25) * dt;
  };
}

function initGL() {
  const probe = document.createElement("canvas");
  if (!(probe.getContext("webgl2") || probe.getContext("webgl"))) throw new Error("no webgl");

  /* ---------- главный экран: F80 на подиуме ---------- */
  {
    const st = makeStage($("#hero-gl"), { fov: 26, exposure: 1.05 });
    const mats = makeMats();
    mats.paint.color.set("#c40000"); mats.roof.color.set("#0c0c0e");
    mats.skirt.map = getCarbon(); mats.skirt.color.set("#ffffff"); mats.skirt.needsUpdate = true;
    const m = MODELS[0], car = buildCar(m, mats);
    car.setSpokes(10); mats.rim.color.set("#27282b");
    const pivot = new THREE.Group(); pivot.add(car.group); car.group.position.x = 0; st.scene.add(pivot);
    pivot.rotation.y = -.55;
    const stage = new THREE.Mesh(new THREE.CircleGeometry(3.3, 96), new THREE.MeshStandardMaterial({ color: "#060607", metalness: .5, roughness: .55 }));
    stage.rotation.x = -Math.PI / 2; st.scene.add(stage);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(3.3, .014, 8, 160), new THREE.MeshBasicMaterial({ color: "#ff1a0a" })); ring.rotation.x = Math.PI / 2; ring.position.y = .01; st.scene.add(ring);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(3.42, .005, 6, 160), new THREE.MeshBasicMaterial({ color: "#5a0a06" })); ring2.rotation.x = Math.PI / 2; st.scene.add(ring2);
    pivot.add(shadowPlane(m.L, m.W, .9));
    const flash = new THREE.PointLight("#ffffff", 0, 9); flash.position.set(3.4, .7, 0); car.group.add(flash);
    const spin = dragSpin($("#hero-gl"), pivot, { auto: .18, onStart: () => ($("#drag-hint").style.opacity = 0) });
    let rev = 0;
    st.onResize = () => {
      const d = fitDist(st.camera, 5.4, lite ? .98 : .62, lite ? 6 : 8.6);
      st.camera.position.set(0, 1.35 + d * .08, d); st.camera.lookAt(0, innerWidth < 600 ? .25 : .55, 0);
    };
    st.onResize();
    st.tick = (t, dt) => {
      spin(dt);
      rev = Math.max(0, rev - dt);
      const shake = rev > 0 ? Math.sin(t / 22) * .006 * Math.min(1, rev) : 0;
      car.group.position.y = shake; car.group.rotation.z = shake * .6;
      flash.intensity = rev > 0 ? 6 * Math.min(1, rev) * (.6 + .4 * Math.sin(t / 60)) : 0;
      ring.material.color.setRGB(1, .1 + (rev > 0 ? .3 * Math.min(1, rev) : 0), .04);
      car.wheels.forEach((w) => (w.children[3].rotation.y += rev > 0 ? dt * 3 : 0));
    };
    hooks.engine = () => { rev = 3.6; };
  }

  /* ---------- анатомия: 812 Superfast разбирается ---------- */
  lazy($("#ana-gl"), () => {
    const st = makeStage($("#ana-gl"), { fov: 30, exposure: 1.05, rim: 10 });
    const mats = makeMats();
    mats.paint.color.set("#c40000"); mats.roof.color.set("#0c0c0e"); mats.caliper.color.set("#f5c400");
    const m = MODELS.find((x) => x.id === "812"), car = buildCar(m, mats, { internals: true });
    car.setSpokes(10); mats.rim.color.set("#2a2b2e");
    const pivot = new THREE.Group(); pivot.add(car.group); st.scene.add(pivot);
    const floor = shadowPlane(m.L, m.W, .7); pivot.add(floor);
    const grid = new THREE.GridHelper(14, 28, "#3a0a08", "#1c1c1f"); grid.position.y = -.68; grid.material.transparent = true; grid.material.opacity = .5; st.scene.add(grid);
    const sec = $("#anatomy"), asm = $("#asm"), bar = $("#asm-bar"), coBox = $("#callouts");
    const CO = [
      ["engine", "V12 · 6,5 л", "800 л.с. при 8 500 об/мин"],
      ["gearbox", "Коробка", "7-ступенчатый «робот», две муфты"],
      ["brake", "Тормоза", "Карбон-керамика Brembo"],
      ["wheel", "Колёса", "20\" кованые диски"],
      ["cockpit", "Кокпит", "Два кресла и руль с манеттино"],
      ["frame", "Каркас", "Алюминиевая рама"],
      ["roof", "Крыша", "Nero — двухцветная окраска"],
      ["pipes", "Выпуск", "Четыре круглых патрубка"],
    ].slice(0, innerWidth < 700 ? 4 : 8).map(([key, b, s]) => {
      const el = document.createElement("div"); el.className = "co"; el.innerHTML = `<i></i><span><b>${b}</b><small>${s}</small></span>`;
      coBox.appendChild(el);
      return { el, p: car.internals[key] };
    });
    const v = new THREE.Vector3();
    let e = 1, eTarget = 1, rot = 0;
    const readScroll = () => {
      const r = sec.getBoundingClientRect(), p = clamp(-r.top / (r.height - innerHeight));
      eTarget = 1 - smooth(.06, .82, p);
      rot = -.75 + p * 1.1;
    };
    addEventListener("scroll", readScroll, { passive: true }); readScroll();
    st.tick = (t, dt) => {
      e = reduce ? eTarget : lerp(e, eTarget, Math.min(1, dt * 7));
      car.explode(e);
      pivot.rotation.y = lerp(pivot.rotation.y, rot, Math.min(1, dt * 4));
      const pct = Math.round((1 - e) * 100);
      asm.textContent = pct + "%"; bar.style.width = pct + "%";
      const d = innerWidth < 700 ? fitDist(st.camera, 5.2 + e * 1.6, 1, 5.5) : fitDist(st.camera, 6 + e * 3.2, .7, 9);
      st.camera.position.set(d * .62, 2.2 + e * 2.1 + d * .12, d * .78);
      st.camera.lookAt(0, .6 + e * 1.05, 0);
      st.camera.updateMatrixWorld();
      const w = st.renderer.domElement.clientWidth, h = st.renderer.domElement.clientHeight, show = smooth(.3, .7, e);
      const items = [];
      for (const c of CO) {
        c.p.obj.getWorldPosition(v);
        if (c.p === car.internals.wheel || c.p === car.internals.brake) v.y += .1;
        v.project(st.camera);
        const sx = (v.x * .5 + .5) * w, sy = (-v.y * .5 + .5) * h;
        items.push({ c, sx, sy, inside: sx > 10 && sx < w - 10 && sy > 70 && sy < h - 60 });
      }
      items.sort((a, b) => a.sy - b.sy);
      const placed = [], LW = innerWidth < 700 ? 110 : 215;
      for (const it of items) {
        let left = it.sx > w * .58, dy = 0;
        const box = () => left ? [it.sx - 14 - LW, it.sy - 36 + dy, it.sx - 14, it.sy + 8 + dy] : [it.sx + 14, it.sy - 36 + dy, it.sx + 14 + LW, it.sy + 8 + dy];
        const hit = () => { const a = box(); return placed.some((b) => a[0] < b[2] && a[2] > b[0] && a[1] < b[3] && a[3] > b[1]); };
        if (hit()) { left = !left; if (hit()) { left = !left; while (hit() && dy < 240) dy += 16; } }
        if (it.inside && show > .05) placed.push(box());
        const el = it.c.el;
        el.style.opacity = it.inside ? show : 0;
        el.classList.toggle("l", left);
        el.style.transform = `translate(${it.sx}px,${it.sy}px)`;
        el.lastChild.style.transform = `translateY(${dy}px)`;
      }
    };
  });

  /* ---------- конфигуратор ---------- */
  lazy($("#cfg-gl"), () => {
    const canvas = $("#cfg-gl"), st = makeStage(canvas, { fov: 28, exposure: 1.08, rim: 12 });
    const mats = makeMats();
    const pivot = new THREE.Group(); st.scene.add(pivot);
    const disk = new THREE.Mesh(new THREE.CircleGeometry(3.1, 80), new THREE.MeshStandardMaterial({ color: "#0a0a0c", metalness: .4, roughness: .6 })); disk.rotation.x = -Math.PI / 2; st.scene.add(disk);
    let car = null, shadow = null, m = null;
    const angle = $("#v-angle");
    pivot.rotation.y = -.6;
    const spin = dragSpin(canvas, pivot, { auto: .22 });
    function applyLook() {
      const P = PAINTS[state.paint], Wh = WHEELS[state.wheel], C = CALIPERS[state.cal], carbon = state.pack === 1;
      mats.paint.color.set(P.c);
      mats.roof.color.set(state.roof === 1 ? "#0c0c0e" : P.c);
      mats.caliper.color.set(C.c);
      mats.rim.color.set(Wh.c); mats.rim.map = Wh.carbon ? getCarbon() : null; mats.rim.metalness = Wh.carbon ? .5 : 1; mats.rim.needsUpdate = true;
      mats.skirt.map = carbon ? getCarbon() : null; mats.skirt.color.set(carbon ? "#ffffff" : "#0d0d0e"); mats.skirt.needsUpdate = true;
      car && car.setSpokes(Wh.spokes);
    }
    function load() {
      if (car) { pivot.remove(car.group); disposeGroup(car.group); }
      if (shadow) pivot.remove(shadow);
      m = curModel();
      car = buildCar(m, mats);
      pivot.add(car.group);
      shadow = shadowPlane(m.L, m.W, .85); pivot.add(shadow);
      applyLook();
      car.group.position.y = .5; // плавно «опускаем» на подиум
      st.onResize && st.onResize();
    }
    st.onResize = () => {
      if (!m) return;
      const d = fitDist(st.camera, m.L + .4, lite ? .84 : .82, 6.2);
      st.camera.position.set(0, 1.1 + d * .1, d); st.camera.lookAt(0, m.H * .32, 0);
    };
    cfgHooks.push((changed) => { if (changed === "model" || changed === "init") load(); else applyLook(); });
    load();
    st.tick = (t, dt) => {
      spin(dt);
      if (car) car.group.position.y = lerp(car.group.position.y, 0, Math.min(1, dt * 6));
      const deg = ((pivot.rotation.y * 180 / Math.PI) % 360 + 360) % 360;
      angle.textContent = Math.round(deg) + "°";
    };
  });
}

// тяжёлые сцены строим, только когда до них осталось немного прокрутки
function lazy(el, init) {
  const io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    io.disconnect();
    try { init(); } catch (err) { document.body.classList.add("no-gl"); console.warn("3D:", err.message); }
  }, { rootMargin: "900px 0px" });
  io.observe(el);
}

const hooks = { engine: null };
// даём заставке отрисоваться, потом строим 3D
setTimeout(() => {
  try { initGL(); }
  catch (e) { document.body.classList.add("no-gl"); console.warn("3D отключено:", e.message); }
  introStart();
}, 60);

/* =====================================================================
   ENGINE START: удерживай кнопку
   ===================================================================== */
(() => {
  const btn = $("#engine"), ring = $(".ring", btn);
  let t0 = 0, raf = 0, armed = false;
  const reset = () => { cancelAnimationFrame(raf); armed = false; ring.style.transition = "stroke-dashoffset .3s"; ring.style.strokeDashoffset = 100; };
  const fire = () => {
    armed = false; btn.classList.add("live");
    revSound();
    hooks.engine && hooks.engine();
    tacho.run([[2, 350], [1.2, 250], [9.4, 900], [3.5, 450], [8.2, 450], [1.1, 900]]);
    flashAll = performance.now() + 3200; updShift();
    const iv = setInterval(updShift, 200); setTimeout(() => { clearInterval(iv); updShift(); }, 3400);
    setTimeout(() => { btn.classList.remove("live"); ring.style.transition = "stroke-dashoffset .6s"; ring.style.strokeDashoffset = 100; }, 3600);
  };
  btn.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    if (btn.classList.contains("live")) return;
    armed = true; t0 = performance.now(); ring.style.transition = "none";
    (function step(t) {
      if (!armed) return;
      const k = clamp((t - t0) / 900);
      ring.style.strokeDashoffset = 100 - k * 100;
      if (k >= 1) fire(); else raf = requestAnimationFrame(step);
    })(t0);
  });
  ["pointerup", "pointerleave", "pointercancel"].forEach((ev) => btn.addEventListener(ev, () => armed && reset()));
  btn.addEventListener("keydown", (e) => { if ((e.key === "Enter" || e.key === " ") && !btn.classList.contains("live")) { e.preventDefault(); fire(); } });
})();
