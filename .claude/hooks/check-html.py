#!/usr/bin/env python3
"""筆記 HTML 的自動檢查：標籤開合、殘留的 Markdown 反引號、內部連結。

兩種用法：
  - PostToolUse hook：從 stdin 讀 JSON，只檢查剛被 Write/Edit 的 .html 檔。
    有問題就把訊息寫到 stderr 並 exit 2，Claude 會看到並修掉。
  - 手動：python3 .claude/hooks/check-html.py 檔案1.html [檔案2.html ...]
"""
import json
import os
import re
import sys

TAGS = ["div", "section", "header", "footer", "ul", "ol", "li", "p", "h1", "h2", "h3",
        "pre", "span", "code", "a", "strong", "table", "thead", "tbody", "tr", "th", "td",
        "details", "summary"]

PRE_BLOCK = re.compile(r"<pre\b.*?</pre>", re.S)
# 反引號「成對包住文字」才算殘留；單獨一個 ` 是按鍵符號（⌃ `），不算
STRAY_BACKTICK = re.compile(r"`[^\s`](?:[^`\n]*[^\s`])?`")


def check(path):
    problems = []
    content = open(path, encoding="utf-8").read()

    for tag in TAGS:
        opens = len(re.findall(rf"<{tag}(?:\s[^>]*)?>", content))
        closes = len(re.findall(rf"</{tag}>", content))
        if opens != closes:
            problems.append(f"標籤 <{tag}> 開 {opens} 個、關 {closes} 個，數量對不上")

    # <pre> 裡面可能合法地出現反引號（例如 shell 範例），先拿掉再查
    text = PRE_BLOCK.sub("", content)
    for lineno, line in enumerate(text.splitlines(), 1):
        for m in STRAY_BACKTICK.finditer(line):
            problems.append(f"殘留的 Markdown 反引號：{m.group(0)}（改用 <code> 標籤，可用 grep -n 找位置）")

    ids = set(re.findall(r'\bid="([^"]+)"', content))
    base = os.path.dirname(os.path.abspath(path))
    for href in re.findall(r'\bhref="([^"]+)"', content):
        if href.startswith(("http://", "https://", "mailto:")):
            continue
        target, _, anchor = href.partition("#")
        if target and not os.path.exists(os.path.join(base, target)):
            problems.append(f"連結指向不存在的檔案：{href}")
        elif not target and anchor and anchor not in ids:
            problems.append(f"連結指向不存在的錨點：#{anchor}")

    return problems


def main():
    if len(sys.argv) > 1:
        paths = sys.argv[1:]
    else:
        try:
            payload = json.load(sys.stdin)
        except ValueError:
            return 0
        path = (payload.get("tool_input") or {}).get("file_path") or \
               (payload.get("tool_response") or {}).get("filePath")
        paths = [path] if path else []

    failed = False
    for path in paths:
        if not path.endswith(".html") or not os.path.isfile(path):
            continue
        problems = check(path)
        if problems:
            failed = True
            print(f"{os.path.basename(path)} 有 {len(problems)} 個問題：", file=sys.stderr)
            for p in problems:
                print(f"  - {p}", file=sys.stderr)
    return 2 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
