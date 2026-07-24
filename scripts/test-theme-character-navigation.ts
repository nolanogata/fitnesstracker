import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import postcss from "postcss";

const css = await readFile(new URL("../src/index.css", import.meta.url), "utf8");
const root = postcss.parse(css);

const declarationsFor = (selector: string) => {
  const declarations = new Map<string, string>();
  root.walkRules(selector, (rule) => {
    if (rule.selector !== selector) return;
    rule.walkDecls((declaration) => declarations.set(declaration.prop, declaration.value));
  });
  return declarations;
};

const broadCharacterChildRule = declarationsFor(
  '.app-shell[data-character]:not([data-character="none"]) > *',
);
assert.equal(
  broadCharacterChildRule.size,
  0,
  "Character themes must not override the positioning or z-index of every app-shell child.",
);

const characterContentRule = declarationsFor(
  '.app-shell[data-character]:not([data-character="none"]) > section',
);
assert.equal(characterContentRule.get("position"), "relative");
assert.equal(characterContentRule.get("z-index"), "1");

const bottomNavRule = declarationsFor(".app-bottom-nav");
assert.equal(bottomNavRule.get("position"), "fixed");
assert.equal(bottomNavRule.get("z-index"), "30");

const characterBottomNavRule = declarationsFor(
  '.app-shell[data-character]:not([data-character="none"]) .app-bottom-nav',
);
assert.equal(characterBottomNavRule.get("position"), "fixed");

console.log("theme character navigation regression checks passed");
