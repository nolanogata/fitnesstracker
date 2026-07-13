import assert from "node:assert/strict";
import { getOnboardingSteps } from "../src/lib/onboarding.ts";

const simple = getOnboardingSteps("simple").map((step) => step.key);
const detailed = getOnboardingSteps("detailed").map((step) => step.key);
const later = getOnboardingSteps("later").map((step) => step.key);

for (const steps of [simple, detailed, later]) {
  assert.equal(steps[0], "welcome");
  assert.ok(steps.indexOf("birthYear") < steps.indexOf("activityMethod"));
  assert.ok(steps.indexOf("activityMethod") < steps.indexOf("phase"));
  assert.equal(steps.at(-1), "confirm");
}

assert.equal(simple.filter((key) => key === "activityLevel").length, 1);
assert.ok(!simple.includes("averageSteps"));
assert.ok(detailed.includes("averageSteps"));
assert.ok(detailed.includes("averageMove"));
assert.ok(detailed.includes("averageExercise"));
assert.ok(detailed.includes("activityNotes"));
assert.ok(detailed.includes("activityConfirm"));
assert.ok(!later.includes("activityLevel"));
assert.ok(!later.includes("averageSteps"));

console.log("onboarding tests passed (3 paths)");
