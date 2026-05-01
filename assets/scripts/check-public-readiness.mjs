#!/usr/bin/env node
// Lightweight public-readiness scan for this repository.
//
// Optional extra forbidden terms:
//   AI_WORKSPACE_FORBIDDEN_TERMS="internal-name,customer-name" just check-public

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const ignoredDirs = new Set([".git", "node_modules", "tmp", "dist"]);
const ignoredFiles = new Set([]);

const extraForbiddenTerms = (process.env.AI_WORKSPACE_FORBIDDEN_TERMS || "")
  .split(",")
  .map((term) => term.trim())
  .filter(Boolean);

const checks = [
  {
    name: "private key block",
    pattern: /-----BEGIN (?:RSA |OPENSSH |EC |DSA |)?PRIVATE KEY-----/,
  },
  {
    name: "AWS access key",
    pattern: /\bAKIA[0-9A-Z]{16}\b/,
  },
  {
    name: "GitHub token",
    pattern: /\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9_]{20,}\b|\bgithub_pat_[A-Za-z0-9_]{20,}\b/,
  },
  {
    name: "OpenAI-style API key",
    pattern: /\bsk-[A-Za-z0-9_-]{20,}\b/,
  },
  {
    name: "hardcoded secret assignment",
    pattern:
      /\b(?:password|passwd|secret|token|api[_-]?key)\b\s*[:=]\s*["'][^"'<>{}\s][^"']{7,}["']/i,
  },
  {
    name: "absolute user path",
    pattern: /(?:\/home\/[A-Za-z0-9._-]+|\/Users\/[A-Za-z0-9._-]+|C:\\Users\\[^\\\s]+)/,
  },
  ...extraForbiddenTerms.map((term) => ({
    name: `forbidden term: ${term}`,
    pattern: new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
  })),
];

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (ignoredDirs.has(entry)) continue;

    const path = join(dir, entry);
    const rel = relative(root, path);
    if (ignoredFiles.has(rel)) continue;

    const stat = statSync(path);
    if (stat.isDirectory()) {
      yield* walk(path);
    } else if (stat.isFile()) {
      yield path;
    }
  }
}

function isProbablyBinary(buffer) {
  return buffer.includes(0);
}

const findings = [];

for (const file of walk(root)) {
  const buffer = readFileSync(file);
  if (isProbablyBinary(buffer)) continue;

  const rel = relative(root, file);
  const lines = buffer.toString("utf8").split(/\r?\n/);

  for (const [index, line] of lines.entries()) {
    for (const check of checks) {
      if (check.pattern.test(line)) {
        findings.push({ file: rel, line: index + 1, check: check.name });
      }
    }
  }
}

if (findings.length > 0) {
  console.error("Public-readiness scan found potential issues:");
  for (const finding of findings) {
    console.error(`  ${finding.file}:${finding.line} - ${finding.check}`);
  }
  process.exit(1);
}

if (!existsSync(join(root, "README.md"))) {
  console.error("Missing README.md");
  process.exit(1);
}

console.log("Public-readiness scan passed.");
