import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const assets = path.join(dist, "assets");
const suffix = ".v102.js";
const files = fs.readdirSync(assets).filter((name) => name.endsWith(".js") && !name.endsWith(suffix));

if (files.length === 0) {
  console.log("JavaScript assets are already cache-busted.");
  process.exit(0);
}

const renames = new Map(
  files.map((name) => [name, name.slice(0, -".js".length) + suffix]),
);
const textFiles = [
  path.join(dist, "index.html"),
  ...files.map((name) => path.join(assets, name)),
];

for (const filePath of textFiles) {
  let source = fs.readFileSync(filePath, "utf8");
  for (const [from, to] of renames) source = source.split(from).join(to);
  const target = renames.has(path.basename(filePath))
    ? path.join(assets, renames.get(path.basename(filePath)))
    : filePath;
  fs.writeFileSync(target, source);
}

for (const from of renames.keys()) fs.unlinkSync(path.join(assets, from));

console.log(`Cache-busted ${renames.size} JavaScript assets.`);
