const { defineConfig, globalIgnores } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const reactNative = require('eslint-plugin-react-native');
const simpleImportSort = require('eslint-plugin-simple-import-sort');

module.exports = defineConfig([
  expoConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
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

      'react-native/no-unused-styles': 'error',
      'react-native/no-inline-styles': 'warn',
      'react-native/no-color-literals': 'warn',

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
  eslintPluginPrettierRecommended,
  globalIgnores(['dist/*', '.expo/*', 'expo-env.d.ts', 'scripts/reset-project.js']),
]);
