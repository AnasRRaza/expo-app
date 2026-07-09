---
description: Screenshot a specific app screen on the iOS simulator to visually verify a change
argument-hint: <screen-name> [what to check for]
---

Take a screenshot of a running screen in this Expo Router app so it can be visually verified. The screen to capture is: **$ARGUMENTS**

The first word/phrase is the screen name (matches a filename under `src/app`, e.g. `login`, `welcome`, `explore`, `menu`, `full-name`). Anything after that is optional extra context on what to look for (e.g. "check the button uses Manrope") — call it out explicitly in your final report if given, don't just silently screenshot.

## Steps

1. **Resolve the screen to a route.**
   Find the matching file: `find src/app -iname "*<screen-name>*" -not -name "_layout.tsx"`.
   - No match → list the files under `src/app` (minus `_layout.tsx`) and ask the user which one they meant.
   - Multiple matches → ask which one, unless the name is unambiguous enough to pick confidently.
   - Once you have the file path, derive the expo-router path: drop the `src/app` prefix and the `.tsx` extension, drop every path segment that looks like `(group)` (route groups aren't part of the URL), and drop a trailing `index` segment. Join what's left with `/`, prefixed with `/`.
     Examples: `src/app/(auth)/login.tsx` → `/login`. `src/app/(drawer)/(tabs)/index.tsx` → `/`. `src/app/(drawer)/(tabs)/explore.tsx` → `/explore`.

2. **Make sure a simulator is booted.**

   ```bash
   xcrun simctl list devices | grep -i booted
   ```

   If nothing is booted, boot one (`xcrun simctl boot "iPhone 16"` or whatever's available via `xcrun simctl list devices available`), then `open -a Simulator`.

3. **Make sure the Metro dev server is running.**
   Check if something is already serving on port `8090` (the port this project uses for agent-driven verification, to avoid clashing with other repos' dev servers on 8081/8082):

   ```bash
   lsof -iTCP:8090 -sTCP:LISTEN -P
   ```
   - If nothing is listening: start it in the background and wait for it to be ready before continuing —
     ```bash
     npx expo start --ios --port 8090 --non-interactive > /tmp/sendelia-metro.log 2>&1 &
     ```
     then poll (don't just sleep a fixed guess) until the log shows the bundle is ready or an error:
     ```bash
     until grep -qE "Bundled|error|Error" /tmp/sendelia-metro.log 2>/dev/null; do sleep 2; done
     ```
   - If it's already running, don't start a second one — just reuse it.

4. **Deep link to the resolved route:**

   ```bash
   xcrun simctl openurl "<booted-device-udid>" "exp://127.0.0.1:8090/--/<route>"
   ```

   Each `openurl` call **fully reloads the JS bundle** (you'll see a "Loading project…" splash first), it does not just navigate the already-running instance. Wait at least **4 seconds** before screenshotting — 1-2s is not enough and will catch the loading splash instead of the real screen. If the first screenshot still shows "Loading project…", wait another few seconds and re-screenshot rather than reporting a false result.

5. **Capture and look at the screenshot:**

   ```bash
   xcrun simctl io "<booted-device-udid>" screenshot <scratchpad>/screenshot-<screen-name>.png
   ```

   Use your scratchpad directory for the output path. Then use the Read tool on that PNG — don't report success without actually looking at the image.

6. **Report back concisely**: what the screen shows, whether it matches what was asked (including any specific thing the user asked you to check per $ARGUMENTS), and flag anything that looks visually wrong (crash screen, error boundary, unstyled/system-font text where a custom font is expected, layout breakage).
   - **Note on protected routes**: several routes in this app are gated behind `Stack.Protected` in `src/app/_layout.tsx` (e.g. everything under `(drawer)` requires a session, `(onboarding)` requires a session without completed onboarding). If you're not logged in in the simulator, deep-linking to one of those will land you on the `(auth)` welcome/login screen instead — that's the app's own guard redirecting you, not a broken screenshot. Say so explicitly rather than reporting the wrong screen as a bug.

Leave the Metro server running in the background afterward (don't kill it) so repeated `/screenshot` calls in the same session are fast.
