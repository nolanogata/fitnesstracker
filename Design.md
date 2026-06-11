# ゴールトラッカー Design

ゴールトラッカー is a mobile-first local PWA for one personal user. The interface is built for repeated iPhone logging: dense, quiet, tap-first, and fast enough to use between meals or sets.

## Product Shape

- Four tabs: Home, Food, Workout, Settings.
- No account, no cloud, no user switching.
- IndexedDB owns all user data. LocalStorage only stores small UI preferences.
- Food logging favors presets, recents, favorites, chain search, category drilldown, and quick estimates before manual entry.
- Workout logging favors templates, previous copies, body-part drilldown, equipment drilldown, and stepper controls.
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
