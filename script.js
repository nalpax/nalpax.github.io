/* =========================================================
   НАСТРОЙКИ — все тексты меняются здесь
   ========================================================= */
const CONFIG = {
  name: "NALPAX",
  telegram: "nalpax",
  team: "ghoursteam",
  manager: "ceojobb",
  reviews: "https://t.me/+IaY9WUZKbF03YzFi",
  product: "https://t.me/ghoursteam/148",
  roles: ["creative developer", "web designer", "founder of GHOURS TEAM", "делаю сайты, которые запоминают"],
  marquee: ["NALPAX", "CREATIVE CODE", "GHOURS TEAM", "INTERACTIVE WEB", "WEB DESIGN", "OPEN TO WORK", "@nalpax"],
  stats: [
    { n: 6, suffix: "", label: "направлений в стеке" },
    { n: 24, suffix: "/7", label: "на связи в Telegram" },
    { n: 1000, suffix: "+", label: "строк кода" },
    { n: 1, suffix: "", label: "своя команда — GHOURS" },
  ],
  skills: [
    { name: "HTML / CSS", icon: "</>", level: 85, note: "вёрстка, анимации, адаптив" },
    { name: "JavaScript", icon: "JS", level: 70, note: "интерактив, canvas, логика" },
    { name: "Web Design", icon: "◆", level: 80, note: "стиль, типографика, UX" },
    { name: "Canvas / 3D", icon: "✦", level: 75, note: "анимации, эффекты, графика в браузере" },
    { name: "Telegram", icon: "✈", level: 75, note: "каналы, боты, комьюнити" },
    { name: "Teamwork", icon: "👥", level: 90, note: "веду команду GHOURS TEAM" },
  ],
  // Категории для фильтра портфолио
  categories: { all: "Все", soft: "Софт", web: "Сайты", tg: "Telegram", design: "Дизайн", lab: "Эксперименты" },
  // Работы в портфолио. soon: true — карточка «в работе»
  portfolio: [
    { title: "Video Cutter", cat: "soft", year: "2026", hue: "#ff2e63", icon: "✂", link: "https://t.me/ghoursteam/148", warp: "продукт",
      desc: "Софт для нарезки видео и добавления баннеров. Наша разработка — подробности и доступ в посте.", tags: ["Software", "Video", "Banners"] },
    { title: "nalpax.portfolio", cat: "web", year: "2026", hue: "#00ff6a", icon: "⌘", link: "#home",
      desc: "Этот сайт: хакерский стиль, 3D-глобус, следящий глаз, рабочий терминал.", tags: ["HTML", "CSS", "JS", "Canvas"] },
    { title: "GHOURS TEAM", cat: "tg", year: "2026", hue: "#00e5ff", icon: "👻", link: "https://t.me/ghoursteam",
      desc: "Мой проект и команда в Telegram. Заходи — там всё самое свежее.", tags: ["Telegram", "Community"] },
    { title: "Landing", cat: "web", year: "soon", hue: "#ff3df2", icon: "◆", link: "https://t.me/nalpax", soon: true,
      desc: "Лендинг в работе. Хочешь такой же для себя — пиши в Telegram.", tags: ["HTML", "CSS", "Design"] },
    { title: "Telegram Bot", cat: "tg", year: "soon", hue: "#ffd23f", icon: "⚙", link: "https://t.me/nalpax", soon: true,
      desc: "Бот в разработке. Анонс будет в канале GHOURS TEAM.", tags: ["Bot", "Telegram"] },
    { title: "Visual Pack", cat: "design", year: "soon", hue: "#ff7a2e", icon: "✦", link: "https://t.me/nalpax", soon: true,
      desc: "Обложки, логотипы и макеты. Скоро здесь.", tags: ["Design", "UI"] },
    { title: "Lab", cat: "lab", year: "soon", hue: "#8c6bff", icon: "▲", link: "https://t.me/nalpax", soon: true,
      desc: "Эксперименты с canvas и анимацией. Скоро здесь.", tags: ["Canvas", "Motion"] },
  ],
  tips: [
    "Привет! Я Байт — помощник nalpax 👾",
    "Наведи курсор на ERROR 404 — файл восстановится",
    "Подвигай мышкой по Матрице — символы разбегаются",
    "Введи «neofetch» в терминале ↓",
    "Есть секретная команда «red pill» 💊",
    "Заглядывай в GHOURS TEAM 👻",
    "Пиши nalpax в Telegram: @nalpax",
    "Видел наш софт для нарезки видео? Раздел soft ✂",
    "По вопросам — менеджер @ceojobb",
    "Нажми Ctrl+K — откроется командная палитра ⌘",
    "Включи </> в шапке — увидишь сайт глазами разработчика",
  ],
  sectorTips: {
    "02": "Это глаз nalpax. Он видит тебя 👁",
    "03": "Код слева — буквально про nalpax 😉",
    "04": "Видишь импульсы на плате? Это навыки качаются ⚡",
    "05": "GHOURS TEAM — главный проект. Жми на призрака!",
    "06": "Это наш софт ✂ Поводи курсором по таймлайну!",
    "07": "Попробуй: help, neofetch, hack nasa…",
    "08": "Тут все работы nalpax. Фильтруй по категориям!",
    "09": "Отзывы — без фильтров, прямо в Telegram ★",
    "10": "Пиши — nalpax отвечает быстро ✈",
  },
};

const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(pointer: fine)").matches;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const rand = (a, b) => a + Math.random() * (b - a);
const mouse = { x: -999, y: -999, down: false };
addEventListener("pointermove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
document.addEventListener("pointerleave", () => { mouse.x = mouse.y = -999; });
addEventListener("pointerdown", () => (mouse.down = true));
addEventListener("pointerup", () => (mouse.down = false));

/* Цикл анимации, который крутится только пока элемент виден на экране */
function animateWhenVisible(el, draw) {
  let running = false;
  const loop = (t) => { if (!running) return; draw(t); requestAnimationFrame(loop); };
  new IntersectionObserver(([e]) => {
    const was = running;
    running = e.isIntersecting && !reduceMotion;
    if (running && !was) requestAnimationFrame(loop);
  }).observe(el);
  if (reduceMotion) requestAnimationFrame(draw);
}
/* Подгоняет размер canvas под экран с учётом ретины */
function fitCanvas(canvas, maxDpr = 2) {
  const dpr = Math.min(devicePixelRatio || 1, maxDpr);
  const w = canvas.clientWidth, h = canvas.clientHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.getContext("2d").setTransform(dpr, 0, 0, dpr, 0, 0);
  return { w, h };
}

/* ---------- ASCII-логотип ---------- */
const LETTERS = {
  N: ["███╗   ██╗", "████╗  ██║", "██╔██╗ ██║", "██║╚██╗██║", "██║ ╚████║", "╚═╝  ╚═══╝"],
  A: [" █████╗ ", "██╔══██╗", "███████║", "██╔══██║", "██║  ██║", "╚═╝  ╚═╝"],
  L: ["██╗     ", "██║     ", "██║     ", "██║     ", "███████╗", "╚══════╝"],
  P: ["██████╗ ", "██╔══██╗", "██████╔╝", "██╔═══╝ ", "██║     ", "╚═╝     "],
  X: ["██╗  ██╗", "╚██╗██╔╝", " ╚███╔╝ ", " ██╔██╗ ", "██╔╝ ██╗", "╚═╝  ╚═╝"],
};
const ASCII_LOGO = LETTERS.N.map((_, i) => "NALPAX".split("").map((c) => LETTERS[c][i]).join("")).join("\n");

/* ---------- Звук (Web Audio, без файлов) ---------- */
let soundOn = false;
let audioCtx = null;
function beep(freq = 800, dur = 0.03, vol = 0.03) {
  if (!soundOn) return;
  audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  o.type = "square";
  o.frequency.value = freq;
  g.gain.value = vol;
  o.connect(g).connect(audioCtx.destination);
  o.start();
  o.stop(audioCtx.currentTime + dur);
}
$("#sound-btn").addEventListener("click", (e) => {
  soundOn = !soundOn;
  e.target.textContent = "sound: " + (soundOn ? "on" : "off");
  beep(1200, 0.08);
});

/* =========================================================
   ФОН: Матрица, которая убегает от курсора
   ========================================================= */
const matrix = (() => {
  const canvas = $("#matrix");
  const ctx = canvas.getContext("2d");
  const CHARS = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ<>/{}[]#$%&*+=NALPAX";
  const FONT = 16;
  let cols, drops, w, h, last = 0;
  const state = { color: "#00ff6a" };
  function resize() {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
    cols = Math.ceil(w / FONT);
    drops = Array.from({ length: cols }, () => Math.random() * -h / FONT);
  }
  function draw(t) {
    requestAnimationFrame(draw);
    if (t - last < 45) return;
    last = t;
    ctx.fillStyle = "rgba(2, 6, 4, 0.12)";
    ctx.fillRect(0, 0, w, h);
    ctx.font = FONT + "px JetBrains Mono, monospace";
    for (let i = 0; i < cols; i++) {
      let x = i * FONT;
      const y = drops[i] * FONT;
      const dx = x - mouse.x, dy = y - mouse.y;
      const dist = Math.hypot(dx, dy);
      const ch = CHARS[(Math.random() * CHARS.length) | 0];
      if (dist < 150) {
        x += (dx / (dist || 1)) * ((150 - dist) / 150) * 50;
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = state.color;
        ctx.shadowBlur = 14;
      } else {
        ctx.fillStyle = Math.random() > 0.975 ? "#e0ffe9" : state.color;
        ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 0.55;
      ctx.fillText(ch, x, y);
      ctx.globalAlpha = 1;
      if (y > h && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }
  resize();
  addEventListener("resize", resize);
  if (!reduceMotion) requestAnimationFrame(draw);
  return state;
})();

/* =========================================================
   ФОН: летающие 3D-фигуры (каркасы) поверх всех разделов
   ========================================================= */
(() => {
  const canvas = $("#shapes");
  const ctx = canvas.getContext("2d");
  const PHI = (1 + Math.sqrt(5)) / 2;
  const SOLIDS = {
    cube: [[-1,-1,-1],[1,-1,-1],[-1,1,-1],[1,1,-1],[-1,-1,1],[1,-1,1],[-1,1,1],[1,1,1]],
    octa: [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]],
    tetra: [[1,1,1],[1,-1,-1],[-1,1,-1],[-1,-1,1]],
    icosa: [[0,1,PHI],[0,-1,PHI],[0,1,-PHI],[0,-1,-PHI],[1,PHI,0],[-1,PHI,0],[1,-PHI,0],[-1,-PHI,0],[PHI,0,1],[-PHI,0,1],[PHI,0,-1],[-PHI,0,-1]],
  };
  // рёбра = пары вершин на минимальном расстоянии (работает для всех платоновых тел)
  const models = Object.fromEntries(Object.entries(SOLIDS).map(([k, v]) => {
    const len = Math.max(...v[0].map(Math.abs)) ? Math.hypot(...v[0]) : 1;
    const verts = v.map((p) => p.map((q) => q / len));
    let min = Infinity;
    for (let i = 0; i < verts.length; i++) for (let j = i + 1; j < verts.length; j++) min = Math.min(min, Math.hypot(...verts[i].map((q, n) => q - verts[j][n])));
    const edges = [];
    for (let i = 0; i < verts.length; i++) for (let j = i + 1; j < verts.length; j++) {
      if (Math.abs(Math.hypot(...verts[i].map((q, n) => q - verts[j][n])) - min) < 1e-3) edges.push([i, j]);
    }
    return [k, { verts, edges }];
  }));
  const colors = ["0,255,106", "0,229,255", "255,61,242", "255,210,63"];
  const kinds = Object.keys(models);
  let w, h, objs = [];
  function resize() {
    ({ w, h } = fitCanvas(canvas, 1.5));
    objs = Array.from({ length: w < 700 ? 6 : 11 }, (_, i) => ({
      m: models[kinds[i % kinds.length]],
      x: rand(0.03, 0.97) * w, y: rand(0, h * 3), size: rand(24, 80),
      ax: rand(0, 6), ay: rand(0, 6), sx: rand(0.002, 0.008), sy: rand(0.003, 0.01),
      par: rand(0.15, 0.6), c: colors[i % colors.length], spin: 1,
    }));
  }
  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (const o of objs) {
      const span = h + 200;
      const y = ((((o.y - scrollY * o.par) % span) + span) % span) - 100;
      const near = Math.hypot(o.x - mouse.x, y - mouse.y) < o.size * 2;
      o.spin += ((near ? 6 : 1) - o.spin) * 0.05;
      o.ax += o.sx * o.spin; o.ay += o.sy * o.spin;
      const ca = Math.cos(o.ax), sa = Math.sin(o.ax), cb = Math.cos(o.ay), sb = Math.sin(o.ay);
      const pts = o.m.verts.map(([px, py, pz]) => {
        const x1 = px * cb + pz * sb, z1 = -px * sb + pz * cb;
        const y1 = py * ca - z1 * sa, z2 = py * sa + z1 * ca;
        const k = 3 / (3 + z2);
        return [o.x + x1 * o.size * k, y + y1 * o.size * k];
      });
      ctx.strokeStyle = `rgba(${o.c},${near ? 0.9 : 0.35})`;
      ctx.lineWidth = near ? 1.5 : 1;
      ctx.beginPath();
      for (const [a, b] of o.m.edges) { ctx.moveTo(...pts[a]); ctx.lineTo(...pts[b]); }
      ctx.stroke();
      ctx.fillStyle = `rgba(${o.c},0.9)`;
      for (const p of pts) ctx.fillRect(p[0] - 1.5, p[1] - 1.5, 3, 3);
    }
    if (!reduceMotion) requestAnimationFrame(draw);
  }
  resize();
  addEventListener("resize", resize);
  requestAnimationFrame(draw);
})();

/* =========================================================
   ФОН: 3D-глобус из точек с дугами-связями (главный экран)
   ========================================================= */
(() => {
  const canvas = $("#globe");
  const ctx = canvas.getContext("2d");
  const N = 520;
  const pts = [];
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = i * 2.399963;
    pts.push([Math.cos(th) * r, y, Math.sin(th) * r]);
  }
  const hubs = [12, 77, 140, 201, 263, 330, 388, 451, 497].map((i) => pts[i]);
  const arcs = [[0, 3], [1, 5], [2, 7], [4, 8], [6, 1], [3, 6]];
  let size, angle = 0, tiltX = 0.35, tiltY = 0;
  function resize() { size = fitCanvas(canvas).w; }
  function rot([x, y, z]) {
    const ca = Math.cos(angle + tiltY), sa = Math.sin(angle + tiltY);
    let x1 = x * ca + z * sa, z1 = -x * sa + z * ca;
    const cb = Math.cos(tiltX), sb = Math.sin(tiltX);
    const y1 = y * cb - z1 * sb; z1 = y * sb + z1 * cb;
    return [x1, y1, z1];
  }
  function draw(t) {
    angle += 0.0035;
    const rect = canvas.getBoundingClientRect();
    if (mouse.x > -999) {
      tiltY += (((mouse.x - rect.left) / rect.width - 0.5) * 0.8 - tiltY) * 0.03;
      tiltX += ((0.35 + ((mouse.y - rect.top) / rect.height - 0.5) * 0.6) - tiltX) * 0.03;
    }
    const c = size / 2, R = size * 0.36;
    ctx.clearRect(0, 0, size, size);
    const g = ctx.createRadialGradient(c, c, R * 0.2, c, c, R * 1.4);
    g.addColorStop(0, "rgba(0,255,106,0.10)");
    g.addColorStop(1, "rgba(0,255,106,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    for (const p of pts) {
      const [x, y, z] = rot(p);
      const a = (z + 1) / 2;
      ctx.fillStyle = `rgba(0,255,106,${0.08 + a * 0.75})`;
      const s = 1 + a * 1.6;
      ctx.fillRect(c + x * R - s / 2, c + y * R - s / 2, s, s);
    }
    arcs.forEach(([i, j], k) => {
      const A = hubs[i], B = hubs[j];
      ctx.beginPath();
      let started = false;
      const steps = 36;
      const head = ((t / 1600 + k * 0.17) % 1) * steps;
      for (let s = 0; s <= steps; s++) {
        const u = s / steps;
        let v = A.map((a, q) => a + (B[q] - a) * u);
        const len = Math.hypot(...v);
        const lift = 1 + 0.28 * Math.sin(Math.PI * u);
        v = v.map((q) => (q / len) * lift);
        const [x, y, z] = rot(v);
        if (z < -0.15) { started = false; continue; }
        const px = c + x * R, py = c + y * R;
        if (!started) { ctx.moveTo(px, py); started = true; } else ctx.lineTo(px, py);
        if (Math.abs(s - head) < 0.5) {
          ctx.save(); ctx.fillStyle = "#fff"; ctx.shadowColor = "#00e5ff"; ctx.shadowBlur = 12;
          ctx.fillRect(px - 2, py - 2, 4, 4); ctx.restore();
        }
      }
      ctx.strokeStyle = k % 2 ? "rgba(255,61,242,0.55)" : "rgba(0,229,255,0.55)";
      ctx.lineWidth = 1;
      ctx.stroke();
    });
    hubs.forEach((p, i) => {
      const [x, y, z] = rot(p);
      if (z < 0) return;
      const pulse = 3 + Math.sin(t / 300 + i) * 2;
      ctx.beginPath();
      ctx.arc(c + x * R, c + y * R, pulse + 3, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,229,255,0.5)";
      ctx.stroke();
      ctx.fillStyle = "#00e5ff";
      ctx.fillRect(c + x * R - 2, c + y * R - 2, 4, 4);
    });
    ctx.save();
    ctx.translate(c, c);
    ctx.rotate(-0.4);
    ctx.beginPath();
    ctx.ellipse(0, 0, R * 1.45, R * 0.38, 0, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(0,255,106,0.25)";
    ctx.setLineDash([4, 6]);
    ctx.stroke();
    ctx.setLineDash([]);
    const sa = t / 1400;
    ctx.fillStyle = "#ff3df2";
    ctx.shadowColor = "#ff3df2";
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(Math.cos(sa) * R * 1.45, Math.sin(sa) * R * 0.38, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  resize();
  addEventListener("resize", resize);
  animateWhenVisible(canvas, draw);
})();

/* =========================================================
   ГЛАЗ, который следит за курсором
   ========================================================= */
const eye = (() => {
  const canvas = $("#eye-canvas");
  const ctx = canvas.getContext("2d");
  let W, H;
  const st = { ix: 0, iy: 0, pupil: 0.38, open: 1, blinkStart: -1, nextBlink: 2500 };
  const fibres = Array.from({ length: 110 }, () => ({ a: rand(0, Math.PI * 2), l: rand(0.55, 1), w: rand(0.5, 1.6), c: Math.random() }));
  function resize() { ({ w: W, h: H } = fitCanvas(canvas)); }
  function blink() { st.blinkStart = performance.now(); }

  function almond(cx, cy, ew, eh) {
    ctx.beginPath();
    ctx.moveTo(cx - ew / 2, cy);
    ctx.quadraticCurveTo(cx, cy - eh * 2, cx + ew / 2, cy);
    ctx.quadraticCurveTo(cx, cy + eh * 2, cx - ew / 2, cy);
    ctx.closePath();
  }

  function draw(t) {
    const cx = W / 2, cy = H / 2;
    const ew = W * 0.84, ehMax = H * 0.3;
    const R = H * 0.23;

    // моргание
    if (t > st.nextBlink && st.blinkStart < 0) blink();
    if (st.blinkStart >= 0) {
      const p = (performance.now() - st.blinkStart) / 260;
      st.open = p >= 1 ? 1 : Math.abs(Math.cos(p * Math.PI));
      if (p >= 1) { st.blinkStart = -1; st.nextBlink = t + rand(2500, 6000); }
    }
    const eh = Math.max(ehMax * st.open, 0.5);

    // куда смотреть
    const r = canvas.getBoundingClientRect();
    const mx = mouse.x - r.left, my = mouse.y - r.top;
    const has = mouse.x > -999;
    const dx = mx - cx, dy = my - cy;
    const dist = Math.hypot(dx, dy);
    const k = has ? Math.min(dist / 500, 1) : 0;
    const ang = Math.atan2(dy, dx);
    const tx = has ? Math.cos(ang) * k * ew * 0.24 : Math.sin(t / 1800) * ew * 0.12;
    const ty = has ? Math.sin(ang) * k * ehMax * 0.5 : 0;
    st.ix += (tx - st.ix) * 0.12;
    st.iy += (ty - st.iy) * 0.12;
    // зрачок: расширяется, когда курсор близко, сужается при клике
    const targetPupil = mouse.down ? 0.2 : has ? 0.3 + (1 - Math.min(dist / 600, 1)) * 0.28 : 0.38;
    st.pupil += (targetPupil - st.pupil) * 0.08;

    ctx.clearRect(0, 0, W, H);

    // HUD вокруг глаза
    ctx.save();
    ctx.translate(cx, cy);
    ctx.strokeStyle = "rgba(255,61,242,0.45)";
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 10]);
    ctx.rotate(t / 6000);
    ctx.beginPath(); ctx.arc(0, 0, H * 0.46, 0, Math.PI * 2); ctx.stroke();
    ctx.setLineDash([]);
    ctx.rotate(-t / 3000);
    ctx.strokeStyle = "rgba(0,229,255,0.6)";
    ctx.lineWidth = 2;
    for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.arc(0, 0, H * 0.43, i * Math.PI / 2, i * Math.PI / 2 + 0.6); ctx.stroke(); }
    ctx.restore();
    ctx.strokeStyle = "rgba(0,255,106,0.4)";
    for (let i = 0; i < 60; i++) {
      const a = (i / 60) * Math.PI * 2;
      const r1 = H * 0.47, r2 = r1 + (i % 5 ? 4 : 10);
      ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1); ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2); ctx.stroke();
    }

    // белок
    ctx.save();
    almond(cx, cy, ew, eh);
    const sg = ctx.createRadialGradient(cx, cy, 0, cx, cy, ew / 2);
    sg.addColorStop(0, "#1b0f29");
    sg.addColorStop(0.7, "#08040f");
    sg.addColorStop(1, "#000");
    ctx.fillStyle = sg;
    ctx.fill();
    ctx.clip();
    // сетка сканера внутри глаза
    ctx.strokeStyle = "rgba(255,61,242,0.07)";
    for (let x = cx - ew / 2; x < cx + ew / 2; x += 14) { ctx.beginPath(); ctx.moveTo(x, cy - ehMax); ctx.lineTo(x, cy + ehMax); ctx.stroke(); }
    const ix = cx + st.ix, iy = cy + st.iy;

    // внешнее кольцо радужки
    ctx.save();
    ctx.translate(ix, iy);
    ctx.rotate(-t / 2500);
    ctx.strokeStyle = "rgba(0,229,255,0.7)";
    ctx.setLineDash([6, 6]);
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(0, 0, R * 1.18, 0, Math.PI * 2); ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    // радужка
    const ig = ctx.createRadialGradient(ix, iy, R * 0.2, ix, iy, R);
    ig.addColorStop(0, "#ff3df2");
    ig.addColorStop(0.45, "#7a1fff");
    ig.addColorStop(0.8, "#00e5ff");
    ig.addColorStop(1, "#013a40");
    ctx.fillStyle = ig;
    ctx.shadowColor = "#00e5ff";
    ctx.shadowBlur = 30;
    ctx.beginPath(); ctx.arc(ix, iy, R, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0;
    // волокна радужки
    const rot = t / 9000;
    for (const f of fibres) {
      const a = f.a + rot;
      ctx.strokeStyle = f.c > 0.6 ? "rgba(255,255,255,0.35)" : f.c > 0.3 ? "rgba(0,255,106,0.45)" : "rgba(0,0,0,0.45)";
      ctx.lineWidth = f.w;
      ctx.beginPath();
      ctx.moveTo(ix + Math.cos(a) * R * st.pupil, iy + Math.sin(a) * R * st.pupil);
      ctx.lineTo(ix + Math.cos(a) * R * f.l, iy + Math.sin(a) * R * f.l);
      ctx.stroke();
    }
    // тёмный край радужки
    ctx.strokeStyle = "rgba(0,0,0,0.7)";
    ctx.lineWidth = 4;
    ctx.beginPath(); ctx.arc(ix, iy, R - 2, 0, Math.PI * 2); ctx.stroke();

    // зрачок
    const pr = R * st.pupil;
    ctx.fillStyle = "#000";
    ctx.shadowColor = "#ff3df2";
    ctx.shadowBlur = 16;
    ctx.beginPath(); ctx.arc(ix, iy, pr, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0;
    // перекрестие прицела в зрачке
    ctx.strokeStyle = "rgba(0,255,106,0.6)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(ix - pr * 0.6, iy); ctx.lineTo(ix + pr * 0.6, iy);
    ctx.moveTo(ix, iy - pr * 0.6); ctx.lineTo(ix, iy + pr * 0.6);
    ctx.stroke();
    // блики
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.beginPath(); ctx.ellipse(ix - R * 0.38, iy - R * 0.4, R * 0.13, R * 0.08, -0.6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.beginPath(); ctx.arc(ix + R * 0.32, iy + R * 0.34, R * 0.05, 0, Math.PI * 2); ctx.fill();
    // тень от века
    const lg = ctx.createLinearGradient(0, cy - eh, 0, cy - eh * 0.2);
    lg.addColorStop(0, "rgba(0,0,0,0.85)");
    lg.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = lg;
    ctx.fillRect(cx - ew / 2, cy - eh * 2, ew, eh * 1.8);
    ctx.restore();

    // контур и «ресницы»
    almond(cx, cy, ew, eh);
    ctx.strokeStyle = "#ff3df2";
    ctx.lineWidth = 3;
    ctx.shadowColor = "#ff3df2";
    ctx.shadowBlur = 18;
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(255,61,242,0.7)";
    ctx.lineWidth = 2;
    for (let i = 1; i < 12; i++) {
      const u = i / 12;
      const x = (1 - u) * (1 - u) * (cx - ew / 2) + 2 * (1 - u) * u * cx + u * u * (cx + ew / 2);
      const y = (1 - u) * (1 - u) * cy + 2 * (1 - u) * u * (cy - eh * 2) + u * u * cy;
      const a = -Math.PI / 2 + (u - 0.5) * 1.6;
      const len = 10 + Math.sin(u * Math.PI) * 14;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a) * len, y + Math.sin(a) * len); ctx.stroke();
    }

    // показания сбоку
    if (has) {
      $("#eye-target").textContent = `x:${mouse.x | 0} y:${mouse.y | 0}`;
      $("#eye-dist").textContent = (dist | 0) + "px";
      const locked = dist < 260;
      const s = $("#eye-status");
      s.textContent = locked ? "TARGET LOCKED" : "watching";
      s.className = locked ? "" : "ok";
    }
    $("#eye-pupil").textContent = Math.round(st.pupil * 200) + "%";
  }
  resize();
  addEventListener("resize", resize);
  animateWhenVisible(canvas, draw);
  canvas.addEventListener("click", () => { blink(); beep(500, 0.06); say("Ай! Я же моргаю 👁"); });
  return { blink };
})();

/* =========================================================
   ФОН: «нейросеть» из частиц (about)
   ========================================================= */
(() => {
  const canvas = $("#network");
  const ctx = canvas.getContext("2d");
  let w, h, nodes = [];
  function resize() {
    ({ w, h } = fitCanvas(canvas, 1));
    const count = Math.min(110, Math.floor((w * h) / 13000));
    nodes = Array.from({ length: count }, () => ({ x: rand(0, w), y: rand(0, h), vx: rand(-0.35, 0.35), vy: rand(-0.35, 0.35) }));
  }
  function draw() {
    ctx.clearRect(0, 0, w, h);
    const r = canvas.getBoundingClientRect();
    const mx = mouse.x - r.left, my = mouse.y - r.top;
    for (const n of nodes) {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
    }
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 130) {
          ctx.strokeStyle = `rgba(0,229,255,${(1 - d / 130) * 0.35})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      const dm = Math.hypot(a.x - mx, a.y - my);
      if (dm < 200) {
        ctx.strokeStyle = `rgba(0,255,106,${(1 - dm / 200) * 0.8})`;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mx, my); ctx.stroke();
      }
      ctx.fillStyle = dm < 200 ? "#00ff6a" : "rgba(0,229,255,.8)";
      ctx.fillRect(a.x - 1.5, a.y - 1.5, 3, 3);
    }
  }
  resize();
  addEventListener("resize", resize);
  animateWhenVisible(canvas, draw);
})();

/* =========================================================
   ФОН: волна из точек (terminal)
   ========================================================= */
(() => {
  const canvas = $("#wave");
  const ctx = canvas.getContext("2d");
  let w, h;
  function resize() { ({ w, h } = fitCanvas(canvas, 1.5)); }
  function draw(t) {
    ctx.clearRect(0, 0, w, h);
    const T = t / 1000;
    const r = canvas.getBoundingClientRect();
    const mxn = mouse.x > -999 ? (mouse.x - r.left) / w - 0.5 : 0;
    for (let z = 14; z >= 2; z -= 0.4) {
      for (let x = -9; x <= 9; x += 0.45) {
        const y = Math.sin(x * 0.6 + T + mxn * 4) * Math.cos(z * 0.5 + T * 0.7) * 0.9
                + Math.sin((x - mxn * 18) * 0.3 - z * 0.4 + T * 1.6) * 0.4 + 2.4;
        const sx = w / 2 + (x / z) * w * 0.55;
        const sy = h * 0.12 + (y / z) * h * 0.75;
        if (sx < -5 || sx > w + 5) continue;
        const a = Math.min(1, 4.5 / z);
        const hue = y < 2.2 ? "0,255,106" : "0,229,255";
        ctx.fillStyle = `rgba(${hue},${a * 0.8})`;
        const s = Math.max(1.6, 7 / z);
        ctx.fillRect(sx, sy, s, s);
      }
    }
  }
  resize();
  addEventListener("resize", resize);
  animateWhenVisible(canvas, draw);
})();

/* =========================================================
   ФОН: соты, которые загораются под курсором (portfolio)
   ========================================================= */
(() => {
  const canvas = $("#hex");
  const ctx = canvas.getContext("2d");
  const S = 26;
  let w, h, cells = [];
  function resize() {
    ({ w, h } = fitCanvas(canvas, 1));
    cells = [];
    const dx = S * Math.sqrt(3), dy = S * 1.5;
    for (let row = 0, y = 0; y < h + S; row++, y += dy) {
      for (let x = row % 2 ? dx / 2 : 0; x < w + dx; x += dx) cells.push({ x, y, glow: 0 });
    }
  }
  function hexPath(x, y, s) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = Math.PI / 6 + (i * Math.PI) / 3;
      ctx[i ? "lineTo" : "moveTo"](x + Math.cos(a) * s, y + Math.sin(a) * s);
    }
    ctx.closePath();
  }
  function draw() {
    ctx.clearRect(0, 0, w, h);
    const r = canvas.getBoundingClientRect();
    const mx = mouse.x - r.left, my = mouse.y - r.top;
    if (Math.random() < 0.08) cells[(Math.random() * cells.length) | 0].glow = 1;
    for (const c of cells) {
      const d = Math.hypot(c.x - mx, c.y - my);
      if (d < 150) c.glow = Math.max(c.glow, 1 - d / 150);
      hexPath(c.x, c.y, S - 2);
      ctx.strokeStyle = `rgba(0,229,255,${0.06 + c.glow * 0.6})`;
      ctx.stroke();
      if (c.glow > 0.02) {
        ctx.fillStyle = `rgba(0,229,255,${c.glow * 0.18})`;
        ctx.fill();
        c.glow *= 0.94;
      }
    }
  }
  resize();
  addEventListener("resize", resize);
  animateWhenVisible(canvas, draw);
})();

/* =========================================================
   ФОН: микросхема с бегущими импульсами (skills)
   ========================================================= */
function buildCircuit() {
  const svg = $("#circuit");
  const sec = svg.parentElement;
  const W = sec.offsetWidth, H = sec.offsetHeight, S = 30;
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  svg.innerHTML = "";
  const NS = "http://www.w3.org/2000/svg";
  const colors = ["#00ff6a", "#00e5ff", "#ff3df2"];
  const count = Math.floor((W * H) / 22000);
  for (let i = 0; i < count; i++) {
    let x = Math.round(rand(0, W) / S) * S, y = Math.round(rand(0, H) / S) * S;
    const pts = [[x, y]];
    let horiz = Math.random() > 0.5;
    for (let k = 0, n = (rand(3, 7) | 0); k < n; k++) {
      const len = (rand(2, 7) | 0) * S * (Math.random() > 0.5 ? 1 : -1);
      if (horiz) x += len; else y += len;
      pts.push([x, y]);
      if (Math.random() > 0.4) { if (horiz) y += S * 0.6; else x += S * 0.6; pts.push([x, y]); }
      horiz = !horiz;
    }
    const d = "M" + pts.map((p) => p.join(" ")).join(" L");
    const trace = document.createElementNS(NS, "path");
    trace.setAttribute("d", d);
    trace.setAttribute("class", "trace");
    svg.appendChild(trace);
    for (const p of [pts[0], pts[pts.length - 1]]) {
      const c = document.createElementNS(NS, "circle");
      c.setAttribute("cx", p[0]); c.setAttribute("cy", p[1]); c.setAttribute("r", 4);
      c.setAttribute("class", "pad");
      svg.appendChild(c);
    }
    if (Math.random() > 0.35) {
      const pulse = document.createElementNS(NS, "path");
      pulse.setAttribute("d", d);
      pulse.setAttribute("class", "pulse");
      const color = colors[i % 3];
      pulse.style.stroke = color;
      pulse.style.color = color;
      svg.appendChild(pulse);
      const L = pulse.getTotalLength();
      pulse.style.strokeDasharray = `40 ${L}`;
      pulse.style.strokeDashoffset = L + 40;
      pulse.style.animationDuration = rand(2.5, 6) + "s";
      pulse.style.animationDelay = -rand(0, 6) + "s";
    }
  }
}

/* Звёзды (contact) */
$("#stars").innerHTML = Array.from({ length: 90 }, () =>
  `<i style="left:${rand(0, 100)}%;top:${rand(0, 100)}%;animation-delay:${-rand(0, 3)}s;opacity:${rand(0.3, 1)}"></i>`).join("");

/* =========================================================
   КУРСОР «захват цели»: скобы обхватывают кнопки
   ========================================================= */
if (finePointer && !reduceMotion) {
  document.body.classList.add("custom-cursor");
  const core = $("#cursor-core"), frame = $("#cursor-frame"), label = $("#cursor-label");
  const LOCKABLE = "a, button, [data-cursor], input";
  let target = null, lastTrail = { x: 0, y: 0 };
  const f = { x: innerWidth / 2, y: innerHeight / 2, w: 28, h: 28 };
  (function loop() {
    core.style.transform = `translate(${mouse.x}px, ${mouse.y}px)`;
    let tx, ty, tw, th;
    if (target && target.isConnected) {
      const r = target.getBoundingClientRect();
      tx = r.left - 6; ty = r.top - 6; tw = r.width + 12; th = r.height + 12;
    } else {
      const s = mouse.down ? 18 : 28;
      tx = mouse.x - s / 2; ty = mouse.y - s / 2; tw = s; th = s;
    }
    const k = target ? 0.22 : 0.3;
    f.x += (tx - f.x) * k; f.y += (ty - f.y) * k; f.w += (tw - f.w) * k; f.h += (th - f.h) * k;
    frame.style.transform = `translate(${f.x}px, ${f.y}px)`;
    frame.style.width = f.w + "px";
    frame.style.height = f.h + "px";
    requestAnimationFrame(loop);
  })();
  document.addEventListener("mouseover", (e) => {
    const el = e.target.closest(LOCKABLE);
    // слишком большие блоки не «захватываем» — иначе рамка на весь экран
    if (el && el.offsetWidth < innerWidth * 0.75 && el.offsetHeight < innerHeight * 0.8) {
      target = el;
      const href = el.getAttribute("href") || "";
      label.textContent = el.dataset.cursor || (href.includes("t.me/") ? "TELEGRAM" : el.tagName === "INPUT" ? "TYPE" : "CLICK");
      document.body.classList.add("cursor-locked");
    } else {
      target = null;
      document.body.classList.remove("cursor-locked");
    }
  });
  addEventListener("pointermove", (e) => {
    if (Math.hypot(e.clientX - lastTrail.x, e.clientY - lastTrail.y) < 26) return;
    lastTrail = { x: e.clientX, y: e.clientY };
    spawnBit(e.clientX + rand(-6, 6), e.clientY + rand(-6, 6));
  });
  addEventListener("pointerdown", (e) => {
    document.body.classList.add("cursor-down");
    const s = document.createElement("div");
    s.className = "shock";
    s.style.left = e.clientX + "px";
    s.style.top = e.clientY + "px";
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 600);
  });
  addEventListener("pointerup", () => document.body.classList.remove("cursor-down"));
}
function spawnBit(x, y, color) {
  const s = document.createElement("span");
  s.className = "trail";
  s.textContent = Math.random() > 0.5 ? "1" : "0";
  s.style.left = x + "px";
  s.style.top = y + "px";
  if (color) { s.style.color = color; s.style.textShadow = `0 0 6px ${color}`; }
  document.body.appendChild(s);
  setTimeout(() => s.remove(), 900);
}

/* =========================================================
   Переход в Telegram с анимацией «соединения»
   ========================================================= */
let warpTimer = null;
function warpTo(url, label) {
  const name = label || url.split("t.me/")[1] || url;
  if (reduceMotion) { location.href = url; return; }
  const warp = $("#warp"), fill = $("#warp-fill"), log = $("#warp-log");
  $("#warp-target").textContent = name;
  $("#warp-now").href = url;
  warp.hidden = false;
  log.textContent = "";
  fill.style.transition = "none";
  fill.style.width = "0";
  requestAnimationFrame(() => requestAnimationFrame(() => { fill.style.transition = "width 1.5s cubic-bezier(.6,0,.4,1)"; fill.style.width = "100%"; }));
  const lines = ["> resolving t.me ... OK", "> handshake with " + (label ? name : "@" + name) + " ... OK", "> encrypting channel [AES-256] ... OK", "> opening Telegram ↗"];
  lines.forEach((l, i) => setTimeout(() => { if (!warp.hidden) { log.textContent += l + "\n"; beep(700 + i * 200, 0.04); } }, 250 + i * 330));
  clearTimeout(warpTimer);
  warpTimer = setTimeout(() => { if (!warp.hidden) { location.href = url; setTimeout(closeWarp, 800); } }, 1700);
}
function closeWarp() { $("#warp").hidden = true; clearTimeout(warpTimer); }
document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href*="t.me/"]');
  if (!a || a.id === "warp-now" || e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
  e.preventDefault();
  warpTo(a.href, a.dataset.warp);
});
$("#warp").addEventListener("click", (e) => { if (e.target.id === "warp") closeWarp(); });
addEventListener("keydown", (e) => { if (e.key === "Escape") closeWarp(); });

/* =========================================================
   HUD, прогресс скролла, активный раздел
   ========================================================= */
const hudX = $("#hud-x"), hudY = $("#hud-y");
addEventListener("pointermove", () => {
  hudX.textContent = String(Math.max(0, mouse.x | 0)).padStart(4, "0");
  hudY.textContent = String(Math.max(0, mouse.y | 0)).padStart(4, "0");
});
const startTime = Date.now();
setInterval(() => {
  $("#hud-time").textContent = new Date().toTimeString().slice(0, 8);
  const up = Math.floor((Date.now() - startTime) / 1000);
  $("#uptime").textContent = [up / 3600, (up / 60) % 60, up % 60].map((v) => String(Math.floor(v)).padStart(2, "0")).join(":");
}, 1000);
$(".hud-br").lastChild.textContent = " · " + Intl.DateTimeFormat().resolvedOptions().timeZone;

addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  $("#progress").style.width = (scrollY / max) * 100 + "%";
  document.documentElement.style.setProperty("--matrix-opacity", scrollY > innerHeight * 0.7 ? 0.45 : 1);
}, { passive: true });

const sectorIO = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const n = e.target.dataset.sector;
    $("#hud-sector").textContent = "SECTOR " + n;
    $$(".nav-links a").forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
    if (CONFIG.sectorTips[n] && bootDone) say(CONFIG.sectorTips[n]);
  });
}, { threshold: 0.45 });
$$("[data-sector]").forEach((s) => sectorIO.observe(s));

/* =========================================================
   Эффекты текста
   ========================================================= */
function decrypt(el, finalText, duration = 1400) {
  const glyphs = "!<>-_\\/[]{}—=+*^?#@$%&01";
  const start = performance.now();
  const tok = (el._tok = (el._tok || 0) + 1);
  return new Promise((resolve) => {
    (function frame(now) {
      if (el._tok !== tok) return resolve(false);
      const p = Math.min((now - start) / duration, 1);
      const revealed = Math.floor(p * finalText.length);
      let out = "";
      for (let i = 0; i < finalText.length; i++) {
        out += i < revealed || finalText[i] === " " ? finalText[i] : glyphs[(Math.random() * glyphs.length) | 0];
      }
      el.textContent = out;
      if (p < 1) requestAnimationFrame(frame); else resolve(true);
    })(start);
  });
}
async function typeRoles() {
  const el = $("#typed");
  for (let i = 0; ; i++) {
    const word = CONFIG.roles[i % CONFIG.roles.length];
    for (let c = 1; c <= word.length; c++) { el.textContent = word.slice(0, c); await sleep(55); }
    await sleep(1700);
    for (let c = word.length; c >= 0; c--) { el.textContent = word.slice(0, c); await sleep(25); }
    await sleep(300);
  }
}
function glitchOnce(el, ms = 450) {
  el.classList.add("glitching");
  setTimeout(() => el.classList.remove("glitching"), ms);
}

/* =========================================================
   Заголовок: ERROR 404 → NALPAX | BIO при наведении
   ========================================================= */
const heroTitle = (() => {
  const title = $("#hero-title"), main = $("#ht-main"), side = $("#ht-side");
  const status = $("#hero-status"), hint = $("#hero-hint");
  let bio = false, leaveTimer;
  async function set(toBio) {
    if (toBio === bio) return;
    bio = toBio;
    clearTimeout(leaveTimer);
    title.classList.add("morphing");
    beep(toBio ? 900 : 200, 0.08);
    const mainText = toBio ? CONFIG.name : "ERROR";
    const sideText = toBio ? "| BIO" : "404";
    main.dataset.text = mainText;
    if (toBio) title.classList.remove("is-error"); else title.classList.add("is-error");
    title.classList.toggle("is-bio", toBio);
    status.textContent = toBio ? "● FILE RESTORED" : "● FILE CORRUPTED";
    status.classList.toggle("err", !toBio);
    hint.textContent = toBio ? "[ файл восстановлен ✔ bio.txt загружен ]" : finePointer ? "[ наведи курсор, чтобы восстановить файл ]" : "[ нажми, чтобы восстановить файл ]";
    hint.classList.toggle("ok", toBio);
    decrypt(side, sideText, 700);
    const done = await decrypt(main, mainText, toBio ? 900 : 500);
    if (done) { title.classList.remove("morphing"); glitchOnce(main, 300); }
  }
  title.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") set(true); });
  title.addEventListener("pointerleave", (e) => { if (e.pointerType === "mouse") leaveTimer = setTimeout(() => set(false), 700); });
  title.addEventListener("focus", () => set(true));
  title.addEventListener("blur", () => set(false));
  title.addEventListener("click", (e) => { if (e.pointerType !== "mouse") set(!bio); });
  status.classList.add("err");
  if (!finePointer) { hint.textContent = "[ нажми, чтобы восстановить файл ]"; CONFIG.tips[1] = "Нажми на ERROR 404 — файл восстановится"; }
  return { intro: () => decrypt(main, "ERROR", 1200).then(() => glitchOnce(main)) };
})();

/* =========================================================
   Вступление: загрузка системы
   ========================================================= */
const BOOT_LINES = [
  ["NALPAX-OS BIOS v6.6.6 — initializing...", "info"],
  ["[ OK ] loading kernel modules", "ok"],
  ["[ OK ] mounting /dev/creativity", "ok"],
  ["[ OK ] starting coffee.service", "ok"],
  ["[WARN] sleep.service not found", "warn"],
  ["[ OK ] connecting to GHOURS TEAM network", "ok"],
  ["[ OK ] tunneling via t.me/nalpax", "ok"],
  ["[FAIL] bio.txt — file corrupted (404)", "err"],
  ["[ OK ] decrypting portfolio.enc", "ok"],
];
let bootDone = false;
async function boot() {
  const log = $("#boot-log");
  document.body.classList.add("booting");
  const art = document.createElement("span");
  art.className = "ascii";
  log.appendChild(art);
  for (const line of ASCII_LOGO.split("\n")) {
    if (bootDone) return;
    art.textContent += line + "\n";
    beep(200, 0.02);
    await sleep(70);
  }
  for (const [text, cls] of BOOT_LINES) {
    if (bootDone) return;
    const line = document.createElement("span");
    line.className = cls;
    line.textContent = text + "\n";
    log.appendChild(line);
    beep(400 + Math.random() * 600);
    await sleep(rand(140, 300));
  }
  if (bootDone) return;
  const big = document.createElement("span");
  big.className = "big";
  log.appendChild(big);
  beep(1500, 0.2, 0.05);
  await decrypt(big, "ACCESS GRANTED", 700);
  await sleep(450);
  finishBoot();
}
function finishBoot() {
  if (bootDone) return;
  bootDone = true;
  const bootEl = $("#boot");
  bootEl.classList.add("out");
  setTimeout(() => bootEl.remove(), 750);
  document.body.classList.remove("booting");
  heroTitle.intro();
  typeRoles();
  setTimeout(() => say(CONFIG.tips[1]), 1800);
}
$("#boot-skip").addEventListener("click", finishBoot);
addEventListener("keydown", (e) => { if (!bootDone && (e.key === "Enter" || e.key === "Escape")) finishBoot(); });

/* =========================================================
   Контент из CONFIG
   ========================================================= */
function render() {
  $("#year").textContent = new Date().getFullYear();
  $("#footer-ascii").textContent = ASCII_LOGO;

  const mq = CONFIG.marquee.map((t) => `<span>${t}</span><span>✦</span>`).join("");
  $("#mq1").innerHTML = mq + mq;
  $("#mq2").innerHTML = mq + mq;

  $("#stats").innerHTML = CONFIG.stats.map((s) => `
    <div class="stat" data-cursor="DECODE"><b data-count="${s.n}" data-suffix="${s.suffix}">0</b><span>${s.label}</span><small class="stat-hint">${finePointer ? "▸ наведи — расшифрую" : "▸ нажми — расшифрую"}</small></div>`).join("");

  $("#skills-list").innerHTML = CONFIG.skills.map((s) => `
    <div class="skill">
      <div class="skill-top">
        <span class="skill-icon">${s.icon}</span>
        <span class="skill-name">${s.name}</span>
        <span class="skill-pct">${s.level}%</span>
      </div>
      <div class="skill-bar"><div class="skill-fill" data-level="${s.level}"></div></div>
      <small>// ${s.note}</small>
    </div>`).join("");

  // Пиксельный призрак GHOURS
  const GHOST = [
    "....XXXXXX....",
    "..XXXXXXXXXX..",
    ".XXXXXXXXXXXX.",
    ".XXoooXXoooXX.",
    "XXXoppXXoppXXX",
    "XXXoooXXoooXXX",
    "XXXXXXXXXXXXXX",
    "XXXXXXXXXXXXXX",
    "XXXXXXXXXXXXXX",
    "XX.XXX..XXX.XX",
    "X...XX..XX...X",
  ];
  const fill = { X: "#00e5ff", o: "#ffffff", p: "#0a0420" };
  $("#ghost").innerHTML = GHOST.map((row, y) => [...row].map((c, x) =>
    fill[c] ? `<rect x="${x}" y="${y}" width="1.02" height="1.02" fill="${fill[c]}"/>` : ""
  ).join("")).join("");

  renderPortfolio();
}

/* Портфолио с фильтрами */
function renderPortfolio() {
  const counts = { all: CONFIG.portfolio.length };
  CONFIG.portfolio.forEach((p) => (counts[p.cat] = (counts[p.cat] || 0) + 1));
  $("#filters").innerHTML = Object.entries(CONFIG.categories)
    .filter(([k]) => counts[k])
    .map(([k, v], i) => `<button type="button" role="tab" data-filter="${k}" class="${i ? "" : "active"}" aria-selected="${!i}">${v}<sup>${counts[k]}</sup></button>`)
    .join("");

  // Карточки-перевёртыши: спереди превью, сзади описание и ссылка
  $("#works").innerHTML = CONFIG.portfolio.map((p, i) => {
    const ext = p.link.startsWith("http");
    const lines = Array.from({ length: 4 }, (_, n) => `<i class="l" style="top:${45 + n * 9}%;width:${rand(20, 45) | 0}%"></i>`).join("");
    const id = `0x${(i + 1).toString(16).padStart(2, "0").toUpperCase()}`;
    const meta = `<div class="work-meta"><b>${CONFIG.categories[p.cat]}</b><span>${id} · ${p.year}</span></div>`;
    return `
    <div class="work loading" data-cat="${p.cat}" style="--hue:${p.hue}" tabindex="0" data-cursor="FLIP">
      <div class="work-inner">
        <div class="work-face work-front">
          <div class="work-preview">
            <div class="wp-bar"><i></i><i></i><i></i><span>${p.title.toLowerCase().replace(/\s+/g, "-")}</span></div>
            <div class="wp-art" style="--x:${rand(55, 85) | 0}%;--y:${rand(25, 70) | 0}%">
              <i class="h"></i>${lines}<i class="b"></i><span class="ico">${p.icon}</span>
            </div>
            ${p.soon ? '<span class="soon">IN PROGRESS</span>' : ""}
          </div>
          <div class="work-info">
            ${meta}
            <h3>${p.title}</h3>
            <p class="flip-hint">↻ наведи, чтобы перевернуть</p>
          </div>
          <div class="skel" aria-hidden="true">
            <span class="skel-ico">&lt;/&gt;</span>
            <i style="width:50%"></i><i class="dim" style="width:75%"></i><i style="width:60%"></i>
          </div>
        </div>
        <div class="work-face work-back">
          ${meta}
          <h3>${p.title}</h3>
          <p>${p.desc}</p>
          <div class="tags">${p.tags.map((t) => `<span>${t}</span>`).join("")}</div>
          <a class="btn work-btn" href="${p.link}" ${p.warp ? `data-warp="${p.warp}"` : ""} ${ext && !p.link.includes("t.me/") ? 'target="_blank" rel="noopener"' : ""} data-cursor="${ext ? "OPEN" : "GO"}">${p.soon ? "узнать первым ↗" : ext ? "открыть ↗" : "смотреть →"}</a>
        </div>
      </div>
    </div>`;
  }).join("");

  // на телефоне переворачиваем по тапу
  $("#works").addEventListener("click", (e) => {
    const card = e.target.closest(".work");
    if (!card || e.target.closest("a") || finePointer) return;
    card.classList.toggle("flipped");
  });
  // скелетон-загрузка при первом появлении раздела
  new IntersectionObserver(([e], obs) => {
    if (!e.isIntersecting) return;
    obs.disconnect();
    $$(".work").forEach((w, i) => setTimeout(() => w.classList.remove("loading"), 900 + i * 180));
  }, { threshold: 0.2 }).observe($("#works"));

  $("#filters").addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    $$("#filters button").forEach((b) => { b.classList.toggle("active", b === btn); b.setAttribute("aria-selected", b === btn); });
    const f = btn.dataset.filter;
    let n = 0;
    $$(".work").forEach((w) => {
      const show = f === "all" || w.dataset.cat === f;
      w.classList.toggle("hide", !show);
      w.classList.remove("appear");
      if (show) { void w.offsetWidth; w.style.animationDelay = n++ * 70 + "ms"; w.classList.add("appear"); }
    });
    beep(800, 0.04);
  });
}
render();

/* Появление блоков при скролле */
const revealIO = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add("visible");
    $$(".skill-fill", e.target).forEach((f) => (f.style.width = f.dataset.level + "%"));
    const h2 = $("h2.glitch", e.target);
    if (h2) glitchOnce(h2, 500);
    revealIO.unobserve(e.target);
  });
}, { threshold: 0.15 });
$$(".reveal, .skills-grid").forEach((s) => revealIO.observe(s));

function countUp(el) {
  const tok = (el._tok = (el._tok || 0) + 1);
  const target = +el.dataset.count, suffix = el.dataset.suffix;
  const fmt = new Intl.NumberFormat("ru-RU");
  let x = 0, v = 0, last = performance.now();
  (function tick(now) {
    // пружина: быстрый разгон и мягкий доезд без перелёта
    const dt = Math.min((now - last) / 1000, 0.25);
    last = now;
    const steps = Math.ceil(dt / 0.008);
    for (let k = 0; k < steps; k++) {
      const a = 170 * (target - x) - 26 * v;
      v += a * (dt / steps);
      x += v * (dt / steps);
    }
    if (el._tok !== tok) return;
    el.textContent = fmt.format(Math.round(x)) + suffix;
    if (Math.abs(target - x) > 0.5 || Math.abs(v) > 0.5) requestAnimationFrame(tick);
    else el.textContent = fmt.format(target) + suffix;
  })(last);
}

/* Счётчики: пока курсор не наведён — быстро мелькает двоичный код, при наведении расшифровываются */
$$(".stat").forEach((stat) => {
  const b = $("b", stat);
  const len = Math.max(4, (new Intl.NumberFormat("ru-RU").format(+b.dataset.count) + b.dataset.suffix).length);
  let open = false, timer;
  const binary = () => { if (!open) b.textContent = Array.from({ length: len }, () => (Math.random() > 0.5 ? 1 : 0)).join(""); };
  b.classList.add("bin");
  binary();
  setInterval(binary, 70);
  const show = () => { clearTimeout(timer); open = true; b.classList.remove("bin"); stat.classList.add("open"); countUp(b); beep(1000, 0.04); };
  const hide = () => { timer = setTimeout(() => { open = false; b._tok++; b.classList.add("bin"); stat.classList.remove("open"); }, 350); };
  stat.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") show(); });
  stat.addEventListener("pointerleave", (e) => { if (e.pointerType === "mouse") hide(); });
  stat.addEventListener("click", (e) => { if (e.pointerType !== "mouse") (open ? hide : show)(); });
});

/* Системный монитор: график CPU и hex-дамп */
(() => {
  const bars = $("#cpu-bars");
  bars.innerHTML = "<i></i>".repeat(28);
  const items = $$("i", bars);
  const hex = $("#hexdump");
  const lines = [];
  let addr = 0x7f00;
  setInterval(() => {
    items.forEach((b) => (b.style.height = rand(25, 100) + "%"));
    $("#cpu-val").textContent = (rand(88, 100) | 0) + "%";
    const bytes = Array.from({ length: 8 }, () => ((Math.random() * 256) | 0).toString(16).padStart(2, "0").toUpperCase());
    lines.push(`0x${(addr += 16).toString(16).toUpperCase()}  ${bytes.join(" ")}  ${Math.random() > 0.7 ? "NALPAX.." : "........"}`);
    if (lines.length > 5) lines.shift();
    hex.textContent = lines.join("\n");
  }, 600);
})();

/* 3D-наклон главной карточки + клик по призраку */
(() => {
  const card = $("[data-tilt]");
  card.addEventListener("pointermove", (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  });
  card.addEventListener("pointerleave", () => (card.style.transform = ""));
  $("#ghost").addEventListener("click", () => {
    const r = $("#ghost").getBoundingClientRect();
    for (let i = 0; i < 24; i++) spawnBit(r.left + rand(0, r.width), r.top + rand(0, r.height), "#00e5ff");
    say("Бу! 👻 Вступай в GHOURS TEAM");
    beep(900, 0.1);
  });
})();

/* =========================================================
   Рабочий терминал
   ========================================================= */
const out = $("#term-out");
const input = $("#term-in");
const history = [];
let hIndex = 0;
function print(text, cls = "") {
  const div = document.createElement("div");
  if (cls) div.className = cls;
  div.textContent = text;
  out.appendChild(div);
  out.scrollTop = out.scrollHeight;
}
function printLink(label, url) {
  const a = document.createElement("a");
  a.href = url;
  a.className = "tg-inline";
  a.textContent = label;
  const div = document.createElement("div");
  div.append("→ ", a);
  out.appendChild(div);
  out.scrollTop = out.scrollHeight;
}
const COMMANDS = {
  help: () => [
    "Доступные команды:",
    "  whoami      — кто я",
    "  neofetch    — инфа о системе",
    "  skills      — навыки",
    "  portfolio   — список работ",
    "  telegram    — перейти в мой Telegram",
    "  ghours      — перейти в GHOURS TEAM",
    "  manager     — менеджер @ceojobb",
    "  reviews     — отзывы",
    "  product     — софт для нарезки видео и баннеров",
    "  contact     — все контакты",
    "  dev         — режим разработчика",
    "  goto <раздел> — перейти (eye, about, skills, projects, product, portfolio, reviews, contact)",
    "  clear       — очистить экран",
    "  ...и несколько секретных 😉",
  ].join("\n"),
  whoami: () => `${CONFIG.name} — ${CONFIG.roles[0]}, основатель GHOURS TEAM`,
  neofetch: () => {
    print(ASCII_LOGO, "t-art");
    print([
      "guest@nalpax",
      "------------",
      "OS:      NalpaxOS x86_64",
      "Shell:   nsh 3.0",
      "Uptime:  " + $("#uptime").textContent,
      "Theme:   matrix-green [dark]",
      "CPU:     Brain @ 4.20GHz (overclocked by coffee)",
      "Memory:  ∞ ideas / 0 sleep",
    ].join("\n"));
    printLink("@nalpax", "https://t.me/nalpax");
    printLink("@ghoursteam", "https://t.me/ghoursteam");
    return null;
  },
  skills: () => CONFIG.skills.map((s) => `${s.name.padEnd(14)} ${"█".repeat(Math.round(s.level / 10))}${"░".repeat(10 - Math.round(s.level / 10))} ${s.level}%`).join("\n"),
  portfolio: () => CONFIG.portfolio.map((p, i) => `[${i + 1}] ${p.title} — ${CONFIG.categories[p.cat]}`).join("\n"),
  projects: () => COMMANDS.portfolio(),
  telegram: () => { warpTo("https://t.me/" + CONFIG.telegram); return "Соединяюсь с @" + CONFIG.telegram + " ..."; },
  ghours: () => { warpTo("https://t.me/" + CONFIG.team); return "Соединяюсь с @" + CONFIG.team + " 👻"; },
  contact: () => {
    printLink("@" + CONFIG.telegram + " — лично", "https://t.me/" + CONFIG.telegram);
    printLink("@" + CONFIG.manager + " — менеджер, по вопросам", "https://t.me/" + CONFIG.manager);
    printLink("@" + CONFIG.team + " — проект", "https://t.me/" + CONFIG.team);
    printLink("отзывы", CONFIG.reviews);
    return null;
  },
  manager: () => { warpTo("https://t.me/" + CONFIG.manager); return "Соединяюсь с менеджером @" + CONFIG.manager + " ..."; },
  reviews: () => { warpTo(CONFIG.reviews, "отзывы"); return "Открываю отзывы ★"; },
  product: () => { warpTo(CONFIG.product, "продукт"); return "Открываю софт для нарезки видео ✂"; },
  soft: () => COMMANDS.product(),
  dev: () => { toggleDev(); return "DEV MODE: " + (document.body.classList.contains("devmode") ? "on" : "off"); },
  ls: () => "about.md  skills.db  portfolio/  ghours/  secret.txt",
  "ls -a": () => ".  ..  .hidden  about.md  skills.db  portfolio/  ghours/  secret.txt",
  "cat secret.txt": () => "Подсказка: попробуй 'sudo hire nalpax' 😏",
  "cat .hidden": () => "Ты нашёл скрытый файл. Уважение +100. Попробуй 'matrix' или 'red pill'.",
  "cat bio.txt": () => ({ text: "ERROR 404: файл повреждён. Наведи курсор на заголовок сверху, чтобы восстановить.", cls: "t-err" }),
  date: () => new Date().toString(),
  clear: () => { out.innerHTML = ""; return null; },
  "sudo hire nalpax": () => { print("[sudo] пароль для guest: ********\nДоступ разрешён ✔ Отличное решение!"); printLink("написать @nalpax", "https://t.me/nalpax"); return null; },
  sudo: () => ({ text: "guest is not in the sudoers file. This incident will be reported 🚨", cls: "t-err" }),
  "hack nasa": async () => {
    for (const s of ["connecting to nasa.gov...", "bypassing proxy ▓▓▓▓▓▓░░░░", "downloading moon.zip ▓▓▓▓▓▓▓▓▓▓"]) {
      print(s, "t-dim"); beep(600); await sleep(500);
    }
    document.body.classList.add("shake");
    setTimeout(() => document.body.classList.remove("shake"), 500);
    return "Шучу. Я хороший хакер 😇";
  },
  matrix: () => {
    const colors = ["#00ff6a", "#00e5ff", "#ffd23f", "#ff3df2"];
    matrix.color = colors[(colors.indexOf(matrix.color) + 1) % colors.length];
    return "Цвет Матрицы изменён: " + matrix.color;
  },
  "red pill": () => { document.body.classList.add("red-pill"); matrix.color = "#ff2e63"; say("Добро пожаловать в реальность 💊"); return "Ты выбрал красную таблетку."; },
  "blue pill": () => { document.body.classList.remove("red-pill"); matrix.color = "#00ff6a"; return "Ты проснулся в своей кровати. Всё как прежде."; },
  blink: () => { eye.blink(); return "👁 моргнул"; },
  exit: () => "Отсюда не выйти. Ты уже в системе 😈",
};
async function run(raw) {
  const cmd = raw.trim().toLowerCase().replace(/\s+/g, " ");
  print("guest@nalpax:~$ " + raw, "t-cmd");
  if (!cmd) return;
  history.push(raw);
  hIndex = history.length;
  if (cmd.startsWith("goto ")) {
    const target = document.getElementById(cmd.slice(5));
    if (target && target.dataset.sector) { target.scrollIntoView(); print("→ " + cmd.slice(5)); }
    else print("goto: раздел не найден", "t-err");
    return;
  }
  const fn = COMMANDS[cmd];
  if (!fn) { print(`command not found: ${cmd}. Введи 'help'`, "t-err"); return; }
  const res = await fn();
  if (res == null) return;
  if (typeof res === "object") print(res.text, res.cls); else print(res);
}
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") { run(input.value); input.value = ""; }
  else if (e.key === "ArrowUp" && hIndex > 0) { input.value = history[--hIndex]; e.preventDefault(); }
  else if (e.key === "ArrowDown") { hIndex = Math.min(hIndex + 1, history.length); input.value = history[hIndex] || ""; }
  else if (e.key.length === 1) beep(300 + Math.random() * 200, 0.015, 0.02);
});
$("#term").addEventListener("click", (e) => { if (!e.target.closest("a")) input.focus(); });
print("Welcome to NalpaxOS v3.0 — введи 'help' или 'neofetch'", "t-dim");

/* =========================================================
   Персонаж Байт: следит глазами и подсказывает
   ========================================================= */
const bubble = $("#bubble");
let bubbleTimer, tipIndex = 0;
function say(text, ms = 4200) {
  bubble.textContent = text;
  bubble.classList.add("show");
  clearTimeout(bubbleTimer);
  bubbleTimer = setTimeout(() => bubble.classList.remove("show"), ms);
}
(() => {
  const mascot = $("#mascot"), eyes = $("#m-eyes");
  addEventListener("pointermove", () => {
    const r = mascot.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height * 0.47;
    const a = Math.atan2(mouse.y - cy, mouse.x - cx);
    const d = Math.min(1, Math.hypot(mouse.x - cx, mouse.y - cy) / 300);
    eyes.setAttribute("transform", `translate(${Math.cos(a) * 5 * d} ${Math.sin(a) * 4 * d})`);
  });
  mascot.addEventListener("click", () => {
    tipIndex = (tipIndex + 1) % CONFIG.tips.length;
    say(CONFIG.tips[tipIndex]);
    beep(1000, 0.05);
  });
  setInterval(() => {
    if (bubble.classList.contains("show") || !bootDone) return;
    tipIndex = (tipIndex + 1) % CONFIG.tips.length;
    say(CONFIG.tips[tipIndex]);
  }, 14000);
})();

/* =========================================================
   ОЖИВЛЕНИЕ
   ========================================================= */
// буквы заголовков разделов вылетают по одной
$$(".sec-head h2").forEach((h) => {
  h.innerHTML = [...h.textContent].map((c, i) => `<span class="ch" style="--i:${i}">${c}</span>`).join("");
});

// пункты меню перемешиваются при наведении
$$(".nav-links a").forEach((a) => {
  a.addEventListener("mouseenter", () => decrypt(a, a.dataset.label, 350));
});

// «магнитные» кнопки тянутся к курсору
if (finePointer && !reduceMotion) {
  $$(".btn, .nav-cta, .contact, .logo, .filters button").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * 0.18}px, ${y * 0.3}px)`;
    });
    el.addEventListener("pointerleave", () => (el.style.transform = ""));
  });
}

// подсветка карточек под курсором
document.addEventListener("pointermove", (e) => {
  const el = e.target.closest(".spot");
  if (!el) return;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", e.clientX - r.left + "px");
  el.style.setProperty("--my", e.clientY - r.top + "px");
});
$$(".window, .skill, .stat, .work-face, .eye-readout div").forEach((el) => el.classList.add("spot"));

// параллакс номеров разделов + бегущие строки ускоряются от скролла
(() => {
  const nums = $$(".sec-num");
  const tracks = $$(".marquee-track").flatMap((t) => t.getAnimations());
  let lastY = scrollY, speed = 1;
  (function frame() {
    const dy = scrollY - lastY;
    lastY = scrollY;
    speed += (1 + Math.min(Math.abs(dy) / 8, 6) - speed) * 0.1;
    tracks.forEach((a) => (a.playbackRate = speed));
    nums.forEach((n) => {
      const r = n.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      n.style.transform = `translateY(${Math.max(-24, Math.min(24, (r.top - innerHeight / 2) * -0.05))}px)`;
    });
    if (!reduceMotion) requestAnimationFrame(frame);
  })();
})();

/* =========================================================
   СОФТ: интерактивное демо видеоредактора
   ========================================================= */
(() => {
  const tl = $("#ed-timeline"), video = $("#ed-video"), banTrack = $("#ed-ban-track"), head = $("#ed-head");
  const scene = $("#ed-scene"), banner = $("#ed-banner"), flash = $("#ed-flash"), tc = $("#ed-tc"), info = $("#ed-info");
  const DURATION = 60, BANS = [[0.12, 0.38], [0.58, 0.86]];
  let p = 0, playing = true, hovering = false, bannerOn = true, cuts = [], nextAuto = 0, last = 0;

  $("#ed-ruler").innerHTML = Array.from({ length: 7 }, (_, i) => `<span style="left:${(i / 6) * 100}%">${i * 10}s</span>`).join("");
  $("#ed-audio").insertAdjacentHTML("beforeend", Array.from({ length: 90 }, (_, i) =>
    `<i style="height:${(20 + Math.abs(Math.sin(i * 0.7)) * 50 + rand(0, 30)) | 0}%"></i>`).join(""));
  banTrack.insertAdjacentHTML("beforeend", BANS.map(([a, b]) => `<span class="ban-clip" style="left:${a * 100}%;width:${(b - a) * 100}%"></span>`).join(""));

  const trackW = () => tl.clientWidth - 34 - 10;
  function renderClips() {
    $$(".clip", video).forEach((c) => c.remove());
    const edges = [0, ...cuts, 1];
    for (let i = 0; i < edges.length - 1; i++) {
      const c = document.createElement("span");
      c.className = "clip";
      c.style.cssText = `left:calc(${edges[i] * 100}% + 1px);width:calc(${(edges[i + 1] - edges[i]) * 100}% - 2px);--ch:${(330 + i * 47) % 360}`;
      video.appendChild(c);
    }
    info.textContent = `клипов: ${edges.length - 1} · баннер: ${bannerOn ? "on" : "off"}`;
  }
  function cut(at = p) {
    if (at < 0.02 || at > 0.98 || cuts.some((c) => Math.abs(c - at) < 0.03)) return;
    if (cuts.length >= 7) { cuts = []; $$(".cut-mark", tl).forEach((m) => m.remove()); }
    cuts.push(at);
    cuts.sort((a, b) => a - b);
    renderClips();
    const m = document.createElement("span");
    m.className = "cut-mark";
    m.style.left = 34 + at * trackW() + "px";
    m.dataset.at = at;
    tl.appendChild(m);
    scene.style.setProperty("--h", (rand(0, 360)) | 0);
    flash.classList.remove("go"); void flash.offsetWidth; flash.classList.add("go");
    beep(1400, 0.03);
  }
  function setBanner(on) {
    bannerOn = on;
    $$(".ban-clip", banTrack).forEach((b) => b.classList.toggle("off", !on));
    renderClips();
  }
  function draw(t) {
    const dt = Math.min((t - last) / 1000, 0.1) || 0;
    last = t;
    if (playing && !hovering) {
      p += dt / 14;
      if (p > 1) p = 0;
      if (t > nextAuto) { cut(p); nextAuto = t + rand(1800, 3200); }
    }
    head.style.transform = `translateX(${p * trackW()}px)`;
    const sec = p * DURATION;
    tc.textContent = ["00", String(Math.floor(sec / 60)).padStart(2, "0"), String(Math.floor(sec % 60)).padStart(2, "0"), String(Math.floor((sec % 1) * 60)).padStart(2, "0")].join(":");
    banner.classList.toggle("on", bannerOn && BANS.some(([a, b]) => p >= a && p <= b));
    scene.style.filter = playing || hovering ? "" : "grayscale(.7) brightness(.7)";
  }
  const posFrom = (e) => Math.min(1, Math.max(0, (e.clientX - tl.getBoundingClientRect().left - 34) / trackW()));
  tl.addEventListener("pointermove", (e) => { if (e.pointerType === "mouse") { hovering = true; p = posFrom(e); } });
  tl.addEventListener("pointerleave", () => (hovering = false));
  tl.addEventListener("click", (e) => { p = posFrom(e); cut(p); });
  $("#ed-cut").addEventListener("click", () => cut(p));
  $("#ed-ban").addEventListener("click", () => setBanner(!bannerOn));
  $("#ed-play").addEventListener("click", (e) => { playing = !playing; e.currentTarget.textContent = playing ? "❚❚" : "▶"; });
  addEventListener("resize", () => $$(".cut-mark", tl).forEach((m) => (m.style.left = 34 + +m.dataset.at * trackW() + "px")));
  renderClips();
  animateWhenVisible($("#editor"), draw);
})();

/* =========================================================
   ОТЗЫВЫ: живой чат-скелетон и всплывающие звёзды
   ========================================================= */
$("#bubbles").innerHTML = Array.from({ length: 22 }, () =>
  `<i style="left:${rand(0, 100)}%;font-size:${rand(14, 34) | 0}px;animation-duration:${rand(9, 20)}s;animation-delay:${-rand(0, 20)}s">${["★", "✦", "❝", "✉", "♥"][(Math.random() * 5) | 0]}</i>`).join("");
(() => {
  const body = $("#chat-body");
  let me = false, running = false;
  async function loop() {
    while (running) {
      const m = document.createElement("div");
      m.className = "msg" + (me ? " me" : "");
      const bars = Array.from({ length: (rand(1, 4) | 0) }, () => `<i style="width:${rand(45, 100) | 0}%"></i>`).join("");
      m.innerHTML = (me ? "" : '<span class="stars-row">★★★★★</span>') + bars;
      body.appendChild(m);
      while (body.children.length > 4) body.firstElementChild.remove();
      me = !me;
      await sleep(rand(1400, 2400));
    }
  }
  new IntersectionObserver(([e]) => {
    const was = running;
    running = e.isIntersecting && !reduceMotion;
    if (running && !was) loop();
  }).observe(body);
})();

/* =========================================================
   КОМАНДНАЯ ПАЛИТРА (Ctrl+K или /)
   ========================================================= */
const ACTIONS = [
  ...$$("[data-sector]").filter((s) => s.id).map((s) => ({ icon: "#", name: "Перейти: " + s.id, hint: "раздел", run: () => s.scrollIntoView() })),
  { icon: "✈", name: "Написать @nalpax", hint: "telegram", run: () => warpTo("https://t.me/" + CONFIG.telegram) },
  { icon: "✉", name: "Менеджер @ceojobb — по вопросам", hint: "telegram", run: () => warpTo("https://t.me/" + CONFIG.manager) },
  { icon: "★", name: "Отзывы", hint: "telegram", run: () => warpTo(CONFIG.reviews, "отзывы") },
  { icon: "✂", name: "Софт: нарезка видео и баннеры", hint: "продукт", run: () => warpTo(CONFIG.product, "продукт") },
  { icon: "👻", name: "GHOURS TEAM", hint: "telegram", run: () => warpTo("https://t.me/" + CONFIG.team) },
  { icon: "</>", name: "DEV MODE — показать разметку", hint: "toggle", run: () => toggleDev() },
  { icon: "♪", name: "Звук вкл/выкл", hint: "toggle", run: () => $("#sound-btn").click() },
  { icon: "▦", name: "Сменить цвет Матрицы", hint: "fx", run: () => COMMANDS.matrix() },
  { icon: "💊", name: "Red pill / Blue pill", hint: "fx", run: () => (document.body.classList.contains("red-pill") ? COMMANDS["blue pill"]() : COMMANDS["red pill"]()) },
  { icon: "👁", name: "Моргнуть глазом", hint: "fx", run: () => { $("#eye").scrollIntoView(); setTimeout(eye.blink, 600); } },
  { icon: ">_", name: "Открыть терминал", hint: "раздел", run: () => { $("#terminal").scrollIntoView(); setTimeout(() => $("#term-in").focus({ preventScroll: true }), 700); } },
];
(() => {
  const pal = $("#palette"), inp = $("#pal-in"), list = $("#pal-list");
  let items = [], sel = 0;
  const esc = (t) => t.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  function draw() {
    const q = inp.value.trim().toLowerCase();
    items = ACTIONS.filter((a) => !q || a.name.toLowerCase().includes(q) || a.hint.includes(q));
    sel = Math.min(sel, Math.max(items.length - 1, 0));
    list.innerHTML = items.length ? items.map((a, i) => {
      let name = esc(a.name);
      if (q) { const k = a.name.toLowerCase().indexOf(q); if (k >= 0) name = esc(a.name.slice(0, k)) + "<mark>" + esc(a.name.slice(k, k + q.length)) + "</mark>" + esc(a.name.slice(k + q.length)); }
      return `<li role="option" data-i="${i}" class="${i === sel ? "sel" : ""}" aria-selected="${i === sel}"><span class="pi">${esc(a.icon)}</span>${name}<small>${a.hint}</small></li>`;
    }).join("") : '<li class="empty">ничего не найдено — попробуй «отзывы» или «dev»</li>';
    list.querySelector(".sel")?.scrollIntoView({ block: "nearest" });
  }
  window.openPalette = () => { pal.hidden = false; inp.value = ""; sel = 0; draw(); inp.focus(); beep(900, 0.04); };
  const close = () => { pal.hidden = true; inp.blur(); };
  function exec(i) { const a = items[i]; if (!a) return; close(); a.run(); }
  inp.addEventListener("input", () => { sel = 0; draw(); });
  inp.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") { sel = (sel + 1) % Math.max(items.length, 1); draw(); e.preventDefault(); }
    else if (e.key === "ArrowUp") { sel = (sel - 1 + items.length) % Math.max(items.length, 1); draw(); e.preventDefault(); }
    else if (e.key === "Enter") exec(sel);
    else if (e.key === "Escape") close();
  });
  list.addEventListener("click", (e) => { const li = e.target.closest("li[data-i]"); if (li) exec(+li.dataset.i); });
  list.addEventListener("mousemove", (e) => { const li = e.target.closest("li[data-i]"); if (li && +li.dataset.i !== sel) { sel = +li.dataset.i; draw(); } });
  pal.addEventListener("click", (e) => { if (e.target === pal) close(); });
  $("#palette-btn").addEventListener("click", openPalette);
  addEventListener("keydown", (e) => {
    const typing = /INPUT|TEXTAREA/.test(document.activeElement?.tagName);
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k" || (e.key === "/" && !typing && pal.hidden)) {
      e.preventDefault();
      pal.hidden ? openPalette() : close();
    }
  });
})();

/* =========================================================
   DEV MODE: сайт глазами разработчика
   ========================================================= */
function toggleDev() {
  const on = document.body.classList.toggle("devmode");
  $("#dev-btn").setAttribute("aria-pressed", on);
  say(on ? "DEV MODE: наведи на любой блок — увидишь тег и размер" : "DEV MODE выключен");
  beep(on ? 1100 : 400, 0.06);
}
$("#dev-btn").addEventListener("click", toggleDev);
(() => {
  const tip = $("#dev-tip");
  let hovered = null, frames = 0, lastT = performance.now();
  document.addEventListener("mousemove", (e) => {
    if (!document.body.classList.contains("devmode")) return;
    const el = e.target.closest("main *");
    if (hovered && hovered !== el) hovered.classList.remove("dev-hover");
    hovered = el;
    if (!el) { tip.style.display = "none"; return; }
    el.classList.add("dev-hover");
    const r = el.getBoundingClientRect();
    const cls = [...el.classList].filter((c) => c !== "dev-hover" && c !== "spot").slice(0, 2).map((c) => "." + c).join("");
    tip.style.display = "block";
    tip.innerHTML = `<b>${el.tagName.toLowerCase()}</b>${el.id ? "#" + el.id : ""}<i>${cls}</i> · ${r.width | 0}×${r.height | 0}`;
    tip.style.left = Math.min(e.clientX + 16, innerWidth - tip.offsetWidth - 8) + "px";
    tip.style.top = e.clientY + 18 + "px";
  });
  (function fps(t) {
    frames++;
    if (t - lastT > 500) {
      if (document.body.classList.contains("devmode")) {
        $("#dev-fps").textContent = Math.round((frames * 1000) / (t - lastT));
        $("#dev-nodes").textContent = document.getElementsByTagName("*").length;
        $("#dev-vp").textContent = innerWidth + "×" + innerHeight;
      }
      frames = 0; lastT = t;
    }
    requestAnimationFrame(fps);
  })(lastT);
})();

/* =========================================================
   Пасхалки: Konami code, заголовок вкладки, консоль, фавиконка
   ========================================================= */
(() => {
  const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  let pos = 0;
  addEventListener("keydown", (e) => {
    pos = e.key.toLowerCase() === KONAMI[pos].toLowerCase() ? pos + 1 : e.key === KONAMI[0] ? 1 : 0;
    if (pos < KONAMI.length) return;
    pos = 0;
    document.body.classList.add("god");
    matrix.color = "#ffffff";
    say("GOD MODE активирован ⚡ ты знаешь Konami code!");
    for (let i = 0; i < 60; i++) setTimeout(() => spawnBit(rand(0, innerWidth), rand(0, innerHeight), ["#00ff6a", "#00e5ff", "#ff3df2", "#ffd23f"][i % 4]), i * 30);
    setTimeout(() => { document.body.classList.remove("god"); matrix.color = "#00ff6a"; }, 6000);
  });

  const title = document.title;
  document.addEventListener("visibilitychange", () => {
    document.title = document.hidden ? "ERROR 404: user not found 👀" : "ACCESS GRANTED ✔";
    if (!document.hidden) setTimeout(() => (document.title = title), 1500);
  });

  console.log("%c" + ASCII_LOGO, "color:#00ff6a;font-family:monospace;font-size:10px;text-shadow:0 0 6px #00ff6a");
  console.log("%cЛюбишь смотреть исходники? Уважаю.%c\nНужен такой сайт — пиши: https://t.me/nalpax · по вопросам: https://t.me/ceojobb",
    "color:#00e5ff;font-size:14px;font-weight:bold", "color:#c4ffd9");

  // фавиконка с мигающим курсором
  const c = document.createElement("canvas");
  c.width = c.height = 32;
  const x = c.getContext("2d");
  let on = true;
  function fav() {
    x.fillStyle = "#020604"; x.fillRect(0, 0, 32, 32);
    x.fillStyle = "#00ff6a"; x.font = "bold 22px monospace"; x.fillText("N", 3, 23);
    if (on) x.fillRect(19, 22, 10, 4);
    $("#favicon").href = c.toDataURL();
    on = !on;
  }
  fav();
  setInterval(fav, 600);
})();

/* ---------- Старт ---------- */
buildCircuit();
let rt;
addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(buildCircuit, 250); });
if (reduceMotion) finishBoot(); else boot();
