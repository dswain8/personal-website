/** Tiny markdown renderer matching the prototype renderMd(). */
export function renderMd(src: string): string {
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const inline = (s: string) =>
    esc(s)
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");
  let t = src
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/^---\n[\s\S]*?\n---\n/, "");
  const out: string[] = [];
  let list: "ul" | "ol" | null = null;
  let code: string | null = null;
  const close = () => {
    if (list) {
      out.push(`</${list}>`);
      list = null;
    }
  };
  for (const line of t.split("\n")) {
    if (line.trimStart().startsWith("```")) {
      if (code !== null) {
        out.push(`<pre><code>${esc(code)}</code></pre>`);
        code = null;
      } else {
        close();
        code = "";
      }
      continue;
    }
    if (code !== null) {
      code += line + "\n";
      continue;
    }
    let m: RegExpMatchArray | null;
    if (/^\s*(-{3,}|\*{3,})\s*$/.test(line)) {
      close();
      out.push("<hr/>");
      continue;
    }
    if ((m = line.match(/^(#{1,4})\s+(.*)/))) {
      close();
      const level = Math.min(m[1].length + 2, 6);
      out.push(`<h${level}>${inline(m[2])}</h${level}>`);
    } else if ((m = line.match(/^\s*[-*]\s+(.*)/))) {
      if (list !== "ul") {
        close();
        out.push("<ul>");
        list = "ul";
      }
      out.push(`<li>${inline(m[1])}</li>`);
    } else if ((m = line.match(/^\s*\d+\.\s+(.*)/))) {
      if (list !== "ol") {
        close();
        out.push("<ol>");
        list = "ol";
      }
      out.push(`<li>${inline(m[1])}</li>`);
    } else if (line.startsWith(">")) {
      close();
      const txt = inline(line.replace(/^>\s?/, ""));
      if (out.length && out[out.length - 1].endsWith("</blockquote>")) {
        out[out.length - 1] = out[out.length - 1].replace(
          /<\/blockquote>$/,
          ` ${txt}</blockquote>`,
        );
      } else out.push(`<blockquote>${txt}</blockquote>`);
    } else if (line.startsWith("|")) {
      close();
      if (!/^\|[\s|:-]+\|$/.test(line)) {
        out.push(
          `<p class="md-row">${inline(
            line
              .replace(/^\||\|$/g, "")
              .split("|")
              .map((c) => c.trim())
              .join("  ·  "),
          )}</p>`,
        );
      }
    } else if (line.trim() === "") {
      close();
    } else {
      close();
      out.push(`<p>${inline(line)}</p>`);
    }
  }
  close();
  return out.join("");
}
