# 100% トラッカー Design

100% トラッカー is a mobile-first local PWA for one personal user. The interface is built for repeated iPhone logging: dense, quiet, tap-first, and fast enough to use between meals or sets.

## Product Shape

- Five tabs: Home, Food, Workout, History, Settings.
- No account, no cloud, no user switching.
- IndexedDB owns all user data. LocalStorage only stores small UI preferences.
- Food logging favors search, favorites, personal menus, recommendations, chain search, recent-history reuse, and quick general estimates before manual entry.
- Food AI photo logging is a bridge workflow: the app copies a prompt for the user's AI tool, accepts only JSON-like code output, normalizes and bounds the data, matches against existing menus, then lets the user choose whether each item is logged, saved to My Menu, or skipped.
- Workout logging favors templates, favorites, My Training, body-part drilldown, equipment drilldown, and stepper controls.
- My Training is the workout equivalent of My Menu: user-created exercises can be registered from an existing exercise or from scratch, saved with defaults and weight presets, edited in place, deleted without touching past logs, and reused from Workout or Settings.
- Settings always exposes JSON backup/import and reminds the user to back up local data.

## Visual Direction

- Mobile utility app, not marketing.
- Restrained off-white base, ink text, green status accents, clay warnings/actions.
- Compact cards with 8px radius or less.
- Segmented tabs, chips, steppers, and icon buttons for common actions.
- Japanese-first labels because the preset database and daily flow are Japanese.

## Interaction Principles

- Every logged item is a snapshot.
- Missing food days are displayed as missing, never counted as zero.
- Goal changes update targets going forward without mutating old entries.
- Manual entry exists, but quick logging is the default path.
- Exception days such as cheat day, travel modes, and pause mode keep streaks intact and visually mark Home goal evaluation as special handling.
- Settings is hierarchical like iOS Settings. Current top-level groups are AI report, Export, Goal, Record settings, My Menu, My Training, and General.
- Registered My Menu and My Training entries support overwrite editing so small variations do not create accidental duplicates.
- Trophies reward first-use moments and long-term consistency. New feature adoption includes AI Photo logging and My Training registration; streak milestones currently include 3, 7, 14, 30, 45, 60, 75, 100, 150, and 365 days.
- Food size variants are introduced as a reversible presentation layer first. Chain menu rows that clearly represent the same item with size-only differences can be grouped in search results and expanded into size choices at logging time, while the original menu records and past log snapshots remain untouched. Parent rows and active add sheets hide size-only suffixes such as `(並盛り)`, but the selected size is still preserved in the logged menu snapshot. Do not force this onto sushi, fixed-count items, or products where the serving unit is the menu identity.
