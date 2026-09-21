/* 筆記標註：選字 → 高亮 → 右側面板寫備註 → 存在瀏覽器裡。
   資料存在 localStorage，key 是 mn:<檔名>。只存在你自己的瀏覽器，不會上傳。
   三份筆記共用這一份，改這裡三份一起生效。 */
(function () {
  "use strict";

  var KEY = "mn:" + (location.pathname.split("/").pop() || "index.html");
  var CTX = 30;                 // 前後文各存幾個字，用來分辨重複出現的文字
  var root, panel, chip, fab, list, editor, quoteBox, textarea, titleEl;
  var notes = [];
  var editing = null;           // 正在編輯的那筆
  var pendingRange = null;      // 還沒存檔的新選取

  /* ---------- 存取 ---------- */
  function load() {
    try {
      notes = JSON.parse(localStorage.getItem(KEY) || "[]");
      if (!Array.isArray(notes)) notes = [];
    } catch (e) { notes = []; }
  }
  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(notes));
      return true;
    } catch (e) {
      alert("這個瀏覽器存不了筆記（可能是無痕模式，或用 file:// 開啟）。\n" +
            "改用網址開啟就會正常：https://crown-soul.github.io/python-cheatsheet/");
      return false;
    }
  }

  /* ---------- 文字索引：把內文攤平成一長串，記住每段來自哪個文字節點 ---------- */
  function buildIndex() {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentNode;
        while (p && p !== root) {
          var t = p.nodeName;
          if (t === "SCRIPT" || t === "STYLE" || p.dataset && p.dataset.mnUi) {
            return NodeFilter.FILTER_REJECT;
          }
          p = p.parentNode;
        }
        return n.nodeValue.length ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    var map = [], full = "", n;
    while ((n = walker.nextNode())) {
      map.push({ node: n, start: full.length });
      full += n.nodeValue;
    }
    return { map: map, full: full };
  }

  function locate(idx, pos) {          // 全域字元位置 → {node, offset}
    for (var i = idx.map.length - 1; i >= 0; i--) {
      if (idx.map[i].start <= pos) {
        return { node: idx.map[i].node, offset: pos - idx.map[i].start };
      }
    }
    return null;
  }

  /* 找出這筆筆記在文件裡的位置。先用「前文＋引用＋後文」精準比對，
     找不到就退而求其次只比對引用本身。都找不到＝原文被改掉了。 */
  function findRange(note) {
    var idx = buildIndex();
    var at = -1;
    if (note.prefix || note.suffix) {
      at = idx.full.indexOf(note.prefix + note.quote + note.suffix);
      if (at >= 0) at += note.prefix.length;
    }
    if (at < 0) at = idx.full.indexOf(note.quote);
    if (at < 0) return null;
    var s = locate(idx, at), e = locate(idx, at + note.quote.length - 1);
    if (!s || !e) return null;
    var r = document.createRange();
    r.setStart(s.node, s.offset);
    r.setEnd(e.node, e.offset + 1);
    return r;
  }

  /* 把一個 Range 塗色。跨越多個節點時逐段包，才不會破壞既有的 <code>、<span> */
  function paint(range, id) {
    var texts = [], walker = document.createTreeWalker(
      range.commonAncestorContainer.nodeType === 3
        ? range.commonAncestorContainer.parentNode
        : range.commonAncestorContainer,
      NodeFilter.SHOW_TEXT, null);
    var n;
    while ((n = walker.nextNode())) {
      if (range.intersectsNode(n)) texts.push(n);
    }
    if (!texts.length && range.startContainer.nodeType === 3) texts = [range.startContainer];

    texts.forEach(function (t) {
      var s = (t === range.startContainer) ? range.startOffset : 0;
      var e = (t === range.endContainer) ? range.endOffset : t.nodeValue.length;
      if (e <= s) return;
      var mid = t.splitText(s);
      if (e - s < mid.nodeValue.length) mid.splitText(e - s);
      var m = document.createElement("mark");
      m.className = "mn-hl";
      m.dataset.mnId = id;
      mid.parentNode.insertBefore(m, mid);
      m.appendChild(mid);
    });
  }

  function unpaint(id) {
    Array.prototype.forEach.call(document.querySelectorAll('mark.mn-hl[data-mn-id="' + id + '"]'), function (m) {
      var p = m.parentNode;
      while (m.firstChild) p.insertBefore(m.firstChild, m);
      p.removeChild(m);
      p.normalize();
    });
  }

  function repaintAll() {
    Array.prototype.forEach.call(document.querySelectorAll("mark.mn-hl"), function (m) {
      var p = m.parentNode;
      while (m.firstChild) p.insertBefore(m.firstChild, m);
      p.removeChild(m);
    });
    root.normalize();
    notes.forEach(function (nt) {
      var r = findRange(nt);
      nt.orphan = !r;
      if (r) paint(r, nt.id);
    });
  }

  /* ---------- 介面 ---------- */
  function el(tag, css, html) {
    var d = document.createElement(tag);
    d.dataset.mnUi = "1";
    if (css) d.setAttribute("style", css);
    if (html != null) d.innerHTML = html;
    return d;
  }

  var MONO = "font-family:'IBM Plex Mono',monospace";
  var BTN = "font:600 16px 'Source Sans 3','Noto Sans TC',sans-serif;border-radius:8px;padding:8px 16px;cursor:pointer;border:1px solid #DFE3DA;background:#FFFFFF;color:#1C2321;";
  var BTN_P = "font:600 16px 'Source Sans 3','Noto Sans TC',sans-serif;border-radius:8px;padding:8px 16px;cursor:pointer;border:1px solid #2F6280;background:#2F6280;color:#FFFFFF;";

  function buildUI() {
    var style = el("style", null,
      "mark.mn-hl{background:#FCF0C4;color:inherit;padding:0;border-radius:2px;cursor:pointer;" +
      "box-shadow:inset 0 -2px 0 rgba(191,150,30,.45);}" +
      "mark.mn-hl:hover{background:#F8E49B;}" +
      "#mn-panel{position:fixed;z-index:9999;background:#FFFFFF;display:flex;flex-direction:column;" +
      "box-shadow:0 8px 40px rgba(28,35,33,.18);transition:transform .22s ease;}" +
      "@media (min-width:768px){#mn-panel{top:0;right:0;width:360px;height:100vh;border-left:1px solid #DFE3DA;transform:translateX(100%);}" +
      "#mn-panel.open{transform:translateX(0);}" +
      /* 面板開著的時候把內文推開，不要蓋住正在讀的字。
         推 body 的 padding 而不是容器的 margin——容器的 margin:0 auto 是 inline style，會蓋過樣式表。 */
      "body.mn-open{padding-right:360px;}}" +
      "body{transition:padding-right .22s ease;}" +
      "@media (max-width:767px){#mn-panel{left:0;right:0;bottom:0;max-height:72vh;border-top:1px solid #DFE3DA;" +
      "border-radius:16px 16px 0 0;transform:translateY(100%);}#mn-panel.open{transform:translateY(0);}}" +
      "#mn-panel textarea{width:100%;min-height:110px;resize:vertical;font:400 17px 'Source Sans 3','Noto Sans TC',sans-serif;" +
      "line-height:1.6;padding:12px;border:1px solid #DFE3DA;border-radius:9px;background:#FBFAF7;color:#1C2321;box-sizing:border-box;}" +
      "#mn-panel textarea:focus{outline:2px solid #2F6280;outline-offset:-1px;}" +
      ".mn-item{border:1px solid #DFE3DA;border-radius:10px;padding:12px 14px;background:#FFFFFF;cursor:pointer;}" +
      ".mn-item:hover{border-color:#2F6280;}" +
      "@media print{#mn-panel,#mn-fab,#mn-chip{display:none!important}mark.mn-hl{background:none;box-shadow:none}}");
    document.head.appendChild(style);

    panel = el("div", "");
    panel.id = "mn-panel";
    panel.dataset.mnUi = "1";
    document.body.appendChild(panel);

    chip = el("button", "position:absolute;z-index:10000;display:none;" + BTN_P + "padding:6px 12px;font-size:15px;box-shadow:0 2px 10px rgba(28,35,33,.25);");
    chip.id = "mn-chip";
    chip.textContent = "＋ 筆記";
    document.body.appendChild(chip);

    fab = el("button", "position:fixed;right:18px;bottom:18px;z-index:9998;width:52px;height:52px;border-radius:50%;" +
      "border:1px solid #DFE3DA;background:#FFFFFF;color:#2F6280;cursor:pointer;box-shadow:0 4px 16px rgba(28,35,33,.16);" +
      MONO + ";font-size:15px;font-weight:600;");
    fab.id = "mn-fab";
    document.body.appendChild(fab);

    chip.addEventListener("mousedown", function (e) { e.preventDefault(); });
    chip.addEventListener("click", startNew);
    fab.addEventListener("click", function () { openPanel(null); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closePanel();
    });
    document.addEventListener("mouseup", onSelect);
    document.addEventListener("selectionchange", function () {
      if (String(document.getSelection()).trim() === "") chip.style.display = "none";
    });
    root.addEventListener("click", function (e) {
      var m = e.target.closest && e.target.closest("mark.mn-hl");
      if (m) openPanel(m.dataset.mnId);
    });
  }

  function onSelect(e) {
    if (panel.contains(e.target) || e.target === chip) return;
    var sel = document.getSelection();
    var txt = String(sel).trim();
    if (!txt || txt.length < 2 || !sel.rangeCount) { chip.style.display = "none"; return; }
    var r = sel.getRangeAt(0);
    if (!root.contains(r.commonAncestorContainer)) { chip.style.display = "none"; return; }
    pendingRange = r.cloneRange();
    var box = r.getBoundingClientRect();
    chip.style.display = "block";
    chip.style.left = Math.max(8, box.left + window.scrollX) + "px";
    chip.style.top = (box.bottom + window.scrollY + 8) + "px";
  }

  function startNew() {
    if (!pendingRange) return;
    var idx = buildIndex();
    var quote = String(pendingRange).replace(/\s+/g, " ").trim();
    var at = idx.full.replace(/\s+/g, " ").indexOf(quote);
    var raw = idx.full.indexOf(String(pendingRange).trim());
    var p = raw > 0 ? idx.full.slice(Math.max(0, raw - CTX), raw) : "";
    var s = raw >= 0 ? idx.full.slice(raw + String(pendingRange).trim().length, raw + String(pendingRange).trim().length + CTX) : "";
    editing = {
      id: "n" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      quote: String(pendingRange).trim(), prefix: p, suffix: s,
      body: "", created: new Date().toISOString(), isNew: true
    };
    chip.style.display = "none";
    document.getSelection().removeAllRanges();
    render();
    openPanel("__editing__");
    setTimeout(function () { textarea && textarea.focus(); }, 240);
  }

  function openPanel(id) {
    if (id && id !== "__editing__") {
      editing = notes.filter(function (n) { return n.id === id; })[0] || null;
    } else if (id !== "__editing__") {
      editing = null;
    }
    render();
    panel.classList.add("open");
    document.body.classList.add("mn-open");
  }
  function closePanel() {
    panel.classList.remove("open");
    document.body.classList.remove("mn-open");
    editing = null;
    chip.style.display = "none";
  }

  function esc(t) {
    return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function render() {
    fab.textContent = notes.length ? String(notes.length) : "✎";
    fab.title = notes.length ? notes.length + " 則筆記" : "還沒有筆記";

    panel.innerHTML = "";
    var head = el("div", "display:flex;align-items:center;gap:10px;padding:16px 18px;border-bottom:1px solid #DFE3DA;flex:none;");
    head.appendChild(el("div", "font:700 19px 'Barlow Semi Condensed','Noto Sans TC',sans-serif;flex:1;", "我的筆記"));
    var cnt = el("span", MONO + ";font-size:15px;color:#6B756E;", String(notes.length));
    head.appendChild(cnt);
    var x = el("button", BTN + "padding:4px 10px;", "✕");
    x.addEventListener("click", closePanel);
    head.appendChild(x);
    panel.appendChild(head);

    var body = el("div", "flex:1;overflow-y:auto;padding:16px 18px;display:flex;flex-direction:column;gap:14px;-webkit-overflow-scrolling:touch;");
    panel.appendChild(body);

    if (editing) {
      body.appendChild(el("div", MONO + ";font-size:15px;color:#6B756E;letter-spacing:.06em;", "你框起來的文字"));
      quoteBox = el("blockquote", "margin:0;border-left:4px solid #2F6280;background:#FBFAF7;padding:12px 14px;" +
        "font-size:16px;line-height:1.6;color:#3A443E;max-height:170px;overflow-y:auto;border-radius:0 8px 8px 0;",
        esc(editing.quote));
      body.appendChild(quoteBox);
      if (editing.orphan) {
        body.appendChild(el("div", "border:1px solid #E6CDBE;background:#FBF1EA;border-radius:8px;padding:10px 12px;font-size:16px;color:#8A4520;",
          "原文已變動，這段在頁面上找不到了。筆記還留著，要刪要留你決定。"));
      }
      body.appendChild(el("div", MONO + ";font-size:15px;color:#6B756E;letter-spacing:.06em;margin-top:4px;", "我的備註"));
      textarea = el("textarea", null);
      textarea.value = editing.body || "";
      textarea.placeholder = "寫下你的想法、看不懂的地方、跟其他單元的關聯…";
      body.appendChild(textarea);

      var row = el("div", "display:flex;gap:8px;flex-wrap:wrap;");
      var bSave = el("button", BTN_P, "儲存");
      bSave.addEventListener("click", commit);
      row.appendChild(bSave);
      if (!editing.isNew) {
        var bDel = el("button", BTN + "color:#8A4520;border-color:#E6CDBE;", "刪除");
        bDel.addEventListener("click", function () {
          if (!confirm("刪掉這則筆記？")) return;
          unpaint(editing.id);
          notes = notes.filter(function (n) { return n.id !== editing.id; });
          save(); editing = null; render();
        });
        row.appendChild(bDel);
      }
      var bCancel = el("button", BTN, "取消");
      bCancel.addEventListener("click", function () { editing = null; render(); });
      row.appendChild(bCancel);
      body.appendChild(row);
      textarea.addEventListener("keydown", function (e) {
        if ((e.metaKey || e.ctrlKey) && e.key === "Enter") commit();
      });
    } else if (!notes.length) {
      body.appendChild(el("div", "font-size:17px;color:#4A554E;line-height:1.7;",
        "還沒有筆記。<br><br>在內文裡<strong>把文字選起來</strong>，選取下方會跳出「＋ 筆記」，點它就能寫。<br><br>" +
        "寫過的地方會變成<mark class=\"mn-hl\" style=\"cursor:default\">黃底</mark>，點一下就能回來看或改。"));
    } else {
      notes.slice().sort(function (a, b) { return a.created < b.created ? 1 : -1; }).forEach(function (n) {
        var it = el("div", null, "");
        it.className = "mn-item";
        it.dataset.mnUi = "1";
        it.innerHTML =
          '<div style="font-size:15px;color:#6B756E;border-left:3px solid ' + (n.orphan ? "#E6CDBE" : "#2F6280") +
          ';padding-left:9px;margin-bottom:7px;line-height:1.5;">' +
          esc(n.quote.length > 60 ? n.quote.slice(0, 60) + "…" : n.quote) +
          (n.orphan ? '<span style="color:#8A4520;"> · 原文已變動</span>' : "") + "</div>" +
          '<div style="font-size:17px;color:#1C2321;line-height:1.6;white-space:pre-wrap;">' +
          (esc(n.body) || '<span style="color:#6B756E;">（沒寫內容）</span>') + "</div>";
        it.addEventListener("click", function () {
          editing = n; render();
          var m = document.querySelector('mark.mn-hl[data-mn-id="' + n.id + '"]');
          if (m) m.scrollIntoView({ behavior: "smooth", block: "center" });
        });
        body.appendChild(it);
      });
    }

    var foot = el("div", "flex:none;border-top:1px solid #DFE3DA;padding:12px 18px;display:flex;gap:8px;flex-wrap:wrap;align-items:center;");
    var bOut = el("button", BTN + "padding:6px 12px;font-size:15px;", "匯出");
    bOut.addEventListener("click", exportNotes);
    var bIn = el("button", BTN + "padding:6px 12px;font-size:15px;", "匯入");
    bIn.addEventListener("click", importNotes);
    foot.appendChild(bOut); foot.appendChild(bIn);
    foot.appendChild(el("div", "font-size:15px;color:#6B756E;flex:1 1 100%;",
      "只存在這台裝置的瀏覽器裡，不會上傳，也不會進 Git。"));
    panel.appendChild(foot);
  }

  function commit() {
    editing.body = textarea.value;
    if (editing.isNew) {
      delete editing.isNew;
      notes.push(editing);
    }
    if (!save()) return;
    repaintAll();
    editing = null;
    render();
  }

  function exportNotes() {
    var blob = new Blob([JSON.stringify(notes, null, 2)], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = KEY.replace(/[:.]/g, "-") + ".json";
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
  }

  function importNotes() {
    var raw = prompt("把匯出的 JSON 貼進來（會跟現有筆記合併）：");
    if (!raw) return;
    try {
      var incoming = JSON.parse(raw);
      if (!Array.isArray(incoming)) throw 0;
      var have = {};
      notes.forEach(function (n) { have[n.id] = 1; });
      incoming.forEach(function (n) { if (n && n.id && !have[n.id]) notes.push(n); });
      if (save()) { repaintAll(); render(); }
    } catch (e) { alert("這段不是有效的筆記 JSON。"); }
  }

  /* ---------- 啟動 ---------- */
  function init() {
    root = document.querySelector("body > div");
    if (!root) return;
    load();
    buildUI();
    repaintAll();
    render();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else { init(); }
})();
