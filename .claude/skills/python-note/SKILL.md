---
name: python-note
description: 產生一份 Python 課程用的繁體中文 HTML 筆記（單一靜態頁面），套用「Python 筆記 - 變數與判斷式」建立的排版風格、色票、口語化用字規則，並可依需求加上練習題與大魔王綜合題。也處理「原始教材雜亂沒整理」的情況：讀一堆課堂筆記、線上課程文件、練習檔，判斷底層邏輯跟依賴順序，重新組織成筆記並生成對應練習題。當使用者要求「幫我做一份 XXX 的 Python 筆記」「照上次的風格做一份新單元」「幫這個 Python 主題出練習題」「幫我整理這些雜亂的課程筆記」時使用。
---

# Python 課程筆記產生器

這個 skill 是把 `project/variables-conditionals.html`（變數與判斷式）這份筆記在設計上、文字上反覆調校出來的規則，整理成可以重複套用到新主題的模板。目標是：**新主題的筆記，排版跟語氣要跟第一份一模一樣**，換內容不換風格。

## 使用時機

- 使用者要你做一份新的 Python 主題筆記（例如迴圈、函式、list）。
- 使用者要你在既有筆記後面加練習題、大魔王題。
- 使用者要你「照上次的風格」處理任何 Python 教學內容。
- 使用者丟一堆雜亂的課堂筆記、線上課程文件、練習檔給你，要你整理成筆記。

## 原始教材是雜亂筆記時：先整理再寫，不要照抄

使用者常常會直接丟一堆東西過來：手寫筆記轉出來的文字、上課投影片、好幾個 `.py` 練習檔、線上課程的講義。這些原始教材通常沒有順序、有重複示範、有錯字，甚至同一個觀念被講了兩三次。**不要照抄原始教材的順序或用字**，這份 skill 的工作是理解內容之後重新組織，不是排版搬家。

### 整理步驟

1. **全部讀完，列出清單**：把每一份原始教材都讀過一次，列出裡面出現的所有具體觀念、關鍵字、範例程式——是逐項列出來，不是寫摘要，避免漏掉細節。
2. **判斷底層邏輯，畫出依賴鏈**：對清單上每一個觀念問「要看懂這個，讀者要先知道什麼？」。答案決定單元的先後順序，也決定學習地圖要分成幾章。**這條依賴鏈才是分章分單元的依據，不是憑直覺分類**——跟「變數與判斷式」那份筆記把「存資料 → 做判斷 → 講結果」排成三章是同一個道理：後面的東西都要用到前面教過的東西。
3. **合併重複、去蕪存菁**：原始教材常常用兩三個不同檔案示範同一個觀念（例如三份練習檔都在教變數賦值），挑一個最能代表核心觀念、程式碼最乾淨的範例留下來，不用每份原始檔案的內容都塞進筆記。
4. **抓出「這樣寫會出錯」的段落，一定要留**：原始教材裡任何「老師特別強調」「這裡容易搞混」「這樣寫會出什麼錯」的內容，教學價值最高，一定要轉成對應單元的「容易踩的坑」，不能為了精簡而刪掉——這是這份筆記從第一版就重視的部分。
5. **辨認新舊寫法對照**：如果原始教材同時出現舊寫法跟新寫法（像 `%s`/`%d` 對 f-string），套用前面「舊寫法 vs 推薦寫法」的雙 file-tab 配色，不用另外寫文字強調「這是新的」。
6. **練習題從依賴鏈自然長出來，不要另外發明**：步驟 2 畫出來的依賴鏈，每個節點對應一題練習，難度照鏈的順序漸增；最後把整條鏈串起來出大魔王題。練習題的內容要能回頭對應到原始教材裡實際教過的東西，不要生出教材裡沒出現過的概念。

### 教材量大時，先給大綱讓使用者確認

如果原始教材份量大（好幾份文件、好幾週的課程），**不要直接生出一整份完整 HTML**。先把步驟 1～2 整理出來的「觀念清單＋建議的章節與單元順序」用條列文字回報給使用者確認，確認章節切法沒問題，再開始寫完整的 HTML。這樣使用者能在動手寫之前先發現「這個觀念放錯章」或「這裡漏了什麼」，比整份寫完才發現要重排省事很多。

## 什麼時候要先問，什麼時候直接做

**要做新筆記、或範圍大幅擴充時**，先確認這幾件事，一次問清楚，不要做到一半才發現方向錯了：

1. **主題範圍**：這次要涵蓋哪些具體觀念？如果使用者是丟雜亂原始教材過來，範圍就是「原始教材整理步驟」跑完之後那份觀念清單，跟使用者確認過章節切法再開始寫（見上一節）。
2. **要不要附練習題／大魔王題**：預設不主動加，除非使用者要求。
3. **練習題要不要附答案／執行結果**：預設**不附**，讓學生自己驗證；只有使用者明確說「我要答案」「幫我把答案更新上去」才補進去（這是變數與判斷式那份筆記實際發生過的流程：先給題目、學生自己寫、寫完才把解答內容整併進同一個檔案）。
4. **輸出檔名與位置**：沒說的話，比照 `project/` 目錄的命名習慣，用該單元的英文主題當檔名（例如 `project/loops.html`），不要用中文檔名。

**局部修改、修字、修 bug、加一兩個小區塊**這種範圍明確的小改動，不用每次都照上面四點問一輪——直接做，做完再回報改了哪裡。只有真的看不出使用者要什麼的時候才問。

## 整體骨架（由上到下）

一份筆記固定是這幾塊，順序不能變：

1. **Header**：課程小標籤（eyebrow）+ 大標題 + 一句話說明這份筆記的固定節奏 + meta 列（單元數／預估時間／來源檔案）
2. **學習地圖**：把整個主題拆成 2～4 個「章」，每章底下列出屬於它的單元編號，章跟章之間要有依賴順序（前面是後面的地基）
3. **逐章逐單元內容**：章節分隔線 → 該章底下每個單元一個 section
4. **附錄**（可選，內容多才需要）：常見錯誤訊息代表什麼、編輯器快捷鍵、名詞小辭典
5. **練習題**（使用者要求才加）：對應每個單元的練習 + 最後一題大魔王
6. **Footer**

## 每個「單元」內部固定節奏

這是整份筆記最核心的規則，來自使用者一開始的要求，**不能省略也不能打亂順序**：

**一句話重點 → 白話解釋 → 可以照打的程式 → 執行結果 → 容易踩的坑**

對應到 HTML 就是：

1. 單元標題列：編號徽章 + h2 標題
2. 一句話重點：粗體、左側色條、字級比正文大（這是整個單元的結論，先講結論再解釋）
3. 白話解釋（可省略，如果一句話重點已經夠清楚）
4. 範例程式碼框：檔名 tab + 語法上色的 `<pre>` + 執行結果列
5. 逐行解讀（可選）：用列表把程式碼裡容易誤解的那一兩行單獨拆出來講
6. 容易踩的坑（可選，但強烈建議每個會出錯的觀念都要有）：橘色警示框，講清楚會噴什麼錯誤訊息、為什麼
7. 動手試（可選）：虛線框，出一個小題目讓讀者自己改改看，**不要附答案**

不是每個單元都需要全部 7 項，但**順序不能打亂**——重點一定在解釋前面，程式一定在重點後面，輸出結果一定緊跟在程式碼後面。

## 設計系統（照抄，不要自己配色）

### 字型（一定要在 `<head>` 引入）

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@600;700&family=Source+Sans+3:wght@400;600;700&family=Noto+Sans+TC:wght@400;500;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

- 標題 / 章名：`'Barlow Semi Condensed','Noto Sans TC',sans-serif`，粗體 700
- 正文：`'Source Sans 3','Noto Sans TC',-apple-system,"PingFang TC","Microsoft JhengHei",sans-serif`
- 程式碼 / 標籤 / meta 文字：`'IBM Plex Mono',monospace`

### 字級（**全篇正文最小 16px，這是使用者的硬性要求，不能更小**）

| 用途 | 字級 |
|---|---|
| h1 大標題 | `clamp(34px,7vw,52px)` |
| 章節大標（CH1/CH2…） | 26px |
| 單元 h2 | 28px（練習題用 24px，附錄用 22px） |
| 一句話重點 | 20px，字重 600 |
| 正文 | 17px |
| mono 標籤 / meta / 程式碼 | 16px（不可再小） |

### 色票

```
紙白背景     #FBFAF7
卡片白       #FFFFFF
主文字       #1C2321
次要文字     #4A554E / #3A443E（正文深一點）/ #6B756E / #5B665F（mono 標籤）
邊框線       #DFE3DA（粗一點的分隔）/ #E7EAE3（細分隔）
主色藍       #2F6280（連結、色條、編號徽章底色）
淺灰底       #F3F4F1（file-tab 底、程式碼標籤底）
淺藍底       #EDF1F3（inline code 底）

容易踩的坑：邊框 #E6CDBE　背景 #FBF1EA　文字 #8A4520　inline code 底 #F1E2D8
動手試：虛線框 #B9C2BA
大魔王：邊框 #1C2321（2px 實線）　徽章底 #1C2321　徽章字 #FBFAF7

程式碼區塊：背景 #21252B　預設字 #ABB2BF
  字串 #98C379　數字 #D19A66　函式名 #E5A575　關鍵字（if/elif/else/and/or/f）#C678DD　註解 #5C6370
```

**「舊寫法 vs 推薦寫法」對照時的特殊標記**：如果一個單元要放兩段程式碼比較新舊寫法（像單元 09 的 `%d` 對 f-string），兩個 file-tab 用不同底色區分，不用另外寫文字強調：

- 舊寫法 tab：底色 `#F3F4F1`、圓點 `#9AA69E`（比主色淡的灰）、文字 `#5B665F`
- 推薦寫法 tab：底色 `#EDF1F3`、圓點 `#2F6280`（主色藍）、文字 `#2F6280`，file-tab 文字後面加「（推薦）」

## 可直接複製的 HTML 元件模板

以下每一塊都是從 `project/variables-conditionals.html` 原封不動抽出來的骨架，換掉裡面的文字內容跟顏色不用動。

### 頁面外殼

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Python 筆記 - {主題}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@600;700&family=Source+Sans+3:wght@400;600;700&family=Noto+Sans+TC:wght@400;500;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  *{box-sizing:border-box;}
  body{margin:0;background:#FBFAF7;color:#1C2321;font-family:'Source Sans 3','Noto Sans TC',-apple-system,"PingFang TC","Microsoft JhengHei",sans-serif;font-size:17px;line-height:1.75;-webkit-font-smoothing:antialiased;}
  a{color:#2F6280;text-decoration:none;}
  a:hover{color:#1C2321;}
  pre{margin:0;}
  h1,h2,h3,p,ul,ol{margin:0;}
</style>
</head>
<body>
<div style="max-width:880px;margin:0 auto;padding:40px 20px 80px;display:flex;flex-direction:column;gap:34px;">

  <!-- header / 學習地圖 / 章節 / 附錄 / 練習題 放這裡 -->

</div>
</body>
</html>
```

### Header

```html
<header style="display:flex;flex-direction:column;gap:12px;padding-bottom:26px;border-bottom:2px solid #1C2321;">
  <div style="font-family:'IBM Plex Mono',monospace;font-size:16px;letter-spacing:0.14em;text-transform:uppercase;color:#2F6280;font-weight:500;">Python 課程筆記 · 第 N 週</div>
  <h1 style="font-family:'Barlow Semi Condensed','Noto Sans TC',sans-serif;font-weight:700;font-size:clamp(34px,7vw,52px);line-height:1.12;letter-spacing:0.01em;text-wrap:balance;">{主題標題}</h1>
  <p style="font-size:19px;color:#4A554E;max-width:56ch;text-wrap:pretty;">從零開始也看得懂的版本。每個單元都是同一個順序：<strong style="color:#1C2321;">一句話重點 → 白話解釋 → 可以照打的程式 → 執行結果 → 容易踩的坑</strong>。不用背，看懂再動手打一次就好。</p>
  <div style="display:flex;flex-wrap:wrap;gap:10px 22px;font-family:'IBM Plex Mono',monospace;font-size:16px;color:#6B756E;margin-top:6px;">
    <span>N 個單元</span>
    <span>約 N 分鐘</span>
    <span>來源：{課堂練習檔名}</span>
  </div>
</header>
```

### 學習地圖（章卡片）

```html
<section style="background:#FFFFFF;border:1px solid #DFE3DA;border-radius:14px;padding:26px 24px;display:flex;flex-direction:column;gap:18px;">
  <h2 style="font-family:'Barlow Semi Condensed','Noto Sans TC',sans-serif;font-size:22px;font-weight:700;">先看這張學習地圖</h2>
  <p style="font-size:17px;color:#4A554E;">{一句話說明整個主題在回答什麼問題}。照順序讀，前面是後面的地基。</p>
  <div style="display:flex;flex-wrap:wrap;gap:14px;">
    <div style="flex:1 1 220px;min-width:0;border:1px solid #DFE3DA;border-top:4px solid #2F6280;border-radius:10px;padding:18px;display:flex;flex-direction:column;gap:8px;background:#FBFAF7;">
      <div style="font-family:'IBM Plex Mono',monospace;font-size:16px;color:#2F6280;">CH 1</div>
      <div style="font-family:'Barlow Semi Condensed','Noto Sans TC',sans-serif;font-size:21px;font-weight:700;">{章名，動詞短語}</div>
      <div style="font-size:16px;color:#4A554E;">{該章涵蓋的具體術語，逗號分隔}</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px;">
        <a href="#u1" style="font-family:'IBM Plex Mono',monospace;font-size:16px;border:1px solid #DFE3DA;border-radius:7px;padding:3px 9px;background:#FFFFFF;">01</a>
        <!-- 每個單元一個 -->
      </div>
    </div>
    <!-- 每章一張卡片，重複上面的結構 -->
  </div>
</section>
```

章名要跟現有兩份筆記同一套語氣：**動詞開頭的短句**，例如「把資料存起來」「讓程式做選擇」「把結果講清楚」。不要用「基礎觀念」「進階應用」這種空泛分類詞。

### 章節分隔線

```html
<div style="display:flex;align-items:baseline;gap:14px;">
  <div style="font-family:'Barlow Semi Condensed','Noto Sans TC',sans-serif;font-size:26px;font-weight:700;">CH 1 · {章名}</div>
  <div style="flex:1;height:1px;background:#DFE3DA;"></div>
</div>
```

### 單元 section（完整版，含全部可選區塊）

```html
<section id="u1" style="scroll-margin-top:20px;display:flex;flex-direction:column;gap:16px;">
  <div style="display:flex;align-items:baseline;gap:12px;flex-wrap:wrap;">
    <span style="font-family:'IBM Plex Mono',monospace;font-size:16px;color:#FFFFFF;background:#2F6280;border-radius:6px;padding:2px 9px;">01</span>
    <h2 style="font-family:'Barlow Semi Condensed','Noto Sans TC',sans-serif;font-size:28px;font-weight:700;">{單元標題}</h2>
  </div>

  <p style="font-size:20px;line-height:1.6;font-weight:600;border-left:4px solid #2F6280;padding-left:16px;text-wrap:pretty;">{一句話重點}</p>

  <p style="font-size:17px;color:#3A443E;text-wrap:pretty;">{白話解釋，可省略}</p>

  <div style="border:1px solid #DFE3DA;border-radius:11px;overflow:hidden;background:#FFFFFF;">
    <div style="display:flex;align-items:center;gap:9px;background:#F3F4F1;border-bottom:1px solid #DFE3DA;padding:9px 15px;font-family:'IBM Plex Mono',monospace;font-size:16px;color:#5B665F;">
      <span style="width:8px;height:8px;border-radius:50%;background:#2F6280;flex:none;"></span>{檔名或「參考範例」}
    </div>
    <pre style="background:#21252B;color:#ABB2BF;padding:20px 18px;overflow-x:auto;font-family:'IBM Plex Mono',monospace;font-size:16px;line-height:1.8;">{程式碼，關鍵字/字串/數字/函式/註解依色票上色}</pre>
    <div style="display:flex;gap:12px;padding:14px 18px;border-top:1px solid #DFE3DA;background:#FBFAF7;">
      <span style="font-family:'IBM Plex Mono',monospace;font-size:16px;color:#6B756E;flex:none;">輸出</span>
      <span style="font-family:'IBM Plex Mono',monospace;font-size:16px;color:#1C2321;">{實際執行結果，一字不漏，見下方「輸出必須驗算」}</span>
    </div>
  </div>

  <!-- 逐行解讀，可選 -->
  <ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:8px;font-size:17px;color:#3A443E;">
    <li style="display:flex;gap:12px;"><span style="font-family:'IBM Plex Mono',monospace;font-size:16px;color:#2F6280;flex:none;min-width:88px;">{那一行程式}</span><span>{白話說明}</span></li>
  </ul>

  <!-- 容易踩的坑，可選但建議每個會出錯的觀念都要有 -->
  <div style="border:1px solid #E6CDBE;background:#FBF1EA;border-radius:10px;padding:16px 18px;display:flex;flex-direction:column;gap:6px;">
    <div style="font-family:'IBM Plex Mono',monospace;font-size:16px;color:#8A4520;letter-spacing:0.06em;">容易踩的坑</div>
    <div style="font-size:17px;color:#3A443E;">{會出現的錯誤訊息 + 為什麼}</div>
  </div>

  <!-- 動手試，可選，不附答案 -->
  <div style="border:1px dashed #B9C2BA;border-radius:10px;padding:16px 18px;background:#FFFFFF;display:flex;flex-direction:column;gap:6px;">
    <div style="font-family:'IBM Plex Mono',monospace;font-size:16px;color:#6B756E;letter-spacing:0.06em;">動手試</div>
    <div style="font-size:17px;color:#3A443E;">{小題目}</div>
  </div>
</section>
```

行內 `<code>` 統一寫法：`<code style="font-family:'IBM Plex Mono',monospace;font-size:16px;background:#EDF1F3;border-radius:5px;padding:1px 6px;">內容</code>`（在容易踩的坑框裡，底色改用 `#F1E2D8`）。

### 附錄

子區塊分成兩類：**只要筆記裡有互動程式就一定要加的**，跟**內容夠多才加的**。

**一定要加（條件成立時）**

- **程式好像卡住了怎麼辦**：只要筆記裡出現 `input()`，或任何會停下來等使用者操作的程式，**這一塊就是必要的，不能省**。理由見下面「為什麼這塊不能省」。
- **怎麼讀錯誤訊息（traceback）**：只要筆記裡有任何一個單元會讓初學者跑出錯誤，就要加。

**內容夠多才加**

- **錯誤訊息代表什麼**：一列一個錯誤類型（mono、橘字 `#8A4520`、`min-width:118px`）+ 白話說明
- **編輯器快捷鍵**：flex-wrap 的 chip 列，每個 chip 左邊功能名稱、右邊按鍵（mono、`#EEF0EC` 底、`border-bottom-width:2px`）
- **名詞小辭典**：flex-wrap 卡片，每張卡片一個術語

版面結構直接照抄 `project/variables-conditionals.html` 第 366～402 行，只換文字。

#### 為什麼「程式好像卡住了怎麼辦」這塊不能省

實際帶初學者的經驗：**卡在「程式跑不起來」的時間，遠多於卡在語法的時間**，而且這種卡關最容易讓人放棄，因為看起來完全沒有線索。筆記如果只教語法、不教怎麼把程式跑起來，學生會卡在一個筆記完全沒提到的地方。

這一塊至少要寫進這幾件事（依實際使用的編輯器調整）：

| 症狀 | 真正的原因 | 怎麼處理 |
|---|---|---|
| 按了 Run Cell，`input()` 的提示沒出現、畫面像沒反應 | VS Code 用 `# %%` 跑 cell 時，輸入框跳在**編輯器最上方**（跟指令面板同一個位置），不在下面的 Interactive 面板 | 往螢幕最上方看，在那個小輸入框打字再按 Enter |
| 程式一直跳 `KeyboardInterrupt` | 有人按了 `Ctrl+C`。在終端機裡 `Ctrl+C` 永遠是「中斷正在跑的程式」 | 想複製終端機的文字，Mac 要用 `⌘C`，不是 `Ctrl+C` |
| 程式停住不動，游標在閃 | 它在等你輸入，這是正常的，不是當掉 | 打字、按 Enter |

寫法比照「容易踩的坑」那種白話語氣：先講「你看到的症狀」，再講「實際發生什麼事」，最後給一個具體動作。不要只寫「請檢查你的環境設定」這種沒有動作的話。

#### 「怎麼讀錯誤訊息」要教的三件事

附錄列出各種錯誤代表什麼還不夠，那只解決「這個字是什麼意思」，沒解決「我要去哪裡找問題」。至少要教：

1. **從最後一行看起**：最後一行是錯誤類型跟原因，先看它。
2. **`File "..." , line N` 就是出事的行號**：直接跳到那一行，不用整份程式從頭看。
3. **中間那幾行是呼叫過程**：初學階段可以先跳過。

搭配一個真的跑出來的 traceback 當範例（用程式碼框呈現），把「這一行是錯誤類型」「這一行是行號」標出來。範例一定要是實際執行出來的，不要自己編。

### 練習題（使用者要求才加）

```html
<div style="display:flex;align-items:baseline;gap:14px;">
  <div style="font-family:'Barlow Semi Condensed','Noto Sans TC',sans-serif;font-size:26px;font-weight:700;">練習題</div>
  <div style="flex:1;height:1px;background:#DFE3DA;"></div>
</div>

<p style="font-size:17px;color:#4A554E;text-wrap:pretty;">前 N 題各自對應前面一個單元，寫完再往下一題。最後一題把整份筆記的東西兜在一起，是這份筆記的大魔王題。</p>

<section style="display:flex;flex-direction:column;gap:16px;">
  <div style="display:flex;align-items:baseline;gap:12px;flex-wrap:wrap;">
    <span style="font-family:'IBM Plex Mono',monospace;font-size:16px;color:#FFFFFF;background:#2F6280;border-radius:6px;padding:2px 9px;">練習 1</span>
    <h2 style="font-family:'Barlow Semi Condensed','Noto Sans TC',sans-serif;font-size:24px;font-weight:700;">{練習題名}</h2>
  </div>
  <p style="font-size:17px;color:#3A443E;text-wrap:pretty;">{題目敘述}</p>
  <div style="display:flex;gap:12px;align-items:baseline;border:1px solid #DFE3DA;border-radius:9px;padding:12px 16px;background:#FFFFFF;">
    <span style="font-family:'IBM Plex Mono',monospace;font-size:16px;color:#6B756E;flex:none;">預期輸出</span>
    <span style="font-family:'IBM Plex Mono',monospace;font-size:16px;color:#1C2321;">{輸入 60 → 63.0}</span>
  </div>
</section>
```

#### 每一題都要有「預期輸出」，這跟給答案是兩回事

不附解答，但一定要附**一組具體的輸入對應的正確輸出**。理由很簡單：不給答案的用意是讓學生自己想，但如果連「怎麼知道自己寫對了」都沒有，學生寫完只能去問人，等於還是沒辦法自己走完一題。

- 給的是**驗證依據**（輸入 60，畫面應該出現 63.0），不是**解法**（不要寫出 `print(price * (1 + TAX))`）。
- 實際發生過的案例：練習題「一杯咖啡原價 60 元，稅率 5%，算出含稅價格」，學生寫成 `price * (1 - TAX)`，算出 57.0，程式能跑、不會報錯，所以完全沒發現算反了。題目旁邊如果有「輸入 60 → 63.0」，他自己就抓到了。
- 有多個分支的題目（像 if/elif 分級），至少給 2～3 組涵蓋不同分支的輸入輸出，包含邊界值（例如 90、89、60、59）。
- 這組預期輸出，**自己要先用 `python3` 跑過**，不能憑印象寫。

#### 題目敘述要把單位跟邊界寫死

- **單位要寫在題目裡**，而且要跟判斷式的數字對得起來。實際發生過的案例：題目說身高用公分，學生的程式卻問「Enter your height in m」，然後拿 `1.75` 去跟 `160` 比，永遠不成立，程式能跑但結果永遠錯。
- **邊界用「幾分以上」這種模糊講法會出事**，要明講是 `>=` 還是 `>`。寫「90 以上」的時候，旁邊的預期輸出要包含剛好 90 分這組，讓邊界沒有解釋空間。
- 題目裡如果有兩個條件，要照前面「and / or」那節的規則把括號關係寫清楚。

### 大魔王題

```html
<section style="border:2px solid #1C2321;border-radius:14px;padding:26px 24px;display:flex;flex-direction:column;gap:16px;background:#FFFFFF;">
  <div style="display:flex;align-items:baseline;gap:12px;flex-wrap:wrap;">
    <span style="font-family:'IBM Plex Mono',monospace;font-size:16px;color:#FBFAF7;background:#1C2321;border-radius:6px;padding:2px 9px;letter-spacing:0.06em;">大魔王</span>
    <h2 style="font-family:'Barlow Semi Condensed','Noto Sans TC',sans-serif;font-size:26px;font-weight:700;">{題目名稱}</h2>
  </div>
  <p style="font-size:17px;color:#3A443E;text-wrap:pretty;">寫一個小工具，一次用到這份筆記教的每一件事：</p>
  <div style="display:flex;flex-direction:column;gap:10px;">
    <div style="display:flex;gap:14px;align-items:baseline;border-bottom:1px solid #E7EAE3;padding-bottom:10px;">
      <span style="font-family:'IBM Plex Mono',monospace;font-size:16px;color:#2F6280;flex:none;">01</span>
      <span style="font-size:17px;">{步驟敘述}</span>
    </div>
    <!-- 每個步驟一個，最後一個不用 border-bottom -->
  </div>
  <div style="border:1px dashed #B9C2BA;border-radius:10px;padding:16px 18px;background:#FBFAF7;display:flex;flex-direction:column;gap:8px;">
    <div style="font-family:'IBM Plex Mono',monospace;font-size:16px;color:#6B756E;letter-spacing:0.06em;">大魔王提示</div>
    <div style="font-size:17px;color:#3A443E;">{提示 1，只點出容易忽略的地方，不給答案}</div>
  </div>
</section>
```

### Footer

```html
<footer style="text-align:center;color:#6B756E;font-size:16px;padding-top:16px;border-top:1px solid #DFE3DA;">Python 學習筆記 · {主題} · 持續更新</footer>
```

## 文字風格規則（這是使用者反覆糾正過的重點，優先度最高）

### 語言與語氣

- 全篇繁體中文，正文口語化、生活化，**不用成語、不用文言文、不用繞口的字**。
- 直接講事實，不用討好、不用客套、不刻意堆好聽話。
- 目標讀者是完全沒學過 Python 的人，寫法要讓國小高年級學生也看得懂——但這不代表可以不精確，內容還是要百分之百正確，只是用字要白話。

### 不要用贅字副詞

以下這些字十之八九是填充用的贅字，寫完檢查一次，能刪就刪：**其實、真正、自動（在講「不需要額外動作」之外的語境）、只是、還是（當「仍然」用時）、也就是（當「就是」的贅詞用時）、刻意、基本上、事實上**。

例外：像「才」「只」「就」「永遠」這種**語法上必要**、拿掉會改變意思的字不用刪，例如「才能放在 if 後面」「input() 永遠回傳字串」這種是精確描述，不是贅字。判斷標準：**刪掉這個字，句子的事實內容有沒有改變？沒改變就是贅字，改變了就是必要語法**。

### 不要用抽象包裝去代替現成的具體術語

如果一個概念已經有具體的函式名稱、關鍵字、運算子，就直接講那個名字，不要換成模糊的白話包裝。

- ❌「使用者輸入永遠是字串」　✅「`input()` 回傳的永遠是字串」
- ❌「輸入轉型」　✅「`input()` 轉型」

判斷標準：如果那個單元的程式碼裡已經明明白白寫著 `input()`，標題卻繞著講「使用者輸入」，讀者反而要在腦中多轉一手。

### 範例程式的變數命名要守蛇式命名

單元 03 教了蛇式命名（全小寫、底線連接），後面所有範例程式的變數名稱都要照做：`student_name`、`set_num`、`other_word`，不要用 `StudentName`、`setNum`、`Other_Word` 這種大寫開頭或駝峰式。唯一例外是刻意示範「全大寫＝常數慣例」的那個單元（`TAX_RATE`、`MAX_SCORE`）。

### and / or：先判斷要不要混用，混用就一定要加括號

兩個條件放在一起之前，先問一句：**這兩個結果會不會同時成立？**

- **會同時成立、各自是獨立的結論**（像單元 07 的「通過」跟「加分認定」，一個人可以兩個都拿到）：**拆成兩個獨立的 `if`**，不要塞進同一個 `and`/`or` 判斷式，也不要用 `elif`（`elif` 只會執行一個分支，會漏掉本來該同時成立的情況）。
- **是同一個結論的複合條件**（像大魔王題的獎學金資格，只有「符合」或「不符合」兩種結果）：可以合併寫成一個 `if`，但只要同時出現 `and` 又出現 `or`，**一定要手動加括號**，即使 Python 的優先順序（and 比 or 先算）剛好符合你要的邏輯，也要加，讓人一眼看懂，不用去記誰先算。

中文敘述句也是同樣的邏輯：只要同一句話同時出現「而且」「或者」，一定要用引號或頓號把兩個子句物理隔開，不能靠讀者自己猜優先順序。

- ❌「分數 >= 85，或是分數 >= 70 而且出席次數 >= 15」（歧義，看不出括號在哪）
- ✅「分數 >= 85 的人，或是『分數 >= 70 而且出席次數 >= 15』的人」
- 程式碼：`if num >= 85 or (num >= 70 and setNum >= 15):`

## 輸出結果一定要親自驗算，不能憑印象寫

這是最容易出錯、也最容易被使用者抓到的地方。**每一段範例程式碼寫完後，一定要實際執行（用 Bash 跑 `python3`）確認輸出**，不能憑感覺寫「應該是這樣」。特別注意：

1. **程式裡如果有多個 `print()`，輸出要全部列出來，不能只列最後一行。** 之前發生過的真實案例：程式碼裡 `input()` 之後緊接著 `print(a)`，會先把輸入值印出來，但筆記寫的「輸出」欄位只列了後面 if/elif 判斷的結果，漏了那行 echo——這種疏漏使用者一定會抓到。
2. **float 運算要注意精度問題**，例如 `0.1 + 0.2` 印出來是 `0.30000000000000004`，不是乾淨的 `0.3`；筆記裡任何牽涉小數的範例，先跑過一次再抄輸出結果。
3. **型別要跟操作對得起來**：`%d` 配字串會炸 `TypeError`，f-string 卻不會擋——這種行為差異如果筆記裡有教到，一定要先實際跑出錯誤訊息再寫進去，不要憑空編錯誤訊息文字。

## 生成完成後的檢查清單

生成或修改完一份筆記，依序做完這幾件事再交給使用者：

1. **標籤開合數量核對**：用這段指令檢查所有標籤開合是否一致（div/section/p/h1/h2/pre/span/code/ul/li 等）：
   ```bash
   python3 - <<'PYEOF'
   import re
   content = open("目標檔案路徑", encoding="utf-8").read()
   for tag in ["div","section","header","footer","ul","li","p","h1","h2","pre","span","code"]:
       opens = len(re.findall(rf'<{tag}(\s[^>]*)?>', content))
       closes = len(re.findall(rf'</{tag}>', content))
       print(f"{tag}: {opens}/{closes}", "OK" if opens==closes else "MISMATCH")
   PYEOF
   ```
2. **每段範例程式碼實際跑一次**，核對「輸出」欄位文字跟終端機印出的一模一樣（包含空格、換行順序）。
3. **文字風格自我審查**：搜尋一遍前面列的贅字清單、抽象包裝詞，能刪就刪、能換成具體術語就換。
4. **and/or 語句加括號**：中文敘述跟程式碼都檢查一次。
5. **變數命名檢查**：範例程式裡是不是都乖乖用蛇式命名（除了刻意示範常數的那一段）。
6. **筆記裡有 `input()` 嗎**：有的話，附錄一定要有「程式好像卡住了怎麼辦」這塊，沒有就補上。
7. **練習題每一題都有「預期輸出」嗎**：而且那組輸出是自己跑過的，不是憑印象寫的。有分支的題目要涵蓋邊界值。
8. **題目敘述的單位跟邊界寫死了嗎**：單位有沒有跟判斷式的數字對得起來、`>=` 跟 `>` 有沒有講清楚。
9. 全部確認過，才把檔案交給使用者，並且明講「還沒 commit，要不要 commit」——**不要自己主動 commit 或 push**，除非使用者明確要求。

## 批改學生貼上來的程式碼

**這件事的發生頻率比產生新筆記還高**——學生寫完一題就會貼過來問「這樣對嗎」「我錯在哪」。流程固定下來，回覆才不會這次分三級、下次全部混在一起講。

### 批改流程

1. **先回去看題目要求**：對照那一題的題目敘述跟預期輸出，確認學生解的是不是同一題（實際發生過：題目給的是固定原價 60 元，學生改成用 `input()` 問價格）。
2. **實際跑起來，不要用讀的**：用 Bash 跑 `python3`。程式有 `input()` 的話，把輸入值改成固定變數再跑（沙箱不能互動）。**至少跑 3 組涵蓋不同分支的測試資料**，包含邊界值。
3. **把測試結果列成表格**，學生一眼就看得出哪組壞了：

   | 輸入 | 預期 | 實際 |
   |---|---|---|
   | 95 分 / 出席 5 | 優、符合資格 | 優、符合資格 |
   | 72 分 / 出席 10 | 乙、不符合 | 乙、不符合 |

4. **問題照三級分類回報**（見下一段）。
5. **每個問題都指回筆記的單元編號**。

### 問題分三級，不要混在一起講

| 等級 | 定義 | 語氣 |
|---|---|---|
| **會當掉** | 程式跑不完，會丟例外 | 「這個會讓程式直接壞掉」，放在最前面，先修這個 |
| **邏輯錯** | 跑得完，但結果不對或不符合題目要求（漏掉某個分支、條件順序錯、單位對不上、該拆成兩個 `if` 卻寫成 `elif`） | 「程式跑得動，但結果不對」，附上會出錯的具體輸入值 |
| **風格不符** | 跑得動、結果也對，只是不符合筆記教的慣例（變數沒用蛇式命名、`and`/`or` 沒加括號、多餘空白） | **明講「不算錯，只是跟筆記教的習慣不一致」**，讓學生自己決定要不要改 |

分級要講清楚，不要把「會當掉」跟「命名習慣」用同樣的語氣列成同一串清單，學生會不知道哪個急、哪個可以放著。

### 每個問題都要指回筆記的單元編號

講完問題之後，補一句「這跟單元 07 講的是同一件事」。這是把**筆記 → 練習 → 批改 → 回筆記**串成閉環的關鍵：學生看到錯誤能回去複習對應那一段，而不是只記得「這次被改了什麼」。

如果學生錯的觀念**筆記裡根本沒教到**，那是筆記的缺口，不是學生的問題——要回頭把它補進筆記（通常補成一個「容易踩的坑」）。實際發生過的案例：學生拿一個已經變成文字的變數去跟數字比大小，噴 `TypeError`；筆記附錄原本只寫「TypeError：字串和數字直接相加」，沒提到比大小也會觸發，這就是缺口。

### 不要做的事

- **不要憑讀程式碼判斷結果**，一定要真的跑過再下結論。
- **不要只說「這裡邏輯有問題」**，要具體到哪一行、什麼型別、什麼錯誤訊息、哪一組輸入會壞。
- **不要直接把改好的完整程式碼丟給學生**，除非他明確要。預設是指出問題在哪、給修改方向，讓他自己改完再貼一次。
- **不要為了鼓勵而說「寫得很好」**。對就講對、哪裡對；錯就講錯、為什麼錯。學生改對了就明講「這題過關」，不要含糊帶過。

## 跟使用者的互動習慣（延續這份筆記已經建立的默契）

- 練習題預設不附答案；使用者明確說要更新答案時，才把答案或執行結果整併進同一份筆記檔案。
- 修改既有筆記時，用 Edit 針對段落做局部修改，不要整份重寫，方便使用者看出改了哪裡。
- 每次改完都做上面的檢查清單，不要交付沒驗算過的內容。
- 使用者問到跟執行環境有關的問題（程式沒反應、跳出沒看過的錯誤、編輯器操作），**先確認他是用什麼方式執行的**再回答，不要假設。同一段程式在終端機、Run Cell、Jupyter 裡的行為不一樣，答案也不一樣。
