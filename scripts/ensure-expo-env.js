#!/usr/bin/env node

/**
 * expo-env.d.ts is normally written by the Expo CLI the first time `expo start`
 * runs, and is gitignored since its content is static. CI (and any fresh
 * checkout that hasn't run the dev server yet) never triggers that, so
 * `tsc --noEmit` fails with "cannot find module" for CSS/asset imports that
 * rely on the `expo/types` reference this file provides. Regenerate it here
 * so `yarn typecheck` is self-sufficient.
 */

const fs = require('fs');
const path = require('path');

const template = `/// <reference types="expo/types" />

// NOTE: This file should not be edited and should be in your git ignore
`;

const target = path.join(process.cwd(), 'expo-env.d.ts');

if (!fs.existsSync(target)) {
  fs.writeFileSync(target, template);
}
