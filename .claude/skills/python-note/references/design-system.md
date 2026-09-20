# 排版骨架、設計系統、HTML 元件模板

這份文件是「怎麼把內容排成一份筆記」的所有規格。文字內容怎麼寫（用字、命名、驗算規則）在 `writing-style.md`，這裡只管排版跟 HTML。

## 整體骨架（由上到下）

一份筆記固定是這幾塊，順序不能變：

1. **Header**：課程小標籤（eyebrow）+ 大標題 + 一句話說明這份筆記的固定節奏 + meta 列（單元數／預估時間／來源檔案）
2. **學習地圖**：把整個主題拆成 2～4 個「章」，每章底下列出屬於它的單元編號，章跟章之間要有依賴順序（前面是後面的地基）
3. **逐章逐單元內容**：章節分隔線 → 該章底下每個單元一個 section
4. **附錄**（條件成立才加，見下方「附錄」一節）：程式卡住怎麼辦、怎麼讀錯誤訊息、常見錯誤訊息代表什麼、編輯器快捷鍵、名詞小辭典
5. **練習題**（使用者要求才加）：對應每個單元的練習 + 最後一題大魔王
6. **Footer**

## 每個「單元」內部固定節奏

這是整份筆記最核心的規則，**不能省略也不能打亂順序**：

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
動手試 / 大魔王提示：虛線框 #B9C2BA（動手試背景 #FFFFFF，大魔王提示背景 #FBFAF7）
大魔王：邊框 #1C2321（2px 實線）　徽章底 #1C2321　徽章字 #FBFAF7

程式碼區塊：背景 #21252B　預設字 #ABB2BF
  字串 #98C379　數字 #D19A66　函式名 #E5A575　關鍵字（if/elif/else/and/or/f）#C678DD　註解 #5C6370
  終端機指令的 $ 提示字元用 #5C6370
```

**「舊寫法 vs 推薦寫法」對照時的特殊標記**：如果一個單元要放兩段程式碼比較新舊寫法（像 f-string 對 `%d`），兩個 file-tab 用不同底色區分，不用另外寫文字強調：

- 舊寫法 tab：底色 `#F3F4F1`、圓點 `#9AA69E`（比主色淡的灰）、文字 `#5B665F`
- 推薦寫法 tab：底色 `#EDF1F3`、圓點 `#2F6280`（主色藍）、文字 `#2F6280`，file-tab 文字後面加「（推薦）」

## 可直接複製的 HTML 元件模板

以下每一塊都是從既有筆記原封不動抽出來的骨架，換掉裡面的文字內容跟顏色不用動。

### 頁面外殼

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{科目} 筆記 - {主題}</title>
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

### Header（含回目錄連結——只要目錄頁存在就要加）

```html
<header style="display:flex;flex-direction:column;gap:12px;padding-bottom:26px;border-bottom:2px solid #1C2321;">
  <div style="display:flex;align-items:baseline;justify-content:space-between;gap:16px;flex-wrap:wrap;">
    <div style="font-family:'IBM Plex Mono',monospace;font-size:16px;letter-spacing:0.14em;text-transform:uppercase;color:#2F6280;font-weight:500;">{科目} 課程筆記 · 第 N 週</div>
    <a href="index.html" style="font-family:'IBM Plex Mono',monospace;font-size:16px;flex:none;">← 目錄</a>
  </div>
  <h1 style="font-family:'Barlow Semi Condensed','Noto Sans TC',sans-serif;font-weight:700;font-size:clamp(34px,7vw,52px);line-height:1.12;letter-spacing:0.01em;text-wrap:balance;">{主題標題}</h1>
  <p style="font-size:19px;color:#4A554E;max-width:56ch;text-wrap:pretty;">從零開始也看得懂的版本。每個單元都是同一個順序：<strong style="color:#1C2321;">一句話重點 → 白話解釋 → 可以照打的程式 → 執行結果 → 容易踩的坑</strong>。不用背，看懂再動手打一次就好。</p>
  <div style="display:flex;flex-wrap:wrap;gap:10px 22px;font-family:'IBM Plex Mono',monospace;font-size:16px;color:#6B756E;margin-top:6px;">
    <span>N 個單元</span>
    <span>約 N 分鐘</span>
    <span>範圍：{涵蓋跟不涵蓋什麼}</span>
  </div>
</header>
```

若沒有目錄頁，拿掉 `← 目錄` 那個 `<a>`，`eyebrow` 那個 `<div>` 就不用包 flex 外層，直接放。

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

章名要跟現有筆記同一套語氣：**動詞開頭的短句**，例如「把資料存起來」「讓程式做選擇」「建立一個倉庫」。不要用「基礎觀念」「進階應用」這種空泛分類詞。

### 章節分隔線

```html
<div style="display:flex;align-items:baseline;gap:14px;">
  <div style="font-family:'Barlow Semi Condensed','Noto Sans TC',sans-serif;font-size:26px;font-weight:700;">CH 1 · {章名}</div>
  <div style="flex:1;height:1px;background:#DFE3DA;"></div>
</div>
```

同一個分隔線元件也用在附錄（標題改「附錄」）跟練習題（標題改「練習題」）之前。

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
      <span style="width:8px;height:8px;border-radius:50%;background:#2F6280;flex:none;"></span>{檔名 / 「參考範例」/ 「終端機」}
    </div>
    <pre style="background:#21252B;color:#ABB2BF;padding:20px 18px;overflow-x:auto;font-family:'IBM Plex Mono',monospace;font-size:16px;line-height:1.8;">{程式碼或終端機內容，依色票上色}</pre>
    <div style="display:flex;gap:12px;padding:14px 18px;border-top:1px solid #DFE3DA;background:#FBFAF7;">
      <span style="font-family:'IBM Plex Mono',monospace;font-size:16px;color:#6B756E;flex:none;">輸出</span>
      <span style="font-family:'IBM Plex Mono',monospace;font-size:16px;color:#1C2321;">{實際執行結果，一字不漏，見 writing-style.md「輸出結果一定要親自驗算」}</span>
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

行內 `<code>` 統一寫法：`<code style="font-family:'IBM Plex Mono',monospace;font-size:16px;background:#EDF1F3;border-radius:5px;padding:1px 6px;">內容</code>`（在容易踩的坑框裡，底色改用 `#F1E2D8`）。**寫完一定要用這個 `<code>` 標籤，不要用 Markdown 的反引號 `` ` ``——HTML 裡反引號不會被轉譯，會直接顯示在頁面上。**

### 附錄

子區塊分成兩類：**只要筆記裡有互動程式就一定要加的**，跟**內容夠多才加的**。

**一定要加（條件成立時）**

- **程式好像卡住了怎麼辦**：只要筆記裡出現 `input()`，或任何會停下來等使用者操作的程式，**這一塊就是必要的，不能省**。理由跟至少要涵蓋的症狀，見 `writing-style.md`「程式好像卡住了怎麼辦」。
- **怎麼讀錯誤訊息（traceback）**：只要筆記裡有任何一個單元會讓初學者跑出錯誤，就要加，規則同上一份文件。

**內容夠多才加**

- **錯誤訊息代表什麼**：一列一個錯誤類型（mono、橘字 `#8A4520`、`min-width:130px`）+ 白話說明
- **編輯器快捷鍵**：flex-wrap 的 chip 列，每個 chip 左邊功能名稱、右邊按鍵（mono、`#EEF0EC` 底、`border-bottom-width:2px`）
- **名詞小辭典**：flex-wrap 卡片，每張卡片一個術語

版面結構直接照抄 `variables-conditionals.html` 或 `git-basics.html` 裡對應的區塊，只換文字。

### 練習題（使用者要求才加）

```html
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

每一題「預期輸出」是不是解法、要不要涵蓋邊界值、題目單位要怎麼寫死，規則見 `writing-style.md`「練習題」一節。

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
<footer style="text-align:center;color:#6B756E;font-size:16px;padding-top:16px;border-top:1px solid #DFE3DA;">{科目} 學習筆記 · {主題} · 持續更新</footer>
```

## 目錄頁（如果這是這個科目的第一份筆記，要順便建一個）

目錄頁放在專案根目錄的 `index.html`，收錄所有已經產生的筆記，依科目分區塊（例如「Python」「Git」）。每個科目一個章節分隔線，底下是連到各筆記的卡片（`class="entry"`，border-left 4px `#2F6280`，內容含徽章、標題、一句話說明、meta 列）。新增一份筆記時，記得同步在目錄加一張卡片，並在該筆記的 header 加回目錄的連結。目錄頁本身的完整範例參考 `index.html`。
