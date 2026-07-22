import assert from "node:assert/strict";
import { foodSeeds } from "../src/data/seeds/foods";
import { isSemanticChainComboMain, isSemanticChainComboSide } from "../src/lib/chainComboSemantics";

const expectedCoverage = [
  { brand: "マクドナルド", mains: 8, sides: 4 },
  { brand: "すき家", mains: 20, sides: 5 },
  { brand: "CoCo壱番屋", mains: 20, sides: 8 },
  { brand: "丸亀製麺", mains: 15, sides: 8 },
  { brand: "バーミヤン", mains: 4, sides: 3 },
];

expectedCoverage.forEach(({ brand, mains, sides }) => {
  const items = foodSeeds.filter((item) => item.brand === brand);
  const mainCount = items.filter(isSemanticChainComboMain).length;
  const sideCount = items.filter(isSemanticChainComboSide).length;
  assert.ok(mainCount >= mains, `${brand}: main ${mainCount} < ${mains}`);
  assert.ok(sideCount >= sides, `${brand}: side ${sideCount} < ${sides}`);
});

process.stdout.write("chain combo catalog tests passed\n");
