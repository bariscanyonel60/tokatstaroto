#!/usr/bin/env node
/**
 * Son CDP Runtime.evaluate çıktısından (base64 JPEG) dosya kaydeder.
 * Kullanım: node scripts/save-latest-ig-cdp.mjs public/images/projects/foo.jpg
 */
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const outRel = process.argv[2];
if (!outRel) {
  console.error("Kullanım: node scripts/save-latest-ig-cdp.mjs <çıktı-yolu.jpg>");
  process.exit(1);
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const logDir = "/Users/mac/.cursor/browser-logs";
const files = readdirSync(logDir)
  .filter((f) => f.startsWith("cdp-response-Runtime.evaluate"))
  .sort();
const latest = join(logDir, files.at(-1));
const raw = JSON.parse(readFileSync(latest, "utf8"));
const v = raw.result?.value || raw.result?.result?.value;
if (!v?.b64) {
  console.error("base64 bulunamadı:", latest);
  process.exit(1);
}

const buf = Buffer.from(v.b64, "base64");
const hash = createHash("sha1").update(buf).digest("hex").slice(0, 12);
const out = resolve(root, outRel);
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, buf);
console.log(JSON.stringify({ out: outRel, w: v.w, h: v.h, bytes: buf.length, hash, alt: v.alt || "" }));
