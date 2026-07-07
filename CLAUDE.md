# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
yarn start              # start dev server (choose platform interactively)
yarn ios / android / web

yarn lint                # expo lint, scoped to src/
yarn lint:fix             # eslint . --fix, repo-wide (also lints root config files)
yarn format / format:check   # prettier --write / --check .
yarn typecheck            # tsc --noEmit

yarn test                 # jest --watchAll (local/interactive)
yarn test:ci               # jest --ci --coverage=false (non-interactive)
yarn test path/to/file.test.tsx   # run a single test file
```

Package manager is **Yarn classic**. When adding an Expo/React-Native-ecosystem package, use `npx expo install <pkg>`, not `yarn add` — `expo install` resolves the version actually compatible with the installed Expo SDK, whereas `yarn add` pulls whatever is "latest" on npm and can silently install an incompatible major version (this has broken `jest-expo`/`jest` and `react-native-paper` peer resolution before in this repo). Plain, non-Expo-aware packages (e.g. `eslint-plugin-*`) are fine via `yarn add -D`.

## Git hooks (Husky) and CI

- `pre-commit` → `lint-staged` (eslint --fix + prettier on staged files)
- `commit-msg` → commitlint, **Conventional Commits required** (`feat:`, `fix:`, `chore:`, etc.) — non-conforming messages are rejected
- `pre-push` → `yarn typecheck`
- GitHub Actions (`.github/workflows/ci.yml`) reruns lint, format:check, typecheck, and test:ci on every PR/push to `main` — the actual gate, since local hooks can be bypassed with `--no-verify`
- Dependabot (`.github/dependabot.yml`) opens weekly grouped PRs for npm and GitHub Actions dependencies

## Architecture

**Routing**: [Expo Router](https://docs.expo.dev/router/introduction) with `src/app` as the router root (`main` in package.json is `expo-router/entry`). `src/app/_layout.tsx` is the root layout — it composes the theme providers, splash screen, and tab navigator.

**Path aliases** (`tsconfig.json`): `@/*` → `src/*`, `@/assets/*` → `assets/*`.

**Platform-specific files**: Metro resolves `*.web.ts(x)` over the base file when bundling for web (e.g. `animated-icon.tsx` vs `animated-icon.web.tsx`, `use-color-scheme.ts` vs `.web.ts`, `app-tabs.tsx` vs `app-tabs.web.tsx`). Native tab bar uses `expo-router/unstable-native-tabs` (`app-tabs.tsx`); the web tab bar is a hand-built `expo-router/ui` + `TabButton`/`CustomTabList` implementation (`app-tabs.web.tsx`) since native tabs don't render on web. When touching tab/nav-adjacent behavior, check both files.

### Theming

Theme state has one source of truth: `src/hooks/use-theme-preference.tsx` (`ThemePreferenceProvider` / `useThemePreference()`). It reads the OS color scheme as a default but allows an in-app override (toggled via the `Switch` on the home screen). **Every** component that needs to know light/dark must go through `useThemePreference()` — do not call React Native's `useColorScheme()` directly in a new component, or it'll be out of sync with the in-app toggle (this has happened before and had to be fixed across `_layout.tsx`, `use-theme.ts`, `app-tabs.tsx`, `app-tabs.web.tsx`, `web-badge.tsx`).

Two parallel theme systems are wired together in `_layout.tsx`:

- `src/constants/theme.ts` — hand-rolled `Colors.light`/`Colors.dark` tokens (`text`, `background`, `backgroundElement`, `backgroundSelected`, `textSecondary`, `primary`), consumed via `useTheme()` (`src/hooks/use-theme.ts`) by the custom `ThemedText`/`ThemedView` components.
- `src/constants/paper-theme.ts` — React Native Paper (MD3) theming, combined with `expo-router`'s React Navigation theme via `adaptNavigationTheme`. **Paper and React Navigation deliberately get separate theme objects** (`CombinedLightTheme`/`CombinedDarkTheme` for `PaperProvider`, `NavigationLightTheme`/`NavigationDarkTheme` for `ThemeProvider`) — Paper's MD3 typescale and React Navigation's `fonts` shape are structurally incompatible, so one merged object doesn't type-check. Don't try to collapse them back into one.

Installed React Native Paper is **v5.15.3**, not the current v6 docs on `oss.callstack.com` (which 403s on fetch — pull docs from `github.com/callstack/react-native-paper`, `docs/5.x/...` path, if verifying an API against the installed version).

### Testing

- Jest via `jest-expo` preset. Config lives in `package.json`'s `"jest"` field, not a separate file.
- `@testing-library/react-native` v14's `render()` is **async** — must be `await`ed, unlike older RNTL versions.
- CSS imports (`global.css`, `*.module.css`) are stubbed via `moduleNameMapper` → `__mocks__/style-mock.js`; Jest can't parse raw CSS otherwise.
- Any component using `useTheme()`/`ThemedText`/`ThemedView` needs to be rendered inside `<ThemePreferenceProvider>` in tests, or `useThemePreference()` throws.

### ESLint (flat config, `eslint.config.js`)

- Type-aware rules (`no-floating-promises`, `no-misused-promises`) are enabled via `parserOptions.projectService` scoped to `**/*.ts`/`**/*.tsx` — fire-and-forget promises must be explicit (`void somePromise()`), not silently dropped.
- `noUncheckedIndexedAccess` is on in `tsconfig.json` — array/object index access is typed `T | undefined`, not `T`.
- `simple-import-sort` auto-fixes import order/grouping (external → `@/*` alias → relative) — don't hand-order imports, run `yarn lint:fix`.
- `react-native/no-raw-text` has a `skip` allowlist for custom Text-wrapping components (`ThemedText`, `TabButton`, `NativeTabs.Trigger.Label`) — add new custom text-wrapper components to that list rather than disabling the rule.
- Root-level `*.config.js` files get Node globals (`__dirname`, etc.) via a dedicated block — `yarn lint` (scoped to `src/`) won't catch config-file lint errors, but `lint-staged` (repo-wide) will at commit time.
