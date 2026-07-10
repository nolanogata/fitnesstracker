# 100% トラッカー Design

100% トラッカー is a mobile-first local PWA for one personal user. The interface is built for repeated iPhone logging: dense, quiet, tap-first, and fast enough to use between meals or sets.

## Product Shape

- Five tabs: Home, Food, Workout, History, Settings.
- No account, no cloud, no user switching.
- IndexedDB owns all user data. LocalStorage only stores small UI preferences.
- Food logging favors search, favorites, personal menus, recommendations, chain search, recent-history reuse, and quick general estimates before manual entry.
- Food AI photo logging is a bridge workflow: the app copies a prompt for the user's AI tool, accepts only JSON-like code output, normalizes and bounds the data, and first reports how many items were read. Each item then gets its own review screen. The AI-read name and nutrition are shown first, followed by existing-menu candidates with an always-visible "not in this list" action. Existing candidates are never auto-selected. When no candidate applies, a separate screen asks whether to log once, save and log, save only, or skip. Bridge v2 keeps the adopted kcal/P/F/C as one fixed value and separately carries origin, estimation policy, evidence, and uncertainty; v1 remains import-compatible.
- Workout logging favors templates, favorites, My Training, body-part drilldown, equipment drilldown, and stepper controls.
- My Training is the workout equivalent of My Menu: user-created exercises can be registered from an existing exercise or from scratch, saved with defaults and weight presets, edited in place, deleted without touching past logs, and reused from Workout or Settings.
- Settings always exposes JSON backup/import and reminds the user to back up local data.

## Visual Direction

- Mobile utility app, not marketing.
- Restrained off-white base, ink text, green status accents, clay warnings/actions.
- Theme Settings offers optional character backgrounds. The default remains no character; selecting one changes the app to a dark glass presentation and can be reversed without changing logs or the saved accent color. Characters are grouped as women, men, and other, then a style is selected so future costume unlocks can use the same flow. Current characters are SAGE, VOLT, NOVA, ARIA, TITAN, FLASH, GRIT (sports-photo style with a white singlet), AEGIS (comic masked hero), LUMEN, KORU, VITO, and KITSUNE.
- A selected character has low, mid, high, fail, cheat, and travel images. During normal daily progress, higher phases are unlocked on the Home hero card: tap "パワーを送る" 10 times for each pending phase. The unlocked stage is stored per character and app date; cheat, travel, and over-goal states keep their direct visual treatment.
- Character themes provide six state backgrounds: low, middle, high, goal miss, cheat day, and travel. The state image follows the same exception-day priority as Home, while all tabs share the background layer and keep the standard card and bottom-navigation placement. Assets are grouped by character and `default` variant so future trophy-unlocked clothing versions can be added without changing the character identity or state contract.
- Compact cards with 8px radius or less.
- Segmented tabs, chips, steppers, and icon buttons for common actions.
- Japanese-first labels because the preset database and daily flow are Japanese.

## Interaction Principles

- Every logged item is a snapshot.
- Adopted nutrition and interpretation are separate layers. The app never changes a saved kcal/P/F/C value because it is estimated; uncertainty only affects status language and the safe amount suggested for additional food.
- User ownership and nutrition provenance are separate. An AI-created My Menu item remains user-owned but keeps `estimated` provenance and copies its nutrition metadata into every new food-log snapshot.
- Home stays compact: current-day deficits are treated as remaining room, while past days receive final interpretation. Estimate share and safe kcal/fat remaining live behind a small detail control, and special-mode visuals take precedence.
- The nutrition detail control lets the user choose whether Home shows the recorded remaining calories or the safety-adjusted remaining calories. The hero number, progress bar, background progress, and over-target styling must all use the same selected basis.
- PFC status colors are directional: protein below 80% is a warning and protein at or above 80% is good; fat and carbs above 110% are warnings, 80-110% is good, and lower values are shown as low. Estimated fat overage within its uncertainty keeps the estimate tone.
- The Home check-in card can show either today's weight or the 7-day average. Body fat can show today's value, the 7-day average, or remain hidden. These are display preferences and never alter saved check-in records.
- Home goal access first shows a concise summary of the active calorie, PFC, phase, and target values. Editing continues into the focused Goal Settings flow instead of dropping the user at the Settings root.
- User-facing copy explains the outcome or next action. Internal storage names, implementation details, and visual-system notes do not appear in ordinary guidance text.
- Recommendation surfaces use adopted remaining P/C and safety-adjusted kcal/fat. AI reports use calorie-weighted estimate share rather than entry-count share.
- Missing food days are displayed as missing, never counted as zero.
- Goal changes update targets going forward without mutating old entries.
- Manual entry exists, but quick logging is the default path.
- Exception days such as cheat day, travel modes, and pause mode keep streaks intact and visually mark Home goal evaluation as special handling.
- Settings is hierarchical like iOS Settings. Current top-level groups are AI report, Export, Goal, Record settings, My Menu, My Training, and General.
- Registered My Menu and My Training entries support overwrite editing so small variations do not create accidental duplicates.
- Trophies reward first-use moments and long-term consistency. New feature adoption includes AI Photo logging and My Training registration; streak milestones currently include 3, 7, 14, 30, 45, 60, 75, 100, 150, and 365 days. The trophy sheet doubles as a guide: it highlights near-term targets, shows progress and remaining actions, and update notes can route directly into the trophy guide after trophy-related releases.
- Food size variants are introduced as a reversible presentation layer first. Chain menu rows that clearly represent the same item with size-only differences can be grouped in search results and expanded into size choices at logging time, while the original menu records and past log snapshots remain untouched. Parent rows and active add sheets hide size-only suffixes such as `(並盛り)`, but the selected size is still preserved in the logged menu snapshot. Do not force this onto sushi, fixed-count items, or products where the serving unit is the menu identity.
- Set meals adjust realistic staple components instead of scaling the full item. Rice-only sets expose rice amount, noodle-only sets expose noodle amount, and mixed bowl-plus-noodle sets expose noodle and rice/bowl amounts separately while keeping toppings, sides, and soup fixed.
