#!/usr/bin/env python3
"""筆記文字風格檢查：列出破折號、安撫語、沒有根據的概括、贅字的位置。

只回報、不擋存檔（exit 0），規則見 references/writing-style.md「讀起來像人寫的」。
程式碼框、行內 <code> 不檢查；「一句話重點」使用者決定先不改，另外計數不列出。

用法：python3 .claude/skills/python-note/scripts/check-style.py [--all] 檔案1.html [檔案2.html ...]
  --all  一句話重點也一起檢查（新筆記、或使用者同意改重點句的筆記用這個）
"""
import html
import re
import sys

# (類別, 正規式, 說明)。「需判斷」的類別是語法上有時必要的字，要看上下文決定。
RULES = [
    ("破折號", r"——", "改用句號分開，或用「因為」「所以」接起來"),
    ("安撫語", r"就好|沒關係|不用擔心|別緊張|放心", "直接講要做的動作，或整句刪掉"),
    ("沒有根據的概括", r"很多人|大部分人|初學者最常|大家都", "沒有資料就不寫，有的話講具體來源"),
    ("贅字", r"其實|真正|基本上|事實上|刻意", "刪掉看句子意思有沒有變，沒變就刪"),
    ("贅字（需判斷）", r"只是|也就是|還是|自動", "當填充用的才刪；「還是」當「或」、「自動」講不需額外動作時保留"),
]

HEADLINE = re.compile(r'<p style="font-size:20px;line-height:1\.6;font-weight:600;border-left[^"]*">.*?</p>', re.S)
H2 = re.compile(r"<h2\b[^>]*>(.*?)</h2>", re.S)


def plain(fragment):
    return html.unescape(re.sub(r"<[^>]+>", "", fragment))


def check(path, include_headlines=False):
    src = open(path, encoding="utf-8").read()
    headline_count = len(HEADLINE.findall(src))
    # 不檢查的部分換成等長空白，位置才對得上原檔
    masked = re.sub(r"<pre\b.*?</pre>|<code\b.*?</code>|<style\b.*?</style>|<script\b.*?</script>",
                    lambda m: " " * len(m.group(0)), src, flags=re.S)
    if not include_headlines:
        masked = HEADLINE.sub(lambda m: " " * len(m.group(0)), masked)
    heads = [(m.start(), plain(m.group(1)).strip()) for m in H2.finditer(src)]

    def where(pos):
        """最靠近的上一個 h2 標題，當作位置。"""
        name = "Header"
        for start, title in heads:
            if start <= pos:
                name = title
        return name[:16]

    hits = []
    for label, pattern, advice in RULES:
        for m in re.finditer(pattern, masked):
            # 只算落在標籤外的文字
            before = masked.rfind("<", 0, m.start())
            after = masked.rfind(">", 0, m.start())
            if before > after:
                continue
            a = masked.rfind(">", 0, m.start())
            b = masked.find("<", m.end())
            left = plain(src[a + 1:m.start()]).replace("\n", " ")[-30:]
            right = plain(src[m.end():b]).replace("\n", " ")[:30]
            context = f"{left.lstrip()}【{m.group(0)}】{right.rstrip()}"
            hits.append((label, where(m.start()), context, advice))
    return hits, headline_count


def main():
    args = sys.argv[1:]
    include = "--all" in args
    for path in [a for a in args if a != "--all"]:
        hits, headlines = check(path, include)
        print(f"== {path}：{len(hits)} 處")
        by_label = {}
        for h in hits:
            by_label.setdefault(h[0], []).append(h)
        for label, _, _, _ in [(r[0], 0, 0, 0) for r in RULES]:
            items = by_label.get(label, [])
            if not items:
                continue
            print(f"\n[{label}] {len(items)} 處。{items[0][3]}")
            for _, unit, context, _ in items:
                print(f"  {unit}｜{context}")
        if include:
            print(f"\n（一句話重點 {headlines} 句一起檢查了）\n")
        else:
            print(f"\n（一句話重點 {headlines} 句沒有檢查；要一起檢查加 --all）\n")
    return 0


if __name__ == "__main__":
    sys.exit(main())
