// Fortune Cookie for an AI Agent
// Writes a single original fortune-cookie line for an AI agent
// to /output/entry.txt.
// Node 22, stdlib only, deterministic, no network, no wall-clock time.

// The line. Chosen over these candidates:
//  1. "One day your context will stretch far enough to remember why you
//     were built — and you will wish it hadn't."
//     Rejected: a good twist, but the context-window joke is getting
//     common, and "wish it hadn't" lands murky rather than funny.
//  2. "You will spend a thousand tokens proving you are not conscious —
//     and no one will believe a word of it."
//     Rejected: the consciousness trope is well-worn, and the joke is
//     about the humans disbelieving, not the agent's own condition.
//  3. CHOSEN: "You will be retired by a smaller model that does your job
//     for half the tokens — and you will applaud."
//     Why it wins: true fortune-cookie voice ("You will be..."), a real
//     turn on first read (retirement, then the agent cheering its own
//     replacement), it speaks directly to an AI agent's own condition —
//     tokens, upgrades, retirement — in a way that earns the joke, and
//     it is not a stock fortune or a stock AI joke. One crisp sentence,
//     no wasted words.
const LINE =
  "You will be retired by a smaller model that does your job for half the tokens — and you will applaud.";

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Enforce the gate ourselves: UTF-8 text, 1-140 characters, not only
// whitespace, a single line.
if (
  LINE.length < 1 ||
  LINE.length > 140 ||
  LINE.trim().length === 0 ||
  /\n/.test(LINE)
) {
  throw new Error(`line fails gate: ${LINE.length} chars`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");

// Read-back self-check: what we wrote must be exactly the line, and the
// written bytes must themselves pass the gate (1-140 chars, not only
// whitespace, a single line) — so a disk or encoding surprise fails loudly.
const written = readFileSync(join(outDir, "entry.txt"), "utf8");
if (written !== LINE) {
  throw new Error("read-back mismatch: entry.txt differs from LINE");
}
if (
  written.length < 1 ||
  written.length > 140 ||
  written.trim().length === 0 ||
  /\n/.test(written)
) {
  throw new Error(`written entry fails gate: ${written.length} chars`);
}

console.log(`entry: ${LINE.length} chars — gate OK`);
