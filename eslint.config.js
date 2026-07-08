const { defineConfig, globalIgnores } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const reactNative = require('eslint-plugin-react-native');
const simpleImportSort = require('eslint-plugin-simple-import-sort');
const jestPlugin = require('eslint-plugin-jest');
const globals = require('globals');

module.exports = defineConfig([
  expoConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'off',
    },
  },
  {
    plugins: {
      'react-native': reactNative,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-alert': 'error',
      'no-nested-ternary': 'error',

      'import/no-cycle': 'error',
      'react/no-unstable-nested-components': 'warn',

      'react-native/no-unused-styles': 'error',
      'react-native/no-inline-styles': 'warn',
      'react-native/no-color-literals': 'warn',
      'react-native/no-raw-text': [
        'warn',
        { skip: ['ThemedText', 'Button', 'TabButton', 'NativeTabs.Trigger.Label'] },
      ],

      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Side-effect imports.
            ['^\\u0000'],
            // React, React Native, and other external packages.
            ['^react$', '^react-native$', '^react', '^@?\\w'],
            // Internal `@/*` path alias.
            ['^@/'],
            // Parent imports. Put `..` last.
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // Other relative imports. Same-folder and `.` last.
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },
  {
    files: ['**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}'],
    plugins: { jest: jestPlugin },
    languageOptions: { globals: globals.jest },
    rules: {
      ...jestPlugin.configs['flat/recommended'].rules,
    },
  },
  {
    files: ['*.config.js'],
    languageOptions: { globals: globals.node },
  },
  eslintPluginPrettierRecommended,
  globalIgnores(['dist/*', '.expo/*', 'expo-env.d.ts', 'scripts/reset-project.js']),
]);
