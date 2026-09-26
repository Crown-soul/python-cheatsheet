# 課程筆記

上課筆記做成的靜態網頁，每份筆記固定同一個節奏：**一句話重點 → 白話解釋 → 可以照打的程式 → 執行結果 → 容易踩的坑**。

線上版（**建議從這裡讀**）：https://crown-soul.github.io/python-cheatsheet/

本機入口：[`index.html`](index.html)

| 檔案 | 內容 |
|---|---|
| `index.html` | 目錄頁，含 Python 學習路線圖（每一站對應哪堂課、做完了沒） |
| `variables-conditionals.html` | Python · 變數與判斷式（9 單元） |
| `loops.html` | Python · 迴圈（26 單元） |
| `git-basics.html` | Git · 基本流程（14 單元） |
| `cheatsheet.html` | Python 小抄、環境問題排解 |
| `practice/` | 課堂練習的原始 `.py` 檔，見 [`practice/README.md`](practice/README.md) |
| `annotate.js` | 選字做筆記的功能，三份筆記共用 |
| `.claude/skills/python-note/` | 產生筆記用的 skill |


## 選字做筆記

三份筆記（變數與判斷式、迴圈、Git）都能自己加註記：

1. 在內文裡把文字選起來，下方會跳出「＋ 筆記」
2. 點它，右邊滑出面板，上面是你框起來的原文，下面打你的備註
3. 按儲存。那段文字會變成黃底，點一下就能回來看或改
4. 右下角的圓鈕顯示目前有幾則，點開可以看全部

桌機的面板從右邊滑出，同時把內文推開，不會蓋住正在讀的字；手機從底部拉起，佔螢幕約六成。關起來的時候版面跟原本一模一樣。

**筆記存在你自己的瀏覽器裡（localStorage），不會上傳、不會進 Git、換裝置看不到。** 面板下方有「匯出 / 匯入」可以搬移跟備份。

用 `file://` 開本機檔案時，Safari 會擋掉儲存（瀏覽器限制），Chrome 和 Firefox 可以。**從上面的網址讀就都沒問題，手機也能用。**

## 這個 repo 是公開的

推上去的東西任何人都看得到，而且**刪掉也還留在 git 歷史裡**。所以：

- 金鑰、密碼、token 不要寫進任何檔案。要用的話放 `.env`（已經在 `.gitignore` 裡），程式用 `os.environ` 讀。
- 作業不要用真實個資當測試值。
- **老師的教材不要放進來**——那是別人的著作，公開散布不合適。要備份請用私有 repo 或雲端硬碟。`.gitignore` 已經擋掉 `teacher/` 和 `課堂檔案/` 兩個資料夾名稱。

## 換一台電腦 clone 之後要跑一次

```bash
git config core.hooksPath .githooks
```

這行會啟用 `.githooks/pre-commit`：每次 commit 前掃描這次新增的內容有沒有像金鑰的字串，有就擋下來。`core.hooksPath` 是本機設定，不會跟著 clone 過去，所以要手動跑一次。

想先看看會掃到什麼，可以直接執行：

```bash
python3 .githooks/pre-commit
```

確定被擋下來的是教學用的假值，用 `git commit --no-verify` 跳過。

## 自動檢查

- `.claude/hooks/check-html.py`：Claude Code 每次改 `.html` 就跑，檢查標籤開合、殘留的 Markdown 反引號、內部連結與錨點、小於 16px 的字、筆記有沒有掛 `annotate.js`。手動跑：`python3 .claude/hooks/check-html.py 檔案.html`
- `.githooks/pre-commit`：commit 前掃金鑰（見上）
