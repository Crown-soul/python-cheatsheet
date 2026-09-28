# python-cheatsheet

課程筆記的靜態網站（GitHub Pages 公開）。做筆記、出題、批改、路線圖一律走 `python-note` skill。

## 一定要守的
- 這是**公開 repo**：老師的教材（.py、講義、投影片）不能 commit，只放 `teacher/` 或 `課堂檔案/`（已 gitignore）；使用者自己的練習放 `practice/`。
- 不要主動 commit 或 push，改完問「要不要 commit」。
- 金鑰、真實個資不進任何檔案；pre-commit 擋下來時不要自己加 `--no-verify`，先問。

## 容易踩的坑
- 用 Bash／腳本批次改 `.html` 不會觸發 check-html hook，改完手動跑 `python3 .claude/hooks/check-html.py 檔案.html`。
- 改了 `annotate.js` 就把所有引用它的筆記 `?v=N` +1，不然瀏覽器吃舊快取。
- 新 clone 要跑 `git config core.hooksPath .githooks` 才會啟用 pre-commit。
