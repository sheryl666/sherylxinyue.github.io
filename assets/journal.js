/*
 * 期刊风页面脚本：读取 content/<role>.js，渲染 主页 / 每期详情 / 编者按
 * 一般不需要改这里，改文字请去 content/ 目录。
 */
(function () {
  "use strict";

  var params = new URLSearchParams(location.search);
  var role = (params.get("role") || "ai-pm").toLowerCase();
  if (!/^[a-z0-9-]+$/.test(role)) role = "ai-pm";
  var page = document.body.getAttribute("data-page");

  function store(k, v) {
    try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; }
  }
  // 默认英文（目标是海外公司），?lang= 或上次选择优先
  var lang = params.get("lang") || store("lang") || "en";
  if (lang !== "zh" && lang !== "en") lang = "en";

  var C, U;
  var app = document.getElementById("app");

  // ---------- 工具 ----------
  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function t(s) { return esc(s).replace(/(【待补[^】]*】|\[TBD[^\]]*\])/g, '<span class="tbd">$1</span>'); }
  function each(a, f) { return (a || []).map(f).join(""); }
  function link(p) {
    if (role === "ai-pm") return p;
    var hash = "", i = p.indexOf("#");
    if (i >= 0) { hash = p.slice(i); p = p.slice(0, i); }
    return p + (p.indexOf("?") >= 0 ? "&" : "?") + "role=" + role + hash;
  }
  function issueHref(is) { return link(is.link || "issue.html?id=" + is.id); }
  function brand() { return lang === "zh" ? "张馨月" : "Xinyue Zhang"; }

  // 封面三种：image = 整幅照片；plate = 纯色底 + 嵌入截图（像杂志配图）；type = 纯色 + 文字
  function cover(is) {
    var d = is[lang];
    var style = "--cc:" + is.coverColor + ";--spine:" + is.bg + ";--fg:" + is.bg;
    var num = '<div class="num">' + esc(is.no) + "</div>";
    var kk = '<div class="kk">' + t(d.kicker) + "</div>";
    var src = esc(is.cover.src || "");
    if (is.cover.type === "image") {
      var titled = is.cover.titled;
      return '<div class="cover img' + (titled ? " titled" : "") + '" style="' + style + '">' +
        '<img src="' + src + '" alt="" loading="lazy" style="object-position:' + esc(is.cover.position || "50% 50%") + '">' +
        (titled ? kk + '<div class="ttl">' + t(d.short || d.title) + "</div>" : "") + num + "</div>";
    }
    if (is.cover.type === "plate") {
      return '<div class="cover plate" style="' + style + '">' + kk +
        '<div class="pl"><img src="' + src + '" alt="" loading="lazy" style="object-position:' + esc(is.cover.position || "0% 0%") + '"></div>' +
        '<div class="ttl">' + t(d.short || d.title) + "</div>" + num + "</div>";
    }
    return '<div class="cover type" style="' + style + '">' + kk +
      '<div class="ttl">' + t(d.short || d.title) + "</div>" + num + "</div>";
  }

  // Marketing Studio 工具切换器的图标：用内联 SVG 保持清晰，不额外加载图片资源
  function toolIcon(name) {
    var paths = {
      video: '<path d="M4 8h16v11H4zM4 8l3-4h4l3 4M9 12l5 2.5L9 17z"/>',
      image: '<rect x="4" y="4" width="16" height="16" rx="2"/><circle cx="9" cy="9" r="1.5"/><path d="M5.5 17l4.5-4.5 3.2 3.2 2.1-2.1 3.2 3.4"/>',
      grid: '<rect x="4" y="4" width="6" height="16" rx="1"/><rect x="12.5" y="4" width="7.5" height="7" rx="1"/><rect x="12.5" y="13.5" width="7.5" height="6.5" rx="1"/>',
      link: '<path d="M9.5 8H8a4 4 0 000 8h3M14.5 8H16a4 4 0 010 8h-3M8.5 12h7"/>',
      bag: '<path d="M5 8h14l-1 12H6L5 8zM9 8V6a3 3 0 016 0v2M9 12h6"/>'
    };
    return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (paths[name] || paths.grid) + "</svg>";
  }

  // ---------- 导航 ----------
  function renderNav() {
    var n = U.nav;
    var other = lang === "zh" ? "EN" : "中";
    document.getElementById("nav").innerHTML =
      '<div class="left">' +
        '<button class="menu-btn" id="menuBtn" type="button">Menu</button>' +
        '<a class="lk' + (page === "home" ? " on" : "") + '" href="' + link("index.html") + '">' + t(n.issues) + "</a>" +
        '<a class="lk' + (page === "portfolio" ? " on" : "") + '" href="' + link("portfolio.html") + '">' + t(n.portfolio) + "</a>" +
        '<a class="lk' + (page === "note" ? " on" : "") + '" href="' + link("note.html") + '">' + t(n.note) + "</a>" +
        '<a class="lk" href="' + link("index.html#contact") + '" data-contact>' + t(n.contact) + "</a>" +
      "</div>" +
      '<a class="brand" href="' + link("index.html") + '">' + esc(brand()) + "</a>" +
      '<div class="right">' +
        '<a class="lk" href="' + link("index.html#contact") + '" data-contact>' + t(n.resume) + "</a>" +
        '<button type="button" id="langBtn" aria-label="Switch language">' + other + "</button>" +
      "</div>";
    document.getElementById("menu").innerHTML =
      '<button class="close" id="menuClose" type="button">(' + t(U.close) + ")</button>" +
      '<a href="' + link("index.html") + '">' + t(n.issues) + "</a>" +
      '<a href="' + link("portfolio.html") + '">' + t(n.portfolio) + "</a>" +
      '<a href="' + link("note.html") + '">' + t(n.note) + "</a>" +
      '<a href="' + link("index.html#contact") + '" data-contact>' + t(n.contact) + "</a>" +
      '<a href="' + link("index.html#contact") + '" data-contact>' + t(n.resume) + "</a>";

    document.getElementById("langBtn").onclick = function () {
      lang = lang === "zh" ? "en" : "zh";
      store("lang", lang);
      render(true);
    };
    var menu = document.getElementById("menu");
    document.getElementById("menuBtn").onclick = function () { menu.classList.add("open"); };
    document.getElementById("menuClose").onclick = function () { menu.classList.remove("open"); };
    // 主页内点「联系」直接滚到封底
    document.querySelectorAll("[data-contact]").forEach(function (a) {
      a.addEventListener("click", function (e) {
        var el = document.getElementById("contact");
        if (el) { e.preventDefault(); menu.classList.remove("open"); el.scrollIntoView({ behavior: "smooth" }); }
      });
    });
  }

  // ---------- 开场 ----------
  function intro() {
    if (page !== "home" || location.hash || store("seenIntro")) return;
    var el = document.createElement("div");
    el.className = "intro";
    el.innerHTML = "<span>" + t(U.intro[0]) + '</span><span class="c">' + t(U.intro[1]) + '</span><span class="r">' + t(U.intro[2]) + "</span>" +
      '<span class="skip">' + t(U.skip) + "</span>";
    document.body.appendChild(el);
    store("seenIntro", "1");
    var done = false;
    function out() { if (done) return; done = true; el.classList.add("out"); setTimeout(function () { el.remove(); }, 1000); }
    el.onclick = out;
    setTimeout(out, 1800);
  }

  function openResumePreview(src, preview, downloadName, title) {
    var isZh = lang === "zh";
    var enlargeLabel = isZh ? "放大浏览" : "Enlarge";
    var restoreLabel = isZh ? "退出放大" : "Restore";
    var downloadLabel = isZh ? "下载到本地" : "Download";
    var closeLabel = isZh ? "关闭" : "Close";
    var m = document.createElement("div");
    m.className = "resume-modal";
    m.setAttribute("role", "dialog");
    m.setAttribute("aria-modal", "true");
    m.setAttribute("aria-label", title);
    m.innerHTML = '<div class="resume-shell"><div class="resume-toolbar"><div class="resume-title">' + t(title) + '</div>' +
      '<div class="resume-actions"><button type="button" class="resume-enlarge">' + enlargeLabel + '</button>' +
      '<a class="resume-download" href="' + esc(src) + '" download="' + esc(downloadName) + '">' + downloadLabel + '</a>' +
      '<button type="button" class="resume-close">' + closeLabel + "</button></div></div>" +
      '<div class="resume-stage"><img class="resume-frame" src="' + esc(preview) + '" alt="' + esc(title) + '"></div></div>';

    function close() {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("resume-lock");
      m.remove();
    }
    function onKey(e) { if (e.key === "Escape") close(); }
    m.querySelector(".resume-close").onclick = close;
    m.querySelector(".resume-enlarge").onclick = function () {
      var expanded = m.classList.toggle("is-max");
      this.textContent = expanded ? restoreLabel : enlargeLabel;
    };
    m.onclick = function (e) { if (e.target === m) close(); };
    document.addEventListener("keydown", onKey);
    document.body.classList.add("resume-lock");
    document.body.appendChild(m);
    m.querySelector(".resume-close").focus();
  }

  // ---------- 主页 ----------
  var activeIdx = 0;
  function renderHome(keep) {
    var issues = C.issues;
    var html = each(issues, function (is, i) {
      var d = is[lang];
      return '<section class="issue" id="' + esc(is.id) + '" data-i="' + i + '">' +
        '<a class="cover-link" href="' + issueHref(is) + '">' + cover(is) + "</a>" +
        '<div class="caption"><div class="k">No.' + esc(is.no) + " · " + t(d.kicker) + '</div><div class="h">' + t(d.cardTitle || d.title) + "</div>" + // cardTitle：首页封面下方单独的标题（可选）
        '<a class="go" href="' + issueHref(is) + '">' + t(U.read) + " →</a></div></section>";
    });
    var c = C.contact[lang];
    html += '<section class="issue back" id="contact" data-back="1">' +
      '<div class="k">' + t(c.kicker) + "</div><h2>" + t(c.title) + '</h2>' + (c.sub ? '<p class="sub">' + t(c.sub) + "</p>" : "") +
      '<div class="contact-list">' + each(c.links, function (l) {
        var ext = /^https?:/.test(l.href || "") ? ' target="_blank" rel="noopener"' : "";
        // 有 qr 的（微信）：点击弹出二维码
        var v = l.qr ? '<button type="button" class="u qr-open" data-qr="' + esc(l.qr) + '">' + t(l.value) + "</button>"
          : l.resume ? '<button type="button" class="u resume-open" data-pdf="' + esc(l.href) + '" data-preview="' + esc(l.preview) + '" data-download="' + esc(l.download) + '" data-title="' + esc(l.label) + '">' + t(l.value) + "</button>"
          : l.href ? '<a class="u" href="' + esc(l.href) + '"' + ext + ">" + t(l.value) + "</a>" : t(l.value);
        return '<div><div class="lab">' + t(l.label) + '</div><div class="val">' + v + "</div></div>";
      }) + "</div>" +
      // 封底插画（蜡笔画，纸张底色和页面融在一起），放在右下角
      (C.contact.art ? '<img class="back-art" src="' + esc(C.contact.art) + '" alt="" loading="lazy" aria-hidden="true">' : "") +
      "</section>";
    app.innerHTML = html;

    // 微信二维码弹窗
    app.querySelectorAll(".qr-open").forEach(function (btn) {
      btn.onclick = function () {
        var m = document.createElement("div");
        m.className = "qr-modal";
        m.innerHTML = '<div class="box"><img src="' + btn.getAttribute("data-qr") + '" alt="WeChat QR code"><p>' + t(U.close) + "</p></div>";
        m.onclick = function () { m.remove(); };
        document.body.appendChild(m);
      };
    });
    app.querySelectorAll(".resume-open").forEach(function (btn) {
      btn.onclick = function () {
        openResumePreview(btn.getAttribute("data-pdf"), btn.getAttribute("data-preview"), btn.getAttribute("data-download"), btn.getAttribute("data-title"));
      };
    });

    // 底部大字 + 目录
    var foot = document.getElementById("footbar");
    foot.innerHTML = '<div class="big" id="fy"></div><button class="all u" id="allBtn" type="button">' + t(U.all) + " (" + issues.length + ")</button>" +
      '<div class="big r" id="fn"></div>';

    var years = [];
    issues.forEach(function (is) { if (years.indexOf(is.year) < 0) years.push(is.year); });
    var all = document.getElementById("allview");
    all.innerHTML = '<button class="close" id="allClose" type="button">(' + t(U.close) + ")</button>" +
      each(years, function (y) {
        return "<h3>" + esc(y) + '</h3><div class="row">' + each(issues.filter(function (is) { return is.year === y; }), function (is) {
          return '<a href="' + issueHref(is) + '">' + cover(is) + '<div class="t">No.' + esc(is.no) + " · " + t(is[lang].kicker) + "</div></a>";
        }) + "</div>";
      });
    document.getElementById("allBtn").onclick = function () { all.classList.add("open"); };
    document.getElementById("allClose").onclick = function () { all.classList.remove("open"); };

    // 当前期：背景色、年份、期号
    function setActive(sec) {
      if (sec.getAttribute("data-back")) {
        // 封底：温暖的浅砂色（原来是纯黑，太压抑），导航保持深色字
        document.body.classList.remove("dark");
        document.body.style.backgroundColor = "#F6EEE4";
        foot.style.opacity = "0";
        return;
      }
      foot.style.opacity = "1";
      document.body.classList.remove("dark");
      activeIdx = +sec.getAttribute("data-i");
      var is = issues[activeIdx];
      document.body.style.backgroundColor = is.bg;
      document.getElementById("fy").textContent = is.year;
      document.getElementById("fn").textContent = "No." + is.no;
    }
    var secs = app.querySelectorAll(".issue");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) setActive(e.target); });
      }, { threshold: 0.55 });
      secs.forEach(function (s) { io.observe(s); });
    }
    setActive(secs[0]);

    var target = keep ? secs[activeIdx] : (location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null);
    if (target) { target.scrollIntoView(); setActive(target); }
  }

  function issueShowcaseHTML(items, extraClass) {
    if (!items || !items.length) return "";
    // 每一项可以是图片路径，也可以是 { src, cap } / { type: "video", src, poster, label }
    var caps = items.map(function (it) { return it && it.cap ? t(it.cap) : ""; });
    var hasCap = caps.some(function (c) { return c; });
    var hasVideo = items.some(function (it) { return it && it.type === "video"; });
    // 产品截图：每张套一个简洁的网页窗口外框（三个圆点，不带网址），堆叠排列，当前这张居中清晰，两侧往后叠、虚化
    return '<div class="issue-showcase' + (hasVideo ? " has-video" : "") + (extraClass ? " " + extraClass : "") + '" data-issue-showcase role="region" tabindex="0" aria-label="' + (hasVideo ? "Product videos" : "Product screenshots") + '">' +
      '<div class="showcase-stage">' + each(items, function (it, i) {
        var src = it && it.src ? it.src : it;
        var video = !!(it && it.type === "video");
        var expandable = !!(video && it.expand);
        var bare = !!(it && it.bare); // bare 图片不套网页窗口外框；视频也不显示浏览器顶栏，但保留卡片阴影
        var label = it && it.label ? t(it.label) : (video ? "Product video " : "Product screenshot ") + (i + 1);
        var media = video
          ? '<video src="' + esc(src) + '" poster="' + esc(it.poster || "") + '" muted loop playsinline preload="' + (i === 0 ? "auto" : "metadata") + '" aria-label="' + esc(label) + '"></video>'
          : '<img src="' + esc(src) + '" alt="' + esc(label) + '" loading="' + (i < 3 ? "eager" : "lazy") + '" draggable="false">';
        var tag = video ? "div" : "button";
        var control = video ? ' role="button" tabindex="-1"' : ' type="button"';
        return '<' + tag + ' class="showcase-shot' + (video ? " is-video" : "") + (expandable ? " can-expand" : "") + (bare ? " is-bare" : "") + '"' + control + ' data-i="' + i + '" data-kind="' + (video ? "video" : "image") + '" data-expand="' + (expandable ? "true" : "false") + '" data-src="' + esc(src) + '" data-cap="' + esc(caps[i]) + '" aria-label="View ' + esc(label) + '">' +
          (bare || video ? "" : '<span class="showcase-bar"><i></i><i></i><i></i></span>') +
          media + '</' + tag + '>';
      }) + "</div>" +
      '<div class="showcase-dots">' + each(items, function (_, i) {
        return '<button type="button" class="showcase-dot" data-i="' + i + '" aria-label="Go to ' + (hasVideo ? "video " : "screenshot ") + (i + 1) + '"></button>';
      }) + "</div>" + (hasCap ? '<div class="showcase-cap"></div>' : "") + "</div>";
  }

  // 页面上可以有多个轮播（标题下一个，正文里也可以有），各自独立
  function bindIssueShowcase() {
    app.querySelectorAll("[data-issue-showcase]").forEach(bindOneShowcase);
  }
  function bindOneShowcase(root) {
    var capEl = root.querySelector(".showcase-cap");
    var stage = root.querySelector(".showcase-stage");
    var slides = Array.prototype.slice.call(root.querySelectorAll(".showcase-shot"));
    var dots = Array.prototype.slice.call(root.querySelectorAll(".showcase-dot"));
    var active = 0, pos = 0; // pos：可以是小数（拖动 / 触控板滑动时跟手）

    // 每张的位置只看它离当前这张差几格：0 居中清晰；±1、±2 往两侧叠到后面，缩小、变淡、虚化
    // 首尾相接：最后一张的右边接第一张，所以当前这张两侧永远都有叠着的
    var N = slides.length;
    function wrap(d) { d = ((d % N) + N) % N; return d > N / 2 ? d - N : d; }
    function stepPx() { return slides[0].offsetWidth * 0.36; }
    function paint() {
      var step = stepPx();
      var current = cur();
      slides.forEach(function (s, n) {
        var d = wrap(n - pos), a = Math.abs(d), dir = d < 0 ? -1 : 1;
        var x = a <= 1 ? d * step : dir * (step + (Math.min(a, 2.6) - 1) * step * 0.45);
        s.style.transform = a < 0.05 && s.classList.contains("is-video")
          ? "none"
          : "translateX(" + x.toFixed(1) + "px) scale(" + (1 - Math.min(a, 3) * 0.12).toFixed(3) + ")";
        s.style.filter = a < 0.05 ? "none" : "blur(" + Math.min(a * 2.6, 6).toFixed(1) + "px)";
        s.style.opacity = a > 2.6 ? 0 : (1 - Math.min(a, 2.6) * 0.22).toFixed(2);
        s.style.zIndex = 100 - Math.round(a * 10);
        s.style.pointerEvents = a > 2.6 ? "none" : "";
        s.classList.toggle("is-active", current === n);
        var video = s.querySelector("video");
        if (video) {
          if (current === n) {
            video.muted = true;
            var playing = video.play();
            if (playing && playing.catch) playing.catch(function () {});
          } else {
            video.pause();
          }
        }
      });
      dots.forEach(function (dot, n) { dot.classList.toggle("is-active", n === current); });
      if (capEl) capEl.textContent = slides[current].getAttribute("data-cap") || "";
    }
    function cur() { return ((Math.round(pos) % N) + N) % N; }
    function go(i) {
      active = ((i % N) + N) % N; pos = active;
      root.classList.remove("dragging"); paint();
    }

    // 左右滚动（触控板横向滑动 / Shift+滚轮）：累计够一格就切一张；竖向滚动不拦，页面照常往下滑
    var acc = 0, accT = 0;
    root.addEventListener("wheel", function (e) {
      var dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.shiftKey ? e.deltaY : 0;
      if (!dx) return;
      e.preventDefault();
      var now = Date.now(); if (now - accT > 220) acc = 0; accT = now;
      acc += dx;
      if (Math.abs(acc) > 55) { go(active + (acc > 0 ? 1 : -1)); acc = 0; accT = now + 260; } // 切完稍停，避免一次滑过好几张
    }, { passive: false });

    // 拖动 / 手指滑动：跟手移动，松开后吸附到最近的一张
    var drag = null, movedPx = 0;
    stage.addEventListener("pointerdown", function (e) {
      drag = { x: e.clientX, y: e.clientY, p: pos, id: e.pointerId, h: null }; movedPx = 0;
    });
    stage.addEventListener("pointermove", function (e) {
      if (!drag) return;
      var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (drag.h === null && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
        drag.h = Math.abs(dx) > Math.abs(dy);
        if (drag.h) { try { stage.setPointerCapture(drag.id); } catch (er) {} root.classList.add("dragging"); }
      }
      if (!drag.h) return;
      movedPx = Math.abs(dx);
      pos = drag.p - dx / (stepPx() * 1.3);
      paint();
    });
    function endDrag() { if (!drag) return; var was = drag.h; drag = null; if (was) go(cur()); }
    stage.addEventListener("pointerup", endDrag);
    stage.addEventListener("pointercancel", endDrag);

    // 点两侧的那张：把它转到中间；居中的截图可放大，视频则保持自动播放
    slides.forEach(function (slide, n) {
      slide.onclick = function () {
        if (movedPx > 6) { movedPx = 0; return; }
        if (n !== active) go(n);
        else if (slide.getAttribute("data-kind") !== "video") lightbox("image", slide.getAttribute("data-src"));
        else if (slide.getAttribute("data-expand") === "true") lightbox("video", slide.getAttribute("data-src"));
      };
    });
    dots.forEach(function (dot) { dot.onclick = function () { go(Number(dot.getAttribute("data-i"))); }; });
    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { go(active - 1); e.preventDefault(); }
      if (e.key === "ArrowRight") { go(active + 1); e.preventDefault(); }
    });
    window.addEventListener("resize", paint);
    root.classList.add("dragging"); paint(); // 第一次直接摆好，不播动画
    requestAnimationFrame(function () { requestAnimationFrame(function () { root.classList.remove("dragging"); }); });
  }

  // Marketing Studio 关键决策二：点击左侧工具按钮，右侧只显示对应截图
  function bindToolTabs() {
    app.querySelectorAll("[data-tool-tabs]").forEach(function (root) {
      var tabs = Array.prototype.slice.call(root.querySelectorAll(".tool-tab-btn"));
      var panels = Array.prototype.slice.call(root.querySelectorAll("[data-tool-panel]"));
      function show(i, focus) {
        if (i < 0) i = tabs.length - 1;
        if (i >= tabs.length) i = 0;
        tabs.forEach(function (tab, n) {
          var on = n === i;
          tab.classList.toggle("is-active", on);
          tab.setAttribute("aria-selected", on ? "true" : "false");
          tab.setAttribute("tabindex", on ? "0" : "-1");
        });
        panels.forEach(function (panel, n) {
          var on = n === i;
          panel.classList.toggle("is-active", on);
          panel.setAttribute("aria-hidden", on ? "false" : "true");
        });
        if (focus) tabs[i].focus();
      }
      tabs.forEach(function (tab, i) {
        tab.onclick = function () { show(i, false); };
        tab.onkeydown = function (e) {
          var next = null;
          if (e.key === "ArrowDown" || e.key === "ArrowRight") next = i + 1;
          else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = i - 1;
          else if (e.key === "Home") next = 0;
          else if (e.key === "End") next = tabs.length - 1;
          if (next !== null) { e.preventDefault(); show(next, true); }
        };
      });
      panels.forEach(function (panel) {
        var shot = panel.querySelector(".tool-tab-shot");
        shot.onclick = function () { lightbox("image", shot.getAttribute("data-src")); };
      });
      show(0, false);
    });
  }

  // ---------- 每期详情 ----------
  function renderIssue() {
    var issues = C.issues;
    var id = params.get("id");
    var idx = 0;
    issues.forEach(function (is, i) { if (is.id === id) idx = i; });
    var is = issues[idx];
    if (is.link) { location.replace(issueHref(is)); return; }
    var d = is[lang];
    document.title = d.title + " · " + brand();

    var no = parseInt(is.no, 10);
    var hideBand = no >= 2 && no <= 7;
    var html = (hideBand ? "" : '<section class="band" style="background:' + is.bg + '">' + cover(is) + "</section>") +
      '<article class="article' + (hideBand ? " no-band" : "") + '" style="--tint:' + is.bg + ";--cc:" + is.coverColor + '"><div class="head">' +
      '<div class="kicker">No.' + esc(is.no) + " · " + esc(is.year) + " · " + t(d.kicker) + "</div>" +
      "<h1>" + t(d.title) + "</h1>" + (d.lead ? '<p class="lead">' + t(d.lead) + "</p>" : "") + issueShowcaseHTML(is.showcase);
    if (d.meta) html += metaHTML(d.meta);
    html += "</div>";
    if (d.results) {
      html += '<div class="results">' + each(d.results, function (r) {
        return '<div><div class="n">' + t(r.num) + '</div><div class="t">' + t(r.label) + "</div></div>";
      }) + "</div>";
    }
    if (d.sections) {
      // 每段：没配图 / 配图放在正文下方（宽度和正文一致）/ side: true 时左右排版（交替左右）
      var sideN = 0, numN = 0;
      // 本期设了 numbered: true 时，每个大块标题前加主题色序号 01 02 03…
      // accent：本期单独指定一个更鲜明的强调色（用于序号、要点短横、小字说明），没写就用主题色推出来的 --ia
      html += '<div class="body' + (is.numbered ? " numbered" : "") + '"' + (is.accent ? ' style="--hl:' + esc(is.accent) + '"' : "") + ">" + each(d.sections, function (s, si) {
        // 只给大块编号（左右交替的块，以及带博客发布墙的块；背景、我的收获这类不编号），单独计数
        var sn = (s.side || s.blog) ? ++numN : 0;
        var no = is.numbered && sn ? '<span class="sec-no">' + (sn < 10 ? "0" : "") + sn + "</span>" : "";
        // note：标题下方的一行注释（小一号灰色斜体）
        var txt = "<h2>" + no + t(s.heading) + "</h2>" + (s.note ? '<p class="sec-note">' + t(s.note) + "</p>" : "") +
          each(s.body, function (p) { return "<p>" + t(p) + "</p>"; }) +
          (s.bullets ? "<ul>" + each(s.bullets, function (b) { return "<li>" + t(b) + "</li>"; }) + "</ul>" : "") +
          // points：带序号（01 02 03）的要点
          (s.points ? '<ol class="sec-points">' + each(s.points, function (p, i) {
            // 也可以写成 { k: "关键词", t: "说明" }：关键词加粗，后面接冒号
            var tx = p && p.k ? "<b>" + t(p.k) + "</b>" + (lang === "zh" ? "：" : ": ") + t(p.t) : t(p);
            return '<li><span class="pt-no">' + (i < 9 ? "0" : "") + (i + 1) + '</span><span class="pt-tx">' + tx + "</span></li>";
          }) + "</ol>" : "");
        // wide: true —— 横版产品截图完整显示（不裁切），点击看大图
        // flat: true —— 自己生成的示意图：不加阴影、限高，和页面底色融在一起
        // tall: true —— 接近方形的拼图，限高放宽一些（不然太小看不清）
        var fig = s.image ? '<figure' + (s.wide ? ' class="wide"' : s.flat ? ' class="flat' + (s.tall ? " tall" : "") + '"' : "") + '><img src="' + esc(s.image) + '" alt="" loading="lazy">' + (s.caption ? "<figcaption>" + t(s.caption) + "</figcaption>" : "") + "</figure>" : "";
        // devices: { laptop, phones: [] } —— 电脑端截图套笔记本边框、手机端套 iPhone 边框，排在同一行
        // blog: true —— 博客发布墙（发布日历 + 两行自动滚动的文章卡片），数据在 content/blog-posts.js，渲染完再填
        if (s.blog) fig = '<figure class="blogwall" data-blogwall></figure>';
        // carousel: [{ src, cap }] —— 正文里的左右滑动截图（和标题下的轮播同一种，稍小一号），下方显示当前这张的标注
        if (s.carousel) fig = '<figure class="sec-carousel">' + issueShowcaseHTML(s.carousel, "in-body") + "</figure>";
        // toolTabs: [{ label, tag, icon, src, cap }] —— 左侧纵向工具按钮，右侧切换对应网页截图
        if (s.toolTabs) {
          var toolId = "tool-tabs-" + si;
          fig = '<figure class="tool-tabs" data-tool-tabs><div class="tool-tab-list" role="tablist" aria-label="' + (lang === "zh" ? "工具页面" : "Tool pages") + '">' +
            each(s.toolTabs, function (it, i) {
              var panelId = toolId + "-panel-" + i;
              var tag = it.tag ? '<span class="tool-tab-tag is-' + esc(it.tag.toLowerCase()) + '">' + esc(it.tag) + "</span>" : "";
              return '<button type="button" class="tool-tab-btn' + (i === 0 ? " is-active" : "") + (it.tag ? " has-tag" : "") + '" role="tab" data-tool-index="' + i + '" aria-selected="' + (i === 0 ? "true" : "false") + '" aria-controls="' + panelId + '" tabindex="' + (i === 0 ? "0" : "-1") + '">' +
                '<span class="tool-tab-icon">' + toolIcon(it.icon) + '</span><span class="tool-tab-name">' + t(it.label) + "</span>" + tag + "</button>";
            }) + '</div><div class="tool-tab-panels">' +
            each(s.toolTabs, function (it, i) {
              var panelId = toolId + "-panel-" + i;
              return '<div class="tool-tab-panel' + (i === 0 ? " is-active" : "") + '" role="tabpanel" id="' + panelId + '" data-tool-panel aria-hidden="' + (i === 0 ? "false" : "true") + '">' +
                '<button type="button" class="tool-tab-shot" data-src="' + esc(it.src) + '" aria-label="' + esc((lang === "zh" ? "查看截图：" : "View screenshot: ") + it.label) + '">' +
                '<span class="tool-window-bar"><i></i><i></i><i></i></span><img src="' + esc(it.src) + '" alt="' + esc(it.label) + '" loading="' + (i === 0 ? "eager" : "lazy") + '"></button>' +
                (it.cap ? '<figcaption>' + t(it.cap) + "</figcaption>" : "") + "</div>";
            }) + "</div></figure>";
        }
        // pair: [{ src, cap }] —— 两张方形示意图并排（手机上上下排），每张下方小字标注
        if (s.pair) {
          fig = '<figure class="pair">' + each(s.pair, function (it) {
            return '<div class="pair-item"><img src="' + esc(it.src) + '" alt="" loading="lazy">' +
              (it.cap ? '<div class="dv-cap">' + t(it.cap) + "</div>" : "") + "</div>";
          }) + "</figure>";
        }
        // stack: [{ src, cap }] —— 局部特写，上下排列、和正文同宽，深色圆角卡片，每张下方小字标注
        if (s.stack) {
          fig = '<figure class="stack">' + each(s.stack, function (it) {
            return '<div class="stk-item"><img src="' + esc(it.src) + '" alt="" loading="lazy">' +
              (it.cap ? '<div class="dv-cap">' + t(it.cap) + "</div>" : "") + "</div>";
          }) + "</figure>";
        }
        // flow: [{ k, t, lines }] —— 流程示意图：一排步骤卡片，中间用箭头连接（手机上竖排）
        if (s.flow) {
          fig = '<figure class="flow"><div class="flow-row">' +
            s.flow.map(function (st) {
              return '<div class="flow-step"><div class="flow-k">' + t(st.k) + '</div><div class="flow-t">' + t(st.t) + "</div>" +
                each(st.lines, function (ln) { return '<div class="flow-l">' + t(ln) + "</div>"; }) + "</div>";
            }).join('<div class="flow-arrow" aria-hidden="true"></div>') + "</div>" +
            (s.caption ? "<figcaption>" + t(s.caption) + "</figcaption>" : "") + "</figure>";
        }
        // 也可以写成 devices: { items: [{ type: "phone" | "laptop", src, w, cap }] } —— 按顺序排，cap 是这台设备下方的小字标注
        if (s.devices) {
          var dv = s.devices;
          var items = dv.items || (dv.laptop ? [{ type: "laptop", src: dv.laptop }] : []).concat((dv.phones || []).map(function (p) { return { type: "phone", src: p }; }));
          // 列宽：几台设备一样高时的比例（笔记本 577 / 手机 150，可用 w 覆盖）
          var cols = items.map(function (it) { return "minmax(0, " + (it.w || (it.type === "laptop" ? 577 : 150)) + "fr)"; }).join(" ");
          // 只有一台设备时居中、限宽，不撑满整行
          var allLaptop = items.every(function (it) { return it.type === "laptop"; });
          fig = '<figure class="devices' + (items.length === 1 ? " single" : "") + (allLaptop ? " laptops" : "") + '"><div class="dv-row" style="grid-template-columns:' + cols + '">' +
            each(items, function (it, i) {
              // 电脑上设备在第 1 行（底部对齐）、标注在第 2 行，所以各自写上列号
              var col = ' style="grid-column:' + (i + 1) + '"';
              var frame = it.type === "laptop"
                ? '<div class="dv-laptop"' + col + '><div class="dv-scr"><img src="' + esc(it.src) + '" alt="" loading="lazy"></div><div class="dv-base"></div></div>'
                : '<div class="dv-phone"' + col + '><img src="' + esc(it.src) + '" alt="" loading="lazy"></div>';
              return '<div class="dv-item ' + (it.type === "laptop" ? "is-laptop" : "is-phone") + '">' + frame +
                (it.cap ? '<div class="dv-cap"' + col + ">" + t(it.cap) + "</div>" : "") + "</div>";
            }) + "</div>" +
            (s.caption ? "<figcaption>" + t(s.caption) + "</figcaption>" : "") + "</figure>";
        }
        // video: { src, poster } —— 左右排版里放一段视频：平时显示封面 + 播放按钮，点击后才开始加载和播放
        if (s.video) {
          fig = '<figure class="vid"><video src="' + esc(s.video.src) + '" poster="' + esc(s.video.poster) + '" preload="none" playsinline></video>' +
            '<button type="button" class="vid-play" aria-label="Play video"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg></button></figure>';
        }
        // visual: { stat } —— 还没有截图时，左右排版的另一侧放一块主题色大字卡片（等截图到了换成 image）
        if (!s.image && s.visual) {
          fig = '<figure class="vis"><div class="vis-card"><span class="vis-stat">' + t(s.visual.stat) + "</span></div></figure>";
        }
        if ((s.image || s.visual || s.video || s.carousel) && s.side) {
          return '<div class="split' + (sideN++ % 2 ? " rev" : "") + '"><div class="txt">' + txt + "</div>" + fig + "</div>";
        }
        return '<div class="sec">' + txt + fig + "</div>";
      }) + "</div>";
    }
    function cardsHTML(cards) {
      return '<div class="cards">' + each(cards, function (c, i) {
        // 有图放图；有关键数字放大数字；都没有就放斜体大字标题
        var ph = c.image ? '<img src="' + esc(c.image) + '" alt="" loading="lazy">'
          : c.blank ? ""
          : c.stat ? '<span class="stat' + (String(c.stat).length > 6 ? " long" : "") + '">' + t(c.stat) + "</span>"
          : '<span class="quote">' + t(c.title) + "</span>";
        var kind = c.image ? "pic" : c.blank ? "blank" : c.stat ? "num" : "txt";
        // points：每条详情单独一行；否则用一段 text
        var body = c.points ? '<ul class="pts">' + each(c.points, function (x) { return "<li>" + t(x) + "</li>"; }) + "</ul>" : "<p>" + t(c.text) + "</p>";
        return '<div class="card ' + kind + '" style="--d:' + i + '"><div class="ph">' + ph + '</div><div class="lab">' + esc(c.label) + "</div>" +
          "<h3>" + t(c.title) + "</h3>" + body + "</div>";
      }) + "</div>";
    }
    function metaHTML(m) {
      return '<div class="meta">' +
        '<div><div class="lab">' + t(U.role) + "</div>" + t(m.role) + "</div>" +
        '<div><div class="lab">' + t(U.time) + "</div>" + t(m.time) + "</div>" +
        '<div><div class="lab">' + t(U.platform) + "</div>" + t(m.platform) + "</div></div>";
    }
    // 小票：技能点做成一排胶囊按钮（带小色点）；悬停 / 点击某个，上方「打印机出纸口」打印出这张小票（等宽字、虚线、条形码、锯齿撕边）
    // 小票内容存在按钮的 data-* 里，切换时重写纸面并重新播放打印动画
    function receiptHTML(pt) {
      return '<div class="rcpt" data-rcpt data-head="' + esc(t(pt.receipt)) + '" data-time="' + esc(pt.meta ? t(pt.meta.time) : "") + '">' +
        // 先列技能点，下方是打印机出纸口，小票从这里往下打印出来
        '<div class="rc-chips">' + each(pt.cards, function (c, i) {
          return '<button type="button" class="rc-chip" data-no="' + esc(c.label) + '" data-title="' + esc(t(c.title)) + '" data-stat="' + esc(c.stat ? t(c.stat) : "") +
            '" data-text="' + esc(t(c.text)) + '" style="--dot:var(--rc' + (i % 4) + ')"><span class="rc-dot"></span><span class="rc-lab">' + t(c.btn || c.title) + "</span></button>"; // btn：按钮上的短标题（没写就用 title）；小票上用 title
        }) + "</div>" +
        '<div class="rc-stage"><div class="rc-slot"></div><div class="rc-clip"><div class="rc-paper"></div></div></div></div>';
    }
    if (d.cards) html += cardsHTML(d.cards);
    // 一期里有多个部分（如美团 + 哈啰）：往下滑依次展示
    if (d.parts) {
      html += each(d.parts, function (pt) {
        // brand：部分顶部一行 —— 左边序号 + 岗位方向，右边公司 logo（透明底，靠右）；有它时代替原来的小字 kicker
        var brand = pt.brand ? '<div class="part-brand"' + (is.accent ? ' style="--pbc:' + esc(is.accent) + '"' : "") + '><div class="pb-l"><span class="pb-no">' + esc(pt.brand.no) + '</span><span class="pb-lab">' + t(pt.brand.label) + "</span></div>" +
          '<div class="pb-logos">' + each(pt.brand.logos, function (src) { return '<img src="' + esc(src) + '" alt="">'; }) + "</div></div>" : "";
        return '<section class="part">' + brand + '<div class="part-head">' +
          (pt.brand ? "" : '<div class="kicker">' + t(pt.kicker) + "</div>") + "<h2>" + t(pt.title) + '</h2><p class="lead">' + t(pt.lead) + "</p>" +
          // hideMeta：不显示角色 / 时间 / 平台这一行（数据保留，小票上的时间仍从这里取）
          (pt.meta && !pt.hideMeta ? metaHTML(pt.meta) : "") + "</div>" + (pt.receipt ? receiptHTML(pt) : cardsHTML(pt.cards)) + "</section>";
      });
    }
    var prev = issues[(idx - 1 + issues.length) % issues.length];
    var next = issues[(idx + 1) % issues.length];
    html += issuePager(idx) + "</article>" + footer();
    app.innerHTML = backBtn(link("index.html#" + is.id), is.bg) + html;
    themePage(is.bg);
    placeBack(PF_TAB);
    bindIssueShowcase();
    bindToolTabs();
    // 博客发布墙：按需加载 content/blog-posts.js，画「发布日历」和两行反向滚动的文章卡片（网站已关，不做链接）
    var wall = app.querySelector("[data-blogwall]");
    if (wall) {
      var buildWall = function () {
        var posts = window.BLOG_POSTS || []; if (!posts.length) return;
        var LN = { en: "EN", es: "ES", pt: "PT", ja: "日本語", ko: "한국어", ar: "العربية", "zh-hant": "繁體", "zh-hans": "简体" };
        // 日历：从第一篇到最后一篇，每天一格，数字是当天发布的篇数
        var cnt = {}; posts.forEach(function (p) { cnt[p.d] = (cnt[p.d] || 0) + 1; });
        var d0 = new Date(2026, +posts[0].d.slice(0, 2) - 1, +posts[0].d.slice(3)), d1 = new Date(2026, +posts[posts.length - 1].d.slice(0, 2) - 1, +posts[posts.length - 1].d.slice(3));
        var days = [], mx = 0;
        for (var dt = new Date(d0); dt <= d1; dt.setDate(dt.getDate() + 1)) {
          var key = ("0" + (dt.getMonth() + 1)).slice(-2) + "-" + ("0" + dt.getDate()).slice(-2), c = cnt[key] || 0;
          days.push({ m: dt.getMonth() + 1, d: dt.getDate(), c: c }); if (c > mx) mx = c;
        }
        var cal = '<div class="bw-cal">' + days.map(function (x) {
          return '<div class="bw-day' + (x.c ? "" : " is-empty") + '" style="--a:' + (x.c ? (0.25 + 0.75 * x.c / mx).toFixed(2) : 0) + '"><span class="bw-n">' + (x.c || "") + '</span><span class="bw-d">' + x.m + "/" + x.d + "</span></div>";
        }).join("") + "</div>";
        var card = function (p, i) {
          var loc = i % 2 === 1; // 一张英文、一张本地化语言，交替出现
          return '<div class="bw-card"><img src="' + esc(p.img.replace(/\/b(\d)/, "/t$1")) + '" alt="" loading="lazy"><div class="bw-t" dir="auto">' + esc(loc ? p.loc : p.en) +
            '</div><div class="bw-m"><span class="bw-lang">' + (loc ? LN[p.lc] : "EN") + "</span><span>" + p.d.replace("-", "/") + "</span></div></div>";
        };
        var half = Math.ceil(posts.length / 2);
        var row = function (list, off, rev) {
          var inner = list.map(function (p, i) { return card(p, i + off); }).join("");
          return '<div class="bw-row' + (rev ? " rev" : "") + '"><div class="bw-track">' + inner + inner + "</div></div>"; // 内容放两遍，首尾相接循环滚动
        };
        // 发布日历（cal）按意见不显示了，只留两行滚动的文章卡片
        wall.innerHTML = row(posts.slice(0, half), 0, false) + row(posts.slice(half), 1, true);
      };
      if (window.BLOG_POSTS) buildWall();
      else { var bs = document.createElement("script"); bs.src = "content/blog-posts.js?v=1"; bs.onload = buildWall; document.head.appendChild(bs); }
    }
    // 小票：悬停或点击胶囊按钮 → 重写纸面、重新播放「打印」动画；默认先打印第一张
    app.querySelectorAll("[data-rcpt]").forEach(function (box) {
      var paper = box.querySelector(".rc-paper"), chips = box.querySelectorAll(".rc-chip"), cur = null;
      function show(btn) {
        if (btn === cur) return; cur = btn;
        chips.forEach(function (c) { c.classList.toggle("is-on", c === btn); });
        var ds = btn.dataset;
        paper.innerHTML = '<div class="rc-head">' + esc(box.dataset.head) + "</div>" +
          '<div class="rc-meta"><span>NO. ' + esc(ds.no) + "</span><span>" + esc(box.dataset.time) + "</span></div>" +
          '<div class="rc-dash"></div><div class="rc-title">' + esc(ds.title) + '</div><p class="rc-text">' + esc(ds.text) + "</p>" +
          '<div class="rc-dash"></div>' + // 小票不再显示 RESULT 行
          '<div class="rc-bar"></div><div class="rc-thanks">THANK YOU!</div>';
        paper.classList.remove("printing"); void paper.offsetWidth; paper.classList.add("printing");
      }
      chips.forEach(function (c) {
        // 磁吸：鼠标在按钮附近移动时，圆形按钮被轻轻「吸」向鼠标；移开后弹回
        var orb = c.querySelector(".rc-dot");
        c.addEventListener("mousemove", function (e) {
          var r = orb.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
          orb.style.transform = "translate(" + (dx * 0.22).toFixed(1) + "px," + (dy * 0.22).toFixed(1) + "px)";
        });
        c.addEventListener("mouseleave", function () { orb.style.transform = ""; });
        c.addEventListener("mouseenter", function () { show(c); });
        c.addEventListener("focus", function () { show(c); });
        c.addEventListener("click", function () { show(c); });
      });
      if (chips[0]) show(chips[0]);
    });
    // 正文里的视频：点播放按钮后显示控制条并开始播放
    app.querySelectorAll(".body figure.vid").forEach(function (fg) {
      var v = fg.querySelector("video"), b = fg.querySelector(".vid-play");
      b.onclick = function () { fg.classList.add("playing"); v.controls = true; v.play(); };
    });
    // 横版产品截图：点击看完整大图
    app.querySelectorAll(".body figure.wide img, .body figure.devices img, .body figure.stack img, .body figure.pair img, .body figure.flat img").forEach(function (img) {
      img.onclick = function () { lightbox("image", img.getAttribute("src")); };
    });
    window.scrollTo(0, 0);
  }

  // 每章底部的「上一期 · 全部期刊 · 下一期」（No.01 编者按也用同一个）
  function issuePager(idx) {
    var issues = C.issues, is = issues[idx];
    var prev = issues[(idx - 1 + issues.length) % issues.length];
    var next = issues[(idx + 1) % issues.length];
    return '<nav class="pager">' +
      '<a href="' + issueHref(prev) + '"><small>' + t(U.prev) + "</small>No." + esc(prev.no) + " " + t(prev[lang].kicker) + "</a>" +
      '<a class="u" href="' + link("index.html#" + is.id) + '">' + t(U.back) + "</a>" +
      '<a class="r" href="' + issueHref(next) + '"><small>' + t(U.next) + "</small>No." + esc(next.no) + " " + t(next[lang].kicker) + "</a>" +
      "</nav>";
  }
  // 左上角「← Back」：颜色用这一章的主题底色（bg）调深一半，和导航里对应的那一项左对齐
  function backBtn(href, bg) {
    return '<a class="pf-back page-back" href="' + href + '" style="--pc:color-mix(in srgb, ' + esc(bg || "#888") + ' 50%, #000)">' +
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg><span>Back</span></a>';
  }
  // 详情页配色跟封面主题色走：底色 = 封面底色淡化，强调色（小标题、标签、分隔线）= 封面底色调深一半
  function themePage(bg) {
    document.body.classList.add("themed");
    document.body.style.setProperty("--ib", bg);
  }
  // 所有详情页（章节、编者按、作品集）的 Back 都和导航里的「作品集」左对齐，高度统一由 CSS 定（电脑 80px / 手机 64px）
  var PF_TAB = '.nav .left a.lk[href*="portfolio.html"]';
  function placeBack(navSel) {
    function go() {
      var b = app.querySelector(".page-back"), a = document.querySelector(navSel);
      if (!b) return;
      var r = a && a.offsetParent ? a.getBoundingClientRect() : null;
      b.style.left = r && r.width ? r.left + "px" : "";
    }
    go();
    if (!window.__placeBackBound) { window.__placeBackBound = true; window.addEventListener("resize", function () { if (window.__placeBackSel) placeBack(window.__placeBackSel); }); }
    window.__placeBackSel = navSel;
  }

  // ---------- 编者按 ----------
  function renderNote() {
    var n = C.note[lang];
    document.title = n.kicker + " · " + brand();
    var noteIdx = 0;
    C.issues.forEach(function (is, i) { if (is.link === "note.html") noteIdx = i; });
    var noteIssue = C.issues[noteIdx];
    app.innerHTML = backBtn(link("index.html#" + noteIssue.id), noteIssue.bg) +
      // 信件：电脑上照片在左、文字在右，一屏看完；手机上照片在上
      '<div class="letter"><img class="portrait" src="assets/img/photo.jpg" alt="' + esc(brand()) + '">' +
      '<div class="letter-body"><div class="kicker">' + t(n.kicker) + "</div>" +
      "<h1>" + t(n.title) + "</h1>" + each(n.letter, function (p) { return "<p>" + t(p) + "</p>"; }) +
      '<p class="sign">' + t(n.sign) + "</p></div></div>" +
      '<section class="sect"><h2>' + t(n.beliefsTitle) + '</h2><div class="beliefs">' + each(n.beliefs, function (b, i) {
        return '<div><div class="i">0' + (i + 1) + "</div><h3>" + t(b.title) + "</h3><p>" + t(b.text) + "</p></div>";
      }) + "</div></section>" +
      '<section class="sect skills"><h2>' + t(n.skillsTitle) + "</h2>" + each(n.skills, function (s) {
        return '<div class="row"><b>' + t(s.name) + "</b><span>" + t(s.items) + "</span></div>";
      }) + "</section>" +
      '<section class="sect"><h2>' + t(n.beyondTitle) + '</h2><div class="beyond">' + each(n.beyond, function (b) {
        return '<div><div class="n">' + t(b.num) + "</div><p>" + t(b.text) + "</p></div>";
      }) + "</div>" +
      // 数据下面的三张照片（按时间从左到右）
      (n.beyondPhotos ? '<div class="beyond-photos">' + each(n.beyondPhotos, function (p) {
        return '<figure><img src="' + esc(p.src) + '" alt="' + esc(p.cap) + '" loading="lazy"><figcaption>' + t(p.cap) + "</figcaption></figure>";
      }) + "</div>" : "") + "</section>" +
      // 校园经历：In SJTU / In TGU
      each(n.campus, function (c) {
        // 有照片的：左边照片，右边先列核心头衔，再分行列详细信息
        if (c.roles) {
          // accent：学校主色（交大红）；logo：校徽，放在标题左边
          // flip：照片在右时，标题也放右边（在照片正上方），校徽换到左边
          return '<section class="sect campus rich' + (c.photo && c.photoSide === "right" ? " flip" : "") + '"' + (c.accent ? ' style="--accent:' + esc(c.accent) + '"' : "") + "><h2>" +
            (c.logo ? '<img class="campus-logo" src="' + esc(c.logo) + '" alt="">' : "") + "<span>" + t(c.title) + '</span></h2><p class="campus-sub">' + t(c.sub) + "</p>" +
            // 照片可选；photoSide: "right" 放右边（和上一块左右交替）
            '<div class="campus-grid' + (c.photo ? (c.photoSide === "right" ? " photo-right" : "") : " no-photo") + '">' +
            // aside: true 的详情（如关键数字）放在照片下面，省出右栏高度
            (c.photo ? '<div class="campus-side"><figure class="campus-photo"><img src="' + esc(c.photo) + '" alt="" loading="lazy"></figure>' +
              each(c.details.filter(function (d) { return d.aside; }), detailHTML) + "</div>" : "") +
            // 头衔里的 \n 是固定换行位置（英文两行），手机上自动并回一行
            '<div class="campus-main"><ul class="campus-roles">' + each(c.roles, function (r) { return "<li>" + t(r).replace(/\n/g, " <br>") + "</li>"; }) + "</ul>" +
            '<div class="campus-details">' + each(c.details.filter(function (d) { return !(d.aside && c.photo); }), detailHTML) + "</div></div></div></section>";
          function detailHTML(d) {
              var body = (d.text ? "<p>" + t(d.text) + "</p>" : "") +
                (d.stats ? '<div class="stats">' + each(d.stats, function (x) {
                  return '<div><div class="n">' + t(x.n) + '</div><div class="l">' + t(x.l) + "</div></div>";
                }) + "</div>" : "") +
                (d.tags ? '<ul class="tags">' + each(d.tags, function (x) { return "<li>" + t(x) + "</li>"; }) + "</ul>" : "") +
                (d.list ? '<ul class="lst' + (d.dated ? " dated" : "") + (d.cols === 2 ? " cols2" : "") + '">' + each(d.list, function (x) {
                  // y：时间靠右；href：标题可点击（新窗口打开）
                  var name = x.href ? '<a class="u" href="' + esc(x.href) + '" target="_blank" rel="noopener">' + t(x.t) + " ↗</a>" : t(x.t);
                  if (x.y) return '<li class="has-y"><div class="hd"><b>' + name + '</b><span class="y">' + t(x.y) + "</span></div>" + (x.m ? '<span class="desc">' + t(x.m) + "</span>" : "") + "</li>";
                  return "<li><b>" + name + "</b>" + (x.m ? "<span>" + t(x.m) + "</span>" : "") + "</li>";
                }) + "</ul>" : "");
              return '<div class="row' + (d.half ? " half" : "") + '"><div class="lab">' + t(d.label) + '</div><div class="val">' + body + "</div></div>";
          }
        }
        return '<section class="sect campus"><h2>' + t(c.title) + '</h2><p class="campus-sub">' + t(c.sub) + "</p>" +
          '<div class="campus-items">' + each(c.items, function (it) {
            return "<div><h3>" + t(it.title) + "</h3><p>" + t(it.text) + "</p></div>";
          }) + "</div>" +
          (c.honors ? '<div class="campus-honors"><b>' + t(n.honorsLabel) + "</b><span>" + t(c.honors) + "</span></div>" : "") +
          "</section>";
      }) +
      // 和其他章节一样的底部切换（No.01 编者按 → 上一期 No.08 / 下一期 No.02）
      '<div class="note-pager">' + issuePager(noteIdx) + "</div>" + footer();
    themePage(noteIssue.bg);
    placeBack(PF_TAB);
  }

  // ---------- 作品集 ----------
  // 不分语言的字段可以直接写字符串，分语言的写 { en: "", zh: "" }
  function L(x) { return x && typeof x === "object" ? x[lang] : x; }

  function pfItem(it) {
    var ratio = it.ratio ? ' style="aspect-ratio:' + esc(it.ratio) + '"' : "";
    var cap = it.caption ? "<figcaption>" + t(L(it.caption)) + "</figcaption>" : "";
    var inner;
    if (it.type === "image") {
      inner = '<button type="button" class="pf-media" data-lb="img" data-src="' + esc(it.src) + '"><img src="' + esc(it.src) + '" alt="" loading="lazy"' + ratio + "></button>";
    } else if (it.type === "video") {
      inner = '<button type="button" class="pf-media" data-lb="video" data-src="' + esc(it.src) + '">' +
        '<video src="' + esc(it.src) + '"' + (it.poster ? ' poster="' + esc(it.poster) + '"' : "") + ' muted loop playsinline preload="metadata"' + ratio + "></video>" +
        '<span class="pf-play">▶</span></button>';
    } else if (it.type === "youtube") {
      inner = '<div class="pf-embed" style="aspect-ratio:' + esc(it.ratio || "16 / 9") + '"><iframe src="https://www.youtube-nocookie.com/embed/' + esc(it.id) +
        '" title="YouTube video" loading="lazy" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>';
    } else if (it.type === "link") {
      // 抖音、B 站等：封面图 + 角标，点击在新窗口打开
      inner = '<a class="pf-link" href="' + esc(it.href) + '" target="_blank" rel="noopener"' + (it.poster ? "" : ratio) + ">" +
        (it.poster ? '<img src="' + esc(it.poster) + '" alt="" loading="lazy"' + ratio + ">" : "") +
        '<span class="pf-badge">' + t(L(it.platform) || U.watch) + " ↗</span></a>";
    } else {
      inner = '<div class="pf-tbd"' + (ratio || ' style="aspect-ratio:4 / 5"') + '><span class="tbd">' + t(U.tbdWork) + "</span></div>";
    }
    return '<figure class="pf-item">' + inner + cap + "</figure>";
  }

  function lightbox(kind, src) {
    var m = document.createElement("div");
    m.className = "lb";
    m.innerHTML = '<button type="button" class="lb-close">(' + t(U.close) + ")</button>" +
      (kind === "video" ? '<video src="' + esc(src) + '" controls autoplay playsinline></video>' : '<img src="' + esc(src) + '" alt="">');
    m.onclick = function (e) { if (e.target === m || e.target.className === "lb-close") m.remove(); };
    document.body.appendChild(m);
    if (kind === "video") {
      var video = m.querySelector("video");
      video.muted = false;
      video.volume = 1;
      var playing = video.play();
      if (playing && playing.catch) playing.catch(function () {});
    }
  }

  function bindGallery() {
    app.querySelectorAll(".pf-media").forEach(function (b) {
      b.onclick = function () { lightbox(b.getAttribute("data-lb"), b.getAttribute("data-src")); };
    });
    // 视频：滑到眼前才静音循环播放，划走就暂停
    var vids = app.querySelectorAll(".pf-media video");
    if (!vids.length || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { var p = e.target.play(); if (p && p.catch) p.catch(function () {}); }
        else e.target.pause();
      });
    }, { threshold: 0.4 });
    vids.forEach(function (v) { io.observe(v); });
  }

  function renderPortfolio() {
    var P = C.portfolio, pd = P[lang];
    var entries = P.entries, idx = -1, id = params.get("id");
    entries.forEach(function (e, i) { if (e.id === id) idx = i; });
    function href(e) { return link("portfolio.html?id=" + e.id); }

    if (idx < 0) {
      // 作品集首页：介绍 + 三个入口
      if (orbitStop) orbitStop();
      document.body.classList.remove("pf-orbit-page");
      document.body.style.removeProperty("--pc");
      document.body.classList.add("pf-home");
      document.title = pd.kicker + " · " + brand();
      // 扉页：左边大标题（\n 处换行），右边简介
      app.innerHTML = '<section class="pf-head"><div class="pf-title"><div class="kicker">' + t(pd.kicker) + "</div>" +
        "<h1>" + t(pd.title).replace(/\n/g, "<br>") + '</h1></div><div class="pf-text">' +
        each(pd.intro, function (p) { return "<p>" + t(p) + "</p>"; }) + "</div></section>" +
        // 三个入口是 3D 纸团（paperBalls 负责画）；WebGL 不可用时显示 CSS 画的静态纸团
        '<div class="pf-shelf">' + each(entries, function (e, i) {
          var d = e[lang];
          return '<a class="pf-entry" href="' + href(e) + '" data-i="' + i + '"><div class="paper" style="--pc:' + esc(e.paper || e.coverColor) + '"></div>' +
            '<div class="k">No.' + esc(e.no) + " · " + t(d.kicker) + '</div><div class="h">' + t(d.title) + "</div></a>";
        }) + "</div>" + footer();
      paperBalls(entries);
      window.scrollTo(0, 0);
      return;
    }

    // 详情页：只有居中标题 + 照片球（作品索引）+ 一行小翻页
    if (paperStop) paperStop();
    document.body.classList.remove("pf-home");
    document.body.classList.add("pf-orbit-page");
    var e = entries[idx], d = e[lang];
    document.title = d.title + " · " + brand();
    var prev = entries[(idx - 1 + entries.length) % entries.length];
    var next = entries[(idx + 1) % entries.length];
    // 主题色跟纸团一致（--pc），标题上方标期号
    document.body.style.setProperty("--pc", e.paper || e.coverColor);
    // 左上角「← Back」回到作品集首页
    app.innerHTML = '<section class="pf-orbit-wrap"><a class="pf-back" href="' + link("portfolio.html") + '">' +
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg><span>Back</span></a>' +
      '<div class="pf-orbit-no">No.' + esc(e.no) + " · " + t(d.kicker) + "</div>" +
      '<h1 class="pf-orbit-title">' + t(d.title) + "</h1>" +
      // 球的左右两侧各一个简约箭头，悬停时显示要去的那个作品集名字
      '<div class="orbit-stage">' +
      '<a class="orbit-arrow prev" href="' + href(prev) + '" style="--ac:' + esc(prev.paper || prev.coverColor) + '" aria-label="' + esc(prev[lang].title) + '">' +
        '<span class="arr"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></span><span class="lbl">' + t(prev[lang].title) + "</span></a>" +
      '<div class="orbit" id="orbit" style="--tint:' + e.bg + ";--cc:" + e.coverColor + '"></div>' +
      '<a class="orbit-arrow next" href="' + href(next) + '" style="--ac:' + esc(next.paper || next.coverColor) + '" aria-label="' + esc(next[lang].title) + '">' +
        '<span class="lbl">' + t(next[lang].title) + '</span><span class="arr"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></span></a>' +
      "</div>" +
      '<p class="orbit-hint">' + t(U.orbitHint) + "</p></section>";
    // 所有分组的作品合在一起放进球里
    var items = [];
    (e.groups || []).forEach(function (g) { (g.items || []).forEach(function (it) { if (!it.tbd) items.push(it); }); });
    orbit(document.getElementById("orbit"), items, e);
    // Back 和其他详情页一样：和导航里的「作品集」左对齐，高度统一
    app.querySelector(".pf-back").classList.add("page-back");
    placeBack(PF_TAB);
    window.scrollTo(0, 0);
  }

  // ---------- 照片球 ----------
  // 照片贴在 3D 球面上缓慢自转；拖动旋转；悬停浮出放大；点击打开预览
  var orbitStop = null, orbitHold = false; // orbitHold：预览打开时球停转
  // 第一原则：同色系的作品放在同一圈（同一纬度）。先读每张缩略图的平均色，按色相排好，再摆上球
  function colorSort(items, done) {
    var left = items.length, keyed = items.map(function (it, k) { return { it: it, k: k, key: 9999 }; });
    if (!left) return done(items);
    var finished = false;
    function finish() {
      if (finished) return; finished = true;
      keyed.sort(function (a, b) { return a.key - b.key || a.k - b.k; });
      done(keyed.map(function (x) { return x.it; }));
    }
    setTimeout(finish, 2500); // 图片太慢就先按已经算出来的排
    keyed.forEach(function (x) {
      var src = x.it.thumb || x.it.poster || (x.it.type === "image" ? x.it.src : "");
      if (!src) { if (--left === 0) finish(); return; }
      var im = new Image();
      im.onload = function () {
        try {
          var c = document.createElement("canvas"); c.width = c.height = 10;
          var g = c.getContext("2d"); g.drawImage(im, 0, 0, 10, 10);
          var d = g.getImageData(0, 0, 10, 10).data, r = 0, gg = 0, b = 0;
          for (var p = 0; p < d.length; p += 4) { r += d[p]; gg += d[p + 1]; b += d[p + 2]; }
          r /= 25500; gg /= 25500; b /= 25500;
          var mx = Math.max(r, gg, b), mn = Math.min(r, gg, b), l = (mx + mn) / 2, s = mx === mn ? 0 : (mx - mn) / (1 - Math.abs(2 * l - 1)), h = 0;
          if (mx !== mn) h = mx === r ? ((gg - b) / (mx - mn) + 6) % 6 : mx === gg ? (b - r) / (mx - mn) + 2 : (r - gg) / (mx - mn) + 4;
          h *= 60;
          // 灰、黑、白这类低饱和的放最后，按明暗排；有颜色的按色相排（从紫红开始，红色不会被拆到两头）
          x.key = s < 0.16 || l < 0.1 || l > 0.92 ? 1000 + l * 100 : (h - 300 + 360) % 360;
        } catch (e) {}
        if (--left === 0) finish();
      };
      im.onerror = function () { if (--left === 0) finish(); };
      im.src = src;
    });
  }

  function orbit(box, items, entry, sorted) {
    if (!sorted && items.length) { colorSort(items, function (s) { if (document.body.contains(box)) orbit(box, s, entry, true); }); return; }
    if (orbitStop) orbitStop();
    var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    // 球面约 65 个位置；作品不够时循环铺满，没有作品时放占位色块
    var tiles = items.length ? items.slice() : [];
    if (!tiles.length) for (var k = 0; k < 30; k++) tiles.push({ placeholder: true, n: k + 1 });

    // 真 3D 球（参考图）：照片贴在球面上，按纬度一圈一圈排（赤道最多、两极最少），相邻两圈错开半格；
    // 用浏览器自带的 3D（perspective + preserve-3d），背面的照片自动隐藏
    var LATS = [-66, -44, -22, 0, 22, 44, 66], slots = [];
    LATS.forEach(function (lat, row) {
      var n = Math.max(5, Math.round(13 * Math.cos(lat * Math.PI / 180)));
      for (var c = 0; c < n; c++) slots.push({ lat: lat, lon: (c + (row % 2 ? 0.5 : 0)) * 360 / n, n: n });
    });
    var base = tiles.length;
    var N = slots.length;
    // 作品少（< 20 个）时不整球重复：每个作品最多出现 3 次、均匀散开，其余位置放主题色的空白纸片
    if (items.length && base < 20) {
      var copies = Math.min(3, Math.ceil(N / base)), total = base * copies, filled = [];
      for (var q = 0; q < N; q++) filled.push({ placeholder: true, blank: true });
      for (var r = 0; r < total; r++) filled[Math.floor(r * N / total + (N / total) / 2) % N] = tiles[r % base]; // 作品很少时：几份错开放，不挨在一起
      tiles = filled; base = N;
    }
    tiles.forEach(function (it) { if (it.placeholder) it.blank = true; }); // 占位块不再印编号
    // 第 i 个球面位置放哪个作品：
    // 1. 排好色的作品按每圈的位置数成比例切成几段，同色系的一段放进同一圈（第一原则）
    // 2. 圈里位置比作品多时，按 a b c a b c… 轮着放，重复的作品不挨在一起（首尾相接处也避开）
    var assign = [];
    (function () {
      if (base === N) { for (var z = 0; z < N; z++) assign.push(tiles[z]); return; }
      var rings = [], start = 0;
      slots.forEach(function (s, i) { if (!rings.length || slots[i - 1].lat !== s.lat) rings.push({ from: i, n: 0 }); rings[rings.length - 1].n++; });
      rings.forEach(function (rg, ri) {
        var end = ri === rings.length - 1 ? base : Math.max(start + 1, Math.round((rg.from + rg.n) * base / N));
        end = Math.min(base, Math.max(end, start + Math.min(2, base - start))); // 每圈至少 2 个不同作品，才能错开
        var group = tiles.slice(start, end);
        // 每圈至少 3 个不同作品（圈是首尾相接的，2 个在奇数位置时一定会撞上）；不够就向色系相邻的作品借
        var want = Math.min(3, base, rg.n);
        for (var nb = end; group.length < want && nb < base; nb++) group.push(tiles[nb]);
        for (var pb = start - 1; group.length < want && pb >= 0; pb--) group.unshift(tiles[pb]);
        var seq = [];
        for (var j = 0; j < rg.n; j++) seq.push(group[j % group.length]);
        // 首尾相接处如果撞上，把最后一个换成和左右都不同的作品
        if (rg.n > 2 && seq[rg.n - 1] === seq[0]) {
          for (var q2 = 0; q2 < group.length; q2++) if (group[q2] !== seq[0] && group[q2] !== seq[rg.n - 2]) { seq[rg.n - 1] = group[q2]; break; }
        }
        assign = assign.concat(seq);
        start = Math.min(end, base - 1);
      });
    })();
    // 置顶作品（front: 1/2/3）：放在赤道那圈正对镜头的三格，2 在正中；其余位置如果因此和邻居重复，就换一个
    var frontLon = 0;
    (function () {
      var feat = items.filter(function (it) { return it.front; }).sort(function (a, b) { return a.front - b.front; });
      if (!feat.length) return;
      var eq = -1, n = 0;
      slots.forEach(function (s, i) { if (s.lat === 0) { if (eq < 0) eq = i; n++; } });
      var mid = Math.floor((feat.length - 1) / 2), pinned = {};
      feat.forEach(function (it, k) { var p = eq + ((k - mid) % n + n) % n; assign[p] = it; pinned[p] = 1; });
      frontLon = slots[eq].lon;
      var rings = {};
      slots.forEach(function (s, i) { (rings[s.lat] = rings[s.lat] || []).push(i); });
      Object.keys(rings).forEach(function (lat) {
        var idx = rings[lat], m = idx.length;
        var pool = idx.map(function (i) { return assign[i]; }).filter(function (it) { return !it.front; });
        if (!pool.length) pool = tiles.filter(function (it) { return !it.front; });
        idx.forEach(function (i, j) {
          if (pinned[i]) return;
          var L2 = assign[idx[(j - 1 + m) % m]], R2 = assign[idx[(j + 1) % m]];
          if (assign[i] !== L2 && assign[i] !== R2 && !(lat === "0" && assign[i].front)) return;
          for (var c = 0; c < pool.length; c++) if (pool[c] !== L2 && pool[c] !== R2) { assign[i] = pool[c]; break; }
        });
      });
    })();
    function pick(i) { return assign[i]; }
    box.classList.add("orbit3d");
    box.innerHTML = '<div class="ball">' + each(slots, function (s, i) {
      var it = pick(i);
      var pic = it.thumb || it.poster || (it.type === "image" || it.type === "video" ? it.src : "");
      // 没有封面的外链（如抖音）：主题色纸片上写平台名和标题
      if (!it.placeholder && !pic) return '<button type="button" class="ball-tile link-tile" data-i="' + i + '"><span class="orbit-ph link-ph">' +
        '<b>' + t(L(it.platform) || U.watch) + ' ↗</b><i>' + t(L(it.title) || "") + "</i></span></button>";
      var inner = it.placeholder
        ? '<span class="orbit-ph" style="--h:' + ((i * 37) % 360) + '">' + (it.blank ? "" : (it.n < 10 ? "0" : "") + it.n) + "</span>"
        : '<img src="' + esc(it.thumb || it.poster || it.src) + '" alt="" decoding="async" draggable="false">' + // 球上的图都在视野里，不用延迟加载
          (it.type === "video" || it.type === "link" ? '<span class="orbit-play">▶</span>' : ""); // 视频和抖音链接都显示 ▶
      var title = it.placeholder ? "" : t(L(it.title) || "");
      return '<button type="button" class="ball-tile' + (it.placeholder ? " blank" : "") + '" data-i="' + i + '">' + inner +
        (title ? '<span class="orbit-cap">' + title + "</span>" : "") + "</button>";
    }) + "</div>";
    var ball = box.querySelector(".ball");
    var els = Array.prototype.slice.call(box.querySelectorAll(".ball-tile"));

    // 打开时置顶作品正对镜头（ry 转到它的经度）
    var rx = -0.18, ry = -frontLon * Math.PI / 180, vx = 0, vy = reduce ? 0 : 0.0022, hover = -1, raf = 0, alive = true, lastSize = "";
    var drag = null, moved = 0, holdUntil = Date.now() + 2500; // 有置顶作品时先停 2.5 秒再开始转
    function layout() { // 尺寸变化时才重新摆放照片
      var w = box.clientWidth, h = box.clientHeight, key = w + "x" + h;
      if (key === lastSize) return; lastSize = key;
      var R = Math.min(w, h) * 0.46, th = R * 0.36; // 每圈高度约占 22°
      box.style.perspective = Math.round(R * 4.2) + "px";
      slots.forEach(function (s, i) {
        var tw = Math.min(th * 1.45, 2 * Math.PI * R * Math.cos(s.lat * Math.PI / 180) / s.n * 0.9);
        var el = els[i];
        el.style.width = tw + "px"; el.style.height = th + "px";
        el.style.marginLeft = -tw / 2 + "px"; el.style.marginTop = -th / 2 + "px";
        s.base = "rotateY(" + s.lon + "deg) rotateX(" + s.lat + "deg) translateZ(" + R + "px)";
        el.style.transform = s.base;
      });
    }
    function frame() {
      if (!alive) return;
      layout();
      if (!drag) { ry += hover >= 0 || orbitHold || (frontLon && Date.now() < holdUntil) ? 0 : vy; rx += vx; vx *= 0.95; rx = Math.max(-1.1, Math.min(1.1, rx)); }
      ball.style.transform = "rotateX(" + rx + "rad) rotateY(" + ry + "rad)";
      raf = requestAnimationFrame(frame);
    }
    layout(); ball.style.transform = "rotateX(" + rx + "rad) rotateY(" + ry + "rad)"; // 先摆好一次，不等第一帧
    raf = requestAnimationFrame(frame);
    function setHover(i, on) { // 悬停的照片沿球面法线浮出一点并放大
      var el = els[i], s = slots[i];
      el.style.transform = s.base + (on ? " translateZ(" + 34 + "px) scale(1.14)" : "");
      el.classList.toggle("on", on);
    }

    // 拖动旋转（鼠标和手指都可以）
    box.addEventListener("pointerdown", function (ev) {
      drag = { x: ev.clientX, y: ev.clientY }; moved = 0;
    });
    function onMove(ev) {
      if (!drag) return;
      var dx = ev.clientX - drag.x, dy = ev.clientY - drag.y;
      moved += Math.abs(dx) + Math.abs(dy);
      ry += dx * 0.006; rx -= dy * 0.006; rx = Math.max(-1.1, Math.min(1.1, rx));
      vx = -dy * 0.0006;
      drag = { x: ev.clientX, y: ev.clientY };
    }
    function endDrag() { drag = null; }
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);

    els.forEach(function (el) {
      var i = +el.getAttribute("data-i");
      el.addEventListener("mouseenter", function () { if (!drag && !pick(i).placeholder) { hover = i; setHover(i, true); } });
      el.addEventListener("mouseleave", function () { if (hover === i) hover = -1; setHover(i, false); });
      el.addEventListener("click", function () {
        if (moved > 6) return; // 刚拖过，不算点击
        var it = pick(i);
        if (it.placeholder) return;
        if (it.type === "link" && it.direct) { window.open(it.href, "_blank", "noopener"); return; }
        workModal(it, el);
      });
    });

    function onVis() { if (document.hidden) cancelAnimationFrame(raf); else { cancelAnimationFrame(raf); raf = requestAnimationFrame(frame); } }
    document.addEventListener("visibilitychange", onVis);
    orbitStop = function () {
      alive = false; cancelAnimationFrame(raf); orbitStop = null; orbitHold = false;
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
    };
  }

  // ---------- 作品集首页 · 3D 纸团 ----------
  // 每个入口是一张揉皱的纸：平时是纸团，轻轻浮动旋转；悬停微微松开；点击约 0.8 秒展开成皱纸，再进入作品集
  var THREE_URL = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
  var paperStop = null;
  function loadThree(cb) {
    if (window.THREE) return cb();
    var s = document.createElement("script");
    s.src = THREE_URL; s.onload = cb; s.onerror = function () {};
    document.head.appendChild(s);
  }
  function paperBalls(entries) {
    if (paperStop) paperStop();
    var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    try { var test = document.createElement("canvas"); if (!(test.getContext("webgl") || test.getContext("experimental-webgl"))) return; } catch (e) { return; }
    loadThree(function () {
      var fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
      fontsReady.then(function () { buildPapers(entries, reduce); });
    });
  }

  // 平滑噪声（做褶皱用）
  function hash2(x, y) { var s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return s - Math.floor(s); }
  function noise2(x, y) {
    var xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
    var u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
    var a = hash2(xi, yi), b = hash2(xi + 1, yi), c = hash2(xi, yi + 1), d = hash2(xi + 1, yi + 1);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  }
  function ridge(x, y) { // 折痕：噪声取绝对值得到尖锐的棱
    var n = 0, amp = 0.6, f = 1;
    for (var o = 0; o < 3; o++) { n += amp * (1 - Math.abs(noise2(x * f, y * f) * 2 - 1)); amp *= 0.5; f *= 2.1; }
    return n;
  }

  function paperTexture(e, d, plain) { // plain：只要纸纹不印字（纸团状态用）
    var c = document.createElement("canvas"); c.width = 512; c.height = 640;
    var g = c.getContext("2d"), col = new THREE.Color(e.paper || e.coverColor);
    g.fillStyle = "#" + col.getHexString(); g.fillRect(0, 0, 512, 640);
    for (var i = 0; i < 9000; i++) { // 纸张颗粒
      g.fillStyle = Math.random() < 0.5 ? "rgba(255,255,255,.05)" : "rgba(0,0,0,.05)";
      g.fillRect(Math.random() * 512, Math.random() * 640, 1.5, 1.5);
    }
    if (plain) { var tp = new THREE.CanvasTexture(c); tp.anisotropy = 4; return tp; }
    var fg = "rgba(255,255,255,.9)", serif = '"EB Garamond","Noto Serif SC",Georgia,serif';
    g.fillStyle = fg; g.font = "26px " + serif; g.textBaseline = "top";
    g.fillText(("No." + e.no + " · " + d.kicker).toUpperCase(), 44, 48);
    g.fillRect(44, 88, 424, 1.5);
    // 展开后印的一句话（content 里的 unfold），没有就印作品集名字
    var text = d.unfold || d.title;
    g.font = (lang === "zh" ? "600 46px " : "italic 46px ") + serif;
    var words = lang === "zh" ? text.split("") : text.split(" "), lines = [], line = "";
    words.forEach(function (w) {
      var test = line ? line + (lang === "zh" ? "" : " ") + w : w;
      if (g.measureText(test).width > 424 && line) { lines.push(line); line = w; } else line = test;
    });
    lines.push(line);
    var lh = 64, top = 330 - (lines.length * lh) / 2 + 40; // 文案在纸中间偏下
    lines.forEach(function (l, i) { g.fillText(l, 44, top + i * lh); });
    var tex = new THREE.CanvasTexture(c);
    tex.anisotropy = 4;
    return tex;
  }

  function buildPapers(entries, reduce) {
    var shelf = app.querySelector(".pf-shelf");
    if (!shelf || !document.body.classList.contains("pf-home")) return;
    var balls = [], alive = true, raf = 0, W = 2, H = 2.5, SX = 40, SY = 50;
    app.querySelectorAll(".pf-entry").forEach(function (a) {
      var i = +a.getAttribute("data-i"), e = entries[i], d = e[lang], box = a.querySelector(".paper");
      var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      box.appendChild(renderer.domElement);
      box.classList.add("gl");
      var scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
      cam.position.set(0, 0, 4.8); // 镜头拉近一点，纸团在格子里更饱满
      scene.add(new THREE.AmbientLight(0xffffff, 0.55));
      var key = new THREE.DirectionalLight(0xffffff, 0.95); key.position.set(-2.5, 3, 4); scene.add(key);
      var rim = new THREE.DirectionalLight(0xffffff, 0.25); rim.position.set(3, -2, 2); scene.add(rim);

      var geo = new THREE.PlaneGeometry(W, H, SX, SY), pos = geo.attributes.position, n = pos.count;
      var ballP = new Float32Array(n * 3), flatP = new Float32Array(n * 3), seed = i * 17.3 + 3;
      for (var k = 0; k < n; k++) {
        var x = pos.getX(k), y = pos.getY(k), u = x / W + 0.5, v = y / H + 0.5;
        // 展开态：平面 + 浅折痕
        flatP[k * 3] = x; flatP[k * 3 + 1] = y; flatP[k * 3 + 2] = 0.09 * (ridge(u * 4 + seed, v * 5 + seed) - 0.6);
        // 纸团态：把整张纸包成一个完整的球（经度一整圈、纬度到两极，接缝和两极都闭合），
        // 折痕按球面上的位置计算，接缝两边取到同一个值，不会裂开
        var lon = (u - 0.5) * Math.PI * 2, lat = (v - 0.5) * Math.PI;
        var dx = Math.cos(lat) * Math.sin(lon), dy = Math.sin(lat), dz = Math.cos(lat) * Math.cos(lon);
        var crease = (ridge(dx * 2.2 + seed, dy * 2.2) + ridge(dy * 2.2 + seed, dz * 2.2) + ridge(dz * 2.2, dx * 2.2 + seed)) / 3;
        var fine = noise2(dx * 7 + dz * 3 + seed, dy * 7 - dz * 2);
        var r = 1.02 * (1 + 0.42 * (crease - 0.6) + 0.07 * (fine - 0.5));
        ballP[k * 3] = r * dx;
        ballP[k * 3 + 1] = r * dy;
        ballP[k * 3 + 2] = r * dz;
      }
      var texPlain = paperTexture(e, d, true), texText = paperTexture(e, d);
      var mat = new THREE.MeshStandardMaterial({ map: texPlain, roughness: 0.92, metalness: 0, side: THREE.DoubleSide, flatShading: true });
      var mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);
      var b = { a: a, box: box, renderer: renderer, scene: scene, cam: cam, mesh: mesh, pos: pos, geo: geo, ballP: ballP, flatP: flatP, texPlain: texPlain, texText: texText,
        t: 0, target: 0, phase: i * 2.1, ry: i * 1.3, opening: false, last: -1 };
      balls.push(b);

      a.addEventListener("mouseenter", function () { if (!b.opening) b.target = 0.16; });
      a.addEventListener("mouseleave", function () { if (!b.opening) b.target = 0; });
      a.addEventListener("click", function (ev) {
        if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.button) return; // 新标签打开时不拦截
        ev.preventDefault();
        if (b.opening) return;
        b.opening = true; b.target = 1; b.openAt = performance.now();
        setTimeout(function () { location.href = a.href; }, reduce ? 0 : 900);
      });
    });

    function shape(b) {
      var t = b.t, e = t * t * (3 - 2 * t), arr = b.pos.array, bp = b.ballP, fp = b.flatP;
      for (var k = 0; k < arr.length; k++) arr[k] = bp[k] + (fp[k] - bp[k]) * e;
      b.pos.needsUpdate = true;
      b.geo.computeVertexNormals();
    }
    var prevNow = 0;
    function frame(now) {
      if (!alive) return;
      var dt = prevNow ? Math.min(now - prevNow, 250) / 16.7 : 1; prevNow = now; // 按时间推进，掉帧时动画速度不变
      balls.forEach(function (b) {
        var size = b.box.clientWidth;
        if (b.size !== size) { b.renderer.setSize(size, size, false); b.size = size; }
        b.t += (b.target - b.t) * (1 - Math.pow(1 - (b.opening ? 0.14 : 0.08), dt));
        if (Math.abs(b.t - b.last) > 0.0005) { shape(b); b.last = b.t; }
        var open = b.t;
        var want = open > 0.55 ? b.texText : b.texPlain; // 展开过半才露出名字
        if (b.mesh.material.map !== want) { b.mesh.material.map = want; b.mesh.material.needsUpdate = true; }
        if (!reduce) b.ry += 0.004 * dt * (1 - open);
        // 展开时转回正面，稍微放大
        var face = Math.round(b.ry / (Math.PI * 2)) * Math.PI * 2;
        b.mesh.rotation.y = b.ry + (face - b.ry) * open;
        b.mesh.rotation.x = (reduce ? 0 : Math.sin(now / 1400 + b.phase) * 0.18) * (1 - open);
        b.mesh.position.y = (reduce ? 0 : Math.sin(now / 900 + b.phase) * 0.06) * (1 - open);
        b.mesh.scale.setScalar(1 + 0.12 * open);
        b.renderer.render(b.scene, b.cam);
      });
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    function onVis() { cancelAnimationFrame(raf); if (!document.hidden) raf = requestAnimationFrame(frame); }
    document.addEventListener("visibilitychange", onVis);
    paperStop = function () {
      alive = false; cancelAnimationFrame(raf); paperStop = null;
      document.removeEventListener("visibilitychange", onVis);
      balls.forEach(function (b) { b.geo.dispose(); b.texPlain.dispose(); b.texText.dispose(); b.mesh.material.dispose(); b.renderer.dispose(); });
    };
  }

  // 作品详情弹窗：大图 / 视频 / 外链按钮 + 标题和说明
  // 照片从球上原来的位置放大到屏幕中间（大圆角 + 投影）；右上角一个细线 ×；下方只有一行时间 · 地点
  function workModal(it, fromEl) {
    // 长图（tall）放进可上下滚动的框；gallery 是同一主题的多张图，并排显示
    function pic(x) {
      var src = typeof x === "string" ? x : x.src, tall = typeof x === "object" && x.tall;
      return tall ? '<div class="work-scroll"><img src="' + esc(src) + '" alt=""></div>' : '<img src="' + esc(src) + '" alt="">';
    }
    var media = it.type === "video" ? '<video src="' + esc(it.src) + '"' + (it.poster ? ' poster="' + esc(it.poster) + '"' : "") + ' controls autoplay playsinline></video>'
      : it.type === "youtube" ? '<div class="pf-embed" style="aspect-ratio:' + esc(it.ratio || "16 / 9") + '"><iframe src="https://www.youtube-nocookie.com/embed/' + esc(it.id) + '?autoplay=1" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe></div>'
      : it.type === "gallery" ? '<div class="work-multi">' + each(it.images, pic) + "</div>"
      // deck：PPT 预览，4 页一版（2×2，透明间隔，背景就是虚化的页面），左右箭头 / 键盘 ← → / 下方小圆点翻版
      : it.type === "deck" ? '<div class="work-deck"><div class="deck-grid"></div>' +
          (it.slides.length > 4 ? '<button type="button" class="deck-nav prev" aria-label="prev"><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg></button>' +
            '<button type="button" class="deck-nav next" aria-label="next"><svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg></button>' : "") + "</div>"
      : it.tall ? pic({ src: it.src, tall: true })
      : '<img src="' + esc(it.src || it.poster) + '" alt="">';
    var m = document.createElement("div");
    m.className = "work-lb";
    m.innerHTML = '<div class="work-frame">' + media +
      '<button type="button" class="work-x" aria-label="' + esc(U.close) + '"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>' +
      '<div class="work-cap">' + (it.title ? '<span class="work-title">' + t(L(it.title)) + "</span>" : "") +
      (it.desc ? '<span class="work-desc">' + t(L(it.desc)) + "</span>" : "") +
      (it.href ? '<a class="work-link" href="' + esc(it.href) + '" target="_blank" rel="noopener">' + t(L(it.platform) || U.viewOriginal) + " ↗</a>" : "") + "</div>";
    var page = 0, grid = m.querySelector(".deck-grid"), pages = grid ? Math.ceil(it.slides.length / 4) : 0;
    if (pages > 1) {
      m.querySelector(".work-cap").insertAdjacentHTML("afterbegin", '<span class="deck-dots">' +
        each(new Array(pages).fill(0), function (z, k) { return '<button type="button" data-k="' + k + '"' + (k ? "" : ' class="on"') + "></button>"; }) + "</span>");
    }
    function go(k) {
      if (!grid) return;
      page = (k + pages) % pages;
      grid.innerHTML = each(it.slides.slice(page * 4, page * 4 + 4), function (s) { return '<img src="' + esc(s) + '" alt="">'; });
      m.querySelectorAll(".deck-dots button").forEach(function (b, j) { b.classList.toggle("on", j === page); });
    }
    if (grid) {
      go(0);
      it.slides.slice(4, 12).forEach(function (s) { var im = new Image(); im.src = s; }); // 预先加载后两版
      m.querySelectorAll(".deck-nav").forEach(function (b) { b.onclick = function (ev) { ev.stopPropagation(); go(page + (b.classList.contains("next") ? 1 : -1)); }; });
      m.querySelectorAll(".deck-dots button").forEach(function (b) { b.onclick = function (ev) { ev.stopPropagation(); go(+b.getAttribute("data-k")); }; });
    }
    document.body.appendChild(m);
    orbitHold = true;

    // 从缩略图的位置和大小「飞」到中间（FLIP）
    var frame = m.querySelector(".work-frame");
    function fly(reverse, done) {
      if (!fromEl || (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches)) { done && done(); return; }
      var a = fromEl.getBoundingClientRect(), b = frame.getBoundingClientRect();
      if (!b.width) { done && done(); return; }
      var dx = a.left + a.width / 2 - (b.left + b.width / 2), dy = a.top + a.height / 2 - (b.top + b.height / 2);
      var s = a.width / b.width, from = "translate(" + dx + "px," + dy + "px) scale(" + s + ")";
      var anim = frame.animate(reverse ? [{ transform: "none" }, { transform: from, opacity: 0.4 }] : [{ transform: from, opacity: 0.6 }, { transform: "none", opacity: 1 }],
        { duration: reverse ? 320 : 520, easing: "cubic-bezier(.2,.75,.15,1)", fill: "both" });
      anim.onfinish = function () { done && done(); };
    }
    var img = frame.querySelector("img");
    if (img && !img.complete) img.onload = function () { fly(false); }; else fly(false);

    var closing = false;
    function close() {
      if (closing) return; closing = true;
      document.removeEventListener("keydown", onKey);
      m.classList.add("out");
      fly(true, function () { m.remove(); orbitHold = false; });
      if (!fromEl) { m.remove(); orbitHold = false; }
    }
    function onKey(ev) {
      if (ev.key === "Escape") close();
      else if (pages > 1 && ev.key === "ArrowRight") go(page + 1);
      else if (pages > 1 && ev.key === "ArrowLeft") go(page - 1);
    }
    m.onclick = function (ev) { if (ev.target === m || ev.target.closest(".work-x")) close(); };
    document.addEventListener("keydown", onKey);
  }

  function footer() {
    return '<div class="foot"><a href="' + link("index.html") + '">' + t(U.nav.issues) + "</a> · " +
      '<a href="' + link("index.html#contact") + '">' + t(U.nav.contact) + "</a><br>© 2026 " + esc(brand()) +
      " · " + esc(C.meta.version) + " · " + esc(C.meta.updated) + "</div>";
  }

  // ---------- 入口 ----------
  function render(keep) {
    U = C.ui[lang];
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    renderNav();
    if (page === "home") { document.title = brand() + " · " + (lang === "zh" ? "个人期刊" : "The Archives"); renderHome(keep); }
    else if (page === "issue") renderIssue();
    else if (page === "note") renderNote();
    else if (page === "portfolio") renderPortfolio();
  }

  var s = document.createElement("script");
  s.src = "content/" + role + ".js?t=" + Date.now(); // 每次取最新内容，避免浏览器缓存旧文字
  s.onload = function () { C = window.SITE_CONTENT; U = C.ui[lang]; intro(); render(false); };
  s.onerror = function () { app.innerHTML = '<p style="padding:120px 24px;text-align:center">Failed to load content.</p>'; };
  document.head.appendChild(s);
})();
