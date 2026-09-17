import fs from "node:fs";
import path from "node:path";

const root = path.resolve("content");
const docsDir = path.join(root, "docs");
const sidebarSource = fs.readFileSync(path.join(root, "sidebar.ts"), "utf8");
const hrefs = [...sidebarSource.matchAll(/href: "([^"]+)"/g)].map((match) => match[1]);

function hrefToFile(href) {
  if (href === "/") return path.join(docsDir, "index.mdx");
  const slugPath = href.replace(/^\//, "");
  const file = path.join(docsDir, `${slugPath}.mdx`);
  if (fs.existsSync(file)) return file;
  return path.join(docsDir, slugPath, "index.mdx");
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith(".mdx")) files.push(full);
  }
  return files;
}

let failed = false;

for (const href of hrefs) {
  const file = hrefToFile(href);
  if (!fs.existsSync(file)) {
    console.error(`Missing MDX for ${href} -> ${file}`);
    failed = true;
  }
}

const mdxFiles = walk(docsDir);
const hrefSet = new Set(hrefs);

for (const file of mdxFiles) {
  const relative = path.relative(docsDir, file).replaceAll("\\", "/");
  const href =
    relative === "index.mdx"
      ? "/"
      : `/${relative.replace(/\/index\.mdx$/, "").replace(/\.mdx$/, "")}`;
  if (!hrefSet.has(href)) {
    console.error(`Orphan MDX with no sidebar entry: ${relative}`);
    failed = true;
  }

  const source = fs.readFileSync(file, "utf8");
  for (const match of source.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
    const url = match[1];
    if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("#") || url.startsWith("mailto:")) {
      continue;
    }
    const internal = url.split("#")[0];
    if (internal && !hrefSet.has(internal)) {
      console.error(`Broken internal link in ${relative}: ${internal}`);
      failed = true;
    }
  }
}

if (failed) {
  process.exit(1);
}

console.log(`Checked ${hrefs.length} sidebar routes and ${mdxFiles.length} MDX files.`);
