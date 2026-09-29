import fs from "fs";
import { keyboardRows } from "./src/lib/typing-data.js";

export function verifyStory(storyText, name) {
  let targets = new Set();
  keyboardRows.forEach((row) => {
    row.forEach((k) => {
      if (k.hi) targets.add(k.hi);
      if (k.shift) targets.add(k.shift);
    });
  });

  let remaining = new Set(targets);
  for (const char of storyText) {
    // Check multi-character targets first (like 'रू', 'श्र', 'ज्ञ')
    // Actually, targets are sometimes 2 chars. Let's iterate targets.
  }

  // Better approach:
  for (const target of targets) {
    if (storyText.includes(target)) {
      remaining.delete(target);
    }
  }

  console.log(`[${name}] Words:`, storyText.split(/\s+/).filter((w) => w.length > 0).length);
  console.log(`[${name}] Characters:`, storyText.length);
  console.log(`[${name}] Remaining Targets (${remaining.size}):`, Array.from(remaining).join(" "));
  return remaining.size === 0;
}
