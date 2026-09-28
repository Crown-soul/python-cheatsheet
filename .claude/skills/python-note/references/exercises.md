# 練習題、小專案、跨章專案頁模板

從 `design-system.md` 拆出來的元件模板。這份不是自給自足的，下面幾樣要回 `design-system.md` 查：

- `{M}` / `{T}` 簡寫的展開：開頭「模板裡的兩個簡寫」
- 練習題、小專案前面的分隔線：「章節分隔線」
- 題目裡的程式框（file-tab + pre + 輸出列）：「單元 section」裡的範例程式碼框。幫既有筆記加題目時，直接照同一份筆記裡現成的程式框抄最快，也最不會跟原本的樣式對不上
- 色票、字級：「設計系統」

## 練習題（預設就要有）

下面這個是「寫寫看」題型的模板，另外兩種題型的模板接在後面。三種題型共用同一個「練習 N」編號序列，徽章上不標題型，題型寫在 h2 標題前面（例如「預測輸出：range 倒著走」）。

```html
<section style="display:flex;flex-direction:column;gap:16px;">
  <div style="display:flex;align-items:baseline;gap:12px;flex-wrap:wrap;">
    <span style="{M};font-size:16px;color:#FFFFFF;background:#2F6280;border-radius:6px;padding:2px 9px;">練習 1</span>
    <h2 style="{T};font-size:24px;font-weight:700;">{練習題名}</h2>
  </div>
  <p style="font-size:17px;color:#3A443E;text-wrap:pretty;">{題目敘述}</p>
  <div style="display:flex;gap:12px;align-items:baseline;border:1px solid #DFE3DA;border-radius:9px;padding:12px 16px;background:#FFFFFF;">
    <span style="{M};font-size:16px;color:#6B756E;flex:none;">預期輸出</span>
    <span style="{M};font-size:16px;color:#1C2321;">{輸入 60 → 63.0}</span>
  </div>
</section>
```

每一題「預期輸出」是不是解法、要不要涵蓋邊界值、題目單位要怎麼寫死，規則見 `writing-style.md`「練習題」一節。

### 預測輸出題

程式框**沒有輸出列**，換成一個虛線提示框。

```html
<section style="display:flex;flex-direction:column;gap:16px;">
  <div style="display:flex;align-items:baseline;gap:12px;flex-wrap:wrap;">
    <span style="{M};font-size:16px;color:#FFFFFF;background:#2F6280;border-radius:6px;padding:2px 9px;">練習 N</span>
    <h2 style="{T};font-size:24px;font-weight:700;">預測輸出：{題名}</h2>
  </div>
  <div style="border:1px solid #DFE3DA;border-radius:11px;overflow:hidden;background:#FFFFFF;">
    <div style="display:flex;align-items:center;gap:9px;background:#F3F4F1;border-bottom:1px solid #DFE3DA;padding:9px 15px;{M};font-size:16px;color:#5B665F;">
      <span style="width:8px;height:8px;border-radius:50%;background:#2F6280;flex:none;"></span>guess.py
    </div>
    <pre style="background:#21252B;color:#ABB2BF;padding:20px 18px;overflow-x:auto;{M};font-size:16px;line-height:1.8;">{程式，依色票上色}</pre>
  </div>
  <div style="border:1px dashed #B9C2BA;border-radius:10px;padding:16px 18px;background:#FFFFFF;display:flex;flex-direction:column;gap:6px;">
    <div style="{M};font-size:16px;color:#6B756E;letter-spacing:0.06em;">先猜再跑</div>
    <div style="font-size:17px;color:#3A443E;">不開電腦，把你猜的輸出寫下來，再貼進編輯器執行對照。{猜錯的話回單元 NN}</div>
  </div>
</section>
```

### 找錯改錯題

放兩個輸出：程式框的輸出列是**它現在跑出來的錯誤結果**（標籤寫「現在跑出來」），題目下面的「預期輸出」是改對之後應該出現的。

```html
<section style="display:flex;flex-direction:column;gap:16px;">
  <div style="display:flex;align-items:baseline;gap:12px;flex-wrap:wrap;">
    <span style="{M};font-size:16px;color:#FFFFFF;background:#2F6280;border-radius:6px;padding:2px 9px;">練習 N</span>
    <h2 style="{T};font-size:24px;font-weight:700;">找錯改錯：{題名}</h2>
  </div>
  <p style="font-size:17px;color:#3A443E;text-wrap:pretty;">{這段程式本來要做什麼}。它跑得出結果，但結果不對，找出錯在哪裡並改好。</p>
  <div style="border:1px solid #DFE3DA;border-radius:11px;overflow:hidden;background:#FFFFFF;">
    <div style="display:flex;align-items:center;gap:9px;background:#F3F4F1;border-bottom:1px solid #DFE3DA;padding:9px 15px;{M};font-size:16px;color:#5B665F;">
      <span style="width:8px;height:8px;border-radius:50%;background:#2F6280;flex:none;"></span>{原始檔名，例如 座標.py}
    </div>
    <pre style="background:#21252B;color:#ABB2BF;padding:20px 18px;overflow-x:auto;{M};font-size:16px;line-height:1.8;">{有 bug 的程式}</pre>
    <div style="display:flex;gap:12px;padding:14px 18px;border-top:1px solid #DFE3DA;background:#FBFAF7;">
      <span style="{M};font-size:16px;color:#8A4520;flex:none;">現在跑出來</span>
      <span style="{M};font-size:16px;color:#1C2321;">{實際跑出來的錯誤結果或 traceback}</span>
    </div>
  </div>
  <div style="display:flex;gap:12px;align-items:baseline;border:1px solid #DFE3DA;border-radius:9px;padding:12px 16px;background:#FFFFFF;">
    <span style="{M};font-size:16px;color:#6B756E;flex:none;">預期輸出</span>
    <span style="{M};font-size:16px;color:#1C2321;">{改對之後應該出現的}</span>
  </div>
</section>
```

素材來自使用者自己的練習檔時，file-tab 直接用原始檔名，並在題目敘述寫「這是我初學時寫的 `檔名`」。筆記是公開的，寫「你自己寫的」別的讀者會看不懂；用「我」講真實經驗，是 `writing-style.md` 允許「我」出現的情況之一。

## 小專案

一份筆記一個，放在練習題後面，前面加一條「小專案」章節分隔線。舊版筆記裡的「大魔王」是同一個東西，不用改名。題目要是**能拿來用的小程式**，寫法規則見 `writing-style.md`「小專案與跨章專案」。

```html
<section style="border:2px solid #1C2321;border-radius:14px;padding:26px 24px;display:flex;flex-direction:column;gap:16px;background:#FFFFFF;">
  <div style="display:flex;align-items:baseline;gap:12px;flex-wrap:wrap;">
    <span style="{M};font-size:16px;color:#FBFAF7;background:#1C2321;border-radius:6px;padding:2px 9px;letter-spacing:0.06em;">小專案</span>
    <h2 style="{T};font-size:26px;font-weight:700;">{題目名稱}</h2>
  </div>
  <p style="font-size:17px;color:#3A443E;text-wrap:pretty;">{這個小程式能拿來做什麼}。一步一步來，每一步都先跑得起來再做下一步：</p>
  <div style="display:flex;flex-direction:column;gap:10px;">
    <div style="display:flex;gap:14px;align-items:baseline;border-bottom:1px solid #E7EAE3;padding-bottom:10px;">
      <span style="{M};font-size:16px;color:#2F6280;flex:none;">01</span>
      <span style="font-size:17px;">{步驟敘述}</span>
    </div>
    <!-- 每個步驟一個，最後一個不用 border-bottom -->
  </div>
  <div style="border:1px dashed #B9C2BA;border-radius:10px;padding:16px 18px;background:#FBFAF7;display:flex;flex-direction:column;gap:8px;">
    <div style="{M};font-size:16px;color:#6B756E;letter-spacing:0.06em;">提示</div>
    <div style="font-size:17px;color:#3A443E;">{提示 1，只點出容易忽略的地方，不給答案}</div>
  </div>
  <div style="display:flex;gap:12px;align-items:baseline;border:1px solid #DFE3DA;border-radius:9px;padding:12px 16px;background:#FFFFFF;">
    <span style="{M};font-size:16px;color:#6B756E;flex:none;">預期輸出</span>
    <span style="{M};font-size:16px;color:#1C2321;">{一組完整的輸入 → 畫面，用 &lt;br&gt; 分行}</span>
  </div>
</section>
```

## 參考解答（使用者明確要答案才加）

放在每一題的最後一個元素（小專案放在「預期輸出」後面）。用 `<details>` 摺疊，讓學生寫完才點開，不會一打開頁面就看到答案。

```html
<details style="border:1px solid #DFE3DA;border-radius:10px;background:#FFFFFF;">
  <summary style="cursor:pointer;padding:12px 18px;{M};font-size:16px;color:#2F6280;">參考解答（先自己寫，再點開對照）</summary>
  <div style="padding:4px 18px 18px;display:flex;flex-direction:column;gap:14px;">
    <!-- 單元 section 裡的「範例程式碼框」：file-tab + 上色的 pre + 輸出列 -->
    <!-- 一兩句說明：為什麼這樣寫、寫反了會怎樣 -->
  </div>
</details>
```

- 解答裡的程式碼框跟單元裡的完全同一套（色票、file-tab、輸出列）。Python 的 file-tab 用 `1.py`、`boss.py` 這種檔名，Git 用「終端機」。
- 有多組輸入的題目，「輸出」列每組一行，寫成「輸入 → 畫面」，用 `<br>` 分行；至少涵蓋每個分支跟邊界值。
- 說明只講一件事：容易寫錯的地方（實際例子：等第判斷順序倒過來、兩個結果可以同時成立卻用了 `elif`）。
- 解答裡的程式、指令、輸出都要實際跑過。Git 的解答直接貼真實終端機輸出，路徑換成佔位（`/Users/你/Desktop/demo/.git/`、`https://github.com/你/demo.git`）。

## 跨章專案頁（獨立檔案）

大約每 2～4 份筆記一個，檔名 `project-NN-{英文主題}.html`（例如 `project-01-grade-stats.html`），放根目錄。題目怎麼排見 `roadmap.md`「跨章專案怎麼排」。

骨架（由上到下），元件沿用這份跟 `design-system.md` 的：

1. **Header**：eyebrow 寫「跨章專案 NN」，meta 列寫「路線圖第 PN 站」跟預估時間，右上角「← 目錄」
2. **會用到哪些筆記**：簡易對照表，一列一份筆記：筆記名稱（連到該檔案）｜這個專案用到它的哪幾個單元
3. **這個程式要做什麼**：一段話 + 一組完整的執行畫面（輸入 → 輸出），就是最後的預期輸出
4. **分階段做**：每個階段一個小專案元件（黑框），徽章寫「階段 1」「階段 2」……第 1 階段是最小能跑的版本，每個階段都有自己的預期輸出跟提示
5. **之後能拿來做什麼**：同單元裡的淺藍框，講這個專案再往資料分析／小工具／網頁 API 延伸會長什麼樣子
6. **自我檢核清單**
7. **Footer**、`</body>` 前加 `annotate.js`
